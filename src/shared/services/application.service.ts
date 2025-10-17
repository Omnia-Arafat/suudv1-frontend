import {
  mockApplications,
  mockJobs,
  mockUsers,
  simulateApiDelay,
  getPaginatedData,
} from "@/shared/data/mockData";

class ApplicationService {
  /**
   * Submit a job application - Mock implementation
   */
  async submitApplication(applicationData: FormData): Promise<any> {
    console.log("📝 Mock submitApplication with data:", applicationData);
    await simulateApiDelay(1000);

    // Extract data from FormData (simplified for mock)
    const jobId = applicationData.get("job_listing_id");
    const coverLetter = applicationData.get("cover_letter");

    if (!jobId) {
      throw new Error("Job ID is required");
    }

    const job = mockJobs.find((j) => j.id === Number(jobId));
    if (!job) {
      throw new Error("Job not found");
    }

    const newApplication = {
      id: mockApplications.length + 1,
      job_listing_id: Number(jobId),
      job_listing: job,
      user_id: 1, // Mock user ID
      user: mockUsers[0],
      cover_letter: coverLetter?.toString() || "",
      status: "pending",
      applied_at: new Date().toISOString(),
      reviewed_at: null,
      notes: null,
    };

    mockApplications.push(newApplication);

    return {
      success: true,
      data: newApplication,
      message: "Application submitted successfully",
    };
  }

  /**
   * Get user's applications
   */
  async getUserApplications(params?: {
    status?: string;
    page?: number;
    per_page?: number;
  }): Promise<any> {
    const response = await apiClient.get("/applications/my-applications", {
      params,
    });
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
   * Withdraw an application
   */
  async withdrawApplication(applicationId: number): Promise<any> {
    const response = await apiClient.delete(`/applications/${applicationId}`);
    return response;
  }

  /**
   * Update application status (for employers)
   */
  async updateApplicationStatus(
    applicationId: number,
    status: string,
    notes?: string
  ): Promise<any> {
    const response = await apiClient.patch(
      `/applications/${applicationId}/status`,
      {
        status,
        notes,
      }
    );
    return response;
  }

  /**
   * Get applications for a specific job (for employers)
   */
  async getJobApplications(
    jobId: number,
    params?: {
      status?: string;
      page?: number;
      per_page?: number;
    }
  ): Promise<any> {
    const response = await apiClient.get(`/applications/job/${jobId}`, {
      params,
    });
    return response;
  }
}

export const applicationService = new ApplicationService();
