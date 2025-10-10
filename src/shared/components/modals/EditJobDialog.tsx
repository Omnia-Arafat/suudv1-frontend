"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Message } from "primereact/message";
import { useJobValidationSchema } from "@/shared/utils/validation";
import { employerService } from "@/shared/services/employer.service";
import { useI18n } from "@/shared/contexts";
import { Save, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface JobListing {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_type: string;
  salary_min?: number;
  salary_max?: number;
  category?: string;
  experience_level: string;
  application_deadline?: string;
  status: string;
}

interface JobFormData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  salary_min: string;
  salary_max: string;
  category: string;
  experience_level: string;
  expires_at: string;
  remote_allowed: boolean;
}

interface EditJobDialogProps {
  visible: boolean;
  onHide: () => void;
  job: JobListing | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export default function EditJobDialog({
  visible,
  onHide,
  job,
  onSuccess,
  onError,
}: EditJobDialogProps) {
  const { language, t } = useI18n();
  const [submitting, setSubmitting] = useState(false);

  const validationSchema = useJobValidationSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Watch form values for controlled components
  const formValues = watch();

  useEffect(() => {
    if (job && visible) {
      // Populate form with job data
      setValue("title", job.title);
      setValue("description", job.description);
      setValue("requirements", job.requirements);
      setValue("location", job.location);
      setValue(
        "type",
        job.job_type as "full-time" | "part-time" | "contract" | "internship"
      );
      setValue("salary_min", job.salary_min?.toString() || "");
      setValue("salary_max", job.salary_max?.toString() || "");
      setValue("category", job.category || "");
      setValue("experience_level", job.experience_level);
      setValue("expires_at", job.application_deadline || "");
      setValue("remote_allowed", false);
    }
  }, [job, visible, setValue]);

  const onSubmit = async (data: JobFormData, asDraft = false) => {
    if (!job) return;

    try {
      setSubmitting(true);

      const updateData = {
        title: data.title,
        description: data.description,
        requirements: data.requirements,
        location: data.location,
        job_type: data.type,
        salary_min: data.salary_min ? parseInt(data.salary_min) : undefined,
        salary_max: data.salary_max ? parseInt(data.salary_max) : undefined,
        experience_level: data.experience_level,
        category: data.category,
        application_deadline: data.expires_at || undefined,
        status: asDraft ? "draft" : "pending",
      };

      console.log("Updating job with data:", updateData);

      const response = await employerService.updateJob(job.id, updateData);

      console.log("Job update response:", response);

      if (response.success) {
        const successMessage = asDraft
          ? t("messages.jobSavedAsDraft")
          : t("messages.jobUpdatedSuccessfully");

        onSuccess(successMessage);
        onHide();
        reset();
      } else {
        onError(response.message || "Failed to update job");
      }
    } catch (error: unknown) {
      console.error("Failed to update job:", error);

      let errorMsg = "Failed to update job. Please try again.";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: { message?: string; errors?: Record<string, string[]> };
          };
        };
        if (axiosError.response?.data?.message) {
          errorMsg = axiosError.response.data.message;
        } else if (axiosError.response?.data?.errors) {
          const errors = axiosError.response.data.errors;
          const errorMessages = Object.values(errors).flat();
          errorMsg = errorMessages.join(", ");
        }
      } else if (error && typeof error === "object" && "message" in error) {
        errorMsg = (error as { message: string }).message;
      }

      onError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const jobTypes = [
    {
      value: "full-time",
      label: t("jobTypes.fullTime"),
    },
    {
      value: "part-time",
      label: t("jobTypes.partTime"),
    },
    { value: "contract", label: t("jobTypes.contract") },
    { value: "internship", label: t("jobTypes.internship") },
  ];

  const experienceLevels = [
    { value: "entry", label: t("experienceLevels.entry") },
    { value: "mid", label: t("experienceLevels.mid") },
    { value: "senior", label: t("experienceLevels.senior") },
    { value: "lead", label: t("experienceLevels.lead") },
  ];

  const handleCancel = () => {
    reset();
    onHide();
  };

