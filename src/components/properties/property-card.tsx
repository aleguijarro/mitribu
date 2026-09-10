"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { BedDouble, MapPin, TrainFront } from "lucide-react";
import { SaveButton } from "@/components/shared/save-button";
import { Rating } from "@/components/shared/rating";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { propertyTypes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  className?: string;
  priority?: boolean;
}

export function PropertyCard({ property, className, priority }: PropertyCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const typeLabel = propertyTypes.find((t) => t.id === property.type)?.label ?? property.type;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={cn("group w-full shrink-0 snap-start", className)}
    >
      <Link href={`/pisos/${property.id}`} className="block">
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted"
          onMouseEnter={() => setImgIndex(1 % property.images.length)}
          onMouseLeave={() => setImgIndex(0)}
        >
          <Image
            src={property.images[imgIndex] ?? property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 280px"
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {property.featured && <Badge variant="dark">Destacado</Badge>}
            {property.verified && <Badge variant="default">✓ Verificado</Badge>}
          </div>
          <SaveButton id={property.id} kind="property" className="absolute right-3 top-3" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur dark:bg-black/60">
              {typeLabel}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-[15px] font-semibold leading-snug">{property.title}</h3>
            <Rating value={property.rating} className="shrink-0" />
          </div>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {property.neighborhood}, {property.city}
          </p>
          <p className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5 shrink-0" />
              {typeLabel}
            </span>
            <span className="flex items-center gap-1">
              <TrainFront className="h-3.5 w-3.5 shrink-0" />
              {property.distanceToUniversity} min
            </span>
          </p>
          <p className="pt-1 text-[15px] font-semibold">
            {formatPrice(property.price)} <span className="font-normal text-muted-foreground">/mes</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
