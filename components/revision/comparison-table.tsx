import type { ComparisonTableData } from "@/lib/revision-hub/types";

export function ComparisonTable({ title, columns, rows }: ComparisonTableData) {
  return (
    <div className="rounded-xl border border-border dark:border-border-dark">
      {title && (
        <div className="border-b border-border dark:border-border-dark px-4 py-3">
          <h3 className="font-display text-sm font-semibold text-ink dark:text-ink-dark">{title}</h3>
        </div>
      )}
      <div className="scroll-thin overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border dark:border-border-dark">
              <th className="px-4 py-2 text-left font-medium text-ink-muted dark:text-ink-muted-dark" />
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left font-display font-semibold text-ink dark:text-ink-dark"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={i !== rows.length - 1 ? "border-b border-border dark:border-border-dark" : ""}
              >
                <td className="px-4 py-2.5 font-medium text-ink dark:text-ink-dark">{row.label}</td>
                {row.values.map((value, vi) => (
                  <td key={vi} className="px-4 py-2.5 text-ink-muted dark:text-ink-muted-dark">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