  return (
    <AnimatePresence>
      {visible && (
        <Dialog
          visible={visible}
          onHide={handleCancel}
          header={
            <div className="flex items-center gap-4 px-6 py-5">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Save className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {t("job.editJob")}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {t("job.updateJobDetails")}
                </p>
              </div>
            </div>
          }
          style={{
            width: "90vw",
            maxWidth: "900px",
            borderRadius: "16px",
            boxShadow:
              "0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          }}
          modal
          className="p-dialog-maximized-responsive"
          contentStyle={{
            padding: "0",
            borderRadius: "0 0 16px 16px",
          }}
          headerStyle={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "none",
            borderRadius: "16px 16px 0 0",
            borderBottom: "1px solid #e5e7eb",
          }}
          footer={
            <div className="flex justify-end gap-3 px-6 py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 rounded-b-lg">
              <Button
                label={t("common.cancel")}
                icon={<X className="w-4 h-4" />}
                onClick={handleCancel}
                className="px-6 py-2.5 text-gray-600 bg-transparent border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              />
              <Button
                label={t("job.saveAsDraft")}
                onClick={handleSubmit((data) =>
                  onSubmit(data as JobFormData, true)
                )}
                loading={submitting}
                className="px-6 py-2.5 text-indigo-600 bg-transparent border border-indigo-300 rounded-xl hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 font-medium"
              />
              <Button
                label={t("job.updateJob")}
                icon={<Save className="w-4 h-4" />}
                onClick={handleSubmit((data) =>
                  onSubmit(data as JobFormData, false)
                )}
                loading={submitting}
                className="px-6 py-2.5 text-white bg-gradient-to-r from-indigo-600 to-indigo-700 border-0 rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
              />
            </div>
          }
        >
          <div className="px-6 py-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Job Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    {t("job.title")} *
                  </label>
                  <InputText
                    {...register("title")}
                    placeholder={t("job.enterJobTitle")}
                    className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md ${
                      errors.title ? "border-red-500 ring-red-200" : ""
                    }`}
                  />
                  {errors.title && (
                    <div className="mt-1">
                      <Message severity="error" text={errors.title.message} />
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    {t("job.location")} *
                  </label>
                  <InputText
                    {...register("location")}
                    placeholder={t("job.enterJobLocation")}
                    className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md ${
                      errors.location ? "border-red-500 ring-red-200" : ""
                    }`}
                  />
                  {errors.location && (
                    <div className="mt-1">
                      <Message
                        severity="error"
                        text={errors.location.message}
                      />
                    </div>
                  )}
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    {t("job.type")} *
                  </label>
                  <Dropdown
                    value={formValues.type}
                    onChange={(e) => setValue("type", e.value)}
                    options={jobTypes}
                    placeholder={t("job.selectJobType")}
                    className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md ${
                      errors.type ? "border-red-500 ring-red-200" : ""
                    }`}
                  />
                  {errors.type && (
                    <div className="mt-1">
                      <Message severity="error" text={errors.type.message} />
                    </div>
                  )}
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    {t("job.experienceLevel")} *
                  </label>
                  <Dropdown
                    value={formValues.experience_level}
                    onChange={(e) => setValue("experience_level", e.value)}
                    options={experienceLevels}
                    placeholder={t("job.selectExperienceLevel")}
                    className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md ${
                      errors.experience_level
                        ? "border-red-500 ring-red-200"
                        : ""
                    }`}
                  />
                  {errors.experience_level && (
                    <div className="mt-1">
                      <Message
                        severity="error"
                        text={errors.experience_level.message}
                      />
                    </div>
                  )}
                </div>

                {/* Minimum Salary */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    {t("job.minSalary")}
                  </label>
                  <InputText
                    {...register("salary_min")}
                    type="number"
                    placeholder="5000"
                    className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md ${
                      errors.salary_min ? "border-red-500 ring-red-200" : ""
                    }`}
                  />
                  {errors.salary_min && (
                    <div className="mt-1">
                      <Message
                        severity="error"
                        text={errors.salary_min.message}
                      />
                    </div>
                  )}
                </div>

                {/* Maximum Salary */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    {t("job.maxSalary")}
                  </label>
                  <InputText
                    {...register("salary_max")}
                    type="number"
                    placeholder="10000"
                    className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md ${
                      errors.salary_max ? "border-red-500 ring-red-200" : ""
                    }`}
                  />
                  {errors.salary_max && (
                    <div className="mt-1">
                      <Message
                        severity="error"
                        text={errors.salary_max.message}
                      />
                    </div>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    {t("job.category")}
                  </label>
                  <InputText
                    {...register("category")}
                    placeholder={t("job.categoryExample")}
                    className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md ${
                      errors.category ? "border-red-500 ring-red-200" : ""
                    }`}
                  />
                  {errors.category && (
                    <div className="mt-1">
                      <Message
                        severity="error"
                        text={errors.category.message}
                      />
                    </div>
                  )}
                </div>

                {/* Application Deadline */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    {t("job.deadline")}
                  </label>
                  <Calendar
                    value={
                      formValues.expires_at
                        ? new Date(formValues.expires_at)
                        : null
                    }
                    onChange={(e) => {
                      const date = e.value as Date;
                      setValue(
                        "expires_at",
                        date ? date.toISOString().split("T")[0] : ""
                      );
                    }}
                    dateFormat="yy-mm-dd"
                    placeholder={t("job.selectDeadline")}
                    className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md ${
                      errors.expires_at ? "border-red-500 ring-red-200" : ""
                    }`}
                  />
                  {errors.expires_at && (
                    <div className="mt-1">
                      <Message
                        severity="error"
                        text={errors.expires_at.message}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  {t("job.description")} *
                </label>
                <InputTextarea
                  {...register("description")}
                  placeholder={t("job.describeRole")}
                  rows={6}
                  className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md ${
                    errors.description ? "border-red-500 ring-red-200" : ""
                  }`}
                />
                {errors.description && (
                  <div className="mt-1">
                    <Message
                      severity="error"
                      text={errors.description.message}
                    />
                  </div>
                )}
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  {t("job.requirements")} *
                </label>
                <InputTextarea
                  {...register("requirements")}
                  placeholder={t("job.listSkills")}
                  rows={4}
                  className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md ${
                    errors.requirements ? "border-red-500 ring-red-200" : ""
                  }`}
                />
                {errors.requirements && (
                  <div className="mt-1">
                    <Message
                      severity="error"
                      text={errors.requirements.message}
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
