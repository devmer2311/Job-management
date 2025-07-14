'use client';

import { useState } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { JobFilters } from '@/types/job';
import 'rc-slider/assets/index.css';
import { Range } from 'rc-slider';


interface JobFiltersProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
}

export default function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);

  const locations = ['Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Kochi', 'Noida', 'Gurgaon', 'Remote'];
  const jobTypes = [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
  ];

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleLocationChange = (location: string) => {
    onFiltersChange({ ...filters, location });
    setShowLocationDropdown(false);
  };

  const handleJobTypeChange = (jobType: string) => {
    onFiltersChange({ ...filters, job_type: jobType });
    setShowJobTypeDropdown(false);
  };

  return (
    <div className="w-[99%] max-w-[1300px] mx-auto mt-6">
      <div className="flex items-center gap-6 py-5 px-6 bg-white rounded-xl">

        {/* Search */}
        <div className="flex items-center flex-1 relative min-w-[240px]">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-[15px] bg-transparent outline-none"
          />
        </div>

        {/* Separator */}
        <div className="h-8 border-l border-gray-300" />

        {/* Location */}
        <div className="relative min-w-[200px]">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="flex items-center justify-between gap-2 w-full px-1 py-3 text-[15px] bg-transparent outline-none"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className={filters.location ? 'text-gray-900' : 'text-gray-500'}>
                {filters.location || 'Preferred Location'}
              </span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showLocationDropdown && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto">
              <button onClick={() => handleLocationChange('')} className="w-full px-4 py-2 text-left text-gray-500 text-sm hover:bg-gray-50">All Locations</button>
              {locations.map((location) => (
                <button key={location} onClick={() => handleLocationChange(location)} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-8 border-l border-gray-300" />

        {/* Job Type */}
        <div className="relative min-w-[150px]">
          <button
            onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}
            className="flex items-center justify-between gap-2 w-full px-1 py-3 text-[15px] bg-transparent outline-none"
          >
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span className={filters.job_type ? 'text-gray-900' : 'text-gray-500'}>
                {filters.job_type || 'Job type'}
              </span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showJobTypeDropdown && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl">
              <button onClick={() => handleJobTypeChange('')} className="w-full px-4 py-2 text-left text-gray-500 text-sm hover:bg-gray-50">All Types</button>
              {jobTypes.map((type) => (
                <button key={type.value} onClick={() => handleJobTypeChange(type.value)} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-8 border-l border-gray-300" />
        

{/* Salary Range */}
<div className="flex items-center gap-4 min-w-[300px]">
  <span className="text-sm text-gray-700 whitespace-nowrap">Salary Per Month</span>
  <span className="text-sm text-gray-600">₹{((filters.salary_min || 50000) / 1000).toFixed(0)}k</span>

  <div className="w-64">
    <Range
      min={0}
      max={500000}
      step={5000}
      value={[filters.salary_min || 50000, filters.salary_max || 800000]}
      onChange={([min, max]) =>
        onFiltersChange({ ...filters, salary_min: min, salary_max: max })
      }
      trackStyle={[{ backgroundColor: '#000' }]}
      handleStyle={[
        { backgroundColor: '#000', borderColor: '#000' },
        { backgroundColor: '#000', borderColor: '#000' }
      ]}
    />
  </div>

  <span className="text-sm text-gray-600">₹{((filters.salary_max || 800000) / 1000).toFixed(0)}k</span>
</div>

      </div>
    </div>
  );
}
