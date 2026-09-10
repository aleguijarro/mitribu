import { Home, MessageCircle, ShieldCheck, Sparkles, Tag, Users } from "lucide-react";

const benefits = [
  {
    icon: Home,
    title: "Alojamiento sin sustos",
    description: "Filtra por distancia a tu universidad, precio y ambiente. Cada piso tiene reseñas reales de estudiantes.",
  },
  {
    icon: Tag,
    title: "Ahorra en todo",
    description: "Compra y vende libros, muebles y tecnología de segunda mano entre gente de tu propia ciudad.",
  },
  {
    icon: Users,
    title: "Tu gente, cerca de ti",
    description: "Conecta con estudiantes de tu universidad, resuelve dudas y haz planes desde el primer día.",
  },
  {
    icon: MessageCircle,
    title: "Todo en un chat",
    description: "Negocia, pregunta y comparte anuncios sin salir de MiTribu. Queda todo registrado.",
  },
  {
    icon: ShieldCheck,
    title: "Confianza real",
    description: "Perfiles verificados, valoraciones y un equipo que revisa cada reporte en menos de 24h.",
  },
  {
    icon: Sparkles,
    title: "Siempre algo nuevo",
    description: "Un feed que aprende de lo que buscas para no dejarte pasar la oportunidad perfecta.",
  },
];

export function Benefits() {
  return (
    <section className="container py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Todo lo que necesitas, en un solo sitio</h2>
        <p className="mt-3 text-muted-foreground">
          Encuentra. Conecta. Comparte. MiTribu reúne todo lo que necesitas para tu vida de estudiante.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100">
              <b.icon className="h-5 w-5 text-primary-700" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{b.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
