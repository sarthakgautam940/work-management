# Unit 1 — Polynomial and Rational Functions

**Exam weight: 30–40%.** This is the largest single unit. Master it cold.

This unit lives on three core ideas:
1. **Co-variation and rate of change** — how do two quantities change together?
2. **Structure of polynomials** — degree, zeros (real and complex), end behavior, transformations.
3. **Structure of rational functions** — asymptotes, holes, sign behavior, equivalent forms.

Every problem on the exam from this unit is some combination of these three.

---

## 1.1 Change in Tandem

Two quantities co-vary when changes in one correspond to changes in the other. The graph coordinates them.

**The four "tandem" patterns you'll be asked to identify:**

| Behavior | Meaning |
|---|---|
| Increasing, concave up | Increasing at an increasing rate |
| Increasing, concave down | Increasing at a decreasing rate |
| Decreasing, concave down | Decreasing at an increasing rate |
| Decreasing, concave up | Decreasing at a decreasing rate |

**The trick people miss:** "Decreasing at an increasing rate" sounds contradictory. It isn't — it's about the *magnitude* of decrease growing.

A clean way to think: the slope itself is a number. Is that number going up or going down?
- Slope going up over time = "rate is increasing" = concave up.
- Slope going down over time = "rate is decreasing" = concave down.

That's it. Apply mechanically.

**Example.** A graph descends sharply then levels off near a horizontal asymptote. Slope starts very negative, approaches zero. Slope is going **up** (from −large to 0). So this is concave **up**, "decreasing at a decreasing rate."

---

## 1.2 Rates of Change

**Average rate of change (ARC)** of $f$ over $[a,b]$:
$$\text{ARC}_{[a,b]} = \frac{f(b) - f(a)}{b - a}$$

Geometrically: slope of the secant line from $(a, f(a))$ to $(b, f(b))$.

**Why this matters:** ARC over shrinking intervals approximates instantaneous rate. Although AP Precalc doesn't formally use derivatives, the language of "rate of change at a point" appears constantly, and ARC is your tool for estimating it.

**Estimation strategy:** to estimate the rate at $x = c$, compute ARC over a small interval $[c, c + \Delta]$ or symmetric $[c - \Delta, c + \Delta]$.

---

## 1.3 Rates of Change in Linear and Quadratic Functions

**Linear function:** $f(x) = mx + b$. ARC over **any** interval is $m$. Constant.

**Quadratic function:** $f(x) = ax^2 + bx + c$. ARC over $[h, h+1]$ varies linearly with $h$.

**Test for linearity from a table:** Compute first differences ($\Delta f$) over equal-length intervals. If first differences are **constant**, function is linear.

**Test for quadratic from a table:** Compute first differences. Then compute second differences ($\Delta^2 f$). If **second differences are constant**, function is quadratic.

**Worked example.** Table:

| $x$ | 0 | 3 | 6 | 9 | 12 | 15 | 18 |
|---|---|---|---|---|---|---|---|
| $f(x)$ | 100 | 80 | 62 | 46 | 32 | 20 | 10 |

ARCs over consecutive intervals (each of length 3):
$\frac{80-100}{3} = -\frac{20}{3}$, $\frac{62-80}{3} = -6$, $\frac{46-62}{3} = -\frac{16}{3}$, $\frac{32-46}{3} = -\frac{14}{3}$, $\frac{20-32}{3} = -4$, $\frac{10-20}{3} = -\frac{10}{3}$.

These ARCs themselves change by $+\frac{2}{3}$ each step — constant change in ARC. So the function is **quadratic** (rates of change are changing at a constant rate).

This is a frequent MCQ pattern. Recognize it instantly.

---

## 1.4 Polynomial Functions and Rates of Change

