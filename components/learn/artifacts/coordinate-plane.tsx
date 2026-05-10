"use client";

// CoordinatePlane — the workhorse artifact.
//
// State shape:
//   {
//     xRange: [min, max]   // default [-5, 5]
//     yRange: [min, max]   // default [-5, 5]
//     curves: [{ id, fn?: (x) => y, points?: [x,y][], color?, dim?, dashed? }]
//     features: [
//       { kind: "point", id, x, y, label?, color? },
//       { kind: "secant", id, from: [x,y], to: [x,y], color? },
//       { kind: "h-asymptote", y, label? },
//       { kind: "v-asymptote", x, label? },
//       { kind: "interval", from, to, color?, label? },
//     ]
//     focus?: string        // id of element to spotlight (others dim)
//     showGrid?: boolean
//   }

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { ArtifactState } from "@/lib/learn/types";
import { COLORS, mapX, mapY, pathD, sample } from "./util";

type Curve = {
  id: string;
  fn?: (x: number) => number;
  points?: Array<[number, number]>;
  color?: string;
  dim?: boolean;
  dashed?: boolean;
  label?: string;
};

type Feature =
  | { kind: "point"; id: string; x: number; y: number; label?: string; color?: string }
  | { kind: "secant"; id: string; from: [number, number]; to: [number, number]; color?: string; label?: string }
  | { kind: "h-asymptote"; id?: string; y: number; label?: string }
  | { kind: "v-asymptote"; id?: string; x: number; label?: string }
  | { kind: "interval"; id?: string; from: number; to: number; color?: string; label?: string };

const W = 440;
const H = 360;
const PAD = 28;

