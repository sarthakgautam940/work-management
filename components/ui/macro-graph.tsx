"use client";

import { motion } from "framer-motion";
import type { GraphState } from "@/lib/data/ap-crash/types";

// Single component renders any of 5 graph types. Curves animate between
// initial and shifted positions via framer-motion. Kept clean and minimal —
// no labels overflow, no axis ticks, just clear axes + labeled curves.

type GraphType = "ad-as" | "money-market" | "loanable-funds" | "phillips" | "forex";

const W = 320;
const H = 240;
const PAD = 40;
const PLOT_W = W - 2 * PAD;
const PLOT_H = H - 2 * PAD;

// Position offsets along the X axis (for shifters).
function xOffset(pos: "left" | "center" | "right" | undefined): number {
  if (pos === "left") return -45;
  if (pos === "right") return 45;
  return 0;
}

// Y offset for SRPC shifts (vertical).
function yOffset(pos: "left" | "center" | "right" | undefined): number {
  if (pos === "left") return -25;
  if (pos === "right") return 25;
  return 0;
}

const TRANSITION = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

export function MacroGraph({ type, state }: { type: GraphType; state: GraphState }) {
  return (
    <div className="rounded-xl border border-line bg-bg-elevated/40 p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label={`${type} graph`}>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill="currentColor" />
          </marker>
        </defs>

        {/* Axes */}
        <line x1={PAD} y1={H - PAD} x2={W - PAD + 5} y2={H - PAD} stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1={PAD} y1={H - PAD} x2={PAD} y2={PAD - 5} stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {type === "ad-as" && <AdAsGraph state={state} />}
        {type === "money-market" && <MoneyMarketGraph state={state} />}
        {type === "loanable-funds" && <LoanableFundsGraph state={state} />}
        {type === "phillips" && <PhillipsGraph state={state} />}
        {type === "forex" && <ForexGraph state={state} />}

        {/* Axis labels */}
        <text x={PAD - 6} y={PAD - 14} textAnchor="end" className="fill-ink-mute" style={{ font: "10px monospace" }}>
          {axisLabels(type).y}
        </text>
        <text x={W - PAD + 8} y={H - PAD + 4} textAnchor="start" className="fill-ink-mute" style={{ font: "10px monospace" }}>
          {axisLabels(type).x}
        </text>
      </svg>
    </div>
  );
}

function axisLabels(type: GraphType): { x: string; y: string } {
  switch (type) {
    case "ad-as": return { x: "Real GDP", y: "Price Level" };
    case "money-market": return { x: "Q of money", y: "Nominal i" };
    case "loanable-funds": return { x: "Q of LF", y: "Real i" };
    case "phillips": return { x: "Unemployment", y: "Inflation" };
    case "forex": return { x: "Q of currency", y: "Exchange rate" };
  }
}

