"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Hook de estado sincronizado con localStorage. Sirve de "capa de
 * persistencia" mientras no hay backend: todo lo que hoy se guarda aquí
 * (favoritos, notificaciones leídas, borradores de publicación...) está
 * pensado para migrar a llamadas a una API sin cambiar la forma en que
 * los componentes consumen estos hooks.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      // localStorage no disponible o valor corrupto: se ignora y se usa el inicial
    } finally {
      setHydrated(true);
    }
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // almacenamiento lleno o no disponible: no rompemos la app
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, update, hydrated] as const;
}
