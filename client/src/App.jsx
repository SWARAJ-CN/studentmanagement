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
import TeacherProfile from './teacher/pages/TeacherProfile';
import MyClasses from './teacher/pages/MyClasses';
import TeacherStudents from './teacher/pages/TeacherStudents';
import TeacherAttendance from './teacher/pages/TeacherAttendance';
import TeacherExams from './teacher/pages/TeacherExams';
import TeacherResults from './teacher/pages/TeacherResults';
import TeacherTimetable from './teacher/pages/TeacherTimetable';
import TeacherNotices from "./teacher/pages/TeacherNotices";

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
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="classes" element={<MyClasses />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="exams" element={<TeacherExams />} />
          <Route path="results" element={<TeacherResults />} />
          <Route path="timetable" element={<TeacherTimetable />} />
          <Route path="notices" element={<TeacherNotices />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;