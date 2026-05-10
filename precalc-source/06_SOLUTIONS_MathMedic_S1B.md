# Solutions — Math Medic Section I, Part B (12 MCQ, Calculator Required)

12 questions in 40 minutes. Average ~3.3 min per question. The calculator handles the arithmetic; you handle the setup.

---

## Q1 — Decreasing AND concave down

$f(x) = |-0.2x^2 - 3x + 4| + 2$.

**Answer: B** ($(-7.5, 1.232)$).

Let $g(x) = -0.2x^2 - 3x + 4$ (the inside without absolute value). It's a downward parabola with vertex at $x = -3/(2 \cdot -0.2) = -7.5$, $g(-7.5) = 15.25$.

Find where $g(x) = 0$: $0.2x^2 + 3x - 4 = 0 \Rightarrow x^2 + 15x - 20 = 0 \Rightarrow x = \frac{-15 \pm \sqrt{305}}{2}$. Numerically: $x \approx -16.232$ and $x \approx 1.232$.

Now $f(x) = |g(x)| + 2$:
- On $-16.232 \le x \le 1.232$: $g \ge 0$, so $f(x) = g(x) + 2$ — concave **down** (parabola opening down). $f$ is increasing on $(-16.232, -7.5)$ and decreasing on $(-7.5, 1.232)$.
- On $x < -16.232$ or $x > 1.232$: $g < 0$, so $f(x) = -g(x) + 2 = 0.2x^2 + 3x - 2$ — concave **up**.

Decreasing **and** concave down: only on $(-7.5, 1.232)$.

**Takeaway:** for $|q(x)|$, the absolute value flips the parabola where $q < 0$, swapping concavity. Sketch the resulting curve.

---

## Q2 — Geometric ratio

Sequence: $6.5, 3.25, 1.625, 0.8125, 0.40625$.

**Answer: A** ($0.5$).

$3.25/6.5 = 0.5$. Verify: $1.625/3.25 = 0.5$. Common ratio = 0.5.

---

## Q3 — Doubling time

Algae start at 2500, doubles every 5 hours. After 24 hours?

**Answer: D** ($69{,}644$).

$P(24) = 2500 \cdot 2^{24/5} = 2500 \cdot 2^{4.8}$.
$2^{4.8} \approx 27.858$.
$P(24) \approx 2500 \cdot 27.858 \approx 69{,}644$.

---

## Q4 — Binomial coefficient

Find coefficient of $x^3$ in $(2x^3 - 5)^7$.

**Answer: A** ($218{,}750$).

By the binomial theorem, $(2x^3 - 5)^7 = \sum_{k=0}^{7} \binom{7}{k} (2x^3)^{7-k} (-5)^k$.

The exponent of $x$ in the $k$-th term is $3(7-k) = 21 - 3k$. Want $x^3$: $21 - 3k = 3 \Rightarrow k = 6$.

Coefficient = $\binom{7}{6} \cdot 2^1 \cdot (-5)^6 = 7 \cdot 2 \cdot 15625 = 218{,}750$.

**Takeaway:** binomial expansion problems — write the general term, set the exponent, solve for $k$.

---

## Q5 — Exponential regression interpretation

Meal plan costs over years 1957–2023. Exponential regression. Smallest error = ?

**Answer: C** (smallest error is $-\$20.57$, model overestimates).

Run exponential regression on calculator (LinReg on log of y, then back-transform). Residual = actual − predicted. Negative residual → predicted > actual → model **overestimates**.

The smallest |residual| of $\$20.57$ is negative, so model overestimates at that data point.

**Takeaway:** sign of residual = direction of model error. Negative = overestimate; positive = underestimate.

---

## Q6 — Decibel logarithmic comparison

Decibel scale: $\text{dB} = 10 \log_{10}(I/I_0)$. Normal conversation 60 dB, damaging sound 95 dB. How many times more intense?

**Answer: D** (3162).

Difference is 35 dB ⇒ $10 \log(\text{ratio}) = 35 \Rightarrow \log(\text{ratio}) = 3.5 \Rightarrow \text{ratio} = 10^{3.5} \approx 3162$.

**Takeaway:** every 10 dB increase = 10× more intense. So 30 dB = 1000×, 35 dB = 10^{3.5} ≈ 3162×.

---

## Q7 — Reading sinusoid from graph

$f(t) = a \cos(b(t+c)) + d$ with $a, b, c, d > 0$. Find $b$.

