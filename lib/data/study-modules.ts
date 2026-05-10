// Study modules — AP Macro + AP Precalc.
// Each lesson is a queue item in Work Mode and tracks its own completion.

export type MCQ = {
  q: string;
  choices: string[];
  answer: number;
  explain: string;
};

export type Lesson = {
  id: string;
  examId: "ap-precalc";
  unit: string;
  unitOrder: number;
  order: number;
  title: string;
  estimateMin: number;
  body: string[];           // paragraphs
  formulas?: string[];
  example?: { prompt: string; solution: string };
  mcqs: MCQ[];
};

export const EXAMS = {
  "ap-precalc": { label: "AP Precalculus", date: "2026-05-12" },
} as const;

// ─────────────────────────────────────────────────────────────────────
// AP PRECALC LESSONS
// ─────────────────────────────────────────────────────────────────────

const PRECALC_LESSONS: Lesson[] = [
  {
    id: "pre-u1-l1",
    examId: "ap-precalc",
    unit: "Unit 1 · Polynomial & Rational",
    unitOrder: 1,
    order: 1,
    title: "Average and instantaneous rate of change",
    estimateMin: 12,
    body: [
      "The average rate of change of f over [a, b] is the slope of the secant line: (f(b) − f(a)) / (b − a). It's a single number that summarizes the function's net change per unit input across the interval.",
      "For a polynomial of degree n, the rate of change of the rate of change (i.e., second-order behavior) tells you concavity. If second differences are constant, the polynomial is degree 2 (quadratic). If third differences are constant, degree 3 (cubic).",
      "Local behavior at a point is approximated by a tangent line — instantaneous rate of change. In Precalc you'll estimate these from tables or graphs.",
    ],
    formulas: [
      "AROC of f on [a, b] = (f(b) − f(a)) / (b − a)",
      "Polynomial of degree n: nth-order finite differences are constant",
    ],
    mcqs: [
      {
        q: "Average rate of change of f(x) = x² + 3 on [1, 4] equals",
        choices: ["3", "5", "8", "15"],
        answer: 1,
        explain: "f(4) = 19, f(1) = 4. AROC = (19 − 4) / (4 − 1) = 15 / 3 = 5.",
      },
      {
        q: "If a function's third-order finite differences are constant, it is most likely",
        choices: ["Linear", "Quadratic", "Cubic", "Exponential"],
        answer: 2,
        explain: "Polynomial of degree n has constant nth-order differences. Constant third differences → cubic.",
      },
    ],
  },

  {
    id: "pre-u1-l2",
    examId: "ap-precalc",
    unit: "Unit 1 · Polynomial & Rational",
    unitOrder: 1,
    order: 2,
    title: "Polynomial zeros, multiplicity, end behavior",
    estimateMin: 12,
    body: [
      "Zeros (roots) are x-values where p(x) = 0. The multiplicity of a zero is how many times the corresponding factor appears in the factored form. Even multiplicity → graph touches the x-axis and bounces; odd multiplicity → graph crosses.",
      "End behavior is determined by the leading term. For p(x) = a·x^n + … : if n is even and a > 0, both ends ↑; if n is even and a < 0, both ↓. If n is odd and a > 0, left ↓ right ↑; if odd and a < 0, left ↑ right ↓.",
      "A polynomial of degree n has at most n − 1 turning points (local maxima/minima) and exactly n complex zeros (counting multiplicity).",
    ],
    formulas: [
      "Even multiplicity → bounce; odd multiplicity → cross",
      "Even degree: ends agree. Odd degree: ends opposite.",
    ],
    mcqs: [
      {
        q: "p(x) = (x − 1)²(x + 3) has zeros at",
        choices: ["x = 1 (mult 1), x = −3 (mult 1)", "x = 1 (mult 2), x = −3 (mult 1)", "x = −1 (mult 2), x = 3 (mult 1)", "x = 0 (mult 3)"],
        answer: 1,
        explain: "Factored form gives x = 1 with multiplicity 2 (graph bounces) and x = −3 with multiplicity 1 (graph crosses).",
      },
      {
        q: "End behavior of p(x) = −2x⁵ + 7x − 1?",
        choices: ["Both ends ↑", "Both ends ↓", "Left ↑, right ↓", "Left ↓, right ↑"],
        answer: 2,
        explain: "Odd degree (5), leading coefficient negative (−2). Odd + negative → left ↑, right ↓.",
      },
    ],
  },

  {
    id: "pre-u1-l3",
    examId: "ap-precalc",
    unit: "Unit 1 · Polynomial & Rational",
    unitOrder: 1,
    order: 3,
    title: "Rational functions — asymptotes and holes",
    estimateMin: 14,
    body: [
      "A rational function r(x) = p(x)/q(x). Vertical asymptotes occur where q(x) = 0 and p(x) ≠ 0 at the same x. Holes occur where a common factor cancels.",
      "Horizontal asymptote rules (compare degrees): deg(p) < deg(q) → y = 0. deg(p) = deg(q) → y = ratio of leading coefficients. deg(p) > deg(q) → no HA, possibly slant asymptote (if difference is exactly 1, divide to find).",
      "x-intercepts come from p(x) = 0 (after cancellation). y-intercept = r(0) if defined.",
    ],
    formulas: [
      "VA: q(x) = 0, p(x) ≠ 0",
      "Hole: shared factor between p and q",
      "HA: degree comparison rule",
    ],
    example: {
      prompt: "r(x) = (x² − 1) / (x² − 3x + 2). Identify holes, vertical asymptotes, and horizontal asymptote.",
      solution: "Factor: r(x) = (x − 1)(x + 1) / [(x − 1)(x − 2)]. Cancel (x − 1) → hole at x = 1. VA at x = 2. Same degrees, leading coeffs both 1 → HA at y = 1.",
    },
    mcqs: [
      {
        q: "r(x) = (3x² + 5) / (x² − 4). The horizontal asymptote is",
        choices: ["y = 0", "y = 3", "y = 5/4", "No HA — slant asymptote"],
        answer: 1,
        explain: "Same degree (2). HA = ratio of leading coeffs = 3 / 1 = 3.",
      },
    ],
  },

  {
    id: "pre-u2-l1",
    examId: "ap-precalc",
    unit: "Unit 2 · Exp & Log",
    unitOrder: 2,
    order: 1,
    title: "Exponential functions and modeling",
    estimateMin: 12,
    body: [
      "f(x) = a · b^x with b > 0, b ≠ 1. b > 1 → growth. 0 < b < 1 → decay. The y-intercept is a (because b^0 = 1). Horizontal asymptote at y = 0 (assuming no vertical shift).",
      "Doubling time / half-life: solve b^t = 2 (or 1/2). For continuously compounded growth f(t) = a·e^(kt), doubling time = ln 2 / k.",
      "Compound interest: A = P(1 + r/n)^(nt), continuous: A = P·e^(rt).",
    ],
    formulas: [
      "f(x) = a · b^x",
      "Continuous: A = P · e^(rt)",
      "Doubling time = ln 2 / k (for f = a·e^(kt))",
    ],
    mcqs: [
      {
        q: "A bacteria culture doubles every 4 hours and starts at 200. Population after 12 hours?",
        choices: ["600", "800", "1200", "1600"],
        answer: 3,
        explain: "12 hr / 4 hr = 3 doublings. 200 · 2³ = 200 · 8 = 1600.",
      },
      {
        q: "Which function shows decay?",
        choices: ["f(x) = 3 · 2^x", "f(x) = 5 · (1.05)^x", "f(x) = 10 · (0.7)^x", "f(x) = 4^x"],
        answer: 2,
        explain: "Base between 0 and 1 means decay. 0.7 < 1 → decay.",
      },
    ],
  },

  {
    id: "pre-u2-l2",
    examId: "ap-precalc",
    unit: "Unit 2 · Exp & Log",
    unitOrder: 2,
    order: 2,
    title: "Logarithms — properties and equations",
    estimateMin: 14,
    body: [
      "log_b(x) is the inverse of b^x. Common log = log₁₀; natural log = ln = log_e.",
      "Properties: log(MN) = log M + log N. log(M/N) = log M − log N. log(M^k) = k·log M. Change of base: log_b(x) = ln x / ln b.",
      "Solving exponential equations: take log of both sides, use power rule to bring exponent down. Solving log equations: combine into single log if possible, then exponentiate.",
    ],
    formulas: [
      "log(MN) = log M + log N",
      "log(M/N) = log M − log N",
      "log(M^k) = k · log M",
      "log_b(x) = ln(x) / ln(b)",
    ],
    example: {
      prompt: "Solve 5^x = 80. Round to 3 decimals.",
      solution: "Take ln: x · ln 5 = ln 80. x = ln 80 / ln 5 ≈ 4.382 / 1.609 ≈ 2.723.",
    },
    mcqs: [
      {
        q: "log₂(8) + log₂(4) =",
        choices: ["2", "5", "12", "32"],
        answer: 1,
        explain: "log₂(8) + log₂(4) = log₂(32) = 5. Or directly: 3 + 2 = 5.",
      },
      {
        q: "Solve ln(x) = 3.",
        choices: ["x = 1/e³", "x = e³ ≈ 20.09", "x = 3", "x = 1/3"],
        answer: 1,
        explain: "ln(x) = 3 → x = e³ ≈ 20.09.",
      },
    ],
  },

  {
    id: "pre-u2-l3",
    examId: "ap-precalc",
    unit: "Unit 2 · Exp & Log",
    unitOrder: 2,
    order: 3,
    title: "Inverse functions and composition",
    estimateMin: 12,
    body: [
      "f and g are inverses if f(g(x)) = x and g(f(x)) = x for all x in their domains. Graphs of inverses reflect across y = x. Domain of f = range of f⁻¹.",
      "To find f⁻¹: swap x and y, solve for y. Not every function has an inverse — must be one-to-one (horizontal line test).",
      "Common inverse pairs: e^x and ln x, b^x and log_b(x), x² (restricted to x ≥ 0) and √x.",
    ],
    formulas: [
      "f(f⁻¹(x)) = x",
      "Domain of f = range of f⁻¹, and vice versa",
    ],
    mcqs: [
      {
        q: "If f(x) = 3x − 5, then f⁻¹(x) =",
        choices: ["(x + 5) / 3", "1 / (3x − 5)", "3x + 5", "(x − 5) / 3"],
        answer: 0,
        explain: "Swap: x = 3y − 5. Solve: y = (x + 5) / 3.",
      },
    ],
  },

  {
    id: "pre-u3-l1",
    examId: "ap-precalc",
    unit: "Unit 3 · Trig & Polar",
    unitOrder: 3,
    order: 1,
    title: "Unit circle and the six trig functions",
    estimateMin: 14,
    body: [
      "On the unit circle, a point at angle θ has coordinates (cos θ, sin θ). Tangent = sin/cos. Reciprocal functions: csc = 1/sin, sec = 1/cos, cot = 1/tan.",
      "Memorize key angles in both radians and degrees: 0, π/6 (30°), π/4 (45°), π/3 (60°), π/2 (90°). cos values along x, sin values along y.",
      "Signs by quadrant — A, S, T, C (All, Sin, Tan, Cos). Q1: all positive. Q2: only sin. Q3: only tan. Q4: only cos.",
      "Pythagorean identity: sin²θ + cos²θ = 1. Divide by cos² → 1 + tan²θ = sec²θ. Divide by sin² → cot²θ + 1 = csc²θ.",
    ],
    formulas: [
      "sin²θ + cos²θ = 1",
      "tan θ = sin θ / cos θ",
      "Period of sin, cos = 2π. Period of tan = π.",
    ],
    mcqs: [
      {
        q: "cos(2π/3) =",
        choices: ["1/2", "−1/2", "√3/2", "−√3/2"],
        answer: 1,
        explain: "2π/3 is 120°, in Q2. Reference angle is π/3 (60°). cos(60°) = 1/2; in Q2 cos is negative → −1/2.",
      },
      {
        q: "If sin θ = 3/5 and θ is in Q2, then cos θ =",
        choices: ["4/5", "−4/5", "5/3", "−5/3"],
        answer: 1,
        explain: "Pythagorean: cos²θ = 1 − 9/25 = 16/25 → cos θ = ±4/5. Q2 → cosine negative → −4/5.",
      },
    ],
  },

  {
    id: "pre-u3-l2",
    examId: "ap-precalc",
    unit: "Unit 3 · Trig & Polar",
    unitOrder: 3,
    order: 2,
    title: "Sinusoidal modeling and transformations",
    estimateMin: 14,
    body: [
      "f(x) = A·sin(B(x − C)) + D. A = amplitude (vertical stretch). B = horizontal compression — period = 2π/B. C = horizontal shift (phase). D = vertical shift (midline).",
      "Maximum = D + A. Minimum = D − A. Midline y = D.",
      "Modeling tide/temperature/etc.: amplitude = (max − min)/2. midline = (max + min)/2. period from time between repeats.",
    ],
    formulas: [
      "Period = 2π / |B|",
      "Amplitude = (max − min) / 2",
      "Midline = (max + min) / 2",
    ],
    example: {
      prompt: "Tides peak at 12 ft, trough at 4 ft, full cycle 12 hours. Sinusoidal model with t in hours, peak at t = 0?",
      solution: "Amplitude = (12 − 4)/2 = 4. Midline = 8. Period = 12 → B = 2π/12 = π/6. Use cos for peak at t = 0: h(t) = 4·cos((π/6)t) + 8.",
    },
    mcqs: [
      {
        q: "f(x) = 3·sin(2x) + 5. Period and amplitude?",
        choices: ["Period 2π, amp 3", "Period π, amp 3", "Period π, amp 5", "Period 2, amp 3"],
        answer: 1,
        explain: "Period = 2π / |B| = 2π / 2 = π. Amplitude = |A| = 3.",
      },
    ],
  },

  {
    id: "pre-u3-l3",
    examId: "ap-precalc",
    unit: "Unit 3 · Trig & Polar",
    unitOrder: 3,
    order: 3,
    title: "Inverse trig and identities",
    estimateMin: 12,
    body: [
      "Inverse trig functions return angles. arcsin (sin⁻¹) has range [−π/2, π/2]. arccos has range [0, π]. arctan has range (−π/2, π/2).",
      "When solving sin θ = k for general θ, use the inverse and then add the appropriate quadrant solutions plus 2π·n for periodicity.",
      "Sum-difference identities: sin(A ± B) = sin A cos B ± cos A sin B. cos(A ± B) = cos A cos B ∓ sin A sin B. Double-angle: sin(2θ) = 2 sin θ cos θ. cos(2θ) = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1.",
    ],
    formulas: [
      "sin(A ± B) = sin A cos B ± cos A sin B",
      "cos(A ± B) = cos A cos B ∓ sin A sin B",
      "sin(2θ) = 2 sin θ cos θ",
      "cos(2θ) = 1 − 2 sin²θ",
    ],
    mcqs: [
      {
        q: "sin(2θ) where sin θ = 3/5 and cos θ = 4/5?",
        choices: ["12/25", "24/25", "7/25", "9/25"],
        answer: 1,
        explain: "sin(2θ) = 2 · sin θ · cos θ = 2 · 3/5 · 4/5 = 24/25.",
      },
    ],
  },

  {
    id: "pre-u3-l4",
    examId: "ap-precalc",
    unit: "Unit 3 · Trig & Polar",
    unitOrder: 3,
    order: 4,
    title: "Polar coordinates and graphs",
    estimateMin: 12,
    body: [
      "Polar coordinates use (r, θ): r = distance from origin, θ = angle from positive x-axis. Conversion: x = r cos θ, y = r sin θ. r² = x² + y², tan θ = y/x.",
      "Common polar graphs: r = a (circle radius a), r = a·cos θ (circle through origin), r = a + b·cos θ (limaçon — cardioid if a = b), r = a·cos(nθ) (rose with n petals if n odd, 2n petals if n even).",
      "Average rate of change in polar context: still (Δr / Δθ) along the curve.",
    ],
    formulas: [
      "x = r cos θ,  y = r sin θ",
      "r² = x² + y²,  tan θ = y/x",
    ],
    mcqs: [
      {
        q: "Rectangular form of (r, θ) = (4, π/3)?",
        choices: ["(2, 2√3)", "(2√3, 2)", "(2, 2)", "(4, π/3)"],
        answer: 0,
        explain: "x = 4 cos(π/3) = 4 · 1/2 = 2. y = 4 sin(π/3) = 4 · √3/2 = 2√3.",
      },
    ],
  },
];

export const STUDY_LESSONS: Lesson[] = [...PRECALC_LESSONS];

export function lessonsByExam(examId: Lesson["examId"]): Lesson[] {
  return STUDY_LESSONS.filter((l) => l.examId === examId);
}
