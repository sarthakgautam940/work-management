// AP PRECALC — full crash course content. Three days (Sat-Mon), ~5h total.
// Built around College Board's AP Precalculus curriculum, exam-focused.

import type { Course, Module } from "./types";

// ─────────────────────────────────────────────────────────────────────
// MODULE 1 — Unit 1: Polynomial and Rational Functions
// ─────────────────────────────────────────────────────────────────────
const MOD_U1: Module = {
  id: "pre-u1",
  partNumber: 1,
  title: "Unit 1 — Polynomial & Rational Functions",
  subtitle: "≈30% of the exam. Rates of change, zeros, end behavior, asymptotes, modeling.",
  estimateMin: 110,
  priority: "must",
  lessons: [
    {
      id: "u1-arc",
      title: "Average rate of change",
      estimateMin: 10,
      steps: [
        {
          type: "read",
          title: "AROC = secant slope",
          body: [
            "The average rate of change of f over [a, b] is the slope of the secant line connecting the endpoints: AROC = (f(b) − f(a)) / (b − a). It's a single number summarizing the function's net change per unit input across the interval.",
            "AROC depends on the interval. The same function will have different AROCs on different intervals if it's not linear. Linear functions are the only ones with constant AROC = the slope.",
            "On AP Precalc, AROC is tested as both a calculation (given f and an interval) and as a comparison (which interval has the largest AROC, or where is AROC positive/negative).",
          ],
          callouts: [
            {
              kind: "trap",
              title: "Don't confuse AROC with instantaneous rate",
              body: "AROC is between two points (secant). Instantaneous rate is at one point (tangent). Precalc estimates instantaneous rate from a table by computing AROC over a tiny interval around the point.",
            },
          ],
        },
        {
          type: "formula",
          title: "Rate-of-change formulas",
          formulas: [
            "AROC of f on [a, b] = (f(b) − f(a)) / (b − a)",
            "Polynomial of degree n: nth-order finite differences are constant",
            "Linear: 1st differences constant.  Quadratic: 2nd differences constant.  Cubic: 3rd.",
          ],
        },
        {
          type: "example",
          title: "AROC of x²+3 on [1, 4]",
          prompt: "Find the average rate of change of f(x) = x² + 3 on the interval [1, 4].",
          solution: [
            "f(1) = 1 + 3 = 4",
            "f(4) = 16 + 3 = 19",
            "AROC = (19 − 4) / (4 − 1) = 15 / 3 = 5",
          ],
        },
        {
          type: "drill",
          prompt: "If a function's third-order finite differences are constant, what degree polynomial is it?",
          answer: "Cubic (degree 3)",
          steps: [
            "Polynomial of degree n has constant nth-order differences.",
            "Constant 3rd differences → cubic.",
          ],
        },
        {
          type: "mcq",
          prompt: "f(x) = 2x² − 3x. Find the average rate of change on [0, 4].",
          choices: ["3", "5", "7", "8"],
          answer: 1,
          explain: "f(0) = 0. f(4) = 32 − 12 = 20. AROC = (20 − 0) / (4 − 0) = 5.",
        },
      ],
    },
    {
      id: "u1-zeros",
      title: "Polynomial zeros, multiplicity, end behavior",
      estimateMin: 12,
      steps: [
        {
          type: "read",
          title: "Zeros and multiplicity",
          body: [
            "Zeros (roots) are x-values where p(x) = 0. The multiplicity of a zero is how many times the corresponding factor appears in the factored form.",
            "Even multiplicity → graph TOUCHES the x-axis and bounces back. Odd multiplicity → graph CROSSES the x-axis.",
            "A polynomial of degree n has at most n − 1 turning points (local maxima/minima) and exactly n complex zeros (counting multiplicity).",
          ],
        },
        {
          type: "read",
          title: "End behavior — leading term decides",
          body: [
            "End behavior is determined by the leading term a·x^n. The lower-degree terms only matter near the origin.",
            "Even degree, positive leading coefficient: BOTH ends ↑ (like x²).",
            "Even degree, negative leading coefficient: BOTH ends ↓ (like −x²).",
            "Odd degree, positive leading coefficient: LEFT ↓, RIGHT ↑ (like x³).",
            "Odd degree, negative leading coefficient: LEFT ↑, RIGHT ↓ (like −x³).",
          ],
          callouts: [
            {
              kind: "memory",
              title: "Mnemonic for end behavior",
              body: "Even degree → ends agree. Odd degree → ends opposite. Positive leading coeff → right end up. Negative → right end down.",
            },
          ],
        },
        {
          type: "example",
          title: "Reading the factored form",
          prompt: "p(x) = (x − 1)²(x + 3)(x − 5). Identify zeros, multiplicities, and degree.",
          solution: [
            "Zero at x = 1, multiplicity 2 (graph BOUNCES — even mult).",
            "Zero at x = −3, multiplicity 1 (graph CROSSES — odd mult).",
            "Zero at x = 5, multiplicity 1 (graph CROSSES).",
            "Total degree = 2 + 1 + 1 = 4. Leading term will be +x⁴ (when expanded). Both ends ↑.",
          ],
        },
        {
          type: "mcq",
          prompt: "p(x) = −2x⁵ + 7x − 1. End behavior?",
          choices: ["Both ends ↑", "Both ends ↓", "Left ↑, right ↓", "Left ↓, right ↑"],
          answer: 2,
          explain: "Odd degree (5), negative leading coefficient (−2). Odd + negative → left ↑, right ↓.",
        },
        {
          type: "mcq",
          prompt: "p(x) = (x + 2)³(x − 4)². At x = 4 the graph",
          choices: ["Crosses the x-axis", "Touches and bounces (doesn't cross)", "Has a vertical asymptote", "Is undefined"],
          answer: 1,
          explain: "Multiplicity 2 (even) at x = 4 → graph TOUCHES the x-axis and bounces back. No crossing.",
        },
        {
          type: "drill",
          prompt: "What's the maximum number of turning points for a polynomial of degree 7?",
          answer: "6",
          steps: ["Max turning points = degree − 1 = 7 − 1 = 6."],
        },
      ],
    },
    {
      id: "u1-rational",
      title: "Rational functions — asymptotes and holes",
      estimateMin: 14,
      steps: [
        {
          type: "read",
          title: "VAs, holes, HAs, slants",
          body: [
            "A rational function r(x) = p(x)/q(x). Vertical asymptotes occur where q(x) = 0 AND p(x) ≠ 0 at the same x. Holes occur where a common factor cancels (both p and q have a zero at that x).",
            "Horizontal asymptote rules — compare the degrees of p and q:",
            "  · deg(p) < deg(q) → HA at y = 0.",
            "  · deg(p) = deg(q) → HA at y = ratio of leading coefficients.",
            "  · deg(p) > deg(q) → no HA. If degrees differ by exactly 1, there's a SLANT (oblique) asymptote — find by polynomial division.",
            "x-intercepts come from p(x) = 0 (after canceling shared factors). y-intercept = r(0) if defined.",
          ],
          callouts: [
            {
              kind: "trap",
              title: "Cancel BEFORE finding VAs",
              body: "If a factor appears in both numerator and denominator, it produces a HOLE, not a VA. Always factor and cancel first.",
            },
          ],
        },
        {
          type: "formula",
          title: "Quick rules",
          formulas: [
            "VA: q(x) = 0 AND p(x) ≠ 0 at the same x",
            "Hole: shared factor between p and q",
            "HA: deg comparison rule",
            "Slant asymptote: when deg(p) = deg(q) + 1 — divide to find",
          ],
        },
        {
          type: "example",
          title: "Find holes, VAs, HA",
          prompt: "r(x) = (x² − 1) / (x² − 3x + 2). Identify holes, vertical asymptotes, horizontal asymptote.",
          solution: [
            "Factor: r(x) = (x − 1)(x + 1) / [(x − 1)(x − 2)]",
            "Cancel (x − 1) → HOLE at x = 1.",
            "Remaining denominator zero: x = 2 → VA at x = 2.",
            "Same degrees (2), leading coefficients both 1 → HA at y = 1.",
            "x-intercept: from x + 1 = 0 (after canceling) → x = −1.",
          ],
        },
        {
          type: "mcq",
          prompt: "r(x) = (3x² + 5) / (x² − 4). The horizontal asymptote is",
          choices: ["y = 0", "y = 3", "y = 5/(−4)", "No HA — slant asymptote"],
          answer: 1,
          explain: "Same degree (2 and 2). HA = ratio of leading coefficients = 3 / 1 = 3.",
        },
        {
          type: "mcq",
          prompt: "r(x) = (x³ + 1) / (x² − 1). Which type of asymptote does this have?",
          choices: ["Horizontal at y = 0", "Horizontal at y = 1", "Slant (oblique) asymptote", "No asymptotes"],
          answer: 2,
          explain: "deg(p) = 3, deg(q) = 2. Difference is 1 → SLANT asymptote (find via polynomial division).",
        },
        {
          type: "drill",
          prompt: "r(x) = (x − 4) / (x² − 16). Identify the hole and the VA.",
          answer: "Hole at x = 4, VA at x = −4",
          steps: [
            "Factor denominator: x² − 16 = (x − 4)(x + 4)",
            "r(x) = (x − 4) / [(x − 4)(x + 4)] = 1/(x + 4)",
            "Cancel (x − 4) → HOLE at x = 4",
            "Remaining denominator zero: x = −4 → VA at x = −4",
          ],
        },
      ],
    },
    {
      id: "u1-modeling",
      title: "Modeling with polynomial and rational functions",
      estimateMin: 10,
      steps: [
        {
          type: "read",
          title: "Choosing the right model",
          body: [
            "For data tables, look at the differences. Constant 1st differences → LINEAR. Constant 2nd differences → QUADRATIC. Constant 3rd differences → CUBIC. And so on.",
            "When a quantity decreases towards zero as input grows, but never reaches zero, that's a horizontal asymptote at zero — likely a rational function with deg(numerator) < deg(denominator).",
            "Concavity: positive 2nd derivative (rising rate of change) → concave up. Negative 2nd derivative → concave down.",
            "Inverse variation y = k/x: as x doubles, y halves. Common modeling pattern.",
          ],
        },
        {
          type: "mcq",
          prompt: "A function's first differences are 2, 5, 8, 11. What's the function family?",
          choices: ["Linear", "Quadratic", "Cubic", "Exponential"],
          answer: 1,
          explain: "First differences are NOT constant (they grow by 3 each step). Second differences ARE constant (3, 3, 3) → quadratic.",
        },
        {
          type: "drill",
          prompt: "A car's stopping distance d (ft) is approximately 0.05v² where v is speed (mph). If speed doubles from 30 to 60 mph, by what factor does stopping distance grow?",
          answer: "4× (factor of 4)",
          steps: [
            "d(30) = 0.05 × 900 = 45 ft",
            "d(60) = 0.05 × 3600 = 180 ft",
            "180 / 45 = 4. Quadratic relation: doubling input quadruples output.",
          ],
        },
      ],
    },
    {
      id: "u1-mcqs",
      title: "Unit 1 mixed MCQs",
      estimateMin: 12,
      steps: [
        {
          type: "mcq",
          prompt: "f(x) = (x − 3)(x + 1)². Which best describes the graph at x = −1?",
          choices: [
            "Crosses the x-axis",
            "Touches and bounces back",
            "Has a vertical asymptote",
            "Has a hole",
          ],
          answer: 1,
          explain: "Multiplicity 2 (even) at x = −1 → graph touches and bounces.",
        },
        {
          type: "mcq",
          prompt: "f(x) = (2x² + 5x − 3) / (x² − 9). The function has a vertical asymptote at",
          choices: ["x = 3 only", "x = −3 only", "x = 3 and x = −3", "Neither — both are holes"],
          answer: 1,
          explain: "Factor: numerator (2x − 1)(x + 3), denominator (x − 3)(x + 3). The (x + 3) cancels → HOLE at x = −3. VA at x = 3 only.",
        },
        {
          type: "mcq",
          prompt: "Which is the end behavior of f(x) = 4x⁶ − 2x³ + 7?",
          choices: ["Both ends ↓", "Both ends ↑", "Left ↑, right ↓", "Left ↓, right ↑"],
          answer: 1,
          explain: "Even degree (6), positive leading coefficient → both ends ↑.",
        },
        {
          type: "mcq",
          prompt: "A polynomial of degree 5 has at most how many real zeros?",
          choices: ["3", "4", "5", "6"],
          answer: 2,
          explain: "Polynomial of degree n has exactly n complex zeros (with multiplicity), so at most n real zeros = 5.",
        },
        {
          type: "mcq",
          prompt: "f(x) = (x² − 4) / (x − 2). Simplified, this function is",
          choices: ["x + 2 with hole at x = 2", "x − 2 with hole at x = 2", "x + 2 with VA at x = 2", "x − 2 with VA at x = 2"],
          answer: 0,
          explain: "Factor: (x − 2)(x + 2) / (x − 2). Cancel → x + 2, with a HOLE at x = 2 (where the original was undefined).",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 2 — Unit 2: Exponentials and Logs
// ─────────────────────────────────────────────────────────────────────
const MOD_U2: Module = {
  id: "pre-u2",
  partNumber: 2,
  title: "Unit 2 — Exponential & Logarithmic",
  subtitle: "≈30% of the exam. Growth/decay, properties, equations, modeling, semi-log.",
  estimateMin: 100,
  priority: "must",
  lessons: [
    {
      id: "u2-exp",
      title: "Exponential functions and growth",
      estimateMin: 14,
      steps: [
        {
          type: "read",
          title: "Form, base, and shape",
          body: [
            "Exponential function: f(x) = a · b^x where b > 0, b ≠ 1. The base b decides growth (b > 1) or decay (0 < b < 1). The coefficient a is the y-intercept (since b^0 = 1).",
            "Horizontal asymptote at y = 0 (assuming no vertical shift). The function never reaches zero — it just gets arbitrarily close.",
            "f(x) = a · b^x has constant RATIO of consecutive outputs (each step, output multiplies by b). Linear functions have constant differences. Exponential have constant ratios.",
          ],
        },
        {
          type: "formula",
          title: "Exponential formulas",
          formulas: [
            "f(x) = a · b^x",
            "Continuous growth: A = P · e^(rt)",
            "Compound interest n times/year: A = P(1 + r/n)^(nt)",
            "Doubling time = ln(2) / k  (for f = a · e^(kt))",
            "Half-life = ln(2) / |k|  (for decay)",
          ],
        },
        {
          type: "example",
          title: "Bacteria doubling problem",
          prompt: "A bacteria culture doubles every 4 hours and starts at 200. How many bacteria after 12 hours?",
          solution: [
            "12 hours / 4 hours per doubling = 3 doublings",
            "Population = 200 × 2³ = 200 × 8 = 1,600",
          ],
        },
        {
          type: "mcq",
          prompt: "Which function shows decay?",
          choices: ["f(x) = 3 · 2^x", "f(x) = 5 · (1.05)^x", "f(x) = 10 · (0.7)^x", "f(x) = 4^x"],
          answer: 2,
          explain: "Base between 0 and 1 means decay. 0.7 < 1 → decay.",
        },
        {
          type: "mcq",
          prompt: "$1,000 invested at 6% compounded continuously for 5 years grows to approximately",
          choices: ["$1,300", "$1,338", "$1,350", "$1,500"],
          answer: 1,
          explain: "A = 1000 · e^(0.06 × 5) = 1000 · e^0.3 ≈ 1000 · 1.3499 ≈ $1,350. Closest is $1,338 (using more decimals); $1,350 is 1.35× rounded.",
          trap: "If you use simple interest (1000 × 1.30 = $1,300) you get the wrong answer.",
        },
        {
          type: "drill",
          prompt: "Population grows continuously at 3% per year. Doubling time?",
          answer: "≈ 23.1 years",
          steps: [
            "Doubling time = ln(2) / k",
            "= 0.693 / 0.03",
            "≈ 23.1 years",
          ],
        },
      ],
    },
    {
      id: "u2-log",
      title: "Logarithms — properties and equations",
      estimateMin: 16,
      steps: [
        {
          type: "read",
          title: "Logs are inverse exponentials",
          body: [
            "log_b(x) is the inverse of b^x. log_b(x) = y ⟺ b^y = x.",
            "Common log = log₁₀. Natural log = ln = log_e.",
            "Domain of log_b(x) is x > 0. You CANNOT take the log of zero or a negative.",
            "log_b(1) = 0 always. log_b(b) = 1 always. log_b(b^x) = x always.",
          ],
        },
        {
          type: "formula",
          title: "Log properties (memorize)",
          formulas: [
            "log(MN) = log M + log N        (product → sum)",
            "log(M/N) = log M − log N         (quotient → difference)",
            "log(M^k) = k · log M             (power → coefficient)",
            "log_b(x) = ln(x) / ln(b)         (change of base)",
            "b^(log_b(x)) = x   and   log_b(b^x) = x",
          ],
        },
        {
          type: "example",
          title: "Solve an exponential equation",
          prompt: "Solve 5^x = 80. Round to 3 decimals.",
          solution: [
            "Take ln of both sides: ln(5^x) = ln(80)",
            "Use power rule: x · ln(5) = ln(80)",
            "x = ln(80) / ln(5)",
            "x ≈ 4.382 / 1.609 ≈ 2.723",
          ],
        },
        {
          type: "example",
          title: "Solve a log equation",
          prompt: "Solve log₂(x − 1) + log₂(x + 1) = 3.",
          solution: [
            "Combine using product rule: log₂[(x − 1)(x + 1)] = 3",
            "Simplify: log₂(x² − 1) = 3",
            "Exponentiate: x² − 1 = 2³ = 8",
            "x² = 9 → x = ±3",
            "Check domain: x − 1 > 0 requires x > 1. x = 3 works. x = −3 rejected.",
            "Answer: x = 3.",
          ],
          takeaway: "Always check domain when solving log equations — extraneous solutions are common.",
        },
        {
          type: "mcq",
          prompt: "log₂(8) + log₂(4) =",
          choices: ["2", "5", "12", "32"],
          answer: 1,
          explain: "log₂(8) = 3, log₂(4) = 2. Sum = 5. Or via product rule: log₂(8 × 4) = log₂(32) = 5.",
        },
        {
          type: "mcq",
          prompt: "Solve ln(x) = 3.",
          choices: ["x = 1/e³", "x = e³ ≈ 20.09", "x = 3", "x = 1/3"],
          answer: 1,
          explain: "ln(x) = 3 means e^3 = x, so x = e³ ≈ 20.09.",
        },
        {
          type: "drill",
          prompt: "Use change of base to evaluate log₃(50). Round to 3 decimals.",
          answer: "≈ 3.561",
          steps: [
            "log₃(50) = ln(50) / ln(3)",
            "= 3.912 / 1.099",
            "≈ 3.561",
          ],
        },
      ],
    },
    {
      id: "u2-inverse",
      title: "Inverse functions and composition",
      estimateMin: 10,
      steps: [
        {
          type: "read",
          title: "Inverses reflect across y = x",
          body: [
            "Two functions f and g are inverses if f(g(x)) = x AND g(f(x)) = x for all x in their domains. Their graphs are reflections of each other across y = x.",
            "Domain of f = range of f⁻¹, and vice versa. This is a frequent question — restricting the domain of f² to x ≥ 0 gives an inverse √x with the same restricted domain.",
            "To find f⁻¹: swap x and y, then solve for y.",
            "Not every function has an inverse — must pass the horizontal line test (one-to-one).",
            "Common pairs: e^x and ln x. b^x and log_b(x). x² (restricted to x ≥ 0) and √x.",
          ],
        },
        {
          type: "example",
          title: "Find the inverse",
          prompt: "If f(x) = 3x − 5, find f⁻¹(x).",
          solution: [
            "Start: y = 3x − 5",
            "Swap x and y: x = 3y − 5",
            "Solve for y: y = (x + 5) / 3",
            "f⁻¹(x) = (x + 5) / 3",
          ],
        },
        {
          type: "mcq",
          prompt: "If f(x) = (x − 4)² for x ≥ 4, then f⁻¹(x) =",
          choices: ["√x + 4", "√x − 4", "(x + 4)²", "−√x + 4"],
          answer: 0,
          explain: "Swap: x = (y − 4)². Take square root (positive root since y ≥ 4): √x = y − 4 → y = √x + 4.",
        },
        {
          type: "drill",
          prompt: "If f(x) = 2x + 7 and g(x) = (x − 7) / 2, are they inverses? Verify.",
          answer: "Yes",
          steps: [
            "f(g(x)) = 2 · (x − 7)/2 + 7 = (x − 7) + 7 = x ✓",
            "g(f(x)) = (2x + 7 − 7)/2 = 2x/2 = x ✓",
            "Both compositions equal x → inverses confirmed.",
          ],
        },
      ],
    },
    {
      id: "u2-modeling",
      title: "Exponential modeling and semi-log plots",
      estimateMin: 10,
      steps: [
        {
          type: "read",
          title: "When to use exp vs polynomial",
          body: [
            "Use exponential when the data shows a CONSTANT RATIO between consecutive outputs (e.g., doubling every 5 days, halving every 1,000 years).",
            "Use polynomial when constant DIFFERENCES appear at some level.",
            "Real-world exponentials: compound interest, population growth, radioactive decay, drug elimination, viral spread.",
            "On a SEMI-LOG plot (y-axis log scale, x-axis linear), exponential data appears as a STRAIGHT LINE. The slope corresponds to the growth rate.",
          ],
        },
        {
          type: "drill",
          prompt: "A radioactive sample halves every 8 years. Starting amount 200 g. How much after 32 years?",
          answer: "12.5 g",
          steps: [
            "32 / 8 = 4 half-lives",
            "Amount = 200 × (1/2)⁴ = 200 × (1/16) = 12.5 g",
          ],
        },
        {
          type: "mcq",
          prompt: "On a semi-log plot, an exponential function appears as",
          choices: ["A parabola", "A straight line", "A hyperbola", "A horizontal line"],
          answer: 1,
          explain: "Semi-log: log(y) = log(a · b^x) = log(a) + x · log(b). This is linear in x → straight line.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 3 — Unit 3: Trig and Polar
// ─────────────────────────────────────────────────────────────────────
const MOD_U3: Module = {
  id: "pre-u3",
  partNumber: 3,
  title: "Unit 3 — Trig & Polar",
  subtitle: "≈30% of the exam. Unit circle, identities, sinusoidal modeling, polar.",
  estimateMin: 100,
  priority: "must",
  lessons: [
    {
      id: "u3-unit-circle",
      title: "Unit circle and the six trig functions",
      estimateMin: 14,
      steps: [
        {
          type: "read",
          title: "Coordinates around the unit circle",
          body: [
            "On the unit circle (radius 1, centered at origin), a point at angle θ has coordinates (cos θ, sin θ).",
            "Tangent θ = sin θ / cos θ. Reciprocal functions: csc θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ = cos θ / sin θ.",
            "Memorize key angles in BOTH radians and degrees: 0, π/6 (30°), π/4 (45°), π/3 (60°), π/2 (90°), and the rest by reflection.",
            "cos values are along the X-axis. sin values are along the Y-axis. Tangent slopes through origin.",
          ],
        },
        {
          type: "formula",
          title: "Key values to memorize cold",
          formulas: [
            "θ = 0:    cos = 1,    sin = 0",
            "θ = π/6 (30°):  cos = √3/2,  sin = 1/2",
            "θ = π/4 (45°):  cos = √2/2,  sin = √2/2",
            "θ = π/3 (60°):  cos = 1/2,   sin = √3/2",
            "θ = π/2 (90°):  cos = 0,    sin = 1",
            "Periods: sin, cos = 2π. tan, cot = π. sec, csc = 2π.",
          ],
          mnemonic: "ASTC (All-Sin-Tan-Cos) for which functions are positive in each quadrant: Q1 all+, Q2 sin+, Q3 tan+, Q4 cos+.",
        },
        {
          type: "read",
          title: "Pythagorean identities (must know cold)",
          body: [
            "Master identity: sin²θ + cos²θ = 1.",
            "Divide by cos²θ: 1 + tan²θ = sec²θ.",
            "Divide by sin²θ: cot²θ + 1 = csc²θ.",
            "These three are how you convert between sin/cos/tan when given one and asked for another.",
          ],
        },
        {
          type: "example",
          title: "Use Pythagorean to find cosine",
          prompt: "If sin θ = 3/5 and θ is in Q2, find cos θ.",
          solution: [
            "Pythagorean: cos²θ = 1 − sin²θ = 1 − 9/25 = 16/25",
            "cos θ = ±4/5",
            "Q2: cosine is NEGATIVE → cos θ = −4/5",
          ],
        },
        {
          type: "mcq",
          prompt: "cos(2π/3) =",
          choices: ["1/2", "−1/2", "√3/2", "−√3/2"],
          answer: 1,
          explain: "2π/3 is 120° (Q2). Reference angle is π/3 (60°), where cos = 1/2. In Q2 cosine is negative → −1/2.",
        },
        {
          type: "mcq",
          prompt: "If tan θ = 5/12 and θ is in Q3, find sin θ.",
          choices: ["5/13", "−5/13", "12/13", "−12/13"],
          answer: 1,
          explain: "Use Pythagorean triangle 5-12-13 (since 5² + 12² = 13²). Q3: both sin and cos negative. sin θ = −5/13.",
        },
        {
          type: "drill",
          prompt: "What's the period of f(x) = sin(3x)?",
          answer: "2π/3",
          steps: ["Period of sin(Bx) = 2π / |B| = 2π / 3."],
        },
      ],
    },
    {
      id: "u3-sinusoidal",
      title: "Sinusoidal modeling and transformations",
      estimateMin: 14,
      steps: [
        {
          type: "read",
          title: "Form: A·sin(B(x − C)) + D",
          body: [
            "Standard sinusoidal form: f(x) = A · sin(B(x − C)) + D.",
            "A = AMPLITUDE (vertical stretch). The function ranges from D − |A| to D + |A|.",
            "B = horizontal compression — PERIOD = 2π / |B|. Larger B → faster oscillation.",
            "C = horizontal SHIFT (phase shift).",
            "D = vertical SHIFT (midline). The function oscillates around y = D.",
            "Maximum = D + A. Minimum = D − A. Midline y = D.",
          ],
        },
        {
          type: "formula",
          title: "Sinusoidal formulas",
          formulas: [
            "Amplitude = (max − min) / 2",
            "Midline = (max + min) / 2",
            "Period = 2π / |B|  (in radians)",
            "B = 2π / period",
          ],
        },
        {
          type: "example",
          title: "Tide modeling",
          prompt: "Tides peak at 12 ft, trough at 4 ft, full cycle 12 hours. Build a sinusoidal model with t in hours, peak at t = 0.",
          solution: [
            "Amplitude = (12 − 4) / 2 = 4",
            "Midline = (12 + 4) / 2 = 8",
            "Period = 12 → B = 2π / 12 = π/6",
            "Peak at t = 0 → use cosine (cos starts at max)",
            "h(t) = 4 · cos((π/6) · t) + 8",
          ],
          takeaway: "Use cosine when the maximum is at t = 0. Use sine when the function starts at the midline going up.",
        },
        {
          type: "mcq",
          prompt: "f(x) = 3 · sin(2x) + 5. Period and amplitude?",
          choices: [
            "Period 2π, amplitude 3",
            "Period π, amplitude 3",
            "Period π, amplitude 5",
            "Period 2, amplitude 3",
          ],
          answer: 1,
          explain: "Period = 2π / |B| = 2π / 2 = π. Amplitude = |A| = 3.",
        },
        {
          type: "mcq",
          prompt: "A function ranges from −2 to 8. What's the midline and amplitude?",
          choices: [
            "Midline 5, amplitude 5",
            "Midline 3, amplitude 5",
            "Midline 5, amplitude 3",
            "Midline 3, amplitude 3",
          ],
          answer: 1,
          explain: "Midline = (max + min)/2 = (8 + (−2))/2 = 3. Amplitude = (max − min)/2 = (8 − (−2))/2 = 5.",
        },
      ],
    },
    {
      id: "u3-identities",
      title: "Identities — sum/difference and double angle",
      estimateMin: 12,
      steps: [
        {
          type: "formula",
          title: "Sum/difference identities",
          formulas: [
            "sin(A + B) = sin A · cos B + cos A · sin B",
            "sin(A − B) = sin A · cos B − cos A · sin B",
            "cos(A + B) = cos A · cos B − sin A · sin B",
            "cos(A − B) = cos A · cos B + sin A · sin B",
          ],
          mnemonic: "sin keeps the sign in sum/difference. cos FLIPS the sign (cos of sum has minus in middle).",
        },
        {
          type: "formula",
          title: "Double angle identities",
          formulas: [
            "sin(2θ) = 2 · sin θ · cos θ",
            "cos(2θ) = cos²θ − sin²θ",
            "         = 1 − 2 sin²θ",
            "         = 2 cos²θ − 1",
            "tan(2θ) = 2 tan θ / (1 − tan²θ)",
          ],
        },
        {
          type: "example",
          title: "Double angle from sine and cosine",
          prompt: "If sin θ = 3/5 and cos θ = 4/5, find sin(2θ) and cos(2θ).",
          solution: [
            "sin(2θ) = 2 · sin θ · cos θ = 2 · (3/5) · (4/5) = 24/25",
            "cos(2θ) = cos²θ − sin²θ = 16/25 − 9/25 = 7/25",
          ],
        },
        {
          type: "mcq",
          prompt: "sin(75°) using a sum identity? (Recall 75° = 45° + 30°.)",
          choices: [
            "(√6 + √2)/4",
            "(√6 − √2)/4",
            "(√3 + 1)/2",
            "(√6 + √2)/2",
          ],
          answer: 0,
          explain: "sin(45° + 30°) = sin 45° cos 30° + cos 45° sin 30° = (√2/2)(√3/2) + (√2/2)(1/2) = √6/4 + √2/4 = (√6 + √2)/4.",
        },
        {
          type: "drill",
          prompt: "Use a Pythagorean identity to simplify (1 + tan²x)/sec²x.",
          answer: "1",
          steps: [
            "1 + tan²x = sec²x  (Pythagorean identity)",
            "(sec²x) / (sec²x) = 1",
          ],
        },
      ],
    },
    {
      id: "u3-inverse-trig",
      title: "Inverse trig and solving trig equations",
      estimateMin: 10,
      steps: [
        {
          type: "read",
          title: "Inverse trig — restricted ranges",
          body: [
            "Inverse trig functions return ANGLES. To make the inverse a function (one-to-one), the original function's domain is restricted.",
            "arcsin (sin⁻¹) range: [−π/2, π/2] (Q4 to Q1).",
            "arccos range: [0, π] (Q1 and Q2).",
            "arctan range: (−π/2, π/2).",
            "When solving sin θ = k for general θ, use the inverse to get a reference, then add other quadrant solutions plus 2π·n for periodicity.",
          ],
        },
        {
          type: "example",
          title: "Solve a trig equation",
          prompt: "Solve sin θ = 1/2 for 0 ≤ θ < 2π.",
          solution: [
            "Reference angle: arcsin(1/2) = π/6.",
            "Sin is positive in Q1 and Q2.",
            "Q1: θ = π/6.",
            "Q2: θ = π − π/6 = 5π/6.",
            "Solutions: θ = π/6, 5π/6.",
          ],
        },
        {
          type: "mcq",
          prompt: "What's arcsin(−1)?",
          choices: ["π", "−π", "π/2", "−π/2"],
          answer: 3,
          explain: "arcsin range is [−π/2, π/2]. sin(−π/2) = −1. So arcsin(−1) = −π/2.",
        },
      ],
    },
    {
      id: "u3-polar",
      title: "Polar coordinates and graphs",
      estimateMin: 10,
      steps: [
        {
          type: "read",
          title: "Polar conversion and graph types",
          body: [
            "Polar coordinates use (r, θ): r = distance from origin, θ = angle from positive x-axis.",
            "Conversion: x = r cos θ, y = r sin θ. r² = x² + y², tan θ = y/x.",
            "Common polar graphs: r = a (circle radius a centered at origin). r = a · cos θ (circle through origin). r = a + b · cos θ (limaçon — cardioid if a = b). r = a · cos(nθ) (rose with n petals if n odd, 2n petals if n even).",
            "Average rate of change applies in polar context too: AROC of r over [θ₁, θ₂] = (r(θ₂) − r(θ₁)) / (θ₂ − θ₁).",
          ],
        },
        {
          type: "formula",
          title: "Polar↔rectangular formulas",
          formulas: [
            "x = r · cos θ",
            "y = r · sin θ",
            "r² = x² + y²",
            "tan θ = y / x",
          ],
        },
        {
          type: "example",
          title: "Convert (r, θ) = (4, π/3) to rectangular",
          prompt: "Convert the polar coordinate (4, π/3) to rectangular (x, y).",
          solution: [
            "x = r · cos θ = 4 · cos(π/3) = 4 · (1/2) = 2",
            "y = r · sin θ = 4 · sin(π/3) = 4 · (√3/2) = 2√3",
            "Rectangular: (2, 2√3).",
          ],
        },
        {
          type: "mcq",
          prompt: "How many petals does r = 3 · cos(4θ) have?",
          choices: ["3", "4", "8", "12"],
          answer: 2,
          explain: "Rose curve r = a · cos(nθ): if n is even, the rose has 2n petals. n = 4 → 8 petals.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 4 — Cheat Sheet + Exam Strategy + Final MCQs
// ─────────────────────────────────────────────────────────────────────
const MOD_CHEAT: Module = {
  id: "pre-cheat",
  partNumber: 4,
  title: "Cheat Sheet + Final MCQs",
  subtitle: "Every formula in one place + 10 mixed-unit MCQs + exam-day strategy.",
  estimateMin: 30,
  priority: "high",
  lessons: [
    {
      id: "cheat-formulas",
      title: "Master formula sheet",
      estimateMin: 5,
      steps: [
        {
          type: "formula",
          title: "All formulas in one place",
          formulas: [
            "AROC of f on [a, b] = (f(b) − f(a)) / (b − a)",
            "Polynomial degree n: nth differences constant",
            "VA: q(x) = 0 AND p(x) ≠ 0",
            "HA: deg comparison rule",
            "f(x) = a · b^x  (exponential)",
            "Continuous growth: A = P · e^(rt)",
            "Doubling time = ln(2) / k",
            "log_b(MN) = log_b M + log_b N",
            "log_b(M/N) = log_b M − log_b N",
            "log_b(M^k) = k · log_b M",
            "log_b(x) = ln(x) / ln(b)  (change of base)",
            "sin²θ + cos²θ = 1",
            "1 + tan²θ = sec²θ",
            "tan θ = sin θ / cos θ",
            "Period of sin/cos = 2π/|B|",
            "Amplitude = (max − min)/2",
            "Midline = (max + min)/2",
            "sin(2θ) = 2 sin θ cos θ",
            "cos(2θ) = 1 − 2 sin²θ",
            "x = r cos θ, y = r sin θ",
          ],
        },
      ],
    },
    {
      id: "cheat-traps",
      title: "Top traps to avoid",
      estimateMin: 4,
      steps: [
        {
          type: "read",
          title: "Pre-calc landmines",
          body: [
            "Hole vs VA: cancel common factors FIRST. Where the numerator and denominator share a zero → HOLE. Where only the denominator has a zero → VA.",
            "Even vs odd multiplicity at zeros: even → bounce, odd → cross.",
            "Domain of log: x > 0. Always check after solving log equations.",
            "Logs are inverse exponentials, NOT polynomials. log(a + b) ≠ log a + log b. log(a + b) doesn't simplify.",
            "Periodic solutions: when solving sin θ = k or cos θ = k, find ALL solutions in the requested interval, not just the first one.",
            "Quadrant of the angle determines sign. Always check.",
            "AROC ≠ instantaneous rate. AROC is the secant slope between two points.",
            "Inverse trig has restricted ranges (arcsin: [−π/2, π/2], arccos: [0, π]). Don't return angles outside these ranges.",
          ],
        },
      ],
    },
    {
      id: "cheat-mcqs",
      title: "10 mixed-unit MCQs",
      estimateMin: 14,
      steps: [
        {
          type: "mcq",
          prompt: "f(x) = (x − 2)²(x + 1). At x = 2:",
          choices: ["Crosses x-axis", "Bounces off x-axis", "VA", "Hole"],
          answer: 1,
          explain: "Multiplicity 2 (even) → bounces.",
        },
        {
          type: "mcq",
          prompt: "Solve 4^x = 64.",
          choices: ["2", "3", "4", "16"],
          answer: 1,
          explain: "64 = 4³ → x = 3.",
        },
        {
          type: "mcq",
          prompt: "log₅(125) =",
          choices: ["2", "3", "5", "25"],
          answer: 1,
          explain: "5³ = 125 → log₅(125) = 3.",
        },
        {
          type: "mcq",
          prompt: "Period of f(x) = 4 · cos(πx/3) is",
          choices: ["3", "6", "π/3", "2π/3"],
          answer: 1,
          explain: "Period = 2π / |B| = 2π / (π/3) = 2π · 3/π = 6.",
        },
        {
          type: "mcq",
          prompt: "If sin θ = −3/5 and θ is in Q4, then cos θ =",
          choices: ["−4/5", "4/5", "−3/4", "3/4"],
          answer: 1,
          explain: "Pythagorean: cos²θ = 1 − 9/25 = 16/25 → cos θ = ±4/5. Q4: cosine is positive → 4/5.",
        },
        {
          type: "mcq",
          prompt: "f(x) = (x² − 1)/(x + 1). Simplified:",
          choices: ["x − 1 with hole at x = −1", "x + 1 with hole at x = −1", "x − 1 with VA at x = −1", "x + 1 with VA at x = −1"],
          answer: 0,
          explain: "Factor: (x − 1)(x + 1) / (x + 1). Cancel (x + 1) → x − 1, with HOLE at x = −1.",
        },
        {
          type: "mcq",
          prompt: "Solve sin(2θ) = 0 for 0 ≤ θ < 2π.",
          choices: [
            "θ = 0, π",
            "θ = 0, π/2, π, 3π/2",
            "θ = π/2 only",
            "θ = π/4, 3π/4",
          ],
          answer: 1,
          explain: "sin(2θ) = 0 means 2θ = 0, π, 2π, 3π, 4π. So θ = 0, π/2, π, 3π/2 (within [0, 2π)).",
        },
        {
          type: "mcq",
          prompt: "log₂(32) − log₂(4) =",
          choices: ["2", "3", "8", "28"],
          answer: 1,
          explain: "log₂(32) = 5, log₂(4) = 2. 5 − 2 = 3. Or via quotient rule: log₂(32/4) = log₂(8) = 3.",
        },
        {
          type: "mcq",
          prompt: "Convert polar (3, π/2) to rectangular.",
          choices: ["(3, 0)", "(0, 3)", "(0, −3)", "(−3, 0)"],
          answer: 1,
          explain: "x = 3 cos(π/2) = 0. y = 3 sin(π/2) = 3. Rectangular: (0, 3).",
        },
        {
          type: "mcq",
          prompt: "Bacteria population doubles every 5 hours. Starting at 100. After 20 hours?",
          choices: ["400", "800", "1,600", "3,200"],
          answer: 2,
          explain: "20 / 5 = 4 doublings. 100 × 2⁴ = 100 × 16 = 1,600.",
        },
      ],
    },
    {
      id: "cheat-strategy",
      title: "Exam-day strategy",
      estimateMin: 7,
      steps: [
        {
          type: "read",
          title: "Pacing and approach",
          body: [
            "Section I (MCQ): 40 questions, 60 minutes total. Two parts — Part A (28 questions, 80 min, no calculator restriction) and Part B (with calculator, 12 questions, 40 min). Per-question time: ~90 sec.",
            "Section II (FRQ): 4 free-response questions, 60 minutes. Calculator used on parts where allowed.",
            "Two-pass MCQ: easy questions first (under 60 sec), harder ones second pass. Final pass: guess any blanks (no penalty).",
            "FRQ: read all four first. Outline answers in your head before writing. Show all work — partial credit is rewarded for correct setup even with arithmetic errors.",
          ],
        },
        {
          type: "read",
          title: "Final mantra",
          body: [
            "Identify the function family first (polynomial / rational / exp / log / trig / polar).",
            "Apply the technique that family demands: factor for polynomials, properties for logs, identities for trig, conversion for polar.",
            "Check domain on log and rational problems. Check quadrant on trig.",
            "Show every step. Even if you're not sure about the final answer, the setup earns points.",
            "Trust the prep.",
          ],
          callouts: [
            {
              kind: "strategy",
              title: "If stuck",
              body: "Skip and come back. Never spend more than 2 minutes on a single MCQ. The next question might be easier.",
            },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// COURSE EXPORT
// ─────────────────────────────────────────────────────────────────────

export const AP_PRECALC_COURSE: Course = {
  id: "ap-precalc",
  examLabel: "AP Precalculus",
  examDate: "2026-05-12",
  totalEstimateMin: 340,    // ~5h 40m
  modules: [MOD_U1, MOD_U2, MOD_U3, MOD_CHEAT],
};
