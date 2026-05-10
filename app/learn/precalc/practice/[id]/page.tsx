"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LearnPage, LearnHeader, LearnCard, LearnPill, LearnButton,
} from "@/components/learn/primitives";
import { MathText } from "@/components/learn/math";
import { PRACTICE, type Problem, type MCQProblem, type FRQProblem } from "@/lib/learn/practice";
import { useStore } from "@/lib/store";
import { Check, X, Flag, Eye, ArrowLeft, ArrowRight, Calculator } from "lucide-react";

export default function PracticeProblemPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  if (!mounted) return null;

  const problem = PRACTICE.find((p) => p.id === params.id);
  if (!problem) {
    router.replace("/learn/precalc/practice");
    return null;
  }
  return <Inner problem={problem} />;
}

function Inner({ problem }: { problem: Problem }) {
  const flagged = useStore((s) => s.learnFlagged);
  const setFlag = useStore((s) => s.setLearnFlag);
  const flagKey = `practice:${problem.id}`;
  const isFlagged = !!flagged[flagKey];

  const idx = PRACTICE.findIndex((p) => p.id === problem.id);
  const prev = idx > 0 ? PRACTICE[idx - 1] : null;
  const next = idx < PRACTICE.length - 1 ? PRACTICE[idx + 1] : null;

  return (
    <LearnPage>
      <Link href="/learn/precalc/practice" className="inline-flex items-center gap-1.5 text-sm text-ink-mute hover:text-ink mb-5 transition-colors">
        <ArrowLeft size={14} /> Back to practice
      </Link>

      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <LearnPill tone="neutral">{problem.source}</LearnPill>
          <LearnPill tone="neutral">{problem.number}</LearnPill>
          <LearnPill tone="neutral">Unit {problem.unitId.slice(1)}</LearnPill>
          <LearnPill tone={problem.type === "mcq" ? "accent" : "warning"}>{problem.type.toUpperCase()}</LearnPill>
          {problem.calc && <LearnPill tone="neutral"><Calculator size={10} /> calculator</LearnPill>}
        </div>
        <button
          onClick={() => setFlag(flagKey, !isFlagged)}
          className={`p-2 rounded-md transition-colors text-xs font-medium flex items-center gap-1.5 ${
            isFlagged
              ? "text-accent-amber bg-accent-amber/10 border border-accent-amber/30"
              : "text-ink-mute hover:text-ink hover:bg-bg-elevated border border-transparent"
          }`}
        >
          <Flag size={12} /> {isFlagged ? "Flagged" : "Flag"}
        </button>
      </div>

      {problem.type === "mcq" ? (
        <MCQContent problem={problem} />
      ) : (
        <FRQContent problem={problem} />
      )}

      {/* Prev/next nav */}
      <div className="mt-12 flex items-center justify-between gap-3">
        {prev ? (
          <Link href={`/learn/precalc/practice/${prev.id}`}>
            <LearnButton variant="ghost"><ArrowLeft size={14} /> {prev.source} {prev.number}</LearnButton>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/learn/precalc/practice/${next.id}`}>
            <LearnButton variant="secondary">{next.source} {next.number} <ArrowRight size={14} /></LearnButton>
          </Link>
        ) : <div />}
      </div>
    </LearnPage>
  );
}

function MCQContent({ problem }: { problem: MCQProblem }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const isCorrect = picked === problem.answer;

  return (
    <>
      <h2 className="text-xl font-semibold text-ink leading-relaxed mb-6">
        <MathText>{problem.prompt}</MathText>
      </h2>

      <div className="space-y-2.5 mb-6">
        {problem.choices.map((choice, i) => {
          const isPicked = picked === i;
          const isAnswer = i === problem.answer;
          const showResult = picked !== null && revealed;
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              disabled={revealed}
              className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-colors ${
                showResult && isAnswer
                  ? "border-accent-lime/50 bg-accent-lime/[0.06]"
                  : showResult && isPicked
                  ? "border-accent-red/50 bg-accent-red/[0.06]"
                  : isPicked
                  ? "border-accent-blue/40 bg-accent-blue/[0.04]"
                  : "border-line bg-bg-surface hover:border-line-strong"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs uppercase text-ink-mute mt-1 shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-base text-ink leading-relaxed">
                  <MathText>{choice}</MathText>
                </span>
                {showResult && isAnswer && <Check size={16} className="text-accent-lime shrink-0 mt-1" />}
                {showResult && isPicked && !isAnswer && <X size={16} className="text-accent-red shrink-0 mt-1" />}
              </div>
            </button>
          );
        })}
      </div>

      {!revealed ? (
        <div className="flex items-center gap-3">
          <LearnButton onClick={() => setRevealed(true)} disabled={picked === null}>
            <Eye size={14} /> Check + reveal solution
          </LearnButton>
          <LearnButton variant="ghost" onClick={() => setRevealed(true)}>
            Skip — show solution
          </LearnButton>
        </div>
      ) : (
        <div className="space-y-4">
          <LearnCard className={`border-2 ${isCorrect ? "border-accent-lime/30 bg-accent-lime/[0.04]" : "border-line bg-bg-elevated"}`}>
            <div className="text-xs font-medium uppercase tracking-wide text-ink-mute mb-2">
              {isCorrect ? "Correct ✓" : "Solution"}
            </div>
            <p className="text-base text-ink leading-relaxed">
              <MathText>{problem.explain}</MathText>
            </p>
          </LearnCard>
          <LearnCard className="bg-accent-blue/[0.03] border-accent-blue/20">
            <div className="text-xs font-medium uppercase tracking-wide text-accent-blue mb-2">Takeaway</div>
            <p className="text-sm text-ink-dim leading-relaxed">
              <MathText>{problem.takeaway}</MathText>
            </p>
          </LearnCard>
          {problem.topicHint && (
            <div className="text-xs text-ink-mute">Teaches toward: {problem.topicHint}</div>
          )}
        </div>
      )}
    </>
  );
}

function FRQContent({ problem }: { problem: FRQProblem }) {
  const [openParts, setOpenParts] = useState<Record<number, boolean>>({});

  return (
    <>
      <h2 className="text-xl font-semibold text-ink leading-relaxed mb-6">
        <MathText>{problem.prompt}</MathText>
      </h2>

      <div className="space-y-3">
        {problem.parts.map((part, i) => {
          const open = openParts[i];
          return (
            <LearnCard key={i} className="p-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-sm text-accent-blue">{part.label}</span>
                <h3 className="font-medium text-base text-ink flex-1">
                  <MathText>{part.prompt}</MathText>
                </h3>
              </div>
              <button
                onClick={() => setOpenParts((p) => ({ ...p, [i]: !p[i] }))}
                className="text-xs font-medium text-accent-blue hover:underline mt-2 inline-flex items-center gap-1.5"
              >
                <Eye size={12} /> {open ? "Hide" : "Show"} solution
              </button>
              {open && (
                <div className="mt-4 space-y-2 border-t border-line pt-4">
                  {part.solution.map((step, si) => (
                    <p key={si} className="text-sm text-ink leading-relaxed">
                      <MathText>{step}</MathText>
                    </p>
                  ))}
                  {part.answer && (
                    <div className="mt-3 px-3 py-2 rounded-lg bg-accent-lime/[0.05] border border-accent-lime/20 text-sm">
                      <span className="font-medium text-accent-lime">Answer: </span>
                      <span className="text-ink"><MathText>{part.answer}</MathText></span>
                    </div>
                  )}
                </div>
              )}
            </LearnCard>
          );
        })}
      </div>

      {problem.topicHint && (
        <div className="mt-6 text-xs text-ink-mute">Teaches toward: {problem.topicHint}</div>
      )}
    </>
  );
}
