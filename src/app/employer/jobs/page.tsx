import EmployerLayout from '@/dashboard/employer/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployerJobsContent from '@/dashboard/employer/pages/jobs';

export default function EmployerJobsPage() {
  return (
    <RoleBasedRoute allowedRoles={['employer']}>
      <EmployerLayout title="My Jobs">
        <EmployerJobsContent />
      </EmployerLayout>
    </RoleBasedRoute>
  );
}
