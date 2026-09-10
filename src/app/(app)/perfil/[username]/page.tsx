import { notFound } from "next/navigation";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { users } from "@/data/users";
import { currentUserId } from "@/data/current-user";

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = users.find((u) => u.username === username);

  if (!user) notFound();

  return (
    <div className="container py-6 sm:py-10">
      <ProfileHeader user={user} isOwnProfile={user.id === currentUserId} />
      <ProfileTabs user={user} />
    </div>
  );
}
