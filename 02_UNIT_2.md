# Unit 2 — Exponential and Logarithmic Functions

**Exam weight: 27–40%.** This unit lives on three core ideas:

1. **Sequences and the link to functions.** Arithmetic ↔ linear, geometric ↔ exponential.
2. **Exponential and logarithmic functions are inverses.** Every property of one mirrors a property of the other.
3. **Composition and inversion** are the algebraic tools that bind everything.

If you internalize the inverse relationship, half this unit collapses to one concept seen from two angles.

---

## 2.1 Change in Arithmetic and Geometric Sequences

**Arithmetic sequence:** Each term differs from the previous by a constant **common difference** $d$.
- Recursive: $a_n = a_{n-1} + d$.
- Explicit: $a_n = a_1 + (n - 1)d$.

**Geometric sequence:** Each term equals the previous times a constant **common ratio** $r$.
- Recursive: $g_n = r \cdot g_{n-1}$.
- Explicit: $g_n = g_1 \cdot r^{n-1}$.

**Identification trick:** for a sequence $a_1, a_2, a_3, \ldots$:
- If $a_2 - a_1 = a_3 - a_2 = \cdots$, it's arithmetic.
- If $\frac{a_2}{a_1} = \frac{a_3}{a_2} = \cdots$, it's geometric.

**Worked example.** Sequence $6.5, 3.25, 1.625, 0.8125, 0.40625, \ldots$

Compute ratios: $\frac{3.25}{6.5} = 0.5$. Each subsequent ratio is also 0.5. **Geometric with $r = 0.5$.**

**Worked example (graph).** Geometric sequence shown: $g_1 = 8, g_2 = 4, g_3 = 2, g_4 = 1, \ldots$ Ratio $r = \frac{1}{2}$.

Explicit: $g_n = 8 \left(\frac{1}{2}\right)^{n-1}$. Equivalent: $g_n = 4 \left(\frac{1}{2}\right)^{n-2}$ (shifting the index).

---

## 2.2 Change in Linear and Exponential Functions

**Linear function** $f(x) = mx + b$ — equal additions in $x$ produce equal additions in $f(x)$.

**Exponential function** $f(x) = a b^x$ — equal additions in $x$ produce equal **multiplications** in $f(x)$.

| Property | Linear | Exponential |
|---|---|---|
| Form | $f(x) = mx + b$ | $f(x) = a b^x$ |
| Constant change with equal $\Delta x$ | $\Delta f$ constant | $f$-ratio constant |
| Graph shape | Straight line | Curve with horizontal asymptote |
| Long-run growth | Slow | Eventually outpaces any polynomial |

**Why exponentials win long-term:** the multiplicative effect compounds.

---

## 2.3 Exponential Functions

General form: $f(x) = a \cdot b^x$ with $a \ne 0$, $b > 0$, $b \ne 1$.

**Properties:**
- $f(0) = a$ (y-intercept).
- Growth if $b > 1$: $f$ increases.
- Decay if $0 < b < 1$: $f$ decreases.
- Domain: all real numbers.
- Range: $(0, \infty)$ if $a > 0$; $(-\infty, 0)$ if $a < 0$.
- Horizontal asymptote: $y = 0$ (the x-axis).

**Identification rule:** if when $x$ increases by 1, $y$ multiplies by $k$, then $b = k$. The y-intercept is $a$.

---

## 2.4 Exponential Function Manipulation

The exponent rules:

| Rule | Form |
|---|---|
| Product | $b^m \cdot b^n = b^{m+n}$ |
| Quotient | $\dfrac{b^m}{b^n} = b^{m-n}$ |
| Power | $(b^m)^n = b^{mn}$ |
| Negative | $b^{-m} = \dfrac{1}{b^m}$ |
| Fractional | $b^{m/n} = \sqrt[n]{b^m}$ |
| Different bases, same exponent | $a^m \cdot b^m = (ab)^m$ |

**Standard rewrites you should do automatically:**
- $a \cdot b^{kx} = a (b^k)^x$ — change of base/coefficient.
- $b^{x + c} = b^c \cdot b^x$ — separate constants.
- $b^{-x} = \left(\frac{1}{b}\right)^x$ — flip growth↔decay.

