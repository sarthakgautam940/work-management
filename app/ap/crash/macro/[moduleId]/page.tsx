"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, Tag, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import { AP_MACRO_COURSE } from "@/lib/data/ap-crash/macro";
import type { Module, Lesson, Step, Callout } from "@/lib/data/ap-crash/types";
import { ArrowLeft, ArrowRight, Check, X, ChevronRight, RotateCw, Lightbulb, AlertTriangle, BookOpen, Zap, Target, Brain } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function ModulePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params?.moduleId as string;
  const course = AP_MACRO_COURSE;
  const module = course.modules.find((m) => m.id === moduleId);

  const stepDone = useStore((s) => s.apCrashStepDone);
  const setStepDone = useStore((s) => s.setApCrashStepDone);
  const setLastModule = useStore((s) => s.setApCrashLastModule);

  // Build a flat ordered list of all steps in this module: lesson + step index.
  const allSteps = useMemo(() => {
    if (!module) return [];
    const out: Array<{ lesson: Lesson; lessonIdx: number; step: Step; stepIdx: number; key: string; absolute: number }> = [];
    let abs = 0;
    module.lessons.forEach((lesson, li) => {
      lesson.steps.forEach((step, si) => {
        const key = `${course.id}.${module.id}.${lesson.id}.${si}`;
        out.push({ lesson, lessonIdx: li, step, stepIdx: si, key, absolute: abs });
        abs++;
      });
    });
    return out;
  }, [course.id, module]);

  // Current cursor: first undone, or last if all done.
  const firstUndoneIdx = allSteps.findIndex((s) => !stepDone[s.key]);
  const initialIdx = firstUndoneIdx >= 0 ? firstUndoneIdx : Math.max(0, allSteps.length - 1);
  const [cursor, setCursor] = useState(initialIdx);

  useEffect(() => {
    if (module) setLastModule(course.id, module.id);
  }, [module, course.id, setLastModule]);

  if (!module) {
    return (
      <div className="px-5 lg:px-10 pt-12 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-3">Module not found</h1>
        <Link href="/ap/crash/macro" className="text-accent-lime underline">Back to course</Link>
      </div>
    );
  }

  const cur = allSteps[cursor];
  const moduleDone = allSteps.filter((s) => stepDone[s.key]).length;
  const moduleTotal = allSteps.length;
  const modulePct = moduleTotal > 0 ? (moduleDone / moduleTotal) * 100 : 0;

  const advance = () => {
    if (!cur) return;
    setStepDone(cur.key, true);
    if (cursor < allSteps.length - 1) {
      setCursor(cursor + 1);
    } else {
      // Final step done — navigate to next module or back to dashboard
      const idx = course.modules.findIndex((m) => m.id === module.id);
      const next = course.modules[idx + 1];
      setTimeout(() => router.push(next ? `/ap/crash/macro/${next.id}` : "/ap/crash/macro"), 240);
    }
  };

  const back = () => setCursor(Math.max(0, cursor - 1));

  const moduleIdx = course.modules.findIndex((m) => m.id === module.id);
  const prevModule = course.modules[moduleIdx - 1];
  const nextModule = course.modules[moduleIdx + 1];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar
        moduleTitle={module.title}
        moduleEyebrow={`Module ${module.partNumber} · ${moduleIdx + 1} of ${course.modules.length}`}
        cursor={cursor}
        total={moduleTotal}
        pct={modulePct}
      />

      {cur && (
        <div className="px-5 lg:px-10 pt-1 max-w-2xl mx-auto w-full">
          <div className="text-2xs font-mono uppercase tracking-[0.18em] text-ink-mute mt-2 mb-4">
            {cur.lesson.title}
          </div>
        </div>
      )}

      <div className="flex-1 px-5 lg:px-10 pb-24 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {cur ? (
            <motion.div
              key={cur.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <StepRenderer step={cur.step} stepKey={cur.key} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {cur && <StepActions step={cur.step} stepKey={cur.key} onContinue={advance} />}

        <div className="mt-10 flex items-center justify-between gap-3">
          {cursor > 0 ? (
            <button
              onClick={back}
              className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={11} /> Back
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-3">
            {prevModule && (
              <Link href={`/ap/crash/macro/${prevModule.id}`} className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors">
                ← prev module
              </Link>
            )}
            {nextModule && (
              <Link href={`/ap/crash/macro/${nextModule.id}`} className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors">
                next module →
              </Link>
            )}
            <Link href="/ap/crash/macro" className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors">
              All modules
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Top bar
// ──────────────────────────────────────────────────────────────────────

function TopBar({
  moduleTitle, moduleEyebrow, cursor, total, pct,
}: {
  moduleTitle: string;
  moduleEyebrow: string;
  cursor: number;
  total: number;
  pct: number;
}) {
  return (
    <div className="sticky top-0 z-20 px-5 lg:px-10 py-4 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
        <Link href="/ap/crash/macro" className="text-ink-mute hover:text-ink transition-colors -ml-1 p-1">
          <X size={16} />
        </Link>
        <div className="flex-1 min-w-0 text-center">
          <div className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute truncate">
            {moduleEyebrow}
          </div>
          <div className="font-medium text-sm text-ink truncate mt-0.5">{moduleTitle}</div>
        </div>
        <div className="font-mono text-2xs tabular-nums text-ink-mute shrink-0">
          {cursor + 1}/{total}
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

// ──────────────────────────────────────────────────────────────────────
// Step renderer
// ──────────────────────────────────────────────────────────────────────

function StepRenderer({ step, stepKey }: { step: Step; stepKey: string }) {
  if (step.type === "read") return <ReadStep step={step} />;
  if (step.type === "formula") return <FormulaStep step={step} />;
  if (step.type === "example") return <ExampleStep step={step} />;
  if (step.type === "mcq") return <MCQStep step={step} stepKey={stepKey} />;
  if (step.type === "drill") return <DrillStep step={step} stepKey={stepKey} />;
  if (step.type === "flashcards") return <FlashcardsStep step={step} stepKey={stepKey} />;
  if (step.type === "chain") return <ChainStep step={step} />;
  if (step.type === "frq-part") return <FRQStep step={step} />;
  if (step.type === "pattern") return <PatternStep step={step} stepKey={stepKey} />;
  return null;
}

function CalloutBlock({ c }: { c: Callout }) {
  const config = {
    trap: { icon: AlertTriangle, color: "border-accent-red/30 bg-accent-red/[0.04]", iconColor: "text-accent-red", label: "Trap" },
    insight: { icon: Lightbulb, color: "border-accent-amber/30 bg-accent-amber/[0.04]", iconColor: "text-accent-amber", label: "Insight" },
    strategy: { icon: Target, color: "border-accent-lime/30 bg-accent-lime/[0.04]", iconColor: "text-accent-lime", label: "Strategy" },
    memory: { icon: Brain, color: "border-accent-violet/30 bg-accent-violet/[0.04]", iconColor: "text-accent-violet", label: "Memory" },
    formula: { icon: BookOpen, color: "border-accent-blue/30 bg-accent-blue/[0.04]", iconColor: "text-accent-blue", label: "Formula" },
    warning: { icon: AlertTriangle, color: "border-accent-red/30 bg-accent-red/[0.04]", iconColor: "text-accent-red", label: "Warning" },
  }[c.kind];
  const Icon = config.icon;
  return (
    <div className={cn("mt-4 rounded-lg border p-4", config.color)}>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon size={13} className={config.iconColor} />
        <span className={cn("font-mono text-2xs uppercase tracking-[0.18em]", config.iconColor)}>
          {c.title ?? config.label}
        </span>
      </div>
      <div className="text-sm text-ink-dim leading-relaxed">{c.body}</div>
    </div>
  );
}

function ReadStep({ step }: { step: Extract<Step, { type: "read" }> }) {
  return (
    <Card className="p-6 lg:p-7">
      <Eyebrow>Concept</Eyebrow>
      <h2 className="mt-3 text-xl lg:text-2xl font-bold tracking-tightest leading-tight">{step.title}</h2>
      <div className="mt-4 space-y-3 text-[15px] leading-[1.7] text-ink-dim">
        {step.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {step.callouts && step.callouts.map((c, i) => <CalloutBlock key={i} c={c} />)}
    </Card>
  );
}

function FormulaStep({ step }: { step: Extract<Step, { type: "formula" }> }) {
  return (
    <Card className="p-6 lg:p-7">
      <Eyebrow accent="amber">Formulas</Eyebrow>
      <h2 className="mt-3 text-xl font-bold tracking-tightest">{step.title}</h2>
      <ul className="mt-5 space-y-2.5">
        {step.formulas.map((f, i) => (
          <li key={i} className="px-4 py-3 rounded-lg bg-bg-elevated border border-line font-mono text-base text-ink leading-relaxed">
            {f}
          </li>
        ))}
      </ul>
      {step.mnemonic && (
        <div className="mt-5 rounded-lg border border-accent-violet/30 bg-accent-violet/[0.04] p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Brain size={13} className="text-accent-violet" />
            <span className="font-mono text-2xs uppercase tracking-[0.18em] text-accent-violet">Mnemonic</span>
          </div>
          <div className="text-sm text-ink-dim">{step.mnemonic}</div>
        </div>
      )}
      {step.callout && <CalloutBlock c={step.callout} />}
    </Card>
  );
}

function ExampleStep({ step }: { step: Extract<Step, { type: "example" }> }) {
  return (
    <Card className="p-6 lg:p-7">
      <Eyebrow accent="lime">Worked example</Eyebrow>
      <h2 className="mt-3 text-xl font-bold tracking-tightest">{step.title}</h2>
      <div className="mt-5 px-4 py-3.5 rounded-lg bg-bg-elevated border border-line">
        <Meta>Q</Meta>
        <div className="mt-1 text-ink leading-relaxed">{step.prompt}</div>
      </div>
      <div className="mt-3 px-4 py-3.5 rounded-lg bg-accent-lime/[0.04] border border-accent-lime/20 space-y-1.5">
        <Meta>Solution</Meta>
        {step.solution.map((line, i) => (
          <div key={i} className="text-sm text-ink-dim leading-relaxed">{line}</div>
        ))}
      </div>
      {step.takeaway && (
        <div className="mt-4 px-4 py-3 rounded-lg border border-accent-amber/30 bg-accent-amber/[0.04]">
          <Meta className="text-accent-amber">Takeaway</Meta>
          <div className="mt-1 text-sm text-ink-dim leading-relaxed">{step.takeaway}</div>
        </div>
      )}
    </Card>
  );
}

function MCQStep({ step, stepKey }: { step: Extract<Step, { type: "mcq" }>; stepKey: string }) {
  const answers = useStore((s) => s.lessonAnswers);
  const record = useStore((s) => s.recordLessonAnswer);
  const chosen = answers[stepKey];
  const revealed = chosen !== undefined;

  return (
    <Card className="p-6 lg:p-7">
      <div className="flex items-center justify-between mb-3">
        <Eyebrow>Multiple choice</Eyebrow>
        {revealed && (
          <Meta>{chosen === step.answer ? <span className="text-accent-lime">Correct</span> : <span className="text-accent-red">Incorrect</span>}</Meta>
        )}
      </div>
      <h2 className="text-lg lg:text-xl font-medium leading-snug text-ink">{step.prompt}</h2>
      <div className="mt-5 space-y-2">
        {step.choices.map((c, i) => {
          const isChosen = chosen === i;
          const isCorrect = i === step.answer;
          let style = "border-line text-ink-dim hover:border-line-strong hover:text-ink";
          if (revealed) {
            if (isCorrect) style = "border-accent-lime/50 bg-accent-lime/[0.06] text-ink";
            else if (isChosen) style = "border-accent-red/50 bg-accent-red/[0.06] text-ink";
            else style = "border-line text-ink-mute opacity-60";
          }
          return (
            <button
              key={i}
              onClick={() => !revealed && record(stepKey, i)}
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
          <p className="mt-1.5">{step.explain}</p>
          {step.trap && (
            <div className="mt-3">
              <Meta className="text-accent-red">Trap</Meta>
              <p className="mt-1 text-ink-dim">{step.trap}</p>
            </div>
          )}
        </motion.div>
      )}
    </Card>
  );
}

function DrillStep({ step, stepKey }: { step: Extract<Step, { type: "drill" }>; stepKey: string }) {
  const stepDone = useStore((s) => s.apCrashStepDone);
  const [revealed, setRevealed] = useState(!!stepDone[stepKey]);
  return (
    <Card className="p-6 lg:p-7">
      <Eyebrow accent="blue">Drill</Eyebrow>
      <div className="mt-3 px-4 py-3.5 rounded-lg bg-bg-elevated border border-line">
        <Meta>Q</Meta>
        <div className="mt-1 text-ink leading-relaxed">{step.prompt}</div>
      </div>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full mt-4 py-3.5 rounded-lg border border-line bg-bg-elevated text-ink hover:border-line-strong transition-colors text-sm font-medium"
        >
          Show answer
        </button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mt-4 px-4 py-3.5 rounded-lg bg-accent-lime/[0.04] border border-accent-lime/20">
            <Meta>Answer</Meta>
            <div className="mt-1 text-ink leading-relaxed">{step.answer}</div>
          </div>
          <div className="mt-3 px-4 py-3.5 rounded-lg bg-bg-elevated border border-line space-y-1">
            <Meta>Worked steps</Meta>
            {step.steps.map((s, i) => (
              <div key={i} className="text-sm text-ink-dim leading-relaxed">{s}</div>
            ))}
          </div>
        </motion.div>
      )}
    </Card>
  );
}

function FlashcardsStep({ step, stepKey }: { step: Extract<Step, { type: "flashcards" }>; stepKey: string }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cardEase = useStore((s) => s.apCrashCardEase);
  const setCardEase = useStore((s) => s.setApCrashCardEase);

  const card = step.cards[idx];
  const cardKey = `${stepKey}.${idx}`;
  const ease = cardEase[cardKey];

  const next = (rating?: "again" | "hard" | "good" | "easy") => {
    if (rating) setCardEase(cardKey, rating);
    setFlipped(false);
    setIdx((i) => Math.min(step.cards.length - 1, i + 1));
  };
  const prev = () => {
    setFlipped(false);
    setIdx((i) => Math.max(0, i - 1));
  };
  const reset = () => {
    setFlipped(false);
    setIdx(0);
  };

  const knownCount = step.cards.filter((_, i) => {
    const e = cardEase[`${stepKey}.${i}`];
    return e === "good" || e === "easy";
  }).length;

  return (
    <Card className="p-6 lg:p-7">
      <div className="flex items-center justify-between mb-4">
        <Eyebrow accent="rose">Flashcards · {step.title}</Eyebrow>
        <div className="flex items-center gap-3">
          <Meta>{knownCount}/{step.cards.length} learned</Meta>
          <button onClick={reset} className="text-ink-mute hover:text-ink p-1" aria-label="Reset deck">
            <RotateCw size={12} />
          </button>
        </div>
      </div>
      <div className="text-2xs font-mono uppercase tracking-[0.18em] text-ink-ghost mb-4">
        Card {idx + 1} of {step.cards.length}
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[200px] p-6 rounded-xl border border-line bg-bg-elevated/40 text-center flex flex-col items-center justify-center hover:bg-bg-elevated/60 transition-colors"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${idx}-${flipped}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="w-full"
          >
            {!flipped ? (
              <>
                <Meta>Front</Meta>
                <div className="mt-3 text-lg lg:text-xl text-ink font-medium">{card.front}</div>
                <div className="mt-4 text-2xs font-mono tracking-[0.18em] text-ink-ghost">TAP TO FLIP</div>
              </>
            ) : (
              <>
                <Meta className="text-accent-lime">Back</Meta>
                <div className="mt-3 text-base lg:text-lg text-ink-dim leading-relaxed">{card.back}</div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      {flipped ? (
        <div className="mt-4 grid grid-cols-4 gap-2">
          <RatingButton label="Again" tone="red" onClick={() => next("again")} />
          <RatingButton label="Hard" tone="amber" onClick={() => next("hard")} />
          <RatingButton label="Good" tone="lime" onClick={() => next("good")} />
          <RatingButton label="Easy" tone="lime" onClick={() => next("easy")} />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button onClick={prev} disabled={idx === 0} className="py-2.5 rounded-lg border border-line text-sm text-ink-dim hover:text-ink disabled:opacity-40 transition-colors">Prev</button>
          <button onClick={() => setFlipped(true)} className="py-2.5 rounded-lg bg-ink text-bg text-sm font-medium hover:bg-ink/90 transition-colors">Flip</button>
          <button onClick={() => next()} disabled={idx === step.cards.length - 1} className="py-2.5 rounded-lg border border-line text-sm text-ink-dim hover:text-ink disabled:opacity-40 transition-colors">Skip</button>
        </div>
      )}

      {ease && (
        <div className="mt-4 text-center">
          <Tag tone={ease === "again" || ease === "hard" ? "red" : "lime"} size="sm">marked {ease}</Tag>
        </div>
      )}
    </Card>
  );
}

function RatingButton({ label, tone, onClick }: { label: string; tone: "red" | "amber" | "lime"; onClick: () => void }) {
  const styles = {
    red: "border-accent-red/40 text-accent-red hover:bg-accent-red/10",
    amber: "border-accent-amber/40 text-accent-amber hover:bg-accent-amber/10",
    lime: "border-accent-lime/40 text-accent-lime hover:bg-accent-lime/10",
  }[tone];
  return (
    <button onClick={onClick} className={cn("py-2.5 rounded-lg border text-sm font-medium transition-colors", styles)}>
      {label}
    </button>
  );
}

function ChainStep({ step }: { step: Extract<Step, { type: "chain" }> }) {
  return (
    <Card className="p-6 lg:p-7">
      <Eyebrow accent="violet">Macro chain</Eyebrow>
      <h2 className="mt-3 text-xl font-bold tracking-tightest">{step.title}</h2>
      <div className="mt-4 px-4 py-3 rounded-lg bg-bg-elevated border border-line">
        <Meta>Trigger</Meta>
        <div className="mt-1 text-ink-dim text-sm leading-relaxed">{step.trigger}</div>
      </div>
      <div className="mt-4 space-y-2">
        {step.steps.map((s, i) => (
          <div key={i} className="flex gap-3 px-4 py-3 rounded-lg border border-line">
            <span className="font-mono text-xs text-ink-mute w-6 shrink-0">{i + 1}</span>
            <span className="text-sm text-ink-dim leading-relaxed">{s.replace(/^\d+\.\s*/, "")}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 px-4 py-3.5 rounded-lg bg-accent-lime/[0.04] border border-accent-lime/30">
        <Meta className="text-accent-lime">Final effect</Meta>
        <div className="mt-1 text-ink-dim leading-relaxed">{step.finalEffect}</div>
      </div>
    </Card>
  );
}

function FRQStep({ step }: { step: Extract<Step, { type: "frq-part" }> }) {
  return (
    <Card className="p-6 lg:p-7">
      <div className="flex items-center gap-2 flex-wrap">
        <Eyebrow accent="rose">FRQ</Eyebrow>
        <Tag tone="neutral" size="sm">{step.partLabel}</Tag>
      </div>
      <h2 className="mt-3 text-lg lg:text-xl font-medium leading-snug text-ink">{step.prompt}</h2>
      <div className="mt-4 px-4 py-3 rounded-lg bg-bg-elevated border border-line">
        <Meta>Rubric points</Meta>
        <ul className="mt-1.5 space-y-1">
          {step.rubricPoints.map((r, i) => (
            <li key={i} className="text-sm text-ink-dim flex gap-2">
              <span className="text-ink-ghost shrink-0">·</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3 px-4 py-3.5 rounded-lg bg-accent-lime/[0.04] border border-accent-lime/20 space-y-1.5">
        <Meta className="text-accent-lime">Model solution</Meta>
        {step.solution.map((line, i) => (
          <div key={i} className="text-sm text-ink-dim leading-relaxed">{line}</div>
        ))}
      </div>
      {step.graphHint && (
        <div className="mt-3 rounded-lg border border-accent-amber/30 bg-accent-amber/[0.04] p-4">
          <Meta className="text-accent-amber">Graph hint</Meta>
          <div className="mt-1.5 text-sm text-ink-dim leading-relaxed">{step.graphHint}</div>
        </div>
      )}
    </Card>
  );
}

function PatternStep({ step, stepKey }: { step: Extract<Step, { type: "pattern" }>; stepKey: string }) {
  const answers = useStore((s) => s.lessonAnswers);
  const record = useStore((s) => s.recordLessonAnswer);
  const exampleKey = `${stepKey}.example`;
  const chosen = answers[exampleKey];
  const revealed = chosen !== undefined;
  const ex = step.example;

  return (
    <Card className="p-6 lg:p-7">
      <Eyebrow accent="amber">Pattern</Eyebrow>
      <h2 className="mt-3 text-xl font-bold tracking-tightest">{step.name}</h2>
      <div className="mt-4 space-y-3 text-[15px] text-ink-dim leading-relaxed">
        <div>
          <Meta>Tests</Meta>
          <div className="mt-1">{step.tests}</div>
        </div>
        <div>
          <Meta>Technique</Meta>
          <div className="mt-1">{step.technique}</div>
        </div>
        {step.trap && (
          <div className="rounded-lg border border-accent-red/30 bg-accent-red/[0.04] p-3.5">
            <Meta className="text-accent-red">Trap</Meta>
            <div className="mt-1 text-ink-dim">{step.trap}</div>
          </div>
        )}
      </div>
      {ex && (
        <div className="mt-5 pt-5 border-t border-line">
          <Meta>Example</Meta>
          <div className="mt-2 text-sm font-medium text-ink leading-snug">{ex.prompt}</div>
          <div className="mt-3 space-y-2">
            {ex.choices.map((c, i) => {
              const isChosen = chosen === i;
              const isCorrect = i === ex.answer;
              let style = "border-line text-ink-dim hover:border-line-strong hover:text-ink";
              if (revealed) {
                if (isCorrect) style = "border-accent-lime/50 bg-accent-lime/[0.06] text-ink";
                else if (isChosen) style = "border-accent-red/50 bg-accent-red/[0.06] text-ink";
                else style = "border-line text-ink-mute opacity-60";
              }
              return (
                <button
                  key={i}
                  onClick={() => !revealed && record(exampleKey, i)}
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
              className="mt-4 pt-4 border-t border-line text-sm text-ink-dim leading-relaxed overflow-hidden"
            >
              <Meta>Why</Meta>
              <p className="mt-1.5">{ex.explain}</p>
            </motion.div>
          )}
        </div>
      )}
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Step actions (continue button) — rendered below the step
// ──────────────────────────────────────────────────────────────────────

function StepActions({
  step, stepKey, onContinue,
}: {
  step: Step;
  stepKey: string;
  onContinue: () => void;
}) {
  const answers = useStore((s) => s.lessonAnswers);

  // Block advancing on MCQ until answered.
  let lockReason: string | null = null;
  if (step.type === "mcq" && answers[stepKey] === undefined) {
    lockReason = "Pick an answer";
  }
  if (step.type === "pattern" && step.example && answers[`${stepKey}.example`] === undefined) {
    // Pattern with example: don't lock — example is optional
    lockReason = null;
  }

  return (
    <div className="mt-6">
      <button
        onClick={onContinue}
        disabled={!!lockReason}
        className={cn(
          "w-full py-4 rounded-lg text-base font-medium transition-colors flex items-center justify-center gap-2",
          lockReason
            ? "bg-bg-elevated text-ink-mute cursor-not-allowed"
            : "bg-ink text-bg hover:bg-ink/90"
        )}
      >
        {lockReason ?? "Continue"} <ChevronRight size={16} />
      </button>
    </div>
  );
}
