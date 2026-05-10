# Solutions — Math Medic Section II, Part A (2 FRQ, Calculator Required)

15 minutes per question. Show all work. State variables and units. Use limit notation where appropriate. Round to 3 decimal places at the end.

---

## Q1 — Function table $f$ and rational function $g$

Let $f$ be increasing for $x > 0$. Table:

| $x$ | 2 | 4 | 8 | 16 | 32 |
|---|---|---|---|---|---|
| $f(x)$ | 1 | 2 | 3 | 4 | 5 |

$g(x) = \dfrac{x^2 - x - 12}{x^2 - 9}$.

### (A)(i) Find $h(8/3)$ where $h(x) = f(g(x))$, or indicate undefined.

**Step 1.** Compute $g(8/3)$.
$$g(8/3) = \frac{(8/3)^2 - 8/3 - 12}{(8/3)^2 - 9} = \frac{64/9 - 8/3 - 12}{64/9 - 9} = \frac{64/9 - 24/9 - 108/9}{64/9 - 81/9} = \frac{-68/9}{-17/9} = \frac{68}{17} = 4$$

**Step 2.** Compute $f(g(8/3)) = f(4) = 2$ (from table).

**Answer:** $h(8/3) = 2$.

(Faster: factor $g(x) = \frac{(x-4)(x+3)}{(x-3)(x+3)} = \frac{x-4}{x-3}$ for $x \neq -3$. Then $g(8/3) = \frac{8/3-4}{8/3-3} = \frac{-4/3}{-1/3} = 4$.)

### (A)(ii) Find $f^{-1}(4)$, or indicate undefined.

$f^{-1}(4)$ is the $x$ where $f(x) = 4$. From table: $f(16) = 4$, so $f^{-1}(4) = 16$.

**Answer:** $f^{-1}(4) = 16$.

### (B)(i) Vertical asymptotes of $g$.

$g(x) = \frac{(x-4)(x+3)}{(x-3)(x+3)}$. Reduces to $\frac{x-4}{x-3}$ for $x \neq -3$.

Denominator zero at $x = 3$ (no cancellation). VA at $x = 3$.

**Answer:** $x = 3$.

### (B)(ii) Holes of $g$, expressed using limit notation.

Common factor $(x+3)$ cancels — hole at $x = -3$.

$$\lim_{x \to -3} g(x) = \lim_{x \to -3} \frac{x-4}{x-3} = \frac{-3-4}{-3-3} = \frac{-7}{-6} = \frac{7}{6}$$

**Answer:** Hole at $\left(-3, \tfrac{7}{6}\right)$, with $\lim_{x \to -3} g(x) = \tfrac{7}{6}$.

### (C)(i) Best model for $f$.

**Answer:** Logarithmic.

### (C)(ii) Reason.

As the input values $x$ are multiplied by a constant factor of 2 (going $2 \to 4 \to 8 \to 16 \to 32$), the output values increase by a constant amount of 1 (going $1 \to 2 \to 3 \to 4 \to 5$). Equal multiplicative changes in input producing equal additive changes in output is the defining characteristic of a logarithmic function. (Specifically, $f(x) = \log_2 x$.)

---

## Q2 — Spotify subscribers

| Year | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 |
|---|---|---|---|---|---|---|---|---|
| Subscribers (millions) | 28 | 48 | 71 | 96 | 124 | 155 | 180 | 205 |

Quadratic model $f(x) = ax^2 + bx + c$ where $x$ = years after 2015.

### (A)(i) System of equations using 2015, 2018, 2021.

$x = 0, 3, 6$ correspond to 2015, 2018, 2021.

$$\begin{cases} f(0) = c = 28 \\ f(3) = 9a + 3b + c = 96 \\ f(6) = 36a + 6b + c = 180 \end{cases}$$

Equivalently:
$$\begin{cases} c = 28 \\ 9a + 3b = 68 \\ 36a + 6b = 152 \end{cases}$$

### (A)(ii) Solve for $a, b, c$.

From $c = 28$.

From the second equation: $b = \frac{68 - 9a}{3}$.

Substitute into third: $36a + 6 \cdot \frac{68 - 9a}{3} = 152 \Rightarrow 36a + 2(68 - 9a) = 152 \Rightarrow 36a + 136 - 18a = 152 \Rightarrow 18a = 16$.

$$a = \frac{16}{18} = \frac{8}{9} \approx 0.889$$

$$b = \frac{68 - 9 \cdot 8/9}{3} = \frac{68 - 8}{3} = 20$$

$$c = 28$$

**Answer:** $a = 8/9 \approx 0.889$, $b = 20$, $c = 28$.

So $f(x) = \tfrac{8}{9} x^2 + 20 x + 28$.

### (B)(i) Average rate of change 2015 → 2017 (data, not model).

$f$-values from the data: $f(0) = 28$ and at $x = 2$ (year 2017), $f(2) = 71$.

$$\text{ARC} = \frac{71 - 28}{2 - 0} = \frac{43}{2} = 21.5$$

**Answer:** $21.5$ subscribers (in millions) per year.

### (B)(ii) Interpretation.

From 2015 to 2017, the number of Spotify premium subscribers increased by an average of approximately 21.5 million per year.

### (B)(iii) Compare ARCs from 2017 to $p > 3$ years (so 2018 onward) to ARC from 2015–2017.

The model is $f(x) = \tfrac{8}{9} x^2 + 20x + 28$ — a quadratic with positive leading coefficient ($\tfrac{8}{9} > 0$), so the graph is **concave up**.

For a concave-up function, the average rate of change over an interval **increases** as the interval moves to the right.

Therefore the ARCs from 2017 to any $p > 3$ years after 2015 are **greater than** the ARC from 2015 to 2017.

(Verify with data: 2017 → 2022 gives $(205 - 71)/5 = 26.8 > 21.5$. ✓)

### (C) When does $f(x)$ first exceed 250 million?

Solve $\tfrac{8}{9} x^2 + 20x + 28 = 250$:
$$\tfrac{8}{9} x^2 + 20x - 222 = 0$$

Multiply by 9: $8x^2 + 180x - 1998 = 0$.

Divide by 2: $4x^2 + 90x - 999 = 0$.

Quadratic formula: $x = \frac{-90 \pm \sqrt{8100 + 15984}}{8} = \frac{-90 \pm \sqrt{24084}}{8}$.

$\sqrt{24084} \approx 155.190$.

$x = \frac{-90 + 155.190}{8} \approx \frac{65.190}{8} \approx 8.149$.

So $f(x) > 250$ for $x > 8.149$, meaning between $x = 8$ (2023) and $x = 9$ (2024).

Verify: $f(8) = \tfrac{8}{9}(64) + 160 + 28 = 56.889 + 160 + 28 = 244.889 < 250$. $f(9) = \tfrac{8}{9}(81) + 180 + 28 = 72 + 180 + 28 = 280 > 250$.

So the first **integer year** where $f$ exceeds 250 million corresponds to $x = 9$.

**Answer:** Year 2024.

---

## FRQ-Writing Standards Demonstrated

- **(A)(ii) shows the system being set up** before solving — get points for setup even if arithmetic falters.
- **(B)(ii) is a complete sentence with units** — "approximately 21.5 million per year" not just "21.5."
- **(B)(iii) cites the model's structural property** (concave up) to justify the comparison, then verifies with data — both establish the claim.
- **Hole expressed with limit notation** in (B)(ii) of Q1 — that's how the rubric wants it.
- **Reason for model selection** (C)(ii) of Q1 references the **defining structural property**, not "it looks logarithmic" — rubric language matters.
