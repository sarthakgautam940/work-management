# Formula Sheet — Memorize Cold

Everything here is fair game on the AP Precalculus exam. The College Board does **not** provide a formula sheet. Memorize.

---

## Rate of Change

$$\text{ARC}_{[a,b]}(f) = \frac{f(b) - f(a)}{b - a}$$

| Behavior | Translation |
|---|---|
| Increasing & concave up | Increasing at increasing rate |
| Increasing & concave down | Increasing at decreasing rate |
| Decreasing & concave up | Decreasing at decreasing rate |
| Decreasing & concave down | Decreasing at increasing rate |

---

## Polynomial End Behavior

Determined by leading term $a_n x^n$:

| $n$ | sign of $a_n$ | $\lim_{x\to\infty}$ | $\lim_{x\to-\infty}$ |
|---|---|---|---|
| Even | + | $+\infty$ | $+\infty$ |
| Even | − | $-\infty$ | $-\infty$ |
| Odd | + | $+\infty$ | $-\infty$ |
| Odd | − | $-\infty$ | $+\infty$ |

**Multiplicity at zero:** odd → cross; even → touch (tangent).

**Complex roots come in conjugate pairs** for real-coefficient polynomials.

---

## Rational Function End Behavior

Numerator degree $n$, denominator degree $m$:

| Case | Asymptote |
|---|---|
| $n < m$ | $y = 0$ |
| $n = m$ | $y = a_n / b_m$ (ratio of leading coefficients) |
| $n = m + 1$ | Slant (linear) — find by long division |
| $n > m + 1$ | None — function grows like $x^{n-m}$ |

**Vertical asymptote at $x = c$:** denominator zero AND numerator nonzero (after reducing).

**Hole at $x = c$:** common factor $(x - c)$ cancels. The y-coordinate of the hole is $\lim_{x \to c} f(x)$ in the reduced form.

---

## Transformations

For $g(x) = a f(b(x - h)) + k$:

- $a$: vertical dilation by $|a|$, reflect across x-axis if $a < 0$.
- $b$: horizontal dilation by $1/|b|$, reflect across y-axis if $b < 0$.
- $h$: horizontal shift right by $h$.
- $k$: vertical shift up by $k$.

Range of $a f(\cdot) + k$ where $f$ has range $[m, M]$: $[am + k, aM + k]$ if $a > 0$.

---

## Exponent Rules

| Rule | Form |
|---|---|
| Product | $b^m b^n = b^{m+n}$ |
| Quotient | $b^m / b^n = b^{m-n}$ |
| Power | $(b^m)^n = b^{mn}$ |
| Negative | $b^{-m} = 1/b^m$ |
| Fractional | $b^{m/n} = \sqrt[n]{b^m}$ |
| Same exp, diff base | $a^m b^m = (ab)^m$ |

---

## Logarithm Rules

| Rule | Form |
|---|---|
| Definition | $\log_b y = x \iff b^x = y$ |
| Product | $\log_b(MN) = \log_b M + \log_b N$ |
| Quotient | $\log_b(M/N) = \log_b M - \log_b N$ |
| Power | $\log_b(M^p) = p \log_b M$ |
| Change of base | $\log_b M = \dfrac{\ln M}{\ln b} = \dfrac{\log M}{\log b}$ |
| Identity 1 | $\log_b 1 = 0$ |
| Identity 2 | $\log_b b = 1$ |
| Inverse 1 | $\log_b(b^x) = x$ |
| Inverse 2 | $b^{\log_b x} = x$ |

**Notation:** $\log x = \log_{10} x$ (common). $\ln x = \log_e x$ (natural).

**Domain check:** $\log_b(\text{stuff})$ requires stuff > 0. Always check after solving.

---

## Sequences

**Arithmetic** (common difference $d$):
- Recursive: $a_n = a_{n-1} + d$.
- Explicit: $a_n = a_1 + (n-1) d$.

**Geometric** (common ratio $r$):
- Recursive: $g_n = r \cdot g_{n-1}$.
- Explicit: $g_n = g_1 \cdot r^{n-1}$.

---

## Modeling Patterns

