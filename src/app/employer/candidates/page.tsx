"use client";

import RoleBasedRoute from "@/shared/components/auth/RoleBasedRoute";
import DashboardLayout from "@/dashboard/employer/layout";
import EmployerCandidatesContent from "@/dashboard/employer/pages/candidates";

export default function EmployerCandidatesPage() {
  return (
    <RoleBasedRoute allowedRoles={["employer"]}>
      <DashboardLayout>
        <EmployerCandidatesContent />
      </DashboardLayout>
    </RoleBasedRoute>
  );
}
