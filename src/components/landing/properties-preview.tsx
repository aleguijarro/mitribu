import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/properties/property-card";
import { SectionHeader } from "@/components/shared/section-header";
import { HorizontalScroller } from "@/components/shared/horizontal-scroller";

export function PropertiesPreview() {
  const featured = properties.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="container py-16 sm:py-20">
      <SectionHeader
        title="Tu próximo hogar está aquí"
        subtitle="Habitaciones, estudios y pisos completos verificados cerca de tu universidad."
        href="/pisos"
        hrefLabel="Ver todos los pisos"
      />
      <HorizontalScroller>
        {featured.map((property) => (
          <PropertyCard key={property.id} property={property} className="w-[240px] sm:w-[260px]" />
        ))}
      </HorizontalScroller>
    </section>
  );
}
