"use client";

import { useMemo, useState } from "react";
import {
  CreditCard,
  Home,
  LifeBuoy,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  UserCog,
  Wrench,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { SupportContactForm } from "@/components/support/support-contact-form";
import { supportCategories, faqs } from "@/data/support";
import { scamSafetyTips } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  UserCog,
  Home,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  MessageCircle,
  Wrench,
};

export default function SoportePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      if (activeCategory && f.category !== activeCategory) return false;
      if (query && !f.question.toLowerCase().includes(query.toLowerCase()) && !f.answer.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, activeCategory]);

  return (
    <div className="container py-10 sm:py-14">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100">
          <LifeBuoy className="h-6 w-6 text-primary-700" />
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">¿Necesitas ayuda?</h1>
        <p className="mt-2 text-muted-foreground">¿En qué podemos ayudarte?</p>
        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en el centro de ayuda..."
            className="h-13 w-full rounded-full border border-border bg-card pl-11 pr-5 text-sm shadow-soft outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {supportCategories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? LifeBuoy;
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory((c) => (c === cat.id ? null : cat.id))}
              className={cn(
                "flex flex-col items-start gap-2.5 rounded-2xl border p-4 text-left transition-all",
                active ? "border-primary bg-primary-50" : "border-border hover:border-primary/30 hover:shadow-soft"
              )}
            >
              <Icon className={cn("h-5 w-5", active ? "text-primary-700" : "text-primary")} />
              <span>
                <span className="block text-sm font-semibold">{cat.label}</span>
                <span className="block text-xs text-muted-foreground">{cat.description}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Preguntas frecuentes</h2>
          {activeCategory && (
            <button onClick={() => setActiveCategory(null)} className="text-sm font-medium text-primary hover:underline">
              Ver todas
            </button>
          )}
        </div>
        {filteredFaqs.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            No encontramos preguntas que coincidan con tu búsqueda.
          </p>
        ) : (
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      <div id="seguridad" className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Consejos para evitar estafas</h2>
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {scamSafetyTips.map((tip, i) => (
            <li key={i} className="flex gap-2.5 rounded-xl bg-card p-3.5 text-sm text-muted-foreground shadow-subtle">
              <Badge variant="default" className="h-5 shrink-0 px-1.5">{i + 1}</Badge>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <SupportContactForm />
      </div>
    </div>
  );
}
