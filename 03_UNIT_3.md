# Unit 3 — Trigonometric and Polar Functions

**Exam weight: 30–35%.** Trig is the most error-prone unit because it has the most moving parts: definitions, identities, transformations, inverses, polar coordinates. Master it by drilling the unit circle and a small library of identities until they are reflex.

The two big ideas:
1. **Trig functions encode periodic behavior.** Modeling periodic phenomena (tides, daylight, oscillation) is the recurring application.
2. **Polar coordinates are an alternative to Cartesian.** They make rotation-symmetric phenomena natural to describe.

---

## 3.1 Periodic Phenomena

A function is **periodic** with period $P$ if $f(t + P) = f(t)$ for all $t$. The smallest such positive $P$ is the period.

**Vocabulary:**
- **Amplitude:** half the difference between max and min: $A = \frac{\max - \min}{2}$.
- **Midline:** average of max and min: $M = \frac{\max + \min}{2}$. The horizontal line $y = M$ is the equilibrium.
- **Period $P$:** time for one full cycle.
- **Frequency $f = 1/P$:** cycles per unit time.
- **Phase shift:** horizontal translation.

---

## 3.2 Sine, Cosine, and Tangent

**Radians.** A radian is the angle subtended at the center of a circle by an arc whose length equals the radius. Conversion: $180° = \pi$ radians.
$$\text{degrees} \to \text{radians: multiply by } \tfrac{\pi}{180}$$
$$\text{radians} \to \text{degrees: multiply by } \tfrac{180}{\pi}$$

Memorize: $30° = \pi/6$, $45° = \pi/4$, $60° = \pi/3$, $90° = \pi/2$, $180° = \pi$, $270° = 3\pi/2$, $360° = 2\pi$.

**Unit circle definition.** For an angle $\theta$ in standard position (vertex at origin, initial side on positive x-axis), the terminal ray meets the unit circle at point $(\cos\theta, \sin\theta)$.

**Tangent:** $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$.

For a point $(x, y)$ on a circle of radius $r$ at angle $\theta$:
$$\cos\theta = \frac{x}{r}, \quad \sin\theta = \frac{y}{r}, \quad \tan\theta = \frac{y}{x}$$

---

## 3.3 Sine and Cosine Function Values — The Unit Circle

Memorize these exactly:

| $\theta$ | $\cos\theta$ | $\sin\theta$ |
|---|---|---|
| $0$ | $1$ | $0$ |
| $\pi/6$ | $\sqrt{3}/2$ | $1/2$ |
| $\pi/4$ | $\sqrt{2}/2$ | $\sqrt{2}/2$ |
| $\pi/3$ | $1/2$ | $\sqrt{3}/2$ |
| $\pi/2$ | $0$ | $1$ |
| $2\pi/3$ | $-1/2$ | $\sqrt{3}/2$ |
| $3\pi/4$ | $-\sqrt{2}/2$ | $\sqrt{2}/2$ |
| $5\pi/6$ | $-\sqrt{3}/2$ | $1/2$ |
| $\pi$ | $-1$ | $0$ |
| $7\pi/6$ | $-\sqrt{3}/2$ | $-1/2$ |
| $5\pi/4$ | $-\sqrt{2}/2$ | $-\sqrt{2}/2$ |
| $4\pi/3$ | $-1/2$ | $-\sqrt{3}/2$ |
| $3\pi/2$ | $0$ | $-1$ |
| $5\pi/3$ | $1/2$ | $-\sqrt{3}/2$ |
| $7\pi/4$ | $\sqrt{2}/2$ | $-\sqrt{2}/2$ |
| $11\pi/6$ | $\sqrt{3}/2$ | $-1/2$ |

**Quadrant signs:**

| Quadrant | $\sin$ | $\cos$ | $\tan$ |
|---|---|---|---|
| QI | + | + | + |
| QII | + | − | − |
| QIII | − | − | + |
| QIV | − | + | − |

Mnemonic: **A**ll **S**tudents **T**ake **C**alculus (A in QI, S in QII, T in QIII, C in QIV — which trig function is positive there).

