'use client';

import { ADDRESS_FIELDS } from '../fields';
import { DELIVERY_FIELDS } from '../fields';
import { Field } from '@/components/ui/field/field';
import { Heading } from '@/components/ui';
import { cn } from '@/lib/cn';
import s from './checkout.module.scss';

export function DeliverySection() {
  return (
    <section className={s.section} aria-labelledby="delivery-title">
      <Heading id="delivery-title" className={s.sectionTitle}>
        Delivery
      </Heading>

      <div className={s.grid}>
        {DELIVERY_FIELDS.map((field) => (
          <Field key={field.name} {...field} />
        ))}
      </div>

      <fieldset className={s.fieldset}>
        <legend className={s.legend}>Shipping Address</legend>
        <div className={cn(s.grid3, s.stack)}>
          {ADDRESS_FIELDS.map((field) => (
            <Field key={field.name} {...field} />
          ))}
        </div>
      </fieldset>
    </section>
  );
}
