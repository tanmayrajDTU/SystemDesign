"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Docs", href: "/docs", match: "/docs" },
  { label: "Revision Hub", href: "/revision-hub", match: "/revision-hub" },
] as const;

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 sm:flex">
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.match);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-signal-500/10 text-signal-600 dark:text-signal-400"
                : "text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
