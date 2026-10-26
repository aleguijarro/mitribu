import Image from "next/image";
import { Star } from "lucide-react";
import { getUserById } from "@/data/users";

const testimonials = [
  {
    userId: "u13",
    quote:
      "Buscaba habitación desde Múnich y me daba pánico que me estafaran. Aquí sé que la persona del otro lado es estudiante de verdad.",
  },
  {
    userId: "u1",
    quote:
      "Me voy a Milán y no quería pagar el piso vacío seis meses. Vi las solicitudes gratis y elegí a quien más encajaba con mis compañeras.",
  },
  {
    userId: "u3",
    quote:
      "Llegué de Lisboa sin conocer a nadie y en la Comunidad ya tenía plan la primera semana. La bici y el escritorio, del Marketplace.",
  },
];

export function Testimonials() {
  return (
    <section className="container py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Así se vive un intercambio con MiTribu</h2>
        <p className="mt-3 text-muted-foreground">Ejemplos de cómo lo usan quienes llegan y quienes se van.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => {
          const user = getUserById(t.userId);
          if (!user) return null;
          return (
            <figure key={t.userId} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-subtle">
              <div className="flex gap-0.5 text-foreground">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-foreground" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Image src={user.avatarUrl} alt={user.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.degree ?? user.city} · {user.city}</p>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
