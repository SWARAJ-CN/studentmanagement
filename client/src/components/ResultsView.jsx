import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { 
  FileText, 
  Award, 
  BarChart2, 
  TrendingUp, 
  Download, 
  ChevronDown,
  Quote
} from 'lucide-react';

// Custom component to center text inside the MUI Pie Chart safely
const StyledText = styled('text')(({ theme }) => ({
  fill: '#0F172A',
  textAnchor: 'middle',
  dominantBaseline: 'central',
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <g>
      <StyledText x={left + width / 2} y={top + height / 2 - 8} style={{ fontSize: '16px', fontWeight: 900 }}>
        {primaryText}
      </StyledText>
      <StyledText x={left + width / 2} y={top + height / 2 + 10} style={{ fontSize: '10px', fontWeight: 700, fill: '#64748B' }}>
        {secondaryText}
      </StyledText>
    </g>
  );
}

const ResultsView = () => {
  const [selectedGlobalTerm, setSelectedGlobalTerm] = useState('All Terms');
  const [activeTab, setActiveTab] = useState('term1');
  const [isDownloading, setIsDownloading] = useState(false);

  // Structural Datasets mirroring the exact values from the interface image
  const metricsData = {
    'All Terms': { percentage: '87.4%', grade: 'A', highest: '98/100', totalMarks: '437/500', classRank: '5 / 40' },
    'Term 1': { percentage: '87.4%', grade: 'A', highest: '98/100', totalMarks: '437/500', classRank: '5 / 40' },
    'Term 2': { percentage: '0.0%', grade: 'N/A', highest: '0/100', totalMarks: '0/500', classRank: 'N/A' },
  };

  const subjectMarks = [
    { subject: 'Mathematics', max: 100, obtained: 98, pct: '98%', grade: 'A+', icon: '📐', color: 'bg-blue-50 text-blue-600' },
    { subject: 'Science', max: 100, obtained: 87, pct: '87%', grade: 'A', icon: '🧪', color: 'bg-emerald-50 text-emerald-600' },
    { subject: 'English', max: 100, obtained: 82, pct: '82%', grade: 'A', icon: '📖', color: 'bg-amber-50 text-amber-600' },
    { subject: 'Social Science', max: 100, obtained: 84, pct: '84%', grade: 'A', icon: '🌐', color: 'bg-purple-50 text-purple-600' },
    { subject: 'Hindi', max: 100, obtained: 86, pct: '86%', grade: 'A', icon: '📝', color: 'bg-rose-50 text-rose-600' },
  ];

  const pieChartData = [
    { value: 2, label: 'Above 90%', color: '#22C55E' },
    { value: 3, label: '75% - 90%', color: '#3B82F6' },
    { value: 0, label: '60% - 75%', color: '#F59E0B' },
    { value: 0, label: 'Below 60%', color: '#EF4444' },
    { value: 0, label: 'Absent', color: '#A855F7' },
  ];

  const currentMetrics = metricsData[selectedGlobalTerm] || metricsData['All Terms'];

  const handleDownloadReport = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert('PDF Result sheet generated successfully!');
    }, 1200);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none">
      
      {/* HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-blue-600 cursor-pointer hover:underline">Dashboard</span>
            <span className="text-slate-400 font-normal">&gt;</span>
            <span className="text-slate-400 font-medium">Results</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">Results</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Check your exam results and performance</p>
        </div>

        <div className="relative">
          <select 
            value={selectedGlobalTerm}
            onChange={(e) => setSelectedGlobalTerm(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold pl-4 pr-10 py-2.5 rounded-xl shadow-sm focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <option value="All Terms">All Terms</option>
            <option value="Term 1">Term 1 (2024-25)</option>
            <option value="Term 2">Term 2 (2024-25)</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* METRIC SCORE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><FileText size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Overall Percentage</span>
            <span className="text-xl font-black text-blue-600 leading-tight block mt-0.5">{currentMetrics.percentage}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Grade: {currentMetrics.grade}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Award size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Highest Marks</span>
            <span className="text-xl font-black text-emerald-600 leading-tight block mt-0.5">{currentMetrics.highest}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Mathematics</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0"><BarChart2 size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Total Marks Obtained</span>
            <span className="text-xl font-black text-amber-600 leading-tight block mt-0.5">{currentMetrics.totalMarks}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">This Term</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><TrendingUp size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Class Rank</span>
            <span className="text-xl font-black text-purple-600 leading-tight block mt-0.5">{currentMetrics.classRank}</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">This Term</span>
          </div>
        </div>
      </div>

      {/* CORE SPLIT INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: MARKS GRID PANEL & REMARKS */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-5">
            {/* Nav Switch Tabs */}
            <div className="flex border-b border-slate-100 gap-6 mb-5 text-xs font-bold whitespace-nowrap overflow-x-auto scrollbar-none">
              <button 
                onClick={() => setActiveTab('term1')}
                className={`pb-3 transition-all cursor-pointer border-b-2 ${activeTab === 'term1' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Term 1 (2024-25)
              </button>
              <button 
                onClick={() => setActiveTab('term2')}
                className={`pb-3 transition-all cursor-pointer border-b-2 ${activeTab === 'term2' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Term 2 (2024-25)
              </button>
              <button 
                onClick={() => setActiveTab('final')}
                className={`pb-3 transition-all cursor-pointer border-b-2 ${activeTab === 'final' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Final Result (2024-25)
              </button>
              <button 
                onClick={() => setActiveTab('previous')}
                className={`pb-3 transition-all cursor-pointer border-b-2 ${activeTab === 'previous' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Previous Results
              </button>
            </div>

            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase mb-4">Subject-wise Marks</h3>
            
            {/* Data Grid Table layout */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-semibold whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4 text-center">Max Marks</th>
                    <th className="py-3 px-4 text-center">Marks Obtained</th>
                    <th className="py-3 px-4 text-center">Percentage</th>
                    <th className="py-3 px-4 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {activeTab === 'term1' ? (
                    <>
                      {subjectMarks.map((row, index) => (
                        <tr key={index} className="hover:bg-slate-50/30">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <span className={`w-7 h-7 rounded-lg border border-black/5 flex items-center justify-center text-xs ${row.color}`}>{row.icon}</span>
                              <span className="text-slate-800 font-bold">{row.subject}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-500">{row.max}</td>
                          <td className="py-3.5 px-4 text-center font-extrabold text-emerald-600">{row.obtained}</td>
                          <td className="py-3.5 px-4 text-center font-extrabold text-emerald-600">{row.pct}</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className={`text-xs font-black px-2 py-0.5 rounded-md ${row.grade === 'A+' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                              {row.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {/* Total row */}
                      <tr className="bg-slate-50/30 font-black text-slate-900 border-t border-slate-100">
                        <td className="py-3.5 px-4 text-slate-900 font-black">Total</td>
                        <td className="py-3.5 px-4 text-center">500</td>
                        <td className="py-3.5 px-4 text-center text-slate-900">437</td>
                        <td className="py-3.5 px-4 text-center text-emerald-600">87.4%</td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-xs font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">A</span>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-slate-400 font-medium">No results data posted yet for this chosen tab duration window.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* TEACHER REMARKS CARDS */}
          {activeTab === 'term1' && (
            <div className="bg-[#FFFDF5] border border-amber-100/70 rounded-2xl p-5 relative overflow-hidden flex flex-col md:flex-row gap-4 items-start">
              <Quote size={48} className="absolute right-4 top-2 text-amber-200/40 transform scale-x-[-1] pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" 
                alt="Teacher Profile" 
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-200 shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-amber-700 tracking-wide block">Class Teacher's Remarks</span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "Arjun is a bright student with excellent performance. He shows great understanding of concepts and participates actively in class. Keep up the good work!"
                </p>
                <div className="pt-2">
                  <span className="text-xs font-black text-slate-800 block">Mrs. Neha Verma</span>
                  <span className="text-[10px] text-slate-400 font-bold block">Class Teacher <span className="mx-1">•</span> Date: 20 May 2024</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: MUI CHART PERFORMANCE & DOWNLOAD ACTIONS */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Performance Overview Donut Panel Container */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-4">Performance Overview</h3>
            
            <div className="flex justify-center items-center h-48 relative -mx-4">
              <PieChart
                series={[
                  {
                    data: pieChartData,
                    innerRadius: 62,
                    outerRadius: 80,
                    paddingAngle: 2,
                    cornerRadius: 4,
                  },
                ]}
                width={240}
                height={180}
                slotProps={{ legend: { hidden: true } }}
              >
                <PieCenterLabel primaryText="437" secondaryText="500" />
              </PieChart>
            </div>

            {/* Custom Matching UI Legends Column */}
            <div className="space-y-2.5 mt-2 text-[11px] font-bold text-slate-600">
              {pieChartData.map((legend, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: legend.color }} />
                    <span className="text-slate-500">{legend.label}</span>
                  </div>
                  <span className="text-slate-900 font-black">{legend.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GRADE SCALE LEGENDS SCHEME */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-3">Grade Scale</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-semibold text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400">90% - 100%</span><span className="font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">A+</span></div>
              <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400">Outstanding</span><span className="font-bold text-slate-800">Excellent</span></div>
              <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400">75% - 89%</span><span className="font-black text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">A</span></div>
              <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400">Good</span><span className="font-bold text-slate-800">Average</span></div>
              <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400">60% - 74%</span><span className="font-black text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">B</span></div>
              <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400">45% - 59%</span><span className="font-black text-purple-500 bg-purple-50 px-1.5 py-0.5 rounded">C</span></div>
              <div className="flex justify-between py-1"><span className="text-slate-400">Below 45%</span><span className="font-black text-red-500 bg-red-50 px-1.5 py-0.5 rounded">D</span></div>
              <div className="flex justify-between py-1"><span className="text-slate-400">Needs Improvement</span><span className="font-bold text-slate-800">Fail</span></div>
            </div>
          </div>

          {/* DOWNLOAD DOCUMENT MODULE */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="text-left">
              <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase">Download Result</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Download your results scorecard sheet statement in secure PDF parameters format.</p>
            </div>
            <button 
              onClick={handleDownloadReport}
              disabled={isDownloading}
              className="w-full bg-white hover:bg-slate-50 disabled:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Download size={14} className={isDownloading ? "animate-bounce text-blue-500" : "text-slate-400"} />
              {isDownloading ? "Compiling Document..." : "Download Result (PDF)"}
            </button>
          </div>

        </div>
      </div>

      {/* FOOTER TIMESTAMPS BAR */}
      <div className="mt-8 pt-4 border-t border-slate-200/60 text-center text-[10px] font-bold text-slate-400">
        © 2024 Student Management System. All rights reserved.
      </div>

    </div>
  );
};

export default ResultsView;