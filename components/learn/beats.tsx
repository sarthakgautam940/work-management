"use client";

// One renderer per beat type. Each renderer either:
//   1. Sets `interactionComplete = true` immediately (passive beats), OR
//   2. Tracks user interaction (predict, try-it, checkpoint) and only
//      flips `interactionComplete` when the user has cleared the gate.
//
// All renderers receive an `onComplete` callback to call when the
// interaction is finished, and read interaction state from local hooks.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import type { Beat } from "@/lib/learn/types";
import { Math, MathText } from "./math";
import { LearnButton, LearnPill } from "./primitives";

type BeatRendererProps<T extends Beat = Beat> = {
  beat: T;
  // beatKey lets us namespace any per-beat localStorage / state, e.g.
  // a checkpoint's chosen answer survives navigation.
  beatKey: string;
  onComplete: () => void;
  // Whether the current beat has been "completed" (either passively on
  // first render or by the user clearing the interaction gate).
  isComplete: boolean;
};

// ──────────────────────────────────────────────────────────────────────
// Common beat shell — handles fade-in animation, max-width, narration.
// ──────────────────────────────────────────────────────────────────────

function BeatShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-2xl ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Passive beats — narrate, highlight, transform, compare, recall, summary
// ──────────────────────────────────────────────────────────────────────

function IntroBeat({ beat }: { beat: Extract<Beat, { type: "intro" }> }) {
  return (
    <BeatShell>
      <LearnPill tone="accent">Lesson</LearnPill>
      <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] text-[var(--learn-ink)]">
        {beat.title}
      </h1>
      <p className="mt-4 text-base text-[var(--learn-ink-dim)] leading-relaxed">{beat.stake}</p>
    </BeatShell>
  );
}

function NarrateBeat({ beat }: { beat: Extract<Beat, { type: "narrate" }> }) {
  return (
    <BeatShell>
      <p className="text-lg text-[var(--learn-ink)] leading-relaxed">
        <MathText>{beat.text}</MathText>
      </p>
      {beat.math && (
        <div className="mt-4 py-3 px-4 rounded-xl bg-[var(--learn-elevated)] border border-[var(--learn-line)]">
          <Math tex={beat.math} block />
        </div>
      )}
    </BeatShell>
  );
}

function HighlightBeat({ beat }: { beat: Extract<Beat, { type: "highlight" }> }) {
  return (
    <BeatShell>
      <div className="flex items-start gap-3">
        <div className="w-1 self-stretch rounded-full bg-[var(--learn-accent)] shrink-0 mt-1" />
        <div className="flex-1">
          <p className="text-lg text-[var(--learn-ink)] leading-relaxed">
            <MathText>{beat.text}</MathText>
          </p>
          {beat.math && (
            <div className="mt-3">
              <Math tex={beat.math} block />
            </div>
          )}
        </div>
      </div>
    </BeatShell>
  );
}

function TransformBeat({ beat }: { beat: Extract<Beat, { type: "transform" }> }) {
  return (
    <BeatShell>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-[var(--learn-accent)]" />
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--learn-accent)]">
          Watch the artifact
        </span>
      </div>
      <p className="text-lg text-[var(--learn-ink)] leading-relaxed">
        <MathText>{beat.text}</MathText>
      </p>
    </BeatShell>
  );
}

function CompareBeat({ beat }: { beat: Extract<Beat, { type: "compare" }> }) {
  return (
    <BeatShell>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--learn-ink-mute)]">
          Compare
        </span>
      </div>
      <p className="text-lg text-[var(--learn-ink)] leading-relaxed">
        <MathText>{beat.text}</MathText>
      </p>
    </BeatShell>
  );
}

function DeriveBeat({ beat }: { beat: Extract<Beat, { type: "derive" }> }) {
  return (
    <BeatShell>
      <p className="text-base text-[var(--learn-ink-dim)] leading-relaxed mb-3">
        <MathText>{beat.text}</MathText>
      </p>
      <div className="rounded-xl bg-[var(--learn-elevated)] border border-[var(--learn-line)] px-5 py-4">
        <Math tex={beat.line} block />
      </div>
      {beat.because && (
        <p className="mt-3 text-sm text-[var(--learn-ink-mute)] leading-relaxed">
          <span className="font-medium text-[var(--learn-ink-dim)]">Because:</span>{" "}
          <MathText>{beat.because}</MathText>
        </p>
      )}
    </BeatShell>
  );
}

