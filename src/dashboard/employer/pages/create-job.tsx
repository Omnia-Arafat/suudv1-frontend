"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useJobValidationSchema } from "@/shared/utils/validation";
import { SuccessModal, ErrorModal } from "@/shared/components";
import { Button } from "@/shared/components/ui";
import { employerService } from "@/shared/services/employer.service";
import { useI18n } from "@/shared/contexts";
import ProtectedRoute from "@/shared/components/auth/ProtectedRoute";
import { PlusCircle } from "lucide-react";

interface JobFormData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_type: "full-time" | "part-time" | "contract" | "internship";
  salary_min?: number;
  salary_max?: number;
  category: string;
  experience_level: string;
  deadline?: string;
  remote_allowed?: boolean;
}

function CreateJobPageContent() {
  const router = useRouter();
  const { language } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDraft, setIsDraft] = useState(false);

  const validationSchema = useJobValidationSchema();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<JobFormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  // Watch all form values for debugging
  const formValues = watch();
  console.log("Form values:", formValues);
  console.log("Form is valid:", isValid);

  const onSubmit = async (data: JobFormData, asDraft = false) => {
    console.log("Form submitted with data:", data);
    console.log("Form errors:", errors);

    try {
      setSubmitting(true);
      setIsDraft(asDraft);

      const jobData = {
        title: data.title,
        description: data.description,
        requirements: data.requirements,
        location: data.location,
        job_type: data.job_type,
        salary_min: data.salary_min,
        salary_max: data.salary_max,
        experience_level: data.experience_level,
        category: data.category,
        application_deadline: data.deadline,
        remote_allowed: data.remote_allowed || false,
        status: asDraft ? ("draft" as const) : ("pending" as const),
      };

      console.log("Creating job with data:", jobData);

      const response = await employerService.createJob(jobData);

      console.log("Job creation response:", response);
      console.log("Response success:", response.success);
      console.log("Response data:", response.data);
      console.log("Response id:", response.id);

      // Check if response has success property or if it's a successful response
      if (response.success || response.data || response.id) {
        console.log("Success condition met, showing success dialog");
        setSuccessMessage(
          language === "en"
            ? asDraft
              ? "Job saved as draft successfully"
              : "Job created successfully"
            : asDraft
            ? "تم حفظ الوظيفة كمسودة بنجاح"
            : "تم إنشاء الوظيفة بنجاح"
        );
        setShowSuccessModal(true);
      } else {
        console.log("Success condition NOT met, showing error dialog");
        console.log("Response message:", response.message);
        setErrorMessage(response.message || "Failed to create job");
        setShowErrorModal(true);
      }
    } catch (error: any) {
      console.error("Failed to create job:", error);

      let errorMsg = "Failed to create job. Please try again.";

      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        errorMsg = errorMessages.join(", ");
      } else if (error.message) {
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);
      setShowErrorModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccessModalHide = () => {
    setShowSuccessModal(false);
    router.push("/employer/jobs");
  };

  const handleErrorModalHide = () => {
    setShowErrorModal(false);
  };

  const jobTypes = [
    {
      value: "full-time",
      label: language === "en" ? "Full Time" : "دوام كامل",
    },
    {
      value: "part-time",
      label: language === "en" ? "Part Time" : "دوام جزئي",
    },
    { value: "contract", label: language === "en" ? "Contract" : "عقد" },
    { value: "internship", label: language === "en" ? "Internship" : "تدريب" },
  ];

  const experienceLevels = [
    { value: "entry", label: language === "en" ? "Entry Level" : "مبتدئ" },
    { value: "mid", label: language === "en" ? "Mid Level" : "متوسط" },
    { value: "senior", label: language === "en" ? "Senior Level" : "خبير" },
    { value: "lead", label: language === "en" ? "Lead Level" : "قائد" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {language === "en" ? "Post New Job" : "نشر وظيفة جديدة"}
              </h1>
              <p className="mt-2 text-gray-600">
                {language === "en"
                  ? "Create a new job posting to attract top talent"
                  : "أنشئ إعلان وظيفي جديد لجذب أفضل المواهب"}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form onSubmit event triggered");
                handleSubmit((data) => {
                  console.log("Form handleSubmit called with data:", data);
                  onSubmit(data, false);
                })();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "en" ? "Job Title" : "عنوان الوظيفة"}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      language === "en"
                        ? "Enter job title"
                        : "أدخل عنوان الوظيفة"
                    }
                    {...register("title")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "en" ? "Location" : "الموقع"}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      language === "en"
                        ? "Enter job location"
                        : "أدخل موقع الوظيفة"
                    }
                    {...register("location")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.location && (
                    <p className="text-sm text-red-600">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "en" ? "Job Type" : "نوع الوظيفة"}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    {...register("job_type")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.job_type && (
                    <p className="text-sm text-red-600">
                      {errors.job_type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "en" ? "Experience Level" : "مستوى الخبرة"}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    {...register("experience_level")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                  {errors.experience_level && (
                    <p className="text-sm text-red-600">
                      {errors.experience_level.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "en"
                      ? "Minimum Salary (SAR)"
                      : "الحد الأدنى للراتب (ريال)"}
                  </label>
                  <input
                    type="number"
                    placeholder="5000"
                    {...register("salary_min")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.salary_min && (
                    <p className="text-sm text-red-600">
                      {errors.salary_min.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "en"
                      ? "Maximum Salary (SAR)"
                      : "الحد الأقصى للراتب (ريال)"}
                  </label>
                  <input
                    type="number"
                    placeholder="10000"
                    {...register("salary_max")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.salary_max && (
                    <p className="text-sm text-red-600">
                      {errors.salary_max.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "en" ? "Category" : "الفئة"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      language === "en"
                        ? "e.g., Technology, Marketing"
                        : "مثل: التكنولوجيا، التسويق"
                    }
                    {...register("category")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.category && (
                    <p className="text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "en"
                      ? "Application Deadline"
                      : "موعد انتهاء التقديم"}
                  </label>
                  <input
                    type="date"
                    {...register("deadline")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.deadline && (
                    <p className="text-sm text-red-600">
                      {errors.deadline.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {language === "en" ? "Job Description" : "وصف الوظيفة"}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  placeholder={
                    language === "en"
                      ? "Describe the role and responsibilities..."
                      : "صف الدور والمسؤوليات..."
                  }
                  rows={6}
                  {...register("description")}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {language === "en" ? "Requirements" : "المتطلبات"}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  placeholder={
                    language === "en"
                      ? "List the required skills and qualifications..."
                      : "اذكر المهارات والمؤهلات المطلوبة..."
                  }
                  rows={4}
                  {...register("requirements")}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.requirements && (
                  <p className="text-sm text-red-600">
                    {errors.requirements.message}
                  </p>
                )}
              </div>

              {/* Remote Work Option */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("remote_allowed")}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {language === "en"
                      ? "Remote work allowed (optional)"
                      : "العمل عن بُعد مسموح (اختياري)"}
                  </span>
                </label>
                {errors.remote_allowed && (
                  <p className="text-sm text-red-600">
                    {errors.remote_allowed.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  variant="primary"
                  loading={submitting}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={(e) => {
                    console.log("Publish Job button clicked");
                    console.log("Form errors:", errors);
                    console.log("Form is valid:", isValid);
                    console.log("Form values:", formValues);
                    console.log("Submitting state:", submitting);

                    // Manually trigger form submission if validation passes
                    if (isValid) {
                      console.log("Form is valid, triggering submission");
                      handleSubmit((data) => {
                        console.log(
                          "Manual handleSubmit called with data:",
                          data
                        );
                        onSubmit(data, false);
                      })();
                    } else {
                      console.log("Form is invalid, preventing submission");
                    }
                  }}
                >
                  <PlusCircle className="w-4 h-4" />
                  {language === "en" ? "Publish Job" : "نشر الوظيفة"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSubmit((data) => onSubmit(data, true))}
                  loading={submitting}
                  className="cursor-pointer"
                >
                  {language === "en" ? "Save as Draft" : "حفظ كمسودة"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="cursor-pointer"
                >
                  {language === "en" ? "Cancel" : "إلغاء"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SuccessModal
        visible={showSuccessModal}
        onHide={handleSuccessModalHide}
        title={language === "en" ? "Success" : "نجح"}
        message={
          isDraft
            ? language === "en"
              ? "Your job has been saved as a draft. You can edit and publish it later."
              : "تم حفظ وظيفتك كمسودة. يمكنك تعديلها ونشرها لاحقاً."
            : language === "en"
            ? "Your job has been published successfully and is now visible to candidates."
            : "تم نشر وظيفتك بنجاح وهي الآن مرئية للمرشحين."
        }
        onConfirm={handleSuccessModalHide}
      />

      <ErrorModal
        visible={showErrorModal}
        onHide={handleErrorModalHide}
        title="Job Creation Failed"
        message={errorMessage}
        onConfirm={handleErrorModalHide}
      />
    </div>
  );
}

export default function CreateJobPage() {
  return (
    <ProtectedRoute>
      <CreateJobPageContent />
    </ProtectedRoute>
  );
}
