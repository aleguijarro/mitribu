"use client";

import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { useCurrentUserProfile } from "@/hooks/use-current-user-profile";

export default function MyProfilePage() {
  const { user } = useCurrentUserProfile();

  return (
    <div className="container py-6 sm:py-10">
      <ProfileHeader user={user} isOwnProfile />
      <ProfileTabs user={user} />
    </div>
  );
}
