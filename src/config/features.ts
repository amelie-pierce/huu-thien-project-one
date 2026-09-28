/**
 * Feature flags from environment variables (server-side only).
 * Static pages read these at build time, so changing a flag on Vercel needs a redeploy.
 */
const isEnabled = (value: string | undefined) => value === 'true';

export const features = {
  /** Promo banner on the shop hero linking to /open-world. */
  openWorldPromo: isEnabled(process.env.SHOW_OPEN_WORLD_PROMO),
} as const;
