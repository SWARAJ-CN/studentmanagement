import React from 'react';
import toast from 'react-hot-toast';
import {
  FaGraduationCap,
  FaChevronRight,
  FaPhone,
  FaEnvelope,
  FaMapPin,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';

const Footer = () => {

  const handleEmailBox = () =>{
    toast.success('Request send')
  }

  return (
    <footer className="w-full bg-[#032B5B] text-slate-200 pt-16 pb-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 border-b border-slate-700/50 pb-12">

        <div className="space-y-5 lg:col-span-1">
          <div className="flex items-center gap-2 text-white">
            <FaGraduationCap size={36} className="text-white" />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-wider leading-none">SMS</span>
              <span className="text-[10px] text-slate-300 mt-0.5">Student Management System</span>
            </div>
          </div>
          <p className="text-sm text-slate-300/90 leading-relaxed font-normal">
            Empowering students and simplifying education through smart digital management.
          </p>
         
          <div className="flex items-center gap-3 pt-2">
            <a href="#facebook" className="w-8 h-8 rounded-full border border-slate-500/50 flex items-center justify-center text-slate-300 hover:text-white hover:border-white transition-colors">
              <FaFacebook size={16} />
            </a>
            <a href="#twitter" className="w-8 h-8 rounded-full border border-slate-500/50 flex items-center justify-center text-slate-300 hover:text-white hover:border-white transition-colors">
              <FaTwitter size={16} />
            </a>
            <a href="#instagram" className="w-8 h-8 rounded-full border border-slate-500/50 flex items-center justify-center text-slate-300 hover:text-white hover:border-white transition-colors">
              <FaInstagram size={16} />
            </a>
            <a href="#linkedin" className="w-8 h-8 rounded-full border border-slate-500/50 flex items-center justify-center text-slate-300 hover:text-white hover:border-white transition-colors">
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>

     
        <div className="space-y-4 lg:pl-6">
          <h4 className="text-white font-bold text-base tracking-wide">Quick Links</h4>
          <ul className="space-y-2.5 text-sm font-medium">
            {['Home', 'About Us', 'Features', 'Students', 'Notices', 'Contact Us'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group">
                  <FaChevronRight size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 lg:pl-4">
          <h4 className="text-white font-bold text-base tracking-wide">Useful Links</h4>
          <ul className="space-y-2.5 text-sm font-medium">
            {['Login', 'Student Login', 'Terms & Conditions', 'Privacy Policy', 'Help & Support', 'FAQs'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group">
                  <FaChevronRight size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

   
        <div className="space-y-4">
          <h4 className="text-white font-bold text-base tracking-wide">Contact Us</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-start gap-3 text-slate-300">
              <FaPhone size={18} className="text-slate-400 shrink-0 mt-0.5" />
              <span>+91 12345 67890</span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <FaEnvelope size={18} className="text-slate-400 shrink-0 mt-0.5" />
              <span className="break-all">info@smsportal.com</span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <FaMapPin size={18} className="text-slate-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                123, Education Street,<br />Knowledge City, 560001
              </span>
            </li>
          </ul>
        </div>

    
        <div className="space-y-4">
          <h4 className="text-white font-bold text-base tracking-wide">Newsletter</h4>
          <p className="text-sm text-slate-300/90 leading-relaxed font-normal">
            Subscribe to get the latest updates and announcements.
          </p>
          <div className="flex max-w-sm rounded-xl overflow-hidden bg-white border border-slate-200 p-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-slate-800 bg-transparent placeholder-slate-400 focus:outline-none text-sm"
            />
            <button 
            onClick={handleEmailBox}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition-colors flex items-center justify-center shrink-0 cursor-pointer">
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 text-center text-xs text-slate-400 font-medium tracking-wide">
        &copy; {new Date().getFullYear()} Student Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;