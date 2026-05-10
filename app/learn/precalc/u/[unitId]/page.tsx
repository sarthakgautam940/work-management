"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  LearnPage, LearnHeader, LearnSection, LearnCard, LearnPill, LearnProgress,
} from "@/components/learn/primitives";
import { findUnit, unitTotals } from "@/lib/learn/course";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

export default function UnitPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const params = useParams<{ unitId: string }>();
  const router = useRouter();
  if (!mounted) return null;

  const unit = findUnit("ap-precalc", params.unitId);
  if (!unit) {
    router.replace("/learn/precalc");
    return null;
  }
  return <Inner unitId={params.unitId} />;
}

function Inner({ unitId }: { unitId: string }) {
  const unit = findUnit("ap-precalc", unitId)!;
  const t = unitTotals(unit);
  const lessonsDone = useStore((s) => s.learnLessonDone);
  const completed = unit.topics.flatMap((tp) => tp.lessons).filter((l) => lessonsDone[l.id]).length;
  const pct = t.lessons > 0 ? (completed / t.lessons) * 100 : 0;

  return (
    <LearnPage>
      <LearnHeader
        kicker={`Unit ${unit.number}`}
        title={unit.title}
        subtitle={`Exam weight ${unit.examWeight}. ${t.lessons} lessons · roughly ${Math.round(t.estimateMin / 60 * 10) / 10}h.`}
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
      />

      {/* Core ideas */}
      <LearnCard className="mb-8">
        <h3 className="font-semibold text-base text-ink mb-3">What this unit lives on</h3>
        <ul className="space-y-2">
          {unit.coreIdeas.map((idea, i) => (
            <li key={i} className="flex gap-3 text-sm text-ink-dim leading-relaxed">
              <span className="font-mono text-xs text-ink-mute mt-0.5 tabular-nums shrink-0">{i + 1}.</span>
              {idea}
            </li>
          ))}
        </ul>
      </LearnCard>

      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-ink-dim">Progress</span>
          <span className="font-medium text-ink tabular-nums">{completed}/{t.lessons} lessons</span>
        </div>
        <LearnProgress value={pct} />
      </div>

      {/* Topics */}
      <LearnSection title="Topics">
        <div className="space-y-6">
          {unit.topics.map((topic, ti) => {
            const topicDone = topic.lessons.filter((l) => lessonsDone[l.id]).length;
            return (
              <div key={topic.id}>
                <div className="flex items-baseline gap-3 mb-3">
                  <h3 className="font-semibold text-base text-ink">
                    <span className="text-ink-mute font-mono text-sm tabular-nums mr-2">{unit.number}.{ti + 1}</span>
                    {topic.title}
                  </h3>
                  <span className="text-xs text-ink-mute tabular-nums">{topicDone}/{topic.lessons.length}</span>
                </div>
                {topic.blurb && (
                  <p className="text-sm text-ink-dim mb-3 leading-relaxed">{topic.blurb}</p>
                )}
                <div className="space-y-1.5">
                  {topic.lessons.map((lesson, li) => {
                    const done = !!lessonsDone[lesson.id];
                    const empty = lesson.beats.length === 0;
                    const state = done ? "done" : empty ? "locked" : "open";
                    return (
                      <LessonRow
                        key={lesson.id}
                        index={`${unit.number}.${ti + 1}.${li + 1}`}
                        title={lesson.title}
                        estimateMin={lesson.estimateMin}
                        beats={lesson.beats.length}
                        state={state}
                        href={`/learn/precalc/lesson/${lesson.id}`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </LearnSection>
    </LearnPage>
  );
}

function LessonRow({
  index, title, estimateMin, beats, state, href,
}: {
  index: string;
  title: string;
  estimateMin: number;
  beats: number;
  state: "done" | "open" | "locked";
  href: string;
}) {
  const stateStyles = {
    done: "border-accent-lime/20 bg-accent-lime/[0.04] hover:border-accent-lime/40",
    open: "border-line bg-bg-surface hover:border-line-strong",
    locked: "border-line bg-bg-surface/40 opacity-50 cursor-not-allowed",
  }[state];

  const content = (
    <div className={`group rounded-lg border px-4 py-3 transition-colors flex items-center gap-4 ${stateStyles}`}>
      <span className="font-mono text-xs tabular-nums text-ink-mute w-12 shrink-0">{index}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-ink font-medium">{title}</div>
        <div className="text-xs text-ink-mute mt-0.5">
          {estimateMin}m · {beats > 0 ? `${beats} beats` : "content coming soon"}
        </div>
      </div>
      {state === "locked" ? (
        <Lock size={14} className="text-ink-ghost shrink-0" />
      ) : (
        <ArrowRight size={14} className="text-ink-mute group-hover:text-ink shrink-0 transition-colors" />
      )}
    </div>
  );

  if (state === "locked") return content;
  return <Link href={href}>{content}</Link>;
}
