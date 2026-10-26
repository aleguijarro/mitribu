"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, FileSignature, Inbox, Megaphone, Sparkles, Zap } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentDialog } from "@/components/shared/payment-dialog";
import { usePlan } from "@/context/plan-context";
import { useToast } from "@/hooks/use-toast";
import { freePlanLimits, planDetails, pricing } from "@/lib/constants";
import { formatDate, formatFee } from "@/lib/format";
import { cn } from "@/lib/utils";

type Checkout = "semana" | "mes" | "contacto" | null;

const seekerPlans = [
  {
    id: "gratis" as const,
    popular: false,
    features: ["Búsqueda ilimitada", `Guarda ${freePlanLimits.savedListings} anuncios`, `${freePlanLimits.contacts} contactos o solicitudes`],
  },
  {
    id: "semana" as const,
    popular: false,
    features: ["Búsqueda ilimitada", "Guardados ilimitados", "Contactos y solicitudes ilimitados", "Ideal para la semana antes de llegar"],
  },
  {
    id: "mes" as const,
    popular: true,
    features: ["Búsqueda ilimitada", "Guardados ilimitados", "Contactos y solicitudes ilimitados", "Para buscar con calma desde tu país"],
  },
];

const publisherFees = [
  { icon: Megaphone, title: "Publicar", price: "Gratis", text: "Habitación, piso o cosas que no te llevas. Sin límite de anuncios." },
  { icon: Inbox, title: "Aceptar una solicitud", price: formatFee(pricing.acceptLead), text: "Ver la solicitud y el perfil del estudiante es gratis. Pagas solo si te interesa y quieres abrir el chat." },
  { icon: FileSignature, title: "Contrato firmado", price: formatFee(pricing.contractSigned), text: "Cuando cerráis el trato. Retiramos el anuncio y sube tu reputación." },
];

export default function PreciosPage() {
  const plan = usePlan();
  const { toast } = useToast();
  const [checkout, setCheckout] = useState<Checkout>(null);

  function confirmCheckout() {
    if (checkout === "contacto") {
      plan.buySingleContact();
      toast({ title: "Contacto extra añadido ⚡", description: "Úsalo en cualquier anuncio." });
    } else if (checkout) {
      plan.subscribe(checkout);
      toast({ title: `${planDetails[checkout].name} activado ✨`, description: "Se renueva automáticamente hasta que lo canceles." });
    }
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="container py-14 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">Precios claros. Pagas cuando funciona.</h1>
            <p className="mt-4 text-muted-foreground">
              Publicar es gratis. Quien publica paga cuando acepta a un estudiante y cuando firman. Quien busca empieza
              gratis y solo paga si necesita más.
            </p>
          </div>

          {plan.isPremium && (
            <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl border border-primary/30 bg-primary-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-primary-700">Tienes {planDetails[plan.plan].name}</p>
                <p className="text-sm text-primary-700/80">
                  {plan.cancelled
                    ? `Cancelado: sigue activo hasta el ${plan.renewsAt ? formatDate(plan.renewsAt) : "final del periodo"}.`
                    : `Se renueva el ${plan.renewsAt ? formatDate(plan.renewsAt) : "próximo periodo"}. Cancela antes para que no se cobre.`}
                </p>
              </div>
              {!plan.cancelled && (
                <Button
                  variant="outline"
                  onClick={() => {
                    plan.cancel();
                    toast({ title: "Suscripción cancelada", description: "No se renovará. Mantienes Premium hasta el final del periodo." });
                  }}
                >
                  Cancelar renovación
                </Button>
              )}
            </div>
          )}

          <h2 className="mt-14 text-xl font-bold tracking-tight">🛬 Si buscas alojamiento o cosas para tu piso</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {seekerPlans.map((p) => {
              const details = planDetails[p.id];
              const current = p.id === "gratis" ? !plan.isPremium : plan.isPremium && plan.plan === p.id;
              return (
                <div
                  key={p.id}
                  className={cn("flex flex-col rounded-2xl border bg-card p-6", p.popular ? "border-2 border-primary shadow-soft" : "border-border")}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{details.name}</h3>
                    {p.popular && <Badge>Más elegido</Badge>}
                  </div>
                  <p className="mt-4 text-3xl font-extrabold">
                    {details.price === 0 ? "0 €" : formatFee(details.price)}
                    {details.period && <span className="text-sm font-normal text-muted-foreground">/{details.period}</span>}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  {p.id === "gratis" ? (
                    <Button variant="outline" className="mt-6" asChild>
                      <Link href="/registro">{current ? "Tu plan actual" : "Empezar gratis"}</Link>
                    </Button>
                  ) : (
                    <Button
                      className="mt-6"
                      variant={current ? "outline" : "default"}
                      disabled={current}
                      onClick={() => setCheckout(p.id === "semana" ? "semana" : "mes")}
                    >
                      <Sparkles className="h-4 w-4" /> {current ? "Tu plan actual" : "Elegir"}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-dashed border-border p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
              <div>
                <p className="font-semibold">Obtener contacto YA · {formatFee(pricing.singleContact)}</p>
                <p className="text-sm text-muted-foreground">¿Solo te falta uno? Compra un contacto suelto sin suscribirte.</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setCheckout("contacto")}>Comprar contacto</Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Premium se renueva automáticamente hasta que lo canceles. Puedes cancelarlo desde esta página en cualquier
            momento antes de la fecha del siguiente cobro.
          </p>

          <h2 className="mt-16 text-xl font-bold tracking-tight">🛫 Si publicas: te vas de intercambio o eres propietario</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {publisherFees.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100">
                  <f.icon className="h-5 w-5 text-primary-700" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1 text-2xl font-extrabold">{f.price}</p>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      <PaymentDialog
        open={!!checkout}
        onOpenChange={(open) => !open && setCheckout(null)}
        title={checkout === "contacto" ? "Obtener contacto YA" : checkout ? planDetails[checkout].name : ""}
        description={
          checkout === "contacto"
            ? "Un contacto extra para enviar una solicitud o escribir a un vendedor."
            : "Se renueva automáticamente. Cancela cuando quieras antes del próximo cobro."
        }
        concept={checkout === "contacto" ? "Contacto suelto" : checkout ? `${planDetails[checkout].name} (1 ${planDetails[checkout].period})` : ""}
        amount={checkout === "contacto" ? pricing.singleContact : checkout ? planDetails[checkout].price : 0}
        onConfirm={confirmCheckout}
      />
    </div>
  );
}
