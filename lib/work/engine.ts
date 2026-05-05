// Work Mode priority engine.
// Pure functions — given today's date and store state, return the ranked queue.

import { CLASSES, Task as SchoolTask } from "@/lib/data/school";
import { STUDY_LESSONS, EXAMS, Lesson } from "@/lib/data/study-modules";
import { SEMINAR_PREP, SOURCE_SLOTS } from "@/lib/data/big-idea";
import { PHASE_1_PRIORITIES } from "@/lib/data/business";
import { IBO_CHAPTERS, IBO_BOOKS, IBO_CASES } from "@/lib/data/ibo";
import { SAT_MATH, SAT_RW } from "@/lib/data/sat";
import { CLASS_LINKS, TASK_LINKS, LINKS } from "@/lib/work/links";

export type Category = "school" | "ap" | "business" | "olympiad" | "sat";
export type WorkType =
  | "school-task"
  | "ap-lesson"
  | "big-idea-prep"
  | "big-idea-source"
  | "uplevel-task"
  | "ibo-chapter"
  | "ibo-book"
  | "ibo-case"
  | "sat-module";

export type WorkItem = {
  id: string;
  type: WorkType;
  category: Category;
  title: string;
  detail?: string;
  className?: string;        // when category=school, the class short name
  due?: string;              // YYYY-MM-DD
  estimateMin?: number;
  gradeType?: "test" | "quiz" | "classwork" | "homework" | "project" | "study";
  overdue?: boolean;
  link?: string;             // external URL to open
  internalRoute?: string;    // in-app route (e.g., "/school")
  payload?: { lesson?: Lesson };  // typed extra data per type
  score: number;
};

export type Phase = "ap-week" | "school-only" | "olympiad" | "sat-only";

const DAY_MS = 86400000;

export function getPhase(today: Date): Phase {
  const ymd = (s: string) => new Date(s + "T00:00:00").getTime();
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  if (t.getTime() <= ymd("2026-05-12")) return "ap-week";
  if (t.getTime() <= ymd("2026-05-22")) return "school-only";
  if (t.getTime() <= ymd("2026-08-08")) return "olympiad";
  return "sat-only";
}

const PHASE_WEIGHTS: Record<Phase, Record<Category, number>> = {
  "ap-week":     { school: 1.00, ap: 0.85, business: 0.55, olympiad: 0.35, sat: 0.20 },
  "school-only": { school: 1.00, ap: 0.00, business: 0.60, olympiad: 0.70, sat: 0.40 },
  "olympiad":    { school: 0.00, ap: 0.00, business: 0.60, olympiad: 1.00, sat: 0.50 },
  "sat-only":    { school: 0.00, ap: 0.00, business: 1.00, olympiad: 0.00, sat: 1.00 },
};

const GRADE_WEIGHTS: Record<NonNullable<WorkItem["gradeType"]>, number> = {
  test: 1.50,
  project: 1.30,
  quiz: 1.25,
  homework: 1.05,
  classwork: 1.00,
  study: 1.10,
};

function daysUntil(date: string, today: Date): number {
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  const target = new Date(date + "T00:00:00").getTime();
  return Math.ceil((target - t.getTime()) / DAY_MS);
}

function urgency(item: { due?: string; overdue?: boolean }, today: Date): number {
  if (item.overdue) return 4.0;
  if (!item.due) return 1.0;
  const d = daysUntil(item.due, today);
  if (d < 0) return 4.0;
  if (d === 0) return 3.0;
  if (d === 1) return 2.5;
  if (d === 2) return 2.0;
  if (d <= 5) return 1.5;
  if (d <= 14) return 1.1;
  return 1.0;
}

function studyUrgency(examDate: string, today: Date): number {
  const d = daysUntil(examDate, today);
  if (d <= 0) return 5.0;
  if (d === 1) return 4.0;
  if (d === 2) return 3.0;
  if (d <= 5) return 2.0;
  if (d <= 7) return 1.5;
  if (d <= 14) return 1.2;
  return 0.9;
}

function score(item: Omit<WorkItem, "score">, today: Date, phase: Phase, skipCount = 0): number {
  const cat = PHASE_WEIGHTS[phase][item.category] ?? 0;
  const grade = GRADE_WEIGHTS[item.gradeType ?? "classwork"] ?? 1.0;
  const u = item.type === "ap-lesson" && item.payload?.lesson
    ? studyUrgency(EXAMS[item.payload.lesson.examId].date, today)
    : urgency(item, today);
  const skipPenalty = Math.pow(0.85, skipCount); // 3 skips ≈ 0.61x
  return cat * u * grade * skipPenalty;
}

type State = {
  schoolTasks: Record<string, boolean>;
  lessonDone: Record<string, boolean>;
  bigIdeaTasks: Record<string, boolean>;
  bigIdeaSourceState: Record<string, "pending" | "selected" | "annotated" | "approved">;
  uplevelTasks: Record<string, boolean>;
  iboChapters: Record<string, boolean>;
  iboBooks: Record<string, { complete: boolean; pages: number; total: number }>;
  iboCases: Record<string, boolean>;
  satModules: Record<string, boolean>;
  workDeferred: Record<string, number>;
  workSkipped: Record<string, number>;
};

