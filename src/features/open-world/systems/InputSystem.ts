import type { GameSystem } from '../types';
import { isEditableTarget } from '../utils/isEditableTarget';

type Action = 'up' | 'down' | 'left' | 'right' | 'run';

const KEY_BINDINGS: Record<string, Action> = {
  ArrowUp: 'up',
  KeyW: 'up',
  ArrowDown: 'down',
  KeyS: 'down',
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
  ShiftLeft: 'run',
  ShiftRight: 'run',
};

/**
 * Maps raw keyboard events to game actions. Other systems read `axis`/`isRunning`
 * instead of touching the DOM, so bindings (or gamepad support) live in one place.
 */
export class InputSystem implements GameSystem {
  private readonly active = new Set<Action>();

  constructor(private readonly target: Window = window) {
    target.addEventListener('keydown', this.onKeyDown);
    target.addEventListener('keyup', this.onKeyUp);
    target.addEventListener('blur', this.onBlur);
  }

  /** x: -1 (left) … 1 (right), y: -1 (down) … 1 (up). Normalized for diagonals. */
  get axis(): { x: number; y: number } {
    const x = Number(this.active.has('right')) - Number(this.active.has('left'));
    const y = Number(this.active.has('up')) - Number(this.active.has('down'));
    const len = Math.hypot(x, y) || 1;
    return { x: x / len, y: y / len };
  }

  get isRunning(): boolean {
    return this.active.has('run');
  }

  update(): void {}

  dispose(): void {
    this.target.removeEventListener('keydown', this.onKeyDown);
    this.target.removeEventListener('keyup', this.onKeyUp);
    this.target.removeEventListener('blur', this.onBlur);
    this.active.clear();
  }

  private onKeyDown = (e: KeyboardEvent) => {
    const action = KEY_BINDINGS[e.code];
    if (!action || isEditableTarget(e.target)) return;
    e.preventDefault(); // stop arrow keys from scrolling the page
    this.active.add(action);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    const action = KEY_BINDINGS[e.code];
    if (action) this.active.delete(action);
  };

  // Avoid "stuck" keys when the tab loses focus mid-press.
  private onBlur = () => this.active.clear();
}
