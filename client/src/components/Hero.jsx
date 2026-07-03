import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <>
    <div className='relative w-full h-screen flex items-center  flex-row'>
       <div className='absolute z-9999 h-full w-full flex flex-col items-center px-40  inset-0 bg-linear-to-l to-white via-slate-100 from-slate-100/0 '>
         <div className='flex flex-col w-250 gap-3 absolute left-50  h-150 top-30'>
             <span className='px-5 py-2 bg-blue-600/20 border border-blue-700/50 text-blue-800 w-fit rounded-full text-sm'>WELCOME TO ST MARY'S SMS</span>
             <p
             className='text-5xl font-extrabold w-120 flex flex-col gap-2 ' 
             >Your Journey. 
             <p className='text-blue-700'>Our Management.</p></p>
              <p>
                A smart and simple way to manage your academic information, all in one place.
              </p>
         </div>
       </div>
       <div className='absolute h-full w-300 overflow-hidden right-0 '>
           <img src={assets.hero} className='h-full w-full object-cover' />
       </div>
    </div>
    </>
  )
}

export default Hero