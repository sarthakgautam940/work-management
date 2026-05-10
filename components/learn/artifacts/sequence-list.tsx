"use client";

// SequenceList — terms reveal one at a time. First / second differences
// or ratios computed live in adjacent columns.
//
// State shape:
//   {
//     terms: number[]
//     visible?: number             // how many revealed (defaults to all)
//     mode?: "differences" | "ratios"
//     highlightIdx?: number
//   }

import { motion } from "framer-motion";
import type { ArtifactState } from "@/lib/learn/types";

export function SequenceList({ state, focus }: { state: ArtifactState; focus?: string | string[] }) {
  const terms = (state.terms as number[] | undefined) ?? [];
  const visible = Math.min((state.visible as number | undefined) ?? terms.length, terms.length);
  const mode = (state.mode as "differences" | "ratios" | undefined) ?? "differences";
  const highlightIdx = state.highlightIdx as number | undefined;

  // Compute step values between consecutive terms.
  const steps: Array<number | string> = [];
  for (let i = 0; i < visible - 1; i++) {
    if (mode === "differences") {
      steps.push(terms[i + 1] - terms[i]);
    } else {
      const ratio = terms[i] !== 0 ? terms[i + 1] / terms[i] : NaN;
      steps.push(Number.isFinite(ratio) ? ratio : "—");
    }
  }

  return (
    <div className="rounded-2xl bg-[var(--learn-surface)] border border-[var(--learn-line)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-2">
        <div className="text-xs font-mono uppercase tracking-wide text-[var(--learn-ink-mute)]">
          Sequence
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {terms.map((t, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: i < visible ? 1 : 0.2,
                scale: i === highlightIdx ? 1.08 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`min-w-[56px] px-3 py-2 rounded-lg border text-center font-mono tabular-nums ${
                i === highlightIdx
                  ? "border-[var(--learn-accent-line)] bg-[var(--learn-accent-soft)] text-[var(--learn-accent)]"
                  : i < visible
                  ? "border-[var(--learn-line-strong)] bg-[var(--learn-surface)] text-[var(--learn-ink)]"
                  : "border-[var(--learn-line)] bg-[var(--learn-elevated)] text-[var(--learn-ink-mute)]"
              }`}
            >
              <div className="text-xs text-[var(--learn-ink-mute)] mb-0.5">{i + 1}</div>
              <div className="text-base font-medium">{i < visible ? formatNum(t) : "?"}</div>
            </motion.div>
          ))}
        </div>

        {steps.length > 0 && (
          <>
            <div className="text-xs font-mono uppercase tracking-wide text-[var(--learn-ink-mute)] mt-4">
              {mode === "differences" ? "First differences (Δ)" : "Ratios (×)"}
            </div>
            <div className="flex items-center gap-2 flex-wrap pl-7">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="min-w-[56px] px-3 py-2 rounded-lg border border-[var(--learn-line)] bg-[var(--learn-elevated)] text-center font-mono text-sm text-[var(--learn-ink-dim)] tabular-nums"
                >
                  {typeof s === "number" ? formatNum(s) : s}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function formatNum(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return Number(n.toFixed(4)).toString();
}
