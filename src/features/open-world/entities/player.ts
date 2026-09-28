import type { AnimationGroup } from '@babylonjs/core/Animations/animationGroup';
import type { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import type { Scene } from '@babylonjs/core/scene';
import { applyMetallic, importModel, type ProgressCallback } from '../engine/assets';
import type { PlayerAnimation, PlayerConfig } from '../types';

export interface Player {
  /** Move/rotate this node; all visuals are parented to it. */
  root: TransformNode;
  radius: number;
  animations: Record<PlayerAnimation, AnimationGroup>;
}

function findAnimation(groups: AnimationGroup[], name: string): AnimationGroup {
  const group = groups.find((g) => g.name === name || g.name.endsWith(`|${name}`));
  if (!group) {
    throw new Error(
      `Player animation "${name}" not found. Available: ${groups.map((g) => g.name).join(', ')}`
    );
  }
  return group;
}

/**
 * Loads the character model, fits it to `config.height` with its feet on the ground,
 * and resolves only once the model and its animations are fully ready.
 * The model must face +Z (the game's forward direction).
 */
export async function loadPlayer(
  scene: Scene,
  config: PlayerConfig,
  shadows: ShadowGenerator,
  onProgress?: ProgressCallback
): Promise<Player> {
  const result = await importModel(scene, config.model.url, onProgress);
  applyMetallic(result.meshes, config.model.metallic);

  const [modelRoot] = result.meshes; // glTF "__root__"
  const animations: Record<PlayerAnimation, AnimationGroup> = {
    idle: findAnimation(result.animationGroups, config.model.animations.idle),
    walk: findAnimation(result.animationGroups, config.model.animations.walk),
    run: findAnimation(result.animationGroups, config.model.animations.run),
  };

  // glTF autoplays the first clip; start from the idle pose instead.
  result.animationGroups.forEach((g) => g.stop());
  animations.idle.start(true);

  // Measure the skinned pose (bones applied), then scale to the target height.
  modelRoot.computeWorldMatrix(true);
  result.skeletons.forEach((s) => s.prepare(true));
  let min = new Vector3(Infinity, Infinity, Infinity);
  let max = new Vector3(-Infinity, -Infinity, -Infinity);
  for (const mesh of result.meshes) {
    mesh.isPickable = false;
    if (!mesh.getTotalVertices()) continue;
    mesh.computeWorldMatrix(true);
    mesh.refreshBoundingInfo({ applySkeleton: true });
    const box = mesh.getBoundingInfo().boundingBox;
    min = Vector3.Minimize(min, box.minimumWorld);
    max = Vector3.Maximize(max, box.maximumWorld);
    mesh.receiveShadows = true;
    shadows.addShadowCaster(mesh);
  }

  const height = max.y - min.y;
  const scale = height > 0 ? config.height / height : 1;
  modelRoot.scaling.scaleInPlace(scale);
  modelRoot.position.y = -min.y * scale;

  const root = new TransformNode('player', scene);
  root.position.set(config.spawn.x, 0, config.spawn.z);
  modelRoot.parent = root;

  return { root, radius: config.radius, animations };
}
