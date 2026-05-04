"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Eyebrow, ProgressBar, Stat, PageHeader, Button, Input, Field, Tag } from "@/components/ui";
import { useStore } from "@/lib/store";
import { todayKey } from "@/lib/utils/date";
import { totalRoutineItems } from "@/lib/data/routine";
import { Flame, TrendingUp, Trophy } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function StatsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <StatsInner />;
}

function StatsInner() {
  const routineDaily = useStore((s) => s.routineDaily);
  const gymSessions = useStore((s) => s.gymSessions);
  const prs = useStore((s) => s.prs);
  const bodyweight = useStore((s) => s.bodyweight);
  const bodyweightLog = useStore((s) => s.bodyweightLog);
  const streak = useStore((s) => s.getStreak());
  const logBodyweight = useStore((s) => s.logBodyweight);
  const timerSessions = useStore((s) => s.timer.sessionsByDate);
  const totalItems = totalRoutineItems();

  const [bwInput, setBwInput] = useState(String(bodyweight));

  // Last 14 days routine completion
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const key = todayKey(d);
    const done = (routineDaily[key] || []).length;
    const pct = Math.round((done / totalItems) * 100);
    return { key, pct, done, label: d.toLocaleDateString("en-US", { weekday: "short" })[0] };
  });

  // Workout sessions count last 30 days
  const last30Workouts = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return !!gymSessions[todayKey(d)];
  }).filter(Boolean).length;

  // PR list sorted by recency
  const prList = Object.entries(prs)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8);

  // Body weight history last 30 days
  const bwHistory = Object.entries(bodyweightLog)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-30);

  const totalFocusToday = timerSessions[todayKey()] || 0;
  const totalFocusAllTime = Object.values(timerSessions).reduce((s, v) => s + v, 0);

  return (
    <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-3xl pb-10">
      <PageHeader eyebrow="Metrics" title="Stats" subtitle="What's actually happening." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="Streak" value={`${streak}d`} accent="amber" hint="Routine ≥20" />
        <Stat label="Workouts (30d)" value={last30Workouts} accent="orange" />
        <Stat label="PRs set" value={Object.keys(prs).length} accent="lime" />
        <Stat label="Focus blocks" value={totalFocusAllTime} hint={`${totalFocusToday} today`} accent="violet" />
      </div>

      {/* Routine 14 day chart */}
      <Card className="p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Eyebrow accent="lime">Last 14 days · Routine</Eyebrow>
            <div className="text-xs text-ink-mute mt-1">Daily completion %</div>
          </div>
          <Flame size={16} className="text-accent-amber" />
        </div>
        <div className="flex items-end gap-1.5 h-32">
          {last14.map((d, i) => (
            <motion.div
              key={d.key}
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(d.pct, 4)}%` }}
              transition={{ delay: i * 0.02 }}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div
                className={cn(
                  "w-full rounded-t-sm transition-all",
                  d.pct >= 80 ? "bg-accent-lime" :
                  d.pct >= 50 ? "bg-accent-amber" :
                  d.pct > 0 ? "bg-accent-red/60" : "bg-line"
                )}
                style={{ height: `${Math.max(d.pct, 4)}%` }}
              />
            </motion.div>
          ))}
        </div>
        <div className="flex gap-1.5 mt-2">
          {last14.map((d, i) => (
            <div key={i} className="flex-1 text-center text-2xs font-mono text-ink-ghost">{d.label}</div>
          ))}
        </div>
      </Card>

      {/* Body weight tracker */}
      <Card className="p-5 mb-4">
        <Eyebrow accent="orange">Body weight</Eyebrow>
        <div className="mt-3 flex items-end gap-3">
          <div className="text-3xl font-bold tracking-tightest">{bodyweight}<span className="text-base text-ink-mute font-normal ml-1">lb</span></div>
          <div className="text-2xs text-ink-mute font-mono pb-1">Protein target: {Math.round(bodyweight * 0.9)}g</div>
        </div>
        <div className="mt-4 flex gap-2">
          <Input type="number" inputMode="decimal" placeholder="Log today" value={bwInput} onChange={(e) => setBwInput(e.target.value)} />
          <Button variant="primary" onClick={() => {
            const v = parseFloat(bwInput);
            if (v > 0) logBodyweight(v);
          }}>Save</Button>
        </div>
        {bwHistory.length > 1 && (
          <div className="mt-4">
            <Eyebrow className="mb-2">Last {bwHistory.length} entries</Eyebrow>
            <div className="flex items-end gap-1 h-20">
              {bwHistory.map(([date, w], i) => {
                const min = Math.min(...bwHistory.map(([, v]) => v as number));
                const max = Math.max(...bwHistory.map(([, v]) => v as number));
                const range = max - min || 1;
                const h = ((w as number - min) / range) * 100;
                return (
                  <div key={date} className="flex-1 flex flex-col justify-end" title={`${w}lb on ${date}`}>
                    <div className="bg-accent-orange/60 rounded-t-sm" style={{ height: `${Math.max(h, 8)}%` }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* PRs */}
      {prList.length > 0 && (
        <Card className="p-5 mb-4">
          <Eyebrow accent="amber">Recent PRs</Eyebrow>
          <div className="mt-3 space-y-2">
            {prList.map((pr) => (
              <div key={pr.id} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                <div className="flex items-center gap-2">
                  <Trophy size={12} className="text-accent-amber" />
                  <span className="text-sm font-medium capitalize">{pr.id.replace(/-/g, " ")}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm tabular-nums text-accent-amber">{pr.weight}lb × {pr.reps}</div>
                  <div className="text-2xs text-ink-mute font-mono">{pr.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="text-2xs font-mono text-ink-ghost tracking-wider mt-8 text-center">
        ALL DATA · LOCAL · v1
      </div>
    </div>
  );
}
