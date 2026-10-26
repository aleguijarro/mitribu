"use client";

import Link from "next/link";
import { Check, Sparkles, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/context/plan-context";
import { useToast } from "@/hooks/use-toast";
import { freePlanLimits, planDetails, pricing } from "@/lib/constants";
import { formatFee } from "@/lib/format";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason: "contactos" | "guardados";
  /** Se llama tras comprar, para continuar con la acción que se bloqueó. */
  onUpgraded?: () => void;
}

/** Aparece cuando la prueba gratuita llega a su límite de contactos o guardados. */
export function UpgradeDialog({ open, onOpenChange, reason, onUpgraded }: UpgradeDialogProps) {
  const { subscribe, buySingleContact } = usePlan();
  const { toast } = useToast();

  function choose(option: "semana" | "mes" | "contacto") {
    if (option === "contacto") {
      buySingleContact();
      toast({ title: "Contacto desbloqueado ⚡", description: `${formatFee(pricing.singleContact)} · pago de demostración, sin cargo.` });
    } else {
      subscribe(option);
      toast({
        title: `${planDetails[option].name} activado ✨`,
        description: "Se renueva automáticamente hasta que lo canceles. Pago de demostración, sin cargo.",
      });
    }
    onOpenChange(false);
    onUpgraded?.();
  }

  const title =
    reason === "contactos"
      ? `Has usado tus ${freePlanLimits.contacts} contactos gratis`
      : `Ya tienes ${freePlanLimits.savedListings} anuncios guardados`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            La prueba gratuita incluye búsqueda ilimitada, {freePlanLimits.savedListings} guardados y{" "}
            {freePlanLimits.contacts} contactos. Pásate a Premium para que no haya límites.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <PlanOption
            title="Premium mensual"
            price={`${formatFee(pricing.monthPlan)}/mes`}
            highlight
            onClick={() => choose("mes")}
          />
          <PlanOption title="Premium semanal" price={`${formatFee(pricing.weekPlan)}/semana`} onClick={() => choose("semana")} />
          {reason === "contactos" && (
            <button
              type="button"
              onClick={() => choose("contacto")}
              className="flex items-center justify-between rounded-xl border border-dashed border-border px-4 py-3 text-left text-sm transition-colors hover:bg-surface-hover"
            >
              <span className="flex items-center gap-2 font-medium">
                <Zap className="h-4 w-4 text-coral" /> Obtener contacto YA
              </span>
              <span className="font-semibold">{formatFee(pricing.singleContact)}</span>
            </button>
          )}
        </div>

        <ul className="grid gap-1.5 text-xs text-muted-foreground">
          {["Guardados y contactos ilimitados", "Se renueva solo; cancela cuando quieras antes del próximo cobro"].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-primary" /> {f}
            </li>
          ))}
        </ul>

        <Button variant="link" asChild className="h-auto p-0 text-xs">
          <Link href="/precios" onClick={() => onOpenChange(false)}>
            Ver todos los precios
          </Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function PlanOption({ title, price, highlight, onClick }: { title: string; price: string; highlight?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        highlight
          ? "flex items-center justify-between rounded-xl border-2 border-primary bg-primary-50 px-4 py-3 text-left text-sm"
          : "flex items-center justify-between rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors hover:bg-surface-hover"
      }
    >
      <span className="flex items-center gap-2 font-medium">
        <Sparkles className="h-4 w-4 text-primary" /> {title}
      </span>
      <span className="font-semibold">{price}</span>
    </button>
  );
}
