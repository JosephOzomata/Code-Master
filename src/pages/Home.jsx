import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FaCode, 
  FaRocket, 
  FaUsers, 
  FaCertificate,
  FaPlay,
  FaArrowRight
} from 'react-icons/fa';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <FaCode className="text-3xl mb-4" />,
      title: "Interactive Coding",
      description: "Learn by doing with our hands-on coding exercises and real-time feedback."
    },
    {
      icon: <FaRocket className="text-3xl mb-4" />,
      title: "Project-Based Learning",
      description: "Build real projects that showcase your skills and enhance your portfolio."
    },
    {
      icon: <FaUsers className="text-3xl mb-4" />,
      title: "Expert Guidance",
      description: "Learn from industry professionals with years of experience in software development."
    },
    {
      icon: <FaCertificate className="text-3xl mb-4" />,
      title: "Earn Certifications",
      description: "Get recognized for your achievements with industry-recognized certifications."
    }
  ];

  const courses = [
    {
      title: "JavaScript Fundamentals",
      description: "Master the language of the web with interactive lessons and projects.",
      level: "Beginner",
      duration: "4 weeks",
      lessons: 12
    },
    {
      title: "Python for Beginners",
      description: "Learn Python programming from scratch with practical examples.",
      level: "Beginner",
      duration: "3 weeks",
      lessons: 10
    },
    {
      title: "React Masterclass",
      description: "Build modern web applications with React and advanced patterns.",
      level: "Intermediate",
      duration: "6 weeks",
      lessons: 18
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Master <span className="text-emerald-400">Coding</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Learn to code through interactive courses, hands-on projects, and earn certifications that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/courses"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center"
                >
                  Continue Learning <FaArrowRight className="ml-2" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                  >
                    Start Learning Free
                  </Link>
                  <Link
                    to="/courses"
                    className="border border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                  >
                    Browse Courses
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose CodeMaster?</h2>
            <p className="text-gray-400 text-lg">Experience learning like never before</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 p-6 rounded-xl border border-emerald-900 hover:border-emerald-600 transition-all duration-300 text-center"
              >
                <div className="text-emerald-400 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Popular Courses</h2>
            <p className="text-gray-400 text-lg">Start your coding journey with our most popular courses</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-600 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                    <span className="bg-emerald-600 text-white text-sm px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{course.description}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-6">
                    <span>{course.duration}</span>
                    <span>{course.lessons} lessons</span>
                  </div>
                  <Link
                    to={user ? "/courses" : "/signup"}
                    className="w-full bg-gray-700 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    {user ? "View Course" : "Enroll Now"} <FaPlay className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Link
              to="/courses"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-lg font-semibold"
            >
              View All Courses <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-emerald-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Coding Journey?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of students who have transformed their careers with CodeMaster.
            </p>
            <Link
              to={user ? "/courses" : "/signup"}
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
            >
              {user ? "Continue Learning" : "Get Started Today"} <FaRocket className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;