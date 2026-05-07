"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, Section, Tag, Checkbox, Stat, PageHeader, Row } from "@/components/ui";
import { useStore } from "@/lib/store";
import { AP_MACRO_PLAN, AP_PRECALC_PLAN, APBlock } from "@/lib/data/school";
import { daysUntil, urgencyLabel, todayKey, parseKey } from "@/lib/utils/date";
import { ChevronDown, GraduationCap, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

type View = "macro" | "precalc";

export default function APPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <APInner />;
}

function APInner() {
  const [view, setView] = useState<View>("macro");
  const macroDays = daysUntil("2026-05-08");
  const precalcDays = daysUntil("2026-05-12");

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader
        eyebrow="AP crash plans"
        title="No room left to coast"
        subtitle="Compressed schedules. Macro May 8, Precalc May 12. Today's block is non-negotiable."
      />

      {/* Crash Course CTA — the new comprehensive study path */}
      <Link href="/ap/crash" className="block mb-7 group">
        <div className="rounded-2xl border border-accent-amber/30 bg-accent-amber/[0.04] hover:border-accent-amber/50 transition-colors px-5 py-4 lg:py-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent-amber/[0.08] border border-accent-amber/30 flex items-center justify-center shrink-0">
            <GraduationCap size={20} className="text-accent-amber" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base lg:text-lg font-bold tracking-tightest text-ink">AP Macro crash course</span>
              <Tag tone="amber" size="sm">{macroDays}d to exam</Tag>
            </div>
            <div className="text-xs lg:text-sm text-ink-mute mt-0.5">
              11 modules, ~5h. Single-source mastery path. Step-by-step lessons, drills, MCQs, FRQ walkthroughs.
            </div>
          </div>
          <ArrowUpRight size={18} className="text-accent-amber/70 group-hover:text-accent-amber shrink-0 transition-colors" />
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-3 mb-9">
        <button
          onClick={() => setView("macro")}
          className={cn(
            "p-5 rounded-xl border text-left transition-colors",
            view === "macro" ? "bg-accent-red/[0.06] border-accent-red/40" : "bg-bg-surface border-line hover:border-line-strong"
          )}
        >
          <Eyebrow accent={view === "macro" ? "red" : "neutral"}>AP Macro</Eyebrow>
          <div className={cn("mt-2 text-3xl font-bold tracking-tightest tabular-nums", view === "macro" ? "text-accent-red" : "text-ink")}>
            {macroDays}d
          </div>
          <div className="text-xs text-ink-mute mt-1">May 8 · Friday</div>
        </button>
        <button
          onClick={() => setView("precalc")}
          className={cn(
            "p-5 rounded-xl border text-left transition-colors",
            view === "precalc" ? "bg-accent-amber/[0.06] border-accent-amber/40" : "bg-bg-surface border-line hover:border-line-strong"
          )}
        >
          <Eyebrow accent={view === "precalc" ? "amber" : "neutral"}>AP Precalc</Eyebrow>
          <div className={cn("mt-2 text-3xl font-bold tracking-tightest tabular-nums", view === "precalc" ? "text-accent-amber" : "text-ink")}>
            {precalcDays}d
          </div>
          <div className="text-xs text-ink-mute mt-1">May 12 · Tuesday</div>
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
  const todayBlock = today(plan);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mb-7">
        <Stat label="Days done" value={`${done}/${plan.length}`} accent={done === plan.length ? "lime" : "neutral"} />
        <Stat label="Total hours" value={`${totalHours}h`} />
        <Stat label="Today" value={todayBlock ? "Yes" : "—"} hint={todayBlock ? `${todayBlock?.hours}h block` : "no block"} accent={todayBlock ? "amber" : "neutral"} />
      </div>

      <Section eyebrow="Daily blocks">
        <div className="space-y-2">
          {plan.map((block, i) => <BlockCard key={i} block={block} view={view} />)}
        </div>
      </Section>
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
  const accent = view === "macro" ? "red" : "amber";

  return (
    <Card className={cn(
      "overflow-hidden transition-opacity",
      isToday && !done && `border-accent-${accent}/50`,
      done && "opacity-60",
      isPast && !done && !isToday && "opacity-50"
    )}>
      <Row onClick={() => setOpen((o) => !o)} className="flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated/30">
        <Checkbox checked={done} onChange={() => toggle(block.date)} accent={accent} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
            <span className="font-medium text-sm text-ink">{block.label}</span>
            {isToday && <Tag tone={accent} size="sm">Today</Tag>}
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-mute">
            <span>{block.topics.length} topics</span>
            <span className="text-ink-ghost">·</span>
            <span>{block.hours}h block</span>
          </div>
        </div>
        <ChevronDown size={15} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </Row>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line">
            <div className="px-5 py-4">
              <ul className="space-y-2">
                {block.topics.map((t, i) => (
                  <li key={i} className="text-sm text-ink-dim flex gap-2.5">
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
