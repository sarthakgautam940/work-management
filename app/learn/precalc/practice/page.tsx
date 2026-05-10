"use client";

import { LearnPage, LearnHeader, LearnCard, LearnPill } from "@/components/learn/primitives";
import { Wrench } from "lucide-react";

export default function PracticeStub() {
  return (
    <LearnPage>
      <LearnHeader
        kicker="Practice"
        title="Practice bank"
        subtitle="68 worked exam problems from Math Medic + College Board preview, filterable by unit, topic, section, and difficulty."
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
      />
      <LearnCard>
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0">
            <Wrench size={18} className="text-ink-dim" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base text-ink">Coming in PR I</div>
            <p className="mt-1.5 text-sm text-ink-dim leading-relaxed">
              Each problem renders as a card with the prompt, a try-then-reveal solution shown as a stepped beat sequence (same engine as lessons), and tags routing back into the lesson it teaches. Misses get flagged into the spaced-rep deck.
            </p>
            <div className="mt-4">
              <LearnPill tone="warning">Coming in PR I</LearnPill>
            </div>
          </div>
        </div>
      </LearnCard>
    </LearnPage>
  );
}
