import { apiClient } from './api';
import type { ApiResponse } from '@/shared/types';

class AdminService {
  /**
   * Get admin dashboard data
   */
  async getDashboardData(): Promise<any> {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  }

  /**
   * Get all users with filters and pagination
   */
  async getUsers(params?: {
    page?: number;
    per_page?: number;
    role?: string;
    status?: string;
    search?: string;
  }): Promise<any> {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  }

  /**
   * Update user status (activate/deactivate)
   */
  async updateUserStatus(userId: number, isActive: boolean): Promise<any> {
    const response = await apiClient.patch(`/admin/users/${userId}/status`, {
      is_active: isActive
    });
    return response.data;
  }

  /**
   * Get all companies pending verification
   */
  async getPendingCompanies(): Promise<any> {
    const response = await apiClient.get('/admin/companies?status=pending');
    return response.data;
  }

  /**
   * Approve or reject company verification
   */
  async updateCompanyVerification(companyId: number, approved: boolean): Promise<any> {
    const response = await apiClient.patch(`/admin/companies/${companyId}/verification`, {
      is_verified: approved
    });
    return response.data;
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
    const response = await apiClient.get('/admin/jobs', { params });
    return response.data;
  }

  /**
   * Approve or reject job posting
   */
  async moderateJob(jobId: number, status: 'approved' | 'rejected', reason?: string): Promise<any> {
    const response = await apiClient.patch(`/admin/jobs/${jobId}/moderate`, {
      status,
      reason
    });
    return response.data;
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
    const response = await apiClient.get('/admin/applications', { params });
    return response.data;
  }

  /**
   * Get contact form submissions
   */
  async getContacts(params?: {
    page?: number;
    per_page?: number;
    status?: string;
  }): Promise<any> {
    const response = await apiClient.get('/admin/contacts', { params });
    return response.data;
  }

  /**
   * Mark contact as read/replied
   */
  async updateContactStatus(contactId: number, status: 'read' | 'replied'): Promise<any> {
    const response = await apiClient.patch(`/admin/contacts/${contactId}/status`, {
      status
    });
    return response.data;
  }

  /**
   * Get platform analytics
   */
  async getAnalytics(): Promise<any> {
    const response = await apiClient.get('/admin/analytics');
    return response.data;
  }

  /**
   * Delete user (admin action)
   */
  async deleteUser(userId: number): Promise<any> {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return response.data;
  }

  /**
   * Get system reports
   */
  async getSystemReports(): Promise<any> {
    const response = await apiClient.get('/admin/reports');
    return response.data;
  }
}

export const adminService = new AdminService();
