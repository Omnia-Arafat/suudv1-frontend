import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeProfileContent from '@/dashboard/employee/pages/profile';

export default function EmployeeProfilePage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="My Profile">
        <EmployeeProfileContent />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
