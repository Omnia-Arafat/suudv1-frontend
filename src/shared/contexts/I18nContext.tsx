"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type {
  Language,
  Direction,
  LocaleConfig,
  TranslationFunction,
} from "@/shared/types";

// Locale configurations
const locales: Record<Language, LocaleConfig> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    direction: "ltr",
    flag: "🇺🇸",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    direction: "rtl",
    flag: "🇸🇦",
  },
};

// Import translation files
import enTranslations from "@/shared/locales/en.json";
import arTranslations from "@/shared/locales/ar.json";

const translations = {
  en: enTranslations,
  ar: arTranslations,
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
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem("language") as Language;
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
    localStorage.setItem("language", lang);
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  const t: TranslationFunction = (key, params) => {
    let translation: any = translations[language];

    // Handle nested keys like 'auth.login'
    const keys = key.split(".");
    for (const k of keys) {
      if (translation && typeof translation === "object" && k in translation) {
        translation = translation[k];
      } else {
        translation = key; // fallback to key if not found
        break;
      }
    }

    // Ensure we have a string
    if (typeof translation !== "string") {
      translation = key;
    }

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(
          new RegExp(`\\{\\{${param}\\}\\}`, "g"),
          String(value)
        );
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
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
