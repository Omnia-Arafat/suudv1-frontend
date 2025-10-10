"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth, useI18n } from "@/shared/contexts";
import type { TranslationKeys } from "@/shared/types";
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();
  const { language, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!user || !mounted) return null;

  const isEmployer = user.role === "employer";

  // Navigation items matching reference design
  const employerNavItems = [
    {
      id: "dashboard",
      label_key: "sidebar.dashboard",
      href: "/dashboard",
      icon: "pi pi-chart-bar",
      badge: undefined,
    },
    {
      id: "messages",
      label_key: "sidebar.messages",
      href: "/dashboard/messages",
      icon: "pi pi-comments",
      badge: undefined,
    },
    {
      id: "company",
      label_key: "sidebar.company_profile",
      href: "/dashboard/company",
      icon: "pi pi-building",
      badge: undefined,
    },
    {
      id: "applicants",
      label_key: "sidebar.all_applicants",
      href: "/dashboard/applicants",
      icon: "pi pi-users",
      badge: undefined,
    },
    {
      id: "jobs",
      label_key: "sidebar.job_listing",
      href: "/dashboard/jobs",
      icon: "pi pi-briefcase",
      badge: undefined,
    },
  ];

  const employeeNavItems = [
    {
      id: "dashboard",
      label_key: "sidebar.dashboard",
      href: "/dashboard",
      icon: "pi pi-chart-bar",
      badge: undefined,
    },
    {
      id: "messages",
      label_key: "sidebar.messages",
      href: "/dashboard/messages",
      icon: "pi pi-comments",
      badge: undefined,
    },
    {
      id: "applications",
      label_key: "sidebar.my_applications",
      href: "/employee/applications",
      icon: "pi pi-file-edit",
      badge: undefined,
    },
    {
      id: "saved",
      label_key: "sidebar.saved_jobs",
      href: "/employee/saved",
      icon: "pi pi-bookmark",
      badge: undefined,
    },
    {
      id: "profile",
      label_key: "sidebar.my_profile",
      href: "/employee/profile",
      icon: "pi pi-user",
      badge: undefined,
    },
  ];

  const navItems = isEmployer ? employerNavItems : employeeNavItems;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const isActiveRoute = (href: string) => {
    if (!pathname) return false;
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    // Close mobile sidebar after navigation
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${
          language === "ar" ? "right-0" : "left-0"
        } h-screen w-64 bg-white shadow-lg ${
          language === "ar" ? "border-l" : "border-r"
        } border-gray-100 z-50 transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : language === "ar"
            ? "translate-x-full"
            : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/30">
            <div
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 cursor-pointer group relative z-10"
              onClick={() => {
                console.log("Logo clicked!");
                router.push("/");
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                ص
              </div>
              <div className={language === "ar" ? "text-right" : "text-left"}>
                <h2 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors duration-200">
                  SU&apos;UD
                </h2>
                <p className="text-xs text-gray-500 font-medium">صعود</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <i className="pi pi-times text-sm"></i>
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className={language === "ar" ? "text-right" : "text-center"}>
              <div className="mb-2">
                <i className="pi pi-user-plus text-2xl text-blue-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {t("sidebar.welcome")}
              </h3>
              <p className="text-sm text-gray-600">
                {user.role === "employee"
                  ? t("sidebar.job_seeker")
                  : t("sidebar.employer")}
              </p>
              {user.name &&
                user.name !== "employer" &&
                user.name !== "employee" && (
                  <p className="text-xs text-blue-600 mt-1 font-medium">
                    {user.name}
                  </p>
                )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.href);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className={`group w-full flex items-center gap-3 px-4 py-3 ${
                    language === "ar" ? "text-right" : "text-left"
                  } rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-98 ${
                    isActive
                      ? `text-blue-600 bg-blue-50 ${
                          language === "ar" ? "border-r-4" : "border-l-4"
                        } border-blue-600 shadow-sm font-semibold`
                      : `text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm ${
                          language === "ar" ? "border-r-4" : "border-l-4"
                        } border-transparent`
                  }`}
                >
                  <i
                    className={`${
                      item.icon
                    } text-lg transition-transform duration-200 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    } ${language === "ar" ? "ml-3" : "mr-3"}`}
                  ></i>
                  <span className="font-medium flex-1 transition-all duration-200">
                    {t(item.label_key as keyof TranslationKeys)}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold min-w-[20px] text-center animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {!isActive && (
                    <i
                      className={`pi ${
                        language === "ar" ? "pi-angle-left" : "pi-angle-right"
                      } text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200 transform ${
                        language === "ar"
                          ? "group-hover:-translate-x-1"
                          : "group-hover:translate-x-1"
                      }`}
                    ></i>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/20 space-y-3">
            <button
              onClick={handleLogout}
              className={`group w-full flex items-center ${
                language === "ar" ? "justify-end" : "justify-start"
              } gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-100 border border-transparent transition-all duration-200 hover:scale-[1.02] active:scale-95 hover:shadow-sm`}
            >
              <i className="pi pi-sign-out text-lg transition-transform duration-200 group-hover:scale-110"></i>
              <span className="font-medium">{t("sidebar.sign_out")}</span>
              <i
                className={`pi ${
                  language === "ar" ? "pi-angle-left" : "pi-angle-right"
                } text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200 transform ${
                  language === "ar"
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                } ${language === "ar" ? "mr-auto" : "ml-auto"}`}
              ></i>
            </button>
            <div className="text-xs text-gray-400 text-center pt-1 border-t border-gray-100">
              © 2024 SU&apos;UD Platform
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
