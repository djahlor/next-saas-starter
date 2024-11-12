'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="bg-transparent border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-900 dark:text-white/70" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-900 dark:text-white/70" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 