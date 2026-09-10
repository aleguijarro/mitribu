import Image from "next/image";
import Link from "next/link";
import { Home, Tag } from "lucide-react";
import { getPropertyById } from "@/data/properties";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Message } from "@/types";

export function MessageBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[80%] sm:max-w-[65%]", isOwn ? "items-end" : "items-start")}>
        {message.attachment && <AttachmentCard attachment={message.attachment} isOwn={isOwn} />}
        {message.text && (
          <div
            className={cn(
              "rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed",
              isOwn ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-secondary text-foreground",
              message.attachment && "mt-1.5"
            )}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

function AttachmentCard({ attachment, isOwn }: { attachment: NonNullable<Message["attachment"]>; isOwn: boolean }) {
  if (attachment.type === "property" && attachment.refId) {
    const property = getPropertyById(attachment.refId);
    if (!property) return null;
    return (
      <Link
        href={`/pisos/${property.id}`}
        className={cn("flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5 shadow-subtle", isOwn && "rounded-br-md")}
      >
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image src={property.images[0]} alt="" fill sizes="56px" className="object-cover" />
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-[11px] font-medium text-primary">
            <Home className="h-3 w-3" /> Propiedad
          </p>
          <p className="truncate text-sm font-semibold">{property.title}</p>
          <p className="text-xs text-muted-foreground">{formatPrice(property.price)}/mes</p>
        </div>
      </Link>
    );
  }

  if (attachment.type === "product" && attachment.refId) {
    const product = getProductById(attachment.refId);
    if (!product) return null;
    return (
      <Link
        href={`/marketplace/${product.id}`}
        className={cn("flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5 shadow-subtle", isOwn && "rounded-br-md")}
      >
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image src={product.images[0]} alt="" fill sizes="56px" className="object-cover" />
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-[11px] font-medium text-primary">
            <Tag className="h-3 w-3" /> Producto
          </p>
          <p className="truncate text-sm font-semibold">{product.title}</p>
          <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
        </div>
      </Link>
    );
  }

  if (attachment.type === "offer") {
    return (
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-2xl border-2 border-dashed p-3",
          isOwn ? "border-primary-foreground/30 bg-primary/90 text-primary-foreground" : "border-primary/40 bg-primary-50 text-primary-700"
        )}
      >
        <Tag className="h-4 w-4 shrink-0" />
        <div>
          <p className="text-xs font-medium opacity-80">Oferta enviada</p>
          <p className="text-base font-bold">{formatPrice(attachment.offerAmount ?? 0)}</p>
        </div>
      </div>
    );
  }

  if (attachment.type === "image" && attachment.imageUrl) {
    return (
      <span className="relative block h-48 w-48 overflow-hidden rounded-2xl">
        <Image src={attachment.imageUrl} alt="Imagen adjunta" fill sizes="192px" className="object-cover" />
      </span>
    );
  }

  return null;
}
