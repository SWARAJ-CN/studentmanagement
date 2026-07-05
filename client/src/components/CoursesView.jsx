import React from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  ClipboardList, 
  Clock, 
  MapPin, 
  User, 
  Calendar, 
  Eye, 
  MoreVertical, 
  FileText, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const CoursesView = () => {
  // Mock data matching the UI image
  const subjectCards = [
    { name: 'Mathematics', teacher: 'Ms. Priya Menon', schedule: 'Mon, Wed, Fri', room: 'Room 204 | 9-A', progress: 88, color: 'blue', icon: BookOpen },
    { name: 'Science', teacher: 'Mr. Rohan Verma', schedule: 'Tue, Thu, Sat', room: 'Lab 1 | 9-A', progress: 90, color: 'emerald', icon: TrendingUp },
    { name: 'English', teacher: 'Ms. Anjali Nair', schedule: 'Mon, Tue, Thu', room: 'Room 201 | 9-A', progress: 85, color: 'purple', icon: BookOpen },
    { name: 'Social Studies', teacher: 'Mr. Arjun Iyer', schedule: 'Wed, Fri, Sat', room: 'Room 203 | 9-A', progress: 82, color: 'amber', icon: BookOpen },
    { name: 'Computer Science', teacher: 'Mr. Sreejith Kumar', schedule: 'Tue, Fri', room: 'Computer Lab | 9-A', progress: 92, color: 'cyan', icon: ClipboardList },
    { name: 'Malayalam', teacher: 'Ms. Lekha Warrier', schedule: 'Mon, Wed, Sat', room: 'Room 205 | 9-A', progress: 80, color: 'pink', icon: BookOpen },
  ];

  const tableData = [
    { subject: 'Mathematics', teacher: 'Ms. Priya Menon', nextClass: 'Today, 08:00 AM', room: 'Room 204', assignments: 1, status: 'Due Tomorrow', statusColor: 'amber', marks: '88%', testInfo: 'Test on May 20' },
    { subject: 'Science', teacher: 'Mr. Rohan Verma', nextClass: 'Today, 09:00 AM', room: 'Lab 1', assignments: 1, status: 'Due in 2 Days', statusColor: 'orange', marks: '90%', testInfo: 'Lab Test on May 18' },
    { subject: 'English', teacher: 'Ms. Anjali Nair', nextClass: 'Today, 11:30 AM', room: 'Room 201', assignments: 1, status: 'Due in 4 Days', statusColor: 'orange', marks: '85%', testInfo: 'Assignment on May 19' },
    { subject: 'Social Studies', teacher: 'Mr. Arjun Iyer', nextClass: 'Today, 01:15 PM', room: 'Room 203', assignments: 1, status: 'Due in 6 Days', statusColor: 'emerald', marks: '82%', testInfo: 'Test on May 17' },
    { subject: 'Computer Science', teacher: 'Mr. Sreejith Kumar', nextClass: 'Today, 02:15 PM', room: 'Computer Lab', assignments: 0, status: 'No Pending', statusColor: 'slate', marks: '92%', testInfo: 'Practical on May 16' },
    { subject: 'Malayalam', teacher: 'Ms. Lekha Warrier', nextClass: 'Tomorrow, 09:00 AM', room: 'Room 205', assignments: 0, status: 'No Pending', statusColor: 'slate', marks: '80%', testInfo: 'Class Test on May 15' },
  ];

  const upcomingClasses = [
    { timeStart: '08:00 AM', timeEnd: '09:00 AM', subject: 'Mathematics', room: 'Room 204', bg: 'bg-blue-50 text-blue-600' },
    { timeStart: '09:00 AM', timeEnd: '10:00 AM', subject: 'Science', room: 'Lab 1', bg: 'bg-emerald-50 text-emerald-600' },
    { timeStart: '11:30 AM', timeEnd: '12:30 PM', subject: 'English', room: 'Room 201', bg: 'bg-purple-50 text-purple-600' },
    { timeStart: '01:15 PM', timeEnd: '02:15 PM', subject: 'Social Studies', room: 'Room 203', bg: 'bg-amber-50 text-amber-600' },
    { timeStart: '02:15 PM', timeEnd: '03:15 PM', subject: 'Malayalam', room: 'Room 205', bg: 'bg-pink-50 text-pink-600' },
  ];

  const colorMap = {
    blue: 'bg-blue-600 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-600 text-emerald-600 border-emerald-100',
    purple: 'bg-purple-600 text-purple-600 border-purple-100',
    amber: 'bg-amber-500 text-amber-500 border-amber-100',
    cyan: 'bg-cyan-500 text-cyan-500 border-cyan-100',
    pink: 'bg-pink-500 text-pink-500 border-pink-100',
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none animate-fadeIn">
      
      {/* Header Context Section */}
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">My Subjects</h1>
        <div className="flex items-center gap-1.5 text-xs font-semibold mt-1">
          <span className="text-blue-600 cursor-pointer hover:underline">Dashboard</span>
          <span className="text-slate-400 font-normal">&gt;</span>
          <span className="text-slate-400 font-medium">My Subjects</span>
        </div>
      </div>

      {/* Main Structural Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT COLUMN PANEL: Core Content (8/12 Layout) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Analytics Overview Block */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><BookOpen size={20} /></span>
              <div>
                <span className="text-[10px] text-slate-400 font-bold tracking-wide block uppercase">Total Subjects</span>
                <span className="text-xl font-black text-slate-900 leading-tight block">6</span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-blue-500 inline-block" /> All subjects enrolled
                </span>
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><TrendingUp size={20} /></span>
              <div>
                <span className="text-[10px] text-slate-400 font-bold tracking-wide block uppercase">Average Score</span>
                <span className="text-xl font-black text-slate-900 leading-tight block">87.4%</span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" /> Across all subjects
                </span>
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0"><ClipboardList size={20} /></span>
              <div>
                <span className="text-[10px] text-slate-400 font-bold tracking-wide block uppercase">Pending Assignments</span>
                <span className="text-xl font-black text-slate-900 leading-tight block">4</span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-amber-500 inline-block" /> Due in next 7 days
                </span>
              </div>
            </div>
          </div>

          {/* Graphical Subjects Grid Array */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subjectCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4 hover:border-slate-200 transition-all">
                  <div className="flex items-start gap-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colorMap[card.color].split(' ')[0]} bg-opacity-10 ${colorMap[card.color].split(' ')[1]}`}>
                      <IconComp size={16} />
                    </span>
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-xs font-black text-slate-900 tracking-tight truncate">{card.name}</h3>
                      <div className="space-y-0.5 text-[10px] font-bold text-slate-400">
                        <div className="flex items-center gap-1.5"><User size={11} className="shrink-0" /> <span className="text-slate-500 truncate">{card.teacher}</span></div>
                        <div className="flex items-center gap-1.5"><Clock size={11} className="shrink-0" /> <span>{card.schedule}</span></div>
                        <div className="flex items-center gap-1.5"><MapPin size={11} className="shrink-0" /> <span>{card.room}</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Micro Progress Bar Component */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-black">
                      <span className="text-slate-300">Progress</span>
                      <span className="text-slate-800">{card.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${colorMap[card.color].split(' ')[0]} rounded-full`} style={{ width: `${card.progress}%` }} />
                    </div>
                  </div>

                  {/* Micro Action Controls */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-50">
                    <button className="bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-bold py-1.5 px-2 rounded-lg transition-colors cursor-pointer text-center">
                      View Details
                    </button>
                    <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-[10px] font-bold py-1.5 px-2 rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1">
                      Open Materials <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Master Overview Log Table Component */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50 flex items-center gap-2">
              <ClipboardList size={15} className="text-blue-600" />
              <h3 className="text-xs font-black text-slate-900 tracking-tight">All Subjects Overview</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[11px] font-semibold whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Teacher</th>
                    <th className="py-3 px-4">Next Class</th>
                    <th className="py-3 px-4 text-center">Assignments Due</th>
                    <th className="py-3 px-4">Latest Marks</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{row.subject}</td>
                      <td className="py-3 px-4 text-slate-500 font-medium">{row.teacher}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">{row.nextClass}</div>
                        <div className="text-[9px] text-slate-400 font-medium">{row.room}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-black text-slate-800 w-3">{row.assignments}</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border text-center min-w-[85px] ${
                            row.statusColor === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            row.statusColor === 'orange' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                            row.statusColor === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            'bg-slate-50 text-slate-400 border-slate-100'
                          }`}>
                            {row.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-black text-slate-900">{row.marks}</div>
                        <div className="text-[9px] text-slate-400 font-medium">{row.testInfo}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2.5 text-slate-400">
                          <button className="hover:text-blue-600 transition-colors cursor-pointer"><Eye size={13} /></button>
                          <button className="hover:text-slate-600 transition-colors cursor-pointer"><MoreVertical size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN PANEL: Analytics Widgets (4/12 Layout) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Upcoming Classes Sidebar Module */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h3 className="text-xs font-black text-slate-900 tracking-tight">Upcoming Classes</h3>
              <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View Timetable</span>
            </div>
            
            <div className="space-y-2.5">
              {upcomingClasses.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50/50 transition-colors text-[11px] font-semibold">
                  <div className="text-[9px] text-slate-400 font-bold text-right shrink-0 w-14">
                    <div className="text-slate-700 font-extrabold">{item.timeStart}</div>
                    <div>{item.timeEnd}</div>
                  </div>
                  <div className="w-0.5 h-7 bg-slate-100 shrink-0" />
                  <div className="flex items-center justify-between w-full min-w-0 gap-2">
                    <div className="min-w-0">
                      <h4 className="text-slate-900 font-black tracking-tight truncate">{item.subject}</h4>
                      <span className="text-[9px] text-slate-400 font-medium">{item.room}</span>
                    </div>
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${item.bg}`}>
                      <Calendar size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Assignments Ledger Module */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h3 className="text-xs font-black text-slate-900 tracking-tight">Recent Assignments</h3>
              <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</span>
            </div>

            <div className="space-y-3 text-[11px] font-semibold">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0"><FileText size={12} /></span>
                  <div className="min-w-0">
                    <h4 className="text-slate-800 font-bold truncate">Mathematics Worksheet 5</h4>
                    <span className="text-[9px] text-slate-400 block font-medium">Due: May 28, 2024</span>
                  </div>
                </div>
                <span className="text-[8px] font-black text-orange-600 bg-orange-50 border border-orange-100 rounded px-1.5 py-0.5 uppercase tracking-wide shrink-0">Due Tomorrow</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0"><FileText size={12} /></span>
                  <div className="min-w-0">
                    <h4 className="text-slate-800 font-bold truncate">Science Lab Report</h4>
                    <span className="text-[9px] text-slate-400 block font-medium">Due: May 30, 2024</span>
                  </div>
                </div>
                <span className="text-[8px] font-black text-amber-600 bg-amber-50 border border-amber-100 rounded px-1.5 py-0.5 uppercase tracking-wide shrink-0">Due in 2 Days</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 shrink-0"><FileText size={12} /></span>
                  <div className="min-w-0">
                    <h4 className="text-slate-800 font-bold truncate">English Essay Writing</h4>
                    <span className="text-[9px] text-slate-400 block font-medium">Due: Jun 01, 2024</span>
                  </div>
                </div>
                <span className="text-[8px] font-black text-amber-600 bg-amber-50 border border-amber-100 rounded px-1.5 py-0.5 uppercase tracking-wide shrink-0">Due in 4 Days</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 shrink-0"><FileText size={12} /></span>
                  <div className="min-w-0">
                    <h4 className="text-slate-800 font-bold truncate">Social Studies Map Activity</h4>
                    <span className="text-[9px] text-slate-400 block font-medium">Due: Jun 03, 2024</span>
                  </div>
                </div>
                <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5 uppercase tracking-wide shrink-0">Due in 6 Days</span>
              </div>
            </div>
          </div>

          {/* Subject Performance Horizontal Bars Deck */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h3 className="text-xs font-black text-slate-900 tracking-tight">Subject Performance</h3>
              <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View Details</span>
            </div>

            <div className="space-y-3 text-[10px] font-bold">
              {[
                { name: 'Computer Science', percentage: 92, barColor: 'bg-emerald-500' },
                { name: 'Science', percentage: 90, barColor: 'bg-emerald-500' },
                { name: 'Mathematics', percentage: 88, barColor: 'bg-blue-500' },
                { name: 'English', percentage: 85, barColor: 'bg-blue-500' },
                { name: 'Social Studies', percentage: 82, barColor: 'bg-amber-500' },
                { name: 'Malayalam', percentage: 80, barColor: 'bg-amber-500' },
              ].map((perf, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-semibold">{perf.name}</span>
                    <span className="text-slate-900 font-black">{perf.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${perf.barColor} rounded-full`} style={{ width: `${perf.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default CoursesView;