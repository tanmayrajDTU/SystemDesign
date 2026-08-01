"use client";

import { useLocalStorageSet } from "./use-local-storage-set";

const STORAGE_KEY = "revision-hub:bookmarks";

/** Bookmark state shared across every revision hub page and component. */
export function useBookmarks() {
  const { has, add, remove, toggle, clear, hydrated, count, ids } = useLocalStorageSet(STORAGE_KEY);
  return {
    isBookmarked: has,
    bookmark: add,
    unbookmark: remove,
    toggleBookmark: toggle,
    clearBookmarks: clear,
    bookmarkedIds: ids,
    bookmarkCount: count,
    hydrated,
  };
}
