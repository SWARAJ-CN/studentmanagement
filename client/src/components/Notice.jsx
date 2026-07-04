import React, { useState } from 'react'
import { 
  Megaphone, 
  Calendar, 
  Wallet, 
  Users, 
  BookOpen, 
  Info, 
  Search, 
  ChevronRight, 
  Grid, 
  FileText,
  ChevronLeft,
  BellRing
} from 'lucide-react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Notice = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const move = useNavigate()

  const categories = [
    { name: 'All', icon: Grid, count: 24, color: 'text-blue-600 bg-blue-50' },
    { name: 'General', icon: Info, count: 5, color: 'text-sky-600 bg-sky-50' },
    { name: 'Exams', icon: FileText, count: 6, color: 'text-indigo-600 bg-indigo-50' },
    { name: 'Events', icon: Users, count: 4, color: 'text-purple-600 bg-purple-50' },
    { name: 'Holidays', icon: Calendar, count: 3, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Fees', icon: Wallet, count: 3, color: 'text-amber-600 bg-amber-50' },
    { name: 'Academics', icon: BookOpen, count: 3, color: 'text-orange-600 bg-orange-50' },
  ]

  const noticesData = [
    {
      id: 1,
      title: "End Semester Examination Schedule Released",
      category: "Exams",
      description: "The end semester examination schedule for all departments has been published. Please check the exam dates and timings.",
      date: "20 May 2024",
      icon: Megaphone,
      bg: "bg-blue-50 text-blue-600",
      badgeClass: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      title: "College Will Remain Closed on 25th May 2024",
      category: "Holidays",
      description: "The college will remain closed on 25th May 2024 on account of National Holiday.",
      date: "18 May 2024",
      icon: Calendar,
      bg: "bg-emerald-50 text-emerald-600",
      badgeClass: "bg-emerald-100 text-emerald-800"
    },
    {
      id: 3,
      title: "Second Installment of Fees Due",
      category: "Fees",
      description: "This is a reminder that the second installment of fees is due on 31st May 2024. Please make the payment before the due date.",
      date: "17 May 2024",
      icon: Wallet,
      bg: "bg-amber-50 text-amber-600",
      badgeClass: "bg-amber-100 text-amber-800"
    },
    {
      id: 4,
      title: "Parent-Teacher Meeting Scheduled",
      category: "Events",
      description: "PTM is scheduled on 30th May 2024 from 10:00 AM to 2:00 PM. All parents are requested to attend.",
      date: "16 May 2024",
      icon: Users,
      bg: "bg-purple-50 text-purple-600",
      badgeClass: "bg-purple-100 text-purple-800"
    },
    {
      id: 5,
      title: "Submission of Assignment – Deadline Extended",
      category: "Academics",
      description: "The deadline for submission of assignments has been extended to 28th May 2024.",
      date: "15 May 2024",
      icon: BookOpen,
      bg: "bg-orange-50 text-orange-600",
      badgeClass: "bg-orange-100 text-orange-800"
    },
    {
      id: 6,
      title: "Library Timing Update",
      category: "General",
      description: "The library will now remain open from 8:00 AM to 8:00 PM effective from 20th May 2024.",
      date: "14 May 2024",
      icon: Info,
      bg: "bg-sky-50 text-sky-600",
      badgeClass: "bg-sky-100 text-sky-800"
    }
  ]

  // Dynamic filter logic
  const filteredNotices = noticesData.filter(notice => {
    const matchesTab = activeTab === 'All' || notice.category === activeTab;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  })

  return (
    <div className='w-full min-h-screen bg-slate-50/50 pt-20 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-800'>
      
      <section className='w-full bg-slate-100/60 border-b border-slate-100 relative overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10'>
          <div className='md:col-span-7 space-y-4 text-left'>
            <div className='flex items-center gap-1.5 text-xs font-semibold text-slate-400'>
              <span className='hover:text-blue-600 cursor-pointer transition-colors'onClick={()=>move('/')}>Home</span>
              <ChevronRight size={14} className='text-slate-300' />
              <span className='text-blue-600'>Notices</span>
            </div>
            <h1 className='text-3xl sm:text-4xl font-black text-slate-900 tracking-tight'>
              Notices & Announcements
            </h1>
            <p className='text-slate-500 text-sm leading-relaxed font-normal max-w-md'>
              Stay updated with the latest announcements, circulars, events and important information from the institution.
            </p>
          </div>
          
      
          <div className='md:col-span-5 hidden md:flex justify-end pr-4 relative'>
            <div className='w-full max-w-[420px] aspect-square relative z-10'>
              <img 
                src={assets.notice}
                alt="Notices and announcements illustration" 
                className='w-full h-full object-contain'
              />
            </div>
          </div>
        </div>
      </section>


      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        
        
        <div className='lg:col-span-8 space-y-6'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <h2 className='text-lg font-black text-slate-900 tracking-tight'>All Notices</h2>
            

            <div className='flex flex-wrap items-center gap-1.5 bg-white border border-slate-100 p-1 rounded-xl shadow-sm overflow-x-auto max-w-full scrollbar-none'>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveTab(cat.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    activeTab === cat.name
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

        
          <div className='space-y-4'>
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => {
                const IconComponent = notice.icon;
                return (
                  <div 
                    key={notice.id}
                    className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group flex gap-5 items-start cursor-pointer relative'
                  >
                    <span className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notice.bg}`}>
                      <IconComponent size={22} />
                    </span>
                    
                    <div className='space-y-1.5 flex-1 pr-6'>
                      <div className='flex flex-wrap items-center gap-2'>
                        <h3 className='font-bold text-slate-800 text-sm sm:text-base tracking-tight group-hover:text-blue-600 transition-colors'>
                          {notice.title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${notice.badgeClass}`}>
                          {notice.category}
                        </span>
                      </div>
                      <p className='text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal'>
                        {notice.description}
                      </p>
                      <div className='flex items-center gap-1 text-[11px] font-medium text-slate-400 pt-1'>
                        <Calendar size={12} /> {notice.date}
                      </div>
                    </div>

                    <ChevronRight size={18} className='text-slate-300 absolute right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-0.5 group-hover:text-blue-500 transition-all' />
                  </div>
                )
              })
            ) : (
              <div className='bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 text-sm'>
                No announcements found matching your criteria.
              </div>
            )}
          </div>

        
          <div className='flex items-center justify-center gap-1.5 pt-4'>
            <button className='w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer'><ChevronLeft size={16} /></button>
            <button className='w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm shadow-blue-600/10'>1</button>
            <button className='w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-xs flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer'>2</button>
            <button className='w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-xs flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer'>3</button>
            <button className='w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-xs flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer'>4</button>
            <button className='w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-xs flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer'>5</button>
            <button className='w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer'><ChevronRight size={16} /></button>
          </div>
        </div>

       
        <aside className='lg:col-span-4 space-y-6 w-full'>
          
          
          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3.5'>
            <h3 className='font-extrabold text-sm text-slate-900 tracking-tight'>Search Notices</h3>
            <div className='relative w-full'>
              <input 
                type="text" 
                placeholder="Search notices..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-3 pr-10 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium'
              />
              <Search size={16} className='text-slate-400 absolute right-3 top-1/2 -translate-y-1/2' />
            </div>
          </div>

          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4'>
            <h3 className='font-extrabold text-sm text-slate-900 tracking-tight'>Notice Categories</h3>
            <div className='flex flex-col gap-1'>
              {categories.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = activeTab === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveTab(cat.name)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all group cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-50 text-blue-700 font-bold' 
                        : 'hover:bg-slate-50/80 text-slate-600 font-medium'
                    }`}
                  >
                    <span className='flex items-center gap-3 text-xs sm:text-sm'>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : cat.color}`}>
                        <IconComp size={16} />
                      </span>
                      {cat.name} Notices
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${isSelected ? 'bg-blue-200/50 text-blue-800' : 'bg-slate-100 text-slate-500'}`}>
                      {cat.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4'>
            <h3 className='font-extrabold text-sm text-slate-900 tracking-tight'>Recent Notices</h3>
            <div className='flex flex-col gap-4 divide-y divide-slate-50'>
              {noticesData.slice(0, 4).map((notice) => (
                <div key={notice.id} className='flex items-start gap-3.5 pt-3 first:pt-0 group cursor-pointer'>
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${notice.bg}`}>
                    <notice.icon size={15} />
                  </span>
                  <div className='space-y-0.5'>
                    <h4 className='text-xs font-bold text-slate-700 leading-snug tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2'>
                      {notice.title}
                    </h4>
                    <span className='text-[10px] font-medium text-slate-400 flex items-center gap-1'>
                      <Calendar size={10} /> {notice.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setActiveTab('All')}
              className='w-full mt-2 py-2.5 border border-slate-100 bg-slate-50/50 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-blue-50 transition-colors'
            >
              View All Notices <ChevronRight size={14} />
            </button>
          </div>
        </aside>

      </main>

     
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-12'>
        <div className='w-full bg-blue-50/50 border border-blue-100/50 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden'>
          <div className='flex items-center gap-4 text-center md:text-left relative z-10'>
            <span className='p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/10 hidden sm:block'><BellRing size={24} /></span>
            <div>
              <h3 className='font-black text-slate-900 text-base sm:text-lg'>Don't Miss Any Updates</h3>
              <p className='text-slate-400 text-xs font-medium mt-0.5'>Subscribe to receive important notices and announcements directly to your email.</p>
            </div>
          </div>

          <div className='w-full md:w-auto max-w-md flex items-center gap-2 relative z-10 shrink-0'>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className='bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 w-full focus:outline-none focus:border-blue-500 font-medium shadow-sm'
            />
            <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all shadow-md shadow-blue-600/10 whitespace-nowrap cursor-pointer'>
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Notice