'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui';
import { Navbar, Footer } from '@/shared/components';
import { useAuth, useI18n } from '@/shared/contexts';
import type { LoginRequest } from '@/shared/types';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { t, direction, language } = useI18n();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-indigo-600 mb-2"
              >
                SU'UD - صعود
              </motion.h1>
              <CardTitle>{t('auth.login')}</CardTitle>
            </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: direction === 'rtl' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
              
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium text-gray-700 mb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                >
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                />
              </div>
              
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium text-gray-700 mb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                >
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter your password' : 'أدخل كلمة المرور'}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {t('auth.login')}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {language === 'en' ? "Don't have an account?" : 'ليس لديك حساب؟'}{' '}
                <button
                  onClick={() => router.push('/register')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t('auth.register')}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
