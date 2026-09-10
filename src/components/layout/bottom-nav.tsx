"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNav } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl md:hidden"
      aria-label="Navegación principal"
    >
      <div className="grid grid-cols-5">
        {bottomNav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const isPublish = item.href === "/publicar";
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 py-2.5"
              aria-current={active ? "page" : undefined}
            >
              {isPublish ? (
                <span className="-mt-5 flex h-11 w-11 items-center justify-center rounded-full bg-tribu-gradient text-primary-foreground shadow-glow">
                  <item.icon className="h-5 w-5" />
                </span>
              ) : (
                <item.icon
                  className={cn("h-5 w-5 transition-colors", active ? "text-primary" : "text-muted-foreground")}
                  strokeWidth={active ? 2.4 : 2}
                />
              )}
              <span
                className={cn(
                  "text-[11px] font-medium transition-colors",
                  isPublish ? "text-muted-foreground" : active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