**Worked example.** $h(d) = A_0 (0.5)^{d/8}$ where $d$ is days. Convert to a function of hours $t$, with $t = 24d$ so $d = t/24$.
$$k(t) = A_0 (0.5)^{(t/24)/8} = A_0 (0.5)^{t/192} = A_0 \left( 0.5^{1/192} \right)^t$$

**Worked example.** Value increases by 6.1% each quarter, with $M(0) = 54$ million, $t$ in **years**, 4 quarters per year.

Per quarter the growth factor is $1.061$. After $4t$ quarters: $M(t) = 54 (1.061)^{4t}$.

---

## 2.5 Exponential Function Context and Data Modeling

**Doubling time interpretation:** "$P$ doubles every $T$ time units" → $P(t) = P_0 \cdot 2^{t/T}$.

**Half-life interpretation:** "$P$ halves every $T$ time units" → $P(t) = P_0 \cdot (1/2)^{t/T}$.

**Continuous percent rate:** "growing at $r\%$ per unit time" → $P(t) = P_0 (1 + r/100)^t$.

**Worked example.** Pet product revenue doubles every 9 months, $r(0) = 32{,}000$, $t$ in months.
$$r(t) = 32{,}000 \cdot 2^{t/9}$$

**Worked example.** Algae population doubles every 5 hours, initial 2500, after 24 hours:
$$P(24) = 2500 \cdot 2^{24/5} = 2500 \cdot 2^{4.8} \approx 2500 \cdot 27.858 \approx 69{,}644$$

---

## 2.6 Competing Function Model Validation

Given data, fit multiple models (e.g., quadratic vs. exponential), then use **residual plots** to choose.

A residual is $r_i = \text{observed} - \text{predicted}$.

- **Random scatter** = model fits.
- **Patterned residuals** (curve, fan, drift) = model is wrong, regardless of how well it appears to fit overall.

**Worked example.** Two residual plots: Model A scattered, no pattern; Model B has a clear curved pattern. Conclusion: Model A is appropriate, Model B is not — even if Model B's R² happens to be higher, the residual pattern means the model is misspecified.

**Smallest residual** (closest to 0): the model is most accurate at that data point. Negative residual = model **overestimates** (predicted > actual). Positive residual = model **underestimates**.

---

## 2.7 Composition of Functions

$(f \circ g)(x) = f(g(x))$. Apply $g$ first, then feed the result into $f$.

**Worked example.** $f(x) = 3^x + x^2$ and $g$ given by table with $g(3) = -2$.

$f(g(3)) = f(-2) = 3^{-2} + (-2)^2 = \frac{1}{9} + 4 = \frac{37}{9}$.

**Worked example.** $f$ given by table, $g(x) = \dfrac{x^2 - x - 12}{x^2 - 9}$. Find $h(8/3) = f(g(8/3))$.

$g(8/3) = \dfrac{8/3 - 4}{8/3 - 3} = \dfrac{-4/3}{-1/3} = 4$.

$f(4) = 2$ (from table).

$h(8/3) = 2$.

**Decomposition.** Going the other way: given $h(x) = f(g(x))$, identify candidate $f$ and $g$. Often there are multiple decompositions.

Example: $h(x) = \sqrt{x^2 + 1}$ → $f(u) = \sqrt{u}$, $g(x) = x^2 + 1$.

---

## 2.8 Inverse Functions

**Inverse function $f^{-1}$:** for each $y$ in the range of $f$, $f^{-1}(y)$ returns the unique $x$ such that $f(x) = y$.

For an inverse to exist, $f$ must be **one-to-one** on its domain (each output comes from at most one input). On a graph, one-to-one ↔ passes the **horizontal line test**.

**Properties:**
- $f(f^{-1}(x)) = x$ for $x$ in domain of $f^{-1}$.
- $f^{-1}(f(x)) = x$ for $x$ in domain of $f$.
- Domain of $f^{-1}$ = range of $f$. Range of $f^{-1}$ = domain of $f$.
- Graph of $f^{-1}$ is reflection of graph of $f$ across $y = x$.

