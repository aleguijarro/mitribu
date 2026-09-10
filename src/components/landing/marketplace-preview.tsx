import { products } from "@/data/products";
import { ProductCard } from "@/components/marketplace/product-card";
import { SectionHeader } from "@/components/shared/section-header";
import { HorizontalScroller } from "@/components/shared/horizontal-scroller";

export function MarketplacePreview() {
  const featured = products.slice(0, 8);

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container">
        <SectionHeader
          title="Compra y vende entre estudiantes"
          subtitle="Libros, muebles, tecnología y mucho más a precio de tribu."
          href="/marketplace"
          hrefLabel="Ver Marketplace"
        />
        <HorizontalScroller>
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} className="w-[170px] sm:w-[200px]" />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}
