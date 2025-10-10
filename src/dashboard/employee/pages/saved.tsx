'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';
import { employeeService } from '@/shared/services/employee.service';
import Link from 'next/link';
import { 
  BookmarkCheck, 
  MapPin, 
  Clock, 
  Building2, 
  Search,
  Filter,
  Trash2,
  Eye,
  ExternalLink,
  Calendar,
  DollarSign,
  Users,
  Award,
  Heart
} from 'lucide-react';

interface SavedJob {
  id: number;
  job_id: number;
  saved_at: string;
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    employment_type: string;
    experience_level: string;
    salary_range: string;
    description: string;
    requirements: string[];
    posted_at: string;
    deadline: string;
    company_logo?: string;
  };
}

interface SavedJobsData {
  data: SavedJob[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

const SavedJobCard = ({ 
  savedJob, 
  onRemove, 
  onApply 
}: { 
  savedJob: SavedJob; 
  onRemove: (jobId: number) => void;
  onApply: (jobId: number) => void;
}) => {
  const { job } = savedJob;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      case 'remote': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:border-indigo-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onRemove(job.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Remove from saved jobs"
            >
              <Heart className="h-5 w-5 fill-current text-red-400" />
            </button>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEmploymentTypeColor(job.employment_type)}`}>
              {job.employment_type}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <Award className="h-3 w-3 mr-1" />
              {job.experience_level}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <DollarSign className="h-3 w-3 mr-1" />
              {job.salary_range}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Posted {formatDate(job.posted_at)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Deadline {formatDate(job.deadline)}</span>
              </div>
            </div>
            <div className="flex items-center text-indigo-600">
              <BookmarkCheck className="h-4 w-4 mr-1" />
              <span>Saved {formatDate(savedJob.saved_at)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex space-x-2">
          <Link
            href={`/employee/jobs/${job.id}`}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Link>
          <button
            onClick={() => onApply(job.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Apply Now
          </button>
        </div>
        <button
          onClick={() => onRemove(job.id)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default function EmployeeSavedJobsContent() {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState<SavedJobsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [applying, setApplying] = useState<number | null>(null);
  const [removing, setRemoving] = useState<number | null>(null);

  useEffect(() => {
    fetchSavedJobs();
  }, [currentPage]);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getSavedJobs({
        page: currentPage,
        per_page: 10
      });
      setSavedJobs(data);
    } catch (error) {
      console.error('Failed to fetch saved jobs:', error);
      // Set fallback data when API is not available
      const fallbackData: SavedJobsData = {
        data: [],
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 1,
      };
      setSavedJobs(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromSaved = async (jobId: number) => {
    if (removing === jobId) return;
    
    setRemoving(jobId);
    try {
      await employeeService.toggleSaveJob(jobId);
      // Remove the job from the current list
      setSavedJobs(prev => {
        if (!prev) return null;
        return {
          ...prev,
          data: prev.data.filter(savedJob => savedJob.job.id !== jobId),
          total: prev.total - 1
        };
      });
    } catch (error) {
      console.error('Failed to remove job from saved:', error);
    } finally {
      setRemoving(null);
    }
  };

  const handleApplyForJob = async (jobId: number) => {
    if (applying === jobId) return;
    
    setApplying(jobId);
    try {
      await employeeService.applyForJob(jobId, {});
      // You might want to show a success message or redirect
    } catch (error) {
      console.error('Failed to apply for job:', error);
    } finally {
      setApplying(null);
    }
  };

  const filteredJobs = savedJobs?.data.filter(savedJob => {
    const matchesSearch = !searchTerm || 
      savedJob.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      savedJob.job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      savedJob.job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || 
      savedJob.job.employment_type.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesFilter;
  }) || [];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
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
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center mr-4">
            <BookmarkCheck className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
            <p className="text-sm text-gray-500">
              {savedJobs?.total || 0} job{(savedJobs?.total || 0) !== 1 ? 's' : ''} saved for later
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search saved jobs..."
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none bg-white"
            >
              <option value="all">All Job Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {savedJobs && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredJobs.length} of {savedJobs.total} saved jobs
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Jobs List */}
      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((savedJob) => (
            <SavedJobCard
              key={savedJob.id}
              savedJob={savedJob}
              onRemove={handleRemoveFromSaved}
              onApply={handleApplyForJob}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <BookmarkCheck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {searchTerm || filterType !== 'all' ? 'No jobs found' : 'No saved jobs yet'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Start browsing jobs and save the ones that interest you!'
              }
            </p>
            {(!searchTerm && filterType === 'all') && (
              <div className="mt-6">
                <Link
                  href="/employee/jobs"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Browse Jobs
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {savedJobs && savedJobs.last_page > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, savedJobs.last_page))}
              disabled={currentPage === savedJobs.last_page}
              className="relative ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{savedJobs.last_page}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, savedJobs.last_page))}
                  disabled={currentPage === savedJobs.last_page}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
