"use client";

// Comparison — two artifacts side by side. Used when narration crosses
// between two plots, two tables, two formulas, etc.
//
// State shape:
//   {
//     left: { kind: ArtifactKind, state: ArtifactState, label?: string }
//     right: { kind: ArtifactKind, state: ArtifactState, label?: string }
//   }

import type { ArtifactKind, ArtifactState } from "@/lib/learn/types";
import { CoordinatePlane } from "./coordinate-plane";
import { UnitCircle } from "./unit-circle";
import { PolarPlane } from "./polar-plane";
import { FunctionTable } from "./function-table";
import { AlgebraLadder } from "./algebra-ladder";
import { Triangle } from "./triangle";
import { NumberLine } from "./number-line";
import { SequenceList } from "./sequence-list";

type Side = { kind: ArtifactKind; state: ArtifactState; label?: string };

export function Comparison({ state, focus }: { state: ArtifactState; focus?: string | string[] }) {
  const left = state.left as Side | undefined;
  const right = state.right as Side | undefined;
  if (!left || !right) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      <SidePane side={left} focus={focus} />
      <SidePane side={right} focus={focus} />
    </div>
  );
}

function SidePane({ side, focus }: { side: Side; focus?: string | string[] }) {
  return (
    <div className="space-y-2">
      {side.label && (
        <div className="text-xs font-medium text-center text-[var(--learn-ink-dim)]">{side.label}</div>
      )}
      {renderInner(side.kind, side.state, focus)}
    </div>
  );
}

function renderInner(kind: ArtifactKind, state: ArtifactState, focus?: string | string[]) {
  switch (kind) {
    case "coordinate-plane": return <CoordinatePlane state={state} focus={focus} />;
    case "unit-circle": return <UnitCircle state={state} focus={focus} />;
    case "polar-plane": return <PolarPlane state={state} focus={focus} />;
    case "function-table": return <FunctionTable state={state} focus={focus} />;
    case "algebra-ladder": return <AlgebraLadder state={state} focus={focus} />;
    case "triangle": return <Triangle state={state} focus={focus} />;
    case "number-line": return <NumberLine state={state} focus={focus} />;
    case "sequence-list": return <SequenceList state={state} focus={focus} />;
    default: return null;
  }
}
