"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function RegistroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/onboarding"), 400);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
      <Card className="shadow-elevated">
        <CardHeader className="items-center text-center">
          <h1 className="text-2xl font-bold tracking-tight">Bienvenido a tu nueva tribu</h1>
          <p className="text-sm text-muted-foreground">
            Crea tu cuenta gratis. Si usas tu email universitario, ya tienes medio camino de la verificación hecho.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Button variant="outline" size="lg" onClick={() => router.push("/onboarding")} className="w-full">
              Continuar con Google
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/onboarding")} className="w-full">
              Continuar con Apple
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">o con tu email</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Tu nombre y apellido" required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email (mejor el de tu universidad)</Label>
              <Input id="email" type="email" placeholder="tunombre@alumnos.universidad.es" required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="Mínimo 8 caracteres" required minLength={8} />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Al continuar aceptas nuestros{" "}
            <Link href="/legal/terminos" className="underline">Términos</Link> y nuestra{" "}
            <Link href="/legal/privacidad" className="underline">Política de privacidad</Link>.
          </p>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
