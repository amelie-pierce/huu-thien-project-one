import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import type { Scene } from '@babylonjs/core/scene';
import type { Player } from '../entities/player';
import type { CameraConfig, GameSystem } from '../types';

/**
 * Third-person orbit camera that follows the player.
 * Mouse drag orbits, wheel zooms; keyboard is reserved for character movement.
 */
export class CameraSystem implements GameSystem {
  readonly camera: ArcRotateCamera;
  private readonly lookOffset = new Vector3(0, 1.5, 0);

  constructor(
    scene: Scene,
    canvas: HTMLCanvasElement,
    private readonly player: Player,
    config: CameraConfig,
  ) {
    const camera = new ArcRotateCamera(
      'follow-camera',
      -Math.PI / 2,
      config.beta,
      config.radius,
      player.root.position.add(this.lookOffset),
      scene,
    );
    camera.lowerRadiusLimit = config.minRadius;
    camera.upperRadiusLimit = config.maxRadius;
    camera.lowerBetaLimit = 0.2;
    camera.upperBetaLimit = Math.PI / 2.2;
    camera.wheelDeltaPercentage = 0.01;
    camera.panningSensibility = 0; // disable panning, camera stays on the player
    camera.inputs.removeByType('ArcRotateCameraKeyboardMoveInput');
    camera.attachControl(canvas, true);

    this.camera = camera;
  }

  update(): void {
    this.player.root.position.addToRef(this.lookOffset, this.camera.target);
  }

  dispose(): void {
    this.camera.detachControl();
  }
}