**To find an inverse algebraically:**
1. Write $y = f(x)$.
2. Swap $x$ and $y$: $x = f(y)$.
3. Solve for $y$.
4. Result is $f^{-1}(x) = y$.

**To evaluate $f^{-1}(b)$ from a table or graph:** find the $x$ such that $f(x) = b$.

**Worked example.** $f$ table:

| $x$ | 2 | 4 | 8 | 16 | 32 |
|---|---|---|---|---|---|
| $f(x)$ | 1 | 2 | 3 | 4 | 5 |

$f^{-1}(4)$: which $x$ has $f(x) = 4$? Answer: $x = 16$. So $f^{-1}(4) = 16$.

**Restricting domain to make a function invertible.** If $f$ isn't one-to-one on its full domain, restrict to an interval where it is. Choose the largest such interval that includes "natural" values.

**Worked example.** $g(x) = \sin x - \cos x$, period $2\pi$. $g(x) = \sqrt{2} \sin(x - \pi/4)$ (using sum/difference identity). $g$ is monotonic on intervals of length $\pi$ (half a period). The interval $[-\pi/4, 3\pi/4]$ is one such — $g$ goes from $-\sqrt{2}$ to $\sqrt{2}$ monotonically. Length $\pi$ = half the period.

The rationale "length is half the period" is correct because the function attains all of its values exactly once over a half-period interval where it's monotonic.

---

## 2.9 Logarithmic Expressions

**Definition.** $\log_b y = x$ means $b^x = y$.

The logarithm $\log_b y$ is the **exponent** to which you raise $b$ to get $y$.

**Restrictions:** $b > 0$, $b \ne 1$, $y > 0$.

**Notation conventions:**
- $\log x$ (no base) = $\log_{10} x$ (common log).
- $\ln x$ = $\log_e x$ (natural log), where $e \approx 2.71828$.

**Exact values** you should know without thinking:
- $\log_b 1 = 0$ (since $b^0 = 1$).
- $\log_b b = 1$ (since $b^1 = b$).
- $\log_b b^x = x$ (definition).
- $b^{\log_b x} = x$ (definition).

Examples: $\log_2 8 = 3$, $\log_2 16 = 4$, $\log_3 81 = 4$, $\log_5 \frac{1}{25} = -2$, $\ln e^7 = 7$.

---

## 2.10 Inverses of Exponential Functions

The inverse of $f(x) = b^x$ is $f^{-1}(x) = \log_b x$.

The inverse of $f(x) = a b^x$ is $f^{-1}(x) = \log_b(x/a)$ (solve $y = a b^x$ for $x$).

The inverse of $f(x) = a + b \log(x + c)$ is exponential. Practice solving for the inverse:

**Worked example.** $f(x) = 12 \log_2(x + 5) + 6$. Find $f^{-1}$.

Set $y = 12 \log_2(x + 5) + 6$.
Swap: $x = 12 \log_2(y + 5) + 6$.
Solve: $x - 6 = 12 \log_2(y + 5)$ → $(x - 6)/12 = \log_2(y + 5)$ → $y + 5 = 2^{(x-6)/12}$ → $y = 2^{(x-6)/12} - 5$.

So $f^{-1}(x) = 2^{(x-6)/12} - 5$.

To find where $f^{-1}(x) = 0$: equivalent to finding $x$ such that $f(0) = x$.
$f(0) = 12 \log_2 5 + 6$. Compute: $\log_2 5 \approx 2.3219$. $12 \cdot 2.3219 + 6 \approx 33.863$.

So $f^{-1}(33.863) \approx 0$.

---

## 2.11 Logarithmic Functions

**General form:** $f(x) = a \log_b(x - h) + k$ (with possibly other transformations).

**Properties of $f(x) = \log_b x$ (for $b > 1$):**
- Domain: $(0, \infty)$.
- Range: all real numbers.
- Vertical asymptote: $x = 0$.
- Increasing.
- Concave down.
- Passes through $(1, 0)$ and $(b, 1)$.
- $f(x) \to -\infty$ as $x \to 0^+$.
- $f(x) \to \infty$ as $x \to \infty$ (very slowly).