**Polynomial:** $p(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$ where $a_n \ne 0$.

- $n$ is the **degree**.
- $a_n$ is the **leading coefficient**.
- $a_0$ is the **constant term** ($= p(0)$).

**Local extrema:** points where the function changes from increasing to decreasing (local max) or vice versa (local min).

**Inflection point:** point where the function changes concavity (concave up to concave down, or reverse).

**Global maximum/minimum** = largest/smallest output overall. Polynomials of even degree have either a global max or global min (depending on sign of leading coefficient). Polynomials of odd degree have neither (they go to $\pm\infty$).

**Behavior between successive zeros:** A polynomial does not change sign between consecutive simple roots without crossing zero. Sign analysis works: factor, mark zeros on a number line, test one point in each interval.

**Rate of change pattern for a degree-$n$ polynomial:** $n$-th differences over equal-spaced inputs are constant.

---

## 1.5 Polynomial Functions and Complex Zeros

**Fundamental Theorem of Algebra.** A polynomial of degree $n$ has exactly $n$ zeros (counting multiplicity) in the complex numbers.

**Complex Conjugate Pairs.** If a polynomial has **real** coefficients and $a + bi$ is a zero (with $b \ne 0$), then $a - bi$ is also a zero. Complex roots come in conjugate pairs.

**Multiplicity behavior at a zero:**
- Odd multiplicity (1, 3, 5, ...): graph **crosses** the x-axis. Near the zero, behaves like $(x - r)^{\text{odd}}$.
- Even multiplicity (2, 4, ...): graph **touches** the x-axis but does not cross (tangent to axis).
- Multiplicity 1: clean linear-style crossing.
- Multiplicity 2: parabolic touch.
- Multiplicity 3: cubic-style "flat" crossing (curve flattens momentarily).

**Even / odd functions.**
- Even function: $f(-x) = f(x)$. Symmetric about y-axis. Polynomials with **only even-degree terms** are even.
- Odd function: $f(-x) = -f(x)$. Symmetric about origin. Polynomials with **only odd-degree terms** are odd.

**Counting zeros from given information.** If you know:
- $r_1$ is a zero of multiplicity $m_1$
- $r_2$ is a complex zero (so its conjugate $\bar{r_2}$ is also a zero)

then minimum degree = $m_1 + 2$ (one for $r_2$, one for conjugate).

**Worked example.** Polynomial $g$ has zero at $x = 9.217$ multiplicity 2, and zero at $x = -3 + 0.251i$. Min degree?
- 9.217 contributes 2 (multiplicity).
- $-3 + 0.251i$ requires conjugate $-3 - 0.251i$. Together they contribute 2.
- Total: $2 + 2 = 4$. Min degree is **4**.

---

## 1.6 Polynomial Functions and End Behavior

The end behavior of $p(x) = a_n x^n + \cdots$ is determined entirely by the **leading term** $a_n x^n$.

**Four cases:**

| $n$ | sign of $a_n$ | $\lim_{x \to \infty}$ | $\lim_{x \to -\infty}$ |
|---|---|---|---|
| Even | + | $+\infty$ | $+\infty$ |
| Even | − | $-\infty$ | $-\infty$ |
| Odd | + | $+\infty$ | $-\infty$ |
| Odd | − | $-\infty$ | $+\infty$ |

Memorize these four. End-behavior MCQ is gift points.

**Worked example.** $g(x) = -2x^5 + 7x^4 + 3x^2 - 8x + 1$. Leading term $-2x^5$ — odd, negative.
$\lim_{x \to \infty} g(x) = -\infty$ and $\lim_{x \to -\infty} g(x) = +\infty$.

---

## 1.7 Rational Functions and End Behavior

**Rational function:** $f(x) = \dfrac{p(x)}{q(x)}$ where $p, q$ are polynomials, $q \not\equiv 0$.

End behavior is determined by comparing degree of numerator ($n$) to degree of denominator ($m$):

| Case | End behavior |
|---|---|
| $n < m$ | Horizontal asymptote at $y = 0$ |
| $n = m$ | Horizontal asymptote at $y = \dfrac{a_n}{b_m}$ (ratio of leading coefficients) |
| $n = m + 1$ | **Slant** asymptote (linear). Find by polynomial division. |
| $n > m + 1$ | No horizontal/slant asymptote — function grows like $x^{n-m}$. |

**Worked example.** $f$ and $g$ are quadratics. $h(x) = \dfrac{f(x)}{g(x)}$. End behavior of $h$?

Degrees equal. Horizontal asymptote at $y = \dfrac{\text{leading coef of } f}{\text{leading coef of } g}$. So $h$ approaches a constant. Sign of that constant matches the sign ratio of leading coefficients (e.g., one positive parabola over one negative parabola gives a negative ratio, so $h \to$ negative constant).

---

## 1.8 Rational Functions and Zeros

**Zeros of $f(x) = \dfrac{p(x)}{q(x)}$:** values of $x$ where $p(x) = 0$ AND $q(x) \ne 0$.

If $p$ and $q$ share a factor that cancels at $x = c$, that's a **hole** at $x = c$, not a zero.

**Sign analysis** for a rational function:
1. Factor numerator and denominator completely.
2. Mark on a number line: zeros (open or closed circle), holes, and vertical asymptotes.
3. Test one $x$-value in each interval to determine sign.
4. Combine to get: positive intervals, negative intervals, undefined points.

---

## 1.9 Rational Functions and Vertical Asymptotes

**Vertical asymptote at $x = c$:** $q(c) = 0$ AND $p(c) \ne 0$ (after fully reducing the fraction).

If both $p(c) = 0$ AND $q(c) = 0$, you might have a hole instead. Always reduce first.

**Behavior near a VA:** the function $\to \pm \infty$. To determine which side of infinity, do sign analysis just to the left and just to the right.

**Worked example.** $f(x) = \dfrac{x^2 + 2x - 15}{(x+4)(x-a)}$ for some constant $a$. Want exactly one positive x-intercept and exactly one VA. Find $a$.

Factor numerator: $(x+5)(x-3)$.

If $a = -5$: $\dfrac{(x+5)(x-3)}{(x+4)(x+5)} = \dfrac{x-3}{x+4}$ (with hole at $x = -5$). Zero at $x = 3$ (positive). VA at $x = -4$. **Exactly** one positive x-intercept, one VA. ✓

If $a = 3$: factor $(x-3)$ cancels — hole at $x = 3$. Only zero is $x = -5$ (negative). Fails.

If $a = 4$: no cancellation. Zeros at $-5$ and $3$, VAs at $-4$ and $4$. Two VAs. Fails.

So $a = -5$.

---

## 1.10 Rational Functions and Holes

**Hole at $x = c$:** $p$ and $q$ share a factor $(x - c)$ that cancels.

To find the y-coordinate of the hole, **simplify the rational function** then evaluate at $x = c$. Express using limit notation:
$$\lim_{x \to c} f(x) = \text{(value)}$$

**Worked example.** $g(x) = \dfrac{x^2 - x - 12}{x^2 - 9} = \dfrac{(x-4)(x+3)}{(x-3)(x+3)}$.

Common factor $(x+3)$ cancels — hole at $x = -3$.

Reduced: $g(x) = \dfrac{x-4}{x-3}$ (for $x \ne -3, 3$).

Hole y-coordinate: $\lim_{x \to -3} g(x) = \dfrac{-3-4}{-3-3} = \dfrac{-7}{-6} = \dfrac{7}{6}$.

Vertical asymptote at $x = 3$ (denominator zero, no cancellation).

---

## 1.11 Equivalent Representations

Polynomials and rational functions can be written multiple ways. Each form reveals different information:

| Form | Reveals |
|---|---|
| Standard $a_n x^n + \cdots + a_0$ | Degree, leading coefficient, y-intercept |
| Factored $a_n(x - r_1)(x - r_2)\cdots$ | Real zeros and multiplicities |
| Vertex form (quadratic) $a(x - h)^2 + k$ | Vertex $(h, k)$, axis of symmetry |

**Polynomial division** is the tool for converting between forms or finding slant asymptotes.

**Synthetic division** is the fast version for dividing by $(x - c)$.

To divide $\dfrac{x^3 + 2x^2 - 5x + 6}{x - 2}$ synthetically:

```
  2 |  1   2  -5   6
    |      2   8   6
    |--------------- 
       1   4   3  12
```

Quotient: $x^2 + 4x + 3$, remainder $12$. So $\dfrac{x^3 + 2x^2 - 5x + 6}{x - 2} = x^2 + 4x + 3 + \dfrac{12}{x - 2}$.

**Remainder Theorem:** $p(c)$ equals the remainder when $p(x)$ is divided by $(x - c)$. Equivalently, $(x - c)$ is a factor iff $p(c) = 0$.

---

## 1.12 Transformations of Functions

For function $f(x)$, the transformed function:
$$g(x) = a \cdot f(b(x - h)) + k$$

acts as follows:
- **$k$**: vertical translation up (positive) or down (negative).
- **$h$**: horizontal translation right (positive) or left (negative).
- **$a$**: vertical dilation by factor $|a|$. If $a < 0$, also reflect across x-axis.
- **$b$**: horizontal dilation by factor $\frac{1}{|b|}$. If $b < 0$, also reflect across y-axis.

**Critical:** vertical and horizontal effects work in **opposite** ways from how they look. $b = 2$ doesn't stretch — it **compresses** by factor $\frac{1}{2}$. $h = 3$ inside $(x - h)$ shifts **right** by 3, not left.

**Worked example.** $f$ is given by a table. $g(x) = a f(bx) + c$ where $a = 3$, $b = \frac{1}{2}$, $c = 5$. Transformation order: horizontal dilation by 2, vertical dilation by 3, vertical translation up 5.

For $g(-4)$: $g(-4) = 3 f(\tfrac{1}{2} \cdot -4) + 5 = 3 f(-2) + 5$.

If $f(-2) = 5$ (from the table), then $g(-4) = 3(5) + 5 = 20$.

**Range under transformation.** If $f$ has range $[m, M]$, then $a f(\cdot) + c$ has range $[a m + c, a M + c]$ (when $a > 0$) or $[a M + c, a m + c]$ (when $a < 0$). Horizontal transformations leave range unchanged.

---

## 1.13 Function Model Selection

Given data, decide which function class fits. Decision rules:

| Pattern in data | Likely model |
|---|---|
| Equal $\Delta x$ → constant $\Delta y$ | Linear |
| Equal $\Delta x$ → constant $\Delta^2 y$ | Quadratic |
| Equal $\Delta x$ → constant $\Delta^n y$ | Polynomial of degree $n$ |
| Equal $\Delta x$ → constant **ratio** $y_{i+1}/y_i$ | Exponential |
| Equal **multiplicative** $x$ change ($\times k$) → constant $\Delta y$ | Logarithmic |

**Residual plots.** After fitting a model, plot residuals (= actual − predicted) vs. $x$.
- **Random scatter, no pattern** → model is appropriate.
- **Clear pattern (curve, fan, trend)** → model is **inappropriate**.

A curved residual plot for a linear model means the true relationship is nonlinear.

---

## 1.14 Function Model Construction and Application

Two patterns the exam loves:

**Direct proportion.** $y = k x$. Used for "$y$ is proportional to $x$."

**Inverse proportion.** $y = \dfrac{k}{x}$. Used for "$y$ is inversely proportional to $x$."

**Constant of proportionality:** $k$. Find it from a single data point, then use for predictions.

**Building a quadratic model from three points.** Plug each $(x_i, y_i)$ into $f(x) = ax^2 + bx + c$, get a 3-equation system in $a, b, c$. Solve.

**Worked example.** Spotify subscribers (in millions) vs. years after 2015:

| Year | $x$ | Subscribers |
|---|---|---|
| 2015 | 0 | 28 |
| 2018 | 3 | 96 |
| 2021 | 6 | 180 |

System:
$$f(0) = c = 28$$
$$f(3) = 9a + 3b + c = 96 \Rightarrow 9a + 3b = 68$$
$$f(6) = 36a + 6b + c = 180 \Rightarrow 36a + 6b = 152$$

From the second equation: $b = \dfrac{68 - 9a}{3}$. Substitute into third:
$$36a + 6 \cdot \dfrac{68 - 9a}{3} = 152$$
$$36a + 2(68 - 9a) = 152$$
$$36a + 136 - 18a = 152$$
$$18a = 16 \Rightarrow a = \dfrac{8}{9}$$

Then $b = \dfrac{68 - 9 \cdot 8/9}{3} = \dfrac{60}{3} = 20$.

Model: $f(x) = \dfrac{8}{9} x^2 + 20 x + 28$.

Quadratic, leading coefficient $\frac{8}{9} > 0$ → concave up. So average rates of change increase as $x$ increases.

---

## Unit 1 Mastery Checklist

You should be able to do these without notes:

- [ ] Identify "increasing at increasing rate" etc. from a graph.
- [ ] Compute average rate of change over any interval.
- [ ] Recognize linear/quadratic/polynomial of degree $n$ from a table of equal-spaced data.
- [ ] State end behavior of any polynomial from inspection.
- [ ] Find real and complex zeros of a polynomial (using factoring, conjugate pair theorem).
- [ ] Determine multiplicity behavior at a zero (cross vs touch vs flat-cross).
- [ ] Find vertical asymptotes, holes, horizontal/slant asymptotes of any rational function.
- [ ] Express hole y-value using limit notation.
- [ ] Apply transformation $a f(b(x-h)) + k$ correctly, including order of operations.
- [ ] Choose linear vs quadratic vs polynomial vs exponential vs logarithmic model from a data table.
- [ ] Build a quadratic model through three points.
- [ ] Read residual plots to assess model fit.

If any item isn't automatic, return to its section above.

→ Continue to `02_UNIT_2.md`.
