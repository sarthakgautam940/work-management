"use client";

import { cn } from "@/lib/utils/cn";
import { forwardRef } from "react";

type Accent = "lime" | "blue" | "amber" | "violet" | "red" | "orange" | "emerald" | "rose" | "neutral";

const accentText: Record<Accent, string> = {
  lime: "text-accent-lime",
  blue: "text-accent-blue",
  amber: "text-accent-amber",
  violet: "text-accent-violet",
  red: "text-accent-red",
  orange: "text-accent-orange",
  emerald: "text-accent-emerald",
  rose: "text-accent-rose",
  neutral: "text-ink-dim",
};

const accentBg: Record<Accent, string> = {
  lime: "bg-accent-lime",
  blue: "bg-accent-blue",
  amber: "bg-accent-amber",
  violet: "bg-accent-violet",
  red: "bg-accent-red",
  orange: "bg-accent-orange",
  emerald: "bg-accent-emerald",
  rose: "bg-accent-rose",
  neutral: "bg-line-strong",
};

const accentBgSoft: Record<Accent, string> = {
  lime: "bg-accent-lime/10",
  blue: "bg-accent-blue/10",
  amber: "bg-accent-amber/10",
  violet: "bg-accent-violet/10",
  red: "bg-accent-red/10",
  orange: "bg-accent-orange/10",
  emerald: "bg-accent-emerald/10",
  rose: "bg-accent-rose/10",
  neutral: "bg-bg-elevated",
};

const accentBorder: Record<Accent, string> = {
  lime: "border-accent-lime/30",
  blue: "border-accent-blue/30",
  amber: "border-accent-amber/30",
  violet: "border-accent-violet/30",
  red: "border-accent-red/30",
  orange: "border-accent-orange/30",
  emerald: "border-accent-emerald/30",
  rose: "border-accent-rose/30",
  neutral: "border-line",
};

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-2xl bg-bg-surface border border-line", className)} {...props} />
  )
);
Card.displayName = "Card";

export function Eyebrow({ children, className, accent }: { children: React.ReactNode; className?: string; accent?: Accent }) {
  return (
    <div className={cn(
      "font-mono text-2xs tracking-[0.2em] uppercase",
      accent ? accentText[accent] : "text-ink-mute",
      className
    )}>
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  accent = "lime",
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: Accent;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl bg-bg-elevated border border-line p-4", className)}>
      <Eyebrow>{label}</Eyebrow>
      <div className={cn("mt-2 text-2xl font-bold tracking-tightest tabular-nums", accentText[accent])}>{value}</div>
      {hint && <div className="text-xs text-ink-mute mt-1">{hint}</div>}
    </div>
  );
}

export function ProgressBar({
  value,
  max = 100,
  accent = "lime",
  className,
}: {
  value: number;
  max?: number;
  accent?: Accent;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("h-1 rounded-full bg-line overflow-hidden", className)}>
      <div
        className={cn("h-full transition-all duration-500 ease-out", accentBg[accent])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Checkbox({
  checked,
  onChange,
  accent = "lime",
  size = "md",
}: {
  checked: boolean;
  onChange: () => void;
  accent?: Accent;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        sizeClass,
        "rounded shrink-0 flex items-center justify-center border-[1.5px] transition-all",
        checked ? `${accentBorder[accent]} ${accentBg[accent]}` : "border-line-strong bg-transparent"
      )}
      aria-checked={checked}
      role="checkbox"
    >
      {checked && (
        <svg width={size === "sm" ? "9" : "11"} height={size === "sm" ? "9" : "11"} viewBox="0 0 11 11" fill="none">
          <path d="M2 5.5L4.5 8L9 3" stroke="#0A0A0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  const variantClass = {
    primary: "bg-accent-lime text-bg hover:bg-accent-lime/90",
    secondary: "bg-bg-elevated text-ink hover:bg-line border border-line",
    ghost: "text-ink-dim hover:text-ink hover:bg-bg-elevated/40",
    danger: "bg-accent-red/10 text-accent-red border border-accent-red/30 hover:bg-accent-red/20",
  }[variant];
  const sizeClass = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  }[size];
  return (
    <button className={cn("rounded-lg font-medium transition-all", variantClass, sizeClass, className)} {...props}>
      {children}
    </button>
  );
}

export function Tag({
  children,
  accent = "neutral",
  size = "md",
}: {
  children: React.ReactNode;
  accent?: Accent;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border font-mono tracking-wider uppercase",
        size === "sm" ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]",
        accentBgSoft[accent],
        accentText[accent],
        accentBorder[accent]
      )}
    >
      {children}
    </span>
  );
}

export function Field({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && <Eyebrow className="mb-1.5">{label}</Eyebrow>}
      {children}
    </div>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2.5 rounded-lg bg-bg-elevated border border-line text-ink",
        "placeholder:text-ink-mute focus:outline-none focus:border-accent-lime/50 focus:ring-1 focus:ring-accent-lime/20",
        "transition-colors text-base lg:text-sm",
        className
      )}
      {...props}
    />
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-line", className)} />;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  accent,
  right,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accent?: Accent;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && <Eyebrow accent={accent}>{eyebrow}</Eyebrow>}
          <h1 className="mt-2 text-3xl lg:text-4xl font-bold tracking-tightest">{title}</h1>
          {subtitle && <p className="mt-2 text-ink-dim text-sm max-w-xl">{subtitle}</p>}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </div>
  );
}
