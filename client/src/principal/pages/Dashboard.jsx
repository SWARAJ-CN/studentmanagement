import React, { useState } from 'react'
import { MdGroups } from "react-icons/md";
import { PiGraduationCapThin } from "react-icons/pi";
import MyPieChart from '../components/MyPieChart';
import OrdersChart from '../components/OrdersChart';

import { RiGraduationCapFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import Teachers from '../components/Teachers';
import Notices from '../components/Notices';

function Dashboard() {
    const [tab, setTab] = useState(0)


    console.log(tab)
    return (
        <>
            <div className='grid grid-cols-4'>
                <div className="col-span-0">
                    <div className='flex flex-col p-3 bg-[#063970] h-screen w-3xs text-white'>
                        <div className='flex items-center gap-4 '>
                            <RiGraduationCapFill size={50} />
                            <div className='flex flex-col'>
                                <span>St Mary's</span>
                                <span>Academy</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 mt-3 '>
                            <Link onClick={() => setTab(0)} className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Dashboard</span></Link>
                            <Link onClick={() => setTab(1)} className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Teachers</span></Link>
                            <Link onClick={() => setTab(2)} className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><FaChalkboardTeacher /><span className='px-4 py-2'>Notices</span></Link>
                            <Link onClick={() => setTab(3)} className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Students</span></Link>
                            <Link className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Attendance</span></Link>
                            <Link className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Exam</span></Link>
                            <Link className='flex flex-row items-center px-5 hover:rounded-xl hover:bg-blue-900'><MdDashboard /><span className='px-4 py-2'>Fees</span></Link>
                        </div>
                    </div>
                </div>
                <div className='col-span-3'>
                    {
                        tab == 0 && <div>
                            <div className='flex justify-between items-center px-10'>
                                <h3>Student Management Systems</h3>
                                <input className='border w-75 rounded-xl px-2 py-1' type="text" name="" id="" placeholder='Search Students,teachers...' />
                                <div className='flex items-center'>
                                    <div className='rounded-full overflow-hidden w-[50px]'>
                                        <img className='w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfA-CJ9p0wXhiXyLF_Ug9K93lA7KH-ctcfHeWeGht72zh9MVqjCzUb2SBH&s=10" alt="" />
                                    </div>
                                    <div className=''>
                                        <h4>Admin</h4>
                                        <p className='font-light'>Senior Admin</p>
                                    </div>
                                </div>
                            </div>
                            <h1 className='font-medium'>Admin Dashboard</h1>
                            <p className='font-light'>Loremsdfsdfsdfssfsdertyuiojhgfdghjkytrertyuiolkjhgfdhjkkjhgf</p>

                            <div className='flex gap-5 p-5'>
                                <div className='flex items-center gap-5 rounded-lg shadow-xl p-3 basis-full'>
                                    <span className='bg-violet-400 p-3 rounded-full'><MdGroups size={35} /></span>
                                    <div>
                                        <p>Total Students</p>
                                        <p>1200</p>
                                        <p><span>5.4%</span> from last month</p>
                                    </div>
                                    <span className='bg-blue-100 rounded-lg p-1'> <PiGraduationCapThin size={28} /></span>
                                </div>

                                <div className='flex items-center gap-5 rounded-lg shadow-xl p-3 basis-full'>
                                    <span className='bg-violet-400 p-3 rounded-full'><MdGroups /></span>
                                    <div>
                                        <p>Total Students</p>
                                        <p>1200</p>
                                        <p><span>5.4%</span> from last month</p>
                                    </div>
                                    <span className='bg-blue-100 rounded-lg p-1'> <PiGraduationCapThin size={28} /></span>
                                </div>

                                <div className='flex items-center gap-5 rounded-lg shadow-xl p-3 basis-full'>
                                    <span className='bg-violet-400 p-3 rounded-full'><MdGroups /></span>
                                    <div>
                                        <p>Total Students</p>
                                        <p>1200</p>
                                        <p><span>5.4%</span> from last month</p>
                                    </div>
                                    <span className='bg-blue-100 rounded-lg p-1'> <PiGraduationCapThin size={28} /></span>
                                </div>

                                <div className='flex items-center gap-5 rounded-lg shadow-xl p-3 basis-full'>
                                    <span className='bg-violet-400 p-3 rounded-full'><MdGroups /></span>
                                    <div>
                                        <p>Total Students</p>
                                        <p>1200</p>
                                        <p><span>5.4%</span> from last month</p>
                                    </div>
                                    <span className='bg-blue-100 rounded-lg p-1'> <PiGraduationCapThin size={28} /></span>
                                </div>
                            </div>

                            <div className='grid grid-cols-3'>
                                <div className=''>
                                    <OrdersChart />
                                </div>
                                <div className='shadow-xl'>
                                    <MyPieChart />
                                </div>
                                <div>
                                    <h3>Upcoming Events</h3>

                                </div>
                            </div>
                        </div>
                    }

                    {
                        tab == 1 && <Teachers/>
                    }
                    {
                        tab == 2 && <Notices/>
                    }
                </div>
            </div>



        </>
    )
}

export default Dashboard