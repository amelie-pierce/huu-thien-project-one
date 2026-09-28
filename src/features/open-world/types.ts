export interface MapConfig {
  width: number;
  depth: number;
  wallHeight: number;
  wallThickness: number;
}

export interface PlayerConfig {
  spawn: { x: number; z: number };
  radius: number;
  height: number;
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

export interface PropsConfig {
  seed: number;
  trees: number;
  rocks: number;
  spawnClearRadius: number;
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
}
