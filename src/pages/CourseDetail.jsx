import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FaPlay, 
  FaCheck, 
  FaLock, 
  FaClock, 
  FaStar,
  FaArrowLeft,
  FaBook,
  FaCode,
  FaQuestionCircle
} from 'react-icons/fa';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user, updateProgress } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lessons');

  const course = {
    id: courseId,
    title: courseId === 'javascript-fundamentals' ? 'JavaScript Fundamentals' : 
           courseId === 'python-basics' ? 'Python for Beginners' : 'React Masterclass',
    description: 'Master the fundamentals of programming with this comprehensive course designed for beginners.',
    instructor: 'Sarah Johnson',
    instructorBio: 'Senior Software Engineer with 8+ years of experience',
    rating: 4.8,
    students: 1542,
    duration: '4 weeks',
    level: 'Beginner',
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    color: 'from-yellow-500 to-orange-500',
    lessons: [
      {
        id: '1',
        title: 'Introduction to Programming',
        description: 'Learn the basics of programming and set up your development environment.',
        duration: '30 min',
        type: 'video',
        free: true,
        completed: user?.progress?.[courseId]?.['1']?.completed || false
      },
      {
        id: '2',
        title: 'Variables and Data Types',
        description: 'Understand how to store and manipulate data in your programs.',
        duration: '45 min',
        type: 'video',
        free: true,
        completed: user?.progress?.[courseId]?.['2']?.completed || false
      },
      {
        id: '3',
        title: 'Control Structures',
        description: 'Learn how to make decisions and repeat actions in your code.',
        duration: '60 min',
        type: 'interactive',
        free: false,
        completed: user?.progress?.[courseId]?.['3']?.completed || false
      },
      {
        id: '4',
        title: 'Functions and Scope',
        description: 'Organize your code into reusable functions and understand scope.',
        duration: '50 min',
        type: 'video',
        free: false,
        completed: user?.progress?.[courseId]?.['4']?.completed || false
      },
      {
        id: '5',
        title: 'Arrays and Objects',
        description: 'Work with complex data structures to store collections of data.',
        duration: '55 min',
        type: 'interactive',
        free: false,
        completed: user?.progress?.[courseId]?.['5']?.completed || false
      },
      {
        id: 'quiz',
        title: 'Final Assessment',
        description: 'Test your knowledge with this comprehensive quiz.',
        duration: '30 min',
        type: 'quiz',
        free: false,
        completed: user?.progress?.[courseId]?.['quiz']?.completed || false
      }
    ],
    resources: [
      { name: 'Course Slides', type: 'pdf', size: '2.4 MB' },
      { name: 'Code Examples', type: 'zip', size: '1.8 MB' },
      { name: 'Cheat Sheet', type: 'pdf', size: '1.2 MB' }
    ]
  };

  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
  const progress = Math.round((completedLessons / course.lessons.length) * 100);

  const handleLessonClick = (lesson) => {
    if (!lesson.free && !user) {
      navigate('/signup');
      return;
    }
    navigate(`/course/${courseId}/lesson/${lesson.id}`);
  };

  const markAsCompleted = (lessonId, e) => {
    e.stopPropagation();
    if (user) {
      updateProgress(courseId, lessonId, true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className={`bg-gradient-to-r ${course.color} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/courses" className="inline-flex items-center text-white hover:text-gray-200 mb-6">
              <FaArrowLeft className="mr-2" />
              Back to Courses
            </Link>
            
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{course.title}</h1>
                <p className="text-xl text-white opacity-90 mb-6 max-w-3xl">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 text-white">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-300 mr-1" />
                    <span>{course.rating} ({course.students} students)</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      course.level === 'Beginner' ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 mt-6 lg:mt-0 lg:ml-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{progress}%</div>
                  <div className="text-white opacity-90 mb-4">Course Complete</div>
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4FD1C5"
                        strokeWidth="3"
                        strokeDasharray={`${progress}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-semibold">{completedLessons}/{course.lessons.length}</span>
                    </div>
                  </div>
                  {progress === 100 ? (
                    <div className="text-emerald-300 font-semibold">Course Completed! 🎉</div>
                  ) : (
                    <button 
                      onClick={() => {
                        const nextLesson = course.lessons.find(lesson => !lesson.completed) || course.lessons[0];
                        handleLessonClick(nextLesson);
                      }}
                      className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      {completedLessons > 0 ? 'Continue Learning' : 'Start Learning'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex border-b border-gray-700 mb-8">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'lessons'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Course Content
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'resources'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Resources
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'instructor'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Instructor
              </button>
            </div>

            {activeTab === 'lessons' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Course Lessons ({course.lessons.length})
                </h3>
                {course.lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleLessonClick(lesson)}
                    className={`bg-gray-800 rounded-lg p-6 border cursor-pointer transition-all hover:border-emerald-600 ${
                      lesson.completed ? 'border-emerald-500' : 'border-gray-700'
                    } ${!lesson.free && !user ? 'opacity-75' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          lesson.completed ? 'bg-emerald-500' : 'bg-gray-700'
                        }`}>
                          {lesson.completed ? (
                            <FaCheck className="text-white" />
                          ) : lesson.type === 'quiz' ? (
                            <FaQuestionCircle className="text-white" />
                          ) : lesson.type === 'interactive' ? (
                            <FaCode className="text-white" />
                          ) : (
                            <FaPlay className="text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white flex items-center">
                            {lesson.title}
                            {!lesson.free && !user && <FaLock className="ml-2 text-yellow-500" />}
                          </h4>
                          <p className="text-gray-400 text-sm">{lesson.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FaClock className="mr-1" />
                              {lesson.duration}
                            </span>
                            <span className="capitalize">{lesson.type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {lesson.completed && (
                          <span className="text-emerald-400 text-sm font-semibold">Completed</span>
                        )}
                        {user && !lesson.completed && (
                          <button
                            onClick={(e) => markAsCompleted(lesson.id, e)}
                            className="text-gray-400 hover:text-emerald-400 transition-colors"
                            title="Mark as completed"
                          >
                            <FaCheck className="text-xl" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'resources' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Course Resources</h3>
                {course.resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-emerald-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                          <FaBook className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{resource.name}</h4>
                          <p className="text-gray-400 text-sm">{resource.type.toUpperCase()} • {resource.size}</p>
                        </div>
                      </div>
                      <button className="text-emerald-400 hover:text-emerald-300 font-medium">
                        Download
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'instructor' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    SJ
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{course.instructor}</h3>
                    <p className="text-gray-400 mb-4">{course.instructorBio}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>⭐ 4.9/5 Rating</span>
                      <span>👨‍🎓 12,345 Students</span>
                      <span>📚 8 Courses</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-gray-300">
                  <p>
                    Sarah is a passionate software engineer and educator with over 8 years of experience 
                    in the tech industry. She has worked at leading tech companies and loves sharing her 
                    knowledge with aspiring developers.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:w-80 space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Course Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Level</span>
                  <span className="text-white">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lessons</span>
                  <span className="text-white">{course.lessons.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white">{course.category}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-emerald-900">
              <h4 className="text-lg font-semibold text-white mb-4">Certificate</h4>
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaStar className="text-white text-2xl" />
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Complete all lessons and pass the final assessment to earn your certificate
                </p>
                {progress === 100 ? (
                  <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-medium transition-colors">
                    Download Certificate
                  </button>
                ) : (
                  <div className="text-yellow-400 text-sm">
                    {100 - progress}% remaining
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;