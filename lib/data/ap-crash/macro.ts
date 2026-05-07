// AP MACRO — full course content. Encoded directly from AP_Macro_48Hr_Mastery v3.
// Modules ordered for one-night study. Total estimate ~5h.

import type { Course, Module } from "./types";

// ─────────────────────────────────────────────────────────────────────
// MODULE 1 — The Connected Macro Model (the hub diagram)
// ─────────────────────────────────────────────────────────────────────
const MOD_HUB: Module = {
  id: "macro-hub",
  partNumber: 1,
  title: "The Connected Macro Model",
  subtitle: "One model, six graphs. The wiring diagram every other section refers back to.",
  estimateMin: 25,
  priority: "must",
  lessons: [
    {
      id: "hub-overview",
      title: "Why this is the only diagram that matters",
      estimateMin: 8,
      steps: [
        {
          type: "read",
          title: "Macro is one connected model, not six separate units",
          body: [
            "Most students study macro as 6 separate units. Students who score 5s study it as ONE connected model. Every shock cascades through the same fixed sequence of markets.",
            "On every 'trace through all markets' FRQ, you do exactly this: (1) identify the initial shock and which market it hits FIRST, (2) read the equilibrium change in that market, (3) follow the arrow to the next market, (4) repeat until you reach AD/AS, (5) read off PL, RGDP, U, then trace into Phillips curve and forex if needed.",
            "Different shocks enter at different points. Monetary policy enters at the Money Market. Fiscal enters at Loanable Funds. Confidence shocks enter directly at AD. The chain after the entry point is the same.",
          ],
          callouts: [
            {
              kind: "insight",
              title: "AD/AS is the hub",
              body: "Every chain ends at AD/AS, where PL, RGDP, and U are read off. Phillips curve and forex are auxiliary — they trace the AD/AS result.",
            },
          ],
        },
        {
          type: "read",
          title: "The six markets and their flow",
          body: [
            "Money Market (nominal rate) and Loanable Funds (real rate) sit upstream. Both feed Investment and durables-Consumption.",
            "AD/AS is the hub — Investment and consumption changes shift AD; supply shocks shift SRAS; long-run growth shifts LRAS.",
            "Phillips Curve translates AD/AS movement into inflation/unemployment space.",
            "Forex Market handles capital flows and exchange rates, then feeds NX back into AD.",
          ],
        },
      ],
    },
    {
      id: "hub-graphs",
      title: "The six graphs at a glance",
      estimateMin: 8,
      steps: [
        {
          type: "read",
          title: "Memorize axes for every graph",
          body: [
            "Supply & Demand: Y = Price, X = Quantity. Demand shifters use TRIBE (Tastes, Related goods, Income, Buyers, Expectations). Supply shifters: input prices, productivity, sellers, taxes/subsidies, expectations.",
            "AD/AS: Y = Price Level, X = Real GDP. SRAS shifts: input prices, productivity, expected inflation. LRAS shifts: capital, labor, technology, human capital. AD shifts: any non-PL change in C, I, G, or X−M.",
            "Money Market: Y = Nominal interest rate, X = Quantity of money. MS shifts: Fed buys/sells bonds, RR, discount rate, IORB. MD shifts: real GDP, price level.",
            "Loanable Funds: Y = Real interest rate, X = Quantity of LF. SLF shifts: savings, capital inflow, gov surplus. DLF shifts: gov deficit, business confidence, investment incentives.",
            "Phillips Curve: Y = Inflation, X = Unemployment. LRPC vertical at NRU. SRPC shifts on expected inflation, supply shocks. AD shifts cause MOVEMENT along SRPC.",
            "Forex Market: Y = Exchange rate, X = Quantity of currency. Demand for $: foreign income, foreign tastes, US rates ↑. Supply of $: US income, US inflation, US tastes for foreign goods, US rates ↓.",
          ],
          callouts: [
            {
              kind: "trap",
              title: "Identify the model in <5 seconds",
              body: "Look at the axis labels. PL/RGDP = AD/AS. Nominal i / Q money = Money Market. Real i / Q LF = Loanable Funds. Inflation / Unemployment = Phillips. Exchange rate / Q currency = Forex.",
            },
          ],
        },
      ],
    },
    {
      id: "hub-foundations",
      title: "Eight foundational facts (memorize)",
      estimateMin: 9,
      steps: [
        {
          type: "read",
          title: "The eight facts that solve half of MCQs",
          body: [
            "1. Comparative advantage = LOWER opportunity cost. OUTPUT table: OC = Other/Own. INPUT table: OC = Own/Other. Trade benefits both when terms fall BETWEEN the two countries' OCs.",
            "2. PPC: on curve = efficient. Inside = recession/inefficiency. Outside = unattainable. Outward shift = growth.",
            "3. GDP = C + I + G + (X−M). COUNTS: final goods, NEW housing (I), inventory changes (I), gov wages. NOT counted: used goods, intermediate goods, stocks/bonds, transfers, household production, illegal economy.",
            "4. Real ≈ Nominal − Inflation. Applies to interest rates, wages, GDP growth.",
            "5. Inflation winners: borrowers, gov with debt, asset owners. Losers: lenders, fixed-income earners, cash holders. ONLY UNEXPECTED inflation redistributes.",
            "6. Discouraged workers are NOT in the labor force. When excluded, official rate UNDERSTATES true unemployment.",
            "7. Bond prices and interest rates move INVERSELY. Always.",
            "8. Demand-pull (AD right): PL ↑, RGDP ↑, U ↓. Cost-push (SRAS left): PL ↑, RGDP ↓, U ↑ — STAGFLATION. Only cost-push moves PL and RGDP in opposite directions.",
          ],
          callouts: [
            {
              kind: "memory",
              title: "Stagflation signature",
              body: "If you see PL ↑ AND RGDP ↓, the shock is a SRAS leftward shift (cost-push). No other shock produces this combination.",
            },
          ],
        },
        {
          type: "flashcards",
          title: "Quick recall — the 8 facts",
          cards: [
            { front: "Comparative advantage rule", back: "Lower opportunity cost wins. OUTPUT table: OC = Other/Own. INPUT table: OC = Own/Other." },
            { front: "PPC inside the curve means", back: "Recession or unemployed/inefficient resources. NOT growth." },
            { front: "Three things excluded from GDP", back: "Used goods, intermediate goods, stocks/bonds (financial transactions). Also: transfers, household production, illegal economy." },
            { front: "Bond prices and interest rates", back: "INVERSE. Bond prices ↑ ⟺ rates ↓. Fed buys bonds → prices ↑ → rates ↓." },
            { front: "Discouraged workers", back: "NOT in labor force. When excluded, official rate UNDERSTATES true unemployment." },
            { front: "Stagflation signature", back: "PL ↑ AND RGDP ↓. Caused by SRAS LEFT shift." },
            { front: "Inflation redistributes when", back: "ONLY when UNEXPECTED. Expected inflation gets priced into nominal rates." },
            { front: "Real interest rate formula", back: "Real i ≈ Nominal i − Inflation (Fisher equation)." },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 2 — Calculation Fluency
// ─────────────────────────────────────────────────────────────────────
const MOD_CALC: Module = {
  id: "macro-calc",
  partNumber: 4,
  title: "Calculation Fluency",
  subtitle: "Every formula the AP exam tests. Drill until each is under 30 seconds.",
  estimateMin: 35,
  priority: "must",
  lessons: [
    {
      id: "calc-gdp",
      title: "GDP, Real GDP, Deflator, CPI",
      estimateMin: 8,
      steps: [
        {
          type: "formula",
          title: "GDP family",
          formulas: [
            "GDP = C + I + G + (X − M)",
            "Real GDP = (Nominal GDP / GDP Deflator) × 100",
            "GDP Deflator = (Nominal GDP / Real GDP) × 100",
            "CPI = (Cost of basket now / Cost in base year) × 100",
            "Inflation Rate = ((CPI₂ − CPI₁) / CPI₁) × 100",
          ],
          callout: {
            kind: "trap",
            title: "Multiply by 100 — always",
            body: "Real GDP and Deflator formulas both multiply by 100. Forgetting this gives an answer 100× too small.",
          },
        },
        {
          type: "example",
          title: "Real GDP from Nominal + Deflator",
          prompt: "Nominal GDP 2024 = $1,500B. GDP Deflator 2024 = 125. Find Real GDP.",
          solution: [
            "Real GDP = (Nominal GDP / Deflator) × 100",
            "Real GDP = (1,500 / 125) × 100 = 12 × 100",
            "Real GDP = $1,200B",
          ],
          takeaway: "In base-year prices, the economy produced $1,200B worth of goods and services.",
        },
        {
          type: "example",
          title: "Inflation between two years",
          prompt: "CPI 2023 = 240. CPI 2024 = 252. Find inflation 2023→2024.",
          solution: [
            "Inflation = (CPI₂ − CPI₁) / CPI₁ × 100",
            "Inflation = (252 − 240) / 240 × 100 = 12/240 × 100",
            "Inflation = 5%",
          ],
        },
        {
          type: "drill",
          prompt: "Nominal GDP = $2,400B. Deflator = 120. Find Real GDP.",
          answer: "$2,000B",
          steps: ["Real GDP = (2,400 / 120) × 100 = 20 × 100 = $2,000B"],
        },
        {
          type: "drill",
          prompt: "Real GDP = $5,000B. Nominal GDP = $6,000B. Find the GDP deflator.",
          answer: "120",
          steps: ["Deflator = (Nominal / Real) × 100 = (6,000 / 5,000) × 100 = 120"],
        },
        {
          type: "drill",
          prompt: "CPI rose from 180 to 198. Find inflation rate.",
          answer: "10%",
          steps: ["Inflation = (198 − 180) / 180 × 100 = 18/180 × 100 = 10%"],
        },
      ],
    },
    {
      id: "calc-percapita",
      title: "Per Capita Real GDP / Standard of Living",
      estimateMin: 4,
      steps: [
        {
          type: "formula",
          title: "Standard of living formula",
          formulas: ["Real GDP per capita = Real GDP / Population"],
          callout: {
            kind: "insight",
            title: "Standard of living tracks per-capita real GDP",
            body: "If real GDP grows 5% but population grows 5%, standard of living is unchanged. This is the Fehran FRQ Part C trap.",
          },
        },
        {
          type: "example",
          title: "Fehran 2011 vs 2012",
          prompt: "2011: Real GDP $150,000, population 100. 2012: Real GDP $180,000, population 120.",
          solution: [
            "Per capita 2011 = 150,000 / 100 = $1,500",
            "Per capita 2012 = 180,000 / 120 = $1,500",
            "Standard of living STAYED THE SAME — both grew by 20%.",
          ],
        },
        {
          type: "drill",
          prompt: "Real GDP rises 8%. Population rises 3%. Approximately what happens to per-capita real GDP?",
          answer: "≈ +5%",
          steps: ["Per capita growth ≈ Real GDP growth − Population growth = 8% − 3% = ~5%."],
        },
      ],
    },
    {
      id: "calc-unemployment",
      title: "Unemployment Rate, LFPR",
      estimateMin: 5,
      steps: [
        {
          type: "formula",
          title: "Labor market formulas",
          formulas: [
            "Labor Force = Employed + Unemployed (actively seeking)",
            "Unemployment Rate = (Unemployed / Labor Force) × 100",
            "LFPR = (Labor Force / Working-Age Population) × 100",
            "Natural Rate = Frictional + Structural",
          ],
          callout: {
            kind: "trap",
            title: "LF in the denominator, never population",
            body: "Population includes children, retirees, and those not seeking work. LF is the denominator for U rate. ALWAYS.",
          },
        },
        {
          type: "example",
          title: "U rate trap from your Q4",
          prompt: "Population = 250,000. Labor Force = 200,000. Employed = 175,000. Find U rate.",
          solution: [
            "Unemployed = LF − Employed = 200,000 − 175,000 = 25,000",
            "U Rate = 25,000 / 200,000 × 100 = 12.5%",
            "TRAP: Don't divide by 250,000 (would give 10% — the trap answer).",
          ],
        },
        {
          type: "example",
          title: "Discouraged worker effect",
          prompt: "LF = 150M, Employed = 140M, Unemployed = 10M. 5M discouraged workers re-enter, still seeking. New U rate?",
          solution: [
            "Original: 10/150 = 6.67%",
            "New LF = 155M, Unemployed = 15M",
            "New U Rate = 15/155 = 9.68%",
            "Official rate ROSE even though no real worsening.",
          ],
          takeaway: "Discouraged workers leaving → official rate FALLS while true joblessness is unchanged.",
        },
        {
          type: "drill",
          prompt: "Population 500,000. Working-age 380,000. LF 280,000. Employed 252,000. Find U rate and LFPR.",
          answer: "U rate 10%, LFPR ≈ 73.7%",
          steps: [
            "Unemployed = 280K − 252K = 28K",
            "U Rate = 28/280 × 100 = 10%",
            "LFPR = 280/380 × 100 ≈ 73.7%",
          ],
        },
      ],
    },
    {
      id: "calc-multipliers",
      title: "Spending, Tax, Balanced Budget Multipliers",
      estimateMin: 8,
      steps: [
        {
          type: "formula",
          title: "Multiplier formulas",
          formulas: [
            "MPC + MPS = 1",
            "Spending Multiplier = 1/MPS = 1/(1−MPC)",
            "Tax Multiplier = −MPC/MPS",
            "Balanced Budget Multiplier = 1 (ALWAYS)",
            "ΔGDP = ΔSpending × Spending Mult + ΔTaxes × Tax Mult",
          ],
          mnemonic: "Tax mult absolute value = Spending mult − 1",
        },
        {
          type: "read",
          title: "Five multiplier values to memorize",
          body: [
            "MPC = 0.50 → Spending mult 2, Tax mult −1",
            "MPC = 0.60 → Spending mult 2.5, Tax mult −1.5",
            "MPC = 0.75 → Spending mult 4, Tax mult −3",
            "MPC = 0.80 → Spending mult 5, Tax mult −4",
            "MPC = 0.90 → Spending mult 10, Tax mult −9",
          ],
          callouts: [
            {
              kind: "trap",
              title: "MULTIPLY vs DIVIDE — read the question",
              body: "Type A: 'What's the change in GDP from $200B in spending?' → MULTIPLY (ΔGDP = $200B × mult). Type B: 'What change in spending closes a $200B gap?' → DIVIDE (ΔSpending = $200B / mult). Most lost points come from this confusion.",
            },
          ],
        },
        {
          type: "example",
          title: "Calibrating policy to close a recessionary gap",
          prompt: "Recessionary gap = $400B. MPC = 0.75. What ΔG closes it? What ΔT (cut) closes it?",
          solution: [
            "Spending mult = 1/(1−0.75) = 4. Tax mult = −0.75/0.25 = −3.",
            "Option G: ΔG × 4 = $400B → ΔG = +$100B",
            "Option T: ΔT × (−3) = $400B → ΔT = −$133.3B",
            "Tax cuts must be LARGER than spending increases — only MPC of the tax cut enters the spending stream initially.",
          ],
        },
        {
          type: "example",
          title: "Balanced budget — your Q5",
          prompt: "MPC = 0.8. ΔG = +$100M, ΔT = +$100M. Find ΔGDP.",
          solution: [
            "Spending mult = 5, Tax mult = −4",
            "ΔGDP = 100 × 5 + 100 × (−4) = 500 − 400 = +$100M",
            "Shortcut: balanced budget mult = 1, so ΔGDP = ΔG = +$100M",
          ],
          takeaway: "Balanced budget mult is ALWAYS 1, regardless of MPC.",
        },
        {
          type: "drill",
          prompt: "MPC = 0.8. Output gap is $1,000B (recessionary). What change in taxes closes it?",
          answer: "Cut taxes by $250B",
          steps: [
            "Tax mult = −0.8/0.2 = −4",
            "ΔT × (−4) = $1,000B → ΔT = −$250B",
          ],
        },
        {
          type: "drill",
          prompt: "MPC = 0.6. Government raises G by $400B and T by $400B. Find ΔGDP.",
          answer: "+$400B",
          steps: ["Balanced budget multiplier = 1, so ΔGDP = ΔG = +$400B."],
        },
      ],
    },
    {
      id: "calc-money",
      title: "Money Multiplier and Banking",
      estimateMin: 5,
      steps: [
        {
          type: "formula",
          title: "Banking formulas",
          formulas: [
            "Required Reserves = Deposits × RRR",
            "Excess Reserves = Total Reserves − Required Reserves",
            "Money Multiplier = 1 / RRR",
            "Maximum ΔMS (from new lending) = Excess Reserves × Money Mult",
          ],
          callout: {
            kind: "trap",
            title: "Initial deposit vs initial excess reserves",
            body: "$1,000 deposit, RRR = 10%: excess CREATED = $900. Max NEW LOANS = $900 × 10 = $9,000. Max total ΔMS (including the deposit) = $1,000 × 10 = $10,000. Read the question carefully.",
          },
        },
        {
          type: "example",
          title: "Full chain — RRR = 10%, $1,000 deposit",
          prompt: "RRR = 10%. Bank receives a NEW $1,000 deposit. Find required, excess, money mult, max new loans.",
          solution: [
            "Required = 1,000 × 0.10 = $100",
            "Excess = 1,000 − 100 = $900",
            "Money multiplier = 1/0.10 = 10",
            "Max new loans = $900 × 10 = $9,000",
            "Max total ΔMS (including the original deposit) = $1,000 × 10 = $10,000",
          ],
        },
        {
          type: "drill",
          prompt: "RRR = 25%. New deposit of $2,000. Find max new lending.",
          answer: "$6,000",
          steps: [
            "Required = 2,000 × 0.25 = $500",
            "Excess = $1,500",
            "Mult = 1/0.25 = 4",
            "Max new loans = $1,500 × 4 = $6,000",
          ],
        },
      ],
    },
    {
      id: "calc-real-rate",
      title: "Real Interest Rate (Fisher) and Quantity Theory",
      estimateMin: 5,
      steps: [
        {
          type: "formula",
          title: "Fisher and Quantity Theory",
          formulas: [
            "Real i ≈ Nominal i − Inflation",
            "MV = PQ",
            "%ΔP ≈ %ΔM − %ΔQ (when V constant)",
          ],
          callout: {
            kind: "trap",
            title: "Investment is driven by REAL rate, not nominal",
            body: "If nominal rises 2% but inflation rises 4%, real rate FELL 2% → investment INCREASES. Always identify which rate the question is about.",
          },
        },
        {
          type: "drill",
          prompt: "Nominal = 8%, inflation = 3%. Find real rate.",
          answer: "≈ 5%",
          steps: ["Real ≈ Nominal − Inflation = 8 − 3 = 5%"],
        },
        {
          type: "drill",
          prompt: "Nominal rises from 5% to 7%. Inflation rises from 2% to 5%. What happens to real rate?",
          answer: "Real fell 1 percentage point (from 3% to 2%)",
          steps: [
            "Original: Real = 5 − 2 = 3%",
            "New: Real = 7 − 5 = 2%",
            "Real rate FELL 1 percentage point.",
          ],
        },
        {
          type: "drill",
          prompt: "Money supply grows 8%, V constant, real output grows 2%. Find inflation.",
          answer: "≈ 6%",
          steps: ["%ΔP ≈ %ΔM − %ΔQ = 8 − 2 = 6%"],
        },
      ],
    },
  
    {
      id: "calc-flashcards",
      title: "Calculation cards",
      estimateMin: 3,
      steps: [
        {
          type: "flashcards",
          title: "Formula recall",
          cards: [
            { front: "Real GDP formula", back: "Real GDP = (Nominal / Deflator) × 100." },
            { front: "GDP Deflator formula", back: "Deflator = (Nominal / Real) × 100." },
            { front: "Inflation rate", back: "(CPI₂ − CPI₁) / CPI₁ × 100." },
            { front: "Unemployment rate", back: "(Unemployed / Labor Force) × 100. Denominator = LF, not population." },
            { front: "LFPR formula", back: "LF / Working-age Population × 100." },
            { front: "Spending multiplier formula", back: "1 / MPS = 1 / (1 − MPC)." },
            { front: "Tax multiplier formula", back: "−MPC / MPS. Magnitude is Spending mult − 1." },
            { front: "Balanced budget multiplier", back: "1. Always." },
            { front: "Money multiplier formula", back: "1 / RRR." },
            { front: "Real interest rate (Fisher)", back: "Real ≈ Nominal − Inflation." },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 3 — Indeterminacy Mastery
// ─────────────────────────────────────────────────────────────────────
const MOD_INDET: Module = {
  id: "macro-indet",
  partNumber: 5,
  title: "Indeterminacy Mastery",
  subtitle: "The 'both curves shift' rule. One rule, six markets, multiple MCQs.",
  estimateMin: 15,
  priority: "must",
  lessons: [
    {
      id: "indet-rule",
      title: "The universal rule",
      estimateMin: 6,
      steps: [
        {
          type: "read",
          title: "Same direction → Q determined. Opposite → P determined.",
          body: [
            "When BOTH curves shift in the SAME DIRECTION: Quantity is DETERMINED. Price is INDETERMINATE.",
            "When BOTH curves shift in OPPOSITE DIRECTIONS: Price is DETERMINED. Quantity is INDETERMINATE.",
            "Same → Q. Opposite → P. Memorize.",
            "This rule applies to EVERY market on the AP exam: goods, money, loanable funds, forex, reserves. One rule, six applications.",
          ],
          callouts: [
            {
              kind: "memory",
              title: "S/O → Q/P mnemonic",
              body: "Same direction tells you Quantity. Opposite directions tells you Price.",
            },
          ],
        },
      ],
    },
    {
      id: "indet-money-fiscal",
      title: "Compound fiscal + monetary on the real rate",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "How fiscal and monetary push real rates oppositely",
          body: [
            "Expansionary FISCAL: gov borrows → DLF right → real rate UP.",
            "Expansionary MONETARY: Fed adds liquidity → SLF right → real rate DOWN.",
            "Contractionary FISCAL: gov stops borrowing → DLF left → real rate DOWN.",
            "Contractionary MONETARY: Fed drains liquidity → SLF left → real rate UP.",
          ],
        },
        {
          type: "read",
          title: "The compound policy table",
          body: [
            "Both expansionary: AD ↑↑ DEFINITE. Real rate INDETERMINATE (forces opposite — fiscal up, monetary down).",
            "Both contractionary: AD ↓↓ DEFINITE. Real rate INDETERMINATE (fiscal down, monetary up).",
            "Expansionary fiscal + Contractionary monetary: AD INDETERMINATE. Real rate ↑↑ DEFINITE (both up).",
            "Contractionary fiscal + Expansionary monetary: AD INDETERMINATE. Real rate ↓↓ DEFINITE (both down).",
          ],
          callouts: [
            {
              kind: "insight",
              title: "Q9 territory",
              body: "Both contractionary (Q9 setup): RGDP DEFINITELY DOWN. Interest rates INDETERMINATE. Answer E.",
            },
          ],
        },
      ],
    },
    {
      id: "indet-drill",
      title: "Recognition drill",
      estimateMin: 4,
      steps: [
        {
          type: "mcq",
          prompt: "Income rises (MD up) AND Fed buys bonds (MS up). Effect on the nominal interest rate?",
          choices: ["Definitely rises", "Definitely falls", "Indeterminate", "No change"],
          answer: 2,
          explain: "MS right pushes rate down. MD right pushes rate up. Same direction shifts → Q (of money) determined, P (rate) INDETERMINATE.",
        },
        {
          type: "mcq",
          prompt: "Government runs a deficit (DLF up) AND foreign capital inflows (SLF up). Effect on the real rate?",
          choices: ["Definitely rises", "Definitely falls", "Indeterminate", "No change"],
          answer: 2,
          explain: "DLF up pushes rate up. SLF up pushes rate down. Same-direction (both right) → Q (of LF) definitely up, P (real rate) INDETERMINATE.",
        },
        {
          type: "mcq",
          prompt: "Bad weather destroys crops (S left) AND consumer income rises for a normal good (D up). Effect on price and quantity?",
          choices: ["P up, Q up", "P up, Q indeterminate", "P indeterminate, Q up", "P down, Q indeterminate"],
          answer: 1,
          explain: "Opposite directions (S left, D right). Price DEFINITELY UP. Quantity INDETERMINATE.",
        },
      ],
    },
  
    {
      id: "indet-more-mcqs",
      title: "Universal rule across markets — extra reps",
      estimateMin: 4,
      steps: [
        {
          type: "mcq",
          prompt: "In the forex market, US income rises (S_USD shifts right) AND foreign income rises (D_USD shifts right). What happens to the equilibrium quantity of USD traded?",
          choices: ["Definitely rises", "Definitely falls", "Indeterminate", "No change"],
          answer: 0,
          explain: "Both shifts push quantity up (S right increases Q, D right increases Q). Same-direction quantity effect → DEFINITELY UP. The exchange rate is INDETERMINATE since they push price oppositely.",
          trap: "Don't confuse the rule. Same-direction shifts → quantity is determined. Opposite-direction shifts → price is determined.",
        },
        {
          type: "mcq",
          prompt: "A bumper crop year (S right) AND consumer income falls for a normal good (D left). Effect on price and quantity?",
          choices: [
            "P up, Q up",
            "P up, Q indeterminate",
            "P down, Q indeterminate",
            "P indeterminate, Q down",
          ],
          answer: 2,
          explain: "S right pushes P down; D left also pushes P down. SAME direction on price → P definitely DOWN. Q goes opposite ways (S right ↑Q, D left ↓Q) → INDETERMINATE.",
          trap: "Re-derive each shift's separate impact. Both push P down here even though they look like 'opposite shifts' at first glance.",
        },
        {
          type: "mcq",
          prompt: "In the reserve market, the Fed lowers IORB (RD shifts down) AND simultaneously increases reserves (RS right). Effect on the equilibrium federal funds rate?",
          choices: ["Definitely rises", "Definitely falls", "Indeterminate", "No change in equilibrium"],
          answer: 1,
          explain: "Lower IORB: RD effectively shifts down (lower demand for holding reserves at any rate). RS right pushes the policy rate down. Both push rate DOWN → DEFINITELY DOWN.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 4 — Unit 3 Deep: AD/AS as the Hub
// ─────────────────────────────────────────────────────────────────────
const MOD_U3: Module = {
  id: "macro-u3",
  partNumber: 6,
  title: "Unit 3 Deep — AD/AS Hub",
  subtitle: "17–27% of the exam. The most-graphed model. Every chain ends here.",
  estimateMin: 30,
  priority: "must",
  lessons: [
    {
      id: "u3-ad-down",
      title: "Why AD slopes down (the three effects)",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "Three effects = SHAPE of AD, not shifters",
          body: [
            "1. WEALTH effect: higher PL erodes the real value of nominal assets (cash, bonds). People feel poorer → spend less.",
            "2. INTEREST RATE effect: higher PL → people need more money for transactions → MD ↑ → nominal rate ↑ → I and durables-C ↓.",
            "3. EXCHANGE RATE effect: higher US PL → US goods more expensive than foreign → X ↓, M ↑ → (X−M) ↓.",
          ],
          callouts: [
            {
              kind: "trap",
              title: "These are NOT shifters",
              body: "These three effects explain why AD slopes downward. They cause MOVEMENT ALONG AD when PL changes (e.g., when AS shifts). AD shifts only when C, I, G, or (X−M) changes for non-PL reasons.",
            },
          ],
        },
      ],
    },
    {
      id: "u3-shifters",
      title: "AD shifters (CIGXM) and SRAS shifters",
      estimateMin: 8,
      steps: [
        {
          type: "read",
          title: "AD shifters — the CIGXM framework",
          body: [
            "C — Consumption: ↑ confidence/wealth, ↓ taxes, ↑ transfers, ↓ rates, ↓ household debt → AD right.",
            "I — Investment: ↑ business confidence, ↓ real rate, ↓ business taxes, ↑ technology, investment tax credits → AD right.",
            "G — Gov spending: ↑ G (expansionary fiscal) → AD right.",
            "X − M — Net exports: ↑ foreign income, dollar DEPRECIATES (US goods cheaper abroad) → AD right.",
          ],
        },
        {
          type: "read",
          title: "SRAS shifters",
          body: [
            "Input prices (wages, oil, raw materials) ↑ → SRAS LEFT.",
            "Productivity / technology ↑ → SRAS RIGHT.",
            "Expected inflation ↑ → workers demand higher wages → SRAS LEFT.",
            "Business taxes / regulation ↑ → SRAS LEFT.",
            "Subsidies ↑ → SRAS RIGHT.",
            "Negative supply shock (disaster, war, oil spike) → SRAS LEFT.",
          ],
        },
        {
          type: "read",
          title: "LRAS — vertical at potential GDP",
          body: [
            "LRAS is VERTICAL at the economy's potential output. Long-run output is INDEPENDENT of PL because in the long run all wages and prices are flexible.",
            "On the LRAS, U = NRU. Cyclical unemployment = 0.",
            "PPC and LRAS shift TOGETHER (your Q13 tested this).",
            "LRAS shifters: more labor (immigration, LFPR), more capital (investment), more natural resources, better education (human capital), better technology, productivity gains.",
          ],
        },
      ],
    },
    {
      id: "u3-equilibria",
      title: "The three equilibria + self-correction",
      estimateMin: 8,
      steps: [
        {
          type: "read",
          title: "Three equilibria — read them off the graph",
          body: [
            "LR equilibrium: AD/SRAS intersect ON LRAS. RGDP = potential. U = NRU. Cyclical = 0.",
            "Recessionary gap: AD/SRAS intersect LEFT of LRAS. RGDP < potential. U > NRU. Cyclical exists.",
            "Inflationary gap: AD/SRAS intersect RIGHT of LRAS. RGDP > potential. U < NRU.",
          ],
        },
        {
          type: "read",
          title: "Self-correction (classical view)",
          body: [
            "Recessionary gap → high U puts downward pressure on wages → lower input costs → SRAS shifts RIGHT → return to LRAS at LOWER PL.",
            "Inflationary gap (Zeetoland setup) → tight labor market puts upward pressure on wages → higher input costs → SRAS shifts LEFT → return to LRAS at HIGHER PL.",
            "Keynesian view: wages are sticky downward — recessionary gaps can persist for years without policy. Justifies expansionary fiscal/monetary intervention.",
          ],
        },
        {
          type: "mcq",
          prompt: "An economy is at full employment. AD shifts RIGHT. In the LONG run:",
          choices: [
            "RGDP rises permanently",
            "PL rises, RGDP returns to potential",
            "U falls permanently",
            "Both PL and RGDP fall",
          ],
          answer: 1,
          explain: "Long-run self-correction: tight labor → wages up → SRAS LEFT → return to LRAS at higher PL with RGDP back at potential. Long-run neutrality of demand-side shocks.",
        },
      ],
    },
    {
      id: "u3-fiscal",
      title: "Fiscal policy + crowding out + automatic stabilizers",
      estimateMin: 6,
      steps: [
        {
          type: "read",
          title: "Fiscal policy effects on AD and real rate",
          body: [
            "Stimulate economy: ↑G or ↓T → AD shifts RIGHT. Real rate UP (gov borrowing → DLF right) — CROWDING OUT.",
            "Cool economy: ↓G or ↑T → AD shifts LEFT. Real rate DOWN (less gov borrowing).",
          ],
        },
        {
          type: "read",
          title: "Automatic stabilizers shrink the cycle",
          body: [
            "Progressive income tax: boom → more tax revenue, dampens boom. Recession → less tax taken.",
            "Unemployment insurance: recession → more transfers, dampens contraction.",
            "Welfare / SNAP: similar countercyclical effect.",
            "Automatic ≠ discretionary. Discretionary = new laws. Automatic = built into existing programs. Stabilizers reduce the EFFECTIVE multiplier.",
          ],
        },
      ],
    },
    {
      id: "u3-mcqs",
      title: "Unit 3 high-yield MCQs",
      estimateMin: 4,
      steps: [
        {
          type: "mcq",
          prompt: "An increase in the price level causes:",
          choices: [
            "AD to shift left",
            "Movement along AD (less RGDP demanded)",
            "AD to shift right",
            "SRAS to shift left",
          ],
          answer: 1,
          explain: "PL changes cause MOVEMENT along AD via the three effects (wealth, interest rate, exchange rate). They never shift AD itself.",
        },
        {
          type: "mcq",
          prompt: "If both AD and SRAS shift right, what happens to RGDP and PL?",
          choices: [
            "Both rise",
            "RGDP rises, PL is indeterminate",
            "PL rises, RGDP indeterminate",
            "Both fall",
          ],
          answer: 1,
          explain: "Same direction shifts: quantity (RGDP) determined, price (PL) indeterminate. AD pushes PL up, SRAS pushes PL down.",
        },
      ],
    },
  
    {
      id: "u3-more-mcqs",
      title: "Unit 3 — extra reps",
      estimateMin: 4,
      steps: [
        {
          type: "mcq",
          prompt: "An increase in the price level causes",
          choices: [
            "AD to shift left",
            "Movement along AD (less RGDP demanded due to wealth/interest/exchange effects)",
            "AD to shift right",
            "SRAS to shift right",
          ],
          answer: 1,
          explain: "Price-level changes cause MOVEMENT along AD via the three effects (wealth, interest rate, exchange rate). They don't shift AD itself. AD shifts only when C, I, G, or NX change for non-PL reasons.",
          trap: "PL is on the AD curve's Y-axis. Changes in PL move you ALONG AD; only other-axis-irrelevant changes shift it.",
        },
        {
          type: "mcq",
          prompt: "Which most likely shifts SRAS LEFT?",
          choices: [
            "A productivity gain from new technology",
            "An oil price spike",
            "A subsidy for manufacturers",
            "A drop in expected inflation",
          ],
          answer: 1,
          explain: "Oil is a key input. Higher input prices squeeze margins → firms reduce output → SRAS LEFT (cost-push). Productivity gains shift SRAS right. Subsidies shift SRAS right. Lower expected inflation shifts SRAS right.",
        },
        {
          type: "mcq",
          prompt: "An economy's actual unemployment is 7%, NRU is 5%. The economy is in",
          choices: ["Long-run equilibrium", "Inflationary gap", "Recessionary gap", "Stagflation"],
          answer: 2,
          explain: "Actual U > NRU → cyclical unemployment exists → RGDP < potential → RECESSIONARY gap. AD/SRAS intersect to the LEFT of LRAS.",
          trap: "Don't conflate stagflation with recessionary gap. Stagflation has cost-push origins (PL up AND RGDP down). A standard recessionary gap can come from AD falling (PL down, RGDP down).",
        },
        {
          type: "mcq",
          prompt: "Which fiscal action is CONTRACTIONARY?",
          choices: [
            "Increase government spending",
            "Decrease income tax rates",
            "Increase transfer payments",
            "Increase income tax rates",
          ],
          answer: 3,
          explain: "Higher taxes → less disposable income → C falls → AD shifts LEFT. Contractionary. The other options all expand AD.",
        },
      ],
    },
    {
      id: "u3-flashcards",
      title: "Unit 3 vocab cards",
      estimateMin: 3,
      steps: [
        {
          type: "flashcards",
          title: "AD/AS recall",
          cards: [
            { front: "AD slopes down because of", back: "Wealth effect, interest rate effect, exchange rate effect. (Movement along AD when PL changes.)" },
            { front: "AD shifters (one acronym)", back: "CIGXM. Any change in C, I, G, or X−M for non-PL reasons shifts AD." },
            { front: "SRAS shifters", back: "Input prices, productivity/tech, expected inflation, taxes/subsidies, supply shocks." },
            { front: "LRAS shifters", back: "Capital, labor, technology, human capital. (Same as PPC outward shifters.)" },
            { front: "Recessionary gap signature", back: "AD/SRAS intersect LEFT of LRAS. RGDP < potential. U > NRU. Cyclical exists." },
            { front: "Inflationary gap signature", back: "AD/SRAS intersect RIGHT of LRAS. RGDP > potential. U < NRU." },
            { front: "Long-run self-correction (recession)", back: "High U → wages fall → SRAS RIGHT → return to LRAS at LOWER PL." },
            { front: "Long-run self-correction (inflationary)", back: "Tight labor → wages rise → SRAS LEFT → return to LRAS at HIGHER PL." },
            { front: "Spending multiplier", back: "1 / MPS = 1 / (1 − MPC)." },
            { front: "Tax multiplier", back: "−MPC / MPS. Smaller absolute value than spending mult." },
            { front: "Balanced budget multiplier", back: "1. Always. Regardless of MPC. ΔGDP = ΔSpending when ΔG = ΔT." },
            { front: "Crowding out (chain)", back: "Gov deficit → DLF right → real rate ↑ → private I ↓. Lives in loanable funds market." },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 5 — Unit 4 Deep: Money + Two Interest Rates
// ─────────────────────────────────────────────────────────────────────
const MOD_U4: Module = {
  id: "macro-u4",
  partNumber: 7,
  title: "Unit 4 Deep — Money + Two Rates",
  subtitle: "18–23% of the exam. The single most-confused area: money market vs loanable funds.",
  estimateMin: 30,
  priority: "must",
  lessons: [
    {
      id: "u4-two-rates",
      title: "The two interest rates — never confuse them",
      estimateMin: 6,
      steps: [
        {
          type: "read",
          title: "Money Market vs Loanable Funds — the line that solves Unit 4",
          body: [
            "MONEY MARKET: Y-axis = NOMINAL interest rate. X-axis = Quantity of money. Curves: MD (downward), MS (vertical). Driven by: Federal Reserve. MS shifts when Fed acts. MD shifts when GDP or PL changes. Question keywords: 'Fed,' 'open-market operations,' 'M1, M2,' 'discount rate,' 'reserve requirement,' 'liquidity.'",
            "LOANABLE FUNDS: Y-axis = REAL interest rate. X-axis = Quantity of loanable funds. Curves: DLF (downward), SLF (upward). Driven by: borrowers and savers. SLF shifts when saving changes. DLF shifts when government borrows or business confidence changes. Question keywords: 'savings,' 'investment,' 'government deficit,' 'crowding out,' 'capital inflow.'",
            "Identify which market a question is about within 5 seconds. Most of Unit 4 becomes solvable from there.",
          ],
          callouts: [
            {
              kind: "trap",
              title: "Crowding out lives in Loanable Funds",
              body: "Crowding out is a REAL rate phenomenon — gov borrowing shifts DLF right. Money market doesn't have crowding out.",
            },
          ],
        },
      ],
    },
    {
      id: "u4-bonds",
      title: "Bond prices and interest rates (inverse)",
      estimateMin: 4,
      steps: [
        {
          type: "read",
          title: "Why they move inversely — and what the Fed does",
          body: [
            "A bond promises FIXED future payments. If a $1,000 bond pays $50/year, yield = 50/1,000 = 5%. If new bonds are issued at 10%, no one pays $1,000 for the old 5% bond. Its PRICE FALLS until effective yield matches 10% (~$500 → 50/500 = 10%).",
            "Bond prices ↑ ⟺ interest rates ↓. Bond prices ↓ ⟺ interest rates ↑.",
            "FED BUYS BONDS: bond demand rises → bond prices ↑ → rates ↓. Expansionary.",
            "FED SELLS BONDS: bond supply rises → bond prices ↓ → rates ↑. Contractionary.",
            "CONTRACTIONARY MONETARY ACTION: bond prices FALL. (FRQ #2 Part D-i answer.)",
          ],
        },
      ],
    },
    {
      id: "u4-money-funcs",
      title: "Money — functions, M1/M2, money multiplier",
      estimateMin: 6,
      steps: [
        {
          type: "read",
          title: "Three functions and the M categories",
          body: [
            "Three functions of money: medium of exchange, unit of account, store of value.",
            "M0 (monetary base): physical currency in circulation + bank reserves at Fed. Most liquid.",
            "M1: M0 + checking deposits + traveler's checks.",
            "M2: M1 + savings, small CDs, money market mutual funds.",
            "NOT money: stocks and bonds (financial assets), credit cards (borrowing), gold (commodity).",
          ],
        },
        {
          type: "formula",
          title: "Banking arithmetic",
          formulas: [
            "Required reserves = Deposits × RRR",
            "Excess reserves = Total reserves − Required reserves",
            "Money Multiplier = 1 / RRR",
            "Maximum ΔMS = Initial excess reserves × Money Multiplier",
          ],
        },
        {
          type: "mcq",
          prompt: "Which is NOT in M1?",
          choices: ["Currency in circulation", "Demand deposits", "Savings deposits", "Traveler's checks"],
          answer: 2,
          explain: "Savings deposits are in M2, not M1. M1 = M0 + checking + traveler's checks.",
        },
      ],
    },
    {
      id: "u4-mm",
      title: "Money Market — MS and MD shifters",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "What shifts MS and MD",
          body: [
            "MS is VERTICAL because the Fed sets it directly (perfectly inelastic).",
            "MD slopes downward because the nominal rate is the OPPORTUNITY COST of holding money.",
            "MD shifters: Real GDP / income ↑ → MD RIGHT. Price level ↑ → MD RIGHT.",
            "MS shifters: Fed BUYS bonds → MS RIGHT. Reserve requirement ↓ → MS RIGHT. Discount rate ↓ → MS RIGHT. IORB ↓ → MS effectively RIGHT.",
            "When MS shifts right (Fed buys bonds): nominal rate falls.",
            "When MD shifts right (income or PL rises): nominal rate rises.",
          ],
        },
      ],
    },
    {
      id: "u4-lf",
      title: "Loanable Funds — DLF and SLF shifters",
      estimateMin: 4,
      steps: [
        {
          type: "read",
          title: "What shifts DLF and SLF",
          body: [
            "DLF (downward) — borrowers. Shifters: gov deficit ↑ → DLF RIGHT (CROWDING OUT). Business confidence ↑ → DLF RIGHT. Investment tax credits → DLF RIGHT. Consumer big-ticket borrowing ↑ → DLF RIGHT.",
            "SLF (upward) — savers. Shifters: household savings rate ↑ → SLF RIGHT. Foreign capital inflow → SLF RIGHT. Government surplus → SLF RIGHT (gov saves rather than borrows). Higher expected future income → SLF LEFT.",
            "Government deficit → DLF right → real rate up → private I down (CROWDING OUT). Foreign capital inflow → SLF right → real rate down.",
          ],
        },
      ],
    },
    {
      id: "u4-transmission",
      title: "The transmission mechanism (most important chain)",
      estimateMin: 5,
      steps: [
        {
          type: "chain",
          title: "EXPANSIONARY MONETARY POLICY — full chain",
          trigger: "Fed BUYS bonds (or lowers IORB)",
          steps: [
            "1. Money market: MS shifts RIGHT → nominal i ↓",
            "2. Loanable funds: SLF shifts RIGHT → real i ↓",
            "3. Lower real rate → I ↑ and durables-C ↑",
            "4. AD shifts RIGHT in AD/AS → PL ↑, RGDP ↑, U ↓",
            "5. (Open economy) Lower US rates → capital outflow → S_USD right → dollar DEPRECIATES → X ↑, M ↓ → AD ↑ MORE",
            "6. Phillips: MOVE up-left along SRPC (inflation up, U down)",
          ],
          finalEffect: "PL ↑, RGDP ↑, U ↓, dollar depreciates, X ↑.",
        },
        {
          type: "chain",
          title: "CONTRACTIONARY MONETARY POLICY — mirror chain (FRQ #2)",
          trigger: "Fed SELLS bonds (or raises IORB)",
          steps: [
            "1. MS shifts LEFT → nominal i ↑. Bond prices FALL.",
            "2. Real rate ↑.",
            "3. I ↓, durables-C ↓ → AD shifts LEFT → PL ↓, RGDP ↓, U ↑.",
            "4. (Open economy) Higher US rates → capital INFLOW → D_USD right → dollar APPRECIATES → X ↓, M ↑ → AD ↓ MORE.",
            "5. Phillips: MOVE down-right along SRPC.",
          ],
          finalEffect: "PL ↓, RGDP ↓, U ↑, dollar appreciates, X ↓.",
        },
      ],
    },
  
    {
      id: "u4-more-mcqs",
      title: "Unit 4 — extra reps",
      estimateMin: 5,
      steps: [
        {
          type: "mcq",
          prompt: "Which question is about the LOANABLE FUNDS market?",
          choices: [
            "What happens to nominal interest rates when the Fed buys bonds?",
            "What happens to real interest rates when the government runs a deficit?",
            "How much currency is in circulation?",
            "What is the discount rate?",
          ],
          answer: 1,
          explain: "Loanable funds Y-axis = REAL rate; driven by borrowers/savers. Money market = NOMINAL rate, Fed-driven. Government deficits, savings, capital inflow → loanable funds territory.",
          trap: "Crowding out always lives in loanable funds, not money market. Misidentify the market and you'll grab the wrong shifter.",
        },
        {
          type: "mcq",
          prompt: "Bond prices fall sharply. The most likely cause is",
          choices: [
            "The Fed lowered interest rates",
            "Interest rates rose",
            "Inflation expectations fell",
            "Money supply increased",
          ],
          answer: 1,
          explain: "Bond prices and interest rates move INVERSELY. If prices fell, rates rose. The Fed lowering rates would RAISE bond prices.",
        },
        {
          type: "mcq",
          prompt: "RRR = 20%. New deposit of $5,000. Maximum increase in money supply (assuming all excess loaned)?",
          choices: ["$1,000", "$4,000", "$20,000", "$25,000"],
          answer: 2,
          explain: "Required = $5,000 × 0.20 = $1,000. Excess = $4,000. Money mult = 1/0.20 = 5. Max ΔMS = $4,000 × 5 = $20,000.",
          trap: "Don't include the original deposit unless the question asks 'total ΔMS including the deposit.' 'Max new money created from lending' uses excess × multiplier.",
        },
        {
          type: "mcq",
          prompt: "The economy's price level falls. Which curve in the money market shifts, and which way?",
          choices: [
            "MS shifts right",
            "MS shifts left",
            "MD shifts right",
            "MD shifts left",
          ],
          answer: 3,
          explain: "Lower PL → people need less money for transactions → MD shifts LEFT → nominal rate falls.",
          trap: "MS doesn't move based on PL; only the Fed shifts MS. The MD curve responds to PL and real GDP.",
        },
        {
          type: "mcq",
          prompt: "The Fed wants to raise the federal funds rate (contractionary). Which action achieves this?",
          choices: [
            "Buy government bonds",
            "Lower the discount rate",
            "Raise IORB",
            "Lower the reserve requirement",
          ],
          answer: 2,
          explain: "Raising IORB makes banks prefer to hold reserves at the Fed (earning more) rather than lend at lower rates → reduces effective MS → rates rise. The other options are EXPANSIONARY.",
          trap: "Memorize the direction. Buy bonds = expansionary (adds reserves). Sell bonds = contractionary. Lower rates = expansionary. Higher rates = contractionary.",
        },
      ],
    },
    {
      id: "u4-flashcards",
      title: "Unit 4 vocab cards",
      estimateMin: 4,
      steps: [
        {
          type: "flashcards",
          title: "Money + banking recall",
          cards: [
            { front: "Money market Y-axis", back: "NOMINAL interest rate. (Loanable funds = REAL rate.)" },
            { front: "MS curve shape", back: "VERTICAL. Fed sets it directly." },
            { front: "MD shifters", back: "Real GDP / income, price level. (Both shift MD right when they rise.)" },
            { front: "MS shifters (Fed tools)", back: "Buy/sell bonds (OMO), reserve requirement, discount rate, IORB." },
            { front: "Three functions of money", back: "Medium of exchange, unit of account, store of value." },
            { front: "M1", back: "Currency in circulation + demand deposits + traveler's checks. Highly liquid." },
            { front: "M2", back: "M1 + savings deposits + small CDs + money market mutual funds. Less liquid." },
            { front: "What's NOT money", back: "Stocks, bonds (financial assets), credit cards (borrowing), gold (commodity)." },
            { front: "Money multiplier", back: "1 / RRR. With RRR = 10%, mult = 10." },
            { front: "Required reserves formula", back: "Required = Deposits × RRR." },
            { front: "Bond prices and rates", back: "INVERSE. Always. Fed buys bonds → prices ↑ → rates ↓ (expansionary)." },
            { front: "DLF shifters (right)", back: "Gov deficit, business confidence, investment tax credits, consumer big-ticket borrowing." },
            { front: "SLF shifters (right)", back: "Household savings, foreign capital inflow, gov surplus, higher expected inflation." },
            { front: "Crowding out", back: "Gov deficit → DLF right → real rate ↑ → private I ↓. LF market only." },
            { front: "Expansionary monetary chain", back: "Buy bonds → MS right → nominal i ↓ → real i ↓ → I ↑ → AD right → PL ↑, RGDP ↑, U ↓." },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 6 — Unit 5 Deep: Long-run + Phillips
// ─────────────────────────────────────────────────────────────────────
const MOD_U5: Module = {
  id: "macro-u5",
  partNumber: 8,
  title: "Unit 5 Deep — Long-run + Phillips",
  subtitle: "20–30% — HIGHEST-WEIGHTED unit. Where Units 3 and 4 stop being separate.",
  estimateMin: 30,
  priority: "must",
  lessons: [
    {
      id: "u5-phillips",
      title: "Phillips curve — SR, LR, and when each shifts",
      estimateMin: 8,
      steps: [
        {
          type: "read",
          title: "SRPC vs LRPC",
          body: [
            "Short-Run Phillips Curve (SRPC) — DOWNWARD sloping. In the SR there's a TRADE-OFF: lower unemployment costs more inflation. SRPC corresponds to AD shifts moving along SRAS.",
            "Long-Run Phillips Curve (LRPC) — VERTICAL at NRU. In the LR, NO TRADE-OFF. The economy returns to NRU regardless of inflation.",
          ],
        },
        {
          type: "read",
          title: "How AD/AS events map to Phillips",
          body: [
            "AD shifts (demand-side): MOVE along SRPC. NO shift of SRPC.",
            "SRAS shifts (supply shock): SRPC SHIFTS. Positive shock → SRPC LEFT (better trade-off). Negative shock → SRPC RIGHT (worse trade-off).",
            "LRAS shifts (long-run growth, NRU change): LRPC shifts. NRU falls → LRPC LEFT.",
            "Expected inflation ↑: SRPC SHIFTS RIGHT.",
          ],
          callouts: [
            {
              kind: "trap",
              title: "Don't confuse SRPC and LRPC",
              body: "Question asks about CURRENT unemployment → use SRPC. Question asks about long-run U after expectations adjust → use LRPC (vertical line).",
            },
            {
              kind: "insight",
              title: "No long-run trade-off",
              body: "Repeatedly stimulating to push U below NRU only causes accelerating inflation — SRPC keeps shifting right as expectations adjust. Eventually U returns to NRU at a higher inflation rate.",
            },
          ],
        },
        {
          type: "mcq",
          prompt: "On the long-run Phillips curve, the unemployment rate is:",
          choices: [
            "Zero",
            "Cyclical only",
            "Equal to NRU (frictional + structural)",
            "Variable with inflation",
          ],
          answer: 2,
          explain: "LRPC is vertical at NRU. No long-run trade-off — expectations adjust and U gravitates back to NRU.",
        },
      ],
    },
    {
      id: "u5-quantity",
      title: "Money growth, inflation, and long-run neutrality",
      estimateMin: 5,
      steps: [
        {
          type: "formula",
          title: "Quantity Theory in the long run",
          formulas: [
            "MV = PQ",
            "%ΔM ≈ %ΔP + %ΔQ (V constant)",
            "%ΔP ≈ %ΔM − %ΔQ",
          ],
          callout: {
            kind: "insight",
            title: "Long-run neutrality of money",
            body: "In the LONG RUN, money is NEUTRAL — changes in MS only affect prices, not real output. In the short run, money matters because of sticky wages/prices (the Keynesian story).",
          },
        },
        {
          type: "drill",
          prompt: "If M grows 6%, V is constant, Q grows 2%, inflation is approximately:",
          answer: "≈ 4%",
          steps: ["%ΔP ≈ %ΔM − %ΔQ = 6 − 2 = 4%"],
        },
      ],
    },
    {
      id: "u5-crowding",
      title: "Crowding out — high-frequency FRQ topic",
      estimateMin: 6,
      steps: [
        {
          type: "chain",
          title: "Crowding out chain — graphically",
          trigger: "Government runs a deficit, must borrow to finance it",
          steps: [
            "1. DLF shifts RIGHT in loanable funds market.",
            "2. Real interest rate ↑.",
            "3. Higher real rate → private firms invest less, households borrow less.",
            "4. Private investment is CROWDED OUT.",
            "5. Lower private investment → smaller capital stock → LRAS grows less than it would have.",
            "6. Long-run growth is dampened.",
          ],
          finalEffect: "Real rate ↑, private I ↓, long-run growth dampened. (Q15 used this exact chain to determine dollar appreciation.)",
        },
        {
          type: "read",
          title: "When crowding out doesn't happen",
          body: [
            "If the Fed simultaneously runs expansionary monetary policy ('accommodates' the fiscal expansion), it adds reserves to the system, shifts SLF right, and the real rate doesn't rise → no crowding out.",
            "But this comes at the cost of higher inflation in the long run.",
          ],
        },
      ],
    },
    {
      id: "u5-growth",
      title: "Economic growth — sources and effects",
      estimateMin: 6,
      steps: [
        {
          type: "read",
          title: "Sources of growth",
          body: [
            "Capital formation: investment in physical capital (factories, machines) AND human capital (education, skills). REQUIRES SAVINGS.",
            "Technological progress: better methods → more output per unit input.",
            "Labor force expansion: immigration, higher LFPR, population growth.",
            "Resource discovery / quality.",
            "Productivity gains from infrastructure, organization, education.",
          ],
          callouts: [
            {
              kind: "insight",
              title: "Savings drives growth",
              body: "Higher savings → SLF right → lower real rate → higher I → larger capital stock → LRAS shifts right → potential GDP grows. THE central long-run insight.",
            },
          ],
        },
        {
          type: "read",
          title: "Effects of growth",
          body: [
            "LRAS shifts RIGHT.",
            "Eventually SRAS also shifts right (more capacity over time).",
            "PL falls (long run); RGDP rises.",
            "PPC shifts outward.",
            "LRPC may shift left (if NRU falls due to better labor markets).",
          ],
        },
      ],
    },
    {
      id: "u5-traps",
      title: "Unit 5 traps",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "Four traps that cost points every year",
          body: [
            "TRAP 1 — Confusing growth with recovery: Moving INTO the PPC from inside (recession recovery) ≠ growth. Growth = the ENTIRE PPC shifts outward. The LRAS also shifts.",
            "TRAP 2 — Long-run effect of expansionary monetary on real output? ZERO. Long-run neutrality of money. It only changes the price level in the long run.",
            "TRAP 3 — Crowding out direction: Government deficit ↑ → DLF SHIFTS RIGHT (gov borrowing MORE). Real rate rises. Private investment falls.",
            "TRAP 4 — Phillips curve direction: Demand-side AD shift = MOVES along SRPC. Supply-side SRAS shift = SRPC shifts. NRU change = LRPC shifts. Identify the shock type first.",
          ],
        },
      ],
    },
  
    {
      id: "u5-more-mcqs",
      title: "Unit 5 — extra reps",
      estimateMin: 4,
      steps: [
        {
          type: "mcq",
          prompt: "The Short-Run Phillips Curve shifts RIGHT when",
          choices: [
            "AD shifts right (demand-pull)",
            "Expected inflation rises",
            "AD shifts left (recession)",
            "LRAS shifts right (long-run growth)",
          ],
          answer: 1,
          explain: "Higher expected inflation → workers demand higher wages → SRAS LEFT → SRPC SHIFTS RIGHT (worse trade-off at every U level). AD shifts cause MOVEMENT along SRPC, not shifts of it.",
          trap: "Demand-side shocks move you ALONG the SRPC. Supply-side shocks (or expectations changes) SHIFT the SRPC.",
        },
        {
          type: "mcq",
          prompt: "Crowding out occurs when",
          choices: [
            "Government surplus reduces aggregate demand",
            "Government deficit raises real interest rates and reduces private investment",
            "Imports replace domestic production",
            "The Fed sells bonds",
          ],
          answer: 1,
          explain: "Crowding out is the loanable funds story: gov deficit → DLF right → real rate ↑ → private I falls. Reduces long-run capital formation and growth.",
        },
        {
          type: "mcq",
          prompt: "Which is a source of long-run economic growth?",
          choices: [
            "Increase in consumer confidence",
            "Lower nominal interest rates",
            "Investment in human capital",
            "Higher transfer payments",
          ],
          answer: 2,
          explain: "Long-run growth = LRAS right = more resources or better productivity. Human capital investment qualifies. The others are demand-side stimulus that don't grow potential output.",
        },
        {
          type: "mcq",
          prompt: "In the LONG run, an increase in the money supply growth rate will",
          choices: [
            "Permanently raise real GDP",
            "Permanently lower unemployment below NRU",
            "Raise the price level with no real effect",
            "Reduce nominal interest rates permanently",
          ],
          answer: 2,
          explain: "Long-run neutrality of money: monetary policy only affects PL, not real output, in the long run. Expectations adjust and the economy returns to potential at higher PL.",
          trap: "It's tempting to think more money = more spending = more output. True in the SHORT run; false in the LONG run.",
        },
      ],
    },
    {
      id: "u5-flashcards",
      title: "Unit 5 vocab cards",
      estimateMin: 3,
      steps: [
        {
          type: "flashcards",
          title: "Long-run + Phillips recall",
          cards: [
            { front: "SRPC slope", back: "Downward. Trade-off between inflation and unemployment in the SR." },
            { front: "LRPC shape", back: "VERTICAL at NRU. No long-run trade-off." },
            { front: "SRPC shifts when", back: "Expected inflation changes, supply shocks." },
            { front: "AD shift effect on SRPC", back: "MOVEMENT along SRPC — does NOT shift it." },
            { front: "Higher expected inflation", back: "SRPC shifts RIGHT (worse trade-off)." },
            { front: "Quantity theory", back: "MV = PQ → %ΔP ≈ %ΔM − %ΔQ (V constant)." },
            { front: "Long-run neutrality of money", back: "Monetary policy affects PL but not real GDP in the long run." },
            { front: "Crowding out cause", back: "Gov deficit → DLF right → real rate ↑ → private I ↓." },
            { front: "Sources of LR growth", back: "More capital, technology, labor, human capital, productivity." },
            { front: "Self-correction direction (recession)", back: "Wages fall → SRAS shifts RIGHT → return to LRAS at LOWER PL." },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 7 — Question Pattern Library
// ─────────────────────────────────────────────────────────────────────
const MOD_PATTERNS: Module = {
  id: "macro-patterns",
  partNumber: 10,
  title: "Question Pattern Library",
  subtitle: "Every MCQ archetype with the trap named. Once you can name the pattern, half the work is done.",
  estimateMin: 30,
  priority: "must",
  lessons: [
    {
      id: "patterns-1to8",
      title: "Patterns 1–8",
      estimateMin: 20,
      steps: [
        {
          type: "pattern",
          name: "Pattern 1 — PPC Feasibility",
          tests: "Reading a PPC graph and determining inside / on / outside the curve.",
          technique: "Calculate slope (rise/run between two known points), then for each candidate, plug X into the equation and check if Y falls below (inside), on, or above (outside) the curve.",
          trap: "Students panic and guess. The math is trivial — just calculate.",
          example: {
            prompt: "PPC passes through (0, 10) and (25, 0). Linear. Which is UNATTAINABLE? (parks, gym)",
            choices: ["(5, 6)", "(5, 8)", "(10, 6)", "(20, 4)"],
            answer: 3,
            explain: "Slope = −10/25 = −0.4. Equation: gym = 10 − 0.4 × parks. (20, 4): max gym = 10 − 8 = 2. Need 4 > 2. UNATTAINABLE.",
          },
        },
        {
          type: "pattern",
          name: "Pattern 2 — Indeterminate Equilibrium",
          tests: "Both demand AND supply shifting simultaneously.",
          technique: "Apply the universal both-shifts rule. SAME DIRECTION → quantity determined, price indeterminate. OPPOSITE DIRECTIONS → price determined, quantity indeterminate.",
          trap: "If only ONE curve shifts, both P and Q are determined. The question is asking specifically when something becomes indeterminate.",
        },
        {
          type: "pattern",
          name: "Pattern 3 — GDP Inclusion / Exclusion",
          tests: "What is and isn't counted in GDP.",
          technique: "GDP counts FINAL goods PRODUCED WITHIN the country DURING the period. Counts: final goods, NEW housing (I), inventory changes (I), gov wages, exports. Excludes: used, intermediate, financial transactions, transfers, household production, illegal economy.",
          example: {
            prompt: "Which is counted in GDP?",
            choices: ["Sales of stocks/bonds", "Changes in inventories", "Underground economy", "Nonmarket activities"],
            answer: 1,
            explain: "Inventory changes count as Investment (I). All others are excluded.",
          },
        },
        {
          type: "pattern",
          name: "Pattern 4 — Unemployment Rate Calculation",
          tests: "Formula application with the population vs labor force trap.",
          technique: "U Rate = (Unemployed / LABOR FORCE) × 100. Population is NOT the labor force.",
          trap: "Don't divide by population. The denominator is ALWAYS labor force.",
        },
        {
          type: "pattern",
          name: "Pattern 5 — Multiplier Calculation",
          tests: "Computing ΔGDP from a fiscal action, including balanced budget.",
          technique: "Spending mult = 1/MPS. Tax mult = −MPC/MPS. Balanced budget mult = 1 ALWAYS. ΔGDP = ΔSpending × Spending mult + ΔTaxes × Tax mult.",
        },
        {
          type: "pattern",
          name: "Pattern 6 — Money Market Combined Shifts",
          tests: "Predicting nominal rate when BOTH MS and MD shift.",
          technique: "MS right = rate down. MS left = rate up. MD right = rate up. MD left = rate down. Combine using the both-shifts rule.",
          example: {
            prompt: "Goal: identify what raises NOMINAL interest rates.",
            choices: [
              "Expansionary monetary + MD up (opposite forces — indeterminate)",
              "Expansionary monetary + MD down (both push rate down)",
              "Expansionary monetary + MD constant (rate falls)",
              "Contractionary monetary + MD up (both push rate UP)",
            ],
            answer: 3,
            explain: "Contractionary MS pushes rate up. MD up pushes rate up. Both push rate up → DEFINITELY UP.",
          },
        },
        {
          type: "pattern",
          name: "Pattern 7 — Policy → AD/AS Effect",
          tests: "Matching policy tools to desired AD shift.",
          technique: "AD RIGHT (PL ↑, RGDP ↑, U ↓): ↑G, ↓T, ↑transfers, Fed BUYS bonds, ↓RR, ↓discount rate, ↓IORB. AD LEFT: reverse all.",
        },
        {
          type: "pattern",
          name: "Pattern 8 — Recessionary Gap + Policy Effect",
          tests: "Tracing through expansionary monetary chain when below potential.",
          technique: "Chain: lower rates → I ↑ and durables-C ↑ → AD right → RGDP ↑ → cyclical U ↓ → real income ↑.",
        },
      ],
    },
    {
      id: "patterns-9to15",
      title: "Patterns 9–15",
      estimateMin: 20,
      steps: [
        {
          type: "pattern",
          name: "Pattern 9 — Compound Policy",
          tests: "Two policies REINFORCING on AD vs OPPOSING on rates.",
          technique: "Both expansionary or both contractionary: AD definite, real rate indeterminate. Mixed (exp fiscal + cont monetary): AD indeterminate, real rate definitely up.",
          example: {
            prompt: "Both contractionary fiscal AND monetary. Effect on real GDP and interest rates?",
            choices: [
              "RGDP up, rates up",
              "RGDP up, rates indeterminate",
              "RGDP down, rates definitely down",
              "RGDP down, rates definitely up",
              "RGDP down, rates indeterminate",
            ],
            answer: 4,
            explain: "Both push AD LEFT → RGDP definitely down. Real rate: fiscal pushes DOWN (gov stops borrowing), monetary pushes UP (Fed drains liquidity) → INDETERMINATE.",
          },
        },
        {
          type: "pattern",
          name: "Pattern 10 — Loanable Funds Shifters",
          tests: "Identifying what shifts DLF vs SLF.",
          technique: "DLF right: gov deficit, business optimism, investment tax credits, consumer borrowing. SLF right: household savings, foreign capital inflow, gov surplus, higher expected inflation.",
        },
        {
          type: "pattern",
          name: "Pattern 11 — SR vs LR (supply-side identifier)",
          tests: "Recognizing that ONLY supply-side improvements give RGDP↑ in SR AND PL↓ in LR.",
          technique: "Demand-side shifts move PL and RGDP same direction. ONLY positive supply-side (productivity) gives RGDP up + PL down. If permanent, also LRAS right.",
        },
        {
          type: "pattern",
          name: "Pattern 12 — Investment-to-Capital-Stock Chain",
          tests: "Investment incentives raise capital formation, which raises long-run output.",
          technique: "Tax credit → I up → capital stock up → real output up (long run).",
        },
        {
          type: "pattern",
          name: "Pattern 13 — PPC + LRAS Linked",
          tests: "PPC and LRAS represent the same concept (potential output) and shift together.",
          technique: "Tech up → both outward. Anything raising capacity shifts both right. They NEVER move opposite on the AP exam.",
        },
        {
          type: "pattern",
          name: "Pattern 14 — Phillips Curve Reading",
          tests: "Reading inflation and unemployment values directly off the SRPC graph.",
          technique: "For a given inflation, trace horizontally to SRPC, drop down to read U. Or vice versa.",
          trap: "Don't use LRPC unless the question explicitly asks about long-run.",
        },
        {
          type: "pattern",
          name: "Pattern 15 — Forex / Budget Deficit Chain",
          tests: "Tracing fiscal policy through loanable funds, real rate, capital flows, to currency.",
          technique: "Deficit ↑ → DLF right → real rate ↑ → capital INFLOW → D_USD right → dollar APPRECIATES.",
        },
      ],
    },
  
    {
      id: "patterns-extra-reps",
      title: "Pattern reps — second MCQs on patterns 1, 2, 4, 5, 6, 9, 10, 14, 15",
      estimateMin: 7,
      steps: [
        {
          type: "mcq",
          prompt: "Pattern 1 (PPC feasibility) — A linear PPC passes through (0, 30) and (15, 0). Which point is INSIDE the curve?",
          choices: ["(5, 18)", "(10, 10)", "(7, 17)", "(8, 14)"],
          answer: 0,
          explain: "Slope = −30/15 = −2. Equation: y = 30 − 2x. (5, 18): max y at x=5 is 20. 18 < 20 → INSIDE. (10, 10): max = 10 → on. (7, 17): max = 16, need 17 > 16 → OUTSIDE. (8, 14): max = 14 → on.",
        },
        {
          type: "mcq",
          prompt: "Pattern 2 (indeterminate) — In the goods market, demand RISES and supply RISES. What's true?",
          choices: [
            "Q rises, P rises",
            "Q rises, P indeterminate",
            "Q indeterminate, P rises",
            "Q indeterminate, P falls",
          ],
          answer: 1,
          explain: "Same-direction shifts → Q determined (UP), P indeterminate. D pushes P up; S pushes P down → ambiguous depending on relative magnitudes.",
        },
        {
          type: "mcq",
          prompt: "Pattern 4 (U rate) — Country has population 400K, working-age 280K, LF 200K, employed 180K. Find U rate.",
          choices: ["5.0%", "7.1%", "10.0%", "20.0%"],
          answer: 2,
          explain: "Unemployed = 200K − 180K = 20K. U Rate = 20/200 × 100 = 10%. Don't divide by 280K (LFPR territory) or 400K (population).",
        },
        {
          type: "mcq",
          prompt: "Pattern 5 (multiplier) — MPC = 0.6. What ΔG closes a $500B recessionary gap?",
          choices: ["+$200B", "+$250B", "+$300B", "+$500B"],
          answer: 0,
          explain: "Spending mult = 1/(1−0.6) = 2.5. ΔG × 2.5 = $500B → ΔG = $200B.",
          trap: "Reading question carefully: this is a 'divide' problem (find ΔG to CLOSE gap), not a 'multiply' problem (find ΔGDP from ΔG).",
        },
        {
          type: "mcq",
          prompt: "Pattern 6 (money market) — MS shifts LEFT and MD shifts RIGHT. The nominal interest rate",
          choices: ["Definitely rises", "Definitely falls", "Indeterminate", "No change"],
          answer: 0,
          explain: "MS left pushes rate UP. MD right pushes rate UP. SAME-direction (both raise rate) → DEFINITELY UP. Quantity is indeterminate.",
        },
        {
          type: "mcq",
          prompt: "Pattern 9 (compound policy) — Expansionary fiscal + Contractionary monetary. What's the effect on real interest rates?",
          choices: ["Definitely down", "Definitely up", "Indeterminate", "No change"],
          answer: 1,
          explain: "Both push real rate UP. Fiscal: gov borrows more → DLF right → real rate up. Monetary: Fed drains liquidity → SLF left → real rate up. Same-direction → DEFINITELY UP. AD effect is indeterminate (forces opposite).",
        },
        {
          type: "mcq",
          prompt: "Pattern 10 (LF shifters) — Which shifts SLF (saving supply) RIGHT?",
          choices: [
            "Government deficit increases",
            "Foreign capital flows in",
            "Business confidence rises",
            "Consumer credit borrowing rises",
          ],
          answer: 1,
          explain: "Foreign capital inflow adds to the saving pool → SLF right → real rate falls. The other three shift DLF (demand for borrowing), not SLF.",
        },
        {
          type: "mcq",
          prompt: "Pattern 14 (Phillips reading) — A SRPC has visible points (3, 5) and (5, 3). At inflation = 4%, what's U?",
          choices: ["3%", "4%", "5%", "6%"],
          answer: 1,
          explain: "Linear SRPC slope from (3, 5) to (5, 3): inflation drops 2 as U rises 2 → slope = −1. Equation: inflation = 8 − U → U = 8 − inflation. At inflation = 4: U = 4%.",
        },
        {
          type: "mcq",
          prompt: "Pattern 15 (deficit-to-currency) — A US budget deficit increase leads to which currency outcome?",
          choices: [
            "Dollar depreciates because rates fall",
            "Dollar appreciates because rates rise",
            "No effect on dollar",
            "Dollar appreciates because rates fall",
          ],
          answer: 1,
          explain: "Deficit ↑ → DLF right → real rate ↑ → foreign capital inflow → D_USD right → dollar APPRECIATES. The chain: deficit → rates ↑ → capital in → currency up.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 8 — Master Chain Library
// ─────────────────────────────────────────────────────────────────────
const MOD_CHAINS: Module = {
  id: "macro-chains",
  partNumber: 11,
  title: "Master Chain Library",
  subtitle: "Every 'trace through all markets' FRQ reduces to one of these 12.",
  estimateMin: 25,
  priority: "must",
  lessons: [
    {
      id: "chains-fiscal-monetary",
      title: "Chains 1–4: Fiscal + Monetary",
      estimateMin: 10,
      steps: [
        {
          type: "chain",
          title: "Chain 1 — EXPANSIONARY FISCAL (↑G or ↓T)",
          trigger: "Government increases G or cuts T",
          steps: [
            "1. AD shifts RIGHT directly → PL ↑, RGDP ↑, U ↓.",
            "2. Government borrows more → DLF shifts RIGHT.",
            "3. Real interest rate ↑ → private I ↓ (CROWDING OUT).",
            "4. Higher US rates → capital INFLOW → D_USD right → dollar APPRECIATES → X ↓, M ↑ → AD ↓ slightly.",
            "5. Phillips: MOVE up-left along SRPC.",
          ],
          finalEffect: "PL ↑, RGDP ↑, U ↓, real rate ↑, dollar appreciates, X ↓ slightly.",
        },
        {
          type: "chain",
          title: "Chain 2 — CONTRACTIONARY FISCAL (↓G or ↑T)",
          trigger: "Government decreases G or raises T",
          steps: [
            "1. AD shifts LEFT → PL ↓, RGDP ↓, U ↑.",
            "2. Less gov borrowing → DLF LEFT → real rate ↓ → I ↑ slightly.",
            "3. Lower US rates → capital outflow → S_USD right → dollar DEPRECIATES → X ↑, M ↓ → AD ↑ slightly.",
            "4. Phillips: MOVE down-right along SRPC.",
          ],
          finalEffect: "PL ↓, RGDP ↓, U ↑, real rate ↓, dollar depreciates.",
        },
        {
          type: "chain",
          title: "Chain 3 — EXPANSIONARY MONETARY (Fed buys, lowers IORB)",
          trigger: "Fed BUYS bonds or lowers IORB",
          steps: [
            "1. Bond prices ↑ → interest rates ↓.",
            "2. Money market: MS shifts RIGHT → nominal i ↓.",
            "3. Loanable funds: SLF shifts RIGHT → real rate ↓.",
            "4. Lower real rate → I ↑, durables-C ↑ → AD shifts RIGHT.",
            "5. Forex: lower US rates → capital outflow → dollar DEPRECIATES → X ↑, M ↓ → AD ↑ MORE.",
            "6. AD/AS: PL ↑, RGDP ↑, U ↓.",
            "7. Phillips: MOVE up-left along SRPC.",
          ],
          finalEffect: "PL ↑, RGDP ↑, U ↓, both rates ↓, dollar depreciates, X ↑.",
        },
        {
          type: "chain",
          title: "Chain 4 — CONTRACTIONARY MONETARY (FRQ #2)",
          trigger: "Fed SELLS bonds or raises IORB",
          steps: [
            "1. Bond prices ↓ → rates ↑.",
            "2. MS shifts LEFT → nominal i ↑.",
            "3. Real rate ↑ → I ↓, durables-C ↓ → AD shifts LEFT.",
            "4. Forex: higher US rates → capital INFLOW → D_USD right → dollar APPRECIATES → X ↓, M ↑ → AD ↓ MORE.",
            "5. PL ↓, RGDP ↓, U ↑.",
            "6. Phillips: MOVE down-right along SRPC.",
          ],
          finalEffect: "PL ↓, RGDP ↓, U ↑, both rates ↑, dollar appreciates, X ↓.",
        },
      ],
    },
    {
      id: "chains-supply-growth",
      title: "Chains 5–8: Supply shocks, growth, foreign income",
      estimateMin: 8,
      steps: [
        {
          type: "chain",
          title: "Chain 5 — POSITIVE SUPPLY SHOCK (productivity, oil drop)",
          trigger: "Productivity gain or input price drop",
          steps: [
            "1. SRAS shifts RIGHT.",
            "2. AD/AS: PL ↓, RGDP ↑, U ↓ (Goldilocks).",
            "3. Phillips: SRPC SHIFTS LEFT.",
            "4. If permanent, also LRAS RIGHT.",
          ],
          finalEffect: "PL ↓, RGDP ↑, U ↓ (only shock that does this).",
        },
        {
          type: "chain",
          title: "Chain 6 — NEGATIVE SUPPLY SHOCK (oil spike, war)",
          trigger: "Input price spike or supply disruption",
          steps: [
            "1. SRAS shifts LEFT.",
            "2. PL ↑ AND RGDP ↓ AND U ↑ — STAGFLATION.",
            "3. Phillips: SRPC SHIFTS RIGHT.",
            "4. Policy bind: easing AD lowers U but worsens inflation; tightening AD lowers inflation but worsens U.",
          ],
          finalEffect: "PL ↑, RGDP ↓, U ↑ (stagflation signature).",
        },
        {
          type: "chain",
          title: "Chain 7 — LONG-RUN GROWTH (capital, tech, labor)",
          trigger: "More capital, technology, or labor",
          steps: [
            "1. LRAS shifts RIGHT (potential GDP rises). PPC outward.",
            "2. SRAS also eventually shifts right.",
            "3. Long-run: PL ↓, RGDP ↑.",
            "4. LRPC may shift LEFT if NRU falls.",
          ],
          finalEffect: "Long-run PL ↓, RGDP ↑, potential output rises permanently.",
        },
        {
          type: "chain",
          title: "Chain 8 — FOREIGN INCOME ↑",
          trigger: "Trade-partner economy growing",
          steps: [
            "1. Foreign income ↑ → foreigners buy MORE US exports.",
            "2. D_USD shifts RIGHT → dollar APPRECIATES.",
            "3. Net exports ↑ (X up) → AD shifts RIGHT.",
            "4. AD/AS: PL ↑, RGDP ↑, U ↓.",
            "5. Phillips: MOVE up-left along SRPC.",
            "6. Current account improves.",
          ],
          finalEffect: "PL ↑, RGDP ↑, U ↓, dollar appreciates, X ↑.",
        },
      ],
    },
    {
      id: "chains-domestic-money",
      title: "Chains 9–12: Recession, boom, savings, money growth",
      estimateMin: 7,
      steps: [
        {
          type: "chain",
          title: "Chain 9 — DOMESTIC RECESSION (confidence collapse)",
          trigger: "Consumer or business confidence falls",
          steps: [
            "1. C and/or I fall → AD shifts LEFT.",
            "2. PL ↓, RGDP ↓, U ↑.",
            "3. Phillips: MOVE down-right along SRPC.",
            "4. Lower income → MD shifts left → nominal rate ↓.",
            "5. Less borrowing demand → DLF left → real rate ↓.",
            "6. Lower US rates → capital outflow → dollar DEPRECIATES → X ↑, M ↓ → AD ↑ slightly (auto-stabilizer).",
            "7. Self-correction: high U → wages fall → SRAS RIGHT → return to LRAS at lower PL.",
          ],
          finalEffect: "PL ↓, RGDP ↓, U ↑, both rates ↓, dollar depreciates.",
        },
        {
          type: "chain",
          title: "Chain 10 — INFLATIONARY BOOM (FRQ #2 setup)",
          trigger: "Consumer or business confidence surge",
          steps: [
            "1. C and/or I rise → AD shifts RIGHT.",
            "2. PL ↑, RGDP ↑ (above potential), U ↓ (below NRU).",
            "3. Phillips: MOVE up-left along SRPC.",
            "4. Higher income → MD ↑ → nominal rate ↑.",
            "5. Higher demand for borrowing → DLF right → real rate ↑.",
            "6. Higher US rates → capital INFLOW → D_USD right → dollar APPRECIATES → X ↓, M ↑ → AD ↓ slightly.",
            "7. Self-correction: tight labor → wages rise → SRAS LEFT → return to LRAS at higher PL.",
          ],
          finalEffect: "PL ↑, RGDP ↑ (above potential), U ↓ (below NRU), dollar appreciates.",
        },
        {
          type: "chain",
          title: "Chain 11 — INCREASE IN HOUSEHOLD SAVINGS",
          trigger: "Households save more, consume less",
          steps: [
            "1. SLF shifts RIGHT in loanable funds.",
            "2. Real interest rate ↓.",
            "3. Lower r → investment ↑ → AD shifts RIGHT slightly.",
            "4. BUT C ↓ pulls AD LEFT initially.",
            "5. Net SR effect on AD: ambiguous.",
            "6. Long-run: more I → more capital formation → LRAS RIGHT → long-run growth.",
          ],
          finalEffect: "Short-run AD ambiguous. Long-run growth improves (savings paradox).",
        },
        {
          type: "chain",
          title: "Chain 12 — INCREASE IN MONEY GROWTH RATE (long-run)",
          trigger: "Higher M growth rate sustained",
          steps: [
            "1. Quantity theory: %ΔP ≈ %ΔM − %ΔQ → inflation rises.",
            "2. Expected inflation ↑ → SRPC SHIFTS RIGHT.",
            "3. Workers demand higher wages → SRAS shifts left.",
            "4. Self-correction returns RGDP to potential, but at higher PL.",
            "5. Long-run neutrality of money: real GDP unchanged, prices higher.",
          ],
          finalEffect: "Long-run: PL ↑, RGDP unchanged.",
        },
      ],
    },
  
    {
      id: "chains-flashcards",
      title: "Chain trigger → effect cards",
      estimateMin: 5,
      steps: [
        {
          type: "flashcards",
          title: "12 chain summaries",
          cards: [
            { front: "Expansionary fiscal (↑G or ↓T)", back: "AD right → PL ↑, RGDP ↑, U ↓. DLF right → real rate ↑ (CROWDING OUT). Dollar APPRECIATES → X ↓ slightly." },
            { front: "Contractionary fiscal (↓G or ↑T)", back: "AD left → PL ↓, RGDP ↓, U ↑. DLF left → real rate ↓. Dollar depreciates → X ↑ slightly." },
            { front: "Expansionary monetary (Fed BUYS bonds)", back: "MS right → nominal i ↓ → real i ↓ → I ↑ → AD right → PL ↑, RGDP ↑, U ↓. Dollar DEPRECIATES → X ↑." },
            { front: "Contractionary monetary (Fed SELLS bonds)", back: "Bond prices ↓, rates ↑. MS left → real i ↑ → I ↓ → AD left → PL ↓, RGDP ↓. Dollar APPRECIATES → X ↓." },
            { front: "Positive supply shock", back: "SRAS right. PL ↓, RGDP ↑, U ↓. SRPC LEFT. (Goldilocks — only shock that does this.)" },
            { front: "Negative supply shock", back: "SRAS left. STAGFLATION: PL ↑, RGDP ↓, U ↑. SRPC RIGHT. Policy bind." },
            { front: "Long-run growth", back: "LRAS right. PPC outward. Long-run PL ↓, RGDP ↑." },
            { front: "Foreign income ↑", back: "X ↑ → D_USD right → dollar APPRECIATES → AD right → PL ↑, RGDP ↑, U ↓." },
            { front: "Domestic recession (confidence falls)", back: "C, I fall → AD left → PL ↓, RGDP ↓, U ↑. Both rates ↓. Dollar depreciates." },
            { front: "Inflationary boom (confidence surges)", back: "C, I rise → AD right → PL ↑, RGDP > potential, U < NRU. Both rates ↑. Dollar APPRECIATES." },
            { front: "Household savings ↑", back: "SLF right → real rate ↓. SR AD ambiguous (C ↓ vs I ↑). LR: more I → LRAS right → growth." },
            { front: "Money supply growth ↑ (long run)", back: "Inflation rises. SRPC right. SRAS left. Long-run real GDP unchanged (money neutrality)." },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 9 — FRQ Mastery + Worked Solutions
// ─────────────────────────────────────────────────────────────────────
const MOD_FRQ: Module = {
  id: "macro-frq",
  partNumber: 12,
  title: "FRQ Mastery + Worked Solutions",
  subtitle: "Both real practice FRQs walked through. The rubric mindset.",
  estimateMin: 30,
  priority: "must",
  lessons: [
    {
      id: "frq-rules",
      title: "FRQ rules and graph drawing",
      estimateMin: 6,
      steps: [
        {
          type: "read",
          title: "Section II structure",
          body: [
            "3 FRQs total. 1 hour total. 10 min reading + 25 min long FRQ + 12 min each on 2 short FRQs.",
            "Calculator allowed. Pencil or black/dark blue pen. Label parts (A, B, C) and sub-parts (i, ii, iii).",
            "Correctly labeled graphs require: all axes labeled, all curves labeled, directional changes shown.",
            "'Calculate' = MUST show how you arrived at the answer.",
          ],
          callouts: [
            {
              kind: "strategy",
              title: "Answer EXACTLY what's asked",
              body: "If asked for the effect on real GDP, answer with real GDP — not unemployment. Read every part TWICE before answering.",
            },
          ],
        },
        {
          type: "read",
          title: "FRQ verbs decoded",
          body: [
            "Identify — name it. One word/phrase.",
            "Calculate — show numerical work AND give final answer with units. No work shown = lose the point even if answer is right.",
            "Show on graph — draw + label clearly with arrows or letters.",
            "Explain — give the cause-and-effect chain. Stating Y without 'because of X' loses the point.",
            "What will happen to X — state direction (↑/↓/no change/uncertain). Don't just describe.",
            "Will X increase, decrease, or stay the same? Explain. — BOTH pieces needed: direction + cause/effect.",
          ],
        },
        {
          type: "read",
          title: "Universal graph drawing rules",
          body: [
            "1. Title / model name at the top ('AD/AS Model,' 'Money Market,' etc.).",
            "2. Both axes labeled with the correct variable name.",
            "3. All curves labeled (D, S, AD, SRAS, LRAS, MD, MS, DLF, SLF).",
            "4. Equilibrium points marked with a dot or letter.",
            "5. Dotted lines from equilibrium to BOTH axes, labeled (P*, Q*, i*, r*, e*).",
            "6. If shifted: show original AND new curves, label both (AD₁ AD₂), arrows for direction.",
            "7. New equilibrium with new dotted lines to new axis values.",
          ],
        },
      ],
    },
    {
      id: "frq-fehran",
      title: "FRQ #1 — Fehran (worked, all parts)",
      estimateMin: 12,
      steps: [
        {
          type: "read",
          title: "Setup",
          body: [
            "2011: Nominal GDP $150,000. Tax revenues $25,000. Government outlays $25,000. Consumption $75,000. Population 100. GDP Deflator 100.",
            "2012: Nominal GDP $225,000. Tax revenues $30,000. Government outlays $35,000. Consumption $100,000. Population 120. GDP Deflator 125.",
          ],
        },
        {
          type: "frq-part",
          partLabel: "A.i — Real GDP for 2012",
          prompt: "Calculate Real GDP for 2012.",
          rubricPoints: ["Show formula", "Plug in correct values", "Final answer with units"],
          solution: [
            "Real GDP = (Nominal GDP / GDP Deflator) × 100",
            "Real GDP 2012 = (225,000 / 125) × 100 = 1,800 × 100",
            "Real GDP 2012 = $180,000",
          ],
        },
        {
          type: "frq-part",
          partLabel: "A.ii — Inflation rate 2011→2012",
          prompt: "Calculate the inflation rate.",
          rubricPoints: ["Use deflator (CPI not given)", "Show subtraction and division"],
          solution: [
            "Inflation = (Deflator₂ − Deflator₁) / Deflator₁ × 100",
            "= (125 − 100) / 100 × 100 = 25%",
            "Base year is 2011 since deflator = 100 there.",
          ],
        },
        {
          type: "frq-part",
          partLabel: "B — Foreign demand for Fehran's electric vehicles",
          prompt: "Will foreigners buy more or fewer EVs from Fehran in 2012? Explain.",
          rubricPoints: ["Direction: FEWER", "Reason: relative price level rose 25%", "Explain substitution"],
          solution: [
            "DIRECTION: FEWER electric vehicles.",
            "Fehran's price level rose 25%. Trading partners' price levels stayed flat.",
            "Therefore, Fehran's EVs became RELATIVELY MORE EXPENSIVE in foreign markets.",
            "Foreign buyers substitute toward cheaper alternatives.",
            "Result: foreign demand for Fehran's EVs DECREASES.",
          ],
        },
        {
          type: "frq-part",
          partLabel: "C — Standard of living",
          prompt: "Did standard of living rise, fall, or stay the same? Explain.",
          rubricPoints: ["Direction: SAME", "Show real GDP per capita both years"],
          solution: [
            "Standard of living = REAL GDP PER CAPITA.",
            "2011: Real GDP = (150,000 / 100) × 100 = $150,000. Per capita = 150,000 / 100 = $1,500.",
            "2012: Real GDP = $180,000. Per capita = 180,000 / 120 = $1,500.",
            "DIRECTION: STAYED THE SAME. Real GDP grew 20%, but population grew 20% too.",
          ],
        },
        {
          type: "frq-part",
          partLabel: "D — Effect on national debt",
          prompt: "How did the national debt change between 2011 and 2012? Explain.",
          rubricPoints: ["Calculate both deficits", "Direction: INCREASED", "Reason: deficit must be borrowed"],
          solution: [
            "2011: Outlays $25,000, Taxes $25,000 → Deficit = $0 (balanced).",
            "2012: Outlays $35,000, Taxes $30,000 → Deficit = $5,000.",
            "DIRECTION: National debt INCREASED.",
            "EXPLANATION: A deficit must be financed by borrowing, which adds to the national debt. The 2012 deficit of $5,000 directly increases debt by $5,000.",
          ],
        },
      ],
    },
    {
      id: "frq-zeetoland",
      title: "FRQ #2 — Zeetoland (contractionary monetary, all parts)",
      estimateMin: 12,
      steps: [
        {
          type: "read",
          title: "Setup",
          body: [
            "Zeetoland is in SHORT-RUN equilibrium.",
            "Expected inflation = 4%. Actual U = 5%. NRU = 6%. Equilibrium real interest rate = 3%.",
            "Critical interpretation: Actual U (5%) < NRU (6%) → economy is OVERHEATING → INFLATIONARY GAP. RGDP > potential. AD/SRAS intersect RIGHT of LRAS.",
          ],
        },
        {
          type: "frq-part",
          partLabel: "A — AD/AS graph",
          prompt: "Draw a correctly labeled AD/AS graph showing Zeetoland's current equilibrium.",
          rubricPoints: ["Title, axes, all three curves labeled", "Intersection RIGHT of LRAS", "Dotted lines + Y₁ > Y_F"],
          solution: [
            "Title: 'AD/AS Model — Zeetoland.' Y = Price Level. X = Real GDP.",
            "Three curves: LRAS (vertical at Y_F), SRAS (upward-sloping), AD (downward-sloping).",
            "AD and SRAS intersect to the RIGHT of LRAS (inflationary gap).",
            "Mark equilibrium point. Drop dotted lines: PL₁ on Y-axis, Y₁ on X-axis.",
            "Y₁ should be visibly RIGHT of Y_F.",
          ],
          graphHint: "Y_F < Y₁ on the x-axis. PL₁ marked on Y-axis.",
        },
        {
          type: "frq-part",
          partLabel: "B — Self-correction with no policy",
          prompt: "Explain what happens with no policy intervention.",
          rubricPoints: ["Wages rise (tight labor)", "SRAS shifts left", "Return to LRAS at higher PL"],
          solution: [
            "1. Labor market is TIGHT (U = 5% < NRU = 6%). Workers have bargaining power.",
            "2. NOMINAL WAGES RISE.",
            "3. Higher wages = higher input costs.",
            "4. SRAS shifts LEFT.",
            "5. Process continues until SRAS shifts far enough left that AD intersects SRAS ON the LRAS.",
            "6. Final: RGDP returns to Y_F, U returns to NRU (6%), PL is HIGHER than originally.",
          ],
        },
        {
          type: "frq-part",
          partLabel: "C — Monetary policy action",
          prompt: "What contractionary monetary action should the central bank take?",
          rubricPoints: ["Name a contractionary tool"],
          solution: [
            "Any one of: RAISE the IORB (most modern), SELL government bonds, RAISE the discount rate, RAISE the reserve requirement.",
            "Recommended: RAISE the IORB (most common in modern Fed under ample reserves).",
          ],
        },
        {
          type: "frq-part",
          partLabel: "D.i — Effect on bond prices",
          prompt: "What happens to bond prices in Zeetoland?",
          rubricPoints: ["Direction: DECREASE"],
          solution: [
            "Contractionary policy raises rates. Bond prices and rates move INVERSELY.",
            "Therefore: bond prices DECREASE.",
          ],
        },
        {
          type: "frq-part",
          partLabel: "D.ii — Effect on real output",
          prompt: "What happens to real output? Explain.",
          rubricPoints: ["Direction: DECREASES", "Higher real rate → I down → AD left"],
          solution: [
            "Real output DECREASES.",
            "Contractionary policy raises nominal rate → real rate rises.",
            "Higher real rate → borrowing more expensive → INVESTMENT decreases. Durables-consumption decreases.",
            "AD shifts LEFT → AD/SRAS intersection moves to LOWER RGDP.",
          ],
        },
        {
          type: "frq-part",
          partLabel: "D.iii — Net financial capital flows",
          prompt: "What happens to net financial capital flows to Zeetoland? Explain.",
          rubricPoints: ["Direction: INCREASE (inflow)", "Higher real rates attract foreign capital"],
          solution: [
            "Net financial capital flows TO Zeetoland INCREASE (capital INFLOW).",
            "Contractionary monetary raises Zeetoland's real interest rate.",
            "Higher domestic real returns make Zeetoland's bonds more attractive to foreign investors.",
            "Foreign investors buy more Zeetoland assets → capital flows IN.",
          ],
        },
        {
          type: "frq-part",
          partLabel: "E — Forex graph for the zeet",
          prompt: "Draw a correctly labeled forex market graph for the zeet showing the effect.",
          rubricPoints: ["Title + axes + both curves", "D_zeet shifts RIGHT", "New equilibrium with appreciated zeet"],
          solution: [
            "Title: 'Foreign Exchange Market for the Zeet.' Y = Exchange rate. X = Quantity of zeet.",
            "Original D_zeet (downward) and S_zeet (upward), original equilibrium at e₁, Q₁.",
            "After contractionary policy: foreign capital wants Zeetoland bonds → D_zeet shifts RIGHT (D_zeet₁ → D_zeet₂).",
            "New equilibrium: higher exchange rate e₂ (zeet APPRECIATES) and higher quantity Q₂.",
          ],
          graphHint: "e₂ > e₁. Show arrows for the rightward D shift.",
        },
        {
          type: "frq-part",
          partLabel: "F — Effect on Zeetoland's exports",
          prompt: "What happens to Zeetoland's exports? Explain.",
          rubricPoints: ["Direction: DECREASE", "Reason: appreciated zeet → goods more expensive abroad"],
          solution: [
            "Zeetoland's EXPORTS DECREASE.",
            "Stronger zeet → Zeetoland's goods are now MORE EXPENSIVE for foreign buyers.",
            "Foreign buyers substitute toward cheaper alternatives.",
            "Demand for Zeetoland's exports falls.",
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 10 — Scenario Drills (selected high-value)
// ─────────────────────────────────────────────────────────────────────
const MOD_SCENARIOS: Module = {
  id: "macro-scenarios",
  partNumber: 13,
  title: "Scenario Drills",
  subtitle: "10 high-value scenarios. Cover the answer first; reason chain; then check.",
  estimateMin: 15,
  priority: "high",
  lessons: [
    {
      id: "scenarios-1",
      title: "Scenarios 1–5",
      estimateMin: 12,
      steps: [
        {
          type: "drill",
          prompt: "Fed buys $50B in government bonds. Trace effects on money market, loanable funds, AD/AS, dollar.",
          answer: "PL ↑, RGDP ↑, U ↓, dollar depreciates",
          steps: [
            "MS RIGHT → nominal rate FALLS",
            "SLF RIGHT → real rate FALLS",
            "Lower real rate → I ↑, durables-C ↑ → AD RIGHT → PL ↑, RGDP ↑, U ↓",
            "Forex: lower US rates → capital outflow → S_USD right → dollar DEPRECIATES → X ↑, M ↓ → AD RIGHT MORE",
            "Phillips: move up-left along SRPC",
          ],
        },
        {
          type: "drill",
          prompt: "$200B tax cut. MPC = 0.8. Calculate max ΔRGDP, then identify effect on real rates.",
          answer: "Max ΔGDP = +$800B. Real rate rises (crowding out).",
          steps: [
            "Tax mult = −0.8 / 0.2 = −4",
            "Max ΔGDP = $200B × 4 = $800B",
            "Real rate: tax cut → larger deficit → DLF right → real rate UP (CROWDING OUT)",
          ],
        },
        {
          type: "drill",
          prompt: "Oil shock spikes input prices. Trace effects on AD/AS and Phillips.",
          answer: "Stagflation: PL ↑, RGDP ↓, U ↑. SRPC RIGHT.",
          steps: [
            "SRAS shifts LEFT",
            "PL ↑ AND RGDP ↓ AND U ↑ — STAGFLATION",
            "SRPC shifts RIGHT (worse trade-off)",
            "Policy bind: easing AD lowers U but worsens inflation; tightening AD lowers inflation but worsens U",
          ],
        },
        {
          type: "drill",
          prompt: "Government raises both spending and taxes by $300B (balanced budget). What happens to real GDP?",
          answer: "+$300B (balanced budget multiplier = 1)",
          steps: ["Balanced budget multiplier ALWAYS = 1, regardless of MPC", "ΔGDP = ΔSpending = $300B"],
        },
        {
          type: "drill",
          prompt: "Discouraged workers re-enter labor force seeking jobs but don't find them. Effect on official U rate?",
          answer: "Official U rate RISES",
          steps: [
            "Numerator (unemployed) and denominator (LF) both rise",
            "Numerator rises proportionally MORE",
            "Labor market not actually worsening — these workers were always jobless",
            "Shows official rate UNDERSTATES true unemployment when discouraged workers excluded",
          ],
        },
      ],
    },
    {
      id: "scenarios-2",
      title: "Scenarios 6–10",
      estimateMin: 13,
      steps: [
        {
          type: "drill",
          prompt: "Recessionary gap. Fed lowers IORB. Will the gap close? Trace through.",
          answer: "Yes, if calibrated correctly: AD shifts right enough to reach Y_F",
          steps: [
            "Lower IORB → MS effectively right → nominal rate falls",
            "SLF right → real rate falls",
            "I ↑ → AD shifts RIGHT",
            "Forex: lower US rates → dollar depreciates → X ↑ → AD ↑ more",
            "AD/AS: PL ↑, RGDP ↑, U ↓",
            "If calibrated correctly, gap closes",
          ],
        },
        {
          type: "drill",
          prompt: "Country has current account deficit of $300B. What does its financial account look like?",
          answer: "Financial account surplus of $300B (capital inflow)",
          steps: [
            "CA + FA = 0",
            "CA = −$300B → FA = +$300B",
            "Net capital INFLOW of $300B",
            "Trade deficit and capital inflow are TWO SIDES of the same coin",
          ],
        },
        {
          type: "drill",
          prompt: "Real GDP $9,200B, Potential $10,000B. MPC = 0.6. What ΔG closes the gap?",
          answer: "ΔG = +$320B",
          steps: [
            "Output gap = 10,000 − 9,200 = $800B",
            "Spending mult = 1/0.4 = 2.5",
            "ΔG = $800B / 2.5 = $320B INCREASE",
          ],
        },
        {
          type: "drill",
          prompt: "Surge in consumer confidence. Trace through AD/AS, money market, loanable funds, dollar.",
          answer: "Inflationary boom: PL ↑, RGDP ↑ (above potential), U ↓ (below NRU), dollar appreciates",
          steps: [
            "C rises → AD RIGHT → PL ↑, RGDP ↑, U ↓",
            "Higher income/PL → MD RIGHT → nominal rate ↑",
            "More borrowing demand → DLF RIGHT → real rate ↑",
            "Higher US rates → capital INFLOW → D_USD right → dollar APPRECIATES → X ↓, M ↑ → AD ↓ slightly",
            "Phillips: up-left along SRPC",
          ],
        },
        {
          type: "drill",
          prompt: "Country: Pop 300M, Working-age 240M, Employed 150M, Unemployed 12M. Find LF, U rate, LFPR.",
          answer: "LF = 162M. U Rate ≈ 7.41%. LFPR = 67.5%.",
          steps: [
            "Labor Force = 150 + 12 = 162M",
            "U Rate = 12/162 × 100 ≈ 7.41%",
            "LFPR = 162/240 × 100 = 67.5%",
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE 11 — Cheat Sheet + Strategy + Final MCQs
// ─────────────────────────────────────────────────────────────────────
const MOD_CHEATSHEET: Module = {
  id: "macro-cheatsheet",
  partNumber: 14,
  title: "Cheat Sheet + Strategy",
  subtitle: "All formulas in one place + 10 final MCQs + exam-day mantra.",
  estimateMin: 20,
  priority: "high",
  lessons: [
    {
      id: "cheat-formulas",
      title: "Every formula in one place",
      estimateMin: 4,
      steps: [
        {
          type: "formula",
          title: "Calculation cheat sheet",
          formulas: [
            "% change = (New − Old) / Old × 100",
            "GDP = C + I + G + (X − M)",
            "Real GDP = Nominal / Deflator × 100",
            "Real GDP per capita = Real GDP / Population",
            "Real Wage = Nominal Wage / CPI × 100",
            "Real i ≈ Nominal i − Inflation",
            "Inflation = (CPI₂ − CPI₁) / CPI₁ × 100",
            "GDP Deflator = (Nominal/Real) × 100",
            "Labor Force = Employed + Unemployed",
            "U Rate = Unemployed / LF × 100",
            "LFPR = LF / Working-age Pop × 100",
            "NRU = Frictional + Structural",
            "Spending Mult = 1/MPS = 1/(1−MPC)",
            "Tax Mult = −MPC/MPS",
            "Balanced Budget Mult = 1 (ALWAYS)",
            "Required Reserves = Deposits × RRR",
            "Money Mult = 1/RRR",
            "Max ΔMS = Excess Reserves × Money Mult",
            "MV = PQ → %ΔP ≈ %ΔM − %ΔQ",
            "Current Account + Financial Account = 0",
          ],
        },
      ],
    },
    {
      id: "cheat-effect-table",
      title: "Effect lookup — every shock",
      estimateMin: 4,
      steps: [
        {
          type: "read",
          title: "Universal effect table",
          body: [
            "Expansionary fiscal: PL ↑, RGDP ↑, U ↓, Real i ↑, Currency appreciates, Phillips up-left.",
            "Contractionary fiscal: PL ↓, RGDP ↓, U ↑, Real i ↓, Currency depreciates, Phillips down-right.",
            "Expansionary monetary: PL ↑, RGDP ↑, U ↓, Real i ↓, Currency depreciates, Phillips up-left.",
            "Contractionary monetary: PL ↓, RGDP ↓, U ↑, Real i ↑, Currency appreciates, Phillips down-right.",
            "Positive AD shock: PL ↑, RGDP ↑, U ↓, Real i ↑, Currency appreciates.",
            "Negative AD shock (recession): PL ↓, RGDP ↓, U ↑, Real i ↓, Currency depreciates.",
            "Positive supply shock: PL ↓, RGDP ↑, U ↓, Real i ↓, Currency depreciates, SRPC LEFT.",
            "Negative supply (stagflation): PL ↑, RGDP ↓, U ↑, Real i ↑, Mixed currency, SRPC RIGHT.",
            "Long-run growth (LRAS right): LR PL ↓, RGDP ↑, U ↓ (NRU falls).",
            "Foreign income ↑: PL ↑, RGDP ↑, U ↓, Currency appreciates, Phillips up-left.",
          ],
        },
      ],
    },
    {
      id: "cheat-traps",
      title: "Critical traps to avoid",
      estimateMin: 4,
      steps: [
        {
          type: "read",
          title: "Top 12 traps",
          body: [
            "Money market vs Loanable funds: MM = nominal rate, Fed-driven. LF = real rate. Crowding out is in LF.",
            "Movement vs shift: Own-price change = movement. Determinant change = shift.",
            "Multiply vs divide: Find ΔGDP from ΔSpending → MULTIPLY. Find ΔSpending to close gap → DIVIDE.",
            "Real vs nominal: Investment driven by REAL rate. Nominal up but inflation up more → real fell → I up.",
            "Long-run neutrality of money: monetary policy has NO long-run effect on real GDP.",
            "Discouraged workers: NOT in labor force. Excluded → official rate UNDERSTATES true unemployment.",
            "CA + FA = 0: Trade deficit ⇒ capital inflow.",
            "Stagflation signature: PL up AND RGDP down → SRAS LEFT.",
            "Per capita: Standard of living = Real GDP / population.",
            "PPC + LRAS: ALWAYS shift together.",
            "Bond prices and rates: Always INVERSE.",
            "Inventories: ARE counted in GDP (as Investment).",
          ],
        },
      ],
    },
    {
      id: "cheat-final-mcqs",
      title: "10 final-pass MCQs",
      estimateMin: 12,
      steps: [
        {
          type: "mcq",
          prompt: "If MPC = 0.6, the spending multiplier is:",
          choices: ["1.4", "1.67", "2.5", "6.67"],
          answer: 2,
          explain: "Spending mult = 1/(1−MPC) = 1/0.4 = 2.5.",
        },
        {
          type: "mcq",
          prompt: "An expansionary monetary policy will most likely cause:",
          choices: [
            "Real rate ↑, dollar appreciate",
            "Real rate ↓, dollar depreciate",
            "Real rate ↑, dollar depreciate",
            "Real rate ↓, dollar appreciate",
          ],
          answer: 1,
          explain: "Fed adds liquidity → real rate ↓. Lower US rates → capital outflow → dollar depreciates.",
        },
        {
          type: "mcq",
          prompt: "Crowding out occurs when:",
          choices: [
            "Fed buys bonds and money supply rises",
            "Government deficit raises real rates and reduces private investment",
            "Imports fall due to currency depreciation",
            "Inflation reduces consumer purchasing power",
          ],
          answer: 1,
          explain: "Crowding out is in loanable funds: gov borrowing → DLF right → real rate up → I down.",
        },
        {
          type: "mcq",
          prompt: "If RRR = 20%, the money multiplier is:",
          choices: ["2", "4", "5", "8"],
          answer: 2,
          explain: "Money mult = 1/RRR = 1/0.20 = 5.",
        },
        {
          type: "mcq",
          prompt: "Higher US real interest rates will most likely:",
          choices: [
            "Cause capital outflow and dollar depreciation",
            "Cause capital inflow and dollar appreciation",
            "Have no effect on capital flows",
            "Reduce US imports immediately",
          ],
          answer: 1,
          explain: "Foreign investors seek higher US returns → capital inflow → demand for USD rises → dollar appreciates.",
        },
        {
          type: "mcq",
          prompt: "An economy has Nominal GDP = $1,500B and Real GDP = $1,200B. The GDP deflator is:",
          choices: ["80", "100", "125", "250"],
          answer: 2,
          explain: "Deflator = (Nominal/Real) × 100 = (1,500/1,200) × 100 = 125.",
        },
        {
          type: "mcq",
          prompt: "If MV = PQ and M grows 6%, V is constant, Q grows 2%, inflation is approximately:",
          choices: ["2%", "4%", "6%", "8%"],
          answer: 1,
          explain: "%ΔP ≈ %ΔM − %ΔQ = 6 − 2 = 4%.",
        },
        {
          type: "mcq",
          prompt: "If government spending rises $200B and taxes rise $200B, the change in GDP is:",
          choices: ["$0", "$200B", "$400B", "Depends on MPC"],
          answer: 1,
          explain: "Balanced budget multiplier = 1. ΔGDP = ΔSpending = $200B regardless of MPC.",
        },
        {
          type: "mcq",
          prompt: "Government tax cut of $300B with MPC = 0.8 raises GDP by:",
          choices: ["$300B", "$600B", "$1,200B", "$1,500B"],
          answer: 2,
          explain: "Tax mult = −0.8/0.2 = −4. ΔGDP = 300 × 4 = $1,200B.",
        },
        {
          type: "mcq",
          prompt: "A negative supply shock will most likely cause:",
          choices: [
            "Both PL and RGDP to fall",
            "PL to rise and RGDP to rise",
            "PL to rise and RGDP to fall (stagflation)",
            "PL to fall and RGDP to rise",
          ],
          answer: 2,
          explain: "SRAS shifts left → stagflation: PL up, RGDP down, U up.",
        },
      ],
    },
    {
      id: "cheat-mantra",
      title: "Exam-day strategy and mantra",
      estimateMin: 4,
      steps: [
        {
          type: "read",
          title: "Strategy",
          body: [
            "MCQ: two-pass. First pass = easy questions in <60s. Second = harder ones. Final = guess any blanks (no penalty).",
            "FRQ: use 10-min reading period to outline. Long FRQ = 25 min. Short FRQs = 12 min each.",
            "Read every question twice. Answer EXACTLY what's asked.",
            "Label every graph. Always.",
            "Never leave anything blank.",
            "If finished early, RECHECK GRAPHS for missing labels.",
          ],
        },
        {
          type: "read",
          title: "Exam-day mantra",
          body: [
            "Identify which market the shock hits FIRST.",
            "Trace the chain step by step.",
            "Read PL, RGDP, U off the AD/AS hub.",
            "Then trace into Phillips curve and forex if needed.",
            "Every macro question is just a chain. You know the chains. Trust the work.",
          ],
          callouts: [
            {
              kind: "strategy",
              title: "Final reminder",
              body: "FRQ rubrics reward specific answers, not flowery prose. State direction first, then explain. Label every graph. Don't leave anything blank.",
            },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE — Unit 1 Foundations (NEW)
// ─────────────────────────────────────────────────────────────────────
const MOD_U1: Module = {
  id: "macro-u1",
  partNumber: 2,
  title: "Unit 1 — Basic Concepts",
  subtitle: "Scarcity, PPC, comparative advantage, supply/demand. AP weight: 5–10%.",
  estimateMin: 15,
  priority: "medium",
  lessons: [
    {
      id: "u1-scarcity-ppc",
      title: "Scarcity, opportunity cost, PPC",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "The starting axiom",
          body: [
            "Scarcity = unlimited wants meeting limited resources. Every choice trades off the alternative — that alternative IS the opportunity cost.",
            "OC formula: OC of A = what you give up of B / what you gain of A. Always quantify trade-offs in terms of the alternative not chosen.",
            "PPC (Production Possibilities Curve) plots maximum combinations of two goods given fixed resources. Points ON the curve = efficient. INSIDE = recession or unemployed resources. OUTSIDE = unattainable now.",
            "PPC shifts OUTWARD with: more capital (investment), more labor (immigration / LFPR), better technology, better human capital. PPC shifts INWARD with: resource depletion, war damage, capital destruction.",
          ],
          callouts: [
            {
              kind: "insight",
              title: "PPC + LRAS move together",
              body: "Anything that grows the PPC outward also shifts LRAS right. They're the same idea (potential output) drawn on different graphs.",
            },
          ],
        },
        {
          type: "example",
          title: "Opportunity cost calc",
          prompt: "Country A can produce 10 cars OR 30 wheat with one unit of resources. What's the OC of 1 car in terms of wheat?",
          solution: [
            "OC of 1 car = wheat given up / cars gained",
            "= 30 wheat / 10 cars",
            "= 3 wheat per car",
          ],
        },
        {
          type: "mcq",
          prompt: "An economy is operating INSIDE its PPC. Which best explains?",
          choices: [
            "Resources are at full capacity",
            "Resources are unemployed or used inefficiently",
            "The economy has experienced technological growth",
            "Opportunity cost is zero",
          ],
          answer: 1,
          explain: "Inside the PPC = some resources idle or misallocated. On = efficient. Outside = unattainable today.",
          trap: "Don't confuse 'inside the curve' with 'growing.' Growth = curve shifts outward, not movement to a different point on it.",
        },
      ],
    },
    {
      id: "u1-comparative",
      title: "Comparative advantage",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "Output table vs input table — different formulas",
          body: [
            "ABSOLUTE advantage: produce MORE of a good with the same resources (output table) or use FEWER resources for the same output (input table).",
            "COMPARATIVE advantage: produce a good with LOWER opportunity cost. The country with the lower OC has comparative advantage in that good.",
            "OUTPUT table (units of good per worker): OC = OTHER / OWN.",
            "INPUT table (workers per unit of good): OC = OWN / OTHER.",
            "Trade benefits BOTH parties when the terms of trade fall BETWEEN the two countries' opportunity costs.",
          ],
          callouts: [
            {
              kind: "memory",
              title: "Output: Other / Own. Input: Own / Other.",
              body: "When in doubt: output is what each WORKER produces. Input is how many WORKERS per unit. Sandwich rule for terms of trade.",
            },
          ],
        },
        {
          type: "example",
          title: "Find comparative advantage from output",
          prompt: "USA: 10 cars OR 20 wheat. Mexico: 3 cars OR 12 wheat. Who has comparative advantage in cars?",
          solution: [
            "USA's OC of 1 car = 20 / 10 = 2 wheat",
            "Mexico's OC of 1 car = 12 / 3 = 4 wheat",
            "USA gives up LESS wheat per car → USA has comparative advantage in cars.",
            "Mexico, by elimination, has comparative advantage in wheat.",
          ],
        },
        {
          type: "mcq",
          prompt: "Country X has absolute advantage in BOTH goods. Should the countries still trade?",
          choices: [
            "No — Country X already produces more of both",
            "Yes — gains from trade come from comparative, not absolute, advantage",
            "Only if Country X subsidizes Y",
            "Only if both have the same opportunity costs",
          ],
          answer: 1,
          explain: "Absolute advantage doesn't determine specialization — opportunity cost does. Each country has comparative advantage in something even if the other has absolute advantage in everything.",
          trap: "The classic mistake: assuming the more productive country shouldn't trade. They should — both gain when each specializes by lower OC.",
        },
        {
          type: "mcq",
          prompt: "USA's OC of cars is 2 wheat. Mexico's OC of cars is 4 wheat. A mutually beneficial terms-of-trade for cars must fall:",
          choices: [
            "Below 2 wheat per car",
            "Above 4 wheat per car",
            "Between 2 and 4 wheat per car",
            "Exactly at 3 wheat per car",
          ],
          answer: 2,
          explain: "Terms of trade fall between the two countries' OCs (2 < TOT < 4). Outside that range, one country prefers self-production.",
        },
      ],
    },
    {
      id: "u1-supply-demand",
      title: "Supply, demand, equilibrium",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "Shifters and disequilibrium",
          body: [
            "DEMAND shifters (TRIBE): Tastes, Related goods (substitutes / complements), Income (normal / inferior), Buyers, Expectations.",
            "SUPPLY shifters: Resource/input prices, Productivity/tech, Number of sellers, Taxes/subsidies, Expectations (often opposite direction from demand).",
            "Surplus = Qs > Qd → price falls toward equilibrium. Shortage = Qd > Qs → price rises.",
            "Price ceiling (binding when below equilibrium): causes a SHORTAGE (rent control).",
            "Price floor (binding when above equilibrium): causes a SURPLUS (minimum wage).",
          ],
        },
        {
          type: "mcq",
          prompt: "Coffee and donuts are complements. Coffee price falls. Effect on donut market?",
          choices: [
            "Demand for donuts DECREASES",
            "Demand for donuts INCREASES",
            "Supply of donuts decreases",
            "Equilibrium price of donuts falls",
          ],
          answer: 1,
          explain: "Complements move together. Cheaper coffee → people consume more coffee → more donuts demanded → demand curve shifts right → equilibrium P and Q for donuts both rise.",
          trap: "If you mistook complements for substitutes, you'd predict the opposite. Complements consumed together; substitutes replace each other.",
        },
        {
          type: "flashcards",
          title: "Unit 1 vocab",
          cards: [
            { front: "Scarcity", back: "Unlimited wants meet limited resources. The fundamental economic problem." },
            { front: "Opportunity cost", back: "Value of the next-best alternative given up. Drives every choice." },
            { front: "PPC inside the curve", back: "Recession or unemployed/inefficient resources. NOT growth." },
            { front: "PPC outside the curve", back: "Unattainable today. Can become attainable via outward shift (growth)." },
            { front: "Comparative advantage", back: "Lower opportunity cost. Drives trade. ≠ absolute advantage." },
            { front: "OC from output table", back: "OC = Other / Own. (Other good's quantity divided by own good's quantity.)" },
            { front: "OC from input table", back: "OC = Own / Other. (Own resources used divided by other's.)" },
            { front: "TRIBE", back: "Demand shifters: Tastes, Related goods, Income, Buyers, Expectations." },
            { front: "Price ceiling binding", back: "Below equilibrium → SHORTAGE." },
            { front: "Price floor binding", back: "Above equilibrium → SURPLUS." },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE — Unit 2 Concepts (NEW)
// ─────────────────────────────────────────────────────────────────────
const MOD_U2: Module = {
  id: "macro-u2",
  partNumber: 3,
  title: "Unit 2 — Indicators & Business Cycle",
  subtitle: "GDP, unemployment, inflation, business cycle. AP weight: 12–17%. Calc fluency lives in MOD_CALC.",
  estimateMin: 20,
  priority: "high",
  lessons: [
    {
      id: "u2-gdp",
      title: "GDP definition + what's in/out",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "GDP rules",
          body: [
            "GDP measures the market value of all FINAL goods and services produced WITHIN a country's borders DURING a given period (usually a year).",
            "Expenditure approach: GDP = C + I + G + (X − M).",
            "C = household consumption (largest share, ~70% in US).",
            "I = private investment: business capital, NEW housing construction, INVENTORY CHANGES.",
            "G = government purchases of goods/services and government wages. NOT transfer payments.",
            "(X − M) = net exports.",
            "Excluded: used goods (already counted), intermediate goods (avoid double-counting), financial transactions (stocks/bonds), transfer payments (Social Security, welfare), household production, illegal/underground economy, nonmarket activities.",
          ],
        },
        {
          type: "mcq",
          prompt: "Which is COUNTED in GDP?",
          choices: [
            "Sale of a 2015 car this year",
            "Construction of a new home this year",
            "Stocks bought on the NYSE",
            "Social Security check received",
          ],
          answer: 1,
          explain: "New construction counts as Investment (I). Used cars are excluded (already counted when first produced). Stocks are financial transactions, not production. Transfer payments (SS) involve no current production.",
          trap: "Used-good sale is the most common trap — it FEELS like production but it isn't. It's a transfer of ownership of a good already produced and counted.",
        },
        {
          type: "mcq",
          prompt: "Which is NOT counted in GDP?",
          choices: [
            "Inventory increase at a factory",
            "A government employee's salary",
            "An exported soybean shipment",
            "A welfare check",
          ],
          answer: 3,
          explain: "Welfare = transfer payment, no current production. Inventory increases ARE counted (as I). Government wages count as G. Exports count in NX.",
        },
      ],
    },
    {
      id: "u2-real-cycle",
      title: "Real vs nominal GDP, business cycle phases",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "Why real matters more than nominal",
          body: [
            "NOMINAL GDP measures output at CURRENT prices. It mixes price changes with quantity changes — bad for tracking actual economic activity over time.",
            "REAL GDP measures output at BASE-YEAR prices. It strips out inflation. The number you want when comparing across years.",
            "Standard of living = REAL GDP per CAPITA. Not nominal GDP. Not raw real GDP.",
            "Business cycle phases: EXPANSION → PEAK → RECESSION (formally: 2+ consecutive quarters of declining real GDP) → TROUGH → recovery (back to expansion).",
            "Recessions ≠ depressions. Depression = exceptionally severe and prolonged recession. Last US depression: Great Depression (1929–~1939).",
          ],
        },
        {
          type: "mcq",
          prompt: "Nominal GDP rises 8%. Inflation is 5%. Approximately what happens to real GDP?",
          choices: [
            "Falls by 3%",
            "Rises by about 3%",
            "Rises by 8%",
            "Stays flat",
          ],
          answer: 1,
          explain: "Approximation: %ΔReal GDP ≈ %ΔNominal − %ΔPrice level = 8% − 5% = 3%. Real output is what changed once we strip out price changes.",
        },
      ],
    },
    {
      id: "u2-unemployment",
      title: "Unemployment categories",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "The four types and the discouraged-worker trap",
          body: [
            "FRICTIONAL: voluntary, between jobs, temporary (recent grad, just-quit). Always exists; healthy.",
            "STRUCTURAL: skills mismatch, technological displacement, industry shift. Persistent, requires retraining.",
            "CYCLICAL: recession-driven. Rises when AD falls. The ONLY type tied to the business cycle.",
            "SEASONAL: predictable cycle (lifeguards, ski instructors). Sometimes lumped into frictional.",
            "NRU (natural rate of unemployment) = Frictional + Structural. Full employment = U at NRU. Cyclical = U − NRU.",
            "DISCOURAGED workers are NOT in the labor force. They've stopped seeking. Official rate UNDERSTATES true unemployment when they exist.",
          ],
        },
        {
          type: "mcq",
          prompt: "An autoworker laid off because robots replaced his line is",
          choices: [
            "Frictionally unemployed",
            "Structurally unemployed",
            "Cyclically unemployed",
            "Not unemployed",
          ],
          answer: 1,
          explain: "His skills no longer match what employers need (technology displaced him) — STRUCTURAL unemployment. Frictional = voluntarily transitioning. Cyclical = caused by recession.",
        },
        {
          type: "mcq",
          prompt: "Discouraged workers re-enter the labor force seeking jobs but don't find them. The OFFICIAL unemployment rate",
          choices: [
            "Falls",
            "Rises",
            "Stays the same",
            "Cannot be determined",
          ],
          answer: 1,
          explain: "Both numerator (unemployed) and denominator (LF) rise, but numerator rises more proportionally. Official rate ROSE even though true joblessness is unchanged.",
          trap: "This shows the official rate UNDERSTATES true unemployment. When discouraged workers rejoin, the rate gets more accurate (and higher).",
        },
      ],
    },
    {
      id: "u2-inflation",
      title: "Inflation types + winners/losers",
      estimateMin: 5,
      steps: [
        {
          type: "read",
          title: "Demand-pull, cost-push, redistribution",
          body: [
            "DEMAND-PULL inflation: AD shifts right → PL ↑ AND RGDP ↑ AND U ↓. Boom-driven.",
            "COST-PUSH inflation: SRAS shifts left → PL ↑ AND RGDP ↓ AND U ↑. STAGFLATION.",
            "BUILT-IN (wage-price spiral): wages rise to match expected inflation → input costs rise → SRAS left → more inflation → more wage demands. Self-perpetuating.",
            "ONLY UNEXPECTED inflation redistributes. Expected inflation gets priced into nominal interest rates and wage contracts.",
            "Real ≈ Nominal − Inflation (Fisher equation).",
          ],
          callouts: [
            {
              kind: "insight",
              title: "Stagflation signature",
              body: "If you see PL ↑ AND RGDP ↓, the shock is SRAS left (cost-push). No other shock produces this combination.",
            },
          ],
        },
        {
          type: "read",
          title: "Winners and losers from UNEXPECTED inflation",
          body: [
            "WINNERS: borrowers (pay back with cheaper dollars), gov with debt, asset/property owners.",
            "LOSERS: lenders/creditors (paid back with cheaper dollars), people on fixed nominal income (retirees on fixed pension), workers with fixed nominal wages, cash holders / savers in low-interest accounts.",
            "If the inflation was EXPECTED, no redistribution — nominal rates and wage contracts already incorporated it.",
          ],
        },
        {
          type: "mcq",
          prompt: "Unexpected inflation occurs. Who is HURT?",
          choices: [
            "Borrowers with fixed-rate loans",
            "Workers with cost-of-living wage adjustments",
            "Lenders who issued fixed-rate loans",
            "Asset owners with appreciating real estate",
          ],
          answer: 2,
          explain: "Lenders receive fixed nominal payments. Inflation erodes the real value of those payments → lenders lose. Borrowers WIN. Workers with COLA-adjusted wages are protected. Asset owners benefit from appreciation.",
        },
        {
          type: "mcq",
          prompt: "An economy experiences PL ↑ and RGDP ↓ simultaneously. The cause is",
          choices: [
            "AD shifts right (demand-pull)",
            "AD shifts left (recession)",
            "SRAS shifts right (productivity gain)",
            "SRAS shifts left (cost-push, stagflation)",
          ],
          answer: 3,
          explain: "PL ↑ AND RGDP ↓ is the stagflation signature, caused only by SRAS shifting LEFT. Demand-pull would raise both PL and RGDP. AD left would lower both. SRAS right would raise RGDP and lower PL.",
        },
        {
          type: "flashcards",
          title: "Unit 2 vocab",
          cards: [
            { front: "GDP formula", back: "GDP = C + I + G + (X − M)" },
            { front: "I in GDP includes what 3 things?", back: "Business capital, NEW housing, INVENTORY changes." },
            { front: "What's NOT in GDP?", back: "Used goods, intermediates, stocks/bonds, transfers, household production, illegal economy." },
            { front: "Real GDP formula", back: "Real = (Nominal / Deflator) × 100" },
            { front: "Standard of living", back: "Real GDP / Population (per capita). Not raw real GDP." },
            { front: "Frictional unemployment", back: "Voluntary, between jobs, temporary. Healthy. Always exists." },
            { front: "Structural unemployment", back: "Skills mismatch, tech displacement, industry shift. Requires retraining." },
            { front: "Cyclical unemployment", back: "Caused by recession (AD falls). Only type tied to business cycle." },
            { front: "NRU formula", back: "NRU = Frictional + Structural. Full employment = U at NRU." },
            { front: "Demand-pull signature", back: "AD right → PL ↑, RGDP ↑, U ↓. Boom." },
            { front: "Cost-push signature", back: "SRAS left → PL ↑, RGDP ↓, U ↑. Stagflation." },
            { front: "Inflation winners", back: "Borrowers, gov with debt, asset owners. Only with UNEXPECTED inflation." },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE — Unit 6 Open Economy (NEW)
// ─────────────────────────────────────────────────────────────────────
const MOD_U6: Module = {
  id: "macro-u6",
  partNumber: 9,
  title: "Unit 6 — Open Economy",
  subtitle: "Forex, balance of payments, capital flows. AP weight: 10–13%.",
  estimateMin: 20,
  priority: "high",
  lessons: [
    {
      id: "u6-forex",
      title: "Forex market mechanics",
      estimateMin: 7,
      steps: [
        {
          type: "read",
          title: "Reading the forex graph",
          body: [
            "Y-axis: exchange rate (e.g., yen per USD, or another currency per USD). X-axis: quantity of the currency.",
            "DEMAND for USD comes from: foreigners buying US goods/services (X), foreigners buying US assets (capital inflow). Downward-sloping in price of USD.",
            "SUPPLY of USD comes from: Americans buying foreign goods/services (M), Americans buying foreign assets (capital outflow). Upward-sloping.",
            "APPRECIATION of USD = exchange rate (price of USD) RISES. Each USD buys more foreign currency.",
            "DEPRECIATION of USD = exchange rate FALLS. Each USD buys less foreign currency.",
          ],
          callouts: [
            {
              kind: "memory",
              title: "Read the axis label first",
              body: "If Y-axis is 'yen per USD,' higher = USD appreciates. If Y-axis is 'USD per yen,' higher = USD depreciates. ALWAYS check axis label before stating direction.",
            },
          ],
        },
        {
          type: "read",
          title: "Forex shifters",
          body: [
            "US real interest rate ↑ → foreign capital flows IN → D_USD shifts RIGHT → USD APPRECIATES.",
            "US inflation > foreign inflation → US goods less competitive → foreigners buy fewer US goods → D_USD left → USD DEPRECIATES.",
            "US income ↑ → Americans import more → S_USD right → USD DEPRECIATES.",
            "Foreign income ↑ → foreigners buy more US exports → D_USD right → USD APPRECIATES.",
            "Foreign tastes for US goods ↑ → D_USD right → USD APPRECIATES.",
            "Speculation USD will rise → D_USD right (self-fulfilling) → USD APPRECIATES.",
          ],
        },
        {
          type: "example",
          title: "Trace a forex shift",
          prompt: "Foreign investors decide to invest more in US bonds. What happens in the forex market for USD?",
          solution: [
            "Foreign investors need to buy USD to purchase US bonds.",
            "DEMAND for USD shifts RIGHT.",
            "Equilibrium exchange rate RISES (USD APPRECIATES).",
            "Quantity of USD traded RISES.",
            "Downstream: stronger USD makes US exports MORE expensive abroad → X falls. Imports become CHEAPER for Americans → M rises. NX falls. AD shifts LEFT (slightly).",
          ],
        },
        {
          type: "mcq",
          prompt: "If the dollar APPRECIATES significantly, the most likely effect on US net exports?",
          choices: [
            "X up, M down, NX up",
            "X down, M up, NX down",
            "Both X and M up",
            "No effect on NX",
          ],
          answer: 1,
          explain: "Stronger USD makes US goods more expensive abroad (X ↓) and foreign goods cheaper for Americans (M ↑). NX = X − M falls.",
        },
        {
          type: "mcq",
          prompt: "Higher US real interest rates will most likely cause",
          choices: [
            "Capital outflow and dollar depreciation",
            "Capital inflow and dollar appreciation",
            "No effect on capital flows",
            "Reduce US imports immediately",
          ],
          answer: 1,
          explain: "Foreign investors seek higher US returns → buy USD-denominated assets → demand for USD rises → USD APPRECIATES. Capital INFLOW.",
          trap: "Don't confuse the direction. HIGHER US rates ATTRACT foreign capital (inflow), not push it out.",
        },
      ],
    },
    {
      id: "u6-capital-chain",
      title: "Capital flows + interest rate connection",
      estimateMin: 7,
      steps: [
        {
          type: "read",
          title: "How rates drive capital flows",
          body: [
            "When US real rates rise relative to other countries, foreign investors want US bonds — they offer higher returns.",
            "To buy US bonds, foreigners must first acquire USD → DEMAND for USD increases → USD APPRECIATES.",
            "Stronger USD → US exports more expensive abroad → X ↓. Foreign goods cheaper at home → M ↑. NX ↓ → AD ↓ slightly.",
            "Mirror: lower US rates → capital outflow → S_USD up → USD DEPRECIATES → X ↑, M ↓ → NX up → AD up slightly.",
          ],
        },
        {
          type: "chain",
          title: "US interest rates rise → forex consequences",
          trigger: "US real interest rate rises (e.g., from contractionary monetary policy or fiscal deficit)",
          steps: [
            "1. Foreign investors find US bonds more attractive.",
            "2. Foreign investors buy USD → D_USD shifts RIGHT.",
            "3. USD APPRECIATES.",
            "4. US exports become more expensive for foreigners → X ↓.",
            "5. Foreign goods become cheaper for Americans → M ↑.",
            "6. Net exports fall (NX ↓).",
            "7. AD shifts LEFT slightly (offsetting the higher-rate domestic effect on I).",
          ],
          finalEffect: "USD appreciates, capital INFLOW, X ↓, M ↑, NX ↓, AD ↓ slightly. Memorize — multiple FRQs hinge on this.",
        },
        {
          type: "mcq",
          prompt: "The Fed raises interest rates. The most likely sequence in the forex market is",
          choices: [
            "Capital outflow → S_USD right → USD depreciates",
            "Capital inflow → D_USD right → USD appreciates",
            "Both D and S of USD rise → USD unchanged",
            "USD has no relationship to Fed actions",
          ],
          answer: 1,
          explain: "Higher US rates attract foreign capital → demand for USD rises → USD appreciates. This is the contractionary monetary chain's forex leg.",
        },
      ],
    },
    {
      id: "u6-bop",
      title: "Balance of payments",
      estimateMin: 6,
      steps: [
        {
          type: "read",
          title: "Two halves that must balance",
          body: [
            "CURRENT ACCOUNT (CA) = net exports + net investment income from abroad + net unilateral transfers.",
            "FINANCIAL/CAPITAL ACCOUNT (FA) = net foreign direct investment + net portfolio investment + reserve transactions.",
            "Identity: CA + FA = 0. Always.",
            "Implication: a current account DEFICIT must be matched by a financial account SURPLUS. A trade deficit comes WITH capital inflow.",
            "Example: US imports more goods than it exports (trade deficit). Foreigners holding US dollars from those exports use them to buy US assets (financial inflow). The two are mirror images.",
          ],
          callouts: [
            {
              kind: "insight",
              title: "Trade deficit ⇔ capital inflow",
              body: "These are TWO SIDES of the same coin. Politicians often complain about trade deficits while celebrating foreign investment — they're the same thing.",
            },
          ],
        },
        {
          type: "example",
          title: "Calc CA from FA",
          prompt: "A country has a financial account surplus of $300B. What's its current account?",
          solution: [
            "CA + FA = 0",
            "CA = −FA = −$300B",
            "Current account DEFICIT of $300B.",
            "Translation: this country imports $300B more in goods/services than it exports. The surplus on the financial side (foreigners buying its assets) finances that.",
          ],
        },
        {
          type: "mcq",
          prompt: "Country X has a current account surplus of $200B. Its financial account must be",
          choices: [
            "Surplus of $200B",
            "Deficit of $200B",
            "Balanced",
            "Cannot be determined",
          ],
          answer: 1,
          explain: "CA + FA = 0. CA = +$200B → FA = −$200B (deficit). Surplus on goods/services means net OUTFLOW of capital — Country X is sending capital abroad to buy foreign assets.",
        },
        {
          type: "mcq",
          prompt: "If Country Y has a CURRENT ACCOUNT DEFICIT, which best describes its financial account?",
          choices: [
            "Surplus — net capital INFLOW",
            "Deficit — net capital outflow",
            "Balanced",
            "Depends on inflation rate",
          ],
          answer: 0,
          explain: "CA deficit (importing more than exporting) is mirrored by FA surplus (foreigners buying domestic assets, providing the capital). Trade deficit ⇔ capital inflow.",
          trap: "It's intuitive to think a 'deficit' on one side means deficit on both. The accounting identity ensures one's surplus is the other's deficit.",
        },
        {
          type: "flashcards",
          title: "Unit 6 vocab",
          cards: [
            { front: "Forex Y-axis vs X-axis", back: "Y = exchange rate (price of currency). X = quantity of currency." },
            { front: "Demand for USD comes from", back: "Foreigners buying US goods/services (X) and foreign capital buying US assets." },
            { front: "Supply of USD comes from", back: "Americans buying foreign goods/services (M) and US capital flowing abroad." },
            { front: "USD appreciates means", back: "USD price RISES — each $1 buys more foreign currency." },
            { front: "Higher US rates → forex effect", back: "Capital INFLOW → D_USD right → USD APPRECIATES." },
            { front: "Lower US inflation than abroad → ", back: "US goods more competitive → D_USD right → USD appreciates." },
            { front: "BOP identity", back: "Current Account + Financial Account = 0." },
            { front: "Current account components", back: "Net exports + net foreign income + net transfers." },
            { front: "Trade deficit means", back: "CA negative. Mirrored by FA positive (capital inflow)." },
            { front: "Stronger currency → exports", back: "Exports DECREASE (US goods more expensive abroad). NX falls." },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MODULE — Final Timed Block (NEW)
// ─────────────────────────────────────────────────────────────────────
const MOD_FINAL: Module = {
  id: "macro-final",
  partNumber: 15,
  title: "Final Timed Block",
  subtitle: "30 MCQs, 35 minutes. Last thing before sleep. Simulates exam pacing (~70 sec per question).",
  estimateMin: 35,
  priority: "must",
  lessons: [
    {
      id: "final-brief",
      title: "Pre-test brief",
      estimateMin: 2,
      steps: [
        {
          type: "read",
          title: "Set the conditions and start the clock",
          body: [
            "30 multiple choice questions. 35 minutes hard cap. ~70 seconds per question — same pace as the real AP exam.",
            "Treat this like the real thing. No looking up answers. No external resources. No breaks. No phone.",
            "If a question stalls past 90 seconds, lock in your best guess and move on. You can come back at the end.",
            "Score interpretation lives in the post-test step at the end. Run it first, then check.",
          ],
          callouts: [
            {
              kind: "strategy",
              title: "Pacing rules",
              body: "Two-pass MCQ technique: first pass = answer everything you know in <60 sec. Mark uncertain. Second pass = uncertain ones. Final guess on any blanks (no penalty).",
            },
          ],
        },
      ],
    },
    {
      id: "final-30mcqs",
      title: "30-question timed block",
      estimateMin: 33,
      steps: [
        // Unit 1 (3)
        {
          type: "mcq",
          prompt: "An economy producing INSIDE its PPC is",
          choices: ["At full employment", "Experiencing recession or unemployed resources", "Growing", "Producing efficiently"],
          answer: 1,
          explain: "Inside the curve = some resources idle or misallocated. The economy is below potential.",
        },
        {
          type: "mcq",
          prompt: "Country A's OC of 1 widget is 3 gadgets. Country B's OC of 1 widget is 5 gadgets. Comparative advantage in widgets belongs to",
          choices: ["Country A", "Country B", "Neither", "Both equally"],
          answer: 0,
          explain: "Lower OC has comparative advantage. A gives up 3 gadgets per widget vs B's 5 → A has comparative advantage in widgets.",
        },
        {
          type: "mcq",
          prompt: "A binding price ceiling on rent will most likely cause",
          choices: ["Surplus of housing", "Shortage of housing", "Equilibrium quantity to rise", "No change"],
          answer: 1,
          explain: "Binding price ceiling = below equilibrium → quantity demanded > quantity supplied → SHORTAGE.",
        },
        // Unit 2 (5)
        {
          type: "mcq",
          prompt: "Which is INCLUDED in this year's GDP?",
          choices: ["Sale of a 2018 car", "A new car built in Detroit this year", "Stocks bought on the NYSE", "A welfare check"],
          answer: 1,
          explain: "Newly produced goods count. Used goods, financial transactions, transfers don't.",
        },
        {
          type: "mcq",
          prompt: "Population 600,000. Working-age 450,000. Labor force 320,000. Employed 288,000. Unemployment rate?",
          choices: ["5.0%", "7.1%", "10.0%", "32.0%"],
          answer: 2,
          explain: "Unemployed = LF − Employed = 320K − 288K = 32K. U Rate = 32/320 × 100 = 10%. Don't divide by population.",
          trap: "The trap is dividing by 600,000 (gives 5.3%) or 450,000 (gives 7.1%). The denominator is ALWAYS the labor force.",
        },
        {
          type: "mcq",
          prompt: "CPI rose from 250 to 270. Inflation rate is",
          choices: ["7.4%", "8.0%", "10.0%", "20%"],
          answer: 1,
          explain: "Inflation = (270 − 250) / 250 × 100 = 20/250 × 100 = 8%.",
        },
        {
          type: "mcq",
          prompt: "Unexpected inflation HURTS",
          choices: ["Borrowers with fixed-rate loans", "People on fixed pensions", "Asset owners", "Government with debt"],
          answer: 1,
          explain: "Fixed-pension recipients lose because nominal payments don't keep pace with inflation. Borrowers, asset owners, and indebted gov all WIN from unexpected inflation.",
        },
        {
          type: "mcq",
          prompt: "An economy's RGDP rises and unemployment falls below NRU. The economy is in",
          choices: ["Recessionary gap", "Long-run equilibrium", "Inflationary gap", "Stagflation"],
          answer: 2,
          explain: "RGDP > potential AND U < NRU → INFLATIONARY gap. The economy is overheating.",
        },
        // Unit 3 (7)
        {
          type: "mcq",
          prompt: "An increase in consumer wealth will most likely",
          choices: ["Shift AD left", "Shift AD right", "Shift SRAS left", "Shift LRAS right"],
          answer: 1,
          explain: "Wealth ↑ → consumption rises (regardless of PL) → AD shifts RIGHT.",
        },
        {
          type: "mcq",
          prompt: "Higher input prices will most likely",
          choices: ["Shift AD right", "Shift AD left", "Shift SRAS right", "Shift SRAS left"],
          answer: 3,
          explain: "Higher input costs squeeze profit margins → firms reduce output → SRAS shifts LEFT (cost-push).",
        },
        {
          type: "mcq",
          prompt: "An economy in a RECESSIONARY gap will, with no policy intervention,",
          choices: [
            "Stay there permanently",
            "See SRAS shift right as wages fall, restoring full employment at lower PL",
            "See LRAS shift left",
            "Experience hyperinflation",
          ],
          answer: 1,
          explain: "Self-correction (classical view): high U → wages fall → input costs fall → SRAS shifts RIGHT → return to LRAS at LOWER PL.",
        },
        {
          type: "mcq",
          prompt: "Government spending rises $200B. MPC = 0.75. Maximum ΔGDP?",
          choices: ["$200B", "$400B", "$600B", "$800B"],
          answer: 3,
          explain: "Spending mult = 1/(1−0.75) = 4. ΔGDP = $200B × 4 = $800B.",
        },
        {
          type: "mcq",
          prompt: "Government cuts taxes by $100B. MPC = 0.8. Maximum ΔGDP?",
          choices: ["$100B", "$400B", "$500B", "$800B"],
          answer: 1,
          explain: "Tax mult = −0.8/0.2 = −4. ΔGDP = $100B (cut, so think of it as ΔT = −$100B) × (−4) = +$400B.",
        },
        {
          type: "mcq",
          prompt: "If government raises BOTH spending and taxes by $300B, ΔGDP equals",
          choices: ["$0", "$300B", "$600B", "Depends on MPC"],
          answer: 1,
          explain: "Balanced budget multiplier = 1 (always). ΔGDP = ΔSpending = $300B regardless of MPC.",
        },
        {
          type: "mcq",
          prompt: "A positive supply shock most likely causes",
          choices: ["PL ↑, RGDP ↑", "PL ↓, RGDP ↑", "PL ↑, RGDP ↓", "PL ↓, RGDP ↓"],
          answer: 1,
          explain: "SRAS shifts RIGHT → PL falls AND RGDP rises. The 'Goldilocks' outcome — only positive supply shocks give this combo.",
        },
        // Unit 4 (7)
        {
          type: "mcq",
          prompt: "If RRR = 25%, the money multiplier is",
          choices: ["1.33", "2", "4", "5"],
          answer: 2,
          explain: "Money mult = 1/RRR = 1/0.25 = 4.",
        },
        {
          type: "mcq",
          prompt: "Which is NOT in M1?",
          choices: ["Currency in circulation", "Demand deposits", "Savings deposits", "Traveler's checks"],
          answer: 2,
          explain: "Savings deposits are in M2, not M1. M1 = currency + demand deposits + traveler's checks.",
        },
        {
          type: "mcq",
          prompt: "The Fed BUYS government bonds. The most direct effect is",
          choices: [
            "MS rises and rates fall",
            "MS falls and rates rise",
            "Reserve requirement falls",
            "Discount rate rises",
          ],
          answer: 0,
          explain: "Buying bonds adds reserves to the banking system → MS shifts RIGHT → nominal rates FALL. Expansionary OMO.",
        },
        {
          type: "mcq",
          prompt: "Crowding out occurs because",
          choices: [
            "Fed buying bonds raises money supply",
            "Government borrowing raises real rates and reduces private investment",
            "Imports fall due to currency depreciation",
            "Inflation reduces consumer purchasing power",
          ],
          answer: 1,
          explain: "Crowding out is in the loanable funds market: gov deficit → DLF right → real rate ↑ → private I falls.",
        },
        {
          type: "mcq",
          prompt: "Bond prices and interest rates",
          choices: ["Move together", "Move inversely", "Are independent", "Have a complex non-linear relationship"],
          answer: 1,
          explain: "Bond pays fixed payments. If rates rise, the fixed-payment bond becomes less attractive → its price falls. Always inverse.",
        },
        {
          type: "mcq",
          prompt: "Bank has $20,000 in deposits, RRR = 10%, total reserves $5,000. Maximum new money supply increase from the excess reserves?",
          choices: ["$3,000", "$10,000", "$30,000", "$50,000"],
          answer: 2,
          explain: "Required = 20K × 0.10 = $2K. Excess = 5K − 2K = $3K. Money mult = 1/0.10 = 10. Max ΔMS = $3K × 10 = $30K.",
        },
        {
          type: "mcq",
          prompt: "Real interest rate = 4%. Inflation = 6%. Approximately, the nominal rate is",
          choices: ["−2%", "2%", "10%", "24%"],
          answer: 2,
          explain: "Fisher: Real ≈ Nominal − Inflation. So Nominal ≈ Real + Inflation = 4 + 6 = 10%.",
        },
        // Unit 5 (5)
        {
          type: "mcq",
          prompt: "On the LONG-RUN Phillips Curve, the unemployment rate equals",
          choices: ["Zero", "Cyclical only", "NRU (frictional + structural)", "Variable with inflation"],
          answer: 2,
          explain: "LRPC is vertical at NRU. No long-run trade-off — expectations adjust and U returns to NRU regardless of inflation.",
        },
        {
          type: "mcq",
          prompt: "Higher EXPECTED inflation will most likely",
          choices: ["Shift SRPC left", "Shift SRPC right", "Make LRPC vertical", "Lower NRU"],
          answer: 1,
          explain: "Higher expected inflation → workers demand higher wages → SRPC SHIFTS RIGHT (worse trade-off at every U level).",
        },
        {
          type: "mcq",
          prompt: "An economy at full employment passes a large expansionary fiscal package. In the LONG run,",
          choices: [
            "RGDP rises permanently",
            "PL rises, RGDP returns to potential",
            "U falls permanently",
            "Both PL and RGDP fall",
          ],
          answer: 1,
          explain: "Long-run self-correction: tight labor → wages up → SRAS LEFT → return to LRAS at HIGHER PL with RGDP back at potential. Demand-side shocks have no long-run real effect.",
        },
        {
          type: "mcq",
          prompt: "Long-run economic growth requires",
          choices: [
            "Lower interest rates only",
            "Capital formation, technology, or labor force expansion",
            "Higher consumer spending",
            "Lower government deficits",
          ],
          answer: 1,
          explain: "Growth = LRAS shifts right = more resources, better tech, more capital, better human capital. Demand-side stimulus doesn't grow potential output.",
        },
        {
          type: "mcq",
          prompt: "If M grows 7%, V is constant, Q grows 2%, inflation is approximately",
          choices: ["2%", "5%", "7%", "9%"],
          answer: 1,
          explain: "Quantity theory: %ΔP ≈ %ΔM − %ΔQ = 7 − 2 = 5%.",
        },
        // Unit 6 (3)
        {
          type: "mcq",
          prompt: "A US current account deficit of $250B implies the financial account is",
          choices: ["Deficit of $250B", "Surplus of $250B", "Balanced", "Cannot determine"],
          answer: 1,
          explain: "CA + FA = 0. CA = −$250B → FA = +$250B (surplus, capital inflow). Trade deficit and capital inflow are mirror images.",
        },
        {
          type: "mcq",
          prompt: "An increase in foreign income most likely causes",
          choices: [
            "US exports to fall, dollar depreciates",
            "US exports to rise, dollar appreciates",
            "No effect on US trade",
            "US imports to rise dramatically",
          ],
          answer: 1,
          explain: "Richer foreigners buy more US goods → X ↑ → D_USD right → USD APPRECIATES. AD in US shifts right too.",
        },
        {
          type: "mcq",
          prompt: "If the dollar APPRECIATES, the most likely effect on net exports?",
          choices: ["NX rises", "NX falls", "NX unchanged", "X and M both rise equally"],
          answer: 1,
          explain: "Stronger USD → US goods expensive abroad (X ↓), foreign goods cheaper at home (M ↑) → NX = X − M FALLS.",
        },
      ],
    },
    {
      id: "final-debrief",
      title: "Score interpretation",
      estimateMin: 0,
      steps: [
        {
          type: "read",
          title: "What your score means",
          body: [
            "24+ / 30 (80%+): you're at a 5. Sleep, light formula scan in the morning, walk in confident.",
            "21–23 / 30 (70–79%): likely a 4. Do a final scan of the cheat sheet (Module 14) and the 12 chains. Then sleep.",
            "18–20 / 30 (60–69%): borderline 3/4. Re-read the cheat sheet effect table and the 12 chains carefully. Identify which units you missed and re-read those Deep modules.",
            "<18 / 30: identify which units the misses cluster in. Re-read those sections. Sleep no later than 1 AM. The exam is more about pattern recognition than memorization at this point — sleep matters more than another hour of study.",
            "Either way: trust the prep. The course covered everything tested.",
          ],
          callouts: [
            {
              kind: "strategy",
              title: "Don't re-take the test",
              body: "Once you've seen the answers, retaking it inflates your score artificially. Trust the result and move forward. Wrong answers tell you exactly which sections to refresh.",
            },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// COURSE EXPORT
// ─────────────────────────────────────────────────────────────────────

export const AP_MACRO_COURSE: Course = {
  id: "ap-macro",
  examLabel: "AP Macroeconomics",
  examDate: "2026-05-08",
  totalEstimateMin: 375,    // ~6h 15m total. Skip-able sections noted by priority.
  modules: [
    MOD_HUB,         // 1 — 25m  (must)
    MOD_U1,          // 2 — 15m  (medium)  NEW
    MOD_U2,          // 3 — 20m  (high)    NEW
    MOD_CALC,        // 4 — 35m  (must)
    MOD_INDET,       // 5 — 15m  (must)
    MOD_U3,          // 6 — 30m  (must)
    MOD_U4,          // 7 — 30m  (must)
    MOD_U5,          // 8 — 30m  (must)
    MOD_U6,          // 9 — 20m  (high)    NEW
    MOD_PATTERNS,    // 10 — 30m (must)    trimmed from 40
    MOD_CHAINS,      // 11 — 25m (must)
    MOD_FRQ,         // 12 — 30m (must)
    MOD_SCENARIOS,   // 13 — 15m (high)    trimmed from 25
    MOD_CHEATSHEET,  // 14 — 20m (high)    trimmed from 30
    MOD_FINAL,       // 15 — 35m (must)    NEW
  ],
};
