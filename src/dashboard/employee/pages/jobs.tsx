"use client";

import React, { useState, useEffect } from "react";
import { useAuth, useI18n } from "@/shared/contexts";
import { employeeService } from "@/shared/services/employee.service";
import { DashboardLayout } from '@/dashboard/shared/components/layout';
import { Button } from "@/shared/components/ui";
import { SuccessModal, ErrorModal } from "@/shared/components";
import { Heart, MapPin, Clock, Building, DollarSign } from "lucide-react";

interface JobListing {
  id: number;
  title: string;
  description: string;
  location: string;
  job_type: string;
  salary_min?: number;
  salary_max?: number;
  experience_level: string;
  category: string;
  application_deadline?: string;
  remote_allowed: boolean;
  company: {
    name: string;
    logo_url?: string;
  };
  created_at: string;
  updated_at: string;
}

export default function EmployeeJobsPage() {
  const { user } = useAuth();
  const { language } = useI18n();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<number | null>(null);
  const [saving, setSaving] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getJobs();

      if (response.success) {
        // Handle paginated response structure
        const jobsData = response.data?.data || response.data || [];
        setJobs(Array.isArray(jobsData) ? jobsData : []);
      } else {
        console.error("Failed to fetch jobs:", response.message);
        setErrorMessage("Failed to load jobs");
        setShowErrorModal(true);
      }
    } catch (error: any) {
      console.error("Error fetching jobs:", error);

      // Check if it's a network error (backend not running)
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        (error.code === "ERR_NETWORK" || error.code === "ECONNREFUSED")
      ) {
        console.warn(
          "Backend API not available - using mock data for development"
        );
        // Use mock data for development
        const mockJobs = [
          {
            id: 1,
            company_id: 1,
            title:
              language === "en"
                ? "Senior Software Developer"
                : "مطور برمجيات أول",
            description:
              language === "en"
                ? "We are looking for a senior software developer to join our team."
                : "نبحث عن مطور برمجيات أول للانضمام إلى فريقنا.",
            requirements: "5+ years experience",
            location:
              language === "en" ? "Riyadh, Saudi Arabia" : "الرياض، السعودية",
            job_type: "full-time",
            experience_level: "senior",
            salary_min: 12000,
            salary_max: 18000,
            salary_currency: "SAR",
            status: "active",
            slug: "senior-software-developer-1",
            category: "Technology",
            views_count: 45,
            applications_count: 8,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            remote_allowed: true,
            company: {
              id: 1,
              name: "TechNova Solutions",
              logo_url: undefined,
            },
          },
          {
            id: 2,
            company_id: 2,
            title: language === "en" ? "Marketing Manager" : "مدير التسويق",
            description:
              language === "en"
                ? "We need an experienced marketing manager to lead our campaigns."
                : "نحتاج إلى مدير تسويق ذو خبرة لقيادة حملاتنا.",
            requirements: "3+ years marketing experience",
            location:
              language === "en" ? "Jeddah, Saudi Arabia" : "جدة، السعودية",
            job_type: "full-time",
            experience_level: "mid",
            salary_min: 8000,
            salary_max: 12000,
            salary_currency: "SAR",
            status: "active",
            slug: "marketing-manager-2",
            category: "Marketing",
            views_count: 32,
            applications_count: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            remote_allowed: false,
            company: {
              id: 2,
              name: "Digital Horizon",
              logo_url: undefined,
            },
          },
        ];
        setJobs(mockJobs);
        setErrorMessage(""); // Clear error since we're using mock data
        return;
      }

      setErrorMessage("Failed to load jobs");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyForJob = async (jobId: number) => {
    try {
      setApplying(jobId);
      const response = await employeeService.applyForJob(jobId, {
        cover_letter:
          "I am interested in this position and would like to apply.",
      });

      if (response.success) {
        setSuccessMessage(
          language === "en"
            ? "Application submitted successfully!"
            : "تم تقديم الطلب بنجاح!"
        );
        setShowSuccessModal(true);
      } else {
        setErrorMessage(response.message || "Failed to apply for job");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      setErrorMessage("Failed to apply for job");
      setShowErrorModal(true);
    } finally {
      setApplying(null);
    }
  };

  const handleSaveJob = async (jobId: number) => {
    try {
      setSaving(jobId);
      const response = await employeeService.saveJob(jobId);

      if (response.success) {
        setSuccessMessage(
          language === "en"
            ? "Job saved successfully!"
            : "تم حفظ الوظيفة بنجاح!"
        );
        setShowSuccessModal(true);
      } else {
        setErrorMessage(response.message || "Failed to save job");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error saving job:", error);
      setErrorMessage("Failed to save job");
      setShowErrorModal(true);
    } finally {
      setSaving(null);
    }
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    if (min && max) {
      return `${min.toLocaleString()} - ${max.toLocaleString()} SAR`;
    }
    return `${(min || max)?.toLocaleString()} SAR`;
  };

  const getJobTypeLabel = (type: string) => {
    const types = {
      "full-time": language === "en" ? "Full Time" : "دوام كامل",
      "part-time": language === "en" ? "Part Time" : "دوام جزئي",
      contract: language === "en" ? "Contract" : "عقد",
      internship: language === "en" ? "Internship" : "تدريب",
    };
    return types[type as keyof typeof types] || type;
  };

  const getExperienceLabel = (level: string) => {
    const levels = {
      entry: language === "en" ? "Entry Level" : "مبتدئ",
      mid: language === "en" ? "Mid Level" : "متوسط",
      senior: language === "en" ? "Senior Level" : "خبير",
      lead: language === "en" ? "Lead Level" : "قائد",
    };
    return levels[level as keyof typeof levels] || level;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {language === "en" ? "Loading jobs..." : "جاري تحميل الوظائف..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title={language === "en" ? "Find Jobs" : "ابحث عن وظائف"}
      subtitle={language === "en" ? "Discover exciting career opportunities" : "اكتشف فرص عمل مثيرة"}
    >
      <div className="space-y-6">

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === "en" ? "No jobs available" : "لا توجد وظائف متاحة"}
            </h3>
            <p className="text-gray-500">
              {language === "en"
                ? "Check back later for new opportunities"
                : "تحقق لاحقاً للحصول على فرص جديدة"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{job.company.name}</span>
                    </div>
                  </div>
                  {job.company.logo_url && (
                    <img
                      src={job.company.logo_url}
                      alt={job.company.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {job.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.location}</span>
                    {job.remote_allowed && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {language === "en" ? "Remote" : "عن بُعد"}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-4">
                      {getJobTypeLabel(job.job_type)}
                    </span>
                    <span>{getExperienceLabel(job.experience_level)}</span>
                  </div>

                  {formatSalary(job.salary_min, job.salary_max) && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>
                        {formatSalary(job.salary_min, job.salary_max)}
                      </span>
                    </div>
                  )}

                  {job.application_deadline && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        {language === "en" ? "Deadline: " : "الموعد النهائي: "}
                        {new Date(
                          job.application_deadline
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => handleApplyForJob(job.id)}
                    disabled={applying === job.id}
                  >
                    {applying === job.id
                      ? language === "en"
                        ? "Applying..."
                        : "جاري التقديم..."
                      : language === "en"
                      ? "Apply Now"
                      : "قدم الآن"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSaveJob(job.id)}
                    disabled={saving === job.id}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        saving === job.id ? "animate-pulse" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal
        visible={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        title={language === "en" ? "Success" : "نجح"}
        message={successMessage}
        onConfirm={() => setShowSuccessModal(false)}
      />

      {/* Error Modal */}
      <ErrorModal
        visible={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        title={language === "en" ? "Error" : "خطأ"}
        message={errorMessage}
        onConfirm={() => setShowErrorModal(false)}
      />
    </DashboardLayout>
  );
}
