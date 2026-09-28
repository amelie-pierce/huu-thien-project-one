import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import type {
  ISceneLoaderAsyncResult,
  ISceneLoaderProgressEvent,
} from '@babylonjs/core/Loading/sceneLoader';
import { ImportMeshAsync } from '@babylonjs/core/Loading/sceneLoader';
import { PBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import type { Scene } from '@babylonjs/core/scene';
import '@babylonjs/loaders/glTF';

export type ProgressCallback = (progress: number) => void;

/** Imports a glTF/GLB from /public. Reports download progress 0…1 and resolves when fully loaded. */
export async function importModel(
  scene: Scene,
  url: string,
  onProgress?: ProgressCallback
): Promise<ISceneLoaderAsyncResult> {
  const result = await ImportMeshAsync(encodeURI(url), scene, {
    onProgress: (e: ISceneLoaderProgressEvent) => {
      if (e.lengthComputable && e.total > 0) onProgress?.(e.loaded / e.total);
    },
  });
  onProgress?.(1);
  return result;
}

/**
 * Overrides PBR metallic on loaded meshes. The scene has no environment map,
 * so metallic surfaces (often faked by FBX→glTF converters) render dark.
 */
export function applyMetallic(meshes: AbstractMesh[], metallic: number | undefined): void {
  if (metallic === undefined) return;
  for (const mesh of meshes) {
    if (mesh.material instanceof PBRMaterial) mesh.material.metallic = metallic;
  }
}

/**
 * Splits one overall progress callback across several parallel loads.
 * Returns one callback per load; the overall value is their average.
 */
export function splitProgress(count: number, onProgress?: ProgressCallback): ProgressCallback[] {
  const values = new Array<number>(count).fill(0);
  return values.map((_, i) => (progress: number) => {
    values[i] = progress;
    onProgress?.(values.reduce((sum, v) => sum + v, 0) / count);
  });
}
