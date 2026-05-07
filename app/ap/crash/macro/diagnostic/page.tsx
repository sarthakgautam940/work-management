"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, Tag, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  DIAGNOSTIC_QUESTIONS,
  UNIT_LABELS,
  UNIT_WEIGHTS,
  ALL_UNITS,
  bandFor,
  type UnitId,
  type UnitBand,
} from "@/lib/data/ap-crash/diagnostic";
import { ChevronRight, X, Target } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Phase = "intro" | "running" | "results";

export default function DiagnosticPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const router = useRouter();
  const setDiagnostic = useStore((s) => s.setApCrashDiagnostic);
  const existing = useStore((s) => s.apCrashDiagnostic);

  const [phase, setPhase] = useState<Phase>(existing.taken ? "results" : "intro");
  const [cursor, setCursor] = useState(0);
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [results, setResults] = useState<Record<string, { correct: number; total: number }>>(
    existing.results
  );

  const total = DIAGNOSTIC_QUESTIONS.length;
  const cur = DIAGNOSTIC_QUESTIONS[cursor];

  const start = () => {
    setPhase("running");
    setCursor(0);
    setPicks({});
  };

  const skip = () => {
    // Treat all units as red (not taken — full coverage assumed).
    const allRed: Record<string, { correct: number; total: number }> = {};
    ALL_UNITS.forEach((u) => { allRed[u] = { correct: 0, total: 2 }; });
    setDiagnostic(allRed);
    setResults(allRed);
    setPhase("results");
  };

  const pick = (idx: number) => {
    if (picks[cur.id] !== undefined) return;
    setPicks((p) => ({ ...p, [cur.id]: idx }));
  };

  const nextQ = () => {
    if (cursor < total - 1) {
      setCursor(cursor + 1);
    } else {
      // Compute results
      const tally: Record<string, { correct: number; total: number }> = {};
      ALL_UNITS.forEach((u) => { tally[u] = { correct: 0, total: 0 }; });
      DIAGNOSTIC_QUESTIONS.forEach((q) => {
        tally[q.unit].total += 1;
        if (picks[q.id] === q.answer) tally[q.unit].correct += 1;
      });
      setDiagnostic(tally);
      setResults(tally);
      setPhase("results");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar phase={phase} cursor={cursor} total={total} />

      <div className="flex-1 px-5 lg:px-10 py-7 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <Intro onStart={start} onSkip={skip} alreadyTaken={existing.taken} />
            </motion.div>
          )}

          {phase === "running" && cur && (
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <DiagnosticQuestionCard
                cursor={cursor}
                total={total}
                question={cur}
                pick={picks[cur.id]}
                onPick={pick}
                onNext={nextQ}
              />
            </motion.div>
          )}

          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <ResultsScreen
                results={results}
                onRetake={() => { setPhase("intro"); setPicks({}); setCursor(0); }}
                onContinue={() => router.push("/ap/crash/macro")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TopBar({ phase, cursor, total }: { phase: Phase; cursor: number; total: number }) {
  const pct = phase === "running" ? Math.round((cursor / total) * 100) : phase === "results" ? 100 : 0;
  return (
    <div className="sticky top-0 z-20 px-5 lg:px-10 py-4 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
        <Link href="/ap/crash/macro" className="text-ink-mute hover:text-ink p-1 -ml-1">
          <X size={16} />
        </Link>
        <div className="flex-1 min-w-0 text-center">
          <div className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute">Diagnostic</div>
          <div className="font-medium text-sm text-ink mt-0.5">Where are you?</div>
        </div>
        <div className="font-mono text-2xs tabular-nums text-ink-mute shrink-0">
          {phase === "running" ? `${cursor + 1}/${total}` : phase === "results" ? "done" : "—"}
        </div>
      </div>
      <div className="max-w-2xl mx-auto h-0.5 rounded-full bg-line overflow-hidden mt-3">
        <div
          className="h-full bg-ink/70 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Intro({ onStart, onSkip, alreadyTaken }: { onStart: () => void; onSkip: () => void; alreadyTaken: boolean }) {
  return (
    <Card className="p-6 lg:p-8">
      <Eyebrow accent="amber"><Target size={11} className="inline mr-1.5 -mt-0.5" /> Pre-course diagnostic</Eyebrow>
      <h1 className="mt-3 text-2xl lg:text-3xl font-bold tracking-tightest leading-tight">
        Five minutes. Twelve questions. Adjusts the rest.
      </h1>
      <div className="mt-4 text-ink-dim text-[15px] leading-relaxed space-y-3">
        <p>
          Before you start the course, take a quick diagnostic so the rest of the night doesn't waste time on what you already know.
        </p>
        <p>
          Two questions per unit. The questions are chosen so a miss strongly predicts unit-level weakness.
          Your results paint each unit <span className="text-accent-red">red</span> /
          <span className="text-accent-amber"> amber</span> /
          <span className="text-accent-lime"> green</span> and drive the fast-path mode (Phase 6, coming soon).
        </p>
        <p>
          Don't second-guess. Pick what you think is right. The whole point is honest signal — if you're confused on something, the diagnostic should catch it.
        </p>
      </div>
      <div className="mt-6 flex items-center gap-2 flex-wrap">
        <Button variant="primary" size="lg" onClick={onStart}>
          <span className="flex items-center gap-1.5">
            {alreadyTaken ? "Retake diagnostic" : "Start diagnostic"} <ChevronRight size={14} />
          </span>
        </Button>
        <button
          onClick={onSkip}
          className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors px-3 py-2"
        >
          Skip — give me everything
        </button>
      </div>
    </Card>
  );
}

function DiagnosticQuestionCard({
  cursor, total, question, pick, onPick, onNext,
}: {
  cursor: number;
  total: number;
  question: typeof DIAGNOSTIC_QUESTIONS[number];
  pick: number | undefined;
  onPick: (idx: number) => void;
  onNext: () => void;
}) {
  const revealed = pick !== undefined;
  const isLast = cursor === total - 1;
  return (
    <Card className="p-6 lg:p-7">
      <div className="flex items-center gap-2.5 flex-wrap mb-3">
        <Eyebrow>Question {cursor + 1} of {total}</Eyebrow>
        <Tag tone="neutral" size="sm">{UNIT_LABELS[question.unit]}</Tag>
        {revealed && (
          <Meta>{pick === question.answer ? <span className="text-accent-lime">Correct</span> : <span className="text-accent-red">Incorrect</span>}</Meta>
        )}
      </div>
      <h2 className="text-lg lg:text-xl font-medium leading-snug text-ink">{question.prompt}</h2>
      <div className="mt-5 space-y-2">
        {question.choices.map((c, i) => {
          const isChosen = pick === i;
          const isCorrect = i === question.answer;
          let style = "border-line text-ink-dim hover:border-line-strong hover:text-ink";
          if (revealed) {
            if (isCorrect) style = "border-accent-lime/50 bg-accent-lime/[0.06] text-ink";
            else if (isChosen) style = "border-accent-red/50 bg-accent-red/[0.06] text-ink";
            else style = "border-line text-ink-mute opacity-60";
          }
          return (
            <button
              key={i}
              onClick={() => !revealed && onPick(i)}
              disabled={revealed}
              className={cn("w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors", style)}
            >
              <span className="font-mono text-2xs text-ink-mute mr-3">{String.fromCharCode(65 + i)}</span>
              {c}
            </button>
          );
        })}
      </div>
      {revealed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-5 pt-4 border-t border-line text-sm text-ink-dim leading-relaxed overflow-hidden"
        >
          <Meta>Why</Meta>
          <p className="mt-1.5">{question.explain}</p>
        </motion.div>
      )}
      <Button
        variant="primary"
        size="lg"
        onClick={onNext}
        disabled={!revealed}
        className={cn("w-full mt-6 py-4", !revealed && "opacity-50 cursor-not-allowed")}
      >
        <span className="flex items-center justify-center gap-2">
          {revealed ? (isLast ? "See your study path" : "Next question") : "Pick an answer to continue"}
          {revealed && <ChevronRight size={16} />}
        </span>
      </Button>
    </Card>
  );
}

function ResultsScreen({
  results, onRetake, onContinue,
}: {
  results: Record<string, { correct: number; total: number }>;
  onRetake: () => void;
  onContinue: () => void;
}) {
  const bands = ALL_UNITS.map((u) => {
    const r = results[u] ?? { correct: 0, total: 0 };
    return { unit: u, ...r, band: bandFor(r.correct, r.total) };
  });
  const counts = bands.reduce(
    (acc, b) => ({ ...acc, [b.band]: (acc[b.band] || 0) + 1 }),
    {} as Record<UnitBand, number>,
  );
  const summary = `${counts.red ?? 0} red · ${counts.amber ?? 0} amber · ${counts.green ?? 0} green`;
  return (
    <div>
      <Card className="p-6 lg:p-8 mb-5">
        <Eyebrow accent="amber">Your study path</Eyebrow>
        <h2 className="mt-3 text-2xl lg:text-3xl font-bold tracking-tightest leading-tight">
          Diagnostic complete — {summary}
        </h2>
        <p className="mt-3 text-ink-dim text-sm leading-relaxed">
          Red units get full coverage tonight. Green units get rapid review. Amber sits in between.
          Once Phase 6 ships, the course will auto-prune to fit your time budget based on this.
        </p>
        <div className="mt-6 space-y-2.5">
          {bands.map((b) => (
            <UnitBar key={b.unit} unit={b.unit} band={b.band} correct={b.correct} total={b.total} />
          ))}
        </div>
      </Card>
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="primary" size="lg" onClick={onContinue}>
          <span className="flex items-center gap-1.5">Open course <ChevronRight size={14} /></span>
        </Button>
        <button
          onClick={onRetake}
          className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors px-3 py-2"
        >
          Retake
        </button>
      </div>
    </div>
  );
}

function UnitBar({
  unit, band, correct, total,
}: {
  unit: UnitId;
  band: UnitBand;
  correct: number;
  total: number;
}) {
  const tone = {
    red: { bar: "bg-accent-red", tag: "red", label: "needs full coverage" },
    amber: { bar: "bg-accent-amber", tag: "amber", label: "mixed — review recommended" },
    green: { bar: "bg-accent-lime", tag: "lime", label: "rapid review only" },
  }[band] as { bar: string; tag: "red" | "amber" | "lime"; label: string };

  const pct = total > 0 ? (correct / total) * 100 : 0;

  return (
    <div className="px-4 py-3.5 rounded-lg border border-line bg-bg-elevated/40">
      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-ink">{UNIT_LABELS[unit]}</span>
          <Tag tone={tone.tag} size="sm">{band}</Tag>
        </div>
        <div className="flex items-center gap-2">
          <Meta>{UNIT_WEIGHTS[unit]} of exam</Meta>
          <span className="font-mono text-2xs tabular-nums text-ink-mute">{correct}/{total}</span>
        </div>
      </div>
      <div className="h-1 rounded-full bg-line overflow-hidden">
        <div
          className={cn("h-full transition-all duration-700", tone.bar)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-2xs text-ink-mute mt-1.5">{tone.label}</div>
    </div>
  );
}
