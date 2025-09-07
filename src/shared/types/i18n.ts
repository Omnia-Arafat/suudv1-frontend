// Internationalization types for Arabic/English support

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface LocaleConfig {
  code: Language;
  name: string;
  nativeName: string;
  direction: Direction;
  flag: string;
}

export interface TranslationKeys {
  // Common
  'common.loading': string;
  'common.error': string;
  'common.success': string;
  'common.cancel': string;
  'common.save': string;
  'common.edit': string;
  'common.delete': string;
  'common.search': string;
  'common.filter': string;
  'common.apply': string;
  'common.reset': string;
  
  // Auth
  'auth.login': string;
  'auth.register': string;
  'auth.logout': string;
  'auth.email': string;
  'auth.password': string;
  'auth.name': string;
  'auth.role': string;
  
  // Jobs
  'jobs.title': string;
  'jobs.search': string;
  'jobs.location': string;
  'jobs.type': string;
  'jobs.apply': string;
  'jobs.salary': string;
  'jobs.deadline': string;
  
  // Dashboard
  'dashboard.welcome': string;
  'dashboard.profile': string;
  'dashboard.applications': string;
  'dashboard.companies': string;
}

export type TranslationFunction = (key: keyof TranslationKeys, params?: Record<string, string | number>) => string;