import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-tribu-radial">
      <header className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tribu-gradient text-base font-bold text-primary-foreground">
            T
          </span>
          <span className="text-lg font-bold tracking-tight">{siteConfig.name}</span>
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">{children}</main>
    </div>
  );
}
