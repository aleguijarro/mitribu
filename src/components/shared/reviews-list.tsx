import { Star } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { getUserById } from "@/data/users";
import { formatShortDate } from "@/lib/format";
import type { Review } from "@/types";

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">Todavía no hay valoraciones.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {reviews.map((review) => {
        const author = getUserById(review.authorId);
        if (!author) return null;
        return (
          <div key={review.id} className="rounded-xl border border-border p-4">
            <div className="flex items-center gap-2.5">
              <UserAvatar user={author} size="sm" />
              <div>
                <p className="text-sm font-semibold">{author.name}</p>
                <p className="text-xs text-muted-foreground">{formatShortDate(review.createdAt)}</p>
              </div>
            </div>
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-foreground text-foreground" : "text-border"}`} />
              ))}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.text}</p>
          </div>
        );
      })}
    </div>
  );
}
