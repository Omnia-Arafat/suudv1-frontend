'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useI18n } from '@/contexts';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { DashboardLayout } from '@/components/dashboard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function ProfilePageContent() {
  const { user } = useAuth();
  const { language } = useI18n();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    university: user?.university || '',
    specialization: user?.specialization || '',
    profile_summary: user?.profile_summary || '',
    company_name: user?.company?.name || '',
    skills: ['React.js', 'Node.js', 'TypeScript', 'Python'], // Mock data
  });
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveProfile = async () => {
    // This would save the profile to the backend
    console.log('Saving profile:', formData);
    setIsEditing(false);
    // Show success message
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <DashboardLayout
      title={language === 'en' ? 'My Profile' : 'ملفي الشخصي'}
      subtitle={language === 'en' ? 'Manage your personal information and preferences' : 'إدارة معلوماتك الشخصية وتفضيلاتك'}
      actions={
        <Button
          variant={isEditing ? "outline" : "primary"}
          onClick={() => {
            if (isEditing) {
              // Cancel editing
              setFormData({
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
                location: user?.location || '',
                university: user?.university || '',
                specialization: user?.specialization || '',
                profile_summary: user?.profile_summary || '',
                company_name: user?.company?.name || '',
                skills: ['React.js', 'Node.js', 'TypeScript', 'Python'],
              });
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing 
            ? (language === 'en' ? 'Cancel' : 'إلغاء')
            : (language === 'en' ? 'Edit Profile' : 'تعديل الملف الشخصي')
          }
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {formData.name}
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                  {user?.role === 'employee' 
                    ? (language === 'en' ? 'Job Seeker' : 'باحث عن عمل')
                    : (language === 'en' ? 'Employer' : 'صاحب عمل')
                  }
                </p>
                <p className="text-gray-500">{formData.email}</p>
                {formData.location && (
                  <p className="text-gray-500">📍 {formData.location}</p>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-2">
                  {language === 'en' ? 'Member since' : 'عضو منذ'}
                </div>
                <div className="font-medium">
                  {new Date(user?.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Basic Information' : 'المعلومات الأساسية'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                </label>
                <p className="text-gray-900">{formData.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'en' ? 'Email cannot be changed' : 'لا يمكن تغيير البريد الإلكتروني'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'en' ? 'Enter your phone number' : 'أدخل رقم هاتفك'}
                  />
                ) : (
                  <p className="text-gray-900">{formData.phone || (language === 'en' ? 'Not provided' : 'غير محدد')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Location' : 'الموقع'}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'en' ? 'Enter your location' : 'أدخل موقعك'}
                  />
                ) : (
                  <p className="text-gray-900">{formData.location || (language === 'en' ? 'Not provided' : 'غير محدد')}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Professional Information' : 'المعلومات المهنية'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.role === 'employee' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'University' : 'الجامعة'}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={language === 'en' ? 'Enter your university' : 'أدخل جامعتك'}
                      />
                    ) : (
                      <p className="text-gray-900">{formData.university || (language === 'en' ? 'Not provided' : 'غير محدد')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Specialization' : 'التخصص'}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={language === 'en' ? 'Enter your specialization' : 'أدخل تخصصك'}
                      />
                    ) : (
                      <p className="text-gray-900">{formData.specialization || (language === 'en' ? 'Not provided' : 'غير محدد')}</p>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'en' ? 'Company Name' : 'اسم الشركة'}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder={language === 'en' ? 'Enter your company name' : 'أدخل اسم شركتك'}
                    />
                  ) : (
                    <p className="text-gray-900">{formData.company_name || (language === 'en' ? 'Not provided' : 'غير محدد')}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Profile Summary' : 'ملخص الملف الشخصي'}
                </label>
                {isEditing ? (
                  <textarea
                    name="profile_summary"
                    value={formData.profile_summary}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'en' ? 'Write a brief summary about yourself...' : 'اكتب ملخصاً موجزاً عن نفسك...'}
                  />
                ) : (
                  <p className="text-gray-900">
                    {formData.profile_summary || (language === 'en' ? 'No summary provided' : 'لا يوجد ملخص')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Section (for employees) */}
        {user?.role === 'employee' && (
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Skills' : 'المهارات'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      <span>{skill}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-blue-600 hover:text-blue-800 font-bold"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder={language === 'en' ? 'Add a skill...' : 'أضف مهارة...'}
                    />
                    <Button variant="outline" onClick={addSkill}>
                      {language === 'en' ? 'Add' : 'إضافة'}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {user?.role === 'employee' ? '8' : '12'}
              </div>
              <div className="text-sm text-gray-600">
                {user?.role === 'employee' 
                  ? (language === 'en' ? 'Applications Sent' : 'طلبات مرسلة')
                  : (language === 'en' ? 'Jobs Posted' : 'وظائف منشورة')
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {user?.role === 'employee' ? '3' : '45'}
              </div>
              <div className="text-sm text-gray-600">
                {user?.role === 'employee'
                  ? (language === 'en' ? 'Interviews' : 'مقابلات')
                  : (language === 'en' ? 'Applications Received' : 'طلبات واردة')
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {user?.role === 'employee' ? '34' : '156'}
              </div>
              <div className="text-sm text-gray-600">
                {user?.role === 'employee'
                  ? (language === 'en' ? 'Profile Views' : 'مشاهدات الملف')
                  : (language === 'en' ? 'Total Views' : 'إجمالي المشاهدات')
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              {language === 'en' ? 'Cancel' : 'إلغاء'}
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveProfile}
            >
              {language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
