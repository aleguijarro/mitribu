import type { Conversation } from "@/types";
import { currentUserId } from "./current-user";

/**
 * Conversaciones mock. Todas incluyen al usuario actual (`currentUserId`)
 * como uno de los dos participantes para simular la bandeja de entrada.
 */
export const conversations: Conversation[] = [
  {
    id: "conv1",
    participantIds: [currentUserId, "u4"],
    updatedAt: "2026-09-10T09:32:00",
    pinned: true,
    messages: [
      {
        id: "msg1",
        conversationId: "conv1",
        senderId: "u4",
        text: "¡Hola Sofía! Vi que guardaste el estudio de Moncloa, ¿tienes alguna duda?",
        createdAt: "2026-09-09T18:00:00",
        read: true,
      },
      {
        id: "msg2",
        conversationId: "conv1",
        senderId: currentUserId,
        text: "¡Hola Marco! Sí, me encantaría saber si está disponible desde el 1 de septiembre.",
        createdAt: "2026-09-09T18:10:00",
        read: true,
      },
      {
        id: "msg3",
        conversationId: "conv1",
        senderId: "u4",
        attachment: { type: "property", refId: "p2" },
        createdAt: "2026-09-09T18:12:00",
        read: true,
      },
      {
        id: "msg4",
        conversationId: "conv1",
        senderId: "u4",
        text: "Está disponible desde esa fecha, y ahora mismo es el único mes con descuento de bienvenida.",
        createdAt: "2026-09-09T18:12:30",
        read: true,
      },
      {
        id: "msg5",
        conversationId: "conv1",
        senderId: currentUserId,
        text: "¡Genial! ¿Podríamos hacer una videollamada esta semana para verlo?",
        createdAt: "2026-09-10T09:30:00",
        read: true,
      },
      {
        id: "msg6",
        conversationId: "conv1",
        senderId: "u4",
        text: "Por supuesto, dime qué día te viene bien y lo organizamos 🙂",
        createdAt: "2026-09-10T09:32:00",
        read: false,
      },
    ],
  },
  {
    id: "conv2",
    participantIds: [currentUserId, "u2"],
    updatedAt: "2026-09-09T20:15:00",
    messages: [
      {
        id: "msg7",
        conversationId: "conv2",
        senderId: currentUserId,
        text: "Hola Lucas, ¿el monitor Samsung sigue disponible?",
        createdAt: "2026-09-09T19:40:00",
        read: true,
      },
      {
        id: "msg8",
        conversationId: "conv2",
        senderId: "u2",
        attachment: { type: "product", refId: "m1" },
        createdAt: "2026-09-09T19:50:00",
        read: true,
      },
      {
        id: "msg9",
        conversationId: "conv2",
        senderId: "u2",
        text: "Sí, sigue disponible. ¿Te viene bien recogerlo este finde?",
        createdAt: "2026-09-09T19:50:20",
        read: true,
      },
      {
        id: "msg10",
        conversationId: "conv2",
        senderId: currentUserId,
        attachment: { type: "offer", offerAmount: 100 },
        createdAt: "2026-09-09T20:14:00",
        read: true,
      },
      {
        id: "msg11",
        conversationId: "conv2",
        senderId: "u2",
        text: "¡Trato hecho! Te escribo mi dirección.",
        createdAt: "2026-09-09T20:15:00",
        read: false,
      },
    ],
  },
  {
    id: "conv3",
    participantIds: [currentUserId, "u11"],
    updatedAt: "2026-09-08T13:05:00",
    messages: [
      {
        id: "msg12",
        conversationId: "conv3",
        senderId: "u11",
        text: "¡Hola! Gracias por tu interés en la habitación de Malasaña 😊",
        createdAt: "2026-09-08T12:40:00",
        read: true,
      },
      {
        id: "msg13",
        conversationId: "conv3",
        senderId: currentUserId,
        text: "¡Hola Irene! Me encanta la luz que tiene. ¿Los gastos están incluidos en el precio?",
        createdAt: "2026-09-08T12:55:00",
        read: true,
      },
      {
        id: "msg14",
        conversationId: "conv3",
        senderId: "u11",
        text: "Sí, agua, luz e internet están incluidos en los 650€.",
        createdAt: "2026-09-08T13:05:00",
        read: true,
      },
    ],
  },
  {
    id: "conv4",
    participantIds: [currentUserId, "u9"],
    updatedAt: "2026-09-06T17:20:00",
    messages: [
      {
        id: "msg15",
        conversationId: "conv4",
        senderId: "u9",
        text: "¡Hola! Vi tu comentario en mi publicación, ¿sigues buscando piso para septiembre?",
        createdAt: "2026-09-06T17:00:00",
        read: true,
      },
      {
        id: "msg16",
        conversationId: "conv4",
        senderId: currentUserId,
        text: "¡Hola Paula! De momento ya encontré algo en Madrid, pero gracias por escribir 🙏",
        createdAt: "2026-09-06T17:20:00",
        read: true,
      },
    ],
  },
  {
    id: "conv5",
    participantIds: [currentUserId, "u7"],
    updatedAt: "2026-09-04T11:45:00",
    messages: [
      {
        id: "msg17",
        conversationId: "conv5",
        senderId: currentUserId,
        text: "Hola Nerea, ¿los cuadros boho siguen en venta?",
        createdAt: "2026-09-04T11:30:00",
        read: true,
      },
      {
        id: "msg18",
        conversationId: "conv5",
        senderId: "u7",
        text: "¡Hola! Sí, todavía los tengo. Puedo enviártelos por MiTribu Envíos o quedamos en persona.",
        createdAt: "2026-09-04T11:45:00",
        read: false,
      },
    ],
  },
  {
    id: "conv6",
    participantIds: [currentUserId, "u3"],
    updatedAt: "2026-09-02T09:12:00",
    messages: [
      {
        id: "msg19",
        conversationId: "conv6",
        senderId: "u3",
        text: "¡Hola! Vimos que a las dos nos interesa la vida en Barcelona, ¿cómo llevas la búsqueda de piso?",
        createdAt: "2026-09-02T09:00:00",
        read: true,
      },
      {
        id: "msg20",
        conversationId: "conv6",
        senderId: currentUserId,
        text: "¡Hola Carla! De momento mirando opciones por Gràcia, ¡tu piso tiene una pinta genial!",
        createdAt: "2026-09-02T09:12:00",
        read: true,
      },
    ],
  },
];

export function getConversationsForCurrentUser(): Conversation[] {
  return [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getOtherParticipantId(conversation: Conversation): string {
  return conversation.participantIds.find((id) => id !== currentUserId) ?? conversation.participantIds[0];
}

export function getConversationById(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id);
}

export function unreadMessagesCount(): number {
  return conversations.reduce(
    (acc, c) =>
      acc + c.messages.filter((m) => !m.read && m.senderId !== currentUserId).length,
    0
  );
}
