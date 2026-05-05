// Study modules — AP Macro + AP Precalc.
// Each lesson is a queue item in Work Mode and tracks its own completion.

export type MCQ = {
  q: string;
  choices: string[];
  answer: number;
  explain: string;
};

export type Lesson = {
  id: string;
  examId: "ap-macro" | "ap-precalc";
  unit: string;
  unitOrder: number;
  order: number;
  title: string;
  estimateMin: number;
  body: string[];           // paragraphs
  formulas?: string[];
  example?: { prompt: string; solution: string };
  mcqs: MCQ[];
};

export const EXAMS = {
  "ap-macro": { label: "AP Macroeconomics", date: "2026-05-08" },
  "ap-precalc": { label: "AP Precalculus", date: "2026-05-12" },
} as const;

// ─────────────────────────────────────────────────────────────────────
// AP MACRO LESSONS
// ─────────────────────────────────────────────────────────────────────

const MACRO_LESSONS: Lesson[] = [
  {
    id: "macro-u1-l1",
    examId: "ap-macro",
    unit: "Unit 1 · Basic Concepts",
    unitOrder: 1,
    order: 1,
    title: "Scarcity, PPC, and opportunity cost",
    estimateMin: 12,
    body: [
      "Scarcity is the central problem economics studies — wants are unlimited, resources are not. Every choice has an opportunity cost: the value of the next-best alternative given up.",
      "The Production Possibilities Curve (PPC) plots maximum output of two goods given fixed resources. Points on the curve are efficient. Points inside are inefficient (unused resources). Points outside are unattainable in the short run. Movement along the curve shows tradeoffs and opportunity cost. Movement of the curve outward shows growth (more resources, better tech).",
      "A bowed-out (concave) PPC means increasing opportunity cost — resources aren't equally productive in both goods. A linear PPC means constant opportunity cost.",
    ],
    formulas: [
      "Opportunity cost of A in terms of B = (units of B given up) / (units of A gained)",
    ],
    mcqs: [
      {
        q: "An economy is producing inside its PPC. Which best explains?",
        choices: [
          "Resources are being used at full capacity",
          "Resources are unemployed or used inefficiently",
          "The economy has experienced technological growth",
          "Opportunity cost is zero",
        ],
        answer: 1,
        explain: "Inside the PPC = inefficient or unemployed resources. On = efficient. Outside = unattainable now.",
      },
      {
        q: "A linear (straight-line) PPC implies",
        choices: [
          "Increasing opportunity cost",
          "Decreasing opportunity cost",
          "Constant opportunity cost",
          "Zero opportunity cost",
        ],
        answer: 2,
        explain: "Linear PPC = resources are equally productive in both goods, so the trade ratio doesn't change.",
      },
    ],
  },
  {
    id: "macro-u1-l2",
    examId: "ap-macro",
    unit: "Unit 1 · Basic Concepts",
    unitOrder: 1,
    order: 2,
    title: "Comparative advantage and gains from trade",
    estimateMin: 12,
    body: [
      "A producer has absolute advantage if it can make more of a good with the same resources. A producer has comparative advantage if it has a lower opportunity cost. Comparative advantage drives trade — both parties gain when each specializes in what they give up the least to make.",
      "To find comparative advantage from a PPC table: compute opportunity cost per unit for each producer in each good. The producer with the lower opportunity cost in good X has comparative advantage in X.",
      "Trade is mutually beneficial when the terms of trade fall between the two opportunity costs. Outside that range, one party prefers self-production.",
    ],
    formulas: [
      "Country A's OC of 1 unit of X = (X-or-Y output traded off in A) / (X output)",
      "Trade is beneficial if: OC for buyer (foreign) > price they pay > OC for seller (domestic)",
    ],
    example: {
      prompt: "USA can make 10 cars or 20 wheat (per resource unit). Mexico can make 3 cars or 12 wheat. Who has comparative advantage in cars?",
      solution: "USA's OC of 1 car = 20/10 = 2 wheat. Mexico's OC of 1 car = 12/3 = 4 wheat. USA gives up less wheat per car → USA has comparative advantage in cars.",
    },
    mcqs: [
      {
        q: "Country X has absolute advantage in BOTH goods over Country Y. Should they still trade?",
        choices: [
          "No — Country X already produces more of both",
          "Yes — gains come from comparative, not absolute, advantage",
          "Only if Country Y subsidizes X",
          "Only if both have identical opportunity costs",
        ],
        answer: 1,
        explain: "Even with absolute advantage in both, each country has a comparative advantage in something. Trade based on opportunity cost benefits both.",
      },
    ],
  },

  {
    id: "macro-u1-l3",
    examId: "ap-macro",
    unit: "Unit 1 · Basic Concepts",
    unitOrder: 1,
    order: 3,
    title: "Supply, demand, and market equilibrium",
    estimateMin: 14,
    body: [
      "Demand: the inverse relationship between price and quantity demanded. The demand curve slopes downward. Shifters of demand: income (normal vs inferior goods), prices of related goods (substitutes vs complements), tastes, expectations, number of buyers.",
      "Supply: the direct relationship between price and quantity supplied. The supply curve slopes upward. Shifters: input prices, technology, taxes/subsidies, number of sellers, expectations, prices of alternative goods producers could make.",
      "Equilibrium is the price/quantity at which Qs = Qd. Above equilibrium: surplus → price falls. Below: shortage → price rises. A change in price moves you ALONG the curve. A change in any non-price determinant SHIFTS the curve.",
    ],
    formulas: [
      "P↑ → Qd↓ (movement along demand)",
      "Right-shift of demand → equilibrium P↑ and Q↑",
      "Right-shift of supply → equilibrium P↓ and Q↑",
    ],
    mcqs: [
      {
        q: "Coffee and donuts are complements. The price of coffee falls. What happens in the donut market?",
        choices: [
          "Demand for donuts increases (curve right-shifts)",
          "Quantity demanded of donuts decreases",
          "Supply of donuts decreases",
          "Equilibrium price of donuts falls",
        ],
        answer: 0,
        explain: "Complements move together. Cheaper coffee → people buy more coffee → more donut demand → demand curve shifts right → equilibrium P and Q both rise.",
      },
      {
        q: "An improvement in production technology causes",
        choices: [
          "Demand to shift right",
          "Supply to shift right",
          "Quantity supplied to fall",
          "Equilibrium price to rise",
        ],
        answer: 1,
        explain: "Better tech lowers production costs, increasing supply (right shift). Result: lower equilibrium P, higher Q.",
      },
    ],
  },

  {
    id: "macro-u2-l1",
    examId: "ap-macro",
    unit: "Unit 2 · Indicators",
    unitOrder: 2,
    order: 1,
    title: "GDP — definition and components",
    estimateMin: 12,
    body: [
      "GDP is the market value of all final goods and services produced within a country's borders in a given period. Key qualifiers: market value (priced), final (no intermediate goods, no double-counting), within borders (location, not citizenship — that's GNP), produced this period (no resold used items, no financial transactions).",
      "Excluded: used goods, intermediate inputs, illegal market activity, household production, transfer payments (welfare, social security), purely financial transactions (stocks).",
      "Expenditure approach: GDP = C + I + G + NX. Consumption (largest, ~70%), Investment (business capital, residential, inventory changes), Government spending (NOT transfer payments), Net Exports (X − M).",
    ],
    formulas: [
      "GDP = C + I + G + NX",
      "NX = Exports − Imports",
      "Real GDP = Nominal GDP × (100 / Price Index)",
    ],
    mcqs: [
      {
        q: "Which is INCLUDED in U.S. GDP?",
        choices: [
          "A used car sold this year",
          "A new Toyota built in Kentucky",
          "Stock you bought today",
          "Social security check received",
        ],
        answer: 1,
        explain: "GDP is location-based: production within U.S. borders counts (Toyota in KY does). Used cars, financial transactions, and transfer payments are excluded.",
      },
      {
        q: "If nominal GDP rose 6% and inflation was 4%, real GDP grew approximately",
        choices: ["10%", "6%", "4%", "2%"],
        answer: 3,
        explain: "Real growth ≈ nominal growth − inflation = 6 − 4 = 2%.",
      },
    ],
  },

  {
    id: "macro-u2-l2",
    examId: "ap-macro",
    unit: "Unit 2 · Indicators",
    unitOrder: 2,
    order: 2,
    title: "Unemployment, CPI, and the business cycle",
    estimateMin: 14,
    body: [
      "Unemployment rate = unemployed / labor force × 100. Labor force = employed + unemployed (actively seeking). Discouraged workers and those not seeking are NOT in the labor force.",
      "Three types of unemployment: frictional (between jobs, healthy), structural (skills mismatch, tech change), cyclical (caused by recession). Natural rate of unemployment = frictional + structural ≈ 4–5% in U.S. Full employment = unemployment at natural rate.",
      "CPI measures the cost of a fixed basket of goods over time. Inflation rate = (CPI₂ − CPI₁) / CPI₁ × 100. Problems: substitution bias (consumers swap to cheaper substitutes), quality bias (improvements look like price hikes), new-good bias (slow to add new items).",
      "Business cycle phases: expansion → peak → contraction (recession if 2+ quarters of falling real GDP) → trough → recovery.",
    ],
    formulas: [
      "Unemployment rate = (unemployed / labor force) × 100",
      "Inflation rate = (CPI_new − CPI_old) / CPI_old × 100",
      "Real wage = nominal wage / (CPI / 100)",
    ],
    mcqs: [
      {
        q: "An auto worker laid off because robots replaced his job is",
        choices: [
          "Frictionally unemployed",
          "Structurally unemployed",
          "Cyclically unemployed",
          "Not unemployed",
        ],
        answer: 1,
        explain: "His skills no longer match what employers need due to technological change — structural unemployment.",
      },
      {
        q: "If CPI rose from 200 to 220, the inflation rate is",
        choices: ["20%", "10%", "11%", "9.1%"],
        answer: 1,
        explain: "(220 − 200) / 200 × 100 = 10%.",
      },
    ],
  },

  {
    id: "macro-u3-l1",
    examId: "ap-macro",
    unit: "Unit 3 · AD-AS",
    unitOrder: 3,
    order: 1,
    title: "Aggregate demand and its shifters",
    estimateMin: 14,
    body: [
      "AD = total spending in the economy at each price level. AD slopes downward for three reasons: wealth effect (higher P → real wealth falls → less C), interest rate effect (higher P → higher money demand → higher rates → less I), foreign trade effect (higher U.S. P → exports fall, imports rise).",
      "Shifters of AD = the components of GDP. To remember: any change in C, I, G, or NX (other than from a price-level change) shifts AD.",
      "Examples: tax cut → more disposable income → C↑ → AD right-shifts. Government spending increase → AD right. Lower interest rates → I↑ → AD right. Strong dollar → NX↓ → AD left.",
    ],
    formulas: [
      "AD shifters = ΔC + ΔI + ΔG + ΔNX (any non-price-level cause)",
    ],
    mcqs: [
      {
        q: "Consumer confidence falls sharply. AD curve",
        choices: [
          "Shifts right",
          "Shifts left",
          "Slope steepens",
          "Doesn't move (movement along curve)",
        ],
        answer: 1,
        explain: "Pessimistic consumers cut spending → C falls → AD shifts left.",
      },
      {
        q: "U.S. exports surge due to strong foreign growth. AD",
        choices: ["Shifts left", "Shifts right", "Doesn't move", "Becomes vertical"],
        answer: 1,
        explain: "Higher exports → NX↑ → AD shifts right.",
      },
    ],
  },

  {
    id: "macro-u3-l2",
    examId: "ap-macro",
    unit: "Unit 3 · AD-AS",
    unitOrder: 3,
    order: 2,
    title: "SRAS, LRAS, and macro equilibrium",
    estimateMin: 14,
    body: [
      "Short-Run Aggregate Supply (SRAS) slopes upward — in the short run, wages are sticky, so higher prices mean higher profits and more output. SRAS shifters: input prices (esp. wages), productivity, business taxes/subsidies, supply shocks.",
      "Long-Run Aggregate Supply (LRAS) is vertical at the economy's full-employment output (Yf). It only shifts with changes in resources, technology, or productivity.",
      "Three equilibrium states: (1) recessionary gap — Y < Yf, unemployment above natural rate, deflationary pressure; (2) full employment — Y = Yf; (3) inflationary gap — Y > Yf, unemployment below natural rate, inflationary pressure.",
      "Demand-pull inflation: AD shifts right past Yf → P↑ Y↑. Cost-push inflation: SRAS shifts left → P↑ Y↓ (stagflation).",
    ],
    formulas: [
      "Recessionary gap = Yf − Y_eq (when Y_eq < Yf)",
      "Inflationary gap = Y_eq − Yf (when Y_eq > Yf)",
    ],
    mcqs: [
      {
        q: "Oil prices spike globally. Most likely effect on the U.S. economy:",
        choices: [
          "AD shifts left, lower P and Y",
          "SRAS shifts right, lower P higher Y",
          "SRAS shifts left, higher P and lower Y (stagflation)",
          "LRAS shifts left",
        ],
        answer: 2,
        explain: "Oil is a key input. Higher input prices shift SRAS left → cost-push inflation: stagflation.",
      },
      {
        q: "An economy in a recessionary gap will, in the long run (if no intervention),",
        choices: [
          "Stay there permanently",
          "See SRAS shift right as wages fall, restoring full employment",
          "See LRAS shift left",
          "Experience hyperinflation",
        ],
        answer: 1,
        explain: "Self-correction: high unemployment → wages fall → input costs fall → SRAS shifts right → return to Yf.",
      },
    ],
  },

  {
    id: "macro-u3-l3",
    examId: "ap-macro",
    unit: "Unit 3 · AD-AS",
    unitOrder: 3,
    order: 3,
    title: "Fiscal policy and multipliers",
    estimateMin: 14,
    body: [
      "Fiscal policy = government use of spending and taxes to influence AD. Expansionary: increase G or cut T → AD right-shifts. Contractionary: cut G or raise T → AD left-shifts. Used to close gaps.",
      "Spending multiplier = 1 / (1 − MPC) = 1 / MPS. A $100 increase in G with MPC = 0.8 → ΔAD = $100 × 5 = $500.",
      "Tax multiplier = − MPC / MPS = −(MPC / (1 − MPC)). It's smaller in absolute value than spending multiplier because part of a tax cut is saved.",
      "Balanced-budget multiplier = 1. Equal increases in G and T raise AD by exactly the amount of the change.",
    ],
    formulas: [
      "Spending multiplier = 1 / (1 − MPC) = 1 / MPS",
      "Tax multiplier = − MPC / MPS",
      "ΔAD from ΔG = ΔG × spending multiplier",
      "ΔAD from ΔT = ΔT × tax multiplier",
    ],
    example: {
      prompt: "MPC = 0.75. The government cuts taxes by $200 billion. Estimated change in AD?",
      solution: "Tax multiplier = −0.75 / 0.25 = −3. ΔAD = −$200B × −3 = +$600B. AD rises by $600B.",
    },
    mcqs: [
      {
        q: "An MPC of 0.9 implies a spending multiplier of",
        choices: ["0.9", "1.1", "9", "10"],
        answer: 3,
        explain: "1 / (1 − 0.9) = 1 / 0.1 = 10.",
      },
      {
        q: "Equal $50B increases in G and T will",
        choices: [
          "Leave AD unchanged",
          "Decrease AD by $50B",
          "Increase AD by $50B",
          "Increase AD by $200B",
        ],
        answer: 2,
        explain: "Balanced-budget multiplier = 1. AD rises by exactly $50B.",
      },
    ],
  },

  {
    id: "macro-u4-l1",
    examId: "ap-macro",
    unit: "Unit 4 · Financial Sector",
    unitOrder: 4,
    order: 1,
    title: "Money, banking, and the money market",
    estimateMin: 14,
    body: [
      "Money has three functions: medium of exchange, unit of account, store of value. Measures: M1 = currency + checking + traveler's checks; M2 = M1 + savings + small time deposits + money market funds.",
      "Fractional reserve banking: banks hold a fraction of deposits as reserves and lend the rest. Money multiplier = 1 / required reserve ratio (RRR). A $1,000 deposit with RRR = 10% can support up to $10,000 in money supply.",
      "Money market: x-axis is quantity of money, y-axis is nominal interest rate. Demand for money slopes downward (higher rates = higher OC of holding money). Supply of money is vertical (set by Fed). Equilibrium nominal rate clears the market.",
      "Shifters of money demand: real GDP (income), price level. Shifters of money supply: Fed policy.",
    ],
    formulas: [
      "Money multiplier = 1 / RRR",
      "Max ΔMS from new excess reserves = excess reserves × money multiplier",
    ],
    example: {
      prompt: "RRR = 20%. A bank receives a new $5,000 deposit. Maximum potential increase in money supply?",
      solution: "Required reserves on deposit = $1,000. Excess = $4,000. Money multiplier = 1/0.20 = 5. Max ΔMS = $4,000 × 5 = $20,000.",
    },
    mcqs: [
      {
        q: "If RRR rises from 10% to 25%, the money multiplier",
        choices: ["Rises from 10 to 25", "Falls from 10 to 4", "Stays at 1", "Becomes negative"],
        answer: 1,
        explain: "Multiplier = 1/RRR. 1/0.10 = 10. 1/0.25 = 4.",
      },
      {
        q: "A decrease in the price level shifts money demand",
        choices: ["Right", "Left", "Doesn't shift it (movement along)", "Vertical"],
        answer: 1,
        explain: "Lower P means people need less money for transactions → money demand shifts left → nominal rate falls.",
      },
    ],
  },

  {
    id: "macro-u4-l2",
    examId: "ap-macro",
    unit: "Unit 4 · Financial Sector",
    unitOrder: 4,
    order: 2,
    title: "Monetary policy and the loanable funds market",
    estimateMin: 14,
    body: [
      "Three Fed tools: (1) open market operations (OMO) — buy/sell Treasury bonds; (2) discount rate — rate Fed charges banks; (3) reserve requirement (rarely changed).",
      "Expansionary monetary policy: Fed BUYS bonds → reserves up → MS right → nominal rate down → I and interest-sensitive C up → AD right. Mnemonic: BUY = expand.",
      "Contractionary: Fed SELLS bonds → reserves down → MS left → rates up → I down → AD left. Mnemonic: SELL = shrink.",
      "Loanable funds market (LFM): x-axis is quantity of loanable funds, y-axis is REAL interest rate. Demand = borrowers (firms borrowing to invest). Supply = savers. Government deficit borrowing right-shifts demand → real rate up → crowding out of private investment.",
    ],
    formulas: [
      "Fed buys bonds → MS↑ → nominal i↓ → I↑ → AD↑",
      "Government deficit ↑ → demand for loanable funds → real rate ↑ → I↓ (crowding out)",
    ],
    mcqs: [
      {
        q: "The Fed wants to fight a recession. Which action helps?",
        choices: [
          "Sell government bonds",
          "Raise the discount rate",
          "Buy government bonds",
          "Increase the required reserve ratio",
        ],
        answer: 2,
        explain: "Expansionary policy = buy bonds → MS up → rates down → AD right. Other choices are contractionary.",
      },
      {
        q: "A large federal deficit financed by borrowing causes the real interest rate to ___ and private investment to ___.",
        choices: ["Rise; rise", "Rise; fall", "Fall; rise", "Fall; fall"],
        answer: 1,
        explain: "Government borrowing increases demand in the LFM → real rate rises → private investment falls (crowding out).",
      },
    ],
  },

  {
    id: "macro-u5-l1",
    examId: "ap-macro",
    unit: "Unit 5 · Long-Run + Phillips",
    unitOrder: 5,
    order: 1,
    title: "Phillips curve — short run vs long run",
    estimateMin: 12,
    body: [
      "Short-run Phillips curve (SRPC): downward-sloping. Shows tradeoff between unemployment and inflation in the short run. Right-shift in AD → lower U, higher π → movement up-left along SRPC.",
      "Long-run Phillips curve (LRPC): vertical at the natural rate of unemployment (NRU). No long-run tradeoff — in the long run, expectations adjust and unemployment returns to NRU regardless of inflation.",
      "Stagflation = unfavorable supply shock = SRAS leftward shift = SRPC RIGHTWARD shift (higher U AND higher π at the same time).",
      "Connections: AD↑ → SRAS-AD shows higher P, higher Y; SRPC shows lower U, higher π — same story, different graph.",
    ],
    formulas: [
      "Expected inflation rises → SRPC shifts right (higher π for any U)",
      "Supply shock (oil↑) → SRPC shifts right",
    ],
    mcqs: [
      {
        q: "An expansionary fiscal policy moves the economy",
        choices: [
          "Down-right along SRPC (lower π, higher U)",
          "Up-left along SRPC (higher π, lower U)",
          "Right-shift of LRPC",
          "Left-shift of LRPC",
        ],
        answer: 1,
        explain: "Expansionary → AD right → unemployment falls, inflation rises → up-left movement along SRPC.",
      },
      {
        q: "What does the LRPC's vertical shape imply?",
        choices: [
          "There's always a tradeoff between U and π",
          "Inflation has no effect on output in the short run",
          "In the long run, unemployment returns to the natural rate regardless of inflation",
          "The Fed cannot affect interest rates",
        ],
        answer: 2,
        explain: "Vertical LRPC at NRU = no long-run U-π tradeoff. Expectations adjust and U gravitates back to NRU.",
      },
    ],
  },

  {
    id: "macro-u5-l2",
    examId: "ap-macro",
    unit: "Unit 5 · Long-Run + Phillips",
    unitOrder: 5,
    order: 2,
    title: "Crowding out, growth, and MV = PQ",
    estimateMin: 12,
    body: [
      "Crowding out: government deficit borrowing pushes up the real interest rate in the loanable funds market, reducing private investment. This partially offsets the AD-boosting effect of fiscal stimulus.",
      "Long-run growth comes from increases in resources, capital stock, or productivity (technology, human capital, infrastructure). On AD-AS: LRAS shifts right. On PPC: outward shift.",
      "Quantity Theory of Money: M × V = P × Q. M = money supply, V = velocity (turnover), P = price level, Q = real output. In percentage changes: %ΔM + %ΔV ≈ %ΔP + %ΔQ. With V and Q constant, money growth → equal inflation.",
      "National debt vs deficit: deficit is annual (G − T per year); debt is the cumulative stock. A budget surplus reduces debt.",
    ],
    formulas: [
      "MV = PQ",
      "Real GDP growth ≈ %Δlabor + %Δcapital + %Δproductivity",
    ],
    mcqs: [
      {
        q: "MV = PQ. If the Fed grows M at 8%, V is constant, and Q grows at 3%, expected inflation is",
        choices: ["3%", "5%", "8%", "11%"],
        answer: 1,
        explain: "%ΔP ≈ %ΔM + %ΔV − %ΔQ = 8 + 0 − 3 = 5%.",
      },
      {
        q: "An increase in capital stock (e.g., new factories built) shifts",
        choices: ["AD only", "SRAS only", "LRAS only", "Both SRAS and LRAS to the right"],
        answer: 3,
        explain: "More capital raises both the short-run productive capacity and the long-run potential output.",
      },
    ],
  },

  {
    id: "macro-u6-l1",
    examId: "ap-macro",
    unit: "Unit 6 · Open Economy",
    unitOrder: 6,
    order: 1,
    title: "Foreign exchange and balance of payments",
    estimateMin: 12,
    body: [
      "FX market: x-axis is quantity of currency, y-axis is exchange rate (e.g., $/€). Demand for $ = foreigners wanting to buy U.S. goods, assets, services. Supply of $ = U.S. residents buying foreign goods, assets.",
      "Appreciation = currency rises in value. Depreciation = falls. If $ appreciates: U.S. exports more expensive abroad (X↓), imports cheaper (M↑) → NX↓ → AD↓.",
      "Balance of payments has two halves: current account (trade in goods/services + net income/transfers) and financial/capital account (asset flows). They sum to zero (net of errors).",
      "Higher U.S. real interest rate → foreign capital inflow → demand for $ rises → $ appreciates → NX falls. This is the international transmission of monetary policy.",
    ],
    formulas: [
      "Real interest rate parity: ↑U.S. real i → ↑demand for $ → $ appreciates → NX↓",
      "$ appreciates → exports cost more abroad, imports cheaper at home → NX↓",
    ],
    mcqs: [
      {
        q: "U.S. tightens monetary policy. In FX, the dollar likely",
        choices: ["Depreciates due to lower exports", "Appreciates as foreign capital chases higher U.S. real rates", "Stays unchanged — Fed can't affect FX", "Both A and C"],
        answer: 1,
        explain: "Higher U.S. real rates attract capital inflows, raising demand for $ and appreciating the dollar.",
      },
      {
        q: "A weaker dollar (depreciation) tends to",
        choices: ["Decrease U.S. exports", "Increase U.S. imports", "Improve net exports (NX up)", "Have no effect on AD"],
        answer: 2,
        explain: "Weaker $ → U.S. goods cheaper abroad (X↑), foreign goods more expensive (M↓) → NX up → AD up.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────
// AP PRECALC LESSONS
// ─────────────────────────────────────────────────────────────────────

const PRECALC_LESSONS: Lesson[] = [
  {
    id: "pre-u1-l1",
    examId: "ap-precalc",
    unit: "Unit 1 · Polynomial & Rational",
    unitOrder: 1,
    order: 1,
    title: "Average and instantaneous rate of change",
    estimateMin: 12,
    body: [
      "The average rate of change of f over [a, b] is the slope of the secant line: (f(b) − f(a)) / (b − a). It's a single number that summarizes the function's net change per unit input across the interval.",
      "For a polynomial of degree n, the rate of change of the rate of change (i.e., second-order behavior) tells you concavity. If second differences are constant, the polynomial is degree 2 (quadratic). If third differences are constant, degree 3 (cubic).",
      "Local behavior at a point is approximated by a tangent line — instantaneous rate of change. In Precalc you'll estimate these from tables or graphs.",
    ],
    formulas: [
      "AROC of f on [a, b] = (f(b) − f(a)) / (b − a)",
      "Polynomial of degree n: nth-order finite differences are constant",
    ],
    mcqs: [
      {
        q: "Average rate of change of f(x) = x² + 3 on [1, 4] equals",
        choices: ["3", "5", "8", "15"],
        answer: 1,
        explain: "f(4) = 19, f(1) = 4. AROC = (19 − 4) / (4 − 1) = 15 / 3 = 5.",
      },
      {
        q: "If a function's third-order finite differences are constant, it is most likely",
        choices: ["Linear", "Quadratic", "Cubic", "Exponential"],
        answer: 2,
        explain: "Polynomial of degree n has constant nth-order differences. Constant third differences → cubic.",
      },
    ],
  },

  {
    id: "pre-u1-l2",
    examId: "ap-precalc",
    unit: "Unit 1 · Polynomial & Rational",
    unitOrder: 1,
    order: 2,
    title: "Polynomial zeros, multiplicity, end behavior",
    estimateMin: 12,
    body: [
      "Zeros (roots) are x-values where p(x) = 0. The multiplicity of a zero is how many times the corresponding factor appears in the factored form. Even multiplicity → graph touches the x-axis and bounces; odd multiplicity → graph crosses.",
      "End behavior is determined by the leading term. For p(x) = a·x^n + … : if n is even and a > 0, both ends ↑; if n is even and a < 0, both ↓. If n is odd and a > 0, left ↓ right ↑; if odd and a < 0, left ↑ right ↓.",
      "A polynomial of degree n has at most n − 1 turning points (local maxima/minima) and exactly n complex zeros (counting multiplicity).",
    ],
    formulas: [
      "Even multiplicity → bounce; odd multiplicity → cross",
      "Even degree: ends agree. Odd degree: ends opposite.",
    ],
    mcqs: [
      {
        q: "p(x) = (x − 1)²(x + 3) has zeros at",
        choices: ["x = 1 (mult 1), x = −3 (mult 1)", "x = 1 (mult 2), x = −3 (mult 1)", "x = −1 (mult 2), x = 3 (mult 1)", "x = 0 (mult 3)"],
        answer: 1,
        explain: "Factored form gives x = 1 with multiplicity 2 (graph bounces) and x = −3 with multiplicity 1 (graph crosses).",
      },
      {
        q: "End behavior of p(x) = −2x⁵ + 7x − 1?",
        choices: ["Both ends ↑", "Both ends ↓", "Left ↑, right ↓", "Left ↓, right ↑"],
        answer: 2,
        explain: "Odd degree (5), leading coefficient negative (−2). Odd + negative → left ↑, right ↓.",
      },
    ],
  },

  {
    id: "pre-u1-l3",
    examId: "ap-precalc",
    unit: "Unit 1 · Polynomial & Rational",
    unitOrder: 1,
    order: 3,
    title: "Rational functions — asymptotes and holes",
    estimateMin: 14,
    body: [
      "A rational function r(x) = p(x)/q(x). Vertical asymptotes occur where q(x) = 0 and p(x) ≠ 0 at the same x. Holes occur where a common factor cancels.",
      "Horizontal asymptote rules (compare degrees): deg(p) < deg(q) → y = 0. deg(p) = deg(q) → y = ratio of leading coefficients. deg(p) > deg(q) → no HA, possibly slant asymptote (if difference is exactly 1, divide to find).",
      "x-intercepts come from p(x) = 0 (after cancellation). y-intercept = r(0) if defined.",
    ],
    formulas: [
      "VA: q(x) = 0, p(x) ≠ 0",
      "Hole: shared factor between p and q",
      "HA: degree comparison rule",
    ],
    example: {
      prompt: "r(x) = (x² − 1) / (x² − 3x + 2). Identify holes, vertical asymptotes, and horizontal asymptote.",
      solution: "Factor: r(x) = (x − 1)(x + 1) / [(x − 1)(x − 2)]. Cancel (x − 1) → hole at x = 1. VA at x = 2. Same degrees, leading coeffs both 1 → HA at y = 1.",
    },
    mcqs: [
      {
        q: "r(x) = (3x² + 5) / (x² − 4). The horizontal asymptote is",
        choices: ["y = 0", "y = 3", "y = 5/4", "No HA — slant asymptote"],
        answer: 1,
        explain: "Same degree (2). HA = ratio of leading coeffs = 3 / 1 = 3.",
      },
    ],
  },

  {
    id: "pre-u2-l1",
    examId: "ap-precalc",
    unit: "Unit 2 · Exp & Log",
    unitOrder: 2,
    order: 1,
    title: "Exponential functions and modeling",
    estimateMin: 12,
    body: [
      "f(x) = a · b^x with b > 0, b ≠ 1. b > 1 → growth. 0 < b < 1 → decay. The y-intercept is a (because b^0 = 1). Horizontal asymptote at y = 0 (assuming no vertical shift).",
      "Doubling time / half-life: solve b^t = 2 (or 1/2). For continuously compounded growth f(t) = a·e^(kt), doubling time = ln 2 / k.",
      "Compound interest: A = P(1 + r/n)^(nt), continuous: A = P·e^(rt).",
    ],
    formulas: [
      "f(x) = a · b^x",
      "Continuous: A = P · e^(rt)",
      "Doubling time = ln 2 / k (for f = a·e^(kt))",
    ],
    mcqs: [
      {
        q: "A bacteria culture doubles every 4 hours and starts at 200. Population after 12 hours?",
        choices: ["600", "800", "1200", "1600"],
        answer: 3,
        explain: "12 hr / 4 hr = 3 doublings. 200 · 2³ = 200 · 8 = 1600.",
      },
      {
        q: "Which function shows decay?",
        choices: ["f(x) = 3 · 2^x", "f(x) = 5 · (1.05)^x", "f(x) = 10 · (0.7)^x", "f(x) = 4^x"],
        answer: 2,
        explain: "Base between 0 and 1 means decay. 0.7 < 1 → decay.",
      },
    ],
  },

  {
    id: "pre-u2-l2",
    examId: "ap-precalc",
    unit: "Unit 2 · Exp & Log",
    unitOrder: 2,
    order: 2,
    title: "Logarithms — properties and equations",
    estimateMin: 14,
    body: [
      "log_b(x) is the inverse of b^x. Common log = log₁₀; natural log = ln = log_e.",
      "Properties: log(MN) = log M + log N. log(M/N) = log M − log N. log(M^k) = k·log M. Change of base: log_b(x) = ln x / ln b.",
      "Solving exponential equations: take log of both sides, use power rule to bring exponent down. Solving log equations: combine into single log if possible, then exponentiate.",
    ],
    formulas: [
      "log(MN) = log M + log N",
      "log(M/N) = log M − log N",
      "log(M^k) = k · log M",
      "log_b(x) = ln(x) / ln(b)",
    ],
    example: {
      prompt: "Solve 5^x = 80. Round to 3 decimals.",
      solution: "Take ln: x · ln 5 = ln 80. x = ln 80 / ln 5 ≈ 4.382 / 1.609 ≈ 2.723.",
    },
    mcqs: [
      {
        q: "log₂(8) + log₂(4) =",
        choices: ["2", "5", "12", "32"],
        answer: 1,
        explain: "log₂(8) + log₂(4) = log₂(32) = 5. Or directly: 3 + 2 = 5.",
      },
      {
        q: "Solve ln(x) = 3.",
        choices: ["x = 1/e³", "x = e³ ≈ 20.09", "x = 3", "x = 1/3"],
        answer: 1,
        explain: "ln(x) = 3 → x = e³ ≈ 20.09.",
      },
    ],
  },

  {
    id: "pre-u2-l3",
    examId: "ap-precalc",
    unit: "Unit 2 · Exp & Log",
    unitOrder: 2,
    order: 3,
    title: "Inverse functions and composition",
    estimateMin: 12,
    body: [
      "f and g are inverses if f(g(x)) = x and g(f(x)) = x for all x in their domains. Graphs of inverses reflect across y = x. Domain of f = range of f⁻¹.",
      "To find f⁻¹: swap x and y, solve for y. Not every function has an inverse — must be one-to-one (horizontal line test).",
      "Common inverse pairs: e^x and ln x, b^x and log_b(x), x² (restricted to x ≥ 0) and √x.",
    ],
    formulas: [
      "f(f⁻¹(x)) = x",
      "Domain of f = range of f⁻¹, and vice versa",
    ],
    mcqs: [
      {
        q: "If f(x) = 3x − 5, then f⁻¹(x) =",
        choices: ["(x + 5) / 3", "1 / (3x − 5)", "3x + 5", "(x − 5) / 3"],
        answer: 0,
        explain: "Swap: x = 3y − 5. Solve: y = (x + 5) / 3.",
      },
    ],
  },

  {
    id: "pre-u3-l1",
    examId: "ap-precalc",
    unit: "Unit 3 · Trig & Polar",
    unitOrder: 3,
    order: 1,
    title: "Unit circle and the six trig functions",
    estimateMin: 14,
    body: [
      "On the unit circle, a point at angle θ has coordinates (cos θ, sin θ). Tangent = sin/cos. Reciprocal functions: csc = 1/sin, sec = 1/cos, cot = 1/tan.",
      "Memorize key angles in both radians and degrees: 0, π/6 (30°), π/4 (45°), π/3 (60°), π/2 (90°). cos values along x, sin values along y.",
      "Signs by quadrant — A, S, T, C (All, Sin, Tan, Cos). Q1: all positive. Q2: only sin. Q3: only tan. Q4: only cos.",
      "Pythagorean identity: sin²θ + cos²θ = 1. Divide by cos² → 1 + tan²θ = sec²θ. Divide by sin² → cot²θ + 1 = csc²θ.",
    ],
    formulas: [
      "sin²θ + cos²θ = 1",
      "tan θ = sin θ / cos θ",
      "Period of sin, cos = 2π. Period of tan = π.",
    ],
    mcqs: [
      {
        q: "cos(2π/3) =",
        choices: ["1/2", "−1/2", "√3/2", "−√3/2"],
        answer: 1,
        explain: "2π/3 is 120°, in Q2. Reference angle is π/3 (60°). cos(60°) = 1/2; in Q2 cos is negative → −1/2.",
      },
      {
        q: "If sin θ = 3/5 and θ is in Q2, then cos θ =",
        choices: ["4/5", "−4/5", "5/3", "−5/3"],
        answer: 1,
        explain: "Pythagorean: cos²θ = 1 − 9/25 = 16/25 → cos θ = ±4/5. Q2 → cosine negative → −4/5.",
      },
    ],
  },

  {
    id: "pre-u3-l2",
    examId: "ap-precalc",
    unit: "Unit 3 · Trig & Polar",
    unitOrder: 3,
    order: 2,
    title: "Sinusoidal modeling and transformations",
    estimateMin: 14,
    body: [
      "f(x) = A·sin(B(x − C)) + D. A = amplitude (vertical stretch). B = horizontal compression — period = 2π/B. C = horizontal shift (phase). D = vertical shift (midline).",
      "Maximum = D + A. Minimum = D − A. Midline y = D.",
      "Modeling tide/temperature/etc.: amplitude = (max − min)/2. midline = (max + min)/2. period from time between repeats.",
    ],
    formulas: [
      "Period = 2π / |B|",
      "Amplitude = (max − min) / 2",
      "Midline = (max + min) / 2",
    ],
    example: {
      prompt: "Tides peak at 12 ft, trough at 4 ft, full cycle 12 hours. Sinusoidal model with t in hours, peak at t = 0?",
      solution: "Amplitude = (12 − 4)/2 = 4. Midline = 8. Period = 12 → B = 2π/12 = π/6. Use cos for peak at t = 0: h(t) = 4·cos((π/6)t) + 8.",
    },
    mcqs: [
      {
        q: "f(x) = 3·sin(2x) + 5. Period and amplitude?",
        choices: ["Period 2π, amp 3", "Period π, amp 3", "Period π, amp 5", "Period 2, amp 3"],
        answer: 1,
        explain: "Period = 2π / |B| = 2π / 2 = π. Amplitude = |A| = 3.",
      },
    ],
  },

  {
    id: "pre-u3-l3",
    examId: "ap-precalc",
    unit: "Unit 3 · Trig & Polar",
    unitOrder: 3,
    order: 3,
    title: "Inverse trig and identities",
    estimateMin: 12,
    body: [
      "Inverse trig functions return angles. arcsin (sin⁻¹) has range [−π/2, π/2]. arccos has range [0, π]. arctan has range (−π/2, π/2).",
      "When solving sin θ = k for general θ, use the inverse and then add the appropriate quadrant solutions plus 2π·n for periodicity.",
      "Sum-difference identities: sin(A ± B) = sin A cos B ± cos A sin B. cos(A ± B) = cos A cos B ∓ sin A sin B. Double-angle: sin(2θ) = 2 sin θ cos θ. cos(2θ) = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1.",
    ],
    formulas: [
      "sin(A ± B) = sin A cos B ± cos A sin B",
      "cos(A ± B) = cos A cos B ∓ sin A sin B",
      "sin(2θ) = 2 sin θ cos θ",
      "cos(2θ) = 1 − 2 sin²θ",
    ],
    mcqs: [
      {
        q: "sin(2θ) where sin θ = 3/5 and cos θ = 4/5?",
        choices: ["12/25", "24/25", "7/25", "9/25"],
        answer: 1,
        explain: "sin(2θ) = 2 · sin θ · cos θ = 2 · 3/5 · 4/5 = 24/25.",
      },
    ],
  },

  {
    id: "pre-u3-l4",
    examId: "ap-precalc",
    unit: "Unit 3 · Trig & Polar",
    unitOrder: 3,
    order: 4,
    title: "Polar coordinates and graphs",
    estimateMin: 12,
    body: [
      "Polar coordinates use (r, θ): r = distance from origin, θ = angle from positive x-axis. Conversion: x = r cos θ, y = r sin θ. r² = x² + y², tan θ = y/x.",
      "Common polar graphs: r = a (circle radius a), r = a·cos θ (circle through origin), r = a + b·cos θ (limaçon — cardioid if a = b), r = a·cos(nθ) (rose with n petals if n odd, 2n petals if n even).",
      "Average rate of change in polar context: still (Δr / Δθ) along the curve.",
    ],
    formulas: [
      "x = r cos θ,  y = r sin θ",
      "r² = x² + y²,  tan θ = y/x",
    ],
    mcqs: [
      {
        q: "Rectangular form of (r, θ) = (4, π/3)?",
        choices: ["(2, 2√3)", "(2√3, 2)", "(2, 2)", "(4, π/3)"],
        answer: 0,
        explain: "x = 4 cos(π/3) = 4 · 1/2 = 2. y = 4 sin(π/3) = 4 · √3/2 = 2√3.",
      },
    ],
  },
];

export const STUDY_LESSONS: Lesson[] = [...MACRO_LESSONS, ...PRECALC_LESSONS];

export function lessonsByExam(examId: Lesson["examId"]): Lesson[] {
  return STUDY_LESSONS.filter((l) => l.examId === examId);
}