**For a point at $(x, y)$ on a circle of radius $r$:**
$$\cos\theta = x/r, \quad \sin\theta = y/r, \quad \tan\theta = y/x$$

If radius isn't 1, you get sin/cos values outside $[-1, 1]$ if you forget to divide by $r$ — common error.

---

## 3.4 & 3.5 Sine, Cosine Graphs, and Sinusoidal Functions

**Parent functions:**
- $\sin\theta$: passes through origin, period $2\pi$, range $[-1, 1]$, midline $y=0$, max at $\theta = \pi/2$, min at $\theta = 3\pi/2$.
- $\cos\theta$: passes through $(0, 1)$, period $2\pi$, range $[-1, 1]$, midline $y=0$, max at $\theta = 0$, min at $\theta = \pi$.

**Cosine = sine shifted left by $\pi/2$:** $\cos\theta = \sin(\theta + \pi/2)$.

**Concavity facts you'll use:**
- Near a max, sin/cos are concave **down**.
- Near a min, sin/cos are concave **up**.
- Inflection at every midline crossing.

---

## 3.6 Sinusoidal Function Transformations

General sinusoidal:
$$f(t) = A \sin(B(t - C)) + D \quad \text{or} \quad A \cos(B(t - C)) + D$$

| Constant | Effect |
|---|---|
| $|A|$ | Amplitude |
| Sign of $A$ | Negative reflects across midline (max ↔ min) |
| $B$ | Period $= 2\pi / |B|$. Larger $|B|$ → faster oscillation |
| $C$ | Phase shift (right by $C$ if $C > 0$) |
| $D$ | Midline / vertical shift |

**Reading off a graph:**
1. Max and min from graph → $A = (\max - \min)/2$ and $D = (\max + \min)/2$.
2. Period $P$ from peak-to-peak → $B = 2\pi / P$.
3. Choose sine or cosine based on where you have a clear reference point. Cosine is simpler if you know where a peak is. Sine is simpler if you know where the midline is being crossed going up.
4. Solve for $C$ from the chosen reference point.

---

## 3.7 Sinusoidal Function Modeling

The recurring exam scenario: a periodic phenomenon (tide, daylight, oscillation, sound, fan blade, pendulum) modeled by $A \sin(B(t-C)) + D$ or $A \cos(B(t-C)) + D$.

**Build the model in this order:**
1. Identify max and min from context. → $A$ and $D$.
2. Identify period. → $B = 2\pi/P$.
3. Pick a reference time (e.g., max at $t = 9$). Choose sine or cosine accordingly.
4. Solve for $C$.

**Worked example (tides).** Period 14 hr. High tide 5.83 ft at $t = 9$. Low tide 0.52 ft at $t = 16$. Find height at $t = 20$.

$A = (5.83 - 0.52)/2 = 2.655$. $D = (5.83 + 0.52)/2 = 3.175$. $B = 2\pi/14 = \pi/7$.

Max at $t = 9$ → use cosine peaked there:
$$h(t) = 2.655 \cos\left(\dfrac{\pi}{7}(t - 9)\right) + 3.175$$

At $t = 20$: $h(20) = 2.655 \cos\left(\tfrac{11\pi}{7}\right) + 3.175$.

$\cos(11\pi/7) \approx 0.2225$, so $h(20) \approx 2.655(0.2225) + 3.175 \approx 3.766$ ft.

**Worked example (fan blade).** 5 rotations/sec → period $0.2$ sec. Point B is 6 inches from center. Center 20 inches above table. At $t=0$, B is at top → max distance.

$\max = 26$, $\min = 14$, $A = 6$, $D = 20$, $B = 2\pi/0.2 = 10\pi$. Use $h(t) = a \sin(b(t + c)) + d$ with sine peaking at $t = 0$: $bc = \pi/2$, so $c = \pi/(2 \cdot 10\pi) = 1/20$.

So $a = 6$, $b = 10\pi$, $c = 1/20$, $d = 20$.

**Worked example (theme park).** Highest 120 ft, lowest 20 ft, returns to highest every 8 sec. At $t = 0$, X is at highest.

