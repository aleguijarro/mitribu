"use client";

import { Flag, MoreHorizontal, Share2, UserX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function MoreActionsMenu({ listingLabel = "publicación" }: { listingLabel?: string }) {
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Más acciones">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={() => toast({ title: "Enlace copiado 🔗", description: "Ya puedes compartir este enlace." })}
        >
          <Share2 className="h-4 w-4" /> Compartir
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:bg-destructive/10"
          onClick={() =>
            toast({ title: "Gracias por avisarnos 🙏", description: `Hemos recibido tu reporte de esta ${listingLabel}.` })
          }
        >
          <Flag className="h-4 w-4" /> Reportar {listingLabel}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:bg-destructive/10"
          onClick={() => toast({ title: "Usuario reportado", description: "Revisaremos el perfil en menos de 24h." })}
        >
          <UserX className="h-4 w-4" /> Reportar usuario
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
