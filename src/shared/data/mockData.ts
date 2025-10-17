import type { User, JobListing, Company, Application } from "@/shared/types";

// Mock Users for the three dashboard types
export const mockUsers: User[] = [
  {
    id: 1,
    name: "فاطمة العلي",
    email: "employee@suud.com",
    role: "employee",
    specialization: "مطور برمجيات",
    university: "جامعة الملك سعود",
    phone: "+966507654321",
    location: "جدة، السعودية",
    is_active: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "أحمد الرشيد",
    email: "employer@suud.com",
    role: "employer",
    phone: "+966501234567",
    location: "الرياض، السعودية",
    is_active: true,
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-01-10T09:00:00Z",
  },
  {
    id: 3,
    name: "System Administrator",
    email: "admin@suud.com",
    role: "admin",
    phone: "+966500000000",
    location: "الرياض، السعودية",
    is_active: true,
    created_at: "2024-01-01T08:00:00Z",
    updated_at: "2024-01-01T08:00:00Z",
  },
];

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: 1,
    user_id: 2,
    company_name: "شركة التقنية المتقدمة",
    name: "شركة التقنية المتقدمة",
    description: "شركة رائدة في مجال التكنولوجيا والبرمجة",
    industry: "التكنولوجيا",
    website: "https://advanced-tech.sa",
    company_size: "51-200",
    location: "الرياض، المملكة العربية السعودية",
    founded_year: 2015,
    logo_url: "/images/company1-logo.png",
    icon: "💻",
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-01-10T09:00:00Z",
  },
  {
    id: 2,
    user_id: 2,
    company_name: "مجموعة الخليج للاستثمار",
    name: "مجموعة الخليج للاستثمار",
    description: "مجموعة استثمارية متخصصة في التطوير العقاري",
    industry: "الاستثمار والعقارات",
    website: "https://gulf-investment.sa",
    company_size: "201-500",
    location: "جدة، المملكة العربية السعودية",
    founded_year: 2010,
    logo_url: "/images/company2-logo.png",
    icon: "🏢",
    created_at: "2024-01-08T10:00:00Z",
    updated_at: "2024-01-08T10:00:00Z",
  },
  {
    id: 3,
    user_id: 2,
    company_name: "مؤسسة النهضة التعليمية",
    name: "مؤسسة النهضة التعليمية",
    description: "مؤسسة تعليمية متخصصة في التدريب والتطوير",
    industry: "التعليم والتدريب",
    website: "https://nahda-education.sa",
    company_size: "11-50",
    location: "الدمام، المملكة العربية السعودية",
    founded_year: 2018,
    logo_url: "/images/company3-logo.png",
    icon: "🎓",
    created_at: "2024-01-05T11:00:00Z",
    updated_at: "2024-01-05T11:00:00Z",
  },
  {
    id: 4,
    user_id: 2,
    company_name: "شركة النخيل للتقنية",
    name: "شركة النخيل للتقنية",
    description: "شركة متخصصة في حلول الذكاء الاصطناعي والتحليل",
    industry: "الذكاء الاصطناعي",
    website: "https://palm-tech.sa",
    company_size: "51-200",
    location: "الرياض، المملكة العربية السعودية",
    founded_year: 2020,
    logo_url: "/images/company4-logo.png",
    icon: "🤖",
    created_at: "2024-01-03T14:00:00Z",
    updated_at: "2024-01-03T14:00:00Z",
  },
  {
    id: 5,
    user_id: 2,
    company_name: "مجموعة البحر الأحمر",
    name: "مجموعة البحر الأحمر",
    description: "مجموعة استثمارية متخصصة في السياحة والضيافة",
    industry: "السياحة والضيافة",
    website: "https://redsea-group.sa",
    company_size: "201-500",
    location: "جدة، المملكة العربية السعودية",
    founded_year: 2017,
    logo_url: "/images/company5-logo.png",
    icon: "🏨",
    created_at: "2024-01-01T16:00:00Z",
    updated_at: "2024-01-01T16:00:00Z",
  },
];

