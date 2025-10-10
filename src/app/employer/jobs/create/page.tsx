import EmployerLayout from '@/dashboard/employer/layout';
import RoleBasedRoute from '@/shared/components/auth/RoleBasedRoute';
import CreateJobContent from '@/dashboard/employer/pages/create-job';

export default function CreateJobPage() {
  return (
    <RoleBasedRoute allowedRoles={['employer']}>
      <EmployerLayout title="Post New Job">
        <CreateJobContent />
      </EmployerLayout>
    </RoleBasedRoute>
  );
}
