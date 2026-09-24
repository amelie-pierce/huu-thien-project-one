import { Badge, Heading, Text } from "@/components/ui";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../../types";
import { formatPrice } from "@/lib/format";
import s from "./product-card.module.scss";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className={s.card}>
      <Link href={`/products/${product.slug}`} className={s.link}>
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
        <div className={s.info}>
          <Heading as="h3" variant="card" className={s.name}>{product.name}</Heading>
          <Text as="span" className={s.price}>{formatPrice(product.price)}</Text>
        </div>
      </Link>
    </article>
  );
}
