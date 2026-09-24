import { Badge } from "@/components/ui";
import Image from "next/image";
import { Product } from "../../types";
import s from "./product-card-media.module.scss";

export function ProductCardMedia({ product }: { product: Product }) {
  return (
    <div className={s.media}>
      {product.isNew && <Badge className={s.badge}>New</Badge>}
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={176}
        height={188}
        className={s.image}
      />
    </div>
  );
}
