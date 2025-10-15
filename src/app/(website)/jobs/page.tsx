'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Navbar, Footer } from '@/shared/components';
import JobApplicationModal from '@/shared/components/modals/JobApplicationModal';
import { useI18n } from '@/shared/contexts';
import { jobService } from '@/shared/services';
import type { JobListing } from '@/shared/types';

export default function JobsPage() {
  const { t, language, direction } = useI18n();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState('');
  const [filters, setFilters] = useState({
    locations: [],
    job_types: [],
    categories: [],
    experience_levels: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);

  useEffect(() => {
    loadJobs();
    loadFilters();
  }, []);

  useEffect(() => {
    loadJobs();
  }, [searchTerm, selectedLocation, selectedJobType, selectedCategory, selectedExperienceLevel, currentPage]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      
      // Fetch jobs from the backend API (only returns approved jobs)
      const response = await jobService.getJobs({
        search: searchTerm || undefined,
        location: selectedLocation || undefined,
        job_type: selectedJobType || undefined,
        category: selectedCategory || undefined,
        experience_level: selectedExperienceLevel || undefined,
        page: currentPage,
        per_page: 12
      });
      
      console.log('Jobs response:', response); // Debug log
      if (response?.success && response.data?.jobs) {
        setJobs(response.data.jobs);
        setTotalJobs(response.data.pagination?.total || response.data.jobs.length);
      } else {
        console.log('No jobs found or invalid response structure');
        setJobs([]);
        setTotalJobs(0);
      }
    } catch (error) {
      console.error('Failed to load jobs:', error);
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setLoading(false);
    }
  };

  const loadFilters = async () => {
    try {
      const response = await jobService.getFilters();
      console.log('Filters response:', response); // Debug log
      if (response?.success && response.data) {
        setFilters(response.data);
      }
    } catch (error) {
      console.error('Failed to load filters:', error);
    }
  };

  const handleApplyToJob = (job: JobListing) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const totalPages = Math.ceil(totalJobs / 12);

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
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Location' : 'الموقع'}
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{language === 'en' ? 'All Locations' : 'جميع المواقع'}</option>
                  {filters.locations.map((location: string) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Job Type' : 'نوع الوظيفة'}
                </label>
                <select
                  value={selectedJobType}
                  onChange={(e) => {
                    setSelectedJobType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{language === 'en' ? 'All Types' : 'جميع الأنواع'}</option>
                  {filters.job_types.map((type: string) => (
                    <option key={type} value={type}>
                      {type === 'full-time' ? (language === 'en' ? 'Full Time' : 'دوام كامل') :
                       type === 'part-time' ? (language === 'en' ? 'Part Time' : 'دوام جزئي') :
                       type === 'contract' ? (language === 'en' ? 'Contract' : 'عقد') :
                       type === 'internship' ? (language === 'en' ? 'Internship' : 'تدريب') :
                       type === 'remote' ? (language === 'en' ? 'Remote' : 'عن بعد') : type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Category' : 'الفئة'}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{language === 'en' ? 'All Categories' : 'جميع الفئات'}</option>
                  {filters.categories.map((category: string) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Experience' : 'الخبرة'}
                </label>
                <select
                  value={selectedExperienceLevel}
                  onChange={(e) => {
                    setSelectedExperienceLevel(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{language === 'en' ? 'All Levels' : 'جميع المستويات'}</option>
                  {filters.experience_levels.map((level: string) => (
                    <option key={level} value={level}>
                      {level === 'entry' ? (language === 'en' ? 'Entry Level' : 'مبتدئ') :
                       level === 'mid' ? (language === 'en' ? 'Mid Level' : 'متوسط') :
                       level === 'senior' ? (language === 'en' ? 'Senior Level' : 'خبير') :
                       level === 'executive' ? (language === 'en' ? 'Executive' : 'تنفيذي') : level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {(selectedLocation || selectedJobType || selectedCategory || selectedExperienceLevel) && (
              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedLocation('');
                    setSelectedJobType('');
                    setSelectedCategory('');
                    setSelectedExperienceLevel('');
                    setCurrentPage(1);
                  }}
                >
                  {language === 'en' ? 'Clear Filters' : 'مسح المرشحات'}
                </Button>
              </div>
            )}
          </div>

          {/* Job Stats */}
          <div className="text-center">
            <p className="text-gray-600">
              {language === 'en' 
                ? `Found ${totalJobs} job${totalJobs !== 1 ? 's' : ''}`
                : `تم العثور على ${totalJobs} وظيفة`
              }
            </p>
          </div>

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
          {!loading && (
            <div className="space-y-4">
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover className="cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                🏢 {job.company?.company_name}
                              </span>
                              <span className="flex items-center gap-1">
                                📍 {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                💼 {job.job_type === 'full-time' 
                                      ? (language === 'en' ? 'Full Time' : 'دوام كامل')
                                      : job.job_type
                                    }
                              </span>
                            </div>
                            <p className="text-gray-700 mb-3 line-clamp-2">
                              {job.description}
                            </p>
                            {job.skills && job.skills.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {job.skills.slice(0, 3).map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>👁️ {job.views_count} {language === 'en' ? 'views' : 'مشاهدة'}</span>
                              <span>📋 {job.applications_count} {language === 'en' ? 'applications' : 'طلب'}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            {job.salary_min && job.salary_max && (
                              <div className="text-lg font-semibold text-green-600 mb-2">
                                {job.salary_currency} {job.salary_min.toLocaleString()}-{job.salary_max.toLocaleString()}
                              </div>
                            )}
                            <Button 
                              variant="primary"
                              onClick={() => handleApplyToJob(job)}
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
                      ? 'Try adjusting your search terms'
                      : 'حاول تعديل مصطلحات البحث'
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                {language === 'en' ? 'Previous' : 'السابق'}
              </Button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'primary' : 'outline'}
                      onClick={() => setCurrentPage(pageNum)}
                      className="min-w-[40px]"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                {language === 'en' ? 'Next' : 'التالي'}
              </Button>
            </div>
          )}
        </motion.div>
        </div>
      </main>
      
      <Footer />
      
      {/* Job Application Modal */}
      <JobApplicationModal
        job={selectedJob}
        visible={showJobModal}
        onHide={() => {
          setShowJobModal(false);
          setSelectedJob(null);
        }}
        onSuccess={() => {
          // Optionally refresh jobs to update application count
          loadJobs();
        }}
      />
    </div>
  );
}
