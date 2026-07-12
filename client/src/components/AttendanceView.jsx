import React, { useEffect, useMemo, useState } from "react";

import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

import { getAttendanceAPI, getStudentAPI } from "../services/allAPI";

const AttendanceView = () => {
  const [student, setStudent] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const normalizeStudent = (data) => {
    if (!data) return null;

    return {
      id: data.id,
      studentId: data.studentId || data.student_id || "",
      name: data.name || data.student_name || "",
      className: data.className || data.student_class || "",
      rollNo: data.rollNo || data.student_rollno || "",
    };
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
    if (!dateValue) return "Not added";

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) return "Not added";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const getLoggedStudent = async () => {
    const loggedStudentId = localStorage.getItem("studentId");
    const storedStudent = localStorage.getItem("studentData");

    if (storedStudent) {
      try {
        setStudent(normalizeStudent(JSON.parse(storedStudent)));
      } catch (error) {
        console.log(error);
      }
    }

    const result = await getStudentAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const foundStudent = result.data.find((item) => {
        const normalized = normalizeStudent(item);
        return normalized.studentId === loggedStudentId;
      });

      if (foundStudent) {
        const normalized = normalizeStudent(foundStudent);
        setStudent(normalized);
        localStorage.setItem("studentData", JSON.stringify(foundStudent));
      }
    }
  };

  const getAllAttendance = async () => {
    const result = await getAttendanceAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setAttendanceRecords(Array.isArray(result.data) ? result.data : []);
    }
  };

  useEffect(() => {
    getLoggedStudent();
    getAllAttendance();
  }, []);

  const studentAttendance = useMemo(() => {
    if (!student) return [];

    return attendanceRecords
      .filter(
        (record) =>
          record.studentDbId === student.id ||
          record.studentId === student.studentId
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [attendanceRecords, student]);

  const monthRecords = useMemo(() => {
    return studentAttendance.filter((record) =>
      record.date?.startsWith(selectedMonth)
    );
  }, [studentAttendance, selectedMonth]);

  const filteredRecords = useMemo(() => {
    const keyword = searchTerm.toLowerCase();

    return monthRecords.filter(
      (record) =>
        record.date?.toLowerCase().includes(keyword) ||
        record.status?.toLowerCase().includes(keyword) ||
        record.className?.toLowerCase().includes(keyword) ||
        record.rollNo?.toString().toLowerCase().includes(keyword)
    );
  }, [monthRecords, searchTerm]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;

  const currentRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const presentCount = monthRecords.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = monthRecords.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = monthRecords.filter(
    (record) => record.status === "Late"
  ).length;

  const totalMarked = monthRecords.length;

  const overallAttendance =
    totalMarked > 0 ? ((presentCount / totalMarked) * 100).toFixed(1) : "0.0";

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Present") {
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    }

    if (status === "Absent") {
      return "bg-rose-50 text-rose-500 border-rose-100";
    }

    if (status === "Late") {
      return "bg-orange-50 text-orange-500 border-orange-100";
    }

    return "bg-slate-50 text-slate-500 border-slate-200";
  };

  const getStatusDot = (status) => {
    if (status === "Present") return "bg-emerald-500";
    if (status === "Absent") return "bg-rose-500";
    if (status === "Late") return "bg-orange-500";
    return "bg-slate-400";
  };

  const calendarDays = useMemo(() => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const days = [];

    const startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateString = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      const record = monthRecords.find((item) => item.date === dateString);

      days.push({
        day,
        date: dateString,
        status: record?.status || "",
      });
    }

    return days;
  }, [selectedMonth, monthRecords]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedMonth]);

  if (!student) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <p className="text-sm font-semibold text-slate-500">
          Loading attendance...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-blue-600 cursor-pointer hover:underline">
              Dashboard
            </span>
            <span className="text-slate-400 font-normal">&gt;</span>
            <span className="text-slate-400 font-medium">Attendance</span>
          </div>

          <h1 className="text-xl font-extrabold text-[#1E293B] tracking-tight mt-1">
            Attendance
          </h1>

          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Track your attendance and stay updated.
          </p>
        </div>

        <div className="relative shrink-0">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold pl-3 pr-3 py-2 rounded-xl shadow-sm focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold">
          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Student Name
            </span>
            <span className="text-slate-900 font-black">{student.name}</span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Student ID
            </span>
            <span className="text-slate-900 font-black">
              {student.studentId}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Class
            </span>
            <span className="text-slate-900 font-black">
              {student.className}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Roll No
            </span>
            <span className="text-slate-900 font-black">{student.rollNo}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar size={20} />
          </span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Overall Attendance
            </span>
            <span className="text-xl font-black text-slate-900 leading-tight block">
              {overallAttendance}%
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              Present: {presentCount} <span className="mx-1">|</span> Absent:{" "}
              {absentCount}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle size={20} />
          </span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Marked Days
            </span>
            <span className="text-xl font-black text-slate-900 leading-tight block">
              {totalMarked}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              This month
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Clock size={20} />
          </span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Days Present
            </span>
            <span className="text-xl font-black text-amber-600 leading-tight block">
              {presentCount}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              Late: {lateCount}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <XCircle size={20} />
          </span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Days Absent
            </span>
            <span className="text-xl font-black text-rose-500 leading-tight block">
              {absentCount}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              This month
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-900 tracking-tight">
            Attendance Calendar
          </h3>

          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-1">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          <div className="grid grid-cols-7 text-center gap-y-4 text-xs font-bold text-slate-700">
            {calendarDays.map((item, index) =>
              item ? (
                <div key={index} className="flex flex-col items-center gap-1">
                  <span>{item.day}</span>
                  {item.status && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${getStatusDot(
                        item.status
                      )}`}
                    ></span>
                  )}
                </div>
              ) : (
                <span key={index}></span>
              )
            )}
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-50 text-[10px] font-bold text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Present
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Absent
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> Late
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-900 tracking-tight">
            Monthly Attendance Summary
          </h3>

          <div className="space-y-4 text-[11px] font-bold">
            {[
              {
                name: "Present",
                count: presentCount,
                color: "bg-emerald-500",
              },
              {
                name: "Late",
                count: lateCount,
                color: "bg-orange-500",
              },
              {
                name: "Absent",
                count: absentCount,
                color: "bg-rose-500",
              },
            ].map((item) => {
              const percent =
                totalMarked > 0
                  ? ((item.count / totalMarked) * 100).toFixed(1)
                  : "0.0";

              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-slate-900 font-black">
                      {item.count} days ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xs font-black text-slate-900 tracking-tight">
            Attendance Details
          </h3>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by date, class or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-[11px] font-medium pl-3 pr-8 py-1.5 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
            />
            <Search
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[11px] font-semibold whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-6 text-blue-600 flex items-center gap-1 cursor-pointer">
                  Date <ArrowUpDown size={10} />
                </th>
                <th className="py-3 px-6">Day</th>
                <th className="py-3 px-6">Class</th>
                <th className="py-3 px-6">Roll No</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Marked By</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50 text-slate-600">
              {currentRecords.length > 0 ? (
                currentRecords.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    <td className="py-3 px-6 text-slate-900 font-bold">
                      {formatDate(row.date)}
                    </td>

                    <td className="py-3 px-6 text-slate-500 font-medium">
                      {row.day || getDayName(row.date)}
                    </td>

                    <td className="py-3 px-6 text-slate-800 font-bold">
                      {row.className}
                    </td>

                    <td className="py-3 px-6 text-slate-800 font-bold">
                      {row.rollNo}
                    </td>

                    <td className="py-3 px-6">
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-md border tracking-wide inline-block ${getStatusStyle(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>

                    <td className="py-3 px-6 text-slate-400 font-medium">
                      {row.markedBy || "Teacher"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-8 text-center text-slate-400 font-medium"
                  >
                    No attendance records found for this month.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-white border-t border-slate-50 flex items-center justify-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center transition-all ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-slate-50 cursor-pointer text-slate-600"
            }`}
          >
            <ChevronLeft size={13} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-7 h-7 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20 border border-blue-600"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center transition-all ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-slate-50 cursor-pointer text-slate-600"
            }`}
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;