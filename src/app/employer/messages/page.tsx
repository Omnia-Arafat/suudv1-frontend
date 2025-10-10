'use client';

import ProtectedRoute from '@/shared/components/auth/ProtectedRoute';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployerMessages from '@/dashboard/employer/pages/messages';

export default function EmployerMessagesPage() {
  return (
    <ProtectedRoute>
      <RoleBasedRoute allowedRoles={['employer']}>
        <EmployerMessages />
      </RoleBasedRoute>
    </ProtectedRoute>
  );
}
