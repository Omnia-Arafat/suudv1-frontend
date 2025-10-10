import AdminLayout from '@/dashboard/admin/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import AdminDashboardContent from '@/dashboard/admin/pages/dashboard';

export default function AdminDashboardPage() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminLayout title="Admin Dashboard">
        <AdminDashboardContent />
      </AdminLayout>
    </RoleBasedRoute>
  );
}
