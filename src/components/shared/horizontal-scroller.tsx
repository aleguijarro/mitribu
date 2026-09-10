"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HorizontalScrollerProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
}

/** Carrusel horizontal con scroll nativo (touch-friendly) y flechas en desktop. */
export function HorizontalScroller({ children, className }: HorizontalScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);

  function scrollBy(delta: number) {
    ref.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <div className="relative group/scroller">
      <div
        ref={ref}
        className={cn("flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-1", className)}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label="Desplazar a la izquierda"
        onClick={() => scrollBy(-360)}
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 -translate-x-3 items-center justify-center rounded-full border border-border bg-card p-2 shadow-elevated opacity-0 transition-opacity group-hover/scroller:opacity-100 lg:flex hover:bg-surface-hover"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Desplazar a la derecha"
        onClick={() => scrollBy(360)}
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-3 items-center justify-center rounded-full border border-border bg-card p-2 shadow-elevated opacity-0 transition-opacity group-hover/scroller:opacity-100 lg:flex hover:bg-surface-hover"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
