// AP Crash course — types.
// A course is a list of MODULES. Each module is a list of LESSONS. Each
// lesson is a list of STEPS. Steps are the atomic learning units that the
// course renderer walks the user through one at a time.

export type Callout = {
  kind: "trap" | "insight" | "strategy" | "memory" | "formula" | "warning";
  title?: string;
  body: string;
};

// Graph state for interactive-graph steps. Each curve has a position
// descriptor (left/center/right) we can animate between.
export type GraphState = {
  ad?: "left" | "center" | "right";
  sras?: "left" | "center" | "right";
  lras?: "left" | "center" | "right";
  ms?: "left" | "center" | "right";
  md?: "left" | "center" | "right";
  dlf?: "left" | "center" | "right";
  slf?: "left" | "center" | "right";
  srpc?: "left" | "center" | "right";
  phillipsMove?: "up-left" | "down-right" | "none";
  dCurrency?: "left" | "center" | "right";
  sCurrency?: "left" | "center" | "right";
  note?: string;
};

export type Step =
  // Read a concept. Body is a list of paragraphs. Optional callouts and a
  // comprehension check (no-stakes) shown after.
  | {
      type: "read";
      title: string;
      body: string[];
      callouts?: Callout[];
      comprehensionCheck?: { question: string; sampleAnswer: string };
    }
  // Memorize a set of formulas, with optional mnemonic / hint.
  | {
      type: "formula";
      title: string;
      formulas: string[];
      mnemonic?: string;
      callout?: Callout;
    }
  // Worked example with prompt + multi-step solution + key takeaway.
  | {
      type: "example";
      title: string;
      prompt: string;
      solution: string[];
      takeaway?: string;
    }
  // Multiple choice question. User answers; explanation reveals. Optional
  // reteach block fires on wrong answers in critical concepts.
  | {
      type: "mcq";
      prompt: string;
      choices: string[];
      answer: number;
      explain: string;
      trap?: string;
      reteach?: {
        headline: string;
        body: string[];
        followup: { prompt: string; choices: string[]; answer: number; explain: string };
      };
    }
  // Calculation drill. User attempts; shows answer + worked steps.
  | {
      type: "drill";
      prompt: string;
      answer: string;
      steps: string[];
    }
  // Flashcard deck. User flips each card and rates know/learning.
  | {
      type: "flashcards";
      title: string;
      cards: { front: string; back: string }[];
    }
  // Macro chain — user reviews the cascade pattern step by step.
  | {
      type: "chain";
      title: string;
      trigger: string;
      steps: string[];
      finalEffect: string;
    }
  // FRQ part walkthrough — prompt, rubric points, model solution.
  | {
      type: "frq-part";
      partLabel: string;
      prompt: string;
      rubricPoints: string[];
      solution: string[];
      graphHint?: string;
    }
  // Pattern library entry — name, what it tests, technique, trap, MCQ.
  | {
      type: "pattern";
      name: string;
      tests: string;
      technique: string;
      trap?: string;
      example?: { prompt: string; choices: string[]; answer: number; explain: string };
    }
  // Interactive graph — Mode A predicts shift, Mode B identifies shock.
  | {
      type: "interactive-graph";
      mode: "predict-shift" | "identify-shock";
      graphType: "ad-as" | "money-market" | "loanable-funds" | "phillips" | "forex";
      title: string;
      prompt: string;
      // Initial state of the graph (which curves/positions).
      initial: GraphState;
      // Resulting state after the shift (for predict-shift mode this is the
      // correct outcome; for identify-shock it's already drawn at start).
      shifted: GraphState;
      // The choices the user picks from.
      choices: { label: string; correct: boolean }[];
      explain: string;
    }
  // Curated review deck — flashcards from earlier modules surfaced again.
  | {
      type: "review-deck";
      title: string;
      cards: { front: string; back: string; sourceModule?: string }[];
    };

export type Lesson = {
  id: string;
  title: string;
  estimateMin: number;
  steps: Step[];
};

export type Module = {
  id: string;
  partNumber: number;       // 1-14 from the PDF
  title: string;
  subtitle: string;
  estimateMin: number;
  priority: "must" | "high" | "medium";
  // Optional "why does this matter" framing shown above the lesson list.
  // Format: "{exam weight}. {What FRQ topic it shows up on.}"
  intro?: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  examLabel: string;
  examDate: string;
  totalEstimateMin: number;
  modules: Module[];
};
