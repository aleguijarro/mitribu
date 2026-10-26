"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Home, ImagePlus, Lock, Paperclip, Send, ShoppingBag } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageBubble } from "./message-bubble";
import { useChat } from "@/context/chat-context";
import { useToast } from "@/hooks/use-toast";
import { getUserById } from "@/data/users";
import { currentUserId } from "@/data/current-user";
import { properties } from "@/data/properties";
import { products } from "@/data/products";
import { communityPhoto } from "@/data/images";
import { CONTACT_BLOCKED_NOTICE, filterContactInfo } from "@/lib/contact-filter";
import { cn } from "@/lib/utils";

export function ChatWindow({ conversationId, className }: { conversationId: string; className?: string }) {
  const { getConversation, sendMessage } = useChat();
  const { toast } = useToast();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const conversation = getConversation(conversationId);
  const otherId = conversation?.participantIds.find((id) => id !== currentUserId);
  const other = otherId ? getUserById(otherId) : undefined;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages.length]);

  if (!conversation || !other) {
    return (
      <div className={cn("flex flex-1 items-center justify-center text-sm text-muted-foreground", className)}>
        Selecciona una conversación para empezar a chatear.
      </div>
    );
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    // Reglas internas: sin solicitud aceptada, los datos de contacto se ocultan
    const { text, blocked } = conversation!.contactUnlocked ? { text: draft.trim(), blocked: false } : filterContactInfo(draft.trim());
    sendMessage(conversationId, text);
    if (blocked) toast({ title: "Datos de contacto ocultos", description: CONTACT_BLOCKED_NOTICE });
    setDraft("");
  }

  function shareRandom(kind: "property" | "product" | "image") {
    if (kind === "property") {
      const p = properties[Math.floor(Math.random() * properties.length)];
      sendMessage(conversationId, "", { type: "property", refId: p.id });
    } else if (kind === "product") {
      const p = products[Math.floor(Math.random() * products.length)];
      sendMessage(conversationId, "", { type: "product", refId: p.id });
    } else {
      sendMessage(conversationId, "", { type: "image", imageUrl: communityPhoto(Math.floor(Math.random() * 10)) });
    }
    toast({ title: "Enviado", description: "Se ha añadido a la conversación." });
  }

  return (
    <div className={cn("flex flex-1 flex-col", className)}>
      <header className="flex items-center gap-3 border-b border-border p-4">
        <Link href="/mensajes" className="md:hidden" aria-label="Volver a mensajes">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Link href={`/perfil/${other.username}`} className="flex min-w-0 flex-1 items-center gap-3">
          <UserAvatar user={other} showVerified />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{other.name}</p>
            <p className="text-xs text-muted-foreground">{other.university ?? other.city}</p>
          </div>
        </Link>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        <p className="mx-auto flex max-w-md items-start gap-2 rounded-xl bg-secondary px-3 py-2 text-xs text-muted-foreground">
          {conversation.contactUnlocked ? (
            <>
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              Solicitud aceptada: ya podéis compartir teléfono, email o redes.
            </>
          ) : (
            <>
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Teléfonos, emails, enlaces y redes se ocultan en este chat hasta que haya una solicitud aceptada.
            </>
          )}
        </p>
        {conversation.messages.map((m) => (
          <MessageBubble
            key={m.id}
            message={conversation.contactUnlocked || !m.text ? m : { ...m, text: filterContactInfo(m.text).text }}
            isOwn={m.senderId === currentUserId}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost" size="icon" aria-label="Adjuntar">
              <Paperclip className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => shareRandom("property")}>
              <Home className="h-4 w-4" /> Compartir una propiedad
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareRandom("product")}>
              <ShoppingBag className="h-4 w-4" /> Compartir un producto
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareRandom("image")}>
              <ImagePlus className="h-4 w-4" /> Enviar imagen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 rounded-full"
        />
        <Button type="submit" size="icon" aria-label="Enviar mensaje" disabled={!draft.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
