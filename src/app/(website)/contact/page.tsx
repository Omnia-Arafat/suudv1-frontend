'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/components/ui';
import { Navbar, Footer } from '@/shared/components';
import { useI18n } from '@/shared/contexts';

export default function ContactPage() {
  const { language } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: '📧',
      title: language === 'en' ? 'Email' : 'البريد الإلكتروني',
      value: 'RSL111@hotmail.com',
      description: language === 'en' 
        ? 'Send us an email anytime'
        : 'أرسل لنا بريد إلكتروني في أي وقت'
    },
    {
      icon: '📞',
      title: language === 'en' ? 'Phone' : 'الهاتف',
      value: '0550033610',
      description: language === 'en'
        ? 'Available 9 AM - 6 PM (GMT+3)'
        : 'متاح من 9 صباحاً - 6 مساءً (GMT+3)'
    },
    {
      icon: '📍',
      title: language === 'en' ? 'Office' : 'المكتب',
      value: language === 'en' 
        ? '24°50\'43.6"N 46°47\'43.0"E, Riyadh' 
        : '24°50\'43.6"N 46°47\'43.0"E، الرياض',
      description: language === 'en'
        ? 'Visit our headquarters'
        : 'زر مقرنا الرئيسي'
    },
    {
      icon: '🗺️',
      title: language === 'en' ? 'Location' : 'الموقع',
      value: language === 'en' ? 'Google Maps' : 'خرائط جوجل',
      description: language === 'en'
        ? 'Find us on the map'
        : 'اعثر علينا على الخريطة'
    }
  ];

  const faqs = [
    {
      question: language === 'en' 
        ? 'How can I post a job on SUUD?' 
        : 'كيف يمكنني نشر وظيفة على صُعود؟',
      answer: language === 'en'
        ? 'Register as an employer, complete your company profile, and use our job posting tool to create and publish your job listings.'
        : 'سجل كصاحب عمل، أكمل ملف شركتك، واستخدم أداة نشر الوظائف لإنشاء ونشر إعلانات الوظائف.'
    },
    {
      question: language === 'en'
        ? 'Is SUUD free for job seekers?'
        : 'هل صُعود مجاني للباحثين عن العمل؟',
      answer: language === 'en'
        ? 'Yes, creating a profile and applying for jobs is completely free for job seekers.'
        : 'نعم، إنشاء ملف شخصي والتقدم للوظائف مجاني تماماً للباحثين عن العمل.'
    },
    {
      question: language === 'en'
        ? 'How do I update my resume?'
        : 'كيف أحدث سيرتي الذاتية؟',
      answer: language === 'en'
        ? 'Go to your profile settings and use our resume builder or upload a new version of your resume.'
        : 'اذهب إلى إعدادات ملفك الشخصي واستخدم منشئ السيرة الذاتية أو ارفع نسخة جديدة من سيرتك الذاتية.'
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
              {language === 'en' ? 'Get in Touch' : 'تواصل معنا'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {language === 'en'
                ? 'Have questions or need support? We\'re here to help you succeed on your career journey.'
                : 'لديك أسئلة أو تحتاج دعم؟ نحن هنا لمساعدتك على النجاح في رحلتك المهنية.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Send us a message' : 'أرسل لنا رسالة'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Enter your full name' : 'أدخل اسمك الكامل'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Enter your email address' : 'أدخل بريدك الإلكتروني'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Subject' : 'الموضوع'}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'What is this about?' : 'ما هو موضوع الرسالة؟'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Message' : 'الرسالة'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Tell us more about your inquiry...' : 'أخبرنا المزيد عن استفسارك...'}
                />
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="text-green-800">
                    {language === 'en'
                      ? 'Thank you! Your message has been sent successfully.'
                      : 'شكراً لك! تم إرسال رسالتك بنجاح.'
                    }
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-800">
                    {language === 'en'
                      ? 'Sorry, there was an error sending your message. Please try again.'
                      : 'عذراً، حدث خطأ في إرسال رسالتك. يرجى المحاولة مرة أخرى.'
                    }
                  </p>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting 
                  ? (language === 'en' ? 'Sending...' : 'جاري الإرسال...')
                  : (language === 'en' ? 'Send Message' : 'إرسال الرسالة')
                }
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'en' ? 'Contact Information' : 'معلومات التواصل'}
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-indigo-600 font-medium mb-1">
                        {info.value}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
              </h3>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🗺️</div>
                <p>{language === 'en' ? 'Interactive Map' : 'خريطة تفاعلية'}</p>
                <p className="text-sm">
                  {language === 'en' ? 'Find our office location' : 'اعثر على موقع مكتبنا'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
