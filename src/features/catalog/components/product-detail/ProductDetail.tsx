'use client';

import { Container, Heading, Text } from '@/components/ui';

import { AddToCartForm } from '../add-to-cart-form/AddToCartForm';
import { Product } from '../../types';
import { ProductCardMedia } from '../product-card-media/ProductCardMedia';
import { formatPrice } from '@/lib/format';
import s from './product-detail.module.scss';
import { useState } from 'react';

export function ProductDetail({ product }: { product: Product }) {
  const [price, setPrice] = useState(product.price);
  return (
    <Container className={s.detail}>
      <ProductCardMedia product={product}></ProductCardMedia>
      <div className={s.info}>
        <div className={s.header}>
          <Heading as="h1" variant="display" className={s.title}>
            {product.name}
          </Heading>
          <Text variant="muted" className={s.price}>
            {formatPrice(price)}
          </Text>
        </div>
        <Text className={s.description}>{product.description}</Text>
        <hr className={s.divider} />
        <AddToCartForm product={product} onSizeChange={setPrice} />
      </div>
    </Container>
  );
}
