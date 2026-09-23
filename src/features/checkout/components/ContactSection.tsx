'use client';

import { Heading, Text } from '@/components/ui';

import { CONTACT_FIELDS } from '@/features/checkout/fields';
import { Field } from '@/components/ui/field/field';
import s from './checkout.module.scss';
import { useAuth } from '@/features/auth/auth-context';

export function ContactSection() {
  const { openAuth } = useAuth();
  return (
    <section className={s.section} aria-labelledby="contact-title">
      <Heading id="contact-title" className={s.sectionTitle}>
        Contact
        <Text size="sm">
          Checking out as a guest? Enter your email to receive your order confirmation. <br />
          Already have an account?{' '}
          <button className="btn-sign-link semibold" onClick={() => openAuth('signIn')}>
            Sign in
          </button>
          .
        </Text>
      </Heading>

      {/* TODO: Handle user */}

      <div className={s.grid}>
        {CONTACT_FIELDS.map((field) => (
        <Field key={field.name} {...field} />
      ))}
      </div>
    </section>
  );
}
