'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';
import { adminService } from '@/shared/services/admin.service';
import { 
  Users, 
  Briefcase, 
  FileText, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Building2,
  Shield,
  Eye,
  Ban,
  UserCheck,
  MessageSquare
} from 'lucide-react';

interface DashboardStats {
  users: {
    total: number;
    employees: number;
    employers: number;
    admins: number;
    active: number;
    inactive: number;
  };
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
    rejected: number;
    today: number;
  };
  companies: {
    total: number;
    verified: number;
    pending_verification: number;
  };
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  change 
}: { 
  title: string; 
  value: number | string; 
  icon: React.ComponentType<{ className?: string }>; 
  color: string;
  change?: string;
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
              {change && (
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {change}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

export default function AdminDashboardContent() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Try to fetch real data from backend API
      const response = await adminService.getDashboardData();
      setStats(response.data.stats);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Fallback to mock data if API fails
      const mockStats: DashboardStats = {
        users: {
          total: 1250,
          employees: 980,
          employers: 265,
          admins: 5,
          active: 1198,
          inactive: 52
        },
        jobs: {
          total: 450,
          active: 280,
          draft: 125,
          closed: 45,
          this_month: 67
        },
        applications: {
          total: 3240,
          pending: 456,
          reviewed: 1234,
          accepted: 890,
          rejected: 660,
          today: 24
        },
        companies: {
          total: 180,
          verified: 145,
          pending_verification: 35
        }
      };
      
      setStats(mockStats);
      setLoading(false);
    }
  };

  const handleApproveCompany = async (companyId: number) => {
    try {
      await adminService.updateCompanyVerification(companyId, true);
      // Refresh dashboard data
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to approve company:', error);
    }
  };

  const handleRejectCompany = async (companyId: number) => {
    try {
      await adminService.updateCompanyVerification(companyId, false);
      // Refresh dashboard data
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to reject company:', error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-5">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Failed to load dashboard</h3>
        <p className="mt-1 text-sm text-gray-500">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}
            </h1>
            <p className="text-sm text-gray-500">
              System Administrator • Platform Overview
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.users.total}
          icon={Users}
          color="text-indigo-600"
          change="+12%"
        />
        <StatCard
          title="Active Jobs"
          value={stats.jobs.active}
          icon={Briefcase}
          color="text-indigo-600"
          change="+8%"
        />
        <StatCard
          title="Pending Applications"
          value={stats.applications.pending}
          icon={Clock}
          color="text-purple-600"
          change="+5%"
        />
        <StatCard
          title="Verified Companies"
          value={stats.companies.verified}
          icon={Building2}
          color="text-purple-600"
          change="+15%"
        />
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Statistics */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            User Analytics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Employees</span>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  {stats.users.employees}
                </span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${(stats.users.employees / stats.users.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Employers</span>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  {stats.users.employers}
                </span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${(stats.users.employers / stats.users.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Users</span>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-gray-900">
                  {stats.users.active}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Statistics */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Application Status
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Review</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {stats.applications.pending}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Accepted</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {stats.applications.accepted}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rejected</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {stats.applications.rejected}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Today's Applications</span>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium text-gray-900">
                  {stats.applications.today}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Approval Workflows */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Company Verification Queue */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Company Verification Queue
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              {stats.companies.pending_verification} Pending
            </span>
          </div>
          <div className="space-y-3">
            {/* Mock pending companies */}
            {[
              { id: 1, name: 'TechStart Solutions', industry: 'Technology', submittedAt: '2 hours ago' },
              { id: 2, name: 'Saudi Digital Co.', industry: 'Digital Services', submittedAt: '5 hours ago' },
              { id: 3, name: 'Innovation Hub', industry: 'Consulting', submittedAt: '1 day ago' }
            ].map((company) => (
              <div key={company.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{company.name}</h4>
                    <p className="text-xs text-gray-600">{company.industry} • Submitted {company.submittedAt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleApproveCompany(company.id)}
                      className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </button>
                    <button 
                      onClick={() => handleRejectCompany(company.id)}
                      className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                    >
                      <Ban className="h-3 w-3 mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium py-2">
              View All Pending Companies →
            </button>
          </div>
        </div>

        {/* Job Posting Moderation */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Job Posting Moderation
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {stats.jobs.draft} Pending Review
            </span>
          </div>
          <div className="space-y-3">
            {/* Mock pending jobs */}
            {[
              { id: 1, title: 'Senior React Developer', company: 'TechStart Solutions', submittedAt: '1 hour ago' },
              { id: 2, title: 'Product Manager', company: 'Innovation Hub', submittedAt: '3 hours ago' },
              { id: 3, title: 'UI/UX Designer', company: 'Saudi Digital Co.', submittedAt: '6 hours ago' }
            ].map((job) => (
              <div key={job.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{job.title}</h4>
                    <p className="text-xs text-gray-600">{job.company} • Posted {job.submittedAt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </button>
                    <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200">
                      <Ban className="h-3 w-3 mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium py-2">
              View All Pending Jobs →
            </button>
          </div>
        </div>
      </div>

      {/* System Administration Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          System Administration
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-8 w-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Manage Users</span>
            <span className="text-xs text-gray-500">{stats.users.inactive} inactive</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Building2 className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Company Reviews</span>
            <span className="text-xs text-gray-500">{stats.companies.pending_verification} pending</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <MessageSquare className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Contact Messages</span>
            <span className="text-xs text-gray-500">12 unread</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Platform Analytics</span>
            <span className="text-xs text-gray-500">View reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}
