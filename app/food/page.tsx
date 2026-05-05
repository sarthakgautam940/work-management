"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Eyebrow, Meta, Section, ProgressBar, Checkbox, Button, PageHeader, TabBar, Row } from "@/components/ui";
import { useStore } from "@/lib/store";
import { MEALS, NEVER_TOUCH, SHOPPING, SICK_DAY_STACK, MealSection } from "@/lib/data/food";
import { ChevronDown, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type View = "meals" | "shopping" | "sick";
const VIEWS: readonly View[] = ["meals", "shopping", "sick"] as const;

export default function FoodPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <FoodInner />;
}

function FoodInner() {
  const [view, setView] = useState<View>("meals");
  return (
    <div className="px-5 lg:px-10 pt-7 lg:pt-12 max-w-3xl pb-16">
      <PageHeader eyebrow="Nutrition" title="Food" subtitle="Meals, shopping, sick day reference." />
      <TabBar value={view} onChange={setView} options={VIEWS} labels={{ sick: "Sick Day" }} />
      {view === "meals" && <MealsView />}
      {view === "shopping" && <ShoppingView />}
      {view === "sick" && <SickView />}
    </div>
  );
}

function MealsView() {
  const bodyweight = useStore((s) => s.bodyweight);
  const proteinTarget = Math.round(bodyweight * 0.9);
  return (
    <>
      <Card className="p-5 mb-7 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <Eyebrow>Daily protein target</Eyebrow>
          <div className="mt-2 text-3xl font-bold tracking-tightest">{proteinTarget}<span className="text-base text-ink-mute font-normal ml-1">g</span></div>
        </div>
        <div className="text-right text-xs text-ink-mute">
          From {bodyweight} lb<br />
          <span className="font-mono">0.9 g/lb</span>
        </div>
      </Card>

      <Section eyebrow="Meals">
        <div className="space-y-2">
          {MEALS.map((meal) => <MealCard key={meal.id} meal={meal} />)}
        </div>
      </Section>

      <Section eyebrow="Never touch">
        <Card className="p-5 border-accent-red/30 bg-accent-red/[0.04]">
          <ul className="space-y-2">
            {NEVER_TOUCH.map((t, i) => (
              <li key={i} className="text-sm text-ink-dim flex items-center gap-2.5">
                <X size={13} className="text-accent-red shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </Card>
      </Section>
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
    <Card className={cn("overflow-hidden transition-opacity", complete && "opacity-70")}>
      <Row onClick={() => setOpen((o) => !o)} className="flex items-center gap-4 px-5 py-4 hover:bg-bg-elevated/30">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-medium text-sm text-ink">{meal.label}</span>
              <Meta>{meal.time}</Meta>
            </div>
            <span className="text-xs font-mono text-ink-mute shrink-0 tabular-nums">{done}/{total}</span>
          </div>
          <ProgressBar value={pct} accent={complete ? "lime" : "neutral"} />
        </div>
        <ChevronDown size={15} className={cn("text-ink-mute shrink-0 transition-transform", open && "rotate-180")} />
      </Row>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line">
            <div className="px-5 py-2">
              {meal.items.map((item, i) => {
                const checked = states[i];
                return (
                  <Row key={i} onClick={() => toggleFood(`${meal.id}.${i}`)} className="flex items-center gap-3 py-2.5 group">
                    <Checkbox checked={checked} onChange={() => toggleFood(`${meal.id}.${i}`)} accent="lime" size="sm" />
                    <span className={cn("text-sm transition-colors flex-1", checked ? "text-ink-mute line-through" : "text-ink-dim group-hover:text-ink")}>
                      {item}
                    </span>
                  </Row>
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
      <div className="flex items-center justify-between mb-5">
        <Meta>{cart.length} items in cart</Meta>
        {cart.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCart}>
            <span className="flex items-center gap-1.5"><RotateCcw size={11} /> Clear</span>
          </Button>
        )}
      </div>
      <div className="space-y-7">
        {SHOPPING.map((cat) => (
          <div key={cat.id}>
            <Eyebrow className="mb-3">{cat.label}</Eyebrow>
            <Card className="px-5 py-2">
              {cat.items.map((item, i) => {
                const id = `${cat.id}.${i}`;
                const inCart = isInCart(id);
                const last = i === cat.items.length - 1;
                return (
                  <Row
                    key={i}
                    onClick={() => toggleShop(id)}
                    className={cn("flex items-center gap-3 py-2.5 group", !last && "border-b border-line")}
                  >
                    <Checkbox checked={inCart} onChange={() => toggleShop(id)} accent="lime" size="sm" />
                    <span className={cn("text-sm transition-colors flex-1", inCart ? "text-ink-mute line-through" : "text-ink-dim group-hover:text-ink")}>
                      {item}
                    </span>
                  </Row>
                );
              })}
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

function SickView() {
  return (
    <>
      <Card className="p-5 mb-5 border-accent-red/30 bg-accent-red/[0.04]">
        <Eyebrow accent="red">Priority order</Eyebrow>
        <p className="mt-2 text-sm text-ink-dim leading-relaxed">
          Soup → kiwi ×2 → honey → yogurt → eggs → potato. Warm water + lemon + honey all day. Sleep maximum.
        </p>
      </Card>
      <Card className="px-5 py-2">
        {SICK_DAY_STACK.map((item, i) => (
          <div key={i} className={cn("flex items-start gap-4 py-3.5", i < SICK_DAY_STACK.length - 1 && "border-b border-line")}>
            <span className="font-mono text-2xs tracking-[0.18em] text-ink-mute pt-0.5 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm text-ink-dim leading-relaxed">{item}</span>
          </div>
        ))}
      </Card>
    </>
  );
}
