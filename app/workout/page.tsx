"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Stat, Tag, Button, Input, PageHeader, Field } from "@/components/ui";
import { useStore } from "@/lib/store";
import { workoutFor, todayKey } from "@/lib/utils/date";
import { WORKOUTS, WorkoutType, Exercise } from "@/lib/data/workout";
import { Plus, Trash2, ChevronDown, Trophy, Zap, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function WorkoutPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return <WorkoutInner />;
}

function WorkoutInner() {
  const todaySession = useStore((s) => s.gymSessions[todayKey()]);
  const startGym = useStore((s) => s.startGym);
  const clearGym = useStore((s) => s.clearGym);
  const suggested = workoutFor();

  if (!todaySession) {
    return (
      <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-3xl pb-10">
        <PageHeader eyebrow="Workout" title={suggested === "rest" ? "Rest Day" : `${cap(suggested)} Day Suggested`} subtitle="Pick today's workout to start logging." />
        {suggested !== "rest" && (
          <Card className="p-4 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <Eyebrow accent="lime"><span className="live-dot">Today's rotation</span></Eyebrow>
                <div className="text-base mt-1">{cap(suggested)}</div>
              </div>
              <Button variant="primary" onClick={() => startGym(suggested as WorkoutType)}>Start</Button>
            </div>
          </Card>
        )}
        <div className="space-y-2 mt-2">
          {(["push", "pull", "legs"] as WorkoutType[]).filter((t) => t !== suggested).map((t) => (
            <Card key={t} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-base">{cap(t)}</div>
                  <div className="text-xs text-ink-mute mt-0.5">Override today's split</div>
                </div>
                <Button variant="secondary" onClick={() => startGym(t)}>Start {cap(t)}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const plan = WORKOUTS[todaySession.type];
  const totalSets = Object.values(todaySession.sets).reduce((sum, s) => sum + s.length, 0);
  const totalVolume = Object.values(todaySession.sets).reduce(
    (sum, sets) => sum + sets.reduce((s, set) => s + set.weight * set.reps, 0),
    0
  );

  return (
    <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-3xl pb-10">
      <PageHeader
        eyebrow="In Progress"
        title={`${plan.label} Day`}
        subtitle="Track every set. Last set to failure on each lift."
        accent={plan.accent}
        right={
          <Button variant="secondary" size="sm" onClick={clearGym}>
            <span className="flex items-center gap-1.5"><RefreshCw size={12} /> Change</span>
          </Button>
        }
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat label="Sets" value={totalSets} accent={plan.accent} />
        <Stat label="Volume" value={totalVolume.toLocaleString()} hint="lbs × reps" accent={plan.accent} />
        <Stat label="Lifts" value={`${Object.keys(todaySession.sets).filter(k => todaySession.sets[k].length > 0).length}/${plan.exercises.length}`} accent={plan.accent} />
      </div>

      <div className="space-y-2.5">
        {plan.exercises.map((ex) => <ExerciseCard key={ex.id} exercise={ex} accent={plan.accent} />)}
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, accent }: { exercise: Exercise; accent: "orange" | "blue" | "violet" }) {
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const session = useStore((s) => s.gymSessions[todayKey()]);
  const logSet = useStore((s) => s.logSet);
  const removeLastSet = useStore((s) => s.removeLastSet);
  const pr = useStore((s) => s.prs[exercise.id]);

  const sets = session?.sets[exercise.id] || [];
  const todayMax = sets.length > 0 ? Math.max(...sets.map((s) => s.weight)) : 0;
  const isPR = pr && todayMax >= pr.weight && todayMax > 0;

  const submit = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);
    if (r > 0) {
      logSet(exercise.id, isNaN(w) ? 0 : w, r);
      setWeight("");
      setReps("");
    }
  };

  return (
    <Card className="overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full px-4 py-3.5 flex items-center gap-3 text-left hover:bg-bg-elevated/30 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm">{exercise.label}</span>
            <Tag accent="neutral" size="sm">{exercise.target}</Tag>
            {isPR && <Tag accent="amber" size="sm"><Trophy size={9} /> PR</Tag>}
          </div>
          {exercise.notes && <div className="text-2xs text-ink-mute mt-1">{exercise.notes}</div>}
        </div>
        <div className="text-right shrink-0">
          <div className={cn("font-mono text-xs tabular-nums", sets.length > 0 ? `text-accent-${accent}` : "text-ink-ghost")}>
            {sets.length} sets
          </div>
          {todayMax > 0 && <div className="text-2xs text-ink-mute font-mono">{todayMax}lb max</div>}
        </div>
        <ChevronDown size={14} className={cn("text-ink-mute transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line"
          >
            <div className="px-4 py-4 bg-bg-elevated/30">
              {sets.length > 0 && (
                <div className="mb-3 space-y-1">
                  {sets.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-mono tabular-nums">
                      <span className="text-ink-ghost w-6">#{i + 1}</span>
                      <span className={`text-accent-${accent} w-16`}>{s.weight > 0 ? `${s.weight} lb` : "BW"}</span>
                      <span className="text-ink-dim flex-1">{s.reps} reps</span>
                      {i === sets.length - 1 && (
                        <button onClick={() => removeLastSet(exercise.id)} className="text-ink-ghost hover:text-accent-red p-1">
                          <Trash2 size={11} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {pr && (
                <div className="mb-3 text-2xs text-ink-mute font-mono flex items-center gap-1.5">
                  <Trophy size={10} className="text-accent-amber" /> PR: {pr.weight}lb × {pr.reps} on {pr.date}
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="lbs"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-center"
                />
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="text-center"
                />
                <Button variant="primary" onClick={submit} className="px-4 shrink-0">
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function cap(s: string) { return s[0].toUpperCase() + s.slice(1); }
