"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Input } from "@/components/ui/input";
import { useChat } from "@/context/chat-context";
import { getUserById } from "@/data/users";
import { currentUserId } from "@/data/current-user";
import { getOtherParticipantId } from "@/data/conversations";
import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ConversationList({ className, activeId }: { className?: string; activeId?: string }) {
  const { conversations } = useChat();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const filtered = conversations.filter((c) => {
    const other = getUserById(getOtherParticipantId(c));
    if (!other) return false;
    return other.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className={cn("flex flex-col border-border bg-card", className)}>
      <div className="border-b border-border p-4">
        <h1 className="text-xl font-bold tracking-tight">Mensajes</h1>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar conversaciones..." className="pl-10" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((conv) => {
          const other = getUserById(getOtherParticipantId(conv));
          if (!other) return null;
          const lastMessage = conv.messages[conv.messages.length - 1];
          const unread = conv.messages.some((m) => !m.read && m.senderId !== currentUserId);
          const isActive = activeId === conv.id || pathname === `/mensajes/${conv.id}`;

          return (
            <Link
              key={conv.id}
              href={`/mensajes/${conv.id}`}
              className={cn(
                "flex items-center gap-3 border-b border-border/60 px-4 py-3.5 transition-colors hover:bg-surface-hover",
                isActive && "bg-primary-50"
              )}
            >
              <UserAvatar user={other} size="md" showVerified />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{other.name}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{formatRelativeTime(conv.updatedAt)}</span>
                </div>
                <p className={cn("truncate text-xs", unread ? "font-semibold text-foreground" : "text-muted-foreground")}>
                  {lastMessage?.text ?? attachmentPreview(lastMessage?.attachment?.type)}
                </p>
              </div>
              {unread && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />}
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">No hay conversaciones que coincidan.</p>
        )}
      </div>
    </div>
  );
}

function attachmentPreview(type?: string) {
  switch (type) {
    case "property":
      return "📍 Compartió una propiedad";
    case "product":
      return "🛍️ Compartió un producto";
    case "offer":
      return "🏷️ Envió una oferta";
    case "image":
      return "📷 Envió una imagen";
    default:
      return "Nueva conversación";
  }
}
