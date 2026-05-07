"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Card, Eyebrow, Meta, Tag, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import { buildQueue, getPhase, summarize, WorkItem, Subtask } from "@/lib/work/engine";
import {
  ArrowUpRight, Check, SkipForward, Clock, X, Pause, Play, Undo2, Zap, ChevronRight,
  ListOrdered, GripVertical, Minus, Plus,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkMounted />
    </Suspense>
  );
}

function WorkMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <WorkInner />;
}

function WorkInner() {
  const params = useSearchParams();
  const router = useRouter();
  const focusId = params?.get("focus") ?? null;
  const returnTo = params?.get("from") ?? null;

  // Store reads
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
  const manualOrder = useStore((s) => s.manualOrder);
  const pendingSkipCount = useStore((s) => s.pendingSkipCount);
  const customTasks = useStore((s) => s.customTasks);
  const customTaskEdits = useStore((s) => s.customTaskEdits);
  const deletedTasks = useStore((s) => s.deletedTasks);

  // Store actions
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
  const skipOnePosition = useStore((s) => s.skipOnePosition);
  const decrementAllSkips = useStore((s) => s.decrementAllSkips);
  const deferWork = useStore((s) => s.deferWorkItem);
  const clearDefer = useStore((s) => s.clearDefer);
  const setSubtaskDone = useStore((s) => s.setSubtaskDone);
  const pushRecent = useStore((s) => s.pushRecentCompletion);
  const clearRecent = useStore((s) => s.clearRecentCompletion);
  const setManualOrder = useStore((s) => s.setManualOrder);
  const clearManualOrder = useStore((s) => s.clearManualOrder);

  const today = useMemo(() => new Date(), []);
  const phase = getPhase(today);

  const queue = useMemo(
    () => buildQueue(today, {
      schoolTasks, lessonDone, bigIdeaTasks, bigIdeaSourceState,
      uplevelTasks, iboChapters, iboBooks, iboCases, satModules,
      workDeferred, workSkipped, manualOrder, pendingSkipCount,
      customTasks, customTaskEdits, deletedTasks,
    }),
    [today, schoolTasks, lessonDone, bigIdeaTasks, bigIdeaSourceState, uplevelTasks, iboChapters, iboBooks, iboCases, satModules, workDeferred, workSkipped, manualOrder, pendingSkipCount, customTasks, customTaskEdits, deletedTasks]
  );

  const focused = focusId ? queue.find((q) => q.id === focusId) ?? null : null;
  const current = focused ?? queue[0];
  const summary = summarize(queue);

  const [timelineOpen, setTimelineOpen] = useState(false);

  const isSubtaskDone = (parentId: string, sub: Subtask): boolean => {
    if (sub.type === "mcq" && sub.payload?.lessonId !== undefined) {
      return lessonAnswers[`${sub.payload.lessonId}.${sub.payload.qIdx}`] !== undefined;
    }
    if (parentId === "big-idea-seminar" || parentId === "big-idea-hex-sheet") {
      return !!bigIdeaTasks[sub.id];
    }
    return !!workSubtaskDone[`${parentId}.${sub.id}`];
  };

  const completeSubtask = (parent: WorkItem, sub: Subtask) => {
    if (parent.id === "big-idea-seminar" || parent.id === "big-idea-hex-sheet") {
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
    decrementAllSkips();
    if (focusId === item.id) {
      // Return to where the user came from after focused task completion.
      setTimeout(() => router.push(returnTo ?? "/"), 240);
    }
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

      <TopBar
        phase={phase}
        summary={summary}
        onTimeline={() => setTimelineOpen(true)}
      />

      {focused && (
        <div className="px-5 lg:px-10 pt-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3 px-3.5 py-2.5 rounded-lg border border-line bg-bg-elevated/50">
            <Meta className="text-ink">Single task</Meta>
            <span className="text-2xs text-ink-mute flex-1">
              Focused from <span className="text-ink-dim">{returnTo ?? "elsewhere"}</span>. Returns there on complete.
            </span>
            <Link href="/work" className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors">
              Use full queue →
            </Link>
          </div>
        </div>
      )}

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
                onSkipOne={() => skipOnePosition(current.id)}
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

      <TimelinePanel
        open={timelineOpen}
        onClose={() => setTimelineOpen(false)}
        queue={queue}
        manualOrder={manualOrder}
        workDeferred={workDeferred}
        pendingSkipCount={pendingSkipCount}
        onReorder={(ids) => setManualOrder(ids)}
        onResetOrder={clearManualOrder}
        onClearDefer={(id) => clearDefer(id)}
        onExtendDefer={(id) => deferWork(id, Date.now() + 4 * 3600 * 1000)}
        onJumpTo={(id) => {
          // Jump to a specific task by promoting it to top of manual order.
          const next = [id, ...manualOrder.filter((x) => x !== id)];
          setManualOrder(next);
          setTimelineOpen(false);
        }}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Top bar
// ──────────────────────────────────────────────────────────────────────

function TopBar({
  phase, summary, onTimeline,
}: {
  phase: ReturnType<typeof getPhase>;
  summary: ReturnType<typeof summarize>;
  onTimeline: () => void;
}) {
  const phaseLabel = {
    "ap-week": "AP exam week",
    "school-only": "Final school stretch",
    "olympiad": "Olympiad sprint",
    "sat-only": "SAT focus",
  }[phase];
  const hours = Math.round((summary.minutes / 60) * 10) / 10;
  return (
    <div className="sticky top-0 z-20 px-5 lg:px-10 py-4 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-bold text-base tracking-tightest text-ink shrink-0">Work mode</span>
          <span className="hidden sm:inline-block w-px h-3.5 bg-line-strong shrink-0" />
          <span className="hidden sm:inline-block font-mono text-2xs tracking-[0.18em] uppercase text-ink-mute truncate">
            {phaseLabel}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-sm tabular-nums text-ink">{summary.count}</span>
            <span className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute">tasks</span>
          </div>
          <div className="hidden sm:flex items-baseline gap-1.5">
            <span className="font-mono text-sm tabular-nums text-ink">{hours}</span>
            <span className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute">hrs</span>
          </div>
          <button
            onClick={onTimeline}
            className="w-8 h-8 rounded-md flex items-center justify-center text-ink-mute hover:text-ink hover:bg-bg-elevated transition-colors"
            aria-label="Open timeline"
          >
            <ListOrdered size={16} />
          </button>
          <Link
            href="/"
            className="w-8 h-8 -mr-1 rounded-md flex items-center justify-center text-ink-mute hover:text-ink hover:bg-bg-elevated transition-colors"
            aria-label="Exit work mode"
          >
            <X size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Timeline panel — slide-in from right
// ──────────────────────────────────────────────────────────────────────

function TimelinePanel({
  open, onClose, queue, manualOrder, workDeferred, pendingSkipCount,
  onReorder, onResetOrder, onClearDefer, onExtendDefer, onJumpTo,
}: {
  open: boolean;
  onClose: () => void;
  queue: WorkItem[];
  manualOrder: string[];
  workDeferred: Record<string, number>;
  pendingSkipCount: Record<string, number>;
  onReorder: (ids: string[]) => void;
  onResetOrder: () => void;
  onClearDefer: (id: string) => void;
  onExtendDefer: (id: string) => void;
  onJumpTo: (id: string) => void;
}) {
  // Keep a local state mirror so dragging is responsive without re-running the engine.
  const [items, setItems] = useState<WorkItem[]>(queue);
  useEffect(() => setItems(queue), [queue]);

  const visible = items.slice(0, 14);
  const deferredCount = Object.entries(workDeferred).filter(([, until]) => until > Date.now()).length;
  const deferredItems = Object.entries(workDeferred)
    .filter(([, until]) => until > Date.now())
    .map(([id, until]) => ({ id, until }));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[55] w-full sm:w-[420px] bg-bg-surface border-l border-line flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <div>
                <Eyebrow>Timeline</Eyebrow>
                <div className="mt-1 text-sm text-ink-dim">
                  {items.length} tasks queued
                  {manualOrder.length > 0 && (
                    <span className="ml-2 font-mono text-2xs uppercase tracking-[0.18em] text-accent-amber">
                      manual
                    </span>
                  )}
                </div>
              </div>
              <button onClick={onClose} className="text-ink-mute hover:text-ink p-2 -mr-2">
                <X size={16} />
              </button>
            </div>

            {manualOrder.length > 0 && (
              <div className="px-5 py-3 border-b border-line">
                <button
                  onClick={onResetOrder}
                  className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors"
                >
                  Reset to auto-priority
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-3 py-3">
              <Reorder.Group
                axis="y"
                values={visible}
                onReorder={(newItems) => {
                  setItems([...newItems, ...items.slice(visible.length)]);
                  onReorder(newItems.map((i) => i.id));
                }}
                className="space-y-1.5"
              >
                {visible.map((it, i) => (
                  <Reorder.Item
                    key={it.id}
                    value={it}
                    className="group flex items-center gap-2 px-2.5 py-2.5 rounded-lg bg-bg-elevated/40 border border-line cursor-grab active:cursor-grabbing"
                    whileDrag={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
                  >
                    <GripVertical size={14} className="text-ink-ghost shrink-0" />
                    <span className="font-mono text-2xs tabular-nums text-ink-mute w-5 shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-ink truncate">{it.title}</div>
                      <div className="text-2xs text-ink-mute mt-0.5 flex items-center gap-1.5">
                        <span>{it.className ?? it.category}</span>
                        {it.estimateMin && <span>· {it.estimateMin}m</span>}
                        {pendingSkipCount[it.id] > 0 && (
                          <Tag tone="amber" size="sm">skip {pendingSkipCount[it.id]}</Tag>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onJumpTo(it.id);
                      }}
                      className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors px-1.5"
                    >
                      Jump
                    </button>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              {items.length > visible.length && (
                <div className="mt-3 text-center text-2xs font-mono uppercase tracking-[0.18em] text-ink-ghost">
                  +{items.length - visible.length} more below
                </div>
              )}
            </div>

            {deferredCount > 0 && (
              <div className="px-5 py-4 border-t border-line">
                <Eyebrow accent="amber">Deferred · {deferredCount}</Eyebrow>
                <div className="mt-2.5 space-y-1.5">
                  {deferredItems.map(({ id, until }) => (
                    <DeferredRow
                      key={id}
                      id={id}
                      until={until}
                      onClear={() => onClearDefer(id)}
                      onExtend={() => onExtendDefer(id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DeferredRow({
  id, until, onClear, onExtend,
}: {
  id: string;
  until: number;
  onClear: () => void;
  onExtend: () => void;
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const remainMs = Math.max(0, until - now);
  const m = Math.floor(remainMs / 60000);
  const s = Math.floor((remainMs % 60000) / 1000);
  return (
    <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-bg-elevated/30 border border-line">
      <span className="text-xs text-ink-dim flex-1 truncate">{id}</span>
      <span className="font-mono text-2xs tabular-nums text-ink-mute">
        {m}:{String(s).padStart(2, "0")}
      </span>
      <button
        onClick={onExtend}
        className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors px-1.5"
      >
        +2h
      </button>
      <button
        onClick={onClear}
        className="font-mono text-2xs uppercase tracking-[0.18em] text-accent-lime hover:text-ink transition-colors px-1.5"
      >
        Bring back
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Undo strip
// ──────────────────────────────────────────────────────────────────────

function UndoStrip({
  recent, onUndo,
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
// TaskRunner
// ──────────────────────────────────────────────────────────────────────

function TaskRunner({
  item, isSubtaskDone, onSubtaskComplete, onTaskComplete,
  onSkipOne, onDefer, recordAnswer, lessonAnswers,
}: {
  item: WorkItem;
  isSubtaskDone: (sub: Subtask) => boolean;
  onSubtaskComplete: (sub: Subtask) => void;
  onTaskComplete: () => void;
  onSkipOne: () => void;
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

      <Timer taskId={item.id} initialMin={item.estimateMin ?? 25} />

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

      <SecondaryActions onSkipOne={onSkipOne} onDefer={onDefer} />
    </div>
  );
}

function TaskHeader({ item, subTotal, subDone }: { item: WorkItem; subTotal: number; subDone: number }) {
  const tone = categoryTone(item);
  const meta: { kind: "tag-red" | "text"; value: string }[] = [];
  if (item.overdue) meta.push({ kind: "tag-red", value: "Late" });
  if (item.due && !item.overdue) {
    const m = item.due.slice(5).split("-");
    meta.push({ kind: "text", value: `due ${m[0]}/${m[1]}` });
  }
  if (item.gradeType && item.gradeType !== "study" && item.gradeType !== "classwork") {
    meta.push({ kind: "text", value: item.gradeType });
  }

  return (
    <div className="mb-7">
      <div className="flex items-center gap-3 flex-wrap mb-3.5">
        <Eyebrow accent={tone.eyebrow}>{categoryLabel(item)}</Eyebrow>
        {meta.length > 0 && (
          <div className="flex items-center gap-2">
            {meta.map((p, i) =>
              p.kind === "tag-red" ? <Tag key={i} tone="red" size="sm">{p.value}</Tag> :
              <span key={i} className="font-mono text-2xs tracking-[0.18em] uppercase text-ink-mute">{p.value}</span>
            )}
          </div>
        )}
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
          <span className="font-mono text-2xs tracking-[0.18em] uppercase text-ink-mute tabular-nums">
            {subDone}/{subTotal}
          </span>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Timer with persistent state + adjustable target
// ──────────────────────────────────────────────────────────────────────

function Timer({ taskId, initialMin }: { taskId: string; initialMin: number }) {
  const t = useStore((s) => s.workTimers[taskId]);
  const start = useStore((s) => s.startWorkTimer);
  const pause = useStore((s) => s.pauseWorkTimer);
  const reset = useStore((s) => s.resetWorkTimer);
  const customTargets = useStore((s) => s.timerTargets);
  const setTarget = useStore((s) => s.setTimerTarget);

  const startedAt = t?.startedAt ?? null;
  const accumulated = t?.accumulated ?? 0;
  const running = startedAt !== null;

  const [, force] = useState(0);
  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => force((n) => n + 1), 1000);
    return () => clearInterval(i);
  }, [running]);

  const elapsedMs = accumulated + (startedAt ? Date.now() - startedAt : 0);
  const seconds = Math.floor(elapsedMs / 1000);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const targetSec = customTargets[taskId] ?? initialMin * 60;
  const targetMin = Math.max(1, Math.round(targetSec / 60));
  const pct = targetSec > 0 ? Math.min(100, (seconds / targetSec) * 100) : 0;
  const overTarget = seconds > targetSec;
  const idle = !running && seconds === 0;

  const adjust = (delta: number) => {
    const nextMin = Math.max(1, Math.min(240, targetMin + delta));
    setTarget(taskId, nextMin * 60);
  };

  return (
    <Card className="p-4 mb-5 flex items-center gap-4">
      <button
        onClick={() => (running ? pause(taskId) : start(taskId))}
        className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors border",
          running
            ? "bg-bg-elevated border-line-strong text-ink hover:bg-line/60"
            : "bg-ink text-bg border-ink hover:bg-ink/90"
        )}
        aria-label={running ? "Pause timer" : "Start timer"}
      >
        {running ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn("font-mono text-2xl tabular-nums tracking-tightest", idle ? "text-ink-mute" : "text-ink")}>
            {mm}:{ss}
          </span>
          <div className="flex items-center gap-1 ml-1">
            <button
              onClick={() => adjust(-5)}
              className="w-6 h-6 rounded flex items-center justify-center text-ink-mute hover:text-ink hover:bg-bg-elevated transition-colors"
              aria-label="Decrease target by 5 min"
            >
              <Minus size={11} />
            </button>
            <span className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute tabular-nums w-14 text-center">
              target {targetMin}m
            </span>
            <button
              onClick={() => adjust(5)}
              className="w-6 h-6 rounded flex items-center justify-center text-ink-mute hover:text-ink hover:bg-bg-elevated transition-colors"
              aria-label="Increase target by 5 min"
            >
              <Plus size={11} />
            </button>
          </div>
          {overTarget && <span className="font-mono text-2xs uppercase tracking-[0.18em] text-accent-amber">over</span>}
          {idle && <span className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-ghost">tap to start</span>}
        </div>
        <div className="mt-2 h-1 rounded-full bg-line overflow-hidden">
          <div
            className={cn("h-full transition-all duration-700 ease-out", overTarget ? "bg-accent-amber" : "bg-ink/70")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <button
        onClick={() => reset(taskId)}
        className="text-ink-mute hover:text-ink text-2xs font-mono uppercase tracking-[0.18em] transition-colors"
      >
        Reset
      </button>
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Subtask screen
// ──────────────────────────────────────────────────────────────────────

function SubtaskScreen({
  parent, sub, onComplete, recordAnswer, lessonAnswers,
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
  sub, recordAnswer, lessonAnswers,
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
            <Meta>{chosen === mcq.answer ? <span className="text-accent-lime">Correct</span> : <span className="text-accent-red">Incorrect</span>}</Meta>
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
            <p className="mt-1.5">{mcq.explain}</p>
          </motion.div>
        )}
      </Card>
    );
  }
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
  sub, onComplete, lessonAnswers,
}: {
  parent: WorkItem;
  sub: Subtask;
  onComplete: () => void;
  lessonAnswers: Record<string, number>;
}) {
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
        className={cn("w-full py-5 text-base", mcqLocked && "opacity-50 cursor-not-allowed")}
      >
        <span className="flex items-center justify-center gap-2">
          {label} {!mcqLocked && <ChevronRight size={16} />}
        </span>
      </Button>
    </div>
  );
}

function CompletionGate({
  item, allSubsDone, onComplete,
}: {
  item: WorkItem;
  allSubsDone: boolean;
  onComplete: () => void;
}) {
  const linkLabel =
    item.type === "school-task" ? "Open the assignment" :
    item.type === "ap-lesson" ? "Open AP review" :
    "Open";
  const completeLabel =
    item.type === "ap-lesson" ? "Lesson complete" :
    item.type === "big-idea-prep" ? "All steps done — finish" :
    item.type === "big-idea-source" ? "Advance state" :
    "Mark task complete";

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
            {item.type === "ap-lesson" && item.payload?.lesson?.examId === "ap-macro" && (
              <Link href="/ap/crash">
                <Button variant="primary">
                  <span className="flex items-center gap-1.5">Open Macro course →</span>
                </Button>
              </Link>
            )}
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

function SecondaryActions({ onSkipOne, onDefer }: { onSkipOne: () => void; onDefer: (h: number) => void }) {
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
        onClick={onSkipOne}
        className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors flex items-center gap-1.5"
      >
        <SkipForward size={11} /> Skip 1
      </button>
    </div>
  );
}

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
      <p className="mt-3 text-ink-dim max-w-md">Nothing in the priority queue. Go take a break — that counts as work too.</p>
      <Link href="/" className="mt-7">
        <Button variant="secondary">Back to dashboard</Button>
      </Link>
    </motion.div>
  );
}

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
