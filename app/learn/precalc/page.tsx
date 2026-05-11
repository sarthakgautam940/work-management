"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LearnPage, LearnHeader, LearnSection, LearnLinkCard, LearnCard,
  LearnPill, LearnProgress, LearnStat, LearnButton,
} from "@/components/learn/primitives";
import { PRECALC, courseTotals, unitTotals } from "@/lib/learn/course";
import { CRAM_BLOCKS, planTotals, nextUp } from "@/lib/learn/cram-plan";
import { useStore } from "@/lib/store";
import { daysUntil } from "@/lib/utils/date";
import { ArrowRight, Target, Library, ClipboardCheck, Sparkles, Flame } from "lucide-react";

export default function PrecalcDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const lessonsDone = useStore((s) => s.learnLessonDone);
  const diagnostic = useStore((s) => s.learnDiagnostic);

  const totals = courseTotals();
  const cram = planTotals(lessonsDone);
  const cramNext = nextUp(lessonsDone);
  const days = daysUntil(PRECALC.examDate);
  const completedLessons = Object.keys(lessonsDone).length;

  return (
    <LearnPage>
      <LearnHeader
        kicker="AP Precalculus"
        title="Your study path"
        subtitle={
          days <= 1
            ? "Run the cram plan top-to-bottom. Nothing else matters today."
            : "Sequenced by exam yield. Open the cram plan to start."
        }
        back={{ href: "/learn", label: "Courses" }}
        right={
          cramNext ? (
            <Link href={`/learn/precalc/lesson/${cramNext.ref.lessonId}`}>
              <LearnButton size="lg">
                <Flame size={14} /> Next lesson
              </LearnButton>
            </Link>
          ) : null
        }
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <LearnStat label="Days to exam" value={`${days}`} hint={PRECALC.examDate.slice(5)} emphasis={days <= 1 ? "warning" : "default"} />
        <LearnStat label="Plan progress" value={`${cram.done}/${cram.lessons}`} hint="cram lessons" emphasis="accent" />
        <LearnStat label="Full course" value={`${completedLessons}/${totals.lessons}`} hint="lessons total" />
        <LearnStat label="Plan length" value={`~${Math.round(cram.minutes / 60 * 10) / 10}h`} hint={`${CRAM_BLOCKS.length} blocks`} />
      </div>

      {/* Cram-plan CTA */}
      <CramCTA done={cram.done} total={cram.lessons} />

      {/* Diagnostic CTA */}
      <DiagnosticCTA taken={diagnostic.taken} />

      {/* Beyond the cram plan — practice / review / exam / formulas */}
      <LearnSection title="Drills & review">
        <div className="grid sm:grid-cols-2 gap-3">
          <SideTrackCard
            href="/learn/precalc/practice"
            icon={ClipboardCheck}
            title="Practice bank"
            description="68 worked exam problems. Filter by source, unit, or type. Try, then reveal."
          />
          <SideTrackCard
            href="/learn/precalc/review"
            icon={Sparkles}
            title="Spaced review"
            description="88 formula cards + flagged practice. SM-2 schedules them — surface only what's due."
          />
          <SideTrackCard
            href="/learn/precalc/exam"
            icon={Target}
            title="Mock exam"
            description="Run any section under official AP timing. Score against the curve."
          />
          <SideTrackCard
            href="/learn/precalc/formulas"
            icon={Library}
            title="Formula sheet"
            description="All 88 reference items. Browse by unit or drill as cards."
          />
        </div>
      </LearnSection>

      {/* Full course access — for after the exam or for spot-checking specific lessons */}
      <LearnSection title="Full course" hint="all 115 lessons, including those outside the cram plan">
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
    </LearnPage>
  );
}

function CramCTA({ done, total }: { done: number; total: number }) {
  const pct = total > 0 ? (done / total) * 100 : 0;
  const complete = done === total && total > 0;
  return (
    <Link href="/learn/precalc/cram" className="block mb-7 group">
      <div className={`rounded-2xl border-2 px-5 py-5 transition-colors ${
        complete
          ? "border-accent-lime/40 bg-accent-lime/[0.04] hover:border-accent-lime/60"
          : "border-accent-red/40 bg-accent-red/[0.04] hover:border-accent-red/60"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            complete ? "bg-accent-lime/10" : "bg-accent-red/10"
          }`}>
            <Flame size={22} className={complete ? "text-accent-lime" : "text-accent-red"} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base text-ink mb-0.5">
              {complete ? "Cram plan complete — run a mock" : "Cram plan — 12 hours to exam"}
            </div>
            <div className="text-sm text-ink-dim mb-2">
              {complete
                ? "Done with the priority list. Open the mock exam to calibrate."
                : "Hand-picked lessons in priority order. Open this — not the unit grid."}
            </div>
            <LearnProgress value={pct} />
          </div>
          <ArrowRight size={20} className="text-ink-mute group-hover:text-ink shrink-0 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

function DiagnosticCTA({ taken }: { taken: boolean }) {
  // Demoted below the cram CTA — most users opening this page already
  // know where they stand. Single-line summary, no big card.
  return (
    <div className="mb-10 flex items-center gap-2 text-sm text-ink-mute">
      <Target size={14} />
      <Link href="/learn/precalc/diagnostic" className="hover:text-ink transition-colors">
        {taken ? "Diagnostic done — retake or review →" : "Take the 6-min diagnostic →"}
      </Link>
    </div>
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
