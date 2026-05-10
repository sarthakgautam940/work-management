# AP Precalculus — Course Build Plan

This plan is the contract for what gets built. Read it, push back where it's wrong, and once you greenlight it I build to it without asking again.

It's derived from the 10 source files in this folder:
- 3 unit guides covering 44 sections of curriculum
- 1 formula sheet (88 reference items)
- 5 solution files covering 68 worked exam problems

---

## 0. Design principles

These are non-negotiable. They drive every UI and content choice below.

1. **No paragraph dumps.** A "lesson" is never one screen of prose. It's a sequence of ~10 atomic clicks. One click = one idea.
2. **The artifact is the lesson.** Most lessons have a single visual artifact (graph, table, unit circle, equation ladder) that lives on screen for the whole lesson. Beats narrate over it. The artifact only changes when the math changes.
3. **Show, then say, then ask.** Each beat in order: animate / highlight the math → narrate one sentence → (every 3-5 beats) ask one question that proves the student followed.
4. **Active recall over passive reading.** Every section ends with a checkpoint MCQ. Wrong answers trigger a reteach beat sequence, not a "try again" loop.
5. **Spaced repetition is built in.** Concepts surface again as recall beats inside later lessons, not just in a separate review tab.
6. **Modern, clean, professional.** Body text in a serif or warm sans, generous whitespace, single accent color, real type hierarchy. No mono-uppercase eyebrows, no terminal-green dots, no `[02]` numeric chips, no "saas terminal" aesthetic anywhere.
7. **Every problem in the source files is reachable as practice.** All 68 worked exam problems live in a practice bank tagged by topic, section, and difficulty.
8. **Every formula in the source files is a flashcard.** All 88 formula-sheet items appear as recall cards with self-rated mastery.

---

## 1. Architecture

### 1.1 The hierarchy

```
Course
└── Unit (3 of them — Polynomial/Rational, Exp/Log, Trig/Polar)
    └── Topic (~7-8 per unit — a coherent skill cluster)
        └── Lesson (3-6 per topic — one focused concept)
            └── Beat (8-15 per lesson — one click each)
```

A **Topic** is what shows on the dashboard as a row. A **Lesson** is what you click into and complete in 4-8 minutes. A **Beat** is the atomic unit of learning — one click, one moment.

### 1.2 Beat types

Every beat has: `narration` (1 sentence, max 2), optional `focus` (which part of the artifact to highlight), optional `animation` (transform on artifact), optional `interaction` (what user must do before advancing).

| Beat type | What it does on click |
|---|---|
| `intro` | Names the lesson, sets the stake. Shows the artifact in initial state. |
| `narrate` | Plain narration over current artifact. May focus a sub-element. |
| `highlight` | Dims everything except one element of the artifact. Narration explains that element. |
| `transform` | Animates a parameter on the artifact (shift, stretch, reflect, sweep). Narration explains the change. |
| `derive` | Algebra ladder reveals one more line. Used for proofs and worked examples. |
| `predict` | "Before you click — what happens if…?" User picks from 2-3 outcomes. Animation reveals the answer. Wrong answers get a one-beat reteach inline. |
| `try-it` | User changes one input on the artifact (drag a slider, edit a number) and observes. Narration confirms. |
| `compare` | Two artifacts side by side. Narration crosses between them. |
| `formula-card` | A single formula or identity, stated cleanly. Two-sided flip card with derivation on the back. |
| `recall` | A spaced-repetition card from earlier in the unit. User self-rates. |
| `checkpoint` | Single MCQ. On correct: explanation + advance. On wrong: triggers a reteach mini-sequence (2-4 beats), then a follow-up question. Must clear follow-up to advance. |
| `summary` | End-of-lesson recap. The 2-3 things the student should be able to do now. Cards added to spaced-rep deck. |

### 1.3 Artifacts (the visual instruments lessons play on)

Each artifact is a single React component, parametrized by state. Beats mutate the state, the artifact animates.

