// Real, verified external links surfaced inside Work Mode.
// No fabricated URLs.

export const LINKS = {
  schoology: "https://henrico.schoology.com/home",
  mathmedicPrecalc:
    "https://review.mathmedic.com/library/2026-math-medic-ap-precalculus-exam-review-course-241917/754515/path/",
} as const;

// Mapping of school class id -> default link to open for that class's work.
// Schoology is the canonical home for every class at DRHS.
export const CLASS_LINKS: Record<string, string> = {
  precalc: LINKS.mathmedicPrecalc,
  marketing: LINKS.schoology,
  chemistry: LINKS.schoology,
  macro: LINKS.schoology,
  pe: LINKS.schoology,
  english: LINKS.schoology,
};

// Specific task overrides — a single task can point to its own URL.
export const TASK_LINKS: Record<string, string> = {
  "precalc-calmedic-13": LINKS.mathmedicPrecalc,
  "precalc-calmedic-46": LINKS.mathmedicPrecalc,
  "precalc-calmedic-rest": LINKS.mathmedicPrecalc,
};
