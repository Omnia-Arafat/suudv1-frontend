'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/shared/contexts';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function DashboardLayout({ 
  children, 
  title, 
  subtitle, 
  actions 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 min-h-screen">
          {/* Mobile Header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 lg:hidden sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  ص
                </div>
                <div className="font-bold">
                  <span className="text-gray-900">SU'UD</span>
                  <span className="text-gray-500 text-sm mx-1">|</span>
                  <span className="text-gray-600 text-sm">صعود</span>
                </div>
              </Link>
              <div className="w-6"></div>
            </div>
          </header>

          {/* Desktop Header (Optional) */}
          {(title || subtitle || actions) && (
            <header className="hidden lg:block bg-white/60 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  {title && (
                    <h1 className="text-2xl font-bold text-gray-900">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-sm text-gray-600 mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {actions}
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    {language === 'en' ? 'العربية' : 'English'}
                  </button>
                  <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
                    🔔
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>
                </div>
              </div>
            </header>
          )}
          
          {/* Main Content */}
          <main className="min-h-screen p-4 lg:p-6">
            <div className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
