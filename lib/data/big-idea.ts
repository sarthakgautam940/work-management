// English 10 — Big Idea project tracker.
// Today: 2026-05-04. Socratic seminar (Day 1 students): 2026-05-05.

export type BookPick = {
  id: string;
  title: string;
  author: string;
  pages: number;
  why: string;
  available: string;
};

export const ESSENTIAL_QUESTION = "When is a risk worth taking?";

export const BIG_IDEA_GROUP = "Human condition · adventure & risk";

// Selected book + ranked backups.
// David and Goliath: chapters are self-contained (skim-friendly under deadline),
// the central thesis directly answers the essential question, and it's stocked
// at the DRHS library.
export const BOOK_PICKS: BookPick[] = [
  {
    id: "gladwell-david-goliath",
    title: "David and Goliath: Underdogs, Misfits, and the Art of Battling Giants",
    author: "Malcolm Gladwell",
    pages: 305,
    why: "Whole book is built on when an apparent disadvantage becomes an advantage — exactly the question. Each chapter is a self-contained story, so you can read out of order and still annotate.",
    available: "DRHS library *",
  },
  {
    id: "duckworth-grit",
    title: "Grit: The Power of Passion and Perseverance",
    author: "Angela Duckworth",
    pages: 352,
    why: "Backup #1. Same shelf section. Risk-tolerance-through-effort thesis pairs with the question.",
    available: "DRHS library *",
  },
  {
    id: "christian-griffiths-algorithms",
    title: "Algorithms to Live By: The Computer Science of Human Decisions",
    author: "Brian Christian, Tom Griffiths",
    pages: 368,
    why: "Backup #2. Explore-vs-exploit chapter is literally a math model of when a risk is worth taking.",
    available: "DRHS library *",
  },
];

// Tomorrow's Socratic seminar — minimum-viable prep.
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

// Project schedule (collapsed) — what's already been missed and what's next.
export type ScheduleItem = {
  date: string;
  label: string;
  status: "missed" | "today" | "upcoming";
};

export const SCHEDULE: ScheduleItem[] = [
  { date: "2026-04-15", label: "Pick book + select essential question", status: "missed" },
  { date: "2026-04-22", label: "Unit 6 flip book due", status: "missed" },
  { date: "2026-04-28", label: "Unit 6 quiz", status: "missed" },
  { date: "2026-05-04", label: "AP exams begin · midpoint check", status: "today" },
  { date: "2026-05-05", label: "Big Idea Socratic seminar (Day 1) + Unit 7 flip book due + midpoint reading quiz", status: "upcoming" },
  { date: "2026-05-06", label: "HW: print song lyrics with annotations", status: "upcoming" },
  { date: "2026-05-08", label: "Unit 7 quiz + Reader Response 3", status: "upcoming" },
  { date: "2026-05-12", label: "Article selected + annotated", status: "upcoming" },
  { date: "2026-05-14", label: "Cultural Literacy Test (test grade)", status: "upcoming" },
  { date: "2026-05-19", label: "Book finished", status: "upcoming" },
  { date: "2026-05-20", label: "Final exam review", status: "upcoming" },
];
