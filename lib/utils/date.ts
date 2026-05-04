export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseKey(s: string): Date {
  return new Date(s + "T00:00:00");
}

export function timeOfDay(d: Date = new Date()): "early" | "morning" | "afternoon" | "evening" | "night" {
  const h = d.getHours();
  if (h < 5) return "night";
  if (h < 9) return "early";
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  if (h < 22) return "evening";
  return "night";
}

export function greeting(): string {
  const map = { early: "Up early", morning: "Good morning", afternoon: "Afternoon", evening: "Evening", night: "Late night" } as const;
  return map[timeOfDay()];
}

export function daysUntil(dateStr: string): number {
  const target = parseKey(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / 86400000);
}

export function urgencyLabel(dateStr: string): { text: string; tone: "lime" | "amber" | "red" | "ghost" } {
  const d = daysUntil(dateStr);
  if (d < 0) return { text: `${Math.abs(d)}d overdue`, tone: "red" };
  if (d === 0) return { text: "Today", tone: "red" };
  if (d === 1) return { text: "Tomorrow", tone: "red" };
  if (d <= 3) return { text: `${d}d left`, tone: "red" };
  if (d <= 7) return { text: `${d}d left`, tone: "amber" };
  if (d <= 30) return { text: `${d}d`, tone: "lime" };
  return { text: `${d}d`, tone: "ghost" };
}

export function formatRelative(dateStr: string): string {
  const d = daysUntil(dateStr);
  if (d === 0) return "today";
  if (d === 1) return "tomorrow";
  if (d === -1) return "yesterday";
  if (d > 0 && d < 7) return `in ${d} days`;
  if (d < 0 && d > -7) return `${Math.abs(d)} days ago`;
  return parseKey(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function fullDate(d: Date = new Date()): string {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export function shortDate(s: string): string {
  return parseKey(s).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function dayOfWeek(d: Date = new Date()): string {
  return d.toLocaleDateString("en-US", { weekday: "long" });
}

export function weekKey(d: Date = new Date()): string {
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  return todayKey(monday);
}

const ROTATION_ANCHOR = new Date("2026-05-04T00:00:00"); // Monday May 4 = Push (today)
const ROTATION = ["push", "pull", "legs"] as const;
export type Workout = (typeof ROTATION)[number] | "rest";

export function workoutFor(d: Date = new Date()): Workout {
  const day = d.getDay();
  if (day === 0 || day === 6) return "rest";
  let count = 0;
  const cursor = new Date(ROTATION_ANCHOR);
  while (cursor < d) {
    const cd = cursor.getDay();
    if (cd !== 0 && cd !== 6) count++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return ROTATION[count % 3];
}

export function ordinalDay(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
