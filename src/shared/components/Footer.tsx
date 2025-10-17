"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useI18n } from "@/shared/contexts";
import { useAuth } from "@/shared/contexts/AuthContext";

const footerSections = {
  en: {
    company: {
      title: "Company",
      links: [{ name: "About Us", href: "/about" }],
    },
    jobSeekers: {
      title: "For Job Seekers",
      links: [
        { name: "Find Jobs", href: "/jobs" },
        { name: "Browse Companies", href: "/companies" },
      ],
    },
    employers: {
      title: "For Employers",
      links: [
        { name: "Post a Job", href: "/post-job", requiresEmployer: true },
        {
          name: "Browse Candidates",
          href: "/candidates",
          requiresEmployer: true,
        },
      ],
    },
  },
  ar: {
    company: {
      title: "الشركة",
      links: [{ name: "من نحن", href: "/about" }],
    },
    jobSeekers: {
      title: "للباحثين عن عمل",
      links: [
        { name: "البحث عن وظائف", href: "/jobs" },
        { name: "تصفح الشركات", href: "/companies" },
      ],
    },
    employers: {
      title: "لأصحاب العمل",
      links: [
        { name: "نشر وظيفة", href: "/post-job", requiresEmployer: true },
        { name: "تصفح المرشحين", href: "/candidates", requiresEmployer: true },
      ],
    },
  },
};

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986C18.634.001 24.001 5.366 24.001 11.987 24.001 5.365 18.634.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.148-1.295C4.198 14.897 3.5 13.314 3.5 11.5s.698-3.397 1.801-4.193c.7-.805 1.851-1.295 3.148-1.295s2.448.49 3.148 1.295c1.103.796 1.801 2.379 1.801 4.193s-.698 3.397-1.801 4.193c-.7.805-1.851 1.295-3.148 1.295zm7.103 0c-1.297 0-2.448-.49-3.148-1.295-1.103-.796-1.801-2.379-1.801-4.193s.698-3.397 1.801-4.193c.7-.805 1.851-1.295 3.148-1.295s2.448.49 3.148 1.295c1.103.796 1.801 2.379 1.801 4.193s-.698 3.397-1.801 4.193c-.7.805-1.851 1.295-3.148 1.295z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { language, direction } = useI18n();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const sections = footerSections[language as keyof typeof footerSections];

  const handleLinkClick = (link: any, e: React.MouseEvent) => {
    // If the link requires employer access
    if ((link as any).requiresEmployer === true) {
      e.preventDefault();

      // Check if user is authenticated and is an employer
      if (!isAuthenticated || user?.role !== "employer") {
        // Redirect to login with return URL
        const returnUrl = encodeURIComponent(link.href);
        router.push(`/login?returnUrl=${returnUrl}`);
        return;
      }

      // If user is authenticated employer, proceed with normal navigation
      router.push(link.href);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-start mb-4">
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20">
                <Image
                  src="/images/logo.png"
                  alt="SU'UD Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              {language === "en"
                ? "Connecting talented professionals with great opportunities across the region."
                : "ربط المهنيين الموهوبين بالفرص العظيمة في جميع أنحاء المنطقة."}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.values(sections).map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {(link as any).requiresEmployer === true ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(link, e)}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600">
            © 2024 SU'UD Platform.{" "}
            {language === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {language === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {language === "en" ? "Terms of Service" : "شروط الخدمة"}
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {language === "en"
                ? "Cookie Policy"
                : "سياسة ملفات تعريف الارتباط"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
