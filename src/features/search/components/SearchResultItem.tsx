'use client';

import { Button, ChipGroup, Heading, Text } from '@/components/ui';
import { SIZES, type Product, type Size } from '@/features/catalog/types';

import Link from 'next/link';
import { ProductCardMedia } from '@/features/catalog/components/product-card-media/ProductCardMedia';
import { formatPrice } from '@/lib/format';
import s from './product-search.module.scss';
import { useState } from 'react';

type Props = {
  product: Product;
  onNavigate: () => void;
  onAdd: (product: Product, size: Size, unitPrice: number) => void;
};

export function SearchResultItem({ product, onNavigate, onAdd }: Props) {
  const options = SIZES.filter((size) => product.sizes.some((item) => item.name === size));
  const [size, setSize] = useState<Size>(options[0] ?? 'Small');
  const price = product.sizes.find((item) => item.name === size)?.price ?? product.price;

  return (
    <li className={s.item}>
      <Link
        href={`/products/${product.slug}`}
        className={s.mediaLink}
        onClick={onNavigate}
        tabIndex={-1}
        aria-hidden
      >
        <ProductCardMedia product={product} className={s.media} />
      </Link>
      <div className={s.info}>
        <Link href={`/products/${product.slug}`} onClick={onNavigate}>
          <Heading as="h3" variant="card" className={s.name}>
            {product.name}
          </Heading>
        </Link>
        <Text as="span" className={s.price}>
          {formatPrice(price)}
        </Text>
        {options.length > 0 && (
          <div className={s.sizes}>
            <ChipGroup
              label="Sizes:"
              name={`search-size-${product.id}`}
              options={options}
              value={size}
              onChange={setSize}
            />
          </div>
        )}
      </div>
      <Button size="sm" className={s.add} onClick={() => onAdd(product, size, price)}>
        Add to cart
      </Button>
    </li>
  );
}