export function CoordinatePlane({ state, focus }: { state: ArtifactState; focus?: string | string[] }) {
  const xRange = (state.xRange as [number, number] | undefined) ?? [-5, 5];
  const yRange = (state.yRange as [number, number] | undefined) ?? [-5, 5];
  const curves = (state.curves as Curve[] | undefined) ?? [];
  const features = (state.features as Feature[] | undefined) ?? [];
  const showGrid = state.showGrid !== false;

  const focusSet = useMemo(() => {
    if (!focus) return null;
    return new Set(Array.isArray(focus) ? focus : [focus]);
  }, [focus]);

  const isFocused = (id?: string) => !focusSet || (id !== undefined && focusSet.has(id));
  const isDimmed = (id?: string) => focusSet !== null && (id === undefined || !focusSet.has(id));

  const xToPx = (x: number) => mapX(x, xRange[0], xRange[1], PAD, W - PAD);
  const yToPx = (y: number) => mapY(y, yRange[0], yRange[1], PAD, H - PAD);

  // Compute curve paths
  const renderedCurves = curves.map((c) => {
    const rawPoints = c.points ?? (c.fn ? sample(c.fn, xRange[0], xRange[1], 240) : []);
    // Clip to y range so wild curves don't blow the viewport.
    const clipped: Array<[number, number]> = [];
    for (const [x, y] of rawPoints) {
      if (y >= yRange[0] - 1 && y <= yRange[1] + 1) clipped.push([xToPx(x), yToPx(y)]);
      else clipped.push([NaN, NaN]); // break in path
    }
    // Split on NaN gaps so the path doesn't connect across a discontinuity.
    const segments: Array<Array<[number, number]>> = [];
    let cur: Array<[number, number]> = [];
    for (const p of clipped) {
      if (Number.isNaN(p[0])) {
        if (cur.length > 0) segments.push(cur);
        cur = [];
      } else cur.push(p);
    }
    if (cur.length > 0) segments.push(cur);
    return { ...c, segments };
  });

  return (
    <div className="rounded-2xl bg-[var(--learn-surface)] border border-[var(--learn-line)] p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.inkMute} />
          </marker>
        </defs>

        {/* Grid */}
        {showGrid && <Grid xRange={xRange} yRange={yRange} xToPx={xToPx} yToPx={yToPx} />}

        {/* Axes */}
        <g>
          {/* x-axis */}
          {yRange[0] <= 0 && yRange[1] >= 0 && (
            <line
              x1={PAD - 4} x2={W - PAD + 4}
              y1={yToPx(0)} y2={yToPx(0)}
              stroke={COLORS.inkDim} strokeWidth={1.5} markerEnd="url(#arrow)" markerStart="url(#arrow)"
            />
          )}
          {/* y-axis */}
          {xRange[0] <= 0 && xRange[1] >= 0 && (
            <line
              x1={xToPx(0)} x2={xToPx(0)}
              y1={H - PAD + 4} y2={PAD - 4}
              stroke={COLORS.inkDim} strokeWidth={1.5} markerEnd="url(#arrow)" markerStart="url(#arrow)"
            />
          )}
        </g>

        {/* Asymptotes (drawn behind curves) */}
        {features.filter((f) => f.kind === "h-asymptote" || f.kind === "v-asymptote").map((f, i) => {
          const dim = isDimmed(f.id);
          const stroke = dim ? COLORS.inkGhost : COLORS.inkMute;
          if (f.kind === "h-asymptote") {
            return (
              <g key={i}>
                <line
                  x1={PAD} x2={W - PAD}
                  y1={yToPx(f.y)} y2={yToPx(f.y)}
                  stroke={stroke} strokeWidth={1.5} strokeDasharray="4 3" opacity={dim ? 0.4 : 1}
                />
                {f.label && (
                  <text x={W - PAD - 4} y={yToPx(f.y) - 6} textAnchor="end" fontSize={10} fill={stroke} fontFamily="ui-monospace, monospace">
                    {f.label}
                  </text>
                )}
              </g>
            );
          }
          return (
            <g key={i}>
              <line
                x1={xToPx(f.x)} x2={xToPx(f.x)}
                y1={PAD} y2={H - PAD}
                stroke={stroke} strokeWidth={1.5} strokeDasharray="4 3" opacity={dim ? 0.4 : 1}
              />
              {f.label && (
                <text x={xToPx(f.x) + 4} y={PAD + 12} fontSize={10} fill={stroke} fontFamily="ui-monospace, monospace">
                  {f.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Interval shading */}
        {features.filter((f): f is Extract<Feature, { kind: "interval" }> => f.kind === "interval").map((f, i) => {
          const dim = isDimmed(f.id);
          const color = f.color ?? COLORS.accent;
          const x1 = xToPx(f.from);
          const x2 = xToPx(f.to);
          return (
            <g key={i}>
              <rect
                x={Math.min(x1, x2)} y={PAD}
                width={Math.abs(x2 - x1)} height={H - 2 * PAD}
                fill={color} opacity={dim ? 0.06 : 0.14}
              />
              {f.label && (
                <text x={(x1 + x2) / 2} y={PAD + 14} textAnchor="middle" fontSize={11} fill={color} opacity={dim ? 0.5 : 1}>
                  {f.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Curves */}
        {renderedCurves.map((c) => {
          const dim = c.dim || isDimmed(c.id);
          const color = c.color ?? COLORS.accent;
          return (
            <g key={c.id}>
              {c.segments.map((seg, si) => (
                <motion.path
                  key={si}
                  initial={false}
                  animate={{ d: pathD(seg), opacity: dim ? 0.25 : 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  fill="none"
                  stroke={color}
                  strokeWidth={dim ? 2 : 2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={c.dashed ? "5 4" : undefined}
                />
              ))}
              {c.label && c.segments[0]?.[0] && (
                <text
                  x={c.segments[c.segments.length - 1][c.segments[c.segments.length - 1].length - 1][0] - 6}
                  y={c.segments[c.segments.length - 1][c.segments[c.segments.length - 1].length - 1][1] - 8}
                  textAnchor="end"
                  fontSize={11}
                  fill={color}
                  fontFamily="ui-monospace, monospace"
                  opacity={dim ? 0.5 : 1}
                >
                  {c.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Secants */}
        {features.filter((f): f is Extract<Feature, { kind: "secant" }> => f.kind === "secant").map((f) => {
          const dim = isDimmed(f.id);
          const color = f.color ?? COLORS.warning;
          return (
            <g key={f.id}>
              <line
                x1={xToPx(f.from[0])} y1={yToPx(f.from[1])}
                x2={xToPx(f.to[0])} y2={yToPx(f.to[1])}
                stroke={color} strokeWidth={2} opacity={dim ? 0.4 : 1}
              />
              {f.label && (
                <text
                  x={(xToPx(f.from[0]) + xToPx(f.to[0])) / 2}
                  y={(yToPx(f.from[1]) + yToPx(f.to[1])) / 2 - 6}
                  textAnchor="middle"
                  fontSize={11}
                  fill={color}
                  fontFamily="ui-monospace, monospace"
                  opacity={dim ? 0.5 : 1}
                >
                  {f.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Points */}
        {features.filter((f): f is Extract<Feature, { kind: "point" }> => f.kind === "point").map((f) => {
          const dim = isDimmed(f.id);
          const color = f.color ?? COLORS.accent;
          return (
            <motion.g
              key={f.id}
              initial={false}
              animate={{ opacity: dim ? 0.3 : 1, cx: xToPx(f.x), cy: yToPx(f.y) }}
              transition={{ duration: 0.4 }}
            >
              <circle cx={xToPx(f.x)} cy={yToPx(f.y)} r={5} fill={color} stroke={COLORS.surface} strokeWidth={2} />
              {f.label && (
                <text
                  x={xToPx(f.x) + 8} y={yToPx(f.y) - 8}
                  fontSize={11} fontFamily="ui-monospace, monospace" fill={color}
                >
                  {f.label}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Axis labels at extremes */}
        <text x={W - PAD + 6} y={yToPx(0) + 4} fontSize={10} fill={COLORS.inkMute} fontFamily="ui-monospace, monospace">x</text>
        <text x={xToPx(0) - 6} y={PAD - 4} textAnchor="end" fontSize={10} fill={COLORS.inkMute} fontFamily="ui-monospace, monospace">y</text>
      </svg>
    </div>
  );
}

function Grid({
  xRange, yRange, xToPx, yToPx,
}: {
  xRange: [number, number];
  yRange: [number, number];
  xToPx: (x: number) => number;
  yToPx: (y: number) => number;
}) {
  const lines: React.ReactNode[] = [];
  // x-grid lines (vertical)
  for (let x = Math.ceil(xRange[0]); x <= Math.floor(xRange[1]); x++) {
    if (x === 0) continue;
    lines.push(
      <line key={`vx${x}`} x1={xToPx(x)} x2={xToPx(x)} y1={PAD} y2={H - PAD} stroke={COLORS.line} strokeWidth={1} />,
    );
    lines.push(
      <text key={`vxt${x}`} x={xToPx(x)} y={yToPx(0) + 14} textAnchor="middle" fontSize={9} fill={COLORS.inkMute} fontFamily="ui-monospace, monospace">{x}</text>,
    );
  }
  // y-grid lines (horizontal)
  for (let y = Math.ceil(yRange[0]); y <= Math.floor(yRange[1]); y++) {
    if (y === 0) continue;
    lines.push(
      <line key={`hy${y}`} x1={PAD} x2={W - PAD} y1={yToPx(y)} y2={yToPx(y)} stroke={COLORS.line} strokeWidth={1} />,
    );
    lines.push(
      <text key={`hyt${y}`} x={xToPx(0) - 6} y={yToPx(y) + 3} textAnchor="end" fontSize={9} fill={COLORS.inkMute} fontFamily="ui-monospace, monospace">{y}</text>,
    );
  }
  return <g>{lines}</g>;
}
