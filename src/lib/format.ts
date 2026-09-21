export function formatPrice(cents: number, opts: { decimals?: "auto" | 2 } = {}) {
  const value = cents / 100;
  const decimals =
    opts.decimals === 2 ? 2 : Number.isInteger(value) ? 0 : 2;
  return `$${value.toFixed(decimals)}`;
}
