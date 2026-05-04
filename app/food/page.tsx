"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, ProgressBar, Checkbox, Tag, Button, PageHeader, Stat } from "@/components/ui";
import { useStore } from "@/lib/store";
import { MEALS, NEVER_TOUCH, SHOPPING, SICK_DAY_STACK, MealSection, ShopCategory } from "@/lib/data/food";
import { ChevronDown, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type View = "meals" | "shopping" | "sick";

export default function FoodPage() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("meals");
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="px-5 lg:px-10 pt-6 lg:pt-10 max-w-3xl pb-10">
      <PageHeader eyebrow="Nutrition" title="Food" subtitle="Meals, shopping, sick day reference." />
      <div className="grid grid-cols-3 gap-2 mb-6 p-1 rounded-xl bg-bg-surface border border-line">
        {(["meals", "shopping", "sick"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "py-2 rounded-lg font-mono text-2xs tracking-wider uppercase transition-all",
              view === v ? "bg-bg-elevated text-ink" : "text-ink-mute hover:text-ink"
            )}
          >
            {v === "sick" ? "Sick Day" : v}
          </button>
        ))}
      </div>

      {view === "meals" && <MealsView />}
      {view === "shopping" && <ShoppingView />}
      {view === "sick" && <SickView />}
    </div>
  );
}

function MealsView() {
  const isFoodDone = useStore((s) => s.isFoodDone);
  const bodyweight = useStore((s) => s.bodyweight);
  const proteinTarget = Math.round(bodyweight * 0.9);

  return (
    <>
      <Card className="p-4 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <Eyebrow>Daily protein target</Eyebrow>
            <div className="text-2xl font-bold tracking-tightest text-accent-amber mt-1">{proteinTarget}g</div>
          </div>
          <div className="text-right text-xs text-ink-mute">
            From {bodyweight}lb<br />
            <span className="font-mono">0.9g/lb</span>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {MEALS.map((meal) => <MealCard key={meal.id} meal={meal} />)}
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-accent-red/5 border border-accent-red/20">
        <Eyebrow accent="red">Never Touch</Eyebrow>
        <ul className="mt-3 space-y-1.5">
          {NEVER_TOUCH.map((t, i) => (
            <li key={i} className="text-sm text-ink-dim flex items-center gap-2">
              <X size={12} className="text-accent-red shrink-0" /> {t}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function MealCard({ meal }: { meal: MealSection }) {
  const [open, setOpen] = useState(false);
  const isFoodDone = useStore((s) => s.isFoodDone);
  const toggleFood = useStore((s) => s.toggleFood);

  const states = meal.items.map((_, i) => isFoodDone(`${meal.id}.${i}`));
  const done = states.filter(Boolean).length;
  const total = meal.items.length;
  const pct = (done / total) * 100;
  const complete = done === total;

  return (
    <Card className={cn("overflow-hidden transition-all", complete && "opacity-70")}>
      <button onClick={() => setOpen((o) => !o)} className="w-full px-4 py-3.5 flex items-center gap-4 text-left hover:bg-bg-elevated/30 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-medium text-sm">{meal.label}</span>
              <Tag accent={meal.accent} size="sm">{meal.time}</Tag>
            </div>
            <span className="text-xs font-mono text-ink-mute shrink-0 tabular-nums">{done}/{total}</span>
          </div>
          <ProgressBar value={pct} accent={complete ? "lime" : meal.accent} />
        </div>
        <ChevronDown size={14} className={cn("text-ink-mute shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line">
            <div className="px-4 py-3 space-y-1">
              {meal.items.map((item, i) => {
                const checked = states[i];
                return (
                  <button key={i} onClick={() => toggleFood(`${meal.id}.${i}`)} className="w-full flex items-center gap-3 py-2 text-left group">
                    <Checkbox checked={checked} onChange={() => toggleFood(`${meal.id}.${i}`)} accent={meal.accent} size="sm" />
                    <span className={cn("text-sm transition-all flex-1", checked ? "text-ink-mute line-through" : "text-ink-dim group-hover:text-ink")}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function ShoppingView() {
  const isInCart = useStore((s) => s.isInCart);
  const toggleShop = useStore((s) => s.toggleShop);
  const clearCart = useStore((s) => s.clearCart);
  const cart = useStore((s) => s.shoppingCart);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Eyebrow>{cart.length} items in cart</Eyebrow>
        {cart.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCart}>
            <span className="flex items-center gap-1.5"><RotateCcw size={11} /> Clear</span>
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {SHOPPING.map((cat) => (
          <Card key={cat.id} className="p-4">
            <Eyebrow accent={cat.accent}>{cat.label}</Eyebrow>
            <div className="mt-3 space-y-1">
              {cat.items.map((item, i) => {
                const id = `${cat.id}.${i}`;
                const inCart = isInCart(id);
                return (
                  <button key={i} onClick={() => toggleShop(id)} className="w-full flex items-center gap-3 py-2 text-left group">
                    <Checkbox checked={inCart} onChange={() => toggleShop(id)} accent={cat.accent} size="sm" />
                    <span className={cn("text-sm transition-all flex-1", inCart ? "text-ink-mute line-through" : "text-ink-dim group-hover:text-ink")}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function SickView() {
  return (
    <>
      <Card className="p-5 mb-4 bg-accent-red/5 border-accent-red/20">
        <Eyebrow accent="red">Priority order</Eyebrow>
        <p className="mt-2 text-sm text-ink-dim leading-relaxed">
          Soup → kiwi ×2 → honey → yogurt → eggs → potato. Warm water + lemon + honey all day. Sleep maximum.
        </p>
      </Card>
      <div className="space-y-2">
        {SICK_DAY_STACK.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-bg-surface border border-line">
            <div className="w-7 h-7 rounded-full bg-accent-red/10 border border-accent-red/30 flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-mono text-xs text-accent-red font-bold">{i + 1}</span>
            </div>
            <span className="text-sm text-ink-dim leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}
