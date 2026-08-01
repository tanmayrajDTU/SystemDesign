"use client";

import { useLocalStorageSet } from "./use-local-storage-set";

const STORAGE_KEY = "revision-hub:revised";

/** "Mark as Revised" state shared across every revision hub page and component. */
export function useRevised() {
  const { has, add, remove, toggle, clear, hydrated, count, ids } = useLocalStorageSet(STORAGE_KEY);
  return {
    isRevised: has,
    markRevised: add,
    unmarkRevised: remove,
    toggleRevised: toggle,
    clearRevised: clear,
    revisedIds: ids,
    revisedCount: count,
    hydrated,
  };
}

/** Convenience: "3 of 12 revised" style progress, given a full id list. */
export function useRevisionProgress(allIds: string[]) {
  const { revisedIds, hydrated } = useRevised();
  const revisedCount = allIds.filter((id) => revisedIds.has(id)).length;
  return { revisedCount, total: allIds.length, hydrated };
}
