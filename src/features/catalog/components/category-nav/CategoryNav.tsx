"use client";

import { useEffect, useState } from "react";

import { CoffeeCupIcon } from "@/components/ui/icons";
import Link from "next/link";
import s from "./category-nav.module.scss";

type Item = { slug: string; name: string };

export function CategoryNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.slug ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className={s.nav} aria-label="Menu categories">
      <ul className={s.list}>
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`#${item.slug}`}
              className={s.item}
              data-active={item.slug === active || undefined}
              aria-current={item.slug === active ? "true" : undefined}
            >
              <span className={s.icon} aria-hidden="true">
                <CoffeeCupIcon size={18} />
              </span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