Amp $= 50$, midline $= 70$, period $= 8$, $B = \pi/4$. Cosine peaked at $t=0$:
$$H(t) = 50 \cos\left(\dfrac{\pi}{4} t\right) + 70$$

**Worked example (metronome — pendulum).** "40 BPM at top" with 1 beat = pendulum swinging from one extreme to the other (i.e., **half** a full oscillation). At $t=0$, pendulum is furthest left ($d = -4$ inches).

40 beats/min → 1 beat per 1.5 sec → 1 full period (2 beats) = 3 sec. Amp = 4. Midline = 0.

At $t=0$, $h = -4$ (minimum) → use $h(t) = -4 \cos\left(\dfrac{2\pi}{3} t\right)$ (negative cosine starts at minimum). Equivalently, $a = -4$, $b = 2\pi/3$, $c = 0$, $d = 0$.

Quarter-period $= 0.75$ sec. Five labeled points on graph at successive midline / extrema:
- $F = (0.75, 0)$ — midline rising.
- $G = (1.5, 4)$ — first max.
- $J = (2.25, 0)$ — midline falling.
- $K = (3, -4)$ — second min.
- $P = (3.75, 0)$ — midline rising again.

On $(t_J, t_K) = (2.25, 3)$: $h$ goes from $0$ to $-4$, so $h$ is **negative and decreasing**. Rate of change: starts at maximum-magnitude negative slope (at midline), slope approaches 0 at the minimum. Slope (a number) is **increasing** (going from very negative toward 0). Equivalently, the curve is concave up on this interval.

**Worked example (daylight).** $D(t) = 160 \cos\left(\tfrac{2\pi}{365}(t - 172)\right) + 729$. Behavior on day 150?

Argument is 0 at $t = 172$ — that's the max. Day 150 is **before** the max ($t < 172$). Going from 150 toward 172, the cosine increases from $\cos(\tfrac{-44\pi}{365})$ toward $\cos 0 = 1$. So $D$ is increasing. Concavity near a cosine max is concave down. **Increasing at a decreasing rate.**

---

## 3.8 The Tangent Function

$f(\theta) = \tan\theta = \dfrac{\sin\theta}{\cos\theta}$.

**Properties:**
- Domain: all reals **except** $\theta = \pi/2 + k\pi$.
- Range: all reals.
- **Period: $\pi$** (not $2\pi$).
- Vertical asymptotes at $\theta = \pi/2 + k\pi$.
- Zeros at $\theta = k\pi$.
- Always increasing on each interval between consecutive vertical asymptotes.

**Concavity of tangent.** $\tan'' = 2 \sec^2\theta \cdot \tan\theta$. So concavity matches the sign of $\tan\theta$:
- Where $\tan\theta < 0$: concave **down**.
- Where $\tan\theta > 0$: concave **up**.

So between an asymptote (left) and the next zero (where $\tan$ has just been negative): concave down. Between a zero and the next asymptote (where $\tan$ becomes positive): concave up.

**Worked example.** $f(\theta) = \tan(\theta/2)$ on $7\pi < \theta < 8\pi$.

Let $u = \theta/2 \in (7\pi/2, 4\pi)$. Tangent has period $\pi$, so this interval mirrors $(\pi/2, \pi)$ behavior. There, $\tan u$ comes from $-\infty$ (just past asymptote at $\pi/2$) up to $0$ at $u = \pi$. Increasing throughout, $\tan u$ negative → concave **down**.

So $f$ is **increasing and concave down** on $(7\pi, 8\pi)$.

---

## 3.9 Inverse Trigonometric Functions

Trig functions aren't one-to-one on their full domain, so we restrict.

| Function | Domain | Range |
|---|---|---|
| $\arcsin x$ | $[-1, 1]$ | $[-\pi/2, \pi/2]$ |
| $\arccos x$ | $[-1, 1]$ | $[0, \pi]$ |
| $\arctan x$ | All reals | $(-\pi/2, \pi/2)$ |

**Why these specific ranges?** Each is the largest interval where the corresponding trig function is monotonic and attains all its values exactly once.

**Critical:** $\arcsin(\sin x)$ is **not** always $x$. Only when $x \in [-\pi/2, \pi/2]$. Similarly for others. Outside that range, use a reference angle to compute.

