"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useCommunity } from "@/context/community-context";
import { useToast } from "@/hooks/use-toast";
import { currentUser } from "@/data/current-user";
import { communityPhoto } from "@/data/images";
import { cn } from "@/lib/utils";

const tags = ["Pregunta", "Piso", "Evento", "Consejo", "Marketplace", "Presentación"];

export function PostComposer() {
  const { addPost } = useCommunity();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [tag, setTag] = useState<string | undefined>();
  const [withImage, setWithImage] = useState(false);
  const [posted, setPosted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    addPost({ text: text.trim(), tag, imageUrl: withImage ? communityPhoto(Math.floor(Math.random() * 10)) : undefined });
    setText("");
    setTag(undefined);
    setWithImage(false);
    setPosted(true);
    toast({ title: "🎉 ¡Publicado!", description: "Tu publicación ya está disponible para MiTribu." });
    setTimeout(() => setPosted(false), 1500);
  }

  return (
    <Card>
      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <UserAvatar user={currentUser} />
          <div className="flex-1">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="¿Qué está pasando en tu tribu?"
              className="min-h-[70px] resize-none border-none bg-secondary px-4 py-3 focus-visible:ring-1"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setWithImage((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    withImage ? "border-primary bg-primary-50 text-primary-700" : "border-border text-muted-foreground hover:bg-surface-hover"
                  )}
                >
                  <ImagePlus className="h-3.5 w-3.5" /> Foto
                </button>
                {tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag((cur) => (cur === t ? undefined : t))}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      tag === t ? "border-primary bg-primary-50 text-primary-700" : "border-border text-muted-foreground hover:bg-surface-hover"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <Button type="submit" size="sm" disabled={!text.trim()}>
                Publicar
              </Button>
            </div>
          </div>
        </form>
        {posted && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 rounded-xl bg-primary-50 px-4 py-2.5 text-sm font-medium text-primary-700"
          >
            <Sparkles className="h-4 w-4" /> ¡Publicado! Ya aparece en el feed de la comunidad.
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
