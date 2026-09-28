import type { Player } from '../entities/player';
import type { GameSystem } from '../types';
import { type ColliderWorld, penetration } from '../world/colliders';

/** A few passes settle the player when touching several obstacles at once. */
const ITERATIONS = 3;

/**
 * Pushes the player out of static obstacles after movement. Only the overlapping
 * part is removed, so the player slides along obstacles instead of sticking.
 */
export class CollisionSystem implements GameSystem {
  constructor(
    private readonly player: Player,
    private readonly colliders: ColliderWorld
  ) {}

  update(): void {
    const pos = this.player.root.position;
    const radius = this.player.radius;

    for (let i = 0; i < ITERATIONS; i++) {
      let resolved = true;

      for (const c of this.colliders.query(pos.x, pos.z, radius)) {
        const hit = penetration(c, pos.x, pos.z, radius);
        if (!hit) continue;
        pos.x += hit.nx * hit.depth;
        pos.z += hit.nz * hit.depth;
        resolved = false;
      }

      if (resolved) break;
    }
  }
}
