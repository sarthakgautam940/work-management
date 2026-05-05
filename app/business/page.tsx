"use client";

import { useEffect, useState } from "react";
import { Card, Eyebrow, Meta, Section, Tag, Checkbox, ProgressBar, Stat, Button, Input, PageHeader, TabBar, Row, Divider } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  UPLEVEL_GOALS, PRICING_TIERS, ACTIVE_BUILDS, OUTREACH_STATUS, PHASE_1_PRIORITIES,
} from "@/lib/data/business";
import { todayKey } from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";

type View = "overview" | "pipeline" | "builds" | "outreach";
const VIEWS: readonly View[] = ["overview", "pipeline", "builds", "outreach"] as const;

export default function BusinessPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <BusinessInner />;
}

function BusinessInner() {
  const [view, setView] = useState<View>("overview");
  const monthlyRevenue = useStore((s) => s.monthlyRevenue);
  const currentMonth = todayKey().slice(0, 7);
  const thisMonth = monthlyRevenue[currentMonth] || 0;
  const cumulative = Object.values(monthlyRevenue).reduce((s, v) => s + v, 0);
  const goalPct = (thisMonth / UPLEVEL_GOALS.mrrTarget) * 100;

  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader
        eyebrow="UpLevel Services LLC"
        title="UpLevel"
        subtitle="Premium agency for luxury service businesses. Solo. 12–15 clients ever."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-9">
        <Stat label="MRR target" value="$50K" hint="90 days" />
        <Stat label="This month" value={`$${(thisMonth / 1000).toFixed(1)}K`} hint={`${Math.round(goalPct)}% of goal`} accent={goalPct > 50 ? "lime" : "amber"} />
        <Stat label="Cumulative" value={`$${(cumulative / 1000).toFixed(1)}K`} hint="of $600K" />
        <Stat label="Active builds" value={ACTIVE_BUILDS.length.toString()} hint={`Max ${UPLEVEL_GOALS.maxClients}`} />
      </div>

      <TabBar value={view} onChange={setView} options={VIEWS} />

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
      <Section eyebrow="Pricing — locked">
        <Card className="px-5 py-2">
          {PRICING_TIERS.map((t, i) => (
            <div key={t.id} className={cn("flex items-center justify-between py-3.5", i < PRICING_TIERS.length - 1 && "border-b border-line")}>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Meta>{t.id.toUpperCase()}</Meta>
                  <span className="text-sm font-medium">{t.label}</span>
                </div>
                <div className="text-xs text-ink-mute mt-1">{t.note}</div>
              </div>
              <div className="text-right shrink-0 pl-4">
                <div className="text-sm font-mono tabular-nums text-ink">${(t.oneTime / 1000).toFixed(0)}K</div>
                <div className="text-2xs text-ink-mute font-mono">+ ${(t.monthly / 1000).toFixed(1)}K/mo</div>
              </div>
            </div>
          ))}
        </Card>
      </Section>

      <Section eyebrow="Log this month's revenue" hint={currentMonth}>
        <Card className="p-5">
          <div className="flex gap-2">
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
        </Card>
      </Section>

      <Section eyebrow="Phase 1 priorities">
        <Card className="px-5 py-2">
          {PHASE_1_PRIORITIES.map((p, i) => {
            const done = uplevelTasks[p.id] ?? p.done ?? false;
            return (
              <Row
                key={p.id}
                onClick={() => toggleTask(p.id)}
                className={cn(
                  "flex items-start gap-3.5 py-3.5",
                  i < PHASE_1_PRIORITIES.length - 1 && "border-b border-line"
                )}
              >
                <Checkbox checked={done} onChange={() => toggleTask(p.id)} accent={p.urgent ? "red" : "amber"} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className={cn("text-sm flex items-center gap-2 flex-wrap", done && "line-through text-ink-mute")}>
                    {p.label}
                    {p.urgent && !done && <Tag tone="red" size="sm">Urgent</Tag>}
                  </div>
                  <div className="text-xs text-ink-mute mt-1">{p.detail}</div>
                </div>
              </Row>
            );
          })}
        </Card>
      </Section>
    </>
  );
}

