"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhotoUpload } from "@/components/publish/photo-upload";
import { PublishSuccess } from "@/components/publish/publish-success";
import { useListings } from "@/context/listings-context";
import { amenitiesList, cities, propertyTypes, universities } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { PropertyType } from "@/types";

export default function PublicarPropiedadPage() {
  const router = useRouter();
  const { addProperty } = useListings();
  const [publishing, setPublishing] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    city: cities[0],
    neighborhood: "",
    type: "habitacion" as PropertyType,
    bedrooms: "1",
    bathrooms: "1",
    size: "",
    availableFrom: "",
    minStay: "6 meses",
    nearestUniversity: universities[0],
    distanceToUniversity: "10",
    furnished: true,
    billsIncluded: false,
    petsAllowed: false,
    description: "",
    amenities: [] as string[],
  });

  function toggleAmenity(a: string) {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const property = addProperty({
      title: form.title,
      description: form.description,
      images: [0, 1, 2, 3].map((i) => `https://images.unsplash.com/photo-${["1502672260266-1c1ef2d93688", "1522708323590-d24dbb6b0267", "1484154218962-a197022b5858", "1493809842364-78817add7ffb"][i]}?w=1200&q=80&auto=format&fit=crop`),
      price: Number(form.price) || 0,
      city: form.city,
      neighborhood: form.neighborhood,
      type: form.type,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      size: Number(form.size) || 0,
      furnished: form.furnished,
      billsIncluded: form.billsIncluded,
      availableFrom: form.availableFrom || new Date().toISOString(),
      minStay: form.minStay,
      distanceToUniversity: Number(form.distanceToUniversity) || 0,
      nearestUniversity: form.nearestUniversity,
      petsAllowed: form.petsAllowed,
      amenities: form.amenities,
      featured: false,
    });

    setPublishing(true);
    setTimeout(() => router.push(`/pisos/${property.id}`), 1400);
  }

  return (
    <div className="container max-w-2xl py-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Publicar propiedad</h1>
      <p className="mt-1 text-muted-foreground">Encuentra a tu próximo inquilino o compañero/a de piso.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Detalles del alojamiento</CardTitle>
          <CardDescription>Sé lo más claro posible: genera más confianza y más contactos.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-1.5">
              <Label>Fotos</Label>
              <PhotoUpload />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="title">Título</Label>
              <Input id="title" placeholder="p. ej. Habitación luminosa cerca del campus" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="price">Precio mensual</Label>
                <div className="relative">
                  <Input id="price" type="number" min={0} required className="pr-8" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Tipo de alojamiento</Label>
                <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v as PropertyType }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="neighborhood">Barrio / zona</Label>
                <Input id="neighborhood" placeholder="p. ej. Malasaña" required value={form.neighborhood} onChange={(e) => setForm((f) => ({ ...f, neighborhood: e.target.value }))} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="grid gap-1.5">
                <Label htmlFor="bedrooms">Habitaciones</Label>
                <Input id="bedrooms" type="number" min={0} value={form.bedrooms} onChange={(e) => setForm((f) => ({ ...f, bedrooms: e.target.value }))} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="bathrooms">Baños</Label>
                <Input id="bathrooms" type="number" min={0} value={form.bathrooms} onChange={(e) => setForm((f) => ({ ...f, bathrooms: e.target.value }))} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="size">Tamaño (m²)</Label>
                <Input id="size" type="number" min={0} value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="availableFrom">Disponible desde</Label>
                <Input id="availableFrom" type="date" value={form.availableFrom} onChange={(e) => setForm((f) => ({ ...f, availableFrom: e.target.value }))} />
              </div>
              <div className="grid gap-1.5">
                <Label>Estancia mínima</Label>
                <Select value={form.minStay} onValueChange={(v) => setForm((f) => ({ ...f, minStay: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["1 mes", "3 meses", "6 meses", "9 meses", "12 meses"].map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Universidad más cercana</Label>
                <Select value={form.nearestUniversity} onValueChange={(v) => setForm((f) => ({ ...f, nearestUniversity: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {universities.map((u) => (
                      <SelectItem key={u} value={u}>{u}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="distance">Distancia a la universidad (min)</Label>
                <Input id="distance" type="number" min={0} value={form.distanceToUniversity} onChange={(e) => setForm((f) => ({ ...f, distanceToUniversity: e.target.value }))} />
              </div>
            </div>

            <div className="grid gap-3.5 rounded-xl border border-border p-4 sm:grid-cols-3">
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-start sm:gap-1.5">
                <Label htmlFor="furnished">Amueblado</Label>
                <Switch id="furnished" checked={form.furnished} onCheckedChange={(v) => setForm((f) => ({ ...f, furnished: v }))} />
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-start sm:gap-1.5">
                <Label htmlFor="bills">Gastos incluidos</Label>
                <Switch id="bills" checked={form.billsIncluded} onCheckedChange={(v) => setForm((f) => ({ ...f, billsIncluded: v }))} />
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-start sm:gap-1.5">
                <Label htmlFor="pets">Mascotas</Label>
                <Switch id="pets" checked={form.petsAllowed} onCheckedChange={(v) => setForm((f) => ({ ...f, petsAllowed: v }))} />
              </div>
            </div>

            <div>
              <Label>Características y extras</Label>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {amenitiesList.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      form.amenities.includes(a) ? "border-primary bg-primary-50 text-primary-700" : "border-border hover:bg-surface-hover"
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                required
                className="min-h-32"
                placeholder="Describe el ambiente, tus compañeros de piso, el barrio..."
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>

            <Button type="submit" size="lg" className="mt-2">
              Publicar propiedad
            </Button>
          </form>
        </CardContent>
      </Card>

      <PublishSuccess show={publishing} />
    </div>
  );
}
