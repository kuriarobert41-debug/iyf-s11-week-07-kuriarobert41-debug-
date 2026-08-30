// simple unit tests for utils
import { describe, it, expect } from 'vitest';
import { generateId, formatPrice } from '../js/utils.js';

describe('utils.generateId', () => {
  it('returns a non-empty string', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('generates unique values across calls', () => {
    const a = generateId();
    const b = generateId();
    expect(a).not.toBe(b);
  });
});

describe('utils.formatPrice', () => {
  it('formats whole dollars (500 -> $5.00)', () => {
    expect(formatPrice(500)).toBe('$5.00');
  });
  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
  it('handles invalid input gracefully', () => {
    expect(formatPrice('abc')).toBe('$0.00');
  });
});
