import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline, IoChevronDown } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";

import { getNoticeAPI, getTeacherAPI } from "../../services/allAPI";

const TeacherTopbar = () => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [noticesList, setNoticesList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dropdownRef = useRef(null);

  const normalizeClassName = (value = "") => {
    const cleanValue = String(value).trim().toUpperCase().replace(/\s+/g, "");

    if (!cleanValue) return "";

    if (cleanValue.startsWith("CLASS")) return cleanValue;

    return `CLASS${cleanValue}`;
  };

  const normalizeAssignedClasses = (teacher) => {
    if (!teacher) return [];

    if (Array.isArray(teacher.assignedClasses)) {
      return teacher.assignedClasses
        .map((item) => {
          if (typeof item === "string") return item;
          return item.className || item.class || item.classSection || "";
        })
        .filter(Boolean);
    }

    if (teacher.class) {
      return teacher.class
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  const normalizeTeacher = (teacher) => {
    if (!teacher) return null;

    return {
      id: teacher.id || "",
      teacherId: teacher.teacherId || teacher.teacher_id || "",
      name:
        teacher.name ||
        teacher.teacherName ||
        teacher.teacher_name ||
        "Teacher",
      email: teacher.email || "",
      department: teacher.department || "",
      subject: teacher.subject || "",
      photo:
        teacher.photo ||
        teacher.image ||
        teacher.profileImage ||
        teacher.teacher_image ||
        "",
      status: teacher.status || "Active",
      assignedClasses: normalizeAssignedClasses(teacher),
    };
  };

  const normalizeNotice = (notice) => {
    return {
      id: notice.id,
      title: notice.title || "",
      description: notice.description || notice.content || "",
      category: notice.category || "General",
      audience: notice.audience || "All",
      status: notice.status || "Active",
      date: notice.date || notice.createdAt || "",
    };
  };

  const getLoggedTeacher = async () => {
    const loggedTeacherId = localStorage.getItem("teacherId");
    const storedTeacher = localStorage.getItem("teacherData");

    if (storedTeacher) {
      try {
        const parsedTeacher = JSON.parse(storedTeacher);
        const normalizedTeacher = normalizeTeacher(parsedTeacher);

        setTeacherData(normalizedTeacher);
        setTeacherClasses(normalizedTeacher?.assignedClasses || []);
      } catch (error) {
        console.log(error);
      }
    }

    const result = await getTeacherAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const teachers = Array.isArray(result.data) ? result.data : [];

      const foundTeacher = teachers.find((teacher) => {
        const normalizedTeacher = normalizeTeacher(teacher);

        return (
          String(normalizedTeacher.teacherId) === String(loggedTeacherId) ||
          String(normalizedTeacher.id) === String(loggedTeacherId)
        );
      });

      if (foundTeacher) {
        const normalizedTeacher = normalizeTeacher(foundTeacher);

        setTeacherData(normalizedTeacher);
        setTeacherClasses(normalizedTeacher.assignedClasses || []);

        localStorage.setItem("teacherData", JSON.stringify(foundTeacher));
        localStorage.setItem("teacherId", normalizedTeacher.teacherId);
      }
    }
  };

  const getAllNotices = async () => {
    const result = await getNoticeAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setNoticesList(Array.isArray(result.data) ? result.data : []);
    }
  };

  useEffect(() => {
    getLoggedTeacher();
    getAllNotices();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const noticeCount = useMemo(() => {
    return noticesList
      .map((notice) => normalizeNotice(notice))
      .filter((notice) => {
        if (notice.status !== "Active") return false;

        const audience = String(notice.audience || "").trim().toLowerCase();

        if (audience === "all") return true;
        if (audience === "teachers") return true;
        if (audience === "teacher") return true;

        return teacherClasses.some(
          (className) =>
            normalizeClassName(className) === normalizeClassName(notice.audience)
        );
      }).length;
  }, [noticesList, teacherClasses]);

  const getInitials = (name = "") => {
    const words = name.trim().split(" ").filter(Boolean);

    if (words.length === 0) return "TC";

    return words
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = searchText.trim().toLowerCase();

    if (!keyword) return;

    if (keyword.includes("student")) navigate("/teacher/students");
    else if (keyword.includes("class")) navigate("/teacher/classes");
    else if (keyword.includes("attendance")) navigate("/teacher/attendance");
    else if (keyword.includes("exam")) navigate("/teacher/exams");
    else if (keyword.includes("result")) navigate("/teacher/results");
    else if (keyword.includes("time")) navigate("/teacher/timetable");
    else if (keyword.includes("notice")) navigate("/teacher/notices");
    else if (keyword.includes("profile")) navigate("/teacher/profile");
    else navigate("/teacher/dashboard");

    setSearchText("");
  };

  const handleLogout = () => {
    setShowDropdown(false);

    localStorage.removeItem("teacherId");
    localStorage.removeItem("teacherData");
    localStorage.removeItem("teacherAuth");

    navigate("/teacher-login");
  };

  return (
    <div className="w-full h-20 bg-white border-b border-slate-100 shadow-sm flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="w-20"></div>

      <form onSubmit={handleSearch} className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[620px]">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search students, classes, exams, results..."
            className="shadow-sm w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          />
        </div>
      </form>

      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/teacher/notices")}
          className="relative cursor-pointer"
        >
          <IoIosNotifications className="text-3xl text-slate-700" />

          {noticeCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-white">
              {noticeCount}
            </span>
          )}
        </button>

        <div className="h-10 w-px bg-slate-200"></div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 cursor-pointer"
          >
            {teacherData?.photo ? (
              <img
                src={teacherData.photo}
                alt={teacherData.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black border-2 border-blue-50">
                {getInitials(teacherData?.name)}
              </div>
            )}

            <div className="text-left hidden md:block">
              <h3 className="text-sm font-bold text-slate-900">
                {teacherData?.name || "Teacher"}
              </h3>

              <p className="text-xs text-slate-500 font-medium">
                {teacherData?.subject || teacherData?.department || "Teacher"}
              </p>
            </div>

            <IoChevronDown
              className={`text-slate-700 transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-16 w-60 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/70 p-2 z-50">
              <div className="px-3 py-3 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-900">
                  {teacherData?.name || "Teacher"}
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  {teacherData?.teacherId || "Teacher ID"}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {teacherData?.subject || teacherData?.department || "Teacher"}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate("/teacher/profile");
                }}
                className="w-full text-left px-3 py-3 mt-1 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
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