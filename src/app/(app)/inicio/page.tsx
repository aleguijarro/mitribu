"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SearchBar } from "@/components/shared/search-bar";
import { CategoryPill } from "@/components/shared/category-pill";
import { SectionHeader } from "@/components/shared/section-header";
import { HorizontalScroller } from "@/components/shared/horizontal-scroller";
import { PropertyCard } from "@/components/properties/property-card";
import { ProductCard } from "@/components/marketplace/product-card";
import { PostCard } from "@/components/community/post-card";
import { Button } from "@/components/ui/button";
import { useListings } from "@/context/listings-context";
import { useCommunity } from "@/context/community-context";
import { useAuth } from "@/context/auth-context";
import { currentUser } from "@/data/current-user";
import { quickFilters } from "@/lib/constants";

export default function InicioPage() {
  const { properties, products } = useListings();
  const { posts } = useCommunity();
  const { onboarding } = useAuth();

  const city = onboarding.city || currentUser.city;
  const firstName = currentUser.name.split(" ")[0];

  const forYou = [...properties]
    .sort((a, b) => (a.city === city ? -1 : 1) - (b.city === city ? -1 : 1))
    .slice(0, 8);

  const nearUniversity = properties
    .filter((p) => p.nearestUniversity === (onboarding.university || currentUser.university))
    .slice(0, 8);

  const newest = [...properties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8);

  const popularProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 3).concat(products.slice(3, 10));

  return (
    <div className="container py-8 sm:py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Hola, {firstName} 👋</h1>
        <p className="text-muted-foreground">¿Qué estás buscando hoy?</p>
      </div>

      <div className="mt-6">
        <SearchBar />
      </div>

      <div className="-mx-4 mt-6 flex gap-3 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
        {quickFilters.map((f) => (
          <CategoryPill key={f.id} filter={f} />
        ))}
      </div>

      <section className="mt-12">
        <SectionHeader
          title={`Para ti en ${city}`}
          subtitle="Seleccionado según tu ciudad y tus últimas búsquedas."
          href="/pisos"
        />
        <HorizontalScroller>
          {forYou.map((p) => (
            <PropertyCard key={p.id} property={p} className="w-[240px] sm:w-[260px]" />
          ))}
        </HorizontalScroller>
      </section>

      {nearUniversity.length > 0 && (
        <section className="mt-12">
          <SectionHeader
            title="Cerca de tu universidad"
            subtitle={onboarding.university || currentUser.university}
            href={`/pisos?universidad=${encodeURIComponent(onboarding.university || currentUser.university || "")}`}
          />
          <HorizontalScroller>
            {nearUniversity.map((p) => (
              <PropertyCard key={p.id} property={p} className="w-[240px] sm:w-[260px]" />
            ))}
          </HorizontalScroller>
        </section>
      )}

      <section className="mt-12">
        <SectionHeader title="Popular entre estudiantes" subtitle="Lo más visto del Marketplace esta semana." href="/marketplace" />
        <HorizontalScroller>
          {popularProducts.map((p) => (
            <ProductCard key={p.id} product={p} className="w-[170px] sm:w-[200px]" />
          ))}
        </HorizontalScroller>
      </section>

      <section className="mt-12 overflow-hidden rounded-3xl bg-tribu-gradient px-6 py-10 text-center sm:px-10">
        <Sparkles className="mx-auto h-7 w-7 text-primary-foreground" />
        <h2 className="mt-3 text-xl font-bold text-primary-foreground sm:text-2xl">¿Tienes algo que ya no usas?</h2>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-primary-foreground/85">
          Publicarlo en MiTribu te lleva menos de dos minutos y le puede cambiar el mes a otro estudiante.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-5 bg-white text-primary-700 hover:bg-white/90">
          <Link href="/publicar">Publicar ahora</Link>
        </Button>
      </section>

      <section className="mt-12">
        <SectionHeader title="Nuevos anuncios" subtitle="Recién publicados por otros estudiantes." href="/pisos" />
        <HorizontalScroller>
          {newest.map((p) => (
            <PropertyCard key={p.id} property={p} className="w-[240px] sm:w-[260px]" />
          ))}
        </HorizontalScroller>
      </section>

      <section className="mt-12">
        <SectionHeader title="Lo que se cuece en tu comunidad" subtitle="Últimas publicaciones de estudiantes como tú." href="/comunidad" />
        <div className="grid gap-5 md:grid-cols-2">
          {posts.slice(0, 2).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
