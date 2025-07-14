'use client';

import { Job } from '@/types/job';
import { MapPin, Clock, Users, Eye } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

const companyLogos: { [key: string]: string } = {
  'Amazon': '/api/placeholder/40/40',
  'Tesla': '/api/placeholder/40/40',
  'Swiggy': '/api/placeholder/40/40',
  'Microsoft': '/api/placeholder/40/40',
  'Google': '/api/placeholder/40/40',
  'Netflix': '/api/placeholder/40/40',
  'Uber': '/api/placeholder/40/40',
  'Airbnb': '/api/placeholder/40/40',
  'Spotify': '/api/placeholder/40/40',
  'Salesforce': '/api/placeholder/40/40'
};

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
  const timeAgo = '24h Ago';
  const companyIcon = getCompanyIcon(job.company_name);
  const companyColor = getCompanyColor(job.company_name);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 relative">
      {/* Time Badge */}
      <div className="absolute top-4 right-4">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          {timeAgo}
        </span>
      </div>

      {/* Company Logo */}
      <div className="mb-4">
        <div className={`w-12 h-12 ${companyColor} rounded-full flex items-center justify-center text-white text-xl font-bold`}>
          {companyIcon}
        </div>
      </div>

      {/* Job Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {job.job_title}
      </h3>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <span className="text-gray-400 mr-2">₹</span>
          <span>1-3 yr Exp</span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            Onsite
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            121 PA
          </span>
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <ul className="text-gray-600 text-sm space-y-1">
          <li>• {job.job_description}</li>
        </ul>
      </div>

      {/* Apply Button */}
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200">
        Apply Now
      </button>
    </div>
  );
}