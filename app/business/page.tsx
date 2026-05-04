"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, ProgressBar, Checkbox, Tag, PageHeader, Stat, Button, Input } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  UPLEVEL_GOALS, PRICING_TIERS, ACTIVE_BUILDS, OUTREACH_STATUS, PHASE_1_PRIORITIES,
} from "@/lib/data/business";
import { todayKey } from "@/lib/utils/date";
import { ChevronDown, TrendingUp, Plus, Target } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type View = "overview" | "pipeline" | "builds" | "outreach";

export default function BusinessPage() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("overview");
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const monthlyRevenue = useStore((s) => s.monthlyRevenue);
  const currentMonth = todayKey().slice(0, 7);
  const thisMonth = monthlyRevenue[currentMonth] || 0;
  const cumulative = Object.values(monthlyRevenue).reduce((s, v) => s + v, 0);
  const goalPct = (thisMonth / UPLEVEL_GOALS.mrrTarget) * 100;

  return (
    <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-3xl pb-10">
      <PageHeader
        eyebrow="UpLevel Services LLC"
        title="UpLevel"
        subtitle="Premium agency for luxury service businesses. Solo. 12–15 max."
        accent="violet"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="MRR target" value="$50K" hint="90 days" accent="violet" />
        <Stat label="This month" value={`$${(thisMonth / 1000).toFixed(1)}K`} hint={`${Math.round(goalPct)}% of goal`} accent={goalPct > 50 ? "lime" : "amber"} />
        <Stat label="Cumulative" value={`$${(cumulative / 1000).toFixed(1)}K`} hint="of $600K" accent="violet" />
        <Stat label="Active builds" value={ACTIVE_BUILDS.length.toString()} hint={`Max ${UPLEVEL_GOALS.maxClients}`} accent="lime" />
      </div>

      <div className="grid grid-cols-4 gap-1 mb-6 p-1 rounded-xl bg-bg-surface border border-line">
        {(["overview", "pipeline", "builds", "outreach"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "py-2 rounded-lg font-mono text-2xs tracking-wider uppercase transition-all",
              view === v ? "bg-bg-elevated text-ink" : "text-ink-mute hover:text-ink"
            )}
          >
            {v}
          </button>
        ))}
      </div>

      {view === "overview" && <OverviewView />}
      {view === "pipeline" && <PipelineView />}
      {view === "builds" && <BuildsView />}
      {view === "outreach" && <OutreachView />}
    </div>
  );
}

