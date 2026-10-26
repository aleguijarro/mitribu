"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { VerificationState } from "@/types";

interface VerificationContextValue extends VerificationState {
  studentVerified: boolean;
  identityVerified: boolean;
  /** Estudiante + identidad verificados: necesario para enviar o aceptar solicitudes. */
  fullyVerified: boolean;
  submitStudent: (data: NonNullable<VerificationState["student"]>) => void;
  submitIdentity: (data: NonNullable<VerificationState["identity"]>) => void;
  reset: () => void;
}

const VerificationContext = createContext<VerificationContextValue | null>(null);

/**
 * Verificación del usuario actual: que es estudiante (email universitario,
 * carnet o certificado de matrícula) y quién es (DNI, NIE o pasaporte).
 * Hoy se simula en cliente; con backend, los documentos irían a un
 * proveedor de verificación (ver README → "Verificación").
 */
export function VerificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<VerificationState>("mitribu:verification", {});

  // Demo: la "revisión" de documentos se aprueba sola a los pocos segundos
  useEffect(() => {
    if (state.student?.status !== "en-revision" && state.identity?.status !== "en-revision") return;
    const timer = setTimeout(() => {
      setState((prev) => ({
        student: prev.student && { ...prev.student, status: "verificado" },
        identity: prev.identity && { ...prev.identity, status: "verificado" },
      }));
    }, 3500);
    return () => clearTimeout(timer);
  }, [state.student?.status, state.identity?.status, setState]);

  const value = useMemo<VerificationContextValue>(() => {
    const studentVerified = state.student?.status === "verificado";
    const identityVerified = state.identity?.status === "verificado";
    return {
      ...state,
      studentVerified,
      identityVerified,
      fullyVerified: studentVerified && identityVerified,
      submitStudent: (data) => setState((prev) => ({ ...prev, student: data })),
      submitIdentity: (data) => setState((prev) => ({ ...prev, identity: data })),
      reset: () => setState({}),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return <VerificationContext.Provider value={value}>{children}</VerificationContext.Provider>;
}

export function useVerification() {
  const ctx = useContext(VerificationContext);
  if (!ctx) throw new Error("useVerification debe usarse dentro de <VerificationProvider>");
  return ctx;
}
