"use client";

import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "@/shared/components/ui";
import { useI18n } from "@/shared/contexts";
import { AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Building,
  DollarSign,
  Users,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface JobListing {
  id: number;
  title: string;
  company_id: number;
  company?: {
    id: number;
    company_name: string;
    logo_path?: string;
  };
  location: string;
  job_type: "full-time" | "part-time" | "contract" | "internship";
  experience_level: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  description: string;
  requirements: string;
  category?: string;
  status: string;
  created_at: string;
  updated_at: string;
  application_deadline?: string;
  positions_available?: number;
}

interface ViewJobDialogProps {
  visible: boolean;
  onHide: () => void;
  job: JobListing | null;
}

export default function ViewJobDialog({
  visible,
  onHide,
  job,
}: ViewJobDialogProps) {
  const { language, t } = useI18n();

  if (!job) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-800 bg-green-100";
      case "pending":
        return "text-yellow-800 bg-yellow-100";
      case "draft":
        return "text-gray-800 bg-gray-100";
      case "closed":
        return "text-red-800 bg-red-100";
      default:
        return "text-gray-800 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "draft":
        return <FileText className="h-4 w-4" />;
      case "closed":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) return null;

    const currency = job.salary_currency || "SAR";

    if (job.salary_min && job.salary_max) {
      return `${currency} ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`;
    }

    if (job.salary_min) {
      return `${currency} ${job.salary_min.toLocaleString()}+`;
    }

    return `Up to ${currency} ${job.salary_max?.toLocaleString()}`;
  };

  return (
    <AnimatePresence>
      {visible && (
        <Dialog
          visible={visible}
          onHide={onHide}
          modal
          style={{ width: "90vw", maxWidth: "800px" }}
          header={
            <div className="flex items-center gap-3 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b border-gray-200">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {t("job.jobDetails")}
                </h2>
                <p className="text-sm text-gray-600">
                  {t("job.viewJobInformation")}
                </p>
              </div>
            </div>
          }
          contentStyle={{
            padding: 0,
            borderRadius: "0 0 16px 16px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid #e5e7eb",
          }}
          headerStyle={{
            padding: 0,
            borderRadius: "16px 16px 0 0",
            border: "none",
          }}
        >
          <div className="p-6 space-y-6">
            {/* Job Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{job.company?.company_name || "Company"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  job.status
                )}`}
              >
                {getStatusIcon(job.status)}
                {job.status}
              </span>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("job.jobType")}
                </label>
                <div className="flex items-center gap-2 text-gray-900">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="capitalize">{job.job_type}</span>
                </div>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("job.experienceLevel")}
                </label>
                <div className="flex items-center gap-2 text-gray-900">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="capitalize">{job.experience_level}</span>
                </div>
              </div>

              {/* Salary */}
              {formatSalary() && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t("job.salary")}
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>{formatSalary()}</span>
                  </div>
                </div>
              )}

              {/* Category */}
              {job.category && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t("job.category")}
                  </label>
                  <div className="text-gray-900">{job.category}</div>
                </div>
              )}

              {/* Application Deadline */}
              {job.application_deadline && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t("job.applicationDeadline")}
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{formatDate(job.application_deadline)}</span>
                  </div>
                </div>
              )}

              {/* Positions Available */}
              {job.positions_available && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t("job.positionsAvailable")}
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{job.positions_available}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t("job.jobDescription")}
              </label>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t("job.requirements")}
              </label>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {job.requirements}
                </p>
              </div>
            </div>

            {/* Job Meta */}
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">{t("job.createdAt")}: </span>
                  <span>{formatDate(job.created_at)}</span>
                </div>
                <div>
                  <span className="font-medium">{t("job.updatedAt")}: </span>
                  <span>{formatDate(job.updated_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-lg border-t border-gray-200">
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={onHide}
                className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t("common.close")}
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}







