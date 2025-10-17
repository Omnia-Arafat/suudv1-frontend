"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/shared/contexts";
import { employeeService } from "@/shared/services/employee.service";
import Link from "next/link";
import { XCircle, Star, MapPin, Building2 } from "lucide-react";

interface EmployeeDashboardData {
  stats: {
    applications: {
      total: number;
      pending: number;
      reviewed: number;
      accepted: number;
      rejected: number;
      this_month: number;
    };
    jobs: {
      available: number;
      applied_to: number;
      new_today: number;
      matching_specialization: number;
    };
    profile: {
      completion: number;
      views: number;
      cv_uploaded: boolean;
      avatar_uploaded: boolean;
    };
  };
  recent_applications: Array<{
    id: string | number;
    job_listing?: {
      title: string;
      company?: { name: string };
    };
    job?: string;
    company_name?: string;
    applied_date?: string;
    created_at?: string;
    status: string;
  }>;
  recommended_jobs: Array<{
    id: string | number;
    title: string;
    description?: string;
    company?: { name: string };
    company_name?: string;
    location: string;
    salary?: string;
    salary_min?: number;
    salary_max?: number;
    salary_currency?: string;
    job_type?: string;
    posted_date?: string;
    type?: string;
    created_at?: string;
  }>;
  latest_jobs: Array<{
    id: string | number;
    title: string;
    description?: string;
    company?: { name: string };
    company_name?: string;
    location: string;
    salary?: string;
    salary_min?: number;
    salary_max?: number;
    salary_currency?: string;
    job_type?: string;
    posted_date?: string;
    type?: string;
    created_at?: string;
  }>;
  profile?: {
    name: string;
    email: string;
    specialization: string;
    university: string;
    profile_summary: string;
    avatar_url: string;
    cv_url: string;
  };
}

