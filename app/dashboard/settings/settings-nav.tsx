'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { 
  Lock, 
  Settings as SettingsIcon
} from 'lucide-react';

const settingsNav = [
  {
    title: "General",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
  {
    title: "Security",
    href: "/dashboard/settings/security",
    icon: Lock,
  },
];

export function SettingsNav() {
  const pathname = usePathname();
  
  return (
    <aside className="lg:w-1/5">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {settingsNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 