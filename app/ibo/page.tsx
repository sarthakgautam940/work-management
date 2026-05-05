"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, Section, Tag, Checkbox, ProgressBar, Stat, Button, Input, PageHeader, TabBar, Row } from "@/components/ui";
import { useStore } from "@/lib/store";
import { IBO_CHAPTERS, IBO_BOOKS, IBO_CASES, IBO_KEY_DATES } from "@/lib/data/ibo";
import { urgencyLabel, daysUntil, shortDate } from "@/lib/utils/date";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type View = "chapters" | "books" | "cases" | "dates";
const VIEWS: readonly View[] = ["chapters", "books", "cases", "dates"] as const;

export default function IBOPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <IBOInner />;
}

function IBOInner() {
  const [view, setView] = useState<View>("chapters");
  const iboChapters = useStore((s) => s.iboChapters);
  const iboBooks = useStore((s) => s.iboBooks);
  const iboCases = useStore((s) => s.iboCases);

  const chapterDone = IBO_CHAPTERS.filter((c) => iboChapters[c.id]).length;
  const bookDone = IBO_BOOKS.filter((b) => iboBooks[b.id]?.complete).length;
  const caseDone = IBO_CASES.filter((c) => iboCases[c.id]).length;
  const sprintStart = daysUntil("2026-05-09");
  const grandTest = daysUntil("2026-08-08");

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader
        eyebrow="International Business Olympiad"
        title="IBO sprint"
        subtitle={sprintStart > 0 ? `Sprint starts in ${sprintStart} days. Phase 1 chapter mastery first.` : "Live sprint. Chapters → books → cases → mocks."}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-9">
        <Stat label="Chapters" value={`${chapterDone}/${IBO_CHAPTERS.length}`} accent={chapterDone === IBO_CHAPTERS.length ? "lime" : "amber"} />
        <Stat label="Books" value={`${bookDone}/${IBO_BOOKS.length}`} />
        <Stat label="Cases" value={`${caseDone}/${IBO_CASES.length}`} />
        <Stat label="Grand test" value={`${grandTest}d`} hint="Aug 8" accent={grandTest <= 30 ? "red" : "neutral"} />
      </div>

      <TabBar value={view} onChange={setView} options={VIEWS} />

      {view === "chapters" && <ChaptersView />}
      {view === "books" && <BooksView />}
      {view === "cases" && <CasesView />}
      {view === "dates" && <DatesView />}
    </div>
  );
}

function ChaptersView() {
  return (
    <div className="space-y-2">
      {IBO_CHAPTERS.map((ch) => <ChapterCard key={ch.id} ch={ch} />)}
    </div>
  );
}

