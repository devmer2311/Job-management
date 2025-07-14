'use client';

import { Job } from '@/types/job';
import { Users, MapPin, BadgeDollarSign } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

const getCompanyIcon = (companyName: string) => {
  if (companyName === 'Amazon') return '🅰️';
  if (companyName === 'Tesla') return '🚗';
  if (companyName === 'Swiggy') return '💡';
  return '🏢';
};

const getCompanyColor = (companyName: string) => {
  if (companyName === 'Amazon') return 'bg-black';
  if (companyName === 'Tesla') return 'bg-gray-800';
  if (companyName === 'Swiggy') return 'bg-orange-500';
  return 'bg-blue-600';
};

export default function JobCard({ job }: JobCardProps) {
  const companyIcon = getCompanyIcon(job.company_name);
  const companyColor = getCompanyColor(job.company_name);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition duration-200 relative w-full max-w-sm">
      {/* Time badge */}
      <div className="absolute top-4 right-4">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
          24h Ago
        </span>
      </div>

      {/* Company Logo Circle */}
      <div className="mb-4">
        <div className={`w-12 h-12 ${companyColor} rounded-full flex items-center justify-center text-white text-xl`}>
          {companyIcon}
        </div>
      </div>

      {/* Job Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {job.job_title}
      </h3>

      {/* Job Info */}
      <div className="flex items-center text-sm text-gray-600 mb-4 flex-wrap gap-2">
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          1-3 yr Exp
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {job.job_type}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <BadgeDollarSign className="w-4 h-4" />
          {job.salary_range}
        </span>
      </div>

      {/* Job Description */}
      <div className="text-sm text-gray-600 mb-6">
        <ul className="space-y-1 list-disc pl-5">
          {job.job_description?.split('.').slice(0, 2).map((line, index) => (
            line.trim() && <li key={index}>{line.trim()}</li>
          ))}
        </ul>
      </div>

      {/* Apply Now Button */}
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-xl transition">
        Apply Now
      </button>
    </div>
  );
}
