import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StockTicker() {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // 📈 Fetch crypto prices
        const cryptoRes = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin&vs_currencies=usd"
        );
        const crypto = cryptoRes.data;

        // 💱 Fetch forex data
        const forexPairs = [
          { from: "USD", to: "TZS" },
          { from: "EUR", to: "USD" },
          { from: "GBP", to: "USD" },
          { from: "JPY", to: "USD" },
        ];

        const forexData = await Promise.all(
          forexPairs.map(async (pair) => {
            const res = await axios.get(
              `https://api.exchangerate.host/convert?from=${pair.from}&to=${pair.to}`
            );
            const rate = res.data?.result;
            return {
              label: `${pair.from}/${pair.to}`,
              price: typeof rate === "number" ? rate : null,
            };
          })
        );

        // 📊 Fetch stock data from Twelve Data
        const symbols = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN"];
        const apiKey = "bce6a0d57c5a4ae5ac9ed60f5cb31e02";

        // TwelveData allows one symbol per request on free plan
        const stockData = await Promise.all(
          symbols.map(async (symbol) => {
            const res = await axios.get(
              `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`
            );
            return {
              label: symbol,
              price: parseFloat(res.data.price),
            };
          })
        );

        // ✅ Combine all data
        const combined = [
          { label: "BTC/USD", price: crypto?.bitcoin?.usd },
          { label: "ETH/USD", price: crypto?.ethereum?.usd },
          { label: "SOL/USD", price: crypto?.solana?.usd },
          { label: "DOGE/USD", price: crypto?.dogecoin?.usd },
          ...forexData,
          ...stockData,
        ];

        setMarketData(combined);
      } catch (err) {
        console.error("Market data fetch failed:", err);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60 * 1000); // refresh every 1 minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black text-white overflow-hidden border-b border-white/10">
      <div className="animate-marquee whitespace-nowrap py-1 px-4 text-sm">
        {marketData.length > 0 ? (
          marketData.map((item) => (
            <span key={item.label} className="inline-block mr-8">
              <span className="font-semibold">{item.label}</span>:{" "}
              {typeof item.price === "number" ? (
                <span className="text-emerald-400">${item.price.toFixed(2)}</span>
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </span>
          ))
        ) : (
          <span>Loading market data...</span>
        )}
      </div>

      <style>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%) }
          100% { transform: translateX(-100%) }
        }
      `}</style>
    </div>
  );
}
