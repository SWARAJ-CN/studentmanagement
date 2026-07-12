import React, { useState } from "react";

import {
  ShieldCheck,
  Layers,
  Compass,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  CalendarCheck,
  GraduationCap,
  FileSpreadsheet,
  ChevronRight,
} from "lucide-react";

import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getStudentAPI } from "../services/allAPI";

const StudentLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const normalizeStudent = (student) => {
    if (!student) return null;

    return {
      id: student.id,
      studentId:
        student.studentId ||
        student.student_id ||
        student.admissionNo ||
        student.idNumber ||
        "",
      name: student.name || student.studentName || student.student_name || "",
      email: student.email || student.student_email || "",
      password: student.password || student.student_pass || "",
      className:
        student.className ||
        student.class ||
        student.student_class ||
        student.classSection ||
        "",
      status: student.status || "Active",
    };
  };

  const clearStudentLoginData = () => {
    localStorage.removeItem("studentAuth");
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentDbId");
    localStorage.removeItem("studentClass");
    localStorage.removeItem("studentData");
    localStorage.removeItem("rememberStudent");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.identifier.trim() || !credentials.password.trim()) {
      toast.error("Please enter Student ID or Email and password");
      return;
    }

    try {
      setIsLoading(true);

      const result = await getStudentAPI();

      if (result?.status >= 200 && result?.status < 300) {
        const students = Array.isArray(result.data) ? result.data : [];

        const matchedStudent = students.find((student) => {
          const normalized = normalizeStudent(student);

          const enteredIdentifier = credentials.identifier
            .trim()
            .toLowerCase();

          const studentId = normalized.studentId.trim().toLowerCase();
          const studentEmail = normalized.email.trim().toLowerCase();
          const studentPassword = normalized.password.trim();

          return (
            (studentId === enteredIdentifier ||
              studentEmail === enteredIdentifier) &&
            studentPassword === credentials.password.trim()
          );
        });

        if (!matchedStudent) {
          clearStudentLoginData();
          toast.error("Invalid Student ID or password");
          return;
        }

        const normalizedStudent = normalizeStudent(matchedStudent);

        if (normalizedStudent.status === "Inactive") {
          clearStudentLoginData();
          toast.error("Your account is inactive. Contact your school.");
          return;
        }

        localStorage.setItem("studentAuth", "true");
        localStorage.setItem("studentId", normalizedStudent.studentId);
        localStorage.setItem("studentDbId", normalizedStudent.id);
        localStorage.setItem("studentClass", normalizedStudent.className);
        localStorage.setItem("studentData", JSON.stringify(matchedStudent));

        if (credentials.rememberMe) {
          localStorage.setItem("rememberStudent", "true");
        } else {
          localStorage.removeItem("rememberStudent");
        }

        toast.success(`Welcome back ${normalizedStudent.name || "Student"}`);
        navigate("/student-dashboard");
      } else {
        clearStudentLoginData();
        toast.error("Unable to login. Please try again.");
      }
    } catch (error) {
      console.log(error);
      clearStudentLoginData();
      toast.error("Server error. Please check JSON Server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pt-20 pb-12 text-slate-800 font-sans flex items-center justify-center selection:bg-blue-100 selection:text-blue-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-transparent">
          <div className="lg:col-span-7 space-y-8 text-left py-4 pr-0 lg:pr-6">
            <div className="space-y-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <span
                  onClick={() => navigate("/")}
                  className="hover:text-blue-600 cursor-pointer transition-colors"
                >
                  Home
                </span>

                <ChevronRight size={14} className="text-slate-300" />

                <span className="text-blue-600">Student Login</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                Student <span className="text-blue-600">Login</span>
              </h1>

              <p className="text-slate-500 text-sm sm:text-base font-medium max-w-md leading-relaxed">
                Access your student portal to view attendance, timetable,
                exams, results, notices and more.
              </p>
            </div>

            <div className="space-y-5 max-w-lg">
              <div className="flex gap-4 items-start">
                <span className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-blue-600 bg-blue-50/80 shadow-sm">
                  <ShieldCheck size={20} />
                </span>

                <div className="space-y-0.5">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Your secure gateway
                  </h3>
                  <p className="text-slate-400 text-xs font-normal leading-relaxed">
                    Access your dashboard with confidence and complete peace of
                    mind.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-emerald-600 bg-emerald-50/80 shadow-sm">
                  <Layers size={20} />
                </span>

                <div className="space-y-0.5">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    All in one place
                  </h3>
                  <p className="text-slate-400 text-xs font-normal leading-relaxed">
                    Attendance, exams, results, timetable and notices in one
                    place.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-purple-600 bg-purple-50/80 shadow-sm">
                  <Compass size={20} />
                </span>

                <div className="space-y-0.5">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Empowering your journey
                  </h3>
                  <p className="text-slate-400 text-xs font-normal leading-relaxed">
                    Stay informed, stay ahead and achieve your academic goals.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0 aspect-[4/3] rounded-2xl overflow-hidden mix-blend-multiply opacity-95">
              <img
                src={assets.login}
                alt="Students studying over books on portal platform illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 space-y-6 w-full max-w-md mx-auto">
            <div className="text-center space-y-2">
              <span className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <GraduationCap size={26} />
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Welcome Back!
              </h2>

              <p className="text-slate-400 text-xs font-semibold tracking-wide">
                Use your registered student credentials to continue.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide">
                  Student ID or Email
                </label>

                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Enter your Student ID or Email"
                    value={credentials.identifier}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        identifier: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium"
                    required
                  />

                  <Mail
                    size={16}
                    className="text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide">
                  Password
                </label>

                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-11 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium"
                    required
                  />

                  <Lock
                    size={16}
                    className="text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold pt-1">
                <label className="flex items-center gap-2 text-slate-500 select-none cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={credentials.rememberMe}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        rememberMe: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 focus:ring-offset-0 transition-colors cursor-pointer"
                  />
                  Remember me
                </label>
              </div>

              <div className="space-y-3 pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer group ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <LogIn
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                  {isLoading ? "Checking..." : "Login"}
                </button>

                <div className="relative flex py-2 items-center font-semibold text-slate-300 text-[11px] uppercase tracking-wider">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink mx-3 text-slate-400">or</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                <button
                  onClick={() => navigate("/")}
                  type="button"
                  className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  Back to Home
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 divide-y-2 md:divide-y-0 md:divide-x divide-slate-50 shadow-sm">
          <div className="flex items-center gap-3 justify-center p-2 text-left">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-blue-600 bg-blue-50 shrink-0">
              <ShieldCheck size={18} />
            </span>

            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-800 leading-tight">
                Secure Access
              </h4>
              <p className="text-[10px] text-slate-400 font-medium leading-none">
                Your data is fully protected.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center p-2 pt-4 md:pt-2 md:pl-4 text-left">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-emerald-600 bg-emerald-50 shrink-0">
              <CalendarCheck size={18} />
            </span>

            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-800 leading-tight">
                View Attendance
              </h4>
              <p className="text-[10px] text-slate-400 font-medium leading-none">
                Check records anytime.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center p-2 pt-4 md:pt-2 md:pl-4 text-left">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-indigo-600 bg-indigo-50 shrink-0">
              <FileSpreadsheet size={18} />
            </span>

            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-800 leading-tight">
                Check Results
              </h4>
              <p className="text-[10px] text-slate-400 font-medium leading-none">
                View final report cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;