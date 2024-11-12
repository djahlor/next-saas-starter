'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { useActionState } from 'react';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import { removeTeamMember } from '@/app/(login)/actions';
import { InviteTeamMember } from './invite-team';

type ActionState = {
  error?: string;
  success?: string;
};

export function SettingsClient({ teamData }: { teamData: TeamDataWithMembers }) {
  const [removeState, removeAction, isRemovePending] = useActionState<
    ActionState,
    FormData
  >(removeTeamMember, { error: '', success: '' });

  const getUserDisplayName = (user: Pick<User, 'id' | 'name' | 'email'>) => {
    return user.name || user.email || 'Unknown User';
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
      </div>
      <div className="grid gap-4">
        <Card className="border-gray-200/80 dark:border-white/10 bg-white dark:bg-black/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Team Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-4 sm:mb-0">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Current Plan: {teamData.planName || 'Free'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-white/70">
                    {teamData.subscriptionStatus === 'active'
                      ? 'Billed monthly'
                      : teamData.subscriptionStatus === 'trialing'
                        ? 'Trial period'
                        : 'No active subscription'}
                  </p>
                </div>
                <form action={customerPortalAction}>
                  <Button 
                    type="submit" 
                    variant="outline"
                    className="bg-white hover:bg-gray-50 text-gray-900 border-gray-200/80 hover:border-gray-300 dark:bg-black/50 dark:text-white dark:border-white/10 dark:hover:bg-white/10"
                  >
                    Manage Subscription
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/80 dark:border-white/10 bg-white dark:bg-black/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {teamData.teamMembers.map((member, index) => (
                <li key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32`}
                        alt={getUserDisplayName(member.user)}
                      />
                      <AvatarFallback className="bg-gray-100 dark:bg-black/50 text-gray-600 dark:text-white">
                        {getUserDisplayName(member.user)
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {getUserDisplayName(member.user)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-white/70 capitalize">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  {index > 1 ? (
                    <form action={removeAction}>
                      <input type="hidden" name="memberId" value={member.id} />
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        disabled={isRemovePending}
                        className="bg-white hover:bg-gray-50 text-gray-900 border-gray-200/80 hover:border-gray-300 dark:bg-black/50 dark:text-white dark:border-white/10 dark:hover:bg-white/10"
                      >
                        {isRemovePending ? 'Removing...' : 'Remove'}
                      </Button>
                    </form>
                  ) : null}
                </li>
              ))}
            </ul>
            {removeState?.error && (
              <p className="text-red-500 mt-4">{removeState.error}</p>
            )}
          </CardContent>
        </Card>

        <InviteTeamMember />
      </div>
    </div>
  );
} 