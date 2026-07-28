"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");
  const { resolvedTheme } = useTheme();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === "dark" ? "dark" : "neutral",
        themeVariables: {
          fontFamily: "var(--font-body)",
          primaryColor: "#4C8DFF",
          primaryTextColor: resolvedTheme === "dark" ? "#E4E7EC" : "#1A1D23",
          lineColor: resolvedTheme === "dark" ? "#3A4252" : "#C6CAD3",
        },
        securityLevel: "strict",
      });

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch (e) {
        if (!cancelled) setError("Couldn't render this diagram.");
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (error) {
    return (
      <div className="mermaid-wrap text-sm text-danger">{error}</div>
    );
  }

  return <div className="mermaid-wrap" ref={ref} role="img" aria-label="Architecture diagram" />;
}
