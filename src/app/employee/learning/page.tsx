import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeLearningContent from '@/dashboard/employee/pages/learning';

export default function EmployeeLearningPage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="Learning Center">
        <EmployeeLearningContent />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
