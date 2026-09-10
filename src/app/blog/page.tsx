import Image from "next/image";
import { StaticPageShell } from "@/components/layout/static-page-shell";
import { communityPhoto } from "@/data/images";

export const metadata = { title: "Blog" };

const posts = [
  {
    title: "10 barrios donde vivir barato (y bien) siendo estudiante",
    excerpt: "Un repaso ciudad por ciudad a las zonas favoritas de nuestra comunidad, más allá del centro.",
    photo: communityPhoto(5),
  },
  {
    title: "Cómo no caer en una estafa al buscar piso",
    excerpt: "Señales de alarma, preguntas clave y por qué nunca deberías pagar sin ver el piso antes.",
    photo: communityPhoto(6),
  },
  {
    title: "Guía rápida para amueblar tu piso por menos de 200€",
    excerpt: "Segunda mano, mercadillos y los trucos de quienes ya han pasado por esto.",
    photo: communityPhoto(7),
  },
];

export default function BlogPage() {
  return (
    <StaticPageShell title="Blog de MiTribu" subtitle="Historias, guías y consejos para tu vida de estudiante.">
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <article key={post.title} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-[16/10] w-full">
              <Image src={post.photo} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="p-5">
              <h2 className="text-base font-semibold leading-snug">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="!mt-10 text-sm text-muted-foreground">Muy pronto publicaremos aquí contenido nuevo cada semana. 📚</p>
    </StaticPageShell>
  );
}
