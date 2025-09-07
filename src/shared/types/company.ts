import type { User } from './user';
import type { JobListing } from './job-listing';

export interface Company {
  id: number;
  user_id: number;
  company_name: string;
  name?: string; // Alias for company_name
  logo_path?: string;
  website?: string;
  description?: string;
  industry?: string;
  company_size?: string;
  location?: string;
  founded_year?: number;
  created_at: string;
  updated_at: string;
  
  // Computed attributes
  logo_url?: string;
  formatted_website?: string;
  total_jobs?: number;
  total_applications?: number;
  
  // Relationships
  user?: User;
  job_listings?: JobListing[];
  active_job_listings?: JobListing[];
}

export interface CreateCompanyRequest {
  company_name: string;
  website?: string;
  description?: string;
  industry?: string;
  company_size?: string;
  location?: string;
  founded_year?: number;
}

export interface UpdateCompanyRequest {
  company_name?: string;
  website?: string;
  description?: string;
  industry?: string;
  company_size?: string;
  location?: string;
  founded_year?: number;
}

export type CompanySize = 
  | '1-10' 
  | '11-50' 
  | '51-200' 
  | '201-500' 
  | '501-1000' 
  | '1000+';

export type Industry = 
  | 'Technology'
  | 'Healthcare'
  | 'Finance'
  | 'Education'
  | 'Retail'
  | 'Manufacturing'
  | 'Consulting'
  | 'Marketing'
  | 'Non-profit'
  | 'Government'
  | 'Other';
