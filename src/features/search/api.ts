import type { Product } from '@/features/catalog/types';

export async function searchProductsRequest(query: string, signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`, { signal });
  return res.ok ? res.json() : [];
}
