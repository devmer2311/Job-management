export interface Job {
  id: number;
  job_title: string;
  company_name: string;
  location: string;
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary_range: string;
  job_description: string;
  requirements: string;
  responsibilities: string;
  application_deadline: string;
  created_at: string;
  updated_at: string;
}

export interface JobFilters {
  search?: string;
  location?: string;
  job_type?: string;
  salary_min?: number;
  salary_max?: number;
}

export interface CreateJobData {
  job_title: string;
  company_name: string;
  location: string;
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary_range: string;
  job_description: string;
  requirements: string;
  responsibilities: string;
  application_deadline: string;
}