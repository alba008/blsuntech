// src/api/newsApi.js

// If you call providers directly from the browser, you need these in your React .env:
// REACT_APP_NEWSAPI_KEY=...
// REACT_APP_CURRENTSAPI_KEY=...
const NEWSAPI_KEY = process.env.REACT_APP_NEWSAPI_KEY || "";
const CURRENTS_KEY = process.env.REACT_APP_CURRENTSAPI_KEY || "";

/**
 * NewsAPI: Tech headlines
 * Docs: https://newsapi.org/
 */
export async function fetchNewsAPI(limit = 12) {
  if (!NEWSAPI_KEY) {
    console.warn("Missing REACT_APP_NEWSAPI_KEY; fetchNewsAPI will return []");
    return [];
  }
  try {
    const url =
      `https://newsapi.org/v2/top-headlines?category=technology&pageSize=${encodeURIComponent(limit)}&apiKey=${encodeURIComponent(NEWSAPI_KEY)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`NewsAPI HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data.articles) ? data.articles : [];
    return items.map(a => ({
      title: a.title || "",
      description: a.description || "",
      url: a.url || "",
      urlToImage: a.urlToImage || null,
      author: a.source?.name || a.author || "",
      publishedAt: a.publishedAt || null,
    }));
  } catch (err) {
    console.error("NewsAPI error:", err);
    return [];
  }
}

/**
 * Currents API: latest tech news
 * Docs: https://currentsapi.services/
 */
export async function fetchCurrentsAPI(limit = 12) {
  if (!CURRENTS_KEY) {
    console.warn("Missing REACT_APP_CURRENTSAPI_KEY; fetchCurrentsAPI will return []");
    return [];
  }
  try {
    // Currents supports `limit`; some examples show `page_size`—we'll send both
    const url =
      `https://api.currentsapi.services/v1/latest-news?category=technology&limit=${encodeURIComponent(limit)}&page_size=${encodeURIComponent(limit)}&apiKey=${encodeURIComponent(CURRENTS_KEY)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Currents HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data.news) ? data.news : [];
    return items.map(a => ({
      title: a.title || "",
      description: a.description || a.summary || "",
      url: a.url || a.link || "",
      urlToImage: a.image || null,
      author: a.author || "",
      publishedAt: a.published || a.date || null,
    }));
  } catch (err) {
    console.error("CurrentsAPI error:", err);
    return [];
  }
}
