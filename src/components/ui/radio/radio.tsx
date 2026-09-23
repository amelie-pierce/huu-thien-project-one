'use client';

import { cn } from '@/lib/cn';
import s from './radio.module.scss';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  children: React.ReactNode;
  className?: string;
};

export function Radio({ children, className, checked, ...rest }: Props) {
  return (
    <label className={cn(s.wrap, className)} data-selected={checked || undefined}>
      <input type="radio" className={s.radio} checked={checked} {...rest} />
      <span className={s.radioCustom} aria-hidden="true" />
      {children}
    </label>
  );
}
