"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Eyebrow, Meta, Stat, Section, Tag, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  greeting, fullDate, timeOfDay, workoutFor, daysUntil,
} from "@/lib/utils/date";
import { CLASSES, Task as SchoolTask } from "@/lib/data/school";
import { ROUTINE_SECTIONS, totalRoutineItems } from "@/lib/data/routine";
import { SEMINAR_PREP } from "@/lib/data/big-idea";
import { ArrowUpRight, AlertCircle, Flame, Zap } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Priority = {
  id: string;
  title: string;
  detail: string;
  href: string;
  estimate?: number;
  state: "urgent" | "today" | "tomorrow";
};

export default function TodayPage() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const isRoutineDone = useStore((s) => s.isRoutineDone);
  const streak = useStore((s) => s.getStreak());
  const bodyweight = useStore((s) => s.bodyweight);
  const schoolTasks = useStore((s) => s.schoolTasks);
  const bigIdeaTasks = useStore((s) => s.bigIdeaTasks);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return <Skeleton />;

  const totalItems = totalRoutineItems();
  const tod = timeOfDay(now);
  const workout = workoutFor(now);

  let routineDone = 0;
  ROUTINE_SECTIONS.forEach((sec) => {
    sec.items.forEach((_, idx) => {
      if (isRoutineDone(`${sec.id}.${idx}`)) routineDone++;
    });
  });
  const pct = Math.round((routineDone / totalItems) * 100);
  const proteinTarget = Math.round(bodyweight * 0.9);

  const precalcDays = daysUntil("2026-05-12");

  // Build priority list from real school tasks + Big Idea seminar prep
  const priorities = buildPriorities(schoolTasks, bigIdeaTasks);

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-5xl pb-16">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-9"
      >
        <div className="flex items-center gap-4 mb-3">
          <Meta>{fullDate(now)}</Meta>
          {streak > 0 && (
            <span className="inline-flex items-center gap-1 text-2xs font-mono tracking-[0.18em] uppercase text-accent-amber">
              <Flame size={11} /> {streak}d streak
            </span>
          )}
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tightest leading-[1]">
          {greeting()}.
        </h1>
        <p className="mt-4 text-ink-dim text-base lg:text-lg max-w-2xl leading-relaxed">
          {dayCopy(tod, precalcDays, priorities.length, pct)}
        </p>
      </motion.header>

      {/* Enter Work Mode — primary action */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="mb-7"
      >
        <Link href="/work" className="block group">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-surface hover:border-line-strong transition-colors px-5 py-5 lg:px-6 lg:py-6 grain">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-ink/5 border border-line flex items-center justify-center shrink-0">
                <Zap size={20} className="text-ink" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base lg:text-lg font-bold tracking-tightest text-ink">Enter work mode</div>
                <div className="text-xs lg:text-sm text-ink-mute mt-0.5">
                  One task at a time. Auto-prioritized. Includes AP study modules.
                </div>
              </div>
              <ArrowUpRight size={18} className="text-ink-mute group-hover:text-ink shrink-0 transition-colors" />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Crash bar */}
      {(precalcDays <= 5 && precalcDays >= 0) && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7 flex items-center gap-3 px-4 py-3 rounded-lg border border-accent-amber/30 bg-accent-amber/[0.04]"
        >
          <AlertCircle size={15} className="text-accent-amber shrink-0" />
          <div className="flex-1 min-w-0 text-sm">
            <span className="text-ink font-medium">AP Precalc in {precalcDays}d.</span>
            <span className="text-ink-mute ml-1.5">Open the crash plan.</span>
          </div>
          <Link href="/ap" className="shrink-0">
            <Meta className="text-accent-amber hover:text-accent-amber/80">Open →</Meta>
          </Link>
        </motion.div>
      )}

      {/* Priorities — ranked, from real data */}
      <Section eyebrow="Priorities" hint={`${priorities.filter((p) => p.state === "urgent").length} urgent`}>
        <div className="space-y-px rounded-xl bg-bg-surface border border-line overflow-hidden">
          {priorities.length === 0 ? (
            <div className="px-5 py-6 text-sm text-ink-mute">All priority items done. Open routine for what's left.</div>
          ) : (
            priorities.slice(0, 8).map((p) => <PriorityRow key={p.id} p={p} />)
          )}
        </div>
      </Section>

      {/* Status */}
      <Section eyebrow="Status">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Stat label="Routine" value={`${pct}%`} hint={`${routineDone}/${totalItems} today`} accent={pct >= 80 ? "lime" : pct >= 50 ? "amber" : "neutral"} />
          <Stat label="Workout" value={workout === "rest" ? "Rest" : cap(workout)} hint={workout === "rest" ? "Recovery" : "Today's split"} />
          <Stat label="AP Precalc" value={`${precalcDays}d`} hint="May 12 · Tuesday" accent={precalcDays <= 3 ? "red" : precalcDays <= 5 ? "amber" : "neutral"} />
        </div>
      </Section>

      {/* Lanes */}
      <Section eyebrow="Lanes" hint={`${pct}% routine · protein ${proteinTarget}g`}>
        <div className="space-y-px rounded-xl bg-bg-surface border border-line overflow-hidden">
          <Lane href="/school" label="School" hint={`${countOpenTasks(schoolTasks)} open · Big Idea ${bigIdeaActiveLabel()}`} state="urgent" />
          <Lane href="/ap" label="AP crash plan" hint={`Precalc ${precalcDays}d`} state="urgent" />
          <Lane href="/routine" label="Daily routine" hint={`${routineDone} of ${totalItems} done`} state={pct >= 80 ? "done" : pct >= 50 ? "active" : undefined} />
          <Lane href="/workout" label={workout === "rest" ? "Rest day" : `${cap(workout)} session`} hint={workout === "rest" ? "Active recovery" : "Track every set"} />
          <Lane href="/food" label="Food & shopping" hint={`Protein target ${proteinTarget}g`} />
          <Lane href="/business" label="UpLevel" hint="Pipeline · revenue · builds" />
          <Lane href="/ibo" label="IBO sprint" hint={`Starts in ${daysUntil("2026-05-09")}d`} />
          <Lane href="/sat" label="SAT prep" hint={`${daysUntil("2026-10-03")}d to test`} />
        </div>
      </Section>

      <div className="mt-12">
        <Meta>Data stored locally · Praxis v1</Meta>
      </div>
    </div>
  );
}

