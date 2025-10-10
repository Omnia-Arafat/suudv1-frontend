import AdminLayout from '@/dashboard/admin/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import AdminContactsContent from '@/dashboard/admin/pages/contacts';

export default function AdminContactsPage() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminLayout title="Contact Messages">
        <AdminContactsContent />
      </AdminLayout>
    </RoleBasedRoute>
  );
}
