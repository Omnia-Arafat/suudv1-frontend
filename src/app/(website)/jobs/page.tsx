'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Navbar, Footer } from '@/shared/components';
import { useI18n } from '@/shared/contexts';
import { jobService } from '@/shared/services';
import type { JobListing } from '@/shared/types';

export default function JobsPage() {
  const { t, language, direction } = useI18n();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      // For now, we'll create some mock data since backend might not have jobs yet
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
        {
          id: 2,
          company_id: 2,
          title: language === 'en' ? 'Marketing Specialist' : 'أخصائي تسويق',
          description: language === 'en'
            ? 'Join our marketing team to drive digital campaigns and growth.'
            : 'انضم إلى فريق التسويق لدينا لقيادة الحملات الرقمية والنمو.',
          location: language === 'en' ? 'Jeddah, Saudi Arabia' : 'جدة، السعودية',
          job_type: 'full-time',
          experience_level: 'junior',
          salary_min: 6000,
          salary_max: 9000,
          salary_currency: 'SAR',
          status: 'active',
          slug: 'marketing-specialist-2',
          skills: ['Digital Marketing', 'Social Media', 'Analytics'],
          category: 'Marketing',
          views_count: 32,
          applications_count: 12,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          company: {
            id: 2,
            user_id: 2,
            company_name: 'Marketing Plus',
            logo_url: undefined,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        },
      ];
      
      setJobs(mockJobs);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          {/* Job Stats */}
          <div className="text-center">
            <p className="text-gray-600">
              {language === 'en' 
                ? `Found ${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''}`
                : `تم العثور على ${filteredJobs.length} وظيفة`
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
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
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
                            <Button variant="primary">
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
        </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
