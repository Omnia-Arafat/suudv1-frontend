'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button, Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui';
import { useAuth, useI18n } from '@/contexts';

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t, changeLanguage, language, direction } = useI18n();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'employee' | 'employer' | null>(null);

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'ar' : 'en');
  };

  const roleCards = [
    {
      role: 'employee' as const,
      title: language === 'en' ? 'I am a Student/Job Seeker' : 'أنا طالب/باحث عن عمل',
      description: language === 'en' 
        ? 'Find your dream job and connect with top employers'
        : 'اعثر على وظيفة أحلامك وتواصل مع أفضل أصحاب العمل',
      icon: '🎓',
    },
    {
      role: 'employer' as const,
      title: language === 'en' ? 'I am an Employer' : 'أنا صاحب عمل',
      description: language === 'en'
        ? 'Post jobs and find the best talent for your company'
        : 'انشر الوظائف واعثر على أفضل المواهب لشركتك',
      icon: '🏢',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
        />
        <span className="ml-3 text-lg">{t('common.loading')}</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800`}>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: direction === 'rtl' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SU'UD - سعود
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={toggleLanguage}
              size="sm"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {t('dashboard.welcome')}, {user?.name}
                </span>
                <Button variant="primary" size="sm" onClick={() => router.push('/dashboard')}>
                  {t('dashboard.profile')}
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => router.push('/auth/login')}
                >
                  {t('auth.login')}
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => router.push('/auth/register')}
                >
                  {t('auth.register')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {language === 'en' ? 'Now Live - Connect & Grow' : 'مباشر الآن - اتصل وانمُ'}
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {language === 'en' ? (
                <>
                  Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dream Career</span><br />
                  Starts Here
                </>
              ) : (
                <>
                  مسيرتك <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">الحلم</span><br />
                  تبدأ من هنا
                </>
              )}
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              {language === 'en'
                ? 'Connect talented students with innovative employers. Discover opportunities that match your ambitions and skills in Saudi Arabia\'s growing job market.'
                : 'نربط الطلاب الموهوبين بأصحاب العمل المبدعين. اكتشف الفرص التي تناسب طموحاتك ومهاراتك في سوق العمل السعودي النامي.'
              }
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" onClick={() => router.push('/auth/register')} className="text-lg px-8 py-4">
                {language === 'en' ? 'Get Started Free' : 'ابدأ مجاناً'}
                <span className="ml-2">→</span>
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push('/auth/login')} className="text-lg px-8 py-4">
                {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Choose Your Path' : 'اختر مسارك'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Whether you\'re seeking opportunities or talent, we have the perfect platform for you'
                : 'سواء كنت تبحث عن الفرص أو المواهب، لدينا المنصة المثالية لك'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {roleCards.map((card, index) => (
              <motion.div
                key={card.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  hover
                  className={`text-center relative overflow-hidden group transition-all duration-300 h-full ${
                    selectedRole === card.role 
                      ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => {
                    setSelectedRole(card.role);
                    router.push('/auth/register');
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="relative z-10 p-8">
                    <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform">{card.icon}</div>
                    <CardTitle className="mb-4 text-2xl">{card.title}</CardTitle>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{card.description}</p>
                    
                    <div className="space-y-3 text-left">
                      {card.role === 'employee' ? [
                        language === 'en' ? '• Browse thousands of job opportunities' : '• تصفح آلاف الفرص الوظيفية',
                        language === 'en' ? '• Build your professional profile' : '• اصنع ملفك المهني',
                        language === 'en' ? '• Connect with top employers' : '• تواصل مع كبار أصحاب العمل'
                      ] : [
                        language === 'en' ? '• Post jobs and reach qualified candidates' : '• انشر الوظائف واوصل للمرشحين المؤهلين',
                        language === 'en' ? '• Manage applications efficiently' : '• أدر التطبيقات بكفاءة',
                        language === 'en' ? '• Build your company brand' : '• اصنع علامة شركتك التجارية'
                      ].map((feature, i) => (
                        <p key={i} className="text-sm text-gray-600">{feature}</p>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="relative z-10">
                    <Button
                      variant={selectedRole === card.role ? 'primary' : 'outline'}
                      className="w-full text-lg py-3 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors"
                      size="lg"
                    >
                      {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Why Choose SU\'UD?' : 'لماذا تختار سعود؟'}
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Discover what makes our platform the preferred choice for job seekers and employers'
                : 'اكتشف ما يجعل منصتنا الخيار المفضل للباحثين عن عمل وأصحاب العمل'
              }
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🚀',
                title: language === 'en' ? 'Lightning Fast' : 'سريع كالبرق',
                desc: language === 'en' ? 'Apply to jobs in seconds with our streamlined application process' : 'تقدم للوظائف في ثواني مع عملية التقديم المبسطة',
              },
              {
                icon: '🎯',
                title: language === 'en' ? 'Smart Matching' : 'مطابقة ذكية',
                desc: language === 'en' ? 'AI-powered algorithms match you with the perfect opportunities' : 'خوارزميات الذكاء الاصطناعي تطابقك مع الفرص المثالية',
              },
              {
                icon: '🔒',
                title: language === 'en' ? 'Secure & Trusted' : 'آمن وموثوق',
                desc: language === 'en' ? 'Your data is protected with enterprise-grade security' : 'بياناتك محمية بأمان على مستوى المؤسسات',
              },
              {
                icon: '📊',
                title: language === 'en' ? 'Real-time Analytics' : 'تحليلات فورية',
                desc: language === 'en' ? 'Track your application progress and get insights' : 'تتبع تقدم طلباتك واحصل على رؤى',
              },
              {
                icon: '🤝',
                title: language === 'en' ? 'Quality Network' : 'شبكة عالية الجودة',
                desc: language === 'en' ? 'Connect with verified employers and top talent' : 'تواصل مع أصحاب عمل موثقين ومواهب متميزة',
              },
              {
                icon: '🌟',
                title: language === 'en' ? '24/7 Support' : 'دعم على مدار الساعة',
                desc: language === 'en' ? 'Get help whenever you need it with our dedicated support team' : 'احصل على المساعدة عند الحاجة مع فريق الدعم المخصص',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4">
              {language === 'en' ? 'Join Thousands of Success Stories' : 'انضم لآلاف قصص النجاح'}
            </h3>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10,000+', label: language === 'en' ? 'Job Seekers' : 'باحث عن عمل' },
              { number: '500+', label: language === 'en' ? 'Companies' : 'شركة' },
              { number: '5,000+', label: language === 'en' ? 'Jobs Posted' : 'وظيفة منشورة' },
              { number: '95%', label: language === 'en' ? 'Success Rate' : 'معدل نجاح' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Ready to Start Your Journey?' : 'مستعد لبدء رحلتك؟'}
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Join SU\'UD today and take the first step towards your dream career'
                : 'انضم لسعود اليوم واتخذ الخطوة الأولى نحو مسيرتك المهنية الحلم'
              }
            </p>
            <Button size="lg" onClick={() => router.push('/auth/register')} className="text-lg px-12 py-4">
              {language === 'en' ? 'Join SU\'UD Now' : 'انضم لسعود الآن'}
              <span className="ml-2">🚀</span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <h4 className="text-xl font-bold">SU'UD - سعود</h4>
              </div>
              <p className="text-gray-400">
                {language === 'en'
                  ? 'Connecting talent with opportunity in Saudi Arabia'
                  : 'نربط المواهب بالفرص في المملكة العربية السعودية'
                }
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">{language === 'en' ? 'For Job Seekers' : 'للباحثين عن عمل'}</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Browse Jobs' : 'تصفح الوظائف'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Career Resources' : 'موارد المسيرة المهنية'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Resume Builder' : 'بناء السيرة الذاتية'}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">{language === 'en' ? 'For Employers' : 'لأصحاب العمل'}</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Post Jobs' : 'نشر الوظائف'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Search Talent' : 'البحث عن المواهب'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Employer Resources' : 'موارد أصحاب العمل'}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">{language === 'en' ? 'Support' : 'الدعم'}</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Help Center' : 'مركز المساعدة'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Contact Us' : 'اتصل بنا'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SU'UD. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
