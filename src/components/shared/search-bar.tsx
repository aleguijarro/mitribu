"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  action?: string;
  size?: "lg" | "md";
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  placeholder = "Busca pisos, habitaciones, muebles, libros...",
  defaultValue = "",
  action = "/buscar",
  size = "lg",
  className,
  autoFocus,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`${action}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn(
        "group flex w-full items-center gap-3 rounded-full border border-border bg-card px-5 shadow-soft transition-shadow focus-within:shadow-elevated focus-within:ring-2 focus-within:ring-ring",
        size === "lg" ? "h-14 sm:h-16" : "h-12",
        className
      )}
    >
      <Search className={cn("shrink-0 text-muted-foreground", size === "lg" ? "h-5 w-5" : "h-4 w-4")} />
      <label htmlFor="mitribu-search" className="sr-only">
        Buscar en MiTribu
      </label>
      <input
        id="mitribu-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground",
          size === "lg" ? "text-[15px] sm:text-base" : "text-sm"
        )}
      />
      <button
        type="submit"
        className={cn(
          "shrink-0 rounded-full bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary-600",
          size === "lg" ? "px-5 py-2.5 text-sm" : "px-4 py-1.5 text-xs"
        )}
      >
        Buscar
      </button>
    </form>
  );
}
