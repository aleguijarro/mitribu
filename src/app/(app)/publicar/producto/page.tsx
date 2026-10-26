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
import { cities, conditionLabels, productCategories } from "@/lib/constants";
import { productPhoto } from "@/data/images";
import type { ProductCategory, ProductCondition } from "@/types";
import { Lock } from "lucide-react";
import { CONTACT_BLOCKED_NOTICE, filterContactInfo } from "@/lib/contact-filter";

export default function PublicarProductoPage() {
  const router = useRouter();
  const { addProduct } = useListings();
  const [publishing, setPublishing] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "" as ProductCategory | "",
    price: "",
    negotiable: false,
    condition: "buen-estado" as ProductCondition,
    description: "",
    city: cities[0],
    tags: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.category) return;

    const product = addProduct({
      title: filterContactInfo(form.title).text,
      description: filterContactInfo(form.description).text,
      images: [0, 1, 2].map((i) => productPhoto(form.category as string, i)),
      price: Number(form.price) || 0,
      negotiable: form.negotiable,
      condition: form.condition,
      category: form.category as ProductCategory,
      city: form.city,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });

    setPublishing(true);
    setTimeout(() => router.push(`/marketplace/${product.id}`), 1400);
  }

  return (
    <div className="container max-w-2xl py-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Publicar producto</h1>
      <p className="mt-1 text-muted-foreground">Vende a otros estudiantes en pocos minutos.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Detalles del producto</CardTitle>
          <CardDescription>Cuanta más información des, más rápido se vende.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-1.5">
              <Label>Fotos</Label>
              <PhotoUpload />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="title">Título</Label>
              <Input id="title" placeholder="p. ej. Monitor Samsung 27''" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Categoría</Label>
                <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v as ProductCategory }))}>
                  <SelectTrigger><SelectValue placeholder="Elige una categoría" /></SelectTrigger>
                  <SelectContent>
                    {productCategories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Estado</Label>
                <Select value={form.condition} onValueChange={(v) => setForm((f) => ({ ...f, condition: v as ProductCondition }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(conditionLabels).map(([id, label]) => (
                      <SelectItem key={id} value={id}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="price">Precio</Label>
                <div className="relative">
                  <Input id="price" type="number" min={0} required className="pr-8" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Ubicación</Label>
                <Select value={form.city} onValueChange={(v) => setForm((f) => ({ ...f, city: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border p-4">
              <div>
                <Label htmlFor="negotiable">Precio negociable</Label>
                <p className="text-xs text-muted-foreground">Los compradores podrán hacerte ofertas.</p>
              </div>
              <Switch id="negotiable" checked={form.negotiable} onCheckedChange={(v) => setForm((f) => ({ ...f, negotiable: v }))} />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                required
                className="min-h-32"
                placeholder="Describe el estado, por qué lo vendes, detalles importantes..."
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
              {filterContactInfo(form.description).blocked && (
                <p className="flex gap-2 rounded-lg bg-coral/10 px-3 py-2 text-xs text-coral">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {CONTACT_BLOCKED_NOTICE} Lo ocultaremos al publicar.
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="separados por comas, p. ej. monitor, samsung, escritorio" value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} />
            </div>

            <Button type="submit" size="lg" className="mt-2">
              Publicar producto
            </Button>
          </form>
        </CardContent>
      </Card>

      <PublishSuccess show={publishing} />
    </div>
  );
}
