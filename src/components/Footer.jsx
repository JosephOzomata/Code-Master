import React from 'react';
import { FaCode, FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-gray-800 border-t border-emerald-900"
    >
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <FaCode className="text-white text-xl" />
              </div>
              <span className="text-white text-xl font-bold">CodeMaster</span>
            </div>
            <p className="text-gray-400 text-sm">
              Master programming through interactive courses, hands-on coding, and real-world projects.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/courses" className="text-gray-400 hover:text-emerald-400 transition-colors">Courses</a></li>
              <li><a href="/code" className="text-gray-400 hover:text-emerald-400 transition-colors">Playground</a></li>
              <li><a href="/profile" className="text-gray-400 hover:text-emerald-400 transition-colors">Profile</a></li>
              <li><a href="/certifications" className="text-gray-400 hover:text-emerald-400 transition-colors">Certifications</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li><a href="/courses" className="text-gray-400 hover:text-emerald-400 transition-colors">JavaScript</a></li>
              <li><a href="/courses" className="text-gray-400 hover:text-emerald-400 transition-colors">Python</a></li>
              <li><a href="/courses" className="text-gray-400 hover:text-emerald-400 transition-colors">React</a></li>
              <li><a href="/courses" className="text-gray-400 hover:text-emerald-400 transition-colors">Node.js</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
            
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 CodeMaster. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;