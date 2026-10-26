"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReports } from "@/context/reports-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Report, ReportReason } from "@/types";

const reasons: { id: ReportReason; label: string }[] = [
  { id: "estafa", label: "Creo que es una estafa" },
  { id: "pide-pago-adelantado", label: "Pide dinero antes de ver el piso o firmar" },
  { id: "anuncio-falso", label: "El anuncio o las fotos son falsos" },
  { id: "suplantacion", label: "Se hace pasar por otra persona o no es estudiante" },
  { id: "contenido-inapropiado", label: "Contenido ofensivo o inapropiado" },
  { id: "otro", label: "Otro motivo" },
];

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetType: Report["targetType"];
  targetId: string;
}

export function ReportDialog({ open, onOpenChange, targetType, targetId }: ReportDialogProps) {
  const { addReport, hasReported } = useReports();
  const { toast } = useToast();
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [details, setDetails] = useState("");
  const alreadyReported = hasReported(targetType, targetId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reason) return;
    addReport({ targetType, targetId, reason, details: details.trim() });
    toast({ title: "Reporte enviado 🙏", description: "Nuestro equipo lo revisará en menos de 24 h. Gracias por cuidar de la tribu." });
    setReason(null);
    setDetails("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reportar {targetType}</DialogTitle>
          <DialogDescription>
            {alreadyReported
              ? "Ya nos has enviado un reporte sobre esto. Puedes añadir otro si hay algo nuevo."
              : "Cuéntanos qué pasa. Tu reporte es anónimo para la otra persona."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2" role="radiogroup" aria-label="Motivo del reporte">
            {reasons.map((r) => (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={reason === r.id}
                onClick={() => setReason(r.id)}
                className={cn(
                  "rounded-xl border px-4 py-2.5 text-left text-sm transition-colors",
                  reason === r.id ? "border-destructive bg-destructive/5 font-medium" : "border-border hover:bg-surface-hover"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="report-details">Detalles (opcional)</Label>
            <Textarea
              id="report-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="p. ej. me pidió una señal por Bizum antes de enseñarme el piso"
              className="min-h-20"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="destructive" disabled={!reason}>
              Enviar reporte
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
