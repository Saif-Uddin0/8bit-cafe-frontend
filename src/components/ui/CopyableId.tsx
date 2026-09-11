"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyableIdProps {
  id?: string | null;
  truncate?: boolean;
  className?: string;
  label?: string;
}

export default function CopyableId({
  id,
  truncate = true,
  className = "",
  label,
}: CopyableIdProps) {
  const [copied, setCopied] = useState(false);

  if (!id || id === "—") {
    return <span className="text-white/40 font-mono">—</span>;
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={`inline-flex items-center gap-1.5 max-w-full group/copy ${className}`}>
      <span
        className={`text-white/80 font-mono text-xs ${
          truncate ? "truncate" : "break-all"
        }`}
        title={id}
      >
        {id}
      </span>

      <button
        type="button"
        onClick={handleCopy}
        className="
          inline-flex
          items-center
          justify-center
          p-1
          rounded
          text-white/40
          hover:text-[#CD4ECD]
          hover:bg-white/10
          active:scale-90
          transition-all
          shrink-0
          cursor-pointer
        "
        title={copied ? "Copied!" : label ? `Copy ${label}` : "Copy ID"}
        aria-label={copied ? "Copied!" : label ? `Copy ${label}` : "Copy ID"}
      >
        {copied ? (
          <Check size={12} className="text-emerald-400 animate-in zoom-in-50 duration-150" />
        ) : (
          <Copy size={12} className="opacity-60 group-hover/copy:opacity-100 transition-opacity" />
        )}
      </button>

      {copied && (
        <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider animate-in fade-in duration-150 shrink-0">
          Copied
        </span>
      )}
    </div>
  );
}
