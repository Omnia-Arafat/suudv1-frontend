'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language, Direction, LocaleConfig, TranslationFunction } from '@/types';

// Locale configurations
const locales: Record<Language, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇺🇸',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    flag: '🇸🇦',
  },
};

// Basic translations (in a real app, these would come from translation files)
const translations = {
  en: {
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.apply': 'Apply',
    'common.reset': 'Reset',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.role': 'Role',
    'jobs.title': 'Job Title',
    'jobs.search': 'Search Jobs',
    'jobs.location': 'Location',
    'jobs.type': 'Job Type',
    'jobs.apply': 'Apply',
    'jobs.salary': 'Salary',
    'jobs.deadline': 'Application Deadline',
    'dashboard.welcome': 'Welcome',
    'dashboard.profile': 'Profile',
    'dashboard.applications': 'Applications',
    'dashboard.companies': 'Companies',
  },
  ar: {
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.search': 'بحث',
    'common.filter': 'فلتر',
    'common.apply': 'تطبيق',
    'common.reset': 'إعادة تعيين',
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب',
    'auth.logout': 'تسجيل الخروج',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.name': 'الاسم',
    'auth.role': 'الدور',
    'jobs.title': 'عنوان الوظيفة',
    'jobs.search': 'البحث عن الوظائف',
    'jobs.location': 'الموقع',
    'jobs.type': 'نوع الوظيفة',
    'jobs.apply': 'تقدم',
    'jobs.salary': 'الراتب',
    'jobs.deadline': 'موعد انتهاء التقديم',
    'dashboard.welcome': 'مرحباً',
    'dashboard.profile': 'الملف الشخصي',
    'dashboard.applications': 'الطلبات',
    'dashboard.companies': 'الشركات',
  },
};

interface I18nContextType {
  language: Language;
  direction: Direction;
  locale: LocaleConfig;
  t: TranslationFunction;
  changeLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  availableLanguages: LocaleConfig[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && locales[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    // Update document direction and lang attribute
    const direction = locales[language].direction;
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
  };

  const t: TranslationFunction = (key, params) => {
    let translation = translations[language][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(new RegExp(`\\{\\{${param}\\}\\}`, 'g'), String(value));
      });
    }
    
    return translation;
  };

  const value: I18nContextType = {
    language,
    direction: locales[language].direction,
    locale: locales[language],
    t,
    changeLanguage,
    toggleLanguage,
    availableLanguages: Object.values(locales),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}