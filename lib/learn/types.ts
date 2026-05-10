// Types for the new /learn course engine.
//
// Course → Unit → Topic → Lesson → Beat
//
// The atom is a Beat: one click, one moment of learning. Beats narrate
// over an Artifact (a graph, table, ladder, etc.) — the artifact stays
// on screen, beats just change focus, animate, or ask.

// ──────────────────────────────────────────────────────────────────────
// Artifact state — what visual instrument the lesson is playing on.
// ──────────────────────────────────────────────────────────────────────

export type ArtifactKind =
  | "coordinate-plane"
  | "unit-circle"
  | "polar-plane"
  | "function-table"
  | "algebra-ladder"
  | "triangle"
  | "number-line"
  | "sequence-list"
  | "sinusoidal-builder"
  | "comparison"
  | "none";

// Each artifact has its own state shape. Beats pass partial state to the
// artifact to drive animation. Kept open-ended so individual artifact
// implementations define their own structure.
export type ArtifactState = Record<string, unknown>;

// ──────────────────────────────────────────────────────────────────────
// Beat — the atomic unit. One click, one beat.
// ──────────────────────────────────────────────────────────────────────

// Common beat fields all types share.
type BaseBeat = {
  // Optional id stable enough for spaced-rep / completion tracking.
  id?: string;
  // What part of the artifact (if any) to highlight when this beat plays.
  focus?: string | string[];
  // Animation target — applied to the artifact when entering this beat.
  // The artifact decides how to render it (curves shift, lines glow, etc).
  artifact?: ArtifactState;
};

export type Beat =
  // Names the lesson, sets the stake, shows the artifact in initial state.
  | (BaseBeat & {
      type: "intro";
      title: string;
      stake: string; // 1-2 sentences: "by the end of this you'll be able to..."
    })
  // Plain narration over the current artifact. Most common beat.
  | (BaseBeat & {
      type: "narrate";
      text: string;
      // Optional inline LaTeX — rendered with KaTeX.
      math?: string;
    })
  // Dim everything except a specific element of the artifact, narrate it.
  | (BaseBeat & {
      type: "highlight";
      text: string;
      math?: string;
    })
  // Animate a parameter on the artifact (shift, stretch, reflect, sweep).
  | (BaseBeat & {
      type: "transform";
      text: string;
    })
  // Algebra ladder reveals one more line. Used for proofs/derivations.
  | (BaseBeat & {
      type: "derive";
      text: string;
      // The new line being added to the ladder.
      line: string;
      // Optional rationale for why this step works.
      because?: string;
    })
  // "Before you click — what happens if…?" User picks. Animation reveals.
  | (BaseBeat & {
      type: "predict";
      prompt: string;
      choices: { label: string; correct: boolean; consequence?: string }[];
      // Reveal text shown after they pick.
      reveal: string;
    })
  // User changes one input on the artifact and observes.
  | (BaseBeat & {
      type: "try-it";
      prompt: string;
      // What knob the user can change. Implementation varies by artifact.
      knob: { kind: "slider"; param: string; min: number; max: number; step: number };
      // What text appears when they're done.
      onDone: string;
    })
  // Two artifacts side by side. Narration crosses between them.
  | (BaseBeat & {
      type: "compare";
      text: string;
    })
  // A single formula or identity, two-sided flip card.
  | (BaseBeat & {
      type: "formula-card";
      title: string;
      formula: string; // LaTeX
      derivation?: string[]; // shown on flip
    })
  // Spaced-rep card — surfaces a concept from earlier in the unit.
  | (BaseBeat & {
      type: "recall";
      front: string;
      back: string;
      sourceLesson?: string;
    })
  // Single MCQ. Wrong → reteach mini-sequence + follow-up gate.
  | (BaseBeat & {
      type: "checkpoint";
      prompt: string;
      choices: string[];
      answer: number;
      explain: string;
      reteach?: {
        headline: string;
        body: string[]; // 2-4 short paragraphs
        followup: { prompt: string; choices: string[]; answer: number; explain: string };
      };
    })
  // End-of-lesson recap. Cards added to spaced-rep deck.
  | (BaseBeat & {
      type: "summary";
      bullets: string[]; // 2-3 things student can now do
      addToDeck?: { id: string; front: string; back: string }[];
    });

// ──────────────────────────────────────────────────────────────────────
// Lesson, topic, unit, course
// ──────────────────────────────────────────────────────────────────────

export type Lesson = {
  id: string;
  title: string;
  estimateMin: number;
  // Default artifact for this lesson. Beats can override via their `artifact`.
  artifact: ArtifactKind;
  // Initial state of the artifact when the lesson opens.
  artifactInitial?: ArtifactState;
  beats: Beat[];
};

export type Topic = {
  id: string;
  title: string;
  // One-sentence pitch shown on the unit page.
  blurb?: string;
  lessons: Lesson[];
};

export type Unit = {
  id: string;
  number: number; // 1, 2, 3
  title: string;
  // Exam weight, e.g. "30–40% of exam".
  examWeight: string;
  // What core ideas this unit lives on, max 3.
  coreIdeas: string[];
  topics: Topic[];
};

export type Course = {
  id: "ap-precalc";
  label: string;
  examDate: string; // ISO
  units: Unit[];
};
