import { StaticPageShell } from "@/components/layout/static-page-shell";

export const metadata = { title: "Política de privacidad" };

export default function PrivacidadPage() {
  return (
    <StaticPageShell title="Política de privacidad" subtitle="Última actualización: septiembre de 2026.">
      <p>
        En MiTribu nos tomamos en serio tus datos. Esta política explica, en lenguaje claro, qué información
        recogemos, para qué la usamos y qué control tienes sobre ella.
      </p>
      <h2 className="text-lg font-semibold text-foreground">Qué datos recogemos</h2>
      <p>
        Datos de registro (nombre, email, universidad, ciudad), contenido que publicas (anuncios, mensajes,
        publicaciones) y datos técnicos básicos de uso de la plataforma para mejorar el servicio.
      </p>
      <h2 className="text-lg font-semibold text-foreground">Cómo los usamos</h2>
      <p>
        Para operar MiTribu, personalizar tu feed, permitirte comunicarte con otros estudiantes y mantener la
        plataforma segura frente a fraudes y abusos.
      </p>
      <h2 className="text-lg font-semibold text-foreground">Tus derechos</h2>
      <p>
        Puedes acceder, corregir o eliminar tus datos en cualquier momento desde tu perfil, o escribiéndonos desde el
        Centro de ayuda.
      </p>
      <p className="text-sm text-muted-foreground">
        Este texto es una versión de demostración para el prototipo de MiTribu y debe sustituirse por una política de
        privacidad revisada legalmente antes de un lanzamiento real.
      </p>
    </StaticPageShell>
  );
}
