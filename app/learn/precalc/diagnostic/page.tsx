"use client";

import { LearnPage, LearnHeader, LearnCard, LearnPill } from "@/components/learn/primitives";
import { Wrench } from "lucide-react";

export default function DiagnosticStub() {
  return (
    <LearnPage>
      <LearnHeader
        kicker="Diagnostic"
        title="Color the path"
        subtitle="12 questions, 4 per unit. Result: each unit is tagged red, amber, or green so the dashboard knows where to push you first."
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
      />
      <LearnCard>
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0">
            <Wrench size={18} className="text-ink-dim" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base text-ink">Coming in PR F</div>
            <p className="mt-1.5 text-sm text-ink-dim leading-relaxed">
              The diagnostic ships with Unit 1 content. Same proven UX as the macro diagnostic — single-question MCQs, tracked unit-by-unit, results write to the dashboard.
            </p>
            <div className="mt-4">
              <LearnPill tone="warning">Coming in PR F</LearnPill>
            </div>
          </div>
        </div>
      </LearnCard>
    </LearnPage>
  );
}