// Mock Job Listings
export const mockJobs: JobListing[] = [
  {
    id: 1,
    title: "مطور تطبيقات الجوال",
    description:
      "نبحث عن مطور متخصص في تطوير تطبيقات الجوال باستخدام React Native و Flutter",
    requirements:
      "خبرة لا تقل عن 3 سنوات في تطوير التطبيقات، معرفة بـ JavaScript و TypeScript",
    location: "الرياض",
    job_type: "full-time",
    salary_min: 8000,
    salary_max: 12000,
    salary_currency: "SAR",
    experience_level: "mid",
    category: "تطوير البرمجيات",
    deadline: "2024-03-15",
    status: "active",
    slug: "mobile-developer-1",
    icon: "📱",
    views_count: 245,
    applications_count: 18,
    company_id: 1,
    company: mockCompanies[0],
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    skills: ["React Native", "Flutter", "JavaScript", "TypeScript"],
  },
  {
    id: 2,
    title: "محلل بيانات",
    description:
      "نبحث عن محلل بيانات متخصص في تحليل البيانات المالية والاستثمارية",
    requirements:
      "شهادة جامعية في الاقتصاد أو الإحصاء، خبرة في استخدام Python و SQL",
    location: "جدة",
    job_type: "full-time",
    salary_min: 6000,
    salary_max: 9000,
    salary_currency: "SAR",
    experience_level: "entry",
    category: "التحليل المالي",
    deadline: "2024-03-20",
    status: "active",
    slug: "data-analyst-2",
    icon: "📊",
    views_count: 189,
    applications_count: 12,
    company_id: 2,
    company: mockCompanies[1],
    created_at: "2024-01-12T14:00:00Z",
    updated_at: "2024-01-12T14:00:00Z",
    skills: ["Python", "SQL", "Excel", "Power BI"],
  },
  {
    id: 3,
    title: "مدرب تقني",
    description:
      "نبحث عن مدرب تقني متخصص في تدريب المطورين على التقنيات الحديثة",
    requirements: "خبرة لا تقل عن 5 سنوات في البرمجة، مهارات تدريبية ممتازة",
    location: "الدمام",
    job_type: "part-time",
    salary_min: 4000,
    salary_max: 6000,
    salary_currency: "SAR",
    experience_level: "senior",
    category: "التدريب والتعليم",
    deadline: "2024-03-25",
    status: "draft",
    slug: "tech-trainer-3",
    icon: "👨‍🏫",
    views_count: 67,
    applications_count: 5,
    company_id: 3,
    company: mockCompanies[2],
    created_at: "2024-01-08T16:00:00Z",
    updated_at: "2024-01-08T16:00:00Z",
    skills: ["JavaScript", "Python", "React", "Node.js"],
  },
  {
    id: 4,
    title: "مصمم واجهات المستخدم",
    description:
      "نبحث عن مصمم واجهات مستخدم مبدع ومتخصص في تصميم تجربة المستخدم",
    requirements: "خبرة في استخدام Figma و Adobe XD، معرفة بمبادئ UX/UI",
    location: "الرياض",
    job_type: "full-time",
    salary_min: 5000,
    salary_max: 8000,
    salary_currency: "SAR",
    experience_level: "mid",
    category: "التصميم",
    deadline: "2024-03-18",
    status: "active",
    slug: "ui-designer-4",
    icon: "🎨",
    views_count: 156,
    applications_count: 8,
    company_id: 1,
    company: mockCompanies[0],
    created_at: "2024-01-14T11:00:00Z",
    updated_at: "2024-01-14T11:00:00Z",
    skills: ["Figma", "Adobe XD", "Sketch", "Photoshop"],
  },
  {
    id: 5,
    title: "مدير مشاريع تقنية",
    description:
      "نبحث عن مدير مشاريع تقنية لقيادة فريق التطوير وإدارة المشاريع التقنية",
    requirements: "شهادة PMP، خبرة لا تقل عن 4 سنوات في إدارة المشاريع التقنية",
    location: "جدة",
    job_type: "full-time",
    salary_min: 10000,
    salary_max: 15000,
    salary_currency: "SAR",
    experience_level: "senior",
    category: "إدارة المشاريع",
    deadline: "2024-03-22",
    status: "active",
    slug: "tech-project-manager-5",
    views_count: 298,
    applications_count: 22,
    company_id: 2,
    company: mockCompanies[1],
    created_at: "2024-01-11T09:00:00Z",
    updated_at: "2024-01-11T09:00:00Z",
    skills: ["PMP", "Agile", "Scrum", "Jira"],
  },
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: 1,
    job_listing_id: 1,
    job_listing: mockJobs[0],
    user_id: 1,
    user: mockUsers[0],
    cover_letter: "أرغب في الانضمام إلى فريقكم المتميز في تطوير التطبيقات",
    status: "submitted",
    created_at: "2024-01-16T10:30:00Z",
    updated_at: "2024-01-16T10:30:00Z",
  },
  {
    id: 2,
    job_listing_id: 2,
    job_listing: mockJobs[1],
    user_id: 1,
    user: mockUsers[0],
    cover_letter: "لدي خبرة جيدة في تحليل البيانات وأرغب في تطوير مهاراتي",
    status: "viewed",
    employer_notes: "مرشح واعد، يحتاج لمقابلة شخصية",
    viewed_at: "2024-01-15T09:00:00Z",
    status_changed_at: "2024-01-15T09:00:00Z",
    created_at: "2024-01-14T15:20:00Z",
    updated_at: "2024-01-15T09:00:00Z",
  },
  {
    id: 3,
    job_listing_id: 4,
    job_listing: mockJobs[3],
    user_id: 1,
    user: mockUsers[0],
    cover_letter:
      "أتمتع بخبرة في تصميم واجهات المستخدم وأرغب في الانضمام لفريقكم",
    status: "shortlisted",
    employer_notes: "تم قبول الطلب، سيتم التواصل قريباً",
    viewed_at: "2024-01-14T14:30:00Z",
    status_changed_at: "2024-01-14T14:30:00Z",
    created_at: "2024-01-13T12:00:00Z",
    updated_at: "2024-01-14T14:30:00Z",
  },
  {
    id: 4,
    job_listing_id: 1,
    job_listing: mockJobs[0],
    user_id: 4,
    user: {
      id: 4,
      name: "محمد السعيد",
      email: "mohammed@example.com",
      role: "employee",
      specialization: "مطور تطبيقات",
      university: "جامعة الملك عبدالعزيز",
      phone: "+966507654322",
      location: "الرياض، السعودية",
      is_active: true,
      created_at: "2024-01-12T10:00:00Z",
      updated_at: "2024-01-12T10:00:00Z",
    },
    cover_letter: "أرغب في الانضمام لفريق التطوير",
    status: "rejected",
    employer_notes: "لا يلبي المتطلبات المطلوبة",
    viewed_at: "2024-01-16T10:00:00Z",
    status_changed_at: "2024-01-16T10:00:00Z",
    created_at: "2024-01-15T11:00:00Z",
    updated_at: "2024-01-16T10:00:00Z",
  },
];

