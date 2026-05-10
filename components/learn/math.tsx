"use client";

// Light wrapper around KaTeX that we can use in beat narration and
// artifacts without pulling in react-katex (one less dep, faster).

import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Math({
  tex,
  block = false,
  className,
}: {
  tex: string;
  block?: boolean;
  className?: string;
}) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: block,
        throwOnError: false,
        strict: false,
        output: "html",
      });
    } catch (e) {
      return tex;
    }
  }, [tex, block]);
  if (block) {
    return (
      <div
        className={className}
        // KaTeX-rendered HTML is safe — input is from our own course content,
        // not user input.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// Splits a string with `$inline$` markers into Math + plain spans, so
// narration text can mix prose and formulas naturally.
export function MathText({ children, className }: { children: string; className?: string }) {
  const parts = children.split(/(\$[^$]+\$)/g).filter(Boolean);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          return <Math key={i} tex={part.slice(1, -1)} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
