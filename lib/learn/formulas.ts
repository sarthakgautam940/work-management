// 88 formula-sheet items as flashcards. Each card is two-sided:
// `front` is the prompt / name, `back` is the formula or answer.

export type FormulaCard = {
  id: string;
  topic: string;
  unit: "u1" | "u2" | "u3" | "general";
  front: string;
  back: string;
};

export const FORMULAS: FormulaCard[] = [
  // ───── Rate of Change ─────
  { id: "f-arc", topic: "Rate of Change", unit: "u1", front: "Average rate of change of $f$ on $[a, b]$", back: "$\\dfrac{f(b) - f(a)}{b - a}$ — slope of secant" },
  { id: "f-inc-up", topic: "Rate of Change", unit: "u1", front: "Increasing & concave up", back: "Increasing at increasing rate" },
  { id: "f-inc-dn", topic: "Rate of Change", unit: "u1", front: "Increasing & concave down", back: "Increasing at decreasing rate" },
  { id: "f-dec-up", topic: "Rate of Change", unit: "u1", front: "Decreasing & concave up", back: "Decreasing at decreasing rate" },
  { id: "f-dec-dn", topic: "Rate of Change", unit: "u1", front: "Decreasing & concave down", back: "Decreasing at increasing rate" },

  // ───── Polynomial End Behavior ─────
  { id: "f-end-even-pos", topic: "Polynomial", unit: "u1", front: "End behavior: even degree, positive leading", back: "Both ends $\\to +\\infty$" },
  { id: "f-end-even-neg", topic: "Polynomial", unit: "u1", front: "End behavior: even degree, negative leading", back: "Both ends $\\to -\\infty$" },
  { id: "f-end-odd-pos", topic: "Polynomial", unit: "u1", front: "End behavior: odd degree, positive leading", back: "Right $\\to +\\infty$, left $\\to -\\infty$" },
  { id: "f-end-odd-neg", topic: "Polynomial", unit: "u1", front: "End behavior: odd degree, negative leading", back: "Right $\\to -\\infty$, left $\\to +\\infty$" },
  { id: "f-mult-odd", topic: "Polynomial", unit: "u1", front: "Multiplicity behavior at zero (odd)", back: "Graph CROSSES axis. Multiplicity 1: linear. Multiplicity $\\ge 3$: flattens." },
  { id: "f-mult-even", topic: "Polynomial", unit: "u1", front: "Multiplicity behavior at zero (even)", back: "Graph TOUCHES axis but doesn't cross (tangent)." },
  { id: "f-conjugate", topic: "Polynomial", unit: "u1", front: "Complex zeros of real polynomial", back: "Come in conjugate pairs: $a + bi$ ⇔ $a - bi$" },
  { id: "f-fta", topic: "Polynomial", unit: "u1", front: "Fundamental Theorem of Algebra", back: "Degree-$n$ polynomial has exactly $n$ complex zeros (counting multiplicity)." },

  // ───── Rational Functions ─────
  { id: "f-ha-less", topic: "Rational", unit: "u1", front: "HA when num degree < denom degree", back: "$y = 0$" },
  { id: "f-ha-equal", topic: "Rational", unit: "u1", front: "HA when num degree = denom degree", back: "$y = a_n / b_m$ (ratio of leading coefficients)" },
  { id: "f-ha-slant", topic: "Rational", unit: "u1", front: "HA when num degree = denom degree + 1", back: "Slant asymptote — find by polynomial division" },
  { id: "f-ha-none", topic: "Rational", unit: "u1", front: "HA when num degree > denom degree + 1", back: "No HA — function grows like $x^{n-m}$" },
  { id: "f-va", topic: "Rational", unit: "u1", front: "Vertical asymptote at $x = c$", back: "$q(c) = 0$ AND $p(c) \\ne 0$ (after reducing fraction)" },
  { id: "f-hole", topic: "Rational", unit: "u1", front: "Hole at $x = c$", back: "Common factor $(x - c)$ cancels. Y-coord: $\\lim_{x \\to c} f(x)$ in reduced form." },

  // ───── Transformations ─────
  { id: "f-trans-form", topic: "Transformations", unit: "u1", front: "General transformation", back: "$g(x) = a f(b(x - h)) + k$" },
  { id: "f-trans-a", topic: "Transformations", unit: "u1", front: "Effect of $a$", back: "Vertical dilation by $|a|$. If $a < 0$, reflect across x-axis." },
  { id: "f-trans-b", topic: "Transformations", unit: "u1", front: "Effect of $b$", back: "Horizontal dilation by $1/|b|$. If $b < 0$, reflect across y-axis." },
  { id: "f-trans-h", topic: "Transformations", unit: "u1", front: "Effect of $h$", back: "Horizontal shift right by $h$ (signs feel backwards)" },
  { id: "f-trans-k", topic: "Transformations", unit: "u1", front: "Effect of $k$", back: "Vertical shift up by $k$" },
  { id: "f-trans-range", topic: "Transformations", unit: "u1", front: "Range of $a f(\\cdot) + k$ when $a > 0$", back: "$[am + k, aM + k]$ where $f$ has range $[m, M]$" },

  // ───── Exponent Rules ─────
  { id: "f-exp-product", topic: "Exponent rules", unit: "u2", front: "Exponent product rule", back: "$b^m \\cdot b^n = b^{m+n}$" },
  { id: "f-exp-quotient", topic: "Exponent rules", unit: "u2", front: "Exponent quotient rule", back: "$b^m / b^n = b^{m-n}$" },
  { id: "f-exp-power", topic: "Exponent rules", unit: "u2", front: "Power of a power", back: "$(b^m)^n = b^{mn}$" },
  { id: "f-exp-neg", topic: "Exponent rules", unit: "u2", front: "Negative exponent", back: "$b^{-m} = 1/b^m$" },
  { id: "f-exp-frac", topic: "Exponent rules", unit: "u2", front: "Fractional exponent", back: "$b^{m/n} = \\sqrt[n]{b^m}$" },
  { id: "f-exp-sameexp", topic: "Exponent rules", unit: "u2", front: "Same exponent, different base", back: "$a^m b^m = (ab)^m$" },

  // ───── Log Rules ─────
  { id: "f-log-def", topic: "Log rules", unit: "u2", front: "Logarithm definition", back: "$\\log_b y = x \\iff b^x = y$" },
  { id: "f-log-product", topic: "Log rules", unit: "u2", front: "Log product rule", back: "$\\log_b(MN) = \\log_b M + \\log_b N$" },
  { id: "f-log-quotient", topic: "Log rules", unit: "u2", front: "Log quotient rule", back: "$\\log_b(M/N) = \\log_b M - \\log_b N$" },
  { id: "f-log-power", topic: "Log rules", unit: "u2", front: "Log power rule", back: "$\\log_b(M^p) = p \\log_b M$" },
  { id: "f-log-cob", topic: "Log rules", unit: "u2", front: "Change of base", back: "$\\log_b M = \\dfrac{\\ln M}{\\ln b} = \\dfrac{\\log M}{\\log b}$" },
  { id: "f-log-1", topic: "Log rules", unit: "u2", front: "$\\log_b 1$", back: "$0$ (since $b^0 = 1$)" },
  { id: "f-log-b", topic: "Log rules", unit: "u2", front: "$\\log_b b$", back: "$1$ (since $b^1 = b$)" },
  { id: "f-log-inv1", topic: "Log rules", unit: "u2", front: "$\\log_b(b^x)$", back: "$x$" },
  { id: "f-log-inv2", topic: "Log rules", unit: "u2", front: "$b^{\\log_b x}$", back: "$x$" },
  { id: "f-log-domain", topic: "Log rules", unit: "u2", front: "Domain of $\\log_b(\\text{stuff})$", back: "Stuff must be > 0. Always check after solving." },

  // ───── Sequences ─────
  { id: "f-arith-rec", topic: "Sequences", unit: "u2", front: "Arithmetic recursive", back: "$a_n = a_{n-1} + d$" },
  { id: "f-arith-exp", topic: "Sequences", unit: "u2", front: "Arithmetic explicit", back: "$a_n = a_1 + (n-1)d$" },
  { id: "f-geom-rec", topic: "Sequences", unit: "u2", front: "Geometric recursive", back: "$g_n = r \\cdot g_{n-1}$" },
  { id: "f-geom-exp", topic: "Sequences", unit: "u2", front: "Geometric explicit", back: "$g_n = g_1 \\cdot r^{n-1}$" },

  // ───── Modeling Patterns ─────
  { id: "f-mod-linear", topic: "Modeling", unit: "general", front: "Constant $\\Delta y$ over equal $\\Delta x$", back: "Linear" },
  { id: "f-mod-quad", topic: "Modeling", unit: "general", front: "Constant $\\Delta^2 y$ over equal $\\Delta x$", back: "Quadratic" },
  { id: "f-mod-poly", topic: "Modeling", unit: "general", front: "Constant $\\Delta^n y$", back: "Polynomial of degree $n$" },
  { id: "f-mod-exp", topic: "Modeling", unit: "general", front: "Constant ratio $y_{i+1}/y_i$", back: "Exponential" },
  { id: "f-mod-log", topic: "Modeling", unit: "general", front: "Equal multiplicative $x$ change ⇒ constant $\\Delta y$", back: "Logarithmic" },

  // ───── Unit Circle ─────
  { id: "f-uc-0", topic: "Unit Circle", unit: "u3", front: "$\\sin(0), \\cos(0)$", back: "$0, 1$" },
  { id: "f-uc-pi6", topic: "Unit Circle", unit: "u3", front: "$\\sin(\\pi/6), \\cos(\\pi/6)$", back: "$1/2, \\sqrt{3}/2$" },
  { id: "f-uc-pi4", topic: "Unit Circle", unit: "u3", front: "$\\sin(\\pi/4), \\cos(\\pi/4)$", back: "$\\sqrt{2}/2, \\sqrt{2}/2$" },
  { id: "f-uc-pi3", topic: "Unit Circle", unit: "u3", front: "$\\sin(\\pi/3), \\cos(\\pi/3)$", back: "$\\sqrt{3}/2, 1/2$" },
  { id: "f-uc-pi2", topic: "Unit Circle", unit: "u3", front: "$\\sin(\\pi/2), \\cos(\\pi/2)$", back: "$1, 0$" },
  { id: "f-uc-pi", topic: "Unit Circle", unit: "u3", front: "$\\sin(\\pi), \\cos(\\pi)$", back: "$0, -1$" },
  { id: "f-uc-3pi2", topic: "Unit Circle", unit: "u3", front: "$\\sin(3\\pi/2), \\cos(3\\pi/2)$", back: "$-1, 0$" },
  { id: "f-uc-astc-q1", topic: "Unit Circle", unit: "u3", front: "Q1: which trig functions are positive?", back: "All (A in ASTC)" },
  { id: "f-uc-astc-q2", topic: "Unit Circle", unit: "u3", front: "Q2: which trig functions are positive?", back: "Only sin (S)" },
  { id: "f-uc-astc-q3", topic: "Unit Circle", unit: "u3", front: "Q3: which trig functions are positive?", back: "Only tan (T)" },
  { id: "f-uc-astc-q4", topic: "Unit Circle", unit: "u3", front: "Q4: which trig functions are positive?", back: "Only cos (C)" },

  // ───── Sinusoidal ─────
  { id: "f-sin-form", topic: "Sinusoidal", unit: "u3", front: "Sinusoidal general form", back: "$f(t) = A\\sin(B(t - C)) + D$" },
  { id: "f-sin-A", topic: "Sinusoidal", unit: "u3", front: "Amplitude $A$", back: "$|A| = (\\max - \\min)/2$" },
  { id: "f-sin-D", topic: "Sinusoidal", unit: "u3", front: "Midline $D$", back: "$D = (\\max + \\min)/2$" },
  { id: "f-sin-B", topic: "Sinusoidal", unit: "u3", front: "Period from $B$", back: "$P = 2\\pi/|B|$" },
  { id: "f-sin-C", topic: "Sinusoidal", unit: "u3", front: "Phase shift $C$", back: "Horizontal shift right by $C$" },

  // ───── Tangent ─────
  { id: "f-tan-period", topic: "Tangent", unit: "u3", front: "Period of $\\tan x$", back: "$\\pi$ (not $2\\pi$)" },
  { id: "f-tan-va", topic: "Tangent", unit: "u3", front: "VAs of $\\tan x$", back: "$x = \\pi/2 + k\\pi$" },
  { id: "f-tan-zeros", topic: "Tangent", unit: "u3", front: "Zeros of $\\tan x$", back: "$x = k\\pi$" },
  { id: "f-tan-mono", topic: "Tangent", unit: "u3", front: "Monotonicity of $\\tan x$ between VAs", back: "Always increasing" },
  { id: "f-tan-conc", topic: "Tangent", unit: "u3", front: "Concavity of $\\tan x$", back: "Concave up where $\\tan > 0$, down where $\\tan < 0$" },

  // ───── Inverse Trig ─────
  { id: "f-arcsin-range", topic: "Inverse trig", unit: "u3", front: "Range of $\\arcsin$", back: "$[-\\pi/2, \\pi/2]$" },
  { id: "f-arccos-range", topic: "Inverse trig", unit: "u3", front: "Range of $\\arccos$", back: "$[0, \\pi]$" },
  { id: "f-arctan-range", topic: "Inverse trig", unit: "u3", front: "Range of $\\arctan$", back: "$(-\\pi/2, \\pi/2)$" },
  { id: "f-arcsin-domain", topic: "Inverse trig", unit: "u3", front: "Domain of $\\arcsin, \\arccos$", back: "$[-1, 1]$" },
  { id: "f-arctan-domain", topic: "Inverse trig", unit: "u3", front: "Domain of $\\arctan$", back: "All real numbers" },

  // ───── Trig Identities ─────
  { id: "f-pyth-1", topic: "Identities", unit: "u3", front: "Pythagorean identity", back: "$\\sin^2\\theta + \\cos^2\\theta = 1$" },
  { id: "f-pyth-2", topic: "Identities", unit: "u3", front: "Pythagorean (tan/sec)", back: "$1 + \\tan^2\\theta = \\sec^2\\theta$" },
  { id: "f-pyth-3", topic: "Identities", unit: "u3", front: "Pythagorean (cot/csc)", back: "$1 + \\cot^2\\theta = \\csc^2\\theta$" },
  { id: "f-sum-sin", topic: "Identities", unit: "u3", front: "Sum identity: $\\sin(\\alpha + \\beta)$", back: "$\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$" },
  { id: "f-sum-cos", topic: "Identities", unit: "u3", front: "Sum identity: $\\cos(\\alpha + \\beta)$", back: "$\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$" },
  { id: "f-diff-sin", topic: "Identities", unit: "u3", front: "Difference identity: $\\sin(\\alpha - \\beta)$", back: "$\\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta$" },
  { id: "f-diff-cos", topic: "Identities", unit: "u3", front: "Difference identity: $\\cos(\\alpha - \\beta)$", back: "$\\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta$" },
  { id: "f-da-sin", topic: "Identities", unit: "u3", front: "Double angle: $\\sin(2\\theta)$", back: "$2\\sin\\theta\\cos\\theta$" },
  { id: "f-da-cos", topic: "Identities", unit: "u3", front: "Double angle: $\\cos(2\\theta)$", back: "$\\cos^2\\theta - \\sin^2\\theta = 1 - 2\\sin^2\\theta = 2\\cos^2\\theta - 1$" },
  { id: "f-cofunc-sin", topic: "Identities", unit: "u3", front: "Cofunction: $\\sin(\\pi/2 - \\theta)$", back: "$\\cos\\theta$" },
  { id: "f-cofunc-cos", topic: "Identities", unit: "u3", front: "Cofunction: $\\cos(\\pi/2 - \\theta)$", back: "$\\sin\\theta$" },
  { id: "f-even-cos", topic: "Identities", unit: "u3", front: "$\\cos(-\\theta)$", back: "$\\cos\\theta$ (cos is even)" },
  { id: "f-odd-sin", topic: "Identities", unit: "u3", front: "$\\sin(-\\theta)$", back: "$-\\sin\\theta$ (sin is odd)" },
  { id: "f-2pi-cos", topic: "Identities", unit: "u3", front: "$\\cos(2\\pi - \\theta)$", back: "$\\cos\\theta$" },
  { id: "f-2pi-sin", topic: "Identities", unit: "u3", front: "$\\sin(2\\pi - \\theta)$", back: "$-\\sin\\theta$" },

  // ───── Trig Solutions ─────
  { id: "f-solve-sin", topic: "Trig equations", unit: "u3", front: "All solutions of $\\sin x = c$ ($|c| \\le 1$)", back: "$x = \\arcsin c + 2\\pi k$ or $\\pi - \\arcsin c + 2\\pi k$" },
  { id: "f-solve-cos", topic: "Trig equations", unit: "u3", front: "All solutions of $\\cos x = c$ ($|c| \\le 1$)", back: "$x = \\pm \\arccos c + 2\\pi k$" },
  { id: "f-solve-tan", topic: "Trig equations", unit: "u3", front: "All solutions of $\\tan x = c$", back: "$x = \\arctan c + \\pi k$" },

  // ───── Polar ─────
  { id: "f-pol-rect", topic: "Polar", unit: "u3", front: "Polar to rectangular", back: "$x = r\\cos\\theta, \\ y = r\\sin\\theta$" },
  { id: "f-rect-pol", topic: "Polar", unit: "u3", front: "Rectangular to polar", back: "$r = \\sqrt{x^2 + y^2}, \\ \\theta = \\arctan(y/x)$ (with quadrant adjustment)" },
  { id: "f-pol-neg", topic: "Polar", unit: "u3", front: "Negative $r$ convention", back: "$(r, \\theta) = (|r|, \\theta + \\pi)$" },
  { id: "f-pol-complex", topic: "Polar", unit: "u3", front: "Complex polar form", back: "$a + bi = r(\\cos\\theta + i\\sin\\theta)$" },
  { id: "f-pol-rose-odd", topic: "Polar", unit: "u3", front: "$r = a\\cos(n\\theta)$, $n$ odd: petal count", back: "$n$ petals" },
  { id: "f-pol-rose-even", topic: "Polar", unit: "u3", front: "$r = a\\cos(n\\theta)$, $n$ even: petal count", back: "$2n$ petals" },
  { id: "f-pol-limacon", topic: "Polar", unit: "u3", front: "Limaçon $r = a + b\\cos\\theta$ classification", back: "$|a/b| < 1$: inner loop. $= 1$: cardioid. $1 < <2$: dimpled. $\\ge 2$: convex." },
];
