import type { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import type { Engine } from '@babylonjs/core/Engines/engine';
import { SceneInstrumentation } from '@babylonjs/core/Instrumentation/sceneInstrumentation';
import type { Scene } from '@babylonjs/core/scene';
import type { Player } from '../entities/player';
import type { GameStats, GameSystem } from '../types';
import type { ColliderWorld } from '../world/colliders';
import type { InputSystem } from './InputSystem';

/** How often stats are pushed to the UI. Keeps React re-renders cheap. */
const EMIT_INTERVAL_SECONDS = 0.25;

const toDeg = (rad: number) => (rad * 180) / Math.PI;

interface StatsSources {
  engine: Engine;
  scene: Scene;
  player: Player;
  camera: ArcRotateCamera;
  input: InputSystem;
  colliders: ColliderWorld;
}

/** Samples engine/scene/player state and emits a throttled snapshot. Read-only. */
export class StatsSystem implements GameSystem {
  private readonly instrumentation: SceneInstrumentation;
  private readonly gpu: string;
  private elapsed = 0;
  private lastX: number;
  private lastZ: number;
  private travelled = 0;

  constructor(
    private readonly src: StatsSources,
    private readonly onStats: (stats: GameStats) => void,
  ) {
    this.instrumentation = new SceneInstrumentation(src.scene);
    this.instrumentation.captureFrameTime = true;
    this.instrumentation.captureRenderTime = true;

    const gl = src.engine.getGlInfo();
    this.gpu = gl.renderer || gl.vendor || 'unknown';

    this.lastX = src.player.root.position.x;
    this.lastZ = src.player.root.position.z;
  }

  update(dt: number): void {
    const pos = this.src.player.root.position;
    this.travelled += Math.hypot(pos.x - this.lastX, pos.z - this.lastZ);
    this.lastX = pos.x;
    this.lastZ = pos.z;

    this.elapsed += dt;
    if (this.elapsed < EMIT_INTERVAL_SECONDS) return;

    // Actual speed after collisions/bounds, averaged over the emit window.
    const speed = this.travelled / this.elapsed;
    this.elapsed = 0;
    this.travelled = 0;

    this.onStats(this.snapshot(speed));
  }

  dispose(): void {
    this.instrumentation.dispose();
  }

  private snapshot(speed: number): GameStats {
    const { engine, scene, player, camera, input, colliders } = this.src;
    const inst = this.instrumentation;

    return {
      performance: {
        fps: engine.getFps(),
        frameTimeMs: inst.frameTimeCounter.lastSecAverage,
        renderTimeMs: inst.renderTimeCounter.lastSecAverage,
        drawCalls: inst.drawCallsCounter.current,
      },
      scene: {
        totalMeshes: scene.meshes.length,
        activeMeshes: scene.getActiveMeshes().length,
        totalVertices: scene.getTotalVertices(),
        activeTriangles: Math.round(scene.getActiveIndices() / 3),
        materials: scene.materials.length,
        lights: scene.lights.length,
        colliders: colliders.count,
      },
      renderer: {
        api: engine.description,
        gpu: this.gpu,
        resolution: `${engine.getRenderWidth()}×${engine.getRenderHeight()}`,
        hardwareScaling: engine.getHardwareScalingLevel(),
      },
      player: {
        x: player.root.position.x,
        z: player.root.position.z,
        headingDeg: ((toDeg(player.root.rotation.y) % 360) + 360) % 360,
        speed,
        running: input.isRunning,
      },
      camera: {
        alphaDeg: toDeg(camera.alpha),
        betaDeg: toDeg(camera.beta),
        radius: camera.radius,
      },
    };
  }
}
