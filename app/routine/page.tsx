"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, Section, ProgressBar, Checkbox, PageHeader, Row } from "@/components/ui";
import { useStore } from "@/lib/store";
import { ROUTINE_SECTIONS, WEEKLY_TASKS, Section as RoutineSection } from "@/lib/data/routine";
import { ChevronDown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { fullDate } from "@/lib/utils/date";

export default function RoutinePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader
        eyebrow={fullDate()}
        title="Daily routine"
        subtitle="Top to bottom. Sections collapse when complete. Reset anytime."
      />
      <Section eyebrow="Today">
        <div className="space-y-2">
          {ROUTINE_SECTIONS.map((section, idx) => (
            <SectionCard key={section.id} section={section} defaultOpen={idx === 0} />
          ))}
        </div>
      </Section>
      <Section eyebrow="Weekly">
        <Card className="px-5 py-2">
          {WEEKLY_TASKS.map((task, i) => (
            <WeeklyRow key={task.id} task={task} last={i === WEEKLY_TASKS.length - 1} />
          ))}
        </Card>
      </Section>
    </div>
  );
}

function SectionCard({ section, defaultOpen }: { section: RoutineSection; defaultOpen?: boolean }) {
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
    <Card className={cn("overflow-hidden transition-opacity", complete && "opacity-70")}>
      <Row
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated/30"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="font-medium text-sm text-ink">{section.label}</span>
            <Meta>{section.timeHint}</Meta>
          </div>
          <ProgressBar value={pct} accent={complete ? "lime" : "neutral"} />
        </div>
        <div className="font-mono text-xs text-ink-mute shrink-0 tabular-nums">{done}/{total}</div>
        <ChevronDown size={15} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </Row>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line"
          >
            <div className="px-5 py-2">
              {section.items.map((item, i) => {
                const checked = states[i];
                return (
                  <Row
                    key={i}
                    onClick={() => toggleRoutine(`${section.id}.${i}`)}
                    className="flex items-center gap-3 py-2.5 group"
                  >
                    <Checkbox checked={checked} onChange={() => toggleRoutine(`${section.id}.${i}`)} accent="lime" />
                    <span className={cn("text-sm transition-colors flex-1", checked ? "text-ink-mute line-through" : "text-ink-dim group-hover:text-ink")}>
                      {item}
                    </span>
                  </Row>
                );
              })}
              <div className="pt-3 pb-3">
                <button
                  onClick={() => resetSection(section.id)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded font-mono text-2xs tracking-[0.18em] uppercase text-ink-mute hover:text-ink hover:bg-bg-elevated/40 transition-colors"
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

function WeeklyRow({ task, last }: { task: { id: string; label: string }; last: boolean }) {
  const isDone = useStore((s) => s.isWeeklyDone);
  const toggle = useStore((s) => s.toggleWeekly);
  const checked = isDone(task.id);
  return (
    <Row
      onClick={() => toggle(task.id)}
      className={cn("flex items-center gap-3 py-3 group", !last && "border-b border-line")}
    >
      <Checkbox checked={checked} onChange={() => toggle(task.id)} accent="amber" />
      <span className={cn("text-sm transition-colors flex-1", checked ? "text-ink-mute line-through" : "text-ink-dim group-hover:text-ink")}>
        {task.label}
      </span>
    </Row>
  );
}
