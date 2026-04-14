const STORAGE_KEY = "work_management_state_v1";
const PDF_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const APP_TODAY = startOfDay(new Date());

const PRIORITY_META = {
  critical: { label: "Critical", weight: 430 },
  high: { label: "High", weight: 330 },
  medium: { label: "Medium", weight: 230 },
  low: { label: "Low", weight: 140 }
};

const SUBJECT_META = {
  precalc: { theme: "blue", short: "Precalc", type: "AP Course" },
  marketing: { theme: "amber", short: "Marketing", type: "Business Course" },
  chemistry: { theme: "green", short: "Chemistry", type: "Science Course" },
  macro: { theme: "blue", short: "AP Macro", type: "AP Course" },
  english: { theme: "slate", short: "English 10", type: "English Course" }
};

const APP_CONFIG = {
  academicStage: "Quarter 4 of sophomore year",
  apSprintEnd: "2026-05-02",
  iboSprintStart: "2026-05-09",
  iboGrandTestOpen: "2026-08-08",
  satTestDate: "2026-10-03"
};

const BASE_CLASSROOMS = [
  {
    id: "precalc",
    name: "AP Precalculus",
    theme: "blue",
    summary: "Immediate classroom priority: your polar functions test is on Friday, April 17, 2026.",
    note: "This class needs the clearest short-term study lane right now. The AP exam track still exists, but your classroom test comes first this week.",
    assessments: [
      {
        title: "Polar functions test",
        date: "2026-04-17",
        detail: "Trigonometry, polar coordinates, polar graphs, relative extrema, and rates of change in polar functions."
      }
    ],
    tasks: [
      {
        id: "precalc-313-review",
        title: "Review 3.13 notes and conversion practice",
        details: "Practice polar to rectangular, rectangular to polar, and complex numbers in both rectangular and polar form.",
        due: "2026-04-14",
        priority: "high",
        estimate: 45
      },
      {
        id: "precalc-314-graphs",
        title: "Review 3.14 polar graph examples",
        details: "Study the common shapes, how to create polar curves, and the characteristics you should recognize quickly.",
        due: "2026-04-15",
        priority: "high",
        estimate: 45
      },
      {
        id: "precalc-315-rates",
        title: "Review 3.15 rates of change in polar functions",
        details: "Focus on distance from the origin, relative extrema, and average rate of change in polar functions.",
        due: "2026-04-16",
        priority: "high",
        estimate: 45
      },
      {
        id: "precalc-mixed-practice",
        title: "Run one mixed no-notes polar practice set",
        details: "Combine conversions, graph identification, extrema, and average rate of change so Friday feels familiar instead of new.",
        due: "2026-04-16",
        priority: "critical",
        estimate: 60
      }
    ]
  },
  {
    id: "marketing",
    name: "Marketing 1",
    theme: "amber",
    summary: "No active assignments were given in your note, so this stays intentionally clean for now.",
    note: "Leaving this light is the right move until your teacher adds something real.",
    assessments: [],
    tasks: []
  },
  {
    id: "chemistry",
    name: "Chemistry 1 Honors",
    theme: "green",
    summary: "Chemistry has the heaviest assignment pile right now, including tomorrow's quiz and your research project writing.",
    note: "Anything you were unsure about stays visible and unchecked so the dashboard does not silently hide work from you.",
    assessments: [
      {
        title: "Classifying matter chem quiz",
        date: "2026-04-14",
        detail: "Due tomorrow, Tuesday, April 14, 2026."
      },
      {
        title: "Matter and Gas Laws test",
        date: "2026-04-24",
        detail: "Scheduled for Friday, April 24, 2026."
      },
      {
        title: "Final research paper",
        date: "2026-05-15",
        detail: "Hard deadline on Friday, May 15, 2026."
      }
    ],
    tasks: [
      {
        id: "chem-revised-intro",
        title: "Independent research project revised intro",
        details: "Highest chemistry priority right now. Treat this as the first major chemistry writing block to clear.",
        due: "2026-04-13",
        dueLabel: "ASAP",
        priority: "critical",
        estimate: 60
      },
      {
        id: "chem-virtual-lab-postlab",
        title: "Virtual lab gas laws post-lab assessment",
        details: "Keep this visible until you confirm it is done.",
        priority: "medium",
        estimate: 30
      },
      {
        id: "chem-gas-laws-practice",
        title: "Gas laws chem quiz practice",
        details: "Use this as your warm-up before the classifying matter quiz or any gas law check-ins.",
        priority: "medium",
        estimate: 30
      },
      {
        id: "chem-gas-laws-checkin",
        title: "Check-in gas laws",
        details: "Already marked complete from your note.",
        priority: "low",
        estimate: 10,
        defaultDone: true
      },
      {
        id: "chem-ideal-gas-practice",
        title: "Ideal gas laws practice level 1 to 2",
        details: "This stays active because you confirmed it is not complete.",
        priority: "medium",
        estimate: 35
      },
      {
        id: "chem-ideal-gas-checkin",
        title: "Check-in ideal gas law",
        details: "Already marked complete from your note.",
        priority: "low",
        estimate: 10,
        defaultDone: true
      },
      {
        id: "chem-partial-pressure-think-share",
        title: "Partial pressure think and share classwork",
        details: "Still incomplete and worth keeping in plain view.",
        priority: "medium",
        estimate: 20
      },
      {
        id: "chem-partial-pressure-practice",
        title: "Partial pressure practice classwork",
        details: "Still incomplete and ready to be checked once you confirm it is finished.",
        priority: "medium",
        estimate: 20
      },
      {
        id: "chem-partial-pressure-check",
        title: "Partial pressure check",
        details: "Already marked complete from your note.",
        priority: "low",
        estimate: 10,
        defaultDone: true
      },
      {
        id: "chem-classifying-matter-quiz",
        title: "Classifying matter chem quiz",
        details: "This is due tomorrow, so it belongs near the top of Today until it is finished.",
        due: "2026-04-14",
        priority: "critical",
        estimate: 30
      },
      {
        id: "chem-final-research-paper",
        title: "Final research paper",
        details: "Longer runway, but keep steady progress so the May 15 deadline does not get crowded later.",
        due: "2026-05-15",
        priority: "high",
        estimate: 90
      },
      {
        id: "chem-matter-gas-laws-test-prep",
        title: "Matter and Gas Laws chemistry test prep",
        details: "Review classifying matter and gas law calculations for the Friday, April 24, 2026 test.",
        due: "2026-04-24",
        priority: "high",
        estimate: 60
      }
    ]
  },
  {
    id: "macro",
    name: "AP Macroeconomics",
    theme: "blue",
    summary: "Your Unit 6 test is on Thursday, April 16, 2026, so Macro needs attention this week even if the review folder is already handled.",
    note: "The class test and the AP exam plan are different lanes. Today prioritizes the test first and the AP roadmap continues underneath it.",
    assessments: [
      {
        title: "Unit 6 test",
        date: "2026-04-16",
        detail: "30 MCQ and 2 FRQ on Thursday, April 16, 2026."
      },
      {
        title: "Practice MCQ checkpoint",
        date: "2026-04-28",
        detail: "Practice MCQ exam checkpoint."
      },
      {
        title: "Practice FRQ checkpoint",
        date: "2026-04-30",
        detail: "Practice FRQ exam checkpoint."
      }
    ],
    tasks: [
      {
        id: "macro-unit-6-test-prep",
        title: "Prepare for the Unit 6 test",
        details: "Focus on the 30 MCQ plus 2 FRQ format so Thursday feels structured, not rushed.",
        due: "2026-04-16",
        priority: "high",
        estimate: 60
      },
      {
        id: "macro-review-folder",
        title: "Review folder",
        details: "This was completed in class, so it is shown as done by default.",
        due: "2026-04-24",
        priority: "low",
        estimate: 15,
        defaultDone: true
      },
      {
        id: "macro-practice-mcq",
        title: "Practice MCQ exam",
        details: "Keep this visible for the April 28 checkpoint.",
        due: "2026-04-28",
        priority: "medium",
        estimate: 45
      },
      {
        id: "macro-practice-frq",
        title: "Practice FRQ exam",
        details: "Keep this visible for the April 30 checkpoint.",
        due: "2026-04-30",
        priority: "medium",
        estimate: 45
      }
    ]
  },
  {
    id: "english",
    name: "English 10",
    theme: "slate",
    summary: "English has several cleanly dated deliverables, so it fits nicely into the Today queue.",
    note: "Later context can deepen this page, but the current due dates are already wired in so you are not carrying them in your head.",
    assessments: [
      {
        title: "Unit 6 quiz",
        date: "2026-04-28",
        detail: "Scheduled for Tuesday, April 28, 2026."
      },
      {
        title: "Midpoint reading quiz",
        date: "2026-05-04",
        detail: "Scheduled for Monday, May 4, 2026."
      }
    ],
    tasks: [
      {
        id: "english-essential-question",
        title: "Select your essential question for the big idea project",
        details: "Due Wednesday, April 15, 2026.",
        due: "2026-04-15",
        priority: "high",
        estimate: 30
      },
      {
        id: "english-poem-print",
        title: "Print an unedited copy of your selected poem",
        details: "Due Friday, April 17, 2026.",
        due: "2026-04-17",
        priority: "medium",
        estimate: 10
      },
      {
        id: "english-unit-6-flip-book",
        title: "Unit 6 flip book",
        details: "Due Wednesday, April 22, 2026.",
        due: "2026-04-22",
        priority: "medium",
        estimate: 60
      },
      {
        id: "english-unit-6-quiz-prep",
        title: "Unit 6 quiz prep",
        details: "Keep some prep time open before the quiz on April 28.",
        due: "2026-04-28",
        priority: "medium",
        estimate: 45
      },
      {
        id: "english-reader-response-2",
        title: "Reader response #2 book timed response class grade",
        details: "Also due Tuesday, April 28, 2026.",
        due: "2026-04-28",
        priority: "medium",
        estimate: 40
      },
      {
        id: "english-midpoint-reading-quiz",
        title: "Midpoint reading quiz on the selected book",
        details: "Scheduled for Monday, May 4, 2026.",
        due: "2026-05-04",
        priority: "medium",
        estimate: 45
      }
    ]
  }
];

const TSA_SECTION = {
  id: "tsa",
  name: "TSA",
  theme: "amber",
  summary: "Four TSA challenges are now tracked with hard deadlines so you can execute without hunting for what is next.",
  note: "All TSA work starts today (Tuesday, April 14, 2026) and targets completion by Wednesday, April 30, 2026.",
  assessments: [
    { title: "Physical paper forms submitted", date: "2026-04-15", detail: "Due Wednesday, April 15, 2026. Get signatures today." },
    { title: "$40 adjustment fee paid", date: "2026-04-15", detail: "Due Wednesday, April 15, 2026 by midnight." },
    { title: "Digital forms submitted", date: "2026-04-20", detail: "Due Monday, April 20, 2026." },
    { title: "All TSA challenge deliverables complete", date: "2026-04-30", detail: "Hard completion target for all four challenges." },
    { title: "On-demand video event prep complete", date: "2026-04-30", detail: "Prepare for on-site production window (36 hours)." }
  ],
  tasks: [
    { id: "tsa-dvp-plan-video", title: "Digital Video Production: plan full video", details: "Finalize concept, storyboard, timing, and required scenes.", due: "2026-04-18", priority: "high", estimate: 90 },
    { id: "tsa-dvp-cgi", title: "Digital Video Production: create CGI components", details: "Produce needed CGI assets and integration plan.", due: "2026-04-22", priority: "high", estimate: 120 },
    { id: "tsa-dvp-film", title: "Digital Video Production: film clips", details: "Capture all planned footage with backup takes.", due: "2026-04-24", priority: "high", estimate: 120 },
    { id: "tsa-dvp-edit", title: "Digital Video Production: edit final video", details: "Complete rough cut, revisions, and final export.", due: "2026-04-28", priority: "critical", estimate: 150 },
    { id: "tsa-dvp-portfolio", title: "Digital Video Production: portfolio", details: "Build and polish the portfolio package tied to the challenge.", due: "2026-04-29", priority: "high", estimate: 90 },
    { id: "tsa-dvp-interview", title: "Digital Video Production: interview prep", details: "Rehearse talking points, process decisions, and outcomes.", due: "2026-04-30", priority: "high", estimate: 60 },

    { id: "tsa-smm-plan-scenes", title: "STEM Mass Media: plan shots and scenes", details: "Lock shot list, sequence, and required story beats.", due: "2026-04-18", priority: "high", estimate: 80 },
    { id: "tsa-smm-props", title: "STEM Mass Media: prop collection", details: "Source and verify all required props before filming.", due: "2026-04-20", priority: "high", estimate: 60 },
    { id: "tsa-smm-film", title: "STEM Mass Media: filming", details: "Capture all needed footage with continuity checks.", due: "2026-04-24", priority: "high", estimate: 120 },
    { id: "tsa-smm-edit", title: "STEM Mass Media: edit final cut", details: "Produce polished final edit and verify requirements.", due: "2026-04-28", priority: "critical", estimate: 150 },
    { id: "tsa-smm-portfolio", title: "STEM Mass Media: portfolio", details: "Finalize portfolio artifacts and explanatory notes.", due: "2026-04-29", priority: "high", estimate: 90 },
    { id: "tsa-smm-semifinal", title: "STEM Mass Media: semifinal problem prep", details: "Practice responses and workflow for semifinal prompts.", due: "2026-04-30", priority: "high", estimate: 70 },

    { id: "tsa-sss-solar-car", title: "Senior Solar Sprint: verify solar car completion", details: "Double-check build quality, function, and compliance.", due: "2026-04-22", priority: "high", estimate: 90 },
    { id: "tsa-sss-podium", title: "Senior Solar Sprint: design shoebox podium", details: "Create a strong visual podium presentation for the car.", due: "2026-04-25", priority: "medium", estimate: 120 },
    { id: "tsa-sss-portfolio", title: "Senior Solar Sprint: flawless portfolio", details: "Refine structure, visuals, and quality of the final portfolio.", due: "2026-04-29", priority: "critical", estimate: 90 },
    { id: "tsa-sss-interview", title: "Senior Solar Sprint: interview prep", details: "Practice concise explanations and technical rationale.", due: "2026-04-30", priority: "high", estimate: 60 },

    { id: "tsa-odv-practice", title: "On-demand video: timed production practice", details: "Train for the on-site format and 36-hour turnaround.", due: "2026-04-30", priority: "high", estimate: 120 },

    { id: "tsa-paper-forms-sign", title: "Get physical paper forms signed today", details: "Required today so forms can be submitted tomorrow.", due: "2026-04-14", priority: "critical", estimate: 30 },
    { id: "tsa-paper-forms-submit", title: "Submit physical paper forms", details: "Due Wednesday, April 15, 2026.", due: "2026-04-15", priority: "critical", estimate: 20 },
    { id: "tsa-adjustment-fee", title: "Pay $40 adjustment fee", details: "Due Wednesday, April 15, 2026 by midnight.", due: "2026-04-15", priority: "critical", estimate: 15 },
    { id: "tsa-digital-forms", title: "Submit digital forms", details: "Due Monday, April 20, 2026.", due: "2026-04-20", priority: "high", estimate: 30 }
  ]
};

