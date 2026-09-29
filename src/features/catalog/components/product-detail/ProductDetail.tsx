'use client';

import { Container, ExpandableText, Heading, Text } from '@/components/ui';

import { AddToCartForm } from '../add-to-cart-form/AddToCartForm';
import { Product } from '../../types';
import { ProductCardMedia } from '../product-card-media/ProductCardMedia';
import { formatPrice } from '@/lib/format';
import s from './product-detail.module.scss';
import { useState } from 'react';

type Props = {
  product: Product;
  expandableDescription?: boolean;
};

export function ProductDetail({ product, expandableDescription }: Props) {
  const [price, setPrice] = useState(product.price);
  return (
    <Container className={s.detail}>
      <ProductCardMedia product={product} className={s.media} />
      <div className={s.info}>
        <div className={s.header}>
          <Heading as="h1" variant="display" className={s.title}>
            {product.name}
          </Heading>
          <Text variant="muted" className={s.price}>
            {formatPrice(price)}
          </Text>
        </div>
        {product.description && (
          <ExpandableText className={s.description} enabled={expandableDescription}>
            {product.description}
          </ExpandableText>
        )}
        <hr className={s.divider} />
        <AddToCartForm product={product} onSizeChange={setPrice} />
      </div>
    </Container>
  );
}
