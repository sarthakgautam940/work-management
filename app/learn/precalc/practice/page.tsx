"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  LearnPage, LearnHeader, LearnCard, LearnPill, LearnButton,
} from "@/components/learn/primitives";
import { MathText } from "@/components/learn/math";
import { PRACTICE, PRACTICE_SOURCES, type Problem, type ProblemSource, type UnitId } from "@/lib/learn/practice";
import { useStore } from "@/lib/store";
import { ArrowRight, Filter, Check, X, Calculator } from "lucide-react";

type Filters = {
  source: ProblemSource | "all";
  unit: UnitId | "all";
  type: "mcq" | "frq" | "all";
};

export default function PracticePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const [filters, setFilters] = useState<Filters>({ source: "all", unit: "all", type: "all" });
  const flagged = useStore((s) => s.learnFlagged);

  const filtered = useMemo(() => {
    return PRACTICE.filter((p) => {
      if (filters.source !== "all" && p.source !== filters.source) return false;
      if (filters.unit !== "all" && p.unitId !== filters.unit) return false;
      if (filters.type !== "all" && p.type !== filters.type) return false;
      return true;
    });
  }, [filters]);

  const counts = useMemo(() => {
    return {
      mcq: PRACTICE.filter((p) => p.type === "mcq").length,
      frq: PRACTICE.filter((p) => p.type === "frq").length,
      flagged: PRACTICE.filter((p) => flagged[`practice:${p.id}`]).length,
    };
  }, [flagged]);

  return (
    <LearnPage>
      <LearnHeader
        kicker="Practice"
        title="68 worked exam problems"
        subtitle="Math Medic + College Board Preview. Filter by source, unit, or type. Try first, then reveal the worked solution."
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
      />

      <div className="grid grid-cols-3 gap-3 mb-7">
        <div className="rounded-xl bg-bg-surface border border-line p-4">
          <div className="text-xs text-ink-mute font-medium">MCQs</div>
          <div className="text-2xl font-semibold tabular-nums mt-1">{counts.mcq}</div>
        </div>
        <div className="rounded-xl bg-bg-surface border border-line p-4">
          <div className="text-xs text-ink-mute font-medium">FRQs</div>
          <div className="text-2xl font-semibold tabular-nums mt-1">{counts.frq}</div>
        </div>
        <div className="rounded-xl bg-bg-surface border border-line p-4">
          <div className="text-xs text-ink-mute font-medium">Flagged</div>
          <div className="text-2xl font-semibold tabular-nums mt-1 text-accent-amber">{counts.flagged}</div>
        </div>
      </div>

      {/* Filter bar */}
      <LearnCard className="mb-7 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-ink-mute" />
          <span className="text-xs font-medium uppercase tracking-wide text-ink-mute">Filter</span>
        </div>
        <div className="space-y-3">
          <FilterRow label="Source">
            <FilterChip active={filters.source === "all"} onClick={() => setFilters((f) => ({ ...f, source: "all" }))}>All</FilterChip>
            {PRACTICE_SOURCES.map((s) => (
              <FilterChip key={s.id} active={filters.source === s.id} onClick={() => setFilters((f) => ({ ...f, source: s.id }))}>{s.label}</FilterChip>
            ))}
          </FilterRow>
          <FilterRow label="Unit">
            <FilterChip active={filters.unit === "all"} onClick={() => setFilters((f) => ({ ...f, unit: "all" }))}>All</FilterChip>
            <FilterChip active={filters.unit === "u1"} onClick={() => setFilters((f) => ({ ...f, unit: "u1" }))}>Unit 1</FilterChip>
            <FilterChip active={filters.unit === "u2"} onClick={() => setFilters((f) => ({ ...f, unit: "u2" }))}>Unit 2</FilterChip>
            <FilterChip active={filters.unit === "u3"} onClick={() => setFilters((f) => ({ ...f, unit: "u3" }))}>Unit 3</FilterChip>
          </FilterRow>
          <FilterRow label="Type">
            <FilterChip active={filters.type === "all"} onClick={() => setFilters((f) => ({ ...f, type: "all" }))}>All</FilterChip>
            <FilterChip active={filters.type === "mcq"} onClick={() => setFilters((f) => ({ ...f, type: "mcq" }))}>MCQ</FilterChip>
            <FilterChip active={filters.type === "frq"} onClick={() => setFilters((f) => ({ ...f, type: "frq" }))}>FRQ</FilterChip>
          </FilterRow>
        </div>
      </LearnCard>

      <div className="text-sm text-ink-mute mb-4">
        {filtered.length} of {PRACTICE.length} problems
      </div>

      <div className="space-y-2">
        {filtered.map((p) => (
          <ProblemRow key={p.id} problem={p} flagged={!!flagged[`practice:${p.id}`]} />
        ))}
      </div>
    </LearnPage>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 flex-wrap">
      <span className="text-xs text-ink-mute font-medium w-14 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
        active
          ? "bg-accent-blue/10 border-accent-blue/30 text-accent-blue"
          : "bg-bg-elevated border-line text-ink-dim hover:border-line-strong hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function ProblemRow({ problem, flagged }: { problem: Problem; flagged: boolean }) {
  return (
    <Link href={`/learn/precalc/practice/${problem.id}`} className="block group">
      <LearnCard className="p-4 hover:border-line-strong transition-colors">
        <div className="flex items-start gap-4">
          <div className="font-mono text-xs text-ink-mute shrink-0 mt-0.5 w-20">
            {problem.source}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-medium text-sm text-ink">{problem.number}</span>
              <LearnPill tone="neutral">Unit {problem.unitId.slice(1)}</LearnPill>
              <LearnPill tone={problem.type === "mcq" ? "accent" : "warning"}>
                {problem.type.toUpperCase()}
              </LearnPill>
              {problem.calc && <LearnPill tone="neutral"><Calculator size={10} /> calc</LearnPill>}
              {flagged && <LearnPill tone="warning">flagged</LearnPill>}
            </div>
            <div className="text-sm text-ink-dim leading-relaxed line-clamp-2">
              <MathText>{problem.prompt}</MathText>
            </div>
          </div>
          <ArrowRight size={14} className="text-ink-mute group-hover:text-ink shrink-0 mt-1 transition-colors" />
        </div>
      </LearnCard>
    </Link>
  );
}
