'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth, useI18n } from '@/contexts';
import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';

interface NavItem {
  id: string;
  label_en: string;
  label_ar: string;
  icon: string;
  href: string;
  badge?: number;
}

const employeeNavItems: NavItem[] = [
  {
    id: 'dashboard',
    label_en: 'Dashboard',
    label_ar: 'لوحة التحكم',
    icon: '🏠',
    href: '/dashboard',
  },
  {
    id: 'jobs',
    label_en: 'Find Jobs',
    label_ar: 'البحث عن الوظائف',
    icon: '🔍',
    href: '/dashboard/jobs',
  },
  {
    id: 'applications',
    label_en: 'My Applications',
    label_ar: 'طلباتي',
    icon: '📋',
    href: '/dashboard/applications',
    badge: 3,
  },
  {
    id: 'saved',
    label_en: 'Saved Jobs',
    label_ar: 'الوظائف المحفوظة',
    icon: '🔖',
    href: '/dashboard/saved',
  },
  {
    id: 'profile',
    label_en: 'My Profile',
    label_ar: 'ملفي الشخصي',
    icon: '👤',
    href: '/dashboard/profile',
  },
];

const employerNavItems: NavItem[] = [
  {
    id: 'dashboard',
    label_en: 'Dashboard',
    label_ar: 'لوحة التحكم',
    icon: '🏠',
    href: '/dashboard',
  },
  {
    id: 'jobs',
    label_en: 'Job Postings',
    label_ar: 'الوظائف المنشورة',
    icon: '📝',
    href: '/dashboard/jobs',
  },
  {
    id: 'applications',
    label_en: 'Applications',
    label_ar: 'الطلبات الواردة',
    icon: '📨',
    href: '/dashboard/applications',
    badge: 12,
  },
  {
    id: 'candidates',
    label_en: 'Candidates',
    label_ar: 'المرشحون',
    icon: '👥',
    href: '/dashboard/candidates',
  },
  {
    id: 'company',
    label_en: 'Company Profile',
    label_ar: 'ملف الشركة',
    icon: '🏢',
    href: '/dashboard/company',
  },
  {
    id: 'analytics',
    label_en: 'Analytics',
    label_ar: 'التحليلات',
    icon: '📊',
    href: '/dashboard/analytics',
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();
  const { language, direction } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = user?.role === 'employer' ? employerNavItems : employeeNavItems;

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : direction === 'rtl' ? 280 : -280,
        }}
        className={cn(
          'fixed top-0 h-full w-70 bg-white shadow-xl z-50 lg:static lg:translate-x-0 lg:shadow-none lg:border-r',
          direction === 'rtl' ? 'right-0' : 'left-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <div>
                <h2 className="font-bold text-gray-900">SU'UD</h2>
                <p className="text-sm text-gray-500">سعود</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden"
            >
              ✕
            </Button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 truncate max-w-32">
                  {user?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {user?.role === 'employee' 
                    ? (language === 'en' ? 'Job Seeker' : 'باحث عن عمل')
                    : (language === 'en' ? 'Employer' : 'صاحب عمل')
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.href);
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    router.push(item.href);
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group',
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium flex-1">
                    {language === 'en' ? item.label_en : item.label_ar}
                  </span>
                  {item.badge && (
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-bold',
                      isActive
                        ? 'bg-white text-blue-600'
                        : 'bg-red-500 text-white'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 text-gray-600 hover:text-red-600"
              onClick={handleLogout}
            >
              <span className="text-lg">🚪</span>
              <span>{language === 'en' ? 'Sign Out' : 'تسجيل الخروج'}</span>
            </Button>
            <div className="text-xs text-gray-400 text-center">
              © 2024 SU'UD Platform
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
