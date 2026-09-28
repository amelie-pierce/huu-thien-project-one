import Link from 'next/link';
import s from './promo-banner.module.scss';

export function PromoBanner() {
  return (
    <aside className={s.banner} aria-label="Promotion">
      <p className={s.text}>
        Want more coupons? Explore our open world and collect rewards along the way.{' '}
        <Link href="/open-world" className={s.link}>
          Play now →
        </Link>
      </p>
    </aside>
  );
}