**Restricted domain reasoning.** For a function with period $2\pi$, an interval of length $\pi$ (half-period) on which the function is monotonic gives invertibility. For $g(x) = \sin x - \cos x = \sqrt{2} \sin(x - \pi/4)$: monotonic increasing on $[-\pi/4, 3\pi/4]$ (length $\pi$). All values occur exactly once.

---

## 3.10 Trigonometric Equations and Inequalities

**General strategy for $\sin x = c$:**
1. Principal solution: $x_0 = \arcsin c \in [-\pi/2, \pi/2]$.
2. Use sine symmetry $\sin(\pi - x_0) = \sin x_0$. Second base solution: $\pi - x_0$.
3. All solutions: $x = x_0 + 2\pi k$ and $x = (\pi - x_0) + 2\pi k$.

**For $\cos x = c$:**
1. $x_0 = \arccos c \in [0, \pi]$.
2. Cosine even: $\cos(-x_0) = \cos x_0$. Solutions: $\pm x_0 + 2\pi k$.

**For $\tan x = c$:**
1. $x_0 = \arctan c$.
2. Period $\pi$: solutions $x = x_0 + \pi k$.

**Worked example.** $f(x) = -8 \sin x + 1 = 5$.
$-8 \sin x = 4 \Rightarrow \sin x = -1/2$.

Reference angle $\pi/6$. Sine negative in QIII and QIV.
- QIII: $x = \pi + \pi/6 = 7\pi/6$.
- QIV: $x = 2\pi - \pi/6 = 11\pi/6$.

All solutions: $x = 7\pi/6 + 2\pi k$ and $x = 11\pi/6 + 2\pi k$.

**Worked example.** $1 + 3 \sec x = -5$ on $[0, 2\pi)$.
$\sec x = -2 \Rightarrow \cos x = -1/2$. In $[0, 2\pi)$: $x = 2\pi/3$ and $x = 4\pi/3$.

**Worked example.** $m(x) = 2 \sin(3x) - 5 = -7$.
$\sin(3x) = -1 \Rightarrow 3x = -\pi/2 + 2\pi k \Rightarrow x = -\pi/6 + (2\pi/3) k$.

**Worked example.** $\cos(2x) + 4 = 9/2 \Rightarrow \cos(2x) = 1/2$.
$2x = \pm \pi/3 + 2\pi k \Rightarrow x = \pm \pi/6 + \pi k$.

**Inequalities.** Find boundary values, then test which intervals satisfy.

**Worked example.** Find $\theta \in [-\pi, \pi]$ with $2 \cos\theta > -1$ AND $2 \sin\theta > \sqrt{3}$.

$\cos\theta > -1/2$: $\theta \in (-2\pi/3, 2\pi/3)$.

$\sin\theta > \sqrt{3}/2$: $\theta \in (\pi/3, 2\pi/3)$.

Intersection: $(\pi/3, 2\pi/3)$.

---

## 3.11 The Secant, Cosecant, and Cotangent Functions

Reciprocals of cosine, sine, tangent:
$$\sec\theta = \frac{1}{\cos\theta}, \quad \csc\theta = \frac{1}{\sin\theta}, \quad \cot\theta = \frac{\cos\theta}{\sin\theta} = \frac{1}{\tan\theta}$$

**Domains:**
- $\sec$: undefined at $\theta = \pi/2 + k\pi$ (cos zeros).
- $\csc, \cot$: undefined at $\theta = k\pi$ (sin zeros).

**Ranges:**
- $\sec, \csc$: $(-\infty, -1] \cup [1, \infty)$.
- $\cot$: all reals.

**Periods:** $\sec, \csc$ are $2\pi$. $\cot$ is $\pi$.

**Visualizing:** $\sec$ has vertical asymptotes wherever $\cos = 0$ — exactly the x-coordinates where cosine has zeros. So a true/false useful fact: "the x-intercepts of cosine are the x-coordinates of vertical asymptotes of secant." That is the single most-tested relationship in this subtopic.

---

## 3.12 Equivalent Representations of Trigonometric Functions

