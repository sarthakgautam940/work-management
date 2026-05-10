"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, Section, Tag, Checkbox, Stat, PageHeader, Row } from "@/components/ui";
import { useStore } from "@/lib/store";
import { AP_PRECALC_PLAN, APBlock } from "@/lib/data/school";
import { daysUntil, todayKey, parseKey } from "@/lib/utils/date";
import { ChevronDown, GraduationCap, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

export default function APPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <APInner />;
}

function APInner() {
  const precalcDays = daysUntil("2026-05-12");

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader
        eyebrow="AP crash plan"
        title="No room left to coast"
        subtitle="AP Precalculus, May 12. Today's block is non-negotiable."
      />

      <Link href="/ap/crash/precalc" className="block group mb-7">
        <div className="rounded-2xl border border-accent-amber/30 bg-accent-amber/[0.04] hover:border-accent-amber/50 transition-colors px-5 py-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-accent-amber/[0.08] border border-accent-amber/30 flex items-center justify-center shrink-0">
            <GraduationCap size={18} className="text-accent-amber" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm lg:text-base font-bold tracking-tightest text-ink">AP Precalc course</span>
              <Tag tone="amber" size="sm">{precalcDays}d</Tag>
            </div>
            <div className="text-xs text-ink-mute mt-0.5">Open the lessons →</div>
          </div>
          <ArrowUpRight size={16} className="text-accent-amber/70 group-hover:text-accent-amber shrink-0 transition-colors" />
        </div>
      </Link>

      <PlanView />
    </div>
  );
}

function PlanView() {
  const plan = AP_PRECALC_PLAN;
  const apPrecalcDays = useStore((s) => s.apPrecalcDays);
  const done = plan.filter((b) => apPrecalcDays[b.date]).length;
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
          {plan.map((block, i) => <BlockCard key={i} block={block} />)}
        </div>
      </Section>
    </>
  );
}

function today(plan: APBlock[]) {
  const tk = todayKey();
  return plan.find((b) => b.date === tk);
}

function BlockCard({ block }: { block: APBlock }) {
  const tk = todayKey();
  const isToday = block.date === tk;
  const isPast = parseKey(block.date) < new Date(new Date().setHours(0, 0, 0, 0));
  const [open, setOpen] = useState(isToday);
  const apPrecalcDays = useStore((s) => s.apPrecalcDays);
  const togglePrecalc = useStore((s) => s.toggleAPPrecalc);
  const done = !!apPrecalcDays[block.date];

  return (
    <Card className={cn(
      "overflow-hidden transition-opacity",
      isToday && !done && "border-accent-amber/50",
      done && "opacity-60",
      isPast && !done && !isToday && "opacity-50"
    )}>
      <Row onClick={() => setOpen((o) => !o)} className="flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated/30">
        <Checkbox checked={done} onChange={() => togglePrecalc(block.date)} accent="amber" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
            <span className="font-medium text-sm text-ink">{block.label}</span>
            {isToday && <Tag tone="amber" size="sm">Today</Tag>}
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
