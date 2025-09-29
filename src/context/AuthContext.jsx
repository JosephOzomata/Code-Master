import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('codeMasterUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('codeMasterUsers') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('codeMasterUser', JSON.stringify(foundUser));
      toast.success('Welcome back!');
      return true;
    }
    toast.error('Invalid credentials');
    return false;
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('codeMasterUsers') || '[]');
    
    if (users.find(u => u.email === userData.email)) {
      toast.error('User already exists');
      return false;
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString(),
      progress: {},
      certifications: []
    };

    users.push(newUser);
    localStorage.setItem('codeMasterUsers', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('codeMasterUser', JSON.stringify(newUser));
    toast.success('Account created successfully!');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('codeMasterUser');
    toast.info('Logged out successfully');
  };

  const updateProgress = (courseId, lessonId, completed = true, score = null) => {
    if (!user) return;

    const updatedUser = { ...user };
    if (!updatedUser.progress) updatedUser.progress = {};
    if (!updatedUser.progress[courseId]) updatedUser.progress[courseId] = {};

    updatedUser.progress[courseId][lessonId] = {
      completed,
      completedAt: new Date().toISOString(),
      score
    };

    setUser(updatedUser);
    localStorage.setItem('codeMasterUser', JSON.stringify(updatedUser));

    // Update in users array
    const users = JSON.parse(localStorage.getItem('codeMasterUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('codeMasterUsers', JSON.stringify(users));
    }
  };

  const addCertification = (certification) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      certifications: [...(user.certifications || []), certification]
    };

    setUser(updatedUser);
    localStorage.setItem('codeMasterUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('codeMasterUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('codeMasterUsers', JSON.stringify(users));
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProgress,
    addCertification,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};