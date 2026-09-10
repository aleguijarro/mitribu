import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck } from "lucide-react";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

const sizes = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
  xl: "h-24 w-24",
};

interface UserAvatarProps {
  user: Pick<User, "name" | "avatarUrl" | "verified">;
  size?: keyof typeof sizes;
  showVerified?: boolean;
  className?: string;
}

export function UserAvatar({ user, size = "md", showVerified = false, className }: UserAvatarProps) {
  return (
    <div className={cn("relative inline-block shrink-0", className)}>
      <Avatar className={sizes[size]}>
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback>{initials(user.name)}</AvatarFallback>
      </Avatar>
      {showVerified && user.verified && (
        <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full bg-card">
          <BadgeCheck className="h-4 w-4 fill-primary text-primary-foreground" strokeWidth={2.5} />
        </span>
      )}
    </div>
  );
}
