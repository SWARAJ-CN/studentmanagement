import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

import { FaRegUser } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";
import { LuUsersRound } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { PiTable } from "react-icons/pi";
import { IoMegaphoneOutline } from "react-icons/io5";

import { getNoticeAPI, getTeacherAPI } from "../../services/allAPI";

const TeacherSidebar = () => {
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [noticesList, setNoticesList] = useState([]);

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
        setTeacherClasses(normalizeAssignedClasses(parsedTeacher));
      } catch (error) {
        console.log(error);
      }
    }

    const result = await getTeacherAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const teachers = Array.isArray(result.data) ? result.data : [];

      const foundTeacher = teachers.find((teacher) => {
        const teacherId = teacher.teacherId || teacher.teacher_id || "";
        const id = teacher.id || "";

        return (
          String(teacherId) === String(loggedTeacherId) ||
          String(id) === String(loggedTeacherId)
        );
      });

      if (foundTeacher) {
        setTeacherClasses(normalizeAssignedClasses(foundTeacher));

        localStorage.setItem("teacherData", JSON.stringify(foundTeacher));
        localStorage.setItem(
          "teacherId",
          foundTeacher.teacherId || foundTeacher.teacher_id || foundTeacher.id
        );
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

  const sidebarLinks = [
    {
      path: "/teacher/dashboard",
      label: "Dashboard",
      icon: <FaGraduationCap />,
    },
    {
      path: "/teacher/profile",
      label: "My Profile",
      icon: <FaRegUser />,
    },
    {
      path: "/teacher/classes",
      label: "My Classes",
      icon: <HiOutlineBookOpen />,
    },
    {
      path: "/teacher/students",
      label: "Students",
      icon: <LuUsersRound />,
    },
    {
      path: "/teacher/attendance",
      label: "Attendance",
      icon: <FaRegCalendarCheck />,
    },
    {
      path: "/teacher/exams",
      label: "Exams",
      icon: <FaClipboardList />,
    },
    {
      path: "/teacher/results",
      label: "Results",
      icon: <MdBarChart />,
    },
    {
      path: "/teacher/timetable",
      label: "Timetable",
      icon: <PiTable />,
    },
    {
      path: "/teacher/notices",
      label: "Notices",
      icon: <IoMegaphoneOutline />,
      badge: noticeCount,
    },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
        : "text-blue-100 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="fixed left-0 top-0 h-screen w-[275px] bg-gradient-to-b from-[#001b4d] via-[#002b75] to-[#003b91] text-white px-4 py-5 overflow-y-auto z-50">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
          <FaGraduationCap className="text-4xl text-white" />
        </div>

        <div>
          <h1 className="font-black text-lg leading-tight">ST MARY&apos;S</h1>
          <p className="text-sm font-semibold leading-tight text-blue-100">
            Student
            <br />
            Management System
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {sidebarLinks.map((link, index) => (
          <NavLink key={index} to={link.path} className={navLinkClass}>
            <span className="text-xl">{link.icon}</span>

            <span className="flex-1">{link.label}</span>

            {link.badge > 0 && (
              <span className="min-w-6 h-6 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold border border-white/30">
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 p-5 rounded-2xl bg-white/10 border border-white/10 shadow-lg shadow-black/10">
        <div className="w-16 h-16 mb-3">
          <div className="w-16 h-12 bg-blue-500 rounded-md relative flex items-center justify-center">
            <FaGraduationCap className="text-3xl text-white" />
            <span className="absolute -top-2 -right-2 text-yellow-300 text-lg">
              ✦
            </span>
            <span className="absolute top-8 -right-5 text-green-400 text-sm">
              ✦
            </span>
            <span className="absolute -bottom-3 right-2 text-blue-300 text-sm">
              ✦
            </span>
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2">Stay on Track!</h3>
        <p className="text-sm leading-6 text-blue-100">
          Keep your classes organized and help every student succeed.
        </p>
      </div>
    </div>
  );
};

export default TeacherSidebar;