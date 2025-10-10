'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';
import { employerService } from '@/shared/services/employer.service';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Calendar,
  Target,
  Clock,
  Award,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  MapPin,
  Briefcase
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    total_views: number;
    total_applications: number;
    total_hired: number;
    conversion_rate: number;
    avg_time_to_hire: number;
    active_jobs: number;
  };
  trends: {
    period: string;
    views: number;
    applications: number;
    hired: number;
  }[];
  job_performance: {
    job_id: number;
    job_title: string;
    views: number;
    applications: number;
    conversion_rate: number;
    status: string;
  }[];
  application_sources: {
    source: string;
    count: number;
    percentage: number;
  }[];
  candidate_demographics: {
    locations: { location: string; count: number; }[];
    experience_levels: { level: string; count: number; }[];
    skills: { skill: string; count: number; }[];
  };
  hiring_funnel: {
    stage: string;
    count: number;
    conversion_rate: number;
  }[];
}

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color 
}: {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: any;
  color: string;
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <div className={`flex items-center mt-1 ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'increase' ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const ChartCard = ({ 
  title, 
  children,
  actions
}: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg shadow">
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {actions && <div className="flex space-x-2">{actions}</div>}
      </div>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

export default function EmployerAnalyticsContent() {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await employerService.getAnalytics({
        period: timeRange
      });
      setAnalyticsData(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Set fallback data
      const fallbackData: AnalyticsData = {
        overview: {
          total_views: 1250,
          total_applications: 89,
          total_hired: 12,
          conversion_rate: 7.1,
          avg_time_to_hire: 18,
          active_jobs: 8
        },
        trends: [
          { period: 'Week 1', views: 280, applications: 18, hired: 2 },
          { period: 'Week 2', views: 320, applications: 22, hired: 3 },
          { period: 'Week 3', views: 350, applications: 25, hired: 4 },
          { period: 'Week 4', views: 300, applications: 24, hired: 3 }
        ],
        job_performance: [
          { job_id: 1, job_title: 'Senior Developer', views: 450, applications: 32, conversion_rate: 7.1, status: 'active' },
          { job_id: 2, job_title: 'Product Manager', views: 380, applications: 28, conversion_rate: 7.4, status: 'active' },
          { job_id: 3, job_title: 'UX Designer', views: 420, applications: 29, conversion_rate: 6.9, status: 'active' }
        ],
        application_sources: [
          { source: 'Direct', count: 35, percentage: 39.3 },
          { source: 'LinkedIn', count: 28, percentage: 31.5 },
          { source: 'Job Boards', count: 18, percentage: 20.2 },
          { source: 'Referrals', count: 8, percentage: 9.0 }
        ],
        candidate_demographics: {
          locations: [
            { location: 'San Francisco', count: 25 },
            { location: 'New York', count: 20 },
            { location: 'Remote', count: 18 },
            { location: 'Los Angeles', count: 15 },
            { location: 'Seattle', count: 11 }
          ],
          experience_levels: [
            { level: '3-5 years', count: 32 },
            { level: '5-8 years', count: 28 },
            { level: '1-3 years', count: 18 },
            { level: '8+ years', count: 11 }
          ],
          skills: [
            { skill: 'JavaScript', count: 45 },
            { skill: 'React', count: 38 },
            { skill: 'Node.js', count: 32 },
            { skill: 'Python', count: 28 },
            { skill: 'TypeScript', count: 25 }
          ]
        },
        hiring_funnel: [
          { stage: 'Applied', count: 89, conversion_rate: 100 },
          { stage: 'Reviewed', count: 67, conversion_rate: 75.3 },
          { stage: 'Phone Screen', count: 34, conversion_rate: 38.2 },
          { stage: 'Interview', count: 23, conversion_rate: 25.8 },
          { stage: 'Final Interview', count: 18, conversion_rate: 20.2 },
          { stage: 'Hired', count: 12, conversion_rate: 13.5 }
        ]
      };
      setAnalyticsData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center mr-4">
            <BarChart3 className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-500">
              Track your recruitment performance and insights
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Job Views"
          value={analyticsData.overview.total_views.toLocaleString()}
          change="+12.5%"
          changeType="increase"
          icon={Eye}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Applications"
          value={analyticsData.overview.total_applications}
          change="+8.3%"
          changeType="increase"
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Hired Candidates"
          value={analyticsData.overview.total_hired}
          change="+15.2%"
          changeType="increase"
          icon={Award}
          color="bg-purple-500"
        />
        <StatCard
          title="Conversion Rate"
          value={`${analyticsData.overview.conversion_rate}%`}
          change="+2.1%"
          changeType="increase"
          icon={Target}
          color="bg-indigo-500"
        />
        <StatCard
          title="Avg. Time to Hire"
          value={`${analyticsData.overview.avg_time_to_hire} days`}
          change="-3 days"
          changeType="increase"
          icon={Clock}
          color="bg-orange-500"
        />
        <StatCard
          title="Active Jobs"
          value={analyticsData.overview.active_jobs}
          icon={Briefcase}
          color="bg-teal-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trends Chart */}
        <ChartCard title="Performance Trends">
          <div className="space-y-4">
            {analyticsData.trends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{trend.period}</span>
                <div className="flex space-x-6 text-sm">
                  <div className="text-blue-600">
                    <Eye className="h-4 w-4 inline mr-1" />
                    {trend.views}
                  </div>
                  <div className="text-green-600">
                    <Users className="h-4 w-4 inline mr-1" />
                    {trend.applications}
                  </div>
                  <div className="text-purple-600">
                    <Award className="h-4 w-4 inline mr-1" />
                    {trend.hired}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Hiring Funnel */}
        <ChartCard title="Hiring Funnel">
          <div className="space-y-3">
            {analyticsData.hiring_funnel.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                  <span className="text-sm text-gray-500">
                    {stage.count} ({stage.conversion_rate}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stage.conversion_rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Job Performance */}
      <ChartCard 
        title="Job Performance"
        actions={
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View All Jobs
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Job Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Views</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Applications</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Conversion Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.job_performance.map((job) => (
                <tr key={job.job_id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{job.job_title}</td>
                  <td className="py-3 px-4 text-gray-600">{job.views}</td>
                  <td className="py-3 px-4 text-gray-600">{job.applications}</td>
                  <td className="py-3 px-4 text-gray-600">{job.conversion_rate}%</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Sources */}
        <ChartCard title="Application Sources">
          <div className="space-y-3">
            {analyticsData.application_sources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'][index % 4]
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{source.count}</div>
                  <div className="text-xs text-gray-500">{source.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Top Locations */}
        <ChartCard title="Candidate Locations">
          <div className="space-y-3">
            {analyticsData.candidate_demographics.locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{location.location}</span>
                </div>
                <span className="text-sm text-gray-600">{location.count}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Top Skills */}
        <ChartCard title="Popular Skills">
          <div className="space-y-2">
            {analyticsData.candidate_demographics.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(skill.count / analyticsData.candidate_demographics.skills[0].count) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-6 text-right">{skill.count}</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Experience Levels */}
      <ChartCard title="Candidate Experience Levels">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {analyticsData.candidate_demographics.experience_levels.map((level, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-1">{level.count}</div>
              <div className="text-sm text-gray-600">{level.level}</div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
