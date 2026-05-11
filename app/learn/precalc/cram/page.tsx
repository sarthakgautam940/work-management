"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LearnPage, LearnHeader, LearnSection, LearnCard, LearnPill, LearnProgress, LearnButton, LearnStat,
} from "@/components/learn/primitives";
import {
  CRAM_BLOCKS, CRAM_AUX,
  blockTotals, blockEstimateMin, planTotals, nextUp, resolveCramLesson,
  type CramBlock, type CramLessonRef,
} from "@/lib/learn/cram-plan";
import { findLesson, PRECALC } from "@/lib/learn/course";
import { MathText } from "@/components/learn/math";
import { useStore } from "@/lib/store";
import { ArrowRight, Check, Lock, Flame, Clock, AlertTriangle, ChevronDown } from "lucide-react";
import { daysUntil } from "@/lib/utils/date";

export default function CramPlanPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const lessonsDone = useStore((s) => s.learnLessonDone);
  const totals = planTotals(lessonsDone);
  const next = nextUp(lessonsDone);
  const days = daysUntil(PRECALC.examDate);
  const planHours = Math.round(totals.minutes / 60 * 10) / 10;

  return (
    <LearnPage>
      <LearnHeader
        kicker="Cram plan"
        title="The 12-hour triage"
        subtitle={
          days <= 1
            ? "Exam day. Trust the plan — first block is non-negotiable."
            : "Hand-picked sequence by AP exam yield. Run it top-to-bottom — skipping ahead misses prerequisites."
        }
        back={{ href: "/learn/precalc", label: "Dashboard" }}
        right={
          next ? (
            <Link href={`/learn/precalc/lesson/${next.ref.lessonId}`}>
              <LearnButton size="lg">
                <Flame size={14} /> Next lesson
              </LearnButton>
            </Link>
          ) : null
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-9">
        <LearnStat label="Days to exam" value={`${days}`} emphasis={days <= 1 ? "warning" : "default"} hint={PRECALC.examDate.slice(5)} />
        <LearnStat label="Plan progress" value={`${totals.done}/${totals.lessons}`} emphasis="accent" hint="lessons" />
        <LearnStat label="Plan length" value={`~${planHours}h`} hint={`${CRAM_BLOCKS.reduce((s, b) => s + b.lessons.length, 0)} lessons`} />
        <LearnStat label="Cut" value={`${CRAM_AUX.find((a) => a.id === "skip")?.skipLessons?.length ?? 0}`} hint="lessons consciously skipped" />
      </div>

      {next && (
        <NextUpBanner blockLabel={next.block.label} item={next.ref} />
      )}

      <LearnSection title="The blocks">
        <div className="space-y-4">
          {CRAM_BLOCKS.map((block) => (
            <BlockCard key={block.id} block={block} lessonsDone={lessonsDone} />
          ))}
        </div>
      </LearnSection>

      {CRAM_AUX.map((aux) => (
        <LearnSection key={aux.id} title={aux.label}>
          {aux.id === "skip" ? (
            <SkipList description={aux.description} lessonIds={aux.skipLessons ?? []} />
          ) : (
            <AuxCard description={aux.description} ctaHref={aux.ctaHref} ctaLabel={aux.ctaLabel} />
          )}
        </LearnSection>
      ))}

      <div className="mt-12 text-center">
        <p className="text-sm text-ink-mute">
          Sleep at hour 12. Cramming past midnight on exam eve costs more points than it gains.
        </p>
      </div>
    </LearnPage>
  );
}

