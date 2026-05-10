"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LearnPage, LearnHeader, LearnCard, LearnPill, LearnButton,
} from "@/components/learn/primitives";
import { MathText } from "@/components/learn/math";
import { SECTIONS, getSectionProblems, apScore, type SectionId } from "@/lib/learn/exam";
import { useStore } from "@/lib/store";
import { ArrowRight, ArrowLeft, Clock, Calculator, Flag, Check, X } from "lucide-react";

type Phase = "intro" | "running" | "results";

export default function ExamSectionPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const params = useParams<{ section: string }>();
  const router = useRouter();
  if (!mounted) return null;

  const section = SECTIONS.find((s) => s.id === params.section as SectionId);
  if (!section) {
    router.replace("/learn/precalc/exam");
    return null;
  }
  return <Inner sectionId={section.id} />;
}

function Inner({ sectionId }: { sectionId: SectionId }) {
  const section = SECTIONS.find((s) => s.id === sectionId)!;
  const problems = getSectionProblems(sectionId);

  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({}); // for MCQs only
  const [frqDone, setFrqDone] = useState<Record<string, boolean>>({}); // for FRQs (self-assessed completion)
  const [timeLeft, setTimeLeft] = useState(section.minutes * 60);
  const [flaggedQs, setFlaggedQs] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const setFlag = useStore((s) => s.setLearnFlag);

  const start = () => {
    setPhase("running");
    setIdx(0);
    setAnswers({});
    setFrqDone({});
    setTimeLeft(section.minutes * 60);
    setSubmitted(false);
  };

  // Timer
  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          setPhase("results");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  if (phase === "intro") {
    return (
      <LearnPage>
        <LearnHeader
          kicker={`Mock exam — ${section.shortLabel}`}
          title={section.label}
          subtitle={section.description}
          back={{ href: "/learn/precalc/exam", label: "Section picker" }}
        />
        <LearnCard className="mb-6">
          <h3 className="font-semibold text-base text-ink mb-3">Before you begin</h3>
          <ul className="space-y-2 text-sm text-ink-dim leading-relaxed">
            <li>• Timer starts when you click Begin. Section auto-submits when time runs out.</li>
            <li>• No feedback during the section — score and per-problem review at the end.</li>
            <li>• You can flag questions to revisit. Use the Question Index in the top bar to jump.</li>
            {section.calc && <li>• Calculator allowed.</li>}
            {!section.calc && <li>• No calculator. Exact answers expected.</li>}
            {section.type === "frq" && <li>• Free response: you self-assess each question's completion. Solutions revealed at the end.</li>}
          </ul>
        </LearnCard>
        <LearnButton size="lg" onClick={start}>
          Begin <ArrowRight size={16} />
        </LearnButton>
      </LearnPage>
    );
  }

  if (phase === "results") {
    const total = problems.length;
    let correct = 0;
    if (section.type === "mcq") {
      problems.forEach((p) => {
        if (p.type === "mcq" && answers[p.id] === p.answer) correct++;
      });
    } else {
      // FRQs: count self-assessed-complete as full credit (rough). User can review actual solutions below.
      problems.forEach((p) => {
        if (frqDone[p.id]) correct++;
      });
    }
    const pct = correct / total;
    const ap = apScore(pct);
    return (
      <LearnPage>
        <LearnHeader
          kicker="Section complete"
          title={section.label}
          subtitle="Score, then review every question one at a time."
          back={{ href: "/learn/precalc/exam", label: "Section picker" }}
        />
        <LearnCard className="mb-7 p-7 border-2 border-accent-blue/30">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-ink-mute">Section raw score</div>
              <div className="mt-1 text-4xl font-bold tracking-tight tabular-nums text-ink">
                {correct}/{total}
              </div>
              <div className="mt-1 text-sm text-ink-dim">{Math.round(pct * 100)}%</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium uppercase tracking-wide text-ink-mute">If full exam at this pace</div>
              <div className="mt-1 text-4xl font-bold tracking-tight tabular-nums text-accent-blue">
                {ap.score}
              </div>
              <div className="mt-1 text-sm text-ink-dim">{ap.label}</div>
            </div>
          </div>
        </LearnCard>

        <h3 className="font-semibold text-base text-ink mb-4">Review every question</h3>
        <div className="space-y-2">
          {problems.map((p, i) => {
            if (p.type === "mcq") {
              const userAns = answers[p.id];
              const isCorrect = userAns === p.answer;
              const wasAnswered = userAns !== undefined;
              return (
                <Link key={p.id} href={`/learn/precalc/practice/${p.id}`} className="block group">
                  <LearnCard className={`p-4 border ${isCorrect ? "border-accent-lime/30 bg-accent-lime/[0.03]" : wasAnswered ? "border-accent-red/30 bg-accent-red/[0.03]" : "border-line"}`}>
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-ink-mute shrink-0 mt-0.5 w-12">{p.number}</span>
                      <div className="flex-1 min-w-0 text-sm text-ink leading-relaxed line-clamp-2">
                        <MathText>{p.prompt}</MathText>
                      </div>
                      {isCorrect ? <Check size={14} className="text-accent-lime shrink-0 mt-1" /> :
                       wasAnswered ? <X size={14} className="text-accent-red shrink-0 mt-1" /> :
                       <span className="text-2xs font-mono text-ink-mute shrink-0 mt-1">skip</span>}
                    </div>
                  </LearnCard>
                </Link>
              );
            } else {
              return (
                <Link key={p.id} href={`/learn/precalc/practice/${p.id}`} className="block group">
                  <LearnCard className="p-4 border border-line hover:border-line-strong transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-ink-mute shrink-0 mt-0.5 w-12">{p.number}</span>
                      <div className="flex-1 min-w-0 text-sm text-ink leading-relaxed line-clamp-2">
                        <MathText>{p.prompt}</MathText>
                      </div>
                      <span className="text-2xs font-mono text-ink-mute shrink-0 mt-1">view solution →</span>
                    </div>
                  </LearnCard>
                </Link>
              );
            }
          })}
        </div>

        <div className="mt-7 flex gap-3 justify-end">
          <Link href="/learn/precalc/exam">
            <LearnButton variant="secondary">Other sections</LearnButton>
          </Link>
          <LearnButton size="lg" onClick={start}>
            Retake <ArrowRight size={16} />
          </LearnButton>
        </div>
      </LearnPage>
    );
  }

  // Phase: running
  const problem = problems[idx];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeWarning = timeLeft < 60;
  const isFlagged = !!flaggedQs[problem?.id ?? ""];
  const userAnswer = problem?.type === "mcq" ? answers[problem.id] : undefined;

  return (
    <div className="learn-light min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 bg-[var(--learn-bg)]/95 backdrop-blur-sm border-b border-[var(--learn-line)]">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-3 flex items-center gap-4">
          <div className="text-xs font-mono text-[var(--learn-ink-mute)]">
            {section.shortLabel}
          </div>
          <div className="flex-1 text-sm text-[var(--learn-ink)] font-medium">
            Question {idx + 1} of {problems.length}
          </div>
          <div className={`flex items-center gap-1.5 font-mono text-sm tabular-nums ${isTimeWarning ? "text-red-600" : "text-[var(--learn-ink)]"}`}>
            <Clock size={14} />
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-5 lg:px-8 pb-2">
          <div className="flex items-center gap-1 flex-wrap">
            {problems.map((p, i) => {
              const answered = problem.type === "mcq" ? answers[p.id] !== undefined : !!frqDone[p.id];
              return (
                <button
                  key={p.id}
                  onClick={() => setIdx(i)}
                  className={`w-7 h-7 rounded text-xs font-mono tabular-nums transition-colors ${
                    i === idx
                      ? "bg-[var(--learn-accent)] text-white"
                      : answered
                      ? "bg-[var(--learn-elevated)] text-[var(--learn-ink)] border border-[var(--learn-line-strong)]"
                      : "bg-transparent text-[var(--learn-ink-mute)] border border-[var(--learn-line)] hover:border-[var(--learn-line-strong)]"
                  } ${flaggedQs[p.id] ? "ring-2 ring-amber-400" : ""}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-5 lg:px-8 py-8">
        {problem && problem.type === "mcq" && (
          <MCQRunner
            problem={problem}
            picked={userAnswer}
            onPick={(c: number) => setAnswers((a) => ({ ...a, [problem.id]: c }))}
            isFlagged={isFlagged}
            onFlag={() => setFlaggedQs((f) => ({ ...f, [problem.id]: !f[problem.id] }))}
          />
        )}
        {problem && problem.type === "frq" && (
          <FRQRunner
            problem={problem}
            done={!!frqDone[problem.id]}
            onDone={() => setFrqDone((d) => ({ ...d, [problem.id]: !d[problem.id] }))}
            isFlagged={isFlagged}
            onFlag={() => setFlaggedQs((f) => ({ ...f, [problem.id]: !f[problem.id] }))}
          />
        )}
      </main>

      <footer className="sticky bottom-0 z-20 bg-[var(--learn-bg)]/95 backdrop-blur-sm border-t border-[var(--learn-line)]">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-3 flex items-center justify-between gap-3">
          <LearnButton variant="ghost" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}>
            <ArrowLeft size={14} /> Prev
          </LearnButton>
          {idx === problems.length - 1 ? (
            <LearnButton size="lg" onClick={() => setPhase("results")}>
              Submit section
            </LearnButton>
          ) : (
            <LearnButton onClick={() => setIdx(Math.min(problems.length - 1, idx + 1))}>
              Next <ArrowRight size={14} />
            </LearnButton>
          )}
        </div>
      </footer>
    </div>
  );
}

function MCQRunner({ problem, picked, onPick, isFlagged, onFlag }: any) {
  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="text-xs font-mono text-[var(--learn-ink-mute)]">{problem.number}</div>
        <button
          onClick={onFlag}
          className={`p-2 rounded-md text-xs flex items-center gap-1.5 ${
            isFlagged ? "text-amber-600 bg-amber-50" : "text-[var(--learn-ink-mute)] hover:bg-[var(--learn-elevated)]"
          }`}
        >
          <Flag size={12} /> {isFlagged ? "Flagged" : "Flag"}
        </button>
      </div>
      <h2 className="text-lg font-semibold text-[var(--learn-ink)] leading-relaxed mb-6">
        <MathText>{problem.prompt}</MathText>
      </h2>
      <div className="space-y-2.5">
        {problem.choices.map((choice: string, i: number) => {
          const isPicked = picked === i;
          return (
            <button
              key={i}
              onClick={() => onPick(i)}
              className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-colors ${
                isPicked
                  ? "border-[var(--learn-accent-line)] bg-[var(--learn-accent-soft)]"
                  : "border-[var(--learn-line-strong)] bg-[var(--learn-surface)] hover:border-[var(--learn-accent-line)]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs uppercase text-[var(--learn-ink-mute)] mt-1">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-base text-[var(--learn-ink)] leading-relaxed">
                  <MathText>{choice}</MathText>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function FRQRunner({ problem, done, onDone, isFlagged, onFlag }: any) {
  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="text-xs font-mono text-[var(--learn-ink-mute)]">{problem.number}</div>
        <button
          onClick={onFlag}
          className={`p-2 rounded-md text-xs flex items-center gap-1.5 ${
            isFlagged ? "text-amber-600 bg-amber-50" : "text-[var(--learn-ink-mute)] hover:bg-[var(--learn-elevated)]"
          }`}
        >
          <Flag size={12} /> {isFlagged ? "Flagged" : "Flag"}
        </button>
      </div>
      <h2 className="text-lg font-semibold text-[var(--learn-ink)] leading-relaxed mb-5">
        <MathText>{problem.prompt}</MathText>
      </h2>
      <div className="space-y-3 mb-7">
        {problem.parts.map((part: any, i: number) => (
          <div key={i} className="rounded-xl border border-[var(--learn-line)] bg-[var(--learn-surface)] p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-mono text-sm text-[var(--learn-accent)]">{part.label}</span>
              <p className="text-base text-[var(--learn-ink)] leading-relaxed flex-1">
                <MathText>{part.prompt}</MathText>
              </p>
            </div>
          </div>
        ))}
      </div>
      <textarea
        placeholder="Work scratchpad — your notes are local-only and not graded."
        className="w-full min-h-[200px] rounded-xl border border-[var(--learn-line)] bg-[var(--learn-surface)] px-4 py-3 text-sm text-[var(--learn-ink)] placeholder:text-[var(--learn-ink-mute)] focus:outline-none focus:border-[var(--learn-accent)] resize-y"
      />
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={onDone}
          className={`px-4 h-10 rounded-lg text-sm font-medium transition-colors border ${
            done
              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
              : "bg-[var(--learn-elevated)] border-[var(--learn-line)] text-[var(--learn-ink-dim)] hover:border-[var(--learn-line-strong)]"
          }`}
        >
          <span className="inline-flex items-center gap-1.5">
            {done && <Check size={14} />} {done ? "Marked complete" : "Mark complete"}
          </span>
        </button>
        <span className="text-xs text-[var(--learn-ink-mute)]">Self-assessed for scoring purposes.</span>
      </div>
    </>
  );
}
