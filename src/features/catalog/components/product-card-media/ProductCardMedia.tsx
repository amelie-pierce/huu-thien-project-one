import { Badge } from "@/components/ui";
import Image from "next/image";
import { Product } from "../../types";
import s from "./product-card-media.module.scss";

// Handle Specific cases follow by Design
const TABLET_HEIGHT_CLASS: Record<string, string> = {
  espresso: s.tablet408,
  lemonade: s.tablet412,
};

type Props = {
  product: Product;
  /** Handle Specific cases follow by Design */
  fixedSize?: boolean;
  className?: string;
};

export function ProductCardMedia({ product, fixedSize, className: extraClassName }: Props) {
  const className = [
    s.media,
    extraClassName,
    fixedSize && s.fixedSize,
    fixedSize && TABLET_HEIGHT_CLASS[product.slug],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {product.isNew && <Badge className={s.badge}>New</Badge>}
      <Image
        src={product.imageUrl}
        alt={product.name}
        // Handle Specific cases follow by Design
        width={972}
        height={972}
        sizes="(min-width: 601px) 508px, 100vw"
        className={s.image}
      />
    </div>
  );
}
