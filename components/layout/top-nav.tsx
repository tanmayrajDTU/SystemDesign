import Link from "next/link";
import { SearchDialog } from "@/components/search/search-dialog";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border dark:border-border-dark bg-bg/80 dark:bg-bg-dark/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4">
        <MobileNav />
        <Link href="/" className="flex items-center gap-2 font-display text-[15px] font-semibold shrink-0">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-signal-500 text-white text-xs">
            SD
          </span>
          System Design
        </Link>
        <div className="flex-1" />
        <div className="hidden sm:block">
          <SearchDialog />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
