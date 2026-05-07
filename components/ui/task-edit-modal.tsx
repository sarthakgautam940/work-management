"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Button, Input, Field } from "@/components/ui";
import { useStore, type CustomTask } from "@/lib/store";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type TaskEditTarget =
  | { kind: "custom"; task: CustomTask }
  | {
      kind: "builtin";
      id: string;
      defaults: { title: string; details?: string; due?: string; estimateMin?: number };
    }
  | { kind: "new"; parent: string };

export function TaskEditModal({
  target,
  onClose,
}: {
  target: TaskEditTarget | null;
  onClose: () => void;
}) {
  const addCustomTask = useStore((s) => s.addCustomTask);
  const updateCustomTask = useStore((s) => s.updateCustomTask);
  const setTaskEdit = useStore((s) => s.setTaskEdit);
  const customTaskEdits = useStore((s) => s.customTaskEdits);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [due, setDue] = useState("");
  const [estimate, setEstimate] = useState("");

  // Hydrate fields when target changes.
  useEffect(() => {
    if (!target) return;
    if (target.kind === "custom") {
      setTitle(target.task.title);
      setDetails(target.task.details ?? "");
      setDue(target.task.due ?? "");
      setEstimate(target.task.estimateMin ? String(target.task.estimateMin) : "");
    } else if (target.kind === "builtin") {
      const edit = customTaskEdits[target.id];
      setTitle(edit?.title ?? target.defaults.title);
      setDetails(edit?.details ?? target.defaults.details ?? "");
      setDue(edit?.due ?? target.defaults.due ?? "");
      const est = edit?.estimateMin ?? target.defaults.estimateMin;
      setEstimate(est ? String(est) : "");
    } else {
      setTitle("");
      setDetails("");
      setDue("");
      setEstimate("");
    }
  }, [target, customTaskEdits]);

  if (!target) return null;

  const isBuiltin = target.kind === "builtin";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const estimateMin = estimate ? parseInt(estimate) : undefined;
    if (target.kind === "custom") {
      updateCustomTask(target.task.id, {
        title: trimmed,
        details: details.trim() || undefined,
        due: due || undefined,
        estimateMin: estimateMin && estimateMin > 0 ? estimateMin : undefined,
      });
    } else if (target.kind === "builtin") {
      // Only set fields that differ from defaults; clear the edit when nothing differs.
      const edit: { title?: string; details?: string; due?: string; estimateMin?: number } = {};
      if (trimmed !== target.defaults.title) edit.title = trimmed;
      if (details.trim() !== (target.defaults.details ?? "")) edit.details = details.trim();
      if (due !== (target.defaults.due ?? "")) edit.due = due || undefined;
      if (estimateMin !== target.defaults.estimateMin) edit.estimateMin = estimateMin;
      const isEmpty = Object.keys(edit).length === 0;
      setTaskEdit(target.id, isEmpty ? null : edit);
    } else {
      addCustomTask({
        parent: target.parent,
        title: trimmed,
        details: details.trim() || undefined,
        due: due || undefined,
        estimateMin: estimateMin && estimateMin > 0 ? estimateMin : undefined,
        gradeType: "classwork",
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {target && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="p-5 lg:p-6">
              <div className="flex items-start justify-between mb-5">
                <Eyebrow accent="rose">
                  {target.kind === "new" ? "New task" : isBuiltin ? "Edit (built-in)" : "Edit task"}
                </Eyebrow>
                <button onClick={onClose} className="text-ink-mute hover:text-ink p-1 -mr-1">
                  <X size={16} />
                </button>
              </div>
              <form onSubmit={submit} className="space-y-4">
                <Field label="Title">
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs doing" autoFocus />
                </Field>
                <Field label="Details">
                  <Input value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Optional context" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Due">
                    <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
                  </Field>
                  <Field label="Estimate (min)">
                    <Input type="number" value={estimate} onChange={(e) => setEstimate(e.target.value)} placeholder="0" />
                  </Field>
                </div>
                {isBuiltin && (
                  <button
                    type="button"
                    onClick={() => {
                      setTaskEdit(target.id, null);
                      onClose();
                    }}
                    className="text-2xs font-mono uppercase tracking-[0.18em] text-ink-mute hover:text-ink transition-colors"
                  >
                    Restore default values
                  </button>
                )}
                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
                  <Button type="submit" variant="primary" className="flex-1">Save</Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TaskMenu({
  className,
  onWork,
  onEdit,
  onDelete,
}: {
  className?: string;
  onWork?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative shrink-0", className)} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="w-7 h-7 rounded-md flex items-center justify-center text-ink-mute hover:text-ink hover:bg-bg-elevated/60 transition-colors"
        aria-label="Task actions"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="3" cy="7" r="1.3"/><circle cx="7" cy="7" r="1.3"/><circle cx="11" cy="7" r="1.3"/></svg>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              transition={{ duration: 0.14 }}
              className="absolute right-0 top-9 z-50 min-w-[140px] rounded-lg border border-line bg-bg-surface shadow-2xl overflow-hidden"
            >
              {onWork && (
                <button
                  onClick={() => { onWork(); setOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-bg-elevated text-ink transition-colors"
                >
                  Work on this
                </button>
              )}
              {onEdit && (
                <button
                  onClick={() => { onEdit(); setOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-bg-elevated text-ink-dim transition-colors"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => { onDelete(); setOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-bg-elevated text-accent-red/80 transition-colors"
                >
                  Delete
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
