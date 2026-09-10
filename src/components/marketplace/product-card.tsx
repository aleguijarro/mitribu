"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SaveButton } from "@/components/shared/save-button";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { conditionLabels } from "@/lib/constants";
import { getUserById } from "@/data/users";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const seller = getUserById(product.sellerId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={cn("group w-full shrink-0 snap-start", className)}
    >
      <Link href={`/marketplace/${product.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {product.sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge variant="dark" className="text-[13px]">Vendido</Badge>
            </div>
          )}
          <SaveButton id={product.id} kind="product" className="absolute right-2.5 top-2.5 h-8 w-8" />
          {product.negotiable && (
            <Badge variant="default" className="absolute left-2.5 top-2.5">
              Negociable
            </Badge>
          )}
        </div>

        <div className="mt-2.5 space-y-1">
          <p className="line-clamp-1 text-sm font-semibold leading-snug">{product.title}</p>
          <p className="text-[15px] font-bold">{formatPrice(product.price)}</p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{conditionLabels[product.condition]}</span>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-0.5">
              <MapPin className="h-3 w-3" /> {product.city}
            </span>
          </p>
          {seller && (
            <div className="flex items-center gap-1.5 pt-1">
              <UserAvatar user={seller} size="xs" />
              <span className="truncate text-xs text-muted-foreground">
                {seller.name.split(" ")[0]} · ⭐ {seller.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
