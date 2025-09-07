'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/components/ui';
import { Navbar, Footer, PageSkeleton } from '@/shared/components';
import { useAuth, useI18n } from '@/shared/contexts';

export default function CompaniesPage() {
  const { language } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  // Mock companies data
  const companies = [
    {
      id: 1,
      name: 'TechCorp Saudi',
      logo: '🏢',
      industry: 'Technology',
      location: 'Riyadh, Saudi Arabia',
      employees: '500-1000',
      description: language === 'en' 
        ? 'Leading technology company in Saudi Arabia, specializing in software development and digital transformation.'
        : 'شركة تقنية رائدة في المملكة العربية السعودية، متخصصة في تطوير البرمجيات والتحول الرقمي.',
      openJobs: 24,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Saudi Digital Solutions',
      logo: '💻',
      industry: 'Technology',
      location: 'Jeddah, Saudi Arabia',
      employees: '100-500',
      description: language === 'en'
        ? 'Digital transformation and software solutions provider for businesses across the Middle East.'
        : 'مزود حلول التحول الرقمي والبرمجيات للشركات في جميع أنحاء الشرق الأوسط.',
      openJobs: 18,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Innovation Hub KSA',
      logo: '🚀',
      industry: 'Consulting',
      location: 'Dammam, Saudi Arabia',
      employees: '50-100',
      description: language === 'en'
        ? 'Innovation and consulting firm helping startups and enterprises achieve their digital goals.'
        : 'شركة استشارات وابتكار تساعد الشركات الناشئة والمؤسسات على تحقيق أهدافها الرقمية.',
      openJobs: 12,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Green Energy Saudi',
      logo: '🌱',
      industry: 'Energy',
      location: 'Riyadh, Saudi Arabia',
      employees: '200-500',
      description: language === 'en'
        ? 'Renewable energy company focused on sustainable solutions for the Kingdom\'s Vision 2030.'
        : 'شركة طاقة متجددة تركز على الحلول المستدامة لرؤية المملكة 2030.',
      openJobs: 15,
      rating: 4.5
    }
  ];

  const industries = [
    { value: '', label: language === 'en' ? 'All Industries' : 'جميع الصناعات' },
    { value: 'Technology', label: language === 'en' ? 'Technology' : 'التقنية' },
    { value: 'Consulting', label: language === 'en' ? 'Consulting' : 'الاستشارات' },
    { value: 'Energy', label: language === 'en' ? 'Energy' : 'الطاقة' },
    { value: 'Finance', label: language === 'en' ? 'Finance' : 'المالية' },
    { value: 'Healthcare', label: language === 'en' ? 'Healthcare' : 'الرعاية الصحية' }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

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
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Browse Companies' : 'تصفح الشركات'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {language === 'en'
                ? 'Discover amazing companies and explore career opportunities with leading organizations.'
                : 'اكتشف الشركات المذهلة واستكشف الفرص الوظيفية مع المنظمات الرائدة.'
              }
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={language === 'en' ? 'Search companies...' : 'البحث عن الشركات...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="md:w-64">
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {industries.map((industry) => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {language === 'en' ? 'Featured Companies' : 'الشركات المميزة'}
            </h2>
            <p className="text-gray-600">
              {filteredCompanies.length} {language === 'en' ? 'companies found' : 'شركة موجودة'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {company.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>{company.industry}</span>
                      <span>•</span>
                      <span>{company.employees} {language === 'en' ? 'employees' : 'موظف'}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium text-gray-700">{company.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {company.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    📍 {company.location}
                  </div>
                  <div className="text-sm font-medium text-indigo-600">
                    {company.openJobs} {language === 'en' ? 'open jobs' : 'وظيفة متاحة'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    {language === 'en' ? 'View Company' : 'عرض الشركة'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'No companies found' : 'لم يتم العثور على شركات'}
              </h3>
              <p className="text-gray-600">
                {language === 'en'
                  ? 'Try adjusting your search terms or filters'
                  : 'حاول تعديل مصطلحات البحث أو المرشحات'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