function RecallBeat({ beat, beatKey }: { beat: Extract<Beat, { type: "recall" }>; beatKey: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <BeatShell>
      <div className="flex items-center gap-2 mb-3">
        <RotateCcw size={14} className="text-[var(--learn-ink-mute)]" />
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--learn-ink-mute)]">
          Recall — from earlier
        </span>
      </div>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full text-left rounded-xl border border-[var(--learn-line-strong)] bg-[var(--learn-surface)] hover:border-[var(--learn-accent-line)] transition-colors px-5 py-6"
      >
        <div className="text-base text-[var(--learn-ink)] leading-relaxed">
          <MathText>{flipped ? beat.back : beat.front}</MathText>
        </div>
        <div className="mt-3 text-xs font-medium text-[var(--learn-accent)]">
          {flipped ? "Tap to hide" : "Tap to reveal"}
        </div>
      </button>
    </BeatShell>
  );
}

function SummaryBeat({ beat }: { beat: Extract<Beat, { type: "summary" }> }) {
  return (
    <BeatShell>
      <div className="flex items-center gap-2 mb-3">
        <Check size={16} className="text-emerald-600" />
        <span className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Summary
        </span>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-[var(--learn-ink)] mb-5">
        You can now
      </h2>
      <ul className="space-y-3">
        {beat.bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-base text-[var(--learn-ink)] leading-relaxed">
            <span className="font-mono text-sm text-emerald-600 mt-1 shrink-0">✓</span>
            <span>
              <MathText>{b}</MathText>
            </span>
          </li>
        ))}
      </ul>
      {beat.addToDeck && beat.addToDeck.length > 0 && (
        <div className="mt-5 px-4 py-3 rounded-lg bg-[var(--learn-accent-soft)] border border-[var(--learn-accent-line)]">
          <div className="text-xs font-medium text-[var(--learn-accent)]">
            +{beat.addToDeck.length} card{beat.addToDeck.length === 1 ? "" : "s"} added to your spaced-rep deck
          </div>
        </div>
      )}
    </BeatShell>
  );
}

