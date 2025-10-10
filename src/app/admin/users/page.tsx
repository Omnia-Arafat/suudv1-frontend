import AdminLayout from '@/dashboard/admin/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import AdminUsersContent from '@/dashboard/admin/pages/users';

export default function AdminUsersPage() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminLayout title="User Management">
        <AdminUsersContent />
      </AdminLayout>
    </RoleBasedRoute>
  );
}
