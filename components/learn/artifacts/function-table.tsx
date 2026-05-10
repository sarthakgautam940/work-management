"use client";

// FunctionTable — tabular data with optional first/second/nth-difference
// columns computed live and rows highlightable in sync with narration.
//
// State shape:
//   {
//     columns: [{ key: string, header: string, format?: "number" | "fraction" }]
//     rows: Array<Record<string, number | string>>
//     highlightRow?: number       // row idx to spotlight
//     highlightColumn?: string    // column key to spotlight
//     showDifferences?: 1 | 2 | 3 // adds Δ, Δ², Δ³ cols computed off the last numeric col
//   }

import { motion } from "framer-motion";
import type { ArtifactState } from "@/lib/learn/types";

type Column = { key: string; header: string };
type Row = Record<string, number | string>;

export function FunctionTable({ state, focus }: { state: ArtifactState; focus?: string | string[] }) {
  const columns = (state.columns as Column[] | undefined) ?? [];
  const rows = (state.rows as Row[] | undefined) ?? [];
  const highlightRow = state.highlightRow as number | undefined;
  const highlightColumn = state.highlightColumn as string | undefined;
  const showDifferences = (state.showDifferences as number | undefined) ?? 0;

  // Compute differences off the last column.
  const lastKey = columns[columns.length - 1]?.key;
  const lastValues: number[] = lastKey ? rows.map((r) => Number(r[lastKey])) : [];
  const diffs: number[][] = [];
  let cur = lastValues;
  for (let d = 1; d <= showDifferences; d++) {
    const next: number[] = [];
    for (let i = 0; i < cur.length - 1; i++) next.push(cur[i + 1] - cur[i]);
    diffs.push(next);
    cur = next;
  }

  return (
    <div className="rounded-2xl bg-[var(--learn-surface)] border border-[var(--learn-line)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--learn-line)]">
            {columns.map((c) => (
              <th
                key={c.key}
                className={`text-left py-2 px-3 font-medium ${
                  highlightColumn === c.key
                    ? "text-[var(--learn-accent)]"
                    : "text-[var(--learn-ink-dim)]"
                }`}
              >
                {c.header}
              </th>
            ))}
            {diffs.map((_, di) => (
              <th key={`d${di}`} className="text-left py-2 px-3 font-medium text-[var(--learn-ink-mute)] font-mono">
                Δ{"²³⁴".charAt(di) || (di === 0 ? "" : "·")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const isHighlight = ri === highlightRow;
            return (
              <motion.tr
                key={ri}
                initial={false}
                animate={{
                  backgroundColor: isHighlight ? "var(--learn-accent-soft)" : "transparent",
                }}
                transition={{ duration: 0.3 }}
                className="border-b border-[var(--learn-line)] last:border-0"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`py-2 px-3 tabular-nums font-mono ${
                      highlightColumn === c.key
                        ? "text-[var(--learn-accent)] font-semibold"
                        : "text-[var(--learn-ink)]"
                    }`}
                  >
                    {row[c.key] ?? ""}
                  </td>
                ))}
                {diffs.map((arr, di) => {
                  // Difference at position depends on level — Δ at row i
                  // is between rows i and i+1, so row i shows the value
                  // entering between this row and the next.
                  // Display offset: each higher-order diff loses one row.
                  const offset = di + 1;
                  const idx = ri - Math.floor(offset / 2);
                  const value = arr[idx];
                  return (
                    <td key={`d${di}r${ri}`} className="py-2 px-3 tabular-nums font-mono text-[var(--learn-ink-mute)]">
                      {value !== undefined ? formatNum(value) : ""}
                    </td>
                  );
                })}
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function formatNum(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return Number(n.toFixed(3)).toString();
}
