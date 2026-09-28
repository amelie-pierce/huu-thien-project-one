import type { MapConfig, WorldBounds } from '../types';

/** Map is centered on the origin. */
export function computeBounds(map: MapConfig): WorldBounds {
  const halfW = map.width / 2;
  const halfD = map.depth / 2;
  return { minX: -halfW, maxX: halfW, minZ: -halfD, maxZ: halfD };
}

export function clampToBounds(
  x: number,
  z: number,
  bounds: WorldBounds,
  padding = 0,
): { x: number; z: number } {
  return {
    x: Math.min(Math.max(x, bounds.minX + padding), bounds.maxX - padding),
    z: Math.min(Math.max(z, bounds.minZ + padding), bounds.maxZ - padding),
  };
}
