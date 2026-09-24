import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from '../icons';

import Link from 'next/link';
import s from './pagination.module.scss';

type Props = {
  page: number;
  total: number;
  getHref: (page: number) => string;
};

export function Pagination({ page, total, getHref }: Props) {
  if (total <= 1) return null;

  const first = page === 1;
  const last = page === total;

  return (
    <nav className={s.pagination} aria-label="Pagination">
      <div className={s.arrows}>
        <Arrow href={getHref(1)} disabled={first} label="First page">
          <ChevronsLeftIcon size={25} />
        </Arrow>
        <Arrow href={getHref(page - 1)} disabled={first} label="Previous page">
          <ChevronLeftIcon size={25} />
        </Arrow>
      </div>

      {getPageItems(page, total).map((item, i) =>
        item === '…' ? (
          <span key={i} className={s.item}>
            …
          </span>
        ) : (
          <Link
            key={i}
            href={getHref(item)}
            className={s.item}
            aria-current={item === page ? 'page' : undefined}
          >
            {item}
          </Link>
        )
      )}

      <div className={s.arrows}>
        <Arrow href={getHref(page + 1)} disabled={last} label="Next page">
          <ChevronRightIcon size={25} />
        </Arrow>
        <Arrow href={getHref(total)} disabled={last} label="Last page">
          <ChevronsRightIcon size={25} />
        </Arrow>
      </div>
    </nav>
  );
}

type ArrowProps = { href: string; disabled: boolean; label: string; children: React.ReactNode };

function Arrow({ href, disabled, label, children }: ArrowProps) {
  return disabled ? (
    <span className={s.arrow} data-disabled>
      {children}
    </span>
  ) : (
    <Link href={href} className={s.arrow} aria-label={label}>
      {children}
    </Link>
  );
}

function getPageItems(page: number, total: number): (number | '…')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, '…', total];
  if (page >= total - 2) return [1, '…', total - 2, total - 1, total];
  return [1, '…', page, '…', total];
}

export function clampPage(value: unknown, total: number) {
  const page = Number(value);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.min(Math.floor(page), Math.max(total, 1));
}
