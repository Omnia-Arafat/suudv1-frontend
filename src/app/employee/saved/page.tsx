import EmployeeLayout from '@/dashboard/employee/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import EmployeeSavedJobsContent from '@/dashboard/employee/pages/saved';

export default function SavedJobsPage() {
  return (
    <RoleBasedRoute allowedRoles={['employee']}>
      <EmployeeLayout title="Saved Jobs">
        <EmployeeSavedJobsContent />
      </EmployeeLayout>
    </RoleBasedRoute>
  );
}
