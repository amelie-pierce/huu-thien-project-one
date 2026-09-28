/** Static obstacle footprints on the XZ plane. */
export interface CircleCollider {
  shape: 'circle';
  x: number;
  z: number;
  radius: number;
}

/** Axis-aligned box (half extents on X/Z). */
export interface BoxCollider {
  shape: 'box';
  x: number;
  z: number;
  halfX: number;
  halfZ: number;
}

export type Collider = CircleCollider | BoxCollider;

export interface Penetration {
  /** Unit direction to push the circle out. */
  nx: number;
  nz: number;
  depth: number;
}

/** How far a circle at (x, z) overlaps the collider, or null when it doesn't. */
export function penetration(c: Collider, x: number, z: number, radius: number): Penetration | null {
  if (c.shape === 'circle') {
    const dx = x - c.x;
    const dz = z - c.z;
    const minDist = radius + c.radius;
    const distSq = dx * dx + dz * dz;
    if (distSq >= minDist * minDist) return null;
    const dist = Math.sqrt(distSq);
    // Exactly centered on the obstacle: pick any direction to escape.
    if (dist < 1e-6) return { nx: 1, nz: 0, depth: minDist };
    return { nx: dx / dist, nz: dz / dist, depth: minDist - dist };
  }

  // Closest point on the box to the circle center.
  const lx = x - c.x;
  const lz = z - c.z;
  const qx = Math.max(-c.halfX, Math.min(c.halfX, lx));
  const qz = Math.max(-c.halfZ, Math.min(c.halfZ, lz));
  const dx = lx - qx;
  const dz = lz - qz;
  const distSq = dx * dx + dz * dz;

  if (distSq > 1e-12) {
    if (distSq >= radius * radius) return null;
    const dist = Math.sqrt(distSq);
    return { nx: dx / dist, nz: dz / dist, depth: radius - dist };
  }

  // Center is inside the box: exit through the nearest face.
  const exitX = c.halfX - Math.abs(lx);
  const exitZ = c.halfZ - Math.abs(lz);
  return exitX < exitZ
    ? { nx: lx >= 0 ? 1 : -1, nz: 0, depth: exitX + radius }
    : { nx: 0, nz: lz >= 0 ? 1 : -1, depth: exitZ + radius };
}

function extent(c: Collider): { x: number; z: number } {
  return c.shape === 'circle' ? { x: c.radius, z: c.radius } : { x: c.halfX, z: c.halfZ };
}

/**
 * Stores static colliders in a uniform grid so a query only checks nearby cells,
 * keeping collision cheap no matter how many props the world has.
 */
export class ColliderWorld {
  private readonly cells = new Map<string, Collider[]>();
  private total = 0;

  constructor(private readonly cellSize = 8) {}

  get count(): number {
    return this.total;
  }

  add(collider: Collider): void {
    this.total++;
    const e = extent(collider);
    this.forEachCell(collider.x, collider.z, e.x, e.z, (key) => {
      const cell = this.cells.get(key);
      if (cell) cell.push(collider);
      else this.cells.set(key, [collider]);
    });
  }

  /** Colliders whose cells overlap the given circle (may contain false positives). */
  query(x: number, z: number, radius: number): Set<Collider> {
    const result = new Set<Collider>();
    this.forEachCell(x, z, radius, radius, (key) => {
      this.cells.get(key)?.forEach((c) => result.add(c));
    });
    return result;
  }

  /** True when a circle at (x, z) touches any collider. */
  overlaps(x: number, z: number, radius: number): boolean {
    for (const c of this.query(x, z, radius)) {
      if (penetration(c, x, z, radius)) return true;
    }
    return false;
  }

  private forEachCell(x: number, z: number, ex: number, ez: number, fn: (key: string) => void) {
    const size = this.cellSize;
    const minX = Math.floor((x - ex) / size);
    const maxX = Math.floor((x + ex) / size);
    const minZ = Math.floor((z - ez) / size);
    const maxZ = Math.floor((z + ez) / size);
    for (let cx = minX; cx <= maxX; cx++) {
      for (let cz = minZ; cz <= maxZ; cz++) fn(`${cx},${cz}`);
    }
  }
}