| Artifact | Used for |
|---|---|
| `CoordinatePlane` | Polynomial, rational, exponential, log, trig graphs. Supports plotting any function, animating shifts/stretches/reflections, highlighting features (zeros, asymptotes, intercepts, intervals). |
| `UnitCircle` | Angle sweep, sin/cos projections to axes, exact-value chips, ASTC quadrant signs. |
| `PolarPlane` | Polar curves with θ sweep, ray drawing, point-on-curve indicator, sign-of-r coloring. |
| `FunctionTable` | Rows highlight in sync with narration. First/second differences computed live in adjacent columns. |
| `AlgebraLadder` | Multi-line derivation. Each line can be revealed, focused, dimmed, or highlighted. Used for solving equations, simplifying identities, polynomial division. |
| `Triangle` | Right triangles for trig definitions. Sides + angles glow individually. Labels animate. |
| `NumberLine` | Sign analysis for rational functions. Zeros, holes, VAs marked. Intervals shade red/green. |
| `SequenceList` | Arithmetic / geometric sequence terms reveal one at a time. Differences or ratios compute live. |
| `SinusoidalBuilder` | Special composite of `CoordinatePlane` + four labeled sliders for A, B, C, D. Used in modeling lessons. |
| `Comparison` | Wrapper that places two of any artifact above + side-by-side. Synced narration. |

Every artifact obeys the same beat protocol: receives `state` and `focus`, animates between states with framer-motion at 400ms, dims non-focused elements to 25% opacity.

### 1.4 Course shell — the UI redo

What goes away (the "saas terminal" look in current macro):
- Mono-uppercase eyebrows (`AP MACRO • CRASH COURSE`)
- Letter-spaced 0.18em tracking on every label
- Terminal-green and amber accent dots
- `[02]`-style padded numeric chips
- Tag pills with all-caps lowercase ("must" / "high")
- Black-on-near-black surfaces with hairline borders

What goes in:
- Body text in a comfortable sans (Inter at 16/24 default, 17/26 in lessons). Display in a serif if it reads well (testing Charter or PT Serif), else heavier Inter.
- Single accent color: a calm indigo-blue. Reserved for primary actions and progress.
- Generous whitespace. Cards have 24px padding and 16px gaps, not 12/8.
- Real type hierarchy. H1 32, H2 24, H3 18, body 16, caption 13. No size jumping by 2 increments.
- Numbers in tables and formulas use tabular-nums but in the same Inter weight, not a separate mono font.
- Progress bars are slim (3px), neutral track, accent fill, with a small percentage label.
- One color per state: lime for done, neutral for pending, amber for "needs review." That's it.
- Cards have soft shadow + 1px hairline, not pure border-on-black.
- Light-mode and dark-mode both look first-class. Default is dark, light toggleable.

### 1.5 Routes

| Route | Purpose |
|---|---|
| `/learn` | New top-level shell. Replaces `/ap/crash`. Lists active courses (just Precalc for now). |
| `/learn/precalc` | Precalc dashboard. Diagnostic CTA, units, progress, exam date. |
| `/learn/precalc/diagnostic` | 12-question diagnostic. Output = topic-level red/amber/green map. |
| `/learn/precalc/u/[unitId]` | Unit page. Shows topics in unit. |
| `/learn/precalc/t/[topicId]` | Topic page. Shows lessons. (Optional — could collapse into unit page.) |
| `/learn/precalc/lesson/[lessonId]` | Lesson player. The walkthrough. |
| `/learn/precalc/practice` | Practice bank. All 68 problems, filterable. |
| `/learn/precalc/practice/[problemId]` | Single-problem deep-dive (the worked solution). |
| `/learn/precalc/exam` | Mock exam mode. Timed sections, scored. |
| `/learn/precalc/review` | Spaced-rep deck. All formulas + flagged misses. |
| `/learn/precalc/formulas` | Formula sheet, browsable + as flashcards. |

The current `/ap` and `/ap/crash` paths get killed. Sidebar entry "AP Crash" becomes "AP Precalc" pointing at `/learn/precalc`.

### 1.6 Persistence

Bumps the Zustand store to v5. Keys:

```
learnProgress: {
  [courseId]: {
    beatsDone: { [lessonId.beatIdx]: true }
    lessonsComplete: { [lessonId]: ISO_DATE }
    diagnosticResults: { [topicId]: { correct, total } }
    practiceAttempts: { [problemId]: { tries: [...], correct: bool } }
    flagged: { [itemId]: true }  // formulas, problems, lesson beats
    spacedRepDue: { [cardId]: ISO_DATE }
  }
}
```

Macro keys removed cleanly. Migration drops them, no fallback.

---

## 2. Unit-by-unit content plan

For each topic I list: lessons, lesson titles, the artifact each uses, beat count, and the solution problems each topic teaches toward. Beat counts are estimates — the actual scripts will be in code.

