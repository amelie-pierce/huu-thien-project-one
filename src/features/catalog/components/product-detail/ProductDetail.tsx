import { Container, Heading, Text } from "@/components/ui";

import { AddToCartForm } from "../add-to-cart-form/AddToCartForm";
import { Product } from "../../types";
import { ProductCardMedia } from "../product-card-media/ProductCardMedia";
import { formatPrice } from "@/lib/format";
import s from "./product-detail.module.scss";

export function ProductDetail({ product }: { product: Product }) {
  return (
    <Container className={s.detail}>
      <ProductCardMedia product={product}></ProductCardMedia>
      <div className={s.info}>
        <div className={s.header}>
          <Heading as="h1" variant="display" className={s.title}>{product.name}</Heading>
          <Text variant="muted" className={s.price}>{formatPrice(product.price)}</Text></div>
        <Text className={s.description}>{product.description}</Text>
        <hr className={s.divider} />
        <AddToCartForm product={product} />
      </div>
    </Container>
  );
}
