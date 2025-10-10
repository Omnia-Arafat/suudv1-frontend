'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui';
import { Navbar, Footer } from '@/shared/components';
import { useAuth, useI18n } from '@/shared/contexts';
import type { RegisterRequest, UserRole } from '@/shared/types';

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const { t, direction, language } = useI18n();
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterRequest>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'employee',
    phone: '',
    location: '',
    specialization: '',
    university: '',
    company_name: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.password_confirmation) {
      setError(language === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة');
      return;
    }
    
    try {
      await register(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 py-24">
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
              <CardTitle>{t('auth.register')}</CardTitle>
            </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: direction === 'rtl' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
              
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium text-gray-700 mb-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                >
                  {t('auth.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter your full name' : 'أدخل اسمك الكامل'}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium text-gray-700 mb-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                />
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className={`block text-sm font-medium text-gray-700 mb-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                >
                  {t('auth.role')}
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                >
                  <option value="employee">
                    {language === 'en' ? 'Student/Job Seeker' : 'طالب/باحث عن عمل'}
                  </option>
                  <option value="employer">
                    {language === 'en' ? 'Employer' : 'صاحب عمل'}
                  </option>
                </select>
              </div>

              {/* Conditional field for employers */}
              {formData.role === 'employer' && (
                <div>
                  <label
                    htmlFor="company_name"
                    className={`block text-sm font-medium text-gray-700 mb-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  >
                    {language === 'en' ? 'Company Name' : 'اسم الشركة'}
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    required={formData.role === 'employer'}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                    placeholder={language === 'en' ? 'Enter your company name' : 'أدخل اسم شركتك'}
                  />
                </div>
              )}

              {/* Conditional fields for students */}
              {formData.role === 'employee' && (
                <>
                  <div>
                    <label
                      htmlFor="university"
                      className={`block text-sm font-medium text-gray-700 mb-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                    >
                      {language === 'en' ? 'University' : 'الجامعة'}
                    </label>
                    <input
                      type="text"
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                      placeholder={language === 'en' ? 'Enter your university' : 'أدخل جامعتك'}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="specialization"
                      className={`block text-sm font-medium text-gray-700 mb-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                    >
                      {language === 'en' ? 'Specialization' : 'التخصص'}
                    </label>
                    <input
                      type="text"
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                      placeholder={language === 'en' ? 'Enter your field of study' : 'أدخل مجال دراستك'}
                    />
                  </div>
                </>
              )}

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium text-gray-700 mb-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter your password' : 'أدخل كلمة المرور'}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="password_confirmation"
                  className={`block text-sm font-medium text-gray-700 mb-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                >
                  {language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Confirm your password' : 'أعد كلمة المرور'}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {t('auth.register')}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟'}{' '}
                <button
                  onClick={() => router.push('/login')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t('auth.login')}
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
