"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading, validateContext } = useAuth();
  const [isValidating, setIsValidating] = useState(false);
  const hasValidatedRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAccess = async () => {
      if (!isLoading) {
        if (!user) {
          if (pathname !== '/meta-admin/login') {
            router.push('/meta-admin/login');
          }
          return;
        }

        // Check basic requirements first (client-side validation)
        if (!['admin', 'author'].includes(user.role) || !user.isActive) {
          if (pathname !== '/meta-admin/login') {
            router.push('/meta-admin/login');
          }
          return;
        }

        // Only validate with server once per component mount
        if (!hasValidatedRef.current) {
          setIsValidating(true);
          try {
            const isValid = await validateContext();
            if (!isValid) {
              if (pathname !== '/meta-admin/login') {
                router.push('/meta-admin/login');
              }
              return;
            }
            hasValidatedRef.current = true;
          } catch (error) {
            console.error('Validation error:', error);
            if (pathname !== '/meta-admin/login') {
              router.push('/meta-admin/login');
            }
            return;
          } finally {
            setIsValidating(false);
          }
        }
      }
    };

    checkAccess();
  }, [user, isLoading, router, validateContext, pathname]);

  // Reset validation when user changes
  useEffect(() => {
    hasValidatedRef.current = false;
  }, [user?.id]);

  if (isLoading || isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user || !['admin', 'author'].includes(user.role) || !user.isActive) {
    return null;
  }

  return <>{children}</>;
} 