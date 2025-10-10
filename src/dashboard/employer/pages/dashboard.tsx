"use client";

import React, { useEffect, useState } from "react";
import { useAuth, useI18n } from "@/shared/contexts";
import { employerService } from "@/shared/services/employer.service";
import Link from "next/link";
// Using PrimeIcons instead of Lucide React icons

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
  recent_applications: Array<{
    id: string;
    candidate_name: string;
    job_title: string;
    applied_date: string;
    status: string;
  }>;
  active_jobs: Array<{
    id: string;
    title: string;
    status: string;
    applications_count: number;
    views: number;
    created_at: string;
  }>;
  top_jobs: Array<{
    id: string;
    title: string;
    applications: number;
    views: number;
  }>;
}

const StatCard = ({
  title,
  value,
  icon,
  color,
  trend,
  action,
  language,
}: {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  trend?: string;
  action?: { label: string; href: string };
  language: string;
}) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div
        className={`flex items-start ${
          language === "ar" ? "flex-row-reverse" : ""
        }`}
      >
        <div className={`flex-shrink-0 ${language === "ar" ? "ml-4" : "mr-4"}`}>
          <i className={`${icon} ${color} text-2xl`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <dl>
            <dt
              className={`text-sm font-medium text-gray-500 truncate ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {title}
            </dt>
            <dd className="mt-1">
              <div
                className={`flex items-baseline ${
                  language === "ar"
                    ? "flex-row-reverse justify-end"
                    : "justify-start"
                }`}
              >
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                {trend && (
                  <div
                    className={`${
                      language === "ar" ? "mr-2" : "ml-2"
                    } text-sm font-semibold text-green-600`}
                  >
                    {trend}
                  </div>
                )}
              </div>
            </dd>
          </dl>
          {action && (
            <div className="mt-3">
              <Link
                href={action.href}
                className={`text-sm text-blue-600 hover:text-blue-500 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
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

const JobCard = ({
  job,
}: {
  job: {
    id: string;
    title: string;
    status: string;
    applications_count: number;
    views: number;
    created_at: string;
  };
}) => {
  const { t, language } = useI18n();
  return (
    <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
      <div
        className={`flex justify-between items-start mb-2 ${
          language === "ar" ? "flex-row-reverse" : ""
        }`}
      >
        <h4
          className={`text-lg font-medium text-gray-900 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {job.title}
        </h4>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            job.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {job.status === "active" ? t("dashboard.activeJobs") : job.status}
        </span>
      </div>
      <div className="text-sm text-gray-600 mb-3">
        <div
          className={`flex items-center justify-between ${
            language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <span className={language === "ar" ? "text-right" : "text-left"}>
            {job.applications_count || 0} {t("dashboard.applications")}
          </span>
          <span className={language === "ar" ? "text-right" : "text-left"}>
            {t("dashboard.posted")} {job.created_at}
          </span>
        </div>
      </div>
      <div
        className={`flex justify-between items-center ${
          language === "ar" ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex items-center ${
            language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"
          }`}
        >
          <i className="pi pi-eye text-gray-400 text-sm"></i>
          <span
            className={`text-sm text-gray-600 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {job.views || 0} {t("dashboard.views")}
          </span>
        </div>
        <Link
          href={`/employer/jobs/${job.id}`}
          className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md transition-colors"
        >
          {t("dashboard.manage")}
        </Link>
      </div>
    </div>
  );
};

export default function EmployerDashboardContent() {
  const { user } = useAuth();
  const { language, t } = useI18n();
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
            id: "1",
            candidate_name: "Sarah Johnson",
            job_title: "Frontend Developer",
            status: "pending",
            applied_date: "2 hours ago",
          },
          {
            id: "2",
            candidate_name: "Ahmed Ali",
            job_title: "Backend Developer",
            status: "reviewed",
            applied_date: "1 day ago",
          },
        ],
        active_jobs: [
          {
            id: "1",
            title: "Senior Frontend Developer",
            status: "active",
            applications_count: 24,
            views: 156,
            created_at: "1 week ago",
          },
          {
            id: "2",
            title: "UI/UX Designer",
            status: "active",
            applications_count: 18,
            views: 98,
            created_at: "3 days ago",
          },
        ],
        top_jobs: [
          {
            id: "3",
            title: "Full Stack Developer",
            applications: 45,
            views: 234,
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
        <i className="pi pi-exclamation-triangle mx-auto text-4xl text-gray-400"></i>
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
    applicationId: string,
    action: "accepted" | "rejected"
  ) => {
    try {
      await employerService.updateApplicationStatus(
        applicationId,
        action as "pending" | "reviewed" | "accepted" | "rejected"
      );
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
        <div
          className={`flex items-center justify-between ${
            language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`flex items-center ${
              language === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <i className="pi pi-building text-indigo-600 text-xl"></i>
              </div>
            </div>
            <div className={language === "ar" ? "mr-4" : "ml-4"}>
              <h1
                className={`text-2xl font-bold text-gray-900 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("dashboard.welcomeBack")}, {user?.name}!
              </h1>
              <p
                className={`text-sm text-gray-500 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("dashboard.recruiter")} • {t("dashboard.readyToHire")}
              </p>
            </div>
          </div>
          <div className={language === "ar" ? "text-left" : "text-right"}>
            <div
              className={`flex items-center ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              {dashboardData.stats.company.is_verified && (
                <div
                  className={`flex items-center text-green-600 ${
                    language === "ar" ? "flex-row-reverse" : ""
                  }`}
                >
                  <i
                    className={`pi pi-check-circle h-5 w-5 ${
                      language === "ar" ? "ml-1" : "mr-1"
                    }`}
                  ></i>
                  <span className="text-sm font-medium">
                    {t("dashboard.verified")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t("dashboard.activeJobs")}
          value={dashboardData.stats.jobs.active}
          icon="pi pi-briefcase"
          color="text-indigo-600"
          trend={`+${dashboardData.stats.jobs.this_month} ${t(
            "dashboard.thisMonth"
          )}`}
          action={{ label: t("dashboard.manageJobs"), href: "/employer/jobs" }}
          language={language}
        />
        <StatCard
          title={t("dashboard.newApplications")}
          value={dashboardData.stats.applications.new_today}
          icon="pi pi-file-edit"
          color="text-purple-600"
          trend={t("dashboard.today")}
          action={{
            label: t("dashboard.reviewAll"),
            href: "/employer/applications",
          }}
          language={language}
        />
        <StatCard
          title={t("dashboard.pendingApplications")}
          value={dashboardData.stats.applications.pending}
          icon="pi pi-clock"
          color="text-indigo-600"
          action={{
            label: t("dashboard.reviewNow"),
            href: "/employer/applications?status=pending",
          }}
          language={language}
        />
        <StatCard
          title={t("dashboard.totalApplications")}
          value={dashboardData.stats.applications.total}
          icon="pi pi-users"
          color="text-purple-600"
          trend={`${Math.round(
            (dashboardData.stats.applications.accepted /
              dashboardData.stats.applications.total) *
              100
          )}% ${t("dashboard.hired")}`}
          language={language}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div
              className={`flex items-center justify-between mb-4 ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <h3
                className={`text-lg leading-6 font-medium text-gray-900 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("dashboard.recentApplications")}
              </h3>
              <Link
                href="/employer/applications"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                {t("dashboard.viewAll")}
              </Link>
            </div>
            <div className="space-y-3">
              {dashboardData.recent_applications.map((application) => (
                <div key={application.id} className="border rounded-lg p-3">
                  <div
                    className={`flex justify-between items-start mb-2 ${
                      language === "ar" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-sm font-medium text-gray-900 ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {application.candidate_name}
                      </h4>
                      <p
                        className={`text-xs text-gray-600 ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {application.job_title}
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
                  <div
                    className={`flex justify-between items-center ${
                      language === "ar" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <p
                      className={`text-xs text-gray-500 ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("dashboard.applied")} {application.applied_date}
                    </p>
                    {application.status === "pending" && (
                      <div
                        className={`flex ${
                          language === "ar"
                            ? "space-x-reverse space-x-1"
                            : "space-x-1"
                        }`}
                      >
                        <button
                          onClick={() =>
                            handleApplicationAction(application.id, "accepted")
                          }
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                        >
                          <i
                            className={`pi pi-check-circle text-xs ${
                              language === "ar" ? "ml-1" : "mr-1"
                            }`}
                          ></i>
                          {t("dashboard.accept")}
                        </button>
                        <button
                          onClick={() =>
                            handleApplicationAction(application.id, "rejected")
                          }
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 transition-colors"
                        >
                          <i
                            className={`pi pi-times-circle text-xs ${
                              language === "ar" ? "ml-1" : "mr-1"
                            }`}
                          ></i>
                          {t("dashboard.reject")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div
                className={`flex justify-between text-sm ${
                  language === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <span
                  className={`text-gray-600 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("dashboard.responseRate")}
                </span>
                <span
                  className={`font-medium text-indigo-600 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
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
            <div
              className={`flex items-center justify-between mb-4 ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <h3
                className={`text-lg leading-6 font-medium text-gray-900 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("dashboard.activeJobsList")}
              </h3>
              <Link
                href="/employer/jobs"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                {t("dashboard.manageJobs")}
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
          <h3
            className={`text-lg leading-6 font-medium text-gray-900 mb-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("dashboard.hiringPipeline")}
          </h3>
          <div className="space-y-4">
            <div
              className={`flex justify-between items-center ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex items-center ${
                  language === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-4 h-4 bg-yellow-400 rounded-full ${
                    language === "ar" ? "ml-3" : "mr-3"
                  }`}
                ></div>
                <span
                  className={`text-sm text-gray-600 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("dashboard.pendingReview")}
                </span>
              </div>
              <div
                className={`flex items-center ${
                  language === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <span
                  className={`text-sm font-medium text-gray-900 ${
                    language === "ar" ? "ml-2" : "mr-2"
                  }`}
                >
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

            <div
              className={`flex justify-between items-center ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex items-center ${
                  language === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-4 h-4 bg-blue-400 rounded-full ${
                    language === "ar" ? "ml-3" : "mr-3"
                  }`}
                ></div>
                <span
                  className={`text-sm text-gray-600 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("dashboard.underReview")}
                </span>
              </div>
              <div
                className={`flex items-center ${
                  language === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <span
                  className={`text-sm font-medium text-gray-900 ${
                    language === "ar" ? "ml-2" : "mr-2"
                  }`}
                >
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

            <div
              className={`flex justify-between items-center ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex items-center ${
                  language === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-4 h-4 bg-green-400 rounded-full ${
                    language === "ar" ? "ml-3" : "mr-3"
                  }`}
                ></div>
                <span
                  className={`text-sm text-gray-600 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("dashboard.accepted")}
                </span>
              </div>
              <div
                className={`flex items-center ${
                  language === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <span
                  className={`text-sm font-medium text-gray-900 ${
                    language === "ar" ? "ml-2" : "mr-2"
                  }`}
                >
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
          <h3
            className={`text-lg leading-6 font-medium text-gray-900 mb-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("dashboard.companyProfile")}
          </h3>
          <div className="space-y-4">
            <div>
              <div
                className={`flex justify-between text-sm mb-1 ${
                  language === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <span
                  className={`text-gray-600 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("dashboard.profileCompletion")}
                </span>
                <span
                  className={`font-medium text-gray-900 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
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

            <div
              className={`flex justify-between items-center py-2 border-t ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <span
                className={`text-sm text-gray-600 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("dashboard.verificationStatus")}
              </span>
              <div
                className={`flex items-center ${
                  language === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <i
                  className={`pi pi-check-circle text-green-500 ${
                    language === "ar" ? "ml-1" : "mr-1"
                  }`}
                ></i>
                <span
                  className={`text-sm font-medium text-green-600 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("dashboard.verified")}
                </span>
              </div>
            </div>

            <div
              className={`flex justify-between items-center py-2 ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <span
                className={`text-sm text-gray-600 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("dashboard.profileViews")}
              </span>
              <span
                className={`text-sm font-medium text-gray-900 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {dashboardData.stats.company.total_views}
              </span>
            </div>

            <div className="pt-4">
              <Link
                href="/employer/company"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {t("dashboard.updateCompanyProfile")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3
          className={`text-lg leading-6 font-medium text-gray-900 mb-4 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t("dashboard.quickActions")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/employer/jobs/create"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className="pi pi-plus-circle text-blue-600 text-2xl mb-2"></i>
            <span
              className={`text-sm font-medium text-gray-900 ${
                language === "ar" ? "text-center" : "text-center"
              }`}
            >
              {t("dashboard.postNewJob")}
            </span>
          </Link>
          <Link
            href="/employer/applications"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className="pi pi-file-edit text-green-600 text-2xl mb-2"></i>
            <span
              className={`text-sm font-medium text-gray-900 ${
                language === "ar" ? "text-center" : "text-center"
              }`}
            >
              {t("dashboard.reviewApplications")}
            </span>
          </Link>
          <Link
            href="/employer/candidates"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className="pi pi-users text-purple-600 text-2xl mb-2"></i>
            <span
              className={`text-sm font-medium text-gray-900 ${
                language === "ar" ? "text-center" : "text-center"
              }`}
            >
              {t("dashboard.browseCandidates")}
            </span>
          </Link>
          <Link
            href="/employer/analytics"
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className="pi pi-chart-line text-yellow-600 text-2xl mb-2"></i>
            <span
              className={`text-sm font-medium text-gray-900 ${
                language === "ar" ? "text-center" : "text-center"
              }`}
            >
              {t("dashboard.viewAnalytics")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
