import Link from "next/link";
import { communityPosts } from "@/data/community-posts";
import { PostCard } from "@/components/community/post-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

export function CommunityPreview() {
  const posts = communityPosts.slice(0, 3);

  return (
    <section className="container py-16 sm:py-20">
      <SectionHeader
        title="Hay cosas que solo entiende otro estudiante"
        subtitle="Preguntas, consejos, quedadas y avisos entre gente que vive lo mismo que tú."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/comunidad">Descubrir la comunidad</Link>
        </Button>
      </div>
    </section>
  );
}
