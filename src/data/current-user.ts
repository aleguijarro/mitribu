import { users } from "./users";

/**
 * Usuario "logueado" en esta demo sin backend. Cuando conectes
 * autenticación real, sustituye esto por la sesión del usuario.
 */
export const currentUserId = "u1";
export const currentUser = users.find((u) => u.id === currentUserId)!;
