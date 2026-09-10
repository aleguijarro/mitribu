"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { NotificationsMenu } from "./notifications-menu";
import { UserMenu } from "./user-menu";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 hidden border-b border-border/70 bg-background/85 backdrop-blur-xl md:block">
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Link href="/inicio" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tribu-gradient text-base font-bold text-primary-foreground">
            T
          </span>
          <span className="text-lg font-bold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-border/70 bg-surface/60 p-1">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-card text-foreground shadow-subtle" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link href="/publicar">
              <Plus className="h-4 w-4" /> Publicar
            </Link>
          </Button>
          <Button asChild size="icon" className="lg:hidden">
            <Link href="/publicar" aria-label="Publicar">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
          <NotificationsMenu />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
