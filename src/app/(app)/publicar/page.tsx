import Link from "next/link";
import { ArrowRight, Home, ShoppingBag } from "lucide-react";

const options = [
  {
    href: "/publicar/propiedad",
    icon: Home,
    title: "Propiedad",
    description: "Publica una habitación, estudio o piso completo para estudiantes.",
  },
  {
    href: "/publicar/producto",
    icon: ShoppingBag,
    title: "Producto",
    description: "Vende libros, muebles, tecnología o cualquier cosa que ya no uses.",
  },
];

export default function PublicarPage() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-12 text-center">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">¿Qué quieres publicar?</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">Elige una opción y estarás publicando en menos de dos minutos.</p>

      <div className="mt-10 grid w-full max-w-2xl gap-5 sm:grid-cols-2">
        {options.map((opt) => (
          <Link
            key={opt.href}
            href={opt.href}
            className="group flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-subtle transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 transition-transform group-hover:scale-110">
              <opt.icon className="h-7 w-7 text-primary-700" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">{opt.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{opt.description}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Empezar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
