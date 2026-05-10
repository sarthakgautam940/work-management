"use client";

// ArtifactHost — the visual instrument the lesson plays on.
//
// In PR D this is mostly a placeholder that names which artifact would
// render and shows the current state JSON for debugging. In PR E each
// kind gets a real implementation. The contract here doesn't change:
// the host receives a `kind` + `state` and is responsible for animating
// state changes between beats.

import type { ArtifactKind, ArtifactState } from "@/lib/learn/types";

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
  return (
    <div
      className={`rounded-2xl border-2 border-dashed border-[var(--learn-line-strong)] bg-[var(--learn-elevated)] aspect-[4/3] flex flex-col items-center justify-center p-8 text-center ${className ?? ""}`}
    >
      <div className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--learn-ink-mute)] mb-3">
        Artifact placeholder
      </div>
      <div className="text-base font-semibold text-[var(--learn-ink)] mb-2">
        {kindLabel(kind)}
      </div>
      <div className="text-xs text-[var(--learn-ink-mute)] max-w-sm leading-relaxed">
        Real interactive {kindLabel(kind).toLowerCase()} ships in PR E.
      </div>
      {(Object.keys(state).length > 0 || focus) && (
        <div className="mt-6 w-full max-w-md text-left">
          {focus && (
            <div className="text-2xs font-mono uppercase tracking-[0.16em] text-[var(--learn-accent)] mb-1">
              Focus: {Array.isArray(focus) ? focus.join(", ") : focus}
            </div>
          )}
          {Object.keys(state).length > 0 && (
            <pre className="text-2xs font-mono text-[var(--learn-ink-dim)] bg-[var(--learn-surface)] border border-[var(--learn-line)] rounded-lg p-3 overflow-x-auto">
              {JSON.stringify(state, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

function kindLabel(kind: ArtifactKind): string {
  return {
    "coordinate-plane": "Coordinate Plane",
    "unit-circle": "Unit Circle",
    "polar-plane": "Polar Plane",
    "function-table": "Function Table",
    "algebra-ladder": "Algebra Ladder",
    "triangle": "Triangle",
    "number-line": "Number Line",
    "sequence-list": "Sequence List",
    "sinusoidal-builder": "Sinusoidal Builder",
    "comparison": "Comparison",
    "none": "—",
  }[kind];
}
