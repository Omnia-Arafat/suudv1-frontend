import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeMessages from '@/dashboard/employee/pages/messages';

export default function MessagesPage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="Messages">
        <EmployeeMessages />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
