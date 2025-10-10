import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeJobsContent from '@/dashboard/employee/pages/jobs';

export default function EmployeeJobsPage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="Find Jobs">
        <EmployeeJobsContent />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
