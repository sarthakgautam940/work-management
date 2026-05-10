// Diagnostic — 12 MCQs (4 per unit) to color the course path on first run.
// Results write to learnDiagnostic.results: { [unitId]: { correct, total } }
// which the dashboard reads to tag each unit red / amber / green.

export type DiagnosticQuestion = {
  id: string;
  unitId: "u1" | "u2" | "u3";
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

export const DIAGNOSTIC: DiagnosticQuestion[] = [
  // ───── Unit 1: Polynomial & Rational ─────
  {
    id: "d1",
    unitId: "u1",
    prompt: "End behavior of $p(x) = -2x^5 + 7x^4 + 3$ as $x \\to \\infty$?",
    choices: ["$+\\infty$", "$-\\infty$", "$0$", "$+7$"],
    answer: 1,
    explain: "Leading term $-2x^5$. Odd degree, negative coefficient — right end $\\to -\\infty$.",
  },
  {
    id: "d2",
    unitId: "u1",
    prompt: "$f(x) = \\dfrac{(x-3)(x+2)}{(x-3)(x-1)}$. What's at $x = 3$?",
    choices: ["A zero", "A hole", "A vertical asymptote", "A horizontal asymptote"],
    answer: 1,
    explain: "Factor $(x-3)$ cancels — that's a hole, not a zero or VA.",
  },
  {
    id: "d3",
    unitId: "u1",
    prompt: "If $f$ is increasing and concave down on an interval, then $f$ is...",
    choices: [
      "Increasing at an increasing rate",
      "Increasing at a decreasing rate",
      "Decreasing at an increasing rate",
      "Decreasing at a decreasing rate",
    ],
    answer: 1,
    explain: "Increasing + concave down = increasing at a decreasing rate. The slope is positive but shrinking.",
  },
  {
    id: "d4",
    unitId: "u1",
    prompt: "A polynomial has a zero at $x = 4 - 2i$. What other zero must it have (real coefficients)?",
    choices: ["$-4 - 2i$", "$-4 + 2i$", "$4 + 2i$", "$2 + 4i$"],
    answer: 2,
    explain: "Complex zeros of real polynomials come in conjugate pairs. Conjugate of $4 - 2i$ is $4 + 2i$.",
  },

  // ───── Unit 2: Exp & Log ─────
  {
    id: "d5",
    unitId: "u2",
    prompt: "A bacteria population doubles every 6 hours, starts at 100. After 18 hours?",
    choices: ["300", "600", "800", "1200"],
    answer: 2,
    explain: "18 / 6 = 3 doublings. $100 \\cdot 2^3 = 800$.",
  },
  {
    id: "d6",
    unitId: "u2",
    prompt: "Rewrite $3\\log_2 x + \\log_2 5$ as a single logarithm.",
    choices: ["$\\log_2(3x + 5)$", "$\\log_2(15x)$", "$\\log_2(5x^3)$", "$3\\log_2(5x)$"],
    answer: 2,
    explain: "$3\\log_2 x = \\log_2 x^3$. Then $\\log_2 x^3 + \\log_2 5 = \\log_2(5x^3)$.",
  },
  {
    id: "d7",
    unitId: "u2",
    prompt: "Solve $\\ln(x^2) = 4$. Domain matters.",
    choices: ["$x = e^2$ only", "$x = \\pm e^2$", "$x = 2e$", "$x = e^4$"],
    answer: 1,
    explain: "$x^2 = e^4$, so $x = \\pm e^2$. Both satisfy $x^2 > 0$, so both are valid.",
  },
  {
    id: "d8",
    unitId: "u2",
    prompt: "If $f(x) = 12 \\log_2(x+5) + 6$, find $f^{-1}(6)$.",
    choices: ["$-4$", "$-5$", "$0$", "$1$"],
    answer: 0,
    explain: "$f^{-1}(6) = a$ means $f(a) = 6$. Solve $12\\log_2(a+5) + 6 = 6 \\Rightarrow \\log_2(a+5) = 0 \\Rightarrow a + 5 = 1 \\Rightarrow a = -4$.",
  },

  // ───── Unit 3: Trig & Polar ─────
  {
    id: "d9",
    unitId: "u3",
    prompt: "$\\sin(7\\pi/6) = ?$",
    choices: ["$\\dfrac{1}{2}$", "$-\\dfrac{1}{2}$", "$\\dfrac{\\sqrt{3}}{2}$", "$-\\dfrac{\\sqrt{3}}{2}$"],
    answer: 1,
    explain: "$7\\pi/6$ is QIII (180° + 30°). Reference angle $\\pi/6$. Sine is negative in QIII: $-\\frac{1}{2}$.",
  },
  {
    id: "d10",
    unitId: "u3",
    prompt: "A sinusoid has max 10, min 2, period 4. Its midline and amplitude are:",
    choices: [
      "midline 6, amplitude 4",
      "midline 4, amplitude 6",
      "midline 6, amplitude 8",
      "midline 8, amplitude 4",
    ],
    answer: 0,
    explain: "Midline = (max + min)/2 = 6. Amplitude = (max − min)/2 = 4.",
  },
  {
    id: "d11",
    unitId: "u3",
    prompt: "Solve $\\sin x = -\\dfrac{1}{2}$ on $[0, 2\\pi)$.",
    choices: ["$\\pi/6, 5\\pi/6$", "$7\\pi/6, 11\\pi/6$", "$\\pi/3, 2\\pi/3$", "$5\\pi/6, 7\\pi/6$"],
    answer: 1,
    explain: "Reference angle $\\pi/6$. Sine negative in QIII and QIV: $7\\pi/6$ and $11\\pi/6$.",
  },
  {
    id: "d12",
    unitId: "u3",
    prompt: "For $r = 2 + 3\\cos\\theta$, what's the shape?",
    choices: ["Circle", "Cardioid", "Limaçon with inner loop", "Convex limaçon"],
    answer: 2,
    explain: "$|a/b| = 2/3 < 1 \\Rightarrow$ inner-loop limaçon.",
  },
];

export const DIAGNOSTIC_UNITS = ["u1", "u2", "u3"] as const;

// Band classification — same rules as the macro diagnostic.
export function bandFor(correct: number, total: number): "red" | "amber" | "green" {
  if (total === 0) return "amber";
  const pct = correct / total;
  if (pct <= 0.5) return "red";
  if (pct < 0.75) return "amber";
  return "green";
}
