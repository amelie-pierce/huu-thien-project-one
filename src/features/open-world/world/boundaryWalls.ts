import { Color3 } from '@babylonjs/core/Maths/math.color';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import type { Scene } from '@babylonjs/core/scene';
import type { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import type { MapConfig, WorldBounds } from '../types';

/** Visual walls on the edge of the map. The actual blocking is done by BoundarySystem. */
export function createBoundaryWalls(
  scene: Scene,
  map: MapConfig,
  bounds: WorldBounds,
  shadows: ShadowGenerator,
) {
  const mat = new StandardMaterial('wall-mat', scene);
  mat.diffuseColor = new Color3(0.55, 0.45, 0.35);
  mat.specularColor = Color3.Black();

  const { wallHeight: h, wallThickness: t } = map;
  const y = h / 2;
  const walls = [
    { name: 'wall-north', w: map.width + t * 2, d: t, x: 0, z: bounds.maxZ + t / 2 },
    { name: 'wall-south', w: map.width + t * 2, d: t, x: 0, z: bounds.minZ - t / 2 },
    { name: 'wall-east', w: t, d: map.depth, x: bounds.maxX + t / 2, z: 0 },
    { name: 'wall-west', w: t, d: map.depth, x: bounds.minX - t / 2, z: 0 },
  ].map(({ name, w, d, x, z }) => {
    const wall = MeshBuilder.CreateBox(name, { width: w, height: h, depth: d }, scene);
    wall.position.set(x, y, z);
    wall.material = mat;
    wall.receiveShadows = true;
    shadows.addShadowCaster(wall);
    return wall;
  });

  return { walls };
}
