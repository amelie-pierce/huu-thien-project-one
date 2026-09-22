export const SIZES = ["Small", "Medium", "Large"] as const;
export type Size = (typeof SIZES)[number];

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categorySlug: string;
  isNew?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  products: Product[];
};
