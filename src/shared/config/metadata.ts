import type { Metadata, Viewport } from "next";

// Base viewport configuration
export const baseViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Base metadata configuration
export const baseMetadata: Metadata = {
  title: {
    default: "SU'UD - صعود | Job Portal",
    template: "%s | SU'UD - صعود",
  },
  description:
    "SU'UD Job Portal - Connect students with employers in Saudi Arabia. Find internships, jobs, and career opportunities. | منصة صعود للوظائف - ربط الطلاب بأصحاب العمل في المملكة العربية السعودية",
  keywords: [
    "jobs",
    "careers",
    "employment",
    "Saudi Arabia",
    "students",
    "internships",
    "وظائف",
    "توظيف",
    "السعودية",
    "طلاب",
    "تدريب",
    "مهنة",
    "صعود",
  ],
  authors: [{ name: "SU'UD Team" }],
  creator: "SU'UD Platform",
  publisher: "SU'UD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: (() => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const vercelUrl = process.env.VERCEL_URL;

    if (appUrl?.startsWith("http")) {
      return new URL(appUrl);
    }

    if (appUrl) {
      return new URL(`https://${appUrl}`);
    }

    if (vercelUrl) {
      return new URL(`https://${vercelUrl}`);
    }

    return new URL("https://suud-frontend.vercel.app");
  })(),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ar-SA": "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SU'UD - صعود",
    title: "SU'UD - صعود | Job Portal",
    description:
      "Connect students with employers in Saudi Arabia. Find internships, jobs, and career opportunities.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SU'UD Job Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SU'UD - صعود | Job Portal",
    description:
      "Connect students with employers in Saudi Arabia. Find internships, jobs, and career opportunities.",
    images: ["/images/twitter-image.jpg"],
    creator: "@suud_platform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  category: "Job Portal",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#3b82f6" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SU'UD",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-config": "/browserconfig.xml",
  },
};

