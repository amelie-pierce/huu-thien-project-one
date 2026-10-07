import { Badge } from "@/components/ui";
import Image from "next/image";
import { Product } from "../../types";
import { cn } from "@/lib/cn";
import s from "./product-card-media.module.scss";

type Props = {
  product: Product;
  className?: string;
};

export function ProductCardMedia({ product, className }: Props) {
  return (
    <div className={cn(s.media, className)}>
      {product.isNew && <Badge className={s.badge}>New</Badge>}
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={972}
        height={972}
        sizes="(min-width: 601px) 508px, 100vw"
        className={s.image}
      />
    </div>
  );
}
