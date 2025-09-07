export type UserRole = 'employee' | 'employer' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  specialization?: string;
  university?: string;
  profile_summary?: string;
  avatar_path?: string;
  cv_path?: string;
  phone?: string;
  location?: string;
  is_active: boolean;
  last_login_at?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  
  // Computed attributes
  avatar_url?: string;
  cv_url?: string;
  
  // Relationships
  company?: Company;
  applications?: Application[];
  reviewed_applications?: Application[];
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: UserRole;
  specialization?: string;
  university?: string;
  phone?: string;
  location?: string;
  company_name?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  specialization?: string;
  university?: string;
  profile_summary?: string;
  phone?: string;
  location?: string;
  is_active?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends CreateUserRequest {}

// Import types for relationships
import type { Company } from './company';
import type { Application } from './application';