function NextUpBanner({ blockLabel, item }: { blockLabel: string; item: CramLessonRef }) {
  const found = findLesson(PRECALC.id, item.lessonId);
  if (!found) return null;
  return (
    <Link href={`/learn/precalc/lesson/${item.lessonId}`} className="block mb-9 group">
      <div className="rounded-2xl border-2 border-accent-blue/40 bg-accent-blue/[0.04] hover:border-accent-blue/60 transition-colors px-5 py-5">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
            <Flame size={20} className="text-accent-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium uppercase tracking-wide text-accent-blue mb-1">
              Next up · {blockLabel}
            </div>
            <div className="font-semibold text-base text-ink truncate">
              <MathText>{found.lesson.title}</MathText>
            </div>
            <div className="text-sm text-ink-dim mt-0.5">
              {found.unit.title} · {found.lesson.estimateMin} min · {found.lesson.beats.length} beats
              {item.note && <span className="ml-2 text-accent-amber">· {item.note}</span>}
            </div>
          </div>
          <ArrowRight size={20} className="text-ink-mute group-hover:text-ink shrink-0 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

function BlockCard({ block, lessonsDone }: { block: CramBlock; lessonsDone: Record<string, string> }) {
  const totals = blockTotals(block, lessonsDone);
  const minutes = blockEstimateMin(block);
  const pct = totals.total > 0 ? (totals.done / totals.total) * 100 : 0;
  const complete = totals.done === totals.total;
  const [open, setOpen] = useState(!complete);

  return (
    <LearnCard className={`p-0 overflow-hidden ${complete ? "border-accent-lime/30 bg-accent-lime/[0.04]" : ""}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-bg-elevated/30 transition-colors"
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs ${
          complete ? "bg-accent-lime/10 text-accent-lime" : "bg-bg-elevated text-ink-dim"
        }`}>
          {complete ? <Check size={20} /> : (
            <div className="flex flex-col items-center leading-tight tabular-nums">
              <span className="text-2xs uppercase tracking-wide text-ink-mute">hour</span>
              <span className="text-sm text-ink font-semibold">{block.hours[0]}-{block.hours[1]}</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-base text-ink">{block.label}</h3>
            <LearnPill tone="neutral"><Clock size={10} /> ~{Math.round(minutes / 60 * 10) / 10}h plan</LearnPill>
            {complete && <LearnPill tone="success">done</LearnPill>}
          </div>
          <p className="text-sm text-ink-dim leading-relaxed">{block.rationale}</p>
          <div className="mt-3 flex items-center gap-3">
            <LearnProgress value={pct} className="flex-1" />
            <span className="font-mono text-xs tabular-nums text-ink-mute shrink-0">
              {totals.done}/{totals.total}
            </span>
          </div>
        </div>
        <ChevronDown size={16} className={`text-ink-mute shrink-0 mt-1 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-line"
        >
          <div className="px-5 py-4 space-y-1">
            {block.lessons.map((item) => (
              <LessonRow key={item.lessonId} item={item} done={!!lessonsDone[item.lessonId]} />
            ))}
          </div>
        </motion.div>
      )}
    </LearnCard>
  );
}

function LessonRow({ item, done }: { item: CramLessonRef; done: boolean }) {
  const resolved = resolveCramLesson(item);
  if (!resolved) return null;
  const { lesson, unit } = resolved;

  return (
    <Link href={`/learn/precalc/lesson/${item.lessonId}`}>
      <div className={`group rounded-lg px-3 py-2.5 flex items-center gap-3 transition-colors ${
        done ? "hover:bg-accent-lime/[0.06]" : "hover:bg-bg-elevated/40"
      }`}>
        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
          done ? "bg-accent-lime/20 text-accent-lime" : "bg-bg-elevated text-ink-ghost border border-line"
        }`}>
          {done && <Check size={11} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-ink leading-tight">
            <span className="font-mono text-2xs text-ink-mute mr-2 tabular-nums">U{unit.number}</span>
            <MathText>{lesson.title}</MathText>
          </div>
          {item.note && (
            <div className="text-xs text-accent-amber mt-0.5">{item.note}</div>
          )}
        </div>
        <span className="text-xs text-ink-mute font-mono tabular-nums shrink-0">{lesson.estimateMin}m</span>
        <ArrowRight size={12} className="text-ink-mute group-hover:text-ink shrink-0 transition-colors" />
      </div>
    </Link>
  );
}

function AuxCard({ description, ctaHref, ctaLabel }: { description: string; ctaHref?: string; ctaLabel?: string }) {
  return (
    <LearnCard>
      <p className="text-sm text-ink-dim leading-relaxed">{description}</p>
      {ctaHref && ctaLabel && (
        <Link href={ctaHref} className="inline-block mt-4">
          <LearnButton variant="secondary">{ctaLabel} <ArrowRight size={14} /></LearnButton>
        </Link>
      )}
    </LearnCard>
  );
}

function SkipList({ description, lessonIds }: { description: string; lessonIds: string[] }) {
  const [open, setOpen] = useState(false);
  // Group skipped lessons by unit for legibility.
  const grouped: Record<string, string[]> = { "Unit 1": [], "Unit 2": [], "Unit 3": [] };
  lessonIds.forEach((id) => {
    const found = findLesson(PRECALC.id, id);
    if (!found) return;
    grouped[`Unit ${found.unit.number}`].push(`${found.lesson.title}`);
  });

  return (
    <LearnCard>
      <div className="flex items-start gap-3">
        <AlertTriangle size={16} className="text-accent-amber shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-ink leading-relaxed">{description}</p>
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-3 text-xs font-medium text-accent-blue hover:underline inline-flex items-center gap-1.5"
          >
            <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            {open ? "Hide" : "Show"} the {lessonIds.length} skipped lessons
          </button>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden mt-4 space-y-3"
            >
              {Object.entries(grouped).map(([unit, items]) =>
                items.length === 0 ? null : (
                  <div key={unit}>
                    <div className="text-xs font-medium text-ink-mute mb-1.5">{unit}</div>
                    <ul className="space-y-1 text-xs text-ink-dim">
                      {items.map((t, i) => <li key={i}>· <MathText>{t}</MathText></li>)}
                    </ul>
                  </div>
                ),
              )}
            </motion.div>
          )}
        </div>
      </div>
    </LearnCard>
  );
}
