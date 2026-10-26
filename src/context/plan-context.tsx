"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { freePlanLimits } from "@/lib/constants";
import type { PlanId } from "@/types";

interface PlanState {
  plan: PlanId;
  /** Fecha del próximo cobro. Premium se renueva hasta que el usuario cancela. */
  renewsAt?: string;
  cancelled: boolean;
  /** Ids de usuario con los que ya se ha "obtenido contacto" (no se cobran dos veces). */
  contactedUserIds: string[];
  /** Contactos sueltos comprados con "Obtener contacto YA". */
  extraContacts: number;
}

interface PlanContextValue extends PlanState {
  isPremium: boolean;
  contactsLeft: number; // Infinity en Premium
  hasContacted: (userId: string) => boolean;
  /** Gasta un contacto con ese usuario. Devuelve false si no quedan. */
  spendContact: (userId: string) => boolean;
  subscribe: (plan: Exclude<PlanId, "gratis">) => void;
  cancel: () => void;
  buySingleContact: () => void;
}

const initialState: PlanState = { plan: "gratis", cancelled: false, contactedUserIds: [], extraContacts: 0 };

const PlanContext = createContext<PlanContextValue | null>(null);

function addDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/**
 * Plan del estudiante que busca (comprador). Prueba gratuita: búsqueda
 * ilimitada, 5 guardados y 3 contactos. Premium (semana/mes): todo
 * ilimitado. Los cobros son simulados hasta conectar Stripe.
 */
export function PlanProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<PlanState>("mitribu:plan", initialState);

  const value = useMemo<PlanContextValue>(() => {
    const expired = state.plan !== "gratis" && state.cancelled && !!state.renewsAt && new Date(state.renewsAt) < new Date();
    const isPremium = state.plan !== "gratis" && !expired;
    const contactsLeft = isPremium
      ? Infinity
      : Math.max(0, freePlanLimits.contacts + state.extraContacts - state.contactedUserIds.length);

    const hasContacted = (userId: string) => state.contactedUserIds.includes(userId);

    const spendContact = (userId: string) => {
      if (hasContacted(userId)) return true;
      if (contactsLeft <= 0) return false;
      setState((prev) => ({ ...prev, contactedUserIds: [...prev.contactedUserIds, userId] }));
      return true;
    };

    return {
      ...state,
      isPremium,
      contactsLeft,
      hasContacted,
      spendContact,
      subscribe: (plan) =>
        setState((prev) => ({ ...prev, plan, cancelled: false, renewsAt: addDays(plan === "semana" ? 7 : 30) })),
      cancel: () => setState((prev) => ({ ...prev, cancelled: true })),
      buySingleContact: () => setState((prev) => ({ ...prev, extraContacts: prev.extraContacts + 1 })),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan debe usarse dentro de <PlanProvider>");
  return ctx;
}
