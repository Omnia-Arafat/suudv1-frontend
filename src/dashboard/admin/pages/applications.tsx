"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Eye,
  Check,
  X,
  Clock,
  User,
  Briefcase,
  MapPin,
} from "lucide-react";
import { adminService } from "@/shared/services/admin.service";

interface Application {
  id: number;
  job_title: string;
  job_id: number;
  applicant_name: string;
  applicant_email: string;
  company_name: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  applied_at: string;
  location: string;
  experience_years?: number;
  cover_letter?: string;
}

export default function AdminApplicationsContent() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  useEffect(() => {
    fetchApplications();
  }, [searchTerm, selectedStatus]);

  const fetchApplications = async () => {
    try {
      const response = await adminService.getApplications({
        search: searchTerm || undefined,
        status: selectedStatus === "all" ? undefined : selectedStatus,
      });

      // Handle different response structures
      let applicationsData = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          applicationsData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          applicationsData = response.data.data;
        } else if (
          response.data.applications &&
          Array.isArray(response.data.applications)
        ) {
          applicationsData = response.data.applications;
        }
      }

      setApplications(applicationsData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      // Set fallback mock data for development
      const mockApplications: Application[] = [
        {
          id: 1,
          job_title: "Senior Frontend Developer",
          job_id: 1,
          applicant_name: "Ahmed Al-Rashid",
          applicant_email: "ahmed@example.com",
          company_name: "TechCorp Solutions",
          status: "pending",
          applied_at: new Date().toISOString(),
          location: "Riyadh, Saudi Arabia",
          experience_years: 5,
          cover_letter:
            "I am very interested in this position and have relevant experience.",
        },
        {
          id: 2,
          job_title: "Backend Developer",
          job_id: 2,
          applicant_name: "Sara Mohammed",
          applicant_email: "sara@example.com",
          company_name: "Digital Horizon",
          status: "reviewed",
          applied_at: new Date(Date.now() - 86400000).toISOString(),
          location: "Jeddah, Saudi Arabia",
          experience_years: 3,
          cover_letter: "I have strong backend development skills.",
        },
      ];
      setApplications(mockApplications);
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || app.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

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

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
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
            <FileText className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Applications Management
            </h1>
            <p className="text-sm text-gray-500">
              Monitor and review all job applications
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Applications
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {applications.length}
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
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Review
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {
                      applications.filter((app) => app.status === "pending")
                        .length
                    }
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
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Accepted
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {
                      applications.filter((app) => app.status === "accepted")
                        .length
                    }
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
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Rejected
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {
                      applications.filter((app) => app.status === "rejected")
                        .length
                    }
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
              placeholder="Search applications..."
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
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Applications ({filteredApplications.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredApplications.map((application) => (
            <div key={application.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-medium text-gray-900">
                      {application.job_title}
                    </h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {application.applicant_name}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {application.company_name}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {application.location}
                    </div>
                    {application.experience_years && (
                      <span>{application.experience_years} years exp.</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{application.applicant_email}</span>
                    <span>
                      Applied{" "}
                      {new Date(application.applied_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {application.cover_letter && (
                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                  <p className="text-sm text-gray-600 italic line-clamp-3">
                    "{application.cover_letter}"
                  </p>
                </div>
              )}
            </div>
          ))}

          {filteredApplications.length === 0 && (
            <div className="px-6 py-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications found
              </h3>
              <p className="text-gray-500">
                {searchTerm || selectedStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Applications will appear here when candidates start applying to jobs."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
