"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { FavoriteItem, FavoriteKind } from "@/types";

interface FavoritesContextValue {
  favorites: FavoriteItem[];
  isFavorite: (id: string, kind: FavoriteKind) => boolean;
  toggleFavorite: (id: string, kind: FavoriteKind) => boolean; // devuelve el nuevo estado
  countByKind: (kind: FavoriteKind) => number;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>("mitribu:favorites", []);

  const value = useMemo<FavoritesContextValue>(() => {
    const isFavorite = (id: string, kind: FavoriteKind) =>
      favorites.some((f) => f.id === id && f.kind === kind);

    const toggleFavorite = (id: string, kind: FavoriteKind) => {
      let nowFavorite = false;
      setFavorites((prev) => {
        const exists = prev.some((f) => f.id === id && f.kind === kind);
        nowFavorite = !exists;
        return exists
          ? prev.filter((f) => !(f.id === id && f.kind === kind))
          : [...prev, { id, kind }];
      });
      return nowFavorite;
    };

    const countByKind = (kind: FavoriteKind) => favorites.filter((f) => f.kind === kind).length;

    return { favorites, isFavorite, toggleFavorite, countByKind };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
  return ctx;
}
