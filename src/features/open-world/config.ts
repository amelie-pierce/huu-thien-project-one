import type { ViewSettings, WorldConfig } from './types';

const MODELS = '/models/CUTESPartOne';

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
    groundColor: '#e9eef4', // snow
    outsideColor: '#c9d3de',
  },
  player: {
    spawn: { x: 0, z: 0 },
    radius: 0.6,
    height: 2,
    model: {
      url: '/models/CUTESPartOne/Santa Claus.glb',
      animations: { idle: 'Idle', walk: 'Walk', run: 'Sprint' },
      // FBX-converted file sets a fake 0.4 metallic, which looks dark without an env map.
      metallic: 0,
    },
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
    spawnClearRadius: 10,
    // Placed in order; later kinds avoid earlier ones.
    kinds: [
      {
        name: 'chalet',
        model: { url: `${MODELS}/Chalet by Poly by Google.glb`, height: 9 },
        count: 5,
        seed: 2024,
        scale: [0.9, 1.1],
        placement: 'scatter',
        collider: { shape: 'box', inset: 0.5 },
        spawnClearance: 12,
        avoidOwnKind: true,
      },
      {
        name: 'tree',
        // FBX-converted files set a fake 0.4 metallic, which looks dark without an env map.
        model: { url: `${MODELS}/Tree Long by J-Toastie - jRrIzWtLRm.glb`, height: 6, metallic: 0 },
        count: 180,
        seed: 1337,
        scale: [0.8, 1.4],
        placement: 'scatter',
        collider: { shape: 'circle', radius: 0.5 },
      },
      {
        name: 'pine',
        model: { url: `${MODELS}/Pine Tree with Snow by Chris Lee.glb`, height: 5 },
        count: 140,
        seed: 4242,
        scale: [0.7, 1.5],
        placement: 'scatter',
        // Branches start low, so block wider than the trunk.
        collider: { shape: 'circle', radius: 1 },
      },
      {
        name: 'snowman',
        model: { url: `${MODELS}/Snowman.glb`, height: 1.8, metallic: 0 },
        count: 14,
        seed: 9001,
        scale: [0.9, 1.2],
        placement: 'scatter',
        collider: { shape: 'circle', radius: 0.6 },
      },
      {
        name: 'mountain',
        model: { url: `${MODELS}/Mountain with Snow by Matthew Creighton.glb`, height: 35 },
        count: 14,
        seed: 77,
        scale: [0.7, 1.4],
        placement: 'backdrop',
        castShadows: false,
      },
    ],
    rocks: { count: 90, seed: 7331 },
  },
  snow: {
    rate: 700,
    area: 90,
    height: 30,
    flakeSize: [0.08, 0.22],
    fallSpeed: [3, 3.6], // narrow range: faster flakes would outlive the fall and end up underground
  },
};

/** Initial debug-view state. */
export const DEFAULT_VIEW: ViewSettings = {
  wireframe: false,
  snow: true,
  grid: { visible: false, cellSize: 10 },
};

/** Allowed range for the grid cell-size control. */
export const GRID_CELL_SIZE_RANGE = { min: 1, max: 50, step: 1 };
