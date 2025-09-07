'use client';

import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/shared/components';
import { Card, Button } from '@/shared/components/ui';
import { useI18n } from '@/shared/contexts';

export default function ServicesPage() {
  const { language } = useI18n();

  const services = [
    {
      icon: '🔍',
      title: language === 'en' ? 'Job Search & Matching' : 'البحث عن الوظائف والمطابقة',
      description: language === 'en'
        ? 'Advanced AI-powered job matching that connects you with opportunities that fit your skills, experience, and career goals.'
        : 'مطابقة وظائف متقدمة مدعومة بالذكاء الاصطناعي تربطك بالفرص التي تناسب مهاراتك وخبرتك وأهدافك المهنية.',
      features: [
        language === 'en' ? 'Smart job recommendations' : 'توصيات وظائف ذكية',
        language === 'en' ? 'Skills-based matching' : 'مطابقة على أساس المهارات',
        language === 'en' ? 'Salary insights' : 'رؤى الراتب',
        language === 'en' ? 'Company culture fit' : 'توافق ثقافة الشركة'
      ]
    },
    {
      icon: '📄',
      title: language === 'en' ? 'Resume Builder & Review' : 'منشئ ومراجع السيرة الذاتية',
      description: language === 'en'
        ? 'Professional resume builder with expert templates and personalized feedback to make your application stand out.'
        : 'منشئ سيرة ذاتية احترافي مع قوالب خبراء وتغذية راجعة شخصية لجعل طلبك متميزاً.',
      features: [
        language === 'en' ? 'ATS-optimized templates' : 'قوالب محسنة لأنظمة تتبع المتقدمين',
        language === 'en' ? 'Expert review service' : 'خدمة مراجعة الخبراء',
        language === 'en' ? 'Industry-specific formats' : 'تنسيقات خاصة بالصناعة',
        language === 'en' ? 'Multi-language support' : 'دعم متعدد اللغات'
      ]
    },
    {
      icon: '🎯',
      title: language === 'en' ? 'Career Coaching' : 'التدريب المهني',
      description: language === 'en'
        ? 'One-on-one career coaching sessions with industry experts to help you navigate your career path and achieve your goals.'
        : 'جلسات تدريب مهني فردية مع خبراء الصناعة لمساعدتك في التنقل في مسارك المهني وتحقيق أهدافك.',
      features: [
        language === 'en' ? 'Personal career assessment' : 'تقييم مهني شخصي',
        language === 'en' ? 'Goal setting & planning' : 'وضع الأهداف والتخطيط',
        language === 'en' ? 'Interview preparation' : 'التحضير للمقابلات',
        language === 'en' ? 'Networking strategies' : 'استراتيجيات التواصل'
      ]
    },
    {
      icon: '🏢',
      title: language === 'en' ? 'Employer Services' : 'خدمات أصحاب العمل',
      description: language === 'en'
        ? 'Comprehensive recruitment solutions for companies looking to find and hire the best talent in the region.'
        : 'حلول التوظيف الشاملة للشركات التي تسعى للعثور على أفضل المواهب في المنطقة وتوظيفها.',
      features: [
        language === 'en' ? 'Talent sourcing' : 'البحث عن المواهب',
        language === 'en' ? 'Applicant tracking' : 'تتبع المتقدمين',
        language === 'en' ? 'Company branding' : 'العلامة التجارية للشركة',
        language === 'en' ? 'Recruitment analytics' : 'تحليلات التوظيف'
      ]
    },
    {
      icon: '📊',
      title: language === 'en' ? 'Market Insights' : 'رؤى السوق',
      description: language === 'en'
        ? 'Stay informed with comprehensive market reports, salary benchmarks, and industry trends to make better career decisions.'
        : 'ابق على اطلاع بتقارير السوق الشاملة ومعايير الراتب واتجاهات الصناعة لاتخاذ قرارات مهنية أفضل.',
      features: [
        language === 'en' ? 'Salary benchmarking' : 'قياس معايير الراتب',
        language === 'en' ? 'Industry reports' : 'تقارير الصناعة',
        language === 'en' ? 'Skills demand analysis' : 'تحليل الطلب على المهارات',
        language === 'en' ? 'Regional market trends' : 'اتجاهات السوق الإقليمية'
      ]
    },
    {
      icon: '🎓',
      title: language === 'en' ? 'Skills Development' : 'تطوير المهارات',
      description: language === 'en'
        ? 'Access to curated learning resources and certification programs to upskill and advance your career.'
        : 'الوصول إلى موارد التعلم المنسقة وبرامج الشهادات لتطوير المهارات والتقدم في مسيرتك المهنية.',
      features: [
        language === 'en' ? 'Online courses' : 'دورات عبر الإنترنت',
        language === 'en' ? 'Certification programs' : 'برامج الشهادات',
        language === 'en' ? 'Skills assessments' : 'تقييمات المهارات',
        language === 'en' ? 'Learning path recommendations' : 'توصيات مسار التعلم'
      ]
    }
  ];

  const pricingPlans = [
    {
      name: language === 'en' ? 'Basic' : 'أساسي',
      price: language === 'en' ? 'Free' : 'مجاني',
      description: language === 'en' 
        ? 'Perfect for job seekers getting started'
        : 'مثالي للباحثين عن العمل المبتدئين',
      features: [
        language === 'en' ? 'Job search & applications' : 'البحث عن الوظائف والتقديم',
        language === 'en' ? 'Basic resume builder' : 'منشئ سيرة ذاتية أساسي',
        language === 'en' ? 'Company insights' : 'رؤى الشركة',
        language === 'en' ? 'Email notifications' : 'إشعارات البريد الإلكتروني'
      ],
      popular: false
    },
    {
      name: language === 'en' ? 'Professional' : 'احترافي',
      price: language === 'en' ? '$29/month' : '29$ / شهر',
      description: language === 'en'
        ? 'Enhanced features for serious job seekers'
        : 'ميزات محسنة للباحثين عن العمل الجادين',
      features: [
        language === 'en' ? 'Everything in Basic' : 'كل شيء في الأساسي',
        language === 'en' ? 'Priority application status' : 'حالة التطبيق ذات الأولوية',
        language === 'en' ? 'Advanced resume templates' : 'قوالب السيرة الذاتية المتقدمة',
        language === 'en' ? 'Career coaching session' : 'جلسة التدريب المهني',
        language === 'en' ? 'Salary insights' : 'رؤى الراتب'
      ],
      popular: true
    },
    {
      name: language === 'en' ? 'Enterprise' : 'المؤسسات',
      price: language === 'en' ? 'Custom' : 'مخصص',
      description: language === 'en'
        ? 'Tailored solutions for companies'
        : 'حلول مخصصة للشركات',
      features: [
        language === 'en' ? 'Unlimited job postings' : 'منشورات وظائف غير محدودة',
        language === 'en' ? 'Advanced candidate screening' : 'فحص المرشحين المتقدم',
        language === 'en' ? 'Dedicated account manager' : 'مدير حساب مخصص',
        language === 'en' ? 'Custom integration' : 'تكامل مخصص',
        language === 'en' ? 'Analytics dashboard' : 'لوحة التحليلات'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Our Services' : 'خدماتنا'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {language === 'en'
                ? 'Comprehensive career solutions designed to help job seekers find their dream jobs and employers discover exceptional talent.'
                : 'حلول مهنية شاملة مصممة لمساعدة الباحثين عن العمل في العثور على وظائف أحلامهم وأصحاب العمل في اكتشاف المواهب الاستثنائية.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <span className="text-indigo-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Choose Your Plan' : 'اختر خطتك'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Flexible pricing options to suit every need, from individual job seekers to large enterprises.'
                : 'خيارات تسعير مرنة لتناسب كل الاحتياجات، من الباحثين عن العمل الفرديين إلى المؤسسات الكبيرة.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-8 relative ${
                  plan.popular
                    ? 'border-2 border-indigo-500 shadow-lg transform scale-105'
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {language === 'en' ? 'Most Popular' : 'الأكثر شعبية'}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  <div className="text-4xl font-bold text-indigo-600 mb-2">
                    {plan.price}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-indigo-600 mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {language === 'en' ? 'Ready to Transform Your Career?' : 'مستعد لتحويل مسيرتك المهنية؟'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {language === 'en'
                ? 'Join thousands of professionals who have accelerated their careers with SUUD.'
                : 'انضم إلى آلاف المهنيين الذين سرّعوا مسيرتهم المهنية مع صُعود.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                {language === 'en' ? 'Start Free Trial' : 'ابدأ تجربة مجانية'}
              </Button>
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600">
                {language === 'en' ? 'Contact Sales' : 'تواصل مع المبيعات'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
