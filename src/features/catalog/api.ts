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
  }));
}

export async function getCategory(slug: string): Promise<Category | null> {
  return categories.find((category) => category.slug === slug) ?? null;
}
