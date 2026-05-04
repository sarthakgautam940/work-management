// Today: May 4, 2026 (Monday)
// AP Macro test: May 8, 2026 (Friday) — 4 days
// AP Precalc test: May 12, 2026 (Tuesday) — 8 days
// IBO sprint starts: May 9, 2026

export type Priority = "critical" | "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  details?: string;
  due?: string;
  dueLabel?: string;
  priority: Priority;
  estimate?: number;
  defaultDone?: boolean;
};

export type Assessment = {
  title: string;
  date: string;
  detail: string;
};

export type ClassRoom = {
  id: string;
  name: string;
  short: string;
  type: string;
  accent: "blue" | "amber" | "lime" | "violet" | "rose";
  summary: string;
  assessments: Assessment[];
  tasks: Task[];
};

export const CLASSES: ClassRoom[] = [
  {
    id: "precalc",
    name: "AP Precalculus",
    short: "Precalc",
    type: "AP Course",
    accent: "blue",
    summary: "AP Precalc exam in 8 days. Crash plan now active.",
    assessments: [
      { title: "AP Precalc Exam", date: "2026-05-12", detail: "Full AP exam — Tuesday May 12, 2026." },
    ],
    tasks: [],
  },
  {
    id: "marketing",
    name: "Marketing 1",
    short: "Marketing",
    type: "Business Course",
    accent: "amber",
    summary: "No active assignments. Light load until teacher posts new work.",
    assessments: [],
    tasks: [],
  },
  {
    id: "chemistry",
    name: "Chemistry 1 Honors",
    short: "Chemistry",
    type: "Science Course",
    accent: "lime",
    summary: "Final research paper looms. Steady progress prevents a May crunch.",
    assessments: [
      { title: "Final research paper", date: "2026-05-15", detail: "Hard deadline — Friday May 15, 2026." },
    ],
    tasks: [
      { id: "chem-final-paper", title: "Final research paper", details: "Long runway — keep steady weekly progress.", due: "2026-05-15", priority: "high", estimate: 90 },
    ],
  },
  {
    id: "macro",
    name: "AP Macroeconomics",
    short: "AP Macro",
    type: "AP Course",
    accent: "blue",
    summary: "AP Macro exam in 4 days. Maximum priority lane.",
    assessments: [
      { title: "AP Macro Exam", date: "2026-05-08", detail: "Full AP exam — Friday May 8, 2026." },
    ],
    tasks: [],
  },
  {
    id: "english",
    name: "English 10",
    short: "English",
    type: "English Course",
    accent: "rose",
    summary: "Several dated deliverables. Manageable cadence.",
    assessments: [
      { title: "Midpoint reading quiz", date: "2026-05-04", detail: "Today — Monday May 4." },
    ],
    tasks: [
      { id: "eng-midpoint", title: "Midpoint reading quiz", details: "Today.", due: "2026-05-04", priority: "critical", estimate: 45 },
      { id: "eng-flipbook", title: "Unit 6 flip book", details: "Wednesday April 22 (CONFIRM if past — likely complete).", due: "2026-04-22", priority: "low", estimate: 60, defaultDone: true },
    ],
  },
];

// COMPRESSED AP MACRO PLAN — 4 days, exam May 8
export type APBlock = {
  date: string;
  label: string;
  topics: string[];
  hours: number;
  done?: boolean;
};

