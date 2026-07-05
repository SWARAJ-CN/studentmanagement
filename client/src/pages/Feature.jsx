import React from 'react'
import { 
  Users, 
  CalendarDays, 
  GraduationCap, 
  Wallet, 
  Megaphone, 
  BookOpen, 
  BarChart3, 
  UserCheck, 
  Bell, 
  ShieldCheck, 
  ChevronRight,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { assets } from '../assets/assets'

const Feature = () => {
  return (
    <div className='w-full min-h-screen bg-white pt-20 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-800'>
      
      {/* 1. Hero / Header Section */}
      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center'>
        <div className='md:col-span-5 space-y-4 text-left'>
          {/* Breadcrumbs */}
          <div className='flex items-center gap-1.5 text-xs font-semibold text-slate-400'>
            <span className='hover:text-blue-600 cursor-pointer transition-colors'>Home</span>
            <ChevronRight size={14} className='text-slate-300' />
            <span className='text-blue-600'>Features</span>
          </div>
          
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight flex flex-col'>
            <span>Powerful Features</span>
            <span className='text-blue-600'>Designed for Everyone</span>
          </h1>
          <p className='text-slate-500 text-sm sm:text-base leading-relaxed font-normal max-w-md'>
            Our Student Management System comes with a wide range of features to simplify academic management and enhance the learning experience.
          </p>
        </div>

        {/* Dashboard Product Image Mockup */}
        <div className='md:col-span-7 bg-slate-50 border border-slate-100 rounded-3xl p-3 shadow-xl shadow-slate-200/50 aspect-video overflow-hidden'>
          <img 
            src={assets.dashillu}
            alt="SMS App Dashboard mockup on screens" 
            className='w-full h-full object-cover rounded-2xl'
          />
        </div>
      </section>

      {/* 2. Our Core Features Grid */}
      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12'>
        <div className='text-center space-y-2'>
          <h2 className='text-xl sm:text-2xl font-black text-slate-900 tracking-tight'>Our Core Features</h2>
          <div className='w-10 h-1 bg-blue-600 mx-auto rounded-full'></div>
        </div>

        {/* 2-Row, 5-Column Responsive Features Matrix */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          
          {/* Student Management */}
          <div className='bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3.5'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-blue-600 bg-blue-50'><Users size={24} /></span>
            <h3 className='font-bold text-sm text-slate-800 tracking-tight'>Student Management</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Add, update and manage student information, profiles, and academic records with ease.</p>
          </div>

          {/* Attendance Tracking */}
          <div className='bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3.5'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-emerald-600 bg-emerald-50'><CalendarDays size={24} /></span>
            <h3 className='font-bold text-sm text-slate-800 tracking-tight'>Attendance Tracking</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Mark attendance quickly and generate detailed reports for students and classes.</p>
          </div>

          {/* Exams & Marks */}
          <div className='bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3.5'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-indigo-600 bg-indigo-50'><GraduationCap size={24} /></span>
            <h3 className='font-bold text-sm text-slate-800 tracking-tight'>Exams & Marks</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Create exams, enter marks, and generate grade sheets and report cards automatically.</p>
          </div>

          {/* Fee Management */}
          <div className='bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3.5'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-amber-600 bg-amber-50'><Wallet size={24} /></span>
            <h3 className='font-bold text-sm text-slate-800 tracking-tight'>Fee Management</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Manage fee structures, payments, dues and generate fee receipts effortlessly.</p>
          </div>

          {/* Notices & Announcements */}
          <div className='bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3.5'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-rose-600 bg-rose-50'><Megaphone size={24} /></span>
            <h3 className='font-bold text-sm text-slate-800 tracking-tight'>Notices & Announcements</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Send important notices and announcements to students, teachers and parents instantly.</p>
          </div>

          {/* Timetable Management */}
          <div className='bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3.5'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-cyan-600 bg-cyan-50'><BookOpen size={24} /></span>
            <h3 className='font-bold text-sm text-slate-800 tracking-tight'>Timetable Management</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Create class timetables, assign teachers and rooms, and avoid scheduling conflicts.</p>
          </div>

          {/* Reports & Analytics */}
          <div className='bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3.5'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-orange-600 bg-orange-50'><BarChart3 size={24} /></span>
            <h3 className='font-bold text-sm text-slate-800 tracking-tight'>Reports & Analytics</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Generate insightful reports and analytics for better decision making and performance tracking.</p>
          </div>

          {/* User Roles & Permissions */}
          <div className='bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3.5'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-blue-600 bg-blue-50'><UserCheck size={24} /></span>
            <h3 className='font-bold text-sm text-slate-800 tracking-tight'>User Roles & Permissions</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Set role-based access for admins, teachers, students and staff with complete security.</p>
          </div>

          {/* Real-time Notifications */}
          <div className='bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3.5'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-purple-600 bg-purple-50'><Bell size={24} /></span>
            <h3 className='font-bold text-sm text-slate-800 tracking-tight'>Real-time Notifications</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Get real-time updates on attendance, fees, exams and important announcements.</p>
          </div>

          {/* Secure & Reliable */}
          <div className='bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3.5'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-emerald-600 bg-emerald-50'><ShieldCheck size={24} /></span>
            <h3 className='font-bold text-sm text-slate-800 tracking-tight'>Secure & Reliable</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Your data is safe with us. We ensure privacy, security and 24/7 system reliability.</p>
          </div>

        </div>
      </section>

      {/* 3. Why These Features Matter Panel */}
      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='w-full bg-blue-50/40 border border-blue-100/40 rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden relative'>
          
          {/* Bullets List */}
          <div className='md:col-span-6 space-y-6 relative z-10'>
            <div className='space-y-2'>
              <h2 className='text-xl sm:text-2xl font-black text-slate-900 tracking-tight'>Why These Features Matter?</h2>
              <div className='w-8 h-1 bg-blue-600 rounded-full'></div>
            </div>
            
            <ul className='space-y-4'>
              {[
                "Simplify day-to-day academic operations",
                "Improve communication between students, teachers and parents",
                "Save time with automation and real-time updates",
                "Ensure accuracy, transparency and better student performance"
              ].map((text, idx) => (
                <li key={idx} className='flex items-start gap-3 text-slate-600 font-medium text-xs sm:text-sm leading-relaxed'>
                  <CheckCircle2 size={18} className='text-blue-600 shrink-0 mt-0.5' />
                  {text}
                </li>
              ))}
            </ul>
          </div>

         
          <div className='md:col-span-6 h-full flex justify-end items-end self-end -mb-12'>
            <img 
              src={assets.features}
              alt="Students with digital elements" 
              className='w-full max-w-md h-auto object-contain rounded-t-2xl'
            />
          </div>
        </div>
      </section>


      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-12'>
        <div className='w-full bg-blue-50/70 border border-blue-100/50 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-4 text-center sm:text-left'>
            <span className='p-3 bg-blue-600 text-white rounded-xl hidden sm:block'><GraduationCap size={24} /></span>
            <div>
              <h4 className='font-extrabold text-sm sm:text-base text-slate-900'>Experience the complete solution for academic management.</h4>
              <p className='text-xs text-slate-400 mt-0.5'>Explore all features and take your institution to the next level.</p>
            </div>
          </div>

          <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all shadow-md shadow-blue-600/10 inline-flex items-center gap-2 shrink-0 group cursor-pointer'>
            Student Login
            <ArrowRight size={16} className='group-hover:translate-x-0.5 transition-transform' />
          </button>
        </div>
      </section>

    </div>
  )
}

export default Feature