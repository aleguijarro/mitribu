"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { amenitiesList, cities, propertyTypes, universities } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface PropertyFiltersState {
  city: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  maxDistance: number;
  furnished: boolean;
  billsIncluded: boolean;
  petsAllowed: boolean;
  gender: string;
  university: string;
  amenities: string[];
}

export const defaultPropertyFilters: PropertyFiltersState = {
  city: "",
  type: "",
  minPrice: 0,
  maxPrice: 1000,
  bedrooms: 0,
  maxDistance: 0,
  furnished: false,
  billsIncluded: false,
  petsAllowed: false,
  gender: "",
  university: "",
  amenities: [],
};

function countActive(f: PropertyFiltersState) {
  let n = 0;
  if (f.city) n++;
  if (f.type) n++;
  if (f.minPrice > 0 || f.maxPrice < 1000) n++;
  if (f.bedrooms > 0) n++;
  if (f.maxDistance > 0) n++;
  if (f.furnished) n++;
  if (f.billsIncluded) n++;
  if (f.petsAllowed) n++;
  if (f.gender) n++;
  if (f.university) n++;
  n += f.amenities.length;
  return n;
}

interface Props {
  value: PropertyFiltersState;
  onChange: (value: PropertyFiltersState) => void;
}

export function PropertyFilters({ value, onChange }: Props) {
  const [draft, setDraft] = useState(value);
  const [open, setOpen] = useState(false);
  const activeCount = countActive(value);

  function apply() {
    onChange(draft);
    setOpen(false);
  }
  function reset() {
    setDraft(defaultPropertyFilters);
    onChange(defaultPropertyFilters);
    setOpen(false);
  }
  function toggleAmenity(a: string) {
    setDraft((d) => ({
      ...d,
      amenities: d.amenities.includes(a) ? d.amenities.filter((x) => x !== a) : [...d.amenities, a],
    }));
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Select value={value.city || "todas"} onValueChange={(v) => onChange({ ...value, city: v === "todas" ? "" : v })}>
        <SelectTrigger className="h-10 w-auto min-w-[140px] rounded-full">
          <SelectValue placeholder="Ciudad" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas las ciudades</SelectItem>
          {cities.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.type || "todos"} onValueChange={(v) => onChange({ ...value, type: v === "todos" ? "" : v })}>
        <SelectTrigger className="h-10 w-auto min-w-[160px] rounded-full">
          <SelectValue placeholder="Tipo de alojamiento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Cualquier tipo</SelectItem>
          {propertyTypes.map((t) => (
            <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Sheet open={open} onOpenChange={(o) => { setOpen(o); if (o) setDraft(value); }}>
        <SheetTrigger asChild>
          <Button variant="outline" className="h-10 rounded-full">
            <SlidersHorizontal className="h-4 w-4" />
            Más filtros
            {activeCount > 0 && (
              <Badge variant="default" className="ml-0.5 h-5 min-w-5 justify-center px-1">
                {activeCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Filtros de búsqueda</SheetTitle>
          </SheetHeader>

          <div className="flex-1 space-y-7 overflow-y-auto py-2">
            <div>
              <Label>Precio máximo</Label>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={25}
                  value={draft.maxPrice}
                  onChange={(e) => setDraft((d) => ({ ...d, maxPrice: Number(e.target.value) }))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[hsl(var(--primary))]"
                />
                <span className="w-20 shrink-0 text-right text-sm font-semibold">{draft.maxPrice} €</span>
              </div>
            </div>

            <div>
              <Label>Habitaciones mínimas</Label>
              <div className="mt-2.5 flex gap-2">
                {[0, 1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setDraft((d) => ({ ...d, bedrooms: n }))}
                    className={cn(
                      "h-9 w-9 rounded-full border text-sm font-medium transition-colors",
                      draft.bedrooms === n ? "border-primary bg-primary-50 text-primary-700" : "border-border hover:bg-surface-hover"
                    )}
                  >
                    {n === 0 ? "—" : n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Distancia máxima a la universidad</Label>
              <Select
                value={draft.maxDistance ? String(draft.maxDistance) : "any"}
                onValueChange={(v) => setDraft((d) => ({ ...d, maxDistance: v === "any" ? 0 : Number(v) }))}
              >
                <SelectTrigger className="mt-2.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Cualquier distancia</SelectItem>
                  <SelectItem value="10">Menos de 10 min</SelectItem>
                  <SelectItem value="15">Menos de 15 min</SelectItem>
                  <SelectItem value="20">Menos de 20 min</SelectItem>
                  <SelectItem value="30">Menos de 30 min</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Universidad</Label>
              <Select value={draft.university || "any"} onValueChange={(v) => setDraft((d) => ({ ...d, university: v === "any" ? "" : v }))}>
                <SelectTrigger className="mt-2.5">
                  <SelectValue placeholder="Cualquier universidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Cualquier universidad</SelectItem>
                  {universities.map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Preferencias</Label>
              <Select value={draft.gender || "any"} onValueChange={(v) => setDraft((d) => ({ ...d, gender: v === "any" ? "" : v }))}>
                <SelectTrigger className="mt-2.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Sin preferencia</SelectItem>
                  <SelectItem value="chicas">Solo chicas</SelectItem>
                  <SelectItem value="chicos">Solo chicos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="furnished">Amueblado</Label>
                <Switch id="furnished" checked={draft.furnished} onCheckedChange={(v) => setDraft((d) => ({ ...d, furnished: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="bills">Gastos incluidos</Label>
                <Switch id="bills" checked={draft.billsIncluded} onCheckedChange={(v) => setDraft((d) => ({ ...d, billsIncluded: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pets">Se admiten mascotas</Label>
                <Switch id="pets" checked={draft.petsAllowed} onCheckedChange={(v) => setDraft((d) => ({ ...d, petsAllowed: v }))} />
              </div>
            </div>

            <div>
              <Label>Extras</Label>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {amenitiesList.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      draft.amenities.includes(a) ? "border-primary bg-primary-50 text-primary-700" : "border-border hover:bg-surface-hover"
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <SheetFooter className="flex-row items-center justify-between border-t border-border pt-4">
            <button onClick={reset} className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" /> Limpiar
            </button>
            <Button onClick={apply}>Ver resultados</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {activeCount > 0 && (
        <button onClick={() => onChange(defaultPropertyFilters)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