### 2.1 Unit 1 — Polynomial & Rational Functions (target: 30-40% of exam)

**Topic 1.1 — Rate of Change**
- L1: Average Rate of Change (CoordinatePlane: secant line drawing) — 9 beats
- L2: Increasing/Decreasing × Concavity — the four phrases (CoordinatePlane: two curves, behavior labels) — 11 beats
- L3: Reading behavior from a graph (CoordinatePlane: drill, 5 sub-graphs) — 8 beats
- *Teaches toward:* S1A-Q4, S1A-Q21, CB-Q2, CB-Q22

**Topic 1.2 — Linear, Quadratic, Polynomial Differences**
- L1: Linear ARC is constant (FunctionTable + CoordinatePlane) — 7 beats
- L2: Quadratic = constant 2nd differences (FunctionTable, differences computed live) — 10 beats
- L3: Polynomial degree from $\Delta^n$ (FunctionTable drill) — 8 beats
- *Teaches toward:* S1A-Q1, S1A-Q11, CB-FRQ1-C, CB-FRQ1-Cii

**Topic 1.3 — Polynomial Structure**
- L1: Degree, leading coefficient, constant term (CoordinatePlane: parametrize a polynomial) — 6 beats
- L2: End behavior — the 4 cases, drilled (CoordinatePlane: animate $a_n$ flip and $n$ parity flip) — 12 beats
- L3: Real and complex zeros, conjugate pairs (AlgebraLadder + CoordinatePlane) — 10 beats
- L4: Multiplicity at a zero — cross / touch / flat-cross (CoordinatePlane: zoom-in animation) — 9 beats
- L5: Even/odd functions (CoordinatePlane: reflect across axes) — 7 beats
- *Teaches toward:* S1A-Q2, S1A-Q15, S1A-Q17, S1A-Q21, CB-Q1, CB-Q4, CB-Q6

**Topic 1.4 — Rational Functions: Asymptotes**
- L1: Horizontal asymptote — three degree-comparison cases (CoordinatePlane: zoom out animations) — 11 beats
- L2: Vertical asymptotes (CoordinatePlane + AlgebraLadder factoring) — 9 beats
- L3: Slant asymptotes via polynomial division (AlgebraLadder + CoordinatePlane) — 10 beats
- *Teaches toward:* S1A-Q26, CB-FRQ1-Bii

**Topic 1.5 — Holes, Zeros, Sign Analysis**
- L1: Holes vs zeros vs VAs — the disambiguation drill (NumberLine + AlgebraLadder) — 11 beats
- L2: Hole y-coordinate via limit notation (AlgebraLadder + CoordinatePlane) — 8 beats
- L3: Sign analysis on a number line (NumberLine: shade intervals) — 9 beats
- L4: Domain of $h/g$ (NumberLine drill) — 6 beats
- *Teaches toward:* S1A-Q3, S2A-FRQ1-B, CB-Q3, CB-Q5

**Topic 1.6 — Equivalent Representations**
- L1: Standard ↔ factored ↔ vertex form (AlgebraLadder showing all three for a quadratic) — 9 beats
- L2: Polynomial long division (AlgebraLadder, line-by-line) — 11 beats
- L3: Synthetic division (AlgebraLadder showing the table form) — 8 beats
- L4: Remainder theorem + factor theorem (AlgebraLadder + CoordinatePlane) — 7 beats
- *Teaches toward:* general infrastructure for polynomial work

**Topic 1.7 — Transformations**
- L1: Vertical shifts and dilations ($k$ and $a$) (CoordinatePlane: drag a slider, watch graph move) — 9 beats
- L2: Horizontal shifts and dilations ($h$ and $b$) — including the "feels backwards" trap (CoordinatePlane + try-it sliders) — 12 beats
- L3: Reflections (sign of $a$ and sign of $b$) (CoordinatePlane: animate sign flips) — 8 beats
- L4: Range under transformations (FunctionTable + CoordinatePlane) — 7 beats
- L5: Order of operations on transformations (AlgebraLadder + CoordinatePlane) — 9 beats
- *Teaches toward:* S1A-Q10, S1A-Q22, CB-Q7

