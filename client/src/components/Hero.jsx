import React from 'react'
import { assets } from '../assets/assets'
import { PlayCircle, User } from 'lucide-react'

const Hero = () => {
  return (
    <div className='relative w-full min-h-screen grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden bg-slate-50'>
      
     
      <div className='absolute inset-0 z-10 bg-linear-to-l to-white via-slate-100 from-slate-100/0 hidden md:block' />
     
      <div className='absolute inset-0 z-10 bg-linear-to-t from-white via-white/80 to-transparent md:hidden' />

    
      <div className='relative z-10 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 py-20 md:py-0 h-full order-2 md:order-1'>
        <div className='max-w-xl space-y-5'>
          
          
          <span className='inline-block px-4 py-1.5 bg-blue-600/20 border border-blue-700/50 text-blue-800 rounded-full text-xs sm:text-sm font-medium tracking-wide w-fit'>
            WELCOME TO ST MARY'S SMS
          </span>
          
          
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 flex flex-col gap-1'>
            <span>Your Journey.</span>
            <span className='text-blue-700'>Our Management.</span>
          </h1>
          
         
          <p className='text-base sm:text-lg text-gray-600 max-w-md leading-relaxed'>
            A smart and simple way to manage your academic information, all in one place.
          </p>
          
         
          <div className='flex flex-wrap gap-4 pt-2'>
            <button className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 rounded-md px-6 py-2.5 shadow-md shadow-blue-600/10 cursor-pointer text-sm sm:text-base'>
              <User size={20} /> Student Login
            </button>
            <button className='flex items-center gap-2 border-2 border-blue-700 bg-white hover:bg-blue-50 text-blue-700 font-semibold transition-colors duration-200 rounded-md px-6 py-2.5 cursor-pointer text-sm sm:text-base'>
              <PlayCircle size={20} /> Learn More
            </button>
          </div>

        </div>
      </div>

      
      <div className='relative w-full h-72 sm:h-96 md:h-full order-1 md:order-2'>
        <img 
          src={assets.hero} 
          alt="St Mary's Management System" 
          className='w-full h-full object-cover object-center' 
        />
      </div>

    </div>
  )
}

export default Hero