| Data pattern | Model |
|---|---|
| Equal $\Delta x$ → constant $\Delta y$ | Linear |
| Equal $\Delta x$ → constant $\Delta^2 y$ | Quadratic |
| Equal $\Delta x$ → constant $\Delta^n y$ | Polynomial degree $n$ |
| Equal $\Delta x$ → constant ratio $y_{i+1}/y_i$ | Exponential |
| Equal $\times$ change in $x$ → constant $\Delta y$ | Logarithmic |

---

## Unit Circle (memorize)

| $\theta$ | $\cos\theta$ | $\sin\theta$ |
|---|---|---|
| $0$ | $1$ | $0$ |
| $\pi/6$ | $\sqrt{3}/2$ | $1/2$ |
| $\pi/4$ | $\sqrt{2}/2$ | $\sqrt{2}/2$ |
| $\pi/3$ | $1/2$ | $\sqrt{3}/2$ |
| $\pi/2$ | $0$ | $1$ |
| $\pi$ | $-1$ | $0$ |
| $3\pi/2$ | $0$ | $-1$ |
| $2\pi$ | $1$ | $0$ |

For other multiples of $\pi/6, \pi/4, \pi/3$ in QII–QIV, use reference angle and quadrant signs (ASTC).

**Quadrant signs:**

| Q | sin | cos | tan |
|---|---|---|---|
| I | + | + | + |
| II | + | − | − |
| III | − | − | + |
| IV | − | + | − |

---

## Sinusoidal Functions

$$f(t) = A \sin(B(t - C)) + D \quad \text{or} \quad A \cos(B(t - C)) + D$$

| Constant | Meaning |
|---|---|
| $|A|$ | Amplitude $= (\max - \min)/2$ |
| $D$ | Midline $= (\max + \min)/2$ |
| $B$ | Period $= 2\pi/|B|$ |
| $C$ | Phase shift right by $C$ |

**Cosine peaks at the phase shift; sine crosses midline going up at the phase shift.**

---

## Tangent

- Period $\pi$.
- Asymptotes at $\theta = \pi/2 + k\pi$.
- Zeros at $\theta = k\pi$.
- Always increasing between asymptotes.
- Concave up where $\tan > 0$, concave down where $\tan < 0$.

---

## Reciprocal Trig Functions

$$\sec\theta = \frac{1}{\cos\theta}, \quad \csc\theta = \frac{1}{\sin\theta}, \quad \cot\theta = \frac{\cos\theta}{\sin\theta} = \frac{1}{\tan\theta}$$

| Function | Period | Range |
|---|---|---|
| $\sec$ | $2\pi$ | $(-\infty, -1] \cup [1, \infty)$ |
| $\csc$ | $2\pi$ | $(-\infty, -1] \cup [1, \infty)$ |
| $\cot$ | $\pi$ | All reals |

---

## Inverse Trig Functions

| Function | Domain | Range |
|---|---|---|
| $\arcsin$ | $[-1, 1]$ | $[-\pi/2, \pi/2]$ |
| $\arccos$ | $[-1, 1]$ | $[0, \pi]$ |
| $\arctan$ | All reals | $(-\pi/2, \pi/2)$ |

**$\arcsin(\sin x) \ne x$ in general.** Only true if $x \in [-\pi/2, \pi/2]$.

---

## Trig Identities

**Pythagorean:**
$$\sin^2\theta + \cos^2\theta = 1$$
$$1 + \tan^2\theta = \sec^2\theta$$
$$1 + \cot^2\theta = \csc^2\theta$$

Useful rearrangements:
$$1 - \sin^2\theta = \cos^2\theta$$
$$1 - \cos^2\theta = \sin^2\theta$$
$$\sec^2\theta - 1 = \tan^2\theta$$

**Sum and difference:**
$$\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta$$
$$\cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta$$
$$\tan(\alpha \pm \beta) = \frac{\tan\alpha \pm \tan\beta}{1 \mp \tan\alpha\tan\beta}$$

**Double-angle:**
$$\sin(2\theta) = 2\sin\theta\cos\theta$$
$$\cos(2\theta) = \cos^2\theta - \sin^2\theta = 1 - 2\sin^2\theta = 2\cos^2\theta - 1$$
$$\tan(2\theta) = \frac{2\tan\theta}{1 - \tan^2\theta}$$

**Cofunction:**
$$\sin(\pi/2 - \theta) = \cos\theta, \quad \cos(\pi/2 - \theta) = \sin\theta$$

