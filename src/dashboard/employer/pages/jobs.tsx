"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth, useI18n } from "@/shared/contexts";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent } from "@/shared/components/ui";
import ProtectedRoute from "@/shared/components/auth/ProtectedRoute";
import { employerService } from "@/shared/services/employer.service";
import {
  SuccessModal,
  ErrorModal,
  DeleteModal,
  EditJobDialog,
  ViewJobDialog,
} from "@/shared/components/modals";
import {
  PlusCircle,
  Search,
  Filter,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  Users,
  Eye,
  Bookmark,
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
  isBookmarked?: boolean;
}
interface AxiosError {
  message: string;
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
  config?: unknown;
  code?: string;
}

function JobsPageContent() {
  const { user } = useAuth();
  const { language, t } = useI18n();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jobToDelete, setJobToDelete] = useState<JobListing | null>(null);
  const [jobToEdit, setJobToEdit] = useState<JobListing | null>(null);
  const [jobToView, setJobToView] = useState<JobListing | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    console.log("JobsPageContent mounted, user:", user);
    console.log("User role:", user?.role);
    console.log("Is authenticated:", !!user);
    fetchJobs();
  }, [user]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      console.log("Fetching jobs...");
      const response = await employerService.getMyJobs();
      console.log("Jobs response:", response);

      // Handle paginated response format
      if (response.data && Array.isArray(response.data)) {
        // Direct array response
        setJobs(response.data);
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        // Paginated response with data.data
        setJobs(response.data.data);
      } else if (response.success && response.data && response.data.jobs) {
        // Expected format with jobs property
        setJobs(response.data.jobs);
      } else {
        setError(response.message || "Failed to fetch jobs");
      }
    } catch (error: unknown) {
      console.error("Failed to fetch jobs:", error);

      let errorMessage = "Failed to fetch jobs. Please try again.";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError;
        console.error("Error details:", {
          message: axiosError.message,
          status: axiosError.response?.status,
          data: axiosError.response?.data,
          config: axiosError.config,
        });

        if (axiosError.response?.status === 401) {
          errorMessage = "Authentication failed. Please log in again.";
        } else if (axiosError.response?.status === 403) {
          errorMessage = "Access denied. Only employers can view job listings.";
        } else if (axiosError.response?.status === 400) {
          errorMessage =
            axiosError.response.data?.message ||
            "Company profile not found. Please complete your company profile first.";
        } else if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.code === "ECONNREFUSED") {
          errorMessage =
            "Cannot connect to backend server. Please make sure the backend is running on http://localhost:8000";
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = (jobId: number) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );
  };

  const handleViewJob = (job: JobListing) => {
    setJobToView(job);
    setShowViewDialog(true);
  };

  const handleEditJob = (job: JobListing) => {
    setJobToEdit(job);
    setShowEditDialog(true);
  };

  const handleDeleteJob = (job: JobListing) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const confirmDeleteJob = async () => {
    if (!jobToDelete) return;

    try {
      setActionLoading(true);
      const response = await employerService.deleteJob(jobToDelete.id);

      // Check if response has success property or if it's a successful response
      if (response.success || response.data || !response.message) {
        setJobs((prevJobs) =>
          prevJobs.filter((job) => job.id !== jobToDelete.id)
        );
        setSuccessMessage(
          language === "en"
            ? "Job deleted successfully"
            : "تم حذف الوظيفة بنجاح"
        );
        setShowSuccessModal(true);
      } else {
        setErrorMessage(response.message || "Failed to delete job");
        setShowErrorModal(true);
      }
    } catch (error: unknown) {
      console.error("Failed to delete job:", error);

      let errorMessage = t("dashboard.failedToDeleteJob");

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setErrorMessage(errorMessage);
      setShowErrorModal(true);
    } finally {
      setActionLoading(false);
      setShowDeleteModal(false);
      setJobToDelete(null);
    }
  };

  const handleEditSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    // Refresh jobs list
    fetchJobs();
  };

  const handleEditError = (message: string) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const handleEditDialogHide = () => {
    setShowEditDialog(false);
    setJobToEdit(null);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.company?.company_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || job.job_type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || job.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeLabel = (type: string) => {
    const types = {
      "full-time": language === "en" ? "Full Time" : "دوام كامل",
      "part-time": language === "en" ? "Part Time" : "دوام جزئي",
      contract: language === "en" ? "Contract" : "عقد",
      internship: language === "en" ? "Internship" : "تدريب",
    };
    return types[type as keyof typeof types] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      "full-time": "bg-blue-100 text-blue-800",
      "part-time": "bg-green-100 text-green-800",
      contract: "bg-purple-100 text-purple-800",
      internship: "bg-orange-100 text-orange-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      draft: "bg-gray-100 text-gray-800",
      closed: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: language === "en" ? "Active" : "نشط",
      pending: language === "en" ? "Pending" : "في الانتظار",
      draft: language === "en" ? "Draft" : "مسودة",
      closed: language === "en" ? "Closed" : "مغلق",
    };
    return labels[status as keyof typeof labels] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("dashboard.loadingJobs")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button variant="primary" onClick={fetchJobs}>
            {t("dashboard.tryAgain")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("dashboard.myJobPostings")}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === "en"
                ? "Manage and track your job listings"
                : "إدارة ومتابعة إعلاناتك الوظيفية"}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => router.push("/employer/jobs/create")}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            {t("dashboard.postNewJob")}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  {t("dashboard.totalJobs")}
                </p>
                <p className="text-3xl font-bold">{jobs.length}</p>
              </div>
              <Building className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  {t("dashboard.activeJobs")}
                </p>
                <p className="text-3xl font-bold">
                  {jobs.filter((job) => job.status === "active").length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  {t("dashboard.pendingReview")}
                </p>
                <p className="text-3xl font-bold">
                  {jobs.filter((job) => job.status === "pending").length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">
                  {t("dashboard.draftJobs")}
                </p>
                <p className="text-3xl font-bold">
                  {jobs.filter((job) => job.status === "draft").length}
                </p>
              </div>
              <Bookmark className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={
                  language === "en"
                    ? "Search jobs by title, company, or description..."
                    : "ابحث عن الوظائف بالعنوان أو الشركة أو الوصف..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  <option value="all">{t("dashboard.allTypes")}</option>
                  <option value="full-time">{t("dashboard.fullTime")}</option>
                  <option value="part-time">{t("dashboard.partTime")}</option>
                  <option value="contract">{t("dashboard.contract")}</option>
                  <option value="internship">
                    {t("dashboard.internship")}
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  <option value="all">{t("dashboard.allStatus")}</option>
                  <option value="active">{t("dashboard.active")}</option>
                  <option value="pending">{t("dashboard.pending")}</option>
                  <option value="draft">{t("dashboard.draft")}</option>
                  <option value="closed">{t("dashboard.closed")}</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === "en"
                  ? "No jobs found"
                  : "لم يتم العثور على وظائف"}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === "en"
                  ? "Get started by posting your first job listing"
                  : "ابدأ بنشر إعلانك الوظيفي الأول"}
              </p>
              <Button
                variant="primary"
                onClick={() => router.push("/employer/jobs/create")}
                className="flex items-center gap-2 mx-auto cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                {t("dashboard.postNewJob")}
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-indigo-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {job.company?.company_name || "Company"}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                job.job_type
                              )}`}
                            >
                              {getTypeLabel(job.job_type)}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                job.status
                              )}`}
                            >
                              {getStatusLabel(job.status)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {new Date(job.created_at).toLocaleDateString()}
                          </span>
                          <button
                            className={`p-2 rounded-full transition-colors ${
                              job.isBookmarked
                                ? "text-red-500 bg-red-50"
                                : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                            }`}
                            onClick={() => handleBookmark(job.id)}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {job.experience_level}
                        </span>
                        {(job.salary_min || job.salary_max) && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary_min && job.salary_max
                              ? `${job.salary_min} - ${job.salary_max} ${
                                  job.salary_currency || "SAR"
                                }`
                              : job.salary_min
                              ? `${job.salary_min}+ ${
                                  job.salary_currency || "SAR"
                                }`
                              : `Up to ${job.salary_max} ${
                                  job.salary_currency || "SAR"
                                }`}
                          </span>
                        )}
                        {job.category && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                            {job.category}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      className="flex-1 cursor-pointer"
                      onClick={() => handleViewJob(job)}
                    >
                      {t("dashboard.viewDetails")}
                    </Button>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleEditJob(job)}
                    >
                      {t("dashboard.editJob")}
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDeleteJob(job)}
                    >
                      {t("dashboard.delete")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Modals */}
      <SuccessModal
        visible={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        title={t("dashboard.success")}
        message={successMessage}
        onConfirm={() => setShowSuccessModal(false)}
      />

      <ErrorModal
        visible={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        title={t("dashboard.error")}
        message={errorMessage}
        onConfirm={() => setShowErrorModal(false)}
      />

      <DeleteModal
        visible={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setJobToDelete(null);
        }}
        title={t("dashboard.deleteJob")}
        message={
          language === "en"
            ? `Are you sure you want to delete "${jobToDelete?.title}"? This action cannot be undone.`
            : `هل أنت متأكد من حذف "${jobToDelete?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`
        }
        onConfirm={confirmDeleteJob}
        onCancel={() => {
          setShowDeleteModal(false);
          setJobToDelete(null);
        }}
        loading={actionLoading}
      />

      <EditJobDialog
        visible={showEditDialog}
        onHide={handleEditDialogHide}
        job={jobToEdit}
        onSuccess={handleEditSuccess}
        onError={handleEditError}
      />

      <ViewJobDialog
        visible={showViewDialog}
        onHide={() => setShowViewDialog(false)}
        job={jobToView}
      />
    </div>
  );
}

export default function JobsPage() {
  return (
    <ProtectedRoute>
      <JobsPageContent />
    </ProtectedRoute>
  );
}
