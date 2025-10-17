import {
  mockEmployeeDashboardData,
  mockJobs,
  mockApplications,
  simulateApiDelay,
  getPaginatedData,
} from "@/shared/data/mockData";

class EmployeeService {
  /**
   * Get employee dashboard data - Mock implementation
   */
  async getDashboardData(): Promise<any> {
    console.log("👤 Mock getDashboardData");
    await simulateApiDelay(800);

    return {
      success: true,
      data: mockEmployeeDashboardData,
      message: "Dashboard data retrieved successfully",
    };
  }

  /**
   * Get employee's applications - Mock implementation
   */
  async getMyApplications(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    search?: string;
  }): Promise<any> {
    console.log("👤 Mock getMyApplications with params:", params);
    await simulateApiDelay(600);

    // Filter applications for current user (assuming user ID 1)
    let myApplications = mockApplications.filter((app) => app.user_id === 1);

    if (params?.status) {
      myApplications = myApplications.filter(
        (app) => app.status === params.status
      );
    }

    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      myApplications = myApplications.filter(
        (app) =>
          app.job_listing?.title.toLowerCase().includes(searchTerm) ||
          app.job_listing?.company?.name.toLowerCase().includes(searchTerm)
      );
    }

    const paginatedData = getPaginatedData(
      myApplications,
      params?.page || 1,
      params?.per_page || 10
    );

    return {
      success: true,
      data: paginatedData,
      message: "Applications retrieved successfully",
    };
  }

  /**
   * Get available jobs for employee - Mock implementation
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
    console.log("👤 Mock getAvailableJobs with params:", params);
    await simulateApiDelay(700);

    let availableJobs = mockJobs.filter((job) => job.status === "active");

    // Apply filters
    if (params?.location) {
      availableJobs = availableJobs.filter(
        (job) => job.location === params.location
      );
    }

    if (params?.employment_type) {
      availableJobs = availableJobs.filter(
        (job) => job.job_type === params.employment_type
      );
    }

    if (params?.experience_level) {
      availableJobs = availableJobs.filter(
        (job) => job.experience_level === params.experience_level
      );
    }

    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      availableJobs = availableJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.company?.name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    if (params?.sort) {
      switch (params.sort) {
        case "newest":
          availableJobs.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          break;
        case "salary_high":
          availableJobs.sort(
            (a, b) => (b.salary_max || 0) - (a.salary_max || 0)
          );
          break;
        case "salary_low":
          availableJobs.sort(
            (a, b) => (a.salary_min || 0) - (b.salary_min || 0)
          );
          break;
        case "popular":
          availableJobs.sort(
            (a, b) => (b.views_count || 0) - (a.views_count || 0)
          );
          break;
      }
    }

    const paginatedData = getPaginatedData(
      availableJobs,
      params?.page || 1,
      params?.per_page || 12
    );

    return {
      success: true,
      data: paginatedData,
      message: "Available jobs retrieved successfully",
    };
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
   * Apply for a job - Mock implementation
   */
  async applyForJob(
    jobId: number,
    applicationData: {
      cover_letter?: string;
      expected_salary?: number;
    }
  ): Promise<any> {
    console.log(
      "👤 Mock applyForJob with jobId:",
      jobId,
      "data:",
      applicationData
    );
    await simulateApiDelay(1000);

    const job = mockJobs.find((j) => j.id === jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    // Check if already applied
    const existingApplication = mockApplications.find(
      (app) => app.job_listing_id === jobId && app.user_id === 1
    );
    if (existingApplication) {
      throw new Error("You have already applied for this job");
    }

    const newApplication = {
      id: mockApplications.length + 1,
      job_listing_id: jobId,
      job_listing: job,
      user_id: 1,
      user: mockUsers[0], // Mock employee user
      cover_letter: applicationData.cover_letter || "",
      status: "pending",
      applied_at: new Date().toISOString(),
      reviewed_at: null,
      notes: null,
    };

    mockApplications.push(newApplication);

    // Update job applications count
    job.applications_count = (job.applications_count || 0) + 1;

    return {
      success: true,
      data: newApplication,
      message: "Application submitted successfully",
    };
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
