// Mock exam — section definitions and scoring.
//
// Each section pulls questions from the practice bank and runs them under
// the official AP Precalc timing. Scoring is approximate; the College
// Board curve is roughly 60-65% raw → 5, 50% → 4, 40% → 3.

import { PRACTICE, type Problem, type ProblemSource } from "./practice";

export type SectionId = "S1A" | "S1B" | "S2A" | "S2B";

export type Section = {
  id: SectionId;
  label: string;
  shortLabel: string;
  source: ProblemSource;
  type: "mcq" | "frq";
  count: number;
  minutes: number;
  calc: boolean;
  description: string;
};

export const SECTIONS: Section[] = [
  {
    id: "S1A",
    label: "Section I, Part A",
    shortLabel: "IA",
    source: "MM-S1A",
    type: "mcq",
    count: 28,
    minutes: 80,
    calc: false,
    description: "28 multiple choice. No calculator. ~2.85 minutes per question.",
  },
  {
    id: "S1B",
    label: "Section I, Part B",
    shortLabel: "IB",
    source: "MM-S1B",
    type: "mcq",
    count: 12,
    minutes: 40,
    calc: true,
    description: "12 multiple choice. Calculator required. ~3.3 minutes per question.",
  },
  {
    id: "S2A",
    label: "Section II, Part A",
    shortLabel: "IIA",
    source: "MM-S2A",
    type: "frq",
    count: 2,
    minutes: 30,
    calc: true,
    description: "2 free response. Calculator required. 15 min per question.",
  },
  {
    id: "S2B",
    label: "Section II, Part B",
    shortLabel: "IIB",
    source: "MM-S2B",
    type: "frq",
    count: 2,
    minutes: 30,
    calc: false,
    description: "2 free response. No calculator. 15 min per question.",
  },
];

export function getSectionProblems(sectionId: SectionId): Problem[] {
  const section = SECTIONS.find((s) => s.id === sectionId);
  if (!section) return [];
  return PRACTICE.filter((p) => p.source === section.source);
}

// Approximate AP curve for full exam. Raw is sum across all sections.
// MCQ: 1 pt each (40 total). FRQ: 6 pts each (24 total). Total: 64.
export function apScore(rawPercent: number): { score: 1 | 2 | 3 | 4 | 5; label: string } {
  if (rawPercent >= 0.78) return { score: 5, label: "Extremely well qualified" };
  if (rawPercent >= 0.62) return { score: 4, label: "Well qualified" };
  if (rawPercent >= 0.48) return { score: 3, label: "Qualified" };
  if (rawPercent >= 0.34) return { score: 2, label: "Possibly qualified" };
  return { score: 1, label: "No recommendation" };
}