**Even/odd reflections:**
$$\cos(-\theta) = \cos\theta, \quad \sin(-\theta) = -\sin\theta, \quad \tan(-\theta) = -\tan\theta$$
$$\cos(2\pi - \theta) = \cos\theta, \quad \sin(2\pi - \theta) = -\sin\theta$$

**Supplement and complement:**
$$\sin(\pi - \theta) = \sin\theta, \quad \cos(\pi - \theta) = -\cos\theta$$

---

## Solving Trig Equations — Standard Solution Sets

| Equation | All real solutions |
|---|---|
| $\sin x = c$ ($|c| \le 1$) | $x = \arcsin c + 2\pi k$ or $x = (\pi - \arcsin c) + 2\pi k$ |
| $\cos x = c$ ($|c| \le 1$) | $x = \pm \arccos c + 2\pi k$ |
| $\tan x = c$ | $x = \arctan c + \pi k$ |

---

## Polar Coordinates

**Polar to Cartesian:** $x = r\cos\theta$, $y = r\sin\theta$.

**Cartesian to polar:** $r = \sqrt{x^2 + y^2}$, $\theta = \arctan(y/x)$ (with quadrant adjustment).

**Negative $r$:** $(r, \theta) = (|r|, \theta + \pi)$.

**Complex:** $a + bi = r(\cos\theta + i\sin\theta)$, $r = \sqrt{a^2 + b^2}$.

---

## Polar Curves

| Equation | Curve |
|---|---|
| $r = a$ | Circle radius $|a|$ at origin |
| $r = a\cos\theta$ | Circle through origin, on x-axis |
| $r = a\sin\theta$ | Circle through origin, on y-axis |
| $r = a + b\cos\theta$, $|a/b| < 1$ | Limaçon, inner loop |
| $r = a + b\cos\theta$, $|a/b| = 1$ | Cardioid |
| $r = a + b\cos\theta$, $1 < |a/b| < 2$ | Limaçon, dimpled |
| $r = a + b\cos\theta$, $|a/b| \ge 2$ | Limaçon, convex |
| $r = a\cos(n\theta)$ or $a\sin(n\theta)$ | Rose, $n$ petals (odd) or $2n$ petals (even) |

---

## Composition and Inverse

$(f \circ g)(x) = f(g(x))$.

$f^{-1}$ exists iff $f$ is one-to-one. Find $f^{-1}$ by solving $x = f(y)$ for $y$.

$f \circ f^{-1} = f^{-1} \circ f = \text{identity}$.

Domain of $f^{-1}$ = range of $f$. Range of $f^{-1}$ = domain of $f$.

Graph of $f^{-1}$ = reflection of graph of $f$ across $y = x$.

---

## Critical Limit Notation

For holes and end behavior, use limit notation on FRQs:

$$\lim_{x \to c} f(x) = L \quad \text{(hole at } x=c \text{ with y-value } L\text{)}$$
$$\lim_{x \to \infty} f(x) = L \quad \text{(horizontal asymptote)}$$
$$\lim_{x \to c^+} f(x) = \pm\infty \quad \text{(behavior near vertical asymptote)}$$

---

## Common Approximations Worth Knowing

| Quantity | Value |
|---|---|
| $\sqrt{2}$ | $\approx 1.414$ |
| $\sqrt{3}$ | $\approx 1.732$ |
| $e$ | $\approx 2.718$ |
| $\ln 2$ | $\approx 0.693$ |
| $\ln 10$ | $\approx 2.303$ |
| $\log_{10} 2$ | $\approx 0.301$ |
| $\pi$ | $\approx 3.14159$ |

---

## FRQ Communication Standards

When writing free responses, use these **exactly**:

- For holes: "$\lim_{x\to c} f(x) = L$, so the hole is at $(c, L)$."
- For inverses: "$f^{-1}(b) = a$ because $f(a) = b$."
- For modeling: state the variables ("Let $t$ = time in seconds, $h$ = height in feet").
- For interpretation: complete sentence with units ("From 2015 to 2017, the number of subscribers increased by an average of 21.5 million per year").
- For "best model" justification: state the structural property ("logarithmic, because equal multiplicative changes in input give equal additive changes in output").

→ Continue to the solutions files.
