"use client";

import RoleBasedRoute from "@/shared/components/auth/RoleBasedRoute";
import DashboardLayout from "@/dashboard/employer/layout";
import EmployerCompanyContent from "@/dashboard/employer/pages/company";

export default function EmployerCompanyPage() {
  return (
    <RoleBasedRoute allowedRoles={["employer"]}>
      <DashboardLayout>
        <EmployerCompanyContent />
      </DashboardLayout>
    </RoleBasedRoute>
  );
}
