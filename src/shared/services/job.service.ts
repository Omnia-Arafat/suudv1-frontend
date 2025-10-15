import { apiClient } from "./api";
import type {
  JobListing,
  CreateJobListingRequest,
  UpdateJobListingRequest,
  JobSearchParams,
  PaginatedResponse,
} from "@/shared/types";

class JobService {
  /**
   * Get all jobs with pagination and filters
   */
  async getJobs(params?: JobSearchParams): Promise<any> {
    const response = await apiClient.get("/jobs", { params });
    return response;
  }

  /**
   * Get job by ID or slug
   */
  async getJob(id: string | number): Promise<any> {
    const response = await apiClient.get(`/jobs/${id}`);
    return response;
  }

  /**
   * Get available filter options
   */
  async getFilters(): Promise<any> {
    const response = await apiClient.get("/jobs/filters");
    return response;
  }

  /**
   * Create new job listing (for employers)
   */
  async createJob(jobData: CreateJobListingRequest): Promise<any> {
    const response = await apiClient.post("/jobs", jobData);
    return response;
  }

  /**
   * Update job listing (for employers)
   */
  async updateJob(
    id: number,
    jobData: UpdateJobListingRequest
  ): Promise<JobListing> {
    const response = await apiClient.put<JobListing>(`/jobs/${id}`, jobData);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || "Failed to update job");
  }

  /**
   * Delete job listing (for employers)
   */
  async deleteJob(id: number): Promise<void> {
    const response = await apiClient.delete(`/jobs/${id}`);

    if (!response.success) {
      throw new Error(response.message || "Failed to delete job");
    }
  }

  /**
   * Get jobs posted by current employer's company
   */
  async getMyJobs(
    params?: JobSearchParams
  ): Promise<PaginatedResponse<JobListing>> {
    const response = await apiClient.get<PaginatedResponse<JobListing>>(
      "/jobs/my-jobs",
      {
        params,
      }
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch your jobs");
  }

  /**
   * Increment view count for a job
   */
  async viewJob(id: number): Promise<void> {
    try {
      await apiClient.post(`/jobs/${id}/view`);
    } catch (error) {
      // Don't throw error for view tracking failure
      console.warn("Failed to track job view:", error);
    }
  }

  /**
   * Get popular/trending jobs
   */
  async getPopularJobs(limit = 10): Promise<JobListing[]> {
    const response = await apiClient.get<JobListing[]>("/jobs/popular", {
      params: { limit },
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch popular jobs");
  }

  /**
   * Get recent jobs
   */
  async getRecentJobs(limit = 10): Promise<any> {
    const response = await apiClient.get("/jobs/recent", {
      params: { limit },
    });
    return response;
  }

  /**
   * Get job statistics
   */
  async getJobStats(): Promise<any> {
    const response = await apiClient.get("/jobs/stats");
    return response;
  }
}

export const jobService = new JobService();
