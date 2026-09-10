import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, href, hrefLabel = "Ver todo", className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-5 flex items-end justify-between gap-4", className)}>
      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-primary transition-colors hover:text-primary-600"
        >
          {hrefLabel}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
