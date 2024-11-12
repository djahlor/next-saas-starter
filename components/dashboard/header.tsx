'use client';

import * as React from 'react';
import Link from 'next/link';
import { CircleIcon, Home, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/lib/auth';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  async function handleSignOut() {
    setUser(null);
    await signOut();
    router.push('/');
  }

  return (
    <header className="border-b border-gray-200/80 dark:border-white/10 bg-white dark:bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">ACME</span>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
          >
            Pricing
          </Link>
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer size-9 ring-2 ring-gray-200 dark:ring-white/10 hover:ring-blue-500/50 transition-all">
                  <AvatarImage alt={user.name || ''} />
                  <AvatarFallback className="bg-gray-50 dark:bg-black/50 text-gray-600 dark:text-white">
                    {user.email
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-black/90 backdrop-blur-xl border-gray-200/80 dark:border-white/10">
                <DropdownMenuItem className="cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10">
                  <Link href="/dashboard" className="flex w-full items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <form action={handleSignOut} className="w-full">
                  <button type="submit" className="flex w-full">
                    <DropdownMenuItem className="w-full flex-1 cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
} 