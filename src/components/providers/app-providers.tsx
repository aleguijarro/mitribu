"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-context";
import { FavoritesProvider } from "@/context/favorites-context";
import { NotificationsProvider } from "@/context/notifications-context";
import { ChatProvider } from "@/context/chat-context";
import { CommunityProvider } from "@/context/community-context";
import { ListingsProvider } from "@/context/listings-context";

/** Compone todos los providers globales de la aplicación en un único punto. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <FavoritesProvider>
          <NotificationsProvider>
            <ListingsProvider>
              <ChatProvider>
                <CommunityProvider>
                  <TooltipProvider delayDuration={200}>
                    {children}
                    <Toaster />
                  </TooltipProvider>
                </CommunityProvider>
              </ChatProvider>
            </ListingsProvider>
          </NotificationsProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
