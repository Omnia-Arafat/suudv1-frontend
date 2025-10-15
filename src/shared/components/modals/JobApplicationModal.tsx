"use client";

import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useAuth } from "@/shared/contexts/AuthContext";
import { applicationService } from "@/shared/services/application.service";
import type { JobListing } from "@/shared/types";
import { AnimatePresence, motion } from "framer-motion";

interface JobApplicationModalProps {
  job: JobListing | null;
  visible: boolean;
  onHide: () => void;
  onSuccess?: () => void;
}

export default function JobApplicationModal({
  job,
  visible,
  onHide,
  onSuccess,
}: JobApplicationModalProps) {
  const { user } = useAuth();
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    coverLetter: "",
    phone: user?.phone || "",
    resumeFile: null as File | null,
  });

  const handleSubmit = async () => {
    if (!job || !user) return;

    // Check if user is an employee
    if (user.role !== "employee") {
      toast.current?.show({
        severity: "error",
        summary: "Access Denied",
        detail:
          "Only employees can apply for jobs. Please switch to an employee account.",
        life: 4000,
      });
      return;
    }

    if (!formData.coverLetter.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Cover Letter Required",
        detail: "Please write a cover letter for this position.",
        life: 3000,
      });
      return;
    }

    if (!formData.phone.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Phone Number Required",
        detail: "Please provide your phone number.",
        life: 3000,
      });
      return;
    }

    try {
      setLoading(true);

      const applicationData = new FormData();
      applicationData.append("job_listing_id", job.id.toString());
      applicationData.append("cover_letter", formData.coverLetter);
      applicationData.append("phone", formData.phone);

      if (formData.resumeFile) {
        applicationData.append("resume", formData.resumeFile);
      }

      await applicationService.submitApplication(applicationData);

      toast.current?.show({
        severity: "success",
        summary: "Application Submitted Successfully! 🎉",
        detail: `Your application for "${job.title}" has been sent.`,
        life: 4000,
      });

      // Reset form
      setFormData({
        coverLetter: "",
        phone: user?.phone || "",
        resumeFile: null,
      });

      onHide();
      onSuccess?.();
    } catch (error) {
      console.error("Failed to submit application:", error);
      toast.current?.show({
        severity: "error",
        summary: "Application Failed to Submit ❌",
        detail: "Please check your connection and try again.",
        life: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.current?.show({
          severity: "error",
          summary: "Invalid File Type ⚠️",
          detail: "Please select a PDF, DOC, or DOCX file.",
          life: 3000,
        });
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5000000) {
        toast.current?.show({
          severity: "error",
          summary: "File Too Large 📁",
          detail: "File size must be less than 5MB.",
          life: 3000,
        });
        return;
      }

      setFormData((prev) => ({ ...prev, resumeFile: file }));
      toast.current?.show({
        severity: "success",
        summary: "Resume Uploaded Successfully! 📄",
        detail: `"${file.name}" has been attached.`,
        life: 3000,
      });
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleClose = () => {
    setFormData({
      coverLetter: "",
      phone: user?.phone || "",
      resumeFile: null,
    });
    onHide();
  };

  if (!job) return null;

  return (
    <>
      <Toast ref={toast} />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      Apply for {job.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Complete your application below
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                  >
                    <i className="pi pi-times text-gray-600 text-lg"></i>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-8 space-y-8">
                {/* Job Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="pi pi-briefcase text-blue-600 text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl sm:text-2xl text-blue-900 mb-2">
                        {job.title}
                      </h3>
                      <p className="text-blue-700 font-semibold mb-2 text-lg">
                        {job.company?.company_name}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-blue-600 mb-3">
                        <span className="flex items-center gap-1">
                          <i className="pi pi-map-marker text-sm"></i>
                          <span className="text-sm sm:text-base">
                            {job.location}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="pi pi-clock text-sm"></i>
                          <span className="text-sm sm:text-base">
                            {job.job_type}
                          </span>
                        </span>
                      </div>
                      {job.salary_min && job.salary_max && (
                        <div className="flex items-center gap-2">
                          <i className="pi pi-dollar text-green-600"></i>
                          <p className="text-green-600 font-bold text-lg">
                            {job.salary_currency}{" "}
                            {job.salary_min.toLocaleString()} -{" "}
                            {job.salary_max.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Application Form */}
                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <label
                      htmlFor="phone"
                      className="block text-base font-bold text-gray-800 mb-4"
                    >
                      Phone Number *
                    </label>
                    <div className="relative">
                      <InputText
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="Enter your phone number"
                        className="w-full h-14 px-5 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:bg-white"
                        required
                      />
                      <i className="pi pi-phone absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <label
                      htmlFor="coverLetter"
                      className="block text-base font-bold text-gray-800 mb-4"
                    >
                      Cover Letter *
                    </label>
                    <div className="relative">
                      <InputTextarea
                        id="coverLetter"
                        value={formData.coverLetter}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            coverLetter: e.target.value,
                          }))
                        }
                        rows={7}
                        placeholder="Tell us why you're the perfect candidate for this position..."
                        className="w-full px-5 py-4 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:bg-white resize-none"
                        required
                      />
                      <div className="absolute bottom-4 right-4 text-sm text-gray-400 bg-white px-2 py-1 rounded-lg shadow-sm">
                        {formData.coverLetter.length}/500
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-3 flex items-center gap-2">
                      <i className="pi pi-info-circle text-blue-500"></i>
                      Share your motivation, relevant experience, and why
                      you&apos;re interested in this role.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <label className="block text-base font-bold text-gray-800 mb-4">
                      Resume (Optional)
                    </label>
                    <div className="relative">
                      {!formData.resumeFile ? (
                        <div
                          className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group cursor-pointer relative"
                          onDragOver={handleDragOver}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileInputChange}
                            className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <i className="pi pi-cloud-upload text-2xl text-blue-600"></i>
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                Upload Your Resume
                              </h4>
                              <p className="text-sm text-gray-600 mb-3">
                                Drag and drop your resume here, or{" "}
                                <span className="text-blue-600 font-medium">
                                  click to browse
                                </span>
                              </p>
                              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <i className="pi pi-file-pdf text-red-500"></i>
                                  <span>PDF</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <i className="pi pi-file text-blue-500"></i>
                                  <span>DOC</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <i className="pi pi-file text-green-500"></i>
                                  <span>DOCX</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-400 mt-2">
                                Maximum file size: 5MB
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <i className="pi pi-file text-green-600 text-xl"></i>
                              </div>
                              <div>
                                <h5 className="font-semibold text-green-900 text-sm">
                                  {formData.resumeFile.name}
                                </h5>
                                <p className="text-xs text-green-700">
                                  {(
                                    formData.resumeFile.size /
                                    1024 /
                                    1024
                                  ).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                                <i className="pi pi-check text-green-700 text-sm"></i>
                              </div>
                              <button
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    resumeFile: null,
                                  }))
                                }
                                className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-200"
                                title="Remove file"
                              >
                                <i className="pi pi-times text-red-600 text-sm"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <small className="text-gray-500 text-sm mt-4 block">
                      {user?.cv_path && (
                        <span className="inline-flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                          <i className="pi pi-info-circle text-blue-500"></i>
                          You can also use your profile CV as a fallback
                        </span>
                      )}
                    </small>
                  </div>

                  {user?.cv_path && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 shadow-sm">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                          <i className="pi pi-check text-green-600 text-xl"></i>
                        </div>
                        <div>
                          <p className="text-base font-bold text-green-900 mb-1">
                            Profile CV Available
                          </p>
                          <p className="text-sm text-green-700">
                            Your uploaded CV will be used as fallback if no file
                            is selected
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tips */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-sm">
                  <h4 className="font-bold text-lg text-amber-900 mb-4 flex items-center">
                    <i className="pi pi-lightbulb mr-3 text-amber-600 text-xl"></i>
                    Application Tips
                  </h4>
                  <ul className="text-sm text-amber-800 space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-amber-600 text-xs font-bold">
                          1
                        </span>
                      </div>
                      <span>
                        Customize your cover letter for this specific position
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-amber-600 text-xs font-bold">
                          2
                        </span>
                      </div>
                      <span>Highlight relevant skills and experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-amber-600 text-xs font-bold">
                          3
                        </span>
                      </div>
                      <span>Keep your message professional and concise</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-amber-600 text-xs font-bold">
                          4
                        </span>
                      </div>
                      <span>Double-check for spelling and grammar</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50 rounded-b-3xl">
                <div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-6">
                  <Button
                    label="Cancel"
                    onClick={handleClose}
                    className="px-8 py-4 text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg transition-all duration-200 font-semibold text-base w-full sm:w-auto"
                    disabled={loading}
                  />
                  <Button
                    label={loading ? "Submitting..." : "Submit Application"}
                    onClick={handleSubmit}
                    className="px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-indigo-600 border-0 rounded-xl hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold text-base w-full sm:w-auto"
                    loading={loading}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
