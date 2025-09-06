'use client';

import { motion } from 'framer-motion';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useAuth, useI18n } from '@/contexts';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard';

function DashboardContent() {
  const { user, isLoading } = useAuth();
  const { language } = useI18n();
  const router = useRouter();

  // Show loading state while user data is being fetched
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
        <span className="ml-4 text-lg text-gray-700">
          {language === 'en' ? 'Loading dashboard...' : 'تحميل لوحة التحكم...'}
        </span>
      </div>
    );
  }

  const quickActions = [
    {
      icon: '🚀',
      title: language === 'en' ? 'Quick Start' : 'بداية سريعة',
      description: user?.role === 'employer' 
        ? (language === 'en' ? 'Post your first job listing' : 'انشر أول إعلان وظيفي')
        : (language === 'en' ? 'Complete your profile' : 'أكمل ملفك الشخصي'),
      action: () => router.push(user?.role === 'employer' ? '/dashboard/jobs/create' : '/dashboard/profile'),
      buttonText: language === 'en' ? 'Get Started' : 'ابدأ الآن',
    },
    {
      icon: user?.role === 'employer' ? '📊' : '🔍',
      title: user?.role === 'employer' 
        ? (language === 'en' ? 'View Analytics' : 'عرض التحليلات')
        : (language === 'en' ? 'Find Jobs' : 'البحث عن الوظائف'),
      description: user?.role === 'employer'
        ? (language === 'en' ? 'Check your hiring metrics' : 'تحقق من مقاييس التوظيف')
        : (language === 'en' ? 'Browse available positions' : 'تصفح المناصب المتاحة'),
      action: () => router.push(user?.role === 'employer' ? '/dashboard/analytics' : '/dashboard/jobs'),
      buttonText: language === 'en' ? 'View Now' : 'عرض الآن',
    },
    {
      icon: user?.role === 'employer' ? '👥' : '📋',
      title: user?.role === 'employer'
        ? (language === 'en' ? 'Recent Applications' : 'الطلبات الحديثة')
        : (language === 'en' ? 'Application Status' : 'حالة الطلبات'),
      description: user?.role === 'employer'
        ? (language === 'en' ? 'Review candidate applications' : 'مراجعة طلبات المرشحين')
        : (language === 'en' ? 'Track your applications' : 'تتبع طلباتك'),
      action: () => router.push('/dashboard/applications'),
      buttonText: language === 'en' ? 'Review' : 'مراجعة',
    },
  ];

  const stats = user?.role === 'employer' ? [
    { label: language === 'en' ? 'Active Jobs' : 'الوظائف النشطة', value: '5', icon: '📝' },
    { label: language === 'en' ? 'Applications' : 'الطلبات', value: '23', icon: '📨' },
    { label: language === 'en' ? 'Views This Month' : 'المشاهدات هذا الشهر', value: '156', icon: '👁️' },
    { label: language === 'en' ? 'Response Rate' : 'معدل الاستجابة', value: '78%', icon: '📈' },
  ] : [
    { label: language === 'en' ? 'Applications Sent' : 'الطلبات المرسلة', value: '8', icon: '📤' },
    { label: language === 'en' ? 'Interviews' : 'المقابلات', value: '3', icon: '🎯' },
    { label: language === 'en' ? 'Saved Jobs' : 'الوظائف المحفوظة', value: '12', icon: '🔖' },
    { label: language === 'en' ? 'Profile Views' : 'مشاهدات الملف', value: '34', icon: '👁️' },
  ];

  return (
    <DashboardLayout
      title={language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
      subtitle={language === 'en' ? 
        `Welcome back, ${user?.name}!` : 
        `مرحباً بعودتك، ${user?.name}!`
      }
      actions={
        <Button 
          variant="primary" 
          onClick={() => router.push(user?.role === 'employer' ? '/dashboard/jobs/create' : '/dashboard/jobs')}
        >
          {user?.role === 'employer'
            ? (language === 'en' ? 'Post Job' : 'نشر وظيفة')
            : (language === 'en' ? 'Find Jobs' : 'البحث عن وظائف')
          }
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-200 group cursor-pointer" onClick={action.action}>
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">
                      {action.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {action.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors"
                    >
                      {action.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity or Account Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Summary */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Account Information' : 'معلومات الحساب'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{user?.name}</h4>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-sm text-blue-600 font-medium">
                    {user?.role === 'employee' 
                      ? (language === 'en' ? 'Job Seeker' : 'باحث عن عمل')
                      : (language === 'en' ? 'Employer' : 'صاحب عمل')
                    }
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3 text-sm">
                {user?.university && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'en' ? 'University:' : 'الجامعة:'}</span>
                    <span className="font-medium">{user.university}</span>
                  </div>
                )}
                {user?.specialization && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'en' ? 'Specialization:' : 'التخصص:'}</span>
                    <span className="font-medium">{user.specialization}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'en' ? 'Member since:' : 'عضو منذ:'}</span>
                  <span className="font-medium">{new Date(user?.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => router.push('/dashboard/profile')}
              >
                {language === 'en' ? 'Edit Profile' : 'تعديل الملف الشخصي'}
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Recent Activity' : 'النشاط الأخير'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: user?.role === 'employer' ? '📝' : '👁️',
                    title: user?.role === 'employer' 
                      ? (language === 'en' ? 'Job posted' : 'تم نشر وظيفة')
                      : (language === 'en' ? 'Job viewed' : 'تم عرض وظيفة'),
                    description: user?.role === 'employer'
                      ? (language === 'en' ? 'Software Developer position' : 'منصب مطور برمجيات')
                      : (language === 'en' ? 'Marketing Manager at Tech Co' : 'مدير تسويق في شركة تقنية'),
                    time: language === 'en' ? '2 hours ago' : 'منذ ساعتين'
                  },
                  {
                    icon: user?.role === 'employer' ? '👥' : '📤',
                    title: user?.role === 'employer'
                      ? (language === 'en' ? 'New application' : 'طلب جديد')
                      : (language === 'en' ? 'Application sent' : 'تم إرسال طلب'),
                    description: user?.role === 'employer'
                      ? (language === 'en' ? 'From Ahmad Al-Rashid' : 'من أحمد الراشد')
                      : (language === 'en' ? 'To Innovative Solutions' : 'إلى الحلول المبتكرة'),
                    time: language === 'en' ? '1 day ago' : 'منذ يوم واحد'
                  },
                  {
                    icon: '🔔',
                    title: language === 'en' ? 'Profile updated' : 'تم تحديث الملف الشخصي',
                    description: language === 'en' ? 'Added new skills' : 'تمت إضافة مهارات جديدة',
                    time: language === 'en' ? '3 days ago' : 'منذ 3 أيام'
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{activity.title}</h5>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
