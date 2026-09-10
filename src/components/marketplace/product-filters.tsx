"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities, conditionLabels, productCategories } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface ProductFiltersState {
  category: string;
  city: string;
  condition: string;
  maxPrice: number;
  negotiableOnly: boolean;
}

export const defaultProductFilters: ProductFiltersState = {
  category: "",
  city: "",
  condition: "",
  maxPrice: 700,
  negotiableOnly: false,
};

function countActive(f: ProductFiltersState) {
  let n = 0;
  if (f.category) n++;
  if (f.city) n++;
  if (f.condition) n++;
  if (f.maxPrice < 700) n++;
  if (f.negotiableOnly) n++;
  return n;
}

interface Props {
  value: ProductFiltersState;
  onChange: (value: ProductFiltersState) => void;
}

export function ProductFilters({ value, onChange }: Props) {
  const activeCount = countActive(value);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Select value={value.category || "todas"} onValueChange={(v) => onChange({ ...value, category: v === "todas" ? "" : v })}>
        <SelectTrigger className="h-10 w-auto min-w-[150px] rounded-full">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas las categorías</SelectItem>
          {productCategories.map((c) => (
            <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.city || "todas"} onValueChange={(v) => onChange({ ...value, city: v === "todas" ? "" : v })}>
        <SelectTrigger className="h-10 w-auto min-w-[130px] rounded-full">
          <SelectValue placeholder="Ciudad" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas las ciudades</SelectItem>
          {cities.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.condition || "todos"} onValueChange={(v) => onChange({ ...value, condition: v === "todos" ? "" : v })}>
        <SelectTrigger className="h-10 w-auto min-w-[140px] rounded-full">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Cualquier estado</SelectItem>
          {Object.entries(conditionLabels).map(([id, label]) => (
            <SelectItem key={id} value={id}>{label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <button
        type="button"
        onClick={() => onChange({ ...value, negotiableOnly: !value.negotiableOnly })}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors",
          value.negotiableOnly ? "border-primary bg-primary-50 text-primary-700" : "border-border hover:bg-surface-hover"
        )}
      >
        <SlidersHorizontal className="h-3.5 w-3.5" /> Solo negociables
      </button>

      {activeCount > 0 && (
        <button onClick={() => onChange(defaultProductFilters)} className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
          <X className="h-3.5 w-3.5" /> Limpiar filtros
          <Badge variant="default" className="ml-0.5 h-5 min-w-5 justify-center px-1">{activeCount}</Badge>
        </button>
      )}
    </div>
  );
}