// Dashboard Data Interfaces
export interface EmployeeDashboardData {
  stats: {
    applications: {
      total: number;
      pending: number;
      reviewed: number;
      accepted: number;
      rejected: number;
      this_month: number;
    };
    jobs: {
      available: number;
      applied_to: number;
      new_today: number;
      matching_specialization: number;
    };
    profile: {
      completion: number;
      views: number;
      cv_uploaded: boolean;
      avatar_uploaded: boolean;
    };
  };
  recent_applications: Application[];
  recommended_jobs: JobListing[];
  latest_jobs: JobListing[];
}

export interface EmployerDashboardData {
  stats: {
    jobs: {
      total: number;
      active: number;
      pending: number;
      expired: number;
      total_views: number;
      total_applications: number;
    };
    applications: {
      total: number;
      pending: number;
      reviewed: number;
      accepted: number;
      rejected: number;
      this_month: number;
    };
    company: {
      profile_completion: number;
      verification_status: string;
      total_employees: number;
    };
  };
  recent_applications: Application[];
  job_postings: JobListing[];
  candidates: User[];
}

export interface AdminDashboardData {
  stats: {
    users: {
      total: number;
      employees: number;
      employers: number;
      admins: number;
      active: number;
      inactive: number;
      this_month: number;
    };
    jobs: {
      total: number;
      active: number;
      pending: number;
      expired: number;
      total_applications: number;
    };
    companies: {
      total: number;
      verified: number;
      pending: number;
      rejected: number;
    };
    applications: {
      total: number;
      pending: number;
      reviewed: number;
      accepted: number;
      rejected: number;
    };
  };
  recent_users: User[];
  pending_jobs: JobListing[];
  pending_companies: Company[];
  recent_applications: Application[];
}

