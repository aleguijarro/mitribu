"use client";

import Link from "next/link";
import { Bell, Heart, Home, Info, MessageCircle, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useNotifications } from "@/context/notifications-context";
import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { NotificationType } from "@/types";

const iconByType: Record<NotificationType, React.ElementType> = {
  like: Heart,
  comment: MessageCircle,
  message: MessageCircle,
  "match-property": Home,
  offer: Tag,
  review: Star,
  system: Info,
};

export default function NotificacionesPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="container max-w-2xl py-8 sm:py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Notificaciones</h1>
          <p className="mt-1 text-muted-foreground">Todo lo que ha pasado en tu tribu.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Marcar todas como leídas
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No tienes notificaciones" description="Cuando algo importante pase, lo verás aquí." />
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {notifications.map((n) => {
            const Icon = iconByType[n.type];
            return (
              <Link
                key={n.id}
                href={n.href ?? "#"}
                onClick={() => markAsRead(n.id)}
                className={cn("flex items-start gap-3.5 px-4 py-4 transition-colors hover:bg-surface-hover", !n.read && "bg-primary-50")}
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{n.title}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{n.description}</span>
                  <span className="mt-1.5 block text-xs text-muted-foreground">{formatRelativeTime(n.createdAt)}</span>
                </span>
                {!n.read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