For $0 < b < 1$: decreasing instead, but still domain $(0, \infty)$, vertical asymptote at $x = 0$.

**The exponential-logarithmic mirror:**

| $f(x) = b^x$ | $f^{-1}(x) = \log_b x$ |
|---|---|
| Domain: all reals | Domain: $(0, \infty)$ |
| Range: $(0, \infty)$ | Range: all reals |
| Horizontal asymptote $y = 0$ | Vertical asymptote $x = 0$ |
| Y-intercept $(0, 1)$ | X-intercept $(1, 0)$ |
| $b^x \to \infty$ as $x \to \infty$ | $\log_b x \to \infty$ as $x \to \infty$ |
| $b^x \to 0$ as $x \to -\infty$ | $\log_b x \to -\infty$ as $x \to 0^+$ |

---

## 2.12 Logarithmic Function Manipulation

**Log rules** (assume valid arguments throughout):

| Rule | Form |
|---|---|
| Product | $\log_b(MN) = \log_b M + \log_b N$ |
| Quotient | $\log_b(M/N) = \log_b M - \log_b N$ |
| Power | $\log_b(M^p) = p \log_b M$ |
| Change of base | $\log_b M = \dfrac{\log_a M}{\log_a b} = \dfrac{\ln M}{\ln b}$ |
| Special | $\log_b 1 = 0$, $\log_b b = 1$ |

**The most-tested rewrite.** Combine multiple logs into one:
$$3 \log_b M - 2 \log_b N + \log_b P = \log_b \frac{M^3 P}{N^2}$$

**Worked example.** Rewrite as a single logarithm with no negative exponents:
$$3 \log x^2 - \log \sqrt{x} = \log(x^2)^3 - \log x^{1/2} = \log x^6 - \log x^{1/2} = \log \frac{x^6}{x^{1/2}} = \log x^{11/2} = \log \sqrt{x^{11}}$$

**Worked example.** Rewrite $\log_{10}\left( \dfrac{kz}{w^2} \right)$ as a sum/difference of simpler logs.
$$\log_{10}(kz) - \log_{10}(w^2) = \log_{10} k + \log_{10} z - 2 \log_{10} w$$

**Worked example.** Solve $\ln(x^3) - \ln x = 4$.
$$\ln \frac{x^3}{x} = 4 \Rightarrow \ln x^2 = 4 \Rightarrow x^2 = e^4$$

But note: $\ln(x^3)$ requires $x^3 > 0$, so $x > 0$. Reject negative root. Answer: $x = e^2$.

---

## 2.13 Exponential and Logarithmic Equations

**Strategy 1 (matching bases).** If both sides can be written with the same base, equate exponents.
$$2^{3x} = 16 = 2^4 \Rightarrow 3x = 4 \Rightarrow x = 4/3$$

**Strategy 2 (take log).** When bases can't be matched, take log of both sides.
$$5^x = 17 \Rightarrow x \ln 5 = \ln 17 \Rightarrow x = \dfrac{\ln 17}{\ln 5}$$

**Strategy 3 (exponentiate).** For log equations, exponentiate both sides.
$$\log_2(x + 3) = 5 \Rightarrow x + 3 = 2^5 = 32 \Rightarrow x = 29$$

**Strategy 4 (substitute).** For equations with $b^{2x}$ and $b^x$, let $u = b^x$ to get a polynomial.
$$2^{2x} - 5 \cdot 2^x + 4 = 0$$
$$\text{Let } u = 2^x: \quad u^2 - 5u + 4 = 0 \Rightarrow (u-4)(u-1) = 0 \Rightarrow u = 4 \text{ or } 1$$
$$2^x = 4 \Rightarrow x = 2; \quad 2^x = 1 \Rightarrow x = 0$$

**Critical: domain check.** When solving log equations, **always** verify solutions are in the domain (arguments of all logs must be positive). Reject extraneous solutions.

**Worked example.** $h(x) = 4000(2^{5x}) + 100 = 6100$.
$$4000 \cdot 2^{5x} = 6000 \Rightarrow 2^{5x} = \tfrac{3}{2}$$
$$5x = \log_2(3/2) = \log_2 3 - 1$$
$$x = \dfrac{\log_2 3 - 1}{5}$$

