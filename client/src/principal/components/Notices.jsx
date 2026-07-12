import React, { useState, useEffect } from 'react';
import { FaCirclePlus, FaTrashCan, FaPenToSquare, FaFileLines, FaBullhorn, FaCircleCheck } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getNoticeAPI, registerNoticeAPI, deleteNoticeAPI, updateNoticeAPI } from '../../services/allAPI';

function Notices() {
    // Modal Open/Close & Edit States
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    // Dynamic Database State
    const [noticesList, setNoticesList] = useState([]);

    // Base Record Form Blueprints
    const initialFormState = {
        noticeId: '',
        title: '',
        category: 'General',
        date: '',
        audience: 'All',
        status: 'Active'
    };

    const [formData, setFormData] = useState(initialFormState);

    // Open Modal for New Entries
    const handleOpen = () => {
        setIsEditMode(false);
        setFormData({ ...initialFormState, noticeId: generateUniqueID() });
        setOpen(true);
    };

    // Open Modal for Modifying Entries 
    const handleEditOpen = (notice) => {
        setIsEditMode(true);
        setEditId(notice.id);
        setFormData(notice);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialFormState);
        setEditId(null);
    };

    // Generates a fully unique key matching format 'NTC###' avoiding local collisions
    const generateUniqueID = () => {
        let uniqueID = '';
        let isDuplicate = true;

        while (isDuplicate) {
            const randomNum = Math.floor(100 + Math.random() * 900); // Guarantees a clean 3-digit range (100-999)
            uniqueID = `NTC${randomNum}`;
            isDuplicate = noticesList.some(notice => notice.noticeId === uniqueID);
        }
        return uniqueID;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClearField = (fieldName) => {
        if (fieldName === 'noticeId') return; // Do not clear immutable assigned ID strings
        setFormData(prev => ({ ...prev, [fieldName]: '' }));
    };

    // Handle form submit (Add or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditMode) {
            const result = await updateNoticeAPI(editId, formData);
            if (result?.status >= 200 && result?.status < 300) {
                displayNotices();
                handleClose();
            }
        } else {
            const result = await registerNoticeAPI(formData);
            if (result?.status >= 200 && result?.status < 300) {
                displayNotices();
                handleClose();
            }
        }
    };

    // Handle entry deletion
    const handleDeleteNotice = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this announcement notice?")) {
            const result = await deleteNoticeAPI(id);
            if (result?.status >= 200 && result?.status < 300) {
                displayNotices();
            }
        }
    };

    const displayNotices = async () => {
        const result = await getNoticeAPI();
        if (result?.data) {
            setNoticesList(result.data);
        }
    };

    useEffect(() => {
        displayNotices();
    }, []);

    // Metric Calculations
    const activeCount = noticesList.filter(n => n.status === 'Active').length;
    const urgentCount = noticesList.filter(n => n.category === 'Urgent').length;

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
                <h1 className='font-bold text-3xl text-slate-800'>Notices & Announcements</h1>
                <p className='text-slate-500 text-sm mt-1'>Broadcast, modify, and track official bulletin announcements across the school network</p>

                {/* Metric Cards Top Section */}
                <div className='flex p-5 gap-5'>
                    <div className='flex items-center gap-5 rounded-lg shadow-xl basis-full p-3 bg-white'>
                        <span className='bg-violet-100 text-violet-600 p-3 rounded-full'><FaBullhorn size={22} /></span>
                        <div>
                            <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>Total Notices</p>
                            <p className='text-2xl font-bold text-slate-800'>{noticesList.length}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 rounded-lg shadow-xl p-3 basis-full bg-white'>
                        <span className='bg-emerald-100 text-emerald-600 p-3 rounded-full'><FaCircleCheck size={22} /></span>
                        <div>
                            <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>Active Broadcasts</p>
                            <p className='text-2xl font-bold text-slate-800'>{activeCount}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 rounded-lg shadow-xl p-3 basis-full bg-white'>
                        <span className='bg-rose-100 text-rose-600 p-3 rounded-full'><MdOutlineAccessTimeFilled size={22} /></span>
                        <div>
                            <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>Urgent Alerts</p>
                            <p className='text-2xl font-bold text-slate-800'>{urgentCount}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Board Panel Block */}
                <div className='w-full rounded-lg p-5 shadow-lg bg-white border border-slate-100'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='font-bold text-2xl text-slate-800'>Bulletin Board</h1>
                        <button
                            className='flex items-center px-4 py-2 bg-[#2f2ee9] text-white rounded-xl gap-2 font-semibold hover:bg-[#1e1dd0] active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-600/10'
                            onClick={handleOpen}
                        >
                            <FaCirclePlus />Create Notice
                        </button>
                    </div>

                    <div className='flex gap-2 mb-4'>
                        <input type="text" placeholder='Search by keyword, notice ID' className='px-3 py-1.5 border border-slate-200 rounded-lg w-1/4 text-sm focus:outline-none focus:border-blue-500' />
                        <select className='border border-slate-200 rounded-lg p-1.5 text-sm text-slate-600 focus:outline-none'>
                            <option value="">All Categories</option>
                        </select>
                        <select className='border border-slate-200 rounded-lg p-1.5 text-sm text-slate-600 focus:outline-none'>
                            <option value="">All Statuses</option>
                        </select>
                    </div>

                    <TableContainer component={Paper} className='mt-3 shadow-none border border-slate-100'>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="notices table">
                            <TableHead className="bg-slate-50">
                                <TableRow>
                                    <TableCell className="font-semibold text-slate-700">Notice ID</TableCell>
                                    <TableCell className="font-semibold text-slate-700">Notice Title</TableCell>
                                    <TableCell className="font-semibold text-slate-700">Category</TableCell>
                                    <TableCell className="font-semibold text-slate-700">Date Posted</TableCell>
                                    <TableCell className="font-semibold text-slate-700">Target Audience</TableCell>
                                    <TableCell className="font-semibold text-slate-700" align="center">Status</TableCell>
                                    <TableCell className="font-semibold text-slate-700" align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {noticesList.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <TableCell className="font-semibold text-slate-500 text-xs">{row.noticeId || 'N/A'}</TableCell>
                                        <TableCell component="th" scope="row">
                                            <div className='flex gap-3 items-center'>
                                                <span className='text-slate-400'><FaFileLines size={16} /></span>
                                                <span className="font-medium text-slate-800">{row.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                                row.category === 'Urgent' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                                                row.category === 'Event' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                                                'bg-slate-100 text-slate-700'
                                            }`}>
                                                {row.category}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-slate-600">{row.date}</TableCell>
                                        <TableCell className="text-slate-600 font-medium">{row.audience}</TableCell>
                                        <TableCell align="center">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
                                                row.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                'bg-slate-100 text-slate-400 border border-slate-200 line-through'
                                            }`}>
                                                {row.status}
                                            </span>
                                        </TableCell>
                                        <TableCell align="center">
                                            <div className="flex gap-2 justify-center items-center">
                                                <button 
                                                    onClick={() => handleEditOpen(row)}
                                                    className="text-blue-600 hover:text-blue-800 p-1 rounded-md transition-colors"
                                                    title="Edit Notice"
                                                >
                                                    <FaPenToSquare size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteNotice(row.id)}
                                                    className="text-red-500 hover:text-red-700 p-1 rounded-md transition-colors"
                                                    title="Delete Notice"
                                                >
                                                    <FaTrashCan size={15} />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {noticesList.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" className="text-slate-400 py-8">
                                            No notices listed on the board. Click 'Create Notice' to post a statement.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            {/* Shared Modal Add / Edit Form UI Implementation */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalBoxStyle}>
                    <Typography variant="h6" component="h2" className="font-bold text-slate-800 mb-4">
                        {isEditMode ? 'Modify Circular Notice' : 'Post a New Notice'}
                    </Typography>

                    <form className="flex flex-col gap-[1.1rem] mt-4" onSubmit={handleSubmit}>
                        
                        {/* Auto Generated Notice ID Field */}
                        <div className="group relative w-full h-11 flex items-center px-3 rounded-lg bg-slate-100 border border-slate-200 opacity-75">
                            <input
                                className="text-sm bg-transparent w-full h-full px-2 border-none text-slate-500 font-bold outline-none"
                                type="text"
                                name="noticeId"
                                placeholder='Notice ID'
                                value={formData.noticeId}
                                readOnly
                            />
                        </div>

                        {/* Notice Title Field */}
                        <div className={inputWrapperClass}>
                            <input
                                className={inputFieldClass}
                                type="text"
                                name="title"
                                placeholder='Notice Headline / Title'
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" className={clearBtnClass} onClick={() => handleClearField('title')}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Category Dropdown Box */}
                        <div className="group relative w-full h-11 flex items-center px-3 rounded-lg bg-white border border-slate-200 transition-all duration-500 focus-within:rounded-sm focus-within:border-transparent before:content-[''] before:absolute before:bg-[#2f2ee9] before:scale-x-0 before:origin-center before:w-full before:h-[2px] before:left-0 before:bottom-[-1px] before:rounded-sm before:transition-transform before:duration-300 focus-within:before:scale-x-100">
                            <select
                                className="text-sm bg-transparent w-full h-full px-2 border-none text-slate-800 focus:outline-none cursor-pointer"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="General">General Announcement</option>
                                <option value="Urgent">Urgent Alert</option>
                                <option value="Event">Event Celebration</option>
                                <option value="Holiday">Holiday circular</option>
                            </select>
                        </div>

                        {/* Date Picker Input Field */}
                        <div className="group relative w-full h-11 flex items-center px-4 rounded-lg bg-white border border-slate-200">
                            <input
                                className="text-sm bg-transparent w-full h-full border-none text-slate-800 focus:outline-none cursor-pointer"
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Target Audience Audience Field */}
                        <div className={inputWrapperClass}>
                            <input
                                className={inputFieldClass}
                                type="text"
                                name="audience"
                                placeholder='Audience (e.g., All, Class 10, Teachers)'
                                value={formData.audience}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" className={clearBtnClass} onClick={() => handleClearField('audience')}>
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
                                <option value="Active">Active (Displaying)</option>
                                <option value="Archived">Archived (Hidden)</option>
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            className="bg-[#2f2ee9] text-white border-none p-3 text-base font-semibold rounded-lg cursor-pointer transition-all duration-200 mt-2 shadow-md shadow-blue-600/10 hover:bg-[#1e1dd0] active:scale-[0.98]"
                        >
                            {isEditMode ? 'Update Notice Post' : 'Publish Notice Announcement'}
                        </button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default Notices;