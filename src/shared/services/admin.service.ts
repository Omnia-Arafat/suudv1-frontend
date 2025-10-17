import {
  mockAdminDashboardData,
  mockUsers,
  mockJobs,
  mockApplications,
  mockCompanies,
  simulateApiDelay,
  getPaginatedData,
} from "@/shared/data/mockData";

class AdminService {
  /**
   * Get admin dashboard data - Mock implementation
   */
  async getDashboardData(): Promise<any> {
    console.log("👑 Mock getDashboardData");
    await simulateApiDelay(800);

    return {
      success: true,
      data: mockAdminDashboardData,
      message: "Dashboard data retrieved successfully",
    };
  }

  /**
   * Get all users with filters and pagination - Mock implementation
   */
  async getUsers(params?: {
    page?: number;
    per_page?: number;
    role?: string;
    status?: string;
    search?: string;
  }): Promise<any> {
    console.log("👑 Mock getUsers with params:", params);
    await simulateApiDelay(600);

    let users = [...mockUsers];

    if (params?.role) {
      users = users.filter((user) => user.role === params.role);
    }

    if (params?.status) {
      const isActive = params.status === "active";
      users = users.filter((user) => user.is_active === isActive);
    }

    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );
    }

    const paginatedData = getPaginatedData(
      users,
      params?.page || 1,
      params?.per_page || 10
    );

    return {
      success: true,
      data: paginatedData,
      message: "Users retrieved successfully",
    };
  }

  /**
   * Get all job postings for moderation - Mock implementation
   */
  async getJobs(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    search?: string;
  }): Promise<any> {
    console.log("👑 Mock getJobs with params:", params);
    await simulateApiDelay(600);

    let jobs = [...mockJobs];

    if (params?.status) {
      jobs = jobs.filter((job) => job.status === params.status);
    }

    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.company?.name.toLowerCase().includes(searchTerm)
      );
    }

    const paginatedData = getPaginatedData(
      jobs,
      params?.page || 1,
      params?.per_page || 10
    );

    return {
      success: true,
      data: paginatedData,
      message: "Jobs retrieved successfully",
    };
  }

  /**
   * Get all applications for oversight - Mock implementation
   */
  async getApplications(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    search?: string;
  }): Promise<any> {
    console.log("👑 Mock getApplications with params:", params);
    await simulateApiDelay(600);

    let applications = [...mockApplications];

    if (params?.status) {
      applications = applications.filter((app) => app.status === params.status);
    }

    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      applications = applications.filter(
        (app) =>
          app.user?.name.toLowerCase().includes(searchTerm) ||
          app.job_listing?.title.toLowerCase().includes(searchTerm) ||
          app.job_listing?.company?.name.toLowerCase().includes(searchTerm)
      );
    }

    const paginatedData = getPaginatedData(
      applications,
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
   * Update user status (activate/deactivate)
   */
  async updateUserStatus(userId: number, isActive: boolean): Promise<any> {
    const response = await apiClient.patch(`/admin/users/${userId}/status`, {
      is_active: isActive,
    });
    return response;
  }

  /**
   * Get all companies pending verification
   */
  async getPendingCompanies(): Promise<any> {
    const response = await apiClient.get("/admin/companies?status=pending");
    return response;
  }

  /**
   * Approve or reject company verification
   */
  async updateCompanyVerification(
    companyId: number,
    approved: boolean
  ): Promise<any> {
    const response = await apiClient.patch(
      `/admin/companies/${companyId}/verification`,
      {
        is_verified: approved,
      }
    );
    return response;
  }

  /**
   * Get all job postings for moderation
   */
  async getJobs(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    search?: string;
  }): Promise<any> {
    const response = await apiClient.get("/admin/jobs", { params });
    return response;
  }

  /**
   * Get job details for admin review
   */
  async getJobDetails(jobId: number): Promise<any> {
    const response = await apiClient.get(`/admin/jobs/${jobId}/details`);
    return response;
  }

  /**
   * Approve job posting
   */
  async approveJob(jobId: number): Promise<any> {
    const response = await apiClient.patch(`/admin/jobs/${jobId}/approve`);
    return response;
  }

  /**
   * Decline job posting
   */
  async declineJob(jobId: number, reason: string): Promise<any> {
    const response = await apiClient.patch(`/admin/jobs/${jobId}/decline`, {
      reason,
    });
    return response;
  }

  /**
   * Get all applications for oversight
   */
  async getApplications(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    search?: string;
  }): Promise<any> {
    const response = await apiClient.get("/admin/applications", { params });
    return response;
  }

  /**
   * Get contact form submissions
   */
  async getContacts(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    search?: string;
  }): Promise<any> {
    const response = await apiClient.get("/admin/contacts", { params });
    return response;
  }

  /**
   * Mark contact as read/replied
   */
  async updateContactStatus(
    contactId: number,
    status: "read" | "replied"
  ): Promise<any> {
    const response = await apiClient.patch(
      `/admin/contacts/${contactId}/status`,
      {
        status,
      }
    );
    return response;
  }

  /**
   * Get platform analytics
   */
  async getAnalytics(): Promise<any> {
    const response = await apiClient.get("/admin/analytics");
    return response;
  }

  /**
   * Delete user (admin action)
   */
  async deleteUser(userId: number): Promise<any> {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return response;
  }

  /**
   * Get system reports
   */
  async getSystemReports(): Promise<any> {
    const response = await apiClient.get("/admin/reports");
    return response;
  }
}

export const adminService = new AdminService();
