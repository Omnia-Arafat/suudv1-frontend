import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import ApplicationsPageContent from '@/dashboard/employee/pages/applications';

export default function MyApplicationsPage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="My Applications">
        <ApplicationsPageContent />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
