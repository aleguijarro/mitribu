"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Revela una lista en tandas a medida que el usuario hace scroll, simulando
 * un feed de scroll infinito sin necesidad de paginar contra un backend.
 * Cuando conectes una API real, sustituye `items` por páginas obtenidas
 * bajo demanda y usa `sentinelRef` para disparar el `fetch` de la página siguiente.
 */
export function useInfiniteReveal<T>(items: T[], pageSize = 9) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items.length, pageSize]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < items.length) {
          setLoading(true);
          const timeout = setTimeout(() => {
            setVisibleCount((c) => Math.min(c + pageSize, items.length));
            setLoading(false);
          }, 450);
          return () => clearTimeout(timeout);
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, items.length, pageSize]);

  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
  const hasMore = visibleCount < items.length;

  return { visibleItems, hasMore, loading, sentinelRef };
}
