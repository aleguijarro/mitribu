import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary-700",
        className
      )}
    >
      <ShieldCheck className="h-3.5 w-3.5" />
      Perfil verificado
    </span>
  );
}
