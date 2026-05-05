"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, Tag, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import { buildQueue, getPhase, summarize, WorkItem } from "@/lib/work/engine";
import { Lesson, MCQ } from "@/lib/data/study-modules";
import { ArrowUpRight, Check, SkipForward, Clock, BookOpen, Zap, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function WorkPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <WorkInner />;
}

function WorkInner() {
  // Pull every relevant slice from the store. The engine consumes these.
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

  const toggleSchool = useStore((s) => s.toggleSchoolTask);
  const markLessonDone = useStore((s) => s.markLessonDone);
  const toggleBigIdea = useStore((s) => s.toggleBigIdeaTask);
  const setBigIdeaSourceState = useStore((s) => s.setBigIdeaSourceState);
  const toggleUplevel = useStore((s) => s.toggleUplevelTask);
  const toggleIboChapter = useStore((s) => s.toggleIBOChapter);
  const toggleIboBookComplete = useStore((s) => s.toggleIBOBookComplete);
  const toggleIboCase = useStore((s) => s.toggleIBOCase);
  const toggleSatModule = useStore((s) => s.toggleSATModule);
  const skipWork = useStore((s) => s.skipWorkItem);
  const deferWork = useStore((s) => s.deferWorkItem);

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

  const finishCurrent = () => {
    if (!current) return;
    if (current.type === "school-task") toggleSchool(current.id);
    else if (current.type === "ap-lesson" && current.payload?.lesson) markLessonDone(current.payload.lesson.id, true);
    else if (current.type === "big-idea-prep") toggleBigIdea(current.id.replace(/^bi-/, ""));
    else if (current.type === "uplevel-task") toggleUplevel(current.id.replace(/^up-/, ""));
    else if (current.type === "ibo-chapter") toggleIboChapter(current.id.replace(/^ibo-ch-/, ""));
    else if (current.type === "ibo-book") toggleIboBookComplete(current.id.replace(/^ibo-bk-/, ""));
    else if (current.type === "ibo-case") toggleIboCase(current.id.replace(/^ibo-case-/, ""));
    else if (current.type === "sat-module") toggleSatModule(current.id.replace(/^sat-/, ""));
    else if (current.type === "big-idea-source") {
      const sourceId = current.id.replace(/^bi-src-/, "");
      const cur = bigIdeaSourceState[sourceId] ?? "pending";
      const next = cur === "pending" ? "selected" : cur === "selected" ? "annotated" : "approved";
      setBigIdeaSourceState(sourceId, next);
    }
  };

  const skipCurrent = () => {
    if (!current) return;
    skipWork(current.id);
  };
  const deferCurrent = (hours: number) => {
    if (!current) return;
    deferWork(current.id, Date.now() + hours * 3600 * 1000);
  };

  return (
    <div className="min-h-screen flex flex-col px-5 lg:px-10 pt-7 lg:pt-10 max-w-3xl mx-auto pb-20">
      <Header phase={phase} summary={summary} />
      <AnimatePresence mode="wait">
        {current ? (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <CurrentTaskCard item={current} />
            {current.type === "ap-lesson" && current.payload?.lesson && (
              <LessonBody lesson={current.payload.lesson} />
            )}
            <ActionBar
              item={current}
              onDone={finishCurrent}
              onSkip={skipCurrent}
              onDefer={deferCurrent}
            />
            {queue.length > 1 && <NextUpPreview items={queue.slice(1, 4)} />}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center py-20"
          >
            <Zap size={28} className="text-accent-lime mb-5" />
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tightest">All clear.</h2>
            <p className="mt-3 text-ink-dim max-w-md">
              Nothing in the priority queue. Pick something off the dashboard or take a break — both count.
            </p>
            <Link href="/" className="mt-7">
              <Button variant="secondary">Back to dashboard</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header({ phase, summary }: { phase: ReturnType<typeof getPhase>; summary: ReturnType<typeof summarize> }) {
  const phaseLabel = {
    "ap-week": "AP exam week",
    "school-only": "Final school stretch",
    "olympiad": "Olympiad sprint",
    "sat-only": "SAT focus",
  }[phase];
  const hours = Math.round((summary.minutes / 60) * 10) / 10;

  return (
    <header className="mb-7 flex items-end justify-between gap-3 flex-wrap">
      <div>
        <Meta>Work mode · {phaseLabel}</Meta>
        <h1 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tightest">
          <Typed text="Right now, focus on this." />
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Meta>{summary.count} item{summary.count === 1 ? "" : "s"}</Meta>
        <span className="text-ink-ghost">·</span>
        <Meta>{hours}h queued</Meta>
        <Link href="/" className="ml-2">
          <button className="p-2 -mr-2 text-ink-mute hover:text-ink transition-colors" aria-label="Exit work mode">
            <X size={18} />
          </button>
        </Link>
      </div>
    </header>
  );
}

// Slow letter-reveal, ~16 ms per char. No layout shift.
function Typed({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.018, duration: 0.18 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function CurrentTaskCard({ item }: { item: WorkItem }) {
  const tone = categoryTone(item);
  return (
    <Card className={cn("p-6 lg:p-8 grain relative overflow-hidden mb-6", "rail-l", tone.text)}>
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <Eyebrow accent={tone.eyebrow}>{categoryLabel(item)}</Eyebrow>
        {item.className && <Meta>{item.className}</Meta>}
        {item.gradeType && item.gradeType !== "study" && <Meta>{item.gradeType}</Meta>}
        {item.overdue && <Tag tone="red" size="sm">Late</Tag>}
        {item.due && !item.overdue && <Meta>due {item.due.slice(5)}</Meta>}
        {item.estimateMin && (
          <span className="inline-flex items-center gap-1 text-2xs font-mono tracking-[0.18em] uppercase text-ink-mute">
            <Clock size={11} /> {item.estimateMin}m
          </span>
        )}
      </div>

      <h2 className="text-2xl lg:text-3xl font-bold tracking-tightest leading-[1.15] text-ink">{item.title}</h2>
      {item.detail && <p className="mt-3 text-ink-dim text-sm lg:text-base leading-relaxed">{item.detail}</p>}

      {(item.link || item.internalRoute) && (
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                <span className="flex items-center gap-1.5"><ArrowUpRight size={14} /> Open link</span>
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
    </Card>
  );
}

function LessonBody({ lesson }: { lesson: Lesson }) {
  return (
    <div className="mb-7">
      <Card className="p-5 lg:p-7 mb-4">
        <Eyebrow accent="amber"><BookOpen size={11} className="inline mr-1.5 -mt-0.5" /> {lesson.unit}</Eyebrow>
        <div className="mt-4 space-y-4 text-sm lg:text-[15px] text-ink-dim leading-[1.7]">
          {lesson.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {lesson.formulas && lesson.formulas.length > 0 && (
          <div className="mt-5 p-4 rounded-lg bg-bg-elevated border border-line">
            <Eyebrow className="mb-2.5">Formulas</Eyebrow>
            <ul className="space-y-1.5 font-mono text-sm text-ink">
              {lesson.formulas.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}
        {lesson.example && (
          <div className="mt-5 p-4 rounded-lg bg-bg-elevated/60 border border-line">
            <Eyebrow accent="lime" className="mb-2.5">Worked example</Eyebrow>
            <div className="text-sm text-ink mb-2"><span className="text-ink-mute">Q. </span>{lesson.example.prompt}</div>
            <div className="text-sm text-ink-dim leading-relaxed"><span className="text-ink-mute">A. </span>{lesson.example.solution}</div>
          </div>
        )}
      </Card>

      {lesson.mcqs.map((mcq, i) => (
        <MCQCard key={i} mcq={mcq} keyId={`${lesson.id}.${i}`} qNum={i + 1} total={lesson.mcqs.length} />
      ))}
    </div>
  );
}

function MCQCard({ mcq, keyId, qNum, total }: { mcq: MCQ; keyId: string; qNum: number; total: number }) {
  const answers = useStore((s) => s.lessonAnswers);
  const record = useStore((s) => s.recordLessonAnswer);
  const chosen = answers[keyId];
  const revealed = chosen !== undefined;

  return (
    <Card className="p-5 lg:p-6 mb-3">
      <div className="flex items-baseline justify-between mb-3">
        <Eyebrow>Q {qNum} / {total}</Eyebrow>
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
      <div className="text-sm lg:text-base font-medium text-ink mb-4 leading-relaxed">{mcq.q}</div>
      <div className="space-y-2">
        {mcq.choices.map((c, i) => {
          const isChosen = chosen === i;
          const isCorrect = i === mcq.answer;
          let style = "border-line text-ink-dim hover:border-line-strong hover:text-ink";
          if (revealed) {
            if (isCorrect) style = "border-accent-lime/50 bg-accent-lime/[0.06] text-ink";
            else if (isChosen) style = "border-accent-red/50 bg-accent-red/[0.06] text-ink";
            else style = "border-line text-ink-mute opacity-70";
          }
          return (
            <button
              key={i}
              onClick={() => !revealed && record(keyId, i)}
              disabled={revealed}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors",
                style,
                !revealed && "cursor-pointer",
                revealed && "cursor-default"
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
          className="mt-4 pt-4 border-t border-line text-sm text-ink-dim leading-relaxed overflow-hidden"
        >
          <span className="text-ink-mute font-mono text-2xs tracking-[0.18em] uppercase mr-2">Why</span>
          {mcq.explain}
        </motion.div>
      )}
    </Card>
  );
}

function ActionBar({
  item, onDone, onSkip, onDefer,
}: {
  item: WorkItem;
  onDone: () => void;
  onSkip: () => void;
  onDefer: (h: number) => void;
}) {
  const doneLabel =
    item.type === "ap-lesson" ? "Mark lesson done"
    : item.type === "big-idea-source" ? "Advance state"
    : "Mark done";

  return (
    <div className="mb-9 flex flex-wrap gap-2">
      <Button variant="primary" size="lg" onClick={onDone} className="px-6">
        <span className="flex items-center gap-2"><Check size={16} /> {doneLabel}</span>
      </Button>
      <Button variant="secondary" size="lg" onClick={() => onDefer(2)}>
        <span className="flex items-center gap-2"><Clock size={14} /> Defer 2h</span>
      </Button>
      <Button variant="ghost" size="lg" onClick={onSkip}>
        <span className="flex items-center gap-2"><SkipForward size={14} /> Skip</span>
      </Button>
    </div>
  );
}

function NextUpPreview({ items }: { items: WorkItem[] }) {
  return (
    <div>
      <Eyebrow className="mb-3">Next up</Eyebrow>
      <div className="space-y-1.5">
        {items.map((it) => {
          const tone = categoryTone(it);
          return (
            <div key={it.id} className={cn("flex items-center gap-3 px-4 py-3 rounded-lg bg-bg-surface border border-line", "rail-l", tone.text)}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-ink truncate">{it.title}</span>
                  {it.overdue && <Tag tone="red" size="sm">Late</Tag>}
                </div>
                <div className="text-2xs text-ink-mute mt-0.5 font-mono tracking-[0.12em] uppercase">
                  {categoryLabel(it)}
                  {it.estimateMin ? ` · ${it.estimateMin}m` : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
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
