"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Eyebrow, Meta, Section, Stat, PageHeader, Button, Input } from "@/components/ui";
import { useStore } from "@/lib/store";
import { todayKey } from "@/lib/utils/date";
import { totalRoutineItems } from "@/lib/data/routine";
import { Trophy } from "lucide-react";
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

  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const key = todayKey(d);
    const done = (routineDaily[key] || []).length;
    const pct = Math.round((done / totalItems) * 100);
    return { key, pct, done, label: d.toLocaleDateString("en-US", { weekday: "short" })[0] };
  });

  const last30Workouts = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return !!gymSessions[todayKey(d)];
  }).filter(Boolean).length;

  const prList = Object.entries(prs)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8);

  const bwHistory = Object.entries(bodyweightLog)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-30) as [string, number][];

  const totalFocusToday = timerSessions[todayKey()] || 0;
  const totalFocusAllTime = Object.values(timerSessions).reduce((s, v) => s + v, 0);

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader eyebrow="Metrics" title="Stats" subtitle="What's actually happening." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-9">
        <Stat label="Streak" value={`${streak}d`} hint="Routine ≥ 20" accent={streak > 0 ? "amber" : "neutral"} />
        <Stat label="Workouts (30d)" value={last30Workouts} />
        <Stat label="PRs set" value={Object.keys(prs).length} accent={Object.keys(prs).length > 0 ? "lime" : "neutral"} />
        <Stat label="Focus blocks" value={totalFocusAllTime} hint={`${totalFocusToday} today`} />
      </div>

      <Section eyebrow="Last 14 days · routine">
        <Card className="p-5">
          <div className="flex items-end gap-1.5 h-32">
            {last14.map((d, i) => (
              <motion.div
                key={d.key}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(d.pct, 4)}%` }}
                transition={{ delay: i * 0.02 }}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className={cn(
                    "w-full rounded-t-sm",
                    d.pct >= 80 ? "bg-accent-lime" :
                    d.pct >= 50 ? "bg-accent-amber" :
                    d.pct > 0 ? "bg-accent-red/70" : "bg-line-strong"
                  )}
                  style={{ height: `${Math.max(d.pct, 4)}%` }}
                />
              </motion.div>
            ))}
          </div>
          <div className="flex gap-1.5 mt-2.5">
            {last14.map((d, i) => (
              <div key={i} className="flex-1 text-center text-2xs font-mono text-ink-ghost">{d.label}</div>
            ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="Body weight">
        <Card className="p-5">
          <div className="flex items-end gap-3 mb-4">
            <div className="text-3xl font-bold tracking-tightest">
              {bodyweight}<span className="text-base text-ink-mute font-normal ml-1">lb</span>
            </div>
            <div className="text-xs text-ink-mute font-mono pb-1">protein target {Math.round(bodyweight * 0.9)}g</div>
          </div>
          <div className="flex gap-2 mb-4">
            <Input type="number" inputMode="decimal" placeholder="Log today" value={bwInput} onChange={(e) => setBwInput(e.target.value)} />
            <Button variant="primary" onClick={() => {
              const v = parseFloat(bwInput);
              if (v > 0) logBodyweight(v);
            }}>Save</Button>
          </div>
          {bwHistory.length > 1 && (
            <>
              <Meta>Last {bwHistory.length} entries</Meta>
              <div className="mt-2 flex items-end gap-1 h-20">
                {bwHistory.map(([date, w], i) => {
                  const min = Math.min(...bwHistory.map(([, v]) => v));
                  const max = Math.max(...bwHistory.map(([, v]) => v));
                  const range = max - min || 1;
                  const h = ((w - min) / range) * 100;
                  return (
                    <div key={date} className="flex-1 flex flex-col justify-end" title={`${w} lb on ${date}`}>
                      <div className="bg-ink-mute/50 rounded-t-sm" style={{ height: `${Math.max(h, 8)}%` }} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Card>
      </Section>

      {prList.length > 0 && (
        <Section eyebrow="Recent PRs">
          <Card className="px-5 py-2">
            {prList.map((pr, i) => (
              <div key={pr.id} className={cn("flex items-center justify-between py-3", i < prList.length - 1 && "border-b border-line")}>
                <div className="flex items-center gap-2.5">
                  <Trophy size={12} className="text-accent-amber" />
                  <span className="text-sm font-medium capitalize">{pr.id.replace(/-/g, " ")}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm tabular-nums text-ink">{pr.weight} lb × {pr.reps}</div>
                  <div className="text-2xs text-ink-mute font-mono">{pr.date}</div>
                </div>
              </div>
            ))}
          </Card>
        </Section>
      )}

      <div className="mt-12 text-center">
        <Meta>All data · local · v1</Meta>
      </div>
    </div>
  );
}
