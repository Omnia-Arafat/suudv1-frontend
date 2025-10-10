"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { employerService } from "@/shared/services/employer.service";
import {
  Building,
  MapPin,
  Users,
  Globe,
  Phone,
  Mail,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Star,
  Award,
  Briefcase,
  Plus,
  Trash2,
  ExternalLink,
  FileText,
} from "lucide-react";

interface CompanyProfile {
  id: number;
  name: string;
  description: string;
  industry: string;
  company_size: string;
  founded_year: number;
  website: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
  logo_url?: string;
  cover_image_url?: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  benefits: string[];
  culture: string;
  mission: string;
  vision: string;
  values: string[];
  awards: Array<{
    name: string;
    year: number;
    description: string;
  }>;
  team_size: number;
  locations: Array<{
    city: string;
    country: string;
    is_headquarters: boolean;
  }>;
}

export default function CompanyProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newAward, setNewAward] = useState({
    name: "",
    year: new Date().getFullYear(),
    description: "",
  });
  const [newLocation, setNewLocation] = useState({
    city: "",
    country: "",
    is_headquarters: false,
  });

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);
      const response = await employerService.getCompanyProfile();
      if (response.success) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch company profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field: string, currentValue: any) => {
    setEditingField(field);
    setTempValue(
      typeof currentValue === "string"
        ? currentValue
        : JSON.stringify(currentValue)
    );
  };

  const handleSave = async (field: string, value?: any) => {
    try {
      let valueToSave = value !== undefined ? value : tempValue;

      // Parse JSON for complex fields
      if (
        ["address", "social_links", "values", "awards", "locations"].includes(
          field
        ) &&
        typeof valueToSave === "string"
      ) {
        try {
          valueToSave = JSON.parse(valueToSave);
        } catch {
          // If parsing fails, keep as string
        }
      }

      const updateData = { [field]: valueToSave };
      const response = await employerService.updateCompanyProfile(updateData);

      if (response.success) {
        setProfile((prev) => (prev ? { ...prev, [field]: valueToSave } : null));
        setEditingField(null);
        setTempValue("");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      const updatedBenefits = [...(profile?.benefits || []), newBenefit.trim()];
      handleSave("benefits", updatedBenefits);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    const updatedBenefits =
      profile?.benefits.filter((_, i) => i !== index) || [];
    handleSave("benefits", updatedBenefits);
  };

  const addValue = () => {
    if (newValue.trim()) {
      const updatedValues = [...(profile?.values || []), newValue.trim()];
      handleSave("values", updatedValues);
      setNewValue("");
    }
  };

  const removeValue = (index: number) => {
    const updatedValues = profile?.values.filter((_, i) => i !== index) || [];
    handleSave("values", updatedValues);
  };

  const addAward = () => {
    if (newAward.name.trim()) {
      const updatedAwards = [...(profile?.awards || []), newAward];
      handleSave("awards", updatedAwards);
      setNewAward({
        name: "",
        year: new Date().getFullYear(),
        description: "",
      });
    }
  };

  const removeAward = (index: number) => {
    const updatedAwards = profile?.awards.filter((_, i) => i !== index) || [];
    handleSave("awards", updatedAwards);
  };

  const addLocation = () => {
    if (newLocation.city.trim() && newLocation.country.trim()) {
      const updatedLocations = [...(profile?.locations || []), newLocation];
      handleSave("locations", updatedLocations);
      setNewLocation({ city: "", country: "", is_headquarters: false });
    }
  };

  const removeLocation = (index: number) => {
    const updatedLocations =
      profile?.locations.filter((_, i) => i !== index) || [];
    handleSave("locations", updatedLocations);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Company Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Please complete your company profile to continue.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Company Profile
                </h1>
                <p className="mt-2 text-gray-600">
                  Manage your company information and branding
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {isEditing ? "View Mode" : "Edit Mode"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  {editingField === "name" ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={() => handleSave("name")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900">{profile.name}</p>
                      {isEditing && (
                        <button
                          onClick={() => handleEdit("name", profile.name)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  {editingField === "industry" ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={() => handleSave("industry")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900">{profile.industry}</p>
                      {isEditing && (
                        <button
                          onClick={() =>
                            handleEdit("industry", profile.industry)
                          }
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size
                  </label>
                  {editingField === "company_size" ? (
                    <div className="flex items-center space-x-2">
                      <select
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                      <button
                        onClick={() => handleSave("company_size")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900">{profile.company_size}</p>
                      {isEditing && (
                        <button
                          onClick={() =>
                            handleEdit("company_size", profile.company_size)
                          }
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Founded Year
                  </label>
                  {editingField === "founded_year" ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={() => handleSave("founded_year")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900">{profile.founded_year}</p>
                      {isEditing && (
                        <button
                          onClick={() =>
                            handleEdit("founded_year", profile.founded_year)
                          }
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                {editingField === "description" ? (
                  <div className="space-y-2">
                    <textarea
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave("description")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <p className="text-gray-900">{profile.description}</p>
                    {isEditing && (
                      <button
                        onClick={() =>
                          handleEdit("description", profile.description)
                        }
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  {editingField === "website" ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="url"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={() => handleSave("website")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900">{profile.website}</p>
                      {isEditing && (
                        <button
                          onClick={() => handleEdit("website", profile.website)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  {editingField === "phone" ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="tel"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={() => handleSave("phone")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900">{profile.phone}</p>
                      {isEditing && (
                        <button
                          onClick={() => handleEdit("phone", profile.phone)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {editingField === "email" ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="email"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={() => handleSave("email")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900">{profile.email}</p>
                      {isEditing && (
                        <button
                          onClick={() => handleEdit("email", profile.email)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Company Culture */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Company Culture
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mission
                  </label>
                  {editingField === "mission" ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave("mission")}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <p className="text-gray-900">{profile.mission}</p>
                      {isEditing && (
                        <button
                          onClick={() => handleEdit("mission", profile.mission)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vision
                  </label>
                  {editingField === "vision" ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave("vision")}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <p className="text-gray-900">{profile.vision}</p>
                      {isEditing && (
                        <button
                          onClick={() => handleEdit("vision", profile.vision)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Culture
                  </label>
                  {editingField === "culture" ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave("culture")}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <p className="text-gray-900">{profile.culture}</p>
                      {isEditing && (
                        <button
                          onClick={() => handleEdit("culture", profile.culture)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Company Values
              </h2>

              {isEditing && (
                <div className="mb-4 flex space-x-2">
                  <input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Add a new value"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={addValue}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}

              {profile.values.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {profile.values.map((value, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-blue-50 rounded-md"
                    >
                      <span className="text-sm text-blue-800">{value}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeValue(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No values added yet.</p>
              )}
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Employee Benefits
              </h2>

              {isEditing && (
                <div className="mb-4 flex space-x-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Add a new benefit"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={addBenefit}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}

              {profile.benefits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {profile.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-green-50 rounded-md"
                    >
                      <span className="text-sm text-green-800">{benefit}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeBenefit(index)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No benefits added yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Company Logo */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Company Logo
              </h2>

              <div className="text-center">
                {profile.logo_url ? (
                  <img
                    src={profile.logo_url}
                    alt="Company Logo"
                    className="w-32 h-32 mx-auto rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                    <Building className="h-16 w-16 text-gray-400" />
                  </div>
                )}

                {isEditing && (
                  <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Logo
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Stats
              </h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Team Size
                    </p>
                    <p className="text-sm text-gray-500">
                      {profile.team_size} employees
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Founded</p>
                    <p className="text-sm text-gray-500">
                      {profile.founded_year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Locations
                    </p>
                    <p className="text-sm text-gray-500">
                      {profile.locations.length} offices
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Award className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Awards</p>
                    <p className="text-sm text-gray-500">
                      {profile.awards.length} awards
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Social Links
              </h2>

              <div className="space-y-3">
                {profile.social_links.linkedin && (
                  <a
                    href={profile.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                )}

                {profile.social_links.twitter && (
                  <a
                    href={profile.social_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400 hover:text-blue-600"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Twitter
                  </a>
                )}

                {profile.social_links.facebook && (
                  <a
                    href={profile.social_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-800 hover:text-blue-900"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Facebook
                  </a>
                )}

                {profile.social_links.instagram && (
                  <a
                    href={profile.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-pink-600 hover:text-pink-800"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
