import React from 'react'
import { 
  Target, 
  Users, 
  ShieldCheck, 
  Lightbulb, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  Building2,
  ChevronRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const About = () => {

    const move = useNavigate()

  return (
    <div className='w-full min-h-screen bg-white pt-20 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-800'>
      
      
      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center'>
        <div className='md:col-span-5 space-y-4 text-left'>
          
          <div className='flex items-center gap-1.5 text-xs font-semibold text-slate-400'>
            <span className='hover:text-blue-600 cursor-pointer transition-colors'onClick={()=>move('/')}>Home</span>
            <ChevronRight size={14} className='text-slate-300' />
            <span className='text-blue-600'>About Us</span>
          </div>
          
          <h1 className='text-4xl sm:text-5xl font-black text-slate-900 tracking-tight'>
            About Us
          </h1>
          <p className='text-blue-600 font-bold text-base sm:text-lg tracking-wide'>
            Empowering Education, Simplifying Management
          </p>
          <p className='text-slate-500 text-sm sm:text-base leading-relaxed font-normal'>
            Our Student Management System is built to bridge the gap between students, teachers, and administrators by providing a unified platform for all academic activities.
          </p>
        </div>

        
        <div className='md:col-span-7 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/80 aspect-[16/10] bg-slate-100'>
          <img 
            src={assets.about} 
            alt="Students collaborating on dashboard platform" 
            className='w-full h-full object-cover object-center'
          />
        </div>
      </section>

      
      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-center'>
        <div className='max-w-2xl mx-auto space-y-3'>
          <h2 className='text-xl sm:text-2xl font-black text-slate-900 tracking-tight'>Our Mission</h2>
          <p className='text-slate-500 text-sm sm:text-base leading-relaxed font-normal'>
            To provide an easy-to-use, efficient, and secure system that streamlines academic processes, improves communication, and enhances the overall educational experience.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        
          <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3.5 text-center'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-blue-600 bg-blue-50'><Target size={26} /></span>
            <h3 className='font-bold text-base text-slate-800'>Our Goal</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>To simplify academic management and make information accessible to everyone, anytime.</p>
          </div>
         
          <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3.5 text-center'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-emerald-600 bg-emerald-50'><Users size={26} /></span>
            <h3 className='font-bold text-base text-slate-800'>Our Commitment</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>We are committed to delivering reliable, user-friendly, and innovative solutions.</p>
          </div>
          
          <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3.5 text-center'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-purple-600 bg-purple-50'><ShieldCheck size={26} /></span>
            <h3 className='font-bold text-base text-slate-800'>Our Values</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>Integrity, transparency, and dedication to student success are at the heart of what we do.</p>
          </div>
          
          <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3.5 text-center'>
            <span className='w-14 h-14 rounded-full flex items-center justify-center text-amber-600 bg-amber-50'><Lightbulb size={26} /></span>
            <h3 className='font-bold text-base text-slate-800'>Our Vision</h3>
            <p className='text-slate-400 text-xs leading-relaxed font-normal'>To be a trusted platform that empowers institutions and inspires learners.</p>
          </div>
        </div>
      </section>

      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='w-full bg-blue-50/40 border border-blue-100/40 rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
          {/* Benefits Bullet List */}
          <div className='lg:col-span-5 space-y-6'>
            <div className='space-y-2'>
              <h2 className='text-xl sm:text-2xl font-black text-slate-900 tracking-tight'>Why Choose SMS?</h2>
              <div className='w-8 h-1 bg-blue-600 rounded-full'></div>
            </div>
            
            <ul className='space-y-3.5'>
              {[
                "Centralized and secure data management",
                "Easy access to academic information",
                "Real-time updates and notifications",
                "User-friendly interface for all users",
                "Saves time and improves productivity",
                "Supports better decision making"
              ].map((text, idx) => (
                <li key={idx} className='flex items-center gap-3 text-slate-600 font-medium text-xs sm:text-sm'>
                  <CheckCircle2 size={18} className='text-blue-600 shrink-0' />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          
          <div className='lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-2 shadow-xl shadow-slate-200/50 aspect-video overflow-hidden'>
            <img 
              src={assets.dashillu}
              alt="Dashboard interface screenshot representation" 
              className='w-full h-full object-cover rounded-xl'
            />
          </div>
        </div>
      </section>

      
      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-center'>
        <div className='space-y-2'>
          <h2 className='text-xl font-black text-slate-900 tracking-tight'>SMS in Numbers</h2>
          <div className='w-8 h-1 bg-blue-600 mx-auto rounded-full'></div>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm divide-y-2 sm:divide-y-0 lg:divide-x divide-slate-50'>
          <div className='flex flex-row items-center justify-center text-left gap-4 p-2'>
            <span className='p-3.5 bg-blue-50 text-blue-600 rounded-2xl'><Users size={24} /></span>
            <div>
              <h3 className='text-xl sm:text-2xl font-black text-blue-900 leading-tight'>5,000+</h3>
              <p className='font-bold text-xs text-slate-700'>Active Students</p>
              <p className='text-[10px] text-slate-400 font-normal mt-0.5'>Across all departments</p>
            </div>
          </div>
          <div className='flex flex-row items-center justify-center text-left gap-4 p-2 pt-4 sm:pt-2 lg:pl-6'>
            <span className='p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl'><GraduationCap size={24} /></span>
            <div>
              <h3 className='text-xl sm:text-2xl font-black text-emerald-900 leading-tight'>300+</h3>
              <p className='font-bold text-xs text-slate-700'>Teachers</p>
              <p className='text-[10px] text-slate-400 font-normal mt-0.5'>Dedicated faculty members</p>
            </div>
          </div>
          <div className='flex flex-row items-center justify-center text-left gap-4 p-2 pt-4 sm:pt-2 lg:pl-6'>
            <span className='p-3.5 bg-purple-50 text-purple-600 rounded-2xl'><BookOpen size={24} /></span>
            <div>
              <h3 className='text-xl sm:text-2xl font-black text-purple-900 leading-tight'>50+</h3>
              <p className='font-bold text-xs text-slate-700'>Courses</p>
              <p className='text-[10px] text-slate-400 font-normal mt-0.5'>Wide range of courses</p>
            </div>
          </div>
          <div className='flex flex-row items-center justify-center text-left gap-4 p-2 pt-4 sm:pt-2 lg:pl-6'>
            <span className='p-3.5 bg-amber-50 text-amber-600 rounded-2xl'><Building2 size={24} /></span>
            <div>
              <h3 className='text-xl sm:text-2xl font-black text-amber-900 leading-tight'>10+</h3>
              <p className='font-bold text-xs text-slate-700'>Departments</p>
              <p className='text-[10px] text-slate-400 font-normal mt-0.5'>Various departments</p>
            </div>
          </div>
        </div>
      </section>

     
      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
        <div className='lg:col-span-5 space-y-4 max-w-md'>
          <h2 className='text-xl sm:text-2xl font-black text-slate-900 tracking-tight'>Our Commitment to You</h2>
          <p className='text-slate-500 text-xs sm:text-sm leading-relaxed font-normal'>
            We continuously work to improve our system and add new features that make academic management more effective and hassle-free.
          </p>
          <p className='text-slate-500 text-xs sm:text-sm leading-relaxed font-normal'>
            Thank you for being a part of our journey toward a smarter education.
          </p>
        </div>

        
        <div className='lg:col-span-7 grid grid-cols-3 gap-4 sm:gap-6'>
         
          <div className='flex flex-col items-center text-center space-y-2.5'>
            <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-md bg-slate-100'>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                alt="Ananya Sharma Profile" 
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h4 className='font-bold text-slate-800 text-xs sm:text-sm'>Ananya Sharma</h4>
              <p className='text-[11px] text-slate-400 font-medium mt-0.5'>Project Manager</p>
            </div>
          </div>

          
          <div className='flex flex-col items-center text-center space-y-2.5'>
            <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-md bg-slate-100'>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" 
                alt="Rahul Verma Profile" 
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h4 className='font-bold text-slate-800 text-xs sm:text-sm'>Rahul Verma</h4>
              <p className='text-[11px] text-slate-400 font-medium mt-0.5'>Lead Developer</p>
            </div>
          </div>

         
          <div className='flex flex-col items-center text-center space-y-2.5'>
            <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-md bg-slate-100'>
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" 
                alt="Priya Singh Profile" 
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h4 className='font-bold text-slate-800 text-xs sm:text-sm'>Priya Singh</h4>
              <p className='text-[11px] text-slate-400 font-medium mt-0.5'>UI/UX Designer</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About