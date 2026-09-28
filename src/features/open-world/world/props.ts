import type { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import type { Scene } from '@babylonjs/core/scene';
import '@babylonjs/core/Meshes/instancedMesh';
import { splitProgress, type ProgressCallback } from '../engine/assets';
import type { PropKindConfig, PropsConfig, WorldBounds } from '../types';
import type { Collider, ColliderWorld } from './colliders';
import { loadModelTemplate } from './modelTemplate';
import { createRandom } from './random';

/** Min distance from the walls for scattered props. */
const EDGE_MARGIN = 3;
const ROCK_COLLIDER_RADIUS = 0.75;
const QUARTER_TURN = Math.PI / 2;

export type PropTemplates = Map<string, Mesh>;

/** Loads every prop kind's model in parallel; resolves when all are fully loaded. */
export async function loadPropTemplates(
  scene: Scene,
  config: PropsConfig,
  onProgress?: ProgressCallback
): Promise<PropTemplates> {
  const progress = splitProgress(config.kinds.length, onProgress);
  const meshes = await Promise.all(
    config.kinds.map((kind, i) => loadModelTemplate(scene, kind.name, kind.model, progress[i]))
  );
  return new Map(config.kinds.map((kind, i) => [kind.name, meshes[i]]));
}

interface Footprint {
  halfX: number;
  halfZ: number;
}

function footprintOf(template: Mesh): Footprint {
  const { maximum } = template.getBoundingInfo().boundingBox; // template is centered on X/Z
  return { halfX: maximum.x, halfZ: maximum.z };
}

interface Placement {
  x: number;
  z: number;
  scale: number;
  rotY: number;
}

function addInstance(
  template: Mesh,
  id: number,
  { x, z, scale, rotY }: Placement,
  shadows: ShadowGenerator | null
) {
  const inst = template.createInstance(`${template.name}-${id}`);
  inst.position.set(x, template.position.y * scale, z);
  inst.scaling.setAll(scale);
  inst.rotation.y = rotY;
  inst.isPickable = false;
  shadows?.addShadowCaster(inst);
}

/** What scattering needs from a kind (model-based kinds and procedural rocks alike). */
type ScatterSpec = Pick<
  PropKindConfig,
  'count' | 'seed' | 'scale' | 'collider' | 'spawnClearance' | 'avoidOwnKind'
>;

/** Collider for one instance, or null when the kind doesn't block. */
function colliderFor(kind: ScatterSpec, footprint: Footprint, p: Placement): Collider | null {
  const c = kind.collider;
  if (!c) return null;
  if (c.shape === 'circle') return { shape: 'circle', x: p.x, z: p.z, radius: c.radius * p.scale };

  // Box: rotations are quarter turns, so the footprint stays axis-aligned (swap on 90°/270°).
  const inset = c.inset ?? 0;
  const odd = Math.round(p.rotY / QUARTER_TURN) % 2 === 1;
  const hx = (odd ? footprint.halfZ : footprint.halfX) * p.scale - inset;
  const hz = (odd ? footprint.halfX : footprint.halfZ) * p.scale - inset;
  return { shape: 'box', x: p.x, z: p.z, halfX: Math.max(hx, 0.1), halfZ: Math.max(hz, 0.1) };
}

/**
 * Random spots inside the map. Skips spots near the spawn or overlapping props
 * placed by earlier kinds. The random draw order (x, z, scale, rotation) is fixed,
 * so a kind's layout only depends on its own seed and count.
 */
function scatterKind(
  kind: ScatterSpec,
  template: Mesh,
  bounds: WorldBounds,
  spawn: { x: number; z: number },
  spawnClearRadius: number,
  colliders: ColliderWorld,
  shadows: ShadowGenerator | null
) {
  const rand = createRandom(kind.seed);
  const footprint = footprintOf(template);
  const reach = Math.max(footprint.halfX, footprint.halfZ);
  const margin = Math.max(EDGE_MARGIN, reach * kind.scale[1]);
  const clearRadius = spawnClearRadius + (kind.spawnClearance ?? 0);
  const quarterTurns = kind.collider?.shape === 'box';
  // Same-kind colliders are registered after the loop unless the kind avoids itself.
  const deferred: Collider[] = [];

  for (let i = 0; i < kind.count; i++) {
    const x = rand.range(bounds.minX + margin, bounds.maxX - margin);
    const z = rand.range(bounds.minZ + margin, bounds.maxZ - margin);
    if (Math.hypot(x - spawn.x, z - spawn.z) < clearRadius) continue;

    const scale = rand.range(...kind.scale);
    const rotY = quarterTurns
      ? Math.floor(rand.next() * 4) * QUARTER_TURN
      : rand.range(0, Math.PI * 2);

    const placement = { x, z, scale, rotY };
    const collider = colliderFor(kind, footprint, placement);
    const probe = kind.collider?.shape === 'circle' ? kind.collider.radius * scale : reach * scale;
    if (colliders.overlaps(x, z, probe)) continue;

    addInstance(template, i, placement, shadows);
    if (!collider) continue;
    if (kind.avoidOwnKind) colliders.add(collider);
    else deferred.push(collider);
  }

  deferred.forEach((c) => colliders.add(c));
}

/** A ring of scenery just outside the walls, spread evenly around the map. */
function backdropKind(
  kind: PropKindConfig,
  template: Mesh,
  bounds: WorldBounds,
  shadows: ShadowGenerator | null
) {
  const rand = createRandom(kind.seed);
  const footprint = footprintOf(template);
  const reach = Math.max(footprint.halfX, footprint.halfZ);
  const halfW = (bounds.maxX - bounds.minX) / 2;
  const halfD = (bounds.maxZ - bounds.minZ) / 2;

  for (let i = 0; i < kind.count; i++) {
    const angle = ((i + rand.range(-0.3, 0.3)) / kind.count) * Math.PI * 2;
    const scale = rand.range(...kind.scale);
    const rotY = rand.range(0, Math.PI * 2);

    // Distance from the center to the map edge in this direction, then past it.
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const toEdge = Math.min(
      halfW / Math.max(Math.abs(cos), 1e-6),
      halfD / Math.max(Math.abs(sin), 1e-6)
    );
    const dist = toEdge + reach * scale * 0.9 + rand.range(2, 25);

    addInstance(template, i, { x: cos * dist, z: sin * dist, scale, rotY }, shadows);
  }
}

function createRockTemplate(scene: Scene) {
  const mat = new StandardMaterial('rock-mat', scene);
  mat.diffuseColor = new Color3(0.5, 0.5, 0.52);
  mat.specularColor = Color3.Black();
  const rock = MeshBuilder.CreateIcoSphere('rock', { radius: 0.8, subdivisions: 1 }, scene);
  rock.position.y = 0.3;
  rock.material = mat;
  return rock;
}

/**
 * Places every prop kind (in config order), then procedural rocks. All props are
 * instances of one hidden template per kind, which keeps draw calls low, and every
 * blocking prop registers a collider so the player can't walk through it.
 */
export function scatterProps(
  scene: Scene,
  bounds: WorldBounds,
  config: PropsConfig,
  spawn: { x: number; z: number },
  shadows: ShadowGenerator,
  colliders: ColliderWorld,
  templates: PropTemplates
) {
  for (const kind of config.kinds) {
    const template = templates.get(kind.name);
    if (!template) throw new Error(`Missing template for prop kind "${kind.name}"`);
    template.isVisible = false;
    template.isPickable = false;

    const casters = kind.castShadows === false ? null : shadows;
    if (kind.placement === 'backdrop') backdropKind(kind, template, bounds, casters);
    else scatterKind(kind, template, bounds, spawn, config.spawnClearRadius, colliders, casters);
  }

  const rock = createRockTemplate(scene);
  rock.isVisible = false;
  rock.isPickable = false;
  scatterKind(
    {
      count: config.rocks.count,
      seed: config.rocks.seed,
      scale: [0.6, 1.8],
      collider: { shape: 'circle', radius: ROCK_COLLIDER_RADIUS },
    },
    rock,
    bounds,
    spawn,
    config.spawnClearRadius,
    colliders,
    shadows
  );
}
