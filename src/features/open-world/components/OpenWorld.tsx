'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { DEFAULT_VIEW, WORLD_CONFIG } from '../config';
import { useIsDesktop } from '../hooks/useIsDesktop';
import type { GameStats, ViewSettings } from '../types';
import { computeBounds } from '../world/bounds';
import { ControlsHud } from './ControlsHud';
import { DebugPanel } from './DebugPanel';
import { DesktopOnlyNotice } from './DesktopOnlyNotice';
import s from './open-world.module.scss';

// Babylon touches `window`/WebGL, so it must never run on the server.
const OpenWorldCanvas = dynamic(() => import('./OpenWorldCanvas'), {
  ssr: false,
  loading: () => <div className={s.loading}>Loading world…</div>,
});

const BOUNDS = computeBounds(WORLD_CONFIG.map);
const MENU_HREF = '/menu';

export function OpenWorld() {
  const isDesktop = useIsDesktop();
  const [continueAnyway, setContinueAnyway] = useState(false);
  const [stats, setStats] = useState<GameStats | null>(null);
  const [view, setView] = useState<ViewSettings>(DEFAULT_VIEW);

  // Device unknown until hydrated; don't flash the notice or start loading the game.
  if (isDesktop === null) return <main className={s.root} />;

  if (!isDesktop && !continueAnyway) {
    return (
      <main className={s.root}>
        <DesktopOnlyNotice onContinue={() => setContinueAnyway(true)} />
      </main>
    );
  }

  return (
    <main className={s.root}>
      <OpenWorldCanvas onStats={setStats} view={view} />
      <div className={s.topLeft}>
        <Link href={MENU_HREF} className={s.backLink}>
          ← Back to menu
        </Link>
        <ControlsHud />
      </div>
      <DebugPanel
        stats={stats}
        config={WORLD_CONFIG}
        bounds={BOUNDS}
        view={view}
        onViewChange={setView}
      />
    </main>
  );
}
