// src/app/(dashboard)/layout.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authApi } from '../../../services/api';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast.success('Logout berhasil');
      router.push('/login');
      router.refresh();
    } catch (error) {
      toast.error('Gagal logout');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">Dashboard Admin</h1>
            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}