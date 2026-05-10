"use client";

// NumberLine — sign analysis line. Marks (zeros, holes, VAs) plus shaded
// regions colored by sign.
//
// State shape:
//   {
//     range: [min, max]
//     marks: [{ x, kind: "zero" | "hole" | "va", label?: string }]
//     regions: [{ from, to, sign: "+" | "-" | "0" | "?" }]
//     highlight?: number              // index into marks or regions for spotlight
//   }

import { motion } from "framer-motion";
import type { ArtifactState } from "@/lib/learn/types";
import { COLORS, mapX } from "./util";

const W = 440;
const H = 110;
const PAD = 30;

type Mark = { x: number; kind: "zero" | "hole" | "va"; label?: string };
type Region = { from: number; to: number; sign: "+" | "-" | "0" | "?" };

export function NumberLine({ state, focus }: { state: ArtifactState; focus?: string | string[] }) {
  const range = (state.range as [number, number] | undefined) ?? [-5, 5];
  const marks = (state.marks as Mark[] | undefined) ?? [];
  const regions = (state.regions as Region[] | undefined) ?? [];
  const xToPx = (x: number) => mapX(x, range[0], range[1], PAD, W - PAD);
  const lineY = H / 2 + 6;

  return (
    <div className="rounded-2xl bg-[var(--learn-surface)] border border-[var(--learn-line)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
        {/* Region shading */}
        {regions.map((r, i) => {
          const fill =
            r.sign === "+" ? COLORS.success :
            r.sign === "-" ? COLORS.danger :
            r.sign === "0" ? COLORS.inkMute :
            COLORS.warning;
          const x1 = xToPx(r.from);
          const x2 = xToPx(r.to);
          return (
            <g key={`r${i}`}>
              <rect
                x={Math.min(x1, x2)}
                y={lineY - 28}
                width={Math.abs(x2 - x1)}
                height={56}
                fill={fill}
                opacity={0.12}
              />
              <text
                x={(x1 + x2) / 2}
                y={lineY - 14}
                textAnchor="middle"
                fontSize={16}
                fontWeight="600"
                fill={fill}
                fontFamily="ui-monospace, monospace"
              >
                {r.sign}
              </text>
            </g>
          );
        })}

        {/* Number line */}
        <line x1={PAD} x2={W - PAD} y1={lineY} y2={lineY} stroke={COLORS.inkDim} strokeWidth={1.5} />
        {/* Tick marks at integers */}
        {Array.from({ length: range[1] - range[0] + 1 }, (_, i) => range[0] + i).map((tick) => (
          <g key={`t${tick}`}>
            <line
              x1={xToPx(tick)} x2={xToPx(tick)}
              y1={lineY - 4} y2={lineY + 4}
              stroke={COLORS.inkMute}
              strokeWidth={1}
            />
            <text x={xToPx(tick)} y={lineY + 18} textAnchor="middle" fontSize={10} fontFamily="ui-monospace, monospace" fill={COLORS.inkMute}>
              {tick}
            </text>
          </g>
        ))}

        {/* Marks */}
        {marks.map((m, i) => {
          const x = xToPx(m.x);
          if (m.kind === "zero") {
            return (
              <motion.g key={`m${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <circle cx={x} cy={lineY} r={6} fill={COLORS.accent} stroke={COLORS.surface} strokeWidth={2.5} />
                {m.label && <text x={x} y={lineY - 12} textAnchor="middle" fontSize={11} fontFamily="ui-monospace, monospace" fill={COLORS.accent}>{m.label}</text>}
              </motion.g>
            );
          }
          if (m.kind === "hole") {
            return (
              <motion.g key={`m${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <circle cx={x} cy={lineY} r={6} fill={COLORS.surface} stroke={COLORS.warning} strokeWidth={2.5} />
                {m.label && <text x={x} y={lineY - 12} textAnchor="middle" fontSize={11} fontFamily="ui-monospace, monospace" fill={COLORS.warning}>{m.label}</text>}
              </motion.g>
            );
          }
          // VA
          return (
            <motion.g key={`m${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line x1={x} x2={x} y1={lineY - 30} y2={lineY + 30} stroke={COLORS.danger} strokeWidth={2} strokeDasharray="3 3" />
              {m.label && <text x={x} y={lineY - 32} textAnchor="middle" fontSize={11} fontFamily="ui-monospace, monospace" fill={COLORS.danger}>{m.label}</text>}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