function ChapterCard({ ch }: { ch: typeof IBO_CHAPTERS[0] }) {
  const [open, setOpen] = useState(false);
  const iboChapters = useStore((s) => s.iboChapters);
  const toggle = useStore((s) => s.toggleIBOChapter);
  const done = !!iboChapters[ch.id];
  const priorityTone =
    ch.priority === "critical" ? "red"
    : ch.priority === "high" ? "amber"
    : "neutral";

  return (
    <Card className={cn("overflow-hidden transition-opacity", done && "opacity-60")}>
      <Row
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated/30"
      >
        <Checkbox checked={done} onChange={() => toggle(ch.id)} accent={priorityTone === "neutral" ? "lime" : priorityTone} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Meta>Ch {ch.number}</Meta>
            <span className="font-medium text-sm text-ink">{ch.title}</span>
            {ch.priority !== "medium" && <Tag tone={priorityTone === "neutral" ? "neutral" : priorityTone} size="sm">{ch.priority}</Tag>}
          </div>
          <div className="text-xs text-ink-mute mt-1">{ch.range}</div>
        </div>
        <ChevronDown size={15} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </Row>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line">
            <div className="px-5 py-4">
              <ul className="space-y-2">
                {ch.topics.map((t, i) => (
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

function BooksView() {
  return (
    <>
      <Section eyebrow="Phase 2 — priority">
        <div className="space-y-2">
          {IBO_BOOKS.filter((b) => b.phase === 2).map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </Section>
      <Section eyebrow="Phase 3 — depth">
        <div className="space-y-2">
          {IBO_BOOKS.filter((b) => b.phase === 3).map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </Section>
    </>
  );
}

function BookCard({ book }: { book: typeof IBO_BOOKS[0] }) {
  const [open, setOpen] = useState(false);
  const iboBooks = useStore((s) => s.iboBooks);
  const setProgress = useStore((s) => s.setIBOBookProgress);
  const toggleComplete = useStore((s) => s.toggleIBOBookComplete);
  const data = iboBooks[book.id] || { complete: false, pages: 0, total: 0 };
  const [pages, setPages] = useState(String(data.pages || ""));
  const [total, setTotal] = useState(String(data.total || ""));
  const pct = data.total > 0 ? (data.pages / data.total) * 100 : 0;

  return (
    <Card className={cn("overflow-hidden transition-opacity", data.complete && "opacity-60")}>
      <Row
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated/30"
      >
        <Checkbox checked={data.complete} onChange={() => toggleComplete(book.id)} accent="lime" />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-ink truncate">{book.title}</div>
          <div className="text-xs text-ink-mute mt-0.5 truncate">{book.author}</div>
          {data.total > 0 && (
            <div className="mt-2.5">
              <ProgressBar value={pct} accent="lime" />
              <div className="text-2xs text-ink-mute font-mono mt-1.5 tabular-nums">{data.pages} / {data.total} pages</div>
            </div>
          )}
        </div>
        <ChevronDown size={15} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </Row>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line">
            <div className="px-5 py-4 space-y-3">
              <p className="text-sm text-ink-dim leading-relaxed">{book.why}</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Eyebrow className="mb-1.5">Pages read</Eyebrow>
                  <Input type="number" inputMode="numeric" value={pages} onChange={(e) => setPages(e.target.value)} placeholder="0" />
                </div>
                <div>
                  <Eyebrow className="mb-1.5">Total pages</Eyebrow>
                  <Input type="number" inputMode="numeric" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="0" />
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setProgress(book.id, parseInt(pages) || 0, parseInt(total) || 0)}>
                Update progress
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function CasesView() {
  const iboCases = useStore((s) => s.iboCases);
  const toggle = useStore((s) => s.toggleIBOCase);
  return (
    <Card className="px-5 py-2">
      {IBO_CASES.map((c, i) => {
        const done = !!iboCases[c.id];
        return (
          <Row
            key={c.id}
            onClick={() => toggle(c.id)}
            className={cn(
              "flex items-start gap-3.5 py-4",
              i < IBO_CASES.length - 1 && "border-b border-line"
            )}
          >
            <Checkbox checked={done} onChange={() => toggle(c.id)} accent="violet" size="sm" />
            <div className="flex-1 min-w-0">
              <div className={cn("text-sm font-medium", done ? "line-through text-ink-mute" : "text-ink")}>{c.title}</div>
              <div className="text-xs text-ink-mute mt-1 leading-relaxed">{c.detail}</div>
            </div>
          </Row>
        );
      })}
    </Card>
  );
}

function DatesView() {
  return (
    <Card className="px-5 py-2">
      {IBO_KEY_DATES.map((d, i) => {
        const u = urgencyLabel(d.date);
        const tone: "red" | "amber" | "lime" | "neutral" =
          u.tone === "red" ? "red"
          : u.tone === "amber" ? "amber"
          : u.tone === "lime" ? "lime"
          : "neutral";
        return (
          <div key={d.id} className={cn("flex items-start justify-between gap-3 py-4", i < IBO_KEY_DATES.length - 1 && "border-b border-line")}>
            <div className="min-w-0">
              <div className="font-medium text-sm text-ink">{d.label}</div>
              <div className="text-xs text-ink-mute mt-1 leading-relaxed">{d.detail}</div>
              <div className="text-2xs font-mono text-ink-ghost mt-2">{shortDate(d.date)}</div>
            </div>
            <Tag tone={tone}>{u.text}</Tag>
          </div>
        );
      })}
    </Card>
  );
}
