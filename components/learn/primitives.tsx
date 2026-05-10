"use client";

// Design primitives for the /learn course shell. These are intentionally
// separate from the global `components/ui/` set so the rest of the app
// keeps its existing look and the new course gets a fresh, modern voice.
//
// Two modes:
// - Default (dark): used on dashboards, unit pages, practice index.
// - Light: scoped via the `learn-light` class on a wrapper. Used inside
//   the lesson player for long-form readability.
//
// Both modes share the same component API. Light overrides happen via
// CSS variables defined in globals.css.

import { cn } from "@/lib/utils/cn";
import { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ArrowUpRight, Check, Lock } from "lucide-react";

// ──────────────────────────────────────────────────────────────────────
// Page chrome
// ──────────────────────────────────────────────────────────────────────

export function LearnPage({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn(light && "learn-light min-h-screen", className)}>
      <div className={cn("mx-auto px-5 lg:px-8 pt-7 lg:pt-12 pb-20", light ? "max-w-3xl" : "max-w-5xl")}>
        {children}
      </div>
    </div>
  );
}

export function LearnHeader({
  kicker,
  title,
  subtitle,
  right,
  back,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <header className="mb-10">
      {back && (
        <Link
          href={back.href}
          className="inline-flex items-center gap-1.5 text-sm text-ink-mute hover:text-ink mb-5 transition-colors learn-light:text-[var(--learn-ink-mute)] learn-light:hover:text-[var(--learn-ink)]"
        >
          <ArrowLeft size={14} /> {back.label}
        </Link>
      )}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          {kicker && (
            <div className="text-sm font-medium text-accent-blue mb-2 learn-light:text-[var(--learn-accent)]">
              {kicker}
            </div>
          )}
          <h1 className="text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.1]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base text-ink-dim max-w-2xl leading-relaxed learn-light:text-[var(--learn-ink-dim)]">
              {subtitle}
            </p>
          )}
        </div>
        {right && <div className="shrink-0 mt-1">{right}</div>}
      </div>
    </header>
  );
}

export function LearnSection({
  title,
  hint,
  children,
  className,
}: {
  title?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mt-10 first:mt-0", className)}>
      {(title || hint) && (
        <div className="flex items-baseline justify-between gap-3 mb-5">
          {title && <h2 className="text-lg font-semibold tracking-tight">{title}</h2>}
          {hint && <span className="text-sm text-ink-mute learn-light:text-[var(--learn-ink-mute)]">{hint}</span>}
        </div>
      )}
      {children}
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Cards & rows
// ──────────────────────────────────────────────────────────────────────

export const LearnCard = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl bg-bg-surface border border-line p-6 transition-colors",
        "learn-light:bg-[var(--learn-surface)] learn-light:border-[var(--learn-line)] learn-light:shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        className
      )}
      {...props}
    />
  ),
);
LearnCard.displayName = "LearnCard";

