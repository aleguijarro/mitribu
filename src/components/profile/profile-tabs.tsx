"use client";

import { FileText, Home, ShoppingBag, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/community/post-card";
import { ProductCard } from "@/components/marketplace/product-card";
import { PropertyCard } from "@/components/properties/property-card";
import { ReviewsList } from "@/components/shared/reviews-list";
import { EmptyState } from "@/components/shared/empty-state";
import { useCommunity } from "@/context/community-context";
import { useListings } from "@/context/listings-context";
import { getReviewsForUser } from "@/data/reviews";
import type { User } from "@/types";

export function ProfileTabs({ user }: { user: User }) {
  const { posts } = useCommunity();
  const { properties, products } = useListings();

  const userPosts = posts.filter((p) => p.authorId === user.id);
  const userProducts = products.filter((p) => p.sellerId === user.id);
  const userProperties = properties.filter((p) => p.hostId === user.id);
  const userReviews = getReviewsForUser(user.id);

  return (
    <Tabs defaultValue="publicaciones" className="mt-8">
      <TabsList>
        <TabsTrigger value="publicaciones">Publicaciones</TabsTrigger>
        <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        <TabsTrigger value="propiedades">Propiedades</TabsTrigger>
        <TabsTrigger value="valoraciones">Valoraciones</TabsTrigger>
      </TabsList>

      <TabsContent value="publicaciones">
        {userPosts.length === 0 ? (
          <EmptyState icon={FileText} title="Sin publicaciones todavía" description="Cuando comparta algo en la Comunidad, aparecerá aquí." />
        ) : (
          <div className="space-y-5">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="marketplace">
        {userProducts.length === 0 ? (
          <EmptyState icon={ShoppingBag} title="Nada en venta por ahora" description="Los artículos que publique en el Marketplace aparecerán aquí." />
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {userProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="propiedades">
        {userProperties.length === 0 ? (
          <EmptyState icon={Home} title="Sin propiedades publicadas" description="Los pisos y habitaciones que anuncie aparecerán aquí." />
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {userProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="valoraciones">
        {userReviews.length === 0 ? (
          <EmptyState icon={Star} title="Todavía sin valoraciones" description="Las valoraciones que reciba de otros estudiantes aparecerán aquí." />
        ) : (
          <ReviewsList reviews={userReviews} />
        )}
      </TabsContent>
    </Tabs>
  );
}
