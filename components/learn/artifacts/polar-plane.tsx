"use client";

// PolarPlane — polar curves with θ sweep. Sign-of-r coloring built in.
//
// State shape:
//   {
//     fn: (theta: number) => number   // r as a function of θ
//     thetaRange?: [a, b]               // default [0, 2π]
//     rMax?: number                     // viewport radius; auto-computed if absent
//     pointAt?: number                  // θ at which to draw a point on the curve
//     ringStep?: number                 // grid ring spacing
//     trace?: number                    // 0..1 — what fraction of the curve to draw
//   }

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { ArtifactState } from "@/lib/learn/types";
import { COLORS, pathD } from "./util";

const W = 380;
const H = 380;
const CX = W / 2;
const CY = H / 2;

export function PolarPlane({ state, focus }: { state: ArtifactState; focus?: string | string[] }) {
  const fn = state.fn as ((theta: number) => number) | undefined;
  const thetaRange = (state.thetaRange as [number, number] | undefined) ?? [0, 2 * Math.PI];
  const ringStep = (state.ringStep as number | undefined) ?? 1;
  const trace = (state.trace as number | undefined) ?? 1;
  const pointAt = state.pointAt as number | undefined;

  // Sample the curve. Track positive and negative r separately so we can
  // color them differently.
  const samples = useMemo(() => {
    if (!fn) return { positive: [] as Array<[number, number]>, negative: [] as Array<[number, number]>, maxR: 4 };
    const N = 600;
    const traceN = Math.floor(N * Math.max(0, Math.min(1, trace)));
    const positive: Array<[number, number]> = [];
    const negative: Array<[number, number]> = [];
    let maxR = 1;
    for (let i = 0; i <= traceN; i++) {
      const t = thetaRange[0] + ((thetaRange[1] - thetaRange[0]) * i) / N;
      const r = fn(t);
      if (!Number.isFinite(r)) continue;
      const ax = Math.abs(r);
      if (ax > maxR) maxR = ax;
      // Negative r: actual point is at (|r|, θ + π).
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      if (r >= 0) positive.push([x, y]);
      else negative.push([x, y]);
    }
    return { positive, negative, maxR };
  }, [fn, thetaRange, trace]);

  const rMax = (state.rMax as number | undefined) ?? Math.max(samples.maxR * 1.15, 1);
  const scale = (Math.min(W, H) / 2 - 30) / rMax;

  const toPx = (x: number, y: number): [number, number] => [CX + x * scale, CY - y * scale];

  // Convert sample points to pixel space.
  const positivePx = samples.positive.map(([x, y]) => toPx(x, y));
  const negativePx = samples.negative.map(([x, y]) => toPx(x, y));

  // Concentric rings.
  const rings: number[] = [];
  for (let r = ringStep; r <= rMax + 0.001; r += ringStep) rings.push(r);

  // Point on the curve.
  let pointPx: [number, number] | null = null;
  let pointR: number | null = null;
  if (fn && pointAt !== undefined) {
    pointR = fn(pointAt);
    if (Number.isFinite(pointR)) {
      pointPx = toPx((pointR as number) * Math.cos(pointAt), (pointR as number) * Math.sin(pointAt));
    }
  }

  return (
    <div className="rounded-2xl bg-[var(--learn-surface)] border border-[var(--learn-line)] p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
        {/* Concentric ring grid */}
        {rings.map((r, i) => (
          <circle key={i} cx={CX} cy={CY} r={r * scale} fill="none" stroke={COLORS.line} strokeWidth={1} />
        ))}
        {/* Radial spokes every 30° */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          const ex = CX + Math.cos(a) * rMax * scale;
          const ey = CY - Math.sin(a) * rMax * scale;
          return <line key={i} x1={CX} y1={CY} x2={ex} y2={ey} stroke={COLORS.line} strokeWidth={1} />;
        })}
        {/* Cartesian axes (slightly heavier) */}
        <line x1={CX - rMax * scale} x2={CX + rMax * scale} y1={CY} y2={CY} stroke={COLORS.inkDim} strokeWidth={1.2} />
        <line x1={CX} x2={CX} y1={CY - rMax * scale} y2={CY + rMax * scale} stroke={COLORS.inkDim} strokeWidth={1.2} />

        {/* Curve — positive r portions */}
        {positivePx.length > 0 && (
          <motion.path
            initial={false}
            animate={{ d: pathD(positivePx) }}
            transition={{ duration: 0.45 }}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {/* Curve — negative r portions */}
        {negativePx.length > 0 && (
          <motion.path
            initial={false}
            animate={{ d: pathD(negativePx) }}
            transition={{ duration: 0.45 }}
            fill="none"
            stroke={COLORS.warning}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 3"
          />
        )}

        {/* Point on curve */}
        {pointPx && (
          <g>
            <line x1={CX} y1={CY} x2={pointPx[0]} y2={pointPx[1]} stroke={COLORS.danger} strokeWidth={1.5} strokeDasharray="3 3" />
            <circle cx={pointPx[0]} cy={pointPx[1]} r={6} fill={COLORS.danger} stroke={COLORS.surface} strokeWidth={2} />
            {pointR !== null && (
              <text
                x={pointPx[0] + 8}
                y={pointPx[1] - 8}
                fontSize={11}
                fontFamily="ui-monospace, monospace"
                fill={COLORS.danger}
              >
                r = {Number(pointR.toFixed(3))}
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
