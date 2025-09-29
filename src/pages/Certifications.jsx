import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  FaDownload,
  FaShare,
  FaStar,
  FaCalendar,
  FaFilter,
  FaSearch,
  FaAward,
  FaCode,
} from "react-icons/fa";

const Certifications = () => {
  const { user } = useAuth();
  const [selectedCert, setSelectedCert] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const certifications = [
    {
      id: "cert-js-fundamentals-2024",
      courseId: "javascript-fundamentals",
      courseName: "JavaScript Fundamentals",
      issueDate: "2024-01-15",
      score: 92,
      duration: "4 weeks",
      skills: ["Variables", "Functions", "DOM Manipulation", "Events"],
      instructor: "Sarah Johnson",
      certificateUrl: "#",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "cert-html-css-2024",
      courseId: "html-css",
      courseName: "HTML & CSS Pro",
      issueDate: "2024-01-08",
      score: 88,
      duration: "3 weeks",
      skills: ["HTML5", "CSS3", "Flexbox", "Grid", "Responsive Design"],
      instructor: "Mike Chen",
      certificateUrl: "#",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "cert-python-basics-2024",
      courseId: "python-basics",
      courseName: "Python for Beginners",
      issueDate: "2024-02-01",
      score: 95,
      duration: "3 weeks",
      skills: [
        "Python Syntax",
        "Data Types",
        "Control Structures",
        "Functions",
      ],
      instructor: "Dr. Emily Davis",
      certificateUrl: "#",
      color: "from-green-500 to-blue-500",
    },
  ];

  const filteredCerts = certifications.filter((cert) => {
    const matchesSearch = cert.courseName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || cert.courseId.includes(filter);
    return matchesSearch && matchesFilter;
  });

  const handleDownload = () => {
    window.print();
  };


  const handleShare = (cert) => {
    const shareText = `I earned a certificate in ${cert.courseName} from CodeMaster! 🎉`;
    if (navigator.share) {
      navigator.share({
        title: "My CodeMaster Certificate",
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Certificate details copied to clipboard!");
    }
  };

  const renderCertificateModal = () => {
    if (!selectedCert) return null;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-yellow-200 via-white to-yellow-100 p-1 rounded-xl max-w-md w-full shadow-xl border-4 border-yellow-400"
        >
          <div className="bg-white rounded-lg p-6 font-serif text-center">
            <div className="border-2 border-gray-300 rounded-lg p-4 relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400 rounded-br-lg"></div>

              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                  CodeMaster
                </h1>
                <p className="text-sm text-gray-600">
                  Certificate of Completion
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-1">This certifies that</p>
              <h2 className="text-xl font-bold text-emerald-700 mb-2 underline decoration-dotted decoration-gray-300 underline-offset-4">
                {user?.name}
              </h2>

              <p className="text-sm text-gray-700 mb-1">
                has completed the course
              </p>
              <h3 className="text-md font-semibold text-gray-800 italic mb-3">
                {selectedCert.courseName}
              </h3>

              <div className="flex justify-center gap-4 text-xs text-gray-600 mt-3 mb-4">
                <div className="text-center">
                  <div className="font-semibold uppercase">Date</div>
                  <div>
                    {new Date(selectedCert.issueDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold uppercase">Score</div>
                  <div>{selectedCert.score}%</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold uppercase">Duration</div>
                  <div>{selectedCert.duration}</div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-800 mb-2">
                  Skills
                </p>
                <div className="flex flex-wrap justify-center gap-1">
                  {selectedCert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-2 py-0.5 rounded-full text-[10px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-4 pt-2 border-t border-gray-200 text-xs text-gray-700">
                <div className="text-center">
                  <div className="h-6 border-b border-gray-300 w-20 mx-auto mb-1"></div>
                  <div className="font-semibold">Instructor</div>
                  <div>{selectedCert.instructor}</div>
                </div>
                <div className="text-center">
                  <div className="h-6 border-b border-gray-300 w-20 mx-auto mb-1"></div>
                  <div className="font-semibold">Director</div>
                  <div>CodeMaster Academy</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-4 text-sm">
              <button
                onClick={() => setSelectedCert(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => handleDownload(selectedCert.id)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md font-semibold flex items-center"
              >
                <FaDownload className="mr-1" />
                Download
              </button>
              <button
                onClick={() => handleShare(selectedCert)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-semibold flex items-center"
              >
                <FaShare className="mr-1" />
                Share
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-400">
            Please log in to view your certifications
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Your <span className="text-emerald-400">Certifications</span>
          </h1>
          <p className="text-xl text-gray-400">
            Showcase your achievements and skills
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              label: "Total Certificates",
              value: certifications.length,
              icon: FaAward,
              color: "text-yellow-400",
            },
            {
              label: "Average Score",
              value: "92%",
              icon: FaStar,
              color: "text-emerald-400",
            },
            {
              label: "Courses Completed",
              value: "3",
              icon: FaCode,
              color: "text-blue-400",
            },
            {
              label: "Learning Hours",
              value: "50+",
              icon: FaCalendar,
              color: "text-purple-400",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700"
            >
              <stat.icon className={`text-3xl mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 mb-8 border border-emerald-900"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search certificates..."
                className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Courses</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="html">HTML/CSS</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-600 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              <div className={`h-4 bg-gradient-to-r ${cert.color}`}></div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <FaAward className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {cert.courseName}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Issued {new Date(cert.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-yellow-400">
                    <FaStar className="mr-1" />
                    <span className="font-semibold">{cert.score}%</span>
                  </div>
                  <div className="text-gray-400 text-sm">{cert.duration}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Certificate
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(cert.id);
                    }}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
                    title="Download"
                  >
                    <FaDownload />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredCerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No certificates found
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || filter !== "all"
                ? "Try adjusting your search or filters"
                : "Complete courses to earn certificates"}
            </p>
            {!searchTerm && filter === "all" && (
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Browse Courses
              </button>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>{renderCertificateModal()}</AnimatePresence>
    </div>
  );
};

export default Certifications;
