export type Exercise = {
  id: string;
  label: string;
  target: string;
  rest: string;
  notes?: string;
};

export type WorkoutType = "push" | "pull" | "legs";

export type WorkoutPlan = {
  type: WorkoutType;
  label: string;
  accent: "orange" | "blue" | "violet";
  exercises: Exercise[];
};

export const WORKOUTS: Record<WorkoutType, WorkoutPlan> = {
  push: {
    type: "push",
    label: "Push",
    accent: "orange",
    exercises: [
      { id: "bench", label: "Bench Press", target: "3×6-8", rest: "3 min", notes: "Last set to failure" },
      { id: "incline", label: "Incline Bench", target: "3×6-8", rest: "2 min", notes: "Dumbbells" },
      { id: "shoulder-press", label: "Shoulder Press", target: "3×8-10", rest: "2 min", notes: "Dumbbells" },
      { id: "lat-raise", label: "Lat Raises", target: "3×12", rest: "90s" },
      { id: "chest-fly", label: "Chest Fly", target: "3×10-12", rest: "90s", notes: "Machine" },
      { id: "overhead-tri", label: "Overhead Tricep", target: "3×10-12", rest: "90s" },
      { id: "tri-pushdown", label: "Tricep Pushdown", target: "3×10-12", rest: "90s" },
      { id: "sprints", label: "Sprints", target: "6×30s/90s", rest: "—", notes: "IGF-1 spike" },
    ],
  },
  pull: {
    type: "pull",
    label: "Pull",
    accent: "blue",
    exercises: [
      { id: "pullup", label: "Pull-Ups", target: "3×6-8", rest: "3 min", notes: "Assisted ok" },
      { id: "lat-pulldown", label: "Lat Pulldown", target: "3×8-10", rest: "2 min" },
      { id: "cable-row", label: "Cable Row", target: "3×8-10", rest: "2 min" },
      { id: "iso-row", label: "Iso-Lateral Row", target: "3×10", rest: "90s" },
      { id: "rear-delt", label: "Rear Delts", target: "3×12", rest: "90s", notes: "Machine" },
      { id: "scap-pull", label: "Scapular Pulls", target: "3×10", rest: "60s" },
      { id: "pullover", label: "Pullover", target: "3×10-12", rest: "60s", notes: "Lat stretch + serratus" },
      { id: "preacher", label: "Preacher Curl", target: "3×10", rest: "90s" },
      { id: "hammer", label: "Hammer Curl", target: "3×10", rest: "90s" },
      { id: "forearm", label: "Forearm Curls", target: "3×12", rest: "60s" },
      { id: "treadmill", label: "Treadmill", target: "2 mi", rest: "—" },
      { id: "sauna", label: "Sauna", target: "15 min", rest: "—" },
    ],
  },
  legs: {
    type: "legs",
    label: "Legs",
    accent: "violet",
    exercises: [
      { id: "leg-press", label: "Leg Press", target: "3×8-10", rest: "2 min", notes: "Last set explosive" },
      { id: "leg-curl", label: "Leg Curl", target: "3×10", rest: "2 min" },
      { id: "leg-ext", label: "Leg Extension", target: "3×12", rest: "90s" },
      { id: "abduction", label: "Abduction", target: "3×12", rest: "90s" },
      { id: "adduction", label: "Adduction", target: "3×12", rest: "90s" },
      { id: "calf", label: "Seated Calf Raises", target: "3×15-20", rest: "60s", notes: "Soleus focus, 2s each way" },
      { id: "leg-raise", label: "Leg Raises", target: "3×12", rest: "90s" },
      { id: "ab-crunch", label: "Ab Crunch Machine", target: "3×12", rest: "60s" },
      { id: "oblique", label: "Oblique Twist", target: "3×12 each", rest: "60s" },
      { id: "stairmaster", label: "Stairmaster Lvl 9", target: "20 min", rest: "—" },
    ],
  },
};

export function getWorkout(type: WorkoutType): WorkoutPlan {
  return WORKOUTS[type];
}
