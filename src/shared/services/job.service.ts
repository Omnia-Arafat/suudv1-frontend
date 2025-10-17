import type {
  JobListing,
  CreateJobListingRequest,
  UpdateJobListingRequest,
  JobSearchParams,
  PaginatedResponse,
} from "@/shared/types";
import {
  mockJobs,
  mockFilters,
  simulateApiDelay,
  getPaginatedData,
} from "@/shared/data/mockData";

class JobService {
  /**
   * Get all jobs with pagination and filters - Mock implementation
   */
  async getJobs(params?: JobSearchParams): Promise<any> {
    console.log("📋 Mock getJobs with params:", params);
    await simulateApiDelay(800);

    let filteredJobs = [...mockJobs];

    // Apply filters
    if (params?.query) {
      const searchTerm = params.query.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.company?.name?.toLowerCase().includes(searchTerm)
      );
    }

    if (params?.location) {
      filteredJobs = filteredJobs.filter(
        (job) => job.location === params.location
      );
    }

    if (params?.job_type) {
      filteredJobs = filteredJobs.filter(
        (job) => job.job_type === params.job_type
      );
    }

    if (params?.category) {
      filteredJobs = filteredJobs.filter(
        (job) => job.category === params.category
      );
    }

    if (params?.experience_level) {
      filteredJobs = filteredJobs.filter(
        (job) => job.experience_level === params.experience_level
      );
    }

    // Only return active jobs for public view
    filteredJobs = filteredJobs.filter((job) => job.status === "active");

    const paginatedData = getPaginatedData(
      filteredJobs,
      params?.page || 1,
      params?.per_page || 12
    );

    return {
      success: true,
      data: paginatedData,
      message: "Jobs retrieved successfully",
    };
  }

  /**
   * Get job by ID or slug - Mock implementation
   */
  async getJob(id: string | number): Promise<any> {
    console.log("📋 Mock getJob with id:", id);
    await simulateApiDelay(500);

    const job = mockJobs.find((j) => j.id === Number(id));
    if (!job) {
      throw new Error("Job not found");
    }

    return {
      success: true,
      data: job,
      message: "Job retrieved successfully",
    };
  }

  /**
   * Get available filter options - Mock implementation
   */
  async getFilters(): Promise<any> {
    console.log("📋 Mock getFilters");
    await simulateApiDelay(300);

    return {
      success: true,
      data: mockFilters,
      message: "Filters retrieved successfully",
    };
  }

  /**
   * Create new job listing (for employers) - Mock implementation
   */
  async createJob(jobData: CreateJobListingRequest): Promise<any> {
    console.log("📋 Mock createJob with data:", jobData);
    await simulateApiDelay(1000);

    const newJob: JobListing = {
      id: mockJobs.length + 1,
      ...jobData,
      status: "draft",
      views_count: 0,
      applications_count: 0,
      company_id: 1, // Mock company ID
      company: mockJobs[0].company,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      slug: `job-${mockJobs.length + 1}`,
    };

    mockJobs.push(newJob);

    return {
      success: true,
      data: newJob,
      message: "Job created successfully",
    };
  }

  /**
   * Update job listing (for employers) - Mock implementation
   */
  async updateJob(
    id: number,
    jobData: UpdateJobListingRequest
  ): Promise<JobListing> {
    console.log("📋 Mock updateJob with id:", id, "data:", jobData);
    await simulateApiDelay(800);

    const jobIndex = mockJobs.findIndex((job) => job.id === id);
    if (jobIndex === -1) {
      throw new Error("Job not found");
    }

    mockJobs[jobIndex] = {
      ...mockJobs[jobIndex],
      ...jobData,
      updated_at: new Date().toISOString(),
    };

    return mockJobs[jobIndex];
  }

  /**
   * Delete job listing (for employers) - Mock implementation
   */
  async deleteJob(id: number): Promise<void> {
    console.log("📋 Mock deleteJob with id:", id);
    await simulateApiDelay(500);

    const jobIndex = mockJobs.findIndex((job) => job.id === id);
    if (jobIndex === -1) {
      throw new Error("Job not found");
    }

    mockJobs.splice(jobIndex, 1);
  }

  /**
   * Get jobs posted by current employer's company - Mock implementation
   */
  async getMyJobs(
    params?: JobSearchParams
  ): Promise<PaginatedResponse<JobListing>> {
    console.log("📋 Mock getMyJobs with params:", params);
    await simulateApiDelay(600);

    // Filter jobs by company (assuming current user is company 1)
    let myJobs = mockJobs.filter((job) => job.company_id === 1);

    // Apply filters
    if (params?.query) {
      const searchTerm = params.query.toLowerCase();
      myJobs = myJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
      );
    }

    return getPaginatedData(myJobs, params?.page || 1, params?.per_page || 10);
  }

  /**
   * Increment view count for a job - Mock implementation
   */
  async viewJob(id: number): Promise<void> {
    console.log("📋 Mock viewJob with id:", id);
    await simulateApiDelay(200);

    const job = mockJobs.find((j) => j.id === id);
    if (job) {
      job.views_count = (job.views_count || 0) + 1;
    }
  }

  /**
   * Get popular/trending jobs - Mock implementation
   */
  async getPopularJobs(limit = 10): Promise<JobListing[]> {
    console.log("📋 Mock getPopularJobs with limit:", limit);
    await simulateApiDelay(400);

    return mockJobs
      .filter((job) => job.status === "active")
      .sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
      .slice(0, limit);
  }

  /**
   * Get recent jobs - Mock implementation
   */
  async getRecentJobs(limit = 10): Promise<any> {
    console.log("📋 Mock getRecentJobs with limit:", limit);
    await simulateApiDelay(400);

    const recentJobs = mockJobs
      .filter((job) => job.status === "active")
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, limit);

    return {
      success: true,
      data: recentJobs,
      message: "Recent jobs retrieved successfully",
    };
  }

  /**
   * Get job statistics - Mock implementation
   */
  async getJobStats(): Promise<any> {
    console.log("📋 Mock getJobStats");
    await simulateApiDelay(300);

    const stats = {
      total_jobs: mockJobs.length,
      active_jobs: mockJobs.filter((job) => job.status === "active").length,
      pending_jobs: mockJobs.filter((job) => job.status === "draft").length,
      total_applications: mockJobs.reduce(
        (sum, job) => sum + (job.applications_count || 0),
        0
      ),
      total_views: mockJobs.reduce(
        (sum, job) => sum + (job.views_count || 0),
        0
      ),
    };

    return {
      success: true,
      data: stats,
      message: "Job statistics retrieved successfully",
    };
  }
}

export const jobService = new JobService();
