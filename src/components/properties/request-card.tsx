"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BadgeCheck, CheckCircle2, Clock, Inbox, Lock, MessageCircle, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Rating } from "@/components/shared/rating";
import { VerifiedBadge } from "@/components/shared/verified-badge";
import { UpgradeDialog } from "@/components/shared/upgrade-dialog";
import { useRequests } from "@/context/requests-context";
import { usePlan } from "@/context/plan-context";
import { useVerification } from "@/context/verification-context";
import { useToast } from "@/hooks/use-toast";
import { currentUserId } from "@/data/current-user";
import { CONTACT_BLOCKED_NOTICE, filterContactInfo } from "@/lib/contact-filter";
import { freePlanLimits } from "@/lib/constants";
import type { Property, User } from "@/types";

const steps = [
  "Envías tu solicitud con tu perfil verificado.",
  "El propietario la ve gratis y decide.",
  "Si acepta, se abre el chat y ya podéis compartir contacto.",
];

export function RequestCard({ property, host }: { property: Property; host: User }) {
  const { getRequestForProperty, sendRequest, received } = useRequests();
  const { contactsLeft, isPremium, hasContacted, spendContact } = usePlan();
  const { fullyVerified } = useVerification();
  const { toast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [moveIn, setMoveIn] = useState(property.availableFrom.slice(0, 10));
  const [months, setMonths] = useState("6");
  const [message, setMessage] = useState("");

  const existing = getRequestForProperty(property.id);
  const isOwn = property.hostId === currentUserId;
  const filtered = useMemo(() => filterContactInfo(message), [message]);

  function handleStart() {
    if (!fullyVerified) return setVerifyOpen(true);
    if (!hasContacted(host.id) && contactsLeft <= 0) return setUpgradeOpen(true);
    setFormOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!spendContact(host.id)) {
      setFormOpen(false);
      setUpgradeOpen(true);
      return;
    }
    sendRequest({ propertyId: property.id, hostId: host.id, message: filtered.text.trim(), moveIn, months: Number(months) });
    setFormOpen(false);
    setMessage("");
    toast({
      title: "Solicitud enviada 📨",
      description: `${host.name.split(" ")[0]} verá tu perfil y te avisaremos en cuanto responda.`,
    });
  }

  return (
    <Card className="sticky top-24">
      <CardContent className="p-5">
        <Link href={`/perfil/${host.username}`} className="flex items-center gap-3">
          <UserAvatar user={host} size="lg" showVerified />
          <div className="min-w-0">
            <p className="truncate font-semibold">{host.name}</p>
            <p className="text-xs text-muted-foreground">Propietario/a</p>
            <Rating value={host.rating} reviewCount={host.reviewCount} className="mt-0.5" />
          </div>
        </Link>

        {host.verified && <VerifiedBadge className="mt-4" />}
        {!!host.closedDeals && (
          <p className="mt-2 text-xs text-muted-foreground">
            <strong className="text-foreground">{host.closedDeals}</strong> contratos cerrados en MiTribu
          </p>
        )}

        <div className="mt-5">
          {property.rented ? (
            <StatusBox icon={CheckCircle2} title="Ya alquilada" text="Este alojamiento cerró contrato a través de MiTribu." />
          ) : isOwn ? (
            <div className="grid gap-3">
              <StatusBox
                icon={Inbox}
                title="Es tu anuncio"
                text={`Tienes ${received.filter((r) => r.propertyId === property.id && r.status === "pendiente").length} solicitudes pendientes.`}
              />
              <Button asChild size="lg" className="w-full">
                <Link href="/solicitudes">Ver solicitudes</Link>
              </Button>
            </div>
          ) : existing?.status === "pendiente" ? (
            <StatusBox icon={Clock} title="Solicitud enviada" text="Esperando a que el propietario la revise. Te avisaremos." />
          ) : existing?.status === "aceptada" && existing.conversationId ? (
            <div className="grid gap-3">
              <StatusBox icon={CheckCircle2} title="¡Solicitud aceptada!" text="Ya podéis hablar y compartir datos de contacto." />
              <Button asChild size="lg" className="w-full">
                <Link href={`/mensajes/${existing.conversationId}`}>
                  <MessageCircle className="h-4 w-4" /> Abrir chat
                </Link>
              </Button>
            </div>
          ) : existing?.status === "cerrada" ? (
            <StatusBox icon={CheckCircle2} title="Contrato firmado" text="¡Enhorabuena por tu nueva casa!" />
          ) : (
            <div className="grid gap-2.5">
              <Button size="lg" className="w-full" onClick={handleStart}>
                <Send className="h-4 w-4" /> Enviar solicitud
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {isPremium
                  ? "Premium: solicitudes ilimitadas."
                  : hasContacted(host.id)
                    ? "Ya has contactado con esta persona: no gastas contacto."
                    : `Te quedan ${contactsLeft} de ${freePlanLimits.contacts} contactos gratis.`}
              </p>
            </div>
          )}
        </div>

        {!isOwn && !property.rented && !existing && (
          <ol className="mt-5 space-y-2 border-t border-border pt-4">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-2.5 text-xs text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-[11px] font-bold text-primary-700">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        )}
      </CardContent>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitud para {property.title}</DialogTitle>
            <DialogDescription>
              {host.name.split(" ")[0]} verá tu perfil verificado, tu universidad y este mensaje antes de decidir.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="move-in">Fecha de entrada</Label>
                <Input id="move-in" type="date" required value={moveIn} onChange={(e) => setMoveIn(e.target.value)} />
              </div>
              <div className="grid gap-1.5">
                <Label>Duración</Label>
                <Select value={months} onValueChange={setMonths}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["1", "3", "4", "5", "6", "9", "10", "12"].map((m) => (
                      <SelectItem key={m} value={m}>{m} {m === "1" ? "mes" : "meses"}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="request-message">Preséntate</Label>
              <Textarea
                id="request-message"
                required
                className="min-h-28"
                placeholder="De dónde vienes, qué estudias, tu programa de intercambio y cómo eres conviviendo."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {filtered.blocked && (
                <p className="flex gap-2 rounded-lg bg-coral/10 px-3 py-2 text-xs text-coral">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {CONTACT_BLOCKED_NOTICE}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setFormOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!message.trim()}>
                <Send className="h-4 w-4" /> Enviar solicitud
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={verifyOpen} onOpenChange={setVerifyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Primero, verifica tu perfil</DialogTitle>
            <DialogDescription>
              En MiTribu solo pueden enviar solicitudes estudiantes verificados. Así los propietarios saben con quién
              hablan y nadie puede hacerse pasar por otro. Te lleva dos minutos.
            </DialogDescription>
          </DialogHeader>
          <ul className="grid gap-2 text-sm">
            <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary" /> Email universitario, carnet o matrícula</li>
            <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary" /> DNI, NIE o pasaporte</li>
          </ul>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setVerifyOpen(false)}>Ahora no</Button>
            <Button asChild>
              <Link href={`/verificacion?volver=${encodeURIComponent(`/pisos/${property.id}`)}`}>Verificarme</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpgradeDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} reason="contactos" onUpgraded={() => setFormOpen(true)} />
    </Card>
  );
}

function StatusBox({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-xl bg-secondary p-3.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
