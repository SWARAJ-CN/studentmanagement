import React from 'react';
import { PieChart, LineChart } from '@mui/x-charts';
import { 
  CalendarCheck, 
  GraduationCap, 
  FileText, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  TrendingUp, 
  Info,
  CreditCard,
  Megaphone,
  Trophy,
  Sun,
  FlaskConical
} from 'lucide-react';

const OverviewDashboard = () => {

  // 1. Dataset  Pie Chart
  const pieData = [
    { id: 0, value: 3.7, label: 'Physics', color: '#3B82F6', grade: 'A' },
    { id: 1, value: 3.3, label: 'Chemistry', color: '#10B981', grade: 'A-' },
    { id: 2, value: 3.8, label: 'Mathematics', color: '#F59E0B', grade: 'A' },
    { id: 3, value: 3.1, label: 'English', color: '#38BDF8', grade: 'B+' },
    { id: 4, value: 3.9, label: 'Computer Science', color: '#818CF8', grade: 'A' }
  ];

  // 2. Dataset  Line Chart

  const attendanceTrendPoints = [
    { date: 'Apr 28', percentage: 78 },
    { date: 'May 5', percentage: 82 },
    { date: 'May 12', percentage: 79 },
    { date: 'May 19', percentage: 84 },
    { date: 'May 23', percentage: 92.4 },
    { date: 'May 26', percentage: 95 }
  ];

  const xLabels = attendanceTrendPoints.map(point => point.date);
  const lineSeriesData = attendanceTrendPoints.map(point => point.percentage);

  return (
    <div className='space-y-6 animate-fadeIn text-left pb-8 select-none'>
      
      
      <div className='space-y-1'>
        <h1 className='text-2xl font-black text-slate-900 tracking-tight'>Student Dashboard</h1>
        <p className='text-xs text-slate-400 font-semibold'>
          Welcome back, Arjun! 👏 Keep up the great work and continue your learning journey.
        </p>
      </div>

     
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        
        <div className='bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between relative overflow-hidden'>
          <div className='flex items-center gap-3.5'>
            <span className='w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm'>
              <CalendarCheck size={20} />
            </span>
            <div className='space-y-0.5'>
              <span className='text-[11px] text-slate-400 font-bold tracking-wide block uppercase'>Attendance Percentage</span>
              <div className='flex items-baseline gap-1.5'>
                <span className='text-xl font-black text-slate-900'>92.4%</span>
              </div>
              <span className='text-[10px] text-emerald-600 font-bold flex items-center gap-0.5'>
                <TrendingUp size={10} /> ↑ 4.3% <span className='text-slate-400 font-medium'>this month</span>
              </span>
            </div>
          </div>
          <div className='w-16 h-8 opacity-40 shrink-0 self-end mb-1'>
            <svg viewBox="0 0 60 20" className="w-full h-full stroke-blue-500 stroke-[2] fill-none">
              <path d="M0,15 Q15,5 30,12 T60,2" />
            </svg>
          </div>
        </div>

        
        <div className='bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between'>
          <div className='flex items-center gap-3.5'>
            <span className='w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm'>
              <GraduationCap size={20} />
            </span>
            <div className='space-y-0.5'>
              <span className='text-[11px] text-slate-400 font-bold tracking-wide block uppercase'>Current GPA</span>
              <div className='flex items-baseline gap-0.5'>
                <span className='text-xl font-black text-slate-900'>3.68</span>
                <span className='text-xs font-bold text-slate-400'>/ 4.00</span>
              </div>
              <span className='text-[10px] text-emerald-600 font-bold flex items-center gap-1.5'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500' /> Good Standing
              </span>
            </div>
          </div>
        </div>

       
        <div className='bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between'>
          <div className='flex items-center gap-3.5'>
            <span className='w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-sm'>
              <FileText size={20} />
            </span>
            <div className='space-y-0.5'>
              <span className='text-[11px] text-slate-400 font-bold tracking-wide block uppercase'>Pending Assignments</span>
              <span className='text-xl font-black text-slate-900 block'>3</span>
              <span className='text-[10px] text-amber-600 font-bold flex items-center gap-1.5'>
                <span className='w-1.5 h-1.5 rounded-full bg-amber-500' /> Due soon
              </span>
            </div>
          </div>
        </div>

       
        <div className='bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between'>
          <div className='flex items-center gap-3.5'>
            <span className='w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-sm'>
              <Calendar size={20} />
            </span>
            <div className='space-y-0.5'>
              <span className='text-[11px] text-slate-400 font-bold tracking-wide block uppercase'>Upcoming Exams</span>
              <span className='text-xl font-black text-slate-900 block'>2</span>
              <span className='text-[10px] text-purple-600 font-bold flex items-center gap-1.5'>
                <span className='w-1.5 h-1.5 rounded-full bg-purple-500' /> Next: Mathematics
              </span>
            </div>
          </div>
        </div>
      </section>

     
      <section className='grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch'>
        
       
        <div className='xl:col-span-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Clock size={16} className='text-blue-600' />
              <h3 className='text-sm font-black text-slate-900 tracking-tight'>Today's Timetable</h3>
            </div>
            <span className='text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md'>
              May 23, 2024 (Thu)
            </span>
          </div>

          <div className='flex-1 overflow-x-auto overflow-y-hidden'>
            <table className='w-full text-left text-[11px] font-medium text-slate-500 min-w-[300px]'>
              <thead>
                <tr className='border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-wider'>
                  <th className='pb-2 font-bold'>Period</th>
                  <th className='pb-2 font-bold'>Time</th>
                  <th className='pb-2 font-bold'>Subject</th>
                  <th className='pb-2 font-bold'>Room</th>
                  <th className='pb-2 font-bold'>Teacher</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-50/50'>
                <tr className='hover:bg-slate-50/30'><td className='py-2.5 font-bold text-slate-900'>1</td><td className='py-2.5 text-slate-400'>08:00 AM - 08:50 AM</td><td className='py-2.5 text-slate-700 font-semibold'>Physics</td><td className='py-2.5'>Lab 2</td><td className='py-2.5'>Mr. Verma</td></tr>
                <tr className='hover:bg-slate-50/30'><td className='py-2.5 font-bold text-slate-900'>2</td><td className='py-2.5 text-slate-400'>08:50 AM - 09:40 AM</td><td className='py-2.5 text-slate-700 font-semibold'>Chemistry</td><td className='py-2.5'>Lab 1</td><td className='py-2.5'>Ms. Iyer</td></tr>
                <tr className='bg-blue-50/40 text-blue-600 font-bold'><td className='py-1.5'>☕</td><td className='py-1.5 text-[10px]'>09:40 AM - 09:55 AM</td><td colSpan={3} className='py-1.5 text-[10px] tracking-wide uppercase font-black text-left pl-2'>Short Break</td></tr>
                <tr className='hover:bg-slate-50/30'><td className='py-2.5 font-bold text-slate-900'>3</td><td className='py-2.5 text-slate-400'>09:55 AM - 10:45 AM</td><td className='py-2.5 text-slate-700 font-semibold'>Mathematics</td><td className='py-2.5'>Room 204</td><td className='py-2.5'>Mr. Rao</td></tr>
                <tr className='hover:bg-slate-50/30'><td className='py-2.5 font-bold text-slate-900'>4</td><td className='py-2.5 text-slate-400'>10:45 AM - 11:35 AM</td><td className='py-2.5 text-slate-700 font-semibold'>English</td><td className='py-2.5'>Room 101</td><td className='py-2.5'>Ms. D'Souza</td></tr>
                <tr className='hover:bg-slate-50/30'><td className='py-2.5 font-bold text-slate-900'>5</td><td className='py-2.5 text-slate-400'>11:35 AM - 12:25 PM</td><td className='py-2.5 text-slate-700 font-semibold'>Computer Science</td><td className='py-2.5'>Lab 3</td><td className='py-2.5'>Mr. Khan</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        
        <div className='xl:col-span-5 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <FileText size={16} className='text-blue-600' />
              <h3 className='text-sm font-black text-slate-900 tracking-tight'>Upcoming Assignments</h3>
            </div>
            <span className='text-[10px] font-bold text-blue-600 hover:underline cursor-pointer transition-colors'>View All</span>
          </div>

          <div className='flex-1 overflow-x-auto overflow-y-hidden'>
            <table className='w-full text-left text-[11px] font-medium text-slate-500 min-w-[340px]'>
              <thead>
                <tr className='border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-wider'>
                  <th className='pb-2 font-bold'>Subject</th>
                  <th className='pb-2 font-bold'>Assignment</th>
                  <th className='pb-2 font-bold'>Due Date</th>
                  <th className='pb-2 font-bold text-right'>Status</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-50/50 text-slate-700'>
                <tr className='hover:bg-slate-50/30'>
                  <td className='py-3 font-semibold text-slate-900'>Physics</td>
                  <td className='py-3 text-slate-500 font-medium'>Numericals – Chapter 6</td>
                  <td className='py-3 text-slate-400'>May 25, 2024</td>
                  <td className='py-3 text-right'><span className='px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[9px] font-bold tracking-wide uppercase border border-amber-100/40'>Due Soon</span></td>
                </tr>
                <tr className='hover:bg-slate-50/30'>
                  <td className='py-3 font-semibold text-slate-900'>Chemistry</td>
                  <td className='py-3 text-slate-500 font-medium'>Lab Report – Titration</td>
                  <td className='py-3 text-slate-400'>May 27, 2024</td>
                  <td className='py-3 text-right'><span className='px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[9px] font-bold tracking-wide uppercase border border-amber-100/40'>Due Soon</span></td>
                </tr>
                <tr className='hover:bg-slate-50/30'>
                  <td className='py-3 font-semibold text-slate-900'>English</td>
                  <td className='py-3 text-slate-500 font-medium'>Essay Writing</td>
                  <td className='py-3 text-slate-400'>May 30, 2024</td>
                  <td className='py-3 text-right'><span className='px-2 py-0.5 rounded-md bg-blue-50 text-blue-500 text-[9px] font-bold tracking-wide uppercase border border-blue-100/40'>Not Started</span></td>
                </tr>
                <tr className='hover:bg-slate-50/30'>
                  <td className='py-3 font-semibold text-slate-900'>Mathematics</td>
                  <td className='py-3 text-slate-500 font-medium'>Problem Set – Calculus</td>
                  <td className='py-3 text-slate-400'>Jun 02, 2024</td>
                  <td className='py-3 text-right'><span className='px-2 py-0.5 rounded-md bg-blue-50 text-blue-500 text-[9px] font-bold tracking-wide uppercase border border-blue-100/40'>Not Started</span></td>
                </tr>
                <tr className='hover:bg-slate-50/30'>
                  <td className='py-3 font-semibold text-slate-900'>Computer Science</td>
                  <td className='py-3 text-slate-500 font-medium'>Python Programming</td>
                  <td className='py-3 text-slate-400'>Jun 05, 2024</td>
                  <td className='py-3 text-right'><span className='px-2 py-0.5 rounded-md bg-blue-50 text-blue-500 text-[9px] font-bold tracking-wide uppercase border border-blue-100/40'>Not Started</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        
        <div className='xl:col-span-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <GraduationCap size={16} className='text-blue-600' />
              <h3 className='text-sm font-black text-slate-900 tracking-tight'>Subject Performance</h3>
            </div>
            <span className='text-[10px] font-bold text-blue-600 hover:underline cursor-pointer transition-colors'>View Details</span>
          </div>

          <div className='flex-1 flex flex-col sm:flex-row xl:flex-col items-center justify-center gap-3 py-2'>
            {/* Material UI PieChart Configured as Donut */}
            <div className='relative w-32 h-32 flex items-center justify-center shrink-0'>
              <PieChart
                series={[
                  {
                    data: pieData,
                    innerRadius: 38,
                    outerRadius: 48,
                    paddingAngle: 3,
                    cornerRadius: 4,
                  },
                ]}
                width={128}
                height={128}
                slotProps={{ legend: { hidden: true } }} 
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              />
              <div className='absolute text-center space-y-0.5 pointer-events-none'>
                <span className='text-xl font-black text-slate-900 tracking-tight block'>3.68</span>
                <span className='text-[9px] text-slate-400 font-bold bg-slate-50 border border-slate-100/80 px-1.5 py-0.5 rounded-md uppercase tracking-wider block'>Scale 4.0</span>
              </div>
            </div>

           
            <div className='w-full space-y-2 text-[11px] font-semibold text-slate-500 pl-2'>
              {pieData.map((item) => (
                <div key={item.id} className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full shrink-0' style={{ backgroundColor: item.color }} />
                    <span className='text-slate-600 font-medium truncate max-w-[90px]'>{item.label}</span>
                  </div>
                  <div className='flex gap-4 shrink-0'>
                    <span className='font-bold text-slate-900'>{item.grade}</span>
                    <span className='text-slate-400 font-bold w-6 text-right'>{item.value.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch'>
        
        
        <div className='lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Megaphone size={16} className='text-blue-600' />
              <h3 className='text-sm font-black text-slate-900 tracking-tight'>Announcements</h3>
            </div>
            <span className='text-[10px] font-bold text-blue-600 hover:underline cursor-pointer transition-colors'>View All</span>
          </div>

          <div className='flex-1 space-y-3.5 text-xs'>
            <div className='flex gap-3 items-start border-b border-slate-50 pb-3'>
              <span className='w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0'><Trophy size={14} /></span>
              <div className='space-y-1'>
                <div className='flex items-center gap-2'><h4 className='font-bold text-slate-900 text-[11px]'>Sports Day – 2024</h4><span className='px-1.5 bg-blue-600 text-white font-bold text-[8px] rounded-md uppercase tracking-wide scale-90 origin-left'>New</span></div>
                <p className='text-[10px] text-slate-400 font-normal leading-relaxed'>Sports Day will be held on May 31, 2024. All students are invited.</p>
                <span className='text-[9px] text-slate-400 block font-medium'>May 22, 2024</span>
              </div>
            </div>

            <div className='flex gap-3 items-start border-b border-slate-50 pb-3'>
              <span className='w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0'><Sun size={14} /></span>
              <div className='space-y-1'>
                <h4 className='font-bold text-slate-900 text-[11px]'>Summer Break Notice</h4>
                <p className='text-[10px] text-slate-400 font-normal leading-relaxed'>The school will remain closed from June 10 to June 20.</p>
                <span className='text-[9px] text-slate-400 block font-medium'>May 20, 2024</span>
              </div>
            </div>

            <div className='flex gap-3 items-start'>
              <span className='w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0'><FlaskConical size={14} /></span>
              <div className='space-y-1'>
                <h4 className='font-bold text-slate-900 text-[11px]'>Science Exhibition</h4>
                <p className='text-[10px] text-slate-400 font-normal leading-relaxed'>Submit your projects by May 28, 2024.</p>
                <span className='text-[9px] text-slate-400 block font-medium'>May 18, 2024</span>
              </div>
            </div>
          </div>
        </div>

       
        <div className='lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Calendar size={16} className='text-blue-600' />
              <h3 className='text-sm font-black text-slate-900 tracking-tight'>Upcoming Exams</h3>
            </div>
            <span className='text-[10px] font-bold text-blue-600 hover:underline cursor-pointer transition-colors'>View All</span>
          </div>

          <div className='flex-1 overflow-x-auto overflow-y-hidden'>
            <table className='w-full text-left text-[11px] font-medium text-slate-500 min-w-[260px]'>
              <thead>
                <tr className='border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-wider'>
                  <th className='pb-2 font-bold'>Exam</th>
                  <th className='pb-2 font-bold'>Subject</th>
                  <th className='pb-2 font-bold'>Date</th>
                  <th className='pb-2 font-bold text-right'>Time</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-50/50 text-slate-700'>
                <tr className='hover:bg-slate-50/30'><td className='py-3 text-slate-400 font-normal'>Unit Test – 2</td><td className='py-3 font-semibold text-slate-900'>Mathematics</td><td className='py-3'>May 28, 2024</td><td className='py-3 text-right text-slate-400'>09:00 AM</td></tr>
                <tr className='hover:bg-slate-50/30'><td className='py-3 text-slate-400 font-normal'>Unit Test – 2</td><td className='py-3 font-semibold text-slate-900'>Physics</td><td className='py-3'>May 31, 2024</td><td className='py-3 text-right text-slate-400'>09:00 AM</td></tr>
                <tr className='hover:bg-slate-50/30'><td className='py-3 text-slate-400 font-normal'>Unit Test – 2</td><td className='py-3 font-semibold text-slate-900'>Chemistry</td><td className='py-3'>Jun 04, 2024</td><td className='py-3 text-right text-slate-400'>09:00 AM</td></tr>
              </tbody>
            </table>
          </div>

          <div className='bg-blue-50/70 border border-blue-100/40 rounded-xl p-2.5 flex items-center gap-2 text-[10px] text-blue-700 font-semibold'>
            <Info size={14} className='shrink-0 text-blue-500' />
            <span>Prepare well and ace your exams! 💪</span>
          </div>
        </div>

        
        <div className='lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4'>
          <div className='flex items-center gap-2'>
            <CreditCard size={16} className='text-blue-600' />
            <h3 className='text-sm font-black text-slate-900 tracking-tight'>Fee Status</h3>
          </div>

          <div className='flex-1 flex flex-col justify-center space-y-4 py-1'>
            <div className='grid grid-cols-3 gap-2 text-center text-[10px] font-bold'>
              <div className='space-y-1'><span className='text-slate-400 block uppercase font-bold text-[9px] tracking-wide'>Total Fees</span><span className='text-slate-900 text-xs font-black'>₹ 60,000</span></div>
              <div className='space-y-1'><span className='text-slate-400 block uppercase font-bold text-[9px] tracking-wide'>Paid</span><span className='text-emerald-600 text-xs font-black'>₹ 48,000</span></div>
              <div className='space-y-1'><span className='text-slate-400 block uppercase font-bold text-[9px] tracking-wide'>Due</span><span className='text-rose-500 text-xs font-black'>₹ 12,000</span></div>
            </div>

            <div className='space-y-1.5'>
              <div className='flex items-center justify-between text-[10px] font-bold'>
                <span className='text-slate-400 font-medium'>Payment Progress</span>
                <span className='text-blue-600 font-bold'>80%</span>
              </div>
              <div className='w-full h-2 bg-slate-100 rounded-full overflow-hidden'>
                <div className='h-full bg-blue-600 rounded-full transition-all' style={{ width: '80%' }} />
              </div>
            </div>
            
          </div>

          <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md shadow-blue-600/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer'>
            <ArrowUpRight size={14} /> Pay Now
          </button>
        </div>

       
        <div className='md:col-span-2 lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <CalendarCheck size={16} className='text-blue-600' />
              <h3 className='text-sm font-black text-slate-900 tracking-tight'>Attendance Trend</h3>
            </div>
            <span className='text-[10px] font-bold text-slate-400 flex items-center gap-1 hover:text-slate-600 cursor-pointer'>
              This Month <span>▾</span>
            </span>
          </div>

          
          <div className='flex-1 flex flex-col justify-end w-full h-32'>
            <LineChart
              xAxis={[{ 
                data: xLabels, 
                scaleType: 'point',
                sx: {
                  '& .MuiChartsAxis-label, & .MuiChartsAxis-tickLabel': {
                    fill: '#94A3B8 !important',
                    fontWeight: '700 !important',
                    fontSize: '9px !important',
                  }
                }
              }]}
              yAxis={[{
                min: 60,
                max: 100,
                sx: {
                  '& .MuiChartsAxis-tickLabel': {
                    fill: '#94A3B8 !important',
                    fontWeight: '700 !important',
                    fontSize: '9px !important',
                  }
                }
              }]}
              series={[
                {
                  data: lineSeriesData,
                  color: '#3B82F6',
                  area: false,
                  showMark: true,
                },
              ]}
              height={140}
              margin={{ top: 10, bottom: 20, left: 32, right: 10 }}
              slotProps={{ legend: { hidden: true } }}
            />
          </div>

         
          <div className='text-center border-t border-slate-50/60 pt-2 text-[10px] font-bold text-emerald-600 flex items-center justify-center gap-1'>
            <TrendingUp size={12} /> ↑ 4.3% <span className='text-slate-400 font-medium'>improvement from last month</span>
          </div>
        </div>

      </section>

    </div>
  );
};

export default OverviewDashboard;