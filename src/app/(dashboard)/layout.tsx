// src/app/(dashboard)/layout.tsx
'use client';

import { SessionNavBar } from '@/components/dashboard-sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className="min-h-screen bg-slate-100">
      <SessionNavBar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}