// Mock Employee Dashboard Data
export const mockEmployeeDashboardData: EmployeeDashboardData = {
  stats: {
    applications: {
      total: 3,
      pending: 1,
      reviewed: 1,
      accepted: 1,
      rejected: 0,
      this_month: 2,
    },
    jobs: {
      available: 45,
      applied_to: 3,
      new_today: 5,
      matching_specialization: 12,
    },
    profile: {
      completion: 85,
      views: 23,
      cv_uploaded: true,
      avatar_uploaded: true,
    },
  },
  recent_applications: mockApplications.slice(0, 3),
  recommended_jobs: mockJobs.slice(0, 3),
  latest_jobs: mockJobs.slice(0, 4),
};

// Mock Employer Dashboard Data
export const mockEmployerDashboardData: EmployerDashboardData = {
  stats: {
    jobs: {
      total: 8,
      active: 6,
      pending: 1,
      expired: 1,
      total_views: 1250,
      total_applications: 45,
    },
    applications: {
      total: 45,
      pending: 12,
      reviewed: 18,
      accepted: 8,
      rejected: 7,
      this_month: 15,
    },
    company: {
      profile_completion: 90,
      verification_status: "verified",
      total_employees: 150,
    },
  },
  recent_applications: mockApplications.slice(0, 5),
  job_postings: mockJobs.filter((job) => job.company_id === 1),
  candidates: mockUsers.filter((user) => user.role === "employee").slice(0, 3),
};

// Mock Admin Dashboard Data
export const mockAdminDashboardData: AdminDashboardData = {
  stats: {
    users: {
      total: 1250,
      employees: 800,
      employers: 300,
      admins: 5,
      active: 1100,
      inactive: 150,
      this_month: 45,
    },
    jobs: {
      total: 180,
      active: 120,
      pending: 25,
      expired: 35,
      total_applications: 450,
    },
    companies: {
      total: 150,
      verified: 120,
      pending: 20,
      rejected: 10,
    },
    applications: {
      total: 450,
      pending: 80,
      reviewed: 200,
      accepted: 120,
      rejected: 50,
    },
  },
  recent_users: mockUsers,
  pending_jobs: mockJobs.filter((job) => job.status === "draft"),
  pending_companies: mockCompanies.filter(
    (company) => company.company_size === "11-50"
  ), // Using company_size as a proxy for verification status
  recent_applications: mockApplications.slice(0, 5),
};

// Mock Filters Data
export const mockFilters = {
  locations: ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة"],
  job_types: ["دوام كامل", "دوام جزئي", "عمل عن بُعد", "عقد مؤقت"],
  experience_levels: ["مبتدئ", "متوسط", "خبير"],
  categories: [
    "تطوير البرمجيات",
    "التحليل المالي",
    "التدريب والتعليم",
    "التصميم",
    "إدارة المشاريع",
    "التسويق",
    "المبيعات",
    "الموارد البشرية",
  ],
  salary_ranges: [
    { min: 0, max: 3000, label: "أقل من 3,000 ريال" },
    { min: 3000, max: 6000, label: "3,000 - 6,000 ريال" },
    { min: 6000, max: 10000, label: "6,000 - 10,000 ريال" },
    { min: 10000, max: 15000, label: "10,000 - 15,000 ريال" },
    { min: 15000, max: null, label: "أكثر من 15,000 ريال" },
  ],
};

// Mock Analytics Data
export const mockAnalytics = {
  job_views: {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "مشاهدات الوظائف",
        data: [1200, 1500, 1800, 1600, 2000, 2200],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    ],
  },
  applications: {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "الطلبات",
        data: [45, 60, 75, 70, 85, 95],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
      },
    ],
  },
  user_registrations: {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "المستخدمين الجدد",
        data: [25, 35, 40, 30, 45, 50],
        borderColor: "rgb(245, 158, 11)",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
      },
    ],
  },
};

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Helper function to get paginated data
export const getPaginatedData = <T>(
  data: T[],
  page: number = 1,
  per_page: number = 10
): {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
} => {
  const startIndex = (page - 1) * per_page;
  const endIndex = startIndex + per_page;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / per_page);

  return {
    data: paginatedData,
    current_page: page,
    last_page: totalPages,
    per_page,
    total: data.length,
    from: startIndex + 1,
    to: Math.min(endIndex, data.length),
  };
};
