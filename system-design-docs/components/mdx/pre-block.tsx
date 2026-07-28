"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function PreBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  }

  return (
    <div className="group relative my-6 rounded-xl border border-border dark:border-border-dark bg-[#0d1117] overflow-hidden">
      <button
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-3 top-3 z-10 rounded-md border border-white/10 bg-white/5 p-1.5 text-white/60
          opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/10 hover:text-white"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre ref={preRef} {...props} />
    </div>
  );
}
