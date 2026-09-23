'use client';

import { Button, Heading, Text } from '@/components/ui';

import type { CartLine } from '@/features/cart/types';
import { formatPrice } from '@/lib/format';
import s from './checkout.module.scss';

type Props = {
  lines: CartLine[];
  totals: { subtotal: number; shipping: number; tax: number; total: number };
  loading: boolean;
  onPay: () => void;
};

export function OrderSummary({ lines, totals, loading, onPay }: Props) {
  return (
    <aside className={s.summary} aria-label="Order summary">
      <Heading className={s.summaryTitle}>Order Summary</Heading>

      <ul className={s.summaryLines}>
        {lines.map((line) => (
          <li key={line.key} className={s.summaryLine}>
            <div>
              <Text className={s.summaryName}>{line.name}</Text>
              <Text className={s.summaryMeta}>
                Size: {line.size} | Qty: {line.qty}
              </Text>
            </div>
            <Text className={s.unitPrice}>{formatPrice(line.unitPrice)}</Text>
          </li>
        ))}
      </ul>

      <dl className={s.totals}>
        <div className={s.totalRow}>
          <dt>Subtotal</dt>
          <dd>{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className={s.totalRow}>
          <dt>Shipping</dt>
          <dd>{totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}</dd>
        </div>
        <div className={s.totalRow}>
          <dt>Tax</dt>
          <dd>{formatPrice(totals.tax, { decimals: 2 })}</dd>
        </div>
        <div className={s.totalRow} data-total>
          <dt>Total</dt>
          <dd>{formatPrice(totals.total, { decimals: 2 })}</dd>
        </div>
      </dl>

      <Button block loading={loading} onClick={onPay}>
        Pay {formatPrice(totals.total, { decimals: 2 })}
      </Button>
    </aside>
  );
}
