export type Section = {
  id: string;
  label: string;
  timeHint: string;
  accent: "lime" | "blue" | "amber" | "violet" | "red" | "orange" | "emerald" | "rose";
  items: string[];
};

export const ROUTINE_SECTIONS: Section[] = [
  {
    id: "wake",
    label: "Wake Up",
    timeHint: "5:30 AM",
    accent: "orange",
    items: ["Lemon water + 5g creatine", "Electrolyte water (Liquid IV)", "D3 + K2", "Magnesium Glycinate"],
  },
  {
    id: "skin-am",
    label: "Morning Skin",
    timeHint: "After shower",
    accent: "lime",
    items: [
      "Warm water rinse",
      "Rice Toner",
      "Centella Asiatica Serum",
      "Vitamin C (Ascorbyl Glucoside 12%)",
      "Undereye — Based",
      "Moisturizer",
      "SPF (Badger)",
      "Tinted Lip Balm",
    ],
  },
  {
    id: "hair-am",
    label: "Morning Hair",
    timeHint: "After skin",
    accent: "violet",
    items: ["Based Leave-In (damp hair)", "Based Elixir — ends only", "Style (clay / pomade / salt spray)"],
  },
  {
    id: "eyes-am",
    label: "Morning Eyes",
    timeHint: "After hair",
    accent: "violet",
    items: ["Lash & Brow Serum — upper lash line", "Brush brows"],
  },
  {
    id: "scent",
    label: "Scent Layer",
    timeHint: "Final step",
    accent: "blue",
    items: [
      "Unscented lotion — full body",
      "Neutral/woody deodorant",
      "Bleu de Chanel — neck (2 sprays)",
      "Bleu de Chanel — wrists (1 each, no rub)",
      "Bleu de Chanel — chest (1 spray)",
    ],
  },
  {
    id: "habits",
    label: "Locked In",
    timeHint: "All day",
    accent: "amber",
    items: [
      "Mewing (posterior tongue, suction)",
      "Mastic gum 20–30 min",
      "Nose breathe only",
      "Posture — ears/shoulders/hips aligned",
      "Phone at eye level",
      "Don't touch face",
      "4:1 potassium:sodium ratio",
      "Zero seed oils / sugar / fast food",
    ],
  },
  {
    id: "diet",
    label: "Diet Targets",
    timeHint: "Throughout day",
    accent: "emerald",
    items: [
      "Protein target hit",
      "Salmon / chicken / eggs",
      "Yogurt",
      "Banana + orange",
      "Greens (spinach / broccoli)",
      "Pumpkin seeds",
      "Bone broth",
      "8+ glasses water",
      "Lunch packed (clean)",
      "Liquid IV + protein shake packed",
    ],
  },
  {
    id: "skin-pm",
    label: "Evening Skin",
    timeHint: "Before bed",
    accent: "lime",
    items: [
      "Based Cleanser",
      "Warm → cold water rinse",
      "Rice Toner",
      "Centella Asiatica Serum",
      "Azelaic Acid 10%",
      "Undereye",
      "Moisturizer",
      "Lip: moisturizer → Aquaphor",
    ],
  },
  {
    id: "hair-pm",
    label: "Evening Hair",
    timeHint: "Before bed",
    accent: "violet",
    items: ["Multi-Peptide Hair Density Serum — scalp", "Scalp massage 60s"],
  },
  {
    id: "eyes-pm",
    label: "Evening Eyes",
    timeHint: "Before bed",
    accent: "violet",
    items: ["Lash & Brow Serum — line + brows", "Castor oil — lashes (after dry)", "Castor oil — brows"],
  },
  {
    id: "bed",
    label: "Before Bed",
    timeHint: "10–11 PM",
    accent: "blue",
    items: ["Chin tucks ×10", "Blink exercise", "No blue light 30+ min", "Phone DND / out of room", "Asleep by 10–11pm"],
  },
];

export const WEEKLY_TASKS = [
  { id: "shave", label: "Shave (clean)" },
  { id: "hair1", label: "Hair wash #1 (midweek)" },
  { id: "hair2", label: "Hair wash #2 (Friday)" },
  { id: "towels", label: "Wash face towels" },
  { id: "sheets", label: "Wash bedsheets" },
  { id: "lip1", label: "Lip exfoliation #1" },
  { id: "lip2", label: "Lip exfoliation #2" },
  { id: "lymph", label: "Lymphatic drainage" },
  { id: "gua", label: "Gua sha" },
];

export function totalRoutineItems(): number {
  return ROUTINE_SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
}
