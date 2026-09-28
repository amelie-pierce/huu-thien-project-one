import { Color4 } from '@babylonjs/core/Maths/math.color';
import { CreateLineSystem } from '@babylonjs/core/Meshes/Builders/linesBuilder';
import type { LinesMesh } from '@babylonjs/core/Meshes/linesMesh';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import type { Scene } from '@babylonjs/core/scene';
import type { WorldBounds } from '../types';

/** Lift above the ground to avoid z-fighting. */
const GRID_Y = 0.02;
const LINE_COLOR = new Color4(0.1, 0.15, 0.1, 0.35);
const X_AXIS_COLOR = new Color4(0.9, 0.2, 0.2, 0.9);
const Z_AXIS_COLOR = new Color4(0.2, 0.4, 0.95, 0.9);

/**
 * Debug grid over the playable ground. Lines sit on multiples of the cell size
 * (so the origin axes are always a line), with the X/Z axes highlighted.
 */
export class GroundGrid {
  private mesh: LinesMesh | null = null;
  private cellSize = 0;
  private visible = false;

  constructor(
    private readonly scene: Scene,
    private readonly bounds: WorldBounds,
  ) {}

  setVisible(visible: boolean): void {
    this.visible = visible;
    if (this.mesh) this.mesh.isVisible = visible;
  }

  setCellSize(size: number): void {
    if (size <= 0 || size === this.cellSize) return;
    this.cellSize = size;
    this.rebuild();
  }

  dispose(): void {
    this.mesh?.dispose();
    this.mesh = null;
  }

  private rebuild(): void {
    this.mesh?.dispose();

    const { minX, maxX, minZ, maxZ } = this.bounds;
    const size = this.cellSize;
    const lines: Vector3[][] = [];
    const colors: Color4[][] = [];

    const add = (from: Vector3, to: Vector3, color: Color4) => {
      lines.push([from, to]);
      colors.push([color, color]);
    };

    for (let x = Math.ceil(minX / size) * size; x <= maxX; x += size) {
      add(new Vector3(x, GRID_Y, minZ), new Vector3(x, GRID_Y, maxZ), x === 0 ? Z_AXIS_COLOR : LINE_COLOR);
    }
    for (let z = Math.ceil(minZ / size) * size; z <= maxZ; z += size) {
      add(new Vector3(minX, GRID_Y, z), new Vector3(maxX, GRID_Y, z), z === 0 ? X_AXIS_COLOR : LINE_COLOR);
    }

    const mesh = CreateLineSystem('ground-grid', { lines, colors, useVertexAlpha: true }, this.scene);
    mesh.isPickable = false;
    mesh.isVisible = this.visible;
    this.mesh = mesh;
  }
}
