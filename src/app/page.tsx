"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/shared/components/ui";
import { Navbar, Footer, PageSkeleton } from "@/shared/components";
import { useAuth, useI18n } from "@/shared/contexts";
import { generatePageMetadata } from "@/shared/config/metadata";
import { jobService } from "@/shared/services";

export default function Home() {
  const { isLoading } = useAuth();
  const { language } = useI18n();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Riyadh, Saudi Arabia");
  const [jobStats, setJobStats] = useState({
    total_active_jobs: 0,
    total_companies: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    loadJobData();
  }, []);

  const loadJobData = async () => {
    try {
      setLoadingStats(true);
      
      // Load job statistics with fallback
      try {
        const statsResponse = await jobService.getJobStats();
        console.log('Stats response:', statsResponse); // Debug log
        if (statsResponse?.success && statsResponse.data) {
          setJobStats(statsResponse.data);
        } else {
          console.warn('Stats API returned unsuccessful response:', statsResponse);
          // Use fallback data
          setJobStats({
            total_active_jobs: 150,
            total_companies: 45
          });
        }
      } catch (statsError) {
        console.error('Failed to load job stats:', statsError);
        // Use fallback data when API fails
        setJobStats({
          total_active_jobs: 150,
          total_companies: 45
        });
      }
      
      // Load recent jobs with fallback
      try {
        const recentJobsResponse = await jobService.getRecentJobs(4);
        console.log('Recent jobs response:', recentJobsResponse); // Debug log
        if (recentJobsResponse?.success && recentJobsResponse.data?.jobs) {
          setRecentJobs(recentJobsResponse.data.jobs);
        } else {
          console.warn('Recent jobs API returned unsuccessful response:', recentJobsResponse);
          // Use fallback data
          setRecentJobs([]);
        }
      } catch (recentJobsError) {
        console.error('Failed to load recent jobs:', recentJobsError);
        // Use empty array as fallback
        setRecentJobs([]);
      }
    } catch (error) {
      console.error('Failed to load job data:', error);
      // Set fallback data for all
      setJobStats({
        total_active_jobs: 150,
        total_companies: 45
      });
      setRecentJobs([]);
    } finally {
      setLoadingStats(false);
    }
  };

  if (isLoading) {
    return <PageSkeleton type="site" />;
  }

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
                    if (searchTerm) searchParams.append("search", searchTerm);
    if (selectedLocation && selectedLocation !== "Riyadh, Saudi Arabia") {
      searchParams.append("location", selectedLocation);
    }
    router.push(`/jobs?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-20 overflow-hidden min-h-[700px]">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-white to-indigo-50/30" />

        {/* Decorative elements */}
        <div
          className={`absolute top-20 w-32 h-32 bg-indigo-100 rounded-full opacity-50 ${
            language === "ar" ? "left-20" : "right-20"
          }`}
        />
        <div
          className={`absolute bottom-20 w-24 h-24 bg-purple-100 rounded-full opacity-50 ${
            language === "ar" ? "right-20" : "left-20"
          }`}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`space-y-8 ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  {language === "en" ? (
                    <>
                      Discover
                      <br />
                      more than
                      <br />
                      <span className="text-indigo-600 relative">
                        {loadingStats ? '...' : `${jobStats.total_active_jobs}+`} Jobs
                        <svg
                          className="absolute -bottom-2 left-0 w-full h-3 text-indigo-600"
                          viewBox="0 0 200 12"
                          fill="none"
                        >
                          <path
                            d="M2 8C50 2 100 10 150 6C180 4 200 8 200 8"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      اكتشف
                      <br />
                      أكثر من
                      <br />
                      <span className="text-indigo-600 relative">
                        {loadingStats ? '...' : `${jobStats.total_active_jobs}+`} وظيفة
                        <svg
                          className={`absolute -bottom-2 w-full h-3 text-indigo-600 ${
                            language === "ar" ? "right-0" : "left-0"
                          }`}
                          viewBox="0 0 200 12"
                          fill="none"
                        >
                          <path
                            d="M2 8C50 2 100 10 150 6C180 4 200 8 200 8"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </>
                  )}
                </h1>

                <p
                  className={`text-xl text-gray-600 leading-relaxed ${
                    language === "ar" ? "max-w-lg ml-auto" : "max-w-lg"
                  }`}
                >
                  {language === "en"
                    ? "Great platform for the job seeker that searching for new career heights and passionate about startups."
                    : "منصة رائعة للباحث عن عمل الذي يبحث عن آفاق مهنية جديدة ومتحمس للشركات الناشئة."}
                </p>
              </div>

              {/* Popular Tags */}
              <div>
                <p className="text-sm text-gray-500 mb-4 font-medium">
                  {language === "en" ? "Popular :" : "شائع :"}
                </p>
                <div
                  className={`flex flex-wrap gap-3 ${
                    language === "ar" ? "justify-end" : "justify-start"
                  }`}
                >
                  {[
                    language === "en" ? "UI Designer" : "مصمم واجهات",
                    language === "en" ? "UX Researcher" : "باحث تجربة المستخدم",
                    language === "en" ? "Android" : "أندرويد",
                    language === "en" ? "Admin" : "إداري",
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-indigo-50 text-indigo-600 text-sm rounded-full cursor-pointer hover:bg-indigo-100 transition-colors font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: language === "ar" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:flex justify-center items-center"
            >
              {/* Professional man pointing */}
              <Image
                src="/images/man.png"
                alt="Professional man pointing"
                width={400}
                height={400}
                className="w-full max-w-md h-auto object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Job Search Bar - Overlay with high z-index */}
        <div className="absolute bottom-8 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Job Title Input */}
                <div
                  className={`flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 ${
                    language === "ar" ? "flex-row-reverse" : ""
                  }`}
                >
                  <svg
                    className={`w-5 h-5 text-gray-400 ${
                      language === "ar" ? "ml-3" : "mr-3"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder={
                      language === "en"
                        ? "Job title or keyword"
                        : "المسمى الوظيفي أو الكلمة المفتاحية"
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`bg-transparent border-0 outline-none flex-1 text-gray-700 placeholder-gray-400 text-base ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  />
                </div>

                {/* Location Input */}
                <div
                  className={`flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 ${
                    language === "ar" ? "flex-row-reverse" : ""
                  }`}
                >
                  <svg
                    className={`w-5 h-5 text-gray-400 ${
                      language === "ar" ? "ml-3" : "mr-3"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className={`bg-transparent border-0 outline-none flex-1 text-gray-700 cursor-pointer text-base ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    <option value="Riyadh, Saudi Arabia">
                      {language === "en"
                        ? "Riyadh, Saudi Arabia"
                        : "الرياض، السعودية"}
                    </option>
                    <option value="Riyadh, Saudi Arabia">
                      {language === "en"
                        ? "Riyadh, Saudi Arabia"
                        : "الرياض، السعودية"}
                    </option>
                    <option value="Jeddah, Saudi Arabia">
                      {language === "en"
                        ? "Jeddah, Saudi Arabia"
                        : "جدة، السعودية"}
                    </option>
                    <option value="Dubai, UAE">
                      {language === "en" ? "Dubai, UAE" : "دبي، الإمارات"}
                    </option>
                  </select>
                </div>

                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 w-full"
                >
                  {language === "en" ? "Search my job" : "ابحث عن وظيفتي"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "en"
                ? "Trusted by Leading Companies"
                : "موثوق من قبل الشركات الرائدة"}
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              {language === "en"
                ? "Join thousands of companies that trust our platform to find the best talent"
                : "انضم إلى آلاف الشركات التي تثق في منصتنا للعثور على أفضل المواهب"}
            </p>

            {/* Companies Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
              {[
                {
                  name: "Vodafone",
                  logo: "📱",
                  description: "Telecommunications",
                },
                {
                  name: "Intel",
                  logo: "🔧",
                  description: "Technology",
                },
                {
                  name: "Tesla",
                  logo: "⚡",
                  description: "Automotive",
                },
                {
                  name: "AMD",
                  logo: "🔥",
                  description: "Semiconductors",
                },
                {
                  name: "Talkit",
                  logo: "💬",
                  description: "Communication",
                },
              ].map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:bg-indigo-50 transition-colors">
                    {company.logo}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    {company.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {loadingStats ? '...' : `${jobStats.total_active_jobs}+`}
                </div>
                <div className="text-gray-600">
                  {language === "en" ? "Active Jobs" : "وظائف نشطة"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {loadingStats ? '...' : `${jobStats.total_companies}+`}
                </div>
                <div className="text-gray-600">
                  {language === "en" ? "Companies" : "شركة"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  50K+
                </div>
                <div className="text-gray-600">
                  {language === "en" ? "Job Seekers" : "باحث عن عمل"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "en"
                ? "Recent Jobs Available"
                : "الوظائف المتاحة حديثاً"}
            </h2>
            <p className="text-gray-600">
              {language === "en"
                ? "At et rebus premium liberiect amet locus et element eleginit"
                : "في موقع وعنصر متميز للحرية والمكان والعنصر"}
            </p>
            <Button variant="outline">
              {language === "en" ? "View all" : "عرض الكل"}
            </Button>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {recentJobs.length > 0 ? (
              recentJobs.map((job: any, index: number) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => router.push(`/jobs/${job.slug || job.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {job.company?.company_name || 'Company Name'}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          {job.category && (
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
                              </svg>
                              <span>{job.category}</span>
                            </span>
                          )}
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{job.job_type?.replace('-', ' ') || 'Full time'}</span>
                          </span>
                          {job.salary_min && job.salary_max && (
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              <span>{job.salary_currency || 'SAR'} {job.salary_min?.toLocaleString()}-{job.salary_max?.toLocaleString()}</span>
                            </span>
                          )}
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push('/jobs');
                        }}
                      >
                        {language === "en" ? "Apply Now" : "قدم الآن"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Loading or empty state
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
