import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FaSearch, 
  FaFilter, 
  FaClock, 
  FaUsers,
  FaStar,
  FaPlay,
  FaLock,
  FaCode,
  FaPython,
  FaJs,
  FaJava,
  FaHtml5,
  FaCss3Alt
} from 'react-icons/fa';

const Courses = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const courses = [
    {
      id: 'javascript-fundamentals',
      title: 'JavaScript Fundamentals',
      description: 'Master the language of the web with interactive lessons and real-world projects. Learn variables, functions, DOM manipulation, and more.',
      icon: <FaJs className="text-3xl text-yellow-400" />,
      level: 'Beginner',
      duration: '4 weeks',
      lessons: 12,
      students: 1542,
      rating: 4.8,
      category: 'web',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      color: 'from-yellow-500 to-orange-500',
      progress: user?.progress?.['javascript-fundamentals'] ? 35 : 0
    },
    {
      id: 'python-basics',
      title: 'Python for Beginners',
      description: 'Start your programming journey with Python. Learn syntax, data structures, and build your first applications.',
      icon: <FaPython className="text-3xl text-green-500" />,
      level: 'Beginner',
      duration: '3 weeks',
      lessons: 10,
      students: 2031,
      rating: 4.9,
      category: 'programming',
      image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400',
      color: 'from-green-500 to-blue-500',
      progress: user?.progress?.['python-basics'] ? 20 : 0
    },
    {
      id: 'react-masterclass',
      title: 'React Masterclass',
      description: 'Build modern web applications with React. Learn hooks, context, routing, and state management.',
      icon: <FaCode className="text-3xl text-blue-400" />,
      level: 'Intermediate',
      duration: '6 weeks',
      lessons: 18,
      students: 892,
      rating: 4.7,
      category: 'web',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      color: 'from-blue-500 to-purple-500',
      progress: 0
    },
    {
      id: 'html-css',
      title: 'HTML & CSS Pro',
      description: 'Create beautiful, responsive websites with modern HTML5 and CSS3 techniques including Flexbox and Grid.',
      icon: <FaHtml5 className="text-3xl text-orange-500" />,
      level: 'Beginner',
      duration: '3 weeks',
      lessons: 8,
      students: 3120,
      rating: 4.6,
      category: 'web',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      color: 'from-orange-500 to-red-500',
      progress: 0
    },
    {
      id: 'java-essentials',
      title: 'Java Essentials',
      description: 'Learn object-oriented programming with Java. Build console applications and understand core programming concepts.',
      icon: <FaJava className="text-3xl text-red-500" />,
      level: 'Beginner',
      duration: '5 weeks',
      lessons: 14,
      students: 1245,
      rating: 4.5,
      category: 'programming',
      image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400',
      color: 'from-red-500 to-pink-500',
      progress: 0
    },
    {
      id: 'css-advanced',
      title: 'Advanced CSS',
      description: 'Master advanced CSS techniques including animations, transforms, and modern layout systems.',
      icon: <FaCss3Alt className="text-3xl text-blue-500" />,
      level: 'Intermediate',
      duration: '2 weeks',
      lessons: 6,
      students: 876,
      rating: 4.8,
      category: 'web',
      image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=400',
      color: 'from-blue-400 to-cyan-500',
      progress: 0
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', count: courses.length },
    { id: 'web', name: 'Web Development', count: courses.filter(c => c.category === 'web').length },
    { id: 'programming', name: 'Programming', count: courses.filter(c => c.category === 'programming').length },
    { id: 'intermediate', name: 'Intermediate', count: courses.filter(c => c.level === 'Intermediate').length },
    { id: 'beginner', name: 'Beginner', count: courses.filter(c => c.level === 'Beginner').length }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         course.category === filter || 
                         course.level.toLowerCase() === filter;
    
    return matchesSearch && matchesFilter;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.students - a.students;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our <span className="text-emerald-400">Courses</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Start your coding journey with interactive courses designed for all skill levels
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6 mb-8 border border-emerald-900"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="rating">Sort by Rating</option>
              <option value="duration">Sort by Duration</option>
              <option value="newest">Sort by Newest</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-600 transition-all duration-300"
            >
              <div className={`h-32 bg-gradient-to-r ${course.color} relative`}>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  {course.icon}
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.level === 'Beginner' 
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {user ? (
                  <Link
                    to={`/course/${course.id}`}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    {course.progress > 0 ? 'Continue Learning' : 'Start Learning'} 
                    <FaPlay className="ml-2" />
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <FaLock className="mr-2" />
                    Sign Up to Enroll
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {sortedCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;