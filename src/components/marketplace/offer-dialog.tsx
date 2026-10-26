"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChat } from "@/context/chat-context";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

interface OfferDialogProps {
  product: Product;
  sellerId: string;
  /** Comprueba (y gasta) un contacto del plan antes de enviar. Devuelve false si no quedan. */
  ensureContact?: () => boolean;
}

export function OfferDialog({ product, sellerId, ensureContact }: OfferDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(Math.round(product.price * 0.85));
  const { startConversation } = useChat();
  const { toast } = useToast();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (ensureContact && !ensureContact()) {
      setOpen(false);
      return;
    }
    const id = startConversation(sellerId, undefined, { type: "offer", offerAmount: amount, refId: product.id });
    setOpen(false);
    toast({ title: "Oferta enviada 🏷️", description: `Le has ofrecido ${formatPrice(amount)} al vendedor.` });
    router.push(`/mensajes/${id}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="secondary" className="w-full">
          <Tag className="h-4 w-4" /> Hacer oferta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Haz tu oferta</DialogTitle>
          <DialogDescription>
            Precio original: {formatPrice(product.price)}. Propón la cantidad que quieras pagar por &quot;{product.title}&quot;.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="offer">Tu oferta</Label>
            <div className="relative">
              <Input
                id="offer"
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pr-8"
                required
              />
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">Enviar oferta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
