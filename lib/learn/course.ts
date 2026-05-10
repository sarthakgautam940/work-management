// AP Precalc course — top-level definition.
//
// Each unit lives in its own file so content edits don't churn the
// course shape. PR F filled Unit 1; PRs G and H fill the rest.

import type { Course, Topic, Lesson, Unit } from "./types";
import { UNIT_1 } from "./units/unit-1";
import { UNIT_2 } from "./units/unit-2";
import { UNIT_3 } from "./units/unit-3";

export const PRECALC: Course = {
  id: "ap-precalc",
  label: "AP Precalculus",
  examDate: "2026-05-12",
  units: [UNIT_1, UNIT_2, UNIT_3],
};

// ──────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────

export function findUnit(courseId: string, unitId: string): Unit | undefined {
  if (courseId !== PRECALC.id) return undefined;
  return PRECALC.units.find((u) => u.id === unitId);
}

export function findLesson(
  courseId: string,
  lessonId: string,
): { unit: Unit; topic: Topic; lesson: Lesson } | undefined {
  if (courseId !== PRECALC.id) return undefined;
  for (const unit of PRECALC.units) {
    for (const topic of unit.topics) {
      const lesson = topic.lessons.find((l) => l.id === lessonId);
      if (lesson) return { unit, topic, lesson };
    }
  }
  return undefined;
}

export function unitTotals(unit: Unit) {
  let lessons = 0;
  let beats = 0;
  let estimateMin = 0;
  for (const topic of unit.topics) {
    for (const lesson of topic.lessons) {
      lessons++;
      beats += lesson.beats.length;
      estimateMin += lesson.estimateMin;
    }
  }
  return { lessons, beats, estimateMin };
}

export function courseTotals() {
  let lessons = 0;
  let beats = 0;
  let estimateMin = 0;
  for (const unit of PRECALC.units) {
    const t = unitTotals(unit);
    lessons += t.lessons;
    beats += t.beats;
    estimateMin += t.estimateMin;
  }
  return {
    units: PRECALC.units.length,
    topics: PRECALC.units.reduce((s, u) => s + u.topics.length, 0),
    lessons,
    beats,
    estimateMin,
  };
}
