'use client';

import { EyeIcon, EyeOffIcon } from '@/components/ui/icons';
import { useId, useState } from 'react';

import { cn } from '@/lib/cn';
import s from './input.module.scss';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
};

export function Input({ label, error, className, id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className={cn(s.field, className)}>
      {label && (
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={s.input}
        data-invalid={error ? true : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && (
        <p id={errorId} className={s.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export function PasswordInput({ label, error, className, id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(s.field, className)}>
      {label && (
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
      )}
      <div className={s.inputWrap}>
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          className={cn(s.input, s.inputWithAction)}
          data-invalid={error ? true : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        <button
          type="button"
          className={s.action}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </button>
      </div>
      {error && (
        <p id={errorId} className={s.error}>
          {error}
        </p>
      )}
    </div>
  );
}
