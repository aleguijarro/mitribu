"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Home } from "lucide-react";
import { SearchBar } from "@/components/shared/search-bar";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyFilters, defaultPropertyFilters, type PropertyFiltersState } from "@/components/properties/property-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteReveal } from "@/hooks/use-infinite-reveal";
import { useListings } from "@/context/listings-context";

function PisosContent() {
  const searchParams = useSearchParams();
  const { properties } = useListings();

  const [filters, setFilters] = useState<PropertyFiltersState>({
    ...defaultPropertyFilters,
    city: searchParams.get("ciudad") ?? "",
    type: searchParams.get("tipo") ?? "",
    university: searchParams.get("universidad") ?? "",
  });
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (query && !(p.title.toLowerCase().includes(query) || p.city.toLowerCase().includes(query) || p.neighborhood.toLowerCase().includes(query))) return false;
      if (filters.city && p.city !== filters.city) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.bedrooms > 0 && p.bedrooms < filters.bedrooms) return false;
      if (filters.maxDistance > 0 && p.distanceToUniversity > filters.maxDistance) return false;
      if (filters.university && p.nearestUniversity !== filters.university) return false;
      if (filters.furnished && !p.furnished) return false;
      if (filters.billsIncluded && !p.billsIncluded) return false;
      if (filters.petsAllowed && !p.petsAllowed) return false;
      if (filters.gender && p.genderPreference && p.genderPreference !== "sin-preferencia" && p.genderPreference !== filters.gender) return false;
      if (filters.amenities.length > 0 && !filters.amenities.every((a) => p.amenities.includes(a))) return false;
      return true;
    });
  }, [properties, query, filters]);

  const { visibleItems, hasMore, loading, sentinelRef } = useInfiniteReveal(filtered, 9);

  return (
    <div className="container py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">¿Dónde quieres vivir?</h1>
        <p className="mt-1 text-muted-foreground">Explora habitaciones, estudios y pisos completos cerca de tu universidad.</p>
      </div>

      <SearchBar placeholder="Busca por ciudad, barrio o título del piso..." defaultValue={query} action="/pisos" />

      <div className="mt-5 overflow-x-auto no-scrollbar">
        <PropertyFilters value={filters} onChange={setFilters} />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Home}
          title="No encontramos pisos con esos filtros"
          description="Prueba a ampliar la distancia, el presupuesto o quitar algún filtro para ver más resultados."
          actionLabel="Limpiar filtros"
          actionHref="/pisos"
          className="mt-10"
        />
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleItems.map((property, i) => (
              <PropertyCard key={property.id} property={property} priority={i < 4} />
            ))}
          </div>
          {hasMore && (
            <div ref={sentinelRef} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {loading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[4/5] w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function PisosPage() {
  return (
    <Suspense>
      <PisosContent />
    </Suspense>
  );
}
