"use client";

import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatFee } from "@/lib/format";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  concept: string;
  amount: number;
  confirmLabel?: string;
  onConfirm: () => void;
}

/**
 * Checkout simulado. Todavía no hay pasarela de pago: el botón confirma
 * la acción sin cobrar nada. Sustituir por Stripe Checkout (ver README).
 */
export function PaymentDialog({
  open,
  onOpenChange,
  title,
  description,
  concept,
  amount,
  confirmLabel,
  onConfirm,
}: PaymentDialogProps) {
  const [processing, setProcessing] = useState(false);

  function handleConfirm() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onOpenChange(false);
      onConfirm();
    }, 700);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-border bg-secondary/60 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{concept}</span>
            <span className="text-base font-bold">{formatFee(amount)}</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <CreditCard className="h-3.5 w-3.5" />
            Versión de demostración: no se realiza ningún cargo real.
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={processing}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={processing}>
            <Lock className="h-4 w-4" />
            {processing ? "Procesando..." : confirmLabel ?? `Pagar ${formatFee(amount)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
