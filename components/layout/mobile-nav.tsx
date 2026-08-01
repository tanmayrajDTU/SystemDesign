"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";

export function MobileNav({
  title = "Contents",
  renderSidebar,
}: {
  title?: string;
  /** Defaults to the main docs Sidebar for backward compatibility — pass a
   * different renderer (e.g. RevisionSidebar) for other sections. */
  renderSidebar?: (onNavigate: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Open navigation"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border dark:border-border-dark lg:hidden"
        >
          <Menu size={16} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-72 bg-surface dark:bg-surface-dark lg:hidden">
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>
          <div className="flex items-center justify-between border-b border-border dark:border-border-dark px-4 py-3">
            <span className="font-display text-sm font-semibold">{title}</span>
            <Dialog.Close asChild>
              <button aria-label="Close navigation">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>
          {renderSidebar ? (
            renderSidebar(() => setOpen(false))
          ) : (
            <Sidebar onNavigate={() => setOpen(false)} />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
