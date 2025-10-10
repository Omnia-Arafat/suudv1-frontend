"use client";

import RoleBasedRoute from "@/shared/components/auth/RoleBasedRoute";
import DashboardLayout from "@/dashboard/employer/layout";
import EmployerApplicationsContent from "@/dashboard/employer/pages/applications";

export default function EmployerApplicationsPage() {
  return (
    <RoleBasedRoute allowedRoles={["employer"]}>
      <DashboardLayout>
        <EmployerApplicationsContent />
      </DashboardLayout>
    </RoleBasedRoute>
  );
}
