import React, { useEffect, useMemo, useState } from "react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { IoSearchOutline } from "react-icons/io5";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa";
import { LuUsersRound } from "react-icons/lu";
import { MdTrendingUp } from "react-icons/md";

import toast from "react-hot-toast";

import {
  getTeacherAPI,
  getStudentAPI,
  getAttendanceAPI,
  registerAttendanceAPI,
  updateAttendanceAPI,
} from "../../services/allAPI";

const TeacherAttendance = () => {
  const [studentsList, setStudentsList] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const avatarColors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
    "bg-orange-100 text-orange-500",
    "bg-pink-100 text-pink-600",
    "bg-teal-100 text-teal-600",
  ];

  const classColors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
    "bg-orange-100 text-orange-500",
    "bg-cyan-100 text-cyan-600",
  ];

  const normalizeAssignedClasses = (teacherData) => {
    if (!teacherData) return [];

    if (Array.isArray(teacherData.assignedClasses)) {
      return teacherData.assignedClasses
        .map((item) => {
          if (typeof item === "string") return item;
          return item.className || item.class || item.classSection || "";
        })
        .filter(Boolean);
    }

    if (teacherData.class) {
      return teacherData.class
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  const normalizeStudent = (student) => {
    return {
      id: student.id,
      studentId: student.studentId || student.student_id || "",
      name: student.name || student.student_name || "",
      image: student.image || student.student_image || "",
      email: student.email || student.student_email || "",
      className: student.className || student.student_class || "",
      rollNo: student.rollNo || student.student_rollno || "",
      status: student.status || "Active",
    };
  };

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not added";

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) return dateValue;

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDayName = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const getLoggedTeacherClasses = async () => {
    const loggedTeacherId = localStorage.getItem("teacherId");

    const result = await getTeacherAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const foundTeacher = result.data.find(
        (teacher) => teacher.teacherId === loggedTeacherId
      );

      if (foundTeacher) {
        setTeacherClasses(normalizeAssignedClasses(foundTeacher));
      }
    }
  };

  const getAllStudents = async () => {
    const result = await getStudentAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setStudentsList(Array.isArray(result.data) ? result.data : []);
    }
  };

  const getAllAttendance = async () => {
    const result = await getAttendanceAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setAttendanceRecords(Array.isArray(result.data) ? result.data : []);
    }
  };

  useEffect(() => {
    getLoggedTeacherClasses();
    getAllStudents();
    getAllAttendance();
  }, []);

  const normalizedStudents = useMemo(() => {
    return studentsList.map((student) => normalizeStudent(student));
  }, [studentsList]);

  const classOptions = useMemo(() => {
    const classes =
      teacherClasses.length > 0
        ? teacherClasses
        : [...new Set(normalizedStudents.map((student) => student.className))];

    return classes.filter(Boolean);
  }, [teacherClasses, normalizedStudents]);

  const visibleStudents = useMemo(() => {
    let data = normalizedStudents.filter(
      (student) => student.status !== "Inactive"
    );

    if (teacherClasses.length > 0) {
      data = data.filter((student) =>
        teacherClasses.includes(student.className)
      );
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter(
        (student) =>
          student.name.toLowerCase().includes(keyword) ||
          student.studentId.toLowerCase().includes(keyword) ||
          student.className.toLowerCase().includes(keyword) ||
          String(student.rollNo).toLowerCase().includes(keyword)
      );
    }

    if (classFilter !== "All Classes") {
      data = data.filter((student) => student.className === classFilter);
    }

    return data;
  }, [normalizedStudents, teacherClasses, searchTerm, classFilter]);

  const getAttendanceRecord = (student) => {
    return attendanceRecords.find(
      (record) =>
        record.date === selectedDate &&
        (record.studentDbId === student.id ||
          record.studentId === student.studentId)
    );
  };

  const selectedDateRecords = useMemo(() => {
    return visibleStudents
      .map((student) => getAttendanceRecord(student))
      .filter(Boolean);
  }, [visibleStudents, attendanceRecords, selectedDate]);

  const presentCount = selectedDateRecords.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = selectedDateRecords.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = selectedDateRecords.filter(
    (record) => record.status === "Late"
  ).length;

  const unmarkedCount = visibleStudents.length - selectedDateRecords.length;

  const averageAttendance =
    visibleStudents.length > 0
      ? ((presentCount / visibleStudents.length) * 100).toFixed(1)
      : "0.0";

  const overviewData = [
    {
      name: "Present",
      value: presentCount,
      percentage:
        visibleStudents.length > 0
          ? `${((presentCount / visibleStudents.length) * 100).toFixed(1)}%`
          : "0%",
      color: "#22c55e",
    },
    {
      name: "Late",
      value: lateCount,
      percentage:
        visibleStudents.length > 0
          ? `${((lateCount / visibleStudents.length) * 100).toFixed(1)}%`
          : "0%",
      color: "#f97316",
    },
    {
      name: "Absent",
      value: absentCount,
      percentage:
        visibleStudents.length > 0
          ? `${((absentCount / visibleStudents.length) * 100).toFixed(1)}%`
          : "0%",
      color: "#ef4444",
    },
    {
      name: "Unmarked",
      value: unmarkedCount < 0 ? 0 : unmarkedCount,
      percentage:
        visibleStudents.length > 0
          ? `${((unmarkedCount / visibleStudents.length) * 100).toFixed(1)}%`
          : "0%",
      color: "#cbd5e1",
    },
  ];

  const statsCards = [
    {
      title: "Total Students",
      value: visibleStudents.length,
      desc: "assigned students",
      icon: <LuUsersRound />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-600",
      symbol: "—",
    },
    {
      title: "Present Today",
      value: presentCount,
      desc: "marked present",
      icon: <IoCheckmarkCircle />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-600",
      symbol: "↑",
    },
    {
      title: "Absent Today",
      value: absentCount,
      desc: "marked absent",
      icon: <IoCloseCircle />,
      bg: "bg-red-100",
      iconColor: "text-red-500",
      text: "text-red-500",
      symbol: "↑",
    },
    {
      title: "Average Attendance",
      value: `${averageAttendance}%`,
      desc: "based on selected date",
      icon: <MdTrendingUp />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-green-600",
      symbol: "↑",
    },
  ];

  const classSummary = useMemo(() => {
    const groupedClasses =
      classOptions.length > 0
        ? classOptions
        : [...new Set(visibleStudents.map((student) => student.className))];

    const colors = [
      "bg-blue-600",
      "bg-orange-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-cyan-500",
    ];

    return groupedClasses.map((className, index) => {
      const classStudents = visibleStudents.filter(
        (student) => student.className === className
      );

      const classPresent = classStudents.filter((student) => {
        const record = getAttendanceRecord(student);
        return record?.status === "Present";
      }).length;

      const percentage =
        classStudents.length > 0
          ? ((classPresent / classStudents.length) * 100).toFixed(1)
          : "0.0";

      return {
        className,
        percentage: `${percentage}%`,
        width: `${percentage}%`,
        color: colors[index % colors.length],
      };
    });
  }, [classOptions, visibleStudents, attendanceRecords, selectedDate]);

  const recentActivity = useMemo(() => {
    return [...attendanceRecords]
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt || b.date) -
          new Date(a.updatedAt || a.createdAt || a.date)
      )
      .slice(0, 4);
  }, [attendanceRecords]);

  const getButtonClass = (student, status) => {
    const record = getAttendanceRecord(student);
    const selectedStatus = record?.status;

    if (selectedStatus === status) {
      if (status === "Present") {
        return "border-green-500 bg-green-50 text-green-600";
      }

      if (status === "Absent") {
        return "border-red-500 bg-red-50 text-red-500";
      }

      return "border-orange-500 bg-orange-50 text-orange-500";
    }

    return "border-slate-200 bg-white text-slate-600 hover:bg-slate-50";
  };

  const handleAttendanceChange = async (student, status) => {
    const existingRecord = getAttendanceRecord(student);

    const payload = {
      studentDbId: student.id,
      studentId: student.studentId,
      studentName: student.name,
      className: student.className,
      rollNo: student.rollNo,
      date: selectedDate,
      day: getDayName(selectedDate),
      status,
      markedBy: localStorage.getItem("teacherId") || "Teacher",
      createdAt: existingRecord?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = existingRecord?.id
      ? await updateAttendanceAPI(existingRecord.id, payload)
      : await registerAttendanceAPI(payload);

    if (result?.status >= 200 && result?.status < 300) {
      toast.success(`${student.name} marked as ${status}`);
      await getAllAttendance();
    } else {
      toast.error("Failed to update attendance");
    }
  };

  return (
    <div className="w-full space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Attendance</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track, manage, and update student attendance across your classes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5"
          >
            <div
              className={`w-16 h-16 rounded-full ${card.bg} ${card.iconColor} flex items-center justify-center text-3xl shrink-0`}
            >
              {card.icon}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                {card.title}
              </p>

              <h2 className="text-3xl font-black text-slate-900 mt-1">
                {card.value}
              </h2>

              <p className={`text-xs font-semibold mt-1 ${card.text}`}>
                {card.symbol} {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-xl font-black text-slate-900 mb-5">
            Attendance Register
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-5 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="md:col-span-4 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
            >
              <option>All Classes</option>
              {classOptions.map((className) => (
                <option key={className}>{className}</option>
              ))}
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
            />
          </div>

          <div className="hidden lg:grid grid-cols-[2fr_0.8fr_0.5fr_2fr] bg-slate-50 rounded-xl">
            <div className="px-4 py-3 text-xs font-bold text-slate-500">
              Student
            </div>

            <div className="px-4 py-3 text-xs font-bold text-slate-500">
              Class
            </div>

            <div className="px-4 py-3 text-xs font-bold text-slate-500">
              Roll
            </div>

            <div className="px-4 py-3 text-xs font-bold text-slate-500">
              Attendance
            </div>
          </div>

          <div>
            {visibleStudents.length > 0 ? (
              visibleStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="grid grid-cols-1 lg:grid-cols-[2fr_0.8fr_0.5fr_2fr] lg:items-center border-b border-slate-100 last:border-b-0 py-4 lg:py-0 gap-3 lg:gap-0"
                >
                  <div className="px-0 lg:px-4 lg:py-4">
                    <div className="flex items-center gap-3">
                      {student.image ? (
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-100"
                        />
                      ) : (
                        <span
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                            avatarColors[index % avatarColors.length]
                          }`}
                        >
                          {getInitials(student.name)}
                        </span>
                      )}

                      <div className="min-w-0">
                        <h3 className="text-sm font-black text-slate-900 truncate">
                          {student.name}
                        </h3>
                        <p className="text-xs text-slate-400 truncate">
                          {student.studentId}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-0 lg:px-4">
                    <p className="lg:hidden text-xs font-bold text-slate-400 mb-1">
                      Class
                    </p>

                    <span
                      className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
                        classColors[index % classColors.length]
                      }`}
                    >
                      {student.className}
                    </span>
                  </div>

                  <div className="px-0 lg:px-4">
                    <p className="lg:hidden text-xs font-bold text-slate-400 mb-1">
                      Roll No
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                      {student.rollNo}
                    </p>
                  </div>

                  <div className="px-0 lg:px-4">
                    <p className="lg:hidden text-xs font-bold text-slate-400 mb-1">
                      Attendance
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() =>
                          handleAttendanceChange(student, "Present")
                        }
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${getButtonClass(
                          student,
                          "Present"
                        )}`}
                      >
                        Present
                      </button>

                      <button
                        onClick={() =>
                          handleAttendanceChange(student, "Absent")
                        }
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${getButtonClass(
                          student,
                          "Absent"
                        )}`}
                      >
                        Absent
                      </button>

                      <button
                        onClick={() => handleAttendanceChange(student, "Late")}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${getButtonClass(
                          student,
                          "Late"
                        )}`}
                      >
                        Late
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-sm text-slate-400">
                No students found for attendance.
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
            <p className="text-sm text-slate-500">
              Showing {visibleStudents.length > 0 ? 1 : 0} to{" "}
              {visibleStudents.length} of {visibleStudents.length} students
            </p>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                ←
              </button>

              <button className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold">
                1
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-lg font-black text-slate-900 mb-4">
              Attendance Overview
            </h2>

            <div className="h-[190px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overviewData.filter((item) => item.value > 0)}
                    dataKey="value"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={2}
                  >
                    {overviewData
                      .filter((item) => item.value > 0)
                      .map((item, index) => (
                        <Cell key={index} fill={item.color} />
                      ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <h3 className="text-2xl font-black text-slate-900">
                  {averageAttendance}%
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Avg. Attendance
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {overviewData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>

                    <p className="text-sm font-bold text-slate-700">
                      {item.name}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-slate-700">
                    {item.value}{" "}
                    <span className="text-slate-500 font-semibold">
                      ({item.percentage})
                    </span>
                  </p>
                </div>
              ))}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <p className="text-sm font-semibold text-slate-500">
                  Total Students
                </p>
                <p className="text-sm font-black text-slate-900">
                  {visibleStudents.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-lg font-black text-slate-900 mb-5">
              Class Attendance Summary
            </h2>

            <div className="space-y-4">
              {classSummary.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-slate-700">
                      {item.className}
                    </p>

                    <p className="text-sm font-black text-slate-700">
                      {item.percentage}
                    </p>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: item.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-lg font-black text-slate-900 mb-5">
              Recent Attendance Activity
            </h2>

            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[40px_1fr] gap-3 items-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                        item.status === "Present"
                          ? "bg-green-100 text-green-600"
                          : item.status === "Absent"
                          ? "bg-red-100 text-red-500"
                          : "bg-orange-100 text-orange-500"
                      }`}
                    >
                      {item.status === "Present" ? (
                        <IoCheckmarkCircle />
                      ) : item.status === "Absent" ? (
                        <IoCloseCircle />
                      ) : (
                        <FaRegCalendarCheck />
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {item.studentName} marked as {item.status}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.className} • {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 text-center py-5">
                  No attendance activity yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;