**Topic 1.8 — Modeling**
- L1: Function model selection from data (FunctionTable + decision-tree highlight) — 10 beats
- L2: Residual plots (Comparison: scatter vs patterned residuals) — 8 beats
- L3: Building quadratic from 3 points (AlgebraLadder solving the 3x3) — 11 beats
- L4: Direct and inverse proportion (CoordinatePlane + AlgebraLadder) — 7 beats
- *Teaches toward:* S1A-Q1, S1A-Q16, S1B-Q2, S1B-Q5, S2A-FRQ2, CB-Q11, CB-Q21, CB-FRQ1-C

**Unit 1 totals:** 8 topics, 32 lessons, ~290 beats.

---

### 2.2 Unit 2 — Exponential & Logarithmic Functions (target: 27-40%)

**Topic 2.1 — Sequences**
- L1: Arithmetic sequences (SequenceList with first-differences live) — 8 beats
- L2: Geometric sequences (SequenceList with ratios live) — 8 beats
- L3: Recursive vs explicit form (AlgebraLadder + SequenceList) — 8 beats
- L4: Sequences ↔ functions: arithmetic ↔ linear, geometric ↔ exponential (Comparison) — 9 beats
- *Teaches toward:* S1B-Q2, CB-Q9

**Topic 2.2 — Exponential Functions**
- L1: Form $a b^x$, growth vs decay (CoordinatePlane: animate $b$ above/below 1) — 10 beats
- L2: Properties — domain, range, asymptote, y-intercept (CoordinatePlane + UnitCircle-style label badges) — 8 beats
- L3: Exponent rules — drill (AlgebraLadder library, 6 rules each derived) — 14 beats
- L4: Standard rewrites (AlgebraLadder showing 3 common rewrites) — 8 beats
- *Teaches toward:* S1A-Q24, S1B-Q3, CB-Q12, CB-Q13

**Topic 2.3 — Exponential Modeling**
- L1: Doubling time (AlgebraLadder + CoordinatePlane) — 8 beats
- L2: Half-life (AlgebraLadder + CoordinatePlane) — 8 beats
- L3: Continuous percent rate (AlgebraLadder) — 7 beats
- L4: Converting time units (AlgebraLadder, days→hours type) — 8 beats
- *Teaches toward:* S1A-Q8, S1B-Q3, CB-Q12, CB-Q13

**Topic 2.4 — Composition**
- L1: $f(g(x))$ from formulas (AlgebraLadder substitution) — 9 beats
- L2: Composition from tables and graphs (FunctionTable + CoordinatePlane) — 9 beats
- L3: Decomposition of $h(x) = f(g(x))$ — picking $f, g$ (AlgebraLadder) — 7 beats
- *Teaches toward:* S1A-Q18, CB-Q10, S2A-FRQ1-Ai, CB-FRQ1-Ai

**Topic 2.5 — Inverse Functions**
- L1: Definition + horizontal line test (CoordinatePlane: HLT animation) — 10 beats
- L2: Algebraic inversion (AlgebraLadder: swap-and-solve, 3 worked) — 12 beats
- L3: Inverse from table or graph (FunctionTable + CoordinatePlane reflection) — 8 beats
- L4: Restricting domain to make a function invertible (CoordinatePlane: highlighted interval) — 8 beats
- *Teaches toward:* S1A-Q7, S1A-Q12, S1B-Q8, CB-Q23, S2A-FRQ1-Aii, CB-FRQ1-Aii

**Topic 2.6 — Logarithms**
- L1: Definition (logarithm = exponent) (AlgebraLadder showing $\log_b y = x \iff b^x = y$ both directions) — 9 beats
- L2: Natural log, common log (AlgebraLadder + CoordinatePlane) — 6 beats
- L3: Inverse relationship visualized (Comparison: $b^x$ vs $\log_b x$, reflect over y=x) — 9 beats
- L4: Special values + identity rules (formula-card sequence) — 8 beats
- *Teaches toward:* S1A-Q5, S1B-Q6, CB-Q14, S2B-Q4-Bi, CB-FRQ4-Ai

**Topic 2.7 — Log/Exp Manipulation & Equations**
- L1: Log rules — product, quotient, power (AlgebraLadder, each rule derived) — 12 beats
- L2: Combining and expanding logs (AlgebraLadder drill) — 9 beats
- L3: Change of base (AlgebraLadder) — 6 beats
- L4: Solving exponential equations — strategy 1 (matching bases) (AlgebraLadder) — 7 beats
- L5: Strategy 2 (taking log of both sides) (AlgebraLadder) — 8 beats
- L6: Strategy 3 (substitute $u = b^x$) (AlgebraLadder) — 9 beats
- L7: Solving log equations + the domain check trap (AlgebraLadder + NumberLine for domain) — 11 beats
- *Teaches toward:* S2B-Q4-Aii, S2B-Q4-Bi, CB-Q14, CB-FRQ4-Ai, CB-FRQ4-Bii, S1B-Q8

