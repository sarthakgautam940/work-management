# Solutions — College Board Preview (24 MCQ + 4 FRQ)

This is the College Board's official preview material from `pdf24_converted.pdf`. Same exam structure as Math Medic, slightly different problems.

---

# Part 1 — Free Response Questions

---

## FRQ 1 — Function table $f$ and rational function $g$ (Section II Part A, Calculator)

Table:

| $x$ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| $f(x)$ | $-10$ | $-5$ | $4$ | $17$ | $34$ |

$f$ increasing for $x \ge 0$. $g(x) = \dfrac{x^3 - 14x - 27}{x + 2}$.

### (A)(i) Find $h(5)$ where $h(x) = (g \circ f)(x) = g(f(x))$.

$f(5) = 34$.

$g(34) = \dfrac{34^3 - 14(34) - 27}{34 + 2} = \dfrac{39304 - 476 - 27}{36} = \dfrac{38801}{36} \approx 1077.806$.

**Answer:** $h(5) \approx 1077.806$.

### (A)(ii) Find $f^{-1}(4)$ or indicate undefined.

From table: $f(3) = 4$. So $f^{-1}(4) = 3$.

### (B)(i) All $x$ for which $g(x) = 3$, as decimal approximations.

$\dfrac{x^3 - 14x - 27}{x+2} = 3 \Rightarrow x^3 - 14x - 27 = 3(x+2) = 3x + 6$

$\Rightarrow x^3 - 17x - 33 = 0$

Solve numerically (calculator). Let $p(x) = x^3 - 17x - 33$. $p'(x) = 3x^2 - 17$, critical points at $x = \pm\sqrt{17/3} \approx \pm 2.380$. Values: $p(-2.380) \approx -6.030$, $p(2.380) \approx -59.97$. Both critical values negative, so only one real root, on the right of $x = 2.380$ where $p$ is increasing.

$p(4.886) \approx 0$. Refining: $p(4) = 64 - 68 - 33 = -37$; $p(5) = 125 - 85 - 33 = 7$; $p(4.9) \approx 1.349$; $p(4.88) \approx 0.04$.

**Answer:** $x \approx 4.886$.

### (B)(ii) End behavior of $g$ as $x \to -\infty$, in limit notation.

For large $|x|$, $g(x) \approx x^3/x = x^2 \to +\infty$ as $x \to -\infty$.

More carefully: as $x \to -\infty$, numerator $x^3 \to -\infty$, denominator $x + 2 \to -\infty$; ratio of negatives is positive, with magnitude $\sim |x|^2$.

$$\lim_{x \to -\infty} g(x) = +\infty$$

### (C)(i) Best model for $f$ based on table: linear, quadratic, exponential, logarithmic?

First differences of $f$ (with $\Delta x = 1$ each step): $5, 9, 13, 17$.

Second differences: $4, 4, 4$ — **constant**.

Constant second differences ⇒ **quadratic**.

### (C)(ii) Reason.

