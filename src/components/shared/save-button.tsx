"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from "@/context/favorites-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { FavoriteKind } from "@/types";

interface SaveButtonProps {
  id: string;
  kind: FavoriteKind;
  label?: string;
  className?: string;
  variant?: "floating" | "inline";
}

const kindLabel: Record<FavoriteKind, string> = {
  property: "Propiedad",
  product: "Producto",
  post: "Publicación",
};

export function SaveButton({ id, kind, label, className, variant = "floating" }: SaveButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const saved = isFavorite(id, kind);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = toggleFavorite(id, kind);
    toast({
      title: nowSaved ? "❤️ Guardado" : "Eliminado de guardados",
      description: nowSaved
        ? `${kindLabel[kind]} añadida a tus favoritos.`
        : `${kindLabel[kind]} eliminada de tus favoritos.`,
    });
  }

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={saved ? "Quitar de guardados" : "Guardar"}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-hover",
          className
        )}
      >
        <motion.span whileTap={{ scale: 1.3 }} className="inline-flex">
          <Heart className={cn("h-4 w-4 transition-colors", saved ? "fill-coral text-coral" : "text-foreground")} />
        </motion.span>
        {label ?? (saved ? "Guardado" : "Guardar")}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? "Quitar de guardados" : "Guardar"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-subtle backdrop-blur transition-transform hover:scale-105 dark:bg-black/50",
        className
      )}
    >
      <motion.span whileTap={{ scale: 1.35 }} animate={saved ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.35 }}>
        <Heart className={cn("h-[18px] w-[18px] transition-colors", saved ? "fill-coral text-coral" : "text-foreground")} />
      </motion.span>
    </button>
  );
}
