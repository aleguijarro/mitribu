"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { SearchBar } from "@/components/shared/search-bar";
import { ProductCard } from "@/components/marketplace/product-card";
import { ProductFilters, defaultProductFilters, type ProductFiltersState } from "@/components/marketplace/product-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteReveal } from "@/hooks/use-infinite-reveal";
import { useListings } from "@/context/listings-context";

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const { products } = useListings();

  const [filters, setFilters] = useState<ProductFiltersState>({
    ...defaultProductFilters,
    category: searchParams.get("categoria") ?? "",
  });
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (query && !(p.title.toLowerCase().includes(query) || p.tags.some((t) => t.toLowerCase().includes(query)))) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.city && p.city !== filters.city) return false;
      if (filters.condition && p.condition !== filters.condition) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.negotiableOnly && !p.negotiable) return false;
      return true;
    });
  }, [products, query, filters]);

  const { visibleItems, hasMore, loading, sentinelRef } = useInfiniteReveal(filtered, 12);

  return (
    <div className="container py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Marketplace</h1>
        <p className="mt-1 text-muted-foreground">Compra y vende con otros estudiantes de tu ciudad.</p>
      </div>

      <SearchBar placeholder="Busca libros, muebles, tecnología..." defaultValue={query} action="/marketplace" />

      <div className="mt-5 overflow-x-auto no-scrollbar">
        <ProductFilters value={filters} onChange={setFilters} />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "artículo" : "artículos"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No hay artículos con esos filtros"
          description="Prueba con otra categoría, sube el presupuesto o quita algún filtro."
          actionLabel="Limpiar filtros"
          actionHref="/marketplace"
          className="mt-10"
        />
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleItems.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 6} />
            ))}
          </div>
          {hasMore && (
            <div ref={sentinelRef} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {loading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-2.5">
                    <Skeleton className="aspect-square w-full" />
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

export default function MarketplacePage() {
  return (
    <Suspense>
      <MarketplaceContent />
    </Suspense>
  );
}
