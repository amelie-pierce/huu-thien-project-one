'use client';

import { useEffect, useRef, useState } from 'react';
import { createGame } from '../engine/createGame';
import type { GameHandle, GameStats, ViewSettings } from '../types';
import s from './open-world.module.scss';

type LoadState =
  { status: 'loading'; progress: number } | { status: 'ready' } | { status: 'error' };

interface OpenWorldCanvasProps {
  onStats?: (stats: GameStats) => void;
  view: ViewSettings;
}

/**
 * Owns the <canvas> and the Babylon lifecycle. Client-only (loaded with ssr: false).
 * Shows a loading overlay until every asset is loaded; the game only starts then.
 */
export default function OpenWorldCanvas({ onStats, view }: OpenWorldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameHandle | null>(null);
  const [load, setLoad] = useState<LoadState>({ status: 'loading', progress: 0 });
  const [attempt, setAttempt] = useState(0);

  // Latest props without recreating the game when their identity changes.
  const onStatsRef = useRef(onStats);
  const viewRef = useRef(view);
  useEffect(() => {
    onStatsRef.current = onStats;
    viewRef.current = view;
  }, [onStats, view]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const controller = new AbortController();

    createGame(canvas, undefined, {
      signal: controller.signal,
      onStats: (stats) => onStatsRef.current?.(stats),
      onLoadProgress: (progress) => {
        if (!controller.signal.aborted) setLoad({ status: 'loading', progress });
      },
    })
      .then((game) => {
        if (controller.signal.aborted) return; // already disposed via the signal
        gameRef.current = game;
        game.applyView(viewRef.current);
        setLoad({ status: 'ready' });
        canvas.focus();
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[open-world] failed to start', error);
        setLoad({ status: 'error' });
      });

    return () => {
      controller.abort(); // disposes the game, even mid-load
      gameRef.current = null;
    };
  }, [attempt]);

  useEffect(() => {
    gameRef.current?.applyView(view);
  }, [view]);

  const retry = () => {
    setLoad({ status: 'loading', progress: 0 });
    setAttempt((n) => n + 1);
  };

  return (
    <>
      <canvas
        // New canvas per attempt: a disposed engine can leave the old WebGL context unusable.
        key={attempt}
        ref={canvasRef}
        className={s.canvas}
        tabIndex={0}
        aria-label="Open world scene"
      />

      {load.status === 'loading' && (
        <div className={s.overlay} role="status" aria-live="polite">
          <p>Loading world… {Math.round(load.progress * 100)}%</p>
          <div className={s.progressTrack}>
            <div className={s.progressBar} style={{ width: `${load.progress * 100}%` }} />
          </div>
        </div>
      )}

      {load.status === 'error' && (
        <div className={s.overlay} role="alert">
          <p>Couldn&apos;t load the world. Please check your connection and try again.</p>
          <button type="button" className={s.retry} onClick={retry}>
            Retry
          </button>
        </div>
      )}
    </>
  );
}
