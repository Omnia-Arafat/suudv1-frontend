'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Navbar, Footer } from '@/shared/components';
import JobApplicationModal from '@/shared/components/modals/JobApplicationModal';
import { useI18n } from '@/shared/contexts';
import { jobService } from '@/shared/services';
import type { JobListing, JobSearchParams } from '@/shared/types';

export default function JobsPage() {
  const { t, language, direction } = useI18n();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    job_type: '',
    category: '',
    experience_level: '',
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  });
  const [availableFilters, setAvailableFilters] = useState({
    locations: [],
    job_types: [],
    categories: [],
    experience_levels: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [applicationModal, setApplicationModal] = useState({
    visible: false,
    job: null as JobListing | null,
  });

  useEffect(() => {
    loadJobs();
    loadAvailableFilters();
  }, []);

  useEffect(() => {
    loadJobs(1); // Reset to first page when filters change
  }, [searchTerm, filters]);

  const loadJobs = async (page = pagination.current_page) => {
    try {
      setLoading(true);
      setError(null);
      
      const params: JobSearchParams = {
        query: searchTerm || undefined,
        page,
        per_page: pagination.per_page,
        ...filters,
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key as keyof JobSearchParams] === '') {
          delete params[key as keyof JobSearchParams];
        }
      });
      
      const response = await jobService.getJobs(params);
      
      if (response.success && response.data) {
        setJobs(response.data.jobs || []);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      } else {
        throw new Error(response.message || 'Failed to load jobs');
      }
    } catch (error: any) {
      console.error('Failed to load jobs:', error);
      setError(error.message || 'Failed to load jobs. Please try again.');
      
      // Fallback to mock data in development
      if (process.env.NODE_ENV === 'development') {
        const mockJobs: JobListing[] = [
          {
            id: 1,
            company_id: 1,
            title: language === 'en' ? 'Software Developer' : 'مطور برمجيات',
            description: language === 'en' 
              ? 'We are looking for a talented software developer to join our team.'
              : 'نبحث عن مطور برمجيات موهوب للانضمام إلى فريقنا.',
            location: language === 'en' ? 'Riyadh, Saudi Arabia' : 'الرياض، السعودية',
            job_type: 'full-time',
            experience_level: 'mid',
            salary_min: 8000,
            salary_max: 12000,
            salary_currency: 'SAR',
            status: 'active',
            slug: 'software-developer-1',
            skills: ['JavaScript', 'React', 'Node.js'],
            category: 'Technology',
            views_count: 45,
            applications_count: 8,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            company: {
              id: 1,
              user_id: 1,
              company_name: 'TechCorp Saudi',
              logo_url: undefined,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
          },
        ];
        setJobs(mockJobs);
        setPagination({ current_page: 1, last_page: 1, per_page: 12, total: 1 });
      }
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableFilters = async () => {
    try {
      const response = await jobService.getFilters();
      if (response.success && response.data) {
        setAvailableFilters({
          locations: response.data.locations || [],
          job_types: response.data.job_types || [],
          categories: response.data.categories || [],
          experience_levels: response.data.experience_levels || [],
        });
      }
    } catch (error) {
      console.warn('Failed to load filter options:', error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      job_type: '',
      category: '',
      experience_level: '',
    });
    setSearchTerm('');
  };
  
  const handleJobClick = (job: JobListing) => {
    // Track job view
    jobService.viewJob(job.id).catch(console.warn);
    // For now just open application modal, later can navigate to job detail page
    setApplicationModal({ visible: true, job });
  };

  const handleApplyClick = (job: JobListing, e: React.MouseEvent) => {
    e.stopPropagation();
    setApplicationModal({ visible: true, job });
  };

  const handleApplicationModalClose = () => {
    setApplicationModal({ visible: false, job: null });
  };

  const handleApplicationSuccess = () => {
    // Optionally reload jobs to update application counts
    loadJobs(pagination.current_page);
  };

  const getJobTypeLabel = (jobType: string) => {
    const labels = {
      'full-time': language === 'en' ? 'Full Time' : 'دوام كامل',
      'part-time': language === 'en' ? 'Part Time' : 'دوام جزئي',
      'contract': language === 'en' ? 'Contract' : 'عقد',
      'internship': language === 'en' ? 'Internship' : 'تدريب',
      'remote': language === 'en' ? 'Remote' : 'عن بُعد',
    };
    return labels[jobType as keyof typeof labels] || jobType;
  };

  const getExperienceLevelLabel = (level: string) => {
    const labels = {
      'entry': language === 'en' ? 'Entry Level' : 'مبتدئ',
      'mid': language === 'en' ? 'Mid Level' : 'متوسط',
      'senior': language === 'en' ? 'Senior Level' : 'كبير',
      'executive': language === 'en' ? 'Executive' : 'تنفيذي',
    };
    return labels[level as keyof typeof labels] || level;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Main Content */}
      <main className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Job Opportunities' : 'الفرص الوظيفية'}
            </h1>
            <p className="text-xl text-gray-600">
              {language === 'en' 
                ? 'Discover your next career opportunity'
                : 'اكتشف فرصتك المهنية القادمة'
              }
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search jobs...' : 'البحث عن الوظائف...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Location' : 'الموقع'}
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{language === 'en' ? 'All Locations' : 'جميع المواقع'}</option>
                    {availableFilters.locations.map((location: string) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Job Type' : 'نوع الوظيفة'}
                  </label>
                  <select
                    value={filters.job_type}
                    onChange={(e) => handleFilterChange('job_type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{language === 'en' ? 'All Types' : 'جميع الأنواع'}</option>
                    {availableFilters.job_types.map((type: string) => (
                      <option key={type} value={type}>
                        {getJobTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Category' : 'الفئة'}
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{language === 'en' ? 'All Categories' : 'جميع الفئات'}</option>
                    {availableFilters.categories.map((category: string) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Experience' : 'الخبرة'}
                  </label>
                  <select
                    value={filters.experience_level}
                    onChange={(e) => handleFilterChange('experience_level', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{language === 'en' ? 'All Levels' : 'جميع المستويات'}</option>
                    {availableFilters.experience_levels.map((level: string) => (
                      <option key={level} value={level}>
                        {getExperienceLevelLabel(level)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || Object.values(filters).some(f => f)) && (
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={clearFilters}>
                    {language === 'en' ? 'Clear Filters' : 'مسح المرشحات'}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-red-600 mb-2">⚠️</div>
                <p className="text-red-800">{error}</p>
                <Button 
                  variant="outline" 
                  onClick={() => loadJobs()} 
                  className="mt-3"
                >
                  {language === 'en' ? 'Try Again' : 'حاول مرة أخرى'}
                </Button>
              </div>
            </div>
          )}

          {/* Job Stats */}
          {!error && (
            <div className="text-center">
              <p className="text-gray-600">
                {language === 'en' 
                  ? `Found ${pagination.total} job${pagination.total !== 1 ? 's' : ''}`
                  : `تم العثور على ${pagination.total} وظيفة`
                }
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
              />
              <span className="ml-3 text-lg">{t('common.loading')}</span>
            </div>
          )}

          {/* Jobs List */}
          {!loading && !error && (
            <div className="space-y-6">
              <div className="space-y-4">
                {jobs.length > 0 ? (
                  jobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        hover 
                        className="cursor-pointer" 
                        onClick={() => handleJobClick(job)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {job.title}
                                </h3>
                                {job.category && (
                                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                    {job.category}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                  🏢 {job.company?.company_name || 'Company'}
                                </span>
                                <span className="flex items-center gap-1">
                                  📍 {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  💼 {getJobTypeLabel(job.job_type)}
                                </span>
                                <span className="flex items-center gap-1">
                                  🚀 {getExperienceLevelLabel(job.experience_level)}
                                </span>
                              </div>
                              
                              <p className="text-gray-700 mb-3 line-clamp-2">
                                {job.description}
                              </p>
                              
                              {job.skills && job.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {job.skills.slice(0, 4).map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                  {job.skills.length > 4 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                      +{job.skills.length - 4} more
                                    </span>
                                  )}
                                </div>
                              )}
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>👁️ {job.views_count} {language === 'en' ? 'views' : 'مشاهدة'}</span>
                                <span>📋 {job.applications_count} {language === 'en' ? 'applications' : 'طلب'}</span>
                                <span>⏰ {new Date(job.created_at).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}</span>
                              </div>
                            </div>
                            
                            <div className="text-right ml-6">
                              {job.salary_min && job.salary_max && (
                                <div className="text-lg font-semibold text-green-600 mb-3">
                                  {job.salary_currency} {job.salary_min.toLocaleString()}-{job.salary_max.toLocaleString()}
                                  <div className="text-xs text-gray-500 font-normal">
                                    {language === 'en' ? 'per month' : 'شهرياً'}
                                  </div>
                                </div>
                              )}
                              <Button 
                                variant="primary" 
                                onClick={(e) => handleApplyClick(job, e)}
                                className="min-w-[120px]"
                              >
                                {language === 'en' ? 'Apply Now' : 'قدم الآن'}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'en' ? 'No jobs found' : 'لم يتم العثور على وظائف'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'en'
                        ? 'Try adjusting your search terms or filters'
                        : 'حاول تعديل مصطلحات البحث أو المرشحات'
                      }
                    </p>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              {jobs.length > 0 && pagination.last_page > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => loadJobs(pagination.current_page - 1)}
                    disabled={pagination.current_page <= 1}
                    className="px-3 py-2"
                  >
                    {language === 'en' ? 'Previous' : 'السابق'}
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(Math.min(5, pagination.last_page))].map((_, idx) => {
                      const page = Math.max(1, pagination.current_page - 2) + idx;
                      if (page > pagination.last_page) return null;
                      
                      return (
                        <Button
                          key={page}
                          variant={page === pagination.current_page ? 'primary' : 'outline'}
                          onClick={() => loadJobs(page)}
                          className="px-3 py-2 min-w-[40px]"
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => loadJobs(pagination.current_page + 1)}
                    disabled={pagination.current_page >= pagination.last_page}
                    className="px-3 py-2"
                  >
                    {language === 'en' ? 'Next' : 'التالي'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </motion.div>
        </div>
      </main>
      
      <Footer />
      
      {/* Job Application Modal */}
      <JobApplicationModal
        job={applicationModal.job}
        visible={applicationModal.visible}
        onHide={handleApplicationModalClose}
        onSuccess={handleApplicationSuccess}
      />
    </div>
  );
}