const AP_DAYS = [
  {
    day: 1,
    date: "2026-04-14",
    label: "Day 1",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 1.3-1.4: Polynomial Functions",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=1",
        topics: [
          "1.3 Rates of change in linear and quadratic functions",
          "1.4 Polynomial functions and rates of change, local maxima and minima, inflection points"
        ]
      },
      {
        subject: "macro",
        title: "Macro 1.3-1.4: Trade and Demand",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=1",
        topics: [
          "1.3 Comparative advantage vs. absolute advantage, gains from trade",
          "1.4 Demand law, factors that shift demand vs. movements along the curve"
        ]
      }
    ]
  },
  {
    day: 2,
    date: "2026-04-15",
    label: "Day 2",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 1.5-1.6: Polynomial Zeros and End Behavior",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=1",
        topics: [
          "1.5 Polynomial zeros, including real and complex roots, plus multiplicity and graph behavior",
          "1.6 End behavior of polynomials from the leading term"
        ]
      },
      {
        subject: "macro",
        title: "Macro 1.5-1.6: Supply and Equilibrium",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=1",
        topics: [
          "1.5 Supply law, shifts of supply vs. movements along the curve",
          "1.6 Market equilibrium, shortages, surpluses, and price adjustment"
        ]
      }
    ]
  },
  {
    day: 3,
    date: "2026-04-16",
    label: "Day 3",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 1.7-1.9: Rational Functions",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=1",
        topics: [
          "1.7 Rational functions and end behavior, including horizontal asymptotes",
          "1.8 Rational functions: zeros and sign analysis",
          "1.9 Rational functions: vertical asymptotes"
        ]
      },
      {
        subject: "macro",
        title: "Macro 2.1: GDP and Circular Flow",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=2",
        topics: ["2.1 Circular flow model, GDP definition, and the components C + I + G + NX"]
      }
    ]
  },
  {
    day: 4,
    date: "2026-04-17",
    label: "Day 4",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 1.10-1.12: Holes and Transformations",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=1",
        topics: [
          "1.10 Rational functions and holes, comparing multiplicity in the numerator and denominator",
          "1.11 Equivalent representations of polynomial and rational expressions",
          "1.12 Transformations of functions, both additive and multiplicative"
        ]
      },
      {
        subject: "macro",
        title: "Macro 2.2-2.3: GDP Limitations and Unemployment",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=2",
        topics: [
          "2.2 Limitations of GDP and why GDP is not enough for measuring welfare",
          "2.3 Unemployment measurement, labor force participation, and the major unemployment types"
        ]
      }
    ]
  },
  {
    day: 5,
    date: "2026-04-18",
    label: "Day 5",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 1.13-1.14: Model Selection and Application",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=1",
        topics: [
          "1.13 Function model selection based on data patterns and assumptions",
          "1.14 Function model construction and application, including inverse proportionality"
        ]
      },
      {
        subject: "macro",
        title: "Macro 2.4-2.5: Inflation and Interest Rates",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=2",
        topics: [
          "2.4 CPI, inflation rate calculation, and deflating nominal values",
          "2.5 Costs of inflation and the Fisher equation"
        ]
      }
    ]
  },
  {
    day: 6,
    date: "2026-04-19",
    label: "Day 6",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 2.1-2.3: Sequences and Exponential Functions",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=2",
        topics: [
          "2.1 Change in arithmetic and geometric sequences",
          "2.2 Change in linear and exponential functions, including constant percent change",
          "2.3 Exponential functions in general form, with growth and decay"
        ]
      },
      {
        subject: "macro",
        title: "Macro 2.6-2.7: Real GDP and Business Cycles",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=2",
        topics: [
          "2.6 Real vs. nominal GDP and the GDP deflator",
          "2.7 Business cycles: expansion, contraction, peak, and trough"
        ]
      }
    ]
  },
  {
    day: 7,
    date: "2026-04-20",
    label: "Day 7",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 2.4-2.6: Exponential Properties and Models",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=2",
        topics: [
          "2.4 Exponential function manipulation with negative and fractional exponents",
          "2.5 Exponential function context and data modeling",
          "2.6 Validating competing models such as linear vs. exponential vs. quadratic"
        ]
      },
      {
        subject: "macro",
        title: "Macro 3.1-3.2: Aggregate Demand and Multipliers",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=3",
        topics: [
          "3.1 Aggregate demand curve and its four shifters",
          "3.2 Spending multiplier, tax multiplier, and balanced-budget multiplier"
        ]
      }
    ]
  },
  {
    day: 8,
    date: "2026-04-21",
    label: "Day 8",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 2.7-2.9: Composition and Logarithms",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=2",
        topics: [
          "2.7 Composition of functions across multiple representations",
          "2.8 Inverse functions, invertibility, and notation",
          "2.9 Logarithmic expressions with exact and estimated values"
        ]
      },
      {
        subject: "macro",
        title: "Macro 3.3-3.4: SRAS and LRAS",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=3",
        topics: [
          "3.3 Short-run aggregate supply and its shifters",
          "3.4 Long-run aggregate supply and potential output"
        ]
      }
    ]
  },
  {
    day: 9,
    date: "2026-04-22",
    label: "Day 9",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 2.10-2.12: Log Functions and Properties",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=2",
        topics: [
          "2.10 Inverses of exponential functions and the logarithmic relationship",
          "2.11 Logarithmic functions including domain, range, translations, and end behavior",
          "2.12 Product, quotient, and power rules for logarithms"
        ]
      },
      {
        subject: "macro",
        title: "Macro 3.5-3.6: AD-AS Equilibrium and Shocks",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=3",
        topics: [
          "3.5 Equilibrium in the AD-AS model and recessionary vs. inflationary gaps",
          "3.6 Demand shocks, supply shocks, and demand-pull vs. cost-push inflation"
        ]
      }
    ]
  }
];

const IBO_DATES = [
  { id: "may16", date: "2026-05-16", label: "May 16 checkpoint", detail: "Early checkpoint: are you ahead of schedule on Chapter 1?", theme: "blue" },
  { id: "reg-reminder", date: "2026-07-11", label: "Registration reminder", detail: "Two weeks until registration closes on July 25.", theme: "amber" },
  { id: "reg-close", date: "2026-07-25", label: "Registration closes", detail: "Final deadline for team registration and submission.", theme: "red" },
  { id: "grand-test-ready", date: "2026-08-03", label: "Grand Test ready date", detail: "Shift to final review only. No major new content after this point.", theme: "blue" },
  { id: "grand-test-open", date: "2026-08-08", label: "Global Grand Test opens", detail: "150 minutes, 300 MCQ, individual exam window from August 8 to August 14.", theme: "red" }
];

const IBO_CHAPTERS = [
  {
    id: "ch1",
    title: "Chapter 1 - Financial Management",
    phase: 1,
    dateRange: "May 9 to May 16",
    priority: "critical",
    topics: [
      "Income statement structure: revenue, COGS, gross profit, EBIT, net income",
      "Balance sheet structure and the assets = liabilities + equity equation",
      "Cash flow: CFO, CFI, CFF, including non-cash adjustments",
      "Liquidity: current ratio and quick ratio",
      "Profitability: gross margin, ROE, DuPont decomposition",
      "Solvency: debt-to-equity interpretation"
    ]
  },
  {
    id: "ch2",
    title: "Chapter 2 - Marketing and Sales",
    phase: 1,
    dateRange: "May 17 to May 24",
    priority: "critical",
    topics: [
      "STP: segmentation, targeting, positioning",
      "4 Ps: product, price, place, promotion",
      "Distribution strategies and promotion mix",
      "Consumer decision process",
      "CRM metrics and digital marketing",
      "Social platform fit by audience and content type"
    ]
  },
  {
    id: "ch3",
    title: "Chapter 3 - Entrepreneurship",
    phase: 1,
    dateRange: "May 25 to June 1",
    priority: "high",
    topics: [
      "Entrepreneur types and idea validation",
      "Business Model Canvas",
      "Revenue models",
      "Break-even and contribution margin",
      "Funding ladder",
      "Ansoff matrix and pivot types"
    ]
  },
  {
    id: "ch4",
    title: "Chapter 4 - Administration and Management",
    phase: 1,
    dateRange: "June 2 to June 9",
    priority: "high",
    topics: [
      "HRM cycle and onboarding frameworks",
      "Interview types and STAR responses",
      "Training evaluation and performance systems",
      "Conflict styles and lean wastes",
      "EOQ and earned value metrics",
      "Project scheduling frameworks"
    ]
  },
  {
    id: "ch5",
    title: "Chapter 5 - Global Business",
    phase: 1,
    dateRange: "June 10 to June 17",
    priority: "high",
    topics: [
      "Trade theories",
      "Porter diamond",
      "Market entry risk/control ladder",
      "Trade blocs",
      "Culture frameworks",
      "Foreign exchange impacts"
    ]
  },
  {
    id: "ch6",
    title: "Chapter 6 - Strategic Planning",
    phase: 1,
    dateRange: "June 18 to June 25",
    priority: "critical",
    topics: [
      "Vision vs. mission vs. objectives",
      "SWOT, TOWS, and PESTLE",
      "Porter five forces and generic strategies",
      "VRIO and decision models",
      "Cognitive biases",
      "Change models and innovation types"
    ]
  },
  {
    id: "ch7",
    title: "Chapter 7 - Business Ethics and CSR",
    phase: 1,
    dateRange: "June 26 to July 3",
    priority: "medium",
    topics: [
      "Carroll's CSR pyramid",
      "Ethical frameworks",
      "Corporate governance",
      "ESG and emissions scopes",
      "Stakeholder mapping",
      "CSR reporting frameworks and greenwashing"
    ]
  }
];

