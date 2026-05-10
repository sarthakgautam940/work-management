"use client";

import { LearnPage, LearnHeader, LearnCard, LearnPill } from "@/components/learn/primitives";
import { Wrench } from "lucide-react";

export default function FormulasStub() {
  return (
    <LearnPage>
      <LearnHeader
        kicker="Formulas"
        title="The 88-item reference"
        subtitle="Every formula and identity from the source. Browsable index, single-card focus mode, and full flashcard drill mode."
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
              Every formula on the source sheet becomes a flashcard. Self-rated mastery feeds the spaced-rep schedule.
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
