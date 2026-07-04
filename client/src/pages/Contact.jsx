import React, { useState } from 'react'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight, 
  Send,
  Headphones,
  FileQuestion,
  GraduationCap,
  Lightbulb
} from 'lucide-react'
import { assets } from '../assets/assets'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted data:', formData)
  }

  return (
    <div className='w-full min-h-screen bg-white pt-20 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-800'>
      
     
      <section className='w-full bg-white relative overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10'>
          <div className='md:col-span-7 space-y-4 text-left'>
            
            <div className='flex items-center gap-1.5 text-xs font-semibold text-slate-400'>
              <span className='hover:text-blue-600 cursor-pointer transition-colors'>Home</span>
              <ChevronRight size={14} className='text-slate-300' />
              <span className='text-blue-600'>Contact Us</span>
            </div>
            
            <h1 className='text-4xl lg:text-5xl font-black text-slate-900 tracking-tight'>
              Contact Us
            </h1>
            <p className='text-blue-600 font-bold text-base tracking-wide'>
              We're Here to Help You!
            </p>
            <p className='text-slate-500 text-sm leading-relaxed font-normal max-w-md'>
              Have questions or need support? Reach out to us and our team will get back to you as soon as possible.
            </p>
          </div>
          
         
          <div className='md:col-span-5 hidden md:flex justify-end pr-4 relative'>
            <div className='w-full max-w-[420px] aspect-square relative z-10'>
              <img 
                src={assets.contact}
                alt="Contact Communication illustration" 
                className='w-full h-full object-contain'
              />
            </div>
          </div>
        </div>
      </section>

     
      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10'>
        <div className='text-center space-y-2'>
          <h2 className='text-xl sm:text-2xl font-black text-slate-900 tracking-tight'>Get in Touch</h2>
          <p className='text-slate-400 text-xs font-medium'>Choose the best way to reach us. We're always happy to hear from you.</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
       
          <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-3'>
            <span className='w-12 h-12 rounded-full flex items-center justify-center text-blue-600 bg-blue-50'><MapPin size={22} /></span>
            <h3 className='font-bold text-sm text-slate-800'>Address</h3>
            <p className='text-slate-500 text-xs leading-relaxed font-medium'>
              123, Education Street,<br />Knowledge City,<br />Kochi, Kerala - 682021
            </p>
          </div>

         
          <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-3'>
            <span className='w-12 h-12 rounded-full flex items-center justify-center text-emerald-600 bg-emerald-50'><Phone size={22} /></span>
            <h3 className='font-bold text-sm text-slate-800'>Phone</h3>
            <p className='text-slate-500 text-xs font-bold text-slate-800'>+91 12345 67890</p>
            <p className='text-slate-400 text-[10px] font-normal'>(Mon - Fri: 9:00 AM - 6:00 PM)</p>
          </div>

         
          <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-3'>
            <span className='w-12 h-12 rounded-full flex items-center justify-center text-purple-600 bg-purple-50'><Mail size={22} /></span>
            <h3 className='font-bold text-sm text-slate-800'>Email</h3>
            <p className='text-slate-500 text-xs font-medium hover:text-blue-600 transition-colors cursor-pointer'>info@smsportal.com</p>
            <p className='text-slate-500 text-xs font-medium hover:text-blue-600 transition-colors cursor-pointer'>support@smsportal.com</p>
          </div>

          
          <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-3'>
            <span className='w-12 h-12 rounded-full flex items-center justify-center text-amber-600 bg-amber-50'><Clock size={22} /></span>
            <h3 className='font-bold text-sm text-slate-800'>Working Hours</h3>
            <p className='text-slate-500 text-xs font-bold text-slate-800'>Monday - Friday</p>
            <p className='text-slate-400 text-xs font-normal'>9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </section>

      
      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch'>
        
       
        <div className='lg:col-span-6 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6'>
          <div>
            <h2 className='text-lg font-black text-slate-900 tracking-tight'>Send Us a Message</h2>
            <p className='text-slate-400 text-xs font-medium mt-0.5'>Fill out the form below and we will get back to you.</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4 text-left'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='space-y-1.5'>
                <label className='text-xs font-bold text-slate-700'>Your Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className='w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium'
                  required
                />
              </div>
              <div className='space-y-1.5'>
                <label className='text-xs font-bold text-slate-700'>Your Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className='w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium'
                  required
                />
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-xs font-bold text-slate-700'>Subject</label>
              <input 
                type="text" 
                placeholder="Enter subject" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className='w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium'
                required
              />
            </div>

            <div className='space-y-1.5'>
              <label className='text-xs font-bold text-slate-700'>Message</label>
              <textarea 
                rows="4"
                placeholder="Type your message here..." 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className='w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium resize-none'
                required
              ></textarea>
            </div>

            <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all shadow-md shadow-blue-600/10 inline-flex items-center gap-2 cursor-pointer'>
              <Send size={14} /> Send Message
            </button>
          </form>
        </div>

       
        <div className='lg:col-span-6 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col space-y-4 relative min-h-[380px] lg:min-h-full'>
          <div>
            <h2 className='text-lg font-black text-slate-900 tracking-tight'>Find Us Here</h2>
          </div>

          <div className='flex-1 w-full rounded-2xl overflow-hidden relative border border-slate-100 shadow-inner bg-slate-100 min-h-[280px]'>
         
            <iframe 
              title="OpenStreetMap Location Frame"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight="0" 
              marginWidth="0" 
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.2200%2C9.9300%2C76.3200%2C10.0300&amp;layer=mapnik&amp;marker=9.9816%2C76.2711"
              className='absolute inset-0 w-full h-full grayscale-[15%] contrast-[105%]'
            ></iframe>

          
            <div className='absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 max-w-[240px] text-left z-20 space-y-1.5 pointer-events-auto'>
              <h4 className='font-bold text-xs text-slate-900'>SMS Office</h4>
              <p className='text-[10px] text-slate-500 leading-relaxed font-medium'>
                123, Education Street,<br />Knowledge City,<br />Kochi, Kerala - 682021
              </p>
              <a 
                href="https://www.openstreetmap.org/?mlat=9.9816&amp;mlon=76.2711#map=14/9.9816/76.2711"
                target="_blank" 
                rel="noopener noreferrer"
                className='text-[10px] text-blue-600 font-bold hover:underline block pt-0.5'
              >
                View larger map
              </a>
            </div>
          </div>
        </div>
      </section>


      <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 mb-12'>
        <div className='text-center space-y-2'>
          <h2 className='text-xl sm:text-2xl font-black text-slate-900 tracking-tight'>How Can We Help You?</h2>
          <div className='w-8 h-1 bg-blue-600 mx-auto rounded-full'></div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
         
          <div className='bg-blue-50/40 border border-blue-100/30 p-6 rounded-2xl flex flex-col items-center text-center gap-2.5'>
            <span className='w-11 h-11 rounded-full flex items-center justify-center text-blue-600 bg-blue-100/70'><Headphones size={20} /></span>
            <h4 className='font-bold text-xs sm:text-sm text-slate-800'>Technical Support</h4>
            <p className='text-slate-400 text-[11px] leading-relaxed font-normal'>Facing an issue? Our support team is ready to help you.</p>
          </div>

          
          <div className='bg-emerald-50/30 border border-emerald-100/20 p-6 rounded-2xl flex flex-col items-center text-center gap-2.5'>
            <span className='w-11 h-11 rounded-full flex items-center justify-center text-emerald-600 bg-emerald-100/70'><FileQuestion size={20} /></span>
            <h4 className='font-bold text-xs sm:text-sm text-slate-800'>General Inquiry</h4>
            <p className='text-slate-400 text-[11px] leading-relaxed font-normal'>Have a question about our system or services? Let us know.</p>
          </div>

          {/* Admissions */}
          <div className='bg-purple-50/30 border border-purple-100/20 p-6 rounded-2xl flex flex-col items-center text-center gap-2.5'>
            <span className='w-11 h-11 rounded-full flex items-center justify-center text-purple-600 bg-purple-100/70'><GraduationCap size={20} /></span>
            <h4 className='font-bold text-xs sm:text-sm text-slate-800'>Admissions</h4>
            <p className='text-slate-400 text-[11px] leading-relaxed font-normal'>Need information about admissions or courses? We're here to assist.</p>
          </div>

          {/* Suggestions */}
          <div className='bg-amber-50/30 border border-amber-100/20 p-6 rounded-2xl flex flex-col items-center text-center gap-2.5'>
            <span className='w-11 h-11 rounded-full flex items-center justify-center text-amber-600 bg-amber-100/70'><Lightbulb size={20} /></span>
            <h4 className='font-bold text-xs sm:text-sm text-slate-800'>Suggestions</h4>
            <p className='text-slate-400 text-[11px] leading-relaxed font-normal'>We value your feedback! Share your suggestions with us.</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact