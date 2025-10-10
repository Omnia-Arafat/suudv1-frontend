import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeStatsContent from '@/dashboard/employee/pages/stats';

export default function EmployeeStatsPage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="Career Statistics">
        <EmployeeStatsContent />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
