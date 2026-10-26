/**
 * Reglas internas de MiTribu: hasta que el propietario acepta una
 * solicitud, los datos de contacto no pueden compartirse. Así la pareja
 * no puede saltarse la plataforma antes del pago (ver pipeline en README).
 *
 * Detecta teléfonos, emails, URLs, Instagram, WhatsApp y Telegram y los
 * sustituye por un aviso. Es una primera barrera en cliente: el backend
 * debe aplicar la misma regla antes de guardar el mensaje.
 */

export const CONTACT_BLOCKED_NOTICE =
  "🔒 Por seguridad, los datos de contacto deben compartirse después de que la solicitud sea aceptada.";

export const HIDDEN_CONTACT_PLACEHOLDER = "[dato de contacto oculto]";

const patterns: RegExp[] = [
  // Emails, también "nombre (at) gmail . com"
  /[a-z0-9._%+-]+\s*(?:@|\(at\)|\[at\]|\sarroba\s)\s*[a-z0-9.-]+\s*(?:\.|\(dot\)|\spunto\s)\s*[a-z]{2,}/gi,
  // URLs y dominios sueltos (wa.me, t.me, instagram.com, bit.ly...)
  /\b(?:https?:\/\/|www\.)\S+/gi,
  /\b[a-z0-9-]+\.(?:com|es|me|ly|io|net|org|link|app|co|eu|it|de|fr)(?:\/\S*)?\b/gi,
  // Teléfonos: 9+ dígitos con espacios, puntos, guiones o prefijo internacional
  /(?:\+|00)?\d(?:[\s.\-()]*\d){8,}/g,
  // Menciones de redes y apps de mensajería seguidas de un usuario ("mi ig es emma_mad")
  /\b(?:instagram|insta|ig|telegram|tg|whatsapp|whats\s?app|wasap|wsp|snapchat|snap|tiktok)\b[\s:.\-=]*(?:(?:es|is|me|al|en)\b[\s:.\-=]*)?@?[a-z0-9._]{3,}/gi,
  // @usuario suelto
  /(?:^|\s)@[a-z0-9._]{3,}/gi,
];

/** Devuelve el texto con los datos de contacto sustituidos y si se ha bloqueado algo. */
export function filterContactInfo(text: string): { text: string; blocked: boolean } {
  let result = text;
  let blocked = false;
  for (const pattern of patterns) {
    result = result.replace(pattern, (match) => {
      blocked = true;
      const leadingSpace = /^\s/.test(match) ? " " : "";
      return `${leadingSpace}${HIDDEN_CONTACT_PLACEHOLDER}`;
    });
  }
  return { text: result, blocked };
}
