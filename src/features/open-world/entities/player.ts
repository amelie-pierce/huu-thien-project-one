import { Color3 } from '@babylonjs/core/Maths/math.color';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import type { Scene } from '@babylonjs/core/scene';
import type { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import type { PlayerConfig } from '../types';

export interface Player {
  /** Move/rotate this node; all visuals are parented to it. */
  root: TransformNode;
  radius: number;
}

export function createPlayer(
  scene: Scene,
  config: PlayerConfig,
  shadows: ShadowGenerator,
): Player {
  const root = new TransformNode('player', scene);
  root.position.set(config.spawn.x, 0, config.spawn.z);

  const bodyMat = new StandardMaterial('player-body-mat', scene);
  bodyMat.diffuseColor = new Color3(0.95, 0.45, 0.2);

  const body = MeshBuilder.CreateCapsule(
    'player-body',
    { radius: config.radius, height: config.height },
    scene,
  );
  body.position.y = config.height / 2;
  body.material = bodyMat;
  body.parent = root;

  // Small "visor" so the facing direction is readable.
  const visorMat = new StandardMaterial('player-visor-mat', scene);
  visorMat.diffuseColor = new Color3(0.15, 0.2, 0.3);
  const visor = MeshBuilder.CreateBox('player-visor', { width: 0.7, height: 0.25, depth: 0.3 }, scene);
  visor.position.set(0, config.height * 0.75, config.radius * 0.85);
  visor.material = visorMat;
  visor.parent = root;

  shadows.addShadowCaster(body);
  shadows.addShadowCaster(visor);

  return { root, radius: config.radius };
}
