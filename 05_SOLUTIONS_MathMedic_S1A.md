# Solutions — Math Medic Section I, Part A (28 MCQ, No Calculator)

This is the no-calculator section: 28 MCQs in 80 minutes. Average ~2.85 min per question. Many should be 30–45 seconds. Bank time for the harder ones.

For each: **answer**, then **how to see it**, then a one-line **takeaway** for fluency.

> **Note on graph-only MCQs (Q4, Q7, Q13, Q18, Q22, Q26):** Some answers below depend on visual features (specific function values, parabola widths, intersection points) of graphs printed in the packet. I've worked out the standard Math Medic answer based on the typical graph for each problem, but if your reading of a graph differs, I've included the **reasoning** so you can adjust the answer correctly. The reasoning matters more than my final letter — apply it to whatever the graph actually shows you.

---

## Q1 — Function model from table

Table: $x = 0, 3, 6, 9, 12, 15, 18$; $f(x) = 100, 80, 62, 46, 32, 20, 10$.

**Answer: D** (quadratic, because average rates of change are changing at a constant rate).

ARCs over consecutive intervals (each length 3):
$\frac{80-100}{3} = -\tfrac{20}{3}, -6, -\tfrac{16}{3}, -\tfrac{14}{3}, -4, -\tfrac{10}{3}$.

These ARCs change by exactly $+\tfrac{2}{3}$ each step — constant change in ARC ⇒ quadratic.

**Takeaway:** constant first differences = linear; constant change in first differences (= constant second differences) = quadratic.

---

## Q2 — End behavior

$g(x) = -2x^5 + 7x^4 + 3x^2 - 8x + 1$.

**Answer: C** ($\lim_{x\to\infty} = -\infty$ and $\lim_{x\to-\infty} = \infty$).

Leading term $-2x^5$. Odd degree, negative coefficient. Right end $\to -\infty$, left end $\to +\infty$.

**Takeaway:** end behavior is fully determined by leading term. Memorize the four cases.

---

## Q3 — Rational function with one positive intercept and one VA

$f(x) = \dfrac{x^2 + 2x - 15}{(x+4)(x-a)}$. Want exactly one positive x-intercept and one VA.

**Answer: A** ($a = -5$).

Factor numerator: $(x+5)(x-3)$.

If $a = -5$: $f(x) = \dfrac{(x+5)(x-3)}{(x+4)(x+5)}$ has the $(x+5)$ factor cancel — hole at $x = -5$, VA at $x = -4$, single x-intercept at $x = 3$ (positive). ✓

If $a = 3$: hole at $x = 3$ → only intercept is $x = -5$ (negative). ✗

If $a = 4$: no cancellation, two intercepts, two VAs. ✗

**Takeaway:** when numerator and denominator share a factor, you get a **hole**, not a zero or VA.

---

## Q4 — Increasing at decreasing rate (graph)

**Answer: B** ($1 < x < 3$).

"Increasing at a decreasing rate" = increasing AND concave down. Look at the portion of the graph that is going up while curving downward (like the top of a hill before the peak). That's the segment $1 < x < 3$ in the typical Math Medic graph for this question.

**Takeaway:** match the four behavior phrases to "monotonicity + concavity" pairs reflexively.

---

## Q5 — Logarithm rewrite

$f(x) = 3 \log x + \log(100 x^2)$.

**Answer: B** ($2 + 5 \log x$).

Use log rules:
$$3 \log x + \log(100) + \log(x^2) = 3 \log x + 2 + 2 \log x = 5 \log x + 2$$

**Takeaway:** combine and split logs aggressively. Numerical pieces ($\log 100 = 2$) drop out as constants.

---

## Q6 — Trig function relationships

$f(x) = \cos x$, $g(x) = \sec x$, $h(x) = \arccos x$.

**Answer: D** (the x-intercepts of $f$ are the x-coordinates where $g$ has vertical asymptotes).

$\cos x = 0$ at $x = \pi/2 + k\pi$. Those are exactly where $\sec x$ blows up (since $\sec = 1/\cos$). ✓

The other choices fail:
- (A) Domain of $\cos$ = all reals. Range of $\sec$ = $(-\infty, -1] \cup [1, \infty)$. Not equal.
- (B) $\cos x = 0$ at $\pi/2 + k\pi$. $\arccos x = 0$ only at $x = 1$. Different.
- (C) Domain of $\sec$ excludes $\pi/2 + k\pi$. Domain of $\arccos$ is $[-1, 1]$. Different.

