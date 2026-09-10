import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/layout/footer";

export function StaticPageShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <LandingHeader />
      <main className="flex-1">
        <div className="container max-w-3xl py-14 sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
          <div className="prose-mitribu mt-10 space-y-6 text-[15px] leading-relaxed text-foreground/90">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
