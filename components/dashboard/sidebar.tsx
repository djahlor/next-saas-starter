'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Mail, Users, BarChart, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/campaigns', icon: Mail, label: 'Campaigns' },
  { href: '/dashboard/subscribers', icon: Users, label: 'Subscribers' },
  { href: '/dashboard/analytics', icon: BarChart, label: 'Analytics' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-white dark:bg-black/50 backdrop-blur-xl border-b border-gray-200/80 dark:border-white/10 p-4">
        <div className="flex items-center">
          <span className="font-medium text-gray-900 dark:text-white">
            {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
          </span>
        </div>
        <Button
          className="-mr-3"
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 bg-white dark:bg-black border-r border-gray-200/80 dark:border-white/10 lg:block",
          "lg:relative fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="h-full overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    "my-1 w-full justify-start",
                    isActive 
                      ? "bg-blue-500/20 text-blue-500 dark:text-blue-400" 
                      : "text-gray-600 dark:text-white/70 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-white/10"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
} 