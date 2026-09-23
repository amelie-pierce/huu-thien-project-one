'use client';

import { Button, Text } from '@/components/ui';

import type { CartLine } from '../types';
import Image from 'next/image';
import { QuantityStepper } from '@/components/ui/quantity-stepper/quantity-stepper';
import { formatPrice } from '@/lib/format';
import s from './cart.module.scss';
import { useCart } from '../cart-context';

export function CartLineItem({ line }: { line: CartLine }) {
  const { dispatch } = useCart();

  return (
    <li className={s.line}>
      <div className={s.thumb}>
        <Image src={line.image} alt={line.name} width={34} height={36} className={s.thumbImage} />
      </div>

      <div className={s.lineBody}>
        <Text className={s.lineName}>{line.name}</Text>
        <Text className={s.lineMeta}>
          {formatPrice(line.unitPrice, { decimals: 2 })} | {line.size}
        </Text>
        <Text className={s.lineMeta}>
          Total: {formatPrice(line.unitPrice * line.qty, { decimals: 2 })}
        </Text>

        <div className={s.lineActions}>
          <QuantityStepper
            value={line.qty}
            onChange={(qty) => dispatch({ type: 'setQty', key: line.key, qty })}
            label={`Quantity for ${line.name}`}
          />
          <Button
            variant="ghost"
            type="button"
            className={s.remove}
            onClick={() => dispatch({ type: 'remove', key: line.key })}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
