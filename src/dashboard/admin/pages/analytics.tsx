'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Briefcase, Building2, Eye, Calendar, Filter } from 'lucide-react';
import { adminService } from '@/shared/services/admin.service';

interface AnalyticsData {
  overview: {
    total_users: number;
    total_jobs: number;
    total_companies: number;
    total_applications: number;
    active_jobs: number;
    verified_companies: number;
    monthly_growth: {
      users: number;
      jobs: number;
      applications: number;
    };
  };
  user_stats: {
    total_employers: number;
    total_employees: number;
    new_registrations_this_month: number;
    active_users_last_30_days: number;
  };
  job_stats: {
    jobs_posted_this_month: number;
    average_applications_per_job: number;
    most_popular_categories: Array<{
      category: string;
      count: number;
    }>;
    job_types_distribution: Array<{
      type: string;
      count: number;
    }>;
  };
  application_stats: {
    total_applications_this_month: number;
    acceptance_rate: number;
    avg_time_to_hire: number;
    top_companies_by_applications: Array<{
      company_name: string;
      applications_count: number;
    }>;
  };
  monthly_trends: Array<{
    month: string;
    users: number;
    jobs: number;
    applications: number;
  }>;
}

export default function AdminAnalyticsContent() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('30');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    try {
      const response = await adminService.getAnalytics();
      setAnalytics(response.data || null);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data available</h3>
        <p className="text-gray-500">Analytics data will appear here once there is sufficient platform activity.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mr-4">
            <BarChart3 className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
            <p className="text-sm text-gray-500">Monitor platform performance and user engagement</p>
          </div>
        </div>

        {/* Period Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {analytics.overview.total_users.toLocaleString()}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{analytics.overview.monthly_growth.users}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Jobs</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {analytics.overview.total_jobs.toLocaleString()}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{analytics.overview.monthly_growth.jobs}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Companies</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {analytics.overview.total_companies.toLocaleString()}
                    </div>
                    <div className="ml-2 text-sm text-gray-600">
                      ({analytics.overview.verified_companies} verified)
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Applications</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {analytics.overview.total_applications.toLocaleString()}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{analytics.overview.monthly_growth.applications}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">User Statistics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Employers</span>
              <span className="font-semibold">{analytics.user_stats.total_employers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Employees</span>
              <span className="font-semibold">{analytics.user_stats.total_employees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Registrations (This Month)</span>
              <span className="font-semibold text-green-600">+{analytics.user_stats.new_registrations_this_month}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Users (Last 30 Days)</span>
              <span className="font-semibold">{analytics.user_stats.active_users_last_30_days.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Briefcase className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Job Statistics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Jobs Posted (This Month)</span>
              <span className="font-semibold text-green-600">+{analytics.job_stats.jobs_posted_this_month}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Applications per Job</span>
              <span className="font-semibold">{analytics.job_stats.average_applications_per_job.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Jobs</span>
              <span className="font-semibold">{analytics.overview.active_jobs.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Categories and Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Categories</h3>
          <div className="space-y-3">
            {analytics.job_stats.most_popular_categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600 capitalize">{category.category}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${(category.count / Math.max(...analytics.job_stats.most_popular_categories.map(c => c.count))) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-sm w-8">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Types Distribution</h3>
          <div className="space-y-3">
            {analytics.job_stats.job_types_distribution.map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600 capitalize">{type.type.replace('-', ' ')}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(type.count / Math.max(...analytics.job_stats.job_types_distribution.map(t => t.count))) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-sm w-8">{type.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Statistics */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Eye className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Application Analytics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {analytics.application_stats.total_applications_this_month}
            </div>
            <div className="text-sm text-gray-600">Applications This Month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {(analytics.application_stats.acceptance_rate * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Acceptance Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {analytics.application_stats.avg_time_to_hire}
            </div>
            <div className="text-sm text-gray-600">Avg Days to Hire</div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-900 mb-3">Top Companies by Applications</h4>
          <div className="space-y-2">
            {analytics.application_stats.top_companies_by_applications.map((company, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                <span className="font-medium">{company.company_name}</span>
                <span className="text-sm text-gray-600">{company.applications_count} applications</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jobs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.monthly_trends.map((trend, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {trend.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trend.users.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trend.jobs.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trend.applications.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
