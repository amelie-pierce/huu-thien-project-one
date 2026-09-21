import type { ComponentPropsWithoutRef, ElementType } from 'react';

import { cn } from '@/lib/cn';
import styles from './card.module.scss';

type CardProps<T extends ElementType = 'div'> = {
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function Card<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: CardProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn(styles.card, className)}
      {...props}
    >
      {children}
    </Component>
  );
}