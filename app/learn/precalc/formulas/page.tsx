"use client";

import { useEffect, useState, useMemo } from "react";
import { LearnPage, LearnHeader, LearnCard, LearnPill, LearnButton } from "@/components/learn/primitives";
import { Math, MathText } from "@/components/learn/math";
import { FORMULAS, type FormulaCard } from "@/lib/learn/formulas";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { Filter, Eye, EyeOff } from "lucide-react";

export default function FormulasPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const [unitFilter, setUnitFilter] = useState<"all" | "u1" | "u2" | "u3" | "general">("all");
  const [revealAll, setRevealAll] = useState(false);
  const srs = useStore((s) => s.learnSrs);

  const filtered = useMemo(() => {
    return FORMULAS.filter((f) => unitFilter === "all" || f.unit === unitFilter);
  }, [unitFilter]);

  // Group by topic.
  const grouped = useMemo(() => {
    const map = new Map<string, FormulaCard[]>();
    filtered.forEach((f) => {
      const arr = map.get(f.topic) ?? [];
      arr.push(f);
      map.set(f.topic, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <LearnPage>
      <LearnHeader
        kicker="Formulas"
        title={`The ${FORMULAS.length}-item reference`}
        subtitle="Every formula and identity from the source. Browse, drill as flashcards, or click into spaced review."
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
        right={
          <Link href="/learn/precalc/review">
            <LearnButton size="sm">Review due cards</LearnButton>
          </Link>
        }
      />

      <LearnCard className="mb-6 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-ink-mute" />
          <span className="text-xs font-medium uppercase tracking-wide text-ink-mute">Filter</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterChip active={unitFilter === "all"} onClick={() => setUnitFilter("all")}>All ({FORMULAS.length})</FilterChip>
          <FilterChip active={unitFilter === "u1"} onClick={() => setUnitFilter("u1")}>Unit 1</FilterChip>
          <FilterChip active={unitFilter === "u2"} onClick={() => setUnitFilter("u2")}>Unit 2</FilterChip>
          <FilterChip active={unitFilter === "u3"} onClick={() => setUnitFilter("u3")}>Unit 3</FilterChip>
          <FilterChip active={unitFilter === "general"} onClick={() => setUnitFilter("general")}>General</FilterChip>
        </div>
        <div className="mt-3 pt-3 border-t border-line">
          <button
            onClick={() => setRevealAll((r) => !r)}
            className="text-xs font-medium text-accent-blue hover:underline inline-flex items-center gap-1.5"
          >
            {revealAll ? <EyeOff size={12} /> : <Eye size={12} />}
            {revealAll ? "Hide all answers" : "Reveal all"}
          </button>
        </div>
      </LearnCard>

      <div className="space-y-8">
        {grouped.map(([topic, cards]) => (
          <div key={topic}>
            <h3 className="text-base font-semibold text-ink mb-3">{topic} <span className="text-ink-mute font-normal text-sm tabular-nums">({cards.length})</span></h3>
            <div className="space-y-2">
              {cards.map((card) => (
                <FormulaRow key={card.id} card={card} forceReveal={revealAll} reviewed={!!srs[card.id]} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </LearnPage>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
        active
          ? "bg-accent-blue/10 border-accent-blue/30 text-accent-blue"
          : "bg-bg-elevated border-line text-ink-dim hover:border-line-strong"
      }`}
    >
      {children}
    </button>
  );
}

function FormulaRow({ card, forceReveal, reviewed }: { card: FormulaCard; forceReveal: boolean; reviewed: boolean }) {
  const [revealed, setRevealed] = useState(false);
  const show = forceReveal || revealed;
  return (
    <button
      onClick={() => setRevealed((r) => !r)}
      className="w-full text-left rounded-xl border border-line bg-bg-surface hover:border-line-strong px-4 py-3 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="text-sm text-ink leading-relaxed">
            <MathText>{card.front}</MathText>
          </div>
          {show && (
            <div className="mt-2 pt-2 border-t border-line text-sm text-accent-blue leading-relaxed">
              <MathText>{card.back}</MathText>
            </div>
          )}
        </div>
        {reviewed && (
          <div className="text-2xs font-mono text-accent-lime uppercase tracking-wide shrink-0 mt-1">
            in deck
          </div>
        )}
      </div>
    </button>
  );
}

