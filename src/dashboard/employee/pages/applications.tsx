'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useI18n } from '@/shared/contexts';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  applicantName?: string;
  applicantEmail?: string;
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  appliedAt: string;
  lastUpdated: string;
  experience: string;
  location: string;
  salary?: string;
  coverLetter?: string;
}

const mockApplicationsEmployee: Application[] = [
  {
    id: 1,
    jobTitle: 'Software Developer',
    company: 'Tech Solutions Saudi',
    status: 'interview',
    appliedAt: '2024-01-10',
    lastUpdated: '2024-01-15',
    experience: '2-4 years',
    location: 'Riyadh, Saudi Arabia',
    salary: '8,000 - 12,000 SAR',
  },
  {
    id: 2,
    jobTitle: 'Marketing Specialist',
    company: 'Digital Marketing Co.',
    status: 'pending',
    appliedAt: '2024-01-12',
    lastUpdated: '2024-01-12',
    experience: '1-3 years',
    location: 'Jeddah, Saudi Arabia',
    salary: '6,000 - 9,000 SAR',
  },
  {
    id: 3,
    jobTitle: 'Data Analyst',
    company: 'Saudi Data Corp',
    status: 'rejected',
    appliedAt: '2024-01-08',
    lastUpdated: '2024-01-14',
    experience: 'Entry level',
    location: 'Dammam, Saudi Arabia',
    salary: '5,000 - 7,000 SAR',
  },
];

const mockApplicationsEmployer: Application[] = [
  {
    id: 1,
    jobTitle: 'Software Developer',
    company: 'Your Company',
    applicantName: 'Ahmad Al-Rashid',
    applicantEmail: 'ahmad@example.com',
    status: 'pending',
    appliedAt: '2024-01-15',
    lastUpdated: '2024-01-15',
    experience: '3 years',
    location: 'Riyadh',
    coverLetter: 'I am excited to apply for this position...',
  },
  {
    id: 2,
    jobTitle: 'Marketing Specialist',
    company: 'Your Company',
    applicantName: 'Sara Mohammed',
    applicantEmail: 'sara@example.com',
    status: 'reviewing',
    appliedAt: '2024-01-14',
    lastUpdated: '2024-01-15',
    experience: '2 years',
    location: 'Jeddah',
    coverLetter: 'With my background in digital marketing...',
  },
  {
    id: 3,
    jobTitle: 'Software Developer',
    company: 'Your Company',
    applicantName: 'Omar Hassan',
    applicantEmail: 'omar@example.com',
    status: 'interview',
    appliedAt: '2024-01-13',
    lastUpdated: '2024-01-16',
    experience: '4 years',
    location: 'Riyadh',
    coverLetter: 'I have been following your company for...',
  },
];