**Worked example.** $k(x) = 8 e^{3x} - e = 3e$.
$$8 e^{3x} = 4e \Rightarrow e^{3x} = \dfrac{e}{2} \Rightarrow 3x = \ln\dfrac{e}{2} = 1 - \ln 2$$
$$x = \dfrac{1 - \ln 2}{3}$$

**Worked example (substitution + trig).** $g(x) = 6 \sin^2 x - 5 \sin x = 4$ on $[\pi/2, 3\pi/2]$.

Let $u = \sin x$: $6u^2 - 5u - 4 = 0$. Quadratic formula: $u = \dfrac{5 \pm \sqrt{25 + 96}}{12} = \dfrac{5 \pm 11}{12}$.

$u = \dfrac{16}{12} = \dfrac{4}{3}$ — reject ($\sin x \le 1$).
$u = -\dfrac{1}{2}$.

So $\sin x = -\dfrac{1}{2}$ on $[\pi/2, 3\pi/2]$. The reference angle is $\pi/6$; $\sin$ is negative in QIII and QIV. In our interval: $x = \pi + \pi/6 = 7\pi/6$ (QIII). $11\pi/6$ is QIV but outside the interval.

Answer: $x = \dfrac{7\pi}{6}$.

---

## 2.14 Logarithmic Function Context and Data Modeling

**When to use a logarithmic model.** Pattern: as $x$ multiplies by a constant, $y$ increases by a constant amount.

**Worked example.** Table:

| $x$ | 2 | 4 | 8 | 16 | 32 |
|---|---|---|---|---|---|
| $f(x)$ | 1 | 2 | 3 | 4 | 5 |

Each time $x$ **doubles**, $f$ increases by **1**. This is the defining property of a logarithmic function: equal multiplicative changes in input cause equal additive changes in output. Specifically $f(x) = \log_2 x$.

**Reasoning sentence (FRQ-ready):** "The function $f$ is best modeled by a logarithmic function because as the input values are multiplied by a constant factor (here, 2), the output values increase by a constant amount (here, 1). This is the defining characteristic of a logarithmic function."

---

## 2.15 Semi-log Plots

A **semi-log plot** has a logarithmic vertical axis (or horizontal). Used to display data spanning many orders of magnitude.

**Key fact:** if data follows an exponential pattern $y = a b^x$, then $\log y = \log a + x \log b$ — **linear** in $x$ on the semi-log plot. So exponential data appears as a straight line on semi-log axes.

This is why exponential regression on a calculator works by linear regression on $(x, \log y)$.

**Reading a semi-log plot:**
- Vertical gridlines spaced equally as you'd expect.
- Horizontal gridlines at $1, 10, 100, 1000, \ldots$ — each equally spaced visually but multiplying by 10.

A straight line on a semi-log plot indicates exponential behavior.

---

## Unit 2 Mastery Checklist

- [ ] Distinguish arithmetic and geometric sequences from a list of values.
- [ ] Write recursive and explicit forms of arithmetic and geometric sequences.
- [ ] State that linear ↔ arithmetic and exponential ↔ geometric.
- [ ] Apply all exponent rules fluently (product, quotient, power, negative, fractional).
- [ ] Build exponential models from doubling time, half-life, percent rate.
- [ ] Convert exponential models between time units (e.g., days to hours).
- [ ] Compute compositions $f(g(x))$ from formulas, tables, or graphs.
- [ ] Find inverses algebraically by swapping $x$ and $y$ and solving.
- [ ] Evaluate $f^{-1}(c)$ from a table by reverse lookup.
- [ ] Restrict the domain of a non-one-to-one function to make it invertible.
- [ ] State the inverse-relationship of $b^x$ and $\log_b x$ in domain/range/asymptote.
- [ ] Apply log rules to combine or expand log expressions.
- [ ] Solve exponential and logarithmic equations (matching bases, taking logs, substitution).
- [ ] Always check domain on log equations — reject extraneous solutions.
- [ ] Recognize logarithmic data: equal multiplicative input change = equal additive output change.
- [ ] Read and interpret a semi-log plot.

→ Continue to `03_UNIT_3.md`.
