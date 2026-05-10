// AP Precalc course — top-level scaffold.
//
// PR C ships the empty unit/topic skeleton so the dashboard, unit pages,
// and route stubs can render real titles and counts. Lesson `beats` are
// filled in PRs F-H (one PR per unit).

import type { Course, Unit } from "./types";

// ──────────────────────────────────────────────────────────────────────
// Unit 1 — Polynomial & Rational Functions (30-40%)
// ──────────────────────────────────────────────────────────────────────

const UNIT_1: Unit = {
  id: "u1",
  number: 1,
  title: "Polynomial & Rational Functions",
  examWeight: "30–40%",
  coreIdeas: [
    "Co-variation and rate of change",
    "Polynomial structure: degree, zeros, end behavior",
    "Rational functions: asymptotes, holes, sign behavior",
  ],
  topics: [
    { id: "t1-1", title: "Rate of Change", blurb: "Average rate of change. Increasing × concavity. Reading behavior off graphs.", lessons: [
      { id: "l1-1-1", title: "Average Rate of Change", estimateMin: 6, artifact: "coordinate-plane", beats: [] },
      { id: "l1-1-2", title: "Increasing × Concavity — the four phrases", estimateMin: 8, artifact: "coordinate-plane", beats: [] },
      { id: "l1-1-3", title: "Reading behavior from a graph", estimateMin: 6, artifact: "coordinate-plane", beats: [] },
    ]},
    { id: "t1-2", title: "Linear, Quadratic, Polynomial Differences", blurb: "Detect degree from a table.", lessons: [
      { id: "l1-2-1", title: "Linear ARC is constant", estimateMin: 5, artifact: "function-table", beats: [] },
      { id: "l1-2-2", title: "Quadratic = constant 2nd differences", estimateMin: 7, artifact: "function-table", beats: [] },
      { id: "l1-2-3", title: "Polynomial degree from differences", estimateMin: 6, artifact: "function-table", beats: [] },
    ]},
    { id: "t1-3", title: "Polynomial Structure", blurb: "Degree, end behavior, zeros, multiplicity.", lessons: [
      { id: "l1-3-1", title: "Degree, leading coefficient, constant term", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
      { id: "l1-3-2", title: "End behavior — the 4 cases", estimateMin: 8, artifact: "coordinate-plane", beats: [] },
      { id: "l1-3-3", title: "Real and complex zeros, conjugate pairs", estimateMin: 7, artifact: "algebra-ladder", beats: [] },
      { id: "l1-3-4", title: "Multiplicity — cross / touch / flat-cross", estimateMin: 6, artifact: "coordinate-plane", beats: [] },
      { id: "l1-3-5", title: "Even and odd functions", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
    ]},
    { id: "t1-4", title: "Rational Functions: Asymptotes", blurb: "Horizontal, vertical, slant.", lessons: [
      { id: "l1-4-1", title: "Horizontal asymptote — three degree cases", estimateMin: 7, artifact: "coordinate-plane", beats: [] },
      { id: "l1-4-2", title: "Vertical asymptotes", estimateMin: 6, artifact: "coordinate-plane", beats: [] },
      { id: "l1-4-3", title: "Slant asymptotes via division", estimateMin: 7, artifact: "algebra-ladder", beats: [] },
    ]},
    { id: "t1-5", title: "Holes, Zeros, Sign Analysis", blurb: "Disambiguate hole / zero / VA.", lessons: [
      { id: "l1-5-1", title: "Holes vs zeros vs VAs", estimateMin: 7, artifact: "algebra-ladder", beats: [] },
      { id: "l1-5-2", title: "Hole y-coordinate via limit notation", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
      { id: "l1-5-3", title: "Sign analysis on a number line", estimateMin: 6, artifact: "number-line", beats: [] },
      { id: "l1-5-4", title: "Domain of h/g", estimateMin: 4, artifact: "number-line", beats: [] },
    ]},
    { id: "t1-6", title: "Equivalent Representations", blurb: "Standard, factored, vertex form. Division.", lessons: [
      { id: "l1-6-1", title: "Standard ↔ factored ↔ vertex", estimateMin: 6, artifact: "algebra-ladder", beats: [] },
      { id: "l1-6-2", title: "Polynomial long division", estimateMin: 7, artifact: "algebra-ladder", beats: [] },
      { id: "l1-6-3", title: "Synthetic division", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
      { id: "l1-6-4", title: "Remainder and factor theorems", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
    ]},
    { id: "t1-7", title: "Transformations", blurb: "a, b, h, k mechanics. Range under transformation.", lessons: [
      { id: "l1-7-1", title: "Vertical shifts and dilations", estimateMin: 6, artifact: "coordinate-plane", beats: [] },
      { id: "l1-7-2", title: "Horizontal shifts and dilations", estimateMin: 8, artifact: "coordinate-plane", beats: [] },
      { id: "l1-7-3", title: "Reflections", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
      { id: "l1-7-4", title: "Range under transformations", estimateMin: 5, artifact: "function-table", beats: [] },
      { id: "l1-7-5", title: "Order of operations on transformations", estimateMin: 6, artifact: "algebra-ladder", beats: [] },
    ]},
    { id: "t1-8", title: "Modeling", blurb: "Pick the right model. Residuals. Quadratic from 3 points.", lessons: [
      { id: "l1-8-1", title: "Function model selection", estimateMin: 7, artifact: "function-table", beats: [] },
      { id: "l1-8-2", title: "Residual plots", estimateMin: 5, artifact: "comparison", beats: [] },
      { id: "l1-8-3", title: "Quadratic from 3 points", estimateMin: 7, artifact: "algebra-ladder", beats: [] },
      { id: "l1-8-4", title: "Direct and inverse proportion", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
    ]},
  ],
};

// ──────────────────────────────────────────────────────────────────────
// Unit 2 — Exponential & Logarithmic Functions (27-40%)
// ──────────────────────────────────────────────────────────────────────

const UNIT_2: Unit = {
  id: "u2",
  number: 2,
  title: "Exponential & Logarithmic Functions",
  examWeight: "27–40%",
  coreIdeas: [
    "Sequences ↔ functions: arithmetic ↔ linear, geometric ↔ exponential",
    "Exp and log are inverses — every property mirrors",
    "Composition and inversion bind everything",
  ],
  topics: [
    { id: "t2-1", title: "Sequences", lessons: [
      { id: "l2-1-1", title: "Arithmetic sequences", estimateMin: 5, artifact: "sequence-list", beats: [] },
      { id: "l2-1-2", title: "Geometric sequences", estimateMin: 5, artifact: "sequence-list", beats: [] },
      { id: "l2-1-3", title: "Recursive vs explicit form", estimateMin: 5, artifact: "sequence-list", beats: [] },
      { id: "l2-1-4", title: "Sequences ↔ functions", estimateMin: 6, artifact: "comparison", beats: [] },
    ]},
    { id: "t2-2", title: "Exponential Functions", lessons: [
      { id: "l2-2-1", title: "Form ab^x, growth vs decay", estimateMin: 6, artifact: "coordinate-plane", beats: [] },
      { id: "l2-2-2", title: "Properties — domain, range, asymptote", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
      { id: "l2-2-3", title: "Exponent rules — drill", estimateMin: 8, artifact: "algebra-ladder", beats: [] },
      { id: "l2-2-4", title: "Standard rewrites", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
    ]},
    { id: "t2-3", title: "Exponential Modeling", lessons: [
      { id: "l2-3-1", title: "Doubling time", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
      { id: "l2-3-2", title: "Half-life", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
      { id: "l2-3-3", title: "Continuous percent rate", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
      { id: "l2-3-4", title: "Converting time units", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
    ]},
    { id: "t2-4", title: "Composition", lessons: [
      { id: "l2-4-1", title: "f(g(x)) from formulas", estimateMin: 6, artifact: "algebra-ladder", beats: [] },
      { id: "l2-4-2", title: "Composition from tables and graphs", estimateMin: 6, artifact: "function-table", beats: [] },
      { id: "l2-4-3", title: "Decomposition", estimateMin: 4, artifact: "algebra-ladder", beats: [] },
    ]},
    { id: "t2-5", title: "Inverse Functions", lessons: [
      { id: "l2-5-1", title: "Definition + horizontal line test", estimateMin: 6, artifact: "coordinate-plane", beats: [] },
      { id: "l2-5-2", title: "Algebraic inversion", estimateMin: 8, artifact: "algebra-ladder", beats: [] },
      { id: "l2-5-3", title: "Inverse from table or graph", estimateMin: 5, artifact: "function-table", beats: [] },
      { id: "l2-5-4", title: "Restricting domain for invertibility", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
    ]},
    { id: "t2-6", title: "Logarithms", lessons: [
      { id: "l2-6-1", title: "Definition (logarithm = exponent)", estimateMin: 6, artifact: "algebra-ladder", beats: [] },
      { id: "l2-6-2", title: "Natural log, common log", estimateMin: 4, artifact: "algebra-ladder", beats: [] },
      { id: "l2-6-3", title: "Inverse relationship visualized", estimateMin: 6, artifact: "comparison", beats: [] },
      { id: "l2-6-4", title: "Special values + identities", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
    ]},
    { id: "t2-7", title: "Log/Exp Manipulation & Equations", lessons: [
      { id: "l2-7-1", title: "Log rules — product, quotient, power", estimateMin: 8, artifact: "algebra-ladder", beats: [] },
      { id: "l2-7-2", title: "Combining and expanding logs", estimateMin: 6, artifact: "algebra-ladder", beats: [] },
      { id: "l2-7-3", title: "Change of base", estimateMin: 4, artifact: "algebra-ladder", beats: [] },
      { id: "l2-7-4", title: "Strategy: matching bases", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
      { id: "l2-7-5", title: "Strategy: taking log of both sides", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
      { id: "l2-7-6", title: "Strategy: substitute u = b^x", estimateMin: 6, artifact: "algebra-ladder", beats: [] },
      { id: "l2-7-7", title: "Solving log equations + the domain trap", estimateMin: 7, artifact: "algebra-ladder", beats: [] },
    ]},
    { id: "t2-8", title: "Logarithmic Modeling", lessons: [
      { id: "l2-8-1", title: "Identifying log model from data", estimateMin: 6, artifact: "function-table", beats: [] },
      { id: "l2-8-2", title: "Building a log model", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
      { id: "l2-8-3", title: "Semi-log plots", estimateMin: 5, artifact: "comparison", beats: [] },
    ]},
  ],
};

// ──────────────────────────────────────────────────────────────────────
// Unit 3 — Trigonometric & Polar Functions (30-35%)
// ──────────────────────────────────────────────────────────────────────

const UNIT_3: Unit = {
  id: "u3",
  number: 3,
  title: "Trigonometric & Polar Functions",
  examWeight: "30–35%",
  coreIdeas: [
    "Trig functions encode periodic behavior",
    "Polar coordinates make rotation natural",
    "A small library of identities applied as reflex",
  ],
  topics: [
    { id: "t3-1", title: "Periodic Foundations", lessons: [
      { id: "l3-1-1", title: "What 'periodic' means", estimateMin: 4, artifact: "coordinate-plane", beats: [] },
      { id: "l3-1-2", title: "Amplitude, midline, period, frequency, phase", estimateMin: 7, artifact: "coordinate-plane", beats: [] },
    ]},
    { id: "t3-2", title: "The Unit Circle", lessons: [
      { id: "l3-2-1", title: "Radians vs degrees", estimateMin: 6, artifact: "unit-circle", beats: [] },
      { id: "l3-2-2", title: "Sin and cos as unit-circle coordinates", estimateMin: 8, artifact: "unit-circle", beats: [] },
      { id: "l3-2-3", title: "Tangent as sin/cos", estimateMin: 5, artifact: "unit-circle", beats: [] },
      { id: "l3-2-4", title: "Exact values for π/6, π/4, π/3", estimateMin: 7, artifact: "triangle", beats: [] },
      { id: "l3-2-5", title: "All 16 unit-circle values", estimateMin: 10, artifact: "unit-circle", beats: [] },
      { id: "l3-2-6", title: "Quadrant signs (ASTC)", estimateMin: 5, artifact: "unit-circle", beats: [] },
      { id: "l3-2-7", title: "Sin/cos for non-unit-radius circles", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
    ]},
    { id: "t3-3", title: "Sin & Cos Graphs", lessons: [
      { id: "l3-3-1", title: "Parent sin and cos", estimateMin: 8, artifact: "coordinate-plane", beats: [] },
      { id: "l3-3-2", title: "Cosine = sine shifted left", estimateMin: 4, artifact: "comparison", beats: [] },
      { id: "l3-3-3", title: "Concavity of sinusoids", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
    ]},
    { id: "t3-4", title: "Sinusoidal Modeling", lessons: [
      { id: "l3-4-1", title: "A, B, C, D — what each does", estimateMin: 10, artifact: "sinusoidal-builder", beats: [] },
      { id: "l3-4-2", title: "Reading a sinusoid off a graph", estimateMin: 8, artifact: "coordinate-plane", beats: [] },
      { id: "l3-4-3", title: "The 4-step modeling protocol", estimateMin: 7, artifact: "sinusoidal-builder", beats: [] },
      { id: "l3-4-4", title: "Tides — full worked model", estimateMin: 8, artifact: "sinusoidal-builder", beats: [] },
      { id: "l3-4-5", title: "Theme park ride", estimateMin: 6, artifact: "sinusoidal-builder", beats: [] },
      { id: "l3-4-6", title: "Fan blade — sine vs cosine choice", estimateMin: 7, artifact: "sinusoidal-builder", beats: [] },
      { id: "l3-4-7", title: "Metronome — half-period subtlety", estimateMin: 8, artifact: "sinusoidal-builder", beats: [] },
      { id: "l3-4-8", title: "Daylight — concavity at peak", estimateMin: 7, artifact: "sinusoidal-builder", beats: [] },
    ]},
    { id: "t3-5", title: "Tangent", lessons: [
      { id: "l3-5-1", title: "Definition, period π, asymptotes", estimateMin: 7, artifact: "coordinate-plane", beats: [] },
      { id: "l3-5-2", title: "Always increasing between asymptotes", estimateMin: 4, artifact: "coordinate-plane", beats: [] },
      { id: "l3-5-3", title: "Concavity matches sign of tan", estimateMin: 6, artifact: "coordinate-plane", beats: [] },
    ]},
    { id: "t3-6", title: "Inverse Trig & Reciprocal Trig", lessons: [
      { id: "l3-6-1", title: "Why we restrict — failed HLT", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
      { id: "l3-6-2", title: "arcsin / arccos / arctan", estimateMin: 7, artifact: "comparison", beats: [] },
      { id: "l3-6-3", title: "arcsin(sin x) ≠ x in general", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
      { id: "l3-6-4", title: "Sec, csc, cot — definitions", estimateMin: 7, artifact: "coordinate-plane", beats: [] },
      { id: "l3-6-5", title: "Sec asymptotes ↔ cos zeros", estimateMin: 5, artifact: "comparison", beats: [] },
    ]},
    { id: "t3-7", title: "Trig Equations", lessons: [
      { id: "l3-7-1", title: "General solution: sin x = c", estimateMin: 8, artifact: "unit-circle", beats: [] },
      { id: "l3-7-2", title: "General solution: cos x = c", estimateMin: 6, artifact: "unit-circle", beats: [] },
      { id: "l3-7-3", title: "General solution: tan x = c", estimateMin: 5, artifact: "coordinate-plane", beats: [] },
      { id: "l3-7-4", title: "Substitution: sin(3x) = c", estimateMin: 6, artifact: "algebra-ladder", beats: [] },
      { id: "l3-7-5", title: "Trig inequalities", estimateMin: 7, artifact: "unit-circle", beats: [] },
      { id: "l3-7-6", title: "Multi-tool: 6sin²x − 5sin x = 4", estimateMin: 8, artifact: "algebra-ladder", beats: [] },
    ]},
    { id: "t3-8", title: "Trig Identities", lessons: [
      { id: "l3-8-1", title: "Pythagorean identities — derivation", estimateMin: 7, artifact: "unit-circle", beats: [] },
      { id: "l3-8-2", title: "Three Pythagorean rearrangements", estimateMin: 4, artifact: "algebra-ladder", beats: [] },
      { id: "l3-8-3", title: "Sum identities", estimateMin: 8, artifact: "algebra-ladder", beats: [] },
      { id: "l3-8-4", title: "Difference identities + sign rule", estimateMin: 5, artifact: "algebra-ladder", beats: [] },
      { id: "l3-8-5", title: "Double-angle from sum", estimateMin: 6, artifact: "algebra-ladder", beats: [] },
      { id: "l3-8-6", title: "Cofunction identities", estimateMin: 4, artifact: "unit-circle", beats: [] },
      { id: "l3-8-7", title: "Even/odd reflections", estimateMin: 5, artifact: "unit-circle", beats: [] },
      { id: "l3-8-8", title: "Identity simplification drill", estimateMin: 10, artifact: "algebra-ladder", beats: [] },
    ]},
    { id: "t3-9", title: "Polar", lessons: [
      { id: "l3-9-1", title: "Polar coordinates and conversion", estimateMin: 8, artifact: "polar-plane", beats: [] },
      { id: "l3-9-2", title: "Negative r convention", estimateMin: 5, artifact: "polar-plane", beats: [] },
      { id: "l3-9-3", title: "Complex numbers in polar form", estimateMin: 7, artifact: "polar-plane", beats: [] },
      { id: "l3-9-4", title: "Common polar curves library", estimateMin: 8, artifact: "polar-plane", beats: [] },
      { id: "l3-9-5", title: "Limaçon classification by |a/b|", estimateMin: 8, artifact: "polar-plane", beats: [] },
      { id: "l3-9-6", title: "Rose curves: petal counting rule", estimateMin: 6, artifact: "polar-plane", beats: [] },
      { id: "l3-9-7", title: "Polar rate of change vs distance |r|", estimateMin: 7, artifact: "polar-plane", beats: [] },
      { id: "l3-9-8", title: "Above/below polar axis, near/far", estimateMin: 6, artifact: "polar-plane", beats: [] },
      { id: "l3-9-9", title: "Polar relative max", estimateMin: 4, artifact: "polar-plane", beats: [] },
    ]},
  ],
};

// ──────────────────────────────────────────────────────────────────────
// The course
// ──────────────────────────────────────────────────────────────────────

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
): { unit: Unit; topic: import("./types").Topic; lesson: import("./types").Lesson } | undefined {
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
