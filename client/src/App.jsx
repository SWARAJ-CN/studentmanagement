import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import About from './pages/About';
import Feature from './pages/Feature';
import Notice from './components/Notice';
import Contact from './pages/Contact';
import StudentLogin from './pages/StudentLogin';
import StudentDash from './pages/StudentDash';
import TeacherLogin from './teacher/pages/TeacherLogin';
import TeacherDashboard from './teacher/pages/TeacherDashboard';
import TeacherLayout from './teacher/components/TeacherLayout';

const App = () => {

  const location = useLocation();

  const isStudent = location.pathname.startsWith("/student");
  const isTeacher = location.pathname.startsWith("/teacher");

  const hideLayout = isStudent || isTeacher;

  return (
    <>
      <Toaster position="bottom-right" />

      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/contact" element={<Contact />} />

        {/* Student */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDash />} />

         {/* teacher login page */}
        <Route path="/teacher-login" element={<TeacherLogin />} />

        {/* teacher */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;