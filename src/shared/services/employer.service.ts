import { apiClient } from "./api";
import type { ApiResponse } from "@/shared/types";

class EmployerService {
  /**
   * Get employer dashboard data
   */
  async getDashboardData(): Promise<any> {
    const response = await apiClient.get("/employer/dashboard");
    return response;
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
    return response;
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
    return response;
  }

  /**
   * Update an existing job posting
   */
  async updateJob(jobId: number, jobData: any): Promise<any> {
    const response = await apiClient.put(`/jobs/${jobId}`, jobData);
    return response;
  }

  /**
   * Delete a job posting
   */
  async deleteJob(jobId: number): Promise<any> {
    const response = await apiClient.delete(`/jobs/${jobId}`);
    return response;
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
    return response;
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
    return response;
  }

  /**
   * Get company profile
   */
  async getCompany(): Promise<any> {
    const response = await apiClient.get("/employer/company");
    return response;
  }

  /**
   * Get company profile (alias for getCompany)
   */
  async getCompanyProfile(): Promise<any> {
    return this.getCompany();
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
    return response;
  }

  /**
   * Update company profile (alias for updateCompany)
   */
  async updateCompanyProfile(companyData: any): Promise<any> {
    return this.updateCompany(companyData);
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
    return response;
  }

  /**
   * Get hiring analytics
   */
  async getAnalytics(params?: { period?: string }): Promise<any> {
    const response = await apiClient.get("/employer/analytics", { params });
    return response;
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
    skills?: string;
    sort_by?: string;
  }): Promise<any> {
    const response = await apiClient.get("/candidates", { params });
    return response;
  }

  /**
   * Toggle candidate favorite status
   */
  async toggleCandidateFavorite(candidateId: number): Promise<any> {
    const response = await apiClient.post(
      `/candidates/${candidateId}/favorite`
    );
    return response;
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
    return response;
  }

  /**
   * Get specific job details with applications
   */
  async getJobDetails(jobId: number): Promise<any> {
    const response = await apiClient.get(`/jobs/${jobId}`);
    return response;
  }

  /**
   * Clone/duplicate a job posting
   */
  async cloneJob(jobId: number): Promise<any> {
    const response = await apiClient.post(`/employer/jobs/${jobId}/clone`);
    return response;
  }

  /**
   * Get job posting statistics
   */
  async getJobStats(jobId: number): Promise<any> {
    const response = await apiClient.get(`/employer/jobs/${jobId}/stats`);
    return response;
  }
}

export const employerService = new EmployerService();
