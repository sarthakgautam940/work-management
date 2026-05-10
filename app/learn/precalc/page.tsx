"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LearnPage, LearnHeader, LearnSection, LearnLinkCard, LearnCard,
  LearnPill, LearnProgress, LearnStat, LearnButton,
} from "@/components/learn/primitives";
import { PRECALC, courseTotals, unitTotals } from "@/lib/learn/course";
import { useStore } from "@/lib/store";
import { daysUntil } from "@/lib/utils/date";
import { ArrowRight, Target, Library, BookText, ClipboardCheck, Sparkles } from "lucide-react";

export default function PrecalcDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const lessonsDone = useStore((s) => s.learnLessonDone);
  const beatDone = useStore((s) => s.learnBeatDone);
  const diagnostic = useStore((s) => s.learnDiagnostic);
  const lastLesson = useStore((s) => s.learnLastLesson);

  const totals = courseTotals();
  const completedLessons = Object.keys(lessonsDone).length;
  const completedBeats = Object.keys(beatDone).filter((k) => k.startsWith(PRECALC.id) && beatDone[k]).length;
  const days = daysUntil(PRECALC.examDate);
  const continueLessonId = lastLesson[PRECALC.id];

  return (
    <LearnPage>
      <LearnHeader
        kicker="AP Precalculus"
        title="Your study path"
        subtitle="Three units. Each lesson is a walkthrough — beats, not slides. Take the diagnostic first to color the path."
        back={{ href: "/learn", label: "Courses" }}
        right={
          continueLessonId ? (
            <Link href={`/learn/precalc/lesson/${continueLessonId}`}>
              <LearnButton size="lg">
                Continue <ArrowRight size={16} />
              </LearnButton>
            </Link>
          ) : null
        }
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <LearnStat label="Days to exam" value={`${days}`} hint={PRECALC.examDate.slice(5)} emphasis={days <= 3 ? "warning" : "default"} />
        <LearnStat label="Lessons" value={`${completedLessons}/${totals.lessons}`} hint="completed" />
        <LearnStat label="Beats" value={`${completedBeats}`} hint={`of ${totals.beats || "—"} planned`} emphasis="accent" />
        <LearnStat label="Total time" value={`${Math.round(totals.estimateMin / 60 * 10) / 10}h`} hint="full course" />
      </div>

      {/* Diagnostic CTA */}
      <DiagnosticCTA taken={diagnostic.taken} />

      {/* Units */}
      <LearnSection title="Units" hint="Tap a unit to see topics and lessons">
        <div className="space-y-3">
          {PRECALC.units.map((unit) => {
            const t = unitTotals(unit);
            const done = unit.topics.flatMap((tp) => tp.lessons).filter((l) => lessonsDone[l.id]).length;
            return (
              <UnitRow
                key={unit.id}
                unitNumber={unit.number}
                title={unit.title}
                weight={unit.examWeight}
                lessonsDone={done}
                lessonsTotal={t.lessons}
                href={`/learn/precalc/u/${unit.id}`}
              />
            );
          })}
        </div>
      </LearnSection>

      {/* Practice + review tracks */}
      <LearnSection title="Beyond lessons">
        <div className="grid sm:grid-cols-2 gap-3">
          <SideTrackCard
            href="/learn/precalc/practice"
            icon={ClipboardCheck}
            title="Practice bank"
            description="68 worked exam problems. Filter by unit, topic, or section."
            stub="Coming in PR I"
          />
          <SideTrackCard
            href="/learn/precalc/review"
            icon={Sparkles}
            title="Spaced review"
            description="Formulas + flagged misses surface here on a schedule."
            stub="Coming in PR J"
          />
          <SideTrackCard
            href="/learn/precalc/exam"
            icon={Target}
            title="Mock exam"
            description="Timed sections. Scored against the AP curve."
            stub="Coming in PR K"
          />
          <SideTrackCard
            href="/learn/precalc/formulas"
            icon={Library}
            title="Formula sheet"
            description="All 88 reference items. Browse or drill as cards."
            stub="Coming in PR J"
          />
        </div>
      </LearnSection>

      {/* Fallback to placeholder course while engine fills in */}
      <LearnSection title="Until the new lessons land">
        <LearnCard className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0">
              <BookText size={18} className="text-ink-dim" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base text-ink">Legacy precalc course (placeholder)</div>
              <p className="mt-1 text-sm text-ink-dim leading-relaxed">
                The previous step-based course is still here as a fallback while the new walkthrough engine fills in. Use it for what's already covered; switch to a new lesson here when one lights up.
              </p>
              <Link href="/ap/crash/precalc" className="inline-flex items-center gap-1.5 mt-3 text-sm text-accent-blue hover:underline">
                Open legacy course <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </LearnCard>
      </LearnSection>
    </LearnPage>
  );
}

function DiagnosticCTA({ taken }: { taken: boolean }) {
  return (
    <Link href="/learn/precalc/diagnostic" className="block mb-10 group">
      <div className={`rounded-2xl border-2 px-5 py-5 transition-colors ${
        taken ? "border-accent-lime/30 bg-accent-lime/[0.04] hover:border-accent-lime/50" : "border-accent-blue/40 bg-accent-blue/[0.04] hover:border-accent-blue/60"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            taken ? "bg-accent-lime/10" : "bg-accent-blue/10"
          }`}>
            <Target size={20} className={taken ? "text-accent-lime" : "text-accent-blue"} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base text-ink">
              {taken ? "Diagnostic complete — review your path" : "Take the diagnostic — 12 questions, 6 minutes"}
            </div>
            <div className="mt-0.5 text-sm text-ink-dim">
              {taken ? "Tap to retake or color-code your units again." : "Colors each unit red / amber / green so you start where it matters."}
            </div>
          </div>
          <ArrowRight size={18} className="text-ink-mute group-hover:text-ink shrink-0 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

function UnitRow({
  unitNumber, title, weight, lessonsDone, lessonsTotal, href,
}: {
  unitNumber: number;
  title: string;
  weight: string;
  lessonsDone: number;
  lessonsTotal: number;
  href: string;
}) {
  const pct = lessonsTotal > 0 ? (lessonsDone / lessonsTotal) * 100 : 0;
  return (
    <Link href={href} className="block group">
      <LearnCard className="hover:border-line-strong transition-colors">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0 font-mono text-lg font-bold tabular-nums text-ink-dim">
            {unitNumber}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h3 className="text-lg font-semibold text-ink">{title}</h3>
              <LearnPill tone="neutral">{weight}</LearnPill>
            </div>
            <div className="text-sm text-ink-dim">
              {lessonsDone} of {lessonsTotal} lessons complete
            </div>
            <div className="mt-3">
              <LearnProgress value={pct} showLabel />
            </div>
          </div>
          <ArrowRight size={18} className="text-ink-mute group-hover:text-ink shrink-0 mt-2 transition-colors" />
        </div>
      </LearnCard>
    </Link>
  );
}

function SideTrackCard({
  href, icon: Icon, title, description, stub,
}: {
  href: string;
  icon: typeof Target;
  title: string;
  description: string;
  stub?: string;
}) {
  return (
    <Link href={href} className="block group">
      <LearnCard className="h-full hover:border-line-strong transition-colors">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center">
              <Icon size={16} className="text-ink-dim" />
            </div>
            <h3 className="font-semibold text-base text-ink">{title}</h3>
          </div>
          <p className="text-sm text-ink-dim leading-relaxed flex-1">{description}</p>
          {stub && (
            <div className="mt-3">
              <LearnPill tone="warning">{stub}</LearnPill>
            </div>
          )}
        </div>
      </LearnCard>
    </Link>
  );
}
