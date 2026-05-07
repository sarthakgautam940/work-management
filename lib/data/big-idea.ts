// English 10 — Big Idea project tracker.
// As of 2026-05-06 evening: Socratic seminar is COMPLETE (delivered 5/5).
// Group changed (Human Condition was full) — now in The Evolving World.
// Book picked: Algorithms to Live By (Christian & Griffiths).
// Active deliverable: Hexagonal Thinking sheet, due 2026-05-07 EOD.

export type BookPick = {
  id: string;
  title: string;
  author: string;
  pages: number;
  why: string;
  available: string;
};

export const ESSENTIAL_QUESTION = "When is a risk worth taking?";

export const BIG_IDEA_GROUP = "The Evolving World · mysteries of life + responsibility & morality";

export const BIG_IDEA_SUBTHEMES = [
  "future technologies",
  "the power of the human mind",
  "ethical obligations to the planet",
  "ethical obligations to each other",
];

// True when the Socratic seminar deliverable has been completed.
// Hides the seminar prep parent task from the work-mode queue.
export const SEMINAR_DONE = true;

// Selected book + ranked backups.
// Algorithms to Live By picked because chapters 1-6 directly map to the EQ:
// Optimal Stopping, Explore/Exploit, Sorting, Caching, Scheduling, Bayes.
export const BOOK_PICKS: BookPick[] = [
  {
    id: "christian-griffiths-algorithms",
    title: "Algorithms to Live By: The Computer Science of Human Decisions",
    author: "Brian Christian, Tom Griffiths",
    pages: 368,
    why: "Picked. Chapters on Optimal Stopping (37% rule, Ch 1), Explore/Exploit (Ch 2), and Bayes (Ch 6) directly answer the EQ. Self-contained chapters allow targeted re-reads while annotating.",
    available: "Owned (physical copy).",
  },
  {
    id: "gladwell-david-goliath",
    title: "David and Goliath: Underdogs, Misfits, and the Art of Battling Giants",
    author: "Malcolm Gladwell",
    pages: 305,
    why: "Backup #1. Whole book is built on when an apparent disadvantage becomes an advantage.",
    available: "DRHS library *",
  },
  {
    id: "duckworth-grit",
    title: "Grit: The Power of Passion and Perseverance",
    author: "Angela Duckworth",
    pages: 352,
    why: "Backup #2. Risk-tolerance-through-effort thesis pairs with the question.",
    available: "DRHS library *",
  },
];

// Seminar prep — kept for history. Hidden from queue when SEMINAR_DONE = true.
export type SeminarTask = {
  id: string;
  label: string;
  detail: string;
  estimateMin: number;
};

export const SEMINAR_PREP: SeminarTask[] = [
  {
    id: "book-pickup",
    label: "Pick up the book at the school library before first period",
    detail: "Get David and Goliath. If checked out, take Grit, then Algorithms to Live By.",
    estimateMin: 10,
  },
  {
    id: "book-skim",
    label: "Read first half of book (≈150 pages) — skim-and-mark method",
    detail: "Read intro + chapters 1–4 properly. Skim chapters 5–6 by reading first/last paragraph of each section. Aim 90 minutes.",
    estimateMin: 90,
  },
  {
    id: "book-annotate",
    label: "Place 12–15 sticky-note annotations across the read pages",
    detail: "1–2 sentence reactions. Look for: examples of risk paying off, examples of risk failing, the author's claim about what makes the difference.",
    estimateMin: 30,
  },
  {
    id: "hex-central",
    label: "Hexagonal sheet — write central claim in the shaded hexagon",
    detail: "Format: a 2-3 sentence claim that answers the essential question, tied to your group's theme.",
    estimateMin: 10,
  },
  {
    id: "hex-evidence",
    label: "Hexagonal sheet — fill 5–6 evidence hexagons with quotes (with page numbers)",
    detail: "MLA-lite citation style: (Gladwell 38). Pull from the half you read.",
    estimateMin: 25,
  },
  {
    id: "hex-connections",
    label: "Hexagonal sheet — draw connection lines + label transitions",
    detail: "Use words like therefore, however, moreover, hence on each line. Each line links the central claim to one evidence hex.",
    estimateMin: 15,
  },
  {
    id: "free-write",
    label: "5-minute free-write practice on the prompt",
    detail: "Tomorrow opens with a free-write. Run a timed practice tonight on the essential question.",
    estimateMin: 5,
  },
  {
    id: "bring-tomorrow",
    label: "Pack: book, hexagonal sheet, two pens, sticky notes, index cards",
    detail: "Lay it all out tonight so it's ready to grab.",
    estimateMin: 5,
  },
];

// Active hex-sheet deliverable — front + back of the printed sheet.
// Replaces SEMINAR_PREP as the surfaceable Big Idea task once SEMINAR_DONE = true.
// Subtask IDs are namespaced "hexsheet-*" to avoid collisions with seminar IDs in
// the bigIdeaTasks store map.
export const HEX_SHEET_DUE = "2026-05-07";

