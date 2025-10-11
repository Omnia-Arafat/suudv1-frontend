import AdminLayout from "@/dashboard/admin/layout";
import RoleBasedRoute from "@/shared/components/auth/RoleBasedRoute";
import AdminMessages from "@/dashboard/admin/pages/messages";

export default function AdminMessagesPage() {
  return (
    <RoleBasedRoute allowedRoles={["admin"]}>
      <AdminLayout title="Messages">
        <AdminMessages />
      </AdminLayout>
    </RoleBasedRoute>
  );
}
