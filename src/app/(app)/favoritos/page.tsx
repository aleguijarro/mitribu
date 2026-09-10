"use client";

import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyCard } from "@/components/properties/property-card";
import { ProductCard } from "@/components/marketplace/product-card";
import { PostCard } from "@/components/community/post-card";
import { EmptyState } from "@/components/shared/empty-state";
import { useFavorites } from "@/context/favorites-context";
import { useListings } from "@/context/listings-context";
import { useCommunity } from "@/context/community-context";

export default function FavoritosPage() {
  const { favorites } = useFavorites();
  const { properties, products } = useListings();
  const { posts } = useCommunity();

  const propertyIds = favorites.filter((f) => f.kind === "property").map((f) => f.id);
  const productIds = favorites.filter((f) => f.kind === "product").map((f) => f.id);
  const postIds = favorites.filter((f) => f.kind === "post").map((f) => f.id);

  const savedProperties = properties.filter((p) => propertyIds.includes(p.id));
  const savedProducts = products.filter((p) => productIds.includes(p.id));
  const savedPosts = posts.filter((p) => postIds.includes(p.id));

  return (
    <div className="container py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Mis favoritos</h1>
        <p className="mt-1 text-muted-foreground">Todo lo que has guardado, en un mismo sitio.</p>
      </div>

      <Tabs defaultValue="pisos">
        <TabsList>
          <TabsTrigger value="pisos">Pisos ({savedProperties.length})</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace ({savedProducts.length})</TabsTrigger>
          <TabsTrigger value="comunidad">Comunidad ({savedPosts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pisos">
          {savedProperties.length === 0 ? (
            <EmptyState icon={Heart} title="Aún no has guardado ningún piso" description="Pulsa el corazón de cualquier propiedad para guardarla aquí." actionLabel="Explorar pisos" actionHref="/pisos" />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {savedProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="marketplace">
          {savedProducts.length === 0 ? (
            <EmptyState icon={Heart} title="Aún no has guardado ningún producto" description="Pulsa el corazón de cualquier artículo para guardarlo aquí." actionLabel="Explorar Marketplace" actionHref="/marketplace" />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {savedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="comunidad">
          {savedPosts.length === 0 ? (
            <EmptyState icon={Heart} title="Aún no has guardado publicaciones" description="Guarda publicaciones interesantes de la Comunidad para volver a leerlas." actionLabel="Ir a Comunidad" actionHref="/comunidad" />
          ) : (
            <div className="mx-auto max-w-2xl space-y-5">
              {savedPosts.map((p) => <PostCard key={p.id} post={p} />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
