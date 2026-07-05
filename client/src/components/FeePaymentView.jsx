import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { 
  CreditCard, 
  Wallet, 
  FileCheck2, 
  CalendarDays,
  Download,
  ExternalLink,
  ChevronDown,
  Info,
  Calendar
} from 'lucide-react';

// Custom component to safely center absolute text inside the MUI Pie Chart boundary
const StyledText = styled('text')(({ theme }) => ({
  fill: '#0F172A',
  textAnchor: 'middle',
  dominantBaseline: 'central',
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <g>
      <StyledText x={left + width / 2} y={top + height / 2 - 8} style={{ fontSize: '15px', fontWeight: 900 }}>
        {primaryText}
      </StyledText>
      <StyledText x={left + width / 2} y={top + height / 2 + 10} style={{ fontSize: '10px', fontWeight: 700, fill: '#64748B' }}>
        {secondaryText}
      </StyledText>
    </g>
  );
}

const FeePaymentView = () => {
  const [academicYear, setAcademicYear] = useState('2024-25');
  const [isProcessing, setIsProcessing] = useState(false);

  // Structural breakdown figures from user specification dashboard images
  const summaryParticulars = [
    { name: 'Tuition Fee', term1: 6000, term2: 6000, term3: 6000, total: 18000 },
    { name: 'Admission Fee', term1: 2000, term2: 0, term3: 0, total: 2000 },
    { name: 'Development Fee', term1: 1500, term2: 1500, term3: 1500, total: 4500 },
    { name: 'Library Fee', term1: 500, term2: 0, term3: 0, total: 500 },
    { name: 'Examination Fee', term1: 1000, term2: 0, term3: 0, total: 1000 },
  ];

  const transactionHistory = [
    { id: 'RCP001245', date: '10 Apr 2024', term: 'Term 1', amount: '₹ 11,000', type: 'Online (UPI)', status: 'Paid' },
    { id: 'RCP001246', date: '12 Dec 2024', term: 'Term 2 (Partial)', amount: '₹ 5,000', type: 'Net Banking', status: 'Partial' },
    { id: 'RCP001247', date: '—', term: 'Term 2 (Due)', amount: '₹ 2,500', type: '—', status: 'Pending' },
    { id: 'RCP001248', date: '—', term: 'Term 3', amount: '₹ 7,500', type: '—', status: 'Pending' },
  ];

  const chartAllocation = [
    { value: 16000, label: 'Paid Amount', color: '#10B981' },
    { value: 8000, label: 'Due Amount', color: '#EF4444' }
  ];

  const handlePaymentTrigger = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Redirecting secure gateway connection interface instance details safely...');
    }, 1000);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none">
      
      {/* HEADER NAVIGATION ROW */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span className="text-blue-600 cursor-pointer hover:underline">Dashboard</span>
          <span className="text-slate-400 font-normal">&gt;</span>
          <span className="text-slate-400 font-medium">Fee Details</span>
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">Fee Details</h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">View your fee summary, payment history and due amounts</p>
      </div>

      {/* OVERVIEW SCORE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><CreditCard size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Total Fees</span>
            <span className="text-xl font-black text-slate-900 leading-tight block mt-0.5">₹ 24,000</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">This Year</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Wallet size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Total Paid</span>
            <span className="text-xl font-black text-emerald-600 leading-tight block mt-0.5">₹ 16,000</span>
            <span className="text-[10px] text-slate-500 font-bold block mt-0.5">66.67% Paid</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><FileCheck2 size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Due Amount</span>
            <span className="text-xl font-black text-amber-600 leading-tight block mt-0.5">₹ 8,000</span>
            <span className="text-[10px] text-red-500 font-bold block mt-0.5">Due</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><CalendarDays size={20} /></span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Next Due Date</span>
            <span className="text-xl font-black text-purple-600 leading-tight block mt-0.5">15 Jun 2026</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Term 2 Fee</span>
          </div>
        </div>
      </div>

      {/* CORE MATRIX SPLIT SCREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COMPONENT COLUMN: GRID BREAKDOWNS & STATEMENTS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* FEE SUMMARY CARD BLOCK */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50 pb-4 mb-4">
              <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase">Fee Summary (2024-25)</h3>
              <div className="relative self-start sm:self-auto">
                <select 
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-slate-700 text-[11px] font-bold pl-3 pr-8 py-1.5 rounded-lg shadow-sm focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <option value="2024-25">Academic Year 2024-25</option>
                  <option value="2025-26">Academic Year 2025-26</option>
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Matrix Data Grid Table layout */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-semibold whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-4">Particulars</th>
                    <th className="py-2.5 px-4 text-center">Term 1</th>
                    <th className="py-2.5 px-4 text-center">Term 2</th>
                    <th className="py-2.5 px-4 text-center">Term 3</th>
                    <th className="py-2.5 px-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {summaryParticulars.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50/30">
                      <td className="py-3 px-4 font-bold text-slate-800">{row.name}</td>
                      <td className="py-3 px-4 text-center">{row.term1 ? `₹ ${row.term1.toLocaleString()}` : '—'}</td>
                      <td className="py-3 px-4 text-center">{row.term2 ? `₹ ${row.term2.toLocaleString()}` : '—'}</td>
                      <td className="py-3 px-4 text-center">{row.term3 ? `₹ ${row.term3.toLocaleString()}` : '—'}</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">₹ {row.total.toLocaleString()}</td>
                    </tr>
                  ))}
                  {/* Summary Metric Aggregates */}
                  <tr className="bg-slate-50/40 font-black text-slate-900 border-t border-slate-100">
                    <td className="py-3 px-4 text-slate-900">Total</td>
                    <td className="py-3 px-4 text-center">₹ 11,000</td>
                    <td className="py-3 px-4 text-center">₹ 7,500</td>
                    <td className="py-3 px-4 text-center">₹ 7,500</td>
                    <td className="py-3 px-4 text-right text-slate-900">₹ 26,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom aggregate horizontal banner blocks layout */}
            <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 mt-4 text-center text-[10px] font-bold uppercase tracking-wide">
              <div className="bg-purple-50/40 p-2.5 rounded-xl border border-purple-100/30">
                <span className="text-slate-400 block">Total Fees</span>
                <span className="text-xs font-black text-purple-700 block mt-0.5">₹ 24,000</span>
              </div>
              <div className="bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100/30">
                <span className="text-slate-400 block">Total Paid</span>
                <span className="text-xs font-black text-emerald-600 block mt-0.5">₹ 16,000</span>
              </div>
              <div className="bg-rose-50/40 p-2.5 rounded-xl border border-rose-100/30">
                <span className="text-slate-400 block">Due Amount</span>
                <span className="text-xs font-black text-rose-600 block mt-0.5">₹ 8,000</span>
              </div>
            </div>
          </div>

          {/* PAYMENT HISTORY DATA GRID */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-4">Payment History</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-semibold whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-4">Receipt No.</th>
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4">Term</th>
                    <th className="py-2.5 px-4">Amount</th>
                    <th className="py-2.5 px-4">Payment Mode</th>
                    <th className="py-2.5 px-4 text-center">Status</th>
                    <th className="py-2.5 px-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {transactionHistory.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/30">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{tx.id}</td>
                      <td className="py-3.5 px-4 text-slate-500">{tx.date}</td>
                      <td className="py-3.5 px-4 text-slate-700">{tx.term}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{tx.amount}</td>
                      <td className="py-3.5 px-4 text-slate-500">{tx.type}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block ${
                          tx.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                          tx.status === 'Partial' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {tx.status !== 'Pending' ? (
                          <button className="text-blue-500 hover:text-blue-700 cursor-pointer p-1 rounded transition-colors inline-flex items-center">
                            <Download size={13} />
                          </button>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="w-full mt-4 text-center text-[11px] font-bold text-blue-600 border border-slate-100 hover:bg-slate-50 py-2 rounded-xl transition-all cursor-pointer">
              View All Payments
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN COMPONENT PANELS: VISUAL CHART & QUICK ACTIONS */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* PAYMENT STATUS GRAPH DONUT CARD */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-4">Payment Status</h3>
            
            <div className="flex justify-center items-center h-44 relative">
              <PieChart
                series={[
                  {
                    data: chartAllocation,
                    innerRadius: 58,
                    outerRadius: 74,
                    paddingAngle: 3,
                    cornerRadius: 5,
                  },
                ]}
                width={200}
                height={160}
                slotProps={{ legend: { hidden: true } }}
              >
                <PieCenterLabel primaryText="66.67%" secondaryText="Paid" />
              </PieChart>
            </div>

            {/* Legend indicators */}
            <div className="space-y-2 mt-2 text-[11px] font-bold text-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-400">Paid Amount</span>
                </div>
                <span className="text-slate-900 font-black">₹ 16,000 (66.67%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-slate-400">Due Amount</span>
                </div>
                <span className="text-slate-900 font-black">₹ 8,000 (33.33%)</span>
              </div>
            </div>

            {/* Alert Context parameters display prompt block */}
            <div className="mt-5 bg-[#FFFBF5] border border-amber-100/60 rounded-xl p-3 flex gap-2.5 items-start">
              <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-amber-800">You have an outstanding amount of</p>
                <p className="text-base font-black text-amber-900 mt-0.5">₹ 8,000</p>
                <p className="text-[9px] text-slate-400 font-medium mt-0.5">Please pay before the due date to avoid late fee additions.</p>
                <button 
                  onClick={handlePaymentTrigger}
                  disabled={isProcessing}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-4 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <CreditCard size={12} />
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </div>
          </div>

          {/* IMPORTANT DEADLINES SCHEME MODULE */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-3">Important Dates</h3>
            <div className="space-y-3">
              <div className="flex items-start justify-between border-b border-slate-50 pb-2">
                <div>
                  <h5 className="text-[11px] font-bold text-slate-800">Term 2 Fee Due Date</h5>
                  <p className="text-[9px] text-slate-400 font-medium flex items-center gap-1 mt-0.5"><Calendar size={10}/> 15 Jun 2026</p>
                </div>
                <span className="text-[9px] font-black uppercase text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Due Soon</span>
              </div>
              <div className="flex items-start justify-between border-b border-slate-50 pb-2">
                <div>
                  <h5 className="text-[11px] font-bold text-slate-800">Term 3 Fee Due Date</h5>
                  <p className="text-[9px] text-slate-400 font-medium flex items-center gap-1 mt-0.5"><Calendar size={10}/> 15 Sep 2026</p>
                </div>
                <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Upcoming</span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-[11px] font-bold text-slate-800">Late Fee Applicable After</h5>
                  <p className="text-[9px] text-slate-400 font-medium flex items-center gap-1 mt-0.5"><Calendar size={10}/> 20 Jun 2026</p>
                </div>
                <span className="text-[9px] font-black uppercase text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded cursor-pointer hover:bg-slate-100">Info</span>
              </div>
            </div>
          </div>

          {/* ACTION LINKS HUB PANEL */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2 text-[11px] font-bold">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase pb-2">Quick Actions</h3>
            <button className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-100 py-2 px-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer">
              <span className="flex items-center gap-2 text-slate-600"><Download size={13} className="text-slate-400"/> Download Fee Structure</span>
              <ExternalLink size={12} className="text-slate-300"/>
            </button>
            <button className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-100 py-2 px-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer">
              <span className="flex items-center gap-2 text-slate-600"><Info size={13} className="text-slate-400"/> View Payment Instructions</span>
              <ExternalLink size={12} className="text-slate-300"/>
            </button>
            <button className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-100 py-2 px-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer">
              <span className="flex items-center gap-2 text-slate-600"><Wallet size={13} className="text-slate-400"/> Contact Accounts Office</span>
              <ExternalLink size={12} className="text-slate-300"/>
            </button>
          </div>

        </div>
      </div>

      {/* BOTTOM CONTEXT FOOTER INFO FLAG */}
      <div className="mt-6 bg-blue-50/30 border border-blue-100/40 rounded-xl p-3 flex items-center gap-2.5">
        <Info size={14} className="text-blue-500 shrink-0" />
        <p className="text-[10px] font-semibold text-slate-500">
          If you have any queries regarding your fees, please contact the school accounts office at <span className="text-slate-700 font-bold">accounts@school.com</span> or call <span className="text-slate-700 font-bold">+91 98765 43210</span>.
        </p>
      </div>

    </div>
  );
};

export default FeePaymentView;