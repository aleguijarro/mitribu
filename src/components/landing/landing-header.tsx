"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/lib/constants";

const links = [
  { label: "Explorar", href: "/inicio" },
  { label: "Pisos", href: "/pisos" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Comunidad", href: "/comunidad" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tribu-gradient text-base font-bold text-primary-foreground">
            T
          </span>
          <span className="text-lg font-bold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
          <Button asChild>
            <Link href="/registro">Crear cuenta</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%]">
              <SheetTitle>Menú</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-surface-hover"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 grid gap-2 border-t border-border pt-6">
                <Button variant="outline" asChild onClick={() => setOpen(false)}>
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
                <Button asChild onClick={() => setOpen(false)}>
                  <Link href="/registro">Crear cuenta</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
