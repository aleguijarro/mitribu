"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Report } from "@/types";

interface ReportsContextValue {
  reports: Report[];
  hasReported: (targetType: Report["targetType"], targetId: string) => boolean;
  addReport: (input: Omit<Report, "id" | "createdAt">) => void;
}

const ReportsContext = createContext<ReportsContextValue | null>(null);

/**
 * Reportes de anuncios y usuarios. Se guardan en localStorage; con backend
 * irían a una cola de moderación (ver README → Roadmap).
 */
export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useLocalStorage<Report[]>("mitribu:reports", []);

  const value = useMemo<ReportsContextValue>(
    () => ({
      reports,
      hasReported: (targetType, targetId) => reports.some((r) => r.targetType === targetType && r.targetId === targetId),
      addReport: (input) =>
        setReports((prev) => [
          { ...input, id: `local-rep-${Date.now()}`, createdAt: new Date().toISOString() },
          ...prev,
        ]),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reports]
  );

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
}

export function useReports() {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports debe usarse dentro de <ReportsProvider>");
  return ctx;
}
