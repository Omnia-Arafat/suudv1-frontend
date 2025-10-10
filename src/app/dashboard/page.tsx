'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/contexts/AuthContext';
import { PageSkeleton } from '@/shared/components';

export default function DashboardRouter() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect based on user role to the dashboard structure
      switch (user.role) {
        case 'admin':
          router.replace('/admin/dashboard');
          break;
        case 'employer':
          router.replace('/employer/dashboard');
          break;
        case 'employee':
          router.replace('/employee/dashboard');
          break;
        default:
          // Redirect to login if role is unknown or invalid
          router.replace('/login');
          break;
      }
    } else if (!isLoading && !user) {
      // Redirect to login if not authenticated
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  // Show loading while determining where to redirect
  return <PageSkeleton />;
}
