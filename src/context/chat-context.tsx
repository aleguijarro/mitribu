"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { conversations as mockConversations } from "@/data/conversations";
import { currentUserId } from "@/data/current-user";
import type { Conversation, Message, MessageAttachment } from "@/types";

interface ChatContextValue {
  conversations: Conversation[];
  getConversation: (id: string) => Conversation | undefined;
  sendMessage: (conversationId: string, text: string, attachment?: MessageAttachment) => void;
  /**
   * Encuentra (o crea) la conversación con otro usuario y opcionalmente envía un primer mensaje.
   * `unlockContact` se usa al aceptar una solicitud: desde ahí se pueden compartir datos de contacto.
   * Devuelve el id de la conversación.
   */
  startConversation: (
    otherUserId: string,
    text?: string,
    attachment?: MessageAttachment,
    opts?: { unlockContact?: boolean; senderId?: string }
  ) => string;
}

interface ChatState {
  extraMessages: Message[];
  extraConversations: Conversation[];
  unlockedConversationIds?: string[];
}

const initialState: ChatState = { extraMessages: [], extraConversations: [] };

const ChatContext = createContext<ChatContextValue | null>(null);

/**
 * Mensajería simulada en el cliente. Los mensajes y conversaciones extra
 * que crea el usuario se guardan en localStorage y se combinan con los
 * datos mock en cada carga, para que la conversación se sienta persistente.
 */
export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<ChatState>("mitribu:chat", initialState);

  const value = useMemo<ChatContextValue>(() => {
    const base = [...mockConversations, ...state.extraConversations];

    const unlocked = new Set(state.unlockedConversationIds ?? []);
    const merged: Conversation[] = base.map((rawConv) => {
      const conv = unlocked.has(rawConv.id) ? { ...rawConv, contactUnlocked: true } : rawConv;
      const extras = state.extraMessages.filter((m) => m.conversationId === conv.id);
      if (extras.length === 0) return conv;
      const lastExtra = extras[extras.length - 1];
      return {
        ...conv,
        messages: [...conv.messages, ...extras],
        updatedAt: lastExtra.createdAt,
      };
    });

    merged.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    const getConversation = (id: string) => merged.find((c) => c.id === id);

    const sendMessage = (conversationId: string, text: string, attachment?: MessageAttachment) => {
      const message: Message = {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        conversationId,
        senderId: currentUserId,
        text: text || undefined,
        attachment,
        createdAt: new Date().toISOString(),
        read: true,
      };
      setState((prev) => ({ ...prev, extraMessages: [...prev.extraMessages, message] }));
    };

    const startConversation: ChatContextValue["startConversation"] = (otherUserId, text, attachment, opts) => {
      const existing = merged.find((c) => c.participantIds.includes(otherUserId));
      const conversationId = existing?.id ?? `local-conv-${otherUserId}-${Date.now()}`;

      if (!existing) {
        const newConversation: Conversation = {
          id: conversationId,
          participantIds: [currentUserId, otherUserId],
          messages: [],
          updatedAt: new Date().toISOString(),
        };
        setState((prev) => ({ ...prev, extraConversations: [...prev.extraConversations, newConversation] }));
      }

      if (opts?.unlockContact) {
        setState((prev) => ({
          ...prev,
          unlockedConversationIds: [...(prev.unlockedConversationIds ?? []), conversationId],
        }));
      }

      if (text || attachment) {
        const message: Message = {
          id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          conversationId,
          senderId: opts?.senderId ?? currentUserId,
          text: text || undefined,
          attachment,
          createdAt: new Date().toISOString(),
          read: true,
        };
        setState((prev) => ({ ...prev, extraMessages: [...prev.extraMessages, message] }));
      }

      return conversationId;
    };

    return { conversations: merged, getConversation, sendMessage, startConversation };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat debe usarse dentro de <ChatProvider>");
  return ctx;
}
