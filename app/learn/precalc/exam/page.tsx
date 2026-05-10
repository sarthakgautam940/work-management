"use client";

import { LearnPage, LearnHeader, LearnCard, LearnPill } from "@/components/learn/primitives";
import { Wrench } from "lucide-react";

export default function ExamStub() {
  return (
    <LearnPage>
      <LearnHeader
        kicker="Mock exam"
        title="Timed sections"
        subtitle="Run a section under official AP timing — Section IA (28 MCQ, 80 min, no calc), IB (12 MCQ, 40 min, calc), IIA (2 FRQ, 30 min, calc), IIB (2 FRQ, 30 min, no calc) — or take the full 3-hour mock."
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
      />
      <LearnCard>
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0">
            <Wrench size={18} className="text-ink-dim" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base text-ink">Coming in PR K</div>
            <p className="mt-1.5 text-sm text-ink-dim leading-relaxed">
              Mock exam ships last — needs the practice bank in place to draw from. Misses route into spaced-rep automatically. Score reports against the AP curve.
            </p>
            <div className="mt-4">
              <LearnPill tone="warning">Coming in PR K</LearnPill>
            </div>
          </div>
        </div>
      </LearnCard>
    </LearnPage>
  );
}
