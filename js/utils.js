// utils.js - small pure helpers
export function formatPrice(centsOrNumber) {
  const n = typeof centsOrNumber === 'number' ? centsOrNumber : Number(centsOrNumber);
  if (Number.isNaN(n)) return '$0.00';
  const asCents = n >= 100 ? n : n; // allow both dollars or cents for simplicity in examples
  return `$${(n / 100).toFixed(2)}`.replace('$0.', '$0.');
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
