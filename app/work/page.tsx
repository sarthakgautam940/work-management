"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, Tag, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import { buildQueue, getPhase, summarize, WorkItem, Subtask } from "@/lib/work/engine";
import { ArrowUpRight, Check, SkipForward, Clock, X, Pause, Play, Undo2, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function WorkPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <WorkInner />;
}

function WorkInner() {
  const schoolTasks = useStore((s) => s.schoolTasks);
  const lessonDone = useStore((s) => s.lessonDone);
  const bigIdeaTasks = useStore((s) => s.bigIdeaTasks);
  const bigIdeaSourceState = useStore((s) => s.bigIdeaSourceState);
  const uplevelTasks = useStore((s) => s.uplevelTasks);
  const iboChapters = useStore((s) => s.iboChapters);
  const iboBooks = useStore((s) => s.iboBooks);
  const iboCases = useStore((s) => s.iboCases);
  const satModules = useStore((s) => s.satModules);
  const workDeferred = useStore((s) => s.workDeferred);
  const workSkipped = useStore((s) => s.workSkipped);
  const workSubtaskDone = useStore((s) => s.workSubtaskDone);
  const lessonAnswers = useStore((s) => s.lessonAnswers);
  const recentCompletions = useStore((s) => s.recentCompletions);

  const toggleSchool = useStore((s) => s.toggleSchoolTask);
  const markLessonDone = useStore((s) => s.markLessonDone);
  const recordLessonAnswer = useStore((s) => s.recordLessonAnswer);
  const toggleBigIdea = useStore((s) => s.toggleBigIdeaTask);
  const setBigIdeaSourceState = useStore((s) => s.setBigIdeaSourceState);
  const toggleUplevel = useStore((s) => s.toggleUplevelTask);
  const toggleIboChapter = useStore((s) => s.toggleIBOChapter);
  const toggleIboBookComplete = useStore((s) => s.toggleIBOBookComplete);
  const toggleIboCase = useStore((s) => s.toggleIBOCase);
  const toggleSatModule = useStore((s) => s.toggleSATModule);
  const skipWork = useStore((s) => s.skipWorkItem);
  const deferWork = useStore((s) => s.deferWorkItem);
  const setSubtaskDone = useStore((s) => s.setSubtaskDone);
  const pushRecent = useStore((s) => s.pushRecentCompletion);
  const clearRecent = useStore((s) => s.clearRecentCompletion);

  const today = useMemo(() => new Date(), []);
  const phase = getPhase(today);

  const queue = useMemo(
    () => buildQueue(today, {
      schoolTasks, lessonDone, bigIdeaTasks, bigIdeaSourceState,
      uplevelTasks, iboChapters, iboBooks, iboCases, satModules,
      workDeferred, workSkipped,
    }),
    [today, schoolTasks, lessonDone, bigIdeaTasks, bigIdeaSourceState, uplevelTasks, iboChapters, iboBooks, iboCases, satModules, workDeferred, workSkipped]
  );

  const current = queue[0];
  const summary = summarize(queue);

  const isSubtaskDone = (parentId: string, sub: Subtask): boolean => {
    if (sub.type === "mcq" && sub.payload?.lessonId !== undefined) {
      return lessonAnswers[`${sub.payload.lessonId}.${sub.payload.qIdx}`] !== undefined;
    }
    if (parentId === "big-idea-seminar") {
      return !!bigIdeaTasks[sub.id];
    }
    return !!workSubtaskDone[`${parentId}.${sub.id}`];
  };

  const completeSubtask = (parent: WorkItem, sub: Subtask) => {
    if (parent.id === "big-idea-seminar") {
      toggleBigIdea(sub.id);
      pushRecent({ itemId: parent.id, type: "subtask-bi", subId: sub.id, label: sub.label });
    } else {
      setSubtaskDone(parent.id, sub.id, true);
      pushRecent({ itemId: parent.id, type: "subtask", subId: sub.id, label: sub.label });
    }
  };

  const undoSubtask = (parentId: string, subId: string, subtype: string) => {
    if (subtype === "subtask-bi") toggleBigIdea(subId);
    else setSubtaskDone(parentId, subId, false);
    clearRecent(parentId);
  };

  const completeTask = (item: WorkItem) => {
    if (item.type === "school-task") toggleSchool(item.id);
    else if (item.type === "ap-lesson" && item.payload?.lesson) markLessonDone(item.payload.lesson.id, true);
    else if (item.type === "big-idea-prep") {
      // already handled per-subtask; nothing to do here
    }
    else if (item.type === "uplevel-task") toggleUplevel(item.id.replace(/^up-/, ""));
    else if (item.type === "ibo-chapter") toggleIboChapter(item.id.replace(/^ibo-ch-/, ""));
    else if (item.type === "ibo-book") toggleIboBookComplete(item.id.replace(/^ibo-bk-/, ""));
    else if (item.type === "ibo-case") toggleIboCase(item.id.replace(/^ibo-case-/, ""));
    else if (item.type === "sat-module") toggleSatModule(item.id.replace(/^sat-/, ""));
    else if (item.type === "big-idea-source") {
      const sourceId = item.id.replace(/^bi-src-/, "");
      const cur = bigIdeaSourceState[sourceId] ?? "pending";
      const next = cur === "pending" ? "selected" : cur === "selected" ? "annotated" : "approved";
      setBigIdeaSourceState(sourceId, next);
    }
    pushRecent({ itemId: item.id, type: item.type, label: item.title });
  };

  const undoTask = (itemId: string, type: string) => {
    if (type === "school-task") toggleSchool(itemId);
    else if (type === "ap-lesson") {
      const lessonId = itemId.replace(/^lesson-/, "");
      markLessonDone(lessonId, false);
    }
    else if (type === "uplevel-task") toggleUplevel(itemId.replace(/^up-/, ""));
    else if (type === "ibo-chapter") toggleIboChapter(itemId.replace(/^ibo-ch-/, ""));
    else if (type === "ibo-book") toggleIboBookComplete(itemId.replace(/^ibo-bk-/, ""));
    else if (type === "ibo-case") toggleIboCase(itemId.replace(/^ibo-case-/, ""));
    else if (type === "sat-module") toggleSatModule(itemId.replace(/^sat-/, ""));
    clearRecent(itemId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <UndoStrip recent={recentCompletions} onUndo={(rec) => {
        if (rec.subId) undoSubtask(rec.itemId, rec.subId, rec.type);
        else undoTask(rec.itemId, rec.type);
      }} />

      <TopBar phase={phase} summary={summary} />

      <div className="flex-1 flex flex-col items-center px-5 lg:px-10 pt-3 pb-24 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <TaskRunner
                item={current}
                isSubtaskDone={(sub) => isSubtaskDone(current.id, sub)}
                onSubtaskComplete={(sub) => completeSubtask(current, sub)}
                onTaskComplete={() => completeTask(current)}
                onSkip={() => skipWork(current.id)}
                onDefer={(h) => deferWork(current.id, Date.now() + h * 3600 * 1000)}
                recordAnswer={recordLessonAnswer}
                lessonAnswers={lessonAnswers}
              />
            </motion.div>
          ) : (
            <EmptyState />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Top bar: phase, queue size, exit
// ──────────────────────────────────────────────────────────────────────

function TopBar({ phase, summary }: { phase: ReturnType<typeof getPhase>; summary: ReturnType<typeof summarize> }) {
  const phaseLabel = {
    "ap-week": "AP exam week",
    "school-only": "Final school stretch",
    "olympiad": "Olympiad sprint",
    "sat-only": "SAT focus",
  }[phase];
  const hours = Math.round((summary.minutes / 60) * 10) / 10;
  return (
    <div className="sticky top-0 z-20 px-5 lg:px-10 py-3.5 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
          <Meta>Work mode</Meta>
          <span className="text-ink-ghost">·</span>
          <Meta className="truncate">{phaseLabel}</Meta>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Meta>{summary.count} · {hours}h</Meta>
          <Link href="/" className="p-1 -mr-1 text-ink-mute hover:text-ink transition-colors">
            <X size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Undo strip — recent completions, click to revert
// ──────────────────────────────────────────────────────────────────────

function UndoStrip({
  recent,
  onUndo,
}: {
  recent: { itemId: string; type: string; subId?: string; at: number; label: string }[];
  onUndo: (rec: { itemId: string; type: string; subId?: string; label: string }) => void;
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const visible = recent.filter((r) => now - r.at < 12_000);
  if (visible.length === 0) return null;
  return (
    <div className="px-5 lg:px-10 pt-2 pb-0">
      <div className="max-w-2xl mx-auto flex flex-col gap-1.5">
        <AnimatePresence>
          {visible.map((r) => {
            const remaining = Math.max(0, 12 - Math.floor((now - r.at) / 1000));
            return (
              <motion.button
                key={`${r.itemId}-${r.subId ?? "-"}-${r.at}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                onClick={() => onUndo(r)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-bg-elevated/80 border border-line hover:border-line-strong text-left text-xs transition-colors group"
              >
                <Check size={12} className="text-accent-lime shrink-0" />
                <span className="text-ink-dim flex-1 truncate">Marked: <span className="text-ink">{r.label}</span></span>
                <span className="font-mono text-2xs text-ink-ghost shrink-0">{remaining}s</span>
                <Undo2 size={12} className="text-ink-mute group-hover:text-ink shrink-0" />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// TaskRunner — handles tasks with or without subtasks
// ──────────────────────────────────────────────────────────────────────

function TaskRunner({
  item,
  isSubtaskDone,
  onSubtaskComplete,
  onTaskComplete,
  onSkip,
  onDefer,
  recordAnswer,
  lessonAnswers,
}: {
  item: WorkItem;
  isSubtaskDone: (sub: Subtask) => boolean;
  onSubtaskComplete: (sub: Subtask) => void;
  onTaskComplete: () => void;
  onSkip: () => void;
  onDefer: (h: number) => void;
  recordAnswer: (key: string, idx: number) => void;
  lessonAnswers: Record<string, number>;
}) {
  const subs = item.subtasks ?? [];
  const remaining = subs.filter((s) => !isSubtaskDone(s));
  const allSubsDone = subs.length > 0 && remaining.length === 0;
  const currentSub = remaining[0];

  return (
    <div>
      <TaskHeader item={item} subTotal={subs.length} subDone={subs.length - remaining.length} />

      <Timer key={item.id} initialMin={item.estimateMin ?? 25} />

      <AnimatePresence mode="wait">
        {currentSub ? (
          <SubtaskScreen
            key={currentSub.id}
            parent={item}
            sub={currentSub}
            onComplete={() => onSubtaskComplete(currentSub)}
            recordAnswer={recordAnswer}
            lessonAnswers={lessonAnswers}
          />
        ) : (
          <CompletionGate
            key="gate"
            item={item}
            allSubsDone={allSubsDone}
            onComplete={onTaskComplete}
          />
        )}
      </AnimatePresence>

      <SecondaryActions onSkip={onSkip} onDefer={onDefer} />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Header for the active task
// ──────────────────────────────────────────────────────────────────────

function TaskHeader({ item, subTotal, subDone }: { item: WorkItem; subTotal: number; subDone: number }) {
  const tone = categoryTone(item);
  return (
    <div className="mb-7">
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <Eyebrow accent={tone.eyebrow}>{categoryLabel(item)}</Eyebrow>
        {item.className && <Meta>{item.className}</Meta>}
        {item.gradeType && item.gradeType !== "study" && <Meta>{item.gradeType}</Meta>}
        {item.overdue && <Tag tone="red" size="sm">Late</Tag>}
        {item.due && !item.overdue && <Meta>due {item.due.slice(5)}</Meta>}
      </div>
      <h1 className="text-2xl lg:text-[28px] font-bold tracking-tightest leading-[1.15] text-ink">
        {item.title}
      </h1>
      {item.detail && (
        <p className="mt-2.5 text-ink-dim text-sm lg:text-base leading-relaxed">{item.detail}</p>
      )}

      {subTotal > 0 && (
        <div className="mt-5 flex items-center gap-2.5">
          <div className="flex gap-1">
            {Array.from({ length: subTotal }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all",
                  i < subDone ? "w-6 bg-accent-lime" : i === subDone ? "w-9 bg-ink/60" : "w-3 bg-line-strong"
                )}
              />
            ))}
          </div>
          <Meta>{subDone}/{subTotal}</Meta>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Inline timer — count-up by default with a soft target ring
// ──────────────────────────────────────────────────────────────────────

function Timer({ initialMin }: { initialMin: number }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const target = initialMin * 60;
  const pct = Math.min(100, (seconds / target) * 100);
  const overTarget = seconds > target;

  return (
    <Card className="p-4 mb-5 flex items-center gap-4">
      <button
        onClick={() => setRunning((r) => !r)}
        className="w-10 h-10 rounded-full bg-bg-elevated border border-line hover:border-line-strong flex items-center justify-center text-ink shrink-0 transition-colors"
        aria-label={running ? "Pause timer" : "Resume timer"}
      >
        {running ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl tabular-nums tracking-tightest text-ink">{mm}:{ss}</span>
          <Meta>target {initialMin}m</Meta>
          {overTarget && <Meta className="text-accent-amber">over</Meta>}
        </div>
        <div className="mt-2 h-1 rounded-full bg-line overflow-hidden">
          <div
            className={cn("h-full transition-all duration-700 ease-out", overTarget ? "bg-accent-amber" : "bg-ink/70")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <button
        onClick={() => setSeconds(0)}
        className="text-ink-mute hover:text-ink text-2xs font-mono uppercase tracking-[0.18em] transition-colors"
      >
        Reset
      </button>
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Subtask screen — content depends on subtask type
// ──────────────────────────────────────────────────────────────────────

function SubtaskScreen({
  parent,
  sub,
  onComplete,
  recordAnswer,
  lessonAnswers,
}: {
  parent: WorkItem;
  sub: Subtask;
  onComplete: () => void;
  recordAnswer: (key: string, idx: number) => void;
  lessonAnswers: Record<string, number>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="mb-6"
    >
      <SubtaskBody parent={parent} sub={sub} recordAnswer={recordAnswer} lessonAnswers={lessonAnswers} />
      <SubtaskActions parent={parent} sub={sub} onComplete={onComplete} lessonAnswers={lessonAnswers} />
    </motion.div>
  );
}

function SubtaskBody({
  parent,
  sub,
  recordAnswer,
  lessonAnswers,
}: {
  parent: WorkItem;
  sub: Subtask;
  recordAnswer: (key: string, idx: number) => void;
  lessonAnswers: Record<string, number>;
}) {
  if (sub.type === "concept") {
    return (
      <Card className="p-6 lg:p-7">
        <Eyebrow>Concept</Eyebrow>
        <h2 className="mt-3 text-xl font-bold tracking-tightest leading-tight">{sub.label}</h2>
        <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-ink-dim">
          {(sub.payload?.body as string[] | undefined)?.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Card>
    );
  }
  if (sub.type === "formulas") {
    return (
      <Card className="p-6 lg:p-7">
        <Eyebrow accent="amber">Formulas</Eyebrow>
        <h2 className="mt-3 text-xl font-bold tracking-tightest">{sub.label}</h2>
        <ul className="mt-5 space-y-3">
          {(sub.payload?.formulas as string[] | undefined)?.map((f, i) => (
            <li key={i} className="px-4 py-3 rounded-lg bg-bg-elevated border border-line font-mono text-base text-ink">
              {f}
            </li>
          ))}
        </ul>
      </Card>
    );
  }
  if (sub.type === "example") {
    const ex = sub.payload?.example as { prompt: string; solution: string } | undefined;
    return (
      <Card className="p-6 lg:p-7">
        <Eyebrow accent="lime">Worked example</Eyebrow>
        <h2 className="mt-3 text-xl font-bold tracking-tightest">{sub.label}</h2>
        {ex && (
          <>
            <div className="mt-5 px-4 py-3.5 rounded-lg bg-bg-elevated border border-line">
              <Meta>Q</Meta>
              <div className="mt-1 text-ink leading-relaxed">{ex.prompt}</div>
            </div>
            <div className="mt-3 px-4 py-3.5 rounded-lg bg-accent-lime/[0.04] border border-accent-lime/20">
              <Meta>Solution</Meta>
              <div className="mt-1 text-ink-dim leading-relaxed">{ex.solution}</div>
            </div>
          </>
        )}
      </Card>
    );
  }
  if (sub.type === "mcq") {
    const mcq = sub.payload?.mcq as { q: string; choices: string[]; answer: number; explain: string };
    const lessonId = sub.payload?.lessonId as string;
    const qIdx = sub.payload?.qIdx as number;
    const key = `${lessonId}.${qIdx}`;
    const chosen = lessonAnswers[key];
    const revealed = chosen !== undefined;
    return (
      <Card className="p-6 lg:p-7">
        <div className="flex items-center justify-between mb-3">
          <Eyebrow>Question</Eyebrow>
          {revealed && (
            <Meta>
              {chosen === mcq.answer ? (
                <span className="text-accent-lime">Correct</span>
              ) : (
                <span className="text-accent-red">Incorrect</span>
              )}
            </Meta>
          )}
        </div>
        <h2 className="text-lg lg:text-xl font-medium leading-snug text-ink">{mcq.q}</h2>
        <div className="mt-5 space-y-2">
          {mcq.choices.map((c, i) => {
            const isChosen = chosen === i;
            const isCorrect = i === mcq.answer;
            let style = "border-line text-ink-dim hover:border-line-strong hover:text-ink";
            if (revealed) {
              if (isCorrect) style = "border-accent-lime/50 bg-accent-lime/[0.06] text-ink";
              else if (isChosen) style = "border-accent-red/50 bg-accent-red/[0.06] text-ink";
              else style = "border-line text-ink-mute opacity-60";
            }
            return (
              <button
                key={i}
                onClick={() => !revealed && recordAnswer(key, i)}
                disabled={revealed}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors",
                  style,
                )}
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
            <p className="mt-1.5">{mcq.explain}</p>
          </motion.div>
        )}
      </Card>
    );
  }
  // checklist (default — Big Idea seminar prep steps)
  return (
    <Card className="p-6 lg:p-7">
      <Eyebrow accent="rose">Step</Eyebrow>
      <h2 className="mt-3 text-xl font-bold tracking-tightest leading-tight">{sub.label}</h2>
      {sub.detail && <p className="mt-3 text-ink-dim leading-relaxed">{sub.detail}</p>}
      {sub.estimateMin && (
        <div className="mt-4">
          <Meta>~{sub.estimateMin}m</Meta>
        </div>
      )}
    </Card>
  );
}

function SubtaskActions({
  parent,
  sub,
  onComplete,
  lessonAnswers,
}: {
  parent: WorkItem;
  sub: Subtask;
  onComplete: () => void;
  lessonAnswers: Record<string, number>;
}) {
  // For MCQs: don't allow advance until an answer is chosen
  const mcqLocked =
    sub.type === "mcq" &&
    lessonAnswers[`${sub.payload?.lessonId}.${sub.payload?.qIdx}`] === undefined;
  const label =
    sub.type === "mcq" ? (mcqLocked ? "Select an answer" : "Continue") :
    sub.type === "concept" ? "Got it — continue" :
    sub.type === "formulas" ? "Memorized — continue" :
    sub.type === "example" ? "Understood — continue" :
    "Mark complete — continue";

  return (
    <div className="mt-5">
      <Button
        variant="primary"
        size="lg"
        onClick={onComplete}
        disabled={mcqLocked}
        className={cn(
          "w-full py-5 text-base",
          mcqLocked && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className="flex items-center justify-center gap-2">
          {label} {!mcqLocked && <ChevronRight size={16} />}
        </span>
      </Button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Completion gate — confirm before marking the parent task done
// ──────────────────────────────────────────────────────────────────────

function CompletionGate({
  item,
  allSubsDone,
  onComplete,
}: {
  item: WorkItem;
  allSubsDone: boolean;
  onComplete: () => void;
}) {
  const linkLabel =
    item.type === "school-task" ? "Open the assignment"
    : item.type === "ap-lesson" ? "Open AP review"
    : "Open";
  const completeLabel =
    item.type === "ap-lesson" ? "Lesson complete"
    : item.type === "big-idea-prep" ? "All steps done — finish"
    : item.type === "big-idea-source" ? "Advance state"
    : "Mark task complete";

  return (
    <motion.div
      key="gate"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
    >
      <Card className="p-6 lg:p-8">
        {allSubsDone ? (
          <>
            <Eyebrow accent="lime">Ready to ship</Eyebrow>
            <h2 className="mt-3 text-xl font-bold tracking-tightest text-ink">All subtasks done.</h2>
            <p className="mt-3 text-ink-dim text-sm leading-relaxed">
              Verify the work is genuinely complete — submitted on Schoology, paper printed, hexagonal sheet packed. Then close the loop.
            </p>
          </>
        ) : (
          <>
            <Eyebrow>Take action</Eyebrow>
            <h2 className="mt-3 text-xl font-bold tracking-tightest text-ink">Open it and do it.</h2>
            <p className="mt-3 text-ink-dim text-sm leading-relaxed">
              No subtasks for this one — just go to the source, finish, then mark complete.
            </p>
          </>
        )}

        {(item.link || item.internalRoute) && (
          <div className="mt-5 flex items-center gap-2 flex-wrap">
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">
                  <span className="flex items-center gap-1.5">{linkLabel} <ArrowUpRight size={13} /></span>
                </Button>
              </a>
            )}
            {item.internalRoute && item.internalRoute !== "/work" && (
              <Link href={item.internalRoute}>
                <Button variant="secondary">Open in app</Button>
              </Link>
            )}
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          onClick={onComplete}
          className="w-full mt-6 py-5 text-base"
        >
          <span className="flex items-center justify-center gap-2"><Check size={16} /> {completeLabel}</span>
        </Button>
      </Card>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Skip / Defer footer
// ──────────────────────────────────────────────────────────────────────

function SecondaryActions({ onSkip, onDefer }: { onSkip: () => void; onDefer: (h: number) => void }) {
  return (
    <div className="mt-7 flex items-center justify-center gap-4">
      <button
        onClick={() => onDefer(2)}
        className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors flex items-center gap-1.5"
      >
        <Clock size={11} /> Defer 2h
      </button>
      <span className="text-ink-ghost">·</span>
      <button
        onClick={onSkip}
        className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors flex items-center gap-1.5"
      >
        <SkipForward size={11} /> Skip
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Empty state
// ──────────────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center text-center py-24"
    >
      <Zap size={28} className="text-accent-lime mb-5" />
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tightest">All clear.</h2>
      <p className="mt-3 text-ink-dim max-w-md">
        Nothing in the priority queue. Go take a break — that counts as work too.
      </p>
      <Link href="/" className="mt-7">
        <Button variant="secondary">Back to dashboard</Button>
      </Link>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────

function categoryLabel(item: WorkItem): string {
  switch (item.type) {
    case "school-task": return item.className ? `School · ${item.className}` : "Schoolwork";
    case "ap-lesson": return "AP study";
    case "big-idea-prep": return "Big Idea";
    case "big-idea-source": return "Big Idea source";
    case "uplevel-task": return "UpLevel";
    case "ibo-chapter": return "IBO · chapter";
    case "ibo-book": return "IBO · book";
    case "ibo-case": return "IBO · case";
    case "sat-module": return "SAT";
  }
}

function categoryTone(item: WorkItem): { eyebrow: "lime" | "amber" | "violet" | "blue" | "rose"; text: string } {
  if (item.overdue) return { eyebrow: "amber", text: "text-accent-red" };
  switch (item.category) {
    case "school": return { eyebrow: "rose", text: "text-accent-rose" };
    case "ap": return { eyebrow: "amber", text: "text-accent-amber" };
    case "business": return { eyebrow: "violet", text: "text-accent-violet" };
    case "olympiad": return { eyebrow: "amber", text: "text-accent-amber" };
    case "sat": return { eyebrow: "lime", text: "text-accent-lime" };
  }
}
