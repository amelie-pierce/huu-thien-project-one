'use client';

import { Button, Field } from '@/components/ui';

import { SIGN_UP_FIELDS } from '../auth-fields';
import s from './auth.module.scss';
import { useAuth } from '../auth-context';
import { useState } from 'react';

export function SignUpForm() {
  const { signUp, openAuth } = useAuth();
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState('');

  // Handle input event to re-validate the confirm password field when the password changes.
  function handleInput(event: React.FormEvent<HTMLFormElement>) {
    const target = event.target as HTMLElement & { name?: string };
    if (target.name !== 'password') return;

    const confirm = event.currentTarget.elements.namedItem('confirmPassword');
    if (confirm instanceof HTMLInputElement && confirm.value) {
      confirm.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

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
      await signUp(email, password);
    } catch {
      setFormError("We couldn't create the account. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit} onInput={handleInput} noValidate>
      {formError && (
        <div className={s.formError} role="alert">
          {formError}
        </div>
      )}
      
      {SIGN_UP_FIELDS.map((field) => (
        <Field key={field.name} {...field} />
      ))}

      <Button type="submit" block loading={pending}>
        Sign Up
      </Button>

      <p className={s.switch}>
        Already have an account?{' '}
        <button type="button" className="btn-sign-link" onClick={() => openAuth('signIn')}>
          Sign In
        </button>
      </p>
    </form>
  );
}
