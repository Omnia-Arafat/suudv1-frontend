// UI Components
export * from "./ui";

// Form Components
export * from "./forms";

// Modal Components
export * from "./modals";

// Shared Components
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";
export {
  Skeleton,
  JobCardSkeleton,
  StatCardSkeleton,
  DashboardSkeleton,
  PageSkeleton,
} from "./LoadingSkeleton";
export {
  LazyWrapper,
  withLazyLoading,
  LazyAdminDashboard,
  LazyEmployerDashboard,
  LazyEmployeeDashboard,
  LazyDashboardRouter,
  LazyLogin,
  LazyRegister,
  LazyJobsPage,
} from "./LazyWrapper";

// Auth Components
export { default as ProtectedRoute } from "./auth/ProtectedRoute";
export { default as RoleBasedRoute } from "./auth/RoleBasedRoute";
