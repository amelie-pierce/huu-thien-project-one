'use client';

import { EyeIcon, EyeOffIcon } from '../icons';

import { cn } from '@/lib/cn';
import s from './field.module.scss';
import { useState } from 'react';

const VALIDITY_KEYS = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort',
  'tooLong',
  'rangeUnderflow',
  'rangeOverflow',
  'stepMismatch',
  'badInput',
  'customError',
] as const;

export type ValidityKey = (typeof VALIDITY_KEYS)[number];

export type FieldConfig = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  messages?: Partial<Record<ValidityKey, string>>;
  validate?: (value: string, form: HTMLFormElement | null) => string;
  span?: 2 | 3 | 'full';
};

export function Field({ label, type, messages, validate, name, span, ...input }: FieldConfig) {
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const id = `field-${name}`;
  const isPassword = type === 'password';

  function syncCustomError(el: HTMLInputElement) {
    if (!validate) return;
    const form = el.form ?? el.closest("form");
    el.setCustomValidity(el.value ? validate(el.value, form) : "");
  }

  function check(el: HTMLInputElement) {
    syncCustomError(el);
    const key = VALIDITY_KEYS.find((flag) => el.validity[flag]);
    setError(key ? (messages?.[key] ?? el.validationMessage) : '');
  }

  return (
    <div className={s.field} data-span={span}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <div className={s.control}>
        <input
          id={id}
          name={name}
          type={isPassword && isVisible ? 'text' : type}
          className={cn(s.input, isPassword && s.inputWithAction)}
          data-invalid={error ? true : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onBlur={(event) => check(event.currentTarget)}
          onInput={(event) => {
            const el = event.currentTarget;
            syncCustomError(el);
            if (error) check(el);
          }}
          onInvalid={(event) => check(event.currentTarget)}
          {...input}
        />
        {isPassword && (
          <button
            type="button"
            className={s.action}
            onClick={() => setIsVisible((value) => !value)}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {isVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        )}
      </div>

      {error && (
        <span id={`${id}-error`} className={s.error}>
          {error}
        </span>
      )}
    </div>
  );
}
