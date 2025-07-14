// Home.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import JobCard from '@/components/JobCard';
import JobCreateModal from '@/components/JobCreateModal';
import JobFilters from '@/components/JobFilters';
import { Job, JobFilters as JobFiltersType } from '@/types/job';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState<JobFiltersType>({
    search: '',
    location: '',
    job_type: '',
    salary_min: 50000,
    salary_max: 800000,
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.job_type) queryParams.append('job_type', filters.job_type);
      if (filters.salary_min) queryParams.append('salary_min', filters.salary_min.toString());
      if (filters.salary_max) queryParams.append('salary_max', filters.salary_max.toString());

      const response = await fetch(`/api/jobs?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className="min-h-screen bg-white">
      <Header onCreateJob={() => setModalOpen(true)} />
      <JobFilters filters={filters} onFiltersChange={setFilters} />

      <main className="w-full bg-[#f7f8fa] mt-6 py-10 min-h-[calc(100vh-200px)]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Available</h3>
              <p className="text-gray-600">There are currently no job postings that match your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </main>

      <JobCreateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onJobCreated={fetchJobs}
      />
    </div>
  );
}
