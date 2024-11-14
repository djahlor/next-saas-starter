'use client';

import { SettingsClient } from './settings-client';
import { InviteTeamMember } from './invite-team';
import { useUser } from '@/lib/auth';

// Temporary mock data until we implement proper team data fetching
const mockTeamData = {
  id: "1",
  name: "Eva Wellness",
  planName: "Free",
  subscriptionStatus: "active" as const,
};

export default function SettingsPage() {
  const { user } = useUser();
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <SettingsClient teamData={mockTeamData} />
      <InviteTeamMember />
    </div>
  );
}
