"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LearnPage, LearnHeader, LearnCard, LearnPill, LearnButton,
} from "@/components/learn/primitives";
import { findLesson } from "@/lib/learn/course";
import { ArrowLeft, Wrench } from "lucide-react";

export default function LessonPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const params = useParams<{ lessonId: string }>();
  const router = useRouter();
  if (!mounted) return null;

  const found = findLesson("ap-precalc", params.lessonId);
  if (!found) {
    router.replace("/learn/precalc");
    return null;
  }
  return <Inner lessonId={params.lessonId} />;
}

function Inner({ lessonId }: { lessonId: string }) {
  const found = findLesson("ap-precalc", lessonId)!;
  const { unit, topic, lesson } = found;

  return (
    <LearnPage light>
      <Link
        href={`/learn/precalc/u/${unit.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-[var(--learn-ink-mute)] hover:text-[var(--learn-ink)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Back to {unit.title}
      </Link>

      <div className="mb-2 text-sm font-medium text-[var(--learn-accent)]">
        Unit {unit.number} · {topic.title}
      </div>
      <h1 className="text-3xl lg:text-[2.25rem] font-bold tracking-tight leading-[1.1] text-[var(--learn-ink)] mb-6">
        {lesson.title}
      </h1>

      {lesson.beats.length === 0 ? (
        <LearnCard className="mt-6 border-2 border-dashed bg-transparent">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--learn-elevated)] flex items-center justify-center shrink-0">
              <Wrench size={18} className="text-[var(--learn-ink-mute)]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base text-[var(--learn-ink)]">Lesson coming soon</div>
              <p className="mt-1.5 text-sm text-[var(--learn-ink-dim)] leading-relaxed">
                The walkthrough engine ships in PR D, the artifact library in PR E, and the actual beats for this lesson land in PR F-H. The shape is in place — the lesson knows what artifact it will use ({lesson.artifact.replace("-", " ")}) and how long it'll take ({lesson.estimateMin} min).
              </p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <LearnPill tone="warning">Engine: PR D</LearnPill>
                <LearnPill tone="warning">Artifacts: PR E</LearnPill>
                <LearnPill tone="warning">Content: PR F-H</LearnPill>
              </div>
            </div>
          </div>
        </LearnCard>
      ) : (
        <LearnCard>
          <div className="text-[var(--learn-ink-dim)] text-sm">
            Lesson player not yet wired in this PR. {lesson.beats.length} beats are queued for this lesson.
          </div>
        </LearnCard>
      )}

      <div className="mt-8 flex items-center justify-between">
        <Link href={`/learn/precalc/u/${unit.id}`}>
          <LearnButton variant="secondary"><ArrowLeft size={14} /> Unit overview</LearnButton>
        </Link>
      </div>
    </LearnPage>
  );
}
