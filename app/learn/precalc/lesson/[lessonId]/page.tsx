"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LearnPage, LearnCard, LearnPill, LearnButton,
} from "@/components/learn/primitives";
import { findLesson, PRECALC } from "@/lib/learn/course";
import { LessonPlayer } from "@/components/learn/lesson-player";
import { ArrowLeft, Wrench } from "lucide-react";

export default function LessonPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const params = useParams<{ lessonId: string }>();
  const router = useRouter();
  if (!mounted) return null;

  const found = findLesson(PRECALC.id, params.lessonId);
  if (!found) {
    router.replace("/learn/precalc");
    return null;
  }
  return <Inner lessonId={params.lessonId} />;
}

function Inner({ lessonId }: { lessonId: string }) {
  const found = findLesson(PRECALC.id, lessonId)!;
  const { unit, topic, lesson } = found;

  // Find the next lesson in the unit (next in same topic, else first lesson
  // of next topic) for end-of-lesson "Next" button.
  const nextLessonId = (() => {
    const allLessons = unit.topics.flatMap((tp) => tp.lessons.map((l) => l.id));
    const idx = allLessons.indexOf(lessonId);
    return idx >= 0 && idx < allLessons.length - 1 ? allLessons[idx + 1] : undefined;
  })();

  // Empty lesson — show the "coming soon" stub instead of the player.
  if (lesson.beats.length === 0) {
    return (
      <div className="learn-light min-h-screen">
        <LearnPage>
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
          <LearnCard className="mt-6 border-2 border-dashed bg-transparent">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[var(--learn-elevated)] flex items-center justify-center shrink-0">
                <Wrench size={18} className="text-[var(--learn-ink-mute)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-base text-[var(--learn-ink)]">Lesson content coming soon</div>
                <p className="mt-1.5 text-sm text-[var(--learn-ink-dim)] leading-relaxed">
                  The walkthrough engine is wired up. The actual beats for this lesson land in PRs F-H. The lesson knows it&apos;ll use a {lesson.artifact.replace("-", " ")} artifact (PR E) and run about {lesson.estimateMin} minutes.
                </p>
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <LearnPill tone="warning">Artifacts: PR E</LearnPill>
                  <LearnPill tone="warning">Content: PR F-H</LearnPill>
                </div>
              </div>
            </div>
          </LearnCard>
          <div className="mt-8">
            <Link href={`/learn/precalc/u/${unit.id}`}>
              <LearnButton variant="secondary"><ArrowLeft size={14} /> Unit overview</LearnButton>
            </Link>
          </div>
        </LearnPage>
      </div>
    );
  }

  // Real lesson — open the player.
  return (
    <div className="learn-light">
      <LessonPlayer
        lessonId={lessonId}
        unitId={unit.id}
        unitTitle={`${unit.number} · ${unit.title}`}
        topicTitle={topic.title}
        lessonTitle={lesson.title}
        artifact={lesson.artifact}
        artifactInitial={lesson.artifactInitial}
        beats={lesson.beats}
        nextLessonId={nextLessonId}
      />
    </div>
  );
}
