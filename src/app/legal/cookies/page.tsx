import { StaticPageShell } from "@/components/layout/static-page-shell";

export const metadata = { title: "Política de cookies" };

export default function CookiesPage() {
  return (
    <StaticPageShell title="Política de cookies" subtitle="Última actualización: septiembre de 2026.">
      <p>
        MiTribu usa almacenamiento local del navegador para recordar tus preferencias (como el modo oscuro, tus
        favoritos o tu sesión) y ofrecerte una experiencia fluida sin depender todavía de un backend.
      </p>
      <h2 className="text-lg font-semibold text-foreground">Tipos de almacenamiento que usamos</h2>
      <p>
        Almacenamiento esencial para el funcionamiento de la app (preferencias, sesión simulada) y, en el futuro,
        cookies analíticas opcionales para entender cómo mejorar MiTribu.
      </p>
      <h2 className="text-lg font-semibold text-foreground">Cómo puedes controlarlo</h2>
      <p>
        Puedes borrar el almacenamiento local de MiTribu en cualquier momento desde los ajustes de tu navegador.
      </p>
      <p className="text-sm text-muted-foreground">
        Este texto es una versión de demostración para el prototipo de MiTribu y debe sustituirse por una política de
        cookies revisada legalmente antes de un lanzamiento real.
      </p>
    </StaticPageShell>
  );
}
