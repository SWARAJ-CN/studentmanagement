import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

import OverviewDashboard from '../components/OverviewDashboard';
import { Bell } from 'lucide-react';
import { students } from '../assets/dummy';
import ProfileView from '../components/ProfileView';
import CoursesView from '../components/CoursesView';
import AttendanceView from '../components/AttendanceView';
import TimetableView from '../components/TimetableView';
import ExamsView from '../components/ExamsView';
import ResultsView from '../components/ResultsView';
import FeePaymentView from '../components/FeePaymentView';
import NoticeView from '../components/NoticeView';





const AssignmentsView = () => (
  <div className='p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-left animate-fadeIn'>
    <h2 className='text-lg font-black text-slate-900'>Assignments Component</h2>
    <p className='text-xs text-slate-400 mt-1'>Submit active project tasks, review due deadlines, and view scores.</p>
  </div>
);


const SettingsView = () => (
  <div className='p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-left animate-fadeIn'>
    <h2 className='text-lg font-black text-slate-900'>System Settings Component</h2>
    <p className='text-xs text-slate-400 mt-1'>Update system themes, credentials security parameters, and communication updates.</p>
  </div>
);

const StudentDash = () => {

    const [activeMenu, setActiveMenu] = useState('dashboard');

    // const [studentData,setStudentData]=useState({students})

  const renderRightSideContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <OverviewDashboard />;
      case 'profile': return <ProfileView />;
      case 'courses': return <CoursesView />;
      case 'attendance': return <AttendanceView />;
      case 'exams': return <ExamsView />;
      case 'results': return <ResultsView />;
      case 'timetable': return <TimetableView />;
      case 'fees': return <FeePaymentView />; 
      case 'Notice': return < NoticeView/>;
      default: return <OverviewDashboard />;
    }
  };

  return (
    <div className='w-full min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans antialiased select-none'>
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className='flex-1 flex flex-col min-w-0'>
        <header className='h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10 shadow-sm shadow-slate-100/40'>
          <div className='font-extrabold text-sm sm:text-base text-blue-700 tracking-tight'>
            ST MARY'S STUDENT MANAGEMANT SYSTEM
          </div>

          <div className='flex items-center gap-4'>
            {/* <div className='w-48 sm:w-64 h-9 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center px-3 text-xs text-slate-400 font-medium gap-2'>
              <span>🔍</span> Search anything...
            </div> */}
            <div className='w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-xs relative cursor-pointer hover:bg-slate-100 transition-colors'>
              <span><Bell size={20}/></span>
              <span className='absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping' />
            </div>
            <div className='flex items-center gap-2.5 border-l border-slate-100 pl-4'>
              <img 
                src={students[0]?.student_image}
                alt="Arjun Sharma User Profile" 
                className='w-10 h-10 rounded-full bg-slate-200 object-cover border border-slate-100'
              />
              <div className='hidden sm:block text-left'>
                <div className='text-xs font-bold text-slate-800 leading-none'>{students[0]?.student_name}</div>
                <div className='text-[10px] text-slate-400 font-bold mt-1 tracking-wide uppercase'>{students[0]?.student_class} – {students[0]?.student_id}</div>
              </div>
            </div>
          </div>
        </header>

      
        <main className='p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto max-w-[1600px] w-full mx-auto'>
          {renderRightSideContent()}
        </main>
      </div>

    </div>
  );
};

export default StudentDash;