function buildPriorities(
  schoolTasks: Record<string, boolean>,
  bigIdeaTasks: Record<string, boolean>,
): Priority[] {
  const out: Priority[] = [];

  // Tomorrow: Big Idea seminar (un-prepped subset)
  const seminarRemaining = SEMINAR_PREP.filter((t) => !bigIdeaTasks[t.id]);
  if (seminarRemaining.length > 0) {
    out.push({
      id: "big-idea",
      title: `Big Idea seminar — ${seminarRemaining.length} prep step${seminarRemaining.length === 1 ? "" : "s"} left`,
      detail: "Quiz grade. Tomorrow. Book + hexagonal sheet + free-write.",
      href: "/school",
      estimate: seminarRemaining.reduce((s, t) => s + t.estimateMin, 0),
      state: "urgent",
    });
  }

  // Pull every overdue or due-today/tomorrow open school task
  const todayKey = new Date().toISOString().slice(0, 10);
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowKey = tomorrowDate.toISOString().slice(0, 10);

  const allOpen: Array<{ task: SchoolTask; classShort: string }> = [];
  CLASSES.forEach((cls) => {
    cls.tasks.forEach((t) => {
      const done = schoolTasks[t.id] ?? t.defaultDone ?? false;
      if (!done) allOpen.push({ task: t, classShort: cls.short });
    });
  });

  const urgent = allOpen.filter(({ task }) => task.overdue || task.priority === "critical");
  const tomorrow = allOpen.filter(({ task }) => task.due === tomorrowKey && !urgent.find((u) => u.task.id === task.id));
  const today = allOpen.filter(({ task }) => task.due === todayKey && !urgent.find((u) => u.task.id === task.id));

  // Sort urgent by overdue first, then critical
  urgent.sort((a, b) => {
    const ao = a.task.overdue ? 0 : 1;
    const bo = b.task.overdue ? 0 : 1;
    return ao - bo;
  });

  urgent.forEach(({ task, classShort }) => {
    out.push({
      id: task.id,
      title: `${classShort} · ${task.title}`,
      detail: task.details ?? "",
      href: "/school",
      estimate: task.estimate,
      state: "urgent",
    });
  });

  today.forEach(({ task, classShort }) => {
    out.push({
      id: task.id,
      title: `${classShort} · ${task.title}`,
      detail: task.details ?? "",
      href: "/school",
      estimate: task.estimate,
      state: "today",
    });
  });

  tomorrow.forEach(({ task, classShort }) => {
    out.push({
      id: task.id,
      title: `${classShort} · ${task.title}`,
      detail: task.details ?? "",
      href: "/school",
      estimate: task.estimate,
      state: "tomorrow",
    });
  });

  return out;
}

