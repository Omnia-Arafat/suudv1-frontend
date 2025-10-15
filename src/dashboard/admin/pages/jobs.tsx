'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Search, Filter, Eye, Edit, Trash2, CheckCircle, Ban, Clock, MapPin, Building2 } from 'lucide-react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
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
  status: 'pending' | 'active' | 'declined' | 'closed';
  salary_min: number;
  salary_max: number;
  applications_count: number;
  views_count: number;
  created_at: string;
  application_deadline?: string;
  description: string;
  decline_reason?: string;
  approved_at?: string;
  declined_at?: string;
}

export default function AdminJobsContent() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, selectedStatus, selectedType]);

  const fetchJobs = async () => {
    try {
      const response = await adminService.getJobs({
        search: searchTerm || undefined
      });
      
      if (response.data) {
        // Handle pagination response
        const jobsData = Array.isArray(response.data) ? response.data : response.data.data;
        setAllJobs(jobsData || []);
      } else {
        setAllJobs([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setAllJobs([]);
      setLoading(false);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to fetch jobs. Please try again.',
        life: 3000
      });
    }
  };

  const handleJobAction = async (jobId: number, action: 'approve' | 'reject' | 'decline') => {
    try {
      if (action === 'approve') {
        await adminService.approveJob(jobId);
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Job approved successfully!',
          life: 3000
        });
      } else if (action === 'decline' || action === 'reject') {
        const job = filteredJobs.find(j => j.id === jobId);
        setSelectedJob(job || null);
        setShowDeclineModal(true);
        return; // Don't refresh yet, wait for modal completion
      }
      fetchJobs(); // Refresh the list
    } catch (error) {
      console.error(`Failed to ${action} job:`, error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: `Failed to ${action} job. Please try again.`,
        life: 3000
      });
    }
  };

  const handleDeclineSubmit = async () => {
    if (!selectedJob || !declineReason.trim()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please provide a reason for declining the job.',
        life: 3000
      });
      return;
    }

    try {
      await adminService.declineJob(selectedJob.id, declineReason);
      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Job declined successfully!',
        life: 3000
      });
      setShowDeclineModal(false);
      setDeclineReason('');
      setSelectedJob(null);
      fetchJobs(); // Refresh the list
    } catch (error) {
      console.error('Failed to decline job:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to decline job. Please try again.',
        life: 3000
      });
    }
  };

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    const matchesType = selectedType === 'all' || job.job_type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-800 bg-green-100';
      case 'pending': return 'text-yellow-800 bg-yellow-100';
      case 'declined': return 'text-red-800 bg-red-100';
      case 'closed': return 'text-gray-800 bg-gray-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

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
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mr-4">
            <Briefcase className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
            <p className="text-sm text-gray-500">Monitor and manage all job postings</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Jobs</dt>
                  <dd className="text-lg font-medium text-gray-900">{allJobs.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Jobs</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {allJobs.filter(j => j.status === 'active').length}
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
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Review</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {allJobs.filter(j => j.status === 'pending').length}
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
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {allJobs.reduce((sum, job) => sum + job.views_count, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
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

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="declined">Declined</option>
            <option value="closed">Closed</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Jobs ({filteredJobs.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredJobs.map((job) => (
            <div key={job.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(job.job_type)}`}>
                        {job.job_type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {job.company.company_name}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <span>${job.salary_min} - ${job.salary_max}</span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>{job.applications_count} Applications</span>
                    <span>{job.views_count} Views</span>
                    <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                    {job.application_deadline && (
                      <span>Expires {new Date(job.application_deadline).toLocaleDateString()}</span>
                    )}
                    {job.decline_reason && (
                      <span className="text-red-600">Declined: {job.decline_reason}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  {job.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleJobAction(job.id, 'approve')}
                        className="p-2 text-green-600 hover:text-green-700"
                        title="Approve Job"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleJobAction(job.id, 'decline')}
                        className="p-2 text-red-600 hover:text-red-700"
                        title="Decline Job"
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Toast ref={toast} />
      
      {/* Decline Modal */}
      <Dialog
        header="Decline Job Posting"
        visible={showDeclineModal}
        onHide={() => {
          setShowDeclineModal(false);
          setDeclineReason('');
          setSelectedJob(null);
        }}
        style={{ width: '450px' }}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => {
                setShowDeclineModal(false);
                setDeclineReason('');
                setSelectedJob(null);
              }}
              className="p-button-text"
            />
            <Button
              label="Decline Job"
              icon="pi pi-ban"
              onClick={handleDeclineSubmit}
              disabled={!declineReason.trim()}
              className="p-button-danger"
            />
          </div>
        }
      >
        {selectedJob && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600 mb-1">Job Title:</p>
              <p className="font-medium">{selectedJob.title}</p>
              <p className="text-sm text-gray-600 mt-2 mb-1">Company:</p>
              <p className="font-medium">{selectedJob.company.company_name}</p>
            </div>
            
            <div>
              <label htmlFor="decline-reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for declining *
              </label>
              <InputTextarea
                id="decline-reason"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                rows={4}
                placeholder="Please provide a detailed reason for declining this job posting..."
                className="w-full"
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
