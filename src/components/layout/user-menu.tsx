"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, LifeBuoy, LogOut, Settings, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useAuth } from "@/context/auth-context";
import { useCurrentUserProfile } from "@/hooks/use-current-user-profile";

export function UserMenu() {
  const { logout } = useAuth();
  const router = useRouter();
  const { user: currentUser } = useCurrentUserProfile();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 transition-colors hover:bg-surface-hover"
          aria-label="Menú de usuario"
        >
          <UserAvatar user={currentUser} size="sm" />
          <span className="hidden text-sm font-medium xl:inline">{currentUser.name.split(" ")[0]}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex items-center gap-3 px-2.5 py-2">
          <UserAvatar user={currentUser} size="sm" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-foreground">{currentUser.name}</span>
            <span className="block truncate text-xs font-normal text-muted-foreground">@{currentUser.username}</span>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/perfil">
            <UserIcon className="h-4 w-4" /> Mi perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/favoritos">
            <Heart className="h-4 w-4" /> Favoritos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/perfil/editar">
            <Settings className="h-4 w-4" /> Editar perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/soporte">
            <LifeBuoy className="h-4 w-4" /> Soporte
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10">
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
