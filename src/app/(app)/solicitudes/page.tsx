"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, CheckCircle2, FileSignature, GraduationCap, Inbox, MessageCircle, Send, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Rating } from "@/components/shared/rating";
import { VerifiedBadge } from "@/components/shared/verified-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { PaymentDialog } from "@/components/shared/payment-dialog";
import { useRequests } from "@/context/requests-context";
import { useListings } from "@/context/listings-context";
import { useChat } from "@/context/chat-context";
import { useVerification } from "@/context/verification-context";
import { useToast } from "@/hooks/use-toast";
import { getUserById } from "@/data/users";
import { filterContactInfo } from "@/lib/contact-filter";
import { pricing } from "@/lib/constants";
import { formatDate, formatFee, formatRelativeTime } from "@/lib/format";
import type { HousingRequest, RequestStatus } from "@/types";

const statusBadge: Record<RequestStatus, { label: string; variant: "default" | "secondary" | "success" | "outline" }> = {
  pendiente: { label: "Pendiente", variant: "default" },
  aceptada: { label: "Aceptada · chat abierto", variant: "success" },
  rechazada: { label: "Rechazada", variant: "outline" },
  cerrada: { label: "Contrato firmado", variant: "secondary" },
};

type PendingPayment = { kind: "aceptar" | "contrato"; request: HousingRequest } | null;

