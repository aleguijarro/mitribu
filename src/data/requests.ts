import type { HousingRequest } from "@/types";

/**
 * Solicitudes mock que ha recibido la habitación que Sofía (usuario actual)
 * deja mientras está de Erasmus. Sirven para probar el lado del propietario
 * del pipeline: ver la solicitud gratis → aceptar (0,99 €) → chat → contrato.
 */
export const requests: HousingRequest[] = [
  {
    id: "r1",
    propertyId: "p18",
    hostId: "u1",
    applicantId: "u13",
    message:
      "¡Hola Sofía! Soy Emma, llego de Múnich para hacer Erasmus en la Complutense de febrero a julio. Soy tranquila, no fumo y me encanta cocinar. Mi WhatsApp es +49 151 2345 6789 por si es más fácil.",
    moveIn: "2027-02-01",
    months: 6,
    status: "pendiente",
    createdAt: "2026-10-24T18:20:00",
  },
  {
    id: "r2",
    propertyId: "p18",
    hostId: "u1",
    applicantId: "u14",
    message:
      "Ciao! Vengo del Politecnico di Milano (justo donde vas tú 😄). Estudio en la ETSII de la UPM y busco algo cerca para el semestre de primavera. Te puedo contar cosas de Milán a cambio.",
    moveIn: "2027-01-28",
    months: 6,
    status: "pendiente",
    createdAt: "2026-10-25T10:05:00",
  },
];
