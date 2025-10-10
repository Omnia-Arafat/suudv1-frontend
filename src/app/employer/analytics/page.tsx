"use client";

import RoleBasedRoute from "@/shared/components/auth/RoleBasedRoute";
import DashboardLayout from "@/dashboard/employer/layout";
import EmployerAnalyticsContent from "@/dashboard/employer/pages/analytics";

export default function EmployerAnalyticsPage() {
  return (
    <RoleBasedRoute allowedRoles={["employer"]}>
      <DashboardLayout>
        <EmployerAnalyticsContent />
      </DashboardLayout>
    </RoleBasedRoute>
  );
}
