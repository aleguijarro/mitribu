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
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
      toast({ title: "¡Bienvenido/a de vuelta! 👋", description: "Has iniciado sesión correctamente." });
      router.push("/inicio");
    }, 500);
  }

  function handleSocial(provider: string) {
    login();
    toast({ title: "¡Bienvenido/a! 👋", description: `Sesión iniciada con ${provider}.` });
    router.push("/inicio");
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
      <Card className="shadow-elevated">
        <CardHeader className="items-center text-center">
          <h1 className="text-2xl font-bold tracking-tight">Bienvenido/a de vuelta</h1>
          <p className="text-sm text-muted-foreground">Inicia sesión para seguir con tu tribu.</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Button variant="outline" size="lg" onClick={() => handleSocial("Google")} className="w-full">
              <GoogleIcon /> Continuar con Google
            </Button>
            <Button variant="outline" size="lg" onClick={() => handleSocial("Apple")} className="w-full">
              <AppleIcon /> Continuar con Apple
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">o con tu email</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tunombre@universidad.es" required defaultValue="sofia@mitribu.app" />
            </div>
            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link href="#" className="text-xs font-medium text-primary hover:underline">
                  ¿La olvidaste?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" required defaultValue="tribu2026" />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Iniciar sesión"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Aún no tienes cuenta?{" "}
            <Link href="/registro" className="font-semibold text-primary hover:underline">
              Crear cuenta
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M16.365 1.43c0 1.14-.462 2.238-1.212 3.05-.813.9-2.14 1.6-3.23 1.51-.14-1.09.45-2.24 1.19-3.02.83-.88 2.26-1.55 3.25-1.54zM20.5 17.26c-.53 1.22-1.17 2.42-2.06 3.53-.9 1.13-1.85 2.24-3.29 2.27-1.42.03-1.88-.83-3.5-.83-1.62 0-2.13.8-3.48.86-1.4.06-2.46-1.22-3.37-2.35-1.83-2.28-3.24-6.44-1.36-9.26 0.93-1.4 2.6-2.28 4.4-2.31 1.36-.02 2.65.9 3.48.9.83 0 2.39-1.11 4.03-.95.68.03 2.6.28 3.83 2.06-.1.06-2.29 1.32-2.26 3.94.03 3.13 2.76 4.17 2.58 4.14z" />
    </svg>
  );
}
