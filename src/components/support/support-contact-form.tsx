"use client";

import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { currentUser } from "@/data/current-user";
import { supportCategories } from "@/data/support";

export function SupportContactForm() {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);
  const [category, setCategory] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    toast({ title: "Solicitud enviada 📨", description: "Nuestro equipo te responderá en menos de 24 horas." });
  }

  return (
    <Card id="contacto">
      <CardHeader>
        <CardTitle>Contactar con soporte</CardTitle>
        <CardDescription>Cuéntanos qué ha pasado y te responderemos lo antes posible.</CardDescription>
      </CardHeader>
      <CardContent>
        {sent ? (
          <div className="flex flex-col items-center gap-3 rounded-xl bg-primary-50 py-10 text-center">
            <span className="text-3xl">🎉</span>
            <p className="font-semibold text-primary-700">¡Solicitud enviada!</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Hemos recibido tu mensaje. Un miembro del equipo de MiTribu te contestará muy pronto.
            </p>
            <Button variant="outline" size="sm" onClick={() => setSent(false)}>
              Enviar otra solicitud
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" defaultValue={currentUser.name} required />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="sofia@mitribu.app" required />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Categoría</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {supportCategories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea id="message" placeholder="Cuéntanos con el máximo detalle posible qué ha ocurrido..." className="min-h-32" required />
            </div>
            <button
              type="button"
              className="flex w-fit items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-hover"
            >
              <Paperclip className="h-3.5 w-3.5" /> Adjuntar captura o archivo
            </button>
            <div className="flex justify-end">
              <Button type="submit">
                <Send className="h-4 w-4" /> Enviar solicitud
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
