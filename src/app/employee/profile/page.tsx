import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeProfileContent from '@/dashboard/employee/pages/profile';

export default function ProfilePage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="Profile">
        <EmployeeProfileContent />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