function OverviewView() {
  const monthlyRevenue = useStore((s) => s.monthlyRevenue);
  const setMonthlyRevenue = useStore((s) => s.setMonthlyRevenue);
  const uplevelTasks = useStore((s) => s.uplevelTasks);
  const toggleTask = useStore((s) => s.toggleUplevelTask);
  const currentMonth = todayKey().slice(0, 7);
  const [revenueInput, setRevenueInput] = useState(String(monthlyRevenue[currentMonth] || ""));

  return (
    <>
      <Card className="p-4 mb-4">
        <Eyebrow accent="violet">Pricing — locked</Eyebrow>
        <div className="mt-3 space-y-2">
          {PRICING_TIERS.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-2 border-b border-line last:border-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-ink-ghost">{t.id.toUpperCase()}</span>
                  <span className="text-sm font-medium">{t.label}</span>
                </div>
                <div className="text-2xs text-ink-mute mt-0.5">{t.note}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-mono tabular-nums">${(t.oneTime / 1000).toFixed(0)}K</div>
                <div className="text-2xs text-ink-mute font-mono">+ ${(t.monthly / 1000).toFixed(1)}K/mo</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 mb-4">
        <Eyebrow accent="lime">Log this month's revenue</Eyebrow>
        <div className="mt-3 flex gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="0"
            value={revenueInput}
            onChange={(e) => setRevenueInput(e.target.value)}
          />
          <Button variant="primary" onClick={() => setMonthlyRevenue(currentMonth, parseInt(revenueInput) || 0)}>
            Save
          </Button>
        </div>
        <div className="text-2xs text-ink-mute mt-2 font-mono">Month: {currentMonth}</div>
      </Card>

      <Card className="p-4">
        <Eyebrow accent="amber">Phase 1 priorities</Eyebrow>
        <div className="mt-3 space-y-1">
          {PHASE_1_PRIORITIES.map((p) => {
            const done = uplevelTasks[p.id] ?? p.done ?? false;
            return (
              <button key={p.id} onClick={() => toggleTask(p.id)} className="w-full flex items-start gap-3 py-2 text-left group">
                <Checkbox checked={done} onChange={() => toggleTask(p.id)} accent={p.urgent ? "red" : "amber"} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className={cn("text-sm flex items-center gap-2 flex-wrap", done && "line-through text-ink-mute")}>
                    {p.label}
                    {p.urgent && !done && <Tag accent="red" size="sm">Urgent</Tag>}
                  </div>
                  <div className="text-2xs text-ink-mute mt-0.5">{p.detail}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </>
  );
}

function PipelineView() {
  const leadStatuses = useStore((s) => s.leadStatuses);
  const setLeadStatus = useStore((s) => s.setLeadStatus);

  // Status counts
  const statuses = ["new", "contacted", "responded", "call-booked", "closed-won", "closed-lost"] as const;
  const counts = statuses.reduce((acc, s) => ({ ...acc, [s]: 0 }), {} as Record<string, number>);
  Object.values(leadStatuses).forEach((s) => { counts[s] = (counts[s] || 0) + 1; });
  const total = Object.values(counts).reduce((s, v) => s + v, 0);

  return (
    <>
      <Card className="p-4 mb-4">
        <Eyebrow>Pipeline status</Eyebrow>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {statuses.map((s) => (
            <div key={s} className="flex items-center justify-between p-2 rounded-lg bg-bg-elevated">
              <span className="text-2xs font-mono uppercase tracking-wider text-ink-mute">{s.replace("-", " ")}</span>
              <span className="font-mono text-sm tabular-nums text-ink">{counts[s] || 0}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-2xs text-ink-mute font-mono">{total} leads tracked · 40 from APEX_LEADS_V3</div>
      </Card>

      <Card className="p-4 bg-amber-500/5 border-amber-500/20">
        <Eyebrow accent="amber">Add a lead</Eyebrow>
        <p className="text-xs text-ink-dim mt-2 leading-relaxed">
          To track all 40 leads from APEX_LEADS_V3, paste them in via the next iteration's import flow. For now, log status changes manually as deals move.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button onClick={() => setLeadStatus(`L${Date.now()}`, "new")} className="p-2 rounded bg-bg-elevated text-2xs font-mono text-accent-blue">+ NEW LEAD</button>
          <button onClick={() => setLeadStatus(`L${Date.now()}`, "contacted")} className="p-2 rounded bg-bg-elevated text-2xs font-mono text-accent-amber">+ CONTACTED</button>
          <button onClick={() => setLeadStatus(`L${Date.now()}`, "call-booked")} className="p-2 rounded bg-bg-elevated text-2xs font-mono text-accent-lime">+ CALL BOOKED</button>
        </div>
      </Card>
    </>
  );
}

function BuildsView() {
  return (
    <>
      <Eyebrow className="mb-3">Active builds</Eyebrow>
      <div className="space-y-2 mb-5">
        {ACTIVE_BUILDS.map((b) => {
          const tier = PRICING_TIERS.find((t) => t.id === b.tier);
          return (
            <Card key={b.id} className="p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <div className="font-medium text-base">{b.client}</div>
                  <div className="text-2xs text-ink-mute mt-0.5">{tier?.label} · ${(tier?.oneTime || 0) / 1000}K + ${(tier?.monthly || 0) / 1000}K/mo</div>
                </div>
                <Tag accent="lime" size="sm">{b.progress}%</Tag>
              </div>
              <ProgressBar value={b.progress} accent="lime" />
              <div className="text-2xs text-ink-mute mt-2">{b.phase}</div>
            </Card>
          );
        })}
      </div>
      <Card className="p-4 border-dashed">
        <div className="flex items-start gap-3">
          <Plus size={16} className="text-ink-mute mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-medium">Capacity</div>
            <p className="mt-1 text-2xs text-ink-mute leading-relaxed">
              {UPLEVEL_GOALS.maxClients - ACTIVE_BUILDS.length} slots remaining.
              Solo capacity: 12–15 clients ever. Premium positioning protected by scarcity.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}

function OutreachView() {
  return (
    <>
      <Card className="p-4 mb-4">
        <Eyebrow accent="lime">Cold outreach</Eyebrow>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-ink-mute">Domain</span><span className="font-mono text-xs">{OUTREACH_STATUS.domain}</span></div>
          <div className="flex justify-between"><span className="text-ink-mute">Warmup window</span><span className="font-mono text-xs">{OUTREACH_STATUS.warmupStart} → {OUTREACH_STATUS.warmupEnd}</span></div>
          <div className="flex justify-between"><span className="text-ink-mute">Campaign live</span><span className="font-mono text-xs text-accent-lime">since {OUTREACH_STATUS.campaignStart}</span></div>
        </div>
      </Card>

      <Card className="p-4">
        <Eyebrow>3-email cadence</Eyebrow>
        <div className="mt-3 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-mono text-xs text-accent-blue font-bold">D1</span>
            </div>
            <div>
              <div className="text-sm font-medium">Day 1 — Specific opener</div>
              <div className="text-2xs text-ink-mute mt-0.5">Niche-calibrated, mentions a specific signal observed on their site.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-accent-amber/10 border border-accent-amber/30 flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-mono text-xs text-accent-amber font-bold">D4</span>
            </div>
            <div>
              <div className="text-sm font-medium">Day 4 — Value drop</div>
              <div className="text-2xs text-ink-mute mt-0.5">Send something useful (audit clip, case study, idea). No ask.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-accent-lime/10 border border-accent-lime/30 flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-mono text-xs text-accent-lime font-bold">D8</span>
            </div>
            <div>
              <div className="text-sm font-medium">Day 8 — Soft close</div>
              <div className="text-2xs text-ink-mute mt-0.5">"Worth 15 min next week?" Then break the chain.</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
