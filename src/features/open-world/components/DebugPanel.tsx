'use client';

import { useEffect, useState } from 'react';
import { GRID_CELL_SIZE_RANGE } from '../config';
import type { GameStats, ViewSettings, WorldBounds, WorldConfig } from '../types';
import { isEditableTarget } from '../utils/isEditableTarget';
import s from './debug-panel.module.scss';

const TOGGLE_PANEL_KEY = 'Backquote';
const TOGGLE_WIREFRAME_KEY = 'KeyM';
const TOGGLE_GRID_KEY = 'KeyG';

type Row = [label: string, value: string];
interface Section {
  title: string;
  rows: Row[];
}

const num = (n: number, digits = 2) => (Number.isInteger(n) ? String(n) : n.toFixed(digits));

/** Flattens nested config objects into `parent.child` rows, so new config keys show up automatically. */
function flatten(obj: object, prefix = ''): Row[] {
  return Object.entries(obj).flatMap(([key, value]): Row[] => {
    const label = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object') return flatten(value, label);
    return [[label, typeof value === 'number' ? num(value, 3) : String(value)]];
  });
}

function statsSections(stats: GameStats): Section[] {
  const { performance: p, scene, renderer: r, player, camera } = stats;
  return [
    {
      title: 'Performance',
      rows: [
        ['fps', num(p.fps, 0)],
        ['frame time', `${num(p.frameTimeMs)} ms`],
        ['render time', `${num(p.renderTimeMs)} ms`],
        ['draw calls', String(p.drawCalls)],
      ],
    },
    {
      title: 'Scene',
      rows: [
        ['meshes (active / total)', `${scene.activeMeshes} / ${scene.totalMeshes}`],
        ['vertices', scene.totalVertices.toLocaleString()],
        ['active triangles', scene.activeTriangles.toLocaleString()],
        ['materials', String(scene.materials)],
        ['lights', String(scene.lights)],
        ['colliders', String(scene.colliders)],
      ],
    },
    {
      title: 'Renderer',
      rows: [
        ['api', r.api],
        ['gpu', r.gpu],
        ['resolution', r.resolution],
        ['hardware scaling', num(r.hardwareScaling)],
      ],
    },
    {
      title: 'Player',
      rows: [
        ['position (x, z)', `${num(player.x)}, ${num(player.z)}`],
        ['heading', `${num(player.headingDeg, 0)}°`],
        ['speed', `${num(player.speed)} u/s`],
        ['running', player.running ? 'yes' : 'no'],
      ],
    },
    {
      title: 'Camera',
      rows: [
        ['alpha', `${num(camera.alphaDeg, 0)}°`],
        ['beta', `${num(camera.betaDeg, 0)}°`],
        ['radius', num(camera.radius)],
      ],
    },
  ];
}

function configSections(config: WorldConfig, bounds: WorldBounds): Section[] {
  return [
    ...Object.entries(config).map(([key, value]) => ({
      title: `Config · ${key}`,
      rows: flatten(value),
    })),
    { title: 'Derived · bounds', rows: flatten(bounds) },
  ];
}

function fpsTone(fps: number) {
  if (fps >= 55) return s.good;
  if (fps >= 30) return s.warn;
  return s.bad;
}

interface DebugPanelProps {
  stats: GameStats | null;
  config: WorldConfig;
  bounds: WorldBounds;
  view: ViewSettings;
  onViewChange: (update: (view: ViewSettings) => ViewSettings) => void;
}

const toggleWireframe = (v: ViewSettings): ViewSettings => ({ ...v, wireframe: !v.wireframe });
const toggleGrid = (v: ViewSettings): ViewSettings => ({
  ...v,
  grid: { ...v.grid, visible: !v.grid.visible },
});

const clampCellSize = (n: number) =>
  Math.min(GRID_CELL_SIZE_RANGE.max, Math.max(GRID_CELL_SIZE_RANGE.min, n));

/**
 * Live game stats + full config + view toggles.
 * Keys: ` toggles the panel, M toggles wireframe, G toggles the ground grid.
 */
export function DebugPanel({ stats, config, bounds, view, onViewChange }: DebugPanelProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || isEditableTarget(e.target)) return;
      if (e.code === TOGGLE_PANEL_KEY) setOpen((v) => !v);
      if (e.code === TOGGLE_WIREFRAME_KEY) onViewChange(toggleWireframe);
      if (e.code === TOGGLE_GRID_KEY) onViewChange(toggleGrid);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onViewChange]);

  const setCellSize = (value: number) => {
    if (Number.isNaN(value)) return;
    onViewChange((v) => ({ ...v, grid: { ...v.grid, cellSize: clampCellSize(value) } }));
  };

  const sections = [...(stats ? statsSections(stats) : []), ...configSections(config, bounds)];

  return (
    <aside className={s.panel} aria-label="Debug stats">
      <button
        type="button"
        className={s.header}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={stats ? fpsTone(stats.performance.fps) : undefined}>
          {stats ? `${num(stats.performance.fps, 0)} FPS` : '— FPS'}
        </span>
        <span className={s.hint}>{open ? 'hide' : 'stats'} [`]</span>
      </button>

      {open && (
        <div className={s.body}>
          <section className={s.section}>
            <h3 className={s.title}>View</h3>
            <label className={s.toggle}>
              <span>wireframe (raw mesh) [M]</span>
              <input
                type="checkbox"
                checked={view.wireframe}
                onChange={() => onViewChange(toggleWireframe)}
              />
            </label>
            <label className={s.toggle}>
              <span>ground grid [G]</span>
              <input
                type="checkbox"
                checked={view.grid.visible}
                onChange={() => onViewChange(toggleGrid)}
              />
            </label>
            <div className={s.slider}>
              <span>grid cell size</span>
              <input
                type="range"
                aria-label="Grid cell size"
                {...GRID_CELL_SIZE_RANGE}
                value={view.grid.cellSize}
                onChange={(e) => setCellSize(e.target.valueAsNumber)}
              />
              <input
                type="number"
                aria-label="Grid cell size value"
                className={s.number}
                {...GRID_CELL_SIZE_RANGE}
                value={view.grid.cellSize}
                onChange={(e) => setCellSize(e.target.valueAsNumber)}
              />
            </div>
          </section>

          {sections.map(({ title, rows }) => (
            <section key={title} className={s.section}>
              <h3 className={s.title}>{title}</h3>
              <dl className={s.rows}>
                {rows.map(([label, value]) => (
                  <div key={label} className={s.row}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      )}
    </aside>
  );
}
