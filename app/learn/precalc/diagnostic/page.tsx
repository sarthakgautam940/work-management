"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LearnPage, LearnHeader, LearnCard, LearnButton, LearnPill,
} from "@/components/learn/primitives";
import { MathText } from "@/components/learn/math";
import { DIAGNOSTIC, DIAGNOSTIC_UNITS, bandFor } from "@/lib/learn/diagnostic";
import { PRECALC } from "@/lib/learn/course";
import { useStore } from "@/lib/store";
import { ArrowRight, Check, RotateCcw } from "lucide-react";

export default function DiagnosticPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const setDiagnostic = useStore((s) => s.setLearnDiagnostic);
  const resetDiagnostic = useStore((s) => s.resetLearnDiagnostic);
  const existing = useStore((s) => s.learnDiagnostic);
  const router = useRouter();

  // Start fresh on every entry — but if they've already taken it, show
  // the results page first.
  const [phase, setPhase] = useState<"intro" | "running" | "results">(existing.taken ? "results" : "intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const begin = () => {
    setPhase("running");
    setIdx(0);
    setAnswers([]);
  };

  const pickAnswer = (choice: number) => {
    if (answers[idx] !== undefined) return;
    const next = [...answers];
    next[idx] = choice;
    setAnswers(next);
  };

  const advance = () => {
    if (idx < DIAGNOSTIC.length - 1) {
      setIdx(idx + 1);
    } else {
      // Compute results per unit and persist.
      const results: Record<string, { correct: number; total: number }> = {};
      DIAGNOSTIC_UNITS.forEach((u) => (results[u] = { correct: 0, total: 0 }));
      DIAGNOSTIC.forEach((q, i) => {
        const r = results[q.unitId];
        r.total++;
        if (answers[i] === q.answer) r.correct++;
      });
      setDiagnostic(results);
      setPhase("results");
    }
  };

  const retake = () => {
    resetDiagnostic();
    setPhase("intro");
    setIdx(0);
    setAnswers([]);
  };

  if (phase === "intro") return <Intro onBegin={begin} hasTaken={existing.taken} onRetake={() => setPhase("results")} />;
  if (phase === "results") return <Results onRetake={retake} onContinue={() => router.push("/learn/precalc")} />;

  // Running
  const q = DIAGNOSTIC[idx];
  const picked = answers[idx];
  const isCorrect = picked === q.answer;
  const showResult = picked !== undefined;
  const isLast = idx === DIAGNOSTIC.length - 1;

  return (
    <LearnPage>
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-ink-mute font-medium">
            Question {idx + 1} of {DIAGNOSTIC.length}
          </div>
          <LearnPill tone="accent">Unit {q.unitId.slice(1)}</LearnPill>
        </div>
        <div className="h-1 rounded-full bg-line overflow-hidden">
          <motion.div
            className="h-full bg-accent-blue"
            initial={false}
            animate={{ width: `${((idx + 1) / DIAGNOSTIC.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-ink mb-6 leading-snug">
            <MathText>{q.prompt}</MathText>
          </h2>

          <div className="space-y-2.5">
            {q.choices.map((choice, i) => {
              const isPicked = picked === i;
              const isAnswer = i === q.answer;
              return (
                <button
                  key={i}
                  onClick={() => pickAnswer(i)}
                  disabled={showResult}
                  className={`w-full text-left rounded-xl border-2 px-4 py-3.5 transition-colors text-base ${
                    showResult && isAnswer
                      ? "border-accent-lime/50 bg-accent-lime/[0.08] text-ink"
                      : showResult && isPicked
                      ? "border-accent-red/50 bg-accent-red/[0.08] text-ink"
                      : showResult
                      ? "border-line bg-bg-surface text-ink-mute"
                      : "border-line bg-bg-surface text-ink hover:border-accent-blue/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs uppercase text-ink-mute mt-1">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 leading-relaxed">
                      <MathText>{choice}</MathText>
                    </span>
                    {showResult && isAnswer && <Check size={16} className="text-accent-lime shrink-0 mt-1" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-5 px-4 py-3 rounded-xl border ${
                isCorrect ? "border-accent-lime/30 bg-accent-lime/[0.04]" : "border-line bg-bg-elevated"
              }`}
            >
              <p className="text-sm leading-relaxed text-ink">
                <MathText>{q.explain}</MathText>
              </p>
            </motion.div>
          )}

          {showResult && (
            <div className="mt-7 flex justify-end">
              <LearnButton size="lg" onClick={advance}>
                {isLast ? "See results" : "Next"} <ArrowRight size={16} />
              </LearnButton>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </LearnPage>
  );
}

function Intro({ onBegin, hasTaken, onRetake }: { onBegin: () => void; hasTaken: boolean; onRetake: () => void }) {
  return (
    <LearnPage>
      <LearnHeader
        kicker="Diagnostic"
        title="12 questions. 6 minutes. Colors the path."
        subtitle="Four MCQs per unit. No grading, no penalty — the only point is to tell the dashboard where to push you first."
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
      />
      <LearnCard>
        <div className="space-y-3 text-sm text-ink-dim leading-relaxed">
          <p><span className="text-ink font-medium">How it works.</span> One question at a time. Pick an answer, see the explanation, advance. At the end you get a per-unit red / amber / green tag.</p>
          <p><span className="text-ink font-medium">Bands.</span> 0/4 or 1/4 = red (start here). 2/4 = amber. 3/4 or 4/4 = green (can skim).</p>
          <p><span className="text-ink font-medium">No calculator.</span> If you need one for a question, take the L and move on. The diagnostic is about pattern recognition.</p>
        </div>
        <div className="mt-7 flex items-center gap-3">
          <LearnButton size="lg" onClick={onBegin}>Begin <ArrowRight size={16} /></LearnButton>
          {hasTaken && (
            <LearnButton variant="ghost" onClick={onRetake}>See last results</LearnButton>
          )}
        </div>
      </LearnCard>
    </LearnPage>
  );
}

function Results({ onRetake, onContinue }: { onRetake: () => void; onContinue: () => void }) {
  const diagnostic = useStore((s) => s.learnDiagnostic);
  return (
    <LearnPage>
      <LearnHeader
        kicker="Diagnostic"
        title="Your path, colored"
        subtitle="Red = start here. Amber = brush up. Green = skim quickly."
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
      />
      <div className="space-y-3">
        {PRECALC.units.map((unit) => {
          const r = diagnostic.results[unit.id] ?? { correct: 0, total: 4 };
          const band = bandFor(r.correct, r.total);
          const bandColors = {
            red: { tone: "danger" as const, text: "text-accent-red", border: "border-accent-red/30", bg: "bg-accent-red/[0.04]", label: "Start here" },
            amber: { tone: "warning" as const, text: "text-accent-amber", border: "border-accent-amber/30", bg: "bg-accent-amber/[0.04]", label: "Brush up" },
            green: { tone: "success" as const, text: "text-accent-lime", border: "border-accent-lime/30", bg: "bg-accent-lime/[0.04]", label: "Skim" },
          }[band];
          return (
            <LearnCard key={unit.id} className={`${bandColors.border} ${bandColors.bg} border-2`}>
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg ${bandColors.text} bg-bg-surface`}>
                  {r.correct}/{r.total}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-base text-ink">{unit.title}</h3>
                    <LearnPill tone={bandColors.tone}>{bandColors.label}</LearnPill>
                  </div>
                  <p className="text-sm text-ink-dim">{unit.examWeight} of the exam.</p>
                </div>
              </div>
            </LearnCard>
          );
        })}
      </div>
      <div className="mt-8 flex items-center gap-3 justify-end">
        <LearnButton variant="ghost" onClick={onRetake}>
          <RotateCcw size={14} /> Retake
        </LearnButton>
        <LearnButton size="lg" onClick={onContinue}>
          Back to dashboard <ArrowRight size={16} />
        </LearnButton>
      </div>
    </LearnPage>
  );
}
