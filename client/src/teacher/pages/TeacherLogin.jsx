import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import teacherLoginImg from "../../assets/teacher-login.png";
import teacherLogo from "../../assets/techer-logo.png";

import { FaIdCard } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { LuUsersRound } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { FaTv } from "react-icons/fa";
import { LuClipboardCheck } from "react-icons/lu";
import { FaTrophy } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

const TeacherLogin = () => {
  const navigate = useNavigate();

  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!teacherId || !password) {
      alert("Please enter Teacher ID/Email and password");
      return;
    }
    navigate("/teacher/dashboard");

    console.log({ teacherId, password, rememberMe });
  };

  const leftFeatures = [
    {
      icon: <LuUsersRound />,
      title: "Manage Classes",
      desc: "Organize your classes, subjects, and timetable easily.",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      icon: <FaRegCalendarCheck />,
      title: "Mark Attendance",
      desc: "Take and manage attendance quickly and accurately.",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      icon: <GiProgression />,
      title: "Track Student Progress",
      desc: "View performance reports and monitor student improvement.",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  const bottomFeatures = [
    {
      icon: <FaTv />,
      title: "Class Management",
      desc: "Create classes, assign subjects, and manage timetables.",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      icon: <LuClipboardCheck />,
      title: "Attendance",
      desc: "Mark attendance and generate detailed attendance reports.",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      icon: <FaTrophy />,
      title: "Student Results",
      desc: "Enter marks, publish results, and track student performance.",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      icon: <IoIosNotifications />,
      title: "School Notices",
      desc: "View important announcements and stay informed.",
      bg: "bg-orange-100",
      color: "text-orange-500",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
        <div className="relative px-5 sm:px-8 md:px-12 lg:px-20 py-10 lg:py-14">
          <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl -z-0"></div>
          <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-0"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* left content */}
            <div className="lg:col-span-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                Teacher Login
              </h1>

              <div className="w-14 h-1 bg-blue-600 rounded-full mt-4 mb-5"></div>

              <p className="text-slate-600 text-base sm:text-lg leading-8 max-w-xl">
                Access your classes, manage attendance, create assignments,
                track student progress, view results, and stay updated with
                school notices — all in one place.
              </p>

              <div className="mt-8 space-y-5">
                {leftFeatures.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div
                      className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-2xl shadow-sm`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-6">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* center image */}
            <div className="lg:col-span-4 flex justify-center">
              <img
                src={teacherLoginImg}
                alt="Teacher working at desk"
                className="w-full max-w-[520px] object-contain drop-shadow-sm"
              />
            </div>

            {/* login form */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-blue-200/50 border border-white p-7 sm:p-8">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 -mt-14 border-4 border-white">
                    <img
                      src={teacherLogo}
                      alt="Teacher logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>

                <div className="text-center mt-4 mb-7">
                  <h2 className="text-2xl font-black text-slate-900">
                    Welcome Back, Teacher!
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Login to access your dashboard
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Teacher ID or Email
                    </label>

                    <div className="relative">
                      <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        placeholder="Enter Teacher ID or Email"
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Password
                    </label>

                    <div className="relative">
                      <CiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      Remember me
                    </label>

                    <button
                      type="button"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                  >
                    <CiLock className="text-xl" />
                    Login
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <span className="text-sm text-slate-400">or</span>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full h-12 rounded-xl border border-blue-500 text-blue-600 font-bold hover:bg-blue-50 transition-all"
                  >
                    ← Back to Home
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* bottom feature */}
          <div className="relative z-10 mt-10 max-w-7xl mx-auto bg-white rounded-3xl shadow-xl shadow-blue-200/40 border border-slate-100 px-5 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {bottomFeatures.map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-4 items-center ${
                    index !== bottomFeatures.length - 1
                      ? "lg:border-r lg:border-slate-200"
                      : ""
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full ${item.bg} ${item.color} flex items-center justify-center text-2xl shrink-0`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TeacherLogin;
