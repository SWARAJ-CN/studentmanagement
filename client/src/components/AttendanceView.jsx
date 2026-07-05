import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';

const AttendanceView = () => {
  // Real mock database containing extensive records to make pagination functional
  const initialRecords = [
    // Page 1 Data (From the image)
    { date: '16 May 2024', day: 'Thursday', subject: 'Mathematics', status: 'Present', remarks: '-' },
    { date: '16 May 2024', day: 'Thursday', subject: 'English', status: 'Present', remarks: '-' },
    { date: '16 May 2024', day: 'Thursday', subject: 'Science', status: 'Absent', remarks: 'Medical Leave' },
    { date: '15 May 2024', day: 'Wednesday', subject: 'Social Science', status: 'Present', remarks: '-' },
    { date: '15 May 2024', day: 'Wednesday', subject: 'Hindi', status: 'Present', remarks: '-' },
    { date: '15 May 2024', day: 'Wednesday', subject: 'Computer', status: 'Present', remarks: '-' },
    // Page 2 Mock Data
    { date: '14 May 2024', day: 'Tuesday', subject: 'Mathematics', status: 'Present', remarks: '-' },
    { date: '14 May 2024', day: 'Tuesday', subject: 'English', status: 'Present', remarks: '-' },
    { date: '13 May 2024', day: 'Monday', subject: 'Science', status: 'Present', remarks: '-' },
    { date: '13 May 2024', day: 'Monday', subject: 'Social Science', status: 'Present', remarks: '-' },
    { date: '10 May 2024', day: 'Friday', status: 'Holiday', subject: 'All Subjects', remarks: 'National Holiday' },
    { date: '09 May 2024', day: 'Thursday', subject: 'Hindi', status: 'Present', remarks: '-' },
    // Page 3 Mock Data
    { date: '08 May 2024', day: 'Wednesday', subject: 'Mathematics', status: 'Present', remarks: '-' },
    { date: '08 May 2024', day: 'Wednesday', subject: 'English', status: 'Absent', remarks: 'Unwell' },
    { date: '07 May 2024', day: 'Tuesday', subject: 'Science', status: 'Present', remarks: '-' },
    { date: '07 May 2024', day: 'Tuesday', subject: 'Social Science', status: 'Present', remarks: '-' },
    { date: '06 May 2024', day: 'Monday', subject: 'Hindi', status: 'Present', remarks: '-' },
    { date: '06 May 2024', day: 'Monday', subject: 'Computer', status: 'Present', remarks: '-' },
    // Page 4 Mock Data
    { date: '03 May 2024', day: 'Friday', subject: 'Mathematics', status: 'Present', remarks: '-' },
    { date: '03 May 2024', day: 'Friday', subject: 'English', status: 'Present', remarks: '-' },
    { date: '02 May 2024', day: 'Thursday', subject: 'Science', status: 'Present', remarks: '-' },
    { date: '02 May 2024', day: 'Thursday', subject: 'Social Science', status: 'Present', remarks: '-' },
    { date: '01 May 2024', day: 'Wednesday', subject: 'Hindi', status: 'Absent', remarks: 'Family Event' },
    { date: '01 May 2024', day: 'Wednesday', subject: 'Computer', status: 'Present', remarks: '-' },
    // Page 5 Mock Data
    { date: '30 Apr 2024', day: 'Tuesday', subject: 'Mathematics', status: 'Present', remarks: '-' },
    { date: '30 Apr 2024', day: 'Tuesday', subject: 'English', status: 'Present', remarks: '-' },
    { date: '29 Apr 2024', day: 'Monday', subject: 'Science', status: 'Present', remarks: '-' },
    { date: '29 Apr 2024', day: 'Monday', subject: 'Social Science', status: 'Present', remarks: '-' },
    { date: '26 Apr 2024', day: 'Friday', subject: 'Hindi', status: 'Present', remarks: '-' },
    { date: '26 Apr 2024', day: 'Friday', subject: 'Computer', status: 'Present', remarks: '-' }
  ];

  // Functional Interactive States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter functionality tracking both date queries or subject profiles
  const filteredRecords = useMemo(() => {
    return initialRecords.filter(record => 
      record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination calculation mapping out dynamic slice window
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none animate-fadeIn">
      
      {/* Top Header & Context Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-blue-600 cursor-pointer hover:underline">Dashboard</span>
            <span className="text-slate-400 font-normal">&gt;</span>
            <span className="text-slate-400 font-medium">Attendance</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#1E293B] tracking-tight mt-1">Attendance</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Track your attendance and stay updated</p>
        </div>
        
        {/* Selector Input simulation */}
        <div className="relative shrink-0">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold pl-3 pr-8 py-2 rounded-xl shadow-sm focus:outline-none cursor-pointer">
            <option>May 2024</option>
            <option>April 2024</option>
          </select>
          <Calendar size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Top Row Grid: Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {/* Card 1 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Calendar size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Overall Attendance</span>
            <span className="text-xl font-black text-slate-900 leading-tight block">92%</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Present: 46 <span className="mx-1">|</span> Absent: 4</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Total Working Days</span>
            <span className="text-xl font-black text-slate-900 leading-tight block">50</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">This Month</span>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0"><Clock size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Days Present</span>
            <span className="text-xl font-black text-amber-600 leading-tight block">46</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">This Month</span>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0"><XCircle size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Days Absent</span>
            <span className="text-xl font-black text-rose-500 leading-tight block">4</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">This Month</span>
          </div>
        </div>
      </div>

      {/* Middle Workspace: Calendar Grid & Subject Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
        
        {/* Attendance Matrix Calendar Component */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-900 tracking-tight">Attendance Calendar</h3>
          
          {/* Days Weekdays Grid */}
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>

          {/* Calendar Day Slots Rendering */}
          <div className="grid grid-cols-7 text-center gap-y-4 text-xs font-bold text-slate-700">
            {/* Previous month greyed markers */}
            <span className="text-slate-300 font-medium">29</span>
            <span className="text-slate-300 font-medium">30</span>
            
            {/* Current Month Active Matrix matching image states */}
            <div className="flex flex-col items-center gap-1"><span>1</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>2</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>3</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>4</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span className="text-rose-500">5</span><span className="w-1 h-1 rounded-full bg-rose-500" /></div>
            
            <div className="flex flex-col items-center gap-1"><span>6</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>7</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>8</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>9</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>10</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>11</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span className="text-rose-500">12</span><span className="w-1 h-1 rounded-full bg-rose-500" /></div>

            <div className="flex flex-col items-center gap-1"><span>13</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>14</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>15</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            {/* Selected day highlighted */}
            <div className="flex flex-col items-center gap-1"><span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center -mt-0.5 shadow-sm shadow-blue-600/30">16</span></div>
            <div className="flex flex-col items-center gap-1"><span>17</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>18</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span className="text-rose-500">19</span><span className="w-1 h-1 rounded-full bg-rose-500" /></div>

            <div className="flex flex-col items-center gap-1"><span>20</span><span className="w-1 h-1 rounded-full bg-rose-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>21</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>22</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>23</span><span className="w-1 h-1 rounded-full bg-slate-400" /></div>
            <div className="flex flex-col items-center gap-1"><span>24</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>25</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span className="text-rose-500">26</span><span className="w-1 h-1 rounded-full bg-rose-500" /></div>

            <div className="flex flex-col items-center gap-1"><span>27</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>28</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>29</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>
            <div className="flex flex-col items-center gap-1"><span>30</span><span className="w-1 h-1 rounded-full bg-slate-400" /></div>
            <div className="flex flex-col items-center gap-1"><span>31</span><span className="w-1 h-1 rounded-full bg-emerald-500" /></div>

            {/* Next Month gray placeholders */}
            <span className="text-slate-300 font-medium">1</span>
            <span className="text-slate-300 font-medium text-rose-300">2</span>
          </div>

          {/* Color Guides / Legends Component */}
          <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-50 text-[10px] font-bold text-slate-500">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Present</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Absent</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400" /> Holiday</div>
          </div>
        </div>

        {/* Subject-Wise Attendance Progress Column */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-xs font-black text-slate-900 tracking-tight">Subject-wise Attendance <span className="text-slate-400 font-semibold">(This Month)</span></h3>
          </div>
          <div className="space-y-3.5 text-[10px] font-bold">
            {[
              { name: 'Mathematics', percent: 95, color: 'bg-blue-600' },
              { name: 'English', percent: 92, color: 'bg-emerald-500' },
              { name: 'Science', percent: 90, color: 'bg-amber-500' },
              { name: 'Social Science', percent: 88, color: 'bg-indigo-500' },
              { name: 'Hindi', percent: 94, color: 'bg-rose-500' },
              { name: 'Computer', percent: 93, color: 'bg-cyan-500' },
            ].map((sub, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-slate-600">
                  <span className="font-semibold">{sub.name}</span>
                  <span className="text-slate-900 font-black">{sub.percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${sub.color} rounded-full`} style={{ width: `${sub.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM WORKSPACE PANEL: Data Table Records Log */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Dynamic Controls Header: Title and Search Integration */}
        <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xs font-black text-slate-900 tracking-tight">Attendance Details</h3>
          
          {/* Functional Real-Time Search Bar */}
          <div className="relative w-full sm:w-64">
            <input 
              type="text"
              placeholder="Search by date or subject..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset index on filter action
              }}
              className="w-full bg-slate-50 border border-slate-200 text-[11px] font-medium pl-3 pr-8 py-1.5 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
            />
            <Search size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Core Records Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[11px] font-semibold whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-6 text-blue-600 flex items-center gap-1 cursor-pointer">Date <ArrowUpDown size={10} /></th>
                <th className="py-3 px-6">Day</th>
                <th className="py-3 px-6">Subject</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600">
              {currentRecords.length > 0 ? (
                currentRecords.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-3 px-6 text-slate-900 font-bold">{row.date}</td>
                    <td className="py-3 px-6 text-slate-500 font-medium">{row.day}</td>
                    <td className="py-3 px-6 text-slate-800 font-bold">{row.subject}</td>
                    <td className="py-3 px-6">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border tracking-wide inline-block ${
                        row.status === 'Present' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        row.status === 'Absent' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                        'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-slate-400 font-medium">{row.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400 font-medium">No records found matching your selection.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FUNCTIONAL PAGINATION CONTROLS DECK (1, 2, 3...) */}
        <div className="p-4 bg-white border-t border-slate-50 flex items-center justify-center gap-1">
          {/* Previous Arrow trigger */}
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center transition-all ${
              currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer text-slate-600'
            }`}
          >
            <ChevronLeft size={13} />
          </button>

          {/* Dynamic Numeric Page Indicators */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`w-7 h-7 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                currentPage === pageNumber
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20 border border-blue-600'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {/* Next Arrow trigger */}
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center transition-all ${
              currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer text-slate-600'
            }`}
          >
            <ChevronRight size={13} />
          </button>
        </div>

      </div>

    </div>
  );
};

export default AttendanceView;