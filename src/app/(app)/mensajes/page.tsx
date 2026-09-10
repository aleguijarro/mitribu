import { MessageCircle } from "lucide-react";
import { ConversationList } from "@/components/chat/conversation-list";

export default function MensajesPage() {
  return (
    <div className="mx-auto h-[calc(100dvh-10rem)] w-full max-w-[1200px] px-0 py-0 md:h-[calc(100dvh-8.5rem)] md:px-6 md:py-8 lg:px-8">
      <div className="flex h-full overflow-hidden rounded-none border-0 border-border md:rounded-2xl md:border">
        <ConversationList className="w-full md:w-[360px] md:border-r" />
        <div className="hidden flex-1 flex-col items-center justify-center gap-2 bg-surface text-center md:flex">
          <MessageCircle className="h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">Selecciona una conversación para empezar a chatear.</p>
        </div>
      </div>
    </div>
  );
}
