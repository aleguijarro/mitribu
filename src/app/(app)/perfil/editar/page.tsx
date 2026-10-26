"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useCurrentUserProfile } from "@/hooks/use-current-user-profile";
import { useToast } from "@/hooks/use-toast";
import { cities, universities } from "@/lib/constants";

export default function EditProfilePage() {
  const { user, updateProfile } = useCurrentUserProfile();
  const { toast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio ?? "",
    city: user.city,
    university: user.university ?? "",
    degree: user.degree ?? "",
    year: user.year ?? "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateProfile(form);
    toast({ title: "Perfil actualizado ✅", description: "Tus cambios ya son visibles para el resto de la tribu." });
    router.push("/perfil");
  }

  return (
    <div className="container max-w-2xl py-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Editar perfil</h1>
      <p className="mt-1 text-muted-foreground">Así te verán el resto de estudiantes en MiTribu.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Información personal</CardTitle>
          <CardDescription>Actualiza tus datos para que tu perfil se sienta al día.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="flex items-center gap-4">
              <UserAvatar user={user} size="xl" />
              <Button type="button" variant="outline" size="sm">
                Cambiar foto
              </Button>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="bio">Biografía</Label>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                placeholder="Cuéntale a la tribu algo sobre ti..."
                maxLength={160}
              />
              <p className="text-right text-xs text-muted-foreground">{form.bio.length}/160</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Ciudad</Label>
                <Select value={form.city} onValueChange={(v) => setForm((f) => ({ ...f, city: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Universidad</Label>
                <Select value={form.university || "none"} onValueChange={(v) => setForm((f) => ({ ...f, university: v === "none" ? "" : v }))}>
                  <SelectTrigger><SelectValue placeholder="Selecciona tu universidad" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Prefiero no decirlo</SelectItem>
                    {universities.map((u) => (
                      <SelectItem key={u} value={u}>{u}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="degree">Carrera / grado</Label>
                <Input id="degree" value={form.degree} onChange={(e) => setForm((f) => ({ ...f, degree: e.target.value }))} placeholder="p. ej. Arquitectura" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="year">Curso</Label>
                <Input id="year" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} placeholder="p. ej. 3er curso" />
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary p-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{user.verified ? "Estudiante verificado" : "Verifica tu perfil"}</p>
                <p className="text-muted-foreground">
                  {user.verified
                    ? "Ya puedes enviar y aceptar solicitudes."
                    : "Necesario para enviar y aceptar solicitudes: email universitario o carnet, y DNI o pasaporte."}
                </p>
              </div>
              {!user.verified && (
                <Button type="button" size="sm" variant="outline" asChild>
                  <Link href="/verificacion">Verificar</Link>
                </Button>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => router.push("/perfil")}>
                Cancelar
              </Button>
              <Button type="submit">Guardar cambios</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
