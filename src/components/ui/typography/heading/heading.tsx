import type {
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react';

import { cn } from '@/utils';
import styles from './heading.module.scss';

export type HeadingVariant =
  | 'display'
  | 'section'
  | 'card';

export interface HeadingProps
  extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: HeadingVariant;
  children: ReactNode;
}

export function Heading({
  as: Component = 'h2',
  variant = 'section',
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(
        styles.heading,
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}