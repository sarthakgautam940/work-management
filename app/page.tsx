"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Eyebrow, Stat, ProgressBar, Tag, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  greeting, fullDate, timeOfDay, workoutFor, daysUntil, urgencyLabel,
} from "@/lib/utils/date";
import { ROUTINE_SECTIONS, totalRoutineItems } from "@/lib/data/routine";
import { ArrowRight, Flame, AlertCircle, Target } from "lucide-react";

export default function TodayPage() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const isRoutineDone = useStore((s) => s.isRoutineDone);
  const streak = useStore((s) => s.getStreak());
  const bodyweight = useStore((s) => s.bodyweight);
  const apMacroDays = useStore((s) => s.apMacroDays);
  const apPrecalcDays = useStore((s) => s.apPrecalcDays);
  const totalItems = totalRoutineItems();

  if (!mounted) return <Skeleton />;

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

  // CRITICAL DEADLINES
  const macroDays = daysUntil("2026-05-08");
  const precalcDays = daysUntil("2026-05-12");
  const macroDayDone = !!apMacroDays["2026-05-04"];
  const precalcDayDone = !!apPrecalcDays["2026-05-04"];

  const rightNow = getRightNow(tod, workout, isRoutineDone, macroDays, precalcDays, macroDayDone, precalcDayDone);

  return (
    <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-5xl">
      {/* Critical bar */}
      {(macroDays <= 4 && macroDays >= 0) && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center gap-3 px-4 py-2.5 rounded-lg bg-accent-red/10 border border-accent-red/30"
        >
          <AlertCircle size={16} className="text-accent-red shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-accent-red font-medium text-sm">AP Macro</span>
            <span className="text-ink-dim text-sm ml-2">
              in {macroDays}d · {macroDayDone ? "today's block done" : "today's block pending"}
            </span>
          </div>
          <Link href="/ap" className="shrink-0">
            <span className="font-mono text-2xs text-accent-red tracking-wider uppercase">Open →</span>
          </Link>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-7"
      >
        <div className="flex items-center gap-3">
          <Eyebrow>{fullDate(now)}</Eyebrow>
          {streak > 0 && (
            <span className="font-mono text-2xs text-accent-amber flex items-center gap-1">
              <Flame size={11} /> {streak}d streak
            </span>
          )}
        </div>
        <h1 className="mt-2 text-3xl lg:text-5xl font-bold tracking-tightest">
          {greeting()}.
        </h1>
        <p className="mt-3 text-ink-dim text-sm lg:text-base max-w-xl">
          {todayCopy(tod, pct, macroDays, precalcDays)}
        </p>
      </motion.div>

      {/* Right Now — the most important section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <Card className="p-5 lg:p-7 mb-6 grain relative overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Eyebrow accent="lime"><span className="live-dot">Right now</span></Eyebrow>
              <h2 className="mt-2 text-xl lg:text-2xl font-bold tracking-tight">{rightNow.title}</h2>
              <p className="mt-2 text-ink-dim text-sm">{rightNow.detail}</p>
            </div>
            <Link href={rightNow.href} className="shrink-0">
              <Button variant="primary">
                <span className="flex items-center gap-1.5">Go <ArrowRight size={14} /></span>
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="Routine" value={`${pct}%`} hint={`${routineDone}/${totalItems}`} accent={pct >= 80 ? "lime" : pct >= 50 ? "amber" : "red"} />
        <Stat label="Workout" value={workout === "rest" ? "Rest" : cap(workout)} hint={workout === "rest" ? "Recovery" : "Today's split"} accent={workout === "push" ? "orange" : workout === "pull" ? "blue" : workout === "legs" ? "violet" : "lime"} />
        <Stat label="Macro Exam" value={`${macroDays}d`} hint="May 8" accent={macroDays <= 3 ? "red" : "amber"} />
        <Stat label="Precalc" value={`${precalcDays}d`} hint="May 12" accent={precalcDays <= 5 ? "red" : "amber"} />
      </div>

      {/* Lanes */}
      <div className="space-y-3 mb-10">
        <Eyebrow>Lanes</Eyebrow>
        <Lane
          href="/routine"
          label="Daily Routine"
          hint={`${routineDone}/${totalItems} items today`}
          accent="lime"
          pct={pct}
        />
        <Lane
          href="/workout"
          label={workout === "rest" ? "Rest Day" : `${cap(workout)} Day`}
          hint={workout === "rest" ? "Active recovery" : "Lift, log, set PRs"}
          accent={workout === "push" ? "orange" : workout === "pull" ? "blue" : workout === "legs" ? "violet" : "neutral"}
        />
        <Lane href="/ap" label="AP Crash Plans" hint={`Macro in ${macroDays}d · Precalc in ${precalcDays}d`} accent="red" urgent />
        <Lane href="/school" label="Classes" hint="Precalc · Marketing · Chem · Macro · English" accent="blue" />
        <Lane href="/food" label="Food & Shopping" hint={`Protein target: ${proteinTarget}g`} accent="emerald" />
        <Lane href="/business" label="UpLevel Services" hint="Pipeline · revenue · build" accent="violet" />
        <Lane href="/ibo" label="IBO Sprint" hint={`Starts in ${daysUntil("2026-05-09")}d`} accent="amber" />
        <Lane href="/sat" label="SAT Prep" hint={`${daysUntil("2026-10-03")}d to test`} accent="rose" />
      </div>

      <div className="text-2xs font-mono text-ink-ghost tracking-wider mb-8">
        DATA STORED LOCALLY · PRAXIS v1
      </div>
    </div>
  );
}

