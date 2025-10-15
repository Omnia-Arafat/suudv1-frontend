'use client';

import React, { useState, useRef } from 'react';
import { Settings, Save, Shield, Bell, Database, Mail, Globe, Users, Lock } from 'lucide-react';
import { Toast } from 'primereact/toast';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export default function AdminSettingsContent() {
  const [activeSection, setActiveSection] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const toast = useRef<Toast>(null);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    site_name: 'SU\'UD Job Portal',
    site_description: 'Leading job portal in Saudi Arabia connecting talent with opportunities',
    contact_email: 'admin@suud.sa',
    support_email: 'support@suud.sa',
    phone: '+966-11-123-4567',
    address: 'Riyadh, Saudi Arabia',
    maintenance_mode: false,
    registration_enabled: true
  });

  // User Settings
  const [userSettings, setUserSettings] = useState({
    default_user_role: 'employee',
    email_verification_required: true,
    manual_approval_required: false,
    password_min_length: 8,
    session_timeout: 30,
    max_login_attempts: 5
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtp_host: 'smtp.gmail.com',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    from_email: 'noreply@suud.sa',
    from_name: 'SU\'UD Job Portal',
    email_notifications: true
  });

  // Job Settings
  const [jobSettings, setJobSettings] = useState({
    auto_approve_jobs: false,
    job_expiry_days: 30,
    max_applications_per_job: 100,
    featured_jobs_enabled: true,
    job_categories: ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Sales'],
    salary_display: 'range'
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    two_factor_enabled: false,
    password_complexity: true,
    auto_logout_time: 60,
    login_attempt_limit: 3,
    ip_blocking_enabled: true,
    session_security: 'high'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    new_user_registration: true,
    new_job_posting: true,
    new_application: true,
    system_alerts: true,
    security_alerts: true,
    daily_reports: false,
    weekly_reports: true,
    monthly_reports: true
  });

  const settingsSections: SettingsSection[] = [
    {
      id: 'general',
      title: 'General',
      icon: <Settings className="h-5 w-5" />,
      description: 'Basic platform configuration'
    },
    {
      id: 'users',
      title: 'User Management',
      icon: <Users className="h-5 w-5" />,
      description: 'User registration and authentication settings'
    },
    {
      id: 'email',
      title: 'Email Configuration',
      icon: <Mail className="h-5 w-5" />,
      description: 'SMTP and email notification settings'
    },
    {
      id: 'jobs',
      title: 'Job Settings',
      icon: <Globe className="h-5 w-5" />,
      description: 'Job posting and management configuration'
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield className="h-5 w-5" />,
      description: 'Security and authentication settings'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell className="h-5 w-5" />,
      description: 'System notification preferences'
    }
  ];

  const handleSave = async (section: string) => {
    setIsSaving(true);
    try {
      // Here you would call the backend API to save settings
      console.log(`Saving ${section} settings...`);
      // await adminService.updateSettings(section, settings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.current?.show({
        severity: 'success',
        summary: 'Settings Saved! 🎉',
        detail: `${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`,
        life: 4000
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error ❌',
        detail: 'Failed to save settings. Please try again.',
        life: 4000
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">General Platform Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Site Name</label>
            <input
              type="text"
              value={generalSettings.site_name}
              onChange={(e) => setGeneralSettings({...generalSettings, site_name: e.target.value})}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              value={generalSettings.contact_email}
              onChange={(e) => setGeneralSettings({...generalSettings, contact_email: e.target.value})}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Support Email</label>
            <input
              type="email"
              value={generalSettings.support_email}
              onChange={(e) => setGeneralSettings({...generalSettings, support_email: e.target.value})}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={generalSettings.phone}
              onChange={(e) => setGeneralSettings({...generalSettings, phone: e.target.value})}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Site Description</label>
          <textarea
            rows={3}
            value={generalSettings.site_description}
            onChange={(e) => setGeneralSettings({...generalSettings, site_description: e.target.value})}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={generalSettings.maintenance_mode}
              onChange={(e) => setGeneralSettings({...generalSettings, maintenance_mode: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Maintenance Mode
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={generalSettings.registration_enabled}
              onChange={(e) => setGeneralSettings({...generalSettings, registration_enabled: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              User Registration Enabled
            </label>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => handleSave('general')}
        disabled={isSaving}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Management Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Default User Role</label>
            <select
              value={userSettings.default_user_role}
              onChange={(e) => setUserSettings({...userSettings, default_user_role: e.target.value})}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="employee">Employee</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Minimum Length</label>
            <input
              type="number"
              min="6"
              max="20"
              value={userSettings.password_min_length}
              onChange={(e) => setUserSettings({...userSettings, password_min_length: parseInt(e.target.value)})}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
            <input
              type="number"
              min="15"
              max="120"
              value={userSettings.session_timeout}
              onChange={(e) => setUserSettings({...userSettings, session_timeout: parseInt(e.target.value)})}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Login Attempts</label>
            <input
              type="number"
              min="3"
              max="10"
              value={userSettings.max_login_attempts}
              onChange={(e) => setUserSettings({...userSettings, max_login_attempts: parseInt(e.target.value)})}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={userSettings.email_verification_required}
              onChange={(e) => setUserSettings({...userSettings, email_verification_required: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Email Verification Required
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={userSettings.manual_approval_required}
              onChange={(e) => setUserSettings({...userSettings, manual_approval_required: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Manual Approval Required for New Users
            </label>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => handleSave('users')}
        disabled={isSaving}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'users':
        return renderUserSettings();
      case 'email':
        return (
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Email Configuration</h3>
            <p className="text-gray-500">Email settings configuration will be implemented here.</p>
          </div>
        );
      case 'jobs':
        return (
          <div className="text-center py-12">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Job Settings</h3>
            <p className="text-gray-500">Job management settings will be implemented here.</p>
          </div>
        );
      case 'security':
        return (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
            <p className="text-gray-500">Security configuration options will be implemented here.</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
            <p className="text-gray-500">Notification preferences will be implemented here.</p>
          </div>
        );
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mr-4">
            <Settings className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
            <p className="text-sm text-gray-500">Configure platform settings and preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Layout */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="bg-gray-50 p-6 border-r border-gray-200">
            <nav className="space-y-2">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === section.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {section.icon}
                  <span className="ml-3">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {settingsSections.find(s => s.id === activeSection)?.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {settingsSections.find(s => s.id === activeSection)?.description}
              </p>
            </div>

            {renderActiveSection()}
          </div>
        </div>
      </div>
      
      <Toast ref={toast} />
    </div>
  );
}