export default function SolicitudesPage() {
  const { received, sent, setStatus } = useRequests();
  const { getProperty, markPropertyRented } = useListings();
  const { startConversation } = useChat();
  const { fullyVerified } = useVerification();
  const { toast } = useToast();
  const router = useRouter();
  const [payment, setPayment] = useState<PendingPayment>(null);

  const pendingCount = received.filter((r) => r.status === "pendiente").length;

  function accept(request: HousingRequest) {
    const applicant = getUserById(request.applicantId);
    const conversationId = startConversation(
      request.applicantId,
      `¡Hola ${applicant?.name.split(" ")[0] ?? ""}! He aceptado tu solicitud. Ya podemos hablar y pasarnos el contacto 😊`,
      { type: "property", refId: request.propertyId },
      { unlockContact: true }
    );
    setStatus(request.id, "aceptada", { conversationId });
    toast({ title: "Solicitud aceptada ✅", description: "Se ha abierto el chat y los datos de contacto ya son visibles." });
    router.push(`/mensajes/${conversationId}`);
  }

  function closeContract(request: HousingRequest) {
    setStatus(request.id, "cerrada");
    markPropertyRented(request.propertyId);
    // El resto de solicitudes pendientes de ese anuncio ya no tienen sentido
    received
      .filter((r) => r.propertyId === request.propertyId && r.id !== request.id && r.status === "pendiente")
      .forEach((r) => setStatus(r.id, "rechazada"));
    toast({
      title: "¡Contrato firmado! 🎉",
      description: "Hemos retirado el anuncio y sumado el cierre a tu reputación.",
    });
  }

  function reject(request: HousingRequest) {
    setStatus(request.id, "rechazada");
    toast({ title: "Solicitud rechazada", description: "Le avisaremos con un mensaje amable. No se cobra nada." });
  }

  return (
    <div className="container max-w-3xl py-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Solicitudes</h1>
      <p className="mt-1 text-muted-foreground">
        Ver una solicitud es gratis. Solo pagas {formatFee(pricing.acceptLead)} si la aceptas y{" "}
        {formatFee(pricing.contractSigned)} cuando firmáis el contrato.
      </p>

      <Tabs defaultValue="recibidas" className="mt-6">
        <TabsList>
          <TabsTrigger value="recibidas">Recibidas{pendingCount > 0 && ` (${pendingCount})`}</TabsTrigger>
          <TabsTrigger value="enviadas">Enviadas</TabsTrigger>
        </TabsList>

        <TabsContent value="recibidas" className="mt-6 space-y-4">
          {!fullyVerified && received.some((r) => r.status === "pendiente") && (
            <div className="flex flex-col gap-3 rounded-xl border border-primary/30 bg-primary-50 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-primary-700">Verifica tu perfil para poder aceptar solicitudes: los estudiantes también quieren saber con quién tratan.</p>
              <Button asChild size="sm">
                <Link href="/verificacion?volver=/solicitudes">Verificarme</Link>
              </Button>
            </div>
          )}
          {received.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="Aún no tienes solicitudes"
              description="Publica tu habitación o piso gratis y te avisaremos cuando un estudiante verificado se interese."
              actionLabel="Publicar alojamiento"
              actionHref="/publicar/propiedad"
            />
          ) : (
            received.map((r) => (
              <ReceivedRequest
                key={r.id}
                request={r}
                propertyTitle={getProperty(r.propertyId)?.title}
                canAccept={fullyVerified}
                onAccept={() => setPayment({ kind: "aceptar", request: r })}
                onReject={() => reject(r)}
                onContract={() => setPayment({ kind: "contrato", request: r })}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="enviadas" className="mt-6 space-y-4">
          {sent.length === 0 ? (
            <EmptyState
              icon={Send}
              title="No has enviado solicitudes"
              description="Encuentra una habitación, envía tu solicitud y el propietario verá tu perfil verificado."
              actionLabel="Explorar pisos"
              actionHref="/pisos"
            />
          ) : (
            sent.map((r) => {
              const property = getProperty(r.propertyId);
              const host = getUserById(r.hostId);
              return (
                <Card key={r.id}>
                  <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <Link href={`/pisos/${r.propertyId}`} className="font-semibold hover:underline">
                        {property?.title ?? "Alojamiento"}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {host?.name} · enviada {formatRelativeTime(r.createdAt).toLowerCase()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={statusBadge[r.status].variant}>{statusBadge[r.status].label}</Badge>
                      {r.status === "aceptada" && r.conversationId && (
                        <Button asChild size="sm">
                          <Link href={`/mensajes/${r.conversationId}`}>Abrir chat</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>

      <PaymentDialog
        open={payment?.kind === "aceptar"}
        onOpenChange={(open) => !open && setPayment(null)}
        title="Aceptar solicitud"
        description="Al aceptar se abre el chat con el estudiante y ya podréis compartir teléfono, email o redes."
        concept="Solicitud aceptada"
        amount={pricing.acceptLead}
        onConfirm={() => payment && accept(payment.request)}
      />
      <PaymentDialog
        open={payment?.kind === "contrato"}
        onOpenChange={(open) => !open && setPayment(null)}
        title="Marcar contrato firmado"
        description="Retiramos el anuncio de MiTribu y el cierre suma a tu reputación como propietario."
        concept="Contrato firmado"
        amount={pricing.contractSigned}
        onConfirm={() => payment && closeContract(payment.request)}
      />
    </div>
  );
}

interface ReceivedRequestProps {
  request: HousingRequest;
  propertyTitle?: string;
  canAccept: boolean;
  onAccept: () => void;
  onReject: () => void;
  onContract: () => void;
}

function ReceivedRequest({ request, propertyTitle, canAccept, onAccept, onReject, onContract }: ReceivedRequestProps) {
  const applicant = getUserById(request.applicantId);
  if (!applicant) return null;
  // Hasta aceptar, el propietario ve la solicitud sin datos de contacto
  const unlocked = request.status === "aceptada" || request.status === "cerrada";
  const message = unlocked ? request.message : filterContactInfo(request.message).text;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/perfil/${applicant.username}`} className="flex min-w-0 items-center gap-3">
            <UserAvatar user={applicant} size="lg" showVerified />
            <div className="min-w-0">
              <p className="truncate font-semibold">{applicant.name}</p>
              <Rating value={applicant.rating} reviewCount={applicant.reviewCount} />
            </div>
          </Link>
          <Badge variant={statusBadge[request.status].variant} className="shrink-0">
            {statusBadge[request.status].label}
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          {applicant.exchange && (
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" />
              {applicant.exchange.homeUniversity} <ArrowRight className="h-3 w-3" /> {applicant.exchange.hostUniversity}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            Desde el {formatDate(request.moveIn)} · {request.months} meses
          </span>
        </div>
        {applicant.verified && <VerifiedBadge className="mt-3" />}

        <p className="mt-4 whitespace-pre-line rounded-xl bg-secondary p-4 text-sm leading-relaxed">{message}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Para{" "}
          <Link href={`/pisos/${request.propertyId}`} className="underline">
            {propertyTitle ?? "tu anuncio"}
          </Link>{" "}
          · {formatRelativeTime(request.createdAt)}
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          {request.status === "pendiente" && (
            <>
              <Button variant="ghost" onClick={onReject}>
                <X className="h-4 w-4" /> Rechazar
              </Button>
              <Button onClick={onAccept} disabled={!canAccept}>
                <CheckCircle2 className="h-4 w-4" /> Aceptar y abrir chat · {formatFee(pricing.acceptLead)}
              </Button>
            </>
          )}
          {request.status === "aceptada" && (
            <>
              {request.conversationId && (
                <Button variant="outline" asChild>
                  <Link href={`/mensajes/${request.conversationId}`}>
                    <MessageCircle className="h-4 w-4" /> Abrir chat
                  </Link>
                </Button>
              )}
              <Button onClick={onContract}>
                <FileSignature className="h-4 w-4" /> Contrato firmado · {formatFee(pricing.contractSigned)}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