function Lane({ href, label, hint, accent, pct, urgent }: { href: string; label: string; hint: string; accent: "lime" | "blue" | "amber" | "violet" | "red" | "orange" | "emerald" | "rose" | "neutral"; pct?: number; urgent?: boolean }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ x: 2 }}
        className={`group block p-4 lg:p-5 rounded-xl bg-bg-surface border transition-colors ${urgent ? "border-accent-red/30 hover:border-accent-red/60" : "border-line hover:border-line-strong"}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-base">{label}</span>
              {urgent && <Tag accent="red" size="sm">Urgent</Tag>}
            </div>
            <div className="text-xs text-ink-mute mt-0.5">{hint}</div>
          </div>
          <ArrowRight size={16} className="text-ink-mute group-hover:text-ink transition-colors shrink-0" />
        </div>
        {pct !== undefined && (<div className="mt-3"><ProgressBar value={pct} accent={accent === "neutral" ? "lime" : accent} /></div>)}
      </motion.div>
    </Link>
  );
}

function getRightNow(tod: string, workout: string, isDone: (id: string) => boolean, macroDays: number, precalcDays: number, macroDayDone: boolean, precalcDayDone: boolean) {
  // CRITICAL: AP Macro is in 4 days. Override everything else if macro block isn't done by evening.
  if (macroDays <= 4 && macroDays >= 0 && !macroDayDone && (tod === "afternoon" || tod === "evening")) {
    return { title: "Hit today's AP Macro block", detail: `${macroDays} days to the exam. Today's block hasn't been started.`, href: "/ap" };
  }
  if (precalcDays <= 8 && precalcDays >= 0 && !precalcDayDone && tod === "evening" && macroDayDone) {
    return { title: "AP Precalc block — get the next one in", detail: `${precalcDays} days to that exam. Macro is locked for today.`, href: "/ap" };
  }

  const wakeUndone = ROUTINE_SECTIONS[0].items.some((_, i) => !isDone(`wake.${i}`));
  const skinAmUndone = ROUTINE_SECTIONS[1].items.some((_, i) => !isDone(`skin-am.${i}`));
  const skinPmUndone = ROUTINE_SECTIONS[7].items.some((_, i) => !isDone(`skin-pm.${i}`));
  const bedUndone = ROUTINE_SECTIONS[10].items.some((_, i) => !isDone(`bed.${i}`));

  if (tod === "early" && wakeUndone) return { title: "Start the morning sequence", detail: "Lemon water, creatine, supplements. Then morning skin and hair.", href: "/routine" };
  if ((tod === "early" || tod === "morning") && skinAmUndone) return { title: "Morning skin + hair", detail: "Toner, centella, vitamin C, undereye, moisturizer, SPF.", href: "/routine" };
  if ((tod === "afternoon" || tod === "evening") && workout !== "rest") return { title: `Hit the ${workout} session`, detail: "Track every set. Last set to failure on each lift.", href: "/workout" };
  if (tod === "evening" && skinPmUndone) return { title: "Evening skin + hair", detail: "Cleanser, toner, centella, azelaic, moisturizer, hair density serum.", href: "/routine" };
  if (tod === "night" && bedUndone) return { title: "Wind down", detail: "Chin tucks, blink exercise, no blue light, asleep by 10–11pm.", href: "/routine" };
  if (tod === "night" && !bedUndone) return { title: "You're done. Sleep.", detail: "HGH peaks in the first 4 hours of deep sleep.", href: "/routine" };

  return { title: "Open the routine", detail: "Work through what's left.", href: "/routine" };
}

function todayCopy(tod: string, pct: number, macro: number, precalc: number): string {
  if (macro === 0) return "Macro exam day. Trust the prep. Don't cram new content.";
  if (macro <= 1) return "Macro exam tomorrow. Final review only — don't try to learn anything new.";
  if (macro <= 3) return `Macro in ${macro} days. Every block is non-negotiable now.`;
  if (precalc === 0) return "Precalc exam day. Show up rested.";
  if (pct >= 90) return "Today is essentially locked. Hold the line until bed.";
  if (pct >= 60) return "Strong day so far. Keep working down the list.";
  if (tod === "early") return "Early start. The compounding begins now.";
  if (tod === "morning") return "Mid-morning — most people are off track. You don't have to be.";
  if (tod === "afternoon") return "The day still has a lot of ground in it. Don't coast.";
  if (tod === "evening") return "Evening is when most days quietly fail. Yours doesn't.";
  if (tod === "night") return "Final stretch. Wind down properly.";
  return "Open the routine and start moving.";
}

function cap(s: string) { return s[0].toUpperCase() + s.slice(1); }

function Skeleton() {
  return (
    <div className="px-5 lg:px-10 pt-8 lg:pt-10 max-w-5xl">
      <div className="h-3 w-32 bg-bg-elevated rounded mb-3 animate-pulse" />
      <div className="h-12 w-64 bg-bg-elevated rounded mb-6 animate-pulse" />
      <div className="h-32 bg-bg-surface rounded-2xl animate-pulse" />
    </div>
  );
}
