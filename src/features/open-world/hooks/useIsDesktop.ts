'use client';

import { useSyncExternalStore } from 'react';

/** Primary input can hover with a precise pointer: mouse/trackpad, i.e. desktop/laptop. */
const DESKTOP_QUERY = '(hover: hover) and (pointer: fine)';

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

/** `null` during SSR/hydration (unknown), then `true`/`false` on the client. */
export function useIsDesktop(): boolean | null {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => null,
  );
}
