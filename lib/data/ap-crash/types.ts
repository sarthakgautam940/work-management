// AP Crash course (placeholder) — types.
// A course is a list of MODULES. Each module is a list of LESSONS. Each
// lesson is a list of STEPS. Steps are the atomic learning units that the
// course renderer walks the user through one at a time.
//
// NOTE: this is the legacy step-based format used by the precalc placeholder
// course living at /ap/crash/precalc. The full precalc rebuild lives at
// /learn/precalc with a new "beat"-based engine. Once /learn/precalc reaches
// feature parity, this file and the placeholder route get deleted.

export type Callout = {
  kind: "trap" | "insight" | "strategy" | "memory" | "formula" | "warning";
  title?: string;
  body: string;
};

export type Step =
  // Read a concept. Body is a list of paragraphs. Optional callouts.
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
    };

export type Lesson = {
  id: string;
  title: string;
  estimateMin: number;
  steps: Step[];
};

export type Module = {
  id: string;
  partNumber: number;
  title: string;
  subtitle: string;
  estimateMin: number;
  priority: "must" | "high" | "medium";
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
