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
        theme: "base",
        themeVariables: resolvedTheme === "dark" ? {
          fontFamily: "var(--font-body)",
          primaryColor: "#161C26",
          primaryTextColor: "#E4E7EC",
          primaryBorderColor: "#1E2530",
          lineColor: "#4C8DFF",
          secondaryColor: "#10151D",
          tertiaryColor: "#0A0E14",
          mainBkg: "#161C26",
          nodeBorder: "#1E2530",
          clusterBkg: "rgba(22, 28, 38, 0.4)",
          clusterBorder: "#1E2530",
          titleColor: "#E4E7EC",
          edgeLabelBackground: "#0A0E14",
          actorBkg: "#161C26",
          actorBorder: "#1E2530",
          actorTextColor: "#E4E7EC",
          noteBkgColor: "rgba(245, 158, 11, 0.15)",
          noteBorderColor: "#F59E0B",
          noteTextColor: "#FDE68A",
        } : {
          fontFamily: "var(--font-body)",
          primaryColor: "#FFFFFF",
          primaryTextColor: "#1A1D23",
          primaryBorderColor: "#E5E7EB",
          lineColor: "#4C8DFF",
          secondaryColor: "#F3F4F6",
          tertiaryColor: "#FAFAF9",
          mainBkg: "#FFFFFF",
          nodeBorder: "#E5E7EB",
          clusterBkg: "rgba(243, 244, 246, 0.4)",
          clusterBorder: "#E5E7EB",
          titleColor: "#1A1D23",
          edgeLabelBackground: "#FAFAF9",
          actorBkg: "#FFFFFF",
          actorBorder: "#E5E7EB",
          actorTextColor: "#1A1D23",
          noteBkgColor: "#FEF3C7",
          noteBorderColor: "#F59E0B",
          noteTextColor: "#78350F",
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
