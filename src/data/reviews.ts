import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "r1",
    authorId: "u9",
    targetId: "u1",
    rating: 5,
    text: "Sofía es una compañera de piso genial: ordenada, respetuosa y siempre dispuesta a echar una mano. ¡Totalmente recomendable!",
    createdAt: "2026-09-08T14:20:00",
    context: "convivencia",
  },
  {
    id: "r2",
    authorId: "u11",
    targetId: "u1",
    rating: 5,
    text: "Contacté con Sofía por un mueble y todo fue rapidísimo, muy buena comunicación.",
    createdAt: "2026-07-02T10:00:00",
    context: "producto",
  },
  {
    id: "r3",
    authorId: "u1",
    targetId: "u4",
    rating: 5,
    text: "Marco es un casero excelente, muy atento y transparente con todo el proceso de alquiler.",
    createdAt: "2026-06-15T09:00:00",
    context: "propiedad",
  },
  {
    id: "r4",
    authorId: "u3",
    targetId: "u4",
    rating: 4,
    text: "Todo correcto, aunque tardó un poco en responder al principio. El piso tal cual se anunciaba.",
    createdAt: "2026-05-20T18:00:00",
    context: "propiedad",
  },
  {
    id: "r5",
    authorId: "u1",
    targetId: "u2",
    rating: 5,
    text: "Lucas cumplió exactamente lo acordado, el monitor estaba en perfecto estado.",
    createdAt: "2026-09-09T20:20:00",
    context: "producto",
  },
  {
    id: "r6",
    authorId: "u9",
    targetId: "u7",
    rating: 5,
    text: "Nerea es súper maja, el envío llegó rapidísimo y todo tal cual las fotos.",
    createdAt: "2026-08-19T10:00:00",
    context: "producto",
  },
];

export function getReviewsForUser(userId: string): Review[] {
  return reviews.filter((r) => r.targetId === userId);
}
