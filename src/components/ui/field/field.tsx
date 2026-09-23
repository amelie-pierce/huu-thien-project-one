'use client';

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
  validate?: (value: string) => string;
  span?: 2 | 3 | "full";
};

export function Field({ label, messages, validate, name, span, ...input }: FieldConfig) {
  const [error, setError] = useState('');
  const id = `field-${name}`;

  function syncCustomError(el: HTMLInputElement) {
    if (validate) el.setCustomValidity(el.value ? validate(el.value) : '');
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
      <input
        id={id}
        name={name}
        className={s.input}
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
      {error && (
        <span id={`${id}-error`} className={s.error}>
          {error}
        </span>
      )}
    </div>
  );
}
