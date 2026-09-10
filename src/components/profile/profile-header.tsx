import Image from "next/image";
import Link from "next/link";
import { GraduationCap, MapPin, Settings } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Rating } from "@/components/shared/rating";
import { VerifiedBadge } from "@/components/shared/verified-badge";
import { Button } from "@/components/ui/button";
import { MoreActionsMenu } from "@/components/shared/more-actions-menu";
import { formatDate } from "@/lib/format";
import type { User } from "@/types";

export function ProfileHeader({ user, isOwnProfile }: { user: User; isOwnProfile: boolean }) {
  return (
    <div>
      <div className="relative h-36 w-full overflow-hidden rounded-2xl bg-tribu-gradient sm:h-48">
        {user.coverUrl && <Image src={user.coverUrl} alt="" fill sizes="100vw" className="object-cover opacity-80" />}
      </div>
      <div className="px-1 sm:px-2">
        <div className="-mt-12 flex flex-col items-start gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <span className="rounded-full border-4 border-background">
              <UserAvatar user={user} size="xl" />
            </span>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{user.name}</h1>
              </div>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            {isOwnProfile ? (
              <Button asChild variant="outline" className="flex-1 sm:flex-none">
                <Link href="/perfil/editar">
                  <Settings className="h-4 w-4" /> Editar perfil
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild className="flex-1 sm:flex-none">
                  <Link href="/mensajes">Enviar mensaje</Link>
                </Button>
                <MoreActionsMenu listingLabel="perfil" />
              </>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {user.bio && <p className="max-w-2xl text-sm leading-relaxed text-foreground">{user.bio}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {user.city}
            </span>
            {user.university && (
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" /> {user.university}
              </span>
            )}
            <Rating value={user.rating} reviewCount={user.reviewCount} />
            <span>Miembro desde {formatDate(user.memberSince)}</span>
          </div>
          {user.verified && <VerifiedBadge />}
        </div>
      </div>
    </div>
  );
}
