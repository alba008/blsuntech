// utils/numberFormat.js
export const fmtUSD = n =>
  n == null ? '—' : `$${(n/1e9).toFixed(2)}B`;   // show in billions

export const fmtEPS = n =>
  n == null ? '—' : Number(n).toFixed(2);

export const fmtInt = n =>
  n == null ? '—' : Intl.NumberFormat().format(n);
