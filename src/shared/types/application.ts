import type { User } from './user';
import type { JobListing } from './job-listing';

export type ApplicationStatus = 'submitted' | 'viewed' | 'shortlisted' | 'rejected';

export interface Application {
  id: number;
  user_id: number;
  job_listing_id: number;
  status: ApplicationStatus;
  cover_letter?: string;
  resume_path?: string;
  answers?: Record<string, any>;
  employer_notes?: string;
  viewed_at?: string;
  status_changed_at?: string;
  reviewed_by?: number;
  created_at: string;
  updated_at: string;
  
  // Computed attributes
  resume_url?: string;
  status_color?: string;
  status_label?: string;
  can_be_withdrawn?: boolean;
  
  // Relationships
  user?: User;
  job_listing?: JobListing;
  reviewer?: User;
}

export interface CreateApplicationRequest {
  job_listing_id: number;
  cover_letter?: string;
  answers?: Record<string, any>;
}