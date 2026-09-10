"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BedDouble,
  Bath,
  Ruler,
  CalendarDays,
  TrainFront,
  Wallet,
  PawPrint,
  Sofa,
  ChevronRight,
} from "lucide-react";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { MapPlaceholder } from "@/components/properties/map-placeholder";
import { PropertyCard } from "@/components/properties/property-card";
import { ContactCard } from "@/components/shared/contact-card";
import { ReviewsList } from "@/components/shared/reviews-list";
import { SaveButton } from "@/components/shared/save-button";
import { MoreActionsMenu } from "@/components/shared/more-actions-menu";
import { Rating } from "@/components/shared/rating";
import { VerifiedBadge } from "@/components/shared/verified-badge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "@/components/shared/section-header";
import { HorizontalScroller } from "@/components/shared/horizontal-scroller";
import { useListings } from "@/context/listings-context";
import { getUserById } from "@/data/users";
import { getReviewsForUser } from "@/data/reviews";
import { propertyTypes } from "@/lib/constants";
import { formatDate, formatPrice } from "@/lib/format";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { properties } = useListings();
  const property = properties.find((p) => p.id === id);

  if (!property) notFound();

  const host = getUserById(property.hostId);
  const reviews = host ? getReviewsForUser(host.id).filter((r) => r.context === "propiedad") : [];
  const typeLabel = propertyTypes.find((t) => t.id === property.type)?.label ?? property.type;
  const similar = properties.filter((p) => p.id !== property.id && p.city === property.city).slice(0, 4);

  const facts = [
    { icon: BedDouble, label: `${property.bedrooms} ${property.bedrooms === 1 ? "habitación" : "habitaciones"}` },
    { icon: Bath, label: `${property.bathrooms} ${property.bathrooms === 1 ? "baño" : "baños"}` },
    { icon: Ruler, label: `${property.size} m²` },
    { icon: TrainFront, label: `${property.distanceToUniversity} min a ${property.nearestUniversity}` },
    { icon: CalendarDays, label: `Disponible desde ${formatDate(property.availableFrom)}` },
    { icon: Wallet, label: property.billsIncluded ? "Gastos incluidos" : "Gastos no incluidos" },
    { icon: Sofa, label: property.furnished ? "Amueblado" : "Sin amueblar" },
    { icon: PawPrint, label: property.petsAllowed ? "Se admiten mascotas" : "No se admiten mascotas" },
  ];

  return (
    <div className="container py-6 sm:py-10">
      <nav className="mb-4 hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
        <Link href="/pisos" className="hover:text-foreground">Pisos</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{property.city}</span>
      </nav>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{property.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <Rating value={property.rating} reviewCount={property.reviewCount} />
            <span aria-hidden>·</span>
            <span>{property.neighborhood}, {property.city}</span>
            {property.verified && (
              <>
                <span aria-hidden className="hidden sm:inline">·</span>
                <VerifiedBadge />
              </>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <SaveButton id={property.id} kind="property" variant="inline" className="hidden sm:inline-flex" />
          <MoreActionsMenu listingLabel="propiedad" />
        </div>
      </div>

      <div className="mt-6">
        <PropertyGallery images={property.images} title={property.title} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{typeLabel}</p>
              <Badge variant="secondary" className="mt-1">
                Estancia mínima: {property.minStay}
              </Badge>
            </div>
            {host && (
              <Link href={`/perfil/${host.username}`} className="text-right text-sm">
                <p className="text-muted-foreground">Anfitrión/a</p>
                <p className="font-semibold hover:underline">{host.name}</p>
              </Link>
            )}
          </div>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold">Sobre este alojamiento</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{property.description}</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold">Características</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 text-sm">
                  <f.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </section>

          {property.amenities.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="text-lg font-semibold">Servicios y extras</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <Badge key={a} variant="outline">{a}</Badge>
                  ))}
                </div>
              </section>
            </>
          )}

          <Separator />

          <section>
            <h2 className="text-lg font-semibold">Ubicación</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A {property.distanceToUniversity} minutos de {property.nearestUniversity}
            </p>
            <div className="mt-4">
              <MapPlaceholder lat={property.lat} lng={property.lng} neighborhood={property.neighborhood} city={property.city} />
            </div>
          </section>

          {host && (
            <>
              <Separator />
              <section>
                <h2 className="text-lg font-semibold">Valoraciones sobre {host.name.split(" ")[0]}</h2>
                <div className="mt-4">
                  <ReviewsList reviews={reviews} />
                </div>
              </section>
            </>
          )}
        </div>

        <div>{host && <ContactCard user={host} roleLabel="Anfitrión/a" greeting={`Me interesa: ${property.title}`} attachment={{ type: "property", refId: property.id }} />}</div>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <SectionHeader title="¿Te imaginas viviendo aquí?" subtitle={`Más opciones en ${property.city} que podrían gustarte.`} />
          <HorizontalScroller>
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} className="w-[240px] sm:w-[260px]" />
            ))}
          </HorizontalScroller>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-16 z-30 flex items-center justify-between gap-3 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-xl sm:hidden">
        <p className="text-sm font-bold">
          {formatPrice(property.price)} <span className="text-xs font-normal text-muted-foreground">/mes</span>
        </p>
        <SaveButton id={property.id} kind="property" variant="inline" label="Guardar" />
      </div>
    </div>
  );
}
