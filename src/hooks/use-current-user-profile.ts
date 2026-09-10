"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { currentUser } from "@/data/current-user";
import type { User } from "@/types";

type ProfileOverrides = Partial<
  Pick<User, "name" | "bio" | "city" | "university" | "degree" | "year" | "avatarUrl" | "emailVerified">
>;

/**
 * Devuelve el usuario actual "editable": combina el usuario mock base con
 * los cambios guardados desde /perfil/editar (persistidos en localStorage).
 * Cuando conectes un backend, sustituye esto por el usuario de tu sesión real.
 */
export function useCurrentUserProfile() {
  const [overrides, setOverrides] = useLocalStorage<ProfileOverrides>("mitribu:profile-overrides", {});

  const user = useMemo<User>(() => ({ ...currentUser, ...overrides }), [overrides]);

  function updateProfile(next: ProfileOverrides) {
    setOverrides((prev) => ({ ...prev, ...next }));
  }

  return { user, updateProfile };
}
