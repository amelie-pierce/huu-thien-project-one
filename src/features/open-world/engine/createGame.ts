import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { WORLD_CONFIG } from '../config';
import { createPlayer } from '../entities/player';
import { BoundarySystem } from '../systems/BoundarySystem';
import { CollisionSystem } from '../systems/CollisionSystem';
import { CameraSystem } from '../systems/CameraSystem';
import { InputSystem } from '../systems/InputSystem';
import { PlayerMovementSystem } from '../systems/PlayerMovementSystem';
import { StatsSystem } from '../systems/StatsSystem';
import type { GameHandle, GameOptions, GameSystem, WorldConfig } from '../types';
import { createBoundaryWalls } from '../world/boundaryWalls';
import { computeBounds } from '../world/bounds';
import { ColliderWorld } from '../world/colliders';
import { createEnvironment } from '../world/environment';
import { GroundGrid } from '../world/groundGrid';
import { scatterProps } from '../world/props';
import { createTerrain } from '../world/terrain';

/** Max frame step, so a background tab doesn't teleport the player on return. */
const MAX_DELTA_SECONDS = 0.1;

/**
 * Composition root: builds the world, spawns entities, wires systems in
 * update order, and starts the render loop.
 */
export function createGame(
  canvas: HTMLCanvasElement,
  config: WorldConfig = WORLD_CONFIG,
  options: GameOptions = {},
): GameHandle {
  const engine = new Engine(canvas, true, { stencil: true });
  const scene = new Scene(engine);
  const bounds = computeBounds(config.map);

  const colliders = new ColliderWorld();

  // World
  const { shadows } = createEnvironment(scene);
  createTerrain(scene, config.map);
  createBoundaryWalls(scene, config.map, bounds, shadows);
  scatterProps(scene, bounds, config.props, shadows, colliders);

  // Debug overlays
  const grid = new GroundGrid(scene, bounds);

  // Entities
  const player = createPlayer(scene, config.player, shadows);

  // Systems — order matters: input → movement → collisions → map bounds → camera.
  const input = new InputSystem();
  const cameraSystem = new CameraSystem(scene, canvas, player, config.camera);
  const systems: GameSystem[] = [
    input,
    new PlayerMovementSystem(player, input, cameraSystem.camera, config.player),
    new CollisionSystem(player, colliders),
    new BoundarySystem(player, bounds),
    cameraSystem,
  ];

  // Debug/telemetry runs last so it sees the final state of the frame.
  if (options.onStats) {
    systems.push(
      new StatsSystem(
        { engine, scene, player, camera: cameraSystem.camera, input, colliders },
        options.onStats,
      ),
    );
  }

  scene.onBeforeRenderObservable.add(() => {
    const dt = Math.min(engine.getDeltaTime() / 1000, MAX_DELTA_SECONDS);
    for (const system of systems) system.update(dt);
  });

  engine.runRenderLoop(() => scene.render());

  const onResize = () => engine.resize();
  window.addEventListener('resize', onResize);

  return {
    applyView(view) {
      scene.forceWireframe = view.wireframe;
      grid.setCellSize(view.grid.cellSize);
      grid.setVisible(view.grid.visible);
    },
    dispose() {
      grid.dispose();
      window.removeEventListener('resize', onResize);
      for (const system of systems) system.dispose?.();
      engine.stopRenderLoop();
      scene.dispose();
      engine.dispose();
    },
  };
}
