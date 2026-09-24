import type { Category, Product } from './types';

import { categories } from '@/data/products';

export const PAGE_SIZE = 12;

export async function getCategories(): Promise<Category[]> {
  const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/categories`).then((res) => res.json());
  return result;
}

export async function getCategoryNav(): Promise<Array<Pick<Category, 'slug' | 'name'>>> {
  return categories.map(({ slug, name }) => ({ slug, name }));
}

export async function getCategoriesPreview(limit = 6): Promise<Category[]> {
  const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/categories`).then((res) => res.json());
  return result.map((category: Category) => ({
    ...category,
    products: category.products.slice(0, limit),
    total: category.products.length,
  }));
}

export async function getCategory(slug: string): Promise<Category | null> {
  const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/category/${slug}`).then((res) => res.json());
  return result ?? null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/product/${slug}`).then((res) =>
    res.json()
  );
  return result ?? null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/products`).then((res) => res.json());
  return result;
}

export async function getProducts(categorySlug: string, page = 1) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/category/${categorySlug}/products?page=${page}`
  ).then((res) => res.json());

  if (!response) {
    throw new Error('Failed to fetch products');
  }
  return response;
}
