"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Interest } from "@/types";

export interface OnboardingData {
  city?: string;
  university?: string;
  interests: Interest[];
}

interface AuthState {
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  onboarding: OnboardingData;
}

interface AuthContextValue extends AuthState {
  login: () => void;
  logout: () => void;
  completeOnboarding: (data: OnboardingData) => void;
}

const defaultState: AuthState = {
  isAuthenticated: false,
  onboardingComplete: false,
  onboarding: { interests: [] },
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Autenticación simulada. No hay backend todavía: este contexto persiste
 * el estado de sesión en localStorage para que la navegación se sienta
 * real. Sustituye `login`/`logout`/`completeOnboarding` por llamadas a tu
 * API cuando conectes un backend (ver README).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<AuthState>("mitribu:auth", defaultState);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login: () => setState((prev) => ({ ...prev, isAuthenticated: true })),
      logout: () => setState((prev) => ({ ...prev, isAuthenticated: false })),
      completeOnboarding: (data) =>
        setState((prev) => ({
          ...prev,
          isAuthenticated: true,
          onboardingComplete: true,
          onboarding: data,
        })),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
