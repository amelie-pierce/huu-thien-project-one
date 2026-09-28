import Link from 'next/link';
import { MODEL_CREDITS } from '../credits';
import s from './credits.module.scss';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Credits() {
  return (
    <main className={s.page}>
      <div className={s.card}>
        <nav className={s.nav} aria-label="Credits navigation">
          <Link href="/open-world" className={s.navLink}>
            ← Back to game
          </Link>
          <Link href="/menu" className={s.navLink}>
            Menu
          </Link>
        </nav>

        <h1 className={s.title}>Credits</h1>
        <p className={s.intro}>
          The open world uses these 3D models. Thank you to their authors for sharing them.
        </p>

        <h2 className={s.heading}>Models</h2>
        <ul className={s.list}>
          {MODEL_CREDITS.map(({ title, author, license, source }) => (
            <li key={source.url} className={s.item}>
              <span className={s.model}>{title}</span> by {author}{' '}
              <span className={s.meta}>
                [
                <a href={license.url} className={s.link} {...external}>
                  {license.name}
                </a>
                ] via{' '}
                <a href={source.url} className={s.link} {...external}>
                  {source.name}
                </a>
              </span>
            </li>
          ))}
        </ul>

        <p className={s.footnote}>Built with Babylon.js.</p>
      </div>
    </main>
  );
}
