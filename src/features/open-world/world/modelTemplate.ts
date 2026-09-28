import { Mesh } from '@babylonjs/core/Meshes/mesh';
import type { Scene } from '@babylonjs/core/scene';
import '@babylonjs/core/Materials/multiMaterial';
import { applyMetallic, importModel, type ProgressCallback } from '../engine/assets';
import type { PropModelConfig } from '../types';

/**
 * Loads a static model as a single hidden template mesh for instancing:
 * transforms are baked in, it is scaled to `config.height`, centered on X/Z (so it
 * rotates in place), and its base sits at y = 0.
 */
export async function loadModelTemplate(
  scene: Scene,
  name: string,
  config: PropModelConfig,
  onProgress?: ProgressCallback
): Promise<Mesh> {
  const result = await importModel(scene, config.url, onProgress);
  const [root] = result.meshes; // glTF "__root__"
  const parts = result.meshes.filter(
    (m): m is Mesh => m instanceof Mesh && m.getTotalVertices() > 0
  );
  if (parts.length === 0) throw new Error(`No geometry found in ${config.url}`);

  applyMetallic(parts, config.metallic);

  // Bake the file's node transforms (incl. glTF handedness flip) into the vertices.
  for (const part of parts) {
    part.setParent(null);
    part.bakeCurrentTransformIntoVertices();
  }
  root.dispose();

  const template =
    parts.length === 1 ? parts[0] : Mesh.MergeMeshes(parts, true, true, undefined, false, true);
  if (!template) throw new Error(`Could not merge meshes from ${config.url}`);

  // Fit to the target height, center on X/Z, base on the ground.
  template.refreshBoundingInfo();
  const { minimum, maximum } = template.getBoundingInfo().boundingBox;
  const scale = config.height / (maximum.y - minimum.y);
  template.scaling.setAll(scale);
  template.position.set(
    (-(minimum.x + maximum.x) / 2) * scale,
    -minimum.y * scale,
    (-(minimum.z + maximum.z) / 2) * scale
  );
  template.bakeCurrentTransformIntoVertices();
  template.refreshBoundingInfo();

  template.name = name;
  return template;
}
