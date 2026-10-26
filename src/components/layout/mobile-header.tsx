"use client";

import Link from "next/link";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { ThemeToggle } from "./theme-toggle";
import { NotificationsMenu } from "./notifications-menu";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/70 bg-background/90 px-4 backdrop-blur-xl md:hidden">
      <Link href="/inicio" className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tribu-gradient text-sm font-bold text-primary-foreground">
          T
        </span>
        <span className="text-base font-bold tracking-tight">{siteConfig.name}</span>
      </Link>
      <div className="flex items-center gap-1">
        <Button asChild variant="ghost" size="icon" aria-label="Solicitudes">
          <Link href="/solicitudes">
            <Inbox className="h-5 w-5" />
          </Link>
        </Button>
        <ThemeToggle />
        <NotificationsMenu />
      </div>
    </header>
  );
}
