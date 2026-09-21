import { Product } from "../../types";
import { ProductCard } from "../product-card/ProductCard";
import s from "./product-grid.module.scss";

type Props = {
  products: Product[];
  variant?: "menu" | "page";
};

export function ProductGrid({ products, variant = "menu" }: Props) {
  if (products.length === 0) {
    return <p className={s.empty}>No items here yet. Check another category.</p>;
  }

  return (
    <div className={s.grid} data-variant={variant}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
