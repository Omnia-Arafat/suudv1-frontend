import { apiClient } from "./api";
import type { ApiResponse } from "@/shared/types";

class EmployerService {
  /**
   * Get employer dashboard data
   */
  async getDashboardData(): Promise<any> {
    const response = await apiClient.get("/employer/dashboard");
    return response.data;
  }

  /**
   * Get employer's job postings
   */
  async getMyJobs(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    search?: string;
  }): Promise<any> {
    const response = await apiClient.get("/employer/jobs", { params });
    return response.data;
  }

  /**
   * Create a new job posting
   */
  async createJob(jobData: {
    title: string;
    description: string;
    requirements: string;
    location: string;
    job_type: string;
    salary_min?: number;
    salary_max?: number;
    experience_level?: string;
    category?: string;
    application_deadline?: string;
    positions_available?: number;
    skills?: string[];
    status?: "draft" | "pending";
  }): Promise<any> {
    const response = await apiClient.post("/jobs", jobData);
    return response.data;
  }

  /**
   * Update an existing job posting
   */
  async updateJob(jobId: number, jobData: any): Promise<any> {
    const response = await apiClient.put(`/jobs/${jobId}`, jobData);
    return response.data;
  }

  /**
   * Delete a job posting
   */
  async deleteJob(jobId: number): Promise<any> {
    const response = await apiClient.delete(`/jobs/${jobId}`);
    return response.data;
  }

  /**
   * Get applications for employer's jobs
   */
  async getJobApplications(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    job_id?: string;
    search?: string;
  }): Promise<any> {
    const response = await apiClient.get("/employer/applications", { params });
    return response.data;
  }

  /**
   * Update application status (accept/reject)
   */
  async updateApplicationStatus(
    applicationId: number,
    status: "pending" | "reviewed" | "accepted" | "rejected",
    notes?: string
  ): Promise<any> {
    const response = await apiClient.patch(
      `/employer/applications/${applicationId}/status`,
      {
        status,
        notes,
      }
    );
    return response.data;
  }

  /**
   * Get company profile
   */
  async getCompany(): Promise<any> {
    const response = await apiClient.get("/employer/company");
    return response.data;
  }

  /**
   * Update company profile
   */
  async updateCompany(companyData: {
    name?: string;
    description?: string;
    industry?: string;
    website?: string;
    phone?: string;
    address?: string;
    employee_count?: number;
    founded_year?: number;
  }): Promise<any> {
    const response = await apiClient.patch("/employer/company", companyData);
    return response.data;
  }

  /**
   * Upload company logo
   */
  async uploadCompanyLogo(logoFile: File): Promise<any> {
    const formData = new FormData();
    formData.append("logo", logoFile);

    const response = await apiClient.post("/employer/company/logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  /**
   * Get hiring analytics
   */
  async getAnalytics(): Promise<any> {
    const response = await apiClient.get("/employer/analytics");
    return response.data;
  }

  /**
   * Get candidates (browse available talent)
   */
  async getCandidates(params?: {
    page?: number;
    per_page?: number;
    specialization?: string;
    location?: string;
    experience_level?: string;
    search?: string;
  }): Promise<any> {
    const response = await apiClient.get("/candidates", { params });
    return response.data;
  }

  /**
   * Change employer password
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<any> {
    const response = await apiClient.patch("/employer/password", {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPassword,
    });
    return response.data;
  }

  /**
   * Get specific job details with applications
   */
  async getJobDetails(jobId: number): Promise<any> {
    const response = await apiClient.get(`/jobs/${jobId}`);
    return response.data;
  }

  /**
   * Clone/duplicate a job posting
   */
  async cloneJob(jobId: number): Promise<any> {
    const response = await apiClient.post(`/employer/jobs/${jobId}/clone`);
    return response.data;
  }

  /**
   * Get job posting statistics
   */
  async getJobStats(jobId: number): Promise<any> {
    const response = await apiClient.get(`/employer/jobs/${jobId}/stats`);
    return response.data;
  }
}

export const employerService = new EmployerService();
