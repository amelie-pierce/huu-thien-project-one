export const SIZES = ['Small', 'Medium', 'Large'] as const;
export type Size = (typeof SIZES)[number];

export interface ProductSize {
  id: number;
  name: (typeof SIZES)[number];
  price: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  isNew: boolean;
  imageUrl: string;
  categoryId: number;
  sizes: ProductSize[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}