**Topic 2.8 — Logarithmic Modeling**
- L1: Identifying log model from data (multiplicative-x → additive-y) (FunctionTable highlighting pattern) — 9 beats
- L2: Building a log model (AlgebraLadder + CoordinatePlane) — 8 beats
- L3: Semi-log plots (Comparison: same data on linear vs semi-log) — 8 beats
- *Teaches toward:* S2A-FRQ1-C, CB-FRQ2

**Unit 2 totals:** 8 topics, 33 lessons, ~280 beats.

---

### 2.3 Unit 3 — Trigonometric & Polar Functions (target: 30-35%)

**Topic 3.1 — Periodic Foundations**
- L1: What "periodic" means (CoordinatePlane: any periodic curve, period highlighted) — 7 beats
- L2: Amplitude, midline, period, frequency, phase (CoordinatePlane: 5-color labeled features) — 10 beats
- *Teaches toward:* baseline for all of Topic 3.4

**Topic 3.2 — The Unit Circle**
- L1: Radians vs degrees, conversions (UnitCircle + AlgebraLadder) — 9 beats
- L2: Sin and cos as unit-circle coordinates (UnitCircle: sweep angle, project to axes) — 12 beats
- L3: Tangent as $\sin/\cos$ (UnitCircle + AlgebraLadder) — 7 beats
- L4: Exact values for $\pi/6, \pi/4, \pi/3$ — derivation (Triangle: 30-60-90 and 45-45-90) — 11 beats
- L5: All 16 unit circle values memorized (UnitCircle: drill, hide-and-recall) — 14 beats
- L6: Quadrant signs — ASTC (UnitCircle: quadrant coloring) — 8 beats
- L7: Sin/cos for non-unit radius circles (CoordinatePlane: arbitrary point + radius) — 7 beats
- *Teaches toward:* S1A-Q19, S1A-Q25, all of Topic 3.4

**Topic 3.3 — Sin & Cos Graphs**
- L1: Parent sin and cos (CoordinatePlane: synced animation showing relationship to UnitCircle) — 11 beats
- L2: Cosine = sine shifted left by π/2 (Comparison) — 6 beats
- L3: Concavity of sinusoids (CoordinatePlane: highlight concave-up/concave-down arcs) — 8 beats
- *Teaches toward:* setup for 3.4

**Topic 3.4 — Sinusoidal Modeling**
- L1: A, B, C, D in $A \sin(B(t-C)) + D$ — what each parameter does (SinusoidalBuilder with sliders) — 14 beats
- L2: Reading a sinusoid off a graph (CoordinatePlane + identify-the-features prompts) — 11 beats
- L3: The 4-step modeling protocol (AlgebraLadder + SinusoidalBuilder) — 10 beats
- L4: Tides — full worked model (SinusoidalBuilder + AlgebraLadder) — 12 beats
- L5: Theme park ride — full worked model (SinusoidalBuilder) — 9 beats
- L6: Fan blade — sine vs cosine choice (SinusoidalBuilder) — 10 beats
- L7: Metronome — half-period subtlety (SinusoidalBuilder) — 11 beats
- L8: Daylight — concavity at peak (SinusoidalBuilder + concavity overlay) — 10 beats
- *Teaches toward:* S1A-Q13, S1A-Q20, S1B-Q7, S1B-Q11, S2B-Q3, CB-Q16, CB-Q22, CB-Q24, CB-FRQ3

**Topic 3.5 — Tangent**
- L1: Definition, period $\pi$, asymptotes (CoordinatePlane + UnitCircle showing where $\cos = 0$) — 10 beats
- L2: Always increasing between asymptotes (CoordinatePlane animation) — 6 beats
- L3: Concavity matches sign of tan (CoordinatePlane: concavity overlay synced with sign) — 9 beats
- *Teaches toward:* S1A-Q27

