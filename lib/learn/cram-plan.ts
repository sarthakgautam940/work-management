// 9-hour exam-eve cram plan (trimmed from original 12-hour version).
//
// User has already covered:
//   - Full unit circle (Unit 3 § 3.2) — memorized
//   - Sin/cos parent + concavity + cofunction shift (3.3 all 3)
//   - A/B/C/D mapping + reading-off-graph + protocol + tides (3.4 first 4)
//   - Transformations: vertical, horizontal, order of ops (1.7 — 3 of 5)
//   - Composition l2-4-1
//   - Tangent l3-5-1
//   - Trig equations base technique (+2πk, base angles)
//
// Pulled from CRAM_BLOCKS. Recorded in ALREADY_COVERED so the cram page
// auto-marks them complete in the store (so progress everywhere matches).

import { findLesson, PRECALC } from "./course";
import type { Lesson, Topic, Unit } from "./types";

export type CramLessonRef = {
  lessonId: string;
  note?: string;
};

export type CramBlock = {
  id: string;
  hours: [number, number];
  label: string;
  rationale: string;
  lessons: CramLessonRef[];
};

export type CramAux = {
  id: string;
  label: string;
  description: string;
  skipLessons?: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

// Lessons already covered earlier in the session (chat-taught, not
// app-completed). Auto-marked as done on cram-page mount.
export const ALREADY_COVERED: { lessonId: string; note: string }[] = [
  // Unit 3 — unit circle (memorized cold)
  { lessonId: "l3-2-1", note: "Memorized cold" },
  { lessonId: "l3-2-2", note: "Memorized cold" },
  { lessonId: "l3-2-3", note: "Memorized cold" },
  { lessonId: "l3-2-4", note: "Memorized cold" },
  { lessonId: "l3-2-5", note: "All 16 values memorized" },
  { lessonId: "l3-2-6", note: "ASTC memorized" },
  { lessonId: "l3-2-7", note: "Memorized cold" },
  // Unit 3 — sin/cos graphs + parent
  { lessonId: "l3-3-1", note: "Parent graphs known" },
  { lessonId: "l3-3-2", note: "Parent graphs known" },
  { lessonId: "l3-3-3", note: "Parent graphs known" },
  // Unit 3 — sinusoidal: ABCD, reading off graph, protocol, tides
  { lessonId: "l3-4-1", note: "Covered in chat — A/B/C/D decoder" },
  { lessonId: "l3-4-2", note: "Covered with Q1 + 3sin(2(x-π/4))-1 problem" },
  { lessonId: "l3-4-3", note: "Protocol drilled with Q1 + Q3" },
  { lessonId: "l3-4-4", note: "Tides + Ferris-wheel done in chat" },
  // Unit 1 — transformations (most of it)
  { lessonId: "l1-7-1", note: "A and D mechanics covered" },
  { lessonId: "l1-7-2", note: "Horizontal-is-backwards trap locked in" },
  { lessonId: "l1-7-5", note: "Factor-inside + order of ops covered" },
  // Unit 2 — composition
  { lessonId: "l2-4-1", note: "h(0) = f(g(0)) problem solved in chat" },
  // Unit 3 — tangent definition
  { lessonId: "l3-5-1", note: "Tangent parent + asymptote rule covered" },
];

// ──────────────────────────────────────────────────────────────────────
// Remaining blocks. Hours rescaled to fit the ~9 hours left from 2:46am.
// ──────────────────────────────────────────────────────────────────────

export const CRAM_BLOCKS: CramBlock[] = [
  {
    id: "b1",
    hours: [0, 2],
    label: "Unit 1 — rational + sign + multiplicity",
    rationale: "Three Unit 1 traps: HA degree cases, multiplicity behavior, sign analysis. Plus two transformation lessons not yet covered.",
    lessons: [
      // 1.7 remaining (reflections + range)
      { lessonId: "l1-7-3" },
      { lessonId: "l1-7-4" },
      // 1.4 rational asymptotes
      { lessonId: "l1-4-1", note: "The 3 degree cases — most common MCQ trap." },
      { lessonId: "l1-4-3" },
      // 1.3 multiplicity
      { lessonId: "l1-3-4", note: "Cross vs touch vs flat-cross. High-leverage for graph reading." },
      // 1.5 sign analysis
      { lessonId: "l1-5-3" },
    ],
  },
  {
    id: "b2",
    hours: [2, 4],
    label: "Unit 2 — log equations + inverses",
    rationale: "Log-domain trap is the most-trapped FRQ move. Inverses appear every year.",
    lessons: [
      { lessonId: "l2-7-5" },
      { lessonId: "l2-7-7", note: "Always domain-check. Extraneous solutions cost real points." },
      { lessonId: "l2-5-1" },
      { lessonId: "l2-5-2" },
      { lessonId: "l2-2-3" },
    ],
  },
  {
    id: "b3",
    hours: [4, 5],
    label: "Unit 3 — Pythagorean + inverse trig",
    rationale: "Three quick lessons. Pythagorean rearrangements show up in simplification problems. Inverse-trig ranges are 1 cheap MCQ point.",
    lessons: [
      { lessonId: "l3-8-1", note: "Pythagorean derivation only. Skip cofunction." },
      { lessonId: "l3-8-2", note: "Three rearrangements — memorize." },
      { lessonId: "l3-6-2", note: "Just the domain/range table." },
    ],
  },
];

export const CRAM_AUX: CramAux[] = [
  {
    id: "drill",
    label: "Hour 5–7 — Drill",
    description: "Mock S1A (28 MCQ, 80 min, no calc) → review every miss → flag for spaced rep. Then drill the practice bank with filters on your weakest unit.",
    ctaHref: "/learn/precalc/exam",
    ctaLabel: "Open mock exam",
  },
  {
    id: "review",
    label: "Hour 7–8 — Formula sweep",
    description: "Run through the spaced-review deck of due formula cards. Re-do the 5 hardest practice misses. No new material.",
    ctaHref: "/learn/precalc/review",
    ctaLabel: "Open review",
  },
  {
    id: "sleep",
    label: "Hour 8–9 — Wind down",
    description: "Stop touching the app. Eat. Set out pencils, calculator (radians mode!), and your school ID. Sleep at hour 9. Crammers past midnight on AP day score lower.",
  },
  {
    id: "skip",
    label: "Consciously skipped",
    description: "Low AP yield given your time budget. Reachable via the full course grid if you find time after the exam.",
    skipLessons: [
      // Unit 1 — extras outside the plan
      "l1-2-1", "l1-2-2", "l1-2-3",
      "l1-3-3", "l1-3-5",
      "l1-5-2", "l1-5-4",
      "l1-6-1", "l1-6-2", "l1-6-3", "l1-6-4",
      "l1-8-1", "l1-8-2", "l1-8-3", "l1-8-4",
      // Unit 2 — extras
      "l2-1-1", "l2-1-2", "l2-1-3", "l2-1-4",
      "l2-2-1", "l2-2-2", "l2-2-4",
      "l2-3-1", "l2-3-2", "l2-3-3", "l2-3-4",
      "l2-4-2", "l2-4-3",
      "l2-5-3", "l2-5-4",
      "l2-6-3", "l2-6-4",
      "l2-7-3", "l2-7-4", "l2-7-6",
      "l2-8-1", "l2-8-2", "l2-8-3",
      // Unit 3 — extras
      "l3-1-1", "l3-1-2",
      "l3-4-5", "l3-4-6", "l3-4-7", "l3-4-8",
      "l3-5-2", "l3-5-3",
      "l3-6-1", "l3-6-3", "l3-6-4", "l3-6-5",
      "l3-7-1", "l3-7-2", "l3-7-3", "l3-7-4", "l3-7-5", "l3-7-6",
      "l3-8-3", "l3-8-4", "l3-8-5", "l3-8-6", "l3-8-7", "l3-8-8",
      "l3-9-2", "l3-9-4", "l3-9-5", "l3-9-6", "l3-9-7", "l3-9-8", "l3-9-9",
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

export function nextUp(lessonsDone: Record<string, string>): { block: CramBlock; ref: CramLessonRef } | undefined {
  for (const block of CRAM_BLOCKS) {
    const ref = nextLessonInBlock(block, lessonsDone);
    if (ref) return { block, ref };
  }
  return undefined;
}

// Sentinel value used by the cram page to detect whether the pre-covered
// auto-mark has already run on this client. Bumped if the list changes.
export const ALREADY_COVERED_SENTINEL = "__autocovered_v1";
