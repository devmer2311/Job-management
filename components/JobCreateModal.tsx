'use client';

import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { CreateJobData } from '@/types/job';

interface JobCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: () => void;
}

export default function JobCreateModal({ isOpen, onClose, onJobCreated }: JobCreateModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateJobData>({
    job_title: '',
    company_name: '',
    location: '',
    job_type: 'Full-time',
    salary_range: '',
    job_description: '',
    requirements: '',
    responsibilities: '',
    application_deadline: '',
  });

  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const jobTypes = [
    { value: 'Full-time', label: 'Full Time' },
    { value: 'Part-time', label: 'Parttime' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
  ];

  const locations = [
    'Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 
    'Kolkata', 'Ahmedabad', 'Kochi', 'Noida', 'Gurgaon', 'Remote'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const salaryRange = salaryFrom && salaryTo ? `₹${salaryFrom} - ₹${salaryTo}` : formData.salary_range;
      
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          salary_range: salaryRange,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      onJobCreated();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      job_title: '',
      company_name: '',
      location: '',
      job_type: 'Full-time',
      salary_range: '',
      job_description: '',
      requirements: '',
      responsibilities: '',
      application_deadline: '',
    });
    setSalaryFrom('');
    setSalaryTo('');
  };

  const handleSaveDraft = () => {
    console.log('Draft saved');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create Job Opening</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Job Title & Company Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                placeholder="Full Stack Developer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="Amazon, Microsoft, Swiggy"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* Location & Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <button
                type="button"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-left flex items-center justify-between"
              >
                <span className={formData.location ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.location || 'Choose Preferred Location'}
                </span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showLocationDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {locations.map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, location });
                        setShowLocationDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 outline-none"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <button
                type="button"
                onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-left flex items-center justify-between"
              >
                <span className="text-gray-900">{formData.job_type}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showJobTypeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {jobTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, job_type: type.value as any });
                        setShowJobTypeDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 outline-none"
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Salary Range & Application Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    placeholder="₹7"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex items-center px-2 text-gray-500 font-medium">
                  TO
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    placeholder="₹12,00,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.application_deadline}
                  onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              value={formData.job_description}
              onChange={(e) => setFormData({ ...formData, job_description: e.target.value })}
              placeholder="Please share a description to let the candidate know more about the job role"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Save Draft ↓
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish ≫'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}