import React from 'react'
import { GraduationCap, GraduationCapIcon, User } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const move = useNavigate()

    const navigations = [
        {path: '/',       label: 'Home'},
        {path: '/about',  label: 'AboutUs'},
        {path: '/features', label: 'Features'},
        {path: '/notice', label: 'Notice'},
        {path: '/contact', label: 'Contact Us'},
    ]
    const navlinks = ({isActive}) => isActive ? 'text-blue-600  ' : 'text-black'
    return (
        <div className='w-full h-20 px-10 bg-white shadow-md flex flex-row justify-between items-center'>
            <div
            onClick={()=>move('/')}
            className='flex flex-row gap-1 items-center cursor-pointer'>
                <GraduationCap size={60} color='blue' />
                <span className='flex flex-col  px-3'>
                    <span className='font-extrabold  md:text-2xl '>ST MARY'S</span>
                    <span className='font-normal text-xs'>Student Management System</span>
                </span>
            </div>

            {/* nav menus */}

            <div className='flex flex-row gap-5 font-bold items-center   '>
            {
                navigations.map((navs,index)=>(
                    <NavLink key={index} to={navs.path} className={navlinks}>
                        {navs.label}
                    </NavLink>
                ))
            }
            </div>
            <div>
                {/* buttons */}
                <div className='flex flex-row gap-2 '>
                    <button className='flex flex-row gap-1 items-center px-4 py-2 border rounded-xl border-blue-800 text-blue-600 cursor-pointer'>
                        <User/>
                        Login
                    </button>

                    <button className='flex flex-row gap-1 items-center px-4 py-2 border rounded-xl border-blue-800 text-white bg-blue-600 cursor-pointer'>
                        <GraduationCapIcon/>
                       Student Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar