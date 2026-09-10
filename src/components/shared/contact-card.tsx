"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Rating } from "@/components/shared/rating";
import { VerifiedBadge } from "@/components/shared/verified-badge";
import { useChat } from "@/context/chat-context";
import { useToast } from "@/hooks/use-toast";
import type { MessageAttachment, User } from "@/types";

interface ContactCardProps {
  user: User;
  roleLabel: string;
  greeting: string;
  attachment: MessageAttachment;
}

export function ContactCard({ user, roleLabel, greeting, attachment }: ContactCardProps) {
  const { startConversation } = useChat();
  const { toast } = useToast();
  const router = useRouter();

  function handleContact() {
    const id = startConversation(user.id, greeting, attachment);
    toast({ title: "Mensaje enviado ✉️", description: `Le has escrito a ${user.name.split(" ")[0]}.` });
    router.push(`/mensajes/${id}`);
  }

  return (
    <Card className="sticky top-24">
      <CardContent className="p-5">
        <Link href={`/perfil/${user.username}`} className="flex items-center gap-3">
          <UserAvatar user={user} size="lg" showVerified />
          <div className="min-w-0">
            <p className="truncate font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">{roleLabel}</p>
            <Rating value={user.rating} reviewCount={user.reviewCount} className="mt-0.5" />
          </div>
        </Link>

        {user.verified && <VerifiedBadge className="mt-4" />}

        {user.responseRate && (
          <p className="mt-3 text-xs text-muted-foreground">
            Responde el <strong className="text-foreground">{user.responseRate}%</strong> de los mensajes, normalmente en {user.responseTime}.
          </p>
        )}

        <div className="mt-5 grid gap-2.5">
          <Button size="lg" className="w-full" onClick={handleContact}>
            {greeting.startsWith("Me interesa") || attachment.type === "property" ? "Me interesa" : "Comprar / Me interesa"}
          </Button>
          <Button size="lg" variant="outline" className="w-full" onClick={handleContact}>
            <MessageCircle className="h-4 w-4" /> Enviar mensaje
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
