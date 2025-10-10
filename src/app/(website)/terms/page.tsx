'use client';

import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/shared/components';
import { useI18n } from '@/shared/contexts';

export default function TermsOfServicePage() {
  const { language } = useI18n();

  const sections = language === 'en' ? [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using the SU\'UD platform, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These terms apply to all visitors, users, and others who access or use the service.',
        'SU\'UD reserves the right to update these terms at any time without prior notice.'
      ]
    },
    {
      title: 'Description of Service',
      content: [
        'SU\'UD is a professional networking and job placement platform that connects job seekers with employers.',
        'We provide tools for creating professional profiles, searching for jobs, and facilitating recruitment processes.',
        'The service includes job matching algorithms, communication tools, and career development resources.',
        'We strive to maintain accurate and up-to-date information but do not guarantee the completeness or accuracy of all content.'
      ]
    },
    {
      title: 'User Responsibilities',
      content: [
        'You are responsible for maintaining the confidentiality of your account and password.',
        'You agree to provide accurate, current, and complete information during registration and keep it updated.',
        'You must not use the service for any unlawful or prohibited activities.',
        'You are responsible for all activities that occur under your account.',
        'You must respect the intellectual property rights of others and SU\'UD.'
      ]
    },
    {
      title: 'Prohibited Uses',
      content: [
        'Creating fake profiles or providing false information about yourself or your company.',
        'Posting discriminatory job listings or content that violates applicable laws.',
        'Harassment, spam, or unsolicited communications to other users.',
        'Attempting to gain unauthorized access to our systems or other users\' accounts.',
        'Using automated tools to scrape data or overwhelm our servers.'
      ]
    },
    {
      title: 'Intellectual Property',
      content: [
        'The SU\'UD platform and its original content are the property of SU\'UD and are protected by copyright and other intellectual property laws.',
        'You retain ownership of the content you post, but grant SU\'UD a license to use it for platform operations.',
        'You may not reproduce, distribute, or create derivative works from our content without permission.',
        'All trademarks, logos, and service marks displayed on the platform are the property of their respective owners.'
      ]
    },
    {
      title: 'Limitation of Liability',
      content: [
        'SU\'UD is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.',
        'We do not guarantee job placement or successful matches between users.',
        'The platform is provided "as is" without warranties of any kind.',
        'Our total liability to you for any claim shall not exceed the amount you paid to us in the last 12 months.',
        'Some jurisdictions do not allow the exclusion of certain warranties, so some limitations may not apply to you.'
      ]
    },
    {
      title: 'Termination',
      content: [
        'Either party may terminate your account at any time for any reason.',
        'SU\'UD may suspend or terminate accounts that violate these terms.',
        'Upon termination, your right to use the service will cease immediately.',
        'We will make reasonable efforts to provide notice of termination when possible.',
        'Certain provisions of these terms will survive termination.'
      ]
    }
  ] : [
    {
      title: 'قبول الشروط',
      content: [
        'من خلال الوصول إلى واستخدام منصة صُعود، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية.',
        'إذا كنت لا توافق على الالتزام بما سبق، يرجى عدم استخدام هذه الخدمة.',
        'تنطبق هذه الشروط على جميع الزوار والمستخدمين وغيرهم ممن يصلون إلى الخدمة أو يستخدمونها.',
        'تحتفظ صُعود بالحق في تحديث هذه الشروط في أي وقت دون إشعار مسبق.'
      ]
    },
    {
      title: 'وصف الخدمة',
      content: [
        'صُعود هي منصة للشبكات المهنية وتوظيف الوظائف التي تربط الباحثين عن العمل بأصحاب العمل.',
        'نوفر أدوات لإنشاء ملفات شخصية مهنية والبحث عن الوظائف وتسهيل عمليات التوظيف.',
        'تشمل الخدمة خوارزميات مطابقة الوظائف وأدوات التواصل وموارد التطوير المهني.',
        'نسعى للحفاظ على معلومات دقيقة ومحدثة ولكننا لا نضمن اكتمال أو دقة جميع المحتويات.'
      ]
    },
    {
      title: 'مسؤوليات المستخدم',
      content: [
        'أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور.',
        'توافق على تقديم معلومات دقيقة وحالية وكاملة أثناء التسجيل والحفاظ على تحديثها.',
        'يجب ألا تستخدم الخدمة لأي أنشطة غير قانونية أو محظورة.',
        'أنت مسؤول عن جميع الأنشطة التي تحدث تحت حسابك.',
        'يجب أن تحترم حقوق الملكية الفكرية للآخرين وصُعود.'
      ]
    },
    {
      title: 'الاستخدامات المحظورة',
      content: [
        'إنشاء ملفات شخصية مزيفة أو تقديم معلومات كاذبة عن نفسك أو شركتك.',
        'نشر إعلانات وظائف تمييزية أو محتوى ينتهك القوانين المعمول بها.',
        'المضايقة أو الرسائل غير المرغوب فيها أو الاتصالات غير المطلوبة مع المستخدمين الآخرين.',
        'محاولة الحصول على وصول غير مصرح به إلى أنظمتنا أو حسابات المستخدمين الآخرين.',
        'استخدام أدوات آلية لاستخراج البيانات أو إثقال خوادمنا.'
      ]
    },
    {
      title: 'الملكية الفكرية',
      content: [
        'منصة صُعود ومحتواها الأصلي هي ملكية صُعود ومحمية بحقوق النشر وقوانين الملكية الفكرية الأخرى.',
        'تحتفظ بملكية المحتوى الذي تنشره، لكنك تمنح صُعود ترخيصاً لاستخدامه لعمليات المنصة.',
        'لا يجوز لك إعادة إنتاج أو توزيع أو إنشاء أعمال مشتقة من محتوانا دون إذن.',
        'جميع العلامات التجارية والشعارات وعلامات الخدمة المعروضة على المنصة هي ملكية أصحابها المعنيين.'
      ]
    },
    {
      title: 'تقييد المسؤولية',
      content: [
        'صُعود غير مسؤولة عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية تنشأ من استخدامك للمنصة.',
        'نحن لا نضمن توظيف الوظائف أو المطابقات الناجحة بين المستخدمين.',
        'المنصة متوفرة "كما هي" دون ضمانات من أي نوع.',
        'مسؤوليتنا الإجمالية تجاهك لأي مطالبة لن تتجاوز المبلغ الذي دفعته لنا في آخر 12 شهراً.',
        'بعض الولايات القضائية لا تسمح باستبعاد ضمانات معينة، لذا قد لا تنطبق بعض القيود عليك.'
      ]
    },
    {
      title: 'الإنهاء',
      content: [
        'يجوز لأي طرف إنهاء حسابك في أي وقت لأي سبب.',
        'قد تقوم صُعود بتعليق أو إنهاء الحسابات التي تنتهك هذه الشروط.',
        'عند الإنهاء، سيتوقف حقك في استخدام الخدمة فوراً.',
        'سنبذل جهوداً معقولة لتقديم إشعار بالإنهاء عندما يكون ذلك ممكناً.',
        'بعض أحكام هذه الشروط ستبقى سارية بعد الإنهاء.'
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
              {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {language === 'en'
                ? 'Please read these Terms of Service carefully before using the SU\'UD platform. These terms govern your use of our services and establish the rights and responsibilities of all users.'
                : 'يرجى قراءة شروط الخدمة هذه بعناية قبل استخدام منصة صُعود. تحكم هذه الشروط استخدامك لخدماتنا وتحدد حقوق ومسؤوليات جميع المستخدمين.'
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
                  <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-gray-700 leading-relaxed flex items-start">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {item}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Agreement Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-200"
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📋</span>
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'en' ? 'By Using Our Service' : 'باستخدام خدمتنا'}
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              {language === 'en'
                ? 'You acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you have questions about these terms, please contact our legal team.'
                : 'تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بشروط الخدمة هذه. إذا كان لديك أسئلة حول هذه الشروط، يرجى الاتصال بفريقنا القانوني.'
              }
            </p>
            <div className="text-purple-600 font-medium">
              RSL111@hotmail.com
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
