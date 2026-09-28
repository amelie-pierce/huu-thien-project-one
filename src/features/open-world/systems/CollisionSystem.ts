import type { Player } from '../entities/player';
import type { GameSystem } from '../types';
import type { ColliderWorld } from '../world/colliders';

/** A few passes settle the player when touching several obstacles at once. */
const ITERATIONS = 3;

/**
 * Pushes the player out of static obstacles after movement. Only the overlapping
 * part is removed, so the player slides along obstacles instead of sticking.
 */
export class CollisionSystem implements GameSystem {
  constructor(
    private readonly player: Player,
    private readonly colliders: ColliderWorld,
  ) {}

  update(): void {
    const pos = this.player.root.position;
    const radius = this.player.radius;

    for (let i = 0; i < ITERATIONS; i++) {
      let resolved = true;

      for (const c of this.colliders.query(pos.x, pos.z, radius)) {
        const dx = pos.x - c.x;
        const dz = pos.z - c.z;
        const minDist = radius + c.radius;
        const distSq = dx * dx + dz * dz;
        if (distSq >= minDist * minDist) continue;

        const dist = Math.sqrt(distSq);
        // Exactly centered on the obstacle: pick any direction to escape.
        const nx = dist > 1e-6 ? dx / dist : 1;
        const nz = dist > 1e-6 ? dz / dist : 0;
        const push = minDist - dist;
        pos.x += nx * push;
        pos.z += nz * push;
        resolved = false;
      }

      if (resolved) break;
    }
  }
}
