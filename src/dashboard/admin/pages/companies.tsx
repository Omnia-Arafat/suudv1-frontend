'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Search, Eye, Check, X, Clock, Users, MapPin, Mail, Phone, Shield } from 'lucide-react';
import { adminService } from '@/shared/services/admin.service';

interface Company {
  id: number;
  name: string;
  email: string;
  phone?: string;
  location: string;
  website?: string;
  description?: string;
  industry: string;
  size: string;
  logo_url?: string;
  is_verified: boolean;
  verification_status: 'pending' | 'verified' | 'rejected';
  employees_count: number;
  jobs_count: number;
  created_at: string;
}

export default function AdminCompaniesContent() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');

  useEffect(() => {
    fetchCompanies();
  }, [searchTerm, selectedStatus]);

  const fetchCompanies = async () => {
    try {
      const response = await adminService.getPendingCompanies();
      setCompanies(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
      setLoading(false);
    }
  };

  const handleCompanyAction = async (companyId: number, action: 'approve' | 'reject') => {
    try {
      await adminService.updateCompanyVerification(companyId, action === 'approve');
      fetchCompanies(); // Refresh the list
    } catch (error) {
      console.error(`Failed to ${action} company:`, error);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || company.verification_status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-800 bg-yellow-100';
      case 'verified': return 'text-green-800 bg-green-100';
      case 'rejected': return 'text-red-800 bg-red-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const getSizeColor = (size: string) => {
    switch (size) {
      case 'startup': return 'text-purple-800 bg-purple-100';
      case 'small': return 'text-blue-800 bg-blue-100';
      case 'medium': return 'text-indigo-800 bg-indigo-100';
      case 'large': return 'text-green-800 bg-green-100';
      case 'enterprise': return 'text-red-800 bg-red-100';
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
            <Building2 className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Companies Management</h1>
            <p className="text-sm text-gray-500">Review and verify company registrations</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Building2 className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Companies</dt>
                  <dd className="text-lg font-medium text-gray-900">{companies.length}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Verification</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {companies.filter(c => c.verification_status === 'pending').length}
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
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Verified</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {companies.filter(c => c.verification_status === 'verified').length}
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
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Rejected</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {companies.filter(c => c.verification_status === 'rejected').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search companies..."
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
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Companies List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Companies ({filteredCompanies.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {company.logo_url ? (
                        <img
                          src={company.logo_url}
                          alt={`${company.name} logo`}
                          className="h-12 w-12 rounded-lg object-cover mr-3"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mr-3">
                          <Building2 className="h-6 w-6 text-indigo-600" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{company.name}</h4>
                        <p className="text-sm text-gray-600">{company.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(company.verification_status)}`}>
                        {company.verification_status}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSizeColor(company.size)}`}>
                        {company.size}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {company.location}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {company.email}
                    </div>
                    {company.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {company.phone}
                      </div>
                    )}
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700"
                      >
                        Website
                      </a>
                    )}
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {company.employees_count} employees
                    </span>
                    <span>{company.jobs_count} jobs posted</span>
                    <span>Registered {new Date(company.created_at).toLocaleDateString()}</span>
                  </div>

                  {company.description && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600" title="View Details">
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  {company.verification_status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleCompanyAction(company.id, 'approve')}
                        className="p-2 text-green-600 hover:text-green-700"
                        title="Approve Company"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleCompanyAction(company.id, 'reject')}
                        className="p-2 text-red-600 hover:text-red-700"
                        title="Reject Company"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredCompanies.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Companies will appear here when they register for verification.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
