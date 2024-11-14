import { DashboardSidebar } from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-[auto,1fr]">
        <DashboardSidebar />
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
} 