export function LearnLinkCard({
  href,
  title,
  description,
  meta,
  state = "open",
  external = false,
  className,
}: {
  href: string;
  title: string;
  description?: string;
  meta?: string;
  state?: "open" | "active" | "done" | "locked";
  external?: boolean;
  className?: string;
}) {
  const stateClass = {
    open: "border-line hover:border-line-strong learn-light:border-[var(--learn-line)] learn-light:hover:border-[var(--learn-line-strong)]",
    active: "border-accent-blue/40 bg-accent-blue/[0.04] learn-light:border-[var(--learn-accent-line)] learn-light:bg-[var(--learn-accent-soft)]",
    done: "border-accent-lime/30 bg-accent-lime/[0.04] learn-light:bg-emerald-50 learn-light:border-emerald-200",
    locked: "border-line opacity-60 cursor-not-allowed",
  }[state];

  const Icon = state === "done" ? Check : state === "locked" ? Lock : (external ? ArrowUpRight : ArrowRight);

  const content = (
    <div
      className={cn(
        "group rounded-2xl border bg-bg-surface px-5 py-5 transition-colors learn-light:bg-[var(--learn-surface)]",
        stateClass,
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base text-ink learn-light:text-[var(--learn-ink)]">{title}</div>
          {description && (
            <div className="mt-1 text-sm text-ink-dim learn-light:text-[var(--learn-ink-dim)] leading-relaxed">
              {description}
            </div>
          )}
          {meta && (
            <div className="mt-3 text-xs text-ink-mute learn-light:text-[var(--learn-ink-mute)]">
              {meta}
            </div>
          )}
        </div>
        <Icon
          size={18}
          className={cn(
            "shrink-0 mt-0.5 transition-colors",
            state === "done"
              ? "text-accent-lime learn-light:text-emerald-700"
              : state === "locked"
              ? "text-ink-ghost"
              : "text-ink-mute group-hover:text-ink learn-light:text-[var(--learn-ink-mute)] learn-light:group-hover:text-[var(--learn-ink)]",
          )}
        />
      </div>
    </div>
  );

  if (state === "locked") return content;
  return <Link href={href}>{content}</Link>;
}

// ──────────────────────────────────────────────────────────────────────
// Indicators
// ──────────────────────────────────────────────────────────────────────

export function LearnProgress({
  value,
  max = 100,
  showLabel = false,
  className,
}: {
  value: number;
  max?: number;
  showLabel?: boolean;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex-1 h-[3px] rounded-full bg-line overflow-hidden learn-light:bg-[var(--learn-line)]">
        <div
          className="h-full bg-accent-blue transition-all duration-500 learn-light:bg-[var(--learn-accent)]"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-ink-dim tabular-nums learn-light:text-[var(--learn-ink-dim)]">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}

export function LearnPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    neutral: "bg-bg-elevated text-ink-dim border-line learn-light:bg-[var(--learn-elevated)] learn-light:text-[var(--learn-ink-dim)] learn-light:border-[var(--learn-line)]",
    accent: "bg-accent-blue/10 text-accent-blue border-accent-blue/20 learn-light:bg-[var(--learn-accent-soft)] learn-light:text-[var(--learn-accent)] learn-light:border-[var(--learn-accent-line)]",
    success: "bg-accent-lime/10 text-accent-lime border-accent-lime/20 learn-light:bg-emerald-50 learn-light:text-emerald-700 learn-light:border-emerald-200",
    warning: "bg-accent-amber/10 text-accent-amber border-accent-amber/20 learn-light:bg-amber-50 learn-light:text-amber-700 learn-light:border-amber-200",
    danger: "bg-accent-red/10 text-accent-red border-accent-red/20 learn-light:bg-red-50 learn-light:text-red-700 learn-light:border-red-200",
  }[tone];

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium", toneClass)}>
      {children}
    </span>
  );
}

export function LearnStat({
  label,
  value,
  hint,
  emphasis = "default",
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  emphasis?: "default" | "accent" | "warning";
  className?: string;
}) {
  const valueClass = {
    default: "text-ink learn-light:text-[var(--learn-ink)]",
    accent: "text-accent-blue learn-light:text-[var(--learn-accent)]",
    warning: "text-accent-amber learn-light:text-[var(--learn-warning)]",
  }[emphasis];

  return (
    <div
      className={cn(
        "rounded-xl bg-bg-surface border border-line px-4 py-4 learn-light:bg-[var(--learn-surface)] learn-light:border-[var(--learn-line)]",
        className,
      )}
    >
      <div className="text-xs font-medium text-ink-mute learn-light:text-[var(--learn-ink-mute)]">{label}</div>
      <div className={cn("mt-2 text-2xl font-semibold tracking-tight tabular-nums", valueClass)}>{value}</div>
      {hint && <div className="mt-1 text-xs text-ink-mute learn-light:text-[var(--learn-ink-mute)]">{hint}</div>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Buttons
// ──────────────────────────────────────────────────────────────────────

export function LearnButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}) {
  const variantClass = {
    primary:
      "bg-accent-blue text-white hover:bg-accent-blue/90 disabled:bg-line disabled:text-ink-mute" +
      " learn-light:bg-[var(--learn-accent)] learn-light:hover:bg-[#4338CA] learn-light:disabled:bg-[var(--learn-line)] learn-light:disabled:text-[var(--learn-ink-mute)]",
    secondary:
      "bg-bg-elevated text-ink border border-line hover:border-line-strong" +
      " learn-light:bg-[var(--learn-surface)] learn-light:text-[var(--learn-ink)] learn-light:border-[var(--learn-line-strong)] learn-light:hover:bg-[var(--learn-elevated)]",
    ghost:
      "text-ink-dim hover:text-ink hover:bg-bg-elevated/50" +
      " learn-light:text-[var(--learn-ink-dim)] learn-light:hover:text-[var(--learn-ink)] learn-light:hover:bg-[var(--learn-elevated)]",
  }[variant];
  const sizeClass = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  }[size];

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed",
        variantClass,
        sizeClass,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
