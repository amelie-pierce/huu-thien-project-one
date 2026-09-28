import type { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import type { Player } from '../entities/player';
import type { GameSystem, PlayerConfig } from '../types';
import type { InputSystem } from './InputSystem';

const forward = new Vector3();
const right = new Vector3();
const move = new Vector3();

/** Moves the player relative to the camera, so "up" always means "away from the screen". */
export class PlayerMovementSystem implements GameSystem {
  constructor(
    private readonly player: Player,
    private readonly input: InputSystem,
    private readonly camera: ArcRotateCamera,
    private readonly config: PlayerConfig,
  ) {}

  update(dt: number): void {
    const { x, y } = this.input.axis;
    if (x === 0 && y === 0) return;

    this.camera.getDirection(Vector3.Forward()).scaleToRef(1, forward);
    forward.y = 0;
    forward.normalize();
    Vector3.CrossToRef(Vector3.Up(), forward, right);

    forward.scaleToRef(y, move).addInPlace(right.scaleInPlace(x));
    move.normalize();

    const speed = this.input.isRunning ? this.config.runSpeed : this.config.walkSpeed;
    const root = this.player.root;
    root.position.addInPlace(move.scaleInPlace(speed * dt));

    // Smoothly turn to face the direction of travel (shortest path).
    const targetYaw = Math.atan2(move.x, move.z);
    let delta = targetYaw - root.rotation.y;
    delta = Math.atan2(Math.sin(delta), Math.cos(delta));
    root.rotation.y += delta * Math.min(1, this.config.turnSpeed * dt);
  }
}
