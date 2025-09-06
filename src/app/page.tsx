'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Navbar, Footer, PageSkeleton } from '@/components/shared';
import { useAuth, useI18n } from '@/contexts';

export default function Home() {
  const { isLoading } = useAuth();
  const { language } = useI18n();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Florence, Italy');

  if (isLoading) {
    return <PageSkeleton />;
  }

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.append('search', searchTerm);
    if (selectedLocation && selectedLocation !== 'Florence, Italy') {
      searchParams.append('location', selectedLocation);
    }
    router.push(`/jobs?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gray-50 pt-16 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-indigo-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {language === 'en' ? (
                  <>
                    Discover<br />
                    more than<br />
                    <span className="text-indigo-600">5000+ Jobs</span>
                  </>
                ) : (
                  <>
                    اكتشف<br />
                    أكثر من<br />
                    <span className="text-indigo-600">5000+ وظيفة</span>
                  </>
                )}
              </h1>
              
              <div className="mb-8">
                <div className="h-1 w-24 bg-indigo-600 rounded-full mb-4" />
                <p className="text-lg text-gray-600 max-w-lg">
                  {language === 'en' 
                    ? 'Great platform for the job seeker that searching for new career heights and passionate about startups.'
                    : 'منصة رائعة للباحث عن عمل الذي يبحث عن آفاق مهنية جديدة ومتحمس للشركات الناشئة.'
                  }
                </p>
              </div>

              {/* Job Search Bar */}
              <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Job Title Input */}
                  <div className="flex items-center flex-1 bg-gray-50 rounded-lg px-4 py-3">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Job title or keyword' : 'المسمى الوظيفي أو الكلمة المفتاحية'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent border-0 outline-none flex-1 text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  
                  {/* Location Input */}
                  <div className="flex items-center flex-1 bg-gray-50 rounded-lg px-4 py-3">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="bg-transparent border-0 outline-none flex-1 text-gray-700 cursor-pointer"
                    >
                      <option value="Florence, Italy">{language === 'en' ? 'Florence, Italy' : 'الرياض، السعودية'}</option>
                      <option value="Riyadh, Saudi Arabia">{language === 'en' ? 'Riyadh, Saudi Arabia' : 'الرياض، السعودية'}</option>
                      <option value="Jeddah, Saudi Arabia">{language === 'en' ? 'Jeddah, Saudi Arabia' : 'جدة، السعودية'}</option>
                      <option value="Dubai, UAE">{language === 'en' ? 'Dubai, UAE' : 'دبي، الإمارات'}</option>
                    </select>
                  </div>
                  
                  {/* Search Button */}
                  <Button 
                    onClick={handleSearch}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium"
                  >
                    {language === 'en' ? 'Search my job' : 'ابحث عن وظيفتي'}
                  </Button>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2">
                  {language === 'en' ? 'Popular :' : 'شائع :'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    language === 'en' ? 'UI Designer' : 'مصمم واجهات',
                    language === 'en' ? 'UX Researcher' : 'باحث تجربة المستخدم',
                    language === 'en' ? 'Android' : 'أندرويد',
                    language === 'en' ? 'Admin' : 'إداري'
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full cursor-pointer hover:bg-indigo-100 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full opacity-50" />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-100 rounded-full opacity-50" />
                
                {/* Professional man with certificate */}
                <div className="relative">
                  <img 
                    src="data:image/jpeg;base64,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"
                    alt="Professional man holding certificate" 
                    className="w-96 h-96 rounded-2xl object-cover shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Featured Companies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <p className="text-center text-gray-500 mb-8">
              {language === 'en' ? 'Companies we helped grow' : 'الشركات التي ساعدناها على النمو'}
            </p>
            <div className="flex items-center justify-center space-x-12 opacity-60">
              {[
                { name: 'Vodafone', logo: '📱' },
                { name: 'Intel', logo: '🔧' },
                { name: 'Tesla', logo: '⚡' },
                { name: 'AMD', logo: '🔥' },
                { name: 'Talkit', logo: '💬' },
              ].map((company, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-400">
                  <span className="text-2xl">{company.logo}</span>
                  <span className="font-medium text-lg">{company.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {language === 'en' ? 'Recent Jobs Available' : 'الوظائف المتاحة حديثاً'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'At et rebus premium liberiect amet locus et element eleginit'
                : 'في موقع وعنصر متميز للحرية والمكان والعنصر'
              }
            </p>
            <Button variant="outline">
              {language === 'en' ? 'View all' : 'عرض الكل'}
            </Button>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: language === 'en' ? 'Forward Security Director' : 'مدير الأمن المتقدم',
                company: 'Seven, Snabble and Snablist Co',
                location: 'New York, USA',
                type: 'Full time',
                salary: '$40000-$44000',
                tags: ['Hacker & Tourism'],
                logo: '🛡️',
                featured: true
              },
              {
                id: 2,
                title: language === 'en' ? 'Regional Creative Facilitator' : 'ميسر الإبداع الإقليمي',
                company: 'Wibble - Backer Co',
                location: 'Los Angeles, USA',
                type: 'Part time',
                salary: '$30000-$32000',
                tags: ['Media'],
                logo: '🎨',
                featured: false
              },
              {
                id: 3,
                title: language === 'en' ? 'Internal Integration Planner' : 'مخطط التكامل الداخلي',
                company: 'Man, Groups and Fant Inc',
                location: 'Texas, USA',
                type: 'Full time',
                salary: '$40000-$50000',
                tags: ['Construction'],
                logo: '🏗️',
                featured: false
              },
              {
                id: 4,
                title: language === 'en' ? 'District Intranet Director' : 'مدير الشبكة الداخلية للمقاطعة',
                company: 'VorlicDruin - Wales Co',
                location: 'Florida, USA',
                type: 'Full time',
                salary: '$60000-$68000',
                tags: ['Commerce'],
                logo: '🌐',
                featured: false
              },
            ].map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group bg-white border rounded-xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                  job.featured ? 'border-indigo-200 bg-indigo-50/30' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      {job.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
                          </svg>
                          <span>{job.tags[0]}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{job.type}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span>{job.salary}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span>{job.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white">
                      {language === 'en' ? 'Job Details' : 'تفاصيل الوظيفة'}
                    </Button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
