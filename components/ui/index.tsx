"use client";

import { cn } from "@/lib/utils/cn";
import { forwardRef, KeyboardEvent } from "react";

export type Accent = "lime" | "blue" | "amber" | "violet" | "red" | "orange" | "emerald" | "rose" | "neutral";

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

const accentBorder: Record<Accent, string> = {
  lime: "border-accent-lime/40",
  blue: "border-accent-blue/40",
  amber: "border-accent-amber/40",
  violet: "border-accent-violet/40",
  red: "border-accent-red/40",
  orange: "border-accent-orange/40",
  emerald: "border-accent-emerald/40",
  rose: "border-accent-rose/40",
  neutral: "border-line-strong",
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
      "font-mono text-2xs tracking-[0.22em] uppercase",
      accent && accent !== "neutral" ? accentText[accent] : "text-ink-mute",
      className
    )}>
      {children}
    </div>
  );
}

// Subtle inline metadata. Replaces most uses of <Tag>.
// e.g. "07:30 · 5m" or "8h block" or "Phase 2"
export function Meta({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-2xs tracking-[0.12em] uppercase text-ink-mute", className)}>
      {children}
    </span>
  );
}

export function Stat({
  label,
  value,
  hint,
  accent = "neutral",
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: Accent;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl bg-bg-elevated/60 border border-line p-4", className)}>
      <Eyebrow>{label}</Eyebrow>
      <div className={cn(
        "mt-2 text-2xl font-bold tracking-tightest tabular-nums",
        accent === "neutral" ? "text-ink" : accentText[accent]
      )}>
        {value}
      </div>
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

// Checkbox with stopPropagation so clicks don't bubble to a parent row handler.
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
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      className={cn(
        sizeClass,
        "rounded shrink-0 flex items-center justify-center border-[1.5px] transition-colors",
        checked ? `${accentBorder[accent]} ${accentBg[accent]}` : "border-line-strong bg-transparent hover:border-ink-mute"
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
    primary: "bg-ink text-bg hover:bg-ink/90",
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
    <button className={cn("rounded-lg font-medium transition-colors", variantClass, sizeClass, className)} {...props}>
      {children}
    </button>
  );
}

// Tag is now reserved for STATE indicators only (Urgent, Today, Done, Overdue).
// Default visual is muted; only "danger" tones get color.
export function Tag({
  children,
  tone = "neutral",
  size = "md",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "red" | "amber" | "lime";
  size?: "sm" | "md";
}) {
  const tones = {
    neutral: "text-ink-mute border-line-strong",
    red: "text-accent-red border-accent-red/40",
    amber: "text-accent-amber border-accent-amber/40",
    lime: "text-accent-lime border-accent-lime/40",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded font-mono tracking-[0.12em] uppercase border bg-transparent",
        size === "sm" ? "px-1.5 py-px text-[9px]" : "px-1.5 py-0.5 text-[10px]",
        tones[tone]
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
        "placeholder:text-ink-mute focus:outline-none focus:border-ink-mute focus:ring-1 focus:ring-ink-mute/30",
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

// Row: clickable container that does NOT use a <button> element, so
// internal interactive children (Checkbox, etc) can nest safely.
export function Row({
  onClick,
  className,
  children,
  asButton = true,
  ...rest
}: {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  asButton?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">) {
  if (!asButton || !onClick) {
    return <div className={className} {...rest}>{children}</div>;
  }
  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKey}
      className={cn("cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-ink-mute/40", className)}
      {...rest}
    >
      {children}
    </div>
  );
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
    <div className="mb-9">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && <Eyebrow accent={accent}>{eyebrow}</Eyebrow>}
          <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tightest leading-[1.05]">{title}</h1>
          {subtitle && <p className="mt-3 text-ink-dim text-sm leading-relaxed max-w-xl">{subtitle}</p>}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </div>
  );
}

// Section: a typographic break within a page. Use when grouping cards.
export function Section({
  eyebrow,
  hint,
  children,
  className,
}: {
  eyebrow: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-9 first:mt-0", className)}>
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        {hint && <Meta>{hint}</Meta>}
      </div>
      {children}
    </div>
  );
}

// TabBar: cleaner than the old grid-of-pill setup.
export function TabBar<T extends string>({
  value,
  onChange,
  options,
  labels,
}: {
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
  labels?: Partial<Record<T, string>>;
}) {
  return (
    <div className="mb-7 border-b border-line">
      <div className="flex gap-1 -mb-px overflow-x-auto no-scrollbar">
        {options.map((v) => {
          const active = value === v;
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={cn(
                "px-3 py-2.5 font-mono text-2xs tracking-[0.18em] uppercase transition-colors border-b-2 whitespace-nowrap",
                active
                  ? "text-ink border-ink"
                  : "text-ink-mute border-transparent hover:text-ink-dim"
              )}
            >
              {labels?.[v] ?? v}
            </button>
          );
        })}
      </div>
    </div>
  );
}
