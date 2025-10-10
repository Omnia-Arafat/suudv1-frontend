import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeApplicationsContent from '@/dashboard/employee/pages/applications';

export default function EmployeeApplicationsPage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="My Applications">
        <EmployeeApplicationsContent />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
