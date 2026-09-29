'use client';

import { useEffect, useState } from 'react';
import { isEditableTarget } from '../utils/isEditableTarget';
import s from './open-world.module.scss';

const TOGGLE_KEY = 'KeyH';

const CONTROLS = [
  { keys: ['W', 'A', 'S', 'D'], label: 'or arrow keys to move' },
  { keys: ['Shift'], label: 'run' },
  { keys: ['Drag'], label: 'orbit camera' },
  { keys: ['Wheel'], label: 'zoom' },
  { keys: ['H'], label: 'toggle this guide' },
  { keys: ['`'], label: 'toggle stats' },
  { keys: ['M'], label: 'toggle wireframe' },
  { keys: ['G'], label: 'toggle ground grid' },
  { keys: ['N'], label: 'toggle falling snow' },
];

/** Keyboard/mouse guide. Open by default; toggle with H or the header button. */
export function ControlsHud() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || isEditableTarget(e.target)) return;
      if (e.code === TOGGLE_KEY) setOpen((v) => !v);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className={s.hud}>
      <button
        type="button"
        className={s.hudHeader}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>Controls</span>
        <span className={s.hudHint}>{open ? 'hide' : 'show'} [H]</span>
      </button>

      {open && (
        <ul className={s.hudList} aria-label="Controls">
          {CONTROLS.map(({ keys, label }) => (
            <li key={label} className={s.hudRow}>
              {keys.map((k) => (
                <kbd key={k} className={s.key}>
                  {k}
                </kbd>
              ))}
              <span>{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
