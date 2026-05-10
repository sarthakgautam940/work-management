# Solutions — Math Medic Section II, Part B (2 FRQ, No Calculator)

15 minutes per question. Exact answers expected (radicals, $\pi$, logs as needed). No decimal approximations except where context demands.

---

## Q3 — Metronome (sinusoidal modeling)

A metronome sliding weight, position $h(t)$ (inches from center). At top setting, 40 BPM (where 1 beat = pendulum from one extreme to the other). Furthest left → $-4$, furthest right → $+4$. At $t=0$, pendulum is furthest left.

### Setup

Beat = half a period (extreme to extreme). 40 beats/min ⇒ 1 beat per $60/40 = 1.5$ sec ⇒ period $= 3$ sec.

Amplitude $= 4$. Midline $= 0$.

At $t = 0$, $h = -4$ (minimum).

### (A) Five points $F, G, J, K, P$ on the graph.

Quarter-period $= 0.75$ sec. Two full cycles span 6 seconds.

Reading the graph (starts at min at $t=0$, then midline rising → max → midline falling → min → midline rising):
- $F$ — midline rising at $t = 0.75$: $(0.75, 0)$.
- $G$ — first max at $t = 1.5$: $(1.5, 4)$.
- $J$ — midline falling at $t = 2.25$: $(2.25, 0)$.
- $K$ — second min at $t = 3$: $(3, -4)$.
- $P$ — midline rising at $t = 3.75$: $(3.75, 0)$.

**Answer:** $F = (0.75, 0)$, $G = (1.5, 4)$, $J = (2.25, 0)$, $K = (3, -4)$, $P = (3.75, 0)$.

### (B) Find $a, b, c, d$ in $h(t) = a \cos(b(t + c)) + d$.

Amplitude $4$, midline $0$ ⇒ $|a| = 4$, $d = 0$.

Period $3$ ⇒ $b = 2\pi/3$.

At $t=0$, $h = -4$: $a \cos(b \cdot c) + 0 = -4$. To make this minimum at $t=0$, the simplest choice is $a = -4$ and $c = 0$:
$$h(0) = -4 \cos(0) = -4 \cdot 1 = -4 \checkmark$$

**Answer:** $a = -4$, $b = \dfrac{2\pi}{3}$, $c = 0$, $d = 0$.

(Equivalent forms: $a = 4, c = -3/2, d = 0$ — both correct. The simpler form is $a = -4$.)

### (C)(i) On the interval $(t_J, t_K) = (2.25, 3)$, behavior of $h$?

On this interval, $h$ goes from $0$ (midline) at $t = 2.25$ down to $-4$ (minimum) at $t = 3$.

So $h$ is **negative and decreasing**.

**Answer: a.** $h$ is negative and decreasing.

### (C)(ii) Rate of change of $h$ on $(t_J, t_K)$.

At $t = 2.25$ (midline going down), the slope of $h$ is at its most negative — the function is decreasing fastest.

At $t = 3$ (minimum), the slope of $h$ is $0$ — the function momentarily stops decreasing.

So the slope (a number) is **increasing** (going from a large negative number toward 0). Equivalently: the curve is concave up on this interval, and the rate of change of $h$ is increasing.

**Answer:** The rate of change of $h$ is **increasing** on $(t_1, t_2)$. (The graph is concave up, with slope going from a large negative value toward 0.)

---

## Q4 — Multi-part trig and log

### (A)(i) Solve $g(x) = 6\sin^2 x - 5\sin x = 4$ on $[\pi/2, 3\pi/2]$.

Substitute $u = \sin x$:
$$6u^2 - 5u - 4 = 0$$

Quadratic formula: $u = \dfrac{5 \pm \sqrt{25 + 96}}{12} = \dfrac{5 \pm \sqrt{121}}{12} = \dfrac{5 \pm 11}{12}$.

$u = \dfrac{16}{12} = \dfrac{4}{3}$ — reject, since $|\sin x| \le 1$.

