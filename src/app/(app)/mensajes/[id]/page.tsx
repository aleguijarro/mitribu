"use client";

import { use } from "react";
import { ConversationList } from "@/components/chat/conversation-list";
import { ChatWindow } from "@/components/chat/chat-window";

export default function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="mx-auto h-[calc(100dvh-10rem)] w-full max-w-[1200px] px-0 py-0 md:h-[calc(100dvh-8.5rem)] md:px-6 md:py-8 lg:px-8">
      <div className="flex h-full overflow-hidden rounded-none border-0 border-border md:rounded-2xl md:border">
        <ConversationList className="hidden w-[360px] border-r md:flex" activeId={id} />
        <ChatWindow conversationId={id} />
      </div>
    </div>
  );
}
