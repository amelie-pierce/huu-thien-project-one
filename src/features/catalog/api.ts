import type { Category, Product } from "./types";

import { categories } from "@/data/products";

export const PAGE_SIZE = 12;

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryNav(): Promise<Array<Pick<Category, "slug" | "name">>> {
  return categories.map(({ slug, name }) => ({ slug, name }));
}

export async function getCategoriesPreview(limit = 6): Promise<Category[]> {
  return categories.map((category) => ({
    ...category,
    products: category.products.slice(0, limit),
    total: category.products.length,
  }));
}

export async function getCategory(slug: string): Promise<Category | null> {
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getProducts({
  category,
  page = 1,
  pageSize = PAGE_SIZE,
}: {
  category: string;
  page?: number;
  pageSize?: number;
}): Promise<{ items: Product[]; total: number; totalPages: number }> {
  const found = categories.find((item) => item.slug === category);
  const all = found?.products ?? [];
  const totalPages = Math.max(1, Math.ceil(all.length / pageSize));
  const start = (page - 1) * pageSize;

  return { items: all.slice(start, start + pageSize), total: all.length, totalPages };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  for (const category of categories) {
    const product = category.products.find((item) => item.slug === slug);
    if (product) return product;
  }
  return null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  return categories.flatMap((category) => category.products.map((product) => product.slug));
}