const StatCard = ({
  title,
  value,
  icon,
  color,
  trend,
}: {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  trend?: string;
}) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <i className={`${icon} text-xl ${color}`} />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {value}
              </div>
              {trend && (
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {trend}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const JobCard = ({
  job,
}: {
  job: {
    id: string | number;
    title: string;
    description?: string;
    company?: { name: string };
    company_name?: string;
    location: string;
    salary?: string;
    salary_min?: number;
    salary_max?: number;
    salary_currency?: string;
    job_type?: string;
    posted_date?: string;
    type?: string;
    created_at?: string;
  };
}) => (
  <div className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
      <span className="text-sm text-gray-500">
        {job.created_at
          ? new Date(job.created_at).toLocaleDateString()
          : "Recently"}
      </span>
    </div>
    <div className="flex items-center text-sm text-gray-600 mb-2">
      <Building2 className="h-4 w-4 mr-1" />
      <span>{job.company?.name || job.company_name || "Unknown Company"}</span>
      <MapPin className="h-4 w-4 ml-4 mr-1" />
      <span>{job.location}</span>
    </div>
    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {job.job_type || job.type || "Full-time"}
        </span>
        <span className="text-sm text-green-600 font-medium">
          {job.salary_min && job.salary_max
            ? `${job.salary_min}-${job.salary_max} ${
                job.salary_currency || "SAR"
              }`
            : job.salary || "Salary not specified"}
        </span>
      </div>
      <Link
        href={`/employee/jobs/${job.id}`}
        className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md transition-colors"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default function EmployeeDashboardContent() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] =
    useState<EmployeeDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<number | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await employeeService.getDashboardData();

      // Handle the backend response structure
      if (response.success && response.data) {
        setDashboardData(response.data);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch {
      // Only log detailed errors in development
      if (process.env.NODE_ENV === "development") {
        console.info(
          "ℹ️ Using fallback dashboard data (backend not connected)"
        );
      }
      // Set fallback data when API is not available
      const fallbackData: EmployeeDashboardData = {
        stats: {
          applications: {
            total: 0,
            pending: 0,
            reviewed: 0,
            accepted: 0,
            rejected: 0,
            this_month: 0,
          },
          jobs: {
            available: 0,
            applied_to: 0,
            new_today: 0,
            matching_specialization: 0,
          },
          profile: {
            completion: 75,
            views: 0,
            cv_uploaded: false,
            avatar_uploaded: false,
          },
        },
        recent_applications: [],
        recommended_jobs: [],
        latest_jobs: [],
      };
      setDashboardData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyForJob = async (jobId: number) => {
    setApplying(jobId);
    try {
      await employeeService.applyForJob(jobId, {});
      // Refresh dashboard data to update application counts
      await fetchDashboardData();
    } catch {
      // Only log detailed errors in development
      if (process.env.NODE_ENV === "development") {
        console.info(
          "ℹ️ Using fallback dashboard data (backend not connected)"
        );
      }
    } finally {
      setApplying(null);
    }
  };

  const handleWithdrawApplication = async (applicationId: number) => {
    try {
      await employeeService.withdrawApplication(applicationId);
      // Refresh dashboard data to update application status
      await fetchDashboardData();
    } catch (error) {
      console.error("Failed to withdraw application:", error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-5">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-12">
        <i className="pi pi-file-text mx-auto text-4xl text-gray-400 block" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Failed to load dashboard
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Please try refreshing the page.
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-800 bg-yellow-100";
      case "reviewed":
        return "text-blue-800 bg-blue-100";
      case "accepted":
        return "text-green-800 bg-green-100";
      case "rejected":
        return "text-red-800 bg-red-100";
      default:
        return "text-gray-800 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <i className="pi pi-search text-indigo-600 text-xl" />
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-sm text-gray-500">
                {user?.specialization ? `${user.specialization} • ` : ""}Ready
                to find your next opportunity?
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Profile Completion</div>
            <div className="flex items-center mt-1">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{
                    width: `${dashboardData.stats.profile.completion}%`,
                  }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {dashboardData.stats.profile.completion}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Applications"
          value={dashboardData.stats.applications.total}
          icon="pi pi-file-text"
          color="text-indigo-600"
          trend={`+${dashboardData.stats.applications.this_month} this month`}
        />
        <StatCard
          title="Pending Reviews"
          value={dashboardData.stats.applications.pending}
          icon="pi pi-clock"
          color="text-purple-600"
        />
        <StatCard
          title="Available Jobs"
          value={dashboardData.stats.jobs.available}
          icon="pi pi-search"
          color="text-indigo-600"
          trend={`+${dashboardData.stats.jobs.new_today} today`}
        />
        <StatCard
          title="Profile Views"
          value={dashboardData.stats.profile.views}
          icon="pi pi-eye"
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Applications
              </h3>
              <Link
                href="/employee/applications"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {dashboardData.recent_applications.length > 0 ? (
                dashboardData.recent_applications.map((application) => (
                  <div key={application.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {application.job_listing?.title ||
                            application.job ||
                            "Unknown Job"}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {application.job_listing?.company?.name ||
                            application.company_name ||
                            "Unknown Company"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied{" "}
                          {application.created_at
                            ? new Date(
                                application.created_at
                              ).toLocaleDateString()
                            : "Recently"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                        {application.status === "pending" && (
                          <button
                            onClick={() =>
                              handleWithdrawApplication(Number(application.id))
                            }
                            className="text-xs text-red-600 hover:text-red-800 font-medium"
                            title="Withdraw Application"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <i className="pi pi-file-text mx-auto text-2xl mb-2 block" />
                  <p className="text-sm">No recent applications</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-medium text-indigo-600">
                  {dashboardData.stats.applications.total > 0
                    ? Math.round(
                        (dashboardData.stats.applications.accepted /
                          dashboardData.stats.applications.total) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recommended for You
              </h3>
              <Link
                href="/employee/jobs"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Browse all jobs
              </Link>
            </div>
            <div className="space-y-4">
              {dashboardData.recommended_jobs.length > 0 ? (
                dashboardData.recommended_jobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 flex items-center">
                          {job.title}
                          <Star className="h-4 w-4 text-yellow-400 ml-1" />
                        </h4>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Building2 className="h-4 w-4 mr-1" />
                          <span>
                            {job.company?.name ||
                              job.company_name ||
                              "Unknown Company"}
                          </span>
                          <MapPin className="h-4 w-4 ml-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {job.created_at
                          ? new Date(job.created_at).toLocaleDateString()
                          : "Recently"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      {job.description || "Job description not available"}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.job_type || job.type || "Full-time"}
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          {job.salary_min && job.salary_max
                            ? `${job.salary_min}-${job.salary_max} ${
                                job.salary_currency || "SAR"
                              }`
                            : job.salary || "Salary not specified"}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApplyForJob(Number(job.id))}
                          disabled={applying === Number(job.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
                        >
                          {applying === Number(job.id)
                            ? "Applying..."
                            : "Quick Apply"}
                        </button>
                        <Link
                          href={`/employee/jobs/${job.id}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <i className="pi pi-star mx-auto text-3xl mb-3 block" />
                  <p className="text-sm">No recommended jobs yet</p>
                  <p className="text-xs mt-1">
                    Complete your profile to get personalized job
                    recommendations
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Latest Jobs */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Latest Job Openings
          </h3>
          <span className="text-sm text-gray-500">
            {dashboardData.stats.jobs.new_today} new today
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardData.latest_jobs.length > 0 ? (
            dashboardData.latest_jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              <i className="pi pi-search mx-auto text-3xl mb-3 block" />
              <p className="text-sm">No job openings available yet</p>
              <p className="text-xs mt-1">
                Check back later for new opportunities
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/employee/jobs"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className="pi pi-search text-green-600 text-2xl mb-2" />
            <span className="text-sm font-medium text-gray-900">Find Jobs</span>
          </Link>
          <Link
            href="/employee/profile"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className="pi pi-user-edit text-blue-600 text-2xl mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Update Profile
            </span>
          </Link>
          <Link
            href="/employee/applications"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className="pi pi-clock text-yellow-600 text-2xl mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Track Applications
            </span>
          </Link>
          <Link
            href="/employee/stats"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className="pi pi-chart-line text-purple-600 text-2xl mb-2" />
            <span className="text-sm font-medium text-gray-900">
              View Stats
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
