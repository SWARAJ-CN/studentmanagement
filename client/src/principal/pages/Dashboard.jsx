import React, { useState } from 'react';
import { MdGroups, MdDashboard } from "react-icons/md";
import { PiGraduationCapThin } from "react-icons/pi";
import { RiGraduationCapFill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";

import MyPieChart from '../components/MyPieChart';
import OrdersChart from '../components/OrdersChart';
import Teachers from '../components/Teachers';
import Notices from '../components/Notices';

function Dashboard() {
    const [tab, setTab] = useState(0);

    // Sidebar navigation items
    const navItems = [
        { id: 0, label: 'Dashboard', icon: MdDashboard },
        { id: 1, label: 'Teachers', icon: FaChalkboardTeacher },
        { id: 2, label: 'Notices', icon: FaChalkboardTeacher }, // Kept your original icon mapping
        { id: 3, label: 'Students', icon: MdDashboard },
        { id: 4, label: 'Attendance', icon: MdDashboard },
        { id: 5, label: 'Exam', icon: MdDashboard },
        { id: 6, label: 'Fees', icon: MdDashboard },
    ];

    // Dummy data for top metric cards
    const metrics = [
        { title: "Total Students", value: "1,200", growth: "+5.4%" },
        { title: "Total Teachers", value: "85", growth: "+1.2%" },
        { title: "Total Staff", value: "45", growth: "+0.0%" },
        { title: "Daily Attendance", value: "92%", growth: "+2.4%" },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            
            {/* ---- SIDEBAR ---- */}
            <aside className="w-[280px] bg-[#063970] text-white flex flex-col flex-shrink-0 shadow-xl z-20">
                {/* Logo Area */}
                <div className="flex items-center gap-4 p-6 border-b border-blue-800/50">
                    <RiGraduationCapFill size={45} className="text-white" />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold leading-tight">St Mary's</span>
                        <span className="text-sm font-light tracking-wider opacity-80">Academy</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 p-4 mt-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = tab === item.id;
                        
                        return (
                            <button
                                key={item.id}
                                onClick={() => setTab(item.id)}
                                className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-200 text-left 
                                    ${isActive 
                                        ? 'bg-blue-900 shadow-md font-medium' 
                                        : 'hover:bg-blue-900/50 font-light hover:translate-x-1'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? 'text-white' : 'text-blue-200'} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* ---- MAIN CONTENT WRAPPER ---- */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                
                {/* Top Header */}
                <header className="flex justify-between items-center bg-white px-8 py-4 shadow-sm border-b border-slate-200 z-10">
                    <h2 className="text-xl font-bold text-slate-700">Student Management System</h2>
                    
                    <div className="flex items-center gap-8">
                        <input 
                            type="text" 
                            placeholder="Search Students, teachers..." 
                            className="border border-slate-300 bg-slate-50 rounded-full px-5 py-2 w-80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200">
                                <img 
                                    className="w-full h-full object-cover" 
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfA-CJ9p0wXhiXyLF_Ug9K93lA7KH-ctcfHeWeGht72zh9MVqjCzUb2SBH&s=10" 
                                    alt="Admin Profile" 
                                />
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-sm font-bold text-slate-800 leading-tight">Admin</h4>
                                <p className="text-xs font-medium text-slate-500">Senior Admin</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    
                    {/* Render Dashboard (Tab 0) */}
                    {tab === 0 && (
                        <div className="flex flex-col max-w-7xl mx-auto animate-in fade-in duration-300">
                            
                            {/* Page Title */}
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                                <p className="text-sm font-medium text-slate-500 mt-1">
                                    Overview of academy performance and recent activities.
                                </p>
                            </div>

                            {/* Metric Cards Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                                {metrics.map((metric, index) => (
                                    <div key={index} className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center gap-4">
                                            {/* Preserved your violet-400 color */}
                                            <div className="bg-violet-400 text-white p-3 rounded-full flex items-center justify-center w-12 h-12 shadow-sm">
                                                <MdGroups size={24} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-500">{metric.title}</p>
                                                <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                                                <p className="text-xs font-medium text-slate-400 mt-1">
                                                    <span className="text-emerald-500 mr-1">{metric.growth}</span> 
                                                    from last month
                                                </p>
                                            </div>
                                        </div>
                                        {/* Preserved your blue-100 color */}
                                        <div className="bg-blue-100 text-blue-600 rounded-xl p-2 self-start">
                                            <PiGraduationCapThin size={22} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Charts Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                    <h3 className="text-base font-bold text-slate-700 mb-4">Orders Overview</h3>
                                    <OrdersChart />
                                </div>
                                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                    <h3 className="text-base font-bold text-slate-700 mb-4">Demographics</h3>
                                    <MyPieChart />
                                </div>
                                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                    <h3 className="text-base font-bold text-slate-700 mb-4">Upcoming Events</h3>
                                    {/* Placeholder for your events content */}
                                    <div className="flex items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                                        <p className="text-sm text-slate-400 font-medium">No upcoming events scheduled.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Render Other Tabs */}
                    {tab === 1 && <div className="animate-in fade-in duration-300"><Teachers /></div>}
                    {tab === 2 && <div className="animate-in fade-in duration-300"><Notices /></div>}
                    
                </main>
            </div>
        </div>
    );
}

export default Dashboard;