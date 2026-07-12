import React, { useEffect, useMemo, useState } from "react";

import {
  Megaphone,
  Send,
  Pin,
  CalendarDays,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  PartyPopper,
  UserCheck,
  Bus,
  X,
} from "lucide-react";

import { getNoticeAPI, getStudentAPI } from "../services/allAPI";

const NoticeView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Notices");
  const [visibleCount, setVisibleCount] = useState(5);

  const [noticesList, setNoticesList] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const normalizeClassName = (value = "") => {
    const cleanValue = String(value).trim();

    if (!cleanValue) return "";

    if (cleanValue.toLowerCase().startsWith("class")) {
      return cleanValue.replace(/\s+/g, " ").toUpperCase();
    }

    return `CLASS ${cleanValue}`.replace(/\s+/g, " ").toUpperCase();
  };

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
      className:
        student.className ||
        student.class ||
        student.student_class ||
        student.classSection ||
        "",
      rollNo: student.rollNo || student.roll || student.student_rollno || "",
    };
  };

  const normalizeNotice = (notice) => {
    return {
      id: notice.id,
      noticeId: notice.noticeId || notice.notice_id || "",
      title: notice.title || "",
      category: notice.category || "General",
      content: notice.content || notice.description || "",
      description: notice.description || notice.content || "",
      date: notice.date || notice.createdDate || notice.createdAt || "",
      author: notice.author || notice.createdBy || "Principal",
      createdBy: notice.createdBy || notice.author || "Principal",
      audience: notice.audience || "All",
      status: notice.status || "Active",
      createdAt: notice.createdAt || "",
      updatedAt: notice.updatedAt || "",
      isImportant:
        notice.isImportant ||
        notice.category === "Urgent" ||
        notice.priority === "High",
    };
  };

  const getStoredStudent = () => {
    const storedStudent =
      localStorage.getItem("studentData") ||
      localStorage.getItem("loggedStudent") ||
      localStorage.getItem("student") ||
      localStorage.getItem("studentDetails");

    if (storedStudent) {
      try {
        return normalizeStudent(JSON.parse(storedStudent));
      } catch (error) {
        console.log(error);
      }
    }

    const studentId = localStorage.getItem("studentId");

    if (studentId) {
      return {
        id: "",
        studentId,
        name: "",
        className: localStorage.getItem("studentClass") || "",
        rollNo: "",
      };
    }

    return null;
  };

  const getLoggedStudent = async () => {
    const storedStudent = getStoredStudent();

    if (storedStudent) {
      setStudentData(storedStudent);
    }

    const loggedStudentId =
      localStorage.getItem("studentId") ||
      storedStudent?.studentId ||
      storedStudent?.id;

    if (!loggedStudentId) return;

    const result = await getStudentAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const students = Array.isArray(result.data) ? result.data : [];

      const foundStudent = students.find((student) => {
        const normalized = normalizeStudent(student);

        return (
          normalized.studentId === loggedStudentId ||
          String(normalized.id) === String(loggedStudentId)
        );
      });

      if (foundStudent) {
        const normalized = normalizeStudent(foundStudent);

        setStudentData(normalized);
        localStorage.setItem("studentData", JSON.stringify(foundStudent));
        localStorage.setItem("studentId", normalized.studentId);
        localStorage.setItem("studentClass", normalized.className);
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
    getLoggedStudent();
    getAllNotices();
  }, []);

  const normalizedNotices = useMemo(() => {
    return noticesList.map((notice) => normalizeNotice(notice));
  }, [noticesList]);

  const isNoticeForStudent = (notice) => {
    if (notice.status !== "Active") return false;

    const audience = String(notice.audience || "").trim();
    const audienceLower = audience.toLowerCase();

    if (audienceLower === "all") return true;
    if (audienceLower === "students") return true;
    if (audienceLower === "student") return true;

    if (studentData?.className) {
      return (
        normalizeClassName(audience) ===
        normalizeClassName(studentData.className)
      );
    }

    return false;
  };

  const studentNotices = useMemo(() => {
    return normalizedNotices
      .filter((notice) => isNoticeForStudent(notice))
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt || b.date) -
          new Date(a.updatedAt || a.createdAt || a.date)
      );
  }, [normalizedNotices, studentData]);

  const getCategoryName = (category) => {
    if (category === "Exam") return "Exams";
    if (category === "Event") return "Events";
    if (category === "Holiday") return "Holidays";
    return category || "General";
  };

  const getOriginalCategory = (category) => {
    if (category === "Exams") return "Exam";
    if (category === "Events") return "Event";
    if (category === "Holidays") return "Holiday";
    return category;
  };

  const getCategoryIcon = (category) => {
    const name = getOriginalCategory(category);

    if (name === "Academics") return BookOpen;
    if (name === "Exam") return FileText;
    if (name === "Results") return FileText;
    if (name === "Event") return PartyPopper;
    if (name === "Administration") return UserCheck;
    if (name === "Transport") return Bus;
    if (name === "Fees") return UserCheck;
    if (name === "Holiday") return CalendarDays;
    if (name === "Urgent") return Megaphone;

    return Megaphone;
  };

  const getCategoryColor = (category) => {
    const name = getOriginalCategory(category);

    if (name === "Academics") return "text-blue-600 bg-blue-50";
    if (name === "Exam") return "text-emerald-600 bg-emerald-50";
    if (name === "Results") return "text-green-600 bg-green-50";
    if (name === "Event") return "text-purple-600 bg-purple-50";
    if (name === "Administration") return "text-amber-600 bg-amber-50";
    if (name === "Transport") return "text-rose-600 bg-rose-50";
    if (name === "Fees") return "text-orange-600 bg-orange-50";
    if (name === "Holiday") return "text-cyan-600 bg-cyan-50";
    if (name === "Urgent") return "text-red-600 bg-red-50";

    return "text-blue-600 bg-blue-50";
  };

  const getNoticeVisual = (category, isImportant) => {
    const name = getOriginalCategory(category);

    if (isImportant || name === "Urgent") {
      return {
        tagColor: "border-l-red-500",
        badgeColor: "bg-red-50 text-red-600",
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
        dotColor: "bg-red-500",
      };
    }

    if (name === "Academics") {
      return {
        tagColor: "border-l-purple-500",
        badgeColor: "bg-purple-50 text-purple-600",
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
        dotColor: "bg-slate-400",
      };
    }

    if (name === "Exam" || name === "Results") {
      return {
        tagColor: "border-l-amber-500",
        badgeColor: "bg-amber-50 text-amber-600",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        dotColor: "bg-blue-500",
      };
    }

    if (name === "Event") {
      return {
        tagColor: "border-l-blue-500",
        badgeColor: "bg-blue-50 text-blue-600",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        dotColor: "bg-blue-500",
      };
    }

    if (name === "Transport") {
      return {
        tagColor: "border-l-orange-400",
        badgeColor: "bg-orange-50 text-orange-600",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
        dotColor: "bg-slate-400",
      };
    }

    if (name === "Administration" || name === "Fees") {
      return {
        tagColor: "border-l-teal-500",
        badgeColor: "bg-teal-50 text-teal-600",
        iconBg: "bg-teal-50",
        iconColor: "text-teal-500",
        dotColor: "bg-blue-500",
      };
    }

    if (name === "Holiday") {
      return {
        tagColor: "border-l-emerald-500",
        badgeColor: "bg-emerald-50 text-emerald-600",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
        dotColor: "bg-blue-500",
      };
    }

    return {
      tagColor: "border-l-blue-500",
      badgeColor: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      dotColor: "bg-blue-500",
    };
  };

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(studentNotices.map((notice) => getCategoryName(notice.category))),
    ];

    return uniqueCategories.map((category) => {
      const Icon = getCategoryIcon(category);

      return {
        name: category,
        count: studentNotices.filter(
          (notice) => getCategoryName(notice.category) === category
        ).length,
        icon: <Icon size={14} />,
        bg: getCategoryColor(category),
      };
    });
  }, [studentNotices]);

  const filteredNotices = useMemo(() => {
    return studentNotices.filter((notice) => {
      const keyword = searchQuery.toLowerCase();

      const matchesSearch =
        notice.title.toLowerCase().includes(keyword) ||
        notice.content.toLowerCase().includes(keyword) ||
        notice.description.toLowerCase().includes(keyword) ||
        notice.category.toLowerCase().includes(keyword) ||
        notice.noticeId.toLowerCase().includes(keyword);

      const matchesCategory =
        selectedCategory === "All Notices" ||
        notice.category === selectedCategory ||
        notice.category === getOriginalCategory(selectedCategory) ||
        getCategoryName(notice.category) === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [studentNotices, searchQuery, selectedCategory]);

  const importantNotices = studentNotices.filter((notice) => notice.isImportant);

  const thisMonthCount = studentNotices.filter((notice) => {
    const date = new Date(notice.date || notice.createdAt);
    const now = new Date();

    return (
      !isNaN(date.getTime()) &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;

  const metrics = [
    {
      title: "Total Notices",
      count: studentNotices.length,
      label: "All Time",
      icon: <Megaphone size={20} />,
      bg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Unread Notices",
      count: studentNotices.length,
      label: "New Updates",
      icon: <Send size={20} />,
      bg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Important Notices",
      count: importantNotices.length,
      label: "High Priority",
      icon: <Pin size={20} />,
      bg: "bg-amber-50 text-amber-500",
    },
    {
      title: "This Month",
      count: thisMonthCount,
      label: new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      icon: <CalendarDays size={20} />,
      bg: "bg-purple-50 text-purple-600",
    },
  ];

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

  const importantNotice = importantNotices[0] || studentNotices[0];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none">
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span className="text-blue-600 cursor-pointer hover:underline">
            Dashboard
          </span>
          <span className="text-slate-400 font-normal">&gt;</span>
          <span className="text-slate-400 font-medium">Notice</span>
        </div>

        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
          Notice
        </h1>

        <p className="text-xs text-slate-400 font-medium mt-0.5">
          Stay updated with the latest notices and announcements.
        </p>

        {studentData && (
          <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-slate-400 font-bold uppercase">Student</p>
              <p className="text-slate-900 font-black mt-1">
                {studentData.name || "Student"}
              </p>
            </div>

            <div>
              <p className="text-slate-400 font-bold uppercase">Student ID</p>
              <p className="text-slate-900 font-black mt-1">
                {studentData.studentId || "Not added"}
              </p>
            </div>

            <div>
              <p className="text-slate-400 font-bold uppercase">Class</p>
              <p className="text-slate-900 font-black mt-1">
                {studentData.className || "Not added"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4"
          >
            <span
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}
            >
              {item.icon}
            </span>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
                {item.title}
              </span>

              <span className="text-xl font-black text-slate-900 leading-tight block mt-0.5">
                {item.count}
              </span>

              <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4 mb-4">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                All Notices
              </h3>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notices..."
                    className="w-full bg-slate-50/60 text-slate-700 text-xs pl-8 pr-4 py-2 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-medium"
                  />

                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>

                <div className="relative shrink-0">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setVisibleCount(5);
                    }}
                    className="appearance-none bg-white border border-slate-200 text-slate-700 text-[11px] font-bold pl-3 pr-8 py-2 rounded-xl shadow-sm focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <option value="All Notices">All Notices</option>

                    {categories.map((cat, index) => (
                      <option key={index} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={12}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredNotices.slice(0, visibleCount).map((notice) => {
                const Icon = getCategoryIcon(notice.category);
                const visual = getNoticeVisual(notice.category, notice.isImportant);

                return (
                  <button
                    key={notice.id}
                    onClick={() => setSelectedNotice(notice)}
                    className={`w-full py-4 flex gap-4 border-l-4 ${visual.tagColor} pl-3 -ml-5 pr-1 hover:bg-slate-50/40 transition-colors duration-150 text-left`}
                  >
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${visual.iconBg}`}
                    >
                      <Icon size={16} className={visual.iconColor} />
                    </span>

                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-black text-slate-900 tracking-tight">
                          {notice.title}
                        </h4>

                        {notice.isImportant && (
                          <span
                            className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${visual.badgeColor}`}
                          >
                            Important
                          </span>
                        )}

                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                          {getCategoryName(notice.category)}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        {notice.content || notice.description}
                      </p>

                      <div className="text-[10px] text-slate-400 font-semibold pt-0.5">
                        <span>By: {notice.createdBy}</span>
                        <span className="mx-1">•</span>
                        <span>To: {notice.audience}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex flex-col items-end justify-between py-0.5">
                      <span className="text-[10px] text-slate-400 font-bold">
                        {formatDate(notice.date)}
                      </span>

                      <span
                        className={`w-1.5 h-1.5 rounded-full ${visual.dotColor} block`}
                      />
                    </div>
                  </button>
                );
              })}

              {filteredNotices.length === 0 && (
                <div className="py-12 text-center text-slate-400 font-medium text-xs">
                  No active announcements or notices match your specific filters.
                </div>
              )}
            </div>

            {filteredNotices.length > visibleCount && (
              <div className="pt-4 border-t border-slate-50 flex justify-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="bg-white border border-slate-200 text-blue-600 font-bold text-[11px] px-5 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-1 cursor-pointer"
                >
                  Load More <ChevronDown size={13} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FFFBF2] border border-amber-100 rounded-2xl p-5 shadow-sm text-left">
            <div className="flex items-center justify-between border-b border-amber-200/40 pb-2.5 mb-3">
              <h4 className="text-xs font-black text-slate-900 tracking-tight uppercase">
                Important Announcements
              </h4>

              <span
                onClick={() => setSelectedCategory("All Notices")}
                className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer"
              >
                View All
              </span>
            </div>

            {importantNotice ? (
              <div className="bg-white/80 border border-amber-100/50 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 animate-pulse">
                    <Pin size={14} />
                  </span>

                  <span className="text-[11px] font-black text-amber-800">
                    Important Notice
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 font-semibold leading-normal">
                  {importantNotice.title}
                </p>

                <button
                  onClick={() => setSelectedNotice(importantNotice)}
                  className="bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-200/70 shadow-sm transition-all cursor-pointer"
                >
                  View Details
                </button>
              </div>
            ) : (
              <div className="bg-white/80 border border-amber-100/50 rounded-xl p-3.5">
                <p className="text-[11px] text-slate-400 font-semibold">
                  No important announcements available.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-3">
              Notice Categories
            </h3>

            <div className="space-y-2">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setVisibleCount(5);
                  }}
                  className={`flex items-center justify-between p-2 rounded-xl border border-transparent transition-all cursor-pointer ${
                    selectedCategory === cat.name
                      ? "bg-blue-50/50 border-blue-100/40 text-blue-600"
                      : "hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-[11px] font-bold">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center ${cat.bg}`}
                    >
                      {cat.icon}
                    </span>

                    <span
                      className={
                        selectedCategory === cat.name
                          ? "text-blue-700 font-extrabold"
                          : "text-slate-600"
                      }
                    >
                      {cat.name}
                    </span>
                  </div>

                  <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-2 py-0.5 rounded-md">
                    {cat.count}
                  </span>
                </div>
              ))}

              {categories.length === 0 && (
                <p className="text-[11px] text-slate-400 font-semibold text-center py-4">
                  No categories found.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-3">
              Notice Calendar
            </h3>

            <div className="flex items-center justify-between mb-4">
              <button className="p-1 hover:bg-slate-50 rounded text-slate-400">
                <ChevronLeft size={14} />
              </button>

              <span className="text-xs font-black text-slate-800">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <button className="p-1 hover:bg-slate-50 rounded text-slate-400">
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-slate-600">
              {Array.from({ length: 35 }).map((_, index) => {
                const day = index + 1;
                const hasNotice = studentNotices.some((notice) => {
                  const date = new Date(notice.date);
                  return !isNaN(date.getTime()) && date.getDate() === day;
                });

                const hasImportant = studentNotices.some((notice) => {
                  const date = new Date(notice.date);
                  return (
                    !isNaN(date.getTime()) &&
                    date.getDate() === day &&
                    notice.isImportant
                  );
                });

                return (
                  <span key={index} className="relative py-1 flex justify-center">
                    <span
                      className={
                        hasImportant
                          ? "bg-red-500 text-white font-black rounded-full w-6 h-6 flex items-center justify-center"
                          : hasNotice
                          ? "bg-blue-600 text-white font-black rounded-full w-6 h-6 flex items-center justify-center"
                          : ""
                      }
                    >
                      {day <= 31 ? day : ""}
                    </span>
                  </span>
                );
              })}
            </div>

            <div className="flex justify-center gap-4 border-t border-slate-50 pt-3.5 mt-3 text-[9px] font-bold">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="text-slate-400 font-medium">Important</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-slate-400 font-medium">Notice</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-200/60 text-center text-[10px] font-bold text-slate-400">
        © 2024 Student Management System. All rights reserved.
      </div>

      {selectedNotice && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Notice Details
                </h2>

                <p className="text-xs text-slate-400 font-semibold mt-1">
                  {selectedNotice.noticeId || selectedNotice.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedNotice(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-blue-100 text-blue-700">
                  {getCategoryName(selectedNotice.category)}
                </span>

                {selectedNotice.isImportant && (
                  <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-red-100 text-red-600">
                    Important
                  </span>
                )}

                <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-slate-100 text-slate-500">
                  {selectedNotice.audience}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900">
                {selectedNotice.title}
              </h3>

              <p className="text-sm text-slate-600 leading-7 mt-3">
                {selectedNotice.content || selectedNotice.description}
              </p>

              <div className="text-xs text-slate-400 font-semibold mt-4">
                <span>By: {selectedNotice.createdBy}</span>
                <span className="mx-1">•</span>
                <span>{formatDate(selectedNotice.date)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedNotice(null)}
              className="w-full mt-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeView;