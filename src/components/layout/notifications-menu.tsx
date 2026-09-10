"use client";

import Link from "next/link";
import { Bell, Heart, MessageCircle, Home, Tag, Star, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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

export function NotificationsMenu() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const recent = notifications.slice(0, 6);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notificaciones">
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[10px] font-bold text-coral-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[340px] p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm font-semibold">Notificaciones</p>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-xs font-medium text-primary hover:underline">
              Marcar todas como leídas
            </button>
          )}
        </div>
        <div className="max-h-[380px] overflow-y-auto">
          {recent.map((n) => {
            const Icon = iconByType[n.type];
            return (
              <Link
                key={n.id}
                href={n.href ?? "/notificaciones"}
                onClick={() => markAsRead(n.id)}
                className={cn(
                  "flex items-start gap-3 px-4 py-3 transition-colors hover:bg-surface-hover",
                  !n.read && "bg-primary-50"
                )}
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium leading-snug">{n.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">{n.description}</span>
                  <span className="mt-1 block text-[11px] text-muted-foreground">{formatRelativeTime(n.createdAt)}</span>
                </span>
                {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </div>
        <div className="border-t border-border px-4 py-3 text-center">
          <Link href="/notificaciones" className="text-sm font-medium text-primary hover:underline">
            Ver todas las notificaciones
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
