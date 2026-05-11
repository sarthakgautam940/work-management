// 12-hour exam-eve cram plan. Hand-picked sequence of lessons grouped
// into time blocks, prioritized by AP exam yield.
//
// This is a VIEW over the full course — every lesson here already exists
// in lib/learn/units/. Nothing duplicated; nothing rewritten. The cram
// page reads this and surfaces lessons in the order specified.

import { findLesson, PRECALC } from "./course";
import type { Lesson, Topic, Unit } from "./types";

export type CramLessonRef = {
  lessonId: string;
  // Optional note shown on the row: "just learn the protocol",
  // "Pythagorean only", etc. Used when the full lesson is more than
  // the cram strategy calls for.
  note?: string;
};

export type CramBlock = {
  id: string;
  hours: [number, number]; // hour-from-start range, e.g. [0, 4]
  label: string;
  // Why this block matters. One sentence.
  rationale: string;
  lessons: CramLessonRef[];
};

export type CramAux = {
  id: string;
  label: string;
  description: string;
  // Lesson ids that are explicitly NOT in the plan. Shown as a Skip list
  // so the user knows what they're consciously choosing to drop.
  skipLessons?: string[];
  // Optional URL action (used for the practice-drill block).
  ctaHref?: string;
  ctaLabel?: string;
};

export const CRAM_BLOCKS: CramBlock[] = [
  {
    id: "b1",
    hours: [0, 4],
    label: "Unit 3 core — highest yield",
    rationale: "Unit circle unlocks everything else in Unit 3. Sinusoidal modeling is the biggest FRQ topic. Lock these first.",
    lessons: [
      // 3.2 Unit circle — all 7
      { lessonId: "l3-2-1" },
      { lessonId: "l3-2-2" },
      { lessonId: "l3-2-3" },
      { lessonId: "l3-2-4" },
      { lessonId: "l3-2-5", note: "Memorize all 16 values cold. Non-negotiable." },
      { lessonId: "l3-2-6" },
      { lessonId: "l3-2-7" },
      // 3.3 Sin & cos graphs — all 3 (light)
      { lessonId: "l3-3-1" },
      { lessonId: "l3-3-2" },
      { lessonId: "l3-3-3" },
      // 3.4 Sinusoidal modeling — 4 of 8
      { lessonId: "l3-4-1" },
      { lessonId: "l3-4-2" },
      { lessonId: "l3-4-3", note: "Just the protocol — memorize the 4 steps." },
      { lessonId: "l3-4-4", note: "Tides is the most common scenario. Skip the rest." },
    ],
  },
  {
    id: "b2",
    hours: [4, 7],
    label: "Unit 1 heavy hitters",
    rationale: "Transformations are tested every year. HA cases trap students. Multiplicity is one cheap MCQ point.",
    lessons: [
      // 1.7 Transformations — all 5
      { lessonId: "l1-7-1" },
      { lessonId: "l1-7-2", note: "The 'horizontal is backwards' trap — own this one." },
      { lessonId: "l1-7-3" },
      { lessonId: "l1-7-4" },
      { lessonId: "l1-7-5" },
      // 1.4 Rational asymptotes — HA + slant
      { lessonId: "l1-4-1", note: "The 3 degree cases — most common MCQ trap." },
      { lessonId: "l1-4-3" },
      // 1.3 Multiplicity
      { lessonId: "l1-3-4", note: "Cross vs touch vs flat-cross. High-leverage for graph reading." },
      // 1.5 Sign analysis on number line
      { lessonId: "l1-5-3" },
    ],
  },
  {
    id: "b3",
    hours: [7, 10],
    label: "Unit 2 essentials",
    rationale: "Log-equation domain check is the most-trapped FRQ move. Inverse + composition appear on every exam.",
    lessons: [
      // 2.7 — 2 critical lessons
      { lessonId: "l2-7-5" },
      { lessonId: "l2-7-7", note: "Always domain-check. Extraneous solutions cost real points." },
      // 2.4 Composition
      { lessonId: "l2-4-1" },
      // 2.5 Inverse — HLT + algebraic
      { lessonId: "l2-5-1" },
      { lessonId: "l2-5-2" },
      // 2.2 Exponent rules
      { lessonId: "l2-2-3" },
    ],
  },
  {
    id: "b4",
    hours: [10, 11],
    label: "Unit 3 extras",
    rationale: "Pythagorean identities. Tangent basics. Inverse-trig domain/range only.",
    lessons: [
      // 3.8 Pythagorean only
      { lessonId: "l3-8-1", note: "Pythagorean derivation only. Skip cofunction." },
      { lessonId: "l3-8-2", note: "Three rearrangements — memorize." },
      // 3.5 Tangent
      { lessonId: "l3-5-1", note: "Period π + asymptote rule. Skip the other two tangent lessons." },
      // 3.6 Inverse trig — domains/ranges only
      { lessonId: "l3-6-2", note: "Just the domain/range table. The rest can wait." },
    ],
  },
];

