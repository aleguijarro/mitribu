"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ChevronRight, MapPin, MessageCircle, Tag as TagIcon } from "lucide-react";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { ProductCard } from "@/components/marketplace/product-card";
import { OfferDialog } from "@/components/marketplace/offer-dialog";
import { SaveButton } from "@/components/shared/save-button";
import { MoreActionsMenu } from "@/components/shared/more-actions-menu";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Rating } from "@/components/shared/rating";
import { VerifiedBadge } from "@/components/shared/verified-badge";
import { ReviewsList } from "@/components/shared/reviews-list";
import { SectionHeader } from "@/components/shared/section-header";
import { HorizontalScroller } from "@/components/shared/horizontal-scroller";
import { UpgradeDialog } from "@/components/shared/upgrade-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useListings } from "@/context/listings-context";
import { useChat } from "@/context/chat-context";
import { usePlan } from "@/context/plan-context";
import { useToast } from "@/hooks/use-toast";
import { getUserById } from "@/data/users";
import { getReviewsForUser } from "@/data/reviews";
import { conditionLabels } from "@/lib/constants";
import { formatDate, formatPrice } from "@/lib/format";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products } = useListings();
  const product = products.find((p) => p.id === id);
  const { startConversation, conversations } = useChat();
  const { spendContact, contactsLeft, isPremium, hasContacted } = usePlan();
  const { toast } = useToast();
  const router = useRouter();
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  if (!product) notFound();

  const seller = getUserById(product.sellerId);
  const reviews = seller ? getReviewsForUser(seller.id).filter((r) => r.context === "producto") : [];
  const similar = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  // Si ya hay un chat abierto con el vendedor, escribirle no gasta contacto
  const alreadyChatting = !!seller && (hasContacted(seller.id) || conversations.some((c) => c.participantIds.includes(seller.id)));

  /** Prueba gratuita: contactar con un vendedor nuevo gasta 1 de los 3 contactos. */
  function ensureContact() {
    if (!seller) return false;
    if (alreadyChatting || spendContact(seller.id)) return true;
    setUpgradeOpen(true);
    return false;
  }

  function handleBuy() {
    if (!seller || !ensureContact()) return;
    const convId = startConversation(seller.id, `Me interesa: ${product!.title}`, { type: "product", refId: product!.id });
    toast({ title: "¡Perfecto! 🛍️", description: "Hemos avisado al vendedor de tu interés." });
    router.push(`/mensajes/${convId}`);
  }

  function handleMessage() {
    if (!seller || !ensureContact()) return;
    const convId = startConversation(seller.id, undefined, { type: "product", refId: product!.id });
    router.push(`/mensajes/${convId}`);
  }

  return (
    <div className="container py-6 sm:py-10">
      <nav className="mb-4 hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
        <Link href="/marketplace" className="hover:text-foreground">Marketplace</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="capitalize text-foreground">{product.category}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <PropertyGallery images={product.images} title={product.title} />

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="capitalize">{product.category}</Badge>
                <Badge variant="outline">{conditionLabels[product.condition]}</Badge>
                {product.negotiable && <Badge variant="default">Negociable</Badge>}
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{product.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {product.city} · Publicado el {formatDate(product.createdAt)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <SaveButton id={product.id} kind="product" variant="inline" className="hidden sm:inline-flex" />
              <MoreActionsMenu targetType="producto" targetId={product.id} userId={product.sellerId} />
            </div>
          </div>

          <p className="text-3xl font-extrabold">{formatPrice(product.price)}</p>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold">Descripción</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{product.description}</p>
          </section>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <Badge key={t} variant="outline">#{t}</Badge>
              ))}
            </div>
          )}

          {seller && (
            <>
              <Separator />
              <section>
                <h2 className="text-lg font-semibold">Valoraciones sobre {seller.name.split(" ")[0]}</h2>
                <div className="mt-4">
                  <ReviewsList reviews={reviews} />
                </div>
              </section>
            </>
          )}
        </div>

        <div className="space-y-4">
          {seller && (
            <Card className="sticky top-24">
              <CardContent className="p-5">
                <Link href={`/perfil/${seller.username}`} className="flex items-center gap-3">
                  <UserAvatar user={seller} size="lg" showVerified />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{seller.name}</p>
                    <p className="text-xs text-muted-foreground">Vendedor/a</p>
                    <Rating value={seller.rating} reviewCount={seller.reviewCount} className="mt-0.5" />
                  </div>
                </Link>
                {seller.verified && <VerifiedBadge className="mt-4" />}
                <div className="mt-5 grid gap-2.5">
                  <Button size="lg" className="w-full" onClick={handleBuy}>
                    Comprar / Me interesa
                  </Button>
                  <OfferDialog product={product} sellerId={seller.id} ensureContact={ensureContact} />
                  <Button size="lg" variant="outline" className="w-full" onClick={handleMessage}>
                    <MessageCircle className="h-4 w-4" /> Enviar mensaje
                  </Button>
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {isPremium
                    ? "Premium: contactos ilimitados."
                    : alreadyChatting
                      ? "Ya has contactado con esta persona."
                      : `Te quedan ${contactsLeft} contactos gratis.`}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <SectionHeader title="Quizá también te interese" subtitle="Más artículos de la misma categoría." />
          <HorizontalScroller>
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} className="w-[170px] sm:w-[200px]" />
            ))}
          </HorizontalScroller>
        </section>
      )}

      <UpgradeDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} reason="contactos" />

      <div className="fixed inset-x-0 bottom-16 z-30 flex items-center justify-between gap-3 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-xl sm:hidden">
        <p className="text-sm font-bold">{formatPrice(product.price)}</p>
        <div className="flex items-center gap-2">
          <SaveButton id={product.id} kind="product" variant="inline" label="" />
          <Button size="sm" onClick={handleBuy}>
            <TagIcon className="h-4 w-4" /> Me interesa
          </Button>
        </div>
      </div>
    </div>
  );
}
