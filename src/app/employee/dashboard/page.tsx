import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeDashboardContent from '@/dashboard/employee/pages/dashboard';

export default function EmployeeDashboardPage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="My Dashboard">
        <EmployeeDashboardContent />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
