// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Lesson from './pages/Lesson';
import CodingEnvironment from './pages/CodingEnvironment';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Certifications from './pages/Certifications';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App bg-gray-900 min-h-screen text-white">
          <Navbar />
          <main className="main-content min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:courseId" element={
                  <ProtectedRoute>
                    <CourseDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/course/:courseId/lesson/:lessonId" 
                element={
                  <ProtectedRoute>
                    <Lesson />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/code" 
                element={
                  <ProtectedRoute>
                    <CodingEnvironment />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/certifications" 
                element={
                  <ProtectedRoute>
                    <Certifications />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;