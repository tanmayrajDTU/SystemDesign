"use client";

import { useCallback, useEffect, useState } from "react";

// Generic, SSR-safe "set of ids persisted to localStorage" primitive.
// Bookmarks and Mark-as-Revised are both just named instances of this —
// keeping the storage logic in one place means both features stay in sync
// (same serialization, same SSR-hydration handling, same tab-sync behavior).
export function useLocalStorageSet(storageKey: string) {
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Read from localStorage only after mount, so the server-rendered markup
  // (which never knows about a specific browser's storage) always matches
  // the client's first render and React doesn't complain about a mismatch.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setIds(new Set(JSON.parse(raw)));
    } catch {
      // Corrupt or inaccessible storage — fail open with an empty set.
    }
    setHydrated(true);
  }, [storageKey]);

  const persist = useCallback(
    (next: Set<string>) => {
      setIds(next);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      } catch {
        // Storage full or unavailable (private browsing) — state still
        // updates in-memory for this session, it just won't persist.
      }
    },
    [storageKey]
  );

  const has = useCallback((id: string) => ids.has(id), [ids]);

  const add = useCallback(
    (id: string) => {
      if (ids.has(id)) return;
      const next = new Set(ids);
      next.add(id);
      persist(next);
    },
    [ids, persist]
  );

  const remove = useCallback(
    (id: string) => {
      if (!ids.has(id)) return;
      const next = new Set(ids);
      next.delete(id);
      persist(next);
    },
    [ids, persist]
  );

  const toggle = useCallback(
    (id: string) => (ids.has(id) ? remove(id) : add(id)),
    [ids, add, remove]
  );

  const clear = useCallback(() => persist(new Set()), [persist]);

  return { ids, has, add, remove, toggle, clear, hydrated, count: ids.size };
}
