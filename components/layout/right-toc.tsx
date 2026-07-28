"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/toc";

export function RightToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;
    const headingEls = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (obs) => {
        const visible = obs.filter((o) => o.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 1.0 }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <div className="scroll-thin sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pl-4 text-sm">
      <p className="mb-3 font-display text-[13px] font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border dark:border-border-dark">
        {entries.map((entry) => (
          <li key={entry.id} style={{ paddingLeft: entry.depth === 3 ? "1.5rem" : "1rem" }}>
            <a
              href={`#${entry.id}`}
              className={cn(
                "-ml-px block border-l-2 pl-3 py-0.5 transition-colors",
                activeId === entry.id
                  ? "border-signal-500 text-signal-600 dark:text-signal-400 font-medium"
                  : "border-transparent text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark"
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
