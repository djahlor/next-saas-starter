import * as React from 'react';
import { SettingsNav } from './settings-nav';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full">
      <div className="max-w-6xl mx-auto w-full px-4 py-4 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <SettingsNav />
            <div className="flex-1 lg:max-w-2xl">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 