AP_DAYS.push(
  {
    day: 10,
    date: "2026-04-23",
    label: "Day 10",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 2.13-2.15: Log Equations and Semi-log Plots",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=2",
        topics: [
          "2.13 Exponential and logarithmic equations and inequalities",
          "2.14 Logarithmic function contexts and data modeling",
          "2.15 Semi-log plots and how to interpret them"
        ]
      },
      {
        subject: "macro",
        title: "Macro 3.7-3.9: Self-Adjustment and Fiscal Policy",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=3",
        topics: [
          "3.7 Long-run self-adjustment from recessionary and inflationary gaps",
          "3.8 Expansionary and contractionary fiscal policy",
          "3.9 Automatic stabilizers"
        ]
      }
    ]
  },
  {
    day: 11,
    date: "2026-04-24",
    label: "Day 11",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 3.1-3.3: Periodic Functions and Unit Circle",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=3",
        topics: [
          "3.1 Periodic phenomena",
          "3.2 Sine, cosine, tangent, radian measure, and terminal rays",
          "3.3 Exact sine and cosine values from special triangles"
        ]
      },
      {
        subject: "macro",
        title: "Macro 4.1-4.2: Financial Assets and Interest Rates",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=4",
        topics: [
          "4.1 Financial assets such as bonds and money",
          "4.2 Nominal vs. real interest rates and the opportunity cost of holding money"
        ]
      }
    ]
  },
  {
    day: 12,
    date: "2026-04-25",
    label: "Day 12",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 3.4-3.6: Sine and Cosine Graphs",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=3",
        topics: [
          "3.4 Sine and cosine graphs and their properties",
          "3.5 Sinusoidal functions tied to the unit circle",
          "3.6 Transformations of sinusoidal functions"
        ]
      },
      {
        subject: "macro",
        title: "Macro 4.3-4.5: Money Supply and the Money Market",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=4",
        topics: [
          "4.3 Functions and definitions of money, including M1 and M2",
          "4.4 Fractional reserve banking and money supply expansion",
          "4.5 The money market and shifts in supply and demand"
        ]
      }
    ]
  },
  {
    day: 13,
    date: "2026-04-26",
    label: "Day 13",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 3.7-3.9: Sinusoidal Models and Tangent",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=3",
        topics: [
          "3.7 Construct sinusoidal functions from context and data",
          "3.8 Tangent function graphs and transformations",
          "3.9 Inverse trigonometric functions"
        ]
      },
      {
        subject: "macro",
        title: "Macro 4.6-4.7: Monetary Policy and Loanable Funds",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=4",
        topics: [
          "4.6 Fed tools and monetary policy effects",
          "4.7 Loanable funds market and interest rate shifts"
        ]
      }
    ]
  },
  {
    day: 14,
    date: "2026-04-27",
    label: "Day 14",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 3.10-3.12: Trig Equations and Identities",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=3",
        topics: [
          "3.10 Solve trig equations and inequalities with inverse functions",
          "3.11 Reciprocal trig functions and their graphs",
          "3.12 Equivalent trig representations and identities"
        ]
      },
      {
        subject: "macro",
        title: "Macro 5.1-5.3: Phillips Curve and Inflation",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=5",
        topics: [
          "5.1 Fiscal and monetary policy actions in the short run",
          "5.2 Short-run and long-run Phillips Curve",
          "5.3 Money growth and inflation using MV = PQ"
        ]
      }
    ]
  },
  {
    day: 15,
    date: "2026-04-28",
    label: "Day 15",
    timeLabel: "2 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc 3.13-3.15: Polar Functions",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/117/home?unit=3",
        topics: [
          "3.13 Polar coordinates, trig relationships, and complex numbers in polar form",
          "3.14 Polar graphs, basic curves, and common graph characteristics",
          "3.15 Rates of change in polar functions, including distance from the origin and relative extrema"
        ]
      },
      {
        subject: "macro",
        title: "Macro 5.4-5.7: Deficits, Crowding Out, and Growth",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=5",
        topics: [
          "5.4 Government deficits and national debt",
          "5.5 Crowding out in loanable funds and AD-AS",
          "5.6 Economic growth and productivity",
          "5.7 Public policy and economic growth"
        ]
      }
    ]
  },
  {
    day: 16,
    date: "2026-04-29",
    label: "Day 16",
    timeLabel: "4 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Precalc full review",
        time: "2h",
        link: "https://apclassroom.collegeboard.org/117/home",
        topics: [
          "Sketch polynomial, rational, exponential, logarithmic, sinusoidal, and polar graphs from memory",
          "Brain dump formulas, asymptotes, identities, and inverse relationships",
          "Complete AP Classroom progress checks for Units 1 to 3 under timed conditions"
        ]
      },
      {
        subject: "macro",
        title: "Macro 6.1-6.6 and full review",
        time: "2h",
        link: "https://apclassroom.collegeboard.org/10/home?unit=6",
        topics: [
          "6.1 Balance of payments accounts",
          "6.2 Exchange rates",
          "6.3 Foreign exchange market",
          "6.4 Policy and economic conditions that shift exchange rates",
          "6.5 Net exports and foreign exchange shifts",
          "6.6 Real interest rates and international capital flows"
        ]
      }
    ]
  },
  {
    day: 17,
    date: "2026-04-30",
    label: "Day 17",
    timeLabel: "5 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Final prep day 1: full practice exams",
        time: "5h",
        link: "https://apclassroom.collegeboard.org/",
        topics: [
          "Take a complete AP Precalculus FRQ plus MCQ set under full timed conditions",
          "Take a complete AP Macroeconomics FRQ plus MCQ set under full timed conditions",
          "Score both honestly and create the target list for the next day"
        ]
      }
    ]
  },
  {
    day: 18,
    date: "2026-05-01",
    label: "Day 18",
    timeLabel: "3 hours total",
    blocks: [
      {
        subject: "precalc",
        title: "Final prep day 2: targeted error review",
        time: "3h",
        link: "https://apclassroom.collegeboard.org/",
        topics: [
          "Rework every missed question and understand why it was missed",
          "Rewrite macro graphs and precalc formulas from memory",
          "Use AP Classroom only for the weakest remaining units"
        ]
      }
    ]
  },
  {
    day: 19,
    date: "2026-05-02",
    label: "Day 19",
    timeLabel: "1 hour total",
    blocks: [
      {
        subject: "precalc",
        title: "Final prep day 3: light and confident",
        time: "1h",
        link: "https://apclassroom.collegeboard.org/",
        topics: [
          "Quick formula scan only and no new learning",
          "Morning brain dump, then stop",
          "Protect sleep, energy, and confidence"
        ]
      }
    ]
  }
);

const IBO_BOOKS = [
  { id: "trusted-advisor", title: "The Trusted Advisor", author: "David Maister", phase: 2, why: "Foundation for client and judge trust, especially in case presentations." },
  { id: "crack-the-case", title: "Crack the Case", author: "David Ohrvall", phase: 2, why: "Direct case interview prep with fast structure practice." },
  { id: "case-in-point", title: "Case In Point", author: "Marc Cosentino", phase: 2, why: "Comprehensive case prep and framework coverage." },
  { id: "the-mckinsey-way", title: "The McKinsey Way", author: "Ethan Rasiel", phase: 2, why: "Problem-solving approach that transfers well to IBO cases." },
  { id: "the-pyramid-principle", title: "The Pyramid Principle", author: "Barbara Minto", phase: 2, why: "Sharper thinking and communication for presentations and analysis." },
  { id: "strategy-management", title: "Strategy Management", author: "Thompson and Strickland", phase: 3, why: "Deep strategic management reinforcement for Chapter 6." },
  { id: "bcg-on-strategy", title: "BCG on Strategy", author: "C. Stern and M. Deimler", phase: 3, why: "Real consulting strategy perspectives and frameworks." },
  { id: "say-it-with-charts", title: "Say it with Charts", author: "Gene Zelazny", phase: 3, why: "Essential for case slide communication and chart clarity." },
  { id: "unfolding-the-napkins", title: "Unfolding the Napkins", author: "Dan Roam", phase: 3, why: "Visual thinking for quick open-case structure." },
  { id: "visualizing-this", title: "Visualizing This", author: "Nathan Yau", phase: 3, why: "Data visualization best practices for better slides." },
  { id: "slideology", title: "Slide:ology", author: "Nancy Duarte", phase: 3, why: "Presentation design polish for the final video case." }
].map((book) => ({ ...book, path: `assets/ibo/books/${book.id}.pdf` }));

const IBO_CASES = [
  { id: "case1", title: "Objective case: data interpretation", detail: "Read a table or chart and answer inference questions in under 45 seconds each." },
  { id: "case2", title: "Objective case: calculation questions", detail: "Financial ratios, market growth percent, market share calculations." },
  { id: "case3", title: "Objective case: framework application", detail: "Spot which framework applies from a short scenario in under 10 seconds." },
  { id: "case4", title: "Open case: structure with SCORE method", detail: "Situation, complication, options, recommendation, evidence." },
  { id: "case5", title: "Open case: market entry analysis", detail: "Practice options matrices, risks, and recommendations." },
  { id: "case6", title: "Open case: financial analysis", detail: "Diagnose issues from a P&L or balance sheet and recommend actions." },
  { id: "case7", title: "Presentation: 7-minute video format", detail: "Hook, situation, analysis, recommendation, risks, close." },
  { id: "case8", title: "Speed drill: 300 questions in 150 minutes", detail: "Train toward 2 questions per minute with buffer." },
  { id: "case9", title: "Mock full exam: timed 150 minutes", detail: "Run a full simulation and review every miss with root-cause analysis." },
  { id: "case10", title: "Team case: roles assigned and rehearsed", detail: "Assign clear roles and run full dry runs before August 15." }
];

const IBO_RESOURCE_SLOTS = [
  { title: "IBO syllabus", path: "assets/ibo/resources/ibo-syllabus.pdf", detail: "Reserved slot for the syllabus PDF so the repo keeps the reference in one place." },
  { title: "Sample objective case", path: "assets/ibo/resources/sample-objective-case.pdf", detail: "Reserved slot for your interactive objective case sample." },
  { title: "Sample open case analysis", path: "assets/ibo/resources/sample-open-case-analysis.pdf", detail: "Reserved slot for your open case sample and future drills." }
];

const SAT_TRACKS = {
  math: [
    { id: "sat-sm1", title: "Algebra", detail: "Linear equations, systems, inequalities, linear functions", estimate: "8h", link: "https://www.khanacademy.org/test-prep/v2-sat/x0fcc98a58ba3bea7:digital-sat-math" },
    { id: "sat-sm2", title: "Advanced Math", detail: "Quadratics, polynomials, exponentials, radical and rational equations", estimate: "10h", link: "https://www.khanacademy.org/test-prep/v2-sat/x0fcc98a58ba3bea7:digital-sat-math" },
    { id: "sat-sm3", title: "Problem Solving and Data", detail: "Ratios, percentages, statistics, probability, data tables", estimate: "8h", link: "https://www.khanacademy.org/test-prep/v2-sat/x0fcc98a58ba3bea7:digital-sat-math" },
    { id: "sat-sm4", title: "Geometry and Trig", detail: "Area, volume, circles, right triangles, coordinate geometry", estimate: "8h", link: "https://www.khanacademy.org/test-prep/v2-sat/x0fcc98a58ba3bea7:digital-sat-math" },
    { id: "sat-sm5", title: "Full Math Practice Tests", detail: "Timed full sections, official tests, error log", estimate: "10h", link: "https://www.khanacademy.org/test-prep/v2-sat" }
  ],
  rw: [
    { id: "sat-rw1", title: "Information and Ideas", detail: "Central ideas, evidence, inferences from text", estimate: "6h", link: "https://www.khanacademy.org/test-prep/v2-sat/x0fcc98a58ba3bea7:digital-sat-reading-and-writing" },
    { id: "sat-rw2", title: "Craft and Structure", detail: "Words in context, text structure, cross-text analysis", estimate: "6h", link: "https://www.khanacademy.org/test-prep/v2-sat/x0fcc98a58ba3bea7:digital-sat-reading-and-writing" },
    { id: "sat-rw3", title: "Expression of Ideas", detail: "Rhetorical synthesis, transitions, adding relevant information", estimate: "5h", link: "https://www.khanacademy.org/test-prep/v2-sat/x0fcc98a58ba3bea7:digital-sat-reading-and-writing" },
    { id: "sat-rw4", title: "Standard English Conventions", detail: "Run-ons, fragments, subject-verb agreement, punctuation", estimate: "7h", link: "https://www.khanacademy.org/test-prep/v2-sat/x0fcc98a58ba3bea7:digital-sat-reading-and-writing" },
    { id: "sat-rw5", title: "Full Reading and Writing Practice Tests", detail: "Timed sections, annotation technique, process of elimination", estimate: "8h", link: "https://www.khanacademy.org/test-prep/v2-sat" }
  ]
};

