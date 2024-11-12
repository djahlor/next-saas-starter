'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-[calc(100dvh-61px)]">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full px-4 py-4 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
