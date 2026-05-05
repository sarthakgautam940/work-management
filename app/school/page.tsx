"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Eyebrow, Meta, Section, Tag, Checkbox, PageHeader, Row, Stat } from "@/components/ui";
import { useStore } from "@/lib/store";
import { CLASSES, ClassRoom, Task, Assessment } from "@/lib/data/school";
import {
  ESSENTIAL_QUESTION,
  BIG_IDEA_GROUP,
  BOOK_PICKS,
  SEMINAR_PREP,
  SOURCE_SLOTS,
  SCHEDULE,
} from "@/lib/data/big-idea";
import { urgencyLabel, daysUntil, shortDate, todayKey } from "@/lib/utils/date";
import { ChevronDown, AlertCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const SEMINAR_DATE = "2026-05-05";

function relativeDateLabel(d: string): string {
  const days = daysUntil(d);
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days <= 7) return `in ${days}d`;
  return `on ${shortDate(d)}`;
}

export default function SchoolPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <SchoolInner />;
}

function SchoolInner() {
  const schoolTasks = useStore((s) => s.schoolTasks);

  const overdueCount = CLASSES.reduce((sum, c) => {
    return sum + c.tasks.filter((t) => t.overdue && !(schoolTasks[t.id] ?? t.defaultDone)).length;
  }, 0);
  const totalOpen = CLASSES.reduce((sum, c) => {
    return sum + c.tasks.filter((t) => !(schoolTasks[t.id] ?? t.defaultDone)).length;
  }, 0);

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader
        eyebrow="Classes"
        title="School"
        subtitle="Five classes. Real assignments, real grades, real due dates."
      />

      {/* Big Idea panel — most urgent academic crisis */}
      <BigIdeaPanel />

      {/* Crash bar */}
      <Card className="p-4 mb-7 border-accent-red/30 bg-accent-red/[0.04]">
        <div className="flex items-start gap-3">
          <AlertCircle size={15} className="text-accent-red mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0 text-sm">
            <span className="text-ink font-medium">AP exams crash mode active.</span>
            <span className="text-ink-mute ml-1.5">Macro May 8, Precalc May 12.</span>
            <Link href="/ap" className="ml-2 font-mono text-2xs text-accent-red tracking-[0.18em] uppercase hover:opacity-80">
              Open AP →
            </Link>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        <Stat label="Open tasks" value={totalOpen} />
        <Stat label="Overdue" value={overdueCount} accent={overdueCount > 0 ? "red" : "neutral"} />
        <Stat label="Days to AP Macro" value={`${daysUntil("2026-05-08")}d`} accent="red" />
        <Stat label="Days to AP Precalc" value={`${daysUntil("2026-05-12")}d`} accent="amber" />
      </div>

      <Section eyebrow="Classes">
        <div className="space-y-2">
          {CLASSES.map((cls) => <ClassCard key={cls.id} cls={cls} />)}
        </div>
      </Section>
    </div>
  );
}

function ClassCard({ cls }: { cls: ClassRoom }) {
  const [open, setOpen] = useState(false);
  const schoolTasks = useStore((s) => s.schoolTasks);
  const openTasks = cls.tasks.filter((t) => !(schoolTasks[t.id] ?? t.defaultDone));
  const overdueOpen = openTasks.filter((t) => t.overdue).length;
  const doneTasks = cls.tasks.length - openTasks.length;
  const nextAssessment = cls.assessments[0];
  const nextU = nextAssessment ? urgencyLabel(nextAssessment.date) : null;
  const tone: "red" | "amber" | "lime" | "neutral" = !nextU ? "neutral"
    : nextU.tone === "red" ? "red"
    : nextU.tone === "amber" ? "amber"
    : nextU.tone === "lime" ? "lime"
    : "neutral";

  const gradeTone: "red" | "amber" | "lime" | "neutral" =
    cls.grade === undefined ? "neutral"
    : cls.grade < 70 ? "red"
    : cls.grade < 85 ? "amber"
    : "lime";

  return (
    <Card className="overflow-hidden">
      <Row onClick={() => setOpen((o) => !o)} className="flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated/30">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-medium text-base text-ink">{cls.name}</span>
            <Meta>{cls.type}</Meta>
          </div>
          <div className="text-xs text-ink-mute mt-1.5 truncate">{cls.summary}</div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {cls.grade !== undefined && (
            <Tag tone={gradeTone} size="sm">{cls.grade.toFixed(1)}%</Tag>
          )}
          {cls.tasks.length > 0 && (
            <span className="font-mono text-2xs text-ink-mute tabular-nums">
              {doneTasks}/{cls.tasks.length}{overdueOpen > 0 ? ` · ${overdueOpen} late` : ""}
            </span>
          )}
          {nextU && <Tag tone={tone} size="sm">{nextU.text}</Tag>}
        </div>
        <ChevronDown size={15} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </Row>
      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden border-t border-line">
          <div className="px-5 py-5 space-y-5">
            {cls.assessments.length > 0 && (
              <div>
                <Eyebrow className="mb-3">Assessments</Eyebrow>
                <div>
                  {cls.assessments.map((a, i) => (
                    <AssessmentRow key={a.title} a={a} last={i === cls.assessments.length - 1} />
                  ))}
                </div>
              </div>
            )}
            {cls.tasks.length > 0 ? (
              <div>
                <Eyebrow className="mb-2">Tasks</Eyebrow>
                <div>
                  {cls.tasks.map((t) => <TaskRow key={t.id} task={t} />)}
                </div>
              </div>
            ) : (
              <div className="text-sm text-ink-mute italic">No active tasks.</div>
            )}
          </div>
        </motion.div>
      )}
    </Card>
  );
}