const VOCAB = [
  { word: "Abate", definition: "To reduce in intensity or amount", example: "The storm gradually abated." },
  { word: "Ameliorate", definition: "To make something bad better", example: "New policies ameliorated the crisis." },
  { word: "Ambiguous", definition: "Open to multiple interpretations", example: "The wording was frustratingly ambiguous." },
  { word: "Austere", definition: "Severe, plain, or without luxury", example: "The room had an austere simplicity." },
  { word: "Bolster", definition: "To support or strengthen", example: "Evidence bolstered her argument." },
  { word: "Brevity", definition: "Concise expression; shortness", example: "Brevity is the soul of wit." },
  { word: "Candid", definition: "Truthful and straightforward", example: "She gave a candid assessment." },
  { word: "Circumspect", definition: "Careful and cautious", example: "He was circumspect before committing." },
  { word: "Contentious", definition: "Causing controversy or argument", example: "It remains a contentious topic." },
  { word: "Corroborate", definition: "To confirm with evidence", example: "Witnesses corroborated her story." },
  { word: "Deference", definition: "Respectful submission to another", example: "He bowed in deference to the elder." },
  { word: "Didactic", definition: "Intended to teach or instruct", example: "The novel had a didactic tone." },
  { word: "Disparate", definition: "Fundamentally different or unrelated", example: "The data came from disparate sources." },
  { word: "Eloquent", definition: "Fluent and persuasive in expression", example: "An eloquent speech moved the crowd." },
  { word: "Ephemeral", definition: "Lasting a very short time", example: "Social trends are often ephemeral." },
  { word: "Exacerbate", definition: "To make a problem worse", example: "Stress exacerbates most conditions." },
  { word: "Lucid", definition: "Clearly expressed; easy to understand", example: "A lucid explanation helped everyone." },
  { word: "Mitigate", definition: "To lessen severity or impact", example: "Preparation mitigates exam anxiety." },
  { word: "Pragmatic", definition: "Dealing with things practically", example: "She took a pragmatic view." },
  { word: "Tenacious", definition: "Holding firmly; persistent", example: "Her tenacious effort paid off." }
];

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeSubject(subject) {
  return {
    ...subject,
    assessments: Array.isArray(subject.assessments) ? subject.assessments : [],
    tasks: Array.isArray(subject.tasks) ? subject.tasks : []
  };
}

function getClassrooms() {
  return state.classrooms.map(normalizeSubject);
}

function getTsaSection() {
  return normalizeSubject(state.tsa);
}

function getAllSchoolTasks() {
  const sections = [...getClassrooms(), getTsaSection()];
  return flattenSectionTasks(sections);
}

function flattenSectionTasks(sections) {
  return sections.flatMap((subject) =>
    subject.tasks.map((task) => ({
      ...task,
      classId: subject.id,
      className: subject.name,
      theme: subject.theme
    }))
  );
}

const runtime = {
  pdfDocs: {},
  pdfLoading: {},
  pdfRenderToken: 0
};

const state = loadState();

if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;
}

