"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Eyebrow, Meta, Section, ProgressBar, PageHeader, Stat, Button, Input } from "@/components/ui";
import { useStore } from "@/lib/store";
import { todayKey } from "@/lib/utils/date";
import { Play, Pause, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function TimerPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <TimerInner />;
}

function TimerInner() {
  const timer = useStore((s) => s.timer);
  const setDuration = useStore((s) => s.setTimerDuration);
  const start = useStore((s) => s.startTimer);
  const pause = useStore((s) => s.pauseTimer);
  const reset = useStore((s) => s.resetTimer);
  const tick = useStore((s) => s.tickTimer);
  const [custom, setCustom] = useState("");
  const [, force] = useState(0);

  useEffect(() => {
    if (!timer.endAt) return;
    const id = setInterval(() => { tick(); force((n) => n + 1); }, 1000);
    return () => clearInterval(id);
  }, [timer.endAt, tick]);

  const remaining = timer.remaining;
  const running = !!timer.endAt;
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  const sessionsToday = timer.sessionsByDate[todayKey()] || 0;
  const progress = timer.duration > 0 ? Math.round(((timer.duration - remaining) / timer.duration) * 100) : 0;
  const finished = !running && remaining === 0;

  const setMinutes = (m: number) => setDuration(m * 60);
  const setCustomMinutes = () => {
    const v = parseInt(custom);
    if (v > 0 && v <= 240) setDuration(v * 60);
    setCustom("");
  };

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-2xl pb-16">
      <PageHeader eyebrow="Focus" title="Timer" subtitle="Persistent across pages. Use it." />

      <div className="grid grid-cols-3 gap-3 mb-9">
        <Stat label="Sessions today" value={sessionsToday} accent={sessionsToday > 0 ? "amber" : "neutral"} />
        <Stat label="Duration" value={`${Math.round(timer.duration / 60)}m`} />
        <Stat label="Status" value={running ? "Live" : finished ? "Done" : "Idle"} accent={running ? "lime" : finished ? "lime" : "neutral"} />
      </div>

      <Card className="p-10 lg:p-14 mb-7 grain text-center relative overflow-hidden">
        <motion.div
          key={`${timer.duration}-${running}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-7xl lg:text-9xl font-bold tracking-tightest tabular-nums"
        >
          {minutes}:{seconds}
        </motion.div>
        <div className="text-sm text-ink-mute mt-5">
          {finished ? "Session complete. Take a breath." : running ? "Stay with it." : "Ready when you are."}
        </div>
        <div className="mt-6">
          <ProgressBar value={progress} accent={finished ? "lime" : running ? "amber" : "neutral"} />
        </div>
      </Card>

      <div className="flex flex-wrap gap-2 mb-9 justify-center">
        {!running && remaining > 0 && (
          <Button variant="primary" size="lg" onClick={start} className="px-8">
            <span className="flex items-center gap-2"><Play size={16} /> {remaining === timer.duration ? "Start" : "Resume"}</span>
          </Button>
        )}
        {running && (
          <Button variant="secondary" size="lg" onClick={pause} className="px-8">
            <span className="flex items-center gap-2"><Pause size={16} /> Pause</span>
          </Button>
        )}
        {(running || remaining !== timer.duration) && (
          <Button variant="ghost" size="lg" onClick={reset}>
            <span className="flex items-center gap-2"><RotateCcw size={16} /> Reset</span>
          </Button>
        )}
        {finished && (
          <Button variant="primary" size="lg" onClick={reset}>
            <span className="flex items-center gap-2"><Check size={16} /> Next block</span>
          </Button>
        )}
      </div>

      <Section eyebrow="Presets">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[25, 50, 90].map((m) => (
            <button
              key={m}
              onClick={() => setMinutes(m)}
              className={cn(
                "p-5 rounded-xl border text-center transition-colors",
                timer.duration === m * 60
                  ? "bg-bg-elevated border-line-strong text-ink"
                  : "bg-bg-surface border-line text-ink-dim hover:border-line-strong hover:text-ink"
              )}
            >
              <div className="text-2xl font-bold tracking-tightest">{m}</div>
              <div className="font-mono text-2xs tracking-[0.18em] uppercase mt-1">min</div>
            </button>
          ))}
        </div>
        <Card className="p-5">
          <Eyebrow className="mb-2.5">Custom</Eyebrow>
          <div className="flex gap-2">
            <Input type="number" inputMode="numeric" placeholder="Minutes (1–240)" value={custom} onChange={(e) => setCustom(e.target.value)} />
            <Button variant="secondary" onClick={setCustomMinutes}>Set</Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