function PipelineView() {
  const leadStatuses = useStore((s) => s.leadStatuses);
  const setLeadStatus = useStore((s) => s.setLeadStatus);

  const statuses = ["new", "contacted", "responded", "call-booked", "closed-won", "closed-lost"] as const;
  const counts = statuses.reduce((acc, s) => ({ ...acc, [s]: 0 }), {} as Record<string, number>);
  Object.values(leadStatuses).forEach((s) => { counts[s] = (counts[s] || 0) + 1; });
  const total = Object.values(counts).reduce((s, v) => s + v, 0);

  return (
    <>
      <Section eyebrow="Pipeline" hint={`${total} leads tracked`}>
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
            {statuses.map((s) => (
              <div key={s} className="flex items-center justify-between">
                <Meta>{s.replace("-", " ")}</Meta>
                <span className="font-mono text-sm tabular-nums text-ink">{counts[s] || 0}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="Quick log" hint="Tap to record an event">
        <div className="grid grid-cols-3 gap-2">
          <Button variant="secondary" size="sm" onClick={() => setLeadStatus(`L${Date.now()}`, "new")}>+ New</Button>
          <Button variant="secondary" size="sm" onClick={() => setLeadStatus(`L${Date.now()}`, "contacted")}>+ Contacted</Button>
          <Button variant="secondary" size="sm" onClick={() => setLeadStatus(`L${Date.now()}`, "call-booked")}>+ Call booked</Button>
        </div>
        <p className="text-xs text-ink-mute mt-3 leading-relaxed">
          Real lead names live in APEX_LEADS_V3 — import flow lands in v2. For now log status changes manually.
        </p>
      </Section>
    </>
  );
}

function BuildsView() {
  return (
    <>
      <Section eyebrow="Active builds">
        <div className="space-y-2">
          {ACTIVE_BUILDS.map((b) => {
            const tier = PRICING_TIERS.find((t) => t.id === b.tier);
            return (
              <Card key={b.id} className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <div className="font-medium text-base">{b.client}</div>
                    <div className="text-xs text-ink-mute mt-0.5">
                      {tier?.label} · ${(tier?.oneTime || 0) / 1000}K + ${(tier?.monthly || 0) / 1000}K/mo
                    </div>
                  </div>
                  <span className="font-mono text-sm tabular-nums text-ink">{b.progress}%</span>
                </div>
                <ProgressBar value={b.progress} accent="lime" />
                <div className="text-xs text-ink-mute mt-3">{b.phase}</div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Capacity">
        <Card className="p-5">
          <div className="flex items-baseline gap-3 flex-wrap">
            <div className="text-3xl font-bold tracking-tightest tabular-nums">
              {UPLEVEL_GOALS.maxClients - ACTIVE_BUILDS.length}
            </div>
            <div className="text-xs text-ink-mute">slots remaining</div>
          </div>
          <p className="text-xs text-ink-mute mt-3 leading-relaxed">
            Solo capacity: 12–15 clients ever. Premium positioning protected by scarcity.
          </p>
        </Card>
      </Section>
    </>
  );
}

function OutreachView() {
  const cadence = [
    { day: "D1", title: "Specific opener", detail: "Niche-calibrated, mentions a specific signal observed on their site." },
    { day: "D4", title: "Value drop", detail: "Send something useful (audit clip, case study, idea). No ask." },
    { day: "D8", title: "Soft close", detail: "\"Worth 15 min next week?\" Then break the chain." },
  ];

  return (
    <>
      <Section eyebrow="Cold outreach">
        <Card className="p-5 space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-ink-mute">Domain</span><span className="font-mono text-xs text-ink">{OUTREACH_STATUS.domain}</span></div>
          <Divider />
          <div className="flex justify-between"><span className="text-ink-mute">Warmup window</span><span className="font-mono text-xs text-ink">{OUTREACH_STATUS.warmupStart} → {OUTREACH_STATUS.warmupEnd}</span></div>
          <Divider />
          <div className="flex justify-between"><span className="text-ink-mute">Campaign live</span><span className="font-mono text-xs text-accent-lime">since {OUTREACH_STATUS.campaignStart}</span></div>
        </Card>
      </Section>

      <Section eyebrow="3-email cadence">
        <Card className="px-5 py-2">
          {cadence.map((c, i) => (
            <div key={c.day} className={cn("flex items-start gap-4 py-4", i < cadence.length - 1 && "border-b border-line")}>
              <div className="font-mono text-2xs tracking-[0.18em] text-ink-mute pt-px w-7 shrink-0">{c.day}</div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-ink">{c.title}</div>
                <div className="text-xs text-ink-mute mt-0.5 leading-relaxed">{c.detail}</div>
              </div>
            </div>
          ))}
        </Card>
      </Section>
    </>
  );
}
