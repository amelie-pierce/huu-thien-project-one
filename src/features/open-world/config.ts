import type { ViewSettings, WorldConfig } from './types';

/**
 * Single source of truth for the open world.
 * Tweak values here to resize the map, change pacing, or add more props.
 */
export const WORLD_CONFIG: WorldConfig = {
  map: {
    width: 200,
    depth: 200,
    wallHeight: 4,
    wallThickness: 1,
  },
  player: {
    spawn: { x: 0, z: 0 },
    radius: 0.6,
    height: 2,
    walkSpeed: 8,
    runSpeed: 16,
    turnSpeed: 12,
  },
  camera: {
    radius: 18,
    minRadius: 8,
    maxRadius: 40,
    beta: Math.PI / 3.2,
  },
  props: {
    seed: 1337,
    trees: 180,
    rocks: 90,
    spawnClearRadius: 10,
  },
};

/** Initial debug-view state. */
export const DEFAULT_VIEW: ViewSettings = {
  wireframe: false,
  grid: { visible: false, cellSize: 10 },
};

/** Allowed range for the grid cell-size control. */
export const GRID_CELL_SIZE_RANGE = { min: 1, max: 50, step: 1 };
