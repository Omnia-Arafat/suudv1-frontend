import type { Company } from "./company";

export interface JobListing {
  id: number;
  company_id: number;
  title: string;
  description: string;
  requirements?: string;
  location: string;
  job_type: "full-time" | "part-time" | "contract" | "internship";
  experience_level: "entry" | "junior" | "mid" | "senior" | "executive";
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  status: "draft" | "active" | "paused" | "closed";
  slug: string;
  skills?: string[];
  category?: string;
  views_count: number;
  applications_count: number;
  created_at: string;
  updated_at: string;
  deadline?: string;
  remote_allowed?: boolean;
  company?: Company;
}

export interface CreateJobListingRequest {
  title: string;
  description: string;
  location: string;
  job_type: "full-time" | "part-time" | "contract" | "internship";
  experience_level: "entry" | "junior" | "mid" | "senior" | "executive";
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  skills?: string[];
  category?: string;
  deadline?: string;
}

export interface UpdateJobListingRequest {
  title?: string;
  description?: string;
  location?: string;
  job_type?: "full-time" | "part-time" | "contract" | "internship";
  experience_level?: "entry" | "junior" | "mid" | "senior" | "executive";
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  skills?: string[];
  category?: string;
  status?: "draft" | "active" | "paused" | "closed";
  deadline?: string;
}

export interface JobSearchParams {
  query?: string;
  location?: string;
  job_type?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  category?: string;
  page?: number;
  per_page?: number;
  sort_by?: "created_at" | "title" | "salary_min" | "salary_max";
  sort_order?: "asc" | "desc";
}
