"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Lock, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroPhoto } from "@/data/images";

const pillars = [
  { icon: BadgeCheck, value: "Solo estudiantes", label: "verificados" },
  { icon: Lock, value: "Contactos protegidos", label: "hasta aceptar la solicitud" },
  { icon: Megaphone, value: "Publicar", label: "es gratis" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-tribu-radial">
      <div className="container grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            🎓 Para estudiantes de intercambio en España
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Tu intercambio empieza
            <br />
            con tu <span className="text-primary">tribu</span>.
          </h1>
          <p className="mt-5 max-w-lg text-balance text-lg text-muted-foreground">
            Encuentra habitación, compra lo que necesitas y conoce gente en tu ciudad. Sin papeleo y tratando solo con
            estudiantes y propietarios verificados.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/pisos">
                Llego a España <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/publicar">Me voy de intercambio</Link>
            </Button>
          </div>

          <p className="mt-8 max-w-md text-sm text-muted-foreground">
            Verificamos que estudias con tu <strong className="text-foreground">email universitario o tu carnet</strong> y
            quién eres con tu <strong className="text-foreground">DNI o pasaporte</strong>. Nada de perfiles falsos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-elevated sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image src={heroPhoto} alt="Estudiantes compartiendo piso en MiTribu" fill priority sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -left-4 bottom-6 hidden rounded-2xl border border-border bg-card/95 p-4 shadow-elevated backdrop-blur sm:block sm:-left-8"
          >
            <p className="text-xs text-muted-foreground">Habitación en Argüelles · feb – jul</p>
            <p className="text-lg font-bold">560 €<span className="text-sm font-normal text-muted-foreground">/mes</span></p>
            <p className="text-xs text-primary-700">🛫 Se va de Erasmus a Milán · ✓ Verificada</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="border-y border-border/60 bg-card/40">
        <div className="container grid grid-cols-1 divide-y divide-border/60 py-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {pillars.map((s) => (
            <div key={s.label} className="flex items-center justify-center gap-3 py-4 sm:py-0">
              <s.icon className="h-5 w-5 text-primary" />
              <p className="text-sm">
                <span className="font-bold">{s.value}</span>{" "}
                <span className="text-muted-foreground">{s.label}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
