"use client";

import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookmarks } from "@/lib/revision-hub/use-bookmarks";

export function BookmarkButton({
  id,
  size = 16,
  className,
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const active = isBookmarked(id);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove bookmark" : "Bookmark this"}
      title={active ? "Remove bookmark" : "Bookmark this"}
      onClick={() => toggleBookmark(id)}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-1.5 transition-colors",
        active
          ? "text-amber-500"
          : "text-ink-muted dark:text-ink-muted-dark hover:text-amber-500",
        className
      )}
    >
      <Bookmark size={size} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
