'use client';

import { ThemeProvider } from '@/lib/theme-provider';
import { Header } from '@/components/dashboard/header';

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black">
        <Header />
        {children}
      </div>
    </ThemeProvider>
  );
} 