export type IBOChapter = {
  id: string;
  number: number;
  title: string;
  range: string;
  priority: "critical" | "high" | "medium";
  topics: string[];
};

export const IBO_CHAPTERS: IBOChapter[] = [
  {
    id: "ch1", number: 1, title: "Financial Management", range: "May 9 → May 16",
    priority: "critical",
    topics: [
      "Income statement: revenue, COGS, gross profit, EBIT, net income",
      "Balance sheet: assets = liabilities + equity",
      "Cash flow: CFO, CFI, CFF + non-cash adjustments",
      "Liquidity: current ratio, quick ratio",
      "Profitability: gross margin, ROE, DuPont",
      "Solvency: debt-to-equity",
    ],
  },
  {
    id: "ch2", number: 2, title: "Marketing & Sales", range: "May 17 → May 24",
    priority: "critical",
    topics: [
      "STP: segmentation, targeting, positioning",
      "4 Ps: product, price, place, promotion",
      "Distribution + promotion mix",
      "Consumer decision process",
      "CRM metrics, digital marketing",
      "Social platform fit",
    ],
  },
  {
    id: "ch3", number: 3, title: "Entrepreneurship", range: "May 25 → Jun 1",
    priority: "high",
    topics: [
      "Entrepreneur types, idea validation",
      "Business Model Canvas",
      "Revenue models",
      "Break-even, contribution margin",
      "Funding ladder",
      "Ansoff matrix, pivot types",
    ],
  },
  {
    id: "ch4", number: 4, title: "Administration & Management", range: "Jun 2 → Jun 9",
    priority: "high",
    topics: [
      "HRM cycle, onboarding",
      "Interview types, STAR responses",
      "Training evaluation, performance",
      "Conflict styles, lean wastes",
      "EOQ, earned value",
      "Project scheduling",
    ],
  },
  {
    id: "ch5", number: 5, title: "Global Business", range: "Jun 10 → Jun 17",
    priority: "high",
    topics: [
      "Trade theories",
      "Porter diamond",
      "Market entry: risk/control",
      "Trade blocs",
      "Culture frameworks",
      "FX impacts",
    ],
  },
  {
    id: "ch6", number: 6, title: "Strategic Planning", range: "Jun 18 → Jun 25",
    priority: "critical",
    topics: [
      "Vision, mission, objectives",
      "SWOT, TOWS, PESTLE",
      "Porter five forces, generic strategies",
      "VRIO, decision models",
      "Cognitive biases",
      "Change models, innovation",
    ],
  },
  {
    id: "ch7", number: 7, title: "Business Ethics & CSR", range: "Jun 26 → Jul 3",
    priority: "medium",
    topics: [
      "Carroll's CSR pyramid",
      "Ethical frameworks",
      "Corporate governance",
      "ESG, emissions scopes",
      "Stakeholder mapping",
      "CSR reporting, greenwashing",
    ],
  },
];

export type IBOBook = {
  id: string;
  title: string;
  author: string;
  phase: 2 | 3;
  why: string;
};

export const IBO_BOOKS: IBOBook[] = [
  { id: "trusted-advisor", title: "The Trusted Advisor", author: "David Maister", phase: 2, why: "Foundation for client and judge trust." },
  { id: "crack-the-case", title: "Crack the Case", author: "David Ohrvall", phase: 2, why: "Direct case interview prep." },
  { id: "case-in-point", title: "Case In Point", author: "Marc Cosentino", phase: 2, why: "Comprehensive case + framework coverage." },
  { id: "mckinsey-way", title: "The McKinsey Way", author: "Ethan Rasiel", phase: 2, why: "Problem-solving approach." },
  { id: "pyramid-principle", title: "The Pyramid Principle", author: "Barbara Minto", phase: 2, why: "Sharper communication." },
  { id: "strategy-mgmt", title: "Strategy Management", author: "Thompson & Strickland", phase: 3, why: "Strategic management deep cut." },
  { id: "bcg-strategy", title: "BCG on Strategy", author: "Stern & Deimler", phase: 3, why: "Real consulting frameworks." },
  { id: "say-with-charts", title: "Say it with Charts", author: "Gene Zelazny", phase: 3, why: "Slide communication." },
  { id: "napkins", title: "Unfolding the Napkins", author: "Dan Roam", phase: 3, why: "Visual thinking for cases." },
  { id: "visualizing-this", title: "Visualizing This", author: "Nathan Yau", phase: 3, why: "Data viz best practices." },
  { id: "slideology", title: "Slide:ology", author: "Nancy Duarte", phase: 3, why: "Presentation polish." },
];

export type IBOCase = {
  id: string;
  title: string;
  detail: string;
};

export const IBO_CASES: IBOCase[] = [
  { id: "obj-data", title: "Objective: data interpretation", detail: "Read tables/charts, infer in <45s each." },
  { id: "obj-calc", title: "Objective: calculations", detail: "Financial ratios, growth %, market share." },
  { id: "obj-frame", title: "Objective: framework application", detail: "Spot the right framework in <10s." },
  { id: "open-score", title: "Open: SCORE structure", detail: "Situation, complication, options, recommendation, evidence." },
  { id: "open-entry", title: "Open: market entry", detail: "Options matrix, risks, recommendation." },
  { id: "open-fin", title: "Open: financial diagnosis", detail: "Diagnose from P&L or BS, recommend actions." },
  { id: "pres-7min", title: "Presentation: 7-min video", detail: "Hook, situation, analysis, recommendation, risks, close." },
  { id: "speed", title: "Speed drill: 300 in 150 min", detail: "Train to 2 questions/min." },
  { id: "mock-full", title: "Mock full exam", detail: "Timed 150 min, root-cause every miss." },
  { id: "team", title: "Team case prep", detail: "Roles assigned, full dry runs before Aug 15." },
];

export const IBO_KEY_DATES = [
  { id: "sprint-start", date: "2026-05-09", label: "Sprint starts", detail: "Phase 1 chapter mastery begins." },
  { id: "may16", date: "2026-05-16", label: "Ch 1 checkpoint", detail: "Financial Management complete." },
  { id: "reg-reminder", date: "2026-07-11", label: "Registration reminder", detail: "2 weeks until close." },
  { id: "reg-close", date: "2026-07-25", label: "Registration closes", detail: "Final deadline." },
  { id: "ready-date", date: "2026-08-03", label: "Grand Test ready", detail: "Final review only after this." },
  { id: "test-open", date: "2026-08-08", label: "Grand Test opens", detail: "150 min, 300 MCQ. Window: Aug 8–14." },
];
