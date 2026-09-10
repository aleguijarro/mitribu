"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { SaveButton } from "@/components/shared/save-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCommunity } from "@/context/community-context";
import { useToast } from "@/hooks/use-toast";
import { getUserById } from "@/data/users";
import { currentUser } from "@/data/current-user";
import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CommunityPost } from "@/types";

export function PostCard({ post }: { post: CommunityPost }) {
  const { isLiked, toggleLike, addComment } = useCommunity();
  const { toast } = useToast();
  const author = getUserById(post.authorId);
  const [showComments, setShowComments] = useState(false);
  const [draft, setDraft] = useState("");
  const liked = isLiked(post.id);

  if (!author) return null;

  function handleShare() {
    toast({ title: "Enlace copiado 🔗", description: "Ya puedes compartir esta publicación." });
  }

  function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    addComment(post.id, draft.trim());
    setDraft("");
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-subtle">
      <header className="flex items-start gap-3">
        <Link href={`/perfil/${author.username}`}>
          <UserAvatar user={author} showVerified />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/perfil/${author.username}`} className="text-sm font-semibold hover:underline">
              {author.name}
            </Link>
            {post.tag && <Badge variant="secondary">{post.tag}</Badge>}
          </div>
          <p className="text-xs text-muted-foreground">
            {author.university ?? author.city} · {formatRelativeTime(post.createdAt)}
          </p>
        </div>
        <SaveButton id={post.id} kind="post" variant="floating" className="static bg-transparent shadow-none hover:bg-surface-hover" />
      </header>

      <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-foreground">{post.text}</p>

      {post.imageUrl && (
        <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
          <Image src={post.imageUrl} alt="" fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
        </div>
      )}

      <div className="mt-4 flex items-center gap-1 border-t border-border pt-3">
        <button
          onClick={() => toggleLike(post.id)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors hover:bg-surface-hover",
            liked ? "text-coral" : "text-muted-foreground"
          )}
        >
          <motion.span whileTap={{ scale: 1.3 }}>
            <Heart className={cn("h-4 w-4", liked && "fill-coral")} />
          </motion.span>
          {post.likes}
        </button>
        <button
          onClick={() => setShowComments((s) => !s)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-hover"
        >
          <MessageCircle className="h-4 w-4" />
          {post.comments.length}
        </button>
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-hover"
        >
          <Share2 className="h-4 w-4" />
          {post.sharesCount}
        </button>
      </div>

      {showComments && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 space-y-3 border-t border-border pt-3">
          {post.comments.map((c) => {
            const commentAuthor = getUserById(c.authorId);
            if (!commentAuthor) return null;
            return (
              <div key={c.id} className="flex items-start gap-2.5">
                <UserAvatar user={commentAuthor} size="xs" />
                <div className="min-w-0 flex-1 rounded-2xl bg-secondary px-3 py-2">
                  <p className="text-xs font-semibold">{commentAuthor.name}</p>
                  <p className="text-sm text-foreground">{c.text}</p>
                </div>
              </div>
            );
          })}
          <form onSubmit={handleComment} className="flex items-center gap-2.5 pt-1">
            <UserAvatar user={currentUser} size="xs" />
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Escribe un comentario..."
              className="h-9 flex-1 rounded-full"
            />
            <Button type="submit" size="icon-sm" variant="ghost" aria-label="Enviar comentario">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </motion.div>
      )}
    </article>
  );
}
