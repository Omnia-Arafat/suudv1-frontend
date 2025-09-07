'use client';

import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/shared/components';
import { Button, Card } from '@/shared/components/ui';
import { useI18n } from '@/shared/contexts';

export default function AboutPage() {
  const { language } = useI18n();

  const features = [
    {
      icon: '🎯',
      title: language === 'en' ? 'Our Mission' : 'مهمتنا',
      description: language === 'en'
        ? 'To connect talented individuals with their dream careers while helping companies find the best talent in the region.'
        : 'ربط الأفراد الموهوبين بوظائف أحلامهم بينما نساعد الشركات في العثور على أفضل المواهب في المنطقة.'
    },
    {
      icon: '👥',
      title: language === 'en' ? 'Expert Team' : 'فريق الخبراء',
      description: language === 'en'
        ? 'Our experienced team understands both job seekers and employers needs, providing personalized solutions for everyone.'
        : 'فريقنا ذو الخبرة يفهم احتياجات الباحثين عن العمل وأصحاب العمل، ويقدم حلولاً شخصية للجميع.'
    },
    {
      icon: '🚀',
      title: language === 'en' ? 'Innovation' : 'الابتكار',
      description: language === 'en'
        ? 'We use cutting-edge technology and innovative approaches to make job searching and recruitment more efficient.'
        : 'نستخدم أحدث التقنيات والنهج المبتكرة لجعل البحث عن العمل والتوظيف أكثر كفاءة.'
    },
    {
      icon: '🌍',
      title: language === 'en' ? 'Regional Focus' : 'التركيز الإقليمي',
      description: language === 'en'
        ? 'Deep understanding of the Middle Eastern job market with strong connections across various industries.'
        : 'فهم عميق لسوق العمل في الشرق الأوسط مع علاقات قوية عبر مختلف الصناعات.'
    }
  ];

  const stats = [
    {
      number: '50K+',
      label: language === 'en' ? 'Job Seekers' : 'باحث عن عمل'
    },
    {
      number: '2K+',
      label: language === 'en' ? 'Companies' : 'شركة'
    },
    {
      number: '25K+',
      label: language === 'en' ? 'Jobs Placed' : 'وظيفة تم توظيفها'
    },
    {
      number: '95%',
      label: language === 'en' ? 'Success Rate' : 'معدل النجاح'
    }
  ];

  const teamMembers = [
    {
      name: 'Ahmed Al-Rashid',
      role: language === 'en' ? 'CEO & Founder' : 'الرئيس التنفيذي والمؤسس',
      image: '👨‍💼',
      description: language === 'en'
        ? 'With over 15 years of experience in HR and talent acquisition across the Middle East.'
        : 'مع أكثر من 15 عامًا من الخبرة في الموارد البشرية واستقطاب المواهب في الشرق الأوسط.'
    },
    {
      name: 'Sarah Al-Mahmoud',
      role: language === 'en' ? 'Head of Technology' : 'رئيسة التقنية',
      image: '👩‍💻',
      description: language === 'en'
        ? 'Leading our technical innovation with expertise in AI and machine learning for better job matching.'
        : 'تقود الابتكار التقني لدينا بخبرة في الذكاء الاصطناعي وتعلم الآلة لمطابقة أفضل للوظائف.'
    },
    {
      name: 'Omar Al-Hashemi',
      role: language === 'en' ? 'VP of Operations' : 'نائب رئيس العمليات',
      image: '👨‍🔧',
      description: language === 'en'
        ? 'Ensuring smooth operations and exceptional customer service for both job seekers and employers.'
        : 'ضمان سلاسة العمليات وخدمة عملاء استثنائية للباحثين عن العمل وأصحاب العمل.'
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
              {language === 'en' ? 'About SUUD' : 'حول صُعود'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {language === 'en'
                ? 'We are dedicated to transforming the way people find jobs and companies discover talent in the Middle East. Our platform connects ambition with opportunity, creating meaningful career journeys.'
                : 'نحن ملتزمون بتغيير الطريقة التي يجد بها الناس الوظائف والشركات تكتشف المواهب في الشرق الأوسط. منصتنا تربط الطموح بالفرصة، وتخلق رحلات مهنية ذات معنى.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'What Makes Us Different' : 'ما يجعلنا مختلفين'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? 'We combine technology with human insight to deliver exceptional results for everyone.'
                : 'نجمع بين التكنولوجيا والبصيرة البشرية لتحقيق نتائج استثنائية للجميع.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Meet Our Team' : 'تعرف على فريقنا'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Passionate professionals dedicated to connecting talent with opportunities.'
                : 'محترفون شغوفون مكرسون لربط المواهب بالفرص.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                  {member.image}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
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
              {language === 'en' ? 'Ready to Start Your Journey?' : 'مستعد لبدء رحلتك؟'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {language === 'en'
                ? 'Join thousands who have found their perfect career match with SUUD.'
                : 'انضم إلى الآلاف الذين وجدوا توافق مسيرتهم المهنية المثالي مع صُعود.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                {language === 'en' ? 'Find Jobs' : 'البحث عن الوظائف'}
              </Button>
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600">
                {language === 'en' ? 'Post a Job' : 'انشر وظيفة'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