render();
setInterval(tickTimer, 1000);
window.addEventListener("resize", debounce(handleResize, 200));

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDate(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function todayKey(date = new Date()) {
  const d = startOfDay(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatLongDate(dateString) {
  const date = parseDate(dateString);
  if (!date) return "No hard date";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function formatShortDate(dateString) {
  const date = parseDate(dateString);
  if (!date) return "No date";
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function daysUntil(dateString) {
  const date = parseDate(dateString);
  if (!date) return Number.POSITIVE_INFINITY;
  const diff = startOfDay(date).getTime() - APP_TODAY.getTime();
  return Math.round(diff / 86400000);
}

function dueDescriptor(task) {
  if (task.dueLabel === "ASAP") return "ASAP";
  if (!task.due) return "No hard date yet";
  const diff = daysUntil(task.due);
  const exact = formatShortDate(task.due);
  if (diff < 0) return `Overdue by ${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} - ${exact}`;
  if (diff === 0) return `Due today - ${exact}`;
  if (diff === 1) return `Due tomorrow - ${exact}`;
  return `Due in ${diff} days - ${exact}`;
}

function assessmentCountdown(dateString) {
  const diff = daysUntil(dateString);
  if (diff < 0) return `Passed ${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} ago`;
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `In ${diff} days`;
}

function getSubject(classId) {
  return [...getClassrooms(), getTsaSection()].find((subject) => subject.id === classId);
}

function getDefaultChecks() {
  const defaults = {};
  const baseSections = [...deepClone(BASE_CLASSROOMS), deepClone(TSA_SECTION)];
  flattenSectionTasks(baseSections).forEach((task) => {
    if (task.defaultDone) defaults[task.id] = true;
  });
  return defaults;
}

function normalizeTimer(timer) {
  const duration = timer && Number.isFinite(timer.duration) ? timer.duration : 50 * 60;
  const remaining = timer && Number.isFinite(timer.remaining) ? timer.remaining : duration;
  return {
    duration,
    remaining,
    endAt: timer && typeof timer.endAt === "number" ? timer.endAt : null,
    sessionsByDate: timer && timer.sessionsByDate ? timer.sessionsByDate : {}
  };
}

function normalizePdfProgress(progressMap) {
  const next = {};
  IBO_BOOKS.forEach((book) => {
    const existing = progressMap && progressMap[book.id] ? progressMap[book.id] : {};
    next[book.id] = {
      currentPage: Number.isFinite(existing.currentPage) ? existing.currentPage : 1,
      completedThrough: Number.isFinite(existing.completedThrough) ? existing.completedThrough : 0,
      pages: Number.isFinite(existing.pages) ? existing.pages : null,
      available: typeof existing.available === "boolean" ? existing.available : null,
      complete: Boolean(existing.complete)
    };
  });
  return next;
}

function loadState() {
  let raw = {};
  try {
    raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    raw = {};
  }
  const classrooms = raw.classrooms ? raw.classrooms.map(normalizeSubject) : deepClone(BASE_CLASSROOMS);
  const tsa = raw.tsa ? normalizeSubject(raw.tsa) : deepClone(TSA_SECTION);
  const defaults = getDefaultChecks();
  const merged = {
    activeTab: raw.activeTab || "today",
    classrooms,
    tsa,
    checks: { ...defaults, ...(raw.checks || {}) },
    ui: {
      openPanels: raw.ui && raw.ui.openPanels ? raw.ui.openPanels : {},
      selectedBookId: raw.ui && raw.ui.selectedBookId ? raw.ui.selectedBookId : IBO_BOOKS[0].id,
      highlightClassId: raw.ui && raw.ui.highlightClassId ? raw.ui.highlightClassId : ""
    },
    sat: {
      section: raw.sat && raw.sat.section ? raw.sat.section : "math",
      vocabMode: raw.sat && raw.sat.vocabMode ? Boolean(raw.sat.vocabMode) : false,
      vocabIndex: raw.sat && Number.isFinite(raw.sat.vocabIndex) ? raw.sat.vocabIndex : 0,
      vocabFlipped: false,
      vocabKnown: raw.sat && raw.sat.vocabKnown ? raw.sat.vocabKnown : {}
    },
    timer: normalizeTimer(raw.timer),
    pdfProgress: normalizePdfProgress(raw.pdfProgress)
  };
  refreshTimerState(merged, false);
  return merged;
}

function saveState() {
  const payload = {
    activeTab: state.activeTab,
    classrooms: state.classrooms,
    tsa: state.tsa,
    checks: state.checks,
    ui: state.ui,
    sat: {
      section: state.sat.section,
      vocabMode: state.sat.vocabMode,
      vocabIndex: state.sat.vocabIndex,
      vocabKnown: state.sat.vocabKnown
    },
    timer: state.timer,
    pdfProgress: state.pdfProgress
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function isChecked(id) {
  return Boolean(state.checks[id]);
}

function toggleTask(id) {
  state.checks[id] = !state.checks[id];
  saveState();
  render();
}

function getSectionById(sectionId) {
  if (sectionId === "tsa") return state.tsa;
  return state.classrooms.find((subject) => subject.id === sectionId) || null;
}

function uniqueTaskId(section, seed) {
  const base = `${section.id}-${seed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "task"}`;
  let id = base;
  let index = 2;
  const used = new Set(section.tasks.map((task) => task.id));
  while (used.has(id)) {
    id = `${base}-${index}`;
    index += 1;
  }
  return id;
}

function addTask(sectionId) {
  const section = getSectionById(sectionId);
  if (!section) return;
  const title = prompt("Assignment title:");
  if (!title) return;
  const details = prompt("Description/details:", "") || "";
  const due = prompt("Due date (YYYY-MM-DD, optional):", "") || "";
  const priority = (prompt("Priority (critical/high/medium/low):", "medium") || "medium").toLowerCase();
  const estimate = Number(prompt("Estimate in minutes (optional):", "45")) || 0;
  section.tasks.push({
    id: uniqueTaskId(section, title),
    title: title.trim(),
    details: details.trim(),
    due: due.trim() || undefined,
    priority: PRIORITY_META[priority] ? priority : "medium",
    estimate
  });
  saveState();
  render();
}

function editTask(sectionId, taskId) {
  const section = getSectionById(sectionId);
  if (!section) return;
  const task = section.tasks.find((item) => item.id === taskId);
  if (!task) return;
  const title = prompt("Edit title:", task.title);
  if (!title) return;
  task.title = title.trim();
  task.details = (prompt("Edit description/details:", task.details || "") || "").trim();
  task.due = (prompt("Edit due date (YYYY-MM-DD, optional):", task.due || "") || "").trim() || undefined;
  const priority = (prompt("Edit priority (critical/high/medium/low):", task.priority || "medium") || "medium").toLowerCase();
  task.priority = PRIORITY_META[priority] ? priority : "medium";
  task.estimate = Number(prompt("Edit estimate in minutes (optional):", String(task.estimate || 0))) || 0;
  saveState();
  render();
}

function deleteTask(sectionId, taskId) {
  const section = getSectionById(sectionId);
  if (!section) return;
  const task = section.tasks.find((item) => item.id === taskId);
  if (!task) return;
  if (!confirm(`Delete "${task.title}"?`)) return;
  section.tasks = section.tasks.filter((item) => item.id !== taskId);
  delete state.checks[taskId];
  saveState();
  render();
}

function addAssessment(sectionId) {
  const section = getSectionById(sectionId);
  if (!section) return;
  const title = prompt("Assessment title:");
  if (!title) return;
  const date = prompt("Date (YYYY-MM-DD):", todayKey()) || "";
  const detail = prompt("Assessment details:", "") || "";
  section.assessments.push({ title: title.trim(), date: date.trim(), detail: detail.trim() });
  saveState();
  render();
}

function editAssessment(sectionId, encodedTitle) {
  const section = getSectionById(sectionId);
  if (!section) return;
  const title = decodeURIComponent(encodedTitle);
  const assessment = section.assessments.find((item) => item.title === title);
  if (!assessment) return;
  const nextTitle = prompt("Edit assessment title:", assessment.title);
  if (!nextTitle) return;
  assessment.title = nextTitle.trim();
  assessment.date = (prompt("Edit date (YYYY-MM-DD):", assessment.date || "") || "").trim();
  assessment.detail = (prompt("Edit details:", assessment.detail || "") || "").trim();
  saveState();
  render();
}

function deleteAssessment(sectionId, encodedTitle) {
  const section = getSectionById(sectionId);
  if (!section) return;
  const title = decodeURIComponent(encodedTitle);
  if (!confirm(`Delete assessment "${title}"?`)) return;
  section.assessments = section.assessments.filter((item) => item.title !== title);
  saveState();
  render();
}

function setTab(tabId) {
  state.activeTab = tabId;
  if (tabId !== "classes") state.ui.highlightClassId = "";
  saveState();
  render();
}

function setClassFocus(classId) {
  state.activeTab = classId === "tsa" ? "tsa" : "classes";
  state.ui.highlightClassId = classId;
  saveState();
  render();
}

function togglePanel(panelId) {
  state.ui.openPanels[panelId] = !state.ui.openPanels[panelId];
  saveState();
  render();
}

function panelOpen(panelId, fallback) {
  if (panelId in state.ui.openPanels) return state.ui.openPanels[panelId];
  return fallback;
}

function taskScore(task) {
  let score = PRIORITY_META[task.priority].weight;
  if (task.dueLabel === "ASAP") score += 430;
  if (task.due) {
    const diff = daysUntil(task.due);
    if (diff < 0) score += 520 + Math.abs(diff) * 25;
    else if (diff === 0) score += 500;
    else if (diff === 1) score += 470;
    else if (diff === 2) score += 430;
    else if (diff === 3) score += 400;
    else if (diff <= 7) score += 320 - diff * 18;
    else score += Math.max(0, 180 - diff * 8);
  }
  if (task.classId === "chemistry") score += 8;
  if (task.classId === "precalc") score += 12;
  return score;
}

function compareTasks(left, right) {
  const scoreDiff = taskScore(right) - taskScore(left);
  if (scoreDiff !== 0) return scoreDiff;
  const leftDue = left.due ? daysUntil(left.due) : 999;
  const rightDue = right.due ? daysUntil(right.due) : 999;
  if (leftDue !== rightDue) return leftDue - rightDue;
  return left.title.localeCompare(right.title);
}

function getSchoolCompletion() {
  const allTasks = getAllSchoolTasks();
  return {
    done: allTasks.filter((task) => isChecked(task.id)).length,
    total: allTasks.length
  };
}

function getApCompletion() {
  return {
    done: AP_DAYS.filter((day) => isChecked(`ap-day-${day.day}`)).length,
    total: AP_DAYS.length
  };
}

function getIboCompletion() {
  return {
    chapterDone: IBO_CHAPTERS.filter((chapter) => isChecked(`ibo-chapter-${chapter.id}`)).length,
    bookDone: IBO_BOOKS.filter((book) => isBookComplete(book.id)).length,
    caseDone: IBO_CASES.filter((item) => isChecked(`ibo-case-${item.id}`)).length
  };
}

function getSatCompletion() {
  const allModules = [...SAT_TRACKS.math, ...SAT_TRACKS.rw];
  return {
    done: allModules.filter((module) => isChecked(module.id)).length,
    total: allModules.length
  };
}

function getNextSchoolDeadline() {
  return getAllSchoolTasks()
    .filter((task) => !isChecked(task.id) && task.due)
    .sort((left, right) => daysUntil(left.due) - daysUntil(right.due))[0] || null;
}

function isTodayCoreTask(task) {
  if (isChecked(task.id)) return false;
  if (task.priority === "critical") return true;
  if (task.dueLabel === "ASAP") return true;
  if (task.due) {
    const diff = daysUntil(task.due);
    if (diff <= 3) return true;
    if (task.priority === "high" && diff <= 7) return true;
  }
  return false;
}

function getTodayCoreTasks() {
  return getAllSchoolTasks().filter(isTodayCoreTask).sort(compareTasks);
}

function getTodayFollowUpTasks() {
  const coreIds = new Set(getTodayCoreTasks().map((task) => task.id));
  return getAllSchoolTasks()
    .filter((task) => !isChecked(task.id) && !coreIds.has(task.id))
    .sort(compareTasks)
    .slice(0, 5);
}

function getUpcomingTimeline() {
  const allSections = [...getClassrooms(), getTsaSection()];
  const taskEntries = getAllSchoolTasks()
    .filter((task) => !isChecked(task.id) && task.due)
    .map((task) => ({
      date: task.due,
      title: task.title,
      detail: `${task.className} - ${task.details}`,
      theme: task.theme
    }));

  const assessmentEntries = allSections.flatMap((subject) =>
    subject.assessments.map((assessment) => ({
      date: assessment.date,
      title: assessment.title,
      detail: `${subject.name} - ${assessment.detail}`,
      theme: subject.theme
    }))
  );

  return [...taskEntries, ...assessmentEntries]
    .sort((left, right) => daysUntil(left.date) - daysUntil(right.date))
    .slice(0, 8);
}

function getNextApDay() {
  return AP_DAYS.find((day) => !isChecked(`ap-day-${day.day}`)) || null;
}

function getNextIboChapter() {
  return IBO_CHAPTERS.find((chapter) => !isChecked(`ibo-chapter-${chapter.id}`)) || null;
}

function getNextIboBook() {
  return IBO_BOOKS.find((book) => !isBookComplete(book.id)) || null;
}

function getNextSatModule() {
  const modules = [...SAT_TRACKS.math, ...SAT_TRACKS.rw];
  return modules.find((module) => !isChecked(module.id)) || SAT_TRACKS.math[0];
}

function getTodayOptionalLanes() {
  const nextApDay = getNextApDay();
  const nextBook = getNextIboBook();
  const nextSatModule = getNextSatModule();
  const lanes = [];

  if (nextApDay) {
    lanes.push({
      area: "AP Exams",
      theme: "blue",
      title: `${nextApDay.label} AP roadmap block`,
      detail: `${formatShortDate(nextApDay.date)} - ${nextApDay.blocks.map((block) => block.title).join(" / ")}`,
      button: "Open AP plan",
      action: `setTab('ap')`
    });
  }

  if (nextBook) {
    lanes.push({
      area: "IBO",
      theme: "green",
      title: `Continue the IBO reading system with ${nextBook.title}`,
      detail: APP_TODAY < parseDate(APP_CONFIG.iboSprintStart)
        ? "This stays optional for now, but a light head start here will make May feel calmer."
        : "Use the reader and progress tracker so you always know exactly where you left off.",
      button: "Open reader",
      action: `openIboBook('${nextBook.id}')`
    });
  }

  if (nextSatModule) {
    lanes.push({
      area: "SAT",
      theme: "amber",
      title: `Keep the SAT habit alive with ${nextSatModule.title}`,
      detail: "SAT is intentionally secondary right now, so this only shows up as a continuation lane.",
      button: "Open SAT",
      action: `openSatTrack('${state.sat.section}')`
    });
  }

  return lanes;
}

function getTodayHoursEstimate(tasks) {
  const minutes = tasks.reduce((total, task) => total + (task.estimate || 0), 0);
  if (!minutes) return "0 minutes";
  if (minutes < 60) return `${minutes} minutes`;
  return `${(minutes / 60).toFixed(minutes % 60 === 0 ? 0 : 1)} hours`;
}

function render() {
  refreshTimerState(state, true);
  renderStatusCluster();
  renderTabs();
  document.getElementById("app").innerHTML = renderActivePage();
  afterRender();
}

function renderStatusCluster() {
  const dateLabel = APP_TODAY.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const coreTasks = getTodayCoreTasks();
  const nextDeadline = getNextSchoolDeadline();
  document.getElementById("statusCluster").innerHTML = [
    `<div class="status-pill"><strong>${esc(dateLabel)}</strong>${esc(APP_CONFIG.academicStage)}</div>`,
    `<div class="status-pill"><strong>${coreTasks.length} active school priorities</strong>${esc(coreTasks.length ? "Today is school-first by design." : "Required school work is currently clear.")}</div>`,
    `<div class="status-pill"><strong>${nextDeadline ? esc(nextDeadline.title) : "No urgent deadline"}</strong>${nextDeadline ? esc(dueDescriptor(nextDeadline)) : "Use the continuation lane if you want extra progress."}</div>`
  ].join("");
}

function renderTabs() {
  const tabs = [
    ["today", "Today"],
    ["classes", "Classes"],
    ["tsa", "TSA"],
    ["ap", "AP Exams"],
    ["ibo", "IBO"],
    ["sat", "SAT"],
    ["timer", "Timer"],
    ["uplevel", "UpLevel"]
  ];
  document.getElementById("tabNav").innerHTML = tabs
    .map(([id, label]) => `<button class="tab-button${state.activeTab === id ? " active" : ""}" onclick="setTab('${id}')">${esc(label)}</button>`)
    .join("");
}

function renderActivePage() {
  if (state.activeTab === "today") return renderTodayPage();
  if (state.activeTab === "classes") return renderClassesPage();
  if (state.activeTab === "tsa") return renderTsaPage();
  if (state.activeTab === "ap") return renderApPage();
  if (state.activeTab === "ibo") return renderIboPage();
  if (state.activeTab === "sat") return renderSatPage();
  if (state.activeTab === "timer") return renderTimerPage();
  return renderUpLevelPage();
}

function renderTodayPage() {
  const coreTasks = getTodayCoreTasks();
  const focusTask = coreTasks[0] || null;
  const followUps = coreTasks.slice(1, 6);
  const continuation = getTodayOptionalLanes();
  const deadlines = getUpcomingTimeline();
  const schoolStats = getSchoolCompletion();
  const apStats = getApCompletion();
  const iboStats = getIboCompletion();
  const iboStart = daysUntil(APP_CONFIG.iboSprintStart);
  const satDiff = daysUntil(APP_CONFIG.satTestDate);

  return `
    <section class="hero-card">
      <div class="eyebrow">Today</div>
      <h2>Make the next move obvious and keep the rest of the system calm.</h2>
      <p>${coreTasks.length
        ? "Your must-do lane is built from real deadlines first across classes and TSA. Once that is clear, AP, IBO, and SAT stay available as continuation work instead of noise."
        : "You have cleared the current must-do school lane. The continuation lane below keeps long-range prep moving without guessing."}</p>
      <div class="stats-grid">
        ${renderStatCard("School tasks", `${schoolStats.done}/${schoolStats.total}`, coreTasks.length ? `${coreTasks.length} high-pressure items still active` : "Current must-do lane is clear")}
        ${renderStatCard("AP roadmap", `${apStats.done}/${apStats.total}`, "Your original AP sequence is still preserved")}
        ${renderStatCard("IBO sprint", iboStart > 0 ? `${iboStart} days` : "Live", iboStart > 0 ? `Starts ${formatShortDate(APP_CONFIG.iboSprintStart)}` : `${iboStats.chapterDone + iboStats.bookDone + iboStats.caseDone} tracked wins so far`)}
        ${renderStatCard("SAT target", `${satDiff} days`, `Official target date: ${formatShortDate(APP_CONFIG.satTestDate)}`)}
      </div>
    </section>

    <div class="page-grid">
      <section class="card focus-card">
        <div class="card-head">
          <div>
            <div class="section-label">Next Up</div>
            <h3 class="card-title">${focusTask ? esc(focusTask.title) : "You are clear on today's required work"}</h3>
          </div>
          ${focusTask ? `<span class="chip tone-${getSubject(focusTask.classId).theme}">${esc(focusTask.className)}</span>` : `<span class="chip tone-green">Clear</span>`}
        </div>
        ${focusTask
          ? `
            <p class="focus-detail">${esc(focusTask.details)}</p>
            <div class="task-meta">
              ${renderPriorityChip(focusTask.priority)}
              <span class="chip due">${esc(dueDescriptor(focusTask))}</span>
              <span class="chip due">${focusTask.estimate} min block</span>
            </div>
            <div class="focus-actions">
              <button class="button button-primary" onclick="toggleTask('${focusTask.id}')">Mark complete</button>
              <button class="button button-secondary" onclick="setClassFocus('${focusTask.classId}')">Open ${esc(focusTask.className)}</button>
            </div>
          `
          : `
            <div class="callout success">
              <strong>Required work is caught up right now.</strong> If you still have time, keep momentum with the continuation lane instead of inventing extra busywork.
            </div>
          `}
      </section>

      <section class="card">
        <div class="card-head">
          <div>
            <div class="section-label">After That</div>
            <h3 class="card-title">${coreTasks.length ? "The rest of today's must-do queue" : "Longer tail schoolwork"}</h3>
          </div>
          <span class="chip due">${esc(getTodayHoursEstimate(coreTasks))}</span>
        </div>
        ${coreTasks.length
          ? `
            <p class="card-copy">Checking one item off here will immediately move the next one into the main focus slot.</p>
            <div class="task-list">
              ${followUps.length ? followUps.map((task) => renderTaskRow(task, { showClass: true })).join("") : `<div class="empty-state">The focus card already shows the only must-do item still left for today.</div>`}
            </div>
          `
          : `
            <div class="task-list">
              ${getTodayFollowUpTasks().length
                ? getTodayFollowUpTasks().map((task) => renderTaskRow(task, { showClass: true })).join("")
                : `<div class="empty-state">Nothing else in the school lane currently needs your attention.</div>`}
            </div>
          `}
      </section>
    </div>

    <div class="page-grid">
      <section class="card">
        <div class="card-head">
          <div>
            <div class="section-label">Continue If You Have Time</div>
            <h3 class="card-title">Long-range study stays available but not pushy</h3>
          </div>
        </div>
        <p class="card-copy">This is where AP exam prep, IBO momentum, and SAT habit-building live after school deadlines are handled.</p>
        <div class="task-list">
          ${continuation.map((lane) => `
            <div class="task-row">
              <div class="task-main">
                <div class="task-title-row">
                  <span class="task-title">${esc(lane.title)}</span>
                  <span class="chip tone-${lane.theme}">${esc(lane.area)}</span>
                </div>
                <div class="task-detail">${esc(lane.detail)}</div>
                <div class="focus-actions">
                  <button class="button button-secondary" onclick="${lane.action}">${esc(lane.button)}</button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <div>
            <div class="section-label">Coming Up</div>
            <h3 class="card-title">Deadlines and assessments on deck</h3>
          </div>
        </div>
        <div>
          ${deadlines.map((entry) => `
            <div class="deadline-row">
              <div>
                <h4>${esc(entry.title)}</h4>
                <p>${esc(entry.detail)}</p>
              </div>
              <div class="deadline-date tone-${entry.theme}">
                <div>${esc(assessmentCountdown(entry.date))}</div>
                <div class="muted small">${esc(formatShortDate(entry.date))}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderClassesPage() {
  const classrooms = getClassrooms();
  const allTasks = getAllSchoolTasks();
  const schoolStats = getSchoolCompletion();
  const dueSoon = allTasks.filter((task) => !isChecked(task.id) && task.due && daysUntil(task.due) <= 7).length;
  const completedThisStack = allTasks.filter((task) => isChecked(task.id)).length;

  return `
    <section class="hero-card">
      <div class="eyebrow">Classes</div>
      <h2>Every class is separated clearly, but Today still does the prioritizing for you.</h2>
      <p>This page is the clean source of truth for your current classes. Anything you confirmed as complete is already checked. Anything uncertain stays visible and unchecked.</p>
      <div class="stats-grid">
        ${renderStatCard("Overall class progress", `${schoolStats.done}/${schoolStats.total}`, `${completedThisStack} tasks already marked complete`)}
        ${renderStatCard("Due within 7 days", `${dueSoon}`, "These are the items most likely to hit Today")}
        ${renderStatCard("Precalc test", assessmentCountdown("2026-04-17"), "Friday, April 17, 2026")}
        ${renderStatCard("Macro test", assessmentCountdown("2026-04-16"), "Thursday, April 16, 2026")}
      </div>
    </section>

    ${classrooms.map((subject) => renderSubjectCard(subject, { editable: true })).join("")}
  `;
}

function renderSubjectCard(subject, options = {}) {
  const done = subject.tasks.filter((task) => isChecked(task.id)).length;
  const total = subject.tasks.length;
  const highlightClass = state.ui.highlightClassId === subject.id ? " highlight" : "";
  const subjectMeta = SUBJECT_META[subject.id] || { type: "Project Lane" };
  const tasks = [...subject.tasks].sort((left, right) =>
    compareTasks(
      { ...left, classId: subject.id, className: subject.name, theme: subject.theme },
      { ...right, classId: subject.id, className: subject.name, theme: subject.theme }
    )
  );

  return `
    <section class="subject-card${highlightClass}" id="subject-${subject.id}">
      <div class="subject-head">
        <div>
          <div class="section-label">${esc(subjectMeta.type)}</div>
          <h3>${esc(subject.name)}</h3>
          <p class="subject-note">${esc(subject.summary)}</p>
        </div>
        <div class="task-meta">
          <span class="chip tone-${subject.theme}">${done}/${total || 0} checked</span>
        </div>
      </div>

      <div class="subject-summary">
        <span class="chip tone-${subject.theme}">${esc(subject.note)}</span>
      </div>

      <div class="subject-section">
        <h4>Assessments and checkpoints</h4>
        ${options.editable ? `<div class="focus-actions"><button class="button button-secondary" onclick="addAssessment('${subject.id}')">Add assessment</button></div>` : ""}
        ${subject.assessments.length
          ? subject.assessments.map((assessment) => `
              <div class="assessment-row">
                <div>
                  <h4>${esc(assessment.title)}</h4>
                  <p>${esc(assessment.detail)}</p>
                  ${options.editable ? `<div class="task-meta" style="margin-top:0.5rem;"><button class="button button-ghost" onclick="editAssessment('${subject.id}', '${encodeURIComponent(assessment.title)}')">Edit</button><button class="button button-ghost" onclick="deleteAssessment('${subject.id}', '${encodeURIComponent(assessment.title)}')">Delete</button></div>` : ""}
                </div>
                <div class="assessment-date tone-${subject.theme}">
                  <div>${esc(assessmentCountdown(assessment.date))}</div>
                  <div class="muted small">${esc(formatShortDate(assessment.date))}</div>
                </div>
              </div>
            `).join("")
          : `<div class="empty-state">No current checkpoints were added for this class.</div>`}
      </div>

      <div class="subject-section">
        <h4>Tasks</h4>
        ${options.editable ? `<div class="focus-actions"><button class="button button-primary" onclick="addTask('${subject.id}')">Add assignment</button></div>` : ""}
        ${tasks.length
          ? `<div class="task-list">${tasks.map((task) => renderTaskRow({ ...task, classId: subject.id, className: subject.name, theme: subject.theme }, { editable: options.editable })).join("")}</div>`
          : `<div class="empty-state">No current tasks were added for this class.</div>`}
      </div>
    </section>
  `;
}

function renderApPage() {
  const apStats = getApCompletion();
  const nextDay = getNextApDay();
  const nextDayNumber = nextDay ? nextDay.day : AP_DAYS[AP_DAYS.length - 1].day;

  return `
    <section class="hero-card">
      <div class="eyebrow">AP Exams</div>
      <h2>Your AP roadmap stays intact, but it is cleaner and easier to scan now.</h2>
      <p>The original content is still here. The difference is that each day is grouped more cleanly, and your classroom tests no longer get buried under the long-range AP sequence.</p>
      <div class="stats-grid">
        ${renderStatCard("Days complete", `${apStats.done}/${apStats.total}`, nextDay ? `${nextDay.label} is next` : "Roadmap fully checked")}
        ${renderStatCard("Sprint end", assessmentCountdown(APP_CONFIG.apSprintEnd), formatShortDate(APP_CONFIG.apSprintEnd))}
        ${renderStatCard("Precalc classroom test", assessmentCountdown("2026-04-17"), "Polar functions test")}
        ${renderStatCard("Macro classroom test", assessmentCountdown("2026-04-16"), "Unit 6 test")}
      </div>
      <div class="callout info">
        <strong>Important this week:</strong> Friday, April 17, 2026 is your AP Precalculus classroom polar functions test. That short-term detour is intentionally surfaced in Today and Classes first.
      </div>
    </section>

    ${AP_DAYS.map((day) => renderApAccordion(day, nextDayNumber)).join("")}
  `;
}

function renderApAccordion(day, nextDayNumber) {
  const checkId = `ap-day-${day.day}`;
  const isDone = isChecked(checkId);
  const isOpen = panelOpen(checkId, day.day === nextDayNumber);
  return `
    <section class="accordion">
      <div class="accordion-head">
        <div class="accordion-title-wrap">
          <div class="section-label">${esc(day.label)}</div>
          <div class="accordion-title">${esc(formatLongDate(day.date))}</div>
          <p class="accordion-copy">${esc(day.timeLabel)}${day.day === nextDayNumber && !isDone ? " - currently the next AP block." : ""}</p>
        </div>
        <div class="accordion-actions">
          <span class="chip ${isDone ? "tone-green" : "tone-blue"}">${isDone ? "Complete" : day.day === nextDayNumber ? "Next" : "Queued"}</span>
          <button class="task-check${isDone ? " on" : ""}" onclick="toggleTask('${checkId}')">${isDone ? "&#10003;" : ""}</button>
          <button class="accordion-toggle" onclick="togglePanel('${checkId}')">${isOpen ? "Hide details" : "Show details"}</button>
        </div>
      </div>
      ${isOpen ? `<div class="accordion-body">${day.blocks.map((block) => renderApBlock(block)).join("")}</div>` : ""}
    </section>
  `;
}

function renderApBlock(block) {
  return `
    <div class="plan-block">
      <div class="book-meta-row">
        <h4>${esc(block.title)}</h4>
        <div class="task-meta">
          <span class="chip tone-${SUBJECT_META[block.subject].theme}">${esc(SUBJECT_META[block.subject].short)}</span>
          <span class="chip due">${esc(block.time)}</span>
        </div>
      </div>
      <ul class="topic-list">
        ${block.topics.map((topic) => `<li>${esc(topic)}</li>`).join("")}
      </ul>
      <div class="cta-row">
        <a class="button button-secondary" href="${block.link}" target="_blank" rel="noreferrer">Open AP Classroom</a>
      </div>
    </div>
  `;
}

function renderIboPage() {
  const completion = getIboCompletion();
  const nextBook = getNextIboBook();
  const nextChapter = getNextIboChapter();
  const beforeSprint = APP_TODAY < parseDate(APP_CONFIG.iboSprintStart);

  return `
    <section class="hero-card">
      <div class="eyebrow">IBO</div>
      <h2>Books, chapters, cases, and reading progress now have a cleaner lane.</h2>
      <p>The goal here is simple: less wondering where you left off, less guessing what to read next, and a much smoother path from books into chapters and case drills.</p>
      <div class="stats-grid">
        ${renderStatCard("Chapters", `${completion.chapterDone}/${IBO_CHAPTERS.length}`, "Phase 1 curriculum tracker")}
        ${renderStatCard("Books", `${completion.bookDone}/${IBO_BOOKS.length}`, "Reader and page progress are now wired")}
        ${renderStatCard("Case drills", `${completion.caseDone}/${IBO_CASES.length}`, "Objective and open case rehearsal")}
        ${renderStatCard("Grand Test", assessmentCountdown(APP_CONFIG.iboGrandTestOpen), formatShortDate(APP_CONFIG.iboGrandTestOpen))}
      </div>
      <div class="callout ${beforeSprint ? "info" : "success"}">
        <strong>${beforeSprint ? "Warm-start window:" : "Live sprint:"}</strong>
        ${beforeSprint
          ? "IBO stays secondary until the AP push relaxes, but the reader is ready if you want a calm head start on the first book."
          : "At this point the IBO lane should feel explicit: master chapters, move through books, then rehearse cases and full mocks."}
      </div>
    </section>

    <div class="page-grid">
      <section class="card">
        <div class="card-head">
          <div>
            <div class="section-label">Next Recommended Move</div>
            <h3 class="card-title">${nextBook ? esc(nextBook.title) : "IBO core reading is checked"}</h3>
          </div>
          ${nextBook ? `<span class="chip tone-${nextBook.phase === 2 ? "green" : "blue"}">Phase ${nextBook.phase}</span>` : `<span class="chip tone-green">Done</span>`}
        </div>
        <p class="card-copy">${nextBook ? esc(nextBook.why) : "Your named IBO books are currently marked complete, so case work and mock exams should take over the lane."}</p>
        <div class="task-meta">
          ${nextChapter ? `<span class="chip due">Next chapter: ${esc(nextChapter.title)}</span>` : ""}
          ${nextBook ? `<span class="chip due">PDF path: ${esc(nextBook.path)}</span>` : ""}
        </div>
        <div class="focus-actions">
          ${nextBook ? `<button class="button button-green" onclick="openIboBook('${nextBook.id}')">Open reader</button>` : ""}
          ${nextChapter ? `<button class="button button-secondary" onclick="togglePanel('ibo-chapter-${nextChapter.id}')">Open next chapter</button>` : ""}
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <div>
            <div class="section-label">Import-Ready Resource Slots</div>
            <h3 class="card-title">Drop the reference PDFs into the repo and keep moving</h3>
          </div>
        </div>
        <p class="card-copy">The named book reader is already wired. These extra slots are ready for the syllabus and sample cases whenever those PDFs land in the repo.</p>
        <div class="resource-grid">
          ${IBO_RESOURCE_SLOTS.map((slot) => `
            <div class="resource-card">
              <h4>${esc(slot.title)}</h4>
              <p>${esc(slot.detail)}</p>
              <div class="task-meta"><span class="chip due">${esc(slot.path)}</span></div>
            </div>
          `).join("")}
        </div>
      </section>
    </div>

    <section class="card">
      <div class="card-head">
        <div>
          <div class="section-label">Book Library</div>
          <h3 class="card-title">Read, resume, and mark progress without guessing</h3>
        </div>
      </div>
      <div class="book-grid">${IBO_BOOKS.map((book) => renderBookCard(book)).join("")}</div>
    </section>

    ${renderSelectedBookPanel()}

    <div class="page-grid">
      <section class="card">
        <div class="card-head">
          <div>
            <div class="section-label">Phase 1 Curriculum</div>
            <h3 class="card-title">Chapter mastery tracker</h3>
          </div>
        </div>
        <div class="progress-wrap">
          ${renderProgressRow("Phase 1 chapters", completion.chapterDone, IBO_CHAPTERS.length, "var(--blue)")}
          ${renderProgressRow("Phase 2 priority books", IBO_BOOKS.filter((book) => book.phase === 2 && isBookComplete(book.id)).length, IBO_BOOKS.filter((book) => book.phase === 2).length, "var(--green)")}
          ${renderProgressRow("Phase 3 books + cases", IBO_BOOKS.filter((book) => book.phase === 3 && isBookComplete(book.id)).length + IBO_CASES.filter((item) => isChecked(`ibo-case-${item.id}`)).length, IBO_BOOKS.filter((book) => book.phase === 3).length + IBO_CASES.length, "var(--amber)")}
        </div>
        <div style="margin-top: 1rem;">${IBO_CHAPTERS.map((chapter) => renderIboChapterAccordion(chapter)).join("")}</div>
      </section>

      <section class="card">
        <div class="card-head">
          <div>
            <div class="section-label">Cases And Timed Drills</div>
            <h3 class="card-title">Objective and open-case rehearsal</h3>
          </div>
        </div>
        ${IBO_CASES.map((item) => `
          <div class="case-row">
            <div style="display:flex; gap:0.85rem;">
              <button class="task-check${isChecked(`ibo-case-${item.id}`) ? " on" : ""}" onclick="toggleTask('ibo-case-${item.id}')">${isChecked(`ibo-case-${item.id}`) ? "&#10003;" : ""}</button>
              <div>
                <h4>${esc(item.title)}</h4>
                <p>${esc(item.detail)}</p>
              </div>
            </div>
          </div>
        `).join("")}
      </section>
    </div>

    <section class="card">
      <div class="card-head">
        <div>
          <div class="section-label">Key Dates</div>
          <h3 class="card-title">Keep the milestones visible</h3>
        </div>
      </div>
      ${IBO_DATES.map((event) => `
        <div class="deadline-row">
          <div>
            <h4>${esc(event.label)}</h4>
            <p>${esc(event.detail)}</p>
          </div>
          <div class="deadline-date tone-${event.theme === "red" ? "amber" : event.theme}">
            <div>${esc(assessmentCountdown(event.date))}</div>
            <div class="muted small">${esc(formatShortDate(event.date))}</div>
          </div>
        </div>
      `).join("")}
    </section>
  `;
}

function renderBookCard(book) {
  const progress = state.pdfProgress[book.id];
  const pages = progress.pages;
  const percent = bookPercent(book.id);
  const isSelected = state.ui.selectedBookId === book.id;
  const complete = isBookComplete(book.id);
  return `
    <section class="book-card">
      <div class="book-top">
        <div>
          <div class="section-label">Phase ${book.phase}</div>
          <h3>${esc(book.title)}</h3>
          <div class="book-author">${esc(book.author)}</div>
        </div>
        <button class="task-check${complete ? " on" : ""}" onclick="toggleBookComplete('${book.id}')">${complete ? "&#10003;" : ""}</button>
      </div>
      <p class="book-why">${esc(book.why)}</p>
      <div class="book-progress-copy">${pages ? `${progress.completedThrough}/${pages} pages marked complete` : complete ? "Marked complete" : "Reader slot is ready - page count appears after the PDF loads."}</div>
      <div class="progress-wrap"><div class="progress-bar"><div class="progress-fill" style="width:${percent}%; background:${book.phase === 2 ? "var(--green)" : "var(--blue)"}"></div></div></div>
      <div class="cta-row">
        <button class="button ${isSelected ? "button-primary" : "button-secondary"}" onclick="openIboBook('${book.id}')">${isSelected ? "Reader open" : percent > 0 ? "Continue reading" : "Open reader"}</button>
        <button class="button button-ghost" onclick="markBookComplete('${book.id}', true)">Mark whole book complete</button>
      </div>
      <div class="task-meta"><span class="chip due">${esc(book.path)}</span></div>
    </section>
  `;
}

function renderSelectedBookPanel() {
  const book = IBO_BOOKS.find((item) => item.id === state.ui.selectedBookId);
  if (!book) return "";
  const progress = state.pdfProgress[book.id];
  const isFileProtocol = location.protocol === "file:";
  const ready = progress.available === true && progress.pages;

  return `
    <section class="card reader-shell">
      <div class="reader-head">
        <div>
          <div class="section-label">IBO Reader</div>
          <h3>${esc(book.title)}</h3>
          <p class="card-copy">${esc(book.author)} - ${esc(book.why)}</p>
        </div>
        <div class="task-meta">
          <span class="chip tone-${book.phase === 2 ? "green" : "blue"}">Phase ${book.phase}</span>
          <span class="chip due">${progress.pages ? `Page ${progress.currentPage} of ${progress.pages}` : "Awaiting PDF metadata"}</span>
        </div>
      </div>
      ${isFileProtocol ? `<div class="callout warning"><strong>PDF note:</strong> Browsers often block the embedded reader when the app is opened directly as a <code>file://</code> page. The reader works best on Vercel or any local web server.</div>` : ""}
      ${progress.available === false ? `<div class="callout alert"><strong>PDF not found yet.</strong> Put this file at <code>${esc(book.path)}</code> and reopen the reader.</div>` : ""}
      ${!ready && progress.available !== false ? `<div class="callout info"><strong>Reader slot is ready.</strong> The app will load page count and rendering as soon as the PDF exists at <code>${esc(book.path)}</code>.</div>` : ""}
      <div class="reader-controls">
        <button class="button button-secondary" onclick="stepBookPage(-1)">Previous page</button>
        <button class="button button-secondary" onclick="stepBookPage(1)">Next page</button>
        <input class="reader-input" id="bookPageInput" type="number" min="1" value="${progress.currentPage}">
        <button class="button button-secondary" onclick="jumpToBookPage()">Go to page</button>
        <button class="button button-green" onclick="markCurrentBookPage()">Mark this page complete</button>
      </div>
      <div class="task-meta">
        <span class="chip due">${progress.pages ? `${progress.completedThrough}/${progress.pages} pages completed` : `${progress.completedThrough} pages completed so far`}</span>
        <span class="chip due">${isBookComplete(book.id) ? "Book marked complete" : "Book not fully checked yet"}</span>
      </div>
      ${ready ? `<div class="reader-stage" id="pdfStage"><canvas id="pdfCanvas"></canvas></div>` : ""}
    </section>
  `;
}

function renderIboChapterAccordion(chapter) {
  const checkId = `ibo-chapter-${chapter.id}`;
  const isDone = isChecked(checkId);
  const nextChapter = getNextIboChapter();
  const isOpen = panelOpen(checkId, chapter.id === (nextChapter ? nextChapter.id : IBO_CHAPTERS[0].id));
  return `
    <section class="accordion">
      <div class="accordion-head">
        <div class="accordion-title-wrap">
          <div class="section-label">Phase ${chapter.phase}</div>
          <div class="accordion-title">${esc(chapter.title)}</div>
          <p class="accordion-copy">${esc(chapter.dateRange)} - ${esc(PRIORITY_META[chapter.priority].label)} priority</p>
        </div>
        <div class="accordion-actions">
          ${renderPriorityChip(chapter.priority)}
          <button class="task-check${isDone ? " on" : ""}" onclick="toggleTask('${checkId}')">${isDone ? "&#10003;" : ""}</button>
          <button class="accordion-toggle" onclick="togglePanel('${checkId}')">${isOpen ? "Hide topics" : "Show topics"}</button>
        </div>
      </div>
      ${isOpen ? `<div class="accordion-body"><ul class="topic-list">${chapter.topics.map((topic) => `<li>${esc(topic)}</li>`).join("")}</ul></div>` : ""}
    </section>
  `;
}

function renderSatPage() {
  if (state.sat.vocabMode) return renderSatVocabPage();
  const currentTrack = SAT_TRACKS[state.sat.section];
  const knownCount = Object.values(state.sat.vocabKnown).filter(Boolean).length;
  const trackDone = currentTrack.filter((module) => isChecked(module.id)).length;

  return `
    <section class="hero-card">
      <div class="eyebrow">SAT</div>
      <h2>The SAT lane stays lighter right now, but it is no longer empty or vague.</h2>
      <p>Your official target date is Friday, October 3, 2026. For now this stays as optional continuation work so your classes, APs, and IBO do not get crowded out.</p>
      <div class="stats-grid">
        ${renderStatCard("Math + RW modules", `${getSatCompletion().done}/${getSatCompletion().total}`, "Ten core modules still tracked here")}
        ${renderStatCard("Vocabulary", `${knownCount}/${VOCAB.length}`, "Flashcards stay ready for quick reps")}
        ${renderStatCard("Official test date", `${daysUntil(APP_CONFIG.satTestDate)} days`, formatShortDate(APP_CONFIG.satTestDate))}
        ${renderStatCard("Current mode", state.sat.section === "math" ? "Math" : "Reading and Writing", "Switch tracks whenever you want")}
      </div>
    </section>

    <section class="card">
      <div class="card-head">
        <div>
          <div class="section-label">Track</div>
          <h3 class="card-title">Build the foundation now, then deepen it later</h3>
        </div>
      </div>
      <div class="tab-switcher">
        <button class="switch-button${state.sat.section === "math" ? " active" : ""}" onclick="setSatSection('math')">Math</button>
        <button class="switch-button${state.sat.section === "rw" ? " active" : ""}" onclick="setSatSection('rw')">Reading and Writing</button>
      </div>
      <div class="progress-wrap">
        ${renderProgressRow(state.sat.section === "math" ? "Math modules" : "Reading and Writing modules", trackDone, currentTrack.length, "var(--amber)")}
      </div>
      <div style="margin-top: 1rem;">
        ${currentTrack.map((module) => `
          <div class="module-row">
            <div style="display:flex; gap:0.85rem;">
              <button class="task-check${isChecked(module.id) ? " on" : ""}" onclick="toggleTask('${module.id}')">${isChecked(module.id) ? "&#10003;" : ""}</button>
              <div>
                <h4>${esc(module.title)}</h4>
                <p>${esc(module.detail)}</p>
              </div>
            </div>
            <div class="task-meta">
              <span class="chip due">${esc(module.estimate)}</span>
              <a class="button button-secondary" href="${module.link}" target="_blank" rel="noreferrer">Open Khan Academy</a>
            </div>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="card">
      <div class="card-head">
        <div>
          <div class="section-label">Vocabulary</div>
          <h3 class="card-title">Quick flashcard reps still live here</h3>
        </div>
      </div>
      <p class="card-copy">The later SAT rebuild can go much deeper with imports, quizzes, and error drilling. For now, the flashcard lane stays simple and ready.</p>
      <div class="task-meta">
        <span class="chip tone-amber">${knownCount} known</span>
        <span class="chip due">${VOCAB.length - knownCount} still learning</span>
      </div>
      <div class="focus-actions">
        <button class="button button-amber" onclick="startSatVocab()">Practice flashcards</button>
      </div>
    </section>
  `;
}

function renderSatVocabPage() {
  const index = state.sat.vocabIndex % VOCAB.length;
  const card = VOCAB[index];
  const knownCount = Object.values(state.sat.vocabKnown).filter(Boolean).length;
  return `
    <section class="hero-card">
      <div class="eyebrow">SAT Vocabulary</div>
      <h2>Flashcards are ready for quick honest reps.</h2>
      <p>You can keep this light for now and deepen it later when the larger SAT system is ready.</p>
      <div class="stats-grid">
        ${renderStatCard("Known", `${knownCount}`, `${VOCAB.length - knownCount} still learning`)}
        ${renderStatCard("Card", `${index + 1}/${VOCAB.length}`, "Flip, then mark honestly")}
      </div>
    </section>

    <section class="card">
      <div class="flash-head">
        <div>
          <div class="section-label">Card</div>
          <h3>${esc(card.word)}</h3>
        </div>
        <button class="button button-secondary" onclick="stopSatVocab()">Back to SAT tab</button>
      </div>
      <div class="flashcard" onclick="flipSatVocab()">
        ${state.sat.vocabFlipped
          ? `<div class="flash-word">${esc(card.word)}</div><div class="flash-definition">${esc(card.definition)}</div><div class="muted">${esc(card.example)}</div>`
          : `<div class="flash-word">${esc(card.word)}</div><div class="muted">Tap to reveal the definition.</div><div class="muted">${esc(card.example)}</div>`}
      </div>
      <div class="flash-actions">
        ${state.sat.vocabFlipped
          ? `<button class="button button-secondary" onclick="markSatVocab(false)">Still learning</button><button class="button button-primary" onclick="markSatVocab(true)">Know it</button>`
          : `<button class="button button-secondary" onclick="previousSatVocab()">Previous</button><button class="button button-primary" onclick="flipSatVocab()">Flip</button><button class="button button-secondary" onclick="nextSatVocab()">Next</button>`}
      </div>
    </section>
  `;
}

function renderTimerPage() {
  refreshTimerState(state, true);
  const remaining = state.timer.remaining;
  const running = Boolean(state.timer.endAt);
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  const sessionsToday = state.timer.sessionsByDate[todayKey()] || 0;
  const progress = Math.round((1 - remaining / state.timer.duration) * 100);
  const finished = !running && remaining === 0;

  return `
    <section class="hero-card">
      <div class="eyebrow">Timer</div>
      <h2>Stay focused without leaving the rest of the system.</h2>
      <p>Use shorter blocks for quizzes and longer blocks for writing, reading, or mixed review sessions.</p>
      <div class="stats-grid">
        ${renderStatCard("Sessions today", `${sessionsToday}`, "Tracked locally in this browser")}
        ${renderStatCard("Current duration", `${Math.round(state.timer.duration / 60)} min`, running ? "Timer is running now" : "Ready to start")}
        ${renderStatCard("Suggested use", "50 min", "Best default for focused study")}
      </div>
    </section>

    <section class="card">
      <div class="card-head">
        <div>
          <div class="section-label">Focus Block</div>
          <h3 class="card-title">Simple, visible, and ready</h3>
        </div>
      </div>
      <div class="preset-row">
        <button class="button ${state.timer.duration === 25 * 60 ? "button-primary" : "button-secondary"}" onclick="setTimerDuration(1500)">25 min</button>
        <button class="button ${state.timer.duration === 50 * 60 ? "button-primary" : "button-secondary"}" onclick="setTimerDuration(3000)">50 min</button>
        <button class="button ${state.timer.duration === 90 * 60 ? "button-primary" : "button-secondary"}" onclick="setTimerDuration(5400)">90 min</button>
        <input class="reader-input" id="customTimerMinutes" type="number" min="1" max="180" placeholder="Custom">
        <button class="button button-secondary" onclick="setCustomTimer()">Set custom</button>
      </div>
      <div class="progress-wrap"><div class="progress-bar"><div class="progress-fill" style="width:${progress}%; background:${finished ? "var(--green)" : running ? "var(--ink)" : "var(--blue)"}"></div></div></div>
      <div class="timer-display">
        <div class="timer-value">${minutes}:${seconds}</div>
        <div class="timer-caption">${finished ? "Session complete. Take a breath, then choose the next block." : running ? "Keep going. Stay with the block." : "Ready when you are."}</div>
        <div class="timer-helper">${sessionsToday} session${sessionsToday === 1 ? "" : "s"} today</div>
      </div>
      <div class="timer-actions">
        ${!running && remaining > 0 ? `<button class="button button-primary" onclick="startTimer()">${remaining === state.timer.duration ? "Start focus session" : "Resume"}</button>` : ""}
        ${running ? `<button class="button button-secondary" onclick="pauseTimer()">Pause</button>` : ""}
        ${running || remaining !== state.timer.duration ? `<button class="button button-secondary" onclick="resetTimer()">Reset</button>` : ""}
        ${finished ? `<button class="button button-green" onclick="resetTimer()">Start another block</button>` : ""}
      </div>
    </section>
  `;
}

function renderTsaPage() {
  const tsa = getTsaSection();
  const done = tsa.tasks.filter((task) => isChecked(task.id)).length;
  const total = tsa.tasks.length;
  const dueSoon = tsa.tasks.filter((task) => !isChecked(task.id) && task.due && daysUntil(task.due) <= 7).length;
  return `
    <section class="hero-card">
      <div class="eyebrow">TSA</div>
      <h2>TSA is now a full operating lane with deadlines, challenge tasks, and editable blocks.</h2>
      <p>This tab is wired like the other sections and feeds the Today roadmap automatically so your next move stays obvious.</p>
      <div class="stats-grid">
        ${renderStatCard("TSA completion", `${done}/${total}`, "All four challenges and admin tasks are tracked")}
        ${renderStatCard("Due within 7 days", `${dueSoon}`, "High-pressure TSA items now flow into Today")}
        ${renderStatCard("Global TSA deadline", assessmentCountdown("2026-04-30"), "All challenge deliverables complete by April 30")}
        ${renderStatCard("Start date", formatShortDate("2026-04-14"), "This lane starts today")}
      </div>
    </section>
    ${renderSubjectCard(tsa, { editable: true })}
  `;
}

function renderUpLevelPage() {
  return `
    <section class="hero-card">
      <div class="eyebrow">UpLevel</div>
      <h2>This lane is intentionally parked until the school and exam stack settles.</h2>
      <p>You asked for a placeholder that looks ready but does not clutter Today yet. That is exactly what this page is doing for now.</p>
    </section>

    <section class="placeholder-card">
      <h3>Placeholder ready for later business buildout</h3>
      <p class="placeholder-copy">When we come back to this, we can give it the same treatment as the rest of the system: priorities, roadmaps, focused next actions, and a proper working rhythm.</p>
      <ul class="bullet-list">
        <li>Default placeholder rhythm: 1 hour of focused work per day when this lane becomes active.</li>
        <li>Excluded from Today on purpose until the current academic pressure is more stable.</li>
        <li>Ready for future tasks, milestones, and operating dashboards without forcing them into your daily view now.</li>
      </ul>
    </section>
  `;
}

function renderTaskRow(task, options = {}) {
  const subject = getSubject(task.classId);
  const checked = isChecked(task.id);
  return `
    <div class="task-row${checked ? " done" : ""}">
      <button class="task-check${checked ? " on" : ""}" onclick="toggleTask('${task.id}')">${checked ? "&#10003;" : ""}</button>
      <div class="task-main">
        <div class="task-title-row">
          <span class="task-title">${esc(task.title)}</span>
          ${options.showClass ? `<span class="chip tone-${subject.theme}">${esc(task.className)}</span>` : ""}
        </div>
        <div class="task-detail">${esc(task.details)}</div>
        <div class="task-meta">
          ${renderPriorityChip(task.priority)}
          <span class="chip due">${esc(dueDescriptor(task))}</span>
          ${task.estimate ? `<span class="chip due">${task.estimate} min</span>` : ""}
          ${options.editable ? `<button class="button button-ghost" onclick="editTask('${task.classId}', '${task.id}')">Edit</button><button class="button button-ghost" onclick="deleteTask('${task.classId}', '${task.id}')">Delete</button>` : ""}
        </div>
      </div>
    </div>
  `;
}

function renderPriorityChip(priority) {
  return `<span class="chip priority-${priority}">${esc(PRIORITY_META[priority].label)}</span>`;
}

function renderStatCard(label, value, detail) {
  return `<div class="stat-card"><span class="stat-label">${esc(label)}</span><span class="stat-value">${esc(value)}</span><span class="stat-sub">${esc(detail)}</span></div>`;
}

function renderProgressRow(label, done, total, color) {
  const width = total ? Math.round((done / total) * 100) : 0;
  return `<div class="progress-wrap"><div class="progress-top"><span>${esc(label)}</span><span>${done}/${total}</span></div><div class="progress-bar"><div class="progress-fill" style="width:${width}%; background:${color}"></div></div></div>`;
}

function setSatSection(section) {
  state.sat.section = section;
  saveState();
  render();
}

function openSatTrack(section) {
  state.sat.section = section;
  state.activeTab = "sat";
  saveState();
  render();
}

function startSatVocab() {
  state.sat.vocabMode = true;
  state.sat.vocabFlipped = false;
  saveState();
  render();
}

function stopSatVocab() {
  state.sat.vocabMode = false;
  state.sat.vocabFlipped = false;
  saveState();
  render();
}

function flipSatVocab() {
  state.sat.vocabFlipped = !state.sat.vocabFlipped;
  saveState();
  render();
}

function nextSatVocab() {
  state.sat.vocabIndex = (state.sat.vocabIndex + 1) % VOCAB.length;
  state.sat.vocabFlipped = false;
  saveState();
  render();
}

function previousSatVocab() {
  state.sat.vocabIndex = (state.sat.vocabIndex - 1 + VOCAB.length) % VOCAB.length;
  state.sat.vocabFlipped = false;
  saveState();
  render();
}

function markSatVocab(known) {
  state.sat.vocabKnown[state.sat.vocabIndex] = known;
  state.sat.vocabFlipped = false;
  state.sat.vocabIndex = (state.sat.vocabIndex + 1) % VOCAB.length;
  saveState();
  render();
}

function setTimerDuration(seconds) {
  state.timer.duration = seconds;
  state.timer.remaining = seconds;
  state.timer.endAt = null;
  saveState();
  render();
}

function setCustomTimer() {
  const input = document.getElementById("customTimerMinutes");
  const minutes = clamp(parseInt(input && input.value, 10) || 25, 1, 180);
  setTimerDuration(minutes * 60);
}

function startTimer() {
  if (state.timer.remaining <= 0) state.timer.remaining = state.timer.duration;
  state.timer.endAt = Date.now() + state.timer.remaining * 1000;
  saveState();
  render();
}

function pauseTimer() {
  refreshTimerState(state, false);
  state.timer.endAt = null;
  saveState();
  render();
}

function resetTimer() {
  state.timer.endAt = null;
  state.timer.remaining = state.timer.duration;
  saveState();
  render();
}

function tickTimer() {
  if (!state.timer.endAt) return;
  const before = state.timer.remaining;
  refreshTimerState(state, true);
  if (before !== state.timer.remaining && state.activeTab === "timer") render();
}

function refreshTimerState(targetState, persist) {
  if (!targetState.timer.endAt) return;
  const diff = targetState.timer.endAt - Date.now();
  if (diff <= 0) {
    targetState.timer.remaining = 0;
    targetState.timer.endAt = null;
    const key = todayKey();
    targetState.timer.sessionsByDate[key] = (targetState.timer.sessionsByDate[key] || 0) + 1;
    if (persist) saveState();
  } else {
    targetState.timer.remaining = Math.ceil(diff / 1000);
  }
}

function ensureBookProgress(bookId) {
  if (!state.pdfProgress[bookId]) {
    state.pdfProgress[bookId] = {
      currentPage: 1,
      completedThrough: 0,
      pages: null,
      available: null,
      complete: false
    };
  }
  return state.pdfProgress[bookId];
}

function isBookComplete(bookId) {
  return Boolean(ensureBookProgress(bookId).complete);
}

function bookPercent(bookId) {
  const progress = ensureBookProgress(bookId);
  if (progress.complete) return 100;
  if (!progress.pages) return 0;
  return Math.round((progress.completedThrough / progress.pages) * 100);
}

function toggleBookComplete(bookId) {
  const progress = ensureBookProgress(bookId);
  progress.complete = !progress.complete;
  if (progress.complete && progress.pages) progress.completedThrough = progress.pages;
  saveState();
  render();
}

function markBookComplete(bookId, complete) {
  const progress = ensureBookProgress(bookId);
  progress.complete = Boolean(complete);
  if (progress.complete && progress.pages) progress.completedThrough = progress.pages;
  saveState();
  render();
}

function openIboBook(bookId) {
  const progress = ensureBookProgress(bookId);
  progress.currentPage = progress.currentPage || Math.max(progress.completedThrough, 1);
  state.ui.selectedBookId = bookId;
  state.activeTab = "ibo";
  saveState();
  render();
  if (location.protocol !== "file:") loadBookDocument(bookId).then(() => render()).catch(() => render());
}

function stepBookPage(step) {
  const progress = ensureBookProgress(state.ui.selectedBookId);
  const maxPage = progress.pages || Math.max(1, progress.currentPage + step);
  progress.currentPage = clamp((progress.currentPage || 1) + step, 1, maxPage);
  saveState();
  render();
}

function jumpToBookPage() {
  const input = document.getElementById("bookPageInput");
  const progress = ensureBookProgress(state.ui.selectedBookId);
  const maxPage = progress.pages || Math.max(progress.currentPage, 1);
  const page = clamp(parseInt(input && input.value, 10) || 1, 1, maxPage);
  progress.currentPage = page;
  saveState();
  render();
}

function markCurrentBookPage() {
  const progress = ensureBookProgress(state.ui.selectedBookId);
  progress.completedThrough = Math.max(progress.completedThrough, progress.currentPage || 1);
  if (progress.pages && progress.completedThrough >= progress.pages) {
    progress.completedThrough = progress.pages;
    progress.complete = true;
  }
  saveState();
  render();
}

async function loadBookDocument(bookId) {
  const book = IBO_BOOKS.find((item) => item.id === bookId);
  if (!book || !window.pdfjsLib) return null;
  if (runtime.pdfDocs[bookId]) return runtime.pdfDocs[bookId];
  if (runtime.pdfLoading[bookId]) return runtime.pdfLoading[bookId];

  const progress = ensureBookProgress(bookId);
  runtime.pdfLoading[bookId] = window.pdfjsLib.getDocument(book.path).promise
    .then((doc) => {
      runtime.pdfDocs[bookId] = doc;
      progress.pages = doc.numPages;
      progress.available = true;
      progress.currentPage = clamp(progress.currentPage || 1, 1, doc.numPages);
      if (progress.complete) progress.completedThrough = doc.numPages;
      saveState();
      return doc;
    })
    .catch((error) => {
      progress.available = false;
      saveState();
      throw error;
    })
    .finally(() => {
      delete runtime.pdfLoading[bookId];
    });

  return runtime.pdfLoading[bookId];
}

async function paintSelectedBookPage() {
  const bookId = state.ui.selectedBookId;
  const progress = ensureBookProgress(bookId);
  if (!progress.available || !progress.pages) return;
  const canvas = document.getElementById("pdfCanvas");
  const stage = document.getElementById("pdfStage");
  if (!canvas || !stage) return;

  const renderToken = ++runtime.pdfRenderToken;
  const doc = await loadBookDocument(bookId);
  if (!doc || renderToken !== runtime.pdfRenderToken) return;

  const pageNumber = clamp(progress.currentPage || 1, 1, doc.numPages);
  const page = await doc.getPage(pageNumber);
  if (renderToken !== runtime.pdfRenderToken) return;

  const baseViewport = page.getViewport({ scale: 1 });
  const maxWidth = Math.max(320, stage.clientWidth - 32);
  const scale = Math.min(2, maxWidth / baseViewport.width);
  const viewport = page.getViewport({ scale });
  const deviceScale = Math.min(window.devicePixelRatio || 1, 2);
  const context = canvas.getContext("2d");

  canvas.width = Math.floor(viewport.width * deviceScale);
  canvas.height = Math.floor(viewport.height * deviceScale);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;
  context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: context, viewport }).promise;
}

function afterRender() {
  if (state.activeTab === "classes" && state.ui.highlightClassId) {
    const element = document.getElementById(`subject-${state.ui.highlightClassId}`);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  if (state.activeTab === "ibo" && location.protocol !== "file:" && state.ui.selectedBookId) {
    loadBookDocument(state.ui.selectedBookId).then(() => paintSelectedBookPage()).catch(() => {});
  }
}

function handleResize() {
  if (state.activeTab === "ibo") paintSelectedBookPage().catch(() => {});
}

function debounce(fn, wait) {
  let timeout = null;
  return function debounced(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}
