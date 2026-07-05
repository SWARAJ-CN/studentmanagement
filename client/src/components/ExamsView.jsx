import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  BookOpen, 
  Award, 
  Trophy, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Info,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

const ExamsView = () => {
  // Application Interactive States
  const [selectedTerm, setSelectedTerm] = useState('All Terms');
  const [showTipsBanner, setShowTipsBanner] = useState(true);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date(2024, 4, 1)); // May 2024
  const [activeModal, setActiveModal] = useState(null); // stores { type, data }

  // Mock Database containing all metrics, exams, and results from the interface image
  const examDatabase = {
    metrics: {
      'All Terms': { upcoming: 5, completed: 3, avgScore: '87%', highest: '95%', highestSub: 'In Mathematics' },
      'Term 1': { upcoming: 5, completed: 0, avgScore: 'N/A', highest: 'N/A', highestSub: 'No exams yet' },
      'Term 2': { upcoming: 0, completed: 3, avgScore: '87%', highest: '95%', highestSub: 'In Mathematics' }
    },
    upcomingExams: [
      { id: 1, name: 'Unit Test - 1', desc: 'First unit test of the term', subject: 'Mathematics', date: '20 May 2024', day: 'Mon', time: '09:00 AM - 10:30 AM', term: 'Term 1', icon: '📐', bg: 'bg-blue-50 text-blue-600', code: 'MATH-101', syllabus: ['Algebra Fundamentals', 'Quadratic Equations', 'Arithmetic Progressions'] },
      { id: 2, name: 'Unit Test - 1', desc: 'First unit test of the term', subject: 'Science', date: '22 May 2024', day: 'Wed', time: '09:00 AM - 10:30 AM', term: 'Term 1', icon: '🧪', bg: 'bg-emerald-50 text-emerald-600', code: 'SCI-101', syllabus: ['Chemical Reactions', 'Acids, Bases and Salts', 'Light - Reflection and Refraction'] },
      { id: 3, name: 'Half Yearly Exam', desc: 'Half yearly examination', subject: 'English', date: '03 Jun 2024', day: 'Mon', time: '09:00 AM - 12:00 PM', term: 'Term 1', icon: '📖', bg: 'bg-amber-50 text-amber-600', code: 'ENG-101', syllabus: ['Reading Comprehension', 'Formal Letter Writing', 'Tenses & Modals', 'Literature Prose Chapters 1-4'] },
      { id: 4, name: 'Half Yearly Exam', desc: 'Half yearly examination', subject: 'Social Science', date: '05 Jun 2024', day: 'Wed', time: '09:00 AM - 12:00 PM', term: 'Term 1', icon: '🌐', bg: 'bg-purple-50 text-purple-600', code: 'SST-101', syllabus: ['The Rise of Nationalism in Europe', 'Resources and Development', 'Power Sharing'] },
      { id: 5, name: 'Half Yearly Exam', desc: 'Half yearly examination', subject: 'Hindi', date: '07 Jun 2024', day: 'Fri', time: '09:00 AM - 12:00 PM', term: 'Term 1', icon: '📝', bg: 'bg-rose-50 text-rose-600', code: 'HIN-101', syllabus: ['Section A: Unseen Passages', 'Section B: Grammar & Composition', 'Literature Prose: Chapters 1-3'] }
    ],
    recentResults: [
      { subject: 'Mathematics', type: 'Unit Test', date: '10 May 2024', grade: 'A+', score: '95%', icon: '📐', bg: 'bg-blue-50 text-blue-600' },
      { subject: 'Science', type: 'Unit Test', date: '08 May 2024', grade: 'A', score: '88%', icon: '🧪', bg: 'bg-emerald-50 text-emerald-600' },
      { subject: 'English', type: 'Unit Test', date: '06 May 2024', grade: 'A', score: '82%', icon: '📖', bg: 'bg-amber-50 text-amber-600' }
    ]
  };

  // Dynamic filter processing based on term dropdown state selection
  const currentMetrics = examDatabase.metrics[selectedTerm] || examDatabase.metrics['All Terms'];
  const filteredExams = useMemo(() => {
    if (selectedTerm === 'All Terms') return examDatabase.upcomingExams;
    return examDatabase.upcomingExams.filter(exam => exam.term === selectedTerm);
  }, [selectedTerm]);

  // Calendar render matching image markers for May 2024 configuration
  const calendarDays = [
    { day: 28, isCurrentMonth: false }, { day: 29, isCurrentMonth: false }, { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true }, { day: 2, isCurrentMonth: true }, { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true, type: 'exam' }, { day: 6, isCurrentMonth: true }, { day: 7, isCurrentMonth: true, type: 'exam' }, { day: 8, isCurrentMonth: true }, { day: 9, isCurrentMonth: true }, { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true }, { day: 13, isCurrentMonth: true }, { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true }, { day: 16, isCurrentMonth: true, type: 'today' }, { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true }, { day: 20, isCurrentMonth: true, type: 'exam' }, { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true, type: 'result' }, { day: 23, isCurrentMonth: true }, { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true }, { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true }, { day: 30, isCurrentMonth: true }, { day: 31, isCurrentMonth: true }, { day: 1, isCurrentMonth: false }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none relative">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-blue-600 cursor-pointer hover:underline">Dashboard</span>
            <span className="text-slate-400 font-normal">&gt;</span>
            <span className="text-slate-400 font-medium">Exams</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#1E293B] tracking-tight mt-1">Exams</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">View your upcoming exams and exam results</p>
        </div>
        
        {/* Term Switcher Filter Select */}
        <div className="relative shrink-0">
          <select 
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold pl-4 pr-10 py-2.5 rounded-xl shadow-sm focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <option value="All Terms">All Terms</option>
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* METRICS GRID DECK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><FileText size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Upcoming Exams</span>
            <span className="text-xl font-black text-blue-600 leading-tight block mt-0.5">{currentMetrics.upcoming}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">This Term</span>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><BookOpen size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Completed Exams</span>
            <span className="text-xl font-black text-emerald-600 leading-tight block mt-0.5">{currentMetrics.completed}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">This Term</span>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0"><Award size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Average Score</span>
            <span className="text-xl font-black text-amber-600 leading-tight block mt-0.5">{currentMetrics.avgScore}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">This Term</span>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Trophy size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Highest Score</span>
            <span className="text-xl font-black text-purple-600 leading-tight block mt-0.5">{currentMetrics.highest}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{currentMetrics.highestSub}</span>
          </div>
        </div>
      </div>

      {/* CORE WORKSPACE SPLIT BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
        
        {/* LEFT COLUMN: UPCOMING EXAMS LIST TABLE */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between min-h-[500px]">
          <div>
            <div className="p-5 border-b border-slate-50">
              <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase">Upcoming Exams</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[11px] font-semibold whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-5">Exam Name</th>
                    <th className="py-3.5 px-5">Subject</th>
                    <th className="py-3.5 px-5">Date</th>
                    <th className="py-3.5 px-5">Time</th>
                    <th className="py-3.5 px-5">Term</th>
                    <th className="py-3.5 px-5 text-center">Syllabus</th>
                    <th className="py-3.5 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {filteredExams.length > 0 ? (
                    filteredExams.map((exam) => (
                      <tr key={exam.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-4 px-5">
                          <span className="text-slate-900 font-black block">{exam.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{exam.desc}</span>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-normal border border-black/5 ${exam.bg}`}>{exam.icon}</span>
                            <span className="text-slate-800 font-bold">{exam.subject}</span>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <span className="text-slate-900 font-bold block">{exam.date}</span>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{exam.day}</span>
                        </td>
                        <td className="py-4 px-5 text-slate-500 font-medium">{exam.time}</td>
                        <td className="py-4 px-5">
                          <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 border border-blue-100 rounded-md tracking-wide">
                            {exam.term}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-center">
                          <button 
                            onClick={() => setActiveModal({ type: 'syllabus', exam })}
                            className="text-blue-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                          >
                            View Syllabus
                          </button>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button 
                            onClick={() => setActiveModal({ type: 'details', exam })}
                            className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-0.5 ml-auto text-[11px] cursor-pointer"
                          >
                            Details <span className="text-xs font-normal">&gt;</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-slate-400 font-medium">No upcoming exams found scheduled for this selection term.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 border-t border-slate-50 flex justify-center bg-slate-50/30">
            <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer">
              📁 View All Exams
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: CALENDAR & RECENT EXAM RESULTS */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Calendar Block Component Grid */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-xs font-black text-slate-900 tracking-tight">Exam Calendar</h3>
              <div className="flex items-center gap-3 text-slate-600">
                <button className="hover:bg-slate-100 p-1 rounded-lg transition-colors cursor-pointer"><ChevronLeft size={13} /></button>
                <span className="text-[11px] font-black text-slate-800">May 2024</span>
                <button className="hover:bg-slate-100 p-1 rounded-lg transition-colors cursor-pointer"><ChevronRight size={13} /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>

            <div className="grid grid-cols-7 text-center gap-y-3.5 text-xs font-bold text-slate-700">
              {calendarDays.map((cell, idx) => {
                let cellClass = cell.isCurrentMonth ? "text-slate-800 font-bold" : "text-slate-300 font-medium";
                if (cell.type === 'today') cellClass = "bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mx-auto";
                if (cell.type === 'exam') cellClass = "bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto shadow-sm shadow-blue-600/20";
                if (cell.type === 'result') cellClass = "bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto shadow-sm shadow-emerald-500/20";

                return (
                  <div key={idx} className="h-5 flex items-center justify-center">
                    <span className={`text-[11px] ${cellClass}`}>{cell.day}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-50 text-[9px] font-black text-slate-400 mt-4 px-1">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600" /> Exam Date</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Result Declared</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-300" /> Today</div>
            </div>
          </div>

          {/* Recent Performance Results Panel List */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-50 mb-4">
                <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase">Recent Results</h3>
                <span className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">View All</span>
              </div>

              <div className="space-y-4">
                {examDatabase.recentResults.map((res, idx) => (
                  <div key={idx} className="flex items-center justify-between text-left border-b border-slate-50/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center border border-black/5 text-sm ${res.bg}`}>{res.icon}</span>
                      <div>
                        <span className="text-[11px] font-black text-slate-900 block">{res.subject} - {res.type}</span>
                        <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{res.date} <span className="mx-1">|</span> Grade: {res.grade}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-black ${idx === 0 ? 'text-emerald-600' : idx === 1 ? 'text-emerald-500' : 'text-amber-500'}`}>{res.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-4 bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 text-[11px] font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer">
              📈 View Detailed Results
            </button>
          </div>

        </div>
      </div>

      {/* DISMISSIBLE EXAM TIPS BANNER FOOTER */}
      {showTipsBanner && (
        <div className="bg-[#EEF2FF] border border-blue-100 rounded-2xl p-4 flex items-start sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-start sm:items-center gap-4">
            <span className="text-2xl shrink-0">📋</span>
            <div className="text-left">
              <h4 className="text-xs font-black text-slate-900 tracking-tight">Exam Tips</h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Prepare well and manage your time effectively during exams. Good luck!</p>
            </div>
          </div>
          <button 
            onClick={() => setShowTipsBanner(false)}
            className="text-slate-400 hover:text-slate-600 p-1 bg-white/80 rounded-lg border border-slate-200/40 shadow-sm transition-colors cursor-pointer"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* MODAL SYSTEM (Syllabus / Details Popups Overlay) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-100 p-5 space-y-4 text-left relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <X size={14} />
            </button>

            {activeModal.type === 'syllabus' ? (
              <>
                <div className="flex items-center gap-2 text-blue-600 font-black text-sm">
                  <span>📖</span> {activeModal.exam.subject} Syllabus
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Exam Category</span>
                  <span className="text-xs font-bold text-slate-800">{activeModal.exam.name} ({activeModal.exam.code})</span>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">Chapters & Chapters Included:</span>
                  <ul className="space-y-1.5">
                    {activeModal.exam.syllabus.map((chapter, index) => (
                      <li key={index} className="text-xs text-slate-600 font-semibold flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span> {chapter}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                  <Info size={16} className="text-blue-600" /> Examination Slot Parameters
                </div>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden text-xs">
                  <div className="p-2.5 flex justify-between bg-slate-50/50"><span className="text-slate-400 font-bold">Subject:</span><span className="font-extrabold text-slate-800">{activeModal.exam.subject}</span></div>
                  <div className="p-2.5 flex justify-between"><span className="text-slate-400 font-bold">Test Level:</span><span className="font-extrabold text-slate-800">{activeModal.exam.name}</span></div>
                  <div className="p-2.5 flex justify-between bg-slate-50/50"><span className="text-slate-400 font-bold">Date Window:</span><span className="font-extrabold text-slate-800">{activeModal.exam.date} ({activeModal.exam.day})</span></div>
                  <div className="p-2.5 flex justify-between"><span className="text-slate-400 font-bold">Timing Blocks:</span><span className="font-extrabold text-slate-500 font-mono">{activeModal.exam.time}</span></div>
                  <div className="p-2.5 flex justify-between bg-slate-50/50"><span className="text-slate-400 font-bold">Term Scope:</span><span className="font-extrabold text-blue-600">{activeModal.exam.term}</span></div>
                </div>
                <div className="text-[10px] text-slate-400 font-medium bg-amber-50/60 text-amber-800 p-2.5 rounded-lg border border-amber-100">
                  ⚠️ Attendance is mandatory. Bring standard geometry instrumentation kits and identity badges to your respective block.
                </div>
              </>
            )}

            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer text-center block"
            >
              Acknowledge and Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExamsView;