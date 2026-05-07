// AP Macro diagnostic — 12 questions, 2 per unit. Used to drive the
// study path (red/amber/green) and the fast-path mode in Phase 6.

export type UnitId = "u1" | "u2" | "u3" | "u4" | "u5" | "u6";

export const UNIT_LABELS: Record<UnitId, string> = {
  u1: "Unit 1 — Basic Concepts",
  u2: "Unit 2 — Indicators & Cycle",
  u3: "Unit 3 — AD/AS",
  u4: "Unit 4 — Money + Two Rates",
  u5: "Unit 5 — Long-run + Phillips",
  u6: "Unit 6 — Open Economy",
};

export const UNIT_WEIGHTS: Record<UnitId, string> = {
  u1: "5–10%",
  u2: "12–17%",
  u3: "17–27%",
  u4: "18–23%",
  u5: "20–30%",
  u6: "10–13%",
};

export type DiagnosticQuestion = {
  id: string;
  unit: UnitId;
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

// Each question is the most-diagnostic for its unit — the one whose miss
// most strongly predicts unit-level weakness.
export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // ─── UNIT 1 ────────────────────────────────────────────────────────
  {
    id: "diag-u1-1",
    unit: "u1",
    prompt: "A linear PPC passes through (0, 20) and (10, 0). Which point is UNATTAINABLE?",
    choices: ["(2, 16)", "(5, 10)", "(7, 7)", "(8, 6)"],
    answer: 2,
    explain: "Slope = −20/10 = −2. Equation: y = 20 − 2x. (7, 7): max y = 20 − 14 = 6. Need 7 > 6 → UNATTAINABLE. The others all sit on or inside the curve.",
  },
  {
    id: "diag-u1-2",
    unit: "u1",
    prompt: "USA can produce 10 cars OR 20 wheat. Mexico can produce 3 cars OR 12 wheat. Comparative advantage in cars belongs to whom?",
    choices: ["USA — fewer cars per worker", "Mexico — fewer cars per worker", "USA — lower opportunity cost", "Mexico — lower opportunity cost"],
    answer: 2,
    explain: "USA's OC of 1 car = 20/10 = 2 wheat. Mexico's OC = 12/3 = 4 wheat. USA gives up LESS wheat per car → USA has comparative advantage in cars (lower OC).",
  },

  // ─── UNIT 2 ────────────────────────────────────────────────────────
  {
    id: "diag-u2-1",
    unit: "u2",
    prompt: "Which is COUNTED in this year's GDP?",
    choices: [
      "Sale of a 2018 used car",
      "Construction of a new home this year",
      "Stock purchase on the NYSE",
      "Social Security check received",
    ],
    answer: 1,
    explain: "Newly produced goods count. Used goods, financial transactions, and transfer payments all excluded.",
  },
  {
    id: "diag-u2-2",
    unit: "u2",
    prompt: "Population 400,000. Working-age 280,000. Labor Force 200,000. Employed 180,000. Unemployment rate?",
    choices: ["5.0%", "7.1%", "10.0%", "20.0%"],
    answer: 2,
    explain: "U Rate = Unemployed / LABOR FORCE × 100 = (200K − 180K) / 200K × 100 = 10%. The denominator is always LF, never population.",
  },

  // ─── UNIT 3 ────────────────────────────────────────────────────────
  {
    id: "diag-u3-1",
    unit: "u3",
    prompt: "A rise in the price level causes",
    choices: [
      "AD to shift left",
      "Movement along AD (less RGDP demanded)",
      "AD to shift right",
      "SRAS to shift left",
    ],
    answer: 1,
    explain: "PL changes cause MOVEMENT along AD via the three effects (wealth, interest rate, exchange rate). They don't shift AD itself.",
  },
  {
    id: "diag-u3-2",
    unit: "u3",
    prompt: "MPC = 0.75. Government raises spending by $200B. Maximum ΔGDP?",
    choices: ["$200B", "$400B", "$600B", "$800B"],
    answer: 3,
    explain: "Spending mult = 1/(1−0.75) = 4. ΔGDP = $200B × 4 = $800B.",
  },

  // ─── UNIT 4 ────────────────────────────────────────────────────────
  {
    id: "diag-u4-1",
    unit: "u4",
    prompt: "Which question lives in the LOANABLE FUNDS market (not the money market)?",
    choices: [
      "What rate does the Fed set?",
      "How much currency is in circulation?",
      "What happens to real rates when the government runs a deficit?",
      "What is M1?",
    ],
    answer: 2,
    explain: "Loanable funds = REAL rate, driven by borrowers/savers. Government deficits → DLF right → real rate up (crowding out). The other questions are money-market territory (Fed, currency, M1).",
  },
  {
    id: "diag-u4-2",
    unit: "u4",
    prompt: "RRR = 20%. New deposit of $5,000. Maximum new lending throughout the system?",
    choices: ["$1,000", "$4,000", "$20,000", "$25,000"],
    answer: 2,
    explain: "Required = $5,000 × 0.20 = $1,000. Excess = $4,000. Money mult = 1/0.20 = 5. Max new loans = $4,000 × 5 = $20,000.",
  },

  // ─── UNIT 5 ────────────────────────────────────────────────────────
  {
    id: "diag-u5-1",
    unit: "u5",
    prompt: "On the LONG-RUN Phillips Curve, the unemployment rate equals",
    choices: ["Zero", "Cyclical only", "NRU (frictional + structural)", "Variable with inflation"],
    answer: 2,
    explain: "LRPC is vertical at NRU. No long-run trade-off — expectations adjust and U returns to NRU regardless of inflation.",
  },
  {
    id: "diag-u5-2",
    unit: "u5",
    prompt: "Crowding out occurs when",
    choices: [
      "The Fed buys bonds and money supply rises",
      "Government deficit raises real rates and reduces private investment",
      "Imports replace domestic production",
      "Inflation reduces consumer purchasing power",
    ],
    answer: 1,
    explain: "Crowding out is in the loanable funds market: gov borrowing → DLF right → real rate up → private I down. Reduces long-run capital formation.",
  },

  // ─── UNIT 6 ────────────────────────────────────────────────────────
  {
    id: "diag-u6-1",
    unit: "u6",
    prompt: "Higher US real interest rates will most likely cause",
    choices: [
      "Capital outflow and dollar depreciation",
      "Capital inflow and dollar appreciation",
      "No effect on capital flows",
      "US imports to fall immediately",
    ],
    answer: 1,
    explain: "Foreign investors seek higher US returns → buy USD-denominated assets → demand for USD rises → dollar APPRECIATES. Capital INFLOW.",
  },
  {
    id: "diag-u6-2",
    unit: "u6",
    prompt: "Country X has a current account deficit of $250B. Its financial account must be",
    choices: ["Deficit of $250B", "Surplus of $250B", "Balanced", "Cannot be determined"],
    answer: 1,
    explain: "CA + FA = 0. CA = −$250B → FA = +$250B (capital inflow). Trade deficit and capital inflow are mirror images.",
  },
];

export type UnitBand = "red" | "amber" | "green";

export function bandFor(correct: number, total: number): UnitBand {
  const pct = total > 0 ? correct / total : 0;
  if (pct <= 0.5) return "red";
  if (pct < 0.75) return "amber";
  return "green";
}

export const ALL_UNITS: UnitId[] = ["u1", "u2", "u3", "u4", "u5", "u6"];
