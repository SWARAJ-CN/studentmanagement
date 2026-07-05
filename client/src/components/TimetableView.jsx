import React, { useState } from 'react';
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  User, 
  Download, 
  Info,
  Layers,
  LayoutGrid,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const TimetableView = () => {
  const [viewMode, setViewMode] = useState('week'); // 'week' | 'day'
  const [activeDayIndex, setActiveDayIndex] = useState(3); // Default to Thursday (index 3) to match the image

  const daysOfWeek = [
    { name: 'Monday', date: '13 May' },
    { name: 'Tuesday', date: '14 May' },
    { name: 'Wednesday', date: '15 May' },
    { name: 'Thursday', date: '16 May' },
    { name: 'Friday', date: '17 May' },
    { name: 'Saturday', date: '18 May' }
  ];

  // Metric Header Blocks Data
  const metrics = [
    { label: "Today's Date", value: "16 May 2024", sub: "Thursday", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Periods Today", value: "7", sub: "09:00 AM - 03:10 PM", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Next Period", value: "Mathematics", sub: "10:00 AM - 10:45 AM", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Class Teacher", value: "Mr. Rajesh Verma", sub: "Mathematics", icon: User, color: "text-purple-600", bg: "bg-purple-50" }
  ];

  // Subject styling presets
  const baseSubjectStyles = {
    'English': 'bg-[#EFF6FF] text-[#1E40AF] border-[#DBEAFE]',
    'Science': 'bg-[#ECFDF5] text-[#065F46] border-[#D1FAE5]',
    'Mathematics': 'bg-[#FFFBEB] text-[#92400E] border-[#FEF3C7]',
    'Social Science': 'bg-[#F5F3FF] text-[#5B21B6] border-[#EDE9FE]',
    'Hindi': 'bg-[#FFF1F2] text-[#9F1239] border-[#FFE4E6]',
    'Computer': 'bg-[#F0FDFA] text-[#0F766E] border-[#CCFBF1]',
    'Physical Education': 'bg-[#FFF1F2] text-[#9F1239] border-[#FFE4E6]',
    'Art & Craft': 'bg-[#F5F3FF] text-[#5B21B6] border-[#EDE9FE]',
    'Library': 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0]'
  };

  // Structured dataset mapping Mon-Sat index rows
  const scheduleData = [
    {
      time: "09:00 AM - 09:45 AM",
      slots: [
        { subject: "English", teacher: "Mr. Anil Kumar" },
        { subject: "Science", teacher: "Mrs. Neha Singh" },
        { subject: "Mathematics", teacher: "Mr. Rajesh Verma" },
        { subject: "Social Science", teacher: "Mr. Deepak S." },
        { subject: "Hindi", teacher: "Mrs. Pooja Sharma" },
        { subject: "Computer", teacher: "Mr. Suresh Patel" }
      ]
    },
    {
      time: "09:45 AM - 10:30 AM",
      slots: [
        { subject: "Mathematics", teacher: "Mr. Rajesh Verma" },
        { subject: "English", teacher: "Mr. Anil Kumar" },
        { subject: "Science", teacher: "Mrs. Neha Singh" },
        { subject: "Mathematics", teacher: "Mr. Rajesh Verma", highlighted: true },
        { subject: "Social Science", teacher: "Mr. Deepak S." },
        { subject: "Hindi", teacher: "Mrs. Pooja Sharma" }
      ]
    },
    { type: "break", label: "Short Break", time: "10:30 AM - 10:45 AM" },
    {
      time: "10:45 AM - 11:30 AM",
      slots: [
        { subject: "Science", teacher: "Mrs. Neha Singh" },
        { subject: "Hindi", teacher: "Mrs. Pooja Sharma" },
        { subject: "English", teacher: "Mr. Anil Kumar" },
        { subject: "Science", teacher: "Mrs. Neha Singh" },
        { subject: "Mathematics", teacher: "Mr. Rajesh Verma" },
        { subject: "Social Science", teacher: "Mr. Deepak S." }
      ]
    },
    {
      time: "11:30 AM - 12:15 PM",
      slots: [
        { subject: "Hindi", teacher: "Mrs. Pooja Sharma" },
        { subject: "Social Science", teacher: "Mr. Deepak S." },
        { subject: "Hindi", teacher: "Mrs. Pooja Sharma" },
        { subject: "English", teacher: "Mr. Anil Kumar" },
        { subject: "Science", teacher: "Mrs. Neha Singh" },
        { subject: "Mathematics", teacher: "Mr. Rajesh Verma" }
      ]
    },
    {
      time: "12:15 PM - 01:00 PM",
      slots: [
        { subject: "Computer", teacher: "Mr. Suresh Patel" },
        { subject: "Mathematics", teacher: "Mr. Rajesh Verma" },
        { subject: "Social Science", teacher: "Mr. Deepak S." },
        { subject: "Computer", teacher: "Mr. Suresh Patel" },
        { subject: "English", teacher: "Mr. Anil Kumar" },
        { subject: "Science", teacher: "Mrs. Neha Singh" }
      ]
    },
    { type: "break", label: "Lunch Break", time: "01:00 PM - 01:40 PM" },
    {
      time: "01:40 PM - 02:25 PM",
      slots: [
        { subject: "Physical Education", teacher: "Mr. Vikram S." },
        { subject: "Computer", teacher: "Mr. Suresh Patel" },
        { subject: "Mathematics", teacher: "Mr. Rajesh Verma" },
        { subject: "Hindi", teacher: "Mrs. Pooja Sharma" },
        { subject: "Computer", teacher: "Mr. Suresh Patel" },
        { subject: "English", teacher: "Mr. Anil Kumar" }
      ]
    },
    {
      time: "02:25 PM - 03:10 PM",
      slots: [
        { subject: "Art & Craft", teacher: "Mrs. Kavita N." },
        { subject: "Physical Education", teacher: "Mr. Vikram S." },
        { subject: "Art & Craft", teacher: "Mrs. Kavita N." },
        { subject: "Library", teacher: "Ms. Ritu Sharma" },
        { subject: "Art & Craft", teacher: "Mrs. Kavita N." },
        { subject: "Physical Education", teacher: "Mr. Vikram S." }
      ]
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-blue-600 cursor-pointer hover:underline">Dashboard</span>
            <span className="text-slate-400 font-normal">&gt;</span>
            <span className="text-slate-400 font-medium">Timetable</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">Time Table</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">View your class schedule and plan your day</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative bg-white border border-slate-200 rounded-xl shadow-sm px-3 py-1.5 flex items-center gap-2 text-xs font-bold text-slate-700">
            <Calendar size={14} className="text-slate-400" />
            <select className="appearance-none bg-transparent pr-6 focus:outline-none cursor-pointer">
              <option>May 13 - May 18, 2024</option>
            </select>
            <span className="absolute right-3 pointer-events-none text-slate-400 text-[10px]">▼</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer">
            <Download size={14} /> Download
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {metrics.map((m, i) => {
          const IconComponent = m.icon;
          return (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${m.bg} ${m.color}`}>
                <IconComponent size={20} />
              </span>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">{m.label}</span>
                <span className="text-sm font-black text-slate-900 tracking-tight block mt-0.5">{m.value}</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{m.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 overflow-hidden">
        
        {/* Toggle Bar Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-3">
          <h3 className="text-xs font-black text-slate-900 tracking-tight">
            {viewMode === 'week' ? 'Weekly Time Table' : `Daily Schedule — ${daysOfWeek[activeDayIndex].name}`}
          </h3>
          <div className="bg-slate-100/80 p-0.5 rounded-xl flex gap-1 text-[11px] font-bold self-start sm:self-auto">
            <button 
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === 'week' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <LayoutGrid size={12} /> Week View
            </button>
            <button 
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === 'day' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Layers size={12} /> Day View
            </button>
          </div>
        </div>

        {/* DAY VIEW SPECIFIC TOP NAVIGATION PILLS */}
        {viewMode === 'day' && (
          <div className="flex items-center gap-2 mb-4 bg-slate-50/50 p-1.5 rounded-xl border border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none">
            {daysOfWeek.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDayIndex(idx)}
                className={`flex-1 py-2 px-3 rounded-lg text-center transition-all cursor-pointer ${
                  activeDayIndex === idx 
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60 font-black' 
                    : 'text-slate-500 hover:text-slate-800 font-bold'
                }`}
              >
                <span className="text-xs block">{day.name}</span>
                <span className="text-[10px] opacity-70 block font-medium mt-0.5">{day.date}</span>
              </button>
            ))}
          </div>
        )}

        {/* RENDER CONDITIONS */}
        {viewMode === 'week' ? (
          /* WEEK VIEW MATRIX GRID Layout */
          <div className="overflow-x-auto">
            <div className="min-w-[850px]">
              <div className="grid grid-cols-7 bg-slate-50/70 border border-slate-100 rounded-xl text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2.5 mb-2">
                <div className="text-left pl-4 text-slate-500 font-extrabold normal-case text-xs">Time</div>
                {daysOfWeek.map((day, idx) => (
                  <div key={idx}>
                    <span className={`${idx === 3 ? 'text-blue-600' : 'text-slate-800'} font-black block text-xs`}>{day.name}</span>
                    <span className={`${idx === 3 ? 'text-blue-500' : 'text-slate-400'} text-[9px] font-medium mt-0.5 block`}>{day.date}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {scheduleData.map((row, rIdx) => {
                  if (row.type === 'break') {
                    return (
                      <div key={rIdx} className="grid grid-cols-7 items-center bg-[#F8FAFC] border border-slate-100 rounded-xl text-center py-2">
                        <div className="text-left pl-4 text-[10px] font-black text-slate-900 tracking-tight">
                          {row.time.split(' - ')[0]}<br/><span className="text-slate-400 font-bold">{row.time.split(' - ')[1]}</span>
                        </div>
                        <div className="col-span-6 flex items-center justify-center gap-2 text-[11px] font-extrabold text-slate-500 tracking-wide">
                          {row.label === 'Lunch Break' ? '🍴' : '☕'} {row.label}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={rIdx} className="grid grid-cols-7 items-center gap-2">
                      <div className="text-left pl-4 text-[10px] font-black text-slate-900 tracking-tight">
                        {row.time.split(' - ')[0]}<br/><span className="text-slate-400 font-bold">{row.time.split(' - ')[1]}</span>
                      </div>
                      {row.slots.map((slot, sIdx) => (
                        <div 
                          key={sIdx} 
                          className={`border rounded-xl p-2.5 text-center transition-all ${baseSubjectStyles[slot.subject] || 'bg-white text-slate-700 border-slate-100'} ${
                            slot.highlighted && sIdx === 3 ? 'ring-2 ring-blue-500 ring-offset-1 border-blue-500' : ''
                          }`}
                        >
                          <span className="text-[11px] font-black tracking-tight block truncate">{slot.subject}</span>
                          <span className="text-[9px] font-bold block opacity-75 mt-0.5 truncate">{slot.teacher}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* DAY VIEW TIMELINE Layout */
          <div className="space-y-3 max-w-2xl mx-auto py-2 animate-fadeIn">
            {scheduleData.map((row, rIdx) => {
              if (row.type === 'break') {
                return (
                  <div key={rIdx} className="flex items-center gap-4 bg-[#F8FAFC] border border-slate-100 rounded-xl p-3">
                    <div className="w-28 text-[11px] font-black text-slate-900 shrink-0">
                      {row.time}
                    </div>
                    <div className="h-4 w-[1px] bg-slate-200" />
                    <div className="text-xs font-black text-slate-500 tracking-wide">
                      {row.label === 'Lunch Break' ? '🍴' : '☕'} {row.label}
                    </div>
                  </div>
                );
              }

              const targetSlot = row.slots[activeDayIndex];
              return (
                <div key={rIdx} className="flex items-center gap-4">
                  <div className="w-28 text-[11px] font-black text-slate-900 shrink-0">
                    {row.time.split(' - ')[0]}<br />
                    <span className="text-slate-400 font-bold text-[10px]">{row.time.split(' - ')[1]}</span>
                  </div>
                  <div className="h-10 w-[1px] bg-slate-200 shrink-0" />
                  <div className={`flex-1 border rounded-xl p-3 flex items-center justify-between transition-all ${baseSubjectStyles[targetSlot.subject] || 'bg-white border-slate-100'} ${
                    targetSlot.highlighted && activeDayIndex === 3 ? 'ring-2 ring-blue-500 ring-offset-1 border-blue-500' : ''
                  }`}>
                    <div>
                      <span className="text-xs font-black tracking-tight block">{targetSlot.subject}</span>
                      <span className="text-[10px] font-bold opacity-80 block mt-0.5">{targetSlot.teacher}</span>
                    </div>
                    <span className="text-[10px] bg-white/60 font-bold px-2 py-0.5 rounded-md border border-black/5">Period {rIdx & 1 ? 'II' : 'I'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[10px] font-bold text-slate-400">
          <div className="flex items-center gap-2 text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <Info size={13} className="text-blue-500 shrink-0" />
            <span><span className="text-slate-800 font-bold">Note:</span> Timetable is subject to change. Please check regularly for updates.</span>
          </div>

          <div className="flex items-center flex-wrap gap-4 text-slate-500">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Language</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Science</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Mathematics</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Others</div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default TimetableView;