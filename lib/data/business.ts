// UpLevel Services LLC — current state from memory

export const UPLEVEL_GOALS = {
  mrrTarget: 50000,
  cumulativeTarget: 600000,
  maxClients: 15,
  daysToGoal: 90,
};

export const PRICING_TIERS = [
  { id: "t1", label: "Foundation", oneTime: 12000, monthly: 1497, color: "violet", note: "Downstep only — never pitch first" },
  { id: "t2", label: "Growth Partner", oneTime: 25000, monthly: 3500, color: "blue", note: "DEFAULT close" },
  { id: "t3", label: "Market Domination", oneTime: 55000, monthly: 6500, color: "amber", note: "ALWAYS anchor here first" },
  { id: "t4", label: "Creative Prestige", oneTime: 100000, monthly: 6500, color: "rose", note: "$75K-150K range. Requires proof." },
];

export type LeadStatus = "new" | "contacted" | "responded" | "call-booked" | "closed-won" | "closed-lost";

export type Lead = {
  id: string;
  name: string;
  niche: string;
  region: string;
  tier: "t2" | "t3" | "t4";
};

// Stub of leads structure — actual leads in APEX_LEADS_V3.xlsx
// User can paste real names/info into the app store; this is the schema
export const SAMPLE_LEADS: Lead[] = [
  { id: "L01", name: "Palmetto Pools", niche: "Luxury pools", region: "UT", tier: "t2" },
];

export const ACTIVE_BUILDS = [
  { id: "palmetto", client: "Palmetto Pools", tier: "t2", phase: "Visual complete · integrations pending", progress: 70 },
];

export const OUTREACH_STATUS = {
  warmupStart: "2026-04-01",
  warmupEnd: "2026-04-15",
  campaignStart: "2026-04-15",
  domain: "uplevelservicesllc.com",
};

export const PHASE_1_PRIORITIES = [
  { id: "stripe", label: "Stripe attempt", detail: "Articles + EIN + Operating Agreement. Fallback: Helcim → PayPal", urgent: true },
  { id: "vacu", label: "VACU deposit", detail: "$400-600 by April 30", urgent: false, done: true },
  { id: "cp575", label: "CP575 → VACU", detail: "Same-day deliver on arrival ~Apr 19", urgent: false, done: true },
  { id: "site", label: "Site deploy to Vercel", detail: "Hero motion + wiring + /terms + /privacy", urgent: true },
  { id: "outreach", label: "Cold outreach launch", detail: "40 leads from APEX_LEADS_V3", urgent: true },
];