function FormulaCardBeat({ beat }: { beat: Extract<Beat, { type: "formula-card" }> }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <BeatShell>
      <div className="text-xs font-medium uppercase tracking-wide text-[var(--learn-ink-mute)] mb-3">
        Formula
      </div>
      <h3 className="text-lg font-semibold text-[var(--learn-ink)] mb-4">{beat.title}</h3>
      <div className="rounded-2xl border border-[var(--learn-line-strong)] bg-[var(--learn-surface)] px-6 py-8 text-center">
        <Math tex={beat.formula} block className="text-[var(--learn-ink)]" />
      </div>
      {beat.derivation && beat.derivation.length > 0 && (
        <button
          onClick={() => setFlipped((f) => !f)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--learn-accent)] hover:underline"
        >
          {flipped ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {flipped ? "Hide derivation" : "Show derivation"}
        </button>
      )}
      <AnimatePresence>
        {flipped && beat.derivation && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-2">
              {beat.derivation.map((line, i) => (
                <div key={i} className="rounded-lg bg-[var(--learn-elevated)] border border-[var(--learn-line)] px-4 py-2.5">
                  <Math tex={line} block />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BeatShell>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Interactive beats — predict, try-it, checkpoint
// ──────────────────────────────────────────────────────────────────────

function PredictBeat({
  beat, onComplete, isComplete,
}: BeatRendererProps<Extract<Beat, { type: "predict" }>>) {
  const [picked, setPicked] = useState<number | null>(null);

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    onComplete();
  };

  return (
    <BeatShell>
      <div className="text-xs font-medium uppercase tracking-wide text-[var(--learn-accent)] mb-3">
        Before you click
      </div>
      <p className="text-lg text-[var(--learn-ink)] leading-relaxed mb-5">
        <MathText>{beat.prompt}</MathText>
      </p>
      <div className="space-y-2.5">
        {beat.choices.map((choice, i) => {
          const isPicked = picked === i;
          const isCorrect = choice.correct;
          const showResult = picked !== null;
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={picked !== null}
              className={`w-full text-left rounded-xl border-2 px-4 py-3.5 transition-colors ${
                showResult && isCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                  : showResult && isPicked
                  ? "border-red-300 bg-red-50 text-red-900"
                  : showResult
                  ? "border-[var(--learn-line)] bg-[var(--learn-surface)] text-[var(--learn-ink-mute)]"
                  : "border-[var(--learn-line-strong)] bg-[var(--learn-surface)] text-[var(--learn-ink)] hover:border-[var(--learn-accent-line)] hover:bg-[var(--learn-accent-soft)]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs uppercase tracking-wide text-[var(--learn-ink-mute)] mt-0.5">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-base leading-relaxed flex-1">
                  <MathText>{choice.label}</MathText>
                </span>
                {showResult && isCorrect && <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />}
                {showResult && isPicked && !isCorrect && <X size={16} className="text-red-600 shrink-0 mt-0.5" />}
              </div>
              {showResult && isPicked && choice.consequence && (
                <div className="mt-2 ml-7 text-sm leading-relaxed">
                  <MathText>{choice.consequence}</MathText>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 px-4 py-3 rounded-xl bg-[var(--learn-accent-soft)] border border-[var(--learn-accent-line)]"
        >
          <p className="text-sm text-[var(--learn-ink)] leading-relaxed">
            <MathText>{beat.reveal}</MathText>
          </p>
        </motion.div>
      )}
    </BeatShell>
  );
}

function TryItBeat({
  beat, onComplete, isComplete,
}: BeatRendererProps<Extract<Beat, { type: "try-it" }>>) {
  const [value, setValue] = useState((beat.knob.min + beat.knob.max) / 2);
  const [tried, setTried] = useState(false);

  const handleConfirm = () => {
    setTried(true);
    onComplete();
  };

  return (
    <BeatShell>
      <div className="text-xs font-medium uppercase tracking-wide text-[var(--learn-accent)] mb-3">
        Try it
      </div>
      <p className="text-lg text-[var(--learn-ink)] leading-relaxed mb-5">
        <MathText>{beat.prompt}</MathText>
      </p>
      <div className="rounded-xl border border-[var(--learn-line-strong)] bg-[var(--learn-surface)] px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--learn-ink)]">{beat.knob.param}</span>
          <span className="font-mono text-sm tabular-nums text-[var(--learn-ink)]">{value.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min={beat.knob.min}
          max={beat.knob.max}
          step={beat.knob.step}
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="w-full accent-[var(--learn-accent)]"
        />
        <div className="flex justify-between text-xs font-mono tabular-nums text-[var(--learn-ink-mute)] mt-1">
          <span>{beat.knob.min}</span>
          <span>{beat.knob.max}</span>
        </div>
      </div>
      {!tried ? (
        <div className="mt-5">
          <LearnButton onClick={handleConfirm}>I see it</LearnButton>
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-base text-[var(--learn-ink)] leading-relaxed"
        >
          <MathText>{beat.onDone}</MathText>
        </motion.p>
      )}
    </BeatShell>
  );
}

function CheckpointBeat({
  beat, onComplete, isComplete,
}: BeatRendererProps<Extract<Beat, { type: "checkpoint" }>>) {
  const [picked, setPicked] = useState<number | null>(null);
  const [followupPicked, setFollowupPicked] = useState<number | null>(null);
  const [retechShown, setRetechShown] = useState(false);

  const isWrong = picked !== null && picked !== beat.answer;
  const showReteach = isWrong && beat.reteach;

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === beat.answer) onComplete();
    else if (!beat.reteach) onComplete(); // wrong but no reteach gate
  };

  const pickFollowup = (i: number) => {
    if (followupPicked !== null) return;
    setFollowupPicked(i);
    if (i === beat.reteach!.followup.answer) onComplete();
  };

  return (
    <BeatShell>
      <div className="text-xs font-medium uppercase tracking-wide text-[var(--learn-accent)] mb-3">
        Checkpoint
      </div>
      <p className="text-lg text-[var(--learn-ink)] leading-relaxed mb-5">
        <MathText>{beat.prompt}</MathText>
      </p>
      <div className="space-y-2.5">
        {beat.choices.map((choice, i) => {
          const isPicked = picked === i;
          const isAnswer = i === beat.answer;
          const showResult = picked !== null;
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={picked !== null}
              className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-colors ${
                showResult && isAnswer
                  ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                  : showResult && isPicked
                  ? "border-red-300 bg-red-50 text-red-900"
                  : showResult
                  ? "border-[var(--learn-line)] bg-[var(--learn-surface)] text-[var(--learn-ink-mute)]"
                  : "border-[var(--learn-line-strong)] bg-[var(--learn-surface)] text-[var(--learn-ink)] hover:border-[var(--learn-accent-line)]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs uppercase tracking-wide text-[var(--learn-ink-mute)] mt-0.5">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-base leading-relaxed flex-1">
                  <MathText>{choice}</MathText>
                </span>
                {showResult && isAnswer && <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />}
                {showResult && isPicked && !isAnswer && <X size={16} className="text-red-600 shrink-0 mt-0.5" />}
              </div>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 px-4 py-3 rounded-xl border ${
            picked === beat.answer
              ? "bg-emerald-50 border-emerald-200"
              : "bg-[var(--learn-elevated)] border-[var(--learn-line)]"
          }`}
        >
          <p className="text-sm leading-relaxed text-[var(--learn-ink)]">
            <MathText>{beat.explain}</MathText>
          </p>
        </motion.div>
      )}
      {showReteach && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-2xl border-2 border-amber-300 bg-amber-50 px-5 py-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw size={14} className="text-amber-700" />
            <span className="text-xs font-medium uppercase tracking-wide text-amber-700">
              Reteach
            </span>
          </div>
          <h4 className="font-semibold text-base text-amber-900 mb-3">
            <MathText>{beat.reteach!.headline}</MathText>
          </h4>
          <div className="space-y-2 text-sm text-amber-900 leading-relaxed">
            {beat.reteach!.body.map((p, i) => (
              <p key={i}>
                <MathText>{p}</MathText>
              </p>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-amber-200">
            <p className="text-sm font-medium text-amber-900 mb-3">
              <MathText>{beat.reteach!.followup.prompt}</MathText>
            </p>
            <div className="space-y-2">
              {beat.reteach!.followup.choices.map((choice, i) => {
                const isPicked = followupPicked === i;
                const isAnswer = i === beat.reteach!.followup.answer;
                const showResult = followupPicked !== null;
                return (
                  <button
                    key={i}
                    onClick={() => pickFollowup(i)}
                    disabled={followupPicked !== null}
                    className={`w-full text-left rounded-lg border px-3 py-2.5 transition-colors text-sm ${
                      showResult && isAnswer
                        ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                        : showResult && isPicked
                        ? "border-red-300 bg-red-50 text-red-900"
                        : "border-amber-300 bg-white text-amber-900 hover:border-amber-500"
                    }`}
                  >
                    <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + i)}</span>
                    <MathText>{choice}</MathText>
                  </button>
                );
              })}
            </div>
            {followupPicked !== null && (
              <p className="mt-3 text-xs text-amber-900 leading-relaxed">
                <MathText>{beat.reteach!.followup.explain}</MathText>
              </p>
            )}
          </div>
        </motion.div>
      )}
    </BeatShell>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Dispatcher
// ──────────────────────────────────────────────────────────────────────

export function BeatRenderer(props: BeatRendererProps) {
  const { beat } = props;
  switch (beat.type) {
    case "intro": return <IntroBeat beat={beat} />;
    case "narrate": return <NarrateBeat beat={beat} />;
    case "highlight": return <HighlightBeat beat={beat} />;
    case "transform": return <TransformBeat beat={beat} />;
    case "compare": return <CompareBeat beat={beat} />;
    case "derive": return <DeriveBeat beat={beat} />;
    case "recall": return <RecallBeat beat={beat} beatKey={props.beatKey} />;
    case "summary": return <SummaryBeat beat={beat} />;
    case "formula-card": return <FormulaCardBeat beat={beat} />;
    case "predict":
      return <PredictBeat {...(props as BeatRendererProps<typeof beat>)} beat={beat} />;
    case "try-it":
      return <TryItBeat {...(props as BeatRendererProps<typeof beat>)} beat={beat} />;
    case "checkpoint":
      return <CheckpointBeat {...(props as BeatRendererProps<typeof beat>)} beat={beat} />;
  }
}

// Whether a beat blocks advancement until the user does something.
// Passive beats (everything except predict/try-it/checkpoint) auto-complete.
export function isInteractive(beat: Beat): boolean {
  return beat.type === "predict" || beat.type === "try-it" || beat.type === "checkpoint";
}
