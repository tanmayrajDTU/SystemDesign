import { Sidebar } from "@/components/layout/sidebar";
import { ReadingProgress } from "@/components/layout/reading-progress";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[1400px]">
      <ReadingProgress />
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r border-border dark:border-border-dark lg:block">
        <Sidebar />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
