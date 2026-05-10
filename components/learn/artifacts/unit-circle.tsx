"use client";

// UnitCircle — angle θ on the unit circle, sin/cos projections, ASTC labels.
//
// State shape:
//   {
//     angle: number          // in radians; defaults to 0
//     showSin?: boolean      // draws vertical sin projection from terminal point
//     showCos?: boolean      // draws horizontal cos projection from terminal point
//     showTan?: boolean      // draws tangent length
//     showQuadrants?: boolean
//     highlightQuadrant?: 1 | 2 | 3 | 4
//     exact?: { theta: string, sin: string, cos: string, tan?: string }  // labels
//     showAstc?: boolean
//   }

import { motion } from "framer-motion";
import type { ArtifactState } from "@/lib/learn/types";
import { COLORS } from "./util";

const W = 380;
const H = 380;
const CX = W / 2;
const CY = H / 2;
const R = 130;

export function UnitCircle({ state, focus }: { state: ArtifactState; focus?: string | string[] }) {
  const angle = (state.angle as number | undefined) ?? 0;
  const showSin = state.showSin === true;
  const showCos = state.showCos === true;
  const showTan = state.showTan === true;
  const showQuadrants = state.showQuadrants !== false;
  const highlightQuadrant = state.highlightQuadrant as 1 | 2 | 3 | 4 | undefined;
  const exact = state.exact as { theta?: string; sin?: string; cos?: string; tan?: string } | undefined;
  const showAstc = state.showAstc === true;

  // Terminal point: (cos θ, sin θ) mapped into pixel space.
  const tx = CX + R * Math.cos(angle);
  const ty = CY - R * Math.sin(angle); // SVG y is inverted

  // Quadrant rectangles for highlight
  const qRects: Record<number, { x: number; y: number; w: number; h: number }> = {
    1: { x: CX, y: CY - R, w: R, h: R },
    2: { x: CX - R, y: CY - R, w: R, h: R },
    3: { x: CX - R, y: CY, w: R, h: R },
    4: { x: CX, y: CY, w: R, h: R },
  };

  return (
    <div className="rounded-2xl bg-[var(--learn-surface)] border border-[var(--learn-line)] p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
        <defs>
          <marker id="uc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.inkMute} />
          </marker>
        </defs>

        {/* Highlighted quadrant */}
        {highlightQuadrant && (
          <rect
            {...qRects[highlightQuadrant]}
            fill={COLORS.accent}
            opacity={0.08}
          />
        )}

        {/* Quadrant ASTC labels */}
        {showAstc && (
          <g fontFamily="ui-monospace, monospace" fontSize={11} fill={COLORS.inkDim}>
            <text x={CX + R * 0.7} y={CY - R * 0.7} textAnchor="middle">A</text>
            <text x={CX - R * 0.7} y={CY - R * 0.7} textAnchor="middle">S</text>
            <text x={CX - R * 0.7} y={CY + R * 0.7 + 4} textAnchor="middle">T</text>
            <text x={CX + R * 0.7} y={CY + R * 0.7 + 4} textAnchor="middle">C</text>
          </g>
        )}

        {/* Axes */}
        <line x1={CX - R - 30} x2={CX + R + 30} y1={CY} y2={CY} stroke={COLORS.inkDim} strokeWidth={1.5} markerEnd="url(#uc-arrow)" markerStart="url(#uc-arrow)" />
        <line x1={CX} x2={CX} y1={CY + R + 30} y2={CY - R - 30} stroke={COLORS.inkDim} strokeWidth={1.5} markerEnd="url(#uc-arrow)" markerStart="url(#uc-arrow)" />

        {/* Quadrant separators (faint) */}
        {showQuadrants && (
          <g stroke={COLORS.line} strokeWidth={1} strokeDasharray="2 3" opacity={0.5}>
            <line x1={CX} x2={CX} y1={CY - R} y2={CY + R} />
            <line x1={CX - R} x2={CX + R} y1={CY} y2={CY} />
          </g>
        )}

        {/* Unit circle */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={COLORS.inkDim} strokeWidth={1.5} />

        {/* Tick marks at ±1 on each axis */}
        <g fontSize={10} fill={COLORS.inkMute} fontFamily="ui-monospace, monospace">
          <text x={CX + R} y={CY + 14} textAnchor="middle">1</text>
          <text x={CX - R} y={CY + 14} textAnchor="middle">−1</text>
          <text x={CX - 6} y={CY - R + 4} textAnchor="end">1</text>
          <text x={CX - 6} y={CY + R + 4} textAnchor="end">−1</text>
        </g>

        {/* Angle arc */}
        <path
          d={describeArc(CX, CY, 26, 0, angle)}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={1.5}
          opacity={0.7}
        />

        {/* Cos projection */}
        {showCos && (
          <motion.line
            initial={false}
            animate={{ x1: tx, y1: ty, x2: tx, y2: CY }}
            transition={{ duration: 0.4 }}
            x1={tx} y1={ty} x2={tx} y2={CY}
            stroke={COLORS.warning}
            strokeWidth={2}
            strokeDasharray="4 3"
          />
        )}
        {showCos && (
          <motion.line
            initial={false}
            animate={{ x1: CX, y1: CY, x2: tx, y2: CY }}
            transition={{ duration: 0.4 }}
            stroke={COLORS.warning}
            strokeWidth={3}
          />
        )}

        {/* Sin projection */}
        {showSin && (
          <motion.line
            initial={false}
            animate={{ x1: tx, y1: ty, x2: CX, y2: ty }}
            transition={{ duration: 0.4 }}
            stroke={COLORS.success}
            strokeWidth={2}
            strokeDasharray="4 3"
          />
        )}
        {showSin && (
          <motion.line
            initial={false}
            animate={{ x1: CX, y1: CY, x2: CX, y2: ty }}
            transition={{ duration: 0.4 }}
            stroke={COLORS.success}
            strokeWidth={3}
          />
        )}

        {/* Tangent line — vertical at x=R, from x-axis to terminal-extended */}
        {showTan && Math.abs(Math.cos(angle)) > 0.05 && (
          <motion.line
            initial={false}
            animate={{ x1: CX + R, y1: CY, x2: CX + R, y2: CY - R * Math.tan(angle) }}
            transition={{ duration: 0.4 }}
            stroke={COLORS.danger}
            strokeWidth={3}
          />
        )}

        {/* Terminal ray from origin */}
        <motion.line
          initial={false}
          animate={{ x1: CX, y1: CY, x2: tx, y2: ty }}
          transition={{ duration: 0.4 }}
          stroke={COLORS.accent}
          strokeWidth={2.5}
        />
        {/* Terminal point */}
        <motion.circle
          initial={false}
          animate={{ cx: tx, cy: ty }}
          transition={{ duration: 0.4 }}
          r={6}
          fill={COLORS.accent}
          stroke={COLORS.surface}
          strokeWidth={2.5}
        />

        {/* Exact-value label box */}
        {exact && (
          <g>
            <rect
              x={CX + R + 20}
              y={CY - R - 10}
              width={120}
              height={68}
              rx={8}
              fill={COLORS.surface}
              stroke={COLORS.lineStrong}
              strokeWidth={1}
            />
            <text x={CX + R + 30} y={CY - R + 5} fontSize={11} fontFamily="ui-monospace, monospace" fill={COLORS.inkMute}>θ = {exact.theta}</text>
            <text x={CX + R + 30} y={CY - R + 22} fontSize={11} fontFamily="ui-monospace, monospace" fill={COLORS.success}>sin = {exact.sin}</text>
            <text x={CX + R + 30} y={CY - R + 39} fontSize={11} fontFamily="ui-monospace, monospace" fill={COLORS.warning}>cos = {exact.cos}</text>
            {exact.tan && (
              <text x={CX + R + 30} y={CY - R + 56} fontSize={11} fontFamily="ui-monospace, monospace" fill={COLORS.danger}>tan = {exact.tan}</text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}

// SVG arc descriptor — center (cx, cy), radius r, sweep from angleStart to angleEnd (radians, CCW from +x).
function describeArc(cx: number, cy: number, r: number, startRad: number, endRad: number): string {
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy - r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy - r * Math.sin(endRad);
  const largeArc = Math.abs(endRad - startRad) > Math.PI ? 1 : 0;
  const sweep = endRad > startRad ? 0 : 1;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
}
