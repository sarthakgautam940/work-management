"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, ProgressBar, Checkbox, Tag, PageHeader, Stat, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import { SAT_MATH, SAT_RW, SAT_TEST_DATE, VOCAB } from "@/lib/data/sat";
import { daysUntil } from "@/lib/utils/date";
import { ChevronDown, RotateCcw, Check, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type View = "math" | "rw" | "vocab";

export default function SATPage() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("math");
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const satModules = useStore((s) => s.satModules);
  const vocabKnown = useStore((s) => s.vocabKnown);
  const mathDone = SAT_MATH.filter((m) => satModules[m.id]).length;
  const rwDone = SAT_RW.filter((m) => satModules[m.id]).length;
  const vocabDone = Object.values(vocabKnown).filter((v) => v === true).length;
  const days = daysUntil(SAT_TEST_DATE);

  return (
    <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-3xl pb-10">
      <PageHeader
        eyebrow="Digital SAT"
        title="SAT Prep"
        subtitle="Foundation now. Push hard after AP exams clear."
        accent="rose"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="Math" value={`${mathDone}/${SAT_MATH.length}`} accent="rose" />
        <Stat label="Reading + Writing" value={`${rwDone}/${SAT_RW.length}`} accent="violet" />
        <Stat label="Vocab known" value={`${vocabDone}/${VOCAB.length}`} accent="amber" />
        <Stat label="Test date" value={`${days}d`} hint="Oct 3" accent="rose" />
      </div>

      <div className="grid grid-cols-3 gap-1 mb-6 p-1 rounded-xl bg-bg-surface border border-line">
        {(["math", "rw", "vocab"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "py-2 rounded-lg font-mono text-2xs tracking-wider uppercase transition-all",
              view === v ? "bg-bg-elevated text-ink" : "text-ink-mute hover:text-ink"
            )}
          >
            {v === "rw" ? "Reading + Writing" : v}
          </button>
        ))}
      </div>

      {view === "math" && <ModulesView modules={SAT_MATH} accent="rose" />}
      {view === "rw" && <ModulesView modules={SAT_RW} accent="violet" />}
      {view === "vocab" && <VocabView />}
    </div>
  );
}

function ModulesView({ modules, accent }: { modules: typeof SAT_MATH; accent: "rose" | "violet" }) {
  const satModules = useStore((s) => s.satModules);
  const toggle = useStore((s) => s.toggleSATModule);
  const totalHours = modules.reduce((s, m) => s + m.hours, 0);
  return (
    <>
      <Card className="p-4 mb-3">
        <div className="flex items-center justify-between text-sm">
          <Eyebrow>Total time</Eyebrow>
          <span className={`font-mono tabular-nums text-accent-${accent}`}>{totalHours}h</span>
        </div>
      </Card>
      <div className="space-y-2">
        {modules.map((m) => {
          const done = !!satModules[m.id];
          return (
            <Card key={m.id} className={cn("p-4 transition-all", done && "opacity-60")}>
              <div className="flex items-start gap-3">
                <Checkbox checked={done} onChange={() => toggle(m.id)} accent={accent} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn("text-sm font-medium", done && "line-through text-ink-mute")}>{m.title}</span>
                    <Tag accent="neutral" size="sm">{m.hours}h</Tag>
                  </div>
                  <div className="text-2xs text-ink-mute mt-1">{m.detail}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function VocabView() {
  const vocabKnown = useStore((s) => s.vocabKnown);
  const markVocab = useStore((s) => s.markVocab);
  const [idx, setIdx] = useState(() => {
    // Start on first unknown
    for (let i = 0; i < VOCAB.length; i++) if (!vocabKnown[i]) return i;
    return 0;
  });
  const [flipped, setFlipped] = useState(false);

  const card = VOCAB[idx];
  const known = vocabKnown[idx] === true;

  const next = (k?: boolean) => {
    if (k !== undefined) markVocab(idx, k);
    setFlipped(false);
    setIdx((i) => (i + 1) % VOCAB.length);
  };
  const prev = () => {
    setFlipped(false);
    setIdx((i) => (i - 1 + VOCAB.length) % VOCAB.length);
  };
  const reset = () => {
    Object.keys(vocabKnown).forEach((k) => markVocab(parseInt(k), false));
    setIdx(0);
    setFlipped(false);
  };

  const knownCount = Object.values(vocabKnown).filter((v) => v === true).length;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Eyebrow>Card {idx + 1} of {VOCAB.length}</Eyebrow>
        <div className="flex items-center gap-2">
          <span className="font-mono text-2xs text-accent-amber tabular-nums">{knownCount} known</span>
          <Button variant="ghost" size="sm" onClick={reset}>
            <span className="flex items-center gap-1.5"><RotateCcw size={11} /> Reset</span>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden mb-4">
        <button
          onClick={() => setFlipped((f) => !f)}
          className="w-full min-h-[280px] p-8 text-center flex flex-col items-center justify-center gap-4 hover:bg-bg-elevated/20 transition-colors"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${idx}-${flipped}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="w-full"
            >
              {!flipped ? (
                <>
                  <div className="text-3xl lg:text-4xl font-bold tracking-tightest">{card.word}</div>
                  <div className="text-2xs text-ink-ghost mt-3 font-mono tracking-wider">TAP TO FLIP</div>
                </>
              ) : (
                <>
                  <Eyebrow accent="amber">Definition</Eyebrow>
                  <div className="text-base lg:text-lg leading-relaxed mt-3 text-ink-dim">{card.definition}</div>
                  <div className="text-sm text-ink-mute italic mt-4">"{card.example}"</div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </Card>

      {flipped ? (
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={() => next(false)} className="py-4">
            <span className="flex items-center justify-center gap-2"><X size={14} /> Still learning</span>
          </Button>
          <Button variant="primary" onClick={() => next(true)} className="py-4">
            <span className="flex items-center justify-center gap-2"><Check size={14} /> Know it</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <Button variant="secondary" onClick={prev} size="md">Previous</Button>
          <Button variant="primary" onClick={() => setFlipped(true)} size="md">Flip</Button>
          <Button variant="secondary" onClick={() => next()} size="md">Skip</Button>
        </div>
      )}

      {known && (
        <div className="mt-4 text-center text-2xs font-mono text-accent-lime">
          ✓ Currently marked as known
        </div>
      )}
    </>
  );
}
