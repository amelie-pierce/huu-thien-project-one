import { useEffect, useState } from 'react';

export function useActiveSection(ids: string[], options: IntersectionObserverInit = {}) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(',');
  const { rootMargin, threshold } = options;

  useEffect(() => {
    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        });
        const [top] = [...visible.entries()].sort((a, b) => a[1] - b[1]);
        setActive(top?.[0] ?? null);
      },
      { rootMargin, threshold }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key, rootMargin, threshold]);

  return active;
}
