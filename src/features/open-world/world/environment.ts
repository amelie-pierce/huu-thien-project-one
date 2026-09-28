import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Scene } from '@babylonjs/core/scene';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';

/** Sky color, fog and lights. Returns the shadow generator for casters to register. */
export function createEnvironment(scene: Scene) {
  scene.clearColor = new Color4(0.62, 0.8, 0.95, 1);
  scene.ambientColor = new Color3(0.3, 0.3, 0.3);

  scene.fogMode = Scene.FOGMODE_EXP2;
  scene.fogDensity = 0.006;
  scene.fogColor = new Color3(0.62, 0.8, 0.95);

  const hemi = new HemisphericLight('sky-light', new Vector3(0, 1, 0), scene);
  hemi.intensity = 0.65;
  hemi.groundColor = new Color3(0.35, 0.4, 0.3);

  const sun = new DirectionalLight('sun', new Vector3(-0.5, -1, -0.4), scene);
  sun.position = new Vector3(60, 100, 50);
  sun.intensity = 0.9;

  const shadows = new ShadowGenerator(2048, sun);
  shadows.useBlurExponentialShadowMap = true;
  shadows.blurKernel = 16;

  return { shadows };
}
