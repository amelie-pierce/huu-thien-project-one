'use client';

import { Button, Field, Text } from '@/components/ui';

import { SIGN_IN_FIELDS } from '../auth-fields';
import s from './auth.module.scss';
import { useAuth } from '../auth-context';
import { useState } from 'react';

export function SignInForm() {
  const { signIn, openAuth } = useAuth();
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.querySelector<HTMLElement>(':invalid')?.focus();
      return;
    }

    const { email, password } = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setPending(true);
    setFormError('');
    try {
      await signIn(email, password);
    } catch {
      setFormError('Email or password is incorrect');
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <form className={s.formWrap} onSubmit={handleSubmit} noValidate>
        <div className={s.form}>
          {formError && (
            <div className={s.formError} role="alert">
              {formError}
            </div>
          )}
          {SIGN_IN_FIELDS.map((field) => (
            <Field key={field.name} {...field} />
          ))}
          <Button type="submit" block loading={pending}>
            Sign In
          </Button>
        </div>
      </form>
      <Text className={s.switch}>
        Don&apos;t have an account?{' '}
        <button type="button" className="btn-sign-link" onClick={() => openAuth('signUp')}>
          Sign Up
        </button>
      </Text>
    </>
  );
}
