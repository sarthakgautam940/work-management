"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, ProgressBar, Checkbox, Tag, PageHeader, Stat, Input, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import { IBO_CHAPTERS, IBO_BOOKS, IBO_CASES, IBO_KEY_DATES } from "@/lib/data/ibo";
import { urgencyLabel, daysUntil, shortDate } from "@/lib/utils/date";
import { ChevronDown, BookOpen, Trophy, Calendar } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type View = "chapters" | "books" | "cases" | "dates";

export default function IBOPage() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("chapters");
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const iboChapters = useStore((s) => s.iboChapters);
  const iboBooks = useStore((s) => s.iboBooks);
  const iboCases = useStore((s) => s.iboCases);

  const chapterDone = IBO_CHAPTERS.filter((c) => iboChapters[c.id]).length;
  const bookDone = IBO_BOOKS.filter((b) => iboBooks[b.id]?.complete).length;
  const caseDone = IBO_CASES.filter((c) => iboCases[c.id]).length;
  const sprintStart = daysUntil("2026-05-09");
  const grandTest = daysUntil("2026-08-08");

  return (
    <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-3xl pb-10">
      <PageHeader
        eyebrow="International Business Olympiad"
        title="IBO Sprint"
        subtitle={sprintStart > 0 ? `Sprint starts in ${sprintStart} days. Phase 1 chapter mastery first.` : "Live sprint. Chapters → books → cases → mocks."}
        accent="amber"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="Chapters" value={`${chapterDone}/${IBO_CHAPTERS.length}`} accent="amber" />
        <Stat label="Books" value={`${bookDone}/${IBO_BOOKS.length}`} accent="lime" />
        <Stat label="Cases" value={`${caseDone}/${IBO_CASES.length}`} accent="violet" />
        <Stat label="Grand Test" value={`${grandTest}d`} hint="Aug 8" accent="red" />
      </div>

      <div className="grid grid-cols-4 gap-1 mb-6 p-1 rounded-xl bg-bg-surface border border-line">
        {(["chapters", "books", "cases", "dates"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "py-2 rounded-lg font-mono text-2xs tracking-wider uppercase transition-all",
              view === v ? "bg-bg-elevated text-ink" : "text-ink-mute hover:text-ink"
            )}
          >
            {v}
          </button>
        ))}
      </div>

      {view === "chapters" && <ChaptersView />}
      {view === "books" && <BooksView />}
      {view === "cases" && <CasesView />}
      {view === "dates" && <DatesView />}
    </div>
  );
}

function ChaptersView() {
  return (
    <div className="space-y-2.5">
      {IBO_CHAPTERS.map((ch) => <ChapterCard key={ch.id} ch={ch} />)}
    </div>
  );
}

function ChapterCard({ ch }: { ch: typeof IBO_CHAPTERS[0] }) {
  const [open, setOpen] = useState(false);
  const iboChapters = useStore((s) => s.iboChapters);
  const toggle = useStore((s) => s.toggleIBOChapter);
  const done = !!iboChapters[ch.id];
  const accent = ch.priority === "critical" ? "red" : ch.priority === "high" ? "amber" : "lime";

  return (
    <Card className={cn("overflow-hidden transition-all", done && "opacity-60")}>
      <button onClick={() => setOpen((o) => !o)} className="w-full px-4 py-3.5 flex items-center gap-4 text-left hover:bg-bg-elevated/30 transition-colors">
        <Checkbox checked={done} onChange={() => toggle(ch.id)} accent={accent} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-2xs text-ink-ghost">CH {ch.number}</span>
            <span className="font-medium text-sm">{ch.title}</span>
            <Tag accent={accent} size="sm">{ch.priority}</Tag>
          </div>
          <div className="text-2xs text-ink-mute mt-1">{ch.range}</div>
        </div>
        <ChevronDown size={14} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line">
            <div className="px-4 py-3">
              <ul className="space-y-2">
                {ch.topics.map((t, i) => (
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

function BooksView() {
  return (
    <>
      <Eyebrow className="mb-3">Phase 2 — Priority</Eyebrow>
      <div className="space-y-2 mb-5">
        {IBO_BOOKS.filter((b) => b.phase === 2).map((b) => <BookCard key={b.id} book={b} />)}
      </div>
      <Eyebrow className="mb-3">Phase 3 — Depth</Eyebrow>
      <div className="space-y-2">
        {IBO_BOOKS.filter((b) => b.phase === 3).map((b) => <BookCard key={b.id} book={b} />)}
      </div>
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
  const accent = book.phase === 2 ? "lime" : "blue";
  const pct = data.total > 0 ? (data.pages / data.total) * 100 : 0;

  return (
    <Card className={cn("overflow-hidden transition-all", data.complete && "opacity-60")}>
      <button onClick={() => setOpen((o) => !o)} className="w-full px-4 py-3.5 flex items-center gap-3 text-left hover:bg-bg-elevated/30 transition-colors">
        <Checkbox checked={data.complete} onChange={() => toggleComplete(book.id)} accent={accent} />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{book.title}</div>
          <div className="text-2xs text-ink-mute mt-0.5 truncate">{book.author}</div>
          {data.total > 0 && (
            <div className="mt-2">
              <ProgressBar value={pct} accent={accent} />
              <div className="text-2xs text-ink-mute font-mono mt-1 tabular-nums">{data.pages}/{data.total} pages</div>
            </div>
          )}
        </div>
        <ChevronDown size={14} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line">
            <div className="px-4 py-3 space-y-3">
              <p className="text-xs text-ink-dim leading-relaxed">{book.why}</p>
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
    <div className="space-y-2">
      {IBO_CASES.map((c) => {
        const done = !!iboCases[c.id];
        return (
          <Card key={c.id} className={cn("p-4 transition-all", done && "opacity-60")}>
            <div className="flex items-start gap-3">
              <Checkbox checked={done} onChange={() => toggle(c.id)} accent="violet" size="sm" />
              <div className="flex-1 min-w-0">
                <div className={cn("text-sm font-medium", done && "line-through text-ink-mute")}>{c.title}</div>
                <div className="text-2xs text-ink-mute mt-1">{c.detail}</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function DatesView() {
  return (
    <div className="space-y-2">
      {IBO_KEY_DATES.map((d) => {
        const u = urgencyLabel(d.date);
        return (
          <Card key={d.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium text-sm">{d.label}</div>
                <div className="text-2xs text-ink-mute mt-1">{d.detail}</div>
                <div className="text-2xs font-mono text-ink-ghost mt-2">{shortDate(d.date)}</div>
              </div>
              <Tag accent={u.tone === "ghost" ? "neutral" : u.tone}>{u.text}</Tag>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
