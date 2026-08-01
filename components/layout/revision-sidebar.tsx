"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { REVISION_HUB_SECTIONS } from "@/data/revision-hub";
import { cn } from "@/lib/utils";

// Deliberately not reusing components/layout/sidebar.tsx: that component
// renders NAVIGATION (the main curriculum, keyed by /docs/<slug>) and is
// explicitly documented as "do not modify existing detailed notes" —
// Revision Hub is a parallel top-level section with its own flat list of
// 11 pages, so it gets its own (much simpler) sidebar rather than forcing
// the curriculum sidebar to understand two unrelated content models.
export function RevisionSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="scroll-thin h-full overflow-y-auto px-4 py-6 text-sm">
      <Link
        href="/revision-hub"
        onClick={onNavigate}
        className="mb-3 block rounded-md px-2 py-2 font-display text-[13px] font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark"
      >
        Overview
      </Link>
      <ul className="space-y-0.5 border-l border-border dark:border-border-dark pl-3">
        {REVISION_HUB_SECTIONS.map((section) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[section.icon] ?? Icons.FileText;
          const href = `/revision-hub/${section.slug}`;
          const active = pathname === href;
          return (
            <li key={section.slug}>
              <Link
                href={href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
                  active
                    ? "bg-signal-500/10 font-medium text-signal-600 dark:text-signal-400"
                    : "text-ink-muted dark:text-ink-muted-dark hover:bg-surface-raised dark:hover:bg-surface-raised-dark hover:text-ink dark:hover:text-ink-dark"
                )}
              >
                <Icon size={14} className="shrink-0" />
                <span className="truncate">{section.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