function bigIdeaActiveLabel(): string {
  // Seminar delivered 5/5. Active deliverable is the hex sheet, due 5/7.
  const d = daysUntil("2026-05-07");
  if (d === 0) return "Hex sheet today";
  if (d === 1) return "Hex sheet tomorrow";
  if (d < 0) return `Hex sheet ${Math.abs(d)}d past`;
  return `Hex sheet in ${d}d`;
}

function countOpenTasks(schoolTasks: Record<string, boolean>): number {
  let n = 0;
  CLASSES.forEach((cls) => {
    cls.tasks.forEach((t) => {
      const done = schoolTasks[t.id] ?? t.defaultDone ?? false;
      if (!done) n++;
    });
  });
  return n;
}

function PriorityRow({ p }: { p: Priority }) {
  const railClass =
    p.state === "urgent" ? "before:bg-accent-red"
    : p.state === "today" ? "before:bg-accent-amber"
    : "before:bg-accent-blue";

  return (
    <Link
      href={p.href}
      className={cn(
        "group flex items-center gap-4 pl-5 pr-4 py-4 hover:bg-bg-elevated/40 transition-colors relative",
        "before:content-[''] before:absolute before:left-0 before:top-3 before:bottom-3 before:w-[3px] before:rounded-r",
        railClass,
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-base text-ink">{p.title}</span>
          {p.state === "urgent" && <Tag tone="red" size="sm">Urgent</Tag>}
          {p.state === "today" && <Tag tone="amber" size="sm">Today</Tag>}
          {p.state === "tomorrow" && <Tag tone="neutral" size="sm">Tomorrow</Tag>}
          {p.estimate && <Meta>~{p.estimate}m</Meta>}
        </div>
        {p.detail && <div className="text-xs text-ink-mute mt-0.5 line-clamp-2">{p.detail}</div>}
      </div>
      <ArrowUpRight size={15} className="text-ink-ghost group-hover:text-ink-dim transition-colors shrink-0" />
    </Link>
  );
}

function Lane({
  href, label, hint, state,
}: {
  href: string; label: string; hint: string; state?: "urgent" | "active" | "done";
}) {
  const railClass =
    state === "urgent" ? "before:bg-accent-red"
    : state === "active" ? "before:bg-accent-amber"
    : state === "done" ? "before:bg-accent-lime"
    : "before:bg-transparent";

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 pl-5 pr-4 py-4 lg:py-[18px] hover:bg-bg-elevated/40 transition-colors relative",
        "before:content-[''] before:absolute before:left-0 before:top-3 before:bottom-3 before:w-[3px] before:rounded-r",
        railClass,
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-base text-ink">{label}</span>
          {state === "urgent" && <Tag tone="red" size="sm">Urgent</Tag>}
        </div>
        <div className="text-xs text-ink-mute mt-0.5">{hint}</div>
      </div>
      <ArrowUpRight size={15} className="text-ink-ghost group-hover:text-ink-dim transition-colors shrink-0" />
    </Link>
  );
}

function dayCopy(tod: string, precalc: number, urgentCount: number, pct: number): string {
  if (urgentCount >= 4) return `${urgentCount} urgent items. Open the priority list and run it top-down.`;
  if (precalc === 0) return "Precalc exam day. Trust the prep.";
  if (precalc <= 1) return "Precalc tomorrow. Final review only.";
  if (precalc <= 4) return `Precalc in ${precalc} days. Every block is non-negotiable now.`;
  if (pct >= 90) return "Today is essentially locked. Hold the line until bed.";
  if (tod === "early") return "Early start. The compounding begins now.";
  if (tod === "morning") return "Mid-morning. Most people are off track today. You don't have to be.";
  if (tod === "afternoon") return "The day still has a lot of ground in it. Don't coast.";
  if (tod === "evening") return "Evening is when most days quietly fail. Yours doesn't.";
  if (tod === "night") return "Final stretch. Wind down properly.";
  return "Open the priority list and start moving.";
}

function cap(s: string) { return s[0].toUpperCase() + s.slice(1); }

function Skeleton() {
  return (
    <div className="px-5 lg:px-10 pt-8 lg:pt-12 max-w-5xl">
      <div className="h-3 w-32 bg-bg-elevated rounded mb-3 animate-pulse" />
      <div className="h-12 w-64 bg-bg-elevated rounded mb-6 animate-pulse" />
      <div className="h-32 bg-bg-surface rounded-2xl animate-pulse" />
    </div>
  );
}