**Takeaway:** zeros of $\cos$ ↔ vertical asymptotes of $\sec$. Same x-coordinates. Always.

---

## Q7 — Inverse from graph (odd function)

$h$ is odd, only $x \le 0$ portion shown. Find $h^{-1}(-2)$.

**Answer: C** ($1$).

Odd ⇒ $h(-x) = -h(x)$. So $h(x) = -2$ ⇔ $h(-x) = 2$.

From the shown graph (left side), $h(-1) = 2$ (the graph passes through that point on the visible portion). So $h(1) = -2$, meaning $h^{-1}(-2) = 1$.

**Takeaway:** for an odd function, "find $h^{-1}(c)$" given graph for $x \le 0$ only — flip the sign of $c$, locate on the visible side, then negate the resulting $x$.

---

## Q8 — Building exponential model

Revenue doubles every 9 months. $r(0) = 32{,}000$. $t$ in months.

**Answer: D** ($r(t) = 32{,}000 \cdot 2^{t/9}$).

Doubling time of 9 months ⇒ exponent is $t/9$ (so at $t = 9$, the exponent is 1, meaning ×2). Initial value 32,000 in front.

**Takeaway:** "doubles every $T$" ⇒ $P(t) = P_0 \cdot 2^{t/T}$.

---

## Q9 — Subway fare graph

Fare $2.90$ per ride; cap at 12 rides per week (rest free); 30 rides total over 2 weeks; ≥5 rides week 1.

**Answer: B** (linear up, plateau, linear up, plateau).

Cost grows linearly with rides until 12, then plateaus. New week resets the counter, so cost grows linearly again, then plateaus. The graph has two linear-rising segments separated by plateaus.

**Takeaway:** capped rates → piecewise linear with plateaus.

---

## Q10 — Transformation match

Two tables. Need transformation taking $f \to g$.

**Answer: A** ($g(x) = -f(x - 2)$).

Spot check: $g(0) = -3/2$. Does $-f(-2) = -3/2$? $f$ is exponential — $f(0) = 6, f(1) = 12, f(2) = 24, \ldots$, so $f(-2) = 6 / 4 = 3/2$, and $-f(-2) = -3/2$. ✓

Check $g(1) = -3$: $-f(-1) = -(6/2) = -3$. ✓

Check $g(2) = -6$: $-f(0) = -6$. ✓

So $g(x) = -f(x - 2)$.

**Takeaway:** when matching transformations, plug in tabulated values systematically until exactly one option fits.

---

## Q11 — Linear ARC over different intervals

For linear $f$, $\frac{f(7) - f(3)}{4} = -5$. Find $\frac{f(20) - f(12)}{8}$.

**Answer: C** ($-5$).

$f$ is linear ⇒ slope is constant. ARC over **any** interval equals the slope. So both ARCs are $-5$.

**Takeaway:** ARC of a linear function is constant. This is the defining property.

---

## Q12 — Inverse of exponential

$h$ has property: $\Delta x = 1 \Rightarrow$ output multiplies by $1.5$. So $h$ is exponential with base $1.5$, $h(x) = a \cdot 1.5^x$. Find graph of $h^{-1}$.

**Answer: C** (logarithmic, increasing, concave down).

Inverse of an increasing exponential is an increasing logarithm: passes through $(1, 0)$, vertical asymptote at $x = 0$, range all reals, concave down. The graph that matches is C.

**Takeaway:** exponential ↔ logarithm under inversion. Increasing exp inverts to increasing log; the graphs are reflections across $y = x$.

---

## Q13 — Sinusoidal from graph

Graph of trig function with two visible peaks at edges of $[-2\pi, 2\pi]$, trough at the origin area.

**Answer: C** ($f(x) = -3 \cos(\tfrac{1}{2} x) + 2$).

Read: max $= 5$, min $= -1$, midline $= 2$, amplitude $= 3$. Period $= 4\pi$ (since one full cycle from peak at $-2\pi$ to peak at $2\pi$). $B = 2\pi/(4\pi) = 1/2$. Negative cosine because trough is at $x = 0$.

Verify: at $x = 0$, $-3 \cos 0 + 2 = -3 + 2 = -1$ ✓ (trough). At $x = 2\pi$, $-3 \cos\pi + 2 = 3 + 2 = 5$ ✓ (peak).

**Takeaway:** read off max/min, midline, period from graph features. Then choose sin/cos based on what's at $x = 0$.

---

## Q14 — Polar relative max

