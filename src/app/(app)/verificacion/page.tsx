"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BadgeCheck, Clock, FileUp, GraduationCap, IdCard, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVerification } from "@/context/verification-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { VerificationMethod, VerificationState } from "@/types";

const studentMethods: { id: VerificationMethod; label: string; icon: React.ElementType }[] = [
  { id: "email-universitario", label: "Email universitario", icon: Mail },
  { id: "carnet", label: "Carnet de estudiante", icon: IdCard },
  { id: "matricula", label: "Certificado de matrícula", icon: GraduationCap },
];

const academicDomainParts = new Set(["edu", "ac", "alumno", "alumnos", "alumni", "estudiante", "estudiantes", "student", "students", "campus", "etu", "stud"]);

/** Aviso orientativo, no bloqueante: cada universidad usa dominios distintos. */
function looksAcademic(email: string) {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  // "upm", "ucm", "uam", "ub", "ugr"... o cualquier "uni-*"
  return domain.split(".").some((part) => academicDomainParts.has(part) || part.startsWith("uni") || (part.startsWith("u") && part.length <= 4));
}

function VerificacionContent() {
  const { student, identity, submitStudent, submitIdentity, fullyVerified } = useVerification();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const backTo = searchParams.get("volver");

  const [method, setMethod] = useState<VerificationMethod>("email-universitario");
  const [email, setEmail] = useState("");
  const [studentFile, setStudentFile] = useState<string>("");
  const [docType, setDocType] = useState<NonNullable<VerificationState["identity"]>["document"]>("pasaporte");
  const [idFile, setIdFile] = useState<string>("");

  function handleStudent(e: React.FormEvent) {
    e.preventDefault();
    const value = method === "email-universitario" ? email.trim() : studentFile;
    if (!value) return;
    submitStudent({ method, value, status: "en-revision" });
    toast({
      title: method === "email-universitario" ? "Te hemos enviado un enlace ✉️" : "Documento recibido 📄",
      description: "En esta demo se confirma solo en unos segundos.",
    });
  }

  function handleIdentity(e: React.FormEvent) {
    e.preventDefault();
    if (!idFile) return;
    submitIdentity({ document: docType, status: "en-revision" });
    toast({ title: "Documento recibido 🪪", description: "En esta demo se confirma solo en unos segundos." });
  }

  return (
    <div className="container max-w-2xl py-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Verifica tu perfil</h1>
      <p className="mt-1 text-muted-foreground">
        MiTribu es solo para estudiantes. Verificamos que estudias y quién eres para que nadie pueda estafarte con un
        perfil falso.
      </p>

      {fullyVerified && (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-primary/30 bg-primary-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold text-primary-700">¡Perfil verificado!</p>
              <p className="text-sm text-primary-700/80">Ya puedes enviar y aceptar solicitudes.</p>
            </div>
          </div>
          <Button asChild>
            <Link href={backTo && backTo.startsWith("/") ? backTo : "/inicio"}>{backTo ? "Volver" : "Ir a MiTribu"}</Link>
          </Button>
        </div>
      )}

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg">1. Que eres estudiante</CardTitle>
            <StatusPill status={student?.status} />
          </div>
          <CardDescription>Con tu email de la universidad o subiendo tu carnet o certificado de matrícula.</CardDescription>
        </CardHeader>
        <CardContent>
          {student ? (
            <p className="text-sm text-muted-foreground">
              {studentMethods.find((m) => m.id === student.method)?.label}: <span className="text-foreground">{student.value}</span>
            </p>
          ) : (
            <form onSubmit={handleStudent} className="grid gap-4">
              <div className="grid gap-2 sm:grid-cols-3">
                {studentMethods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    aria-pressed={method === m.id}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      method === m.id ? "border-primary bg-primary-50 text-primary-700" : "border-border hover:border-primary/40"
                    )}
                  >
                    <m.icon className="h-4 w-4 shrink-0" /> {m.label}
                  </button>
                ))}
              </div>
              {method === "email-universitario" ? (
                <div className="grid gap-1.5">
                  <Label htmlFor="uni-email">Email universitario</Label>
                  <Input
                    id="uni-email"
                    type="email"
                    required
                    placeholder="nombre@alumnos.upm.es"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {email.includes("@") && email.split("@")[1]?.includes(".") && !looksAcademic(email) && (
                    <p className="text-xs text-muted-foreground">
                      No parece un email universitario. Si tu universidad usa otro dominio, sube tu carnet o matrícula.
                    </p>
                  )}
                </div>
              ) : (
                <FileField
                  id="student-file"
                  label={method === "carnet" ? "Foto de tu carnet" : "Certificado de matrícula (PDF o foto)"}
                  onFile={setStudentFile}
                  fileName={studentFile}
                />
              )}
              <Button type="submit" className="justify-self-start" disabled={method === "email-universitario" ? !email : !studentFile}>
                {method === "email-universitario" ? "Enviar enlace de verificación" : "Enviar documento"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg">2. Quién eres</CardTitle>
            <StatusPill status={identity?.status} />
          </div>
          <CardDescription>DNI, NIE o pasaporte. Es lo que evita que alguien se haga pasar por otra persona.</CardDescription>
        </CardHeader>
        <CardContent>
          {identity ? (
            <p className="text-sm text-muted-foreground">
              Documento: <span className="uppercase text-foreground">{identity.document}</span>
            </p>
          ) : (
            <form onSubmit={handleIdentity} className="grid gap-4">
              <div className="grid gap-1.5">
                <Label>Tipo de documento</Label>
                <Select value={docType} onValueChange={(v) => setDocType(v as typeof docType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pasaporte">Pasaporte</SelectItem>
                    <SelectItem value="dni">DNI</SelectItem>
                    <SelectItem value="nie">NIE / TIE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FileField id="id-file" label="Foto del documento" onFile={setIdFile} fileName={idFile} />
              <Button type="submit" className="justify-self-start" disabled={!idFile}>
                Enviar documento
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <p className="mt-6 flex gap-2 text-xs text-muted-foreground">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          Tus documentos solo se usan para verificarte, nunca se muestran a otros usuarios y se tratan según el RGPD (ver{" "}
          <Link href="/legal/privacidad" className="underline">privacidad</Link>). En esta versión de demostración los
          archivos no salen de tu navegador.
        </span>
      </p>
    </div>
  );
}

function StatusPill({ status }: { status?: "en-revision" | "verificado" }) {
  if (status === "verificado")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
        <BadgeCheck className="h-3.5 w-3.5" /> Verificado
      </span>
    );
  if (status === "en-revision")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
        <Clock className="h-3.5 w-3.5" /> En revisión
      </span>
    );
  return null;
}

function FileField({ id, label, fileName, onFile }: { id: string; label: string; fileName: string; onFile: (name: string) => void }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-border px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-primary/40"
      >
        <FileUp className="h-5 w-5 shrink-0" />
        <span className="truncate">{fileName || "Elige un archivo (JPG, PNG o PDF)"}</span>
      </label>
      <input
        id={id}
        type="file"
        accept="image/*,application/pdf"
        className="sr-only"
        onChange={(e) => onFile(e.target.files?.[0]?.name ?? "")}
      />
    </div>
  );
}

export default function VerificacionPage() {
  return (
    <Suspense>
      <VerificacionContent />
    </Suspense>
  );
}
