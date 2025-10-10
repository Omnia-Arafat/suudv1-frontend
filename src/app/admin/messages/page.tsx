'use client';

import ProtectedRoute from '@/shared/components/auth/ProtectedRoute';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import AdminMessages from '@/dashboard/admin/pages/messages';

export default function AdminMessagesPage() {
  return (
    <ProtectedRoute>
      <RoleBasedRoute allowedRoles={['admin']}>
        <AdminMessages />
      </RoleBasedRoute>
    </ProtectedRoute>
  );
}