**Answer: A** ($0.785 = \pi/4$).

Read the period from the graph (the standard graph shows period 8 — peaks 8 units apart). $b = 2\pi/8 = \pi/4 \approx 0.785$.

(If the graph instead shows period ~5, the answer is B = 1.273; verify against the actual graph in your packet.)

**Takeaway:** $b = 2\pi / \text{period}$. Always.

---

## Q8 — Inverse value

$f(x) = 12 \log_2(x + 5) + 6$. $g = f^{-1}$. Find $x$ such that $g(x) = 0$.

**Answer: D** ($33.863$).

$g(x) = 0 \iff f(0) = x$. So $x = 12 \log_2 5 + 6 \approx 12(2.3219) + 6 \approx 33.863$.

**Takeaway:** "$f^{-1}(b) = a$" means "$f(a) = b$." Use this whenever you can avoid actually inverting.

---

## Q9 — Complex to polar

Express $-3 + 5i$ in polar form.

**Answer: C** ($5.831 \cos(2.111) + i \cdot 5.831 \sin(2.111)$).

$r = \sqrt{9 + 25} = \sqrt{34} \approx 5.831$. The point $-3 + 5i$ is in QII. $\theta = \pi - \arctan(5/3) \approx \pi - 1.0304 \approx 2.111$.

**Takeaway:** $r = |z|$, $\theta = \arg(z)$ with quadrant adjustment. QII: $\theta = \pi - |\arctan|$.

---

## Q10 — Trig identity simplification

Simplify $\sec\theta \csc\theta - \cot\theta$.

**Answer: B** ($\tan\theta$).

$$\frac{1}{\cos\theta\sin\theta} - \frac{\cos\theta}{\sin\theta} = \frac{1 - \cos^2\theta}{\sin\theta\cos\theta} = \frac{\sin^2\theta}{\sin\theta\cos\theta} = \frac{\sin\theta}{\cos\theta} = \tan\theta$$

**Takeaway:** common denominator + Pythagorean substitution. Standard simplification move.

---

## Q11 — Sinusoidal tide model

Period 14 hr, high tide 5.83 ft at $t=9$, low tide 0.52 ft at $t=16$. Height at $t=20$?

**Answer: D** (3.766 ft).

$A = (5.83-0.52)/2 = 2.655$, $D = (5.83+0.52)/2 = 3.175$, $B = 2\pi/14 = \pi/7$, max at $t=9$ → $C = 9$.

$h(t) = 2.655 \cos\left(\tfrac{\pi}{7}(t - 9)\right) + 3.175$.

$h(20) = 2.655 \cos(11\pi/7) + 3.175 \approx 2.655(0.2225) + 3.175 \approx 3.766$.

**Takeaway:** model first, evaluate second. $A, B, C, D$ each from a specific feature.

---

## Q12 — Polar rate of change

$r(\theta) = 2\sin\theta\cos\theta = \sin(2\theta)$ on $\frac{7\pi}{12} \le \theta \le \frac{3\pi}{4}$.

**Answer: B** (distance is increasing at a decreasing rate).

$2\theta \in [7\pi/6, 3\pi/2]$. $\sin(2\theta)$ is decreasing on this interval, going from $-1/2$ to $-1$. So $r$ decreases from $-1/2$ to $-1$. Distance $|r|$ increases from $1/2$ to $1$.

Rate of $|r|$ increase: $\frac{d|r|}{d\theta} = -\frac{dr}{d\theta} = -2\cos(2\theta)$. At $2\theta = 7\pi/6$: $-2(-\sqrt{3}/2) = \sqrt{3}$. At $2\theta = 3\pi/2$: $-2(0) = 0$. Rate goes from $\sqrt{3}$ down to $0$ — **decreasing rate** of increase.

**Takeaway:** for polar problems with negative $r$, the **distance** is $|r|$, not $r$. Track magnitude separately.

---

## Section I Part B — Patterns

1. Pure calculation problems where calc handles the arithmetic (Q3, Q4, Q6, Q8, Q9).
2. Setup problems where the work is recognizing the model (Q5, Q7, Q11).
3. Algebraic identities you should recognize without calc (Q10).
4. Polar / trig where mental setup matters more than computation (Q1, Q12).

When the calc is allowed, **don't** waste effort on by-hand algebra you can avoid. But you still need to understand the structure to set up the right calculation.