$u = -\dfrac{6}{12} = -\dfrac{1}{2}$.

So $\sin x = -\dfrac{1}{2}$ on $[\pi/2, 3\pi/2]$.

Reference angle $\pi/6$. Sine negative in QIII and QIV.
- QIII: $x = \pi + \pi/6 = 7\pi/6$ — in interval ✓.
- QIV: $x = 2\pi - \pi/6 = 11\pi/6 \approx 5.76$, but $3\pi/2 \approx 4.71$, so out of interval. ✗.

**Answer:** $x = \dfrac{7\pi}{6}$.

### (A)(ii) Solve $h(x) = 4000 \cdot 2^{5x} + 100 = 6100$.

$$4000 \cdot 2^{5x} = 6000 \Rightarrow 2^{5x} = \dfrac{3}{2}$$

$$5x = \log_2(3/2) = \log_2 3 - \log_2 2 = \log_2 3 - 1$$

$$x = \dfrac{\log_2 3 - 1}{5}$$

**Answer:** $x = \dfrac{\log_2 3 - 1}{5}$.

### (B)(i) Rewrite $j(x) = 3 \log x^2 - \log \sqrt{x}$ as a single logarithm without negative exponents.

$$3 \log x^2 = \log (x^2)^3 = \log x^6$$
$$\log \sqrt{x} = \log x^{1/2}$$

$$j(x) = \log x^6 - \log x^{1/2} = \log \dfrac{x^6}{x^{1/2}} = \log x^{6 - 1/2} = \log x^{11/2}$$

To avoid the fractional exponent in the visual answer (though $11/2$ is positive, not negative): $\log x^{11/2} = \log \sqrt{x^{11}}$.

**Answer:** $j(x) = \log x^{11/2}$, or equivalently $\log \sqrt{x^{11}}$.

### (B)(ii) Rewrite $k(x) = \dfrac{\sin x \cos x}{1 - \sin^2 x}$ with $\tan x$ once and no other trig.

Pythagorean: $1 - \sin^2 x = \cos^2 x$.

$$k(x) = \dfrac{\sin x \cos x}{\cos^2 x} = \dfrac{\sin x}{\cos x} = \tan x$$

**Answer:** $k(x) = \tan x$.

### (C) $m(x) = 2\sin(3x) - 5$. Find all $x$ in domain where $m(x) = -7$.

$$2 \sin(3x) - 5 = -7 \Rightarrow 2 \sin(3x) = -2 \Rightarrow \sin(3x) = -1$$

$\sin u = -1$ when $u = -\dfrac{\pi}{2} + 2\pi k$ (equivalently $\dfrac{3\pi}{2} + 2\pi k$) for integer $k$.

$$3x = -\dfrac{\pi}{2} + 2\pi k$$

$$x = -\dfrac{\pi}{6} + \dfrac{2\pi k}{3}, \quad k \in \mathbb{Z}$$

**Answer:** $x = -\dfrac{\pi}{6} + \dfrac{2\pi k}{3}$ for any integer $k$.

(Equivalent: $x = \dfrac{\pi}{2} + \dfrac{2\pi k}{3}$ — same set, just reindexed.)

---

## FRQ-Writing Standards Demonstrated

- **Q3(C)(ii) framing:** describing rate of change with reference to slope going toward zero, plus concavity. Don't just say "rate is increasing" — say **why** (slope going from large negative toward 0).
- **Q4(A)(i):** explicit substitution $u = \sin x$ shown. Quadratic formula with discriminant. Reject the extraneous root with reason ($|\sin x| \le 1$). Then back-solve for $x$ with the trig pattern.
- **Q4(B)(i):** every log rule used is named or shown. Final answer in form requested.
- **Q4(C):** general solution form with integer $k$, not just the principal solution.
- **Exact answers throughout** — no calculator, so $\log_2 3$, $\pi/6$, etc. stay symbolic.
