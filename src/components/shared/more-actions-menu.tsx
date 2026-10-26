"use client";

import { useState } from "react";
import { Flag, MoreHorizontal, Share2, UserX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ReportDialog } from "@/components/shared/report-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Report } from "@/types";

interface MoreActionsMenuProps {
  targetType: Report["targetType"];
  targetId: string;
  /** Autor del anuncio: añade la opción "Reportar usuario". */
  userId?: string;
}

export function MoreActionsMenu({ targetType, targetId, userId }: MoreActionsMenuProps) {
  const { toast } = useToast();
  const [reporting, setReporting] = useState<{ type: Report["targetType"]; id: string } | null>(null);

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url, title: document.title });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast({ title: "Enlace copiado 🔗", description: "Ya puedes compartir este enlace." });
    } catch (err) {
      // El usuario cerró el menú de compartir: no es un error
      if (err instanceof DOMException && err.name === "AbortError") return;
      toast({ title: "No hemos podido copiar el enlace", description: url });
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Más acciones">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleShare}>
            <Share2 className="h-4 w-4" /> Compartir
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/10"
            onClick={() => setReporting({ type: targetType, id: targetId })}
          >
            <Flag className="h-4 w-4" /> Reportar {targetType}
          </DropdownMenuItem>
          {userId && (
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/10"
              onClick={() => setReporting({ type: "usuario", id: userId })}
            >
              <UserX className="h-4 w-4" /> Reportar usuario
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ReportDialog
        open={!!reporting}
        onOpenChange={(open) => !open && setReporting(null)}
        targetType={reporting?.type ?? targetType}
        targetId={reporting?.id ?? targetId}
      />
    </>
  );
}
