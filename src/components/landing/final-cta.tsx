import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="container pb-20 pt-4 sm:pb-28">
      <div className="relative overflow-hidden rounded-3xl bg-tribu-gradient px-6 py-16 text-center shadow-elevated sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <h2 className="relative text-balance text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
          Tu gente. Tu ciudad. Tu tribu.
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-primary-foreground/85">
          Únete gratis y empieza a descubrir pisos, artículos y gente cerca de ti hoy mismo.
        </p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" asChild className="bg-white text-primary-700 hover:bg-white/90">
            <Link href="/registro">
              Crear cuenta gratis <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10">
            <Link href="/inicio">Explorar sin registrarme</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
