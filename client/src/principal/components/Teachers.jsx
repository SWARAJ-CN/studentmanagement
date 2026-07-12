import React, { useState, useEffect } from 'react';
import { GiTeacher } from "react-icons/gi";
import { FaUserGroup, FaCirclePlus, FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { TiUserAdd } from "react-icons/ti";
import MyPieChart from '../components/MyPieChart';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeptDist from '../components/DeptDist';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getTeacherAPI, registerTeacherAPI, deleteTeacherAPI, updateTeacherAPI } from '../../services/allAPI';

function Teachers() {
    // Modal Open/Close & Edit States
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    // Database Dynamic Local Rendering State
    const [teachersList, setTeachersList] = useState([]);

    // Base Record Form Blueprints
    const initialFormState = {
        teacherId: '',
        name: '',
        photo: '',
        class: '',
        subject: '',
        experience: '',
        contact: '',
        status: 'Active'
    };

    const [formData, setFormData] = useState(initialFormState);

    // Open Modal for New Entries
    const handleOpen = () => {
        setIsEditMode(false);
        setFormData({ ...initialFormState, teacherId: generateUniqueID() });
        setOpen(true);
    };

    // Open Modal for Modifying Entries 
    const handleEditOpen = (teacher) => {
        setIsEditMode(true);
        setEditId(teacher.id);
        setFormData(teacher);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialFormState);
        setEditId(null);
    };

    // Generates a fully unique key matching format 'TCH###' avoiding local collisions
    const generateUniqueID = () => {
        let uniqueID = '';
        let isDuplicate = true;

        while (isDuplicate) {
            const randomNum = Math.floor(100 + Math.random() * 900); // Guarantees a clean 3-digit range (100-999)
            uniqueID = `TCH${randomNum}`;
            isDuplicate = teachersList.some(teacher => teacher.teacherId === uniqueID);
        }
        return uniqueID;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClearField = (fieldName) => {
        if (fieldName === 'teacherId') return; // Do not clear immutable assigned ID strings
        setFormData(prev => ({ ...prev, [fieldName]: '' }));
    };

    // Orchestrates dispatch routing between standard Create operations or Update mutations
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditMode) {
            const result = await updateTeacherAPI(editId, formData);
            if (result?.status >= 200 && result?.status < 300) {
                displayTeachers();
                handleClose();
            }
        } else {
            const result = await registerTeacherAPI(formData);
            if (result?.status >= 200 && result?.status < 300) {
                displayTeachers();
                handleClose();
            }
        }
    };

    // Triggers network resource deletion across asynchronous state 
    const handleDeleteTeacher = async (id) => {
        if (window.confirm("Are you sure you want to delete this teacher's profile record?")) {
            const result = await deleteTeacherAPI(id);
            if (result?.status >= 200 && result?.status < 300) {
                displayTeachers();
            }
        }
    };

    const displayTeachers = async () => {
        const result = await getTeacherAPI();
        if (result?.data) {
            setTeachersList(result.data);
        }
    };

    useEffect(() => {
        displayTeachers();
    }, []);

    const modalBoxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 420,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px',
    };

    const inputWrapperClass = "group relative w-full h-11 flex items-center px-3 rounded-lg bg-white border border-slate-200 transition-all duration-500 focus-within:rounded-sm focus-within:border-transparent before:content-[''] before:absolute before:bg-[#2f2ee9] before:scale-x-0 before:origin-center before:w-full before:h-[2px] before:left-0 before:bottom-[-1px] before:rounded-sm before:transition-transform before:duration-300 focus-within:before:scale-x-100";
    const inputFieldClass = "peer text-sm bg-transparent w-full h-full px-2 border-none text-slate-800 focus:outline-none";
    const clearBtnClass = "border-none bg-transparent text-[#8b8ba7] cursor-pointer flex items-center justify-center p-0 opacity-0 invisible transition-all duration-200 peer-not-placeholder-shown:opacity-100 peer-not-placeholder-shown:visible z-10";

    return (
        <div className='flex flex-row bg-slate-50 min-h-screen font-sans antialiased'>
            <div className='w-full p-5'>
                <h1 className='font-bold text-3xl text-slate-800'>Teachers</h1>
                <p className='text-slate-500 text-sm mt-1'>View, manage and organize teacher records across the school</p>

                {/* Metric Cards Top Section */}
                <div className='flex p-5 gap-5'>
                    <div className='flex items-center gap-5 rounded-lg shadow-xl basis-full p-3 bg-white'>
                        <span className='bg-violet-100 text-violet-600 p-3 rounded-full'><GiTeacher size={22} /></span>
                        <div>
                            <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>Total Faculty</p>
                            <p className='text-2xl font-bold text-slate-800'>{teachersList.length}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 rounded-lg shadow-xl p-3 basis-full bg-white'>
                        <span className='bg-blue-100 text-blue-600 p-3 rounded-full'><FaUserGroup size={22} /></span>
                        <div>
                            <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>Total Students</p>
                            <p className='text-2xl font-bold text-slate-800'>1200</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 rounded-lg shadow-xl p-3 basis-full bg-white'>
                        <span className='bg-emerald-100 text-emerald-600 p-3 rounded-full'><TiUserAdd size={22} /></span>
                        <div>
                            <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>New Hires</p>
                            <p className='text-2xl font-bold text-slate-800'>4</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 rounded-lg shadow-xl p-3 basis-full bg-white'>
                        <span className='bg-amber-100 text-amber-600 p-3 rounded-full'><FcDepartment size={22} /></span>
                        <div>
                            <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>Departments</p>
                            <p className='text-2xl font-bold text-slate-800'>6</p>
                        </div>
                    </div>
                </div>

                {/* Directory Filtering and Table Container Block */}
                <div className='grid grid-cols-6 gap-4'>
                    <div className='col-span-4 rounded-lg p-5 shadow-lg bg-white border border-slate-100'>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className='font-bold text-2xl text-slate-800'>Teacher Directory</h1>
                            <button
                                className='flex items-center px-4 py-2 bg-[#2f2ee9] text-white rounded-xl gap-2 font-semibold hover:bg-[#1e1dd0] active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-600/10'
                                onClick={handleOpen}
                            >
                                <FaCirclePlus />Add Teacher
                            </button>
                        </div>

                        <div className='flex justify-between gap-2 mb-4'>
                            <input type="text" placeholder='Search by name, ID' className='px-3 py-1.5 border border-slate-200 rounded-lg w-1/3 text-sm focus:outline-none focus:border-blue-500' />
                            <select className='border border-slate-200 rounded-lg p-1.5 text-sm text-slate-600 focus:outline-none'>
                                <option value="">All Departments</option>
                            </select>
                            <select className='border border-slate-200 rounded-lg p-1.5 text-sm text-slate-600 focus:outline-none'>
                                <option value="">All Statuses</option>
                            </select>
                        </div>

                        <TableContainer component={Paper} className='mt-3 shadow-none border border-slate-100'>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="teachers table">
                                <TableHead className="bg-slate-50">
                                    <TableRow>
                                        <TableCell className="font-semibold text-slate-700">ID</TableCell>
                                        <TableCell className="font-semibold text-slate-700">Teacher Info</TableCell>
                                        <TableCell className="font-semibold text-slate-700">Class</TableCell>
                                        <TableCell className="font-semibold text-slate-700">Subject</TableCell>
                                        <TableCell className="font-semibold text-slate-700">Experience</TableCell>
                                        <TableCell className="font-semibold text-slate-700">Contact</TableCell>
                                        <TableCell className="font-semibold text-slate-700" align="center">Status</TableCell>
                                        <TableCell className="font-semibold text-slate-700" align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teachersList.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            className="hover:bg-slate-50/50 transition-colors"
                                        >
                                            <TableCell className="font-semibold text-slate-500 text-xs">{row.teacherId || 'N/A'}</TableCell>
                                            <TableCell component="th" scope="row">
                                                <div className='flex gap-3 items-center'>
                                                    <img 
                                                        className="rounded-full object-cover shadow-sm border border-slate-100" 
                                                        width={"36px"} 
                                                        height={"36px"} 
                                                        src={row.photo || "https://placehold.co/100"} 
                                                        alt={row.name} 
                                                    />
                                                    <span className="font-medium text-slate-800">{row.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-600">{row.class}</TableCell>
                                            <TableCell className="text-slate-600">{row.subject}</TableCell>
                                            <TableCell className="text-slate-600">{row.experience}</TableCell>
                                            <TableCell className="text-slate-600">{row.contact}</TableCell>
                                            <TableCell align="center">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
                                                    row.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                    row.status === 'On leave' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                    'bg-slate-100 text-slate-700 border border-slate-200'
                                                }`}>
                                                    {row.status}
                                                </span>
                                            </TableCell>
                                            <TableCell align="center">
                                                <div className="flex gap-2 justify-center items-center">
                                                    <button 
                                                        onClick={() => handleEditOpen(row)}
                                                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md transition-colors"
                                                        title="Edit Details"
                                                    >
                                                        <FaPenToSquare size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteTeacher(row.id)}
                                                        className="text-red-500 hover:text-red-700 p-1 rounded-md transition-colors"
                                                        title="Delete Record"
                                                    >
                                                        <FaTrashCan size={15} />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {teachersList.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={8} align="center" className="text-slate-400 py-6">
                                                No teacher records found. Click 'Add Teacher' to create one.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    {/* Charts Side Panel */}
                    <div className='col-span-2 flex flex-col gap-4'>
                        <div className="bg-white rounded-lg p-3 shadow-lg border border-slate-50"><MyPieChart /></div>
                        <div className="bg-white rounded-lg p-3 shadow-lg border border-slate-50"><DeptDist /></div>
                    </div>
                </div>
            </div>

            {/* Shared Modal Add / Edit Form UI Implementation */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalBoxStyle}>
                    <Typography variant="h6" component="h2" className="font-bold text-slate-800 mb-4">
                        {isEditMode ? 'Modify Teacher Details' : 'Add a New Teacher'}
                    </Typography>

                    <form className="flex flex-col gap-[1.1rem] mt-4" onSubmit={handleSubmit}>
                        
                        {/* Auto Generated Teacher ID Field */}
                        <div className="group relative w-full h-11 flex items-center px-3 rounded-lg bg-slate-100 border border-slate-200 opacity-75">
                            <input
                                className="text-sm bg-transparent w-full h-full px-2 border-none text-slate-500 font-bold outline-none"
                                type="text"
                                name="teacherId"
                                placeholder='Teacher ID'
                                value={formData.teacherId}
                                readOnly
                            />
                        </div>

                        {/* Name Field */}
                        <div className={inputWrapperClass}>
                            <input
                                className={inputFieldClass}
                                type="text"
                                name="name"
                                placeholder='Enter Teacher Name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" className={clearBtnClass} onClick={() => handleClearField('name')}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Image Avatar Field */}
                        <div className={inputWrapperClass}>
                            <input
                                className={inputFieldClass}
                                type="text"
                                name="photo"
                                placeholder='Enter Teacher Photo URL'
                                value={formData.photo}
                                onChange={handleChange}
                            />
                            <button type="button" className={clearBtnClass} onClick={() => handleClearField('photo')}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Class Field */}
                        <div className={inputWrapperClass}>
                            <input
                                className={inputFieldClass}
                                type="text"
                                name="class"
                                placeholder='Enter Assigned Class'
                                value={formData.class}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" className={clearBtnClass} onClick={() => handleClearField('class')}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Subject Field */}
                        <div className={inputWrapperClass}>
                            <input
                                className={inputFieldClass}
                                type="text"
                                name="subject"
                                placeholder='Enter Main Core Subject'
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" className={clearBtnClass} onClick={() => handleClearField('subject')}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Experience Field */}
                        <div className={inputWrapperClass}>
                            <input
                                className={inputFieldClass}
                                type="text"
                                name="experience"
                                placeholder='Enter Years of Experience'
                                value={formData.experience}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" className={clearBtnClass} onClick={() => handleClearField('experience')}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Contact Field */}
                        <div className={inputWrapperClass}>
                            <input
                                className={inputFieldClass}
                                type="text"
                                name="contact"
                                placeholder='Enter Contact Phone No'
                                value={formData.contact}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" className={clearBtnClass} onClick={() => handleClearField('contact')}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Status Dropdown Box */}
                        <div className="group relative w-full h-11 flex items-center px-3 rounded-lg bg-white border border-slate-200 transition-all duration-500 focus-within:rounded-sm focus-within:border-transparent before:content-[''] before:absolute before:bg-[#2f2ee9] before:scale-x-0 before:origin-center before:w-full before:h-[2px] before:left-0 before:bottom-[-1px] before:rounded-sm before:transition-transform before:duration-300 focus-within:before:scale-x-100">
                            <select
                                className="text-sm bg-transparent w-full h-full px-2 border-none text-slate-800 focus:outline-none cursor-pointer"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="On leave">On leave</option>
                                <option value="Probation">Probation</option>
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            className="bg-[#2f2ee9] text-white border-none p-3 text-base font-semibold rounded-lg cursor-pointer transition-all duration-200 mt-2 shadow-md shadow-blue-600/10 hover:bg-[#1e1dd0] active:scale-[0.98]"
                        >
                            {isEditMode ? 'Update Teacher Record' : 'Submit Teacher'}
                        </button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default Teachers;