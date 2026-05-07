// AP Crash course — types.
// A course is a list of MODULES. Each module is a list of LESSONS. Each
// lesson is a list of STEPS. Steps are the atomic learning units that the
// course renderer walks the user through one at a time.

export type Callout = {
  kind: "trap" | "insight" | "strategy" | "memory" | "formula" | "warning";
  title?: string;
  body: string;
};

export type Step =
  // Read a concept. Body is a list of paragraphs. Optional callouts shown after.
  | {
      type: "read";
      title: string;
      body: string[];
      callouts?: Callout[];
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
  // Multiple choice question. User answers; explanation reveals.
  | {
      type: "mcq";
      prompt: string;
      choices: string[];
      answer: number;
      explain: string;
      trap?: string;
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
  lessons: Lesson[];
};

export type Course = {
  id: string;
  examLabel: string;
  examDate: string;
  totalEstimateMin: number;
  modules: Module[];
};
