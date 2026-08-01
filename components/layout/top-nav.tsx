"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchDialog } from "@/components/search/search-dialog";
import { RevisionSearch } from "@/components/revision/revision-search";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { RevisionSidebar } from "@/components/layout/revision-sidebar";

export function TopNav() {
  const pathname = usePathname();
  const isRevisionHub = pathname.startsWith("/revision-hub");

  return (
    <header className="sticky top-0 z-40 border-b border-border dark:border-border-dark bg-bg/80 dark:bg-bg-dark/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4">
        {isRevisionHub ? (
          <MobileNav
            title="Revision Hub"
            renderSidebar={(onNavigate) => <RevisionSidebar onNavigate={onNavigate} />}
          />
        ) : (
          <MobileNav />
        )}
        <Link href="/" className="flex items-center gap-2 font-display text-[15px] font-semibold shrink-0">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-signal-500 text-white text-xs">
            SD
          </span>
          System Design
        </Link>
        <PrimaryNav />
        <div className="flex-1" />
        <div className="hidden sm:block">
          {isRevisionHub ? <RevisionSearch /> : <SearchDialog />}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
