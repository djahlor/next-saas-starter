import { redirect } from 'next/navigation';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, Mail, ArrowUpRight } from 'lucide-react';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-white">Dashboard</h1>
        <div className="text-sm text-white/70">
          Welcome back, {user.name || user.email}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/50 backdrop-blur-xl border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Total Campaigns</CardTitle>
            <BarChart className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-white/50">
              +0% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-black/50 backdrop-blur-xl border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-white/50">
              +0% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 backdrop-blur-xl border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Emails Sent</CardTitle>
            <Mail className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-white/50">
              +0% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 backdrop-blur-xl border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Open Rate</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0%</div>
            <p className="text-xs text-white/50">
              +0% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
