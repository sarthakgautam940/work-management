"use client";

// LessonPlayer — walks a student through a lesson, one beat at a time.
//
// State model:
//   - currentIdx: which beat is on screen
//   - completed[idx]: true once the beat's interaction is cleared (or
//     immediately for passive beats)
//   - artifactState: merged state derived from the current beat's
//     `artifact` field on top of the lesson's `artifactInitial`
//
// Persistence:
//   - learnBeatDone[`${courseId}.${lessonId}.${idx}`] is written whenever
//     a beat completes
//   - learnLastLesson[courseId] is updated on lesson open
//   - learnLessonDone[lessonId] is set when the user finishes the last beat

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Flag } from "lucide-react";
import type { Beat, ArtifactState, ArtifactKind } from "@/lib/learn/types";
import { useStore } from "@/lib/store";
import { ArtifactHost } from "./artifact-host";
import { BeatRenderer, isInteractive } from "./beats";
import { LearnButton } from "./primitives";

const COURSE_ID = "ap-precalc";

export function LessonPlayer({
  lessonId,
  unitId,
  unitTitle,
  topicTitle,
  lessonTitle,
  artifact,
  artifactInitial = {},
  beats,
  nextLessonId,
}: {
  lessonId: string;
  unitId: string;
  unitTitle: string;
  topicTitle: string;
  lessonTitle: string;
  artifact: ArtifactKind;
  artifactInitial?: ArtifactState;
  beats: Beat[];
  nextLessonId?: string;
}) {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [interactionCleared, setInteractionCleared] = useState<Record<number, boolean>>({});
  const beatDone = useStore((s) => s.learnBeatDone);
  const setBeatDone = useStore((s) => s.setLearnBeatDone);
  const setLessonDone = useStore((s) => s.setLearnLessonDone);
  const setLastLesson = useStore((s) => s.setLearnLastLesson);
  const flagged = useStore((s) => s.learnFlagged);
  const setFlag = useStore((s) => s.setLearnFlag);

  // Mark this lesson as the last visited.
  useEffect(() => {
    setLastLesson(COURSE_ID, lessonId);
  }, [lessonId, setLastLesson]);

  // Restore progress: skip ahead to the first un-done beat on first mount.
  useEffect(() => {
    let resume = 0;
    for (let i = 0; i < beats.length; i++) {
      const key = `${COURSE_ID}.${lessonId}.${i}`;
      if (beatDone[key]) resume = i + 1;
      else break;
    }
    setCurrentIdx(Math.min(resume, beats.length - 1));
    // Pre-mark passive beats already complete based on persisted state.
    const cleared: Record<number, boolean> = {};
    beats.forEach((b, i) => {
      if (beatDone[`${COURSE_ID}.${lessonId}.${i}`]) cleared[i] = true;
    });
    setInteractionCleared(cleared);
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beat = beats[currentIdx];
  const totalBeats = beats.length;
  const progress = totalBeats > 0 ? ((currentIdx + 1) / totalBeats) * 100 : 0;
  const beatKey = `${COURSE_ID}.${lessonId}.${currentIdx}`;
  const beatId = beat?.id ?? beatKey;
  const isFlagged = !!flagged[beatId];

  // Artifact state is the lesson initial overlaid with the current beat's
  // artifact field. Each beat gets a clean merge — beats don't accumulate.
  const artifactState: ArtifactState = useMemo(
    () => ({ ...artifactInitial, ...(beat?.artifact ?? {}) }),
    [artifactInitial, beat],
  );

  // For passive beats, mark complete on first render of that beat.
  useEffect(() => {
    if (!beat) return;
    if (!isInteractive(beat) && !interactionCleared[currentIdx]) {
      handleComplete();
    }
    // run when the beat changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  const handleComplete = () => {
    setBeatDone(`${COURSE_ID}.${lessonId}.${currentIdx}`, true);
    setInteractionCleared((c) => ({ ...c, [currentIdx]: true }));
  };

  const canAdvance = !beat || !isInteractive(beat) || interactionCleared[currentIdx];

  const goNext = () => {
    if (!canAdvance) return;
    if (currentIdx < beats.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      // Last beat — mark lesson done and show end card.
      setLessonDone(lessonId, true);
      setCurrentIdx((i) => i + 1); // off-by-one signals "lesson complete"
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  };

  // End card after the last beat
  const lessonComplete = currentIdx >= beats.length;

  // No beats yet — let parent route handle it.
  if (beats.length === 0) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-[var(--learn-bg)]/90 backdrop-blur-sm border-b border-[var(--learn-line)]">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-3.5 flex items-center gap-4">
          <Link
            href={`/learn/precalc/u/${unitId}`}
            className="inline-flex items-center gap-1.5 text-sm text-[var(--learn-ink-mute)] hover:text-[var(--learn-ink)] transition-colors shrink-0"
          >
            <ArrowLeft size={14} /> Back
          </Link>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-[var(--learn-ink-mute)] truncate">
              Unit {unitTitle.split(" ")[0]} · {topicTitle}
            </div>
            <div className="text-sm font-medium text-[var(--learn-ink)] truncate">{lessonTitle}</div>
          </div>
          <button
            onClick={() => setFlag(beatId, !isFlagged)}
            className={`p-2 rounded-md transition-colors ${
              isFlagged
                ? "text-amber-600 bg-amber-50"
                : "text-[var(--learn-ink-mute)] hover:text-[var(--learn-ink)] hover:bg-[var(--learn-elevated)]"
            }`}
            aria-label={isFlagged ? "Remove flag" : "Flag for review"}
          >
            <Flag size={14} />
          </button>
        </div>
        <div className="max-w-5xl mx-auto px-5 lg:px-8 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1 rounded-full bg-[var(--learn-line)] overflow-hidden">
              <motion.div
                className="h-full bg-[var(--learn-accent)]"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="font-mono text-xs tabular-nums text-[var(--learn-ink-mute)] shrink-0">
              {Math.min(currentIdx + 1, beats.length)} / {beats.length}
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-5 lg:px-8 py-8 lg:py-12">
        {lessonComplete ? (
          <LessonComplete
            lessonTitle={lessonTitle}
            unitId={unitId}
            nextLessonId={nextLessonId}
          />
        ) : (
          <div className="grid lg:grid-cols-[1fr_minmax(0,440px)] gap-8 lg:gap-12 items-start">
            {/* Beat narration column */}
            <div className="order-2 lg:order-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <BeatRenderer
                    beat={beat}
                    beatKey={beatKey}
                    onComplete={handleComplete}
                    isComplete={!!interactionCleared[currentIdx]}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Artifact column */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-32">
              <ArtifactHost kind={artifact} state={artifactState} focus={beat?.focus} />
            </div>
          </div>
        )}
      </main>

      {/* Bottom nav */}
      {!lessonComplete && (
        <footer className="sticky bottom-0 z-20 bg-[var(--learn-bg)]/90 backdrop-blur-sm border-t border-[var(--learn-line)]">
          <div className="max-w-5xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
            <LearnButton
              variant="ghost"
              onClick={goPrev}
              disabled={currentIdx === 0}
            >
              <ArrowLeft size={14} /> Back
            </LearnButton>
            <LearnButton
              size="lg"
              onClick={goNext}
              disabled={!canAdvance}
            >
              {currentIdx === beats.length - 1 ? "Finish" : "Next"}
              {canAdvance ? <ArrowRight size={16} /> : null}
            </LearnButton>
          </div>
        </footer>
      )}
    </div>
  );
}

function LessonComplete({
  lessonTitle, unitId, nextLessonId,
}: {
  lessonTitle: string;
  unitId: string;
  nextLessonId?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center pt-12"
    >
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6">
        <Check size={28} className="text-emerald-600" />
      </div>
      <div className="text-sm font-medium uppercase tracking-wide text-emerald-700 mb-2">
        Lesson complete
      </div>
      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-[var(--learn-ink)] mb-3">
        {lessonTitle}
      </h1>
      <p className="text-base text-[var(--learn-ink-dim)] leading-relaxed mb-8">
        Saved. Take a breath, then keep going.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link href={`/learn/precalc/u/${unitId}`}>
          <LearnButton variant="secondary">Unit overview</LearnButton>
        </Link>
        {nextLessonId && (
          <Link href={`/learn/precalc/lesson/${nextLessonId}`}>
            <LearnButton size="lg">
              Next lesson <ArrowRight size={16} />
            </LearnButton>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
