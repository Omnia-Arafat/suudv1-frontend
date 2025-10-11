import EmployerLayout from "@/dashboard/employer/layout";
import RoleBasedRoute from "@/shared/components/auth/RoleBasedRoute";
import EmployerMessages from "@/dashboard/employer/pages/messages";

export default function EmployerMessagesPage() {
  return (
    <RoleBasedRoute allowedRoles={["employer"]}>
      <EmployerLayout title="Messages">
        <EmployerMessages />
      </EmployerLayout>
    </RoleBasedRoute>
  );
}
