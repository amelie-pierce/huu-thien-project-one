/** Static obstacle footprint on the XZ plane. */
export interface CircleCollider {
  x: number;
  z: number;
  radius: number;
}

/**
 * Stores static colliders in a uniform grid so a query only checks nearby cells,
 * keeping collision cheap no matter how many props the world has.
 */
export class ColliderWorld {
  private readonly cells = new Map<string, CircleCollider[]>();
  private total = 0;

  constructor(private readonly cellSize = 8) {}

  get count(): number {
    return this.total;
  }

  add(collider: CircleCollider): void {
    this.total++;
    this.forEachCell(collider.x, collider.z, collider.radius, (key) => {
      const cell = this.cells.get(key);
      if (cell) cell.push(collider);
      else this.cells.set(key, [collider]);
    });
  }

  /** Colliders whose cells overlap the given circle (may contain false positives). */
  query(x: number, z: number, radius: number): Set<CircleCollider> {
    const result = new Set<CircleCollider>();
    this.forEachCell(x, z, radius, (key) => {
      this.cells.get(key)?.forEach((c) => result.add(c));
    });
    return result;
  }

  private forEachCell(x: number, z: number, radius: number, fn: (key: string) => void) {
    const size = this.cellSize;
    const minX = Math.floor((x - radius) / size);
    const maxX = Math.floor((x + radius) / size);
    const minZ = Math.floor((z - radius) / size);
    const maxZ = Math.floor((z + radius) / size);
    for (let cx = minX; cx <= maxX; cx++) {
      for (let cz = minZ; cz <= maxZ; cz++) fn(`${cx},${cz}`);
    }
  }
}
