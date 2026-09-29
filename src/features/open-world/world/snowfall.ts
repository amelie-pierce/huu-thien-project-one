import { Color4 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture';
import { ParticleSystem } from '@babylonjs/core/Particles/particleSystem';
import type { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import type { Scene } from '@babylonjs/core/scene';
import '@babylonjs/core/Particles/particleSystemComponent';
import type { GameSystem, SnowConfig } from '../types';

/** Soft round flake drawn in code, so no texture file is needed. */
function createFlakeTexture(scene: Scene): DynamicTexture {
  const size = 64;
  const texture = new DynamicTexture('snowflake', { width: size, height: size }, scene, false);
  const ctx = texture.getContext();
  const r = size / 2;
  const gradient = ctx.createRadialGradient(r, r, 0, r, r, r);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  texture.hasAlpha = true;
  texture.update();
  return texture;
}

/**
 * Falling snow in a box that follows the player, so it's always snowing where
 * you look without filling the whole map. Flakes are emitted in world space,
 * so they keep falling naturally while the player moves.
 */
export class Snowfall implements GameSystem {
  private readonly system: ParticleSystem;
  private readonly emitter = new Vector3();
  // Own flag: after stop(), Babylon still reports "started" until the last flake lands.
  private enabled = false;

  constructor(
    scene: Scene,
    private readonly follow: TransformNode,
    private readonly config: SnowConfig
  ) {
    const { area, height, flakeSize, fallSpeed, rate } = config;
    const lifetime = height / fallSpeed[0]; // slowest flake still reaches the ground
    const system = new ParticleSystem('snow', Math.ceil(rate * lifetime), scene);
    // One particle time unit = one second, so config speeds/lifetimes are real seconds.
    system.updateSpeed = 1 / 60;

    system.particleTexture = createFlakeTexture(scene);
    system.emitter = this.emitter;
    const half = area / 2;
    // Slight sideways drift; mostly straight down.
    system.createBoxEmitter(
      new Vector3(-0.15, -1, -0.15),
      new Vector3(0.15, -1, 0.15),
      new Vector3(-half, 0, -half),
      new Vector3(half, 0, half)
    );

    system.emitRate = rate;
    system.minEmitPower = fallSpeed[0];
    system.maxEmitPower = fallSpeed[1];
    system.minLifeTime = lifetime;
    system.maxLifeTime = lifetime;
    system.minSize = flakeSize[0];
    system.maxSize = flakeSize[1];
    system.minAngularSpeed = -1;
    system.maxAngularSpeed = 1;
    // Fade in at the top and out at the end; fully visible in between.
    const clear = new Color4(1, 1, 1, 0);
    const flake = new Color4(1, 1, 1, 0.9);
    system.addColorGradient(0, clear);
    system.addColorGradient(0.05, flake);
    system.addColorGradient(0.95, flake);
    system.addColorGradient(1, clear);
    system.blendMode = ParticleSystem.BLENDMODE_STANDARD;
    system.applyFog = true;
    system.isLocal = false;

    // Start with the air already full of flakes instead of a first wave.
    system.preWarmStepOffset = 10;
    system.preWarmCycles = Math.ceil(lifetime / (system.updateSpeed * system.preWarmStepOffset));

    this.system = system;
    this.update();
  }

  /** Flakes currently in the air. */
  get activeCount(): number {
    return this.system.getActiveCount();
  }

  setEnabled(enabled: boolean): void {
    if (enabled === this.enabled) return;
    this.enabled = enabled;
    // Stopping only halts new flakes; the ones in the air finish falling.
    if (enabled) this.system.start();
    else this.system.stop();
  }

  update(): void {
    const p = this.follow.position;
    this.emitter.set(p.x, p.y + this.config.height, p.z);
  }

  dispose(): void {
    this.system.dispose();
  }
}
