"use client";

// ArtifactHost — dispatches to the correct artifact component based on
// `kind`. Each artifact reads its own slice of `state` and animates in
// response to changes when the beat advances.

import type { ArtifactKind, ArtifactState } from "@/lib/learn/types";
import { CoordinatePlane } from "./artifacts/coordinate-plane";
import { UnitCircle } from "./artifacts/unit-circle";
import { PolarPlane } from "./artifacts/polar-plane";
import { FunctionTable } from "./artifacts/function-table";
import { AlgebraLadder } from "./artifacts/algebra-ladder";
import { Triangle } from "./artifacts/triangle";
import { NumberLine } from "./artifacts/number-line";
import { SequenceList } from "./artifacts/sequence-list";
import { SinusoidalBuilder } from "./artifacts/sinusoidal-builder";
import { Comparison } from "./artifacts/comparison";

export function ArtifactHost({
  kind,
  state,
  focus,
  className,
}: {
  kind: ArtifactKind;
  state: ArtifactState;
  focus?: string | string[];
  className?: string;
}) {
  if (kind === "none") return null;
  return <div className={className}>{render(kind, state, focus)}</div>;
}

function render(kind: ArtifactKind, state: ArtifactState, focus?: string | string[]) {
  switch (kind) {
    case "coordinate-plane": return <CoordinatePlane state={state} focus={focus} />;
    case "unit-circle": return <UnitCircle state={state} focus={focus} />;
    case "polar-plane": return <PolarPlane state={state} focus={focus} />;
    case "function-table": return <FunctionTable state={state} focus={focus} />;
    case "algebra-ladder": return <AlgebraLadder state={state} focus={focus} />;
    case "triangle": return <Triangle state={state} focus={focus} />;
    case "number-line": return <NumberLine state={state} focus={focus} />;
    case "sequence-list": return <SequenceList state={state} focus={focus} />;
    case "sinusoidal-builder": return <SinusoidalBuilder state={state} focus={focus} />;
    case "comparison": return <Comparison state={state} focus={focus} />;
    default: return null;
  }
}