export const AP_MACRO_PLAN: APBlock[] = [
  {
    date: "2026-05-04",
    label: "Day 1 — Mon",
    hours: 2.5,
    topics: [
      "Unit 1: Comparative advantage, supply/demand, market equilibrium",
      "Unit 2: GDP definition, components (C+I+G+NX), real vs nominal, CPI/inflation",
      "Unit 2: Unemployment types, business cycles",
      "Practice: 10 MCQ from Units 1-2",
    ],
  },
  {
    date: "2026-05-05",
    label: "Day 2 — Tue",
    hours: 2.5,
    topics: [
      "Unit 3: Aggregate demand + 4 shifters",
      "Unit 3: SRAS, LRAS, AD-AS equilibrium",
      "Unit 3: Recessionary vs inflationary gaps, demand-pull vs cost-push",
      "Unit 3: Fiscal policy + multipliers (spending, tax, balanced budget)",
      "Practice: 10 MCQ + 1 FRQ on AD-AS",
    ],
  },
  {
    date: "2026-05-06",
    label: "Day 3 — Wed",
    hours: 2.5,
    topics: [
      "Unit 4: Money — definitions (M1/M2), functions, fractional reserve",
      "Unit 4: Money market, loanable funds market",
      "Unit 4: Fed tools, monetary policy, interest rates",
      "Unit 5: Phillips curve (SR + LR), MV=PQ",
      "Practice: 10 MCQ on Units 4-5",
    ],
  },
  {
    date: "2026-05-07",
    label: "Day 4 — Thu",
    hours: 3,
    topics: [
      "Unit 5: Deficits, debt, crowding out, growth + productivity",
      "Unit 6: Balance of payments, exchange rates, FX market",
      "Unit 6: Net exports, capital flows, real interest differentials",
      "Full practice exam — 30 MCQ + 2 FRQ, timed",
      "Error review — flag every miss",
    ],
  },
  {
    date: "2026-05-08",
    label: "Exam Day — Fri",
    hours: 0.5,
    topics: [
      "Light formula scan — no new content",
      "Eat carbs, hydrate",
      "Trust the prep",
    ],
  },
];

// COMPRESSED AP PRECALC PLAN — 8 days, exam May 12
export const AP_PRECALC_PLAN: APBlock[] = [
  {
    date: "2026-05-04",
    label: "Day 1 — Mon",
    hours: 1.5,
    topics: [
      "1.1-1.4: Rates of change, polynomial functions",
      "1.5-1.6: Polynomial zeros, multiplicity, end behavior",
      "Practice: 8 problems from progress check",
    ],
  },
  {
    date: "2026-05-05",
    label: "Day 2 — Tue",
    hours: 1.5,
    topics: [
      "1.7-1.10: Rational functions, asymptotes, holes",
      "1.11-1.12: Equivalent representations, transformations",
      "Practice: 10 mixed problems",
    ],
  },
  {
    date: "2026-05-06",
    label: "Day 3 — Wed",
    hours: 1.5,
    topics: [
      "1.13-1.14: Model selection, application, inverse proportionality",
      "2.1-2.3: Sequences (arithmetic + geometric), exponential basics",
      "Practice: 8 problems",
    ],
  },
  {
    date: "2026-05-07",
    label: "Day 4 — Thu",
    hours: 1.5,
    topics: [
      "2.4-2.7: Exponential properties, modeling, composition",
      "2.8-2.10: Inverses, logarithms, exponential-log relationship",
      "Practice: 8 problems",
    ],
  },
  {
    date: "2026-05-08",
    label: "Day 5 — Fri (Macro exam, light Precalc)",
    hours: 1,
    topics: [
      "2.11-2.13: Log functions, properties (product/quotient/power), equations",
      "2.14-2.15: Log modeling, semi-log plots",
      "Light review only — protect Macro exam energy",
    ],
  },
  {
    date: "2026-05-09",
    label: "Day 6 — Sat",
    hours: 2,
    topics: [
      "3.1-3.6: Periodic functions, unit circle, sin/cos graphs + transformations",
      "Practice: 12 trig problems",
    ],
  },
  {
    date: "2026-05-10",
    label: "Day 7 — Sun",
    hours: 2,
    topics: [
      "3.7-3.12: Sinusoidal modeling, tangent, inverse trig, identities",
      "3.13-3.15: Polar coordinates, polar graphs, polar rates of change",
      "Practice: 12 mixed problems",
    ],
  },
  {
    date: "2026-05-11",
    label: "Day 8 — Mon (final prep)",
    hours: 2.5,
    topics: [
      "Full timed practice exam (MCQ + FRQ)",
      "Error review — every miss documented",
      "Formula sheet brain-dump from memory",
    ],
  },
  {
    date: "2026-05-12",
    label: "Exam Day — Tue",
    hours: 0.5,
    topics: [
      "Quick formula scan",
      "Trust the prep",
    ],
  },
];
