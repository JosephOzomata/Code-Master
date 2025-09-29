import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendar,
  FaEdit,
  FaSave,
  FaTimes,
  FaCode,
  FaTrophy,
  FaClock,
  FaChartLine
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateProgress } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'Passionate learner on CodeMaster journey!'
  });

  const userProgress = {
    totalCourses: 3,
    completedCourses: 1,
    totalLessons: 40,
    completedLessons: 12,
    totalHours: 24,
    currentStreak: 7,
    certificates: 2
  };

  const recentActivity = [
    {
      id: 1,
      course: 'JavaScript Fundamentals',
      lesson: 'Variables and Data Types',
      action: 'completed',
      time: '2 hours ago',
      score: 95
    },
    {
      id: 2,
      course: 'Python for Beginners',
      lesson: 'Control Structures',
      action: 'started',
      time: '1 day ago',
      score: null
    },
    {
      id: 3,
      course: 'JavaScript Fundamentals',
      lesson: 'Functions and Scope',
      action: 'completed',
      time: '2 days ago',
      score: 88
    },
    {
      id: 4,
      course: 'HTML & CSS Pro',
      lesson: 'Flexbox Layout',
      action: 'completed',
      time: '3 days ago',
      score: 92
    }
  ];

  const skills = [
    { name: 'JavaScript', level: 75, color: 'bg-yellow-500' },
    { name: 'HTML/CSS', level: 85, color: 'bg-orange-500' },
    { name: 'Python', level: 60, color: 'bg-green-500' },
    { name: 'React', level: 45, color: 'bg-blue-500' }
  ];

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || 'Passionate learner on CodeMaster journey!'
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-gray-400">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Your <span className="text-emerald-400">Profile</span>
          </h1>
          <p className="text-xl text-gray-400">
            Track your learning journey and achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 rounded-xl p-6 border border-emerald-900"
            >
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Full Name"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Email"
                    />
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                      placeholder="Bio"
                      rows="3"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <FaSave className="mr-2" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <FaTimes className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                    <p className="text-gray-400 mb-4">{editForm.bio}</p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center justify-center">
                        <FaEnvelope className="mr-2" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <FaCalendar className="mr-2" />
                        <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <FaEdit className="mr-2" />
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FaChartLine className="mr-2 text-emerald-400" />
                Learning Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Courses Completed</span>
                  <span className="text-white font-semibold">
                    {userProgress.completedCourses}/{userProgress.totalCourses}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Lessons Completed</span>
                  <span className="text-white font-semibold">
                    {userProgress.completedLessons}/{userProgress.totalLessons}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Learning Hours</span>
                  <span className="text-white font-semibold">{userProgress.totalHours}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="text-white font-semibold">{userProgress.currentStreak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Certificates</span>
                  <span className="text-white font-semibold">{userProgress.certificates}</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <FaCode className="mr-2 text-emerald-400" />
                Skills Progress
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1, duration: 1 }}
                        className={`h-3 rounded-full ${skill.color} transition-all duration-1000`}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <FaClock className="mr-2 text-emerald-400" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-emerald-600 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.action === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}>
                        {activity.action === 'completed' ? (
                          <FaTrophy className="text-white" />
                        ) : (
                          <FaCode className="text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{activity.lesson}</h4>
                        <p className="text-gray-400 text-sm">{activity.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">{activity.time}</div>
                      {activity.score && (
                        <div className="text-emerald-400 font-semibold">{activity.score}%</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 border border-emerald-900"
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <FaTrophy className="mr-2 text-yellow-400" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'First Steps', desc: 'Complete your first lesson', earned: true },
                  { name: 'Quick Learner', desc: 'Complete 5 lessons in a week', earned: true },
                  { name: 'Code Master', desc: 'Complete a full course', earned: false },
                  { name: 'Perfect Score', desc: 'Get 100% on a quiz', earned: false }
                ].map((achievement, index) => (
                  <div
                    key={achievement.name}
                    className={`text-center p-4 rounded-lg border-2 ${
                      achievement.earned
                        ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                        : 'border-gray-600 bg-gray-700 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {achievement.earned ? '🏆' : '🔒'}
                    </div>
                    <div className="text-sm font-semibold text-white mb-1">
                      {achievement.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {achievement.desc}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;