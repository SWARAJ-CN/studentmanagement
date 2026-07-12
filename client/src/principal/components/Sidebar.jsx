import React from 'react'
import { RiGraduationCapFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
function Sidebar() {
    return (
        <>
            <div className='flex flex-col p-3 bg-[#063970] h-screen w-3xs text-white'>
                <div className='flex items-center gap-4 '>
                    <RiGraduationCapFill size={50} />
                    <div className='flex flex-col'>
                        <span>St Mary's</span>
                        <span>Academy</span>
                    </div>
                </div>
                <div className='flex flex-col gap-3 mt-3 '>
                    <Link className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Dashboard</span></Link>
                    <Link className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Students</span></Link>
                    <Link className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><FaChalkboardTeacher /><span className='px-4 py-2'>Teachers</span></Link>
                    <Link className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Classes</span></Link>
                    <Link className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Attendance</span></Link>
                    <Link className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Exam</span></Link>
                    <Link className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Fees</span></Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar