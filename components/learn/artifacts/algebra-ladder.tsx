"use client";

// AlgebraLadder — multi-line derivation. Each beat advances or focuses lines.
//
// State shape:
//   {
//     lines: [{ tex: string, label?: string, dim?: boolean, highlight?: boolean }]
//   }

import { motion, AnimatePresence } from "framer-motion";
import type { ArtifactState } from "@/lib/learn/types";
import { Math, MathText } from "../math";

type Line = {
  tex: string;
  label?: string;
  dim?: boolean;
  highlight?: boolean;
};

export function AlgebraLadder({ state, focus }: { state: ArtifactState; focus?: string | string[] }) {
  const lines = (state.lines as Line[] | undefined) ?? [];

  return (
    <div className="rounded-2xl bg-[var(--learn-surface)] border border-[var(--learn-line)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="space-y-2.5">
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={`${i}-${line.tex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: line.dim ? 0.35 : 1,
                y: 0,
                scale: line.highlight ? 1.02 : 1,
              }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg px-4 py-3 border ${
                line.highlight
                  ? "border-[var(--learn-accent-line)] bg-[var(--learn-accent-soft)]"
                  : "border-[var(--learn-line)] bg-[var(--learn-elevated)]"
              }`}
            >
              {line.label && (
                <div className="text-xs font-mono text-[var(--learn-ink-mute)] mb-1.5">
                  <MathText>{line.label}</MathText>
                </div>
              )}
              <Math tex={line.tex} block className="text-[var(--learn-ink)]" />
            </motion.div>
          ))}
        </AnimatePresence>
        {lines.length === 0 && (
          <div className="text-sm text-[var(--learn-ink-mute)] py-8 text-center">
            Steps appear here as the beat advances.
          </div>
        )}
      </div>
    </div>
  );
}
