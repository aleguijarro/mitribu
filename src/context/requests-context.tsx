"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { requests as mockRequests } from "@/data/requests";
import { currentUserId } from "@/data/current-user";
import type { HousingRequest, RequestStatus } from "@/types";

type NewRequestInput = Pick<HousingRequest, "propertyId" | "hostId" | "message" | "moveIn" | "months">;

interface RequestsContextValue {
  requests: HousingRequest[];
  /** Solicitudes que ha recibido el usuario actual como propietario. */
  received: HousingRequest[];
  /** Solicitudes que ha enviado el usuario actual como estudiante. */
  sent: HousingRequest[];
  getRequestForProperty: (propertyId: string) => HousingRequest | undefined;
  sendRequest: (input: NewRequestInput) => HousingRequest;
  setStatus: (id: string, status: RequestStatus, patch?: Partial<HousingRequest>) => void;
}

interface RequestsState {
  extraRequests: HousingRequest[];
  overrides: Record<string, Partial<HousingRequest>>;
}

const initialState: RequestsState = { extraRequests: [], overrides: {} };

const RequestsContext = createContext<RequestsContextValue | null>(null);

/**
 * Pipeline de solicitudes de alojamiento (ver README → "Pipeline"):
 * 1. El estudiante envía una solicitud (sin datos de contacto).
 * 2. El propietario la ve gratis y decide.
 * 3. Si acepta paga 0,99 € y se abre el chat con los contactos desbloqueados.
 * 4. Al firmar marcan "contrato firmado" (19,99 €) y el anuncio se retira.
 * Los cambios se guardan en localStorage; los pagos son simulados.
 */
export function RequestsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<RequestsState>("mitribu:requests", initialState);

  const value = useMemo<RequestsContextValue>(() => {
    const requests = [...state.extraRequests, ...mockRequests].map((r) => ({ ...r, ...state.overrides[r.id] }));
    const received = requests.filter((r) => r.hostId === currentUserId);
    const sent = requests.filter((r) => r.applicantId === currentUserId);

    const getRequestForProperty = (propertyId: string) =>
      sent.find((r) => r.propertyId === propertyId && r.status !== "rechazada");

    const sendRequest = (input: NewRequestInput): HousingRequest => {
      const request: HousingRequest = {
        ...input,
        id: `local-r-${Date.now()}`,
        applicantId: currentUserId,
        status: "pendiente",
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({ ...prev, extraRequests: [request, ...prev.extraRequests] }));
      return request;
    };

    const setStatus = (id: string, status: RequestStatus, patch?: Partial<HousingRequest>) => {
      setState((prev) => ({
        ...prev,
        overrides: { ...prev.overrides, [id]: { ...prev.overrides[id], ...patch, status } },
      }));
    };

    return { requests, received, sent, getRequestForProperty, sendRequest, setStatus };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>;
}

export function useRequests() {
  const ctx = useContext(RequestsContext);
  if (!ctx) throw new Error("useRequests debe usarse dentro de <RequestsProvider>");
  return ctx;
}
