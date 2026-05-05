"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Eyebrow, Meta, Stat, Section, Tag, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  greeting, fullDate, timeOfDay, workoutFor, daysUntil,
} from "@/lib/utils/date";
import { ROUTINE_SECTIONS, totalRoutineItems } from "@/lib/data/routine";
import { ArrowUpRight, Flame, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function TodayPage() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const isRoutineDone = useStore((s) => s.isRoutineDone);
  const streak = useStore((s) => s.getStreak());
  const bodyweight = useStore((s) => s.bodyweight);
  const apMacroDays = useStore((s) => s.apMacroDays);
  const apPrecalcDays = useStore((s) => s.apPrecalcDays);

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

  const macroDays = daysUntil("2026-05-08");
  const precalcDays = daysUntil("2026-05-12");
  const macroDayDone = !!apMacroDays["2026-05-04"];
  const precalcDayDone = !!apPrecalcDays["2026-05-04"];

  const rightNow = getRightNow(tod, workout, isRoutineDone, macroDays, precalcDays, macroDayDone, precalcDayDone);

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-5xl pb-16">
      {/* Header — calm typography first */}
      <motion.header
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-10"
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
          {todayCopy(tod, pct, macroDays, precalcDays)}
        </p>
      </motion.header>

      {/* Critical bar — only renders if there's something critical */}
      {(macroDays <= 4 && macroDays >= 0) && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3 px-4 py-3 rounded-lg border border-accent-red/30 bg-accent-red/[0.04]"
        >
          <AlertCircle size={15} className="text-accent-red shrink-0" />
          <div className="flex-1 min-w-0 text-sm">
            <span className="text-ink font-medium">AP Macro in {macroDays}d.</span>
            <span className="text-ink-mute ml-1.5">
              {macroDayDone ? "Today's block is done." : "Today's block isn't started."}
            </span>
          </div>
          <Link href="/ap" className="shrink-0">
            <Meta className="text-accent-red hover:text-accent-red/80">Open →</Meta>
          </Link>
        </motion.div>
      )}

      {/* Right now — a single decisive call to action */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
      >
        <Card className="p-6 lg:p-8 mb-10 grain relative overflow-hidden">
          <Eyebrow>Right now</Eyebrow>
          <div className="mt-3 flex items-end justify-between gap-5 flex-wrap">
            <div className="min-w-0 flex-1 max-w-xl">
              <h2 className="text-2xl lg:text-[28px] font-bold tracking-tightest leading-[1.15]">{rightNow.title}</h2>
              <p className="mt-2 text-ink-dim text-sm leading-relaxed">{rightNow.detail}</p>
            </div>
            <Link href={rightNow.href} className="shrink-0">
              <Button variant="primary" size="md">
                <span className="flex items-center gap-1.5">Open <ArrowUpRight size={14} /></span>
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Status — discreet metrics */}
      <Section eyebrow="Status">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Stat label="Routine" value={`${pct}%`} hint={`${routineDone}/${totalItems} today`} accent={pct >= 80 ? "lime" : pct >= 50 ? "amber" : "neutral"} />
          <Stat label="Workout" value={workout === "rest" ? "Rest" : cap(workout)} hint={workout === "rest" ? "Recovery" : "Today's split"} />
          <Stat label="AP Macro" value={`${macroDays}d`} hint="May 8 · Friday" accent={macroDays <= 3 ? "red" : "amber"} />
          <Stat label="AP Precalc" value={`${precalcDays}d`} hint="May 12 · Tuesday" accent={precalcDays <= 5 ? "amber" : "neutral"} />
        </div>
      </Section>

      {/* Lanes — grouped by urgency, with rails not chips */}
      <Section eyebrow="Lanes" hint={`${pct}% routine · protein ${proteinTarget}g`}>
        <div className="space-y-px rounded-xl bg-bg-surface border border-line overflow-hidden">
          <Lane href="/ap" label="AP crash plans" hint={`Macro ${macroDays}d · Precalc ${precalcDays}d`} state="urgent" />
          <Lane href="/routine" label="Daily routine" hint={`${routineDone} of ${totalItems} done`} state={pct >= 80 ? "done" : pct >= 50 ? "active" : undefined} />
          <Lane href="/workout" label={workout === "rest" ? "Rest day" : `${cap(workout)} session`} hint={workout === "rest" ? "Active recovery" : "Track every set · last to failure"} />
          <Lane href="/school" label="Classes" hint="Precalc · Marketing · Chem · Macro · English" />
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

function getRightNow(tod: string, workout: string, isDone: (id: string) => boolean, macroDays: number, precalcDays: number, macroDayDone: boolean, precalcDayDone: boolean) {
  if (macroDays <= 4 && macroDays >= 0 && !macroDayDone && (tod === "afternoon" || tod === "evening")) {
    return { title: "Hit today's AP Macro block", detail: `${macroDays} days to the exam. Today's block hasn't been started.`, href: "/ap" };
  }
  if (precalcDays <= 8 && precalcDays >= 0 && !precalcDayDone && tod === "evening" && macroDayDone) {
    return { title: "AP Precalc — get the next block in", detail: `${precalcDays} days to that exam. Macro is locked for today.`, href: "/ap" };
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
  if (tod === "night" && !bedUndone) return { title: "You're done. Sleep.", detail: "HGH peaks in the first four hours of deep sleep.", href: "/routine" };

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
    <div className="px-5 lg:px-10 pt-8 lg:pt-12 max-w-5xl">
      <div className="h-3 w-32 bg-bg-elevated rounded mb-3 animate-pulse" />
      <div className="h-12 w-64 bg-bg-elevated rounded mb-6 animate-pulse" />
      <div className="h-32 bg-bg-surface rounded-2xl animate-pulse" />
    </div>
  );
}