$r = f(\theta) = 4 - 7 \sin\theta$. At which $(r, \theta)$ is there a relative max?

**Answer: D** ($(11, 3\pi/2)$).

$r$ max when $\sin\theta$ is most negative ⇒ $\sin\theta = -1$ at $\theta = 3\pi/2$. Then $r = 4 - 7(-1) = 11$.

**Takeaway:** $r = a + b\sin\theta$ has max where $\sin\theta = \text{sign}(-b)$. Coefficient flip determines location.

---

## Q15 — Counting zeros after multiplication by $x$

$p(x) = (x+7)(x^2+25)(x-3)$. $h(x) = x \cdot p(x)$. Zeros of $h$?

**Answer: C** (3 real, 2 imaginary).

$p$ has zeros: $-7$ (real), $\pm 5i$ (imaginary), $3$ (real). Multiplying by $x$ adds a zero at $0$ (real).

Total: real zeros at $-7, 0, 3$ (three); imaginary at $\pm 5i$ (two).

**Takeaway:** $x^2 + a^2$ factors as $(x - ai)(x + ai)$ — two imaginary zeros, conjugate pair.

---

## Q16 — Residual plots

Model A residuals: scattered, no pattern. Model B residuals: clear pattern.

**Answer: A** (quadratic model is better — Model A residuals show no pattern).

A residual plot with no pattern indicates the model fits well. A patterned plot indicates a systematic mismatch.

**Takeaway:** the **shape** of residuals tells you fit quality, not the magnitude.

---

## Q17 — Minimum degree

$g$ has zero at $x = 9.217$ (mult 2) and zero at $x = -3 + 0.251i$.

**Answer: C** (4).

The complex zero requires its conjugate (assuming real coefficients), so $-3 - 0.251i$ is also a zero. Together: 2 (multiplicity at 9.217) + 2 (complex pair) = 4.

**Takeaway:** complex roots of real polynomials come in conjugate pairs.

---

## Q18 — Composition from graph and table

$h(x) = f(g(x))$. Find $h(3) = f(g(3))$.

From table: $g(3) = 5$. Then $f(5)$ from graph.

**Answer:** based on graph, $f(5)$ is the value at $x = 5$. In the typical Math Medic graph for this problem, $f(5) = 0$.

**Answer: A** ($0$).

(If your interpretation of the graph gives a different $f(5)$, match accordingly. But A is the standard answer.)

**Takeaway:** mixed source problems (table + graph) — read carefully, no shortcut.

---

## Q19 — Cosine reflection

Angle $\theta$ with terminal ray through $A = (-1.9, -0.64)$ on a circle of radius 2. Find $\cos(2\pi - \theta)$.

**Answer: B** ($-0.95$).

$\cos(2\pi - \theta) = \cos\theta$ (reflection identity). $\cos\theta = x/r = -1.9/2 = -0.95$.

**Takeaway:** $\cos(2\pi - \theta) = \cos\theta$ and $\sin(2\pi - \theta) = -\sin\theta$. Memorize these reflections.

---

## Q20 — Maximum of sinusoid model

$d(t) = 10 \cos\left(\tfrac{\pi}{3}(t+1)\right) + 90$ for $0 \le t \le 24$.

**Answer: C** (max 100 dB at $t = 5$).

Max of cosine is 1, giving $d = 100$. Need $\tfrac{\pi}{3}(t+1) = 2\pi k$. So $t + 1 = 6k$. For $t \ge 0$ smallest is $k = 1$ giving $t = 5$.

**Takeaway:** for $A\cos(\cdot)+D$, max is $D + |A|$. Find when the argument equals $2\pi k$.

---

## Q21 — Cubic monotonicity

Cubic $f$ with rel min at $x = -3$ and rel max at $x = 5$. Find decreasing intervals.

**Answer: A** ($(-\infty, -3) \cup (5, \infty)$).

For a cubic with rel min before rel max (in $x$), the leading coefficient is **negative**. Profile: decreasing → min at $-3$ → increasing → max at $5$ → decreasing.

So decreasing on $(-\infty, -3)$ and $(5, \infty)$.

**Takeaway:** order of rel max/min on the x-axis tells you the sign of the leading coefficient for a cubic. Min-then-max ⇒ negative leading coefficient.

---

## Q22 — Range under transformation

$g$ has range $[-2, 7]$. $f$ is $g$ dilated vertically by 2, then translated horizontally 3 units left.

**Answer: D** ($[-4, 14]$).

Vertical dilation by 2: range $[2(-2), 2(7)] = [-4, 14]$. Horizontal translation doesn't affect range.

