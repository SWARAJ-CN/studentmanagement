import React from 'react'
import { 
  User, 
  CalendarDays, 
  StickyNote, 
  Wallet, 
  Megaphone, 
  Shield, 
  Clock, 
  BarChart3, 
  Bell, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Building2,
  ArrowRight,
  Calendar
} from 'lucide-react'
import { assets } from '../assets/assets'

const Need = () => {
  return (
    <section className='w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-50/50 space-y-16'>
      
      {/* 1. Main Features Grid */}
      <div className='space-y-10'>
        <div className='text-center space-y-2'>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900'>
            Everything You Need in One Place
          </h2>
          <div className='w-12 h-1 bg-blue-600 mx-auto rounded-full'></div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
          {/* Student Profile */}
          <div className='bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 items-center text-center'>
            <span className='text-blue-600 h-16 w-16 flex items-center justify-center bg-blue-50 rounded-full'>
              <User size={32} />
            </span>
            <h3 className='font-bold text-lg text-slate-800'>Student Profile</h3>
            <p className='text-slate-500 text-sm leading-relaxed'>
              View and update your personal and academic information.
            </p>
          </div>

          {/* Attendance */}
          <div className='bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 items-center text-center'>
            <span className='text-emerald-600 h-16 w-16 flex items-center justify-center bg-emerald-50 rounded-full'>
              <CalendarDays size={32} />
            </span>
            <h3 className='font-bold text-lg text-slate-800'>Attendance</h3>
            <p className='text-slate-500 text-sm leading-relaxed'>
              Check your attendance records and summaries.
            </p>
          </div>

          {/* Exams & Marks */}
          <div className='bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 items-center text-center'>
            <span className='text-indigo-600 h-16 w-16 flex items-center justify-center bg-indigo-50 rounded-full'>
              <StickyNote size={32} />
            </span>
            <h3 className='font-bold text-lg text-slate-800'>Exams & Marks</h3>
            <p className='text-slate-500 text-sm leading-relaxed'>
              View your exam results, grades and report cards.
            </p>
          </div>

          {/* Fees */}
          <div className='bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 items-center text-center'>
            <span className='text-amber-600 h-16 w-16 flex items-center justify-center bg-amber-50 rounded-full'>
              <Wallet size={32} />
            </span>
            <h3 className='font-bold text-lg text-slate-800'>Fees</h3>
            <p className='text-slate-500 text-sm leading-relaxed'>
              Check fee details, payment status and history.
            </p>
          </div>

          {/* Notice */}
          <div className='bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 items-center text-center'>
            <span className='text-rose-600 h-16 w-16 flex items-center justify-center bg-rose-50 rounded-full'>
              <Megaphone size={32} />
            </span>
            <h3 className='font-bold text-lg text-slate-800'>Notices</h3>
            <p className='text-slate-500 text-sm leading-relaxed'>
              Stay updated with important announcements and events.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Value Propositions Row */}
      <div className='bg-white border border-slate-100/80 rounded-2xl p-6 sm:p-8 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='flex gap-4 items-start'>
          <span className='p-3 bg-blue-50 text-blue-600 rounded-full shrink-0'><Shield size={24} /></span>
          <div>
            <h4 className='font-bold text-blue-900 text-base'>Secure & Reliable</h4>
            <p className='text-xs text-slate-500 mt-1'>Your data is safe with us. We ensure privacy and security.</p>
          </div>
        </div>
        <div className='flex gap-4 items-start'>
          <span className='p-3 bg-emerald-50 text-emerald-600 rounded-full shrink-0'><Clock size={24} /></span>
          <div>
            <h4 className='font-bold text-blue-900 text-base'>Save Time</h4>
            <p className='text-xs text-slate-500 mt-1'>Automated processes help you save time and focus on learning.</p>
          </div>
        </div>
        <div className='flex gap-4 items-start'>
          <span className='p-3 bg-indigo-50 text-indigo-600 rounded-full shrink-0'><BarChart3 size={24} /></span>
          <div>
            <h4 className='font-bold text-blue-900 text-base'>Track Progress</h4>
            <p className='text-xs text-slate-500 mt-1'>Monitor your academic progress with easy to understand reports.</p>
          </div>
        </div>
        <div className='flex gap-4 items-start'>
          <span className='p-3 bg-amber-50 text-amber-600 rounded-full shrink-0'><Bell size={24} /></span>
          <div>
            <h4 className='font-bold text-blue-900 text-base'>Stay Updated</h4>
            <p className='text-xs text-slate-500 mt-1'>Get instant notifications about announcements and events.</p>
          </div>
        </div>
      </div>

      {/* 3. Counters  */}
      <div className='bg-blue-50 border border-slate-100/80 rounded-2xl p-6 sm:p-8 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y-2 sm:divide-y-0 lg:divide-x divide-slate-100'>
        <div className='flex items-center gap-4 pt-4 sm:pt-0'>
          <span className='p-4 text-blue-600 bg-blue-50 rounded-xl'><Users size={28} /></span>
          <div>
            <h3 className='text-2xl font-black text-blue-900'>5,000+</h3>
            <p className='font-bold text-xs text-slate-700'>Students</p>
            <p className='text-[11px] text-slate-400 mt-0.5'>Active students across all departments</p>
          </div>
        </div>
        <div className='flex items-center gap-4 pt-4 sm:pt-0 lg:pl-6'>
          <span className='p-4 text-emerald-600 bg-emerald-50 rounded-xl'><GraduationCap size={28} /></span>
          <div>
            <h3 className='text-2xl font-black text-emerald-900'>300+</h3>
            <p className='font-bold text-xs text-slate-700'>Teachers</p>
            <p className='text-[11px] text-slate-400 mt-0.5'>Experienced & dedicated faculty members</p>
          </div>
        </div>
        <div className='flex items-center gap-4 pt-4 sm:pt-0 lg:pl-6'>
          <span className='p-4 text-purple-600 bg-purple-50 rounded-xl'><BookOpen size={28} /></span>
          <div>
            <h3 className='text-2xl font-black text-purple-900'>50+</h3>
            <p className='font-bold text-xs text-slate-700'>Courses</p>
            <p className='text-[11px] text-slate-400 mt-0.5'>Wide range of courses and programs</p>
          </div>
        </div>
        <div className='flex items-center gap-4 pt-4 sm:pt-0 lg:pl-6'>
          <span className='p-4 text-amber-600 bg-amber-50 rounded-xl'><Building2 size={28} /></span>
          <div>
            <h3 className='text-2xl font-black text-amber-900'>10+</h3>
            <p className='font-bold text-xs text-slate-700'>Departments</p>
            <p className='text-[11px] text-slate-400 mt-0.5'>Various departments under one system</p>
          </div>
        </div>
      </div>

      {/* 4. Announcements Section */}
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-extrabold text-slate-900'>Latest Announcements</h3>
          <a href='#notices' className='text-blue-600 font-bold text-sm inline-flex items-center gap-1.5 hover:underline'>
            View All Notices <ArrowRight size={16} />
          </a>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Notice 1 */}
          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between'>
            <div className='flex items-start gap-4'>
              <span className='p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0'><Megaphone size={20} /></span>
              <div className='space-y-1'>
                <h4 className='font-bold text-slate-800 text-sm'>Holiday Notice</h4>
                <p className='text-xs text-slate-500 leading-relaxed'>
                  The college will remain closed on 25th May 2024 on account of National Holiday.
                </p>
              </div>
            </div>
            <div className='flex items-center gap-1.5 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-50'>
              <Calendar size={12} /> 20 May 2024
            </div>
          </div>

          {/* Notice 2 */}
          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between'>
            <div className='flex items-start gap-4'>
              <span className='p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0'><StickyNote size={20} /></span>
              <div className='space-y-1'>
                <h4 className='font-bold text-slate-800 text-sm'>Exam Schedule Released</h4>
                <p className='text-xs text-slate-500 leading-relaxed'>
                  The end semester examination schedule has been published. Check your portal.
                </p>
              </div>
            </div>
            <div className='flex items-center gap-1.5 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-50'>
              <Calendar size={12} /> 18 May 2024
            </div>
          </div>

          {/* Notice 3 */}
          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between'>
            <div className='flex items-start gap-4'>
              <span className='p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0'><Users size={20} /></span>
              <div className='space-y-1'>
                <h4 className='font-bold text-slate-800 text-sm'>Parent-Teacher Meeting</h4>
                <p className='text-xs text-slate-500 leading-relaxed'>
                  PTM is scheduled on 30th May 2024. Timings: 10:00 AM to 2:00 PM.
                </p>
              </div>
            </div>
            <div className='flex items-center gap-1.5 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-50'>
              <Calendar size={12} /> 16 May 2024
            </div>
          </div>
        </div>
      </div>

      {/* 5. Call to Action (CTA) Banner with Illustrations */}
      <div className='bg-blue-50/60 rounded-3xl p-8 sm:p-12 relative overflow-hidden w-full mx-auto border border-blue-100/50 flex flex-col md:flex-row items-center justify-between gap-8'>
        
        {/* Left Illustration: Students */}
        <div className='hidden md:block w-1/4  shrink-0 self-end -mb-12'>
          <img 
            src={assets.student} 
            alt="Students Graphic" 
            className='w-full h-auto object-contain' 
          />
        </div>

        {/* Center Main Copy */}
        <div className='relative z-10 max-w-md mx-auto text-center space-y-6'>
          <h3 className='text-2xl font-black text-slate-900'>Ready to get started?</h3>
          <p className='text-slate-500 text-sm leading-relaxed'>
            Login to access your dashboard and explore all the features.
          </p>
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-200 inline-flex items-center gap-2 group'>
            Student Login 
            <ArrowRight size={16} className='group-hover:translate-x-0.5 transition-transform' />
          </button>
        </div>
        
        {/* Right Illustration: Graduation Cap & Books Stack */}
        <div className='hidden md:block w-80  shrink-0 self-end -mb-12'>
          <img 
            src={assets.packing} 
            alt="Books Graphic" 
            className='w-full h-auto object-contain' 
          />
        </div>
        
        {/* Decorative Background Blur Patterns */}
        <div className='absolute -left-16 -bottom-16 w-44 h-44 bg-blue-200/40 rounded-full blur-2xl pointer-events-none'></div>
        <div className='absolute -right-16 -bottom-16 w-44 h-44 bg-orange-200/30 rounded-full blur-2xl pointer-events-none'></div>
      </div>

    </section>
  )
}

export default Need