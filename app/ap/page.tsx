"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, ProgressBar, Checkbox, Tag, PageHeader, Stat } from "@/components/ui";
import { useStore } from "@/lib/store";
import { AP_MACRO_PLAN, AP_PRECALC_PLAN, APBlock } from "@/lib/data/school";
import { daysUntil, urgencyLabel, todayKey, parseKey } from "@/lib/utils/date";
import { ChevronDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type View = "macro" | "precalc";

export default function APPage() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("macro");
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const macroDays = daysUntil("2026-05-08");
  const precalcDays = daysUntil("2026-05-12");

  return (
    <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-3xl pb-10">
      <PageHeader
        eyebrow="AP Crash Plans"
        title="No room left to coast"
        subtitle="Compressed schedules. Macro in 4 days, Precalc in 8. Today's block is non-negotiable."
        accent="red"
      />

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={() => setView("macro")} className={cn(
          "p-4 rounded-xl border text-left transition-all",
          view === "macro" ? "bg-accent-red/10 border-accent-red/40" : "bg-bg-surface border-line hover:border-line-strong"
        )}>
          <Eyebrow accent={view === "macro" ? "red" : "neutral"}>AP Macro</Eyebrow>
          <div className={cn("text-2xl font-bold tracking-tightest mt-1", view === "macro" ? "text-accent-red" : "text-ink")}>
            {macroDays}d
          </div>
          <div className="text-2xs text-ink-mute mt-1">May 8 · Friday</div>
        </button>
        <button onClick={() => setView("precalc")} className={cn(
          "p-4 rounded-xl border text-left transition-all",
          view === "precalc" ? "bg-accent-amber/10 border-accent-amber/40" : "bg-bg-surface border-line hover:border-line-strong"
        )}>
          <Eyebrow accent={view === "precalc" ? "amber" : "neutral"}>AP Precalc</Eyebrow>
          <div className={cn("text-2xl font-bold tracking-tightest mt-1", view === "precalc" ? "text-accent-amber" : "text-ink")}>
            {precalcDays}d
          </div>
          <div className="text-2xs text-ink-mute mt-1">May 12 · Tuesday</div>
        </button>
      </div>

      <PlanView view={view} />
    </div>
  );
}

function PlanView({ view }: { view: View }) {
  const plan = view === "macro" ? AP_MACRO_PLAN : AP_PRECALC_PLAN;
  const apMacroDays = useStore((s) => s.apMacroDays);
  const apPrecalcDays = useStore((s) => s.apPrecalcDays);
  const completions = view === "macro" ? apMacroDays : apPrecalcDays;
  const done = plan.filter((b) => completions[b.date]).length;
  const totalHours = plan.reduce((s, b) => s + b.hours, 0);
  const accent = view === "macro" ? "red" : "amber";

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat label="Days done" value={`${done}/${plan.length}`} accent={accent} />
        <Stat label="Total hours" value={`${totalHours}h`} accent={accent} />
        <Stat label="Today" value={today(plan) ? "Yes" : "—"} hint={today(plan) ? `${today(plan)?.hours}h block` : "no block"} accent={accent} />
      </div>

      <div className="space-y-2.5">
        {plan.map((block, i) => <BlockCard key={i} block={block} view={view} />)}
      </div>
    </>
  );
}

function today(plan: APBlock[]) {
  const tk = todayKey();
  return plan.find((b) => b.date === tk);
}

function BlockCard({ block, view }: { block: APBlock; view: View }) {
  const tk = todayKey();
  const isToday = block.date === tk;
  const isPast = parseKey(block.date) < new Date(new Date().setHours(0, 0, 0, 0));
  const [open, setOpen] = useState(isToday);
  const apMacroDays = useStore((s) => s.apMacroDays);
  const apPrecalcDays = useStore((s) => s.apPrecalcDays);
  const toggleMacro = useStore((s) => s.toggleAPMacro);
  const togglePrecalc = useStore((s) => s.toggleAPPrecalc);
  const done = view === "macro" ? !!apMacroDays[block.date] : !!apPrecalcDays[block.date];
  const toggle = view === "macro" ? toggleMacro : togglePrecalc;
  const u = urgencyLabel(block.date);
  const accent = view === "macro" ? "red" : "amber";

  return (
    <Card className={cn(
      "overflow-hidden transition-all",
      isToday && !done && `border-accent-${accent}/50 ring-1 ring-accent-${accent}/30`,
      done && "opacity-60",
      isPast && !done && !isToday && "opacity-50"
    )}>
      <button onClick={() => setOpen((o) => !o)} className="w-full px-4 py-3.5 flex items-center gap-4 text-left hover:bg-bg-elevated/30 transition-colors">
        <Checkbox checked={done} onChange={() => toggle(block.date)} accent={accent as any} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-medium text-sm">{block.label}</span>
            {isToday && <Tag accent={accent as any} size="sm"><span className="live-dot">Today</span></Tag>}
            <Tag accent="neutral" size="sm">{block.hours}h</Tag>
          </div>
          <div className="text-2xs text-ink-mute">{block.topics.length} topics</div>
        </div>
        <ChevronDown size={14} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line">
            <div className="px-4 py-3">
              <ul className="space-y-2">
                {block.topics.map((t, i) => (
                  <li key={i} className="text-sm text-ink-dim flex gap-2">
                    <span className="text-ink-ghost shrink-0">·</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
