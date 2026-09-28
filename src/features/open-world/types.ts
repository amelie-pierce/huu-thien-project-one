export interface MapConfig {
  width: number;
  depth: number;
  wallHeight: number;
  wallThickness: number;
  /** Hex colors, e.g. "#e9eef4". */
  groundColor: string;
  outsideColor: string;
}

export type PlayerAnimation = 'idle' | 'walk' | 'run';

export interface PlayerModelConfig {
  /** glTF/GLB file under /public. */
  url: string;
  /** Animation group names in the file; matched exactly or by suffix (e.g. "Armature|Idle"). */
  animations: Record<PlayerAnimation, string>;
  /** Overrides PBR metallic (0 = non-metal). Omit to keep the file's value. */
  metallic?: number;
}

export interface PlayerConfig {
  spawn: { x: number; z: number };
  radius: number;
  /** The model is scaled to this height (world units). */
  height: number;
  model: PlayerModelConfig;
  walkSpeed: number;
  runSpeed: number;
  turnSpeed: number;
}

export interface CameraConfig {
  radius: number;
  minRadius: number;
  maxRadius: number;
  beta: number;
}

/** A static model (glTF/GLB under /public) used as an instanced prop. */
export interface PropModelConfig {
  url: string;
  /** Model is scaled to this height (world units) at instance scale 1. */
  height: number;
  /** Overrides PBR metallic (0 = non-metal). Omit to keep the file's value. */
  metallic?: number;
}

/** Obstacle footprint for a prop, relative to instance scale 1. */
export type PropColliderConfig =
  | { shape: 'circle'; radius: number }
  /** Box from the model's footprint, shrunk by `inset`. Forces quarter-turn rotations. */
  | { shape: 'box'; inset?: number };

/**
 * One kind of instanced prop. Kinds are placed in list order, and each one
 * avoids spots already taken, so put large props (buildings) first.
 */
export interface PropKindConfig {
  name: string;
  model: PropModelConfig;
  count: number;
  /** Own random stream per kind, so tweaking one kind doesn't move the others. */
  seed: number;
  /** Random instance scale range (inclusive). */
  scale: [min: number, max: number];
  /** "scatter" = inside the map; "backdrop" = a ring of scenery outside the walls. */
  placement: 'scatter' | 'backdrop';
  collider?: PropColliderConfig;
  /** Extra distance kept from the player spawn (added to `spawnClearRadius`). */
  spawnClearance?: number;
  /** Keep instances of this kind apart (e.g. buildings). Default false, so trees can cluster. */
  avoidOwnKind?: boolean;
  /** Casts shadows (default true). Turn off for huge far-away scenery. */
  castShadows?: boolean;
}

export interface PropsConfig {
  spawnClearRadius: number;
  kinds: PropKindConfig[];
  rocks: { count: number; seed: number };
}

export interface WorldConfig {
  map: MapConfig;
  player: PlayerConfig;
  camera: CameraConfig;
  props: PropsConfig;
}

/** Axis-aligned walkable area on the XZ plane. */
export interface WorldBounds {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

/**
 * A system runs once per frame. Add new gameplay (NPCs, collisions, pickups…)
 * by implementing this interface and registering it in `engine/createGame.ts`.
 */
export interface GameSystem {
  update(deltaSeconds: number): void;
  dispose?(): void;
}

/** Runtime debug-view toggles, controlled from the UI. */
export interface ViewSettings {
  /** Render every mesh as raw wireframe (triangle edges only). */
  wireframe: boolean;
  grid: {
    visible: boolean;
    /** World units per grid cell. */
    cellSize: number;
  };
}

export interface GameHandle {
  /** Apply the full view state; unchanged parts are no-ops. */
  applyView(view: ViewSettings): void;
  dispose(): void;
}

/** Live runtime snapshot, emitted a few times per second for the debug panel. */
export interface GameStats {
  performance: {
    fps: number;
    frameTimeMs: number;
    renderTimeMs: number;
    drawCalls: number;
  };
  scene: {
    totalMeshes: number;
    activeMeshes: number;
    totalVertices: number;
    activeTriangles: number;
    materials: number;
    lights: number;
    colliders: number;
  };
  renderer: {
    api: string;
    gpu: string;
    resolution: string;
    hardwareScaling: number;
  };
  player: {
    x: number;
    z: number;
    headingDeg: number;
    speed: number;
    running: boolean;
  };
  camera: {
    alphaDeg: number;
    betaDeg: number;
    radius: number;
  };
}

export interface GameOptions {
  onStats?: (stats: GameStats) => void;
  /** Asset download progress, 0…1. */
  onLoadProgress?: (progress: number) => void;
  /** Aborting disposes the game, including while it is still loading. */
  signal?: AbortSignal;
}
