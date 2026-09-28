import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { WORLD_CONFIG } from '../config';
import { loadPlayer } from '../entities/player';
import { splitProgress } from './assets';
import { BoundarySystem } from '../systems/BoundarySystem';
import { CollisionSystem } from '../systems/CollisionSystem';
import { CameraSystem } from '../systems/CameraSystem';
import { InputSystem } from '../systems/InputSystem';
import { PlayerAnimationSystem } from '../systems/PlayerAnimationSystem';
import { PlayerMovementSystem } from '../systems/PlayerMovementSystem';
import { StatsSystem } from '../systems/StatsSystem';
import type { GameHandle, GameOptions, GameSystem, WorldConfig } from '../types';
import { createBoundaryWalls } from '../world/boundaryWalls';
import { computeBounds } from '../world/bounds';
import { ColliderWorld } from '../world/colliders';
import { createEnvironment } from '../world/environment';
import { GroundGrid } from '../world/groundGrid';
import { loadPropTemplates, scatterProps } from '../world/props';
import { createTerrain } from '../world/terrain';

/** Max frame step, so a background tab doesn't teleport the player on return. */
const MAX_DELTA_SECONDS = 0.1;

/**
 * Composition root: builds the world, loads entities, wires systems in
 * update order, and starts the render loop. Resolves only when every asset
 * (including the character model) is fully loaded; rendering starts after that.
 */
export async function createGame(
  canvas: HTMLCanvasElement,
  config: WorldConfig = WORLD_CONFIG,
  options: GameOptions = {}
): Promise<GameHandle> {
  const { signal, onStats, onLoadProgress } = options;
  signal?.throwIfAborted();

  const engine = new Engine(canvas, true, { stencil: true });
  const scene = new Scene(engine);
  const bounds = computeBounds(config.map);
  const colliders = new ColliderWorld();
  const systems: GameSystem[] = [];
  const onResize = () => engine.resize();

  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    signal?.removeEventListener('abort', dispose);
    window.removeEventListener('resize', onResize);
    for (const system of systems) system.dispose?.();
    engine.stopRenderLoop();
    scene.dispose();
    engine.dispose();
  };
  // Tear down immediately on abort, even mid-load (e.g. navigating away).
  signal?.addEventListener('abort', dispose, { once: true });

  try {
    // World
    const { shadows } = createEnvironment(scene);
    createTerrain(scene, config.map);
    createBoundaryWalls(scene, config.map, bounds, shadows);

    // Debug overlays
    const grid = new GroundGrid(scene, bounds);

    // Async assets, loaded in parallel; the game waits for all of them.
    const [playerProgress, propsProgress] = splitProgress(2, onLoadProgress);
    const [player, propTemplates] = await Promise.all([
      loadPlayer(scene, config.player, shadows, playerProgress),
      loadPropTemplates(scene, config.props, propsProgress),
    ]);
    signal?.throwIfAborted();

    scatterProps(
      scene,
      bounds,
      config.props,
      config.player.spawn,
      shadows,
      colliders,
      propTemplates
    );

    // Systems — order matters: input → movement → collisions → map bounds → animation → camera.
    const input = new InputSystem();
    const cameraSystem = new CameraSystem(scene, canvas, player, config.camera);
    systems.push(
      input,
      new PlayerMovementSystem(player, input, cameraSystem.camera, config.player),
      new CollisionSystem(player, colliders),
      new BoundarySystem(player, bounds),
      new PlayerAnimationSystem(player, input),
      cameraSystem
    );

    // Debug/telemetry runs last so it sees the final state of the frame.
    if (onStats) {
      systems.push(
        new StatsSystem(
          { engine, scene, player, camera: cameraSystem.camera, input, colliders },
          onStats
        )
      );
    }

    // Shaders + textures compiled, so the very first frame is complete.
    await scene.whenReadyAsync();
    signal?.throwIfAborted();

    scene.onBeforeRenderObservable.add(() => {
      const dt = Math.min(engine.getDeltaTime() / 1000, MAX_DELTA_SECONDS);
      for (const system of systems) system.update(dt);
    });

    engine.runRenderLoop(() => scene.render());
    window.addEventListener('resize', onResize);

    return {
      applyView(view) {
        scene.forceWireframe = view.wireframe;
        grid.setCellSize(view.grid.cellSize);
        grid.setVisible(view.grid.visible);
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
