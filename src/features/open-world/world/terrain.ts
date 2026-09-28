import { Color3 } from '@babylonjs/core/Maths/math.color';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import type { Scene } from '@babylonjs/core/scene';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import type { MapConfig } from '../types';

/** Playable ground plus a darker "outside" plane so the edge of the map reads clearly. */
export function createTerrain(scene: Scene, map: MapConfig) {
  const grassMat = new StandardMaterial('grass-mat', scene);
  grassMat.diffuseColor = new Color3(0.38, 0.62, 0.3);
  grassMat.specularColor = Color3.Black();

  const ground = MeshBuilder.CreateGround(
    'ground',
    { width: map.width, height: map.depth, subdivisions: 4 },
    scene,
  );
  ground.material = grassMat;
  ground.receiveShadows = true;

  const outsideMat = new StandardMaterial('outside-mat', scene);
  outsideMat.diffuseColor = new Color3(0.28, 0.36, 0.24);
  outsideMat.specularColor = Color3.Black();

  const outside = MeshBuilder.CreateGround(
    'outside-ground',
    { width: map.width * 4, height: map.depth * 4 },
    scene,
  );
  outside.position.y = -0.05;
  outside.material = outsideMat;
  outside.isPickable = false;

  return { ground };
}