// Page-specific metadata configurations
export const pageMetadata: Record<string, Partial<Metadata>> = {
  // Homepage
  "/": {
    title: "SU'UD - صعود | Job Portal",
    description:
      "SU'UD Job Portal - Connect students with employers in Saudi Arabia. Find internships, jobs, and career opportunities. | منصة صعود للوظائف - ربط الطلاب بأصحاب العمل في المملكة العربية السعودية",
    openGraph: {
      title: "SU'UD - صعود | Job Portal",
      description:
        "Connect students with employers in Saudi Arabia. Find internships, jobs, and career opportunities.",
    },
  },

  // Auth pages
  "/login": {
    title: "Login | SU'UD",
    description:
      "Sign in to your SU'UD account to access job opportunities and manage your profile.",
    robots: {
      index: false,
      follow: true,
    },
  },
  "/register": {
    title: "Register | SU'UD",
    description:
      "Create your SU'UD account to start finding jobs and internships in Saudi Arabia.",
    robots: {
      index: false,
      follow: true,
    },
  },

  // Website pages
  "/about": {
    title: "About Us | SU'UD",
    description:
      "Learn about SU'UD platform, our mission to connect students with employers in Saudi Arabia.",
    openGraph: {
      title: "About SU'UD Platform",
      description:
        "Learn about our mission to connect students with employers in Saudi Arabia.",
    },
  },
  "/jobs": {
    title: "Find Jobs | SU'UD",
    description:
      "Browse available jobs and internships in Saudi Arabia. Find your next career opportunity.",
    openGraph: {
      title: "Find Jobs in Saudi Arabia",
      description:
        "Browse available jobs and internships. Find your next career opportunity.",
    },
  },
  "/companies": {
    title: "Companies | SU'UD",
    description:
      "Discover top companies hiring in Saudi Arabia. Find employers offering internships and jobs.",
    openGraph: {
      title: "Top Companies Hiring in Saudi Arabia",
      description:
        "Discover companies offering internships and jobs for students.",
    },
  },
  "/contact": {
    title: "Contact Us | SU'UD",
    description:
      "Get in touch with SU'UD team. We're here to help with your job search and career development.",
    openGraph: {
      title: "Contact SU'UD Support",
      description: "Get help with your job search and career development.",
    },
  },
  "/services": {
    title: "Our Services | SU'UD",
    description:
      "Explore SU'UD services: job matching, career guidance, skill development, and more.",
    openGraph: {
      title: "SU'UD Services",
      description:
        "Job matching, career guidance, and skill development services.",
    },
  },

  // Dashboard pages
  "/dashboard": {
    title: "Dashboard | SU'UD",
    description:
      "Access your SU'UD dashboard to manage applications, profile, and job search.",
    robots: {
      index: false,
      follow: true,
    },
  },
  "/employee/dashboard": {
    title: "Student Dashboard | SU'UD",
    description:
      "Manage your job applications, profile, and career development on SU'UD.",
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: "Student Dashboard | SU'UD",
      description:
        "Manage your job applications, profile, and career development.",
      type: "website",
    },
  },
  "/employer/dashboard": {
    title: "Employer Dashboard | SU'UD",
    description:
      "Manage your company profile, post jobs, and review applications from qualified candidates.",
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: "Employer Dashboard | SU'UD",
      description:
        "Manage your company profile, post jobs, and review applications.",
      type: "website",
    },
  },
  "/admin/dashboard": {
    title: "Admin Dashboard | SU'UD",
    description:
      "Administrative dashboard for managing the SU'UD platform, users, and content.",
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: "Admin Dashboard | SU'UD",
      description: "Administrative dashboard for managing the platform.",
      type: "website",
    },
  },

  // Profile and settings pages
  "/profile": {
    title: "Profile | SU'UD",
    description:
      "Manage your professional profile, skills, and career information.",
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: "Profile | SU'UD",
      description: "Manage your professional profile and career information.",
      type: "profile",
    },
  },
  "/profile/edit": {
    title: "Edit Profile | SU'UD",
    description:
      "Update your professional profile information and career details.",
    robots: {
      index: false,
      follow: true,
    },
  },
  "/settings": {
    title: "Settings | SU'UD",
    description: "Manage your account settings and preferences.",
    robots: {
      index: false,
      follow: true,
    },
  },
  "/settings/account": {
    title: "Account Settings | SU'UD",
    description: "Update your account information and security settings.",
    robots: {
      index: false,
      follow: true,
    },
  },
  "/settings/notifications": {
    title: "Notification Settings | SU'UD",
    description: "Configure your notification preferences.",
    robots: {
      index: false,
      follow: true,
    },
  },
  "/settings/privacy": {
    title: "Privacy Settings | SU'UD",
    description: "Manage your privacy settings and data preferences.",
    robots: {
      index: false,
      follow: true,
    },
  },

  // Application pages
  "/applications": {
    title: "My Applications | SU'UD",
    description: "Track and manage your job applications and their status.",
    robots: {
      index: false,
      follow: true,
    },
  },
  "/applications/new": {
    title: "New Application | SU'UD",
    description: "Submit a new job application.",
    robots: {
      index: false,
      follow: true,
    },
  },

  // Job detail pages
  "/jobs/[id]": {
    title: "Job Details | SU'UD",
    description: "View detailed information about this job opportunity.",
    openGraph: {
      type: "website",
    },
  },
  "/jobs/search": {
    title: "Search Jobs | SU'UD",
    description:
      "Search and filter job opportunities by location, type, and requirements.",
    openGraph: {
      title: "Search Jobs | SU'UD",
      description:
        "Search and filter job opportunities by location, type, and requirements.",
      type: "website",
    },
  },

  // Company detail pages
  "/companies/[id]": {
    title: "Company Profile | SU'UD",
    description:
      "Learn about this company, their culture, and available job opportunities.",
    openGraph: {
      type: "website",
    },
  },

  // Legal pages
  "/privacy": {
    title: "Privacy Policy | SU'UD",
    description:
      "Read SU'UD privacy policy to understand how we protect your personal information.",
    robots: {
      index: true,
      follow: true,
    },
  },
  "/terms": {
    title: "Terms of Service | SU'UD",
    description: "Read SU'UD terms of service and user agreement.",
    robots: {
      index: true,
      follow: true,
    },
  },
  "/cookies": {
    title: "Cookie Policy | SU'UD",
    description:
      "Learn about how SU'UD uses cookies to improve your experience.",
    robots: {
      index: true,
      follow: true,
    },
  },
};

// Helper function to generate metadata for a specific page
export function generatePageMetadata(
  pathname: string,
  customMetadata?: Partial<Metadata>
): Metadata {
  const pageConfig = pageMetadata[pathname] || {};

  return {
    ...baseMetadata,
    ...pageConfig,
    ...customMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      ...pageConfig.openGraph,
      ...customMetadata?.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...pageConfig.twitter,
      ...customMetadata?.twitter,
    },
  };
}

// Structured data for SEO
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SU'UD",
    alternateName: "صعود",
    url: "https://suud.com",
    logo: "https://suud.com/images/logo.png",
    description:
      "Job portal connecting students with employers in Saudi Arabia",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressRegion: "Riyadh",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "support@suud.com",
    },
    sameAs: [
      "https://twitter.com/suud_platform",
      "https://linkedin.com/company/suud-platform",
    ],
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SU'UD Job Portal",
    alternateName: "صعود",
    url: "https://suud.com",
    description: "Connect students with employers in Saudi Arabia",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://suud.com/jobs?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  jobPosting: {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    hiringOrganization: {
      "@type": "Organization",
      name: "Company Name",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "SA",
      },
    },
    employmentType: "FULL_TIME",
    workHours: "40 hours per week",
  },
};
