'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Search, Eye, CheckCircle, Ban, MapPin, Building2, Calendar, DollarSign } from 'lucide-react';
import { Toast } from 'primereact/toast';
import { adminService } from '@/shared/services/admin.service';

interface Job {
  id: number;
  title: string;
  company: {
    id: number;
    company_name: string;
    logo_path?: string;
  };
  location: string;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'pending';
  salary_min: number;
  salary_max: number;
  applications_count: number;
  views_count: number;
  created_at: string;
  application_deadline?: string;
  description: string;
  requirements: string;
  category?: string;
}

export default function PendingJobsContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchPendingJobs();
  }, [searchTerm]);

  const fetchPendingJobs = async () => {
    try {
      const response = await adminService.getJobs({
        search: searchTerm || undefined
      });
      
      if (response.data) {
        const jobsData = Array.isArray(response.data) ? response.data : response.data.data;
        // Filter only pending jobs on the client side
        const pendingJobs = (jobsData || []).filter((job: Job) => job.status === 'pending');
        setJobs(pendingJobs);
      } else {
        setJobs([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch pending jobs:', error);
      setJobs([]);
      setLoading(false);
    }
  };

  const handleViewJob = async (job: Job) => {
    try {
      const response = await adminService.getJobDetails(job.id);
      setSelectedJob(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      setSelectedJob(job);
      setShowDetailModal(true);
    }
  };

  const handleApprove = async (jobId: number) => {
    try {
      await adminService.approveJob(jobId);
      toast.current?.show({
        severity: 'success',
        summary: 'Success! 🎉',
        detail: 'Job approved successfully!',
        life: 4000
      });
      fetchPendingJobs(); // Refresh the list
    } catch (error) {
      console.error('Failed to approve job:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error ❌',
        detail: 'Failed to approve job. Please try again.',
        life: 4000
      });
    }
  };

  const handleDeclineClick = (job: Job) => {
    setSelectedJob(job);
    setShowDeclineModal(true);
  };

  const handleDeclineSubmit = async () => {
    if (!selectedJob || !declineReason.trim()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Warning ⚠️',
        detail: 'Please provide a reason for declining the job.',
        life: 3000
      });
      return;
    }

    try {
      await adminService.declineJob(selectedJob.id, declineReason);
      toast.current?.show({
        severity: 'info',
        summary: 'Job Declined',
        detail: 'Job declined successfully!',
        life: 4000
      });
      setShowDeclineModal(false);
      setDeclineReason('');
      setSelectedJob(null);
      fetchPendingJobs(); // Refresh the list
    } catch (error) {
      console.error('Failed to decline job:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error ❌',
        detail: 'Failed to decline job. Please try again.',
        life: 4000
      });
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'text-indigo-800 bg-indigo-100';
      case 'part-time': return 'text-purple-800 bg-purple-100';
      case 'contract': return 'text-blue-800 bg-blue-100';
      case 'internship': return 'text-orange-800 bg-orange-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center mr-4">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pending Jobs</h1>
            <p className="text-sm text-gray-500">Review and approve job postings</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Jobs Awaiting Review
                </dt>
                <dd className="text-2xl font-bold text-gray-900">{filteredJobs.length}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending jobs</h3>
            <p className="text-gray-500">All jobs have been reviewed!</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.job_type)}`}>
                      {job.job_type.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      {job.company.company_name}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      ${job.salary_min} - ${job.salary_max}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {job.description.substring(0, 200)}...
                  </p>

                  {job.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-800 bg-gray-100 mb-4">
                      {job.category}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
                <button
                  onClick={() => handleViewJob(job)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Review Details
                </button>
                <button
                  onClick={() => handleDeclineClick(job)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Decline
                </button>
                <button
                  onClick={() => handleApprove(job.id)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Job Detail Modal */}
      {showDetailModal && selectedJob && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Job Review</h3>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedJob(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{selectedJob.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Building2 className="h-4 w-4 mr-1" />
                        {selectedJob.company.company_name}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedJob.location}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Job Description</h5>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      {selectedJob.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Requirements</h5>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      {selectedJob.requirements.split('\n').map((requirement, index) => (
                        <p key={index} className="mb-2">{requirement}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">Job Details</h5>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-600">Type</dt>
                      <dd className="text-sm font-medium text-gray-900">{selectedJob.job_type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Salary Range</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${selectedJob.salary_min} - ${selectedJob.salary_max}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Posted</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {new Date(selectedJob.created_at).toLocaleDateString()}
                      </dd>
                    </div>
                    {selectedJob.application_deadline && (
                      <div>
                        <dt className="text-sm text-gray-600">Application Deadline</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          {new Date(selectedJob.application_deadline).toLocaleDateString()}
                        </dd>
                      </div>
                    )}
                    {selectedJob.category && (
                      <div>
                        <dt className="text-sm text-gray-600">Category</dt>
                        <dd className="text-sm font-medium text-gray-900">{selectedJob.category}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleApprove(selectedJob.id)}
                    className="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Job
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleDeclineClick(selectedJob);
                    }}
                    className="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Decline Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {showDeclineModal && selectedJob && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Decline Job Posting</h3>
                <button
                  onClick={() => {
                    setShowDeclineModal(false);
                    setDeclineReason('');
                    setSelectedJob(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600 mb-1">Job Title:</p>
                <p className="font-medium">{selectedJob.title}</p>
                <p className="text-sm text-gray-600 mt-2 mb-1">Company:</p>
                <p className="font-medium">{selectedJob.company.company_name}</p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="decline-reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for declining *
                </label>
                <textarea
                  id="decline-reason"
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Please provide a detailed reason for declining this job posting..."
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeclineModal(false);
                    setDeclineReason('');
                    setSelectedJob(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeclineSubmit}
                  disabled={!declineReason.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Decline Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Toast ref={toast} />
    </div>
  );
}
