import { AlertTriangle, BadgeCheck, Flag, ShieldCheck, Star } from "lucide-react";
import { scamSafetyTips } from "@/lib/constants";

const pillars = [
  { icon: BadgeCheck, title: "Perfiles verificados", description: "Email y, en muchos casos, identidad confirmada." },
  { icon: Star, title: "Sistema de reputación", description: "Valoraciones reales de otros estudiantes tras cada trato." },
  { icon: Flag, title: "Reportes en 24h", description: "Denuncia anuncios o usuarios sospechosos en un clic." },
];

export function SecuritySection() {
  return (
    <section id="seguridad" className="bg-surface py-16 sm:py-20">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
            <ShieldCheck className="h-3.5 w-3.5" /> Seguridad y confianza
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Comprar, alquilar y conocer gente, con tranquilidad
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tratar con otra persona a través de internet da respeto. Por eso MiTribu está construido, desde el primer
            día, para que sepas con quién estás hablando.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-subtle">
                  <p.icon className="h-4.5 w-4.5 text-primary" />
                </span>
                <h3 className="mt-3 text-sm font-semibold">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-center gap-2 text-coral">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="text-base font-semibold text-foreground">Consejos para evitar estafas</h3>
          </div>
          <ul className="mt-5 space-y-4">
            {scamSafetyTips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-[11px] font-bold text-primary-700">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
