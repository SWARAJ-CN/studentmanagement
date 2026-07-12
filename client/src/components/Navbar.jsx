import React, { useState, useRef, useEffect } from 'react'
import { GraduationCap, User, Menu, X, ShieldAlert, Users } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaGraduationCap } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showStaffDropdown, setShowStaffDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const navigations = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About Us' },
        { path: '/features', label: 'Features' },
        { path: '/notice', label: 'Notice' },
        { path: '/contact', label: 'Contact Us' },
    ];

    // Close the staff dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowStaffDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinkStyles = ({ isActive }) =>
        `font-semibold text-sm transition-colors duration-200 hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-slate-600'
        }`;

    return (
        <nav className='w-full h-20 px-4 sm:px-8 md:px-10 bg-white border-b border-slate-100 flex flex-row justify-between items-center z-50 fixed top-0 left-0 right-0'>


            <div
                onClick={() => { navigate('/'); setIsOpen(false); }}
                className='flex flex-row gap-1 items-center cursor-pointer select-none group'
            >
                <FaGraduationCap size={60} className="text-blue-600 transition-transform group-hover:scale-105" />
                <span className='flex flex-col pl-2'>
                    <span className='font-black text-xl sm:text-2xl leading-none text-slate-800 tracking-tight'>ST MARY'S</span>
                    <span className='font-medium text-[10px] sm:text-xs text-slate-400 mt-0.5 tracking-wide'>Student Management System</span>
                </span>
            </div>


            <div className='hidden lg:flex flex-row gap-8 items-center'>
                {navigations.map((nav, index) => (
                    <NavLink key={index} to={nav.path} className={navLinkStyles}>
                        {nav.label}
                    </NavLink>
                ))}
            </div>


            <div className='hidden md:flex flex-row gap-3 items-center relative' ref={dropdownRef}>


                <button
                    onClick={() => setShowStaffDropdown(!showStaffDropdown)}
                    className={`flex flex-row gap-1.5 items-center px-4 py-2 border font-semibold rounded-xl transition-all duration-200 text-sm cursor-pointer ${showStaffDropdown
                            ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                >
                    <Users size={18} />
                    Staff Portal
                </button>


                <button  onClick={()=>navigate('/student-login')} className='flex flex-row gap-1.5 items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-sm shadow-md shadow-blue-600/10'>
                    <GraduationCap size={18} />
                    Student Login
                </button>


                {showStaffDropdown && (
                    <div className='absolute right-full mr-2 top-0 mt-0 w-48 bg-white border border-slate-100 rounded-2xl p-2 shadow-xl shadow-slate-200/80 flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150'>
                        <button 
                            onClick={() => { navigate('/teacher-login'); setShowStaffDropdown(false); }}
                            className='flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-sm text-left transition-colors'
                        >
                            <Users size={16} className='text-slate-400' /> Teachers
                        </button>

                        <button
                            onClick={() => { navigate('/principal-login'); setShowStaffDropdown(false); }}
                            className='flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-sm text-left transition-colors'
                        >
                            <ShieldAlert size={16} className='text-slate-400' /> Principal
                        </button>
                    </div>
                )}
            </div>


            <div className='flex lg:hidden items-center gap-3'>
                <button
                    onClick={() => navigate('/login')}
                    className='md:hidden p-2 text-slate-600 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors'
                >
                    <User size={20} />
                </button>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='text-slate-700 hover:text-blue-600 transition-colors cursor-pointer p-1.5 hover:bg-slate-50 rounded-xl'
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>


            {isOpen && (
                <div className='absolute top-20 left-0 w-full bg-white shadow-xl border-t border-slate-100 flex flex-col p-6 gap-6 lg:hidden z-40 animate-in fade-in slide-in-from-top-5 duration-200'>
                    <div className='flex flex-col gap-4'>
                        {navigations.map((nav, index) => (
                            <NavLink
                                key={index}
                                to={nav.path}
                                onClick={() => setIsOpen(false)}
                                className={navLinkStyles}
                            >
                                {nav.label}
                            </NavLink>
                        ))}
                    </div>

                    <hr className='border-slate-100 md:hidden' />

                    <div className='flex flex-col sm:flex-row gap-3 md:hidden'>
                        <button className='flex justify-center items-center gap-2 w-full px-4 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-colors'>
                            <Users size={18} /> Staff Portal
                        </button>
                        <button 
                            onClick={()=>navigate('/student-login')}
                            className='flex justify-center items-center gap-2 w-full px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-colors'>
                            <GraduationCap size={18} /> Student Login
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar