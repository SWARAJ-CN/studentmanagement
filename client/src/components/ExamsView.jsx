import React, { useEffect, useMemo, useState } from "react";

import {
  Calendar as CalendarIcon,
  BookOpen,
  Award,
  Trophy,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  Info,
  ChevronDown,
  Search,
} from "lucide-react";

import { getExamAPI, getStudentAPI } from "../services/allAPI";

const ExamsView = () => {
  const [student, setStudent] = useState(null);
  const [examsList, setExamsList] = useState([]);

  const [selectedTerm, setSelectedTerm] = useState("All Terms");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTipsBanner, setShowTipsBanner] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

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

  const normalizeExam = (exam) => {
    return {
      id: exam.id,
      examId: exam.examId || exam.exam_id || "",
      title: exam.title || exam.examTitle || exam.name || "",
      description: exam.description || exam.desc || "",
      className: exam.className || exam.class || "",
      subject: exam.subject || "",
      examType: exam.examType || exam.type || "",
      term: exam.term || "",
      date: exam.date || "",
      day: exam.day || "",
      startTime: exam.startTime || exam.time || "",
      endTime: exam.endTime || "",
      duration: exam.duration || "",
      maxMarks: exam.maxMarks || exam.max_marks || "",
      passMarks: exam.passMarks || exam.pass_marks || "",
      venue: exam.venue || "",
      room: exam.room || "",
      syllabusTopics: Array.isArray(exam.syllabusTopics)
        ? exam.syllabusTopics
        : Array.isArray(exam.syllabus)
        ? exam.syllabus
        : exam.syllabus
        ? exam.syllabus.split(/\n|,/).map((item) => item.trim()).filter(Boolean)
        : [],
      instructions: exam.instructions || "",
      status: exam.status || "Upcoming",
      createdAt: exam.createdAt || "",
      updatedAt: exam.updatedAt || "",
    };
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

  const getAllExams = async () => {
    const result = await getExamAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setExamsList(Array.isArray(result.data) ? result.data : []);
    }
  };

  useEffect(() => {
    getLoggedStudent();
    getAllExams();
  }, []);

  const normalizedExams = useMemo(() => {
    return examsList.map((exam) => normalizeExam(exam));
  }, [examsList]);

  const classExams = useMemo(() => {
    if (!student) return [];

    return normalizedExams
      .filter(
        (exam) =>
          exam.className === student.className && exam.status !== "Draft"
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [normalizedExams, student]);

  const filteredExams = useMemo(() => {
    let data = classExams;

    if (selectedTerm !== "All Terms") {
      data = data.filter((exam) => exam.term === selectedTerm);
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter(
        (exam) =>
          exam.title.toLowerCase().includes(keyword) ||
          exam.subject.toLowerCase().includes(keyword) ||
          exam.examType.toLowerCase().includes(keyword) ||
          exam.examId.toLowerCase().includes(keyword)
      );
    }

    return data;
  }, [classExams, selectedTerm, searchTerm]);

  const upcomingExams = filteredExams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const completedExams = filteredExams.filter(
    (exam) => exam.status === "Completed"
  ).length;

  const ongoingExams = filteredExams.filter(
    (exam) => exam.status === "Ongoing"
  ).length;

  const currentMetrics = {
    upcoming: upcomingExams,
    completed: completedExams,
    ongoing: ongoingExams,
    avgScore: "N/A",
    highest: "N/A",
    highestSub: "Results pending",
  };

  const terms = useMemo(() => {
    const examTerms = [...new Set(classExams.map((exam) => exam.term))].filter(
      Boolean
    );

    return ["All Terms", ...examTerms];
  }, [classExams]);

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
      weekday: "short",
    });
  };

  const getStatusStyle = (status) => {
    if (status === "Upcoming") return "bg-blue-50 text-blue-600 border-blue-100";
    if (status === "Ongoing") return "bg-purple-50 text-purple-600 border-purple-100";
    if (status === "Completed") return "bg-emerald-50 text-emerald-600 border-emerald-100";
    return "bg-slate-50 text-slate-500 border-slate-100";
  };

  const getSubjectStyle = (subject) => {
    const value = subject.toLowerCase();

    if (value.includes("math")) return "bg-blue-50 text-blue-600";
    if (value.includes("science")) return "bg-emerald-50 text-emerald-600";
    if (value.includes("english")) return "bg-amber-50 text-amber-600";
    if (value.includes("biology")) return "bg-green-50 text-green-600";
    if (value.includes("chemistry")) return "bg-purple-50 text-purple-600";
    if (value.includes("physics")) return "bg-cyan-50 text-cyan-600";

    return "bg-slate-50 text-slate-600";
  };

  const getSubjectIcon = (subject) => {
    const value = subject.toLowerCase();

    if (value.includes("math")) return "📐";
    if (value.includes("science")) return "🧪";
    if (value.includes("english")) return "📖";
    if (value.includes("biology")) return "🌿";
    if (value.includes("chemistry")) return "⚗️";
    if (value.includes("physics")) return "🔭";

    return "📝";
  };

  const calendarDays = useMemo(() => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const days = [];
    const startPadding = firstDay.getDay();

    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateString = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      const examOnDate = classExams.find((exam) => exam.date === dateString);

      days.push({
        day,
        date: dateString,
        type: examOnDate ? examOnDate.status : "",
      });
    }

    return days;
  }, [selectedMonth, classExams]);

  const changeMonth = (value) => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const newDate = new Date(year, month - 1 + value, 1);

    setSelectedMonth(
      `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(
        2,
        "0"
      )}`
    );
  };

  const recentCompletedExams = [...classExams]
    .filter((exam) => exam.status === "Completed")
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (!student) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <p className="text-sm font-semibold text-slate-500">
          Loading exams...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-blue-600 cursor-pointer hover:underline">
              Dashboard
            </span>
            <span className="text-slate-400 font-normal">&gt;</span>
            <span className="text-slate-400 font-medium">Exams</span>
          </div>

          <h1 className="text-xl font-extrabold text-[#1E293B] tracking-tight mt-1">
            Exams
          </h1>

          <p className="text-xs text-slate-400 font-medium mt-0.5">
            View your upcoming exams and exam details.
          </p>
        </div>

        <div className="relative shrink-0">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold pl-4 pr-10 py-2.5 rounded-xl shadow-sm focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
          >
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
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
            <FileText size={20} />
          </span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Upcoming Exams
            </span>
            <span className="text-xl font-black text-blue-600 leading-tight block mt-0.5">
              {currentMetrics.upcoming}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              Selected Term
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <BookOpen size={20} />
          </span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Completed Exams
            </span>
            <span className="text-xl font-black text-emerald-600 leading-tight block mt-0.5">
              {currentMetrics.completed}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              Selected Term
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Award size={20} />
          </span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Ongoing Exams
            </span>
            <span className="text-xl font-black text-amber-600 leading-tight block mt-0.5">
              {currentMetrics.ongoing}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              Active now
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Trophy size={20} />
          </span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Total Exams
            </span>
            <span className="text-xl font-black text-purple-600 leading-tight block mt-0.5">
              {filteredExams.length}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              For your class
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between min-h-[500px]">
          <div>
            <div className="p-5 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase">
                Exams For {student.className}
              </h3>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-[11px] font-medium pl-3 pr-8 py-2 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
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
                    <th className="py-3.5 px-5">Exam Name</th>
                    <th className="py-3.5 px-5">Subject</th>
                    <th className="py-3.5 px-5">Date</th>
                    <th className="py-3.5 px-5">Time</th>
                    <th className="py-3.5 px-5">Marks</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-center">Syllabus</th>
                    <th className="py-3.5 px-5 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {filteredExams.length > 0 ? (
                    filteredExams.map((exam) => (
                      <tr
                        key={exam.id}
                        className="hover:bg-slate-50/40 transition-colors"
                      >
                        <td className="py-4 px-5">
                          <span className="text-slate-900 font-black block">
                            {exam.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                            {exam.examId} • {exam.examType}
                          </span>
                        </td>

                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-normal border border-black/5 ${getSubjectStyle(
                                exam.subject
                              )}`}
                            >
                              {getSubjectIcon(exam.subject)}
                            </span>
                            <span className="text-slate-800 font-bold">
                              {exam.subject}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <span className="text-slate-900 font-bold block">
                            {formatDate(exam.date)}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                            {exam.day || getDayName(exam.date)}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-slate-500 font-medium">
                          {exam.startTime}
                          {exam.endTime ? ` - ${exam.endTime}` : ""}
                        </td>

                        <td className="py-4 px-5 text-slate-800 font-bold">
                          {exam.maxMarks}
                        </td>

                        <td className="py-4 px-5">
                          <span
                            className={`text-[9px] font-black px-2 py-0.5 rounded-md border tracking-wide inline-block ${getStatusStyle(
                              exam.status
                            )}`}
                          >
                            {exam.status}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-center">
                          <button
                            onClick={() =>
                              setActiveModal({ type: "syllabus", exam })
                            }
                            className="text-blue-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                          >
                            View Syllabus
                          </button>
                        </td>

                        <td className="py-4 px-5 text-right">
                          <button
                            onClick={() =>
                              setActiveModal({ type: "details", exam })
                            }
                            className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-0.5 ml-auto text-[11px] cursor-pointer"
                          >
                            Details{" "}
                            <span className="text-xs font-normal">&gt;</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-12 text-center text-slate-400 font-medium"
                      >
                        No exams found for your class.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 border-t border-slate-50 flex justify-center bg-slate-50/30">
            <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer">
              📁 View All Exams
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-xs font-black text-slate-900 tracking-tight">
                Exam Calendar
              </h3>

              <div className="flex items-center gap-3 text-slate-600">
                <button
                  onClick={() => changeMonth(-1)}
                  className="hover:bg-slate-100 p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronLeft size={13} />
                </button>

                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="text-[11px] font-black text-slate-800 bg-transparent outline-none"
                />

                <button
                  onClick={() => changeMonth(1)}
                  className="hover:bg-slate-100 p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="grid grid-cols-7 text-center gap-y-3.5 text-xs font-bold text-slate-700">
              {calendarDays.map((cell, idx) => {
                if (!cell) return <div key={idx}></div>;

                let cellClass =
                  "text-slate-800 font-bold w-5 h-5 flex items-center justify-center mx-auto";

                if (cell.type === "Upcoming") {
                  cellClass =
                    "bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto shadow-sm shadow-blue-600/20";
                }

                if (cell.type === "Completed") {
                  cellClass =
                    "bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto shadow-sm shadow-emerald-500/20";
                }

                if (cell.type === "Ongoing") {
                  cellClass =
                    "bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto shadow-sm shadow-purple-500/20";
                }

                return (
                  <div key={idx} className="h-5 flex items-center justify-center">
                    <span className={`text-[11px] ${cellClass}`}>
                      {cell.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-50 text-[9px] font-black text-slate-400 mt-4 px-1">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600" /> Upcoming
              </div>

              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500" /> Ongoing
              </div>

              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm min-h-[250px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-50 mb-4">
              <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase">
                Completed Exams
              </h3>
            </div>

            <div className="space-y-4">
              {recentCompletedExams.length > 0 ? (
                recentCompletedExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex items-center justify-between text-left border-b border-slate-50/50 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border border-black/5 text-sm ${getSubjectStyle(
                          exam.subject
                        )}`}
                      >
                        {getSubjectIcon(exam.subject)}
                      </span>

                      <div>
                        <span className="text-[11px] font-black text-slate-900 block">
                          {exam.subject} - {exam.examType}
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium block mt-0.5">
                          {formatDate(exam.date)}{" "}
                          <span className="mx-1">|</span> Marks:{" "}
                          {exam.maxMarks}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-black text-emerald-600">
                      Done
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 text-center py-8">
                  No completed exams yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showTipsBanner && (
        <div className="bg-[#EEF2FF] border border-blue-100 rounded-2xl p-4 flex items-start sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-start sm:items-center gap-4">
            <span className="text-2xl shrink-0">📋</span>

            <div className="text-left">
              <h4 className="text-xs font-black text-slate-900 tracking-tight">
                Exam Tips
              </h4>

              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Prepare well and manage your time effectively during exams. Good
                luck!
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowTipsBanner(false)}
            className="text-slate-400 hover:text-slate-600 p-1 bg-white/80 rounded-lg border border-slate-200/40 shadow-sm transition-colors cursor-pointer"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-100 p-5 space-y-4 text-left relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <X size={14} />
            </button>

            {activeModal.type === "syllabus" ? (
              <>
                <div className="flex items-center gap-2 text-blue-600 font-black text-sm">
                  <span>📖</span> {activeModal.exam.subject} Syllabus
                </div>

                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Exam
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {activeModal.exam.title} ({activeModal.exam.examId})
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                    Topics Included:
                  </span>

                  {activeModal.exam.syllabusTopics.length > 0 ? (
                    <ul className="space-y-1.5">
                      {activeModal.exam.syllabusTopics.map((chapter, index) => (
                        <li
                          key={index}
                          className="text-xs text-slate-600 font-semibold flex items-start gap-2"
                        >
                          <span className="text-blue-500 mt-0.5">•</span>
                          {chapter}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 font-semibold">
                      No syllabus added.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                  <Info size={16} className="text-blue-600" /> Exam Details
                </div>

                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden text-xs">
                  <div className="p-2.5 flex justify-between bg-slate-50/50">
                    <span className="text-slate-400 font-bold">Exam ID:</span>
                    <span className="font-extrabold text-slate-800">
                      {activeModal.exam.examId}
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-400 font-bold">Title:</span>
                    <span className="font-extrabold text-slate-800">
                      {activeModal.exam.title}
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between bg-slate-50/50">
                    <span className="text-slate-400 font-bold">Subject:</span>
                    <span className="font-extrabold text-slate-800">
                      {activeModal.exam.subject}
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-400 font-bold">Type:</span>
                    <span className="font-extrabold text-slate-800">
                      {activeModal.exam.examType}
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between bg-slate-50/50">
                    <span className="text-slate-400 font-bold">Date:</span>
                    <span className="font-extrabold text-slate-800">
                      {formatDate(activeModal.exam.date)} (
                      {activeModal.exam.day || getDayName(activeModal.exam.date)})
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-400 font-bold">Time:</span>
                    <span className="font-extrabold text-slate-500 font-mono">
                      {activeModal.exam.startTime}
                      {activeModal.exam.endTime
                        ? ` - ${activeModal.exam.endTime}`
                        : ""}
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between bg-slate-50/50">
                    <span className="text-slate-400 font-bold">Duration:</span>
                    <span className="font-extrabold text-slate-800">
                      {activeModal.exam.duration || "Not added"}
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-400 font-bold">Max Marks:</span>
                    <span className="font-extrabold text-slate-800">
                      {activeModal.exam.maxMarks}
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between bg-slate-50/50">
                    <span className="text-slate-400 font-bold">Pass Marks:</span>
                    <span className="font-extrabold text-slate-800">
                      {activeModal.exam.passMarks || "Not added"}
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-400 font-bold">Venue:</span>
                    <span className="font-extrabold text-slate-800">
                      {activeModal.exam.venue || "Not added"}
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between bg-slate-50/50">
                    <span className="text-slate-400 font-bold">Room:</span>
                    <span className="font-extrabold text-slate-800">
                      {activeModal.exam.room || "Not added"}
                    </span>
                  </div>

                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-400 font-bold">Status:</span>
                    <span className="font-extrabold text-blue-600">
                      {activeModal.exam.status}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-medium bg-amber-50/60 text-amber-800 p-2.5 rounded-lg border border-amber-100">
                  ⚠️ {activeModal.exam.instructions || "Attendance is mandatory. Reach the exam hall on time."}
                </div>
              </>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer text-center block"
            >
              Acknowledge and Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamsView;