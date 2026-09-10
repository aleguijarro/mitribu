import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export function Rating({ value, reviewCount, size = "sm", className }: RatingProps) {
  if (value === 0 && !reviewCount) {
    return <span className={cn("text-xs text-muted-foreground", className)}>Sin valoraciones aún</span>;
  }
  return (
    <span className={cn("inline-flex items-center gap-1 font-medium", size === "sm" ? "text-xs" : "text-sm", className)}>
      <Star className={cn("fill-foreground text-foreground", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
      {value.toFixed(1)}
      {typeof reviewCount === "number" && (
        <span className="text-muted-foreground font-normal">({reviewCount})</span>
      )}
    </span>
  );
}
