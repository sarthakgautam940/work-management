export type MealSection = {
  id: string;
  label: string;
  time: string;
  accent: "orange" | "lime" | "blue" | "amber" | "violet" | "red" | "emerald";
  items: string[];
};

export const MEALS: MealSection[] = [
  { id: "wake", label: "Wake Up", time: "5:30 AM", accent: "orange",
    items: ["Lemon water + 5g creatine", "Electrolyte water (Liquid IV)", "D3 + K2", "Magnesium Glycinate"] },
  { id: "breakfast", label: "Breakfast", time: "6:00–6:30 AM", accent: "lime",
    items: ["2–3 eggs", "Greek yogurt", "Banana", "Orange or kiwi ×2", "Pumpkin seeds"] },
  { id: "preworkout", label: "Pre-Workout", time: "30 min before gym", accent: "blue",
    items: ["Carbs: rice / roti / potato", "Light protein"] },
  { id: "pack", label: "Pack For School", time: "Night before", accent: "amber",
    items: ["Cooked chicken or salmon", "Rice or potato", "Greens", "Banana / orange snack",
      "Pumpkin seeds bag", "Liquid IV in bottle", "Nurri protein shake", "Zero fast food"] },
  { id: "lunch", label: "Lunch", time: "Midday", accent: "lime",
    items: ["Packed meal eaten cold", "Protein shake if post-gym", "Pumpkin seeds"] },
  { id: "dinner", label: "Dinner", time: "Evening", accent: "violet",
    items: ["Salmon or chicken", "Bone broth or chicken broth", "Potato or rice", "Greens", "Avocado", "Yogurt"] },
  { id: "targets", label: "Daily Targets", time: "All day", accent: "red",
    items: ["Protein target hit (0.9g/lb)", "4:1 potassium:sodium", "8+ glasses water",
      "Carbs before AND after training", "Zero seed oils", "Zero processed sugar", "Zero fast food"] },
];

export const NEVER_TOUCH = [
  "Seed oils — canola, vegetable, sunflower",
  "Processed sugar of any kind",
  "Fast food — zero exceptions",
  "Excess sodium without matching potassium",
];

export type ShopCategory = {
  id: string;
  label: string;
  accent: "orange" | "lime" | "amber" | "blue" | "violet" | "red";
  items: string[];
};

export const SHOPPING: ShopCategory[] = [
  { id: "protein", label: "Protein", accent: "orange",
    items: ["Chicken breast", "Salmon", "Eggs (dozen)", "Greek yogurt", "Oysters", "Nurri protein shake"] },
  { id: "produce", label: "Produce", accent: "lime",
    items: ["Banana ×6+", "Orange ×4+", "Kiwi", "Spinach", "Broccoli", "Avocado", "Potato", "Zucchini",
      "Cauliflower", "Bell peppers", "Garlic", "Ginger", "Lemon"] },
  { id: "carbs", label: "Carbs", accent: "amber",
    items: ["Rice", "Roti", "Oats (optional)"] },
  { id: "supps", label: "Supplements", accent: "blue",
    items: ["Creatine monohydrate 5g/day", "D3 + K2", "Magnesium Glycinate", "Liquid IV powder"] },
  { id: "pantry", label: "Pantry", accent: "violet",
    items: ["Bone broth / chicken broth", "Pumpkin seeds", "Raw honey", "Iodized salt only", "Olive oil only"] },
  { id: "sick", label: "Sick Day Stock", accent: "red",
    items: ["Raw honey (always stocked)", "Ginger root", "Garlic bulbs", "Lemons", "Bone broth cartons"] },
];

export const SICK_DAY_STACK = [
  "Chicken soup base (real bone broth)",
  "Garlic — crush, wait 10 min, into soup",
  "Ginger — into soup or hot water",
  "Potato — into soup",
  "Honey — raw, 1 spoon or in hot water",
  "Kiwi ×2 — eat first, vitamin C load",
  "Yogurt — room temp, gut health",
  "Eggs — soft scramble",
  "Orange — stack vitamin C",
  "Lemon water with honey all day",
  "Liquid IV all day",
  "Sleep maximum — HGH peaks in deep sleep",
];
