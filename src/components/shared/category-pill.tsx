import Link from "next/link";
import type { QuickFilter } from "@/lib/constants";

export function CategoryPill({ filter }: { filter: QuickFilter }) {
  return (
    <Link
      href={filter.href}
      className="flex shrink-0 flex-col items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3.5 text-center transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft"
    >
      <span className="text-2xl leading-none">{filter.emoji}</span>
      <span className="text-xs font-medium text-foreground">{filter.label}</span>
    </Link>
  );
}
