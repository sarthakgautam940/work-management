# Praxis

Personal operating system. Time-aware. Mobile-first. Vercel-ready.

Routine, workout (with set logging + PR detection), food + shopping + sick day, school, AP crash plans (Macro & Precalc — recalibrated to today's date), IBO, SAT (modules + 50 vocab flashcards), UpLevel business, focus timer, stats.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — or visit on your phone via your local IP for mobile testing.

## Deploy to Vercel

```bash
git init && git add . && git commit -m "praxis v1"
gh repo create praxis --private --source=. --push
```

Then go to vercel.com → "Add New" → "Project" → import the repo → Deploy. Zero config needed.

After it's live, on your phone: open the deployed URL → tap browser share → "Add to Home Screen". It runs full-screen like a native app.

## Critical dates baked in (today is May 4, 2026)

- **AP Macro** — Friday May 8 (4 days)
- **AP Precalc** — Tuesday May 12 (8 days)
- **IBO sprint** — starts May 9
- **IBO Grand Test** — opens August 8
- **SAT** — October 3, 2026

The AP module has compressed crash schedules for both exams starting today. No video links — just topic blocks per day, mark complete as you go.

## Architecture

```
app/                  Next.js 14 App Router pages
  page.tsx            Today (alive home)
  routine/            Daily routine (11 sections)
  workout/            Push/pull/legs with set logging
  food/               Meals · shopping · sick day
  school/             5 classes
  ap/                 Macro + Precalc crash plans
  ibo/                Chapters · books · cases · dates
  sat/                Math · RW · vocab flashcards
  business/           UpLevel pipeline · MRR · builds
  timer/              Persistent focus blocks
  stats/              Streak · PRs · body progress
components/
  shell/app-shell.tsx Mobile bottom nav + desktop sidebar + hamburger
  ui/index.tsx        Card, Stat, Checkbox, Button, Tag, Input, etc
lib/
  store/index.ts      Zustand + localStorage persist
  data/               Static config — routine, workout, food, school, ibo, sat, business
  utils/              Date utilities, cn helper
```

State persists via Zustand's `persist` middleware to `localStorage` under `praxis-store-v1`. To migrate to a real database later (Supabase recommended), swap the `persist` storage adapter — the state shape already maps cleanly to relational tables.

## Workout rotation

Push/pull/legs cycle modulo weekdays. Anchor is Monday May 4, 2026 = Push. Weekends auto-rest. Open `lib/utils/date.ts` and adjust `ROTATION_ANCHOR` to recalibrate.

## Customize

- **Colors**: `tailwind.config.ts` — accent palette
- **Routine**: `lib/data/routine.ts` — sections + items
- **Workouts**: `lib/data/workout.ts` — exercises per split
- **AP plans**: `lib/data/school.ts` — `AP_MACRO_PLAN` / `AP_PRECALC_PLAN`
- **Vocab**: `lib/data/sat.ts` — 50 cards, easy to expand
- **Streak threshold**: `lib/store/index.ts` — currently 20+ items per day