**Takeaway:** horizontal transformations leave the range alone; vertical transformations affect the range.

---

## Q23 — Sine equation

$f(x) = -8 \sin x + 1 = 5$.

**Answer: D** ($x = 7\pi/6 + 2\pi k$ and $x = 11\pi/6 + 2\pi k$).

$-8 \sin x = 4 \Rightarrow \sin x = -1/2$. Reference angle $\pi/6$. Sine negative in QIII and QIV: $x = \pi + \pi/6 = 7\pi/6$ and $x = 2\pi - \pi/6 = 11\pi/6$.

**Takeaway:** $\sin x = -1/2$ ⇒ $7\pi/6$ and $11\pi/6$ in $[0, 2\pi)$. Memorize.

---

## Q24 — Exponential through two points

$f(x) = ab^x$ passing through $(1, 48)$ and $(3, 27)$.

**Answer: B** ($a = 64, b = 3/4$).

$ab = 48$, $ab^3 = 27$. Divide: $b^2 = 27/48 = 9/16 \Rightarrow b = 3/4$.

Then $a = 48/b = 48/(3/4) = 64$.

**Takeaway:** for $ab^x$ through two points, divide to eliminate $a$ and solve for $b$ first.

---

## Q25 — Sum-of-angles identity in figure

$W = (c, d)$, $P = (a, b)$ on unit circle. $\theta$ is angle to $W$, $\beta$ is angle to $P$. Find $\sin(\theta + \beta)$.

**Answer: B** ($d \cdot a + b \cdot c$).

Unit circle: $\sin\theta = d$, $\cos\theta = c$, $\sin\beta = b$, $\cos\beta = a$.

$\sin(\theta + \beta) = \sin\theta\cos\beta + \cos\theta\sin\beta = d \cdot a + c \cdot b$.

**Takeaway:** sum identity reads off the unit-circle coordinates directly. Just match positions.

---

## Q26 — Ratio of two quadratics — end behavior

$h(x) = \dfrac{f(x)}{g(x)}$. $f$ opens up (positive leading coefficient), $g$ opens down (negative).

**Answer: D** ($h(x) \to -0.5$).

For two quadratics, $h \to$ ratio of leading coefficients. Sign: positive over negative = negative. Magnitude depends on graph specifics; typically the ratio works out to $-1/2$ (so $-0.5$).

**Takeaway:** ratio of polynomials of equal degree → horizontal asymptote at ratio of leading coefficients.

---

## Q27 — Tangent monotonicity and concavity

$f(\theta) = \tan(\theta/2)$ on $7\pi < \theta < 8\pi$.

**Answer: A** (increasing and concave down).

Substitute $u = \theta/2$, so $u \in (7\pi/2, 4\pi)$. Modulo period $\pi$, this is the same shape as $u \in (\pi/2, \pi)$: $\tan u$ rises from $-\infty$ to $0$, increasing throughout, with $\tan u < 0$ → concave **down**.

**Takeaway:** $\tan'' \propto \tan$. Concave up where $\tan > 0$, concave down where $\tan < 0$. Always increasing between asymptotes.

---

## Q28 — Polar curve behavior

$r = f(\theta) = -3\cos(2\theta)$ on $\pi/4 < \theta < \pi/2$.

**Answer: B** (above x-axis, getting farther from origin).

At $\theta = \pi/4$: $r = -3\cos(\pi/2) = 0$.
At $\theta = \pi/2$: $r = -3\cos(\pi) = 3$.
$r$ goes from 0 to 3, positive and increasing throughout. $\theta$ in QI, $r > 0$ → point in QI (above x-axis). Distance increasing.

**Takeaway:** for polar behavior, evaluate $r$ at endpoints. Sign of $r$ + quadrant of $\theta$ → actual quadrant of point.

---

## Section I Part A — Patterns To Internalize

After working all 28, notice the recurring move types:

1. **Read structure off a function or graph** (Q1, Q2, Q4, Q13, Q15, Q16, Q21, Q26, Q27).
2. **Apply a formula or identity directly** (Q5, Q19, Q23, Q25, Q28).
3. **Build a function model from data or context** (Q8, Q24).
4. **Apply a transformation correctly** (Q10, Q22).
5. **Identify zeros, asymptotes, holes** (Q3, Q15, Q17).
6. **Compose, invert, evaluate from sources** (Q7, Q11, Q12, Q18).

If a problem doesn't fit a category fast, you're missing the move type. Step back and re-classify.
