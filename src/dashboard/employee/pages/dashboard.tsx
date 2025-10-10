"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { employeeService } from "@/shared/services/employee.service";
import Link from "next/link";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Eye,
  Star,
  MapPin,
  Calendar,
  Building2,
} from "lucide-react";

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
  recent_applications: any[];
  recommended_jobs: any[];
  latest_jobs: any[];
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
  icon: Icon,
  color,
  trend,
}: {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: string;
}) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${color}`} />
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

const JobCard = ({ job }: { job: any }) => (
  <div className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
      <span className="text-sm text-gray-500">{job.posted_date}</span>
    </div>
    <div className="flex items-center text-sm text-gray-600 mb-2">
      <Building2 className="h-4 w-4 mr-1" />
      <span>{job.company}</span>
      <MapPin className="h-4 w-4 ml-4 mr-1" />
      <span>{job.location}</span>
    </div>
    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {job.type}
        </span>
        <span className="text-sm text-green-600 font-medium">
          ${job.salary}
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
    } catch (error) {
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
    } catch (error) {
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
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
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
                <Search className="h-6 w-6 text-indigo-600" />
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
          icon={FileText}
          color="text-indigo-600"
          trend={`+${dashboardData.stats.applications.this_month} this month`}
        />
        <StatCard
          title="Pending Reviews"
          value={dashboardData.stats.applications.pending}
          icon={Clock}
          color="text-purple-600"
        />
        <StatCard
          title="Available Jobs"
          value={dashboardData.stats.jobs.available}
          icon={Search}
          color="text-indigo-600"
          trend={`+${dashboardData.stats.jobs.new_today} today`}
        />
        <StatCard
          title="Profile Views"
          value={dashboardData.stats.profile.views}
          icon={Eye}
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
                          {application.job}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {application.company}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied {application.applied_date}
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
                              handleWithdrawApplication(application.id)
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
                  <FileText className="mx-auto h-8 w-8 mb-2" />
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
                          <span>{job.company}</span>
                          <MapPin className="h-4 w-4 ml-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {job.posted_date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      {job.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.type}
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          {job.salary}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApplyForJob(job.id)}
                          disabled={applying === job.id}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
                        >
                          {applying === job.id ? "Applying..." : "Quick Apply"}
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
                  <Star className="mx-auto h-10 w-10 mb-3" />
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
              <Search className="mx-auto h-10 w-10 mb-3" />
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
            <Search className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Find Jobs</span>
          </Link>
          <Link
            href="/employee/profile"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Update Profile
            </span>
          </Link>
          <Link
            href="/employee/applications"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Clock className="h-8 w-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Track Applications
            </span>
          </Link>
          <Link
            href="/employee/stats"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              View Stats
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
