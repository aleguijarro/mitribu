import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { freePlanLimits, pricing } from "@/lib/constants";
import { formatFee } from "@/lib/format";

const sides = [
  {
    emoji: "🛬",
    title: "¿Llegas a España de intercambio?",
    subtitle: "Encuentra habitación desde tu país sin nómina, sin aval y sin miedo a estafas.",
    steps: [
      "Verifícate con tu email universitario o carnet y tu pasaporte.",
      `Busca y envía solicitudes: las ${freePlanLimits.contacts} primeras son gratis.`,
      "El propietario ve tu perfil y, si acepta, se abre el chat.",
      "Hablad, pasaos el contacto y firmad el contrato.",
    ],
    cta: { label: "Buscar habitación", href: "/pisos" },
  },
  {
    emoji: "🛫",
    title: "¿Te vas de intercambio?",
    subtitle: "Deja tu habitación y lo que no te llevas a quien llega. Publicar es gratis.",
    steps: [
      "Publica tu habitación, muebles, bici o libros gratis.",
      "Recibe solicitudes de estudiantes verificados y míralas gratis.",
      `Acepta la que te guste por ${formatFee(pricing.acceptLead)} y se abre el chat.`,
      `Al firmar, ${formatFee(pricing.contractSigned)}: retiramos el anuncio y sube tu reputación.`,
    ],
    cta: { label: "Publicar gratis", href: "/publicar" },
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="container py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">El relevo del intercambio, con confianza</h2>
        <p className="mt-3 text-muted-foreground">
          Cada semestre, el que se va deja piso, muebles y contactos al que llega. Hoy pasa en grupos de Facebook y
          WhatsApp; en MiTribu pasa entre estudiantes verificados.
        </p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {sides.map((side) => (
          <div key={side.title} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-subtle sm:p-8">
            <span className="text-3xl">{side.emoji}</span>
            <h3 className="mt-3 text-xl font-bold tracking-tight">{side.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{side.subtitle}</p>
            <ol className="mt-6 flex-1 space-y-4">
              {side.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <Button asChild className="mt-8 self-start">
              <Link href={side.cta.href}>
                {side.cta.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        🔒 Teléfonos, emails y redes se ocultan hasta que se acepta la solicitud.{" "}
        <Link href="/precios" className="font-semibold text-primary hover:underline">
          Ver precios
        </Link>
      </p>
    </section>
  );
}
