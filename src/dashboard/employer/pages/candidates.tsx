"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useI18n } from "@/shared/contexts/I18nContext";
import { employerService } from "@/shared/services/employer.service";
import {
  Users,
  User,
  Search,
  Filter,
  MapPin,
  Calendar,
  Star,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Phone,
  Download,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  ChevronDown,
  Building,
} from "lucide-react";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  title: string;
  experience_years: number;
  education: string;
  skills: string[];
  resume_url?: string;
  portfolio_url?: string;
  expected_salary?: number;
  availability: "immediate" | "two_weeks" | "one_month" | "negotiable";
  rating?: number;
  profile_views: number;
  last_active: string;
  is_featured: boolean;
  is_favorited?: boolean;
  applications_count: number;
  summary?: string;
}

interface CandidatesData {
  candidates: Candidate[];
  total: number;
  filters: {
    locations: string[];
    skills: string[];
    experience_ranges: string[];
    education_levels: string[];
  };
}

const CandidateCard = ({
  candidate,
  onFavorite,
  onContact,
  onViewProfile,
}: {
  candidate: Candidate;
  onFavorite: (id: number) => void;
  onContact: (candidate: Candidate) => void;
  onViewProfile: (candidate: Candidate) => void;
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "immediate":
        return "bg-green-100 text-green-800";
      case "two_weeks":
        return "bg-blue-100 text-blue-800";
      case "one_month":
        return "bg-yellow-100 text-yellow-800";
      case "negotiable":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            {candidate.avatar ? (
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-indigo-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {candidate.name}
              </h3>
              {candidate.is_featured && (
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2 font-medium">
              {candidate.title}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{candidate.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>{candidate.experience_years} years exp</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Active {formatDate(candidate.last_active)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          {candidate.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">
                {candidate.rating}/5
              </span>
            </div>
          )}
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(
              candidate.availability
            )}`}
          >
            {candidate.availability.replace("_", " ")}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <GraduationCap className="h-4 w-4" />
          <span>{candidate.education}</span>
        </div>

        {candidate.summary && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
            {candidate.summary}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {candidate.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 4 && (
            <span className="text-xs text-gray-500">
              +{candidate.skills.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          {candidate.expected_salary && (
            <div>
              Expected:{" "}
              <span className="font-medium text-green-600">
                ${candidate.expected_salary.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <span>{candidate.profile_views} profile views</span>
            <span>{candidate.applications_count} applications</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex space-x-2">
          <button
            onClick={() => onViewProfile(candidate)}
            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Profile
          </button>

          {candidate.resume_url && (
            <a
              href={candidate.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-1" />
              Resume
            </a>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onFavorite(candidate.id)}
            className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-md ${
              candidate.is_favorited
                ? "text-red-700 bg-red-50 hover:bg-red-100"
                : "text-gray-700 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <Heart
              className={`h-4 w-4 mr-1 ${
                candidate.is_favorited ? "fill-current" : ""
              }`}
            />
            {candidate.is_favorited ? "Favorited" : "Favorite"}
          </button>

          <button
            onClick={() => onContact(candidate)}
            className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default function EmployerCandidatesContent() {
  const { user } = useAuth();
  const { language, t } = useI18n();
  const [candidatesData, setCandidatesData] = useState<CandidatesData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, [selectedLocation, selectedSkills, selectedExperience, sortBy]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      console.log("Fetching candidates...");
      const data = await employerService.getCandidates({
        search: searchTerm || undefined,
        location: selectedLocation !== "all" ? selectedLocation : undefined,
        skills: selectedSkills.length > 0 ? selectedSkills : undefined,
        experience:
          selectedExperience !== "all" ? selectedExperience : undefined,
        sort_by: sortBy,
      });
      console.log("Candidates response:", data);

      // Handle different response structures
      let candidatesData: CandidatesData;
      if (data && data.candidates) {
        candidatesData = data;
      } else if (data && Array.isArray(data)) {
        candidatesData = {
          candidates: data,
          total: data.length,
          filters: {
            locations: [
              "Remote",
              "New York",
              "San Francisco",
              "London",
              "Toronto",
            ],
            skills: ["JavaScript", "React", "Node.js", "Python", "Java", "PHP"],
            experience_ranges: [
              "0-2 years",
              "3-5 years",
              "6-10 years",
              "10+ years",
            ],
            education_levels: ["High School", "Bachelor's", "Master's", "PhD"],
          },
        };
      } else {
        throw new Error("Invalid response format");
      }

      setCandidatesData(candidatesData);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
      // Set fallback data
      const fallbackData: CandidatesData = {
        candidates: [],
        total: 0,
        filters: {
          locations: [
            "Remote",
            "New York",
            "San Francisco",
            "London",
            "Toronto",
          ],
          skills: ["JavaScript", "React", "Node.js", "Python", "Java", "PHP"],
          experience_ranges: [
            "0-2 years",
            "3-5 years",
            "6-10 years",
            "10+ years",
          ],
          education_levels: ["High School", "Bachelor's", "Master's", "PhD"],
        },
      };
      setCandidatesData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCandidates();
  };

  const handleFavorite = async (candidateId: number) => {
    try {
      await employerService.toggleCandidateFavorite(candidateId);
      // Refresh candidates to update favorite status
      await fetchCandidates();
    } catch (error) {
      console.error("Failed to favorite candidate:", error);
    }
  };

  const handleContact = (candidate: Candidate) => {
    // This would typically open a modal or redirect to messaging
    console.log("Contact candidate:", candidate.name);
  };

  const handleViewProfile = (candidate: Candidate) => {
    // This would typically redirect to candidate profile page
    console.log("View profile:", candidate.name);
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`flex items-center justify-between ${
          language === "ar" ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex items-center ${
            language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`h-10 w-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center ${
              language === "ar" ? "ml-4" : "mr-4"
            }`}
          >
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div className={language === "ar" ? "text-right" : "text-left"}>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("dashboard.candidates")}
            </h1>
            <p className="text-sm text-gray-500">
              {candidatesData?.total || 0} {t("dashboard.candidatesAvailable")}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative">
                <Search
                  className={`absolute inset-y-0 ${
                    language === "ar" ? "right-0 pr-3" : "left-0 pl-3"
                  } flex items-center h-full w-5 text-gray-400`}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`block w-full ${
                    language === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                  } py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder={t("dashboard.searchByNameTitleSkills")}
                />
              </form>
            </div>

            <div
              className={`flex ${
                language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"
              }`}
            >
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Filter
                  className={`h-4 w-4 ${language === "ar" ? "ml-1" : "mr-1"}`}
                />
                {t("dashboard.filters")}
                <ChevronDown
                  className={`h-4 w-4 ${
                    language === "ar" ? "mr-1" : "ml-1"
                  } transform transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="relevance">Most Relevant</option>
                <option value="experience">Most Experienced</option>
                <option value="rating">Highest Rated</option>
                <option value="recent">Recently Active</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Locations</option>
                    {candidatesData?.filters?.locations?.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Experience</option>
                    {candidatesData?.filters?.experience_ranges?.map(
                      (range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                    {candidatesData?.filters?.skills?.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          selectedSkills.includes(skill)
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {candidatesData &&
        candidatesData.candidates &&
        candidatesData.candidates.length > 0 ? (
          candidatesData.candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onFavorite={handleFavorite}
              onContact={handleContact}
              onViewProfile={handleViewProfile}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {searchTerm ||
              selectedLocation !== "all" ||
              selectedSkills.length > 0 ||
              selectedExperience !== "all"
                ? "No candidates found"
                : "No candidates available"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ||
              selectedLocation !== "all" ||
              selectedSkills.length > 0 ||
              selectedExperience !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Candidates will appear here as they join the platform."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
