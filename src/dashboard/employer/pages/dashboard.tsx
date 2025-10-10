"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { employerService } from "@/shared/services/employer.service";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Users,
  TrendingUp,
  PlusCircle,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  AlertCircle,
  Building2,
} from "lucide-react";

interface EmployerDashboardData {
  stats: {
    jobs: {
      total: number;
      active: number;
      draft: number;
      closed: number;
      this_month: number;
    };
    applications: {
      total: number;
      pending: number;
      reviewed: number;
      accepted: number;
      new_today: number;
    };
    company: {
      profile_completion: number;
      is_verified: boolean;
      total_views: number;
      employee_count: number;
    };
  };
  recent_applications: any[];
  active_jobs: any[];
  top_jobs: any[];
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  action,
}: {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: string;
  action?: { label: string; href: string };
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
          {action && (
            <div className="mt-2">
              <Link
                href={action.href}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                {action.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const JobCard = ({ job }: { job: any }) => (
  <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          job.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {job.status}
      </span>
    </div>
    <div className="text-sm text-gray-600 mb-3">
      <div className="flex items-center justify-between">
        <span>{job.applications_count || 0} applications</span>
        <span>Posted {job.created_at}</span>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Eye className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-600">{job.views || 0} views</span>
      </div>
      <Link
        href={`/employer/jobs/${job.id}`}
        className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md transition-colors"
      >
        Manage
      </Link>
    </div>
  </div>
);

export default function EmployerDashboardContent() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] =
    useState<EmployerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Try to fetch real data from backend API
      // const response = await employerService.getDashboardData();
      // setDashboardData(response.data);

      // Fallback to mock data if API fails
      const mockData: EmployerDashboardData = {
        stats: {
          jobs: {
            total: 12,
            active: 8,
            draft: 3,
            closed: 1,
            this_month: 4,
          },
          applications: {
            total: 156,
            pending: 23,
            reviewed: 89,
            accepted: 44,
            new_today: 7,
          },
          company: {
            profile_completion: 92,
            is_verified: true,
            total_views: 1234,
            employee_count: 150,
          },
        },
        recent_applications: [
          {
            id: 1,
            candidate: "Sarah Johnson",
            job: "Frontend Developer",
            status: "pending",
            applied_date: "2 hours ago",
            specialization: "React Developer",
          },
          {
            id: 2,
            candidate: "Ahmed Ali",
            job: "Backend Developer",
            status: "reviewed",
            applied_date: "1 day ago",
            specialization: "Node.js Developer",
          },
        ],
        active_jobs: [
          {
            id: 1,
            title: "Senior Frontend Developer",
            status: "active",
            applications_count: 24,
            views: 156,
            created_at: "1 week ago",
          },
          {
            id: 2,
            title: "UI/UX Designer",
            status: "active",
            applications_count: 18,
            views: 98,
            created_at: "3 days ago",
          },
        ],
        top_jobs: [
          {
            id: 3,
            title: "Full Stack Developer",
            applications_count: 45,
            status: "active",
            created_at: "2 weeks ago",
          },
        ],
      };

      setDashboardData(mockData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setLoading(false);
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
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Failed to load dashboard
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Please try refreshing the page.
        </p>
      </div>
    );
  }

  const handleApplicationAction = async (
    applicationId: number,
    action: "accepted" | "rejected"
  ) => {
    try {
      await employerService.updateApplicationStatus(applicationId, action);
      // Refresh dashboard data
      fetchDashboardData();
    } catch (error) {
      console.error(`Failed to ${action} application:`, error);
    }
  };

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
                <Building2 className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-sm text-gray-500">
                Recruiter • Ready to find your next great hire?
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              {dashboardData.stats.company.is_verified && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Jobs"
          value={dashboardData.stats.jobs.active}
          icon={Briefcase}
          color="text-indigo-600"
          trend={`+${dashboardData.stats.jobs.this_month} this month`}
          action={{ label: "Manage Jobs", href: "/employer/jobs" }}
        />
        <StatCard
          title="New Applications"
          value={dashboardData.stats.applications.new_today}
          icon={FileText}
          color="text-purple-600"
          trend="Today"
          action={{ label: "Review All", href: "/employer/applications" }}
        />
        <StatCard
          title="Pending Reviews"
          value={dashboardData.stats.applications.pending}
          icon={Clock}
          color="text-indigo-600"
          action={{
            label: "Review Now",
            href: "/employer/applications?status=pending",
          }}
        />
        <StatCard
          title="Total Applications"
          value={dashboardData.stats.applications.total}
          icon={Users}
          color="text-purple-600"
          trend={`${Math.round(
            (dashboardData.stats.applications.accepted /
              dashboardData.stats.applications.total) *
              100
          )}% hired`}
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
                href="/employer/applications"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {dashboardData.recent_applications.map((application) => (
                <div key={application.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {application.candidate}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {application.job} • {application.specialization}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Applied {application.applied_date}
                    </p>
                    {application.status === "pending" && (
                      <div className="flex space-x-1">
                        <button
                          onClick={() =>
                            handleApplicationAction(application.id, "accepted")
                          }
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleApplicationAction(application.id, "rejected")
                          }
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 transition-colors"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-medium text-indigo-600">
                  {Math.round(
                    (dashboardData.stats.applications.reviewed /
                      dashboardData.stats.applications.total) *
                      100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Jobs */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Active Job Postings
              </h3>
              <Link
                href="/employer/jobs"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Manage all jobs
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.active_jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Pipeline */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Hiring Pipeline
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Pending Review</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  {dashboardData.stats.applications.pending}
                </span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${
                        (dashboardData.stats.applications.pending /
                          dashboardData.stats.applications.total) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Under Review</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  {dashboardData.stats.applications.reviewed}
                </span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full"
                    style={{
                      width: `${
                        (dashboardData.stats.applications.reviewed /
                          dashboardData.stats.applications.total) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Accepted</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  {dashboardData.stats.applications.accepted}
                </span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{
                      width: `${
                        (dashboardData.stats.applications.accepted /
                          dashboardData.stats.applications.total) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Profile Status */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Company Profile
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-medium text-gray-900">
                  {dashboardData.stats.company.profile_completion}%
                </span>
              </div>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{
                    width: `${dashboardData.stats.company.profile_completion}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-t">
              <span className="text-sm text-gray-600">Verification Status</span>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  Verified
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Profile Views</span>
              <span className="text-sm font-medium text-gray-900">
                {dashboardData.stats.company.total_views}
              </span>
            </div>

            <div className="pt-4">
              <Link
                href="/employer/company"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Update Company Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/employer/jobs/create"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <PlusCircle className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Post New Job
            </span>
          </Link>
          <Link
            href="/employer/applications"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Review Applications
            </span>
          </Link>
          <Link
            href="/employer/candidates"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Browse Candidates
            </span>
          </Link>
          <Link
            href="/employer/analytics"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              View Analytics
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
