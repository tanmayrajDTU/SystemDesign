"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import { NAVIGATION, isReady } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const activeSection = NAVIGATION.find((s) =>
    s.items.some((i) => pathname === `/docs/${i.slug}`)
  )?.slug;

  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAVIGATION.forEach((s) => (initial[s.slug] = s.slug === activeSection || s.slug === "fundamentals"));
    return initial;
  });

  return (
    <nav className="scroll-thin h-full overflow-y-auto px-4 py-6 text-sm">
      {NAVIGATION.map((section) => {
        const isOpen = open[section.slug] ?? false;
        return (
          <div key={section.slug} className="mb-1">
            <button
              onClick={() => setOpen((o) => ({ ...o, [section.slug]: !isOpen }))}
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left font-display
                text-[13px] font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark
                hover:text-ink dark:hover:text-ink-dark"
            >
              {section.title}
              <ChevronDown
                size={14}
                className={cn("transition-transform", isOpen && "rotate-180")}
              />
            </button>
            {isOpen && (
              <ul className="ml-1 mt-1 space-y-0.5 border-l border-border dark:border-border-dark pl-3">
                {section.items.map((item) => {
                  const ready = isReady(item.slug);
                  const href = `/docs/${item.slug}`;
                  const active = pathname === href;
                  if (!ready) {
                    return (
                      <li key={item.slug}>
                        <span
                          className="flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 text-ink-muted/50
                            dark:text-ink-muted-dark/50"
                        >
                          {item.title}
                          <Lock size={10} />
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        onClick={onNavigate}
                        className={cn(
                          "block rounded-md px-2 py-1.5 transition-colors",
                          active
                            ? "bg-signal-500/10 font-medium text-signal-600 dark:text-signal-400"
                            : "text-ink-muted dark:text-ink-muted-dark hover:bg-surface-raised dark:hover:bg-surface-raised-dark hover:text-ink dark:hover:text-ink-dark"
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
