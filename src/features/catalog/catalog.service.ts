import type { Category, Product } from './types';

import { prisma } from '@/db/client';

export const PAGE_SIZE = 12;

export async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    include: { products: { include: { sizes: true } } },
  });
  return categories.map((category) => ({
    ...category,
    totalProducts: category.products.length,
  })) as Category[];
}

export async function getCategoriesPreview(limit = 6): Promise<Category[]> {
  const categories = await getCategories();
  return categories.map((category) => ({
    ...category,
    products: category.products.slice(0, limit),
  }));
}

export async function getCategory(slug: string): Promise<Category | null> {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { products: { include: { sizes: true } } },
  });
  if (!category) return null;
  return { ...category, totalProducts: category.products.length } as Category;
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { sizes: true, category: true },
  });
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => product.slug);
}

export async function getProducts(categorySlug: string, page = 1) {
  const currentPage = Math.max(page || 1, 1);

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    select: { id: true, name: true },
  });

  if (!category) {
    return {
      products: [] as Product[],
      categoryName: '',
      pagination: {
        page: currentPage,
        pageSize: PAGE_SIZE,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  const where = { categoryId: category.id };
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { sizes: true },
      orderBy: { createdAt: 'desc' },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return {
    products: products as Product[],
    categoryName: category.name,
    pagination: {
      page: currentPage,
      pageSize: PAGE_SIZE,
      total,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
}
