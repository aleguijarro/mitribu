import { StaticPageShell } from "@/components/layout/static-page-shell";

export const metadata = { title: "Sobre nosotros" };

export default function SobreNosotrosPage() {
  return (
    <StaticPageShell title="Sobre MiTribu" subtitle="Nacimos de una frustración muy universitaria: buscar piso sin morir en el intento.">
      <p>
        MiTribu empezó como el proyecto de un grupo de estudiantes que, curso tras curso, veían cómo sus compañeros
        pasaban semanas enteras entre grupos de WhatsApp, anuncios desactualizados y estafas de fianzas. Pensamos que
        la vida universitaria merecía una plataforma hecha a su medida, no una adaptación de un portal inmobiliario
        genérico.
      </p>
      <p>
        Hoy MiTribu conecta a miles de estudiantes en toda España para encontrar alojamiento, comprar y vender entre
        ellos, y construir comunidad en cada ciudad universitaria. Seguimos siendo un equipo pequeño, cercano y
        obsesionado con una idea: que encontrar tu sitio no tenga por qué dar tanto respeto.
      </p>
      <p>
        Si tienes ideas, feedback o simplemente quieres contarnos tu experiencia, en <strong>Soporte</strong> tienes
        siempre una puerta abierta.
      </p>
    </StaticPageShell>
  );
}
