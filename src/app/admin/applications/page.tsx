import AdminLayout from '@/dashboard/admin/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import AdminApplicationsContent from '@/dashboard/admin/pages/applications';

export default function AdminApplicationsPage() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminLayout title="Applications Management">
        <AdminApplicationsContent />
      </AdminLayout>
    </RoleBasedRoute>
  );
}
