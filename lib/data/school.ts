// Today: 2026-05-04 (Monday, Day 2 in chemistry rotation)
// AP Macro: 2026-05-08 (Friday) — 4 days
// AP Precalc: 2026-05-12 (Tuesday) — 8 days
// Heat transfer quiz (chem): 2026-05-07 (Thursday, Day 1)
// English Big Idea Socratic seminar (Day 1 students): 2026-05-05 (Tuesday)
// Cultural Literacy Test (English): 2026-05-14 / 2026-05-15

export type Priority = "critical" | "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  details?: string;
  due?: string;
  dueLabel?: string;
  priority: Priority;
  estimate?: number;       // minutes
  defaultDone?: boolean;
  overdue?: boolean;        // true if past due and not yet submitted
  grade?: "test" | "quiz" | "classwork" | "homework" | "project";
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
  grade?: number;            // current course grade as %
  assessments: Assessment[];
  tasks: Task[];
};

export const CLASSES: ClassRoom[] = [
  {
    id: "precalc",
    name: "AP Precalculus",
    short: "Precalc",
    type: "Period 1 · AP",
    accent: "blue",
    summary: "One assignment is the entire grade. Finish Calmedic, exam in 8 days.",
    grade: 58.7,
    assessments: [
      { title: "AP Precalc Exam", date: "2026-05-12", detail: "Tuesday — full AP exam." },
    ],
    tasks: [
      {
        id: "precalc-calmedic-13",
        title: "Calmedic — Units 1–3",
        details: "Quiz grade. NTI. Was due 4/27. Finish FIRST — single biggest grade lever in the course.",
        due: "2026-04-27",
        priority: "critical",
        estimate: 90,
        overdue: true,
        grade: "quiz",
      },
      {
        id: "precalc-calmedic-46",
        title: "Calmedic — Units 4–6",
        details: "Required by Wednesday 5/6. Cleans the bulk of the course.",
        due: "2026-05-06",
        priority: "critical",
        estimate: 90,
        grade: "quiz",
      },
      {
        id: "precalc-calmedic-rest",
        title: "Calmedic — remaining units (7+)",
        details: "Final stretch. Locks the assignment and the grade.",
        priority: "high",
        estimate: 90,
        grade: "quiz",
      },
      {
        id: "precalc-exam-prep",
        title: "AP Precalc exam prep",
        details: "Open the AP crash plan and follow it. Compressed 8-day schedule.",
        due: "2026-05-12",
        priority: "high",
        estimate: 120,
        grade: "test",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing 1",
    short: "Marketing",
    type: "Period · Business",
    accent: "amber",
    summary: "Two missing assignments. Submit both tonight.",
    assessments: [],
    tasks: [
      {
        id: "mkt-derby",
        title: "Kentucky Derby worksheet",
        details: "Was due today 11:35 AM. Submit late tonight — every hour worsens the late penalty.",
        due: "2026-05-04",
        priority: "critical",
        estimate: 30,
        overdue: true,
        grade: "classwork",
      },
      {
        id: "mkt-promotions",
        title: "Promotions project",
        details: "Was due 4/23. Confirm if there's a paired worksheet — submit both.",
        due: "2026-04-23",
        priority: "critical",
        estimate: 60,
        overdue: true,
        grade: "project",
      },
      {
        id: "mkt-past-quiz-paper",
        title: "Bring past Marketing quiz paper to school",
        details: "Physical paper. Walk in with it 5/7 or 5/8 — otherwise it becomes a re-take. Stack it in your bag tonight.",
        due: "2026-05-08",
        priority: "critical",
        estimate: 5,
        grade: "classwork",
      },
      {
        id: "mkt-slideshow-1",
        title: "Marketing slideshow assignment",
        details: "User-flagged as vague — confirm details on Schoology when you have it open. Treat as a slideshow project.",
        priority: "high",
        estimate: 60,
        grade: "project",
      },
      {
        id: "mkt-paper-prior-project",
        title: "Marketing paper for prior project",
        details: "Paper paired with an earlier project. Confirm details on Schoology.",
        priority: "high",
        estimate: 60,
        grade: "project",
      },
      {
        id: "mkt-slideshow-2",
        title: "Marketing slideshow #2 (paired with prior-project paper)",
        details: "Pairs with mkt-paper-prior-project. Confirm details on Schoology.",
        priority: "high",
        estimate: 60,
        grade: "project",
      },
      {
        id: "mkt-promotions-worksheet",
        title: "Verify Promotions worksheet",
        details: "Check Schoology for the worksheet that pairs with the project. Submit if it exists.",
        priority: "high",
        estimate: 10,
      },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry 1 Honors",
    short: "Chem",
    type: "Period · Science",
    accent: "lime",
    summary: "Grade is bleeding (67.1). Three NTI / overdue items + a heat-transfer quiz Thursday.",
    grade: 67.1,
    assessments: [
      { title: "Heat transfer quiz", date: "2026-05-07", detail: "Thursday (Day 1) — day before AP Macro." },
    ],
    tasks: [
      {
        id: "chem-final-paper",
        title: "Final research paper (TEST grade)",
        details: "Was due 5/1. Counts as a TEST grade — the single biggest grade lever in this class. Submit late TONIGHT.",
        due: "2026-05-01",
        priority: "critical",
        estimate: 180,
        overdue: true,
        grade: "test",
      },
      {
        id: "chem-irp-intro",
        title: "IRP revised intro",
        details: "Quiz grade · NTI. Was due 3/26. Re-submit tonight.",
        due: "2026-03-26",
        priority: "critical",
        estimate: 45,
        overdue: true,
        grade: "quiz",
      },
      {
        id: "chem-lab-makeup",
        title: "Calorimetry lab — online makeup",
        details: "Missed Friday 5/1 (in person + paper). Use the online makeup version.",
        due: "2026-05-04",
        priority: "high",
        estimate: 45,
        overdue: true,
        grade: "classwork",
      },
      {
        id: "chem-lab-distillation",
        title: "Lab on paper — distillation + electrolysis",
        details: "Paper-based lab writeup.",
        priority: "high",
        estimate: 40,
        grade: "classwork",
      },
      {
        id: "chem-cw-pure-substances",
        title: "Defining pure substances",
        details: "Classwork — finish and submit.",
        priority: "medium",
        estimate: 20,
        grade: "classwork",
      },
      {
        id: "chem-concept-builder-heat",
        title: "Concept Builder — Heat Equation",
        details: "Classwork / homework.",
        priority: "medium",
        estimate: 25,
        grade: "homework",
      },
      {
        id: "chem-heating-curve",
        title: "Heating curve practice worksheet",
        details: "Due in class tomorrow.",
        due: "2026-05-05",
        priority: "high",
        estimate: 25,
        grade: "classwork",
      },
      {
        id: "chem-wayground",
        title: "Heating curves Wayground (screenshot)",
        details: "Due Thursday 5/7 11:59 PM. Take a screenshot of completion and submit it.",
        due: "2026-05-07",
        priority: "high",
        estimate: 30,
        grade: "homework",
      },
      {
        id: "chem-quiz-heat-transfer",
        title: "Heat transfer quiz prep",
        details: "Quiz Thursday 5/7 (Day 1). Day BEFORE AP Macro — keep it short and high-yield.",
        due: "2026-05-07",
        priority: "high",
        estimate: 60,
        grade: "quiz",
      },
      {
        id: "chem-checkin-calorimetry",
        title: "Check-in: Calorimetry",
        details: "Submit when prompted.",
        priority: "medium",
        estimate: 15,
        grade: "classwork",
      },
      {
        id: "chem-pivot-heat",
        title: "Pivot — Heat transfer",
        details: "Classwork / homework. Aligns with quiz prep.",
        priority: "medium",
        estimate: 25,
        grade: "homework",
      },
    ],
  },
  {
    id: "macro",
    name: "AP Macroeconomics",
    short: "AP Macro",
    type: "Period · AP",
    accent: "blue",
    summary: "Exam in 4 days. Open the AP crash plan and Work Mode to study.",
    assessments: [
      { title: "AP Macro Exam", date: "2026-05-08", detail: "Friday — full AP exam." },
    ],
    tasks: [],
  },
  {
    id: "pe",
    name: "Physical Education",
    short: "PE",
    type: "Period · PE",
    accent: "lime",
    summary: "One form to submit by 12:40 tomorrow.",
    assessments: [],
    tasks: [
      {
        id: "pe-form",
        title: "PE form — write your number",
        details: "Hand in tomorrow by 12:40 PM. Bring it to school.",
        due: "2026-05-05",
        priority: "high",
        estimate: 5,
        grade: "classwork",
      },
    ],
  },
  {
    id: "english",
    name: "English 10",
    short: "English",
    type: "Period · English",
    accent: "rose",
    summary: "92.2% — protect this. Big Idea Socratic seminar tomorrow with no book read yet. See Big Idea panel.",
    grade: 92.2,
    assessments: [
      { title: "Big Idea Socratic seminar", date: "2026-05-05", detail: "Tomorrow (Day 1). Quiz grade — graded holistically on prep + discussion + reflection." },
      { title: "Unit 7 quiz", date: "2026-05-08", detail: "Quiz grade." },
      { title: "Cultural Literacy Test", date: "2026-05-14", detail: "Test grade." },
    ],
    tasks: [
      {
        id: "eng-bigidea-prep",
        title: "Big Idea seminar — DELIVERED 5/5",
        details: "Seminar complete. Hex sheet is the active deliverable — see the Big Idea panel.",
        due: "2026-05-05",
        priority: "low",
        estimate: 0,
        defaultDone: true,
        grade: "quiz",
      },
      {
        id: "eng-vocab-booklet-may7",
        title: "Vocab flashcards booklet",
        details: "Due in class 5/7. Distinct from Unit 7 flip book if that was a separate item — confirm on Schoology.",
        due: "2026-05-07",
        priority: "high",
        estimate: 45,
        grade: "classwork",
      },
      {
        id: "eng-flipbook-7",
        title: "Unit 7 flip book",
        details: "Was due 5/5. If still untoggled this is overdue — verify against eng-vocab-booklet-may7 (may be the same assignment with extension).",
        due: "2026-05-05",
        priority: "high",
        estimate: 45,
        grade: "classwork",
      },
      {
        id: "eng-midpoint-quiz",
        title: "Midpoint reading quiz of book",
        details: "Quiz grade — listed for tomorrow on Schoology. Even if it's the wrong date there, study tonight in case.",
        due: "2026-05-05",
        priority: "high",
        estimate: 30,
        grade: "quiz",
      },
      {
        id: "eng-rr3",
        title: "Reader Response #3 — to self-selected song",
        details: "CW grade. Class on 5/8.",
        due: "2026-05-08",
        priority: "medium",
        estimate: 25,
        grade: "classwork",
      },
      {
        id: "eng-song",
        title: "Curate + annotate self-selected song",
        details: "Print lyrics with annotations. HW for 5/6.",
        due: "2026-05-06",
        priority: "medium",
        estimate: 30,
      },
      {
        id: "eng-article",
        title: "Select + annotate article (NYT or WSJ)",
        details: "Class on 5/12 — must be approved by Mrs. Hawkins.",
        due: "2026-05-12",
        priority: "medium",
        estimate: 45,
      },
      {
        id: "eng-clt",
        title: "Cultural Literacy Test",
        details: "Test grade. 5/14–5/15. Use the post-CLT study guide.",
        due: "2026-05-14",
        priority: "medium",
        estimate: 90,
        grade: "test",
      },
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
      "Practice: 10 MCQ from Units 1–2",
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
      "Practice: 10 MCQ on Units 4–5",
    ],
  },
  {
    date: "2026-05-07",
    label: "Day 4 — Thu (chem heat-transfer quiz too — keep balanced)",
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
      "1.1–1.4: Rates of change, polynomial functions",
      "1.5–1.6: Polynomial zeros, multiplicity, end behavior",
      "Practice: 8 problems from progress check",
    ],
  },
  {
    date: "2026-05-05",
    label: "Day 2 — Tue",
    hours: 1.5,
    topics: [
      "1.7–1.10: Rational functions, asymptotes, holes",
      "1.11–1.12: Equivalent representations, transformations",
      "Practice: 10 mixed problems",
    ],
  },
  {
    date: "2026-05-06",
    label: "Day 3 — Wed (Calmedic 1–6 due)",
    hours: 1.5,
    topics: [
      "1.13–1.14: Model selection, application, inverse proportionality",
      "2.1–2.3: Sequences (arithmetic + geometric), exponential basics",
      "Practice: 8 problems",
    ],
  },
  {
    date: "2026-05-07",
    label: "Day 4 — Thu",
    hours: 1.5,
    topics: [
      "2.4–2.7: Exponential properties, modeling, composition",
      "2.8–2.10: Inverses, logarithms, exponential-log relationship",
      "Practice: 8 problems",
    ],
  },
  {
    date: "2026-05-08",
    label: "Day 5 — Fri (Macro exam — light Precalc)",
    hours: 1,
    topics: [
      "2.11–2.13: Log functions, properties, equations",
      "2.14–2.15: Log modeling, semi-log plots",
      "Light review only — protect Macro exam energy",
    ],
  },
  {
    date: "2026-05-09",
    label: "Day 6 — Sat",
    hours: 2,
    topics: [
      "3.1–3.6: Periodic functions, unit circle, sin/cos graphs + transformations",
      "Practice: 12 trig problems",
    ],
  },
  {
    date: "2026-05-10",
    label: "Day 7 — Sun",
    hours: 2,
    topics: [
      "3.7–3.12: Sinusoidal modeling, tangent, inverse trig, identities",
      "3.13–3.15: Polar coordinates, polar graphs, polar rates of change",
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
