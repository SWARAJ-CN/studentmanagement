import React, { useEffect, useMemo, useState } from "react";

import {
  IoSearchOutline,
  IoEyeOutline,
  IoMegaphoneOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoMailOutline,
  IoCloseOutline,
} from "react-icons/io5";

import { FaThumbtack } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";

import { getNoticeAPI, getTeacherAPI } from "../../services/allAPI";

const TeacherNotices = () => {
  const [noticesList, setNoticesList] = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [emailNotification, setEmailNotification] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [unreadOnly, setUnreadOnly] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState(null);

  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem("teacherReadNoticeIds");
    return saved ? JSON.parse(saved) : [];
  });

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
      noticeId: notice.noticeId || notice.notice_id || "",
      title: notice.title || "",
      description: notice.description || notice.content || "",
      category: notice.category || "General",
      audience: notice.audience || "All",
      date: notice.date || "",
      status: notice.status || "Active",
      createdBy: notice.createdBy || "Principal",
      createdAt: notice.createdAt || "",
      updatedAt: notice.updatedAt || "",
    };
  };

  const getLoggedTeacher = async () => {
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

  const normalizedNotices = useMemo(() => {
    return noticesList.map((notice) => normalizeNotice(notice));
  }, [noticesList]);

  const isTeacherNotice = (notice) => {
    if (notice.status !== "Active") return false;

    if (notice.audience === "All") return true;
    if (notice.audience === "Teachers") return true;

    if (teacherClasses.length > 0 && teacherClasses.includes(notice.audience)) {
      return true;
    }

    return false;
  };

  const teacherNotices = useMemo(() => {
    return normalizedNotices
      .filter((notice) => isTeacherNotice(notice))
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt || b.date) -
          new Date(a.updatedAt || a.createdAt || a.date)
      );
  }, [normalizedNotices, teacherClasses]);

  const filteredNotices = useMemo(() => {
    let data = teacherNotices;

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter(
        (notice) =>
          notice.title.toLowerCase().includes(keyword) ||
          notice.description.toLowerCase().includes(keyword) ||
          notice.category.toLowerCase().includes(keyword) ||
          notice.noticeId.toLowerCase().includes(keyword)
      );
    }

    if (categoryFilter !== "All Categories") {
      data = data.filter((notice) => notice.category === categoryFilter);
    }

    if (priorityFilter === "High Priority") {
      data = data.filter(
        (notice) => notice.category === "Urgent" || notice.category === "Exam"
      );
    }

    if (priorityFilter === "Important") {
      data = data.filter(
        (notice) =>
          notice.category === "Results" ||
          notice.category === "Meeting" ||
          notice.category === "Academics"
      );
    }

    if (priorityFilter === "General") {
      data = data.filter((notice) => notice.category === "General");
    }

    if (unreadOnly) {
      data = data.filter((notice) => !readIds.includes(notice.id));
    }

    return data;
  }, [
    teacherNotices,
    searchTerm,
    categoryFilter,
    priorityFilter,
    unreadOnly,
    readIds,
  ]);

  const markAsRead = (notice) => {
    if (!readIds.includes(notice.id)) {
      const updated = [...readIds, notice.id];
      setReadIds(updated);
      localStorage.setItem("teacherReadNoticeIds", JSON.stringify(updated));
    }

    setSelectedNotice(notice);
  };

  const unreadCount = teacherNotices.filter(
    (notice) => !readIds.includes(notice.id)
  ).length;

  const thisMonthCount = teacherNotices.filter((notice) => {
    const date = new Date(notice.date || notice.createdAt);
    const now = new Date();

    return (
      date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    );
  }).length;

  const categories = [
    ...new Set(teacherNotices.map((notice) => notice.category).filter(Boolean)),
  ];

  const statsCards = [
    {
      title: "Total Notices",
      value: teacherNotices.length,
      desc: "from Principal",
      icon: <IoMegaphoneOutline />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-600",
      symbol: "↑",
    },
    {
      title: "Unread Notices",
      value: unreadCount,
      desc: "need attention",
      icon: <FaThumbtack />,
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
      text: "text-orange-500",
      symbol: "↓",
    },
    {
      title: "This Month",
      value: thisMonthCount,
      desc: "monthly notices",
      icon: <IoCalendarOutline />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-600",
      symbol: "↑",
    },
    {
      title: "Categories",
      value: categories.length,
      desc: "active types",
      icon: <IoPeopleOutline />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-slate-500",
      symbol: "",
    },
  ];

  const getCategoryStyle = (category) => {
    if (category === "Urgent") return "bg-red-100 text-red-500";
    if (category === "Exam") return "bg-blue-100 text-blue-600";
    if (category === "Results") return "bg-green-100 text-green-600";
    if (category === "Meeting") return "bg-orange-100 text-orange-500";
    if (category === "Event") return "bg-purple-100 text-purple-600";
    if (category === "Academics") return "bg-indigo-100 text-indigo-600";
    if (category === "Holiday") return "bg-emerald-100 text-emerald-600";
    return "bg-slate-100 text-slate-600";
  };

  const getIconStyle = (category) => {
    if (category === "Urgent") return "bg-red-100 text-red-500";
    if (category === "Exam") return "bg-blue-100 text-blue-600";
    if (category === "Results") return "bg-green-100 text-green-600";
    if (category === "Meeting") return "bg-orange-100 text-orange-500";
    if (category === "Event") return "bg-purple-100 text-purple-600";
    return "bg-slate-100 text-slate-600";
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

  return (
    <div className="w-full space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Notices</h1>
        <p className="text-sm text-slate-500 mt-1">
          Important announcements and updates from the Principal.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5 min-h-[130px]"
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

              <p className="text-3xl font-black text-slate-900 mt-1">
                {card.value}
              </p>

              <p className={`text-xs font-semibold mt-1 ${card.text}`}>
                {card.symbol && <span>{card.symbol} </span>}
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-9 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-5 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
            >
              <option>All Categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
            >
              <option>All Priorities</option>
              <option>High Priority</option>
              <option>Important</option>
              <option>General</option>
            </select>

            <label className="md:col-span-1 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600">
              <input
                type="checkbox"
                checked={unreadOnly}
                onChange={(e) => setUnreadOnly(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="hidden xl:inline">Unread</span>
            </label>
          </div>

          <p className="text-xl font-black text-slate-900 mb-4">
            Principal Notices
          </p>

          <div className="space-y-3">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => {
                const unread = !readIds.includes(notice.id);

                return (
                  <div
                    key={notice.id}
                    className={`rounded-2xl border border-slate-100 overflow-hidden transition-all hover:shadow-md ${
                      unread ? "bg-blue-50/40" : "bg-white"
                    }`}
                  >
                    <div className="grid grid-cols-[82px_1fr_auto] gap-4">
                      <div
                        className={`${getIconStyle(
                          notice.category
                        )} flex items-center justify-center text-3xl`}
                      >
                        <IoMegaphoneOutline />
                      </div>

                      <div className="py-4 pr-4">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${getCategoryStyle(
                              notice.category
                            )}`}
                          >
                            {notice.category}
                          </span>

                          {unread && (
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          )}
                        </div>

                        <h3 className="text-base font-black text-slate-900">
                          {notice.title}
                        </h3>

                        <p className="text-sm text-slate-500 leading-6 mt-1 line-clamp-2">
                          {notice.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-semibold text-slate-500">
                          <span>{notice.createdBy}</span>
                          <span>•</span>
                          <span>{formatDate(notice.date)}</span>
                          <span>•</span>
                          <span>{notice.audience}</span>
                        </div>
                      </div>

                      <div className="py-4 pr-4 flex items-center gap-5">
                        <button
                          onClick={() => markAsRead(notice)}
                          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
                        >
                          <IoEyeOutline />
                          View
                        </button>

                        <button
                          onClick={() => markAsRead(notice)}
                          className="text-xl text-slate-400 hover:text-blue-600"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center text-sm text-slate-400">
                No notices found for you.
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
            <p className="text-sm text-slate-500">
              Showing {filteredNotices.length > 0 ? 1 : 0} to{" "}
              {filteredNotices.length} of {filteredNotices.length} notices
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

        <div className="xl:col-span-3 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                <MdAdminPanelSettings />
              </div>

              <div>
                <p className="text-lg font-black text-slate-900">
                  Principal Notices
                </p>
                <p className="text-sm text-slate-500 mt-2 leading-6">
                  Notices are published by the Principal. Teachers can view
                  notices sent to all, teachers, or their assigned classes.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl shrink-0">
                <IoMailOutline />
              </div>

              <div className="flex-1">
                <p className="text-lg font-black text-slate-900">
                  Stay Updated
                </p>

                <p className="text-sm text-slate-500 mt-2 leading-6">
                  Enable email notifications to receive important notices.
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-bold text-slate-700">
                    Email Alerts
                  </span>

                  <button
                    onClick={() => setEmailNotification(!emailNotification)}
                    className={`w-12 h-7 rounded-full p-1 transition-colors ${
                      emailNotification ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                        emailNotification ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-sm">
            <p className="text-lg font-black">Read notices regularly</p>
            <p className="text-sm text-blue-100 mt-2 leading-6">
              Exam updates, meetings, policies, and class announcements will
              appear here.
            </p>
          </div>
        </div>
      </div>

      {selectedNotice && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Notice Details
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {selectedNotice.noticeId}
                </p>
              </div>

              <button
                onClick={() => setSelectedNotice(null)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${getCategoryStyle(
                    selectedNotice.category
                  )}`}
                >
                  {selectedNotice.category}
                </span>

                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-600">
                  {selectedNotice.audience}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">
                {selectedNotice.title}
              </h3>

              <p className="text-sm text-slate-600 leading-7 mt-3">
                {selectedNotice.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mt-4">
                <IoCalendarOutline />
                {formatDate(selectedNotice.date)}
              </div>
            </div>

            <button
              onClick={() => setSelectedNotice(null)}
              className="w-full mt-5 h-11 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherNotices;