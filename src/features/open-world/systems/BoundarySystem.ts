import type { Player } from '../entities/player';
import type { GameSystem, WorldBounds } from '../types';
import { clampToBounds } from '../world/bounds';

/** Keeps the player inside the map. Runs after movement each frame. */
export class BoundarySystem implements GameSystem {
  constructor(
    private readonly player: Player,
    private readonly bounds: WorldBounds,
  ) {}

  update(): void {
    const pos = this.player.root.position;
    const clamped = clampToBounds(pos.x, pos.z, this.bounds, this.player.radius);
    pos.x = clamped.x;
    pos.z = clamped.z;
  }
}
