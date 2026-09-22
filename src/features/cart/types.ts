import type { Size } from "@/features/catalog/types";

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: Size;
  unitPrice: number;
  qty: number;
};

export type NewCartLine = Omit<CartLine, "key" | "qty">;
