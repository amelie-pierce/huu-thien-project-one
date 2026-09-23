'use client';

import { Checkbox, Heading, Input, Radio } from '@/components/ui';

import { CardIcon } from '@/components/ui/icons';
import type { CheckoutValues } from '../types';
import type { Errors } from '@/lib/validators';
import s from './checkout.module.scss';
import { savedCards } from '../api';

type Props = {
  values: CheckoutValues;
  errors: Errors<CheckoutValues>;
  onChange: (field: keyof CheckoutValues) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  method: string;
  onMethodChange: (method: string) => void;
  sameAsShipping: boolean;
  onSameAsShippingChange: (value: boolean) => void;
};

export const NEW_CARD = 'new-card';

export function PaymentSection({
  values,
  errors,
  onChange,
  method,
  onMethodChange,
  sameAsShipping,
  onSameAsShippingChange,
}: Props) {
  return (
    <section className={s.section} aria-labelledby="payment-title">
      <Heading id="payment-title" className={s.sectionTitle}>
        Payment
      </Heading>

      <div className={s.cards}>
        {savedCards.map((card) => (
          <Radio
            key={card.id}
            name="payment-method"
            value={card.id}
            checked={method === card.id}
            onChange={() => onMethodChange(card.id)}
            className={s.card}
          >
            <CardIcon size={25} />
            <span className={s.cardDetails}>
              <span className={s.cardName}>
                {card.brand} * {card.last4}
              </span>
              <span className={s.cardMeta}>Expire {card.expiry}</span>
            </span>
          </Radio>
        ))}
        <Radio
          name="payment-method"
          value={NEW_CARD}
          checked={method === NEW_CARD}
          onChange={() => onMethodChange(NEW_CARD)}
          className={s.newCard}
        >
          <span>Add a new card</span>
        </Radio>
      </div>

      {method === NEW_CARD && (
        <div className={s.stack}>
          <Input
            label="Full name on card"
            placeholder="Placeholder"
            value={values.cardName}
            onChange={onChange('cardName')}
            error={errors.cardName}
          />
          <Input
            label="Card number"
            placeholder="Placeholder"
            inputMode="numeric"
            value={values.cardNumber}
            onChange={onChange('cardNumber')}
            error={errors.cardNumber}
          />
          <div className={s.row2}>
            <Input
              label="Expiration date"
              placeholder="MM/YY"
              value={values.expiry}
              onChange={onChange('expiry')}
              error={errors.expiry}
            />
            <Input
              label="CVV"
              placeholder="Placeholder"
              inputMode="numeric"
              value={values.cvv}
              onChange={onChange('cvv')}
              error={errors.cvv}
            />
          </div>
          <Checkbox
            label="Use shipping address as billing address"
            checked={sameAsShipping}
            onChange={(event) => onSameAsShippingChange(event.target.checked)}
          />
        </div>
      )}
    </section>
  );
}
