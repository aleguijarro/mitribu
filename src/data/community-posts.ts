import type { CommunityPost } from "@/types";
import { communityPhoto } from "./images";

export const communityPosts: CommunityPost[] = [
  {
    id: "c1",
    authorId: "u3",
    text: "¿Alguien sabe dónde comprar muebles baratos en Madrid? Me mudo la semana que viene y todavía no tengo ni escritorio 😅",
    tag: "Pregunta",
    createdAt: "2026-09-08T10:15:00",
    likes: 34,
    comments: [
      { id: "cm1", authorId: "u1", text: "Yo compré casi todo en el mercadillo de El Rastro, hay chollos increíbles los domingos.", createdAt: "2026-09-08T10:40:00", likes: 6 },
      { id: "cm2", authorId: "u8", text: "Mira también el Marketplace de MiTribu, hay muebles de estudiantes que se mudan 👀", createdAt: "2026-09-08T11:02:00", likes: 9 },
    ],
    sharesCount: 4,
  },
  {
    id: "c2",
    authorId: "u9",
    text: "Busco compañero/a de piso para septiembre en Salamanca, cerca de la Plaza Mayor. Ambiente tranquilo pero con ganas de hacer vida de piso 🏡",
    tag: "Piso",
    imageUrl: communityPhoto(0),
    createdAt: "2026-09-07T18:22:00",
    likes: 21,
    comments: [
      { id: "cm3", authorId: "u6", text: "¡Yo estoy buscando algo parecido! Te escribo por mensaje.", createdAt: "2026-09-07T19:05:00", likes: 3 },
    ],
    sharesCount: 2,
  },
  {
    id: "c3",
    authorId: "u2",
    text: "¿Alguien va a la Universidad Complutense y hace primero de Informática? Sería genial montar un grupo de estudio para las prácticas de programación.",
    tag: "Estudios",
    createdAt: "2026-09-06T09:00:00",
    likes: 58,
    comments: [
      { id: "cm4", authorId: "u12", text: "Yo hago el máster pero me apunto a echar una mano si necesitáis algo 🙌", createdAt: "2026-09-06T09:30:00", likes: 5 },
      { id: "cm5", authorId: "u1", text: "Buena idea, ¿creamos un grupo?", createdAt: "2026-09-06T09:45:00", likes: 2 },
      { id: "cm6", authorId: "u8", text: "Me apunto también!", createdAt: "2026-09-06T10:02:00", likes: 1 },
    ],
    sharesCount: 12,
  },
  {
    id: "c4",
    authorId: "u7",
    text: "Hoy hemos organizado una cena de bienvenida para los nuevos de intercambio en Granada. Si acabas de llegar y no conoces a nadie, ¡el año que viene te esperamos! 🎉",
    imageUrl: communityPhoto(1),
    tag: "Evento",
    createdAt: "2026-09-05T21:10:00",
    likes: 142,
    comments: [
      { id: "cm7", authorId: "u9", text: "Qué buena pinta tiene esto, ojalá hubiera algo así en Salamanca.", createdAt: "2026-09-05T21:40:00", likes: 8 },
    ],
    sharesCount: 20,
  },
  {
    id: "c5",
    authorId: "u5",
    text: "Consejo para primerizos: no compréis todos los libros nuevos el primer día. Esperad a la segunda semana de clase, siempre hay gente vendiendo los del curso anterior mucho más baratos 📚",
    tag: "Consejo",
    createdAt: "2026-09-04T12:30:00",
    likes: 96,
    comments: [
      { id: "cm8", authorId: "u3", text: "Esto ojalá lo hubiera sabido mi primer año jaja", createdAt: "2026-09-04T13:00:00", likes: 4 },
    ],
    sharesCount: 31,
  },
  {
    id: "c6",
    authorId: "u11",
    text: "¿Recomendaciones de cafeterías en Madrid con buen wifi para estudiar sin gastarte una fortuna en cafés?",
    tag: "Pregunta",
    createdAt: "2026-09-03T16:45:00",
    likes: 27,
    comments: [
      { id: "cm9", authorId: "u4", text: "La biblioteca de Moncloa tiene una cafetería genial y más barata.", createdAt: "2026-09-03T17:10:00", likes: 5 },
    ],
    sharesCount: 3,
  },
  {
    id: "c7",
    authorId: "u10",
    text: "Primer mes en Bilbao y ya me siento como en casa. Si alguien más empieza este año en la UPV, ¡decidme algo! Estaría bien quedar.",
    imageUrl: communityPhoto(2),
    tag: "Presentación",
    createdAt: "2026-09-02T08:20:00",
    likes: 40,
    comments: [],
    sharesCount: 1,
  },
  {
    id: "c8",
    authorId: "u6",
    text: "Aviso importante: mucho cuidado con anuncios de pisos que piden pagar la fianza antes de ver la habitación por videollamada. Me ha pasado a mí y por suerte no llegué a pagar.",
    tag: "Seguridad",
    createdAt: "2026-09-01T20:05:00",
    likes: 210,
    comments: [
      { id: "cm10", authorId: "u1", text: "Gracias por avisar, es importante que se sepa esto.", createdAt: "2026-09-01T20:30:00", likes: 15 },
      { id: "cm11", authorId: "u9", text: "En MiTribu al menos queda todo en el chat, ayuda bastante.", createdAt: "2026-09-01T20:50:00", likes: 11 },
    ],
    sharesCount: 45,
  },
  {
    id: "c9",
    authorId: "u12",
    text: "¿Alguien se anima a formar un grupo de repaso para el examen de estadística de la semana que viene? Voy un poco perdido con la parte de inferencia.",
    tag: "Estudios",
    createdAt: "2026-08-31T15:12:00",
    likes: 18,
    comments: [
      { id: "cm12", authorId: "u2", text: "Yo me apunto, esa parte se me da mejor, puedo ayudar.", createdAt: "2026-08-31T15:40:00", likes: 6 },
    ],
    sharesCount: 2,
  },
  {
    id: "c10",
    authorId: "u1",
    text: "Hay cosas que solo entiende otro estudiante: la alegría de encontrar un piso con lavadora propia 😂 Feliz de anunciar que ya tengo mi próximo hogar gracias a MiTribu.",
    imageUrl: communityPhoto(3),
    tag: "Historia",
    createdAt: "2026-08-30T11:00:00",
    likes: 88,
    comments: [
      { id: "cm13", authorId: "u11", text: "¡Enhorabuena! Qué ganas de verte por aquí 🎉", createdAt: "2026-08-30T11:20:00", likes: 7 },
    ],
    sharesCount: 6,
  },
  {
    id: "c11",
    authorId: "u8",
    text: "Vendo un montón de cosas porque me cambio de piso este fin de semana. Todo en el Marketplace, ¡precios de amigo!",
    tag: "Marketplace",
    createdAt: "2026-08-29T09:40:00",
    likes: 12,
    comments: [],
    sharesCount: 1,
  },
  {
    id: "c12",
    authorId: "u3",
    text: "Segunda semana en Barcelona y todavía alucinando con la playa a 10 minutos del campus. Si tuviera que recomendar una ciudad Erasmus, sería esta sin dudarlo.",
    imageUrl: communityPhoto(4),
    tag: "Presentación",
    createdAt: "2026-08-28T19:15:00",
    likes: 76,
    comments: [
      { id: "cm14", authorId: "u4", text: "Totalmente de acuerdo, aunque el alquiler se nota jaja", createdAt: "2026-08-28T19:50:00", likes: 3 },
    ],
    sharesCount: 5,
  },
];

export function getCommunityPostById(id: string): CommunityPost | undefined {
  return communityPosts.find((p) => p.id === id);
}
