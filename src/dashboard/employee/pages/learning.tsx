'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';
import { employeeService } from '@/shared/services/employee.service';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  Play, 
  Clock, 
  Star,
  Award,
  CheckCircle,
  ExternalLink,
  TrendingUp,
  Users,
  Target,
  Lightbulb,
  FileText
} from 'lucide-react';

interface LearningResource {
  id: number;
  title: string;
  description: string;
  type: 'course' | 'article' | 'video' | 'workshop';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  enrolled: number;
  category: string;
  thumbnail: string;
  provider: string;
  is_free: boolean;
  progress?: number;
}

interface LearningData {
  recommended_courses: LearningResource[];
  trending_courses: LearningResource[];
  my_progress: Array<{
    course: LearningResource;
    progress: number;
    last_accessed: string;
  }>;
  skill_paths: Array<{
    id: number;
    title: string;
    description: string;
    courses_count: number;
    estimated_duration: string;
    difficulty: string;
  }>;
  achievements: Array<{
    id: number;
    title: string;
    description: string;
    earned_at: string;
    badge_icon: string;
  }>;
}

const CourseCard = ({ course, showProgress = false }: { course: LearningResource; showProgress?: boolean }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'video': return Play;
      case 'workshop': return Users;
      case 'article': return FileText;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TypeIcon = getTypeIcon(course.type);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
          <TypeIcon className="h-16 w-16 text-indigo-600" />
        </div>
        {!course.is_free && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-medium rounded">
            Premium
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">{course.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.enrolled}+ enrolled</span>
          </div>
        </div>

        {showProgress && course.progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{course.provider}</span>
          <button className="inline-flex items-center px-3 py-1 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100">
            {showProgress ? 'Continue' : 'Start Learning'}
            <ExternalLink className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function EmployeeLearningContent() {
  const { user } = useAuth();
  const [learningData, setLearningData] = useState<LearningData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'recommended' | 'trending' | 'progress' | 'paths'>('recommended');

  useEffect(() => {
    fetchLearningData();
  }, []);

  const fetchLearningData = async () => {
    try {
      setLoading(true);
      // This would be a new API endpoint for learning resources
      // const data = await employeeService.getLearningResources();
      // For now, we'll use fallback data
      throw new Error('API not implemented');
    } catch (error) {
      console.error('Failed to fetch learning data:', error);
      // Set comprehensive fallback data
      const fallbackData: LearningData = {
        recommended_courses: [
          {
            id: 1,
            title: "Advanced JavaScript for Web Developers",
            description: "Master modern JavaScript concepts including ES6+, async/await, and advanced patterns.",
            type: 'course',
            duration: '12 hours',
            difficulty: 'intermediate',
            rating: 4.8,
            enrolled: 15420,
            category: 'Programming',
            thumbnail: '',
            provider: 'TechLearn',
            is_free: true
          },
          {
            id: 2,
            title: "Interview Preparation Masterclass",
            description: "Comprehensive guide to acing technical and behavioral interviews.",
            type: 'workshop',
            duration: '8 hours',
            difficulty: 'intermediate',
            rating: 4.9,
            enrolled: 8930,
            category: 'Career',
            thumbnail: '',
            provider: 'CareerBoost',
            is_free: false
          },
          {
            id: 3,
            title: "Building REST APIs with Node.js",
            description: "Learn to build scalable REST APIs using Node.js, Express, and MongoDB.",
            type: 'course',
            duration: '16 hours',
            difficulty: 'intermediate',
            rating: 4.7,
            enrolled: 12100,
            category: 'Backend Development',
            thumbnail: '',
            provider: 'CodeAcademy',
            is_free: true
          }
        ],
        trending_courses: [
          {
            id: 4,
            title: "AI and Machine Learning Fundamentals",
            description: "Introduction to AI concepts, machine learning algorithms, and practical applications.",
            type: 'course',
            duration: '20 hours',
            difficulty: 'beginner',
            rating: 4.6,
            enrolled: 25600,
            category: 'Artificial Intelligence',
            thumbnail: '',
            provider: 'AILearn',
            is_free: false
          }
        ],
        my_progress: [],
        skill_paths: [
          {
            id: 1,
            title: "Full-Stack Developer Path",
            description: "Complete journey from frontend to backend development",
            courses_count: 8,
            estimated_duration: "3-4 months",
            difficulty: "intermediate"
          },
          {
            id: 2,
            title: "Data Science Career Track",
            description: "Master data analysis, visualization, and machine learning",
            courses_count: 12,
            estimated_duration: "5-6 months",
            difficulty: "intermediate"
          }
        ],
        achievements: []
      };
      setLearningData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center mr-4">
            <GraduationCap className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Learning Center</h1>
            <p className="text-sm text-gray-500">Enhance your skills and advance your career</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1">
          <span className="text-sm font-medium text-blue-800">🎉 New courses added!</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-indigo-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-500">Courses In Progress</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-500">Completed Courses</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-500">Certificates Earned</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-500">Skills Acquired</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'recommended', name: 'Recommended', icon: Lightbulb },
            { id: 'trending', name: 'Trending', icon: TrendingUp },
            { id: 'progress', name: 'My Progress', icon: Target },
            { id: 'paths', name: 'Skill Paths', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'recommended' && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningData?.recommended_courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'trending' && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningData?.trending_courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">My Learning Progress</h2>
          {learningData?.my_progress.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses in progress</h3>
              <p className="mt-1 text-sm text-gray-500">Start a course to track your learning progress</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningData?.my_progress.map((item) => (
                <CourseCard key={item.course.id} course={{...item.course, progress: item.progress}} showProgress />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'paths' && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Career Skill Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningData?.skill_paths.map((path) => (
              <div key={path.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{path.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{path.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{path.courses_count} courses</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{path.estimated_duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        <span>{path.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                    Start Learning Path
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