**Topic 3.6 — Inverse Trig & Reciprocal Trig**
- L1: Why we restrict — failed HLT on full-domain trig (CoordinatePlane + HLT) — 7 beats
- L2: arcsin / arccos / arctan domains and ranges (Comparison of three small graphs + range bars) — 10 beats
- L3: $\arcsin(\sin x) \ne x$ in general (CoordinatePlane + AlgebraLadder) — 8 beats
- L4: Sec, csc, cot — definitions and graphs (CoordinatePlane: each as reciprocal of host function) — 11 beats
- L5: Sec asymptotes ↔ cos zeros (Comparison: cos and sec stacked, x-coords aligned) — 7 beats
- *Teaches toward:* S1A-Q6, CB-Q23

**Topic 3.7 — Trig Equations**
- L1: General solution for $\sin x = c$ (UnitCircle: two intersections, period extension) — 11 beats
- L2: General solution for $\cos x = c$ (UnitCircle) — 9 beats
- L3: General solution for $\tan x = c$ — period $\pi$, fewer copies (CoordinatePlane) — 8 beats
- L4: Substitution: $\sin(3x) = c$ (AlgebraLadder showing the inner-substitution trick) — 9 beats
- L5: Trig inequalities (UnitCircle + NumberLine intersection) — 10 beats
- L6: Multi-tool: $6 \sin^2 x - 5 \sin x = 4$ (AlgebraLadder substitute → quadratic → back-solve) — 12 beats
- *Teaches toward:* S1A-Q23, S1B-Q1 (kind of), S2B-Q3-Ai, S2B-Q4, CB-Q15, CB-Q18, CB-FRQ4-Bi, CB-FRQ4-C

**Topic 3.8 — Trig Identities**
- L1: Pythagorean identities — derivation from unit circle (UnitCircle: $x^2 + y^2 = 1$ glow) — 9 beats
- L2: Three useful Pythagorean rearrangements (formula-card sequence) — 6 beats
- L3: Sum identities (AlgebraLadder + Comparison-of-angles diagram) — 11 beats
- L4: Difference identities + sign rule (AlgebraLadder) — 7 beats
- L5: Double-angle from sum (AlgebraLadder derivation $\alpha = \beta$) — 8 beats
- L6: Cofunction identities (UnitCircle: complement angle) — 6 beats
- L7: Even/odd reflections (UnitCircle: $-\theta$ and $2\pi - \theta$) — 7 beats
- L8: Identity simplification drill (AlgebraLadder: 5 problems, fully worked) — 14 beats
- *Teaches toward:* S1A-Q19, S1A-Q25, S1B-Q10, S2B-Q4-Bii, CB-FRQ4-Aii

**Topic 3.9 — Polar**
- L1: Polar coordinates and conversion (PolarPlane + AlgebraLadder) — 11 beats
- L2: Negative $r$ convention (PolarPlane: animate point through "flip") — 7 beats
- L3: Complex numbers in polar form (PolarPlane + AlgebraLadder) — 10 beats
- L4: Common polar curves library (PolarPlane drill: $r = a\cos\theta$, $r = a\sin\theta$, etc.) — 11 beats
- L5: Limaçon classification by $|a/b|$ (PolarPlane: animate $a/b$ slider through all four classes) — 12 beats
- L6: Rose curves: petals = $n$ if odd, $2n$ if even (PolarPlane drill) — 9 beats
- L7: Polar rate of change of $r$ vs distance $|r|$ (PolarPlane + CoordinatePlane synced) — 10 beats
- L8: Reading "above/below polar axis" + "closer/farther" from origin (PolarPlane drill table) — 9 beats
- L9: Polar relative max (PolarPlane: marker at max-distance point) — 6 beats
- *Teaches toward:* S1A-Q14, S1A-Q28, S1B-Q9, S1B-Q12, CB-Q17, CB-Q19

**Unit 3 totals:** 9 topics, 50 lessons, ~470 beats.

---

### 2.4 Course-wide totals

- 25 topics
- 115 lessons
- ~1040 beats
- 88 formula cards
- 68 worked practice problems

This is genuinely a textbook in interactive form. The build is large but every piece is small.

---

## 3. Diagnostic, practice, exam

### 3.1 Diagnostic
12 MCQs (4 per unit), takes ~6 min. Output: red/amber/green tag per topic. Topics flagged red surface first on the dashboard with a "start here" badge. Same pattern as the macro diagnostic — keep this proven UX, drop the macro content.

