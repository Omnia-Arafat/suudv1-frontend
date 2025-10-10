import { apiClient } from "./api";

class EmployeeService {
  /**
   * Get employee dashboard data
   */
  async getDashboardData(): Promise<any> {
    const response = await apiClient.get("/employee/dashboard");
    return response;
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
    return response;
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
    return response;
  }

  /**
   * Get jobs (alias for getAvailableJobs for backward compatibility)
   */
  async getJobs(params?: {
    page?: number;
    per_page?: number;
    location?: string;
    employment_type?: string;
    experience_level?: string;
    search?: string;
    sort?: string;
  }): Promise<any> {
    return this.getAvailableJobs(params);
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
    return response;
  }

  /**
   * Save a job for later
   */
  async saveJob(jobId: number): Promise<any> {
    const response = await apiClient.post("/saved-jobs", {
      job_listing_id: jobId,
    });
    return response;
  }

  /**
   * Remove job from saved
   */
  async removeSavedJob(jobId: number): Promise<any> {
    const response = await apiClient.delete(`/saved-jobs/${jobId}`);
    return response;
  }

  /**
   * Withdraw application
   */
  async withdrawApplication(applicationId: number): Promise<any> {
    const response = await apiClient.delete(`/applications/${applicationId}`);
    return response;
  }

  /**
   * Get employee profile
   */
  async getProfile(): Promise<any> {
    const response = await apiClient.get("/employee/profile");
    return response;
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
    return response;
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
    return response;
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
    return response;
  }

  /**
   * Get application statistics
   */
  async getApplicationStats(): Promise<any> {
    const response = await apiClient.get("/employee/stats");
    return response;
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
    return response;
  }

  /**
   * Save/unsave a job
   */
  async toggleSaveJob(jobId: number): Promise<any> {
    const response = await apiClient.post("/employee/saved-jobs", {
      job_id: jobId,
    });
    return response;
  }

  /**
   * Get saved jobs
   */
  async getSavedJobs(params?: {
    page?: number;
    per_page?: number;
  }): Promise<any> {
    const response = await apiClient.get("/employee/saved-jobs", { params });
    return response;
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
    return response;
  }

  /**
   * Get learning resources and courses
   */
  async getLearningResources(params?: {
    page?: number;
    per_page?: number;
    category?: string;
    difficulty?: string;
  }): Promise<any> {
    const response = await apiClient.get("/employee/learning-resources", {
      params,
    });
    return response;
  }

  /**
   * Get specific job details
   */
  async getJobDetails(jobId: number): Promise<any> {
    const response = await apiClient.get(`/jobs/${jobId}`);
    return response;
  }

  /**
   * Get application details
   */
  async getApplicationDetails(applicationId: number): Promise<any> {
    const response = await apiClient.get(`/applications/${applicationId}`);
    return response;
  }

  /**
   * Get job filters/categories
   */
  async getJobFilters(): Promise<any> {
    const response = await apiClient.get("/jobs/filters");
    return response;
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
    return response;
  }
}

export const employeeService = new EmployeeService();
