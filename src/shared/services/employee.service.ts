import { apiClient } from "./api";
import type { ApiResponse } from "@/shared/types";

class EmployeeService {
  /**
   * Get employee dashboard data
   */
  async getDashboardData(): Promise<any> {
    const response = await apiClient.get("/employee/dashboard");
    return response.data;
  }

  /**
   * Get employee's applications
   */
  async getMyApplications(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    search?: string;
  }): Promise<any> {
    const response = await apiClient.get("/employee/applications", { params });
    return response.data;
  }

  /**
   * Get available jobs for employee
   */
  async getAvailableJobs(params?: {
    page?: number;
    per_page?: number;
    location?: string;
    employment_type?: string;
    experience_level?: string;
    search?: string;
    sort?: string;
  }): Promise<any> {
    const response = await apiClient.get("/employee/jobs", { params });
    return response.data;
  }

  /**
   * Apply for a job
   */
  async applyForJob(
    jobId: number,
    applicationData: {
      cover_letter?: string;
      expected_salary?: number;
    }
  ): Promise<any> {
    const response = await apiClient.post("/applications", {
      job_listing_id: jobId,
      cover_letter: applicationData.cover_letter,
    });
    return response.data;
  }

  /**
   * Save a job for later
   */
  async saveJob(jobId: number): Promise<any> {
    const response = await apiClient.post("/saved-jobs", {
      job_listing_id: jobId,
    });
    return response.data;
  }

  /**
   * Get saved jobs
   */
  async getSavedJobs(): Promise<any> {
    const response = await apiClient.get("/saved-jobs");
    return response.data;
  }

  /**
   * Remove job from saved
   */
  async removeSavedJob(jobId: number): Promise<any> {
    const response = await apiClient.delete(`/saved-jobs/${jobId}`);
    return response.data;
  }

  /**
   * Withdraw application
   */
  async withdrawApplication(applicationId: number): Promise<any> {
    const response = await apiClient.delete(`/applications/${applicationId}`);
    return response.data;
  }

  /**
   * Get employee profile
   */
  async getProfile(): Promise<any> {
    const response = await apiClient.get("/employee/profile");
    return response.data;
  }

  /**
   * Update employee profile
   */
  async updateProfile(profileData: {
    name?: string;
    specialization?: string;
    university?: string;
    profile_summary?: string;
    phone?: string;
    location?: string;
  }): Promise<any> {
    const response = await apiClient.patch("/employee/profile", profileData);
    return response.data;
  }

  /**
   * Upload profile avatar
   */
  async uploadAvatar(avatarFile: File): Promise<any> {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await apiClient.post(
      "/employee/profile/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  /**
   * Upload CV
   */
  async uploadCV(cvFile: File): Promise<any> {
    const formData = new FormData();
    formData.append("cv", cvFile);

    const response = await apiClient.post("/employee/profile/cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  /**
   * Get application statistics
   */
  async getApplicationStats(): Promise<any> {
    const response = await apiClient.get("/employee/stats");
    return response.data;
  }

  /**
   * Change employee password
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<any> {
    const response = await apiClient.patch("/employee/password", {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPassword,
    });
    return response.data;
  }

  /**
   * Save/unsave a job
   */
  async toggleSaveJob(jobId: number): Promise<any> {
    const response = await apiClient.post("/employee/saved-jobs", {
      job_id: jobId,
    });
    return response.data;
  }

  /**
   * Get saved jobs
   */
  async getSavedJobs(params?: {
    page?: number;
    per_page?: number;
  }): Promise<any> {
    const response = await apiClient.get("/employee/saved-jobs", { params });
    return response.data;
  }

  /**
   * Get job recommendations based on profile
   */
  async getRecommendedJobs(params?: {
    page?: number;
    per_page?: number;
  }): Promise<any> {
    const response = await apiClient.get("/employee/recommended-jobs", {
      params,
    });
    return response.data;
  }

  /**
   * Get specific job details
   */
  async getJobDetails(jobId: number): Promise<any> {
    const response = await apiClient.get(`/jobs/${jobId}`);
    return response.data;
  }

  /**
   * Search jobs
   */
  async searchJobs(
    query: string,
    filters?: {
      location?: string;
      employment_type?: string;
      experience_level?: string;
      salary_min?: number;
      salary_max?: number;
    }
  ): Promise<any> {
    const response = await apiClient.get("/jobs/search", {
      params: {
        q: query,
        ...filters,
      },
    });
    return response.data;
  }

  /**
   * Get application details
   */
  async getApplicationDetails(applicationId: number): Promise<any> {
    const response = await apiClient.get(`/applications/${applicationId}`);
    return response.data;
  }

  /**
   * Get job filters/categories
   */
  async getJobFilters(): Promise<any> {
    const response = await apiClient.get("/jobs/filters");
    return response.data;
  }

  /**
   * Search jobs
   */
  async searchJobs(
    query: string,
    filters?: {
      location?: string;
      employment_type?: string;
      experience_level?: string;
      salary_min?: number;
      salary_max?: number;
    }
  ): Promise<any> {
    const response = await apiClient.get("/jobs/search", {
      params: {
        q: query,
        ...filters,
      },
    });
    return response.data;
  }
}

export const employeeService = new EmployeeService();
