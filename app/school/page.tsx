"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Eyebrow, Checkbox, Tag, PageHeader, Stat } from "@/components/ui";
import { useStore } from "@/lib/store";
import { CLASSES, ClassRoom, Task, Assessment } from "@/lib/data/school";
import { urgencyLabel, daysUntil } from "@/lib/utils/date";
import { ChevronDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function SchoolPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-3xl pb-10">
      <PageHeader
        eyebrow="Classes"
        title="School"
        subtitle="5 classes. Tap into any one for tasks and assessments."
      />

      <Card className="p-4 mb-5 bg-accent-red/5 border-accent-red/20">
        <div className="flex items-start gap-3">
          <AlertCircle size={16} className="text-accent-red mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0 text-sm">
            <span className="text-accent-red font-medium">AP exams crash mode active.</span>
            <span className="text-ink-dim ml-1">Macro May 8, Precalc May 12.</span>
            <Link href="/ap" className="ml-2 font-mono text-2xs text-accent-red tracking-wider uppercase">Open AP →</Link>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {CLASSES.map((cls) => <ClassCard key={cls.id} cls={cls} />)}
      </div>
    </div>
  );
}

function ClassCard({ cls }: { cls: ClassRoom }) {
  const [open, setOpen] = useState(false);
  const schoolTasks = useStore((s) => s.schoolTasks);
  const toggleSchoolTask = useStore((s) => s.toggleSchoolTask);

  const visibleTasks = cls.tasks.filter((t) => !t.defaultDone || schoolTasks[t.id] === undefined ? true : !schoolTasks[t.id]);
  const doneTasks = cls.tasks.filter((t) => schoolTasks[t.id] ?? t.defaultDone).length;

  return (
    <Card className="overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full px-4 py-4 flex items-center gap-4 text-left hover:bg-bg-elevated/30 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-base">{cls.name}</span>
            <Tag accent={cls.accent} size="sm">{cls.type}</Tag>
          </div>
          <div className="text-xs text-ink-mute mt-1.5 truncate">{cls.summary}</div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          {cls.tasks.length > 0 && (
            <span className="font-mono text-2xs text-ink-mute tabular-nums">{doneTasks}/{cls.tasks.length}</span>
          )}
          {cls.assessments[0] && (
            <Tag accent={urgencyLabel(cls.assessments[0].date).tone === "red" ? "red" : urgencyLabel(cls.assessments[0].date).tone === "amber" ? "amber" : "neutral"} size="sm">
              {urgencyLabel(cls.assessments[0].date).text}
            </Tag>
          )}
        </div>
        <ChevronDown size={14} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </button>
      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden border-t border-line">
          <div className="px-4 py-4 space-y-4">
            {cls.assessments.length > 0 && (
              <div>
                <Eyebrow className="mb-2">Assessments</Eyebrow>
                {cls.assessments.map((a) => <AssessmentRow key={a.title} a={a} />)}
              </div>
            )}
            {cls.tasks.length > 0 ? (
              <div>
                <Eyebrow className="mb-2">Tasks</Eyebrow>
                <div className="space-y-1">
                  {cls.tasks.map((t) => <TaskRow key={t.id} task={t} />)}
                </div>
              </div>
            ) : (
              <div className="text-sm text-ink-mute italic">No active tasks.</div>
            )}
          </div>
        </motion.div>
      )}
    </Card>
  );
}

function AssessmentRow({ a }: { a: Assessment }) {
  const u = urgencyLabel(a.date);
  return (
    <div className="flex items-center justify-between py-2 border-b border-line last:border-0">
      <div className="min-w-0">
        <div className="text-sm font-medium">{a.title}</div>
        <div className="text-2xs text-ink-mute mt-0.5">{a.detail}</div>
      </div>
      <Tag accent={u.tone === "ghost" ? "neutral" : u.tone}>{u.text}</Tag>
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  const schoolTasks = useStore((s) => s.schoolTasks);
  const toggle = useStore((s) => s.toggleSchoolTask);
  const checked = schoolTasks[task.id] ?? task.defaultDone ?? false;
  const u = task.due ? urgencyLabel(task.due) : null;

  return (
    <div className="flex items-start gap-3 py-2">
      <Checkbox checked={checked} onChange={() => toggle(task.id)} accent={task.priority === "critical" ? "red" : task.priority === "high" ? "amber" : "lime"} size="sm" />
      <div className="flex-1 min-w-0">
        <div className={cn("text-sm flex items-center gap-2 flex-wrap", checked ? "text-ink-mute line-through" : "text-ink-dim")}>
          {task.title}
          {u && <Tag accent={u.tone === "ghost" ? "neutral" : u.tone} size="sm">{u.text}</Tag>}
        </div>
        {task.details && <div className="text-2xs text-ink-mute mt-0.5">{task.details}</div>}
      </div>
    </div>
  );
}
