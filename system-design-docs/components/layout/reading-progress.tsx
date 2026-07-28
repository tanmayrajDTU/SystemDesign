"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      setScale(scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent">
      <div
        id="reading-progress"
        className="h-full bg-signal-500"
        style={{ transform: `scaleX(${scale})`, transition: "transform 80ms linear" }}
      />
    </div>
  );
}
