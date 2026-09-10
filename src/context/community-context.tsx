"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { communityPosts as mockPosts } from "@/data/community-posts";
import { currentUserId } from "@/data/current-user";
import type { Comment, CommunityPost } from "@/types";

interface NewPostInput {
  text: string;
  imageUrl?: string;
  tag?: string;
}

interface CommunityContextValue {
  posts: CommunityPost[];
  isLiked: (postId: string) => boolean;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  addPost: (input: NewPostInput) => CommunityPost;
}

interface CommunityState {
  likedPostIds: string[];
  extraComments: Record<string, Comment[]>;
  extraPosts: CommunityPost[];
}

const initialState: CommunityState = { likedPostIds: [], extraComments: {}, extraPosts: [] };

const CommunityContext = createContext<CommunityContextValue | null>(null);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<CommunityState>("mitribu:community", initialState);

  const value = useMemo<CommunityContextValue>(() => {
    const allPosts = [...state.extraPosts, ...mockPosts].map((p) => ({
      ...p,
      likes: p.likes + (state.likedPostIds.includes(p.id) ? 1 : 0),
      comments: [...p.comments, ...(state.extraComments[p.id] ?? [])],
    }));

    const isLiked = (postId: string) => state.likedPostIds.includes(postId);

    const toggleLike = (postId: string) =>
      setState((prev) => ({
        ...prev,
        likedPostIds: prev.likedPostIds.includes(postId)
          ? prev.likedPostIds.filter((id) => id !== postId)
          : [...prev.likedPostIds, postId],
      }));

    const addComment = (postId: string, text: string) =>
      setState((prev) => {
        const comment: Comment = {
          id: `local-${Date.now()}`,
          authorId: currentUserId,
          text,
          createdAt: new Date().toISOString(),
          likes: 0,
        };
        return {
          ...prev,
          extraComments: {
            ...prev.extraComments,
            [postId]: [...(prev.extraComments[postId] ?? []), comment],
          },
        };
      });

    const addPost = (input: NewPostInput): CommunityPost => {
      const post: CommunityPost = {
        id: `local-${Date.now()}`,
        authorId: currentUserId,
        text: input.text,
        imageUrl: input.imageUrl,
        tag: input.tag,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        sharesCount: 0,
      };
      setState((prev) => ({ ...prev, extraPosts: [post, ...prev.extraPosts] }));
      return post;
    };

    return { posts: allPosts, isLiked, toggleLike, addComment, addPost };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
}

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error("useCommunity debe usarse dentro de <CommunityProvider>");
  return ctx;
}