**Pythagorean identities** (from $x^2 + y^2 = 1$):
$$\sin^2\theta + \cos^2\theta = 1$$
$$1 + \tan^2\theta = \sec^2\theta$$
$$1 + \cot^2\theta = \csc^2\theta$$

**Sum and difference identities:**
$$\sin(\alpha \pm \beta) = \sin\alpha \cos\beta \pm \cos\alpha \sin\beta$$
$$\cos(\alpha \pm \beta) = \cos\alpha \cos\beta \mp \sin\alpha \sin\beta$$
$$\tan(\alpha \pm \beta) = \frac{\tan\alpha \pm \tan\beta}{1 \mp \tan\alpha \tan\beta}$$

Sign rule: $\sin$ keeps the sign in the formula; $\cos$ flips the sign.

**Double-angle identities** (set $\alpha = \beta$):
$$\sin(2\theta) = 2 \sin\theta \cos\theta$$
$$\cos(2\theta) = \cos^2\theta - \sin^2\theta = 1 - 2\sin^2\theta = 2\cos^2\theta - 1$$
$$\tan(2\theta) = \frac{2\tan\theta}{1 - \tan^2\theta}$$

**Cofunction identities:**
$$\sin(\pi/2 - \theta) = \cos\theta, \quad \cos(\pi/2 - \theta) = \sin\theta$$

**Even/odd reflections (high-frequency on the exam):**
$$\cos(-\theta) = \cos\theta, \quad \sin(-\theta) = -\sin\theta$$
$$\cos(2\pi - \theta) = \cos\theta, \quad \sin(2\pi - \theta) = -\sin\theta$$

**Worked example (Pythagorean simplification).** $\sec\theta \csc\theta - \cot\theta$.
$$= \frac{1}{\cos\theta \sin\theta} - \frac{\cos\theta}{\sin\theta} = \frac{1 - \cos^2\theta}{\sin\theta \cos\theta} = \frac{\sin^2\theta}{\sin\theta \cos\theta} = \tan\theta$$

**Worked example (rewrite to one tan).** $k(x) = \dfrac{\sin x \cos x}{1 - \sin^2 x}$.
$$= \frac{\sin x \cos x}{\cos^2 x} = \frac{\sin x}{\cos x} = \tan x$$

**Worked example (rewrite to one cos).** $h(x) = \dfrac{\sin^2 x - 1}{\cos x}$.

Note $\sin^2 x - 1 = -(1 - \sin^2 x) = -\cos^2 x$.
$$h(x) = \frac{-\cos^2 x}{\cos x} = -\cos x$$

**Worked example (sum identity).** Two angles $\theta$ and $\beta$ in standard position. Terminal of $\theta$ through $W = (c, d)$ on the unit circle, of $\beta$ through $P = (a, b)$. Express $\sin(\theta + \beta)$.

On the unit circle: $a = \cos\beta$, $b = \sin\beta$, $c = \cos\theta$, $d = \sin\theta$. Then:
$$\sin(\theta + \beta) = \sin\theta\cos\beta + \cos\theta\sin\beta = d \cdot a + c \cdot b$$

**Worked example (cosine reflection).** Angle $\theta$ with terminal ray through $A = (-1.9, -0.64)$ on circle of radius 2. Find $\cos(2\pi - \theta)$.
$\cos(2\pi - \theta) = \cos\theta = x/r = -1.9 / 2 = -0.95$.

---

## 3.13 Trigonometry and Polar Coordinates

A point in the **polar** coordinate system is given by $(r, \theta)$:
- $r$: distance from origin (the **pole**) — can be positive, zero, or negative.
- $\theta$: angle from positive x-axis (the **polar axis**) to the ray pointing to the point.

**Polar to Cartesian:**
$$x = r \cos\theta, \quad y = r \sin\theta$$

**Cartesian to polar:**
$$r = \sqrt{x^2 + y^2}, \quad \theta = \arctan(y/x) \text{ (with quadrant adjustment)}$$

