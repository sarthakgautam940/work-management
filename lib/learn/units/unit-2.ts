// Unit 2 — Exponential & Logarithmic Functions (27-40% of exam)
//
// Skeleton in PR F; lessons filled in PR G.

import type { Unit } from "../types";

export const UNIT_2: Unit = {
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
