"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { employeeService } from "@/shared/services/employee.service";
import {
  BarChart3,
  TrendingUp,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Calendar,
  Award,
  Target,
  Activity,
  Briefcase,
  Users,
} from "lucide-react";

interface EmployeeStats {
  applications: {
    total: number;
    pending: number;
    reviewed: number;
    accepted: number;
    rejected: number;
    success_rate: number;
    monthly_stats: Array<{
      month: string;
      applications: number;
      responses: number;
    }>;
  };
  profile: {
    views: number;
    completeness: number;
    last_updated: string;
    skills_count: number;
    experience_years: number;
  };
  jobs: {
    saved: number;
    applied: number;
    matching_skills: number;
    by_industry: Array<{
      industry: string;
      count: number;
    }>;
  };
  performance: {
    response_time_avg: number;
    interview_rate: number;
    application_to_interview_ratio: number;
    most_successful_day: string;
  };
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  subtitle,
}: {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: string;
  subtitle?: string;
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
            {subtitle && (
              <dt className="text-xs text-gray-400 mt-1">{subtitle}</dt>
            )}
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const ProgressBar = ({
  label,
  value,
  max,
  color = "bg-indigo-600",
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
}) => {
  const percentage = (value / max) * 100;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
        <span>{label}</span>
        <span>
          {value}/{max}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function EmployeeStatsContent() {
  const { user } = useAuth();
  const [stats, setStats] = useState<EmployeeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getApplicationStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
      // Set fallback data when API is not available
      const fallbackData: EmployeeStats = {
        applications: {
          total: 0,
          pending: 0,
          reviewed: 0,
          accepted: 0,
          rejected: 0,
          success_rate: 0,
          monthly_stats: [],
        },
        profile: {
          views: 0,
          completeness: 75,
          last_updated: new Date().toISOString(),
          skills_count: 0,
          experience_years: 0,
        },
        jobs: {
          saved: 0,
          applied: 0,
          matching_skills: 0,
          by_industry: [],
        },
        performance: {
          response_time_avg: 0,
          interview_rate: 0,
          application_to_interview_ratio: 0,
          most_successful_day: "Monday",
        },
      };
      setStats(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-5">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No statistics available
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Start applying for jobs to see your career statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-4">
            <BarChart3 className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Career Statistics
            </h1>
            <p className="text-sm text-gray-500">
              Track your job search progress and performance
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {(["week", "month", "quarter", "year"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                timeRange === range
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Applications"
          value={stats?.applications?.total || 0}
          icon={FileText}
          color="text-indigo-600"
          subtitle={`${stats?.applications?.pending || 0} pending responses`}
        />
        <StatCard
          title="Success Rate"
          value={`${stats?.applications?.success_rate || 0}%`}
          icon={Target}
          color="text-green-600"
          trend={(stats?.applications?.success_rate || 0) > 15 ? "+2%" : ""}
          subtitle="Applications to interviews"
        />
        <StatCard
          title="Profile Views"
          value={stats?.profile?.views || 0}
          icon={Eye}
          color="text-purple-600"
          subtitle="This month"
        />
        <StatCard
          title="Jobs Saved"
          value={stats?.jobs?.saved || 0}
          icon={Briefcase}
          color="text-blue-600"
          subtitle="Ready to apply"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Status Breakdown */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Application Status
          </h3>
          <div className="space-y-4">
            <ProgressBar
              label="Pending Review"
              value={stats?.applications?.pending || 0}
              max={stats?.applications?.total || 1}
              color="bg-yellow-500"
            />
            <ProgressBar
              label="Under Review"
              value={stats?.applications?.reviewed || 0}
              max={stats?.applications?.total || 1}
              color="bg-blue-500"
            />
            <ProgressBar
              label="Accepted/Interviewed"
              value={stats?.applications?.accepted || 0}
              max={stats?.applications?.total || 1}
              color="bg-green-500"
            />
            <ProgressBar
              label="Rejected"
              value={stats?.applications?.rejected || 0}
              max={stats?.applications?.total || 1}
              color="bg-red-500"
            />
          </div>
        </div>

        {/* Profile Metrics */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Profile Insights
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-900 mb-2">
                <span>Profile Completeness</span>
                <span>{stats?.profile?.completeness || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${stats?.profile?.completeness || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {stats?.profile?.skills_count || 0}
                </div>
                <div className="text-sm text-gray-500">Skills Listed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {stats?.profile?.experience_years || 0}
                </div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-500">
                Last updated:{" "}
                {stats?.profile?.last_updated
                  ? new Date(stats.profile.last_updated).toLocaleDateString()
                  : "Never"}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Performance Insights
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Avg Response Time</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {stats?.performance?.response_time_avg || 0} days
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Interview Rate</span>
              </div>
              <span className="text-sm font-medium text-green-600">
                {stats?.performance?.interview_rate || 0}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  Best Application Day
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {stats?.performance?.most_successful_day || "Monday"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Application Ratio</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                1:{stats?.performance?.application_to_interview_ratio || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Breakdown */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Applications by Industry
        </h3>
        {stats?.jobs?.by_industry && stats.jobs.by_industry.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.jobs.by_industry.map((industry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <span className="text-sm font-medium text-gray-900">
                  {industry.industry}
                </span>
                <span className="text-sm text-gray-500">
                  {industry.count} applications
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Users className="mx-auto h-8 w-8 mb-2" />
            <p className="text-sm">No industry data available yet</p>
            <p className="text-xs mt-1">
              Apply to more jobs to see industry breakdown
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Improve Your Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="h-8 w-8 text-blue-600 mb-2 mx-auto" />
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              Complete Profile
            </h4>
            <p className="text-xs text-gray-500">
              Add more skills and experience
            </p>
          </div>
          <div className="text-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <Activity className="h-8 w-8 text-green-600 mb-2 mx-auto" />
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              Apply More
            </h4>
            <p className="text-xs text-gray-500">
              Increase your application rate
            </p>
          </div>
          <div className="text-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2 mx-auto" />
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              Follow Up
            </h4>
            <p className="text-xs text-gray-500">
              Contact recruiters proactively
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
