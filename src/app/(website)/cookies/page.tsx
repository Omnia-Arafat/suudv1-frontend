'use client';

import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/shared/components';
import { useI18n } from '@/shared/contexts';

export default function CookiePolicyPage() {
  const { language } = useI18n();

  const sections = language === 'en' ? [
    {
      title: 'What Are Cookies?',
      content: [
        'Cookies are small text files that are stored on your device when you visit our website.',
        'They help us provide you with a better experience by remembering your preferences and usage patterns.',
        'Cookies cannot harm your device and do not contain personal information like your name or email address.',
        'Most web browsers automatically accept cookies, but you can modify your browser settings to decline them if you prefer.'
      ]
    },
    {
      title: 'Types of Cookies We Use',
      content: [
        'Essential Cookies: Necessary for the website to function properly, including login and security features.',
        'Performance Cookies: Help us understand how visitors interact with our website by collecting anonymous information.',
        'Functional Cookies: Remember your preferences and settings to provide a personalized experience.',
        'Marketing Cookies: Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.'
      ]
    },
    {
      title: 'How We Use Cookies',
      content: [
        'To keep you logged in during your session and remember your login preferences.',
        'To personalize your experience based on your location, language, and preferences.',
        'To analyze website performance and identify areas for improvement.',
        'To show you relevant job opportunities and career content.',
        'To measure the effectiveness of our advertising and marketing efforts.'
      ]
    },
    {
      title: 'Third-Party Cookies',
      content: [
        'We may use third-party services that place cookies on your device, such as:',
        'Google Analytics: To analyze website traffic and user behavior.',
        'Social Media Platforms: To enable social sharing and authentication features.',
        'Advertising Networks: To deliver targeted advertisements based on your interests.',
        'These third parties have their own privacy policies governing their use of cookies.'
      ]
    },
    {
      title: 'Managing Your Cookies',
      content: [
        'You can control cookies through your browser settings. Most browsers allow you to:',
        'View and delete existing cookies stored on your device.',
        'Block cookies from specific websites or all websites.',
        'Receive notifications when cookies are being set.',
        'Note that disabling cookies may affect the functionality of our website.'
      ]
    },
    {
      title: 'Cookie Consent',
      content: [
        'When you first visit our website, we will ask for your consent to use cookies.',
        'You can withdraw your consent at any time by changing your cookie preferences.',
        'Essential cookies will continue to be used even if you decline other types.',
        'Your cookie preferences are stored locally and will not affect other devices or browsers.'
      ]
    }
  ] : [
    {
      title: 'ما هي ملفات تعريف الارتباط؟',
      content: [
        'ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقعنا الإلكتروني.',
        'تساعدنا في تقديم تجربة أفضل لك من خلال تذكر تفضيلاتك وأنماط الاستخدام.',
        'لا يمكن لملفات تعريف الارتباط أن تضر جهازك ولا تحتوي على معلومات شخصية مثل اسمك أو عنوان بريدك الإلكتروني.',
        'معظم متصفحات الويب تقبل ملفات تعريف الارتباط تلقائياً، ولكن يمكنك تعديل إعدادات متصفحك لرفضها إذا كنت تفضل ذلك.'
      ]
    },
    {
      title: 'أنواع ملفات تعريف الارتباط التي نستخدمها',
      content: [
        'ملفات تعريف الارتباط الأساسية: ضرورية لعمل الموقع بشكل صحيح، بما في ذلك ميزات تسجيل الدخول والأمان.',
        'ملفات تعريف الارتباط للأداء: تساعدنا في فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع معلومات مجهولة.',
        'ملفات تعريف الارتباط الوظيفية: تتذكر تفضيلاتك وإعداداتك لتقديم تجربة شخصية.',
        'ملفات تعريف الارتباط التسويقية: تُستخدم لتقديم إعلانات ذات صلة وتتبع فعالية حملاتنا التسويقية.'
      ]
    },
    {
      title: 'كيف نستخدم ملفات تعريف الارتباط',
      content: [
        'لإبقائك مسجلاً للدخول أثناء جلستك وتذكر تفضيلات تسجيل الدخول الخاصة بك.',
        'لتخصيص تجربتك بناءً على موقعك ولغتك وتفضيلاتك.',
        'لتحليل أداء الموقع وتحديد المجالات التي تحتاج للتحسين.',
        'لإظهار فرص عمل ومحتوى مهني ذي صلة لك.',
        'لقياس فعالية جهودنا الإعلانية والتسويقية.'
      ]
    },
    {
      title: 'ملفات تعريف الارتباط من طرف ثالث',
      content: [
        'قد نستخدم خدمات طرف ثالث تضع ملفات تعريف الارتباط على جهازك، مثل:',
        'Google Analytics: لتحليل حركة المرور على الموقع وسلوك المستخدم.',
        'منصات التواصل الاجتماعي: لتمكين ميزات المشاركة الاجتماعية والمصادقة.',
        'شبكات الإعلان: لتقديم إعلانات مستهدفة بناءً على اهتماماتك.',
        'هذه الأطراف الثالثة لديها سياسات خصوصية خاصة بها تحكم استخدامها لملفات تعريف الارتباط.'
      ]
    },
    {
      title: 'إدارة ملفات تعريف الارتباط الخاصة بك',
      content: [
        'يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك. معظم المتصفحات تسمح لك بـ:',
        'عرض وحذف ملفات تعريف الارتباط الموجودة المخزنة على جهازك.',
        'حظر ملفات تعريف الارتباط من مواقع محددة أو جميع المواقع.',
        'تلقي إشعارات عند تعيين ملفات تعريف الارتباط.',
        'لاحظ أن تعطيل ملفات تعريف الارتباط قد يؤثر على وظائف موقعنا.'
      ]
    },
    {
      title: 'موافقة ملفات تعريف الارتباط',
      content: [
        'عند زيارة موقعنا لأول مرة، سنطلب موافقتك على استخدام ملفات تعريف الارتباط.',
        'يمكنك سحب موافقتك في أي وقت عن طريق تغيير تفضيلات ملفات تعريف الارتباط.',
        'ستستمر ملفات تعريف الارتباط الأساسية في الاستخدام حتى لو رفضت الأنواع الأخرى.',
        'يتم تخزين تفضيلات ملفات تعريف الارتباط محلياً ولن تؤثر على الأجهزة أو المتصفحات الأخرى.'
      ]
    }
  ];

  const cookieTypes = language === 'en' ? [
    {
      name: 'Essential',
      icon: '🔐',
      description: 'Required for basic website functionality',
      examples: 'Login sessions, security tokens, preference settings'
    },
    {
      name: 'Performance',
      icon: '📊',
      description: 'Help us understand website usage',
      examples: 'Page views, click tracking, error reporting'
    },
    {
      name: 'Functional',
      icon: '⚙️',
      description: 'Enhance your browsing experience',
      examples: 'Language settings, location data, customizations'
    },
    {
      name: 'Marketing',
      icon: '🎯',
      description: 'Deliver relevant ads and content',
      examples: 'Ad targeting, campaign tracking, social sharing'
    }
  ] : [
    {
      name: 'أساسية',
      icon: '🔐',
      description: 'مطلوبة للوظائف الأساسية للموقع',
      examples: 'جلسات تسجيل الدخول، رموز الأمان، إعدادات التفضيلات'
    },
    {
      name: 'الأداء',
      icon: '📊',
      description: 'تساعدنا في فهم استخدام الموقع',
      examples: 'مشاهدات الصفحة، تتبع النقرات، تقارير الأخطاء'
    },
    {
      name: 'وظيفية',
      icon: '⚙️',
      description: 'تعزز تجربة التصفح الخاصة بك',
      examples: 'إعدادات اللغة، بيانات الموقع، التخصيصات'
    },
    {
      name: 'تسويقية',
      icon: '🎯',
      description: 'تقديم إعلانات ومحتوى ذي صلة',
      examples: 'استهداف الإعلانات، تتبع الحملات، المشاركة الاجتماعية'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Cookie Policy' : 'سياسة ملفات تعريف الارتباط'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {language === 'en'
                ? 'Learn about how we use cookies and similar technologies on the SU\'UD platform to improve your experience and provide personalized services.'
                : 'تعرف على كيفية استخدامنا لملفات تعريف الارتباط والتقنيات المماثلة على منصة صُعود لتحسين تجربتك وتقديم خدمات شخصية.'
              }
            </p>
            <div className="text-sm text-gray-500">
              {language === 'en' ? 'Last updated: ' : 'آخر تحديث: '}
              {language === 'en' ? 'December 2024' : 'ديسمبر 2024'}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookie Types Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Cookie Categories' : 'فئات ملفات تعريف الارتباط'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'We use different types of cookies to provide you with the best possible experience.'
                : 'نستخدم أنواعاً مختلفة من ملفات تعريف الارتباط لتزويدك بأفضل تجربة ممكنة.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="text-3xl mb-4 text-center">{type.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {type.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {type.description}
                </p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    <strong>{language === 'en' ? 'Examples:' : 'أمثلة:'}</strong> {type.examples}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-gray-700 leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Browser Settings Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-8 border border-orange-200"
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🍪</span>
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'en' ? 'Managing Cookies in Your Browser' : 'إدارة ملفات تعريف الارتباط في متصفحك'}
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              {language === 'en'
                ? 'You have full control over cookies. Here\'s how to manage them in popular browsers:'
                : 'لديك سيطرة كاملة على ملفات تعريف الارتباط. إليك كيفية إدارتها في المتصفحات الشائعة:'
              }
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4">
                <strong>Chrome:</strong> {language === 'en' ? 'Settings > Privacy and security > Cookies' : 'الإعدادات > الخصوصية والأمان > ملفات تعريف الارتباط'}
              </div>
              <div className="bg-white rounded-lg p-4">
                <strong>Firefox:</strong> {language === 'en' ? 'Options > Privacy & Security > Cookies' : 'الخيارات > الخصوصية والأمان > ملفات تعريف الارتباط'}
              </div>
              <div className="bg-white rounded-lg p-4">
                <strong>Safari:</strong> {language === 'en' ? 'Preferences > Privacy > Cookies' : 'التفضيلات > الخصوصية > ملفات تعريف الارتباط'}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
