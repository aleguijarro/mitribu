import { Navbar } from "./navbar";
import { MobileHeader } from "./mobile-header";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Navbar />
      <MobileHeader />
      <main className="flex-1 pb-24 md:pb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
