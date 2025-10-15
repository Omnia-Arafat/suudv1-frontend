import { apiClient } from './api';

class ApplicationService {
  /**
   * Submit a job application
   */
  async submitApplication(applicationData: FormData): Promise<any> {
    const response = await apiClient.post('/applications', applicationData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  /**
   * Get user's applications
   */
  async getUserApplications(params?: {
    status?: string;
    page?: number;
    per_page?: number;
  }): Promise<any> {
    const response = await apiClient.get('/applications/my-applications', { params });
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
    const response = await apiClient.patch(`/applications/${applicationId}/status`, {
      status,
      notes,
    });
    return response;
  }

  /**
   * Get applications for a specific job (for employers)
   */
  async getJobApplications(jobId: number, params?: {
    status?: string;
    page?: number;
    per_page?: number;
  }): Promise<any> {
    const response = await apiClient.get(`/applications/job/${jobId}`, { params });
    return response;
  }
}

export const applicationService = new ApplicationService();