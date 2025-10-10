import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeJobsPage from '@/dashboard/employee/pages/jobs';

export default function JobsPage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="Jobs">
        <EmployeeJobsPage />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
