import type { AnimationGroup } from '@babylonjs/core/Animations/animationGroup';
import type { Player } from '../entities/player';
import type { GameSystem, PlayerAnimation } from '../types';
import type { InputSystem } from './InputSystem';

/** Cross-fade speed between clips (0…1 per frame; lower = smoother). */
const BLENDING_SPEED = 0.1;

/** Plays idle / walk / run on the character based on the player's input. */
export class PlayerAnimationSystem implements GameSystem {
  private current: PlayerAnimation = 'idle';

  constructor(
    private readonly player: Player,
    private readonly input: InputSystem
  ) {
    Object.values(player.animations).forEach((group: AnimationGroup) => {
      group.enableBlending = true;
      group.blendingSpeed = BLENDING_SPEED;
    });
  }

  update(): void {
    const { x, y } = this.input.axis;
    const moving = x !== 0 || y !== 0;
    const next: PlayerAnimation = !moving ? 'idle' : this.input.isRunning ? 'run' : 'walk';
    if (next === this.current) return;

    this.player.animations[this.current].stop();
    this.player.animations[next].start(true);
    this.current = next;
  }
}