export const CRAM_AUX: CramAux[] = [
  {
    id: "b5",
    label: "Hour 11–12 — Drill flagged misses",
    description: "Re-do the 5 hardest practice problems you got wrong earlier today. No new material. Eat. Sleep at hour 12.",
    ctaHref: "/learn/precalc/practice",
    ctaLabel: "Open practice bank",
  },
  {
    id: "skip",
    label: "Consciously skipped",
    description: "Low AP yield given your time budget. These exist in the course if you find time after the exam, but don't open them tonight.",
    skipLessons: [
      // 2.1 Sequences (rarely tested)
      "l2-1-1", "l2-1-2", "l2-1-3", "l2-1-4",
      // 2.8 Log modeling (rare)
      "l2-8-1", "l2-8-2", "l2-8-3",
      // 3.7 Trig equations (some tested, but survivable with unit circle + algebra)
      "l3-7-1", "l3-7-2", "l3-7-3", "l3-7-4", "l3-7-5", "l3-7-6",
      // 3.9 Polar (≤1 question per exam)
      "l3-9-2", "l3-9-4", "l3-9-5", "l3-9-6", "l3-9-7", "l3-9-8", "l3-9-9",
      // 3.8 (rest of identities — sum/diff/double-angle/cofunction/reflections/drill)
      "l3-8-3", "l3-8-4", "l3-8-5", "l3-8-6", "l3-8-7", "l3-8-8",
      // 3.4 (remaining sinusoidal scenarios)
      "l3-4-5", "l3-4-6", "l3-4-7", "l3-4-8",
      // Unit 1 extras
      "l1-2-1", "l1-2-2", "l1-2-3",
      "l1-3-3", "l1-3-5",
      "l1-5-2", "l1-5-4",
      "l1-6-1", "l1-6-2", "l1-6-3", "l1-6-4",
      "l1-8-1", "l1-8-2", "l1-8-3", "l1-8-4",
      // Unit 2 extras
      "l2-2-1", "l2-2-2", "l2-2-4",
      "l2-3-1", "l2-3-2", "l2-3-3", "l2-3-4",
      "l2-4-2", "l2-4-3",
      "l2-5-3", "l2-5-4",
      "l2-6-3", "l2-6-4",
      "l2-7-3", "l2-7-4", "l2-7-6",
      // Unit 3 extras
      "l3-1-1", "l3-1-2",
      "l3-5-2", "l3-5-3",
      "l3-6-1", "l3-6-3", "l3-6-4", "l3-6-5",
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────

export type ResolvedCramLesson = {
  ref: CramLessonRef;
  lesson: Lesson;
  topic: Topic;
  unit: Unit;
};

export function resolveCramLesson(ref: CramLessonRef): ResolvedCramLesson | null {
  const found = findLesson(PRECALC.id, ref.lessonId);
  if (!found) return null;
  return { ref, ...found };
}

export function blockEstimateMin(block: CramBlock): number {
  return block.lessons.reduce((sum, ref) => {
    const r = resolveCramLesson(ref);
    return sum + (r?.lesson.estimateMin ?? 0);
  }, 0);
}

export function blockTotals(block: CramBlock, lessonsDone: Record<string, string>): { done: number; total: number } {
  const total = block.lessons.length;
  const done = block.lessons.filter((ref) => lessonsDone[ref.lessonId]).length;
  return { done, total };
}

export function planTotals(lessonsDone: Record<string, string>): { lessons: number; done: number; minutes: number } {
  const lessons = CRAM_BLOCKS.reduce((s, b) => s + b.lessons.length, 0);
  const done = CRAM_BLOCKS.reduce((s, b) => s + blockTotals(b, lessonsDone).done, 0);
  const minutes = CRAM_BLOCKS.reduce((s, b) => s + blockEstimateMin(b), 0);
  return { lessons, done, minutes };
}

export function nextLessonInBlock(block: CramBlock, lessonsDone: Record<string, string>): CramLessonRef | undefined {
  return block.lessons.find((ref) => !lessonsDone[ref.lessonId]);
}

// Find the first block that has un-done lessons; its first un-done lesson
// is the global "next up".
export function nextUp(lessonsDone: Record<string, string>): { block: CramBlock; ref: CramLessonRef } | undefined {
  for (const block of CRAM_BLOCKS) {
    const ref = nextLessonInBlock(block, lessonsDone);
    if (ref) return { block, ref };
  }
  return undefined;
}