export const HEX_SHEET_PREP: SeminarTask[] = [
  {
    id: "hexsheet-central",
    label: "Confirm central claim using the Evolving World sentence frame",
    detail: "\"Although some may say ___, the mysteries in life like [risk/decision] are ___ because ___ and ___.\" One filled-in sentence in the shaded center hexagon.",
    estimateMin: 10,
  },
  {
    id: "hexsheet-evidence",
    label: "Pull 6–8 evidence quotes from Algorithms to Live By, Ch 1–6",
    detail: "Hardest-hitting chapters for the EQ: Optimal Stopping (Ch 1), Explore/Exploit (Ch 2), Bayes (Ch 6). Mark each with a page number and target sub-theme (future tech / human mind / planet ethics / ethics to each other).",
    estimateMin: 45,
  },
  {
    id: "hexsheet-place-evidence",
    label: "Place evidence into the 6 surrounding white hexagons",
    detail: "Quote format with (Christian & Griffiths p.X). Each hexagon = one self-contained sub-claim.",
    estimateMin: 20,
  },
  {
    id: "hexsheet-connections",
    label: "Draw connection lines + label transitions",
    detail: "Each line from center hex to evidence hex gets one transition: Furthermore, Moreover, However, Therefore, Hence, Consequently, As a result.",
    estimateMin: 15,
  },
  {
    id: "hexsheet-literary",
    label: "Required Connection #1 — Literary",
    detail: "1 paragraph. Pick a character from a text I've read this year (English 10) who faced a seemingly impossible challenge. Tie back to the EQ.",
    estimateMin: 15,
  },
  {
    id: "hexsheet-realworld",
    label: "Required Connection #2 — Real World",
    detail: "1 paragraph. Current event or historical figure representing a 'shift in morality' or 'shaping of society.' Fed/recession decisions or AI ethics are unusually applicable.",
    estimateMin: 15,
  },
  {
    id: "hexsheet-personal",
    label: "Required Connection #3 — Personal",
    detail: "1 paragraph. How my own story defines what I see as 'risk.' UpLevel itself is the natural answer — starting an LLC at 15.",
    estimateMin: 15,
  },
  {
    id: "hexsheet-review",
    label: "Final review pass",
    detail: "Verify rubric criteria, page citations on every quote, transition word logic, all three Required Connections written. Pack the sheet for tomorrow.",
    estimateMin: 10,
  },
];

// Four required final-essay sources (collected over the next two weeks).
export type SourceState = "pending" | "selected" | "annotated" | "approved";

export type SourceSlot = {
  id: string;
  kind: "poem" | "song" | "book" | "article";
  label: string;
  due: string;
  detail: string;
  options?: string[];
};

export const SOURCE_SLOTS: SourceSlot[] = [
  {
    id: "src-poem",
    kind: "poem",
    label: "Poem — from the class anthology",
    due: "2026-05-18",
    detail: "Pick from the anthology. Top fits for the risk theme: 'My Life had stood — a Loaded Gun' (Dickinson), 'The More Loving One' (Auden), 'My life has been the poem I would have writ' (Thoreau).",
    options: [
      "My Life had stood – a Loaded Gun – · Emily Dickinson",
      "The More Loving One · W.H. Auden",
      "My life has been the poem I would have writ · Henry David Thoreau",
      "Harlem · Langston Hughes",
    ],
  },
  {
    id: "src-song",
    kind: "song",
    label: "Self-selected song (with songwriter)",
    due: "2026-05-06",
    detail: "Print lyrics with annotations. HW for 5/6.",
  },
  {
    id: "src-book",
    kind: "book",
    label: "Q4 nonfiction book (180+ pages, 10th-grade+)",
    due: "2026-05-19",
    detail: "Annotated as you read. See the BOOK_PICKS for the ranked options.",
  },
  {
    id: "src-article",
    kind: "article",
    label: "Article — NYT or WSJ, approved by Mrs. Hawkins",
    due: "2026-05-12",
    detail: "Bring selected + annotated to class on 5/12.",
  },
];

// Project schedule. Status is computed live based on today's date — never hardcoded.
export type ScheduleItem = {
  date: string;
  label: string;
};

export const SCHEDULE: ScheduleItem[] = [
  { date: "2026-04-15", label: "Pick book + select essential question" },
  { date: "2026-04-22", label: "Unit 6 flip book due" },
  { date: "2026-04-28", label: "Unit 6 quiz" },
  { date: "2026-05-04", label: "AP exams begin · midpoint check" },
  { date: "2026-05-05", label: "Big Idea Socratic seminar — DONE" },
  { date: "2026-05-06", label: "HW: print song lyrics with annotations" },
  { date: "2026-05-07", label: "Hexagonal Thinking sheet — full (front + back) DUE" },
  { date: "2026-05-08", label: "Unit 7 quiz + Reader Response 3" },
  { date: "2026-05-12", label: "Article selected + annotated" },
  { date: "2026-05-14", label: "Cultural Literacy Test (test grade)" },
  { date: "2026-05-19", label: "Book finished" },
  { date: "2026-05-20", label: "Final exam review" },
];
