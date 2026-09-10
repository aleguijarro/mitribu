import { StaticPageShell } from "@/components/layout/static-page-shell";

export const metadata = { title: "Términos y condiciones" };

export default function TerminosPage() {
  return (
    <StaticPageShell title="Términos y condiciones" subtitle="Última actualización: septiembre de 2026.">
      <p>
        Al usar MiTribu aceptas estas condiciones. Te pedimos que las leas: son cortas y están pensadas para que
        entiendas exactamente qué puedes esperar de nosotros y qué esperamos de ti.
      </p>
      <h2 className="text-lg font-semibold text-foreground">Uso de la plataforma</h2>
      <p>
        MiTribu es un espacio para estudiantes. No se permite publicar contenido falso, ofensivo o que incumpla la
        ley. Los anuncios de propiedades y productos deben ser veraces.
      </p>
      <h2 className="text-lg font-semibold text-foreground">Transacciones entre usuarios</h2>
      <p>
        MiTribu conecta a estudiantes entre sí, pero no interviene en los acuerdos de alquiler o compraventa. Cada
        usuario es responsable de verificar la información antes de cerrar un trato.
      </p>
      <h2 className="text-lg font-semibold text-foreground">Cuentas y seguridad</h2>
      <p>
        Eres responsable de mantener tu cuenta segura. Si detectas actividad sospechosa, contáctanos de inmediato
        desde el Centro de ayuda.
      </p>
      <p className="text-sm text-muted-foreground">
        Este texto es una versión de demostración para el prototipo de MiTribu y debe sustituirse por unos términos
        revisados legalmente antes de un lanzamiento real.
      </p>
    </StaticPageShell>
  );
}