function AssessmentRow({ a, last }: { a: Assessment; last: boolean }) {
  const u = urgencyLabel(a.date);
  const tone: "red" | "amber" | "lime" | "neutral" =
    u.tone === "red" ? "red"
    : u.tone === "amber" ? "amber"
    : u.tone === "lime" ? "lime"
    : "neutral";
  return (
    <div className={cn("flex items-center justify-between py-3 gap-3", !last && "border-b border-line")}>
      <div className="min-w-0">
        <div className="text-sm font-medium text-ink">{a.title}</div>
        <div className="text-xs text-ink-mute mt-0.5">{a.detail}</div>
      </div>
      <Tag tone={tone}>{u.text}</Tag>
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  const schoolTasks = useStore((s) => s.schoolTasks);
  const toggle = useStore((s) => s.toggleSchoolTask);
  const checked = schoolTasks[task.id] ?? task.defaultDone ?? false;
  const u = task.due ? urgencyLabel(task.due) : null;
  const tone: "red" | "amber" | "lime" | "neutral" = !u ? "neutral"
    : u.tone === "red" ? "red"
    : u.tone === "amber" ? "amber"
    : u.tone === "lime" ? "lime"
    : "neutral";
  const accent = task.priority === "critical" ? "red" : task.priority === "high" ? "amber" : "lime";

  return (
    <Row onClick={() => toggle(task.id)} className="flex items-start gap-3 py-2.5 group">
      <Checkbox checked={checked} onChange={() => toggle(task.id)} accent={accent} size="sm" />
      <div className="flex-1 min-w-0">
        <div className={cn("text-sm flex items-center gap-2 flex-wrap", checked ? "text-ink-mute line-through" : "text-ink-dim group-hover:text-ink")}>
          {task.title}
          {task.overdue && !checked && <Tag tone="red" size="sm">Late</Tag>}
          {!task.overdue && u && <Tag tone={tone} size="sm">{u.text}</Tag>}
          {task.grade && <Meta>{task.grade}</Meta>}
        </div>
        {task.details && <div className="text-xs text-ink-mute mt-1 leading-relaxed">{task.details}</div>}
        {task.estimate && <div className="text-2xs font-mono text-ink-ghost mt-1">~{task.estimate}m</div>}
      </div>
    </Row>
  );
}

function BigIdeaPanel() {
  const [open, setOpen] = useState(true);
  const tasks = useStore((s) => s.bigIdeaTasks);
  const toggleTask = useStore((s) => s.toggleBigIdeaTask);
  const bookId = useStore((s) => s.bigIdeaBookId);
  const setBook = useStore((s) => s.setBigIdeaBook);
  const sourceState = useStore((s) => s.bigIdeaSourceState);
  const setSourceState = useStore((s) => s.setBigIdeaSourceState);

  const seminarDone = SEMINAR_PREP.filter((t) => tasks[t.id]).length;
  const seminarTotal = SEMINAR_PREP.length;
  const seminarPct = (seminarDone / seminarTotal) * 100;
  const totalEstimate = SEMINAR_PREP.reduce((s, t) => s + t.estimateMin, 0);

  return (
    <Card className="overflow-hidden mb-7 border-accent-rose/30">
      <Row onClick={() => setOpen((o) => !o)} className="flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated/30">
        <BookOpen size={16} className="text-accent-rose shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-medium text-base text-ink">Big Idea project</span>
            <Tag tone={daysUntil(SEMINAR_DATE) <= 0 ? "red" : daysUntil(SEMINAR_DATE) === 1 ? "red" : "amber"} size="sm">
              Seminar {relativeDateLabel(SEMINAR_DATE)}
            </Tag>
          </div>
          <div className="text-xs text-ink-mute mt-1">
            {ESSENTIAL_QUESTION} · {BIG_IDEA_GROUP}
          </div>
        </div>
        <span className="font-mono text-2xs text-ink-mute tabular-nums shrink-0">
          {seminarDone}/{seminarTotal}
        </span>
        <ChevronDown size={15} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </Row>

      {open && (
        <div className="border-t border-line">
          {/* Seminar prep */}
          <div className="px-5 py-5">
            <div className="flex items-baseline justify-between mb-3">
              <Eyebrow accent="rose">Seminar prep — {relativeDateLabel(SEMINAR_DATE)}</Eyebrow>
              <Meta>≈ {Math.round(totalEstimate / 60 * 10) / 10}h</Meta>
            </div>

            <div className="h-1 rounded-full bg-line overflow-hidden mb-4">
              <div
                className={cn(
                  "h-full transition-all duration-500",
                  seminarPct === 100 ? "bg-accent-lime" : "bg-accent-rose"
                )}
                style={{ width: `${seminarPct}%` }}
              />
            </div>

            <div>
              {SEMINAR_PREP.map((t, i) => {
                const done = !!tasks[t.id];
                return (
                  <Row
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className={cn(
                      "flex items-start gap-3 py-2.5 group",
                      i < SEMINAR_PREP.length - 1 && "border-b border-line"
                    )}
                  >
                    <Checkbox
                      checked={done}
                      onChange={() => toggleTask(t.id)}
                      accent="rose"
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className={cn("text-sm font-medium", done ? "text-ink-mute line-through" : "text-ink")}>
                        {t.label}
                      </div>
                      <div className="text-xs text-ink-mute mt-1 leading-relaxed">{t.detail}</div>
                      <div className="text-2xs font-mono text-ink-ghost mt-1">~{t.estimateMin}m</div>
                    </div>
                  </Row>
                );
              })}
            </div>
          </div>

          {/* Book pick */}
          <div className="px-5 py-5 border-t border-line">
            <Eyebrow className="mb-3">Book — pick & lock</Eyebrow>
            <div className="space-y-2">
              {BOOK_PICKS.map((b, i) => {
                const selected = bookId === b.id;
                return (
                  <Row
                    key={b.id}
                    onClick={() => setBook(selected ? null : b.id)}
                    className={cn(
                      "p-3 rounded-lg border transition-colors",
                      selected ? "border-accent-rose/50 bg-accent-rose/[0.06]" : "border-line hover:border-line-strong"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-2xs text-ink-mute pt-px w-6 shrink-0">
                        {i === 0 ? "PICK" : `#${i + 1}`}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-ink">{b.title}</div>
                        <div className="text-xs text-ink-mute mt-0.5">
                          {b.author} · {b.pages}p · {b.available}
                        </div>
                        <div className="text-xs text-ink-dim mt-2 leading-relaxed">{b.why}</div>
                      </div>
                      {selected && <Tag tone="lime" size="sm">Locked</Tag>}
                    </div>
                  </Row>
                );
              })}
            </div>
          </div>

          {/* Four sources */}
          <div className="px-5 py-5 border-t border-line">
            <Eyebrow className="mb-3">Four sources for the final essay</Eyebrow>
            <div>
              {SOURCE_SLOTS.map((s, i) => {
                const state = sourceState[s.id] ?? "pending";
                const u = urgencyLabel(s.due);
                const tone: "red" | "amber" | "lime" | "neutral" =
                  state === "approved" || state === "annotated" ? "lime"
                  : u.tone === "red" ? "red"
                  : u.tone === "amber" ? "amber"
                  : "neutral";
                const states = ["pending", "selected", "annotated", "approved"] as const;
                const nextState = states[(states.indexOf(state) + 1) % states.length];
                return (
                  <Row
                    key={s.id}
                    onClick={() => setSourceState(s.id, nextState)}
                    className={cn(
                      "flex items-start gap-3 py-3 group",
                      i < SOURCE_SLOTS.length - 1 && "border-b border-line"
                    )}
                  >
                    <Meta className="w-12 shrink-0 pt-0.5">{s.kind}</Meta>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-ink">{s.label}</span>
                        <Tag tone={tone} size="sm">{state}</Tag>
                      </div>
                      <div className="text-xs text-ink-mute mt-1 leading-relaxed">{s.detail}</div>
                      {s.options && (
                        <div className="text-2xs text-ink-ghost mt-2 leading-relaxed">
                          Options: {s.options.join(" · ")}
                        </div>
                      )}
                      <div className="text-2xs font-mono text-ink-ghost mt-1.5">{shortDate(s.due)} · {u.text}</div>
                    </div>
                  </Row>
                );
              })}
            </div>
            <div className="text-2xs font-mono text-ink-ghost mt-3 leading-relaxed">
              Tap a source to cycle: pending → selected → annotated → approved
            </div>
          </div>

          {/* Schedule */}
          <div className="px-5 py-5 border-t border-line">
            <Eyebrow className="mb-3">Project timeline</Eyebrow>
            <div>
              {SCHEDULE.map((s, i) => {
                const today = todayKey();
                const isToday = s.date === today;
                const isMissed = !isToday && s.date < today;
                const isUpcoming = s.date > today;
                return (
                  <div
                    key={s.date}
                    className={cn(
                      "flex items-center gap-3 py-2 text-sm",
                      i < SCHEDULE.length - 1 && "border-b border-line"
                    )}
                  >
                    <span className="font-mono text-2xs text-ink-mute w-20 shrink-0">{shortDate(s.date)}</span>
                    <span
                      className={cn(
                        "flex-1",
                        isMissed && "text-ink-mute line-through",
                        isToday && "text-ink font-medium",
                        isUpcoming && "text-ink-dim"
                      )}
                    >
                      {s.label}
                    </span>
                    {isToday && <Tag tone="amber" size="sm">Today</Tag>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
