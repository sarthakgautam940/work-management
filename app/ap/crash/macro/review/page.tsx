"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, PageHeader, Tag, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import { AP_MACRO_COURSE } from "@/lib/data/ap-crash/macro";
import type { Step, Module, Lesson } from "@/lib/data/ap-crash/types";
import { ChevronLeft, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type FlaggedItem = {
  key: string;
  module: Module;
  lesson: Lesson;
  step: Extract<Step, { type: "mcq" }>;
};

export default function ReviewPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const wrong = useStore((s) => s.apCrashWrongAnswers);
  const setWrong = useStore((s) => s.setApCrashWrongAnswer);
  const answers = useStore((s) => s.lessonAnswers);
  const record = useStore((s) => s.recordLessonAnswer);

  const c = AP_MACRO_COURSE;
  const flagged: FlaggedItem[] = [];

  c.modules.forEach((m) => {
    m.lessons.forEach((l) => {
      l.steps.forEach((s, idx) => {
        if (s.type !== "mcq") return;
        const key = `${c.id}.${m.id}.${l.id}.${idx}`;
        if (wrong[key]) flagged.push({ key, module: m, lesson: l, step: s });
      });
    });
  });

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl mx-auto pb-16">
      <PageHeader
        eyebrow="AP Macro · Review"
        title={`${flagged.length} question${flagged.length === 1 ? "" : "s"} flagged for review`}
        subtitle="Wrong answers you marked across the course. Re-attempt below; un-flag once mastered."
        right={
          <Link href="/ap/crash/macro">
            <button className="px-3 py-2 rounded-lg border border-line text-ink-dim text-sm hover:border-line-strong hover:text-ink transition-colors flex items-center gap-1.5">
              <ChevronLeft size={14} /> Course
            </button>
          </Link>
        }
      />

      {flagged.length === 0 ? (
        <Card className="p-8 text-center">
          <AlertTriangle size={20} className="text-ink-mute mx-auto mb-3" />
          <h2 className="text-lg font-medium text-ink">Nothing to review</h2>
          <p className="mt-2 text-sm text-ink-dim leading-relaxed max-w-md mx-auto">
            Mark MCQs for review by tapping &quot;Mark for review&quot; on any wrong answer inside a module. They&apos;ll show up here so you can re-attempt them in one place.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {flagged.map((f) => (
            <ReviewMCQ
              key={f.key}
              item={f}
              chosen={answers[f.key]}
              onAnswer={(idx) => record(f.key, idx)}
              onUnflag={() => setWrong(f.key, false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewMCQ({
  item, chosen, onAnswer, onUnflag,
}: {
  item: FlaggedItem;
  chosen: number | undefined;
  onAnswer: (idx: number) => void;
  onUnflag: () => void;
}) {
  // Allow re-attempt: if user wants a second try, they can tap a choice; we'll let them
  // overwrite. The "Try again" reset clears this MCQ's stored answer locally so they
  // see fresh choice buttons.
  const [localOverride, setLocalOverride] = useState<number | undefined>(chosen);
  const revealed = localOverride !== undefined;
  const isCorrect = revealed && localOverride === item.step.answer;

  const tryAgain = () => setLocalOverride(undefined);

  const pick = (i: number) => {
    setLocalOverride(i);
    onAnswer(i);
  };

  return (
    <Card className="p-5 lg:p-6">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Tag tone="amber" size="sm">flagged</Tag>
          <Meta>{item.module.title}</Meta>
        </div>
        <button
          onClick={onUnflag}
          className="text-2xs font-mono uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors flex items-center gap-1"
          aria-label="Remove from review"
        >
          un-flag <X size={11} />
        </button>
      </div>
      <h3 className="text-base font-medium text-ink leading-snug">{item.step.prompt}</h3>
      <div className="mt-4 space-y-1.5">
        {item.step.choices.map((c, i) => {
          const isChosen = localOverride === i;
          const isAnswer = i === item.step.answer;
          let style = "border-line text-ink-dim hover:border-line-strong hover:text-ink";
          if (revealed) {
            if (isAnswer) style = "border-accent-lime/50 bg-accent-lime/[0.06] text-ink";
            else if (isChosen) style = "border-accent-red/50 bg-accent-red/[0.06] text-ink";
            else style = "border-line text-ink-mute opacity-60";
          }
          return (
            <button
              key={i}
              onClick={() => !revealed && pick(i)}
              disabled={revealed}
              className={cn("w-full text-left px-3.5 py-2.5 rounded-lg border text-sm transition-colors", style)}
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
          className="mt-4 pt-3 border-t border-line text-sm text-ink-dim leading-relaxed overflow-hidden"
        >
          <Meta>{isCorrect ? "Correct ✓" : "Why"}</Meta>
          <p className="mt-1.5">{item.step.explain}</p>
          {item.step.trap && (
            <div className="mt-2.5">
              <Meta className="text-accent-red">Trap</Meta>
              <p className="mt-1">{item.step.trap}</p>
            </div>
          )}
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={tryAgain}
              className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors"
            >
              Try again
            </button>
            {isCorrect && (
              <button
                onClick={onUnflag}
                className="px-3 py-1.5 rounded-md text-2xs font-mono uppercase tracking-[0.18em] border border-accent-lime/50 bg-accent-lime/[0.06] text-accent-lime hover:bg-accent-lime/[0.12] transition-colors"
              >
                Mark mastered, un-flag
              </button>
            )}
          </div>
        </motion.div>
      )}
    </Card>
  );
}
