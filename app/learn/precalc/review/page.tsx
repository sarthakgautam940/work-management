"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LearnPage, LearnHeader, LearnCard, LearnPill, LearnButton } from "@/components/learn/primitives";
import { MathText } from "@/components/learn/math";
import { FORMULAS } from "@/lib/learn/formulas";
import { PRACTICE } from "@/lib/learn/practice";
import { useStore } from "@/lib/store";
import { ArrowRight, RotateCcw, Sparkles, Check } from "lucide-react";

type DeckCard =
  | { kind: "formula"; id: string; front: string; back: string; topic: string }
  | { kind: "practice"; id: string; front: string; back: string; topic: string };

export default function ReviewPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const srs = useStore((s) => s.learnSrs);
  const flagged = useStore((s) => s.learnFlagged);
  const review = useStore((s) => s.reviewLearnCard);

  // Build the deck: every formula + every flagged practice problem.
  const allCards: DeckCard[] = useMemo(() => {
    const cards: DeckCard[] = [];
    FORMULAS.forEach((f) => {
      cards.push({ kind: "formula", id: f.id, front: f.front, back: f.back, topic: f.topic });
    });
    PRACTICE.forEach((p) => {
      if (!flagged[`practice:${p.id}`]) return;
      const back = p.type === "mcq"
        ? `${p.choices[p.answer]} — ${p.explain}`
        : "(See practice problem for full solution)";
      cards.push({ kind: "practice", id: `practice:${p.id}`, front: p.prompt, back, topic: `${p.source} ${p.number}` });
    });
    return cards;
  }, [flagged]);

  const now = Date.now();
  const due = allCards.filter((c) => {
    const entry = srs[c.id];
    if (!entry) return true; // never reviewed = due
    return new Date(entry.dueAt).getTime() <= now;
  });

  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const card = due[idx];

  if (due.length === 0) {
    return (
      <LearnPage>
        <LearnHeader
          kicker="Spaced review"
          title="Caught up"
          subtitle="No cards due right now. Come back later — the deck refreshes as cards' intervals expire."
          back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
        />
        <LearnCard>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-accent-lime/[0.08] border border-accent-lime/30 flex items-center justify-center shrink-0">
              <Check size={20} className="text-accent-lime" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-base text-ink">Empty queue</div>
              <p className="mt-1 text-sm text-ink-dim leading-relaxed">
                {Object.keys(srs).length === 0
                  ? `Review hasn't started yet. Open the formula sheet (88 cards) or flag practice problems to populate the deck.`
                  : `${Object.keys(srs).length} cards in your deck — none due right now. Come back later.`}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/learn/precalc/formulas">
                  <LearnButton variant="secondary">Open formulas</LearnButton>
                </Link>
                <Link href="/learn/precalc/practice">
                  <LearnButton variant="secondary">Open practice</LearnButton>
                </Link>
              </div>
            </div>
          </div>
        </LearnCard>
      </LearnPage>
    );
  }

  const handleRate = (rating: "again" | "hard" | "good" | "easy") => {
    review(card.id, rating);
    setRevealed(false);
    if (idx < due.length - 1) setIdx(idx + 1);
    else setIdx(0); // loop back; the dueness changes after rating, but kept simple
  };

  return (
    <LearnPage>
      <LearnHeader
        kicker="Spaced review"
        title={`${due.length} card${due.length === 1 ? "" : "s"} due`}
        subtitle="Rate each card. Intervals adapt — easy cards return less often, hard ones return sooner."
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
      />

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-ink-mute">Card {idx + 1} of {due.length}</span>
          <LearnPill tone="accent">{card.topic}</LearnPill>
        </div>
        <div className="h-1 rounded-full bg-line overflow-hidden">
          <motion.div
            className="h-full bg-accent-blue"
            animate={{ width: `${((idx + 1) / due.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${card.id}-${revealed}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <LearnCard className="p-8 mb-6">
            <div className="text-xs font-medium uppercase tracking-wide text-ink-mute mb-3">
              {card.kind === "formula" ? "Formula" : "Practice"}
            </div>
            <div className="text-lg text-ink leading-relaxed">
              <MathText>{card.front}</MathText>
            </div>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-5 pt-5 border-t border-line"
              >
                <div className="text-xs font-medium uppercase tracking-wide text-accent-blue mb-2">Answer</div>
                <div className="text-base text-ink leading-relaxed">
                  <MathText>{card.back}</MathText>
                </div>
              </motion.div>
            )}
          </LearnCard>
        </motion.div>
      </AnimatePresence>

      {!revealed ? (
        <div className="flex justify-center">
          <LearnButton size="lg" onClick={() => setRevealed(true)}>
            Reveal answer <ArrowRight size={16} />
          </LearnButton>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <RateButton tone="red" label="Again" sub="< 1 day" onClick={() => handleRate("again")} />
          <RateButton tone="amber" label="Hard" sub="ease ↓" onClick={() => handleRate("hard")} />
          <RateButton tone="lime" label="Good" sub="standard" onClick={() => handleRate("good")} />
          <RateButton tone="blue" label="Easy" sub="ease ↑" onClick={() => handleRate("easy")} />
        </div>
      )}
    </LearnPage>
  );
}

function RateButton({ tone, label, sub, onClick }: {
  tone: "red" | "amber" | "lime" | "blue";
  label: string;
  sub: string;
  onClick: () => void;
}) {
  const colorClass = {
    red: "border-accent-red/40 bg-accent-red/[0.06] text-accent-red hover:bg-accent-red/[0.12]",
    amber: "border-accent-amber/40 bg-accent-amber/[0.06] text-accent-amber hover:bg-accent-amber/[0.12]",
    lime: "border-accent-lime/40 bg-accent-lime/[0.06] text-accent-lime hover:bg-accent-lime/[0.12]",
    blue: "border-accent-blue/40 bg-accent-blue/[0.06] text-accent-blue hover:bg-accent-blue/[0.12]",
  }[tone];
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border-2 px-4 py-3 transition-colors text-center ${colorClass}`}
    >
      <div className="font-semibold text-base">{label}</div>
      <div className="text-2xs uppercase tracking-wide opacity-70 mt-0.5">{sub}</div>
    </button>
  );
}
