'use client';

import { useEffect, useRef } from 'react';
import { createGame } from '../engine/createGame';
import type { GameHandle, GameStats, ViewSettings } from '../types';
import s from './open-world.module.scss';

interface OpenWorldCanvasProps {
  onStats?: (stats: GameStats) => void;
  view: ViewSettings;
}

/** Owns the <canvas> and the Babylon lifecycle. Client-only (loaded with ssr: false). */
export default function OpenWorldCanvas({ onStats, view }: OpenWorldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameHandle | null>(null);
  // Latest callback without recreating the game when the prop identity changes.
  const onStatsRef = useRef(onStats);

  useEffect(() => {
    onStatsRef.current = onStats;
  }, [onStats]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = createGame(canvas, undefined, {
      onStats: (stats) => onStatsRef.current?.(stats),
    });
    gameRef.current = game;
    canvas.focus();
    return () => {
      game.dispose();
      gameRef.current = null;
    };
  }, []);

  // Declared after the create effect so it also applies the initial value on mount.
  useEffect(() => {
    gameRef.current?.applyView(view);
  }, [view]);

  return <canvas ref={canvasRef} className={s.canvas} tabIndex={0} aria-label="Open world scene" />;
}
