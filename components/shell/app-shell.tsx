"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import {
  Home, ListChecks, Dumbbell, Apple, GraduationCap,
  BookOpen, Briefcase, Timer, BarChart3, Menu, X, Target,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Today", icon: Home },
  { href: "/routine", label: "Routine", icon: ListChecks },
  { href: "/workout", label: "Workout", icon: Dumbbell },
  { href: "/food", label: "Food", icon: Apple },
  { href: "/school", label: "School", icon: GraduationCap },
  { href: "/ap", label: "AP Crash", icon: Target },
  { href: "/ibo", label: "IBO", icon: BookOpen },
  { href: "/sat", label: "SAT", icon: GraduationCap },
  { href: "/business", label: "UpLevel", icon: Briefcase },
  { href: "/timer", label: "Timer", icon: Timer },
  { href: "/stats", label: "Stats", icon: BarChart3 },
];

const MOBILE_PRIMARY = ["/", "/routine", "/workout", "/school", "/ap"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex">
      <DesktopSidebar />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex-1 lg:ml-[220px] pb-24 lg:pb-0 min-w-0">
        <MobileTopBar onMenu={() => setMenuOpen(true)} />
        {children}
      </main>
      <MobileBottomNav onMenu={() => setMenuOpen(true)} />
    </div>
  );
}

function DesktopSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[220px] flex-col border-r border-line bg-bg-surface/40 backdrop-blur-md z-40">
      <div className="px-6 py-7">
        <div className="font-mono text-2xs tracking-[0.25em] text-ink-mute">SYSTEM</div>
        <div className="font-sans text-xl font-bold tracking-tightest mt-1">Praxis</div>
      </div>
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                active ? "bg-bg-elevated text-ink" : "text-ink-dim hover:text-ink hover:bg-bg-elevated/50"
              )}
            >
              <Icon size={16} className={active ? "text-accent-lime" : ""} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-line">
        <div className="font-mono text-2xs text-ink-ghost tracking-wider">v1 · LOCAL</div>
      </div>
    </aside>
  );
}

function MobileTopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="font-bold text-base tracking-tightest">Praxis</span>
      </div>
      <button onClick={onMenu} className="p-2 -mr-2 text-ink-dim hover:text-ink">
        <Menu size={20} />
      </button>
    </div>
  );
}

function MobileBottomNav({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const items = NAV.filter((n) => MOBILE_PRIMARY.includes(n.href));
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-line bg-bg/95 backdrop-blur-md">
      <div className="grid grid-cols-6">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-3",
                active ? "text-accent-lime" : "text-ink-mute"
              )}
            >
              <Icon size={18} />
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={onMenu}
          className="flex flex-col items-center gap-1 py-3 text-ink-mute"
        >
          <Menu size={18} />
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase">More</span>
        </button>
      </div>
    </nav>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "lg:hidden fixed inset-0 z-50 transition-all",
        open ? "visible" : "invisible pointer-events-none"
      )}
    >
      <div
        className={cn("absolute inset-0 bg-black transition-opacity", open ? "opacity-60" : "opacity-0")}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 w-[280px] bg-bg-surface border-l border-line transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-line">
          <div>
            <div className="font-mono text-2xs tracking-[0.2em] text-ink-mute">SYSTEM</div>
            <div className="font-bold text-lg tracking-tightest mt-0.5">Praxis</div>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-ink-dim hover:text-ink">
            <X size={20} />
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all",
                  active ? "bg-bg-elevated text-ink" : "text-ink-dim hover:text-ink hover:bg-bg-elevated/50"
                )}
              >
                <Icon size={16} className={active ? "text-accent-lime" : ""} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
