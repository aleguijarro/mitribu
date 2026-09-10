"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { SearchBar } from "@/components/shared/search-bar";
import { SectionHeader } from "@/components/shared/section-header";
import { PropertyCard } from "@/components/properties/property-card";
import { ProductCard } from "@/components/marketplace/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { useListings } from "@/context/listings-context";

function BuscarContent() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase();
  const { properties, products } = useListings();

  const matchingProperties = useMemo(
    () =>
      query
        ? properties.filter(
            (p) =>
              p.title.toLowerCase().includes(query) ||
              p.city.toLowerCase().includes(query) ||
              p.neighborhood.toLowerCase().includes(query)
          )
        : [],
    [properties, query]
  );

  const matchingProducts = useMemo(
    () =>
      query
        ? products.filter(
            (p) =>
              p.title.toLowerCase().includes(query) ||
              p.tags.some((t) => t.toLowerCase().includes(query)) ||
              p.category.toLowerCase().includes(query)
          )
        : [],
    [products, query]
  );

  const totalResults = matchingProperties.length + matchingProducts.length;

  return (
    <div className="container py-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Buscar en MiTribu</h1>
      <p className="mt-1 text-muted-foreground">Pisos, habitaciones, muebles, libros y mucho más.</p>

      <div className="mt-6">
        <SearchBar defaultValue={searchParams.get("q") ?? ""} />
      </div>

      {!query ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">Escribe algo para empezar a buscar.</p>
      ) : totalResults === 0 ? (
        <EmptyState
          icon={SearchX}
          title={`Sin resultados para "${searchParams.get("q")}"`}
          description="Prueba con otra palabra clave, o explora directamente Pisos y Marketplace."
          actionLabel="Explorar MiTribu"
          actionHref="/inicio"
          className="mt-10"
        />
      ) : (
        <div className="mt-8 space-y-12">
          {matchingProperties.length > 0 && (
            <section>
              <SectionHeader title={`Pisos (${matchingProperties.length})`} href={`/pisos?q=${encodeURIComponent(query)}`} />
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                {matchingProperties.slice(0, 8).map((p) => <PropertyCard key={p.id} property={p} />)}
              </div>
            </section>
          )}
          {matchingProducts.length > 0 && (
            <section>
              <SectionHeader title={`Marketplace (${matchingProducts.length})`} href={`/marketplace?q=${encodeURIComponent(query)}`} />
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {matchingProducts.slice(0, 10).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense>
      <BuscarContent />
    </Suspense>
  );
}
