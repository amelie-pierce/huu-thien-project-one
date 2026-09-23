'use client';

import { Checkbox, Field, Heading, Radio } from '@/components/ui';

import { CardIcon } from '@/components/ui/icons';
import { NEW_CARD_FIELDS } from '../fields';
import s from './checkout.module.scss';
import { savedCards } from '../api';

type Props = {
  method: string;
  onMethodChange: (method: string) => void;
};

export const NEW_CARD = 'new-card';

export function PaymentSection({ method, onMethodChange }: Props) {
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
          <div className={s.grid3}>
            {NEW_CARD_FIELDS.map((field) => (
              <Field key={field.name} {...field} />
            ))}
          </div>
          <Checkbox
            className={s.checkboxWrap}
            label="Use shipping address as billing address"
            name="sameAsShipping"
            defaultChecked
          />
        </div>
      )}
    </section>
  );
}
