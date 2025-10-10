'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';
import { employerService } from '@/shared/services/employer.service';
import { 
  FileText, 
  User, 
  Calendar, 
  MapPin, 
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  MessageCircle,
  Download,
  Star,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  Filter,
  Search
} from 'lucide-react';

interface Application {
  id: number;
  candidate: {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar?: string;
    experience_years: number;
    education: string;
    skills: string[];
    resume_url?: string;
  };
  job: {
    id: number;
    title: string;
    department: string;
  };
  applied_at: string;
  status: 'pending' | 'reviewed' | 'interview_scheduled' | 'hired' | 'rejected';
  cover_letter?: string;
  expected_salary?: number;
  notes?: string;
  interview_date?: string;
  rating?: number;
}

interface ApplicationsData {
  applications: Application[];
  total: number;
  by_status: {
    pending: number;
    reviewed: number;
    interview_scheduled: number;
    hired: number;
    rejected: number;
  };
}

const ApplicationCard = ({ 
  application, 
  onStatusChange,
  onViewDetails 
}: { 
  application: Application; 
  onStatusChange: (id: number, status: string) => void;
  onViewDetails: (application: Application) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'interview_scheduled': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {application.candidate.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Applied for: <span className="font-medium">{application.job.title}</span>
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{application.candidate.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>{application.candidate.experience_years} years exp</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Applied {formatDate(application.applied_at)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
            {application.status.replace('_', ' ')}
          </span>
          {application.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">{application.rating}/5</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <GraduationCap className="h-4 w-4" />
          <span>{application.candidate.education}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {application.candidate.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
              {skill}
            </span>
          ))}
          {application.candidate.skills.length > 3 && (
            <span className="text-xs text-gray-500">+{application.candidate.skills.length - 3} more</span>
          )}
        </div>

        {application.expected_salary && (
          <div className="text-sm text-gray-600 mb-2">
            Expected Salary: <span className="font-medium text-green-600">${application.expected_salary.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(application)}
            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </button>
          
          {application.candidate.resume_url && (
            <a
              href={application.candidate.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-1" />
              Resume
            </a>
          )}
        </div>

        <div className="flex space-x-2">
          {application.status === 'pending' && (
            <>
              <button
                onClick={() => onStatusChange(application.id, 'reviewed')}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Review
              </button>
              <button
                onClick={() => onStatusChange(application.id, 'rejected')}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </button>
            </>
          )}
          
          {application.status === 'reviewed' && (
            <>
              <button
                onClick={() => onStatusChange(application.id, 'interview_scheduled')}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-purple-700 bg-purple-50 hover:bg-purple-100"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Interview
              </button>
              <button
                onClick={() => onStatusChange(application.id, 'rejected')}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </button>
            </>
          )}
          
          {application.status === 'interview_scheduled' && (
            <>
              <button
                onClick={() => onStatusChange(application.id, 'hired')}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Hire
              </button>
              <button
                onClick={() => onStatusChange(application.id, 'rejected')}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function EmployerApplicationsContent() {
  const { user } = useAuth();
  const [applicationsData, setApplicationsData] = useState<ApplicationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [selectedStatus]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await employerService.getJobApplications({
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
        search: searchTerm || undefined
      });
      setApplicationsData(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      // Set fallback data
      const fallbackData: ApplicationsData = {
        applications: [],
        total: 0,
        by_status: {
          pending: 0,
          reviewed: 0,
          interview_scheduled: 0,
          hired: 0,
          rejected: 0
        }
      };
      setApplicationsData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: number, newStatus: string) => {
    try {
      await employerService.updateApplicationStatus(applicationId, newStatus);
      // Refresh applications
      await fetchApplications();
    } catch (error) {
      console.error('Failed to update application status:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApplications();
  };

  const filteredApplications = applicationsData?.applications.filter(app => {
    const matchesSearch = !searchTerm || 
      app.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  }) || [];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-4">
            <FileText className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
            <p className="text-sm text-gray-500">
              {applicationsData?.total || 0} total applications received
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Pending', value: applicationsData?.by_status.pending || 0, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Reviewed', value: applicationsData?.by_status.reviewed || 0, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Interviews', value: applicationsData?.by_status.interview_scheduled || 0, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Hired', value: applicationsData?.by_status.hired || 0, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Rejected', value: applicationsData?.by_status.rejected || 0, color: 'text-red-600', bg: 'bg-red-50' }
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} p-4 rounded-lg`}>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute inset-y-0 left-0 pl-3 flex items-center h-full w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search candidates or job titles..."
              />
            </form>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onStatusChange={handleStatusChange}
              onViewDetails={setSelectedApplication}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {searchTerm || selectedStatus !== 'all' ? 'No applications found' : 'No applications yet'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Applications will appear here when candidates apply to your jobs.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
