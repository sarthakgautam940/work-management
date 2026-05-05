"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Eyebrow, Meta, Section, Tag, Checkbox, PageHeader, Row } from "@/components/ui";
import { useStore } from "@/lib/store";
import { CLASSES, ClassRoom, Task, Assessment } from "@/lib/data/school";
import { urgencyLabel } from "@/lib/utils/date";
import { ChevronDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function SchoolPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader
        eyebrow="Classes"
        title="School"
        subtitle="Five classes. Tap one to see assessments and tasks."
      />

      <Card className="p-4 mb-7 border-accent-red/30 bg-accent-red/[0.04]">
        <div className="flex items-start gap-3">
          <AlertCircle size={15} className="text-accent-red mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0 text-sm">
            <span className="text-ink font-medium">AP exams crash mode active.</span>
            <span className="text-ink-mute ml-1.5">Macro May 8, Precalc May 12.</span>
            <Link href="/ap" className="ml-2 font-mono text-2xs text-accent-red tracking-[0.18em] uppercase hover:opacity-80">Open AP →</Link>
          </div>
        </div>
      </Card>

      <Section eyebrow="Classes">
        <div className="space-y-2">
          {CLASSES.map((cls) => <ClassCard key={cls.id} cls={cls} />)}
        </div>
      </Section>
    </div>
  );
}

function ClassCard({ cls }: { cls: ClassRoom }) {
  const [open, setOpen] = useState(false);
  const schoolTasks = useStore((s) => s.schoolTasks);
  const doneTasks = cls.tasks.filter((t) => schoolTasks[t.id] ?? t.defaultDone).length;
  const nextAssessment = cls.assessments[0];
  const nextU = nextAssessment ? urgencyLabel(nextAssessment.date) : null;
  const tone: "red" | "amber" | "lime" | "neutral" = !nextU ? "neutral"
    : nextU.tone === "red" ? "red"
    : nextU.tone === "amber" ? "amber"
    : nextU.tone === "lime" ? "lime"
    : "neutral";

  return (
    <Card className="overflow-hidden">
      <Row onClick={() => setOpen((o) => !o)} className="flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated/30">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-medium text-base text-ink">{cls.name}</span>
            <Meta>{cls.type}</Meta>
          </div>
          <div className="text-xs text-ink-mute mt-1.5 truncate">{cls.summary}</div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {cls.tasks.length > 0 && (
            <span className="font-mono text-2xs text-ink-mute tabular-nums">{doneTasks}/{cls.tasks.length}</span>
          )}
          {nextU && <Tag tone={tone} size="sm">{nextU.text}</Tag>}
        </div>
        <ChevronDown size={15} className={cn("text-ink-mute transition-transform shrink-0", open && "rotate-180")} />
      </Row>
      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden border-t border-line">
          <div className="px-5 py-5 space-y-5">
            {cls.assessments.length > 0 && (
              <div>
                <Eyebrow className="mb-3">Assessments</Eyebrow>
                <div>
                  {cls.assessments.map((a, i) => <AssessmentRow key={a.title} a={a} last={i === cls.assessments.length - 1} />)}
                </div>
              </div>
            )}
            {cls.tasks.length > 0 ? (
              <div>
                <Eyebrow className="mb-2">Tasks</Eyebrow>
                <div>
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

function AssessmentRow({ a, last }: { a: Assessment; last: boolean }) {
  const u = urgencyLabel(a.date);
  const tone: "red" | "amber" | "lime" | "neutral" =
    u.tone === "red" ? "red"
    : u.tone === "amber" ? "amber"
    : u.tone === "lime" ? "lime"
    : "neutral";
  return (
    <div className={cn("flex items-center justify-between py-3 gap-3", !last && "border-b border-line")}>
      <div className="min-w-0">
        <div className="text-sm font-medium text-ink">{a.title}</div>
        <div className="text-xs text-ink-mute mt-0.5">{a.detail}</div>
      </div>
      <Tag tone={tone}>{u.text}</Tag>
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  const schoolTasks = useStore((s) => s.schoolTasks);
  const toggle = useStore((s) => s.toggleSchoolTask);
  const checked = schoolTasks[task.id] ?? task.defaultDone ?? false;
  const u = task.due ? urgencyLabel(task.due) : null;
  const tone: "red" | "amber" | "lime" | "neutral" = !u ? "neutral"
    : u.tone === "red" ? "red"
    : u.tone === "amber" ? "amber"
    : u.tone === "lime" ? "lime"
    : "neutral";
  const accent = task.priority === "critical" ? "red" : task.priority === "high" ? "amber" : "lime";

  return (
    <Row onClick={() => toggle(task.id)} className="flex items-start gap-3 py-2.5 group">
      <Checkbox checked={checked} onChange={() => toggle(task.id)} accent={accent} size="sm" />
      <div className="flex-1 min-w-0">
        <div className={cn("text-sm flex items-center gap-2 flex-wrap", checked ? "text-ink-mute line-through" : "text-ink-dim group-hover:text-ink")}>
          {task.title}
          {u && <Tag tone={tone} size="sm">{u.text}</Tag>}
        </div>
        {task.details && <div className="text-xs text-ink-mute mt-1 leading-relaxed">{task.details}</div>}
      </div>
    </Row>
  );
}
