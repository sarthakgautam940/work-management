"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, Section, Tag, Checkbox, Stat, Button, PageHeader, TabBar, Row } from "@/components/ui";
import { useStore } from "@/lib/store";
import { SAT_MATH, SAT_RW, SAT_TEST_DATE, VOCAB } from "@/lib/data/sat";
import { daysUntil } from "@/lib/utils/date";
import { RotateCcw, Check, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type View = "math" | "rw" | "vocab";
const VIEWS: readonly View[] = ["math", "rw", "vocab"] as const;

export default function SATPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <SATInner />;
}

function SATInner() {
  const [view, setView] = useState<View>("math");
  const satModules = useStore((s) => s.satModules);
  const vocabKnown = useStore((s) => s.vocabKnown);
  const mathDone = SAT_MATH.filter((m) => satModules[m.id]).length;
  const rwDone = SAT_RW.filter((m) => satModules[m.id]).length;
  const vocabDone = Object.values(vocabKnown).filter((v) => v === true).length;
  const days = daysUntil(SAT_TEST_DATE);

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader
        eyebrow="Digital SAT"
        title="SAT prep"
        subtitle="Foundation now. Push hard once AP exams clear."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-9">
        <Stat label="Math" value={`${mathDone}/${SAT_MATH.length}`} accent={mathDone === SAT_MATH.length ? "lime" : "neutral"} />
        <Stat label="Reading + writing" value={`${rwDone}/${SAT_RW.length}`} accent={rwDone === SAT_RW.length ? "lime" : "neutral"} />
        <Stat label="Vocab known" value={`${vocabDone}/${VOCAB.length}`} />
        <Stat label="Test date" value={`${days}d`} hint="Oct 3" accent={days <= 60 ? "amber" : "neutral"} />
      </div>

      <TabBar
        value={view}
        onChange={setView}
        options={VIEWS}
        labels={{ rw: "Reading + Writing" }}
      />

      {view === "math" && <ModulesView modules={SAT_MATH} />}
      {view === "rw" && <ModulesView modules={SAT_RW} />}
      {view === "vocab" && <VocabView />}
    </div>
  );
}

function ModulesView({ modules }: { modules: typeof SAT_MATH }) {
  const satModules = useStore((s) => s.satModules);
  const toggle = useStore((s) => s.toggleSATModule);
  const totalHours = modules.reduce((s, m) => s + m.hours, 0);
  return (
    <>
      <div className="mb-5 flex items-baseline justify-between">
        <Meta>{modules.length} modules</Meta>
        <Meta>{totalHours}h total</Meta>
      </div>
      <Card className="px-5 py-2">
        {modules.map((m, i) => {
          const done = !!satModules[m.id];
          return (
            <Row
              key={m.id}
              onClick={() => toggle(m.id)}
              className={cn(
                "flex items-start gap-3.5 py-4",
                i < modules.length - 1 && "border-b border-line"
              )}
            >
              <Checkbox checked={done} onChange={() => toggle(m.id)} accent="lime" size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={cn("text-sm font-medium", done ? "line-through text-ink-mute" : "text-ink")}>{m.title}</span>
                  <Meta>{m.hours}h</Meta>
                </div>
                <div className="text-xs text-ink-mute mt-1">{m.detail}</div>
              </div>
            </Row>
          );
        })}
      </Card>
    </>
  );
}

function VocabView() {
  const vocabKnown = useStore((s) => s.vocabKnown);
  const markVocab = useStore((s) => s.markVocab);
  const [idx, setIdx] = useState(() => {
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
      <div className="flex items-center justify-between mb-5">
        <Meta>Card {idx + 1} of {VOCAB.length}</Meta>
        <div className="flex items-center gap-3">
          <Meta>{knownCount} known</Meta>
          <Button variant="ghost" size="sm" onClick={reset}>
            <span className="flex items-center gap-1.5"><RotateCcw size={11} /> Reset</span>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden mb-5">
        <button
          onClick={() => setFlipped((f) => !f)}
          className="w-full min-h-[300px] p-8 text-center flex flex-col items-center justify-center hover:bg-bg-elevated/20 transition-colors"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${idx}-${flipped}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="w-full"
            >
              {!flipped ? (
                <>
                  <div className="text-3xl lg:text-5xl font-bold tracking-tightest">{card.word}</div>
                  <div className="text-2xs text-ink-ghost mt-5 font-mono tracking-[0.2em]">TAP TO FLIP</div>
                </>
              ) : (
                <>
                  <Eyebrow>Definition</Eyebrow>
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
          <Button variant="secondary" onClick={prev}>Previous</Button>
          <Button variant="primary" onClick={() => setFlipped(true)}>Flip</Button>
          <Button variant="secondary" onClick={() => next()}>Skip</Button>
        </div>
      )}

      {known && (
        <div className="mt-5 text-center">
          <Tag tone="lime" size="sm">Marked known</Tag>
        </div>
      )}
    </>
  );
}
