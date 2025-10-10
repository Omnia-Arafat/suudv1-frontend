import EmployerLayout from '@/dashboard/employer/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployerDashboardContent from '@/dashboard/employer/pages/dashboard';

export default function EmployerDashboardPage() {
  return (
    <RoleBasedRoute allowedRoles={['employer']}>
      <EmployerLayout title="Employer Dashboard">
        <EmployerDashboardContent />
      </EmployerLayout>
    </RoleBasedRoute>
  );
}
