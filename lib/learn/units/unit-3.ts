// Unit 3 — Trigonometric & Polar Functions (30-35% of exam)
//
// Skeleton in PR F; lessons filled in PR H.

import type { Unit } from "../types";

export const UNIT_3: Unit = {
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
