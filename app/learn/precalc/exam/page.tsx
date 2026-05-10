"use client";

import Link from "next/link";
import { LearnPage, LearnHeader, LearnCard, LearnPill, LearnButton } from "@/components/learn/primitives";
import { SECTIONS } from "@/lib/learn/exam";
import { Calculator, Clock, ArrowRight } from "lucide-react";

export default function ExamPickerPage() {
  return (
    <LearnPage>
      <LearnHeader
        kicker="Mock exam"
        title="Pick a section"
        subtitle="Run a single section under official AP timing. No feedback during — score and review at the end."
        back={{ href: "/learn/precalc", label: "Precalc dashboard" }}
      />

      <div className="grid gap-3">
        {SECTIONS.map((section) => (
          <Link key={section.id} href={`/learn/precalc/exam/${section.id}`} className="block group">
            <LearnCard className="hover:border-line-strong transition-colors">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0 font-mono text-base font-bold text-ink">
                  {section.shortLabel}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-lg font-semibold text-ink">{section.label}</h3>
                    <LearnPill tone={section.type === "mcq" ? "accent" : "warning"}>
                      {section.count} {section.type.toUpperCase()}
                    </LearnPill>
                    <LearnPill tone="neutral"><Clock size={10} /> {section.minutes} min</LearnPill>
                    {section.calc && <LearnPill tone="neutral"><Calculator size={10} /> calc</LearnPill>}
                    {!section.calc && <LearnPill tone="neutral">no calc</LearnPill>}
                  </div>
                  <p className="text-sm text-ink-dim leading-relaxed">{section.description}</p>
                </div>
                <ArrowRight size={18} className="text-ink-mute group-hover:text-ink shrink-0 mt-2 transition-colors" />
              </div>
            </LearnCard>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <p className="text-sm text-ink-mute">
          Mock-exam scoring approximates the College Board curve. 78%+ ≈ 5. 62%+ ≈ 4. 48%+ ≈ 3.
        </p>
      </div>
    </LearnPage>
  );
}