function ApplicationsPageContent() {
  const { user } = useAuth();
  const { language } = useI18n();
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  const isEmployer = user?.role === 'employer';
  const applications = isEmployer ? mockApplicationsEmployer : mockApplicationsEmployee;

  const filteredApplications = applications.filter(app => 
    selectedStatus === 'all' || app.status === selectedStatus
  );

  const getStatusLabel = (status: string) => {
    const statusLabels = {
      pending: language === 'en' ? 'Pending' : 'قيد الانتظار',
      reviewing: language === 'en' ? 'Under Review' : 'قيد المراجعة',
      interview: language === 'en' ? 'Interview' : 'مقابلة',
      accepted: language === 'en' ? 'Accepted' : 'مقبول',
      rejected: language === 'en' ? 'Rejected' : 'مرفوض',
    };
    return statusLabels[status as keyof typeof statusLabels] || status;
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      reviewing: 'bg-blue-100 text-blue-800 border-blue-200',
      interview: 'bg-purple-100 text-purple-800 border-purple-200',
      accepted: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    // This would update the application status in the backend
    console.log(`Updating application ${applicationId} to ${newStatus}`);
  };

  const getStatusCounts = () => {
    const counts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: applications.length,
      pending: counts.pending || 0,
      reviewing: counts.reviewing || 0,
      interview: counts.interview || 0,
      accepted: counts.accepted || 0,
      rejected: counts.rejected || 0,
    };
  };

  const statusCounts = getStatusCounts();

  return (
      <div className="space-y-4 sm:space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{statusCounts.total}</div>
              <div className="text-xs sm:text-sm text-gray-600">
                {language === 'en' ? 'Total' : 'المجموع'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
              <div className="text-xs sm:text-sm text-gray-600">
                {language === 'en' ? 'Pending' : 'قيد الانتظار'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{statusCounts.reviewing}</div>
              <div className="text-xs sm:text-sm text-gray-600">
                {language === 'en' ? 'Reviewing' : 'قيد المراجعة'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">{statusCounts.interview}</div>
              <div className="text-xs sm:text-sm text-gray-600">
                {language === 'en' ? 'Interview' : 'مقابلة'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{statusCounts.accepted}</div>
              <div className="text-xs sm:text-sm text-gray-600">
                {language === 'en' ? 'Accepted' : 'مقبول'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Sort */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{language === 'en' ? 'All Status' : 'جميع الحالات'}</option>
                  <option value="pending">{language === 'en' ? 'Pending' : 'قيد الانتظار'}</option>
                  <option value="reviewing">{language === 'en' ? 'Under Review' : 'قيد المراجعة'}</option>
                  <option value="interview">{language === 'en' ? 'Interview' : 'مقابلة'}</option>
                  <option value="accepted">{language === 'en' ? 'Accepted' : 'مقبول'}</option>
                  <option value="rejected">{language === 'en' ? 'Rejected' : 'مرفوض'}</option>
                </select>
              </div>
              
              <div className="flex-1"></div>
              
              <div className="text-sm text-gray-600">
                {filteredApplications.length} {language === 'en' ? 'applications found' : 'طلب موجود'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application, index) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                          {application.jobTitle}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(application.status)} self-start`}>
                          {getStatusLabel(application.status)}
                        </span>
                      </div>
                      
                      <p className="text-base sm:text-lg text-gray-700 mb-2 break-words">
                        {isEmployer && application.applicantName 
                          ? `${application.applicantName} • ${application.company}`
                          : application.company
                        }
                      </p>
                      
                      {isEmployer && application.applicantEmail && (
                        <p className="text-sm text-gray-600 mb-2 break-all">
                          📧 {application.applicantEmail}
                        </p>
                      )}
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">📍 {application.location}</span>
                        <span className="flex items-center">👨‍💼 {application.experience}</span>
                        {application.salary && <span className="flex items-center">💰 {application.salary}</span>}
                      </div>
                      
                      {application.coverLetter && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-700 line-clamp-2">
                            <strong>{language === 'en' ? 'Cover Letter:' : 'خطاب التغطية:'}</strong> {application.coverLetter}
                          </p>
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500 break-words">
                        {language === 'en' ? 'Applied on' : 'تم التقديم في'} {new Date(application.appliedAt).toLocaleDateString()} • 
                        {language === 'en' ? ' Last updated' : ' آخر تحديث'} {new Date(application.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex flex-row sm:flex-col gap-2 lg:ml-4 justify-end sm:justify-start">
                      {isEmployer ? (
                        // Employer actions
                        <div className="flex flex-col gap-2">
                          {application.status === 'pending' && (
                            <>
                              <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => handleStatusChange(application.id, 'reviewing')}
                              >
                                {language === 'en' ? 'Review' : 'مراجعة'}
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStatusChange(application.id, 'rejected')}
                              >
                                {language === 'en' ? 'Reject' : 'رفض'}
                              </Button>
                            </>
                          )}
                          {application.status === 'reviewing' && (
                            <>
                              <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => handleStatusChange(application.id, 'interview')}
                              >
                                {language === 'en' ? 'Interview' : 'مقابلة'}
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStatusChange(application.id, 'rejected')}
                              >
                                {language === 'en' ? 'Reject' : 'رفض'}
                              </Button>
                            </>
                          )}
                          {application.status === 'interview' && (
                            <>
                              <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => handleStatusChange(application.id, 'accepted')}
                              >
                                {language === 'en' ? 'Accept' : 'قبول'}
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStatusChange(application.id, 'rejected')}
                              >
                                {language === 'en' ? 'Reject' : 'رفض'}
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            {language === 'en' ? 'View Profile' : 'عرض الملف'}
                          </Button>
                        </div>
                      ) : (
                        // Employee actions
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            {language === 'en' ? 'View Job' : 'عرض الوظيفة'}
                          </Button>
                          {application.status === 'pending' && (
                            <Button variant="ghost" size="sm">
                              {language === 'en' ? 'Withdraw' : 'سحب الطلب'}
                            </Button>
                          )}
                          {application.status === 'interview' && (
                            <div className="text-xs text-center text-green-600 font-medium">
                              🎉 {language === 'en' ? 'Interview Scheduled!' : 'تم جدولة المقابلة!'}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'No Applications Found' : 'لا توجد طلبات'}
              </h3>
              <p className="text-gray-600">
                {isEmployer
                  ? (language === 'en' ? 'No applications match your current filter.' : 'لا توجد طلبات تطابق المرشح الحالي.')
                  : (language === 'en' ? 'You haven\'t applied to any jobs yet.' : 'لم تتقدم لأي وظائف بعد.')
                }
              </p>
              {!isEmployer && (
                <Button 
                  variant="primary" 
                  className="mt-4"
                  onClick={() => router.push('/dashboard/jobs')}
                >
                  {language === 'en' ? 'Find Jobs' : 'ابحث عن وظائف'}
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
  );
}

export default ApplicationsPageContent;
