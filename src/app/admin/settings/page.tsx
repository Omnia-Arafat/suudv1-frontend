import AdminLayout from '@/dashboard/admin/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import AdminSettingsContent from '@/dashboard/admin/pages/settings';

export default function AdminSettingsPage() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminLayout title="Platform Settings">
        <AdminSettingsContent />
      </AdminLayout>
    </RoleBasedRoute>
  );
}
