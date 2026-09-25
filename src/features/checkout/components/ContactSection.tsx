'use client';

import { Heading, Text } from '@/components/ui';

import { CONTACT_FIELDS } from '@/features/checkout/fields';
import { Field } from '@/components/ui/field/field';
import s from './checkout.module.scss';
import { useAuth } from '@/features/auth/auth-context';

export function ContactSection() {
  const { user, openAuth, signOut } = useAuth();

  return (
    <section className={s.section} aria-labelledby="contact-title">
      <Heading id="contact-title" className={s.sectionTitle}>
        Contact
        {user ? (
          <Text size="sm" className={s.subText} data-auth={user ? 'signed' : 'guest'}>
            {user.email}
            <button type="button" className="btn-sign-link" onClick={signOut}>
              <Text size="md">Sign out</Text>
            </button>
          </Text>
        ) : (
          <Text size="sm" className={s.subText}>
            Checking out as a guest? Enter your email to receive your order confirmation. <br />
            Already have an account?{' '}
            <button type="button" className="btn-sign-link semibold" onClick={() => openAuth('signIn')}>
              Sign in
            </button>
            .
          </Text>
        )}
      </Heading>

      {!user && (
        <div className={s.grid}>
        {CONTACT_FIELDS.map((field) => (
          <Field key={field.name} {...field} />
        ))}
        </div>
      )}
    </section>
  );
}
