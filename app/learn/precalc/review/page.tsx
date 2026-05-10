"use client";

import { LearnPage, LearnHeader, LearnCard, LearnPill } from "@/components/learn/primitives";
import { Wrench } from "lucide-react";

export default function ReviewStub() {
  return (
    <LearnPage>
      <LearnHeader
        kicker="Spaced review"
        title="Surface what's slipping"
        subtitle="Formulas + flagged misses on a schedule. SM-2-lite — rate again / hard / good / easy and the next interval adapts."
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
      />
      <LearnCard>
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0">
            <Wrench size={18} className="text-ink-dim" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base text-ink">Coming in PR J</div>
            <p className="mt-1.5 text-sm text-ink-dim leading-relaxed">
              All 88 formula-sheet items become cards. Plus every checkpoint MCQ you miss + every flagged practice problem. Cards also surface as `recall` beats inside future lessons.
            </p>
            <div className="mt-4">
              <LearnPill tone="warning">Coming in PR J</LearnPill>
            </div>
          </div>
        </div>
      </LearnCard>
    </LearnPage>
  );
}
