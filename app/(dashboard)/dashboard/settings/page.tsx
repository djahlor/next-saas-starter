import * as React from 'react';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import { SettingsClient } from './settings-client';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const user = await getUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);
  
  if (!teamData) {
    throw new Error('Team not found');
  }

  return <SettingsClient teamData={teamData} />;
}