import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  CalendarCheck, 
  FileText, 
  GraduationCap, 
  BarChart3, 
  Clock, 
  CreditCard, 
  MessageSquare, 
  Library, 
  Settings,
  Sparkles,
  Bell
} from 'lucide-react';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', name: 'My Profile', icon: User },
    { id: 'courses', name: 'My Courses', icon: BookOpen },
    { id: 'attendance', name: 'Attendance', icon: CalendarCheck },
    { id: 'exams', name: 'Exams', icon: GraduationCap },
    { id: 'results', name: 'Results', icon: BarChart3 },
    { id: 'timetable', name: 'Timetable', icon: Clock },
    { id: 'fees', name: 'Fee Payment', icon: CreditCard },
    { id: 'Notice', name: 'Notice', icon: Bell },
  ];

  return (
    <aside className='w-64 bg-[#063970] text-white shrink-0 hidden lg:flex flex-col justify-between p-4 min-h-screen sticky top-0 z-20 shadow-xl'>
      <div className='space-y-6'>
        {/* Academy Branding Banner Header */}
        <div className='flex items-center gap-3 px-2 py-3 border-b border-white/10'>
          <div className='w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner'>
            <GraduationCap size={20} className="text-blue-300" />
          </div>
          <div className='text-left'>
            <h2 className='font-black text-sm tracking-tight leading-none'>Brightwood</h2>
            <span className='text-[10px] text-blue-200/70 font-semibold tracking-wider uppercase block mt-1'>Academy</span>
          </div>
        </div>
        
        {/* Dynamic Navigation Menu Items */}
        <nav className='space-y-1'>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full h-10 px-3.5 rounded-xl flex items-center justify-between text-xs font-semibold tracking-wide transition-all group cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-700/20' 
                    : 'text-blue-100/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <IconComponent 
                    size={16} 
                    className={`transition-colors ${isActive ? 'text-white' : 'text-blue-200/60 group-hover:text-white'}`} 
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className='px-1.5 py-0.5 rounded-md bg-blue-500 text-white text-[10px] font-bold shadow-sm'>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Retention CTA Widget Footer */}
      <div className='bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-white/10 rounded-2xl p-4 relative overflow-hidden text-left shadow-inner group'>
        <div className='absolute -right-2 -bottom-2 text-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6'>
          <Sparkles size={72} />
        </div>
        <h4 className='font-bold text-xs text-white tracking-tight mb-1'>Stay on Track!</h4>
        <p className='text-blue-200/70 text-[10px] font-medium leading-relaxed max-w-[150px]'>
          Keep up the great work and achieve your goals.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;