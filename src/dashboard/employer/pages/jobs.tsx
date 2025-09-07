'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useI18n } from '@/shared/contexts';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { DashboardLayout } from '@/dashboard/shared/components/layout';
import ProtectedRoute from '@/shared/components/auth/ProtectedRoute';

interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary?: string;
  description: string;
  requirements: string[];
  posted_at: string;
  isBookmarked?: boolean;
}

const mockJobs: JobListing[] = [
  {
    id: 1,
    title: 'Software Developer',
    company: 'Tech Solutions Saudi',
    location: 'Riyadh, Saudi Arabia',
    type: 'full-time',
    experience: '2-4 years',
    salary: '8,000 - 12,000 SAR',
    description: 'We are looking for a passionate software developer to join our growing team...',
    requirements: ['React.js', 'Node.js', 'TypeScript', 'MySQL'],
    posted_at: '2024-01-15',
    isBookmarked: false,
  },
  {
    id: 2,
    title: 'Marketing Specialist',
    company: 'Digital Marketing Co.',
    location: 'Jeddah, Saudi Arabia', 
    type: 'full-time',
    experience: '1-3 years',
    salary: '6,000 - 9,000 SAR',
    description: 'Join our marketing team to create compelling campaigns and drive brand awareness...',
    requirements: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Creation'],
    posted_at: '2024-01-14',
    isBookmarked: true,
  },
  {
    id: 3,
    title: 'Data Analyst Intern',
    company: 'Saudi Data Corp',
    location: 'Dammam, Saudi Arabia',
    type: 'internship',
    experience: 'Entry level',
    salary: '3,000 - 4,000 SAR',
    description: 'Perfect opportunity for recent graduates to start their career in data analytics...',
    requirements: ['Python', 'SQL', 'Excel', 'Statistics'],
    posted_at: '2024-01-13',
    isBookmarked: false,
  },
];

function JobsPageContent() {
  const { user } = useAuth();
  const { language } = useI18n();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [jobs, setJobs] = useState<JobListing[]>(mockJobs);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || job.location.includes(selectedLocation);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const toggleBookmark = (jobId: number) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );
  };

  const getJobTypeLabel = (type: string) => {
    const types = {
      'full-time': language === 'en' ? 'Full Time' : 'دوام كامل',
      'part-time': language === 'en' ? 'Part Time' : 'دوام جزئي', 
      'contract': language === 'en' ? 'Contract' : 'عقد',
      'internship': language === 'en' ? 'Internship' : 'تدريب',
    };
    return types[type as keyof typeof types] || type;
  };

  const getJobTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-yellow-100 text-yellow-800',
      'internship': 'bg-purple-100 text-purple-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (user?.role === 'employer') {
    // Employer view - job postings management
    return (
      <DashboardLayout
        title={language === 'en' ? 'Job Postings' : 'الوظائف المنشورة'}
        subtitle={language === 'en' ? 'Manage your job listings' : 'إدارة إعلاناتك الوظيفية'}
        actions={
          <Button
            variant="primary"
            onClick={() => router.push('/dashboard/jobs/create')}
          >
            {language === 'en' ? 'Post New Job' : 'نشر وظيفة جديدة'}
          </Button>
        }
      >
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Active Jobs' : 'الوظائف النشطة'}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">5</p>
                  </div>
                  <span className="text-3xl">📝</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Total Applications' : 'إجمالي الطلبات'}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">23</p>
                  </div>
                  <span className="text-3xl">📨</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Views This Month' : 'المشاهدات هذا الشهر'}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">156</p>
                  </div>
                  <span className="text-3xl">👁️</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings for Employer */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Your Job Postings' : 'إعلاناتك الوظيفية'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobs.slice(0, 2).map(job => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          {language === 'en' ? 'Edit' : 'تعديل'}
                        </Button>
                        <Button variant="outline" size="sm">
                          {language === 'en' ? 'View Applications (5)' : 'عرض الطلبات (5)'}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>📍 {job.location}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getJobTypeColor(job.type)}`}>
                        {getJobTypeLabel(job.type)}
                      </span>
                      <span>💰 {job.salary}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">{job.description}</p>
                    <div className="text-xs text-gray-500">
                      {language === 'en' ? 'Posted on' : 'نُشر في'} {new Date(job.posted_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Employee view - job search
  return (
    <DashboardLayout
      title={language === 'en' ? 'Find Jobs' : 'البحث عن الوظائف'}
      subtitle={language === 'en' ? 'Discover your next career opportunity' : 'اكتشف فرصتك المهنية التالية'}
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div>
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search for jobs, companies, or keywords...' : 'ابحث عن الوظائف أو الشركات أو الكلمات المفتاحية...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{language === 'en' ? 'All Types' : 'جميع الأنواع'}</option>
                  <option value="full-time">{language === 'en' ? 'Full Time' : 'دوام كامل'}</option>
                  <option value="part-time">{language === 'en' ? 'Part Time' : 'دوام جزئي'}</option>
                  <option value="contract">{language === 'en' ? 'Contract' : 'عقد'}</option>
                  <option value="internship">{language === 'en' ? 'Internship' : 'تدريب'}</option>
                </select>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{language === 'en' ? 'All Locations' : 'جميع المواقع'}</option>
                  <option value="Riyadh">{language === 'en' ? 'Riyadh' : 'الرياض'}</option>
                  <option value="Jeddah">{language === 'en' ? 'Jeddah' : 'جدة'}</option>
                  <option value="Dammam">{language === 'en' ? 'Dammam' : 'الدمام'}</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {filteredJobs.length} {language === 'en' ? 'jobs found' : 'وظيفة موجودة'}
            </h2>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>{language === 'en' ? 'Sort by: Newest' : 'ترتيب حسب: الأحدث'}</option>
              <option>{language === 'en' ? 'Sort by: Salary' : 'ترتيب حسب: الراتب'}</option>
              <option>{language === 'en' ? 'Sort by: Relevance' : 'ترتيب حسب: الصلة'}</option>
            </select>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <p className="text-lg text-gray-700 mb-2">{job.company}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>📍 {job.location}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getJobTypeColor(job.type)}`}>
                            {getJobTypeLabel(job.type)}
                          </span>
                          <span>👨‍💼 {job.experience}</span>
                          {job.salary && <span>💰 {job.salary}</span>}
                        </div>
                        <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                        
                        {/* Requirements */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.requirements.slice(0, 3).map((req, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {req}
                            </span>
                          ))}
                          {job.requirements.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              +{job.requirements.length - 3} {language === 'en' ? 'more' : 'أكثر'}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <button
                          onClick={() => toggleBookmark(job.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            job.isBookmarked 
                              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          🔖
                        </button>
                        <div className="text-xs text-gray-500 text-right">
                          {new Date(job.posted_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="primary" className="flex-1">
                        {language === 'en' ? 'Apply Now' : 'قدم الآن'}
                      </Button>
                      <Button variant="outline">
                        {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function JobsPage() {
  return (
    <ProtectedRoute>
      <JobsPageContent />
    </ProtectedRoute>
  );
}
