"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LearnPage, LearnHeader, LearnLinkCard, LearnSection } from "@/components/learn/primitives";
import { PRECALC, courseTotals } from "@/lib/learn/course";
import { useStore } from "@/lib/store";
import { daysUntil } from "@/lib/utils/date";

export default function LearnIndexPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Inner />;
}

function Inner() {
  const lessonsDone = useStore((s) => s.learnLessonDone);
  const totals = courseTotals();
  const completed = Object.keys(lessonsDone).length;
  const days = daysUntil(PRECALC.examDate);

  return (
    <LearnPage>
      <LearnHeader
        kicker="Learn"
        title="Courses"
        subtitle="Long-form, interactive study paths. Built around walkthroughs and live artifacts, not paragraph dumps."
      />

      <LearnSection title="Active">
        <LearnLinkCard
          href="/learn/precalc"
          title={PRECALC.label}
          description={`${totals.units} units · ${totals.topics} topics · ${totals.lessons} lessons. The exam is ${days} day${days === 1 ? "" : "s"} away.`}
          meta={`${completed} / ${totals.lessons} lessons complete`}
          state={completed === totals.lessons ? "done" : completed > 0 ? "active" : "open"}
        />
      </LearnSection>

      <div className="mt-12">
        <p className="text-sm text-ink-mute">
          More courses appear here when you start them.{" "}
          <Link href="/ap" className="underline hover:text-ink">Daily plan →</Link>
        </p>
      </div>
    </LearnPage>
  );
}
