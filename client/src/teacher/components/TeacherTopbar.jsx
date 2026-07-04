import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";

const TeacherTopbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className="w-full h-20 bg-white border-b border-slate-100 shadow-sm flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="w-20"></div>

      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[620px]">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

          <input
            type="text"
            placeholder="Search students, classes, assignments..."
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <IoIosNotifications className="text-3xl text-slate-700" />

          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-white">
            4
          </span>
        </div>

        <div className="h-10 w-px bg-slate-200"></div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="https://i.pravatar.cc/100?img=47"
              alt="Teacher profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
            />

            <div className="text-left hidden md:block">
              <h3 className="text-sm font-bold text-slate-900">
                Ms. Ananya Joseph
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Science Teacher
              </p>
            </div>

            <IoChevronDown
              className={`text-slate-700 transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-16 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/70 p-2 z-50">
              <div className="px-3 py-3 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-900">
                  Ms. Ananya Joseph
                </h4>
                <p className="text-xs text-slate-500">Science Teacher</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-3 mt-1 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherTopbar;
