"use client";

import { useMemo, useState } from "react";
import { Users } from "lucide-react";
import { PostComposer } from "@/components/community/post-composer";
import { PostCard } from "@/components/community/post-card";
import { EmptyState } from "@/components/shared/empty-state";
import { useCommunity } from "@/context/community-context";
import { cn } from "@/lib/utils";

const tags = ["Todo", "Pregunta", "Piso", "Evento", "Consejo", "Marketplace", "Presentación", "Seguridad", "Estudios"];

export default function ComunidadPage() {
  const { posts } = useCommunity();
  const [activeTag, setActiveTag] = useState("Todo");

  const filtered = useMemo(
    () => (activeTag === "Todo" ? posts : posts.filter((p) => p.tag === activeTag)),
    [posts, activeTag]
  );

  return (
    <div className="container max-w-2xl py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Comunidad</h1>
        <p className="mt-1 text-muted-foreground">Pregunta, comparte y descubre gente que vive lo mismo que tú.</p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              activeTag === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-surface-hover"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <PostComposer />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Todavía no hay publicaciones aquí"
          description="Sé el primero en compartir algo con la comunidad de MiTribu."
        />
      ) : (
        <div className="space-y-5">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
