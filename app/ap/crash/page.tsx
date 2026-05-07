"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eyebrow, Meta, PageHeader, Tag } from "@/components/ui";
import { useStore } from "@/lib/store";
import { AP_MACRO_COURSE } from "@/lib/data/ap-crash/macro";
import { AP_PRECALC_COURSE } from "@/lib/data/ap-crash/precalc";
import type { Course, Module } from "@/lib/data/ap-crash/types";
import { daysUntil } from "@/lib/utils/date";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function ApCrashChooser() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const stepDone = useStore((s) => s.apCrashStepDone);

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader
        eyebrow="AP crash courses"
        title="Pick your course"
        subtitle="Comprehensive single-source study paths for both AP exams. Step-by-step lessons, drills, MCQs, FRQ walkthroughs."
      />

      <div className="space-y-3">
        <CourseCard course={AP_MACRO_COURSE} stepDone={stepDone} routeBase="/ap/crash/macro" />
        <CourseCard course={AP_PRECALC_COURSE} stepDone={stepDone} routeBase="/ap/crash/precalc" />
      </div>
    </div>
  );
}

function CourseCard({
  course, stepDone, routeBase,
}: {
  course: Course;
  stepDone: Record<string, boolean>;
  routeBase: string;
}) {
  const totals = course.modules.map((m) => moduleTotals(m, stepDone, course.id));
  const totalSteps = totals.reduce((sum, t) => sum + t.total, 0);
  const doneSteps = totals.reduce((sum, t) => sum + t.done, 0);
  const pct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;
  const days = daysUntil(course.examDate);
  const hours = Math.round(course.totalEstimateMin / 60 * 10) / 10;

  return (
    <Link href={routeBase} className="block group">
      <motion.div
        whileHover={{ x: 2 }}
        className={cn(
          "relative overflow-hidden rounded-2xl border px-6 py-6 transition-colors",
          pct === 100
            ? "border-accent-lime/40 bg-accent-lime/[0.04]"
            : "border-line bg-bg-surface hover:border-line-strong"
        )}
      >
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-bg-elevated border border-line flex items-center justify-center shrink-0">
            <GraduationCap size={22} className="text-ink" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg lg:text-xl font-bold tracking-tightest text-ink">{course.examLabel}</span>
              <Tag tone={days <= 1 ? "red" : days <= 3 ? "amber" : "neutral"} size="sm">
                {days}d to exam
              </Tag>
              {pct === 100 && <Tag tone="lime" size="sm">✓ done</Tag>}
            </div>
            <div className="text-sm text-ink-mute mt-1.5">
              {course.modules.length} modules · ~{hours}h · single-night mastery path
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 max-w-[220px] h-1 rounded-full bg-line overflow-hidden">
                <div
                  className={cn("h-full transition-all duration-500", pct === 100 ? "bg-accent-lime" : "bg-ink/60")}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <Meta>{doneSteps}/{totalSteps}</Meta>
              <Meta>·</Meta>
              <Meta>{pct}%</Meta>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-ink-mute group-hover:text-ink shrink-0 transition-colors" />
        </div>
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
