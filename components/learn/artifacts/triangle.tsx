"use client";

// Triangle — small triangle with sides + angles labelable.
//
// State shape:
//   {
//     kind: "30-60-90" | "45-45-90" | "general"
//     sides?: { a?: string, b?: string, c?: string }   // labels (e.g. "1", "√3", "2")
//     angles?: { A?: string, B?: string, C?: string }  // labels (e.g. "30°", "π/6")
//     highlightSide?: "a" | "b" | "c"
//     highlightAngle?: "A" | "B" | "C"
//   }
//
// For 30-60-90 the angle at A is 30, at B is 60, right angle at C.
// Side a is opposite A (short side), b opposite B (medium), c opposite C (hypotenuse).

import { motion } from "framer-motion";
import type { ArtifactState } from "@/lib/learn/types";
import { COLORS } from "./util";

const W = 320;
const H = 240;

export function Triangle({ state, focus }: { state: ArtifactState; focus?: string | string[] }) {
  const kind = (state.kind as string | undefined) ?? "general";
  const sides = (state.sides as { a?: string; b?: string; c?: string } | undefined) ?? {};
  const angles = (state.angles as { A?: string; B?: string; C?: string } | undefined) ?? {};
  const highlightSide = state.highlightSide as "a" | "b" | "c" | undefined;
  const highlightAngle = state.highlightAngle as "A" | "B" | "C" | undefined;

  // Compute triangle vertices for the chosen kind.
  // C is at the right angle (bottom-right). A is bottom-left. B is top.
  let A: [number, number], B: [number, number], C: [number, number];
  if (kind === "30-60-90") {
    // Short side at bottom (a from C horizontally to A length √3), height 1
    A = [60, 200];
    C = [260, 200];
    B = [260, 60];   // vertical leg
    // Actually for 30 at A, 60 at B, 90 at C: side a (opposite A, short) is BC (vertical),
    // side b (opposite B, longer leg) is AC (horizontal), side c (opposite C, hypotenuse) is AB.
  } else if (kind === "45-45-90") {
    A = [60, 200];
    C = [260, 200];
    B = [260, 60];
  } else {
    A = [50, 200];
    C = [260, 200];
    B = [200, 50];
  }

  const sideStroke = (s: "a" | "b" | "c") => (highlightSide === s ? COLORS.accent : COLORS.inkDim);
  const sideWidth = (s: "a" | "b" | "c") => (highlightSide === s ? 3 : 2);

  // Side midpoints for labels.
  const mid = (p1: [number, number], p2: [number, number]): [number, number] => [
    (p1[0] + p2[0]) / 2,
    (p1[1] + p2[1]) / 2,
  ];
  // a opposite A → side BC. b opposite B → AC. c opposite C → AB.
  const midBC = mid(B, C);
  const midAC = mid(A, C);
  const midAB = mid(A, B);

  return (
    <div className="rounded-2xl bg-[var(--learn-surface)] border border-[var(--learn-line)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
        {/* Triangle edges */}
        <motion.line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={sideStroke("a")} strokeWidth={sideWidth("a")} animate={{}} />
        <motion.line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={sideStroke("b")} strokeWidth={sideWidth("b")} animate={{}} />
        <motion.line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={sideStroke("c")} strokeWidth={sideWidth("c")} animate={{}} />

        {/* Right angle marker at C */}
        {(kind === "30-60-90" || kind === "45-45-90") && (
          <rect x={C[0] - 12} y={C[1] - 12} width={12} height={12} fill="none" stroke={COLORS.inkMute} strokeWidth={1.2} />
        )}

        {/* Vertex dots */}
        <circle cx={A[0]} cy={A[1]} r={3.5} fill={COLORS.ink} />
        <circle cx={B[0]} cy={B[1]} r={3.5} fill={COLORS.ink} />
        <circle cx={C[0]} cy={C[1]} r={3.5} fill={COLORS.ink} />

        {/* Vertex labels */}
        <text x={A[0] - 14} y={A[1] + 4} fontSize={13} fontFamily="ui-monospace, monospace" fill={highlightAngle === "A" ? COLORS.accent : COLORS.inkDim} fontWeight={highlightAngle === "A" ? 700 : 400}>A</text>
        <text x={B[0] + 8} y={B[1] - 4} fontSize={13} fontFamily="ui-monospace, monospace" fill={highlightAngle === "B" ? COLORS.accent : COLORS.inkDim} fontWeight={highlightAngle === "B" ? 700 : 400}>B</text>
        <text x={C[0] + 8} y={C[1] + 14} fontSize={13} fontFamily="ui-monospace, monospace" fill={highlightAngle === "C" ? COLORS.accent : COLORS.inkDim} fontWeight={highlightAngle === "C" ? 700 : 400}>C</text>

        {/* Angle labels (small offset toward inside) */}
        {angles.A && (
          <text x={A[0] + 16} y={A[1] - 6} fontSize={11} fontFamily="ui-monospace, monospace" fill={highlightAngle === "A" ? COLORS.accent : COLORS.inkMute}>{angles.A}</text>
        )}
        {angles.B && (
          <text x={B[0] - 22} y={B[1] + 16} fontSize={11} fontFamily="ui-monospace, monospace" fill={highlightAngle === "B" ? COLORS.accent : COLORS.inkMute}>{angles.B}</text>
        )}
        {angles.C && (
          <text x={C[0] - 28} y={C[1] - 4} fontSize={11} fontFamily="ui-monospace, monospace" fill={highlightAngle === "C" ? COLORS.accent : COLORS.inkMute}>{angles.C}</text>
        )}

        {/* Side labels */}
        {sides.a && (
          <text x={midBC[0] + 14} y={midBC[1] + 4} fontSize={13} fontFamily="ui-monospace, monospace" fill={highlightSide === "a" ? COLORS.accent : COLORS.inkDim} fontWeight={highlightSide === "a" ? 700 : 400}>a = {sides.a}</text>
        )}
        {sides.b && (
          <text x={midAC[0] - 8} y={midAC[1] + 18} fontSize={13} fontFamily="ui-monospace, monospace" fill={highlightSide === "b" ? COLORS.accent : COLORS.inkDim} fontWeight={highlightSide === "b" ? 700 : 400}>b = {sides.b}</text>
        )}
        {sides.c && (
          <text x={midAB[0] - 50} y={midAB[1] - 4} fontSize={13} fontFamily="ui-monospace, monospace" fill={highlightSide === "c" ? COLORS.accent : COLORS.inkDim} fontWeight={highlightSide === "c" ? 700 : 400}>c = {sides.c}</text>
        )}
      </svg>
    </div>
  );
}