For $\arctan$, you must adjust based on which quadrant $(x, y)$ is in:
- $(x, y)$ in QI: $\theta = \arctan(y/x)$.
- $(x, y)$ in QII: $\theta = \pi + \arctan(y/x)$ (or $\pi - \arctan(|y|/|x|)$).
- $(x, y)$ in QIII: $\theta = \pi + \arctan(y/x)$.
- $(x, y)$ in QIV: $\theta = 2\pi + \arctan(y/x)$ (or $\arctan(y/x)$ since $\arctan$ returns negative).

**Negative $r$ convention.** A point $(r, \theta)$ with $r < 0$ is the same as $(|r|, \theta + \pi)$ — i.e., go in the opposite direction.

**Complex numbers in polar form.** Complex $a + bi$ has:
$$r = \sqrt{a^2 + b^2}, \quad \theta = \arg(a + bi)$$

So $a + bi = r(\cos\theta + i \sin\theta)$.

**Worked example.** Convert $-3 + 5i$ to polar form.
$r = \sqrt{9 + 25} = \sqrt{34} \approx 5.831$.
$-3 + 5i$ is in QII (negative real, positive imaginary). $\theta = \pi - \arctan(5/3) \approx \pi - 1.0304 \approx 2.111$.

So $-3 + 5i \approx 5.831 \cos(2.111) + i \cdot 5.831 \sin(2.111)$.

---

## 3.14 Polar Function Graphs

A polar function $r = f(\theta)$ assigns a radius to each angle.

**Common polar curves:**

| Equation | Graph |
|---|---|
| $r = a$ | Circle of radius $|a|$ centered at origin |
| $r = a \cos\theta$ | Circle of diameter $|a|$ tangent to y-axis |
| $r = a \sin\theta$ | Circle of diameter $|a|$ tangent to x-axis |
| $r = a + b \cos\theta$ or $a + b \sin\theta$ | Limaçon |
| $r = a \cos(n\theta)$ or $a \sin(n\theta)$ | Rose curve ($n$ petals if $n$ odd, $2n$ petals if $n$ even) |

**Limaçon classification** based on $|a|/|b|$:
- $|a|/|b| < 1$: **inner loop** limaçon.
- $|a|/|b| = 1$: **cardioid** (heart shape).
- $1 < |a|/|b| < 2$: **dimpled** limaçon.
- $|a|/|b| \ge 2$: **convex** limaçon (no dimple).

**Worked example.** Graph $r = 3\cos\theta + 2$ on $[0, 2\pi]$.

$|a|/|b| = 2/3 < 1$ → inner loop limaçon.

Spot-check values:
- $\theta = 0$: $r = 5$ → point $(5, 0)$.
- $\theta = \pi/2$: $r = 2$ → point $(0, 2)$.
- $\theta = \pi$: $r = -1$ → point at $\theta = 0$ direction with $r = 1$, so $(1, 0)$. The inner loop passes through $(1, 0)$.
- $\theta = 3\pi/2$: $r = 2$ → $(0, -2)$.
- $\theta = 2\pi$: $r = 5$ → back to $(5, 0)$.

**Worked example.** $r = -1 + \sin\theta$ on $0 < \theta < \pi/2$.

$\theta = 0$: $r = -1$. As $\theta$ increases, $\sin\theta$ increases from 0 to 1, so $r$ increases from $-1$ to $0$. $r$ stays **negative** throughout this interval.

Negative $r$ for $\theta$ in QI means the actual point is in QIII (opposite quadrant). Below the polar axis. As $|r|$ decreases from 1 to 0, points get **closer** to the origin.

---

## 3.15 Rates of Change in Polar Functions

**Distance from origin** $= |r|$. Watch this carefully — when $r$ is negative, "distance increases" means $|r|$ increases (which can happen as $r$ becomes **more negative**).

**Average rate of change** of $r$ on $[\theta_1, \theta_2]$:
$$\text{ARC} = \frac{r(\theta_2) - r(\theta_1)}{\theta_2 - \theta_1}$$

This describes how fast $r$ changes as $\theta$ rotates.

**Local extrema in polar.** Since $r$ is a function of $\theta$, local extrema of $r$ correspond to angles where $r$ has a relative max or min. These translate into points farthest/closest to the origin on portions of the curve.

**Reading position from $r$ and $\theta$:**

