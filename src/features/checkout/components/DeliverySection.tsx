'use client';

import { Heading, Input } from '@/components/ui';

import type { CheckoutValues } from '../types';
import type { Errors } from '@/lib/validators';
import s from './checkout.module.scss';

type Props = {
  values: CheckoutValues;
  errors: Errors<CheckoutValues>;
  onChange: (field: keyof CheckoutValues) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function DeliverySection({ values, errors, onChange }: Props) {
  return (
    <section className={s.section} aria-labelledby="delivery-title">
      <Heading id="delivery-title" className={s.sectionTitle}>
        Delivery
      </Heading>

      <div className={s.row2}>
        <Input
          label="Name"
          placeholder="Name"
          value={values.name}
          onChange={onChange('name')}
          error={errors.name}
        />
        <Input
          label="Phone"
          placeholder="Phone"
          inputMode="tel"
          value={values.phone}
          onChange={onChange('phone')}
          error={errors.phone}
        />
      </div>

      <fieldset className={s.fieldset}>
        <legend className={s.legend}>Shipping Address</legend>
        <div className={s.stack}>
          <Input
            label="Country"
            placeholder="Country"
            value={values.country}
            onChange={onChange('country')}
            error={errors.country}
          />
          <Input
            label="Address line 1"
            placeholder="Address line 1"
            value={values.address1}
            onChange={onChange('address1')}
            error={errors.address1}
          />
          <Input
            label="Address line 2 (optional)"
            placeholder="Address line 2"
            value={values.address2}
            onChange={onChange('address2')}
          />
          <div className={s.row3}>
            <Input
              label="City"
              placeholder="City"
              value={values.city}
              onChange={onChange('city')}
              error={errors.city}
            />
            <Input
              label="State"
              placeholder="State"
              value={values.state}
              onChange={onChange('state')}
              error={errors.state}
            />
            <Input
              label="Postal code"
              placeholder="Postal code"
              value={values.postalCode}
              onChange={onChange('postalCode')}
              error={errors.postalCode}
            />
          </div>
        </div>
      </fieldset>
    </section>
  );
}
