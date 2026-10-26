import { FileX, Home, Repeat, ShieldCheck, Tag, Users } from "lucide-react";

const benefits = [
  {
    icon: Home,
    title: "Pensado para un semestre",
    description: "Llegas sin nómina, sin aval y desde otro país. Aquí los anuncios son para estancias de intercambio, cerca de tu universidad.",
  },
  {
    icon: FileX,
    title: "Sin papeleo previo",
    description: "Persona a persona, sin agencias ni trámites antes de hablar. El propietario ve tu perfil y decide.",
  },
  {
    icon: ShieldCheck,
    title: "Solo gente verificada",
    description: "Email universitario o carnet, y DNI o pasaporte. Reputación que sube con cada contrato cerrado.",
  },
  {
    icon: Repeat,
    title: "El relevo del intercambio",
    description: "Quien se va deja su habitación, sus muebles y sus contactos a quien llega. Todos salís ganando.",
  },
  {
    icon: Tag,
    title: "Marketplace de estudiantes",
    description: "Bicis, muebles, libros, móviles y entradas de eventos entre gente de tu misma ciudad.",
  },
  {
    icon: Users,
    title: "Tu gente desde el día uno",
    description: "Conoce a otros estudiantes de intercambio de tu ciudad, resuelve dudas y haz planes al llegar.",
  },
];

export function Benefits() {
  return (
    <section className="container py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Como un grupo de Facebook, pero sin estafas</h2>
        <p className="mt-3 text-muted-foreground">
          Casa, cosas y gente para tu intercambio en España, en un solo sitio y con todo el mundo verificado.
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
