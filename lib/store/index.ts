import { create } from "zustand";
import { persist } from "zustand/middleware";
import { todayKey, weekKey } from "@/lib/utils/date";
import type { WorkoutType } from "@/lib/data/workout";

type SetEntry = { weight: number; reps: number; ts: number };

type GymSession = {
  type: WorkoutType;
  date: string;
  sets: Record<string, SetEntry[]>;
};

type TimerState = {
  duration: number;
  remaining: number;
  endAt: number | null;
  sessionsByDate: Record<string, number>;
};

interface AppState {
  // Identity
  name: string;
  bodyweight: number;

  // Routine
  routineDaily: Record<string, string[]>;
  weeklyTasks: Record<string, string[]>;

  // Workout
  gymSessions: Record<string, GymSession>;
  prs: Record<string, { weight: number; reps: number; date: string }>;
  bodyweightLog: Record<string, number>;

  // Food
  foodDaily: Record<string, string[]>;
  shoppingCart: string[];

  // School
  schoolTasks: Record<string, boolean>;

  // AP
  apMacroDays: Record<string, boolean>;
  apPrecalcDays: Record<string, boolean>;

  // IBO
  iboChapters: Record<string, boolean>;
  iboBooks: Record<string, { complete: boolean; pages: number; total: number }>;
  iboCases: Record<string, boolean>;

  // SAT
  satModules: Record<string, boolean>;
  vocabKnown: Record<number, boolean>;

  // Business
  leadStatuses: Record<string, "new" | "contacted" | "responded" | "call-booked" | "closed-won" | "closed-lost">;
  monthlyRevenue: Record<string, number>;
  uplevelTasks: Record<string, boolean>;

  // Big Idea project
  bigIdeaTasks: Record<string, boolean>;
  bigIdeaBookId: string | null;
  bigIdeaSourceState: Record<string, "pending" | "selected" | "annotated" | "approved">;

  // Work Mode — study lesson progress
  lessonDone: Record<string, boolean>;
  lessonAnswers: Record<string, number>;        // lessonId.qIdx -> chosen index
  workDeferred: Record<string, number>;          // itemId -> epoch ms until which to hide
  workSkipped: Record<string, number>;           // itemId -> count of skips today (for ranking demotion)
  workSubtaskDone: Record<string, boolean>;      // ${parentId}.${subId} -> done
  recentCompletions: { itemId: string; type: string; subId?: string; at: number; label: string }[];
  workTimers: Record<string, { startedAt: number | null; accumulated: number }>;  // per-task stopwatch

  // Timer
  timer: TimerState;

  // Actions — Routine
  toggleRoutine: (id: string) => void;
  isRoutineDone: (id: string) => boolean;
  resetRoutineSection: (sectionId: string) => void;
  toggleWeekly: (id: string) => void;
  isWeeklyDone: (id: string) => boolean;

  // Actions — Workout
  startGym: (type: WorkoutType) => void;
  clearGym: () => void;
  logSet: (exerciseId: string, weight: number, reps: number) => void;
  removeLastSet: (exerciseId: string) => void;
  setBodyweight: (bw: number) => void;
  logBodyweight: (bw: number) => void;

  // Actions — Food
  toggleFood: (id: string) => void;
  isFoodDone: (id: string) => boolean;
  toggleShop: (id: string) => void;
  isInCart: (id: string) => boolean;
  clearCart: () => void;

  // Actions — School
  toggleSchoolTask: (id: string) => void;

  // Actions — AP
  toggleAPMacro: (date: string) => void;
  toggleAPPrecalc: (date: string) => void;

  // Actions — IBO
  toggleIBOChapter: (id: string) => void;
  toggleIBOCase: (id: string) => void;
  setIBOBookProgress: (id: string, pages: number, total: number) => void;
  toggleIBOBookComplete: (id: string) => void;

  // Actions — SAT
  toggleSATModule: (id: string) => void;
  markVocab: (idx: number, known: boolean) => void;

