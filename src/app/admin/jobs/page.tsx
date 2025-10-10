import AdminLayout from '@/dashboard/admin/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import AdminJobsContent from '@/dashboard/admin/pages/jobs';

export default function AdminJobsPage() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminLayout title="Job Management">
        <AdminJobsContent />
      </AdminLayout>
    </RoleBasedRoute>
  );
}
