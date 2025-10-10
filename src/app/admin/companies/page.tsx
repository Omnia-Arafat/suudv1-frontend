import AdminLayout from '@/dashboard/admin/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import AdminCompaniesContent from '@/dashboard/admin/pages/companies';

export default function AdminCompaniesPage() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminLayout title="Companies Management">
        <AdminCompaniesContent />
      </AdminLayout>
    </RoleBasedRoute>
  );
}