export function buildQueue(today: Date, state: State): WorkItem[] {
  const phase = getPhase(today);
  const items: Array<Omit<WorkItem, "score">> = [];

  // ── School tasks ────────────────────────────────────────────────
  CLASSES.forEach((cls) => {
    cls.tasks.forEach((t: SchoolTask) => {
      const done = state.schoolTasks[t.id] ?? t.defaultDone ?? false;
      if (done) return;
      items.push({
        id: t.id,
        type: "school-task",
        category: "school",
        title: t.title,
        detail: t.details,
        className: cls.short,
        due: t.due,
        estimateMin: t.estimate,
        gradeType: t.grade,
        overdue: t.overdue,
        link: TASK_LINKS[t.id] ?? CLASS_LINKS[cls.id] ?? LINKS.schoology,
        internalRoute: "/school",
      });
    });
  });

  // ── Big Idea seminar prep ───────────────────────────────────────
  SEMINAR_PREP.forEach((p) => {
    if (state.bigIdeaTasks[p.id]) return;
    items.push({
      id: `bi-${p.id}`,
      type: "big-idea-prep",
      category: "school",
      title: `Big Idea seminar — ${p.label}`,
      detail: p.detail,
      className: "English",
      due: "2026-05-05",
      estimateMin: p.estimateMin,
      gradeType: "quiz",
      internalRoute: "/school",
    });
  });

  // ── Big Idea sources (only surface the next-due un-annotated one) ─
  SOURCE_SLOTS.forEach((s) => {
    const st = state.bigIdeaSourceState[s.id] ?? "pending";
    if (st === "annotated" || st === "approved") return;
    items.push({
      id: `bi-src-${s.id}`,
      type: "big-idea-source",
      category: "school",
      title: `Big Idea ${s.kind} — ${st}`,
      detail: s.detail,
      className: "English",
      due: s.due,
      estimateMin: 30,
      gradeType: "project",
      internalRoute: "/school",
    });
  });

  // ── AP study lessons (only surface the next un-done lesson per exam) ─
  (["ap-macro", "ap-precalc"] as const).forEach((examId) => {
    const lessons = STUDY_LESSONS.filter((l) => l.examId === examId);
    const nextUndone = lessons.find((l) => !state.lessonDone[l.id]);
    if (!nextUndone) return;
    items.push({
      id: `lesson-${nextUndone.id}`,
      type: "ap-lesson",
      category: "ap",
      title: `${EXAMS[examId].label} — ${nextUndone.title}`,
      detail: nextUndone.unit,
      due: EXAMS[examId].date,
      estimateMin: nextUndone.estimateMin,
      gradeType: "study",
      internalRoute: "/work",
      payload: { lesson: nextUndone },
    });
  });

  // ── UpLevel (business) ──────────────────────────────────────────
  PHASE_1_PRIORITIES.forEach((p) => {
    const done = state.uplevelTasks[p.id] ?? p.done ?? false;
    if (done) return;
    items.push({
      id: `up-${p.id}`,
      type: "uplevel-task",
      category: "business",
      title: p.label,
      detail: p.detail,
      estimateMin: p.urgent ? 60 : 45,
      gradeType: "project",
      internalRoute: "/business",
    });
  });

  // ── IBO (olympiad) — only the next 1 chapter and 1 case ────────
  const nextIboChapter = IBO_CHAPTERS.find((c) => !state.iboChapters[c.id]);
  if (nextIboChapter) {
    items.push({
      id: `ibo-ch-${nextIboChapter.id}`,
      type: "ibo-chapter",
      category: "olympiad",
      title: `IBO Ch ${nextIboChapter.number} — ${nextIboChapter.title}`,
      detail: nextIboChapter.range,
      estimateMin: 60,
      gradeType: "study",
      internalRoute: "/ibo",
    });
  }
  const nextIboCase = IBO_CASES.find((c) => !state.iboCases[c.id]);
  if (nextIboCase) {
    items.push({
      id: `ibo-case-${nextIboCase.id}`,
      type: "ibo-case",
      category: "olympiad",
      title: `IBO case — ${nextIboCase.title}`,
      detail: nextIboCase.detail,
      estimateMin: 45,
      gradeType: "study",
      internalRoute: "/ibo",
    });
  }
  const nextIboBook = IBO_BOOKS.find((b) => !state.iboBooks[b.id]?.complete);
  if (nextIboBook && phase !== "ap-week") {
    items.push({
      id: `ibo-bk-${nextIboBook.id}`,
      type: "ibo-book",
      category: "olympiad",
      title: `IBO book — ${nextIboBook.title}`,
      detail: nextIboBook.author,
      estimateMin: 90,
      gradeType: "study",
      internalRoute: "/ibo",
    });
  }

  // ── SAT — next module ───────────────────────────────────────────
  const nextSatMath = SAT_MATH.find((m) => !state.satModules[m.id]);
  if (nextSatMath) {
    items.push({
      id: `sat-${nextSatMath.id}`,
      type: "sat-module",
      category: "sat",
      title: `SAT Math — ${nextSatMath.title}`,
      detail: nextSatMath.detail,
      estimateMin: nextSatMath.hours * 60,
      gradeType: "study",
      internalRoute: "/sat",
    });
  }
  const nextSatRw = SAT_RW.find((m) => !state.satModules[m.id]);
  if (nextSatRw) {
    items.push({
      id: `sat-${nextSatRw.id}`,
      type: "sat-module",
      category: "sat",
      title: `SAT R+W — ${nextSatRw.title}`,
      detail: nextSatRw.detail,
      estimateMin: nextSatRw.hours * 60,
      gradeType: "study",
      internalRoute: "/sat",
    });
  }

  // ── Apply deferred filter + score ────────────────────────────────
  const now = today.getTime();
  const filtered = items.filter((it) => {
    const until = state.workDeferred[it.id];
    return !until || until < now;
  });

  const scored: WorkItem[] = filtered.map((it) => ({
    ...it,
    score: score(it, today, phase, state.workSkipped[it.id] || 0),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

export function summarize(queue: WorkItem[]): { count: number; minutes: number } {
  return {
    count: queue.length,
    minutes: queue.reduce((s, it) => s + (it.estimateMin || 0), 0),
  };
}
