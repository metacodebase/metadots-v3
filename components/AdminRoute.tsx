"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/meta-admin/login');
        return;
      }

      // Check if user has admin role
      if (user.role !== 'admin') {
        // Redirect non-admin users to dashboard
        router.push('/meta-admin/dashboard');
        return;
      }

      // Check if user is active
      if (!user.isActive) {
        router.push('/meta-admin/login');
        return;
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin' || !user.isActive) {
    return null;
  }

  return <>{children}</>;
} 