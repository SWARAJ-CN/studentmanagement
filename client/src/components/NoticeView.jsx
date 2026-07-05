import React, { useState, useMemo } from 'react';
import { 
  Megaphone, 
  Send, 
  Pin, 
  CalendarDays, 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  FileText,
  PartyPopper,
  UserCheck,
  Bus
} from 'lucide-react';

const NoticeView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Notices');
  const [visibleCount, setVisibleCount] = useState(5);

  // Static Metrics matching the header cards exactly
  const metrics = [
    { title: 'Total Notices', count: 24, label: 'All Time', icon: <Megaphone size={20} />, bg: 'bg-blue-50 text-blue-600' },
    { title: 'Unread Notices', count: 5, label: 'New Updates', icon: <Send size={20} />, bg: 'bg-emerald-50 text-emerald-600' },
    { title: 'Important Notices', count: 3, label: 'High Priority', icon: <Pin size={20} />, bg: 'bg-amber-50 text-amber-500' },
    { title: 'This Month', count: 8, label: 'May 2024', icon: <CalendarDays size={20} />, bg: 'bg-purple-50 text-purple-600' }
  ];

  // Full datasets mapped from WhatsApp Image 2026-07-04 at 6.14.16 PM.jpeg
  const allNotices = [
    {
      id: 1,
      title: 'PTM Meeting for Term 2',
      category: 'Administration',
      content: 'PTM for Term 2 will be held on 25 May 2024 (Saturday). Timings: 10:00 AM to 1:00 PM.',
      date: '20 May 2024',
      author: 'Admin',
      isImportant: true,
      tagColor: 'border-l-red-500',
      badgeColor: 'bg-red-50 text-red-600',
      icon: <Megaphone size={16} className="text-red-500" />,
      iconBg: 'bg-red-50',
      dotColor: 'bg-red-500'
    },
    {
      id: 2,
      title: 'Summer Break Announcement',
      category: 'Events',
      content: 'School will remain closed for Summer Break from 1 June to 15 June 2024.',
      date: '18 May 2024',
      author: 'Admin',
      isImportant: false,
      tagColor: 'border-l-emerald-500',
      icon: <CalendarDays size={16} className="text-emerald-500" />,
      iconBg: 'bg-emerald-50',
      dotColor: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Unit Test 2 Schedule',
      category: 'Exams',
      content: 'Unit Test 2 for all classes will start from 3 June 2024. Please check the exam timetable.',
      date: '15 May 2024',
      author: 'Exams Dept.',
      isImportant: false,
      tagColor: 'border-l-amber-500',
      icon: <FileText size={16} className="text-amber-500" />,
      iconBg: 'bg-amber-50',
      dotColor: 'bg-blue-500'
    },
    {
      id: 4,
      title: 'Library Book Submission',
      category: 'Academics',
      content: 'All library books issued must be returned by 28 May 2024. Fine will be applicable after that.',
      date: '12 May 2024',
      author: 'Librarian',
      isImportant: false,
      tagColor: 'border-l-purple-500',
      icon: <BookOpen size={16} className="text-purple-500" />,
      iconBg: 'bg-purple-50',
      dotColor: 'bg-slate-400'
    },
    {
      id: 5,
      title: 'Annual Sports Day',
      category: 'Events',
      content: 'Annual Sports Day will be held on 10 July 2024. All students are requested to participate.',
      date: '10 May 2024',
      author: 'Sports Dept.',
      isImportant: false,
      tagColor: 'border-l-blue-500',
      icon: <PartyPopper size={16} className="text-blue-500" />,
      iconBg: 'bg-blue-50',
      dotColor: 'bg-blue-500'
    },
    {
      id: 6,
      title: 'Fee Payment Reminder',
      category: 'Administration',
      content: 'This is a reminder to clear your Term 2 fees before 15 June 2024 to avoid late fees.',
      date: '08 May 2024',
      author: 'Accounts Dept.',
      isImportant: false,
      tagColor: 'border-l-teal-500',
      icon: <UserCheck size={16} className="text-teal-500" />,
      iconBg: 'bg-teal-50',
      dotColor: 'bg-blue-500'
    },
    {
      id: 7,
      title: 'Transport Information',
      category: 'Transport',
      content: 'New bus routes will be effective from 20 May 2024. Check details in transport section.',
      date: '05 May 2024',
      author: 'Transport Dept.',
      isImportant: false,
      tagColor: 'border-l-orange-400',
      icon: <Bus size={16} className="text-orange-500" />,
      iconBg: 'bg-orange-50',
      dotColor: 'bg-slate-400'
    }
  ];

  // Notice category schema counting indicators
  const categories = [
    { name: 'Academics', count: 8, icon: <BookOpen size={14} />, bg: 'text-blue-600 bg-blue-50' },
    { name: 'Exams', count: 4, icon: <FileText size={14} />, bg: 'text-emerald-600 bg-emerald-50' },
    { name: 'Events', count: 5, icon: <PartyPopper size={14} />, bg: 'text-purple-600 bg-purple-50' },
    { name: 'Administration', count: 4, icon: <UserCheck size={14} />, bg: 'text-amber-600 bg-amber-50' },
    { name: 'Transport', count: 3, icon: <Bus size={14} />, bg: 'text-rose-600 bg-rose-50' },
  ];

  // Dynamic filter processing
  const filteredNotices = useMemo(() => {
    return allNotices.filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            notice.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Notices' || notice.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none">
      
      {/* HEADER PATHS BLOCK */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span className="text-blue-600 cursor-pointer hover:underline">Dashboard</span>
          <span className="text-slate-400 font-normal">&gt;</span>
          <span className="text-slate-400 font-medium">Notice</span>
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">Notice</h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">Stay updated with the latest notices and announcements.</p>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {metrics.map((item, index) => (
          <div key={index} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}>
              {item.icon}
            </span>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">{item.title}</span>
              <span className="text-xl font-black text-slate-900 leading-tight block mt-0.5">{item.count}</span>
              <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* SPLIT LAYOUT MAIN COLUMN MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN PANEL: INTERACTIVE SEARCH & ALL NOTICES FEED LIST */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            
            {/* SEARCH AND FILTER CRITERIA CONTROLS */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4 mb-4">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">All Notices</h3>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Text Filter Input */}
                <div className="relative w-full sm:w-64">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notices..."
                    className="w-full bg-slate-50/60 text-slate-700 text-xs pl-8 pr-4 py-2 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-medium"
                  />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Dropdown Category Selector */}
                <div className="relative shrink-0">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 text-slate-700 text-[11px] font-bold pl-3 pr-8 py-2 rounded-xl shadow-sm focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <option value="All Notices">All Notices</option>
                    {categories.map((cat, i) => (
                      <option key={i} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* LIVE FEED FEEDBACK ROWS */}
            <div className="divide-y divide-slate-100">
              {filteredNotices.slice(0, visibleCount).map((notice) => (
                <div 
                  key={notice.id} 
                  className={`py-4 flex gap-4 border-l-4 ${notice.tagColor} pl-3 -ml-5 pr-1 hover:bg-slate-50/40 transition-colors duration-150`}
                >
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${notice.iconBg}`}>
                    {notice.icon}
                  </span>
                  
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-black text-slate-900 tracking-tight">{notice.title}</h4>
                      {notice.isImportant && (
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${notice.badgeColor}`}>
                          Important
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{notice.content}</p>
                    <div className="text-[10px] text-slate-400 font-semibold pt-0.5">
                      <span>By: {notice.author}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end justify-between py-0.5">
                    <span className="text-[10px] text-slate-400 font-bold">{notice.date}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${notice.dotColor} block`} />
                  </div>
                </div>
              ))}

              {filteredNotices.length === 0 && (
                <div className="py-12 text-center text-slate-400 font-medium text-xs">
                  No active announcements or notices match your specific filters.
                </div>
              )}
            </div>

            {/* LOAD MORE CONTROL */}
            {filteredNotices.length > visibleCount && (
              <div className="pt-4 border-t border-slate-50 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 3)}
                  className="bg-white border border-slate-200 text-blue-600 font-bold text-[11px] px-5 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-1 cursor-pointer"
                >
                  Load More <ChevronDown size={13} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN SIDEBAR PANELS */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* IMPORTANT ANNOUNCEMENT HIGHLIGHT WRAPPER */}
          <div className="bg-[#FFFBF2] border border-amber-100 rounded-2xl p-5 shadow-sm text-left">
            <div className="flex items-center justify-between border-b border-amber-200/40 pb-2.5 mb-3">
              <h4 className="text-xs font-black text-slate-900 tracking-tight uppercase">Important Announcements</h4>
              <span className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">View All</span>
            </div>
            
            <div className="bg-white/80 border border-amber-100/50 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 animate-pulse"><Pin size={14} /></span>
                <span className="text-[11px] font-black text-amber-800">Important Notice</span>
              </div>
              <p className="text-[11px] text-slate-600 font-semibold leading-normal">
                Please check the PTM schedule and attend the meeting with your parents.
              </p>
              <button className="bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-200/70 shadow-sm transition-all cursor-pointer">
                View Details
              </button>
            </div>
          </div>

          {/* NOTICE CATEGORIES LIST */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-3">Notice Categories</h3>
            <div className="space-y-2">
              {categories.map((cat, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center justify-between p-2 rounded-xl border border-transparent transition-all cursor-pointer ${
                    selectedCategory === cat.name ? 'bg-blue-50/50 border-blue-100/40 text-blue-600' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-[11px] font-bold">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center ${cat.bg}`}>{cat.icon}</span>
                    <span className={selectedCategory === cat.name ? 'text-blue-700 font-extrabold' : 'text-slate-600'}>{cat.name}</span>
                  </div>
                  <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-2 py-0.5 rounded-md">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NOTICE CALENDAR WIDGET GRID PANEL */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-3">Notice Calendar</h3>
            
            {/* Month Control row */}
            <div className="flex items-center justify-between mb-4">
              <button className="p-1 hover:bg-slate-50 rounded text-slate-400"><ChevronLeft size={14}/></button>
              <span className="text-xs font-black text-slate-800">May 2024</span>
              <button className="p-1 hover:bg-slate-50 rounded text-slate-400"><ChevronRight size={14}/></button>
            </div>

            {/* Days Matrix layout header */}
            <div className="grid grid-cols-7 gap-y-2 text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>

            {/* Mini Calendar Simulation numbers grid matrix */}
            <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-slate-600">
              <span className="text-slate-300">28</span><span className="text-slate-300">29</span><span className="text-slate-300">30</span>
              <span className="relative py-1 flex justify-center">1<span className="absolute bottom-0 w-1 h-1 rounded-full bg-emerald-500"/></span>
              <span>2</span><span>3</span><span>4</span>
              
              <span>5</span><span>6</span><span>7</span>
              <span className="relative py-1 flex justify-center">8<span className="absolute bottom-0 w-1 h-1 rounded-full bg-blue-500"/></span>
              <span>9</span><span>10</span><span>11</span>
              
              <span>12</span><span>13</span><span>14</span>
              <span className="relative py-1 flex justify-center">15<span className="absolute bottom-0 w-1 h-1 rounded-full bg-blue-500"/></span>
              <span>16</span>
              <span className="relative py-1 flex justify-center">17<span className="absolute bottom-0 w-1 h-1 rounded-full bg-blue-500"/></span>
              <span>18</span>
              
              <span>19</span><span className="bg-red-500 text-white font-black rounded-full w-6 h-6 flex items-center justify-center mx-auto">20</span><span>21</span><span>22</span><span>23</span><span>24</span>
              <span className="bg-blue-600 text-white font-black rounded-full w-6 h-6 flex items-center justify-center mx-auto">25</span>
              
              <span>26</span><span>27</span>
              <span className="relative py-1 flex justify-center">28<span className="absolute bottom-0 w-1 h-1 rounded-full bg-blue-500"/></span>
              <span>29</span><span>30</span><span>31</span><span className="text-slate-300">1</span>
            </div>

            {/* Calendar Event legends color codes bar */}
            <div className="flex justify-center gap-4 border-t border-slate-50 pt-3.5 mt-3 text-[9px] font-bold">
              <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"/> <span className="text-slate-400 font-medium">Important</span></div>
              <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"/> <span className="text-slate-400 font-medium">Notice</span></div>
              <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> <span className="text-slate-400 font-medium">Event</span></div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER BRANDING BANNER */}
      <div className="mt-8 pt-4 border-t border-slate-200/60 text-center text-[10px] font-bold text-slate-400">
        © 2024 Student Management System. All rights reserved.
      </div>

    </div>
  );
};

export default NoticeView;