| $r$ sign | $\theta$ in | Actual point in |
|---|---|---|
| + | QI | QI (above x-axis) |
| + | QII | QII (above x-axis) |
| + | QIII | QIII (below x-axis) |
| + | QIV | QIV (below x-axis) |
| − | QI | QIII (below x-axis) |
| − | QII | QIV (below x-axis) |
| − | QIII | QI (above x-axis) |
| − | QIV | QII (above x-axis) |

**Worked example.** $r = f(\theta) = -3\cos(2\theta)$ on $\pi/4 < \theta < \pi/2$.
- At $\theta = \pi/4$: $2\theta = \pi/2$, $r = 0$.
- At $\theta = \pi/2$: $2\theta = \pi$, $r = -3(-1) = 3$.
- $r$ goes from 0 to 3 — **positive** and increasing (in this range).
- $\theta$ in QI, $r > 0$ → point in QI (above x-axis).
- Distance from origin = $|r|$, going from 0 to 3 — getting **farther** from origin.

Answer: above polar axis, getting farther from origin.

**Worked example.** $r(\theta) = 2 \sin\theta \cos\theta = \sin(2\theta)$ on $7\pi/12 \le \theta \le 3\pi/4$.

$2\theta \in [7\pi/6, 3\pi/2]$. $\sin(7\pi/6) = -1/2$, $\sin(3\pi/2) = -1$. $\sin$ is decreasing here.

So $r$ decreases from $-1/2$ to $-1$. Distance $|r|$ increases from $1/2$ to $1$.

Rate of increase of $|r|$: derivative of $|r| = -r$ (since $r < 0$) is $-r'(\theta) = -2\cos(2\theta)$. At $2\theta = 7\pi/6$: $\cos = -\sqrt{3}/2$, derivative $= -2 \cdot (-\sqrt{3}/2) = \sqrt{3}$. At $2\theta = 3\pi/2$: $\cos = 0$, derivative $= 0$.

So the rate of increase goes from $\sqrt{3}$ down to $0$ — **decreasing rate**. The distance is increasing at a **decreasing** rate.

**Worked example (relative max in polar).** $r = f(\theta) = 4 - 7\sin\theta$. At which $(r, \theta)$ does $f$ have a relative max?

$f$ is max when $\sin\theta$ is most negative — at $\theta = 3\pi/2$, $\sin = -1$. Then $r = 4 - 7(-1) = 11$.

So $(r, \theta) = (11, 3\pi/2)$.

---

## Unit 3 Mastery Checklist

- [ ] Convert fluently between degrees and radians.
- [ ] State sin, cos, tan exactly for all multiples of $\pi/6$ and $\pi/4$ (the unit circle, cold).
- [ ] Apply quadrant signs (ASTC).
- [ ] Find sin/cos of an angle whose terminal ray passes through a given $(x, y)$ on a circle of given radius.
- [ ] Read amplitude, period, midline, phase shift from a sinusoidal graph.
- [ ] Build a sinusoidal model from contextual data (max, min, period, reference time).
- [ ] State period of $\tan$ ($\pi$) and identify its asymptotes/zeros.
- [ ] Determine concavity of $\tan$ from sign of $\tan$.
- [ ] State domain/range of $\arcsin$, $\arccos$, $\arctan$.
- [ ] Solve $\sin x = c$, $\cos x = c$, $\tan x = c$ giving general solutions.
- [ ] Solve trig inequalities by finding boundaries and testing intervals.
- [ ] Apply Pythagorean, sum/difference, double-angle identities to simplify expressions.
- [ ] Recognize $\sin^2 x = 1 - \cos^2 x$ and use it for substitution into log/exp/algebraic equations.
- [ ] Convert between polar and rectangular coordinates.
- [ ] Express complex numbers in polar form.
- [ ] Identify limaçon types and rose curves from $r = a + b \cos(n\theta)$ etc.
- [ ] Determine "above/below polar axis" and "closer/farther from origin" from sign and behavior of $r$.
- [ ] Compute ARC of a polar function over an interval.
- [ ] Identify where a polar function has relative max/min.

→ Continue to `04_FORMULA_SHEET.md` for the consolidated reference, then to the solutions files.
