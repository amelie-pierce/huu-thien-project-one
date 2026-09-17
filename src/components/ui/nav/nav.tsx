import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { cn } from '@/utils';
import styles from './nav.module.scss';

type NavProps = {
  items: { label: string; href: string }[];
  type?: 'default' | 'transparent';
  className?: string;
} & ComponentPropsWithoutRef<'nav'>;

export function Nav({
  items,
  type = 'default',
  className,
  ...props
}: NavProps) {

  return (
    <nav className={cn(styles.nav, styles[type], className)} {...props}>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} transitionTypes={['slide-in']} replace={true}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}