Over equal-length intervals (each $\Delta x = 1$), the first differences $\Delta f$ are not constant (so $f$ isn't linear), but the second differences $\Delta^2 f$ are constant at 4 (specifically: $9 - 5 = 4$, $13 - 9 = 4$, $17 - 13 = 4$). A function whose second differences are constant over equal-length input intervals is quadratic.

---

## FRQ 2 — Knowledge retention $R(t)$ (Section II Part A, Calculator)

After a class, students' content retention modeled by $R(t) = a + b \ln(t+1)$, $t$ months since end of class. $R(0) = 75$, $R(3) = 70.84$.

### (A)(i) Equations to find $a, b$.

$R(0) = a + b\ln(1) = a = 75$.

$R(3) = a + b \ln(4) = 70.84$.

$$\begin{cases} a = 75 \\ a + b \ln 4 = 70.84 \end{cases}$$

### (A)(ii) Decimal values of $a$ and $b$.

$a = 75$.

$75 + b \ln 4 = 70.84 \Rightarrow b \ln 4 = -4.16 \Rightarrow b = -4.16 / \ln 4 \approx -4.16 / 1.3863 \approx -3.001$.

**Answer:** $a = 75$, $b \approx -3.001$.

### (B)(i) ARC of scores from $t = 0$ to $t = 3$.

$$\text{ARC} = \frac{R(3) - R(0)}{3 - 0} = \frac{70.84 - 75}{3} = \frac{-4.16}{3} \approx -1.387$$

**Answer:** Approximately $-1.387$ points per month.

### (B)(ii) Interpretation.

From $t = 0$ to $t = 3$ months, the group's score decreased by an average of approximately 1.387 points per month.

### (B)(iii) Compare ARCs from $t=3$ to $t=p$ ($p > 3$) with the ARC from 0 to 3. Reference graph of $R$.

The model $R(t) = 75 - 3.001 \ln(t + 1)$ is **decreasing** (negative coefficient on a logarithm), and the graph of $a + b \ln(t+1)$ with $b < 0$ is **concave up** (the second derivative of $-\ln(t+1)$ is $1/(t+1)^2 > 0$).

For a decreasing, concave-up function, the average rate of change becomes **less negative** (closer to zero) over intervals further to the right. So ARCs from $t=3$ to $t=p$ are **greater than** (less negative than) the ARC from $t=0$ to $t=3$.

**Answer:** The ARCs from $t=3$ to $t=p$ are **greater than** $-1.387$ (less negative). The graph is concave up, so secant slopes flatten as we move right.

### (C) For how many years is $R$ an appropriate model? Drop must be ≥ 1 point per year.

End-of-year scores at $t = 12, 24, 36, \ldots$.

Yearly drop from year $n$ to year $n+1$: $R(12n) - R(12(n+1)) = -b [\ln(12(n+1)+1) - \ln(12n+1)] = -b \ln\left(\dfrac{12n+13}{12n+1}\right)$ where $-b \approx 3.001$.

Need this drop $\ge 1$:
$$3.001 \ln\left(\dfrac{12n+13}{12n+1}\right) \ge 1$$

Let me compute year-by-year drops, starting from the end of year 1 ($t = 12$) to end of year 2 ($t = 24$):

$R(0) = 75$.

$R(12) = 75 - 3.001 \ln(13) \approx 75 - 3.001(2.565) \approx 75 - 7.697 \approx 67.303$.

$R(24) = 75 - 3.001 \ln(25) \approx 75 - 3.001(3.219) \approx 75 - 9.660 \approx 65.340$.

$R(36) = 75 - 3.001 \ln(37) \approx 75 - 3.001(3.611) \approx 75 - 10.835 \approx 64.165$.

$R(48) = 75 - 3.001 \ln(49) \approx 75 - 3.001(3.892) \approx 75 - 11.679 \approx 63.321$.

$R(60) = 75 - 3.001 \ln(61) \approx 75 - 3.001(4.111) \approx 75 - 12.337 \approx 62.663$.

Yearly drops:
- Year 1 to Year 2 ($R(12) \to R(24)$): $67.303 - 65.340 = 1.963$ ✓ (≥ 1)
- Year 2 to Year 3: $65.340 - 64.165 = 1.175$ ✓
- Year 3 to Year 4: $64.165 - 63.321 = 0.844$ ✗ (< 1)

So the model is appropriate for years 1, 2, and 3 (the drops from end of year 1 to end of year 2, and from end of year 2 to end of year 3, are both at least 1 point). The drop from end of year 3 to end of year 4 is less than 1, so the model is no longer appropriate by year 4.

**Answer:** The model is appropriate for **3 years** (the drops between end-of-year evaluations are at least 1 point only through year 3).

(Note: depending on how the rubric defines "the drop in year $n$" — some interpretations count from end-of-class to end-of-year-1 as a separate consideration. Be ready to write your reasoning explicitly.)

---

## FRQ 3 — Fan blade (Section II Part B, No Calculator)

5 rotations per second. Point B is 6 inches from center. Center is 20 inches above table. Clockwise rotation. At $t=0$, B is directly above center (highest point).

### Setup

Period $= 1/5 = 0.2$ sec.

Distance from B to table: midline $= 20$, amplitude $= 6$, max $= 26$, min $= 14$.

At $t = 0$, B at top → $h = 26$ (max).

### (A) Five points $F, G, J, K, P$ on the graph.

The given graph (described as 2 cycles, with F and P at the top, J at the bottom, G and K on the midline).

Quarter-period $= 0.05$ sec.

Reading: at $t = 0$, max → $F = (0, 26)$. Then descending through midline at $t = 0.05$ → $G = (0.05, 20)$. Then minimum at $t = 0.10$ → $J = (0.10, 14)$. Then midline rising at $t = 0.15$ → $K = (0.15, 20)$. Then next maximum at $t = 0.20$ → $P = (0.20, 26)$.

**Answer:**
$F = (0, 26)$, $G = (0.05, 20)$, $J = (0.10, 14)$, $K = (0.15, 20)$, $P = (0.20, 26)$.

### (B) Find $a, b, c, d$ in $h(t) = a \sin(b(t + c)) + d$.

Amplitude 6, midline 20 ⇒ $a = 6$, $d = 20$.

Period $0.2$ ⇒ $b = 2\pi / 0.2 = 10\pi$.

At $t = 0$, $h$ should be at maximum. For sine, this requires the argument to be $\pi/2$:
$b \cdot c = \pi/2 \Rightarrow c = \dfrac{\pi/2}{10\pi} = \dfrac{1}{20}$.

**Answer:** $a = 6$, $b = 10\pi$, $c = \dfrac{1}{20}$, $d = 20$.

### (C)(i) On $(t_K, t_P) = (0.15, 0.20)$, behavior of $h$?

On this interval, $h$ goes from midline ($20$) to maximum ($26$). So $h$ is above the midline (positive relative to midline) and increasing.

But the function value itself is between 20 and 26 — always positive in absolute terms. So $h$ is **positive** (the actual numerical value is positive) and **increasing**.

**Answer: a.** $h$ is positive and increasing.

### (C)(ii) Concavity and rate of change on $(t_1, t_2)$.

Going from midline up to a maximum, the curve is **concave down** (it's leveling off as it approaches the peak).

The slope of $h$ is most positive at the midline crossing (start of interval) and decreases to 0 at the maximum. So the rate of change of $h$ is **decreasing** on this interval.

**Answer:** The graph is **concave down**, and the rate of change of $h$ is **decreasing**.

---

## FRQ 4 — Multi-part: log, trig, exponential, equation solving (Section II Part B, No Calc)

### (A)(i) Rewrite $g(x) = 3 \ln x - \tfrac{1}{2} \ln x$ as a single natural log without negative exponents.

Combine: $g(x) = \left(3 - \tfrac{1}{2}\right) \ln x = \tfrac{5}{2} \ln x = \ln x^{5/2} = \ln \sqrt{x^5}$.

**Answer:** $g(x) = \ln(x^{5/2})$, equivalently $\ln \sqrt{x^5}$.

### (A)(ii) Rewrite $h(x) = \dfrac{\sin^2 x - 1}{\cos x}$ with $\cos x$ once and no other trig.

Pythagorean: $\sin^2 x - 1 = -(1 - \sin^2 x) = -\cos^2 x$.

$$h(x) = \dfrac{-\cos^2 x}{\cos x} = -\cos x$$

**Answer:** $h(x) = -\cos x$.

### (B)(i) Solve $j(x) = 2 \sin x \cos x - \cos x = 0$ on $[0, \pi/2]$.

Factor: $\cos x (2 \sin x - 1) = 0$.

Either $\cos x = 0$, giving $x = \pi/2$ (in interval).

Or $2 \sin x - 1 = 0$, giving $\sin x = 1/2$, $x = \pi/6$ (in interval).

**Answer:** $x = \pi/6$ and $x = \pi/2$.

### (B)(ii) Solve $k(x) = 8 e^{3x} - e = 3e$.

$$8 e^{3x} = 4e \Rightarrow e^{3x} = \dfrac{e}{2}$$

$$3x = \ln(e/2) = \ln e - \ln 2 = 1 - \ln 2$$

$$x = \dfrac{1 - \ln 2}{3}$$

**Answer:** $x = \dfrac{1 - \ln 2}{3}$.

### (C) $m(x) = \cos(2x) + 4$. Find all $x$ in domain where $m(x) = 9/2$.

$\cos(2x) + 4 = 9/2 \Rightarrow \cos(2x) = 1/2$.

$2x = \pm \pi/3 + 2\pi k$ for integer $k$.

$$x = \pm \dfrac{\pi}{6} + \pi k, \quad k \in \mathbb{Z}$$

**Answer:** $x = \pm \dfrac{\pi}{6} + \pi k$ for any integer $k$.

---

# Part 2 — Multiple Choice Questions

---

## Q1 — End behavior of polynomial

$p(x) = -4x^5 + 3x^2 + 1$.

**Answer: D** (negative leading coefficient, odd degree: $\lim_{x\to-\infty} p = \infty$ and $\lim_{x\to\infty} p = -\infty$).

---

## Q2 — Increasing at a decreasing rate (graph of $W$)

$W(t)$ shown over $0 \le t \le 30$. Looking for intervals where $W$ is increasing AND concave down.

**Answer: A** ($(3, 6)$ only).

The graph is increasing on $(0, 6)$ and $(18, 30)$. On $(0, 3)$ it's concave up (rising sharply from $W(0) = 2$). On $(3, 6)$ it's concave down (rising into the local max). On $(18, 30)$ it's concave up first, possibly transitioning.

The strictly **increasing AND concave down** portion is $(3, 6)$.

---

## Q3 — Rational function with hole, VA, zero

Want zero at $x = 3$, hole at $x = 1$, VA at $x = 2$.

**Answer: A** $\left(\dfrac{x^2 - 4x + 3}{x^2 - 3x + 2}\right)$.

Factor: $\dfrac{(x-1)(x-3)}{(x-1)(x-2)}$. The $(x-1)$ cancels (hole at 1). After cancellation: $\dfrac{x-3}{x-2}$. Zero at $x = 3$ ✓. VA at $x = 2$ ✓.

---

## Q4 — Odd polynomial extremum

$p$ odd, $p(3) = -4$ rel max. What about $p(-3)$?

**Answer: C** ($p(-3) = 4$ is a relative minimum).

Odd ⇒ $p(-3) = -p(3) = 4$. The graph is symmetric about origin: a rel max at $(3, -4)$ reflects to $(-3, 4)$, but reflection through origin flips max ↔ min. So $(-3, 4)$ is a rel **min**.

---

## Q5 — Domain of $k = h/g$

$g(x) = x^3 - 3x^2 - 18x = x(x-6)(x+3)$. Zeros: $0, 6, -3$.

$h(x) = x^2 - 2x - 35 = (x-7)(x+5)$. Zeros: $7, -5$.

No common factors → no holes. Domain of $k = h/g$ excludes $g$'s zeros: $x \ne 0, 6, -3$.

**Answer: C** (all reals where $x \ne -3, 0, 6$).

---

## Q6 — Polynomial expression from graph

Quartic-shaped graph from description: deep dip on left, double-root touch at $x = -5$ (or wherever), crosses elsewhere.

**Answer: D** ($0.25(x+5)^2(x+1)(x-8)$).

This is a quartic with positive leading coefficient (so both ends $\to \infty$), double root at $x = -5$ (touch, not cross), simple roots at $x = -1$ and $x = 8$. Matches the described graph.

---

## Q7 — Composition / transformation evaluating at $-4$

From table: $f(-4) = 55$. $g(x) = a f(bx) + c$ with $a=3$ (vertical dilation 3), $b = 1/2$ (horizontal dilation 2), $c = 5$ (vertical shift 5 up).

$g(-4) = 3 f(\tfrac{1}{2} \cdot -4) + 5 = 3 f(-2) + 5 = 3(5) + 5 = 20$.

**Answer: D** (20).

---

## Q8 — Log expansion

$\log_{10}\left(\dfrac{kz}{w^2}\right) = \log k + \log z - 2 \log w$.

**Answer: B**.

---

## Q9 — Geometric sequence formula

Graph: $g_1 = 8, g_2 = 4, g_3 = 2, g_4 = 1, \ldots$. Ratio $1/2$.

**Answer: A** ($g_n = 4 \left(\tfrac{1}{2}\right)^{n-2}$).

Check: $n = 1$: $4 \cdot (1/2)^{-1} = 4 \cdot 2 = 8$ ✓. $n = 2$: $4 \cdot (1/2)^0 = 4$ ✓.

---

## Q10 — Composition $f(g(3))$

From table $g(3) = -2$. $f(x) = 3^x + x^2$. $f(-2) = 3^{-2} + 4 = \tfrac{1}{9} + 4 = \tfrac{37}{9}$.

**Answer: B** ($\tfrac{37}{9}$).

---

## Q11 — Residual plot interpretation

Residuals show clear curved (parabolic) pattern.

**Answer: A** (linear model not appropriate, because there's a clear pattern in residuals).

---

## Q12 — Building exponential model

6.1% growth per quarter. $M(0) = 54$. $t$ in years; 4 quarters per year.

After $4t$ quarters: $M(t) = 54 (1.061)^{4t}$.

**Answer: D**.

---

## Q13 — Half-life conversion

$h(d) = A_0 (0.5)^{d/8}$ where $d$ in days. Convert to function of hours $t$, with $d = t/24$.

$k(t) = A_0 (0.5)^{(t/24)/8} = A_0 (0.5)^{t/192} = A_0 \left(0.5^{1/192}\right)^t$.

**Answer: D**.

---

## Q14 — Log equation

$\ln(x^3) - \ln x = 4 \Rightarrow \ln(x^2) = 4 \Rightarrow x^2 = e^4$.

But $\ln(x^3)$ requires $x > 0$. So $x = e^2$ only.

**Answer: C** ($x = e^2$ only).

---

## Q15 — Secant equation

$1 + 3 \sec x = -5 \Rightarrow \sec x = -2 \Rightarrow \cos x = -1/2$.

In $[0, 2\pi)$: $x = 2\pi/3, 4\pi/3$.

**Answer: C**.

---

## Q16 — Sinusoid period and amplitude

Graph: peaks at $x = 3$ and $x = 11$ both with $y = 3$, troughs around $y = -3$. Period $= 11 - 3 = 8$. Amplitude $= 3$.

**Answer: B** (period 8, amplitude 3).

---

## Q17 — Polar limaçon $r = 3\cos\theta + 2$

$|a/b| = 2/3 < 1$ → inner loop limaçon. Spot check: $r(0) = 5$, $r(\pi/2) = 2$, $r(\pi) = -1$ (negative — produces inner loop), $r(3\pi/2) = 2$.

**Answer: D** (limaçon with inner loop, oriented with peak on positive x-axis).

---

## Q18 — System of trig inequalities

$\cos\theta > -1/2$ AND $\sin\theta > \sqrt{3}/2$ on $[-\pi, \pi]$.

$\cos\theta > -1/2$: $\theta \in (-2\pi/3, 2\pi/3)$.

$\sin\theta > \sqrt{3}/2$: $\theta \in (\pi/3, 2\pi/3)$.

Intersection: $(\pi/3, 2\pi/3)$.

**Answer: D**.

---

## Q19 — Polar curve $r = -1 + \sin\theta$ on $(0, \pi/2)$

At $\theta = 0$: $r = -1$. At $\theta = \pi/2$: $r = 0$. $r$ goes from $-1$ to $0$, **negative** throughout, magnitude **decreasing** from $1$ to $0$.

Negative $r$ in QI means actual point is in QIII — below polar axis. Distance $|r|$ decreasing → getting closer to origin.

**Answer: C** (below polar axis, getting closer to origin).

---

## Q20 — Time interval for temperature rise

$T(t) = \dfrac{75t^3 - 836t^2 + 3100t - 4185}{14t^2 + 10t - 35}$ for $2 \le t \le 9$. How many hours for temperature to rise from $0°$ to $5°$C?

Solve $T(t) = 0$ and $T(t) = 5$ on the calculator. From numerical solving:
- $T(t) = 0$ at $t \approx 5.420$.
- $T(t) = 5$ at $t \approx 7.701$.

Time elapsed: $7.701 - 5.420 = 2.281 \approx 2.280$.

**Answer: D** (2.280 hours).

---

## Q21 — Exponential regression prediction

Table: $x = -2, -1, 1, 2$; $f(x) = 10, 15, 40, 56$. ExpReg → $y = a b^x$.

Calculator: $a \approx 24.07$, $b \approx 1.557$. At $x = 1.5$: $y \approx 24.07 \cdot 1.557^{1.5} \approx 46.767$.

**Answer: A** (46.767).

---

## Q22 — Daylight model behavior on day 150

$D(t) = 160 \cos\left(\tfrac{2\pi}{365}(t - 172)\right) + 729$.

Max at $t = 172$. Day 150 is before max → $D$ is **increasing** as $t \to 172$. Concavity near max of cosine is concave down → **decreasing rate** of increase.

**Answer: A** (increasing at decreasing rate).

---

## Q23 — Restricted domain for invertibility of $g(x) = \sin x - \cos x$

$g(x) = \sqrt{2} \sin(x - \pi/4)$, period $2\pi$. Monotonic on intervals of length $\pi$ (half a period). The interval $[-\pi/4, 3\pi/4]$ has length $\pi$; $g$ is monotonic increasing there, attaining all values once.

**Answer: D** ($-\pi/4 \le x \le 3\pi/4$, because length is half the period).

(Both B and D give the correct interval; D's rationale is more rigorous because half-period intervals on a sinusoid are exactly where it's monotonic, hence one-to-one.)

---

## Q24 — Theme park ride $H(t)$

Highest 120 ft, lowest 20 ft. Returns to highest every 8 sec → period 8. At $t=0$, X is at highest.

$A = 50$, $D = 70$, $B = 2\pi/8 = \pi/4$. Cosine peaks at $t = 0$:
$$H(t) = 50 \cos\left(\dfrac{\pi}{4} t\right) + 70$$

**Answer: B**.

---

## Patterns Across This Preview

The College Board's preview problems hit the same structural moves as Math Medic:
- End behavior, multiplicity, graph reading.
- Sinusoidal modeling from contextual setups (period, amplitude, midline, phase).
- Polar curve interpretation (sign of $r$, position relative to axes).
- Log/exp equation solving with domain checks.
- Function classification from data tables.
- Composition and transformation arithmetic.

If you've worked through both the Math Medic and CB Preview problems and patterns feel automatic, you're calibrated for the real exam.
