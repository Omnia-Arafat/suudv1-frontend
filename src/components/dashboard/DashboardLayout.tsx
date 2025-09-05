'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/contexts';
import { Button } from '@/components/ui';
import Sidebar from './Sidebar';
import { cn } from '@/utils/cn';

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
  const { language, direction } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Top Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 lg:px-6 py-4">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <span className="text-xl">☰</span>
                </Button>

                {/* Page Title */}
                <div>
                  {title && (
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-sm text-gray-600 mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-3">
                {actions}
                
                {/* Language Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // This would be implemented via the I18n context
                  }}
                  className="hidden sm:flex"
                >
                  {language === 'en' ? 'العربية' : 'English'}
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                >
                  <span className="text-xl">🔔</span>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 lg:p-6 h-full"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
