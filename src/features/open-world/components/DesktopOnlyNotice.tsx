import Link from 'next/link';
import s from './desktop-only-notice.module.scss';

interface DesktopOnlyNoticeProps {
  onContinue: () => void;
}

/** Shown on touch devices instead of loading the game. */
export function DesktopOnlyNotice({ onContinue }: DesktopOnlyNoticeProps) {
  return (
    <div className={s.backdrop}>
      <section
        className={s.card}
        role="alertdialog"
        aria-labelledby="desktop-only-title"
        aria-describedby="desktop-only-desc"
      >
        <h2 id="desktop-only-title" className={s.title}>
          Desktop only
        </h2>
        <p id="desktop-only-desc" className={s.text}>
          This open world is played with a keyboard and mouse, so it only supports desktop and
          laptop browsers for now. Please open this page on a computer for the best experience.
        </p>
        <div className={s.actions}>
          <Link href="/" className={s.primary}>
            Back to home
          </Link>
          <button type="button" className={s.secondary} onClick={onContinue}>
            Continue anyway
          </button>
        </div>
      </section>
    </div>
  );
}
