"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { notifications as mockNotifications } from "@/data/notifications";
import type { AppNotification } from "@/types";

interface NotificationsContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [readIds, setReadIds] = useLocalStorage<string[]>("mitribu:notifications-read", []);

  const value = useMemo<NotificationsContextValue>(() => {
    const list = mockNotifications.map((n) => ({
      ...n,
      read: n.read || readIds.includes(n.id),
    }));
    const unreadCount = list.filter((n) => !n.read).length;

    return {
      notifications: list,
      unreadCount,
      markAsRead: (id: string) =>
        setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id])),
      markAllAsRead: () => setReadIds(list.map((n) => n.id)),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readIds]);

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications debe usarse dentro de <NotificationsProvider>");
  return ctx;
}
