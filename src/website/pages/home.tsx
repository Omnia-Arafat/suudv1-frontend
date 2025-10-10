"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/shared/components/ui";
import { Navbar, Footer, PageSkeleton } from "@/shared/components";
import { useAuth, useI18n } from "@/shared/contexts";

export default function Home() {
  const { isLoading } = useAuth();
  const { language } = useI18n();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Florence, Italy");

  if (isLoading) {
    return <PageSkeleton type="site" />;
  }

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.append("search", searchTerm);
    if (selectedLocation && selectedLocation !== "Florence, Italy") {
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
        <div className="absolute top-20 right-20 w-32 h-32 bg-indigo-100 rounded-full opacity-50" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-100 rounded-full opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left space-y-8"
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
                        5000+ Jobs
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
                        5000+ وظيفة
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
                  )}
                </h1>

                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
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
                <div className="flex flex-wrap gap-3">
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

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
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
                <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
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
                    className="bg-transparent border-0 outline-none flex-1 text-gray-700 placeholder-gray-400 text-base"
                  />
                </div>

                {/* Location Input */}
                <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
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
                    className="bg-transparent border-0 outline-none flex-1 text-gray-700 cursor-pointer text-base"
                  >
                    <option value="Florence, Italy">
                      {language === "en"
                        ? "Florence, Italy"
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
                  5000+
                </div>
                <div className="text-gray-600">
                  {language === "en" ? "Active Jobs" : "وظائف نشطة"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  1000+
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
            {[
              {
                id: 1,
                title:
                  language === "en"
                    ? "Forward Security Director"
                    : "مدير الأمن المتقدم",
                company: "Seven, Snabble and Snablist Co",
                location: "New York, USA",
                type: "Full time",
                salary: "$40000-$44000",
                tags: ["Hacker & Tourism"],
                logo: "🛡️",
                featured: true,
              },
              {
                id: 2,
                title:
                  language === "en"
                    ? "Regional Creative Facilitator"
                    : "ميسر الإبداع الإقليمي",
                company: "Wibble - Backer Co",
                location: "Los Angeles, USA",
                type: "Part time",
                salary: "$30000-$32000",
                tags: ["Media"],
                logo: "🎨",
                featured: false,
              },
              {
                id: 3,
                title:
                  language === "en"
                    ? "Internal Integration Planner"
                    : "مخطط التكامل الداخلي",
                company: "Man, Groups and Fant Inc",
                location: "Texas, USA",
                type: "Full time",
                salary: "$40000-$50000",
                tags: ["Construction"],
                logo: "🏗️",
                featured: false,
              },
              {
                id: 4,
                title:
                  language === "en"
                    ? "District Intranet Director"
                    : "مدير الشبكة الداخلية للمقاطعة",
                company: "VorlicDruin - Wales Co",
                location: "Florida, USA",
                type: "Full time",
                salary: "$60000-$68000",
                tags: ["Commerce"],
                logo: "🌐",
                featured: false,
              },
            ].map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group bg-white border rounded-xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                  job.featured
                    ? "border-indigo-200 bg-indigo-50/30"
                    : "border-gray-200"
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
                      <p className="text-gray-600 text-sm mb-2">
                        {job.company}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z"
                            />
                          </svg>
                          <span>{job.tags[0]}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{job.type}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          <span>{job.salary}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg
                            className="w-4 h-4"
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
                    >
                      {language === "en" ? "Job Details" : "تفاصيل الوظيفة"}
                    </Button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
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
