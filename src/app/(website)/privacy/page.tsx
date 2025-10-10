'use client';

import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/shared/components';
import { useI18n } from '@/shared/contexts';

export default function PrivacyPolicyPage() {
  const { language } = useI18n();

  const sections = language === 'en' ? [
    {
      title: 'Information We Collect',
      content: [
        'Personal Information: Name, email address, phone number, and professional details when you create an account.',
        'Profile Information: Work experience, education, skills, and other career-related information you choose to share.',
        'Usage Data: How you interact with our platform, including pages visited, time spent, and features used.',
        'Communication Data: Messages sent through our platform and correspondence with our support team.'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'Provide and improve our job matching and recruitment services.',
        'Connect job seekers with potential employers and vice versa.',
        'Send you relevant job opportunities and platform updates.',
        'Analyze usage patterns to enhance user experience.',
        'Comply with legal obligations and protect our users\' safety.'
      ]
    },
    {
      title: 'Information Sharing',
      content: [
        'With Employers: When you apply for jobs, your profile information is shared with relevant employers.',
        'Service Providers: We may share data with trusted third-party providers who help us operate our platform.',
        'Legal Compliance: We may disclose information when required by law or to protect our users and platform.',
        'Business Transfers: In case of merger or acquisition, your data may be transferred to the new entity.'
      ]
    },
    {
      title: 'Data Security',
      content: [
        'We implement industry-standard security measures to protect your personal information.',
        'All data transmission is encrypted using SSL/TLS protocols.',
        'Access to personal data is limited to authorized personnel only.',
        'Regular security audits are conducted to identify and address potential vulnerabilities.'
      ]
    },
    {
      title: 'Your Rights',
      content: [
        'Access: Request a copy of your personal information we hold.',
        'Correction: Update or correct inaccurate personal information.',
        'Deletion: Request deletion of your account and associated data.',
        'Portability: Request your data in a machine-readable format.',
        'Withdrawal: Withdraw consent for processing at any time.'
      ]
    },
    {
      title: 'Contact Us',
      content: [
        'If you have any questions about this Privacy Policy or our data practices, please contact us at:',
        'Email: RSL111@hotmail.com',
        'Phone: 0550033610',
        'Address: 24°50\'43.6"N 46°47\'43.0"E, Riyadh, Saudi Arabia',
        'We will respond to your inquiries within 30 days.'
      ]
    }
  ] : [
    {
      title: 'المعلومات التي نجمعها',
      content: [
        'المعلومات الشخصية: الاسم وعنوان البريد الإلكتروني ورقم الهاتف والتفاصيل المهنية عند إنشاء حساب.',
        'معلومات الملف الشخصي: الخبرة العملية والتعليم والمهارات ومعلومات أخرى متعلقة بالمسيرة المهنية تختار مشاركتها.',
        'بيانات الاستخدام: كيفية تفاعلك مع منصتنا، بما في ذلك الصفحات المُزارة والوقت المُقضى والميزات المُستخدمة.',
        'بيانات التواصل: الرسائل المرسلة عبر منصتنا والمراسلات مع فريق الدعم لدينا.'
      ]
    },
    {
      title: 'كيف نستخدم معلوماتك',
      content: [
        'تقديم وتحسين خدمات مطابقة الوظائف والتوظيف لدينا.',
        'ربط الباحثين عن العمل بأصحاب العمل المحتملين والعكس.',
        'إرسال فرص عمل ذات صلة وتحديثات المنصة إليك.',
        'تحليل أنماط الاستخدام لتعزيز تجربة المستخدم.',
        'الامتثال للالتزامات القانونية وحماية سلامة مستخدمينا.'
      ]
    },
    {
      title: 'مشاركة المعلومات',
      content: [
        'مع أصحاب العمل: عند التقدم للوظائف، يتم مشاركة معلومات ملفك الشخصي مع أصحاب العمل ذوي الصلة.',
        'مقدمي الخدمات: قد نشارك البيانات مع مقدمي خدمات موثوقين يساعدوننا في تشغيل منصتنا.',
        'الامتثال القانوني: قد نكشف المعلومات عند الحاجة بموجب القانون أو لحماية مستخدمينا ومنصتنا.',
        'التحويلات التجارية: في حالة الاندماج أو الاستحواذ، قد يتم نقل بياناتك للكيان الجديد.'
      ]
    },
    {
      title: 'أمان البيانات',
      content: [
        'نطبق تدابير أمنية معيارية في الصناعة لحماية معلوماتك الشخصية.',
        'جميع عمليات نقل البيانات مشفرة باستخدام بروتوكولات SSL/TLS.',
        'الوصول للبيانات الشخصية مقتصر على الموظفين المخولين فقط.',
        'تُجرى مراجعات أمنية منتظمة لتحديد ومعالجة الثغرات المحتملة.'
      ]
    },
    {
      title: 'حقوقك',
      content: [
        'الوصول: طلب نسخة من معلوماتك الشخصية التي نحتفظ بها.',
        'التصحيح: تحديث أو تصحيح المعلومات الشخصية غير الصحيحة.',
        'الحذف: طلب حذف حسابك والبيانات المرتبطة به.',
        'قابلية النقل: طلب بياناتك في تنسيق قابل للقراءة آلياً.',
        'السحب: سحب الموافقة على المعالجة في أي وقت.'
      ]
    },
    {
      title: 'تواصل معنا',
      content: [
        'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات البيانات لدينا، يرجى الاتصال بنا على:',
        'البريد الإلكتروني: RSL111@hotmail.com',
        'الهاتف: 0550033610',
        'العنوان: 24°50\'43.6"N 46°47\'43.0"E، الرياض، المملكة العربية السعودية',
        'سنرد على استفساراتك في غضون 30 يوماً.'
      ]
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
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {language === 'en'
                ? 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use the SU\'UD platform.'
                : 'خصوصيتك مهمة بالنسبة لنا. توضح هذه السياسة كيف نجمع ونستخدم ونحمي معلوماتك الشخصية عند استخدام منصة صُعود.'
              }
            </p>
            <div className="text-sm text-gray-500">
              {language === 'en' ? 'Last updated: ' : 'آخر تحديث: '}
              {language === 'en' ? 'December 2024' : 'ديسمبر 2024'}
            </div>
          </motion.div>
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
                  <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
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

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 text-center"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Questions About Privacy?' : 'أسئلة حول الخصوصية؟'}
            </h3>
            <p className="text-gray-700 mb-4">
              {language === 'en'
                ? 'Our privacy team is here to help. Contact us if you need clarification on any part of this policy.'
                : 'فريق الخصوصية لدينا هنا للمساعدة. تواصل معنا إذا كنت بحاجة لتوضيح أي جزء من هذه السياسة.'
              }
            </p>
            <div className="text-indigo-600 font-medium">
              RSL111@hotmail.com
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
