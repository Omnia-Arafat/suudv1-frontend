import AdminLayout from '@/dashboard/admin/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import AdminAnalyticsContent from '@/dashboard/admin/pages/analytics';

export default function AdminAnalyticsPage() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminLayout title="Platform Analytics">
        <AdminAnalyticsContent />
      </AdminLayout>
    </RoleBasedRoute>
  );
}
