import { Color3 } from '@babylonjs/core/Maths/math.color';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import type { Scene } from '@babylonjs/core/scene';
import type { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import type { PropsConfig, WorldBounds } from '../types';
import type { ColliderWorld } from './colliders';
import { createRandom } from './random';
import '@babylonjs/core/Meshes/instancedMesh';

function material(scene: Scene, name: string, color: Color3) {
  const mat = new StandardMaterial(name, scene);
  mat.diffuseColor = color;
  mat.specularColor = Color3.Black();
  return mat;
}

function createTreeTemplate(scene: Scene) {
  const trunk = MeshBuilder.CreateCylinder('tree-trunk', { height: 2, diameter: 0.5 }, scene);
  trunk.position.y = 1;
  trunk.material = material(scene, 'trunk-mat', new Color3(0.4, 0.26, 0.15));

  const leaves = MeshBuilder.CreateCylinder(
    'tree-leaves',
    { height: 4, diameterTop: 0, diameterBottom: 3, tessellation: 8 },
    scene,
  );
  leaves.position.y = 4;
  leaves.material = material(scene, 'leaves-mat', new Color3(0.17, 0.45, 0.2));

  return [trunk, leaves];
}

function createRockTemplate(scene: Scene) {
  const rock = MeshBuilder.CreateIcoSphere('rock', { radius: 0.8, subdivisions: 1 }, scene);
  rock.position.y = 0.3;
  rock.material = material(scene, 'rock-mat', new Color3(0.5, 0.5, 0.52));
  return [rock];
}

/** Blocking footprint per prop at scale 1 (tree: trunk, rock: body). */
const TREE_COLLIDER_RADIUS = 0.5;
const ROCK_COLLIDER_RADIUS = 0.75;

/**
 * Scatters instanced props across the map. Each template is a list of meshes
 * that are instanced together (e.g. trunk + leaves), which keeps draw calls low.
 * Every prop registers a collider so the player can't walk through it.
 */
export function scatterProps(
  scene: Scene,
  bounds: WorldBounds,
  config: PropsConfig,
  shadows: ShadowGenerator,
  colliders: ColliderWorld,
) {
  const rand = createRandom(config.seed);
  const margin = 3;

  const place = (
    templates: Mesh[],
    count: number,
    scaleRange: [number, number],
    colliderRadius: number,
  ) => {
    templates.forEach((m) => {
      m.isVisible = false;
      m.isPickable = false;
    });

    for (let i = 0; i < count; i++) {
      const x = rand.range(bounds.minX + margin, bounds.maxX - margin);
      const z = rand.range(bounds.minZ + margin, bounds.maxZ - margin);
      if (Math.hypot(x, z) < config.spawnClearRadius) continue;

      const scale = rand.range(...scaleRange);
      const rotY = rand.range(0, Math.PI * 2);

      templates.forEach((template) => {
        const inst = template.createInstance(`${template.name}-${i}`);
        inst.position.set(x, template.position.y * scale, z);
        inst.scaling.setAll(scale);
        inst.rotation.y = rotY;
        shadows.addShadowCaster(inst);
      });

      colliders.add({ x, z, radius: colliderRadius * scale });
    }
  };

  place(createTreeTemplate(scene), config.trees, [0.8, 1.4], TREE_COLLIDER_RADIUS);
  place(createRockTemplate(scene), config.rocks, [0.6, 1.8], ROCK_COLLIDER_RADIUS);
}
