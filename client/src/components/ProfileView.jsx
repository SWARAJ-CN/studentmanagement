import React from 'react';
import { 
  User, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Settings, 
  CheckCircle, 
  FileText, 
  Edit, 
  Camera, 
  Shield, 
  Award, 
  TrendingUp,
  CalendarCheck,
  FileCheck,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { students } from '../assets/dummy';

const ProfileView = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 animate-fadeIn text-left select-none">
      
      {/* Page Title & Breadcrumbs */}
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">My Profile</h1>
        <div className="flex items-center gap-1.5 text-xs font-semibold mt-1">
          <span className="text-blue-600 cursor-pointer hover:underline">Dashboard</span>
          <span className="text-slate-400 font-normal">&gt;</span>
          <span className="text-slate-400 font-medium">My Profile</span>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT COLUMN: Main Profile Workspace (8 Columns) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Header Identity Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Avatar Container with Edit Camera Overlay */}
              <div className="relative w-28 h-28 rounded-full bg-blue-100 border-4 border-white shadow-md overflow-hidden shrink-0 group">
                <img 
                  src={students[0]?.student_image} 
                  alt={students[0]?.student_name} 
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-0 inset-x-0 bg-black/50 text-white p-1 flex items-center justify-center transition-opacity opacity-100 hover:bg-black/60 cursor-pointer">
                  <Camera size={14} />
                </button>
              </div>

              {/* Identity Fields */}
              <div className="space-y-3.5 text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">{students[0]?.student_name}</h2>
                    <span className="bg-blue-500 text-white p-0.5 rounded-full flex items-center justify-center shrink-0 w-4 h-4">
                      <CheckCircle size={10} fill="currentColor" className="text-blue-500 stroke-white" />
                    </span>
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md uppercase">
                    Student ID:{students[0]?.student_id}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-semibold text-slate-500">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><GraduationCap size={14} /></span>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Class / Section</span>
                      <span className="text-slate-700">{students[0]?.student_class}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><FileText size={14} /></span>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Admission No.</span>
                      <span className="text-slate-700">{students[0]?.student_addno}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Mail size={14} /></span>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Email</span>
                      <span className="text-slate-700">{students[0].student_email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Phone size={14} /></span>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Phone</span>
                      <span className="text-slate-700">{students[0]?.student_phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        
            <button className="sm:self-start bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-xl shadow-md shadow-blue-600/10 flex items-center gap-1.5 transition-all cursor-pointer">
              <Edit size={12} /> Edit Profile
            </button>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Personal Information */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <div className="flex items-center gap-2">
                  <User size={15} className="text-blue-600" />
                  <h3 className="text-xs font-black text-slate-900 tracking-tight">Personal Information</h3>
                </div>
                <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</span>
              </div>
              <div className="space-y-2.5 text-[11px] font-semibold">
                <div className="flex justify-between"><span className="text-slate-400">Date of Birth</span><span className="text-slate-800">{students[0]?.student_dob}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Gender</span><span className="text-slate-800">{students[0]?.student_gender}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Blood Group</span><span className="text-slate-800">{students[0]?.student_bg}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Nationality</span><span className="text-slate-800">{students[0]?.student_nation}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Religion</span><span className="text-slate-800">{students[0]?.student_reli}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Aadhar Number</span><span className="text-slate-800">{students[0]?.student_addar}</span></div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-blue-600" />
                  <h3 className="text-xs font-black text-slate-900 tracking-tight">Academic Information</h3>
                </div>
                <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</span>
              </div>
              <div className="space-y-2.5 text-[11px] font-semibold">
                <div className="flex justify-between gap-4"><span className="text-slate-400 shrink-0">Department / Stream</span><span className="text-slate-800 text-right truncate">{students[0]?.student_class}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Roll Number</span><span className="text-slate-800">{students[0]?.student_rollno}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Academic Year</span><span className="text-slate-800">{students[0]?.student_acc_year}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Semester</span><span className="text-slate-800">{students[0]?.student_section}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Admission Date</span><span className="text-slate-800">{students[0]?.student_add_date}</span></div>
                <div className="flex justify-between gap-4"><span className="text-slate-400 shrink-0">College</span><span className="text-slate-800 text-right truncate">EduSphere Institute of Technology</span></div>
              </div>
            </div>
          </div>

          {/* Block Section Row 2: Parent details, address & Account settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Parent / Guardian Details */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <div className="flex items-center gap-2">
                  <User size={15} className="text-blue-600" />
                  <h3 className="text-xs font-black text-slate-900 tracking-tight">Parent / Guardian Details</h3>
                </div>
                <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</span>
              </div>
              <div className="space-y-2.5 text-[11px] font-semibold">
                <div className="flex justify-between"><span className="text-slate-400">Father's Name</span><span className="text-slate-800">{students[0]?.student_fname}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Mother's Name</span><span className="text-slate-800">{students[0]?.student_mname}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Guardian Phone</span><span className="text-slate-800">{students[0]?.student_gphone}</span></div>
                <div className="flex justify-between gap-2"><span className="text-slate-400 shrink-0">Guardian Email</span><span className="text-slate-800 truncate text-right">{students[0]?.student_gemail}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Occupation</span><span className="text-slate-800">{students[0]?.student_goccup}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Annual Income</span><span className="text-slate-800">₹ {students[0]?.student_gincome}</span></div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-blue-600" />
                  <h3 className="text-xs font-black text-slate-900 tracking-tight">Address Information</h3>
                </div>
                <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</span>
              </div>
              <div className="space-y-3 text-[11px] font-semibold">
                <div className="space-y-0.5">
                  <span className="text-slate-400 block">Permanent Address</span>
                  <p className="text-slate-800 leading-relaxed font-semibold">{students[0]?.student_paddress}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 block">Current Address</span>
                  <p className="text-slate-800 leading-relaxed font-semibold">{students[0]?.student_curradd}</p>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-50">
                  <span className="text-slate-400">Emergency Contact</span>
                  <span className="text-slate-800">{students[0]?.student_em_contact}</span>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <div className="flex items-center gap-2">
                  <Settings size={15} className="text-blue-600" />
                  <h3 className="text-xs font-black text-slate-900 tracking-tight">Account Settings</h3>
                </div>
                <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</span>
              </div>
              <div className="space-y-2.5 text-[11px] font-semibold">
                <div className="flex justify-between"><span className="text-slate-400">Username</span><span className="text-slate-800">rahul.sharma2023</span></div>
                <div className="flex justify-between gap-2"><span className="text-slate-400 shrink-0">Email</span><span className="text-slate-800 truncate text-right">rahul.sharma@edusphere.edu.in</span></div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Password</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-800 text-[9px] tracking-widest">••••••••••</span>
                    <span className="text-blue-600 text-[10px] font-bold hover:underline cursor-pointer">Change</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-400">Two-Factor Auth</span>
                  <span className="text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-100 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" /> Enabled
                  </span>
                </div>
                <div className="space-y-0.5 pt-1 border-t border-slate-50">
                  <span className="text-slate-400 block">Login Device</span>
                  <p className="text-slate-800 font-bold">Windows • Chrome</p>
                  <span className="text-[9px] text-slate-400 block font-medium">Jaipur, India • <span className="text-emerald-600 font-bold">Active now</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Block Section Row 3: Horizontal Mini Metrics Deck */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* Metric 1 */}
            <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between h-20 shadow-sm relative group hover:border-blue-100 transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><CalendarCheck size={13} /></span>
                <span className="text-[9px] font-bold tracking-wide text-slate-400 uppercase">Attendance</span>
              </div>
              <div className="flex items-end justify-between mt-1">
                <span className="text-sm font-black text-slate-900">92.6%</span>
                <ChevronRight size={12} className="text-slate-300 group-hover:text-slate-500" />
              </div>
            </div>
            {/* Metric 2 */}
            <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between h-20 shadow-sm relative group hover:border-blue-100 transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><TrendingUp size={13} /></span>
                <span className="text-[9px] font-bold tracking-wide text-slate-400 uppercase">GPA / SGPA</span>
              </div>
              <div className="flex items-end justify-between mt-1">
                <span className="text-sm font-black text-slate-900">8.45</span>
                <ChevronRight size={12} className="text-slate-300 group-hover:text-slate-500" />
              </div>
            </div>
            {/* Metric 3 */}
            <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between h-20 shadow-sm relative group hover:border-blue-100 transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><FileText size={13} /></span>
                <span className="text-[9px] font-bold tracking-wide text-slate-400 uppercase">Pending Assg.</span>
              </div>
              <div className="flex items-end justify-between mt-1">
                <span className="text-sm font-black text-slate-900">2</span>
                <ChevronRight size={12} className="text-slate-300 group-hover:text-slate-500" />
              </div>
            </div>
            {/* Metric 4 */}
            <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between h-20 shadow-sm relative group hover:border-blue-100 transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Shield size={13} /></span>
                <span className="text-[9px] font-bold tracking-wide text-slate-400 uppercase">Upcoming Exams</span>
              </div>
              <div className="flex items-end justify-between mt-1">
                <span className="text-sm font-black text-slate-900">1</span>
                <ChevronRight size={12} className="text-slate-300 group-hover:text-slate-500" />
              </div>
            </div>
            {/* Metric 5 */}
            <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between h-20 shadow-sm relative group hover:border-blue-100 transition-colors col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0"><CreditCard size={13} /></span>
                <span className="text-[9px] font-bold tracking-wide text-slate-400 uppercase">Fee Status</span>
              </div>
              <div className="flex items-end justify-between mt-1">
                <span className="text-sm font-black text-emerald-600">Paid</span>
                <ChevronRight size={12} className="text-slate-300 group-hover:text-slate-500" />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Secondary Modules & Document Widgets (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Profile Completion Circular Gauge Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-900 tracking-tight">Profile Completion</h3>
            <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
              {/* SVG Radial Progress Circle */}
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                  <circle 
                    cx="18" cy="18" r="16" fill="none" stroke="#10B981" strokeWidth="3" 
                    strokeDasharray="85, 100" strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-xs font-black text-slate-900">85%</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-extrabold text-slate-900">Great! Almost there.</h4>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Complete your profile to unlock all features.</p>
              </div>
            </div>

            {/* Stepper Checklist Indicator */}
            <div className="space-y-2 text-[10px] font-bold">
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
              </div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Personal Information</span><CheckCircle size={12} className="text-emerald-500" fill="currentColor" stroke="white" /></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Academic Information</span><CheckCircle size={12} className="text-emerald-500" fill="currentColor" stroke="white" /></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Parent/Guardian Details</span><CheckCircle size={12} className="text-emerald-500" fill="currentColor" stroke="white" /></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Upload Documents</span><CheckCircle size={12} className="text-emerald-500" fill="currentColor" stroke="white" /></div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Emergency Contact</span>
                <span className="bg-blue-50 text-blue-600 border border-blue-100 rounded px-1 text-[8px] font-black">2/2</span>
              </div>
            </div>
          </div>

          {/* Uploaded Documents List Box */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h3 className="text-xs font-black text-slate-900 tracking-tight">Uploaded Documents</h3>
              <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</span>
            </div>

            <div className="space-y-2 text-[11px] font-semibold">
              {/* Doc Row 1 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600"><FileCheck size={14} /></span>
                  <span className="text-slate-700">Passport Size Photo</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-bold text-[10px]">
                  <span>jpg</span>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50 text-[9px]">Verified</span>
                </div>
              </div>
              {/* Doc Row 2 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-rose-500"><FileText size={14} /></span>
                  <span className="text-slate-700">Aadhar Card</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-bold text-[10px]">
                  <span>pdf</span>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50 text-[9px]">Verified</span>
                </div>
              </div>
              {/* Doc Row 3 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-rose-500"><FileText size={14} /></span>
                  <span className="text-slate-700">10th Marksheet</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-bold text-[10px]">
                  <span>pdf</span>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50 text-[9px]">Verified</span>
                </div>
              </div>
              {/* Doc Row 4 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-rose-500"><FileText size={14} /></span>
                  <span className="text-slate-700">12th Marksheet</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-bold text-[10px]">
                  <span>pdf</span>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50 text-[9px]">Verified</span>
                </div>
              </div>
              {/* Doc Row 5 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500"><FileCheck size={14} /></span>
                  <span className="text-slate-700">Admission Letter</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-bold text-[10px]">
                  <span>pdf</span>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50 text-[9px]">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements & Badges Deck */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <div className="flex items-center gap-2">
                <Award size={15} className="text-blue-600" />
                <h3 className="text-xs font-black text-slate-900 tracking-tight">Achievements & Badges</h3>
              </div>
              <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</span>
            </div>

            {/* Badges Flex Grid Layout */}
            <div className="grid grid-cols-4 gap-2 pt-1 text-center">
              {/* Badge 1 */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-inner">
                  <Award size={18} />
                </div>
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">Scholar</span>
                <span className="text-[8px] text-slate-400 font-semibold block">GPA &gt; 8.0</span>
              </div>
              {/* Badge 2 */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-inner">
                  <CheckCircle size={16} />
                </div>
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">Attendance Star</span>
                <span className="text-[8px] text-slate-400 font-semibold block">90%+ Att.</span>
              </div>
              {/* Badge 3 */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shadow-inner">
                  <GraduationCap size={16} />
                </div>
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">Active Learner</span>
                <span className="text-[8px] text-slate-400 font-semibold block">5 Courses</span>
              </div>
              {/* Badge 4 */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-inner">
                  <TrendingUp size={16} />
                </div>
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">Top Performer</span>
                <span className="text-[8px] text-slate-400 font-semibold block">Top 10%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileView;