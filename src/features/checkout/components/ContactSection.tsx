'use client';

import { Heading, Input, Text } from '@/components/ui';

import type { CheckoutValues } from '@/features/checkout/types';
import { Errors } from '@/lib/validators';
import s from './checkout.module.scss';

type Props = {
  values: CheckoutValues;
  errors: Errors<CheckoutValues>;
  onChange: (field: keyof CheckoutValues) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ContactSection({ values, errors, onChange }: Props) {
  return (
    <section className={s.section} aria-labelledby="contact-title">
      <Heading id="contact-title" className={s.sectionTitle}>
        Contact
        <Text size='sm'>
          Checking out as a guest? Enter your email to receive your order confirmation. <br />
          Already have an account? Sign in.
        </Text>
      </Heading>

      {/* TODO: Handle user */}

      <Input
        label="Email"
        type="email"
        placeholder="name@email.com"
        value={values.email}
        onChange={onChange('email')}
        error={errors.email}
      />
    </section>
  );
}
