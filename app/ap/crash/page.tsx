"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Eyebrow, Meta, PageHeader, Section, Tag, Stat } from "@/components/ui";
import { useStore } from "@/lib/store";
import { AP_MACRO_COURSE } from "@/lib/data/ap-crash/macro";
import type { Module } from "@/lib/data/ap-crash/types";
import { daysUntil } from "@/lib/utils/date";
import { ChevronRight, ArrowUpRight, GraduationCap, Zap } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function ApCrashDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const stepDone = useStore((s) => s.apCrashStepDone);
  const lastModule = useStore((s) => s.apCrashLastModule);

  const c = AP_MACRO_COURSE;
  const totals = c.modules.map((m) => moduleTotals(m, stepDone, c.id));
  const totalSteps = totals.reduce((sum, t) => sum + t.total, 0);
  const doneSteps = totals.reduce((sum, t) => sum + t.done, 0);
  const overallPct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;
  const minutesRemaining = totals.reduce((sum, t, i) => sum + Math.round(c.modules[i].estimateMin * (1 - (t.done / t.total || 0))), 0);
  const days = daysUntil(c.examDate);

  const continueModule = lastModule[c.id] ?? c.modules[0].id;

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader
        eyebrow={c.examLabel}
        title="AP Macro crash course"
        subtitle="One-night mastery path. Modules ordered for max ROI per minute."
        right={
          <Link href={`/ap/crash/${continueModule}`}>
            <button className="px-4 py-2 rounded-lg bg-ink text-bg text-sm font-medium hover:bg-ink/90 transition-colors flex items-center gap-1.5">
              <Zap size={14} /> {doneSteps > 0 ? "Continue" : "Start"}
              <ChevronRight size={14} />
            </button>
          </Link>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-9">
        <Stat label="Days to exam" value={`${days}d`} accent={days <= 1 ? "red" : days <= 3 ? "amber" : "neutral"} hint={c.examDate.slice(5)} />
        <Stat label="Course progress" value={`${overallPct}%`} hint={`${doneSteps}/${totalSteps} steps`} accent={overallPct >= 80 ? "lime" : overallPct >= 40 ? "amber" : "neutral"} />
        <Stat label="Time remaining" value={`${Math.round(minutesRemaining / 60 * 10) / 10}h`} hint={`${minutesRemaining}m`} />
        <Stat label="Modules" value={`${totals.filter((t) => t.done === t.total).length}/${c.modules.length}`} hint="completed" />
      </div>

      <Section eyebrow="Modules" hint="Tap to start, drag-free path">
        <div className="space-y-2">
          {c.modules.map((m, i) => (
            <ModuleRow
              key={m.id}
              m={m}
              i={i + 1}
              total={totals[i]}
            />
          ))}
        </div>
      </Section>

      <div className="mt-12 text-center">
        <Meta>
          <GraduationCap size={11} className="inline mr-1.5 -mt-0.5" />
          Built from the 48-hour Mastery Guide — comprehensive single-source study path.
        </Meta>
      </div>
    </div>
  );
}

function ModuleRow({ m, i, total }: { m: Module; i: number; total: { done: number; total: number } }) {
  const pct = total.total > 0 ? Math.round((total.done / total.total) * 100) : 0;
  const isComplete = pct === 100;
  const priorityTone: "red" | "amber" | "neutral" =
    m.priority === "must" ? "red" : m.priority === "high" ? "amber" : "neutral";
  return (
    <Link href={`/ap/crash/${m.id}`}>
      <motion.div
        whileHover={{ x: 2 }}
        className={cn(
          "group flex items-center gap-4 px-5 py-4 rounded-xl border transition-colors",
          isComplete
            ? "bg-accent-lime/[0.04] border-accent-lime/30"
            : "bg-bg-surface border-line hover:border-line-strong"
        )}
      >
        <span className="font-mono text-2xs tabular-nums text-ink-mute w-7 shrink-0">
          {String(i).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-base text-ink">{m.title}</span>
            <Tag tone={priorityTone} size="sm">{m.priority}</Tag>
            {isComplete && <Tag tone="lime" size="sm">✓ done</Tag>}
          </div>
          <div className="text-xs text-ink-mute mt-1 leading-relaxed">{m.subtitle}</div>
          <div className="mt-2.5 flex items-center gap-3">
            <div className="flex-1 max-w-[180px] h-1 rounded-full bg-line overflow-hidden">
              <div
                className={cn("h-full transition-all duration-500", isComplete ? "bg-accent-lime" : "bg-ink/60")}
                style={{ width: `${pct}%` }}
              />
            </div>
            <Meta>{total.done}/{total.total}</Meta>
            <Meta>·</Meta>
            <Meta>{m.estimateMin}m</Meta>
          </div>
        </div>
        <ArrowUpRight size={15} className="text-ink-ghost group-hover:text-ink-dim transition-colors shrink-0" />
      </motion.div>
    </Link>
  );
}

function moduleTotals(m: Module, stepDone: Record<string, boolean>, courseId: string) {
  let total = 0;
  let done = 0;
  m.lessons.forEach((l) => {
    l.steps.forEach((_, idx) => {
      total++;
      if (stepDone[`${courseId}.${m.id}.${l.id}.${idx}`]) done++;
    });
  });
  return { total, done };
}
