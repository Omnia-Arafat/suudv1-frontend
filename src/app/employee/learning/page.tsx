import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeLearningContent from '@/dashboard/employee/pages/learning';

export default function LearningPage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="Learning">
        <EmployeeLearningContent />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
