'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Loader2, PlusCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { inviteTeamMember } from '@/app/(login)/actions';
import { useUser } from '@/lib/auth';

type ActionState = {
  error?: string;
  success?: string;
};

export function InviteTeamMember() {
  const { user } = useUser();
  const isOwner = user?.role === 'owner';
  const [inviteState, inviteAction, isInvitePending] = useActionState<
    ActionState,
    FormData
  >(inviteTeamMember, { error: '', success: '' });

  return (
    <Card className="border-gray-200/80 dark:border-white/10 bg-white dark:bg-black/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Invite Team Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={inviteAction} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-700 dark:text-white">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              required
              disabled={!isOwner}
              className="bg-white dark:bg-black/50 border-gray-200/80 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/50"
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-white">Role</Label>
            <RadioGroup
              defaultValue="member"
              name="role"
              className="flex space-x-4"
              disabled={!isOwner}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="member" 
                  id="member" 
                  className="border-gray-200/80 dark:border-white/10 text-gray-900 dark:text-white" 
                />
                <Label htmlFor="member" className="text-gray-700 dark:text-white">Member</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="owner" 
                  id="owner" 
                  className="border-gray-200/80 dark:border-white/10 text-gray-900 dark:text-white" 
                />
                <Label htmlFor="owner" className="text-gray-700 dark:text-white">Owner</Label>
              </div>
            </RadioGroup>
          </div>
          {inviteState?.error && (
            <p className="text-red-500">{inviteState.error}</p>
          )}
          {inviteState?.success && (
            <p className="text-green-500">{inviteState.success}</p>
          )}
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white border-0"
            disabled={isInvitePending || !isOwner}
          >
            {isInvitePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inviting...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Invite Member
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {!isOwner && (
        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-white/70">
            You must be a team owner to invite new members.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
