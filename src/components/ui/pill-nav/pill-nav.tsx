import Link from 'next/link';
import { cn } from '@/lib/cn';
import s from './pill-nav.module.scss';

export type PillNavItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: number;
  avatar?: string;
};

type Props = {
  items: PillNavItem[];
  label: string;
  className?: string;
};

function ItemContent({ item }: { item: PillNavItem }) {
  return (
    <>
      <span className={s.icon} aria-hidden>
        {item.avatar ? <span className={s.avatar}>{item.avatar}</span> : item.icon}
        {!!item.badge && <span className={s.badge}>{item.badge > 99 ? '99+' : item.badge}</span>}
      </span>
      <span className={s.label}>
        <span>{item.label}</span>
      </span>
    </>
  );
}

export function PillNav({ items, label, className }: Props) {
  return (
    <nav className={cn(s.nav, className)} aria-label={label}>
      {items.map((ghost) => (
        <ul key={ghost.key} className={cn(s.list, s.ghost)} aria-hidden>
          {items.map((item) => (
            <li key={item.key}>
              <span className={s.item} data-active={item.key === ghost.key || undefined}>
                <ItemContent item={item} />
              </span>
            </li>
          ))}
        </ul>
      ))}
      <ul className={s.list}>
        {items.map((item) => {
          const props = {
            className: s.item,
            'data-active': item.active || undefined,
            'aria-current': item.active ? ('page' as const) : undefined,
          };

          return (
            <li key={item.key}>
              {item.href ? (
                <Link
                  href={item.href}
                  transitionTypes={item.href.startsWith('#') ? undefined : ['slide-in']}
                  onClick={item.onClick}
                  {...props}
                >
                  <ItemContent item={item} />
                </Link>
              ) : item.onClick ? (
                <button type="button" onClick={item.onClick} {...props}>
                  <ItemContent item={item} />
                </button>
              ) : (
                <span {...props}>
                  <ItemContent item={item} />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
