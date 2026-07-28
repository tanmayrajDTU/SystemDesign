"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, FileText, CornerDownLeft } from "lucide-react";

type IndexEntry = { slug: string; title: string; description: string; body: string };

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<IndexEntry[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex([]));
  }, []);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description", weight: 0.3 },
          { name: "body", weight: 0.2 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [index]
  );

  const results = query.trim() ? fuse.search(query).slice(0, 8) : [];

  function go(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/docs/${slug}`);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="flex w-full max-w-xs items-center gap-2 rounded-lg border border-border dark:border-border-dark
            bg-surface-raised dark:bg-surface-raised-dark px-3 py-1.5 text-sm text-ink-muted dark:text-ink-muted-dark
            hover:border-signal-500/50"
        >
          <Search size={14} />
          <span className="flex-1 text-left">Search docs...</span>
          <kbd className="rounded border border-border dark:border-border-dark px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-24 z-50 w-[92vw] max-w-lg -translate-x-1/2 rounded-xl border
            border-border dark:border-border-dark bg-surface dark:bg-surface-dark shadow-2xl"
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
          <div className="flex items-center gap-2 border-b border-border dark:border-border-dark px-4 py-3">
            <Search size={16} className="text-ink-muted dark:text-ink-muted-dark" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search CAP theorem, caching, URL shortener..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted dark:placeholder:text-ink-muted-dark"
            />
          </div>
          <div className="max-h-80 overflow-y-auto scroll-thin p-2">
            {query.trim() && results.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-ink-muted dark:text-ink-muted-dark">
                No results for "{query}"
              </p>
            )}
            {results.map((r) => (
              <button
                key={r.item.slug}
                onClick={() => go(r.item.slug)}
                className="flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left hover:bg-surface-raised dark:hover:bg-surface-raised-dark"
              >
                <FileText size={16} className="mt-0.5 shrink-0 text-signal-500" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink dark:text-ink-dark">
                    {r.item.title}
                  </span>
                  <span className="block truncate text-xs text-ink-muted dark:text-ink-muted-dark">
                    {r.item.description}
                  </span>
                </span>
                <CornerDownLeft size={12} className="ml-auto mt-1 shrink-0 text-ink-muted dark:text-ink-muted-dark" />
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