// ─────────────────────────────────────────────────────────────────────
// AD/AS: AD downward, SRAS upward, LRAS vertical
// ─────────────────────────────────────────────────────────────────────
function AdAsGraph({ state }: { state: GraphState }) {
  const adX = xOffset(state.ad);
  const srasX = xOffset(state.sras);
  const lrasX = xOffset(state.lras);

  // AD: from top-left to bottom-right
  const adInitial = { x1: PAD + 30, y1: PAD + 10, x2: W - PAD - 30, y2: H - PAD - 10 };
  // SRAS: from bottom-left to top-right
  const srasInitial = { x1: PAD + 30, y1: H - PAD - 10, x2: W - PAD - 30, y2: PAD + 30 };
  // LRAS: vertical at center
  const lrasInitial = { x1: PAD + PLOT_W * 0.55, y1: PAD + 10, x2: PAD + PLOT_W * 0.55, y2: H - PAD - 10 };

  return (
    <>
      {/* LRAS — vertical line, doesn't usually shift much in our examples */}
      <motion.line
        animate={{ x1: lrasInitial.x1 + lrasX, x2: lrasInitial.x2 + lrasX, y1: lrasInitial.y1, y2: lrasInitial.y2 }}
        transition={TRANSITION}
        stroke="#fbbf24"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <motion.text animate={{ x: lrasInitial.x1 + lrasX + 5 }} y={PAD + 8} className="fill-accent-amber" style={{ font: "10px monospace" }}>
        LRAS
      </motion.text>

      {/* SRAS */}
      <motion.line
        animate={{ x1: srasInitial.x1 + srasX, x2: srasInitial.x2 + srasX, y1: srasInitial.y1, y2: srasInitial.y2 }}
        transition={TRANSITION}
        stroke="#a3e635"
        strokeWidth="2"
      />
      <motion.text animate={{ x: srasInitial.x2 + srasX + 4 }} y={PAD + 36} className="fill-accent-lime" style={{ font: "10px monospace" }}>
        SRAS
      </motion.text>

      {/* AD */}
      <motion.line
        animate={{ x1: adInitial.x1 + adX, x2: adInitial.x2 + adX, y1: adInitial.y1, y2: adInitial.y2 }}
        transition={TRANSITION}
        stroke="#60a5fa"
        strokeWidth="2"
      />
      <motion.text animate={{ x: adInitial.x2 + adX + 4 }} y={H - PAD - 4} className="fill-accent-blue" style={{ font: "10px monospace" }}>
        AD
      </motion.text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Money Market: MS vertical, MD downward
// ─────────────────────────────────────────────────────────────────────
function MoneyMarketGraph({ state }: { state: GraphState }) {
  const msX = xOffset(state.ms);
  const mdX = xOffset(state.md);

  const msInitial = { x1: PAD + PLOT_W * 0.5, y1: PAD + 10, x2: PAD + PLOT_W * 0.5, y2: H - PAD - 10 };
  const mdInitial = { x1: PAD + 20, y1: PAD + 20, x2: W - PAD - 20, y2: H - PAD - 20 };

  return (
    <>
      <motion.line
        animate={{ x1: msInitial.x1 + msX, x2: msInitial.x2 + msX, y1: msInitial.y1, y2: msInitial.y2 }}
        transition={TRANSITION}
        stroke="#a3e635"
        strokeWidth="2"
      />
      <motion.text animate={{ x: msInitial.x1 + msX + 5 }} y={PAD + 8} className="fill-accent-lime" style={{ font: "10px monospace" }}>
        MS
      </motion.text>

      <motion.line
        animate={{ x1: mdInitial.x1 + mdX, x2: mdInitial.x2 + mdX, y1: mdInitial.y1, y2: mdInitial.y2 }}
        transition={TRANSITION}
        stroke="#60a5fa"
        strokeWidth="2"
      />
      <motion.text animate={{ x: mdInitial.x2 + mdX + 4 }} y={H - PAD - 14} className="fill-accent-blue" style={{ font: "10px monospace" }}>
        MD
      </motion.text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Loanable Funds: SLF upward, DLF downward
// ─────────────────────────────────────────────────────────────────────
function LoanableFundsGraph({ state }: { state: GraphState }) {
  const dlfX = xOffset(state.dlf);
  const slfX = xOffset(state.slf);

  const slfInitial = { x1: PAD + 30, y1: H - PAD - 20, x2: W - PAD - 30, y2: PAD + 20 };
  const dlfInitial = { x1: PAD + 20, y1: PAD + 20, x2: W - PAD - 30, y2: H - PAD - 20 };

  return (
    <>
      <motion.line
        animate={{ x1: slfInitial.x1 + slfX, x2: slfInitial.x2 + slfX, y1: slfInitial.y1, y2: slfInitial.y2 }}
        transition={TRANSITION}
        stroke="#a3e635"
        strokeWidth="2"
      />
      <motion.text animate={{ x: slfInitial.x2 + slfX + 4 }} y={PAD + 26} className="fill-accent-lime" style={{ font: "10px monospace" }}>
        SLF
      </motion.text>

      <motion.line
        animate={{ x1: dlfInitial.x1 + dlfX, x2: dlfInitial.x2 + dlfX, y1: dlfInitial.y1, y2: dlfInitial.y2 }}
        transition={TRANSITION}
        stroke="#60a5fa"
        strokeWidth="2"
      />
      <motion.text animate={{ x: dlfInitial.x2 + dlfX + 4 }} y={H - PAD - 14} className="fill-accent-blue" style={{ font: "10px monospace" }}>
        DLF
      </motion.text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Phillips Curve: SRPC downward, LRPC vertical at NRU
// ─────────────────────────────────────────────────────────────────────
function PhillipsGraph({ state }: { state: GraphState }) {
  const srpcX = xOffset(state.srpc);

  const lrpcInitial = { x1: PAD + PLOT_W * 0.5, y1: PAD + 10, x2: PAD + PLOT_W * 0.5, y2: H - PAD - 10 };
  // SRPC: top-left to bottom-right
  const srpcInitial = { x1: PAD + 20, y1: PAD + 20, x2: W - PAD - 30, y2: H - PAD - 20 };

  // Movement dot for "phillipsMove" mode
  let dotPos = { x: PAD + PLOT_W * 0.55, y: PAD + 70 };
  if (state.phillipsMove === "up-left") dotPos = { x: PAD + PLOT_W * 0.35, y: PAD + 30 };
  else if (state.phillipsMove === "down-right") dotPos = { x: PAD + PLOT_W * 0.75, y: H - PAD - 40 };

  return (
    <>
      <motion.line
        animate={{ x1: lrpcInitial.x1, x2: lrpcInitial.x2, y1: lrpcInitial.y1, y2: lrpcInitial.y2 }}
        transition={TRANSITION}
        stroke="#fbbf24"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <motion.text x={lrpcInitial.x1 + 5} y={PAD + 8} className="fill-accent-amber" style={{ font: "10px monospace" }}>
        LRPC
      </motion.text>

      <motion.line
        animate={{ x1: srpcInitial.x1 + srpcX, x2: srpcInitial.x2 + srpcX, y1: srpcInitial.y1, y2: srpcInitial.y2 }}
        transition={TRANSITION}
        stroke="#fb7185"
        strokeWidth="2"
      />
      <motion.text animate={{ x: srpcInitial.x2 + srpcX + 4 }} y={H - PAD - 14} className="fill-accent-rose" style={{ font: "10px monospace" }}>
        SRPC
      </motion.text>

      {state.phillipsMove && state.phillipsMove !== "none" && (
        <motion.circle
          animate={{ cx: dotPos.x, cy: dotPos.y }}
          transition={TRANSITION}
          r="5"
          fill="#a3e635"
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Forex: D downward, S upward
// ─────────────────────────────────────────────────────────────────────
function ForexGraph({ state }: { state: GraphState }) {
  const dX = xOffset(state.dCurrency);
  const sX = xOffset(state.sCurrency);

  const sInitial = { x1: PAD + 30, y1: H - PAD - 20, x2: W - PAD - 30, y2: PAD + 20 };
  const dInitial = { x1: PAD + 20, y1: PAD + 20, x2: W - PAD - 30, y2: H - PAD - 20 };

  return (
    <>
      <motion.line
        animate={{ x1: sInitial.x1 + sX, x2: sInitial.x2 + sX, y1: sInitial.y1, y2: sInitial.y2 }}
        transition={TRANSITION}
        stroke="#a3e635"
        strokeWidth="2"
      />
      <motion.text animate={{ x: sInitial.x2 + sX + 4 }} y={PAD + 26} className="fill-accent-lime" style={{ font: "10px monospace" }}>
        S
      </motion.text>

      <motion.line
        animate={{ x1: dInitial.x1 + dX, x2: dInitial.x2 + dX, y1: dInitial.y1, y2: dInitial.y2 }}
        transition={TRANSITION}
        stroke="#60a5fa"
        strokeWidth="2"
      />
      <motion.text animate={{ x: dInitial.x2 + dX + 4 }} y={H - PAD - 14} className="fill-accent-blue" style={{ font: "10px monospace" }}>
        D
      </motion.text>
    </>
  );
}