### 3.2 Practice bank
Each of the 68 problems renders as a **practice card**:
- Top: prompt + answer choices (or free-response box)
- "I'm done" → reveals the worked solution as a stepped beat sequence (same engine as lessons), not a wall of math
- Footer: tag the problem with topic IDs so it routes back into the lesson it teaches

Filters: by unit, by topic, by section (S1A/S1B/S2A/S2B/CB), by difficulty (auto-tagged from time-to-solve hints in source).

### 3.3 Mock exam
Two modes:
- **Section mode** — take one section under official timing (28 / 12 / 2 / 2 question, with the right calc rules). Score at end. Result: misses route into spaced-rep.
- **Full mock** — 3 hours, all four sections, scored against AP curve.

Built later, after lesson content is in. Not in PR-A.

### 3.4 Spaced repetition
- Every formula on the formula sheet → flashcard
- Every checkpoint MCQ wrong answer → reflective card
- Every flagged practice problem → practice card

SM-2-lite scheduling: rate "again / hard / good / easy" → next-due interval. Cards surface in `/learn/precalc/review` and as `recall` beats inside future lessons.

### 3.5 Formula sheet
Browsable index page + single-card focus mode + flashcard mode. All 88 items.

---

## 4. Build & PR sequence

| PR | Title | Scope | LOC est |
|---|---|---|---|
| **A** | this PLAN.md (just landed) | The contract | — |
| **B** | Macro removal | Delete `app/ap/`, `lib/data/ap-crash/`, `components/ui/macro-graph.tsx`. Migrate store v4→v5 dropping all `apCrash*` keys. Drop macro nav link. | -3000 +0 |
| **C** | Course shell + sidebar redo | New `/learn` route, dashboard, route stubs. New shell components: PageHeader, Section, Card, Tag, Stat redone clean. Single accent color, real type. Light/dark toggle. | +1500 |
| **D** | Walkthrough engine | Beat types + lesson player. All 12 beat renderers. Progress tracking, spaced-rep state. Wired but no content. | +1800 |
| **E** | Artifacts library | All 10 artifact components. Tested in isolation with a `/dev/artifacts` playground page. | +2500 |
| **F** | Diagnostic + Unit 1 content | 12-Q diagnostic. Unit 1's 32 lessons. ~290 beats encoded. | +3000 |
| **G** | Unit 2 content | 33 lessons, ~280 beats | +2800 |
| **H** | Unit 3 content | 50 lessons, ~470 beats | +4500 |
| **I** | Practice bank | 68 problems wrapped in the practice card UI. Filters. Routing back into lessons. | +2200 |
| **J** | Spaced rep deck | Formula sheet → cards. Review page. Inline `recall` beat hookup. | +800 |
| **K** | Mock exam mode | Timed section runner. Scoring. | +1200 |

PRs B, C, D, E run as a tight chain — each unblocks the next. PRs F, G, H ship in parallel after E lands.

The user reviews **PR A (this doc) once**. After that I just ship until PR K.

---

## 5. Open questions for you

A handful of decisions I want your call on before I start coding. Picking defaults if you don't answer, but flagging anyway:

1. **Does the macro module get deleted or hidden?** I'd say **delete** — exam is done, code is dead weight, and a clean removal keeps the store + routes simpler. *(Default: delete.)*
2. **Light mode or dark default?** Current app is dark. Modern textbook UIs read better in light. I'd default to **light for the lesson player specifically** (long-form reading), keep dashboard / sidebar dark. *(Default: light lessons, dark shell.)*
3. **Do you want Khan-Academy-style "energy points" / streaks?** I'd say **no** — you're cramming for an exam, not building a year-long habit. Progress is enough. *(Default: no.)*
4. **Should artifacts run on a math library (KaTeX for formulas, custom SVG for graphs) or full computer-algebra (something like Desmos via embed)?** I'd say **custom SVG + KaTeX**. Faster, no external deps, fully controllable animations. *(Default: custom.)*
5. **Speed vs polish on lesson scripts.** I'm planning to hand-author every beat (~1040 of them). That's the work, but it's the work. Alternative: I generate scripts en masse and you review samples. I'd recommend hand-author for Unit 1 (set the standard), then I batch Unit 2 and 3 and you spot-check 3-4 lessons per unit. *(Default: hand-author U1, batch U2+U3 with spot-check.)*

If you reply with anything other than "looks good" I'll integrate the change. If you reply "looks good" or just give a thumbs, I start PR B.