  // Actions — Business
  setLeadStatus: (id: string, status: AppState["leadStatuses"][string]) => void;
  setMonthlyRevenue: (month: string, amount: number) => void;
  toggleUplevelTask: (id: string) => void;

  // Actions — Big Idea
  toggleBigIdeaTask: (id: string) => void;
  setBigIdeaBook: (id: string | null) => void;
  setBigIdeaSourceState: (id: string, state: "pending" | "selected" | "annotated" | "approved") => void;

  // Actions — Work Mode
  markLessonDone: (id: string, done: boolean) => void;
  recordLessonAnswer: (key: string, idx: number) => void;
  deferWorkItem: (id: string, untilMs: number) => void;
  skipWorkItem: (id: string) => void;
  setSubtaskDone: (parentId: string, subId: string, done: boolean) => void;
  pushRecentCompletion: (rec: { itemId: string; type: string; subId?: string; label: string }) => void;
  clearRecentCompletion: (itemId: string) => void;
  startWorkTimer: (id: string) => void;
  pauseWorkTimer: (id: string) => void;
  resetWorkTimer: (id: string) => void;

  // Actions — Timer
  setTimerDuration: (seconds: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;

  // Selectors
  getStreak: () => number;
  getTodayCompletion: (totalItems: number) => number;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      name: "",
      bodyweight: 160,

      routineDaily: {},
      weeklyTasks: {},

      gymSessions: {},
      prs: {},
      bodyweightLog: {},

      foodDaily: {},
      shoppingCart: [],

      schoolTasks: {},

      apMacroDays: {},
      apPrecalcDays: {},

      iboChapters: {},
      iboBooks: {},
      iboCases: {},

      satModules: {},
      vocabKnown: {},

      leadStatuses: {},
      monthlyRevenue: {},
      uplevelTasks: {},

      bigIdeaTasks: {},
      bigIdeaBookId: null,
      bigIdeaSourceState: {},

      lessonDone: {},
      lessonAnswers: {},
      workDeferred: {},
      workSkipped: {},
      workSubtaskDone: {},
      recentCompletions: [],
      workTimers: {},

      timer: { duration: 50 * 60, remaining: 50 * 60, endAt: null, sessionsByDate: {} },

      // Routine
      toggleRoutine: (id) =>
        set((s) => {
          const tk = todayKey();
          const cur = s.routineDaily[tk] || [];
          const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
          return { routineDaily: { ...s.routineDaily, [tk]: next } };
        }),
      isRoutineDone: (id) => (get().routineDaily[todayKey()] || []).includes(id),
      resetRoutineSection: (sectionId) =>
        set((s) => {
          const tk = todayKey();
          const cur = s.routineDaily[tk] || [];
          const next = cur.filter((x) => !x.startsWith(`${sectionId}.`));
          return { routineDaily: { ...s.routineDaily, [tk]: next } };
        }),
      toggleWeekly: (id) =>
        set((s) => {
          const wk = weekKey();
          const cur = s.weeklyTasks[wk] || [];
          const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
          return { weeklyTasks: { ...s.weeklyTasks, [wk]: next } };
        }),
      isWeeklyDone: (id) => (get().weeklyTasks[weekKey()] || []).includes(id),

      // Workout
      startGym: (type) =>
        set((s) => ({
          gymSessions: { ...s.gymSessions, [todayKey()]: { type, date: todayKey(), sets: {} } },
        })),
      clearGym: () =>
        set((s) => {
          const next = { ...s.gymSessions };
          delete next[todayKey()];
          return { gymSessions: next };
        }),
      logSet: (exerciseId, weight, reps) =>
        set((s) => {
          const tk = todayKey();
          const session = s.gymSessions[tk];
          if (!session) return s;
          const sets = [...(session.sets[exerciseId] || []), { weight, reps, ts: Date.now() }];
          const newSession = { ...session, sets: { ...session.sets, [exerciseId]: sets } };
          const currentPR = s.prs[exerciseId];
          const isPR =
            !currentPR ||
            weight > currentPR.weight ||
            (weight === currentPR.weight && reps > currentPR.reps);
          const newPRs = isPR && weight > 0
            ? { ...s.prs, [exerciseId]: { weight, reps, date: tk } }
            : s.prs;
          return { gymSessions: { ...s.gymSessions, [tk]: newSession }, prs: newPRs };
        }),
      removeLastSet: (exerciseId) =>
        set((s) => {
          const tk = todayKey();
          const session = s.gymSessions[tk];
          if (!session) return s;
          const sets = (session.sets[exerciseId] || []).slice(0, -1);
          const newSession = { ...session, sets: { ...session.sets, [exerciseId]: sets } };
          return { gymSessions: { ...s.gymSessions, [tk]: newSession } };
        }),
      setBodyweight: (bw) => set({ bodyweight: bw }),
      logBodyweight: (bw) =>
        set((s) => ({ bodyweight: bw, bodyweightLog: { ...s.bodyweightLog, [todayKey()]: bw } })),

      // Food
      toggleFood: (id) =>
        set((s) => {
          const tk = todayKey();
          const cur = s.foodDaily[tk] || [];
          const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
          return { foodDaily: { ...s.foodDaily, [tk]: next } };
        }),
      isFoodDone: (id) => (get().foodDaily[todayKey()] || []).includes(id),
      toggleShop: (id) =>
        set((s) => ({
          shoppingCart: s.shoppingCart.includes(id)
            ? s.shoppingCart.filter((x) => x !== id)
            : [...s.shoppingCart, id],
        })),
      isInCart: (id) => get().shoppingCart.includes(id),
      clearCart: () => set({ shoppingCart: [] }),

      // School
      toggleSchoolTask: (id) =>
        set((s) => ({ schoolTasks: { ...s.schoolTasks, [id]: !s.schoolTasks[id] } })),

      // AP
      toggleAPMacro: (date) =>
        set((s) => ({ apMacroDays: { ...s.apMacroDays, [date]: !s.apMacroDays[date] } })),
      toggleAPPrecalc: (date) =>
        set((s) => ({ apPrecalcDays: { ...s.apPrecalcDays, [date]: !s.apPrecalcDays[date] } })),

      // IBO
      toggleIBOChapter: (id) =>
        set((s) => ({ iboChapters: { ...s.iboChapters, [id]: !s.iboChapters[id] } })),
      toggleIBOCase: (id) =>
        set((s) => ({ iboCases: { ...s.iboCases, [id]: !s.iboCases[id] } })),
      setIBOBookProgress: (id, pages, total) =>
        set((s) => ({
          iboBooks: {
            ...s.iboBooks,
            [id]: { complete: pages >= total && total > 0, pages, total },
          },
        })),
      toggleIBOBookComplete: (id) =>
        set((s) => {
          const cur = s.iboBooks[id] || { complete: false, pages: 0, total: 0 };
          return { iboBooks: { ...s.iboBooks, [id]: { ...cur, complete: !cur.complete } } };
        }),

      // SAT
      toggleSATModule: (id) =>
        set((s) => ({ satModules: { ...s.satModules, [id]: !s.satModules[id] } })),
      markVocab: (idx, known) =>
        set((s) => ({ vocabKnown: { ...s.vocabKnown, [idx]: known } })),

      // Business
      setLeadStatus: (id, status) =>
        set((s) => ({ leadStatuses: { ...s.leadStatuses, [id]: status } })),
      setMonthlyRevenue: (month, amount) =>
        set((s) => ({ monthlyRevenue: { ...s.monthlyRevenue, [month]: amount } })),
      toggleUplevelTask: (id) =>
        set((s) => ({ uplevelTasks: { ...s.uplevelTasks, [id]: !s.uplevelTasks[id] } })),

      // Big Idea
      toggleBigIdeaTask: (id) =>
        set((s) => ({ bigIdeaTasks: { ...s.bigIdeaTasks, [id]: !s.bigIdeaTasks[id] } })),
      setBigIdeaBook: (id) => set({ bigIdeaBookId: id }),
      setBigIdeaSourceState: (id, state) =>
        set((s) => ({ bigIdeaSourceState: { ...s.bigIdeaSourceState, [id]: state } })),

      // Work Mode
      markLessonDone: (id, done) =>
        set((s) => ({ lessonDone: { ...s.lessonDone, [id]: done } })),
      recordLessonAnswer: (key, idx) =>
        set((s) => ({ lessonAnswers: { ...s.lessonAnswers, [key]: idx } })),
      deferWorkItem: (id, untilMs) =>
        set((s) => ({ workDeferred: { ...s.workDeferred, [id]: untilMs } })),
      skipWorkItem: (id) =>
        set((s) => ({ workSkipped: { ...s.workSkipped, [id]: (s.workSkipped[id] || 0) + 1 } })),
      setSubtaskDone: (parentId, subId, done) =>
        set((s) => ({ workSubtaskDone: { ...s.workSubtaskDone, [`${parentId}.${subId}`]: done } })),
      pushRecentCompletion: (rec) =>
        set((s) => ({
          recentCompletions: [
            { ...rec, at: Date.now() },
            ...s.recentCompletions.filter((r) => !(r.itemId === rec.itemId && r.subId === rec.subId)),
          ].slice(0, 8),
        })),
      clearRecentCompletion: (itemId) =>
        set((s) => ({ recentCompletions: s.recentCompletions.filter((r) => r.itemId !== itemId) })),
      startWorkTimer: (id) =>
        set((s) => {
          const cur = s.workTimers[id] || { startedAt: null, accumulated: 0 };
          if (cur.startedAt) return s;
          return { workTimers: { ...s.workTimers, [id]: { ...cur, startedAt: Date.now() } } };
        }),
      pauseWorkTimer: (id) =>
        set((s) => {
          const cur = s.workTimers[id];
          if (!cur || !cur.startedAt) return s;
          const accumulated = cur.accumulated + (Date.now() - cur.startedAt);
          return { workTimers: { ...s.workTimers, [id]: { startedAt: null, accumulated } } };
        }),
      resetWorkTimer: (id) =>
        set((s) => ({ workTimers: { ...s.workTimers, [id]: { startedAt: null, accumulated: 0 } } })),

      // Timer
      setTimerDuration: (seconds) =>
        set((s) => ({ timer: { ...s.timer, duration: seconds, remaining: seconds, endAt: null } })),
      startTimer: () =>
        set((s) => {
          const remaining = s.timer.remaining > 0 ? s.timer.remaining : s.timer.duration;
          return { timer: { ...s.timer, remaining, endAt: Date.now() + remaining * 1000 } };
        }),
      pauseTimer: () =>
        set((s) => {
          if (!s.timer.endAt) return s;
          const remaining = Math.max(0, Math.ceil((s.timer.endAt - Date.now()) / 1000));
          return { timer: { ...s.timer, remaining, endAt: null } };
        }),
      resetTimer: () =>
        set((s) => ({ timer: { ...s.timer, remaining: s.timer.duration, endAt: null } })),
      tickTimer: () =>
        set((s) => {
          if (!s.timer.endAt) return s;
          const diff = s.timer.endAt - Date.now();
          if (diff <= 0) {
            const tk = todayKey();
            return {
              timer: {
                ...s.timer,
                remaining: 0,
                endAt: null,
                sessionsByDate: { ...s.timer.sessionsByDate, [tk]: (s.timer.sessionsByDate[tk] || 0) + 1 },
              },
            };
          }
          return { timer: { ...s.timer, remaining: Math.ceil(diff / 1000) } };
        }),

      // Selectors
      getStreak: () => {
        let streak = 0;
        const map = get().routineDaily;
        const cursor = new Date();
        for (let i = 0; i < 365; i++) {
          const k = todayKey(cursor);
          const count = (map[k] || []).length;
          if (count >= 20) streak++;
          else if (i > 0) break;
          cursor.setDate(cursor.getDate() - 1);
        }
        return streak;
      },
      getTodayCompletion: (totalItems) => {
        const count = (get().routineDaily[todayKey()] || []).length;
        return Math.round((count / totalItems) * 100);
      },
    }),
    { name: "praxis-store-v1", version: 2 }
  )
);
