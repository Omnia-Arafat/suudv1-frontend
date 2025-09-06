'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { DashboardSkeleton } from '@/components/shared';
import { useAuth, useI18n } from '@/contexts';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { language } = useI18n();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null;
  }

  const greeting = () => {
    const hour = currentTime.getHours();
    if (language === 'en') {
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    } else {
      if (hour < 12) return 'صباح الخير';
      if (hour < 17) return 'مساء الخير';
      return 'مساء الخير';
    }
  };

  const formatDateRange = () => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    if (language === 'en') {
      return `${lastWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
      return `${lastWeek.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })} - ${today.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}`;
    }
  };

  // Mock data based on user role
  const isEmployer = user.role === 'employer';
  
  const statsData = isEmployer ? [
    {
      title: language === 'en' ? 'Company Visitors' : 'زوار الشركة',
      value: '21,457',
      subtitle: language === 'en' ? `Visitors from ${formatDateRange()}` : `زوار من ${formatDateRange()}`,
      trend: '+12%',
      color: 'indigo'
    },
    {
      title: language === 'en' ? 'Job Applications' : 'طلبات العمل',
      value: '158',
      subtitle: language === 'en' ? 'Applicants' : 'متقدم',
      trend: '+8%',
      color: 'green'
    },
    {
      title: language === 'en' ? 'Active Jobs' : 'الوظائف النشطة',
      value: '24',
      subtitle: language === 'en' ? 'Job Postings' : 'وظيفة منشورة',
      trend: '+3',
      color: 'blue'
    },
    {
      title: language === 'en' ? 'Response Rate' : 'معدل الاستجابة',
      value: '89%',
      subtitle: language === 'en' ? 'This month' : 'هذا الشهر',
      trend: '+5%',
      color: 'purple'
    }
  ] : [
    {
      title: language === 'en' ? 'Profile Views' : 'مشاهدات الملف',
      value: '1,247',
      subtitle: language === 'en' ? `Views from ${formatDateRange()}` : `مشاهدة من ${formatDateRange()}`,
      trend: '+18%',
      color: 'indigo'
    },
    {
      title: language === 'en' ? 'Applications Sent' : 'الطلبات المرسلة',
      value: '23',
      subtitle: language === 'en' ? 'Applications' : 'طلب',
      trend: '+4',
      color: 'green'
    },
    {
      title: language === 'en' ? 'Interview Invites' : 'دعوات المقابلة',
      value: '8',
      subtitle: language === 'en' ? 'This month' : 'هذا الشهر',
      trend: '+2',
      color: 'blue'
    },
    {
      title: language === 'en' ? 'Response Rate' : 'معدل الاستجابة',
      value: '34%',
      subtitle: language === 'en' ? 'Success rate' : 'معدل النجاح',
      trend: '+12%',
      color: 'purple'
    }
  ];

  const recentData = isEmployer ? [
    {
      id: 1,
      name: 'Jake Gyll',
      position: language === 'en' ? 'Social Media Specialist' : 'أخصائي وسائل التواصل',
      email: 'jakegyll@email.com',
      appliedDate: language === 'en' ? '2 days ago' : 'منذ يومين',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Sarah Ahmed',
      position: language === 'en' ? 'UI/UX Designer' : 'مصمم واجهات',
      email: 'sarah.ahmed@email.com',
      appliedDate: language === 'en' ? '3 days ago' : 'منذ 3 أيام',
      avatar: '👩‍💻'
    },
    {
      id: 3,
      name: 'Ahmed Hassan',
      position: language === 'en' ? 'Frontend Developer' : 'مطور واجهات أمامية',
      email: 'ahmed.hassan@email.com',
      appliedDate: language === 'en' ? '5 days ago' : 'منذ 5 أيام',
      avatar: '👨‍💻'
    }
  ] : [
    {
      id: 1,
      name: 'TechCorp',
      position: language === 'en' ? 'Frontend Developer' : 'مطور واجهات أمامية',
      status: language === 'en' ? 'Interview Scheduled' : 'مقابلة مجدولة',
      appliedDate: language === 'en' ? '2 days ago' : 'منذ يومين',
      avatar: '🏢'
    },
    {
      id: 2,
      name: 'StartupXYZ',
      position: language === 'en' ? 'UI Designer' : 'مصمم واجهات',
      status: language === 'en' ? 'Under Review' : 'قيد المراجعة',
      appliedDate: language === 'en' ? '4 days ago' : 'منذ 4 أيام',
      avatar: '🚀'
    },
    {
      id: 3,
      name: 'Digital Agency',
      position: language === 'en' ? 'Marketing Specialist' : 'أخصائي تسويق',
      status: language === 'en' ? 'Application Sent' : 'تم إرسال الطلب',
      appliedDate: language === 'en' ? '1 week ago' : 'منذ أسبوع',
      avatar: '🎯'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {greeting()}, {user.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'en' 
                ? `Here is what's happening with your ${isEmployer ? 'job listings' : 'applications'} from ${formatDateRange()}.`
                : `إليك ما يحدث مع ${isEmployer ? 'إعلانات الوظائف' : 'طلباتك'} من ${formatDateRange()}.`
              }
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <span className="mr-2">📊</span>
              {language === 'en' ? 'View All Jobs' : 'عرض جميع الوظائف'}
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <span className="mr-2">➕</span>
              {isEmployer 
                ? (language === 'en' ? 'Post Job' : 'نشر وظيفة')
                : (language === 'en' ? 'Apply to Jobs' : 'التقدم للوظائف')
              }
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className="ml-4">
                  <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                    <div className={`w-6 h-6 rounded bg-${stat.color}-500`}></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-600 text-sm font-medium">{stat.trend}</span>
                <span className="text-gray-500 text-sm ml-2">
                  {language === 'en' ? 'vs last week' : 'مقارنة بالأسبوع الماضي'}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEmployer 
                  ? (language === 'en' ? 'Company Visitors' : 'زوار الشركة')
                  : (language === 'en' ? 'Application Activity' : 'نشاط الطلبات')
                }
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span className="text-sm text-gray-600">
                    {language === 'en' ? 'Visitors' : 'زوار'}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">5,879</span>
                </div>
              </div>
            </div>

            {/* Mock Chart - Simple Bar Visualization */}
            <div className="h-64 flex items-end justify-between gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const height = Math.random() * 200 + 50;
                return (
                  <div key={day} className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: height }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`w-full rounded-t-md ${
                        index === 5 ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    />
                    <p className="text-xs text-gray-500 mt-2">{day}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Applicants Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEmployer 
                  ? (language === 'en' ? 'Applicants Statistic' : 'إحصائيات المتقدمين')
                  : (language === 'en' ? 'Application Status' : 'حالة الطلبات')
                }
              </h3>
              <Button variant="outline" size="sm">
                {language === 'en' ? 'View All Jobs' : 'عرض الكل'}
              </Button>
            </div>

            <div className="space-y-4">
              {[
                { role: language === 'en' ? 'Social Media Specialist' : 'أخصائي وسائل تواصل', count: 67, color: 'indigo' },
                { role: language === 'en' ? 'Senior Engineer' : 'مهندس أول', count: 21, color: 'gray' },
                { role: language === 'en' ? 'UI/UX Designer' : 'مصمم واجهات', count: 38, color: 'blue' },
                { role: language === 'en' ? 'Other' : 'أخرى', count: 54, color: 'gray' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                    <span className="text-sm text-gray-700">{item.role}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {item.count} {language === 'en' ? 'Applicants' : 'متقدم'}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">158</div>
                <div className="text-sm text-gray-500">
                  {language === 'en' ? 'Applicants' : 'متقدم'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEmployer 
                ? (language === 'en' ? 'Recent Applicants' : 'المتقدمون الحديثون')
                : (language === 'en' ? 'Recent Applications' : 'الطلبات الحديثة')
              }
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {recentData.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-lg">
                      {item.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.position}</p>
                      {isEmployer ? (
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? 'Email' : 'البريد الإلكتروني'}: {item.email}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? 'Status' : 'الحالة'}: {item.status}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {language === 'en' ? 'Date Applied' : 'تاريخ التقدم'}
                      </p>
                      <p className="text-sm font-medium text-gray-900">{item.appliedDate}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {isEmployer 
                        ? (language === 'en' ? 'See Application' : 'عرض الطلب')
                        : (language === 'en' ? 'View Details' : 'عرض التفاصيل')
                      }
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-100 text-center">
            <Button variant="outline">
              {language === 'en' ? 'View All' : 'عرض الكل'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
