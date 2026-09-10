"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, ShoppingBag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroPhoto } from "@/data/images";
import { avatarPhoto } from "@/data/images";

const stats = [
  { icon: Home, label: "pisos activos", value: "1.200+" },
  { icon: ShoppingBag, label: "artículos en venta", value: "4.500+" },
  { icon: Users, label: "estudiantes conectados", value: "18.000+" },
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
            🎓 Hecho por y para estudiantes
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Encuentra tu sitio.
            <br />
            Encuentra tu <span className="text-primary">tribu</span>.
          </h1>
          <p className="mt-5 max-w-lg text-balance text-lg text-muted-foreground">
            MiTribu conecta a estudiantes para encontrar piso, comprar y vender cosas y descubrir gente cerca de ti.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/inicio">
                Explorar MiTribu <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/registro">Crear cuenta</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-9 w-9 overflow-hidden rounded-full border-2 border-background">
                  <Image src={avatarPhoto(i)} alt="" width={36} height={36} className="h-full w-full object-cover" />
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Más de <strong className="text-foreground">18.000 estudiantes</strong> ya están en su tribu
            </p>
          </div>
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
            <p className="text-xs text-muted-foreground">Habitación en Malasaña</p>
            <p className="text-lg font-bold">650 €<span className="text-sm font-normal text-muted-foreground">/mes</span></p>
            <p className="text-xs text-primary-700">⭐ 4.8 · ✓ Verificado</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="border-y border-border/60 bg-card/40">
        <div className="container grid grid-cols-1 divide-y divide-border/60 py-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
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
