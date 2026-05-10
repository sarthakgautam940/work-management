"use client";

// SinusoidalBuilder — composite that pairs a CoordinatePlane plot of
// f(t) = A·sin(B(t-C)) + D (or cos) with four labeled parameter chips.
//
// State shape:
//   {
//     A: number, B: number, C: number, D: number
//     useCos?: boolean
//     tRange?: [min, max]
//     showMidline?: boolean
//     showAmplitudeBars?: boolean
//   }

import type { ArtifactState } from "@/lib/learn/types";
import { CoordinatePlane } from "./coordinate-plane";

export function SinusoidalBuilder({ state, focus }: { state: ArtifactState; focus?: string | string[] }) {
  const A = (state.A as number | undefined) ?? 1;
  const B = (state.B as number | undefined) ?? 1;
  const C = (state.C as number | undefined) ?? 0;
  const D = (state.D as number | undefined) ?? 0;
  const useCos = state.useCos === true;
  const tRange = (state.tRange as [number, number] | undefined) ?? [-2 * Math.PI, 2 * Math.PI];
  const showMidline = state.showMidline !== false;

  const fn = useCos
    ? (t: number) => A * Math.cos(B * (t - C)) + D
    : (t: number) => A * Math.sin(B * (t - C)) + D;

  const period = Math.abs((2 * Math.PI) / B);
  const yPad = Math.max(1, Math.abs(A) * 1.4);

  const features: any[] = [];
  if (showMidline) features.push({ kind: "h-asymptote", id: "midline", y: D, label: `midline y=${formatNum(D)}` });

  return (
    <div className="space-y-3">
      <CoordinatePlane
        focus={focus}
        state={{
          xRange: tRange,
          yRange: [D - yPad, D + yPad],
          curves: [{ id: "sinusoid", fn, color: "var(--learn-accent, #4F46E5)" }],
          features,
          showGrid: true,
        }}
      />
      <div className="grid grid-cols-4 gap-2">
        <ParamChip label="A" value={formatNum(A)} hint="amplitude" />
        <ParamChip label="B" value={formatNum(B)} hint={`period ${formatNum(period)}`} />
        <ParamChip label="C" value={formatNum(C)} hint="phase" />
        <ParamChip label="D" value={formatNum(D)} hint="midline" />
      </div>
    </div>
  );
}

function ParamChip({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg bg-[var(--learn-elevated)] border border-[var(--learn-line)] px-3 py-2 text-center">
      <div className="text-xs font-mono text-[var(--learn-ink-mute)]">{label}</div>
      <div className="font-mono text-base font-semibold text-[var(--learn-ink)] tabular-nums">{value}</div>
      <div className="text-2xs text-[var(--learn-ink-mute)]">{hint}</div>
    </div>
  );
}

function formatNum(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return Number(n.toFixed(2)).toString();
}
