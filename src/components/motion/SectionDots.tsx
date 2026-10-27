"use client";

import { useEffect, useState } from "react";

export interface Chapter {
  id: string;
  label: string;
}

/**
 * Fixed chapter index on the right edge. The active dot follows whichever
 * section currently crosses the middle of the viewport.
 */
export function SectionDots({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const { id } of chapters) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 min-[1400px]:block"
    >
      <ol className="flex flex-col gap-1 rounded-full bg-paper/70 p-1.5 ring-1 ring-ink/5 backdrop-blur-md">
        {chapters.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex h-6 w-6 items-center justify-center rounded-full"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ease-out ${
                    isActive ? "h-5 w-1.5 bg-accent" : "h-1.5 w-1.5 bg-ink/25 group-hover:bg-ink/60"
                  }`}
                />
                <span className="pointer-events-none absolute right-9 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {label}
                </span>
                <span className="sr-only">{label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
