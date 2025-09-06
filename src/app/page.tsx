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
                
                {/* Main image placeholder - would be replaced with actual image */}
                <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                  <div className="w-96 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white/20 rounded-full mb-6 mx-auto flex items-center justify-center">
                        <span className="text-4xl">👨‍💼</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Professional Growth</h3>
                      <p className="text-indigo-100">Find your dream career today</p>
                    </div>
                  </div>
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
