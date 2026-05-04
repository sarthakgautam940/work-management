"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, ProgressBar, Checkbox, Tag, PageHeader } from "@/components/ui";
import { useStore } from "@/lib/store";
import { ROUTINE_SECTIONS, WEEKLY_TASKS, Section } from "@/lib/data/routine";
import { ChevronDown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { fullDate } from "@/lib/utils/date";

export default function RoutinePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-3xl pb-10">
      <PageHeader
        eyebrow={fullDate()}
        title="Daily Routine"
        subtitle="Top to bottom. Sections collapse when complete. Reset anytime."
      />
      <div className="space-y-3">
        {ROUTINE_SECTIONS.map((section, idx) => (
          <SectionCard key={section.id} section={section} defaultOpen={idx === 0} />
        ))}
      </div>
      <div className="mt-10">
        <Eyebrow className="mb-4">Weekly Tasks</Eyebrow>
        <Card className="p-4 lg:p-5">
          {WEEKLY_TASKS.map((task) => <WeeklyRow key={task.id} task={task} />)}
        </Card>
      </div>
    </div>
  );
}

function SectionCard({ section, defaultOpen }: { section: Section; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const isRoutineDone = useStore((s) => s.isRoutineDone);
  const toggleRoutine = useStore((s) => s.toggleRoutine);
  const resetSection = useStore((s) => s.resetRoutineSection);

  const states = section.items.map((_, i) => isRoutineDone(`${section.id}.${i}`));
  const done = states.filter(Boolean).length;
  const total = section.items.length;
  const pct = (done / total) * 100;
  const complete = done === total;

  return (
    <Card className={cn("overflow-hidden transition-all", complete && "opacity-70")}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 lg:px-5 py-4 flex items-center gap-4 text-left hover:bg-bg-elevated/40 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm">{section.label}</span>
            <Tag accent={section.accent} size="sm">{section.timeHint}</Tag>
          </div>
          <ProgressBar value={pct} accent={complete ? "lime" : section.accent} />
        </div>
        <div className="font-mono text-xs text-ink-mute shrink-0 tabular-nums">{done}/{total}</div>
        <ChevronDown size={16} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 lg:px-5 pb-4 border-t border-line">
              <div className="pt-3 space-y-1">
                {section.items.map((item, i) => {
                  const checked = states[i];
                  return (
                    <button
                      key={i}
                      onClick={() => toggleRoutine(`${section.id}.${i}`)}
                      className="w-full flex items-center gap-3 py-2.5 text-left group"
                    >
                      <Checkbox checked={checked} onChange={() => toggleRoutine(`${section.id}.${i}`)} accent={section.accent} />
                      <span className={cn("text-sm transition-all flex-1", checked ? "text-ink-mute line-through" : "text-ink-dim group-hover:text-ink")}>
                        {item}
                      </span>
                    </button>
                  );
                })}
                <button
                  onClick={() => resetSection(section.id)}
                  className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-2xs font-mono tracking-wider uppercase text-ink-mute hover:text-ink transition-colors"
                >
                  <RotateCcw size={11} /> Reset
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function WeeklyRow({ task }: { task: { id: string; label: string } }) {
  const isDone = useStore((s) => s.isWeeklyDone);
  const toggle = useStore((s) => s.toggleWeekly);
  const checked = isDone(task.id);
  return (
    <button onClick={() => toggle(task.id)} className="w-full flex items-center gap-3 py-2.5 text-left group">
      <Checkbox checked={checked} onChange={() => toggle(task.id)} accent="amber" />
      <span className={cn("text-sm transition-all flex-1", checked ? "text-ink-mute line-through" : "text-ink-dim group-hover:text-ink")}>
        {task.label}
      </span>
    </button>
  );
}
