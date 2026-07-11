import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  IoSearchOutline,
  IoEyeOutline,
  IoMegaphoneOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoMailOutline,
} from "react-icons/io5";

import { FaThumbtack } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";

const TeacherNotices = () => {
  const [emailNotification, setEmailNotification] = useState(true);

  const statsCards = [
    {
      title: "Total Notices",
      value: "24",
      desc: "8 vs last month",
      icon: <IoMegaphoneOutline />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-600",
      symbol: "↑",
    },
    {
      title: "Unread Notices",
      value: "2",
      desc: "1 vs yesterday",
      icon: <FaThumbtack />,
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
      text: "text-orange-500",
      symbol: "↓",
    },
    {
      title: "This Month",
      value: "12",
      desc: "4 vs last month",
      icon: <IoCalendarOutline />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-600",
      symbol: "↑",
    },
    {
      title: "Categories",
      value: "6",
      desc: "Active categories",
      icon: <IoPeopleOutline />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-slate-500",
      symbol: "",
    },
  ];

  const notices = [
    {
      id: "N-2024-036",
      title: "Mid Term Examination Schedule",
      description:
        "Please find the mid term examination schedule for Classes 8 to 12. All teachers are requested to complete the syllabus as per the given timeline.",
      category: "High Priority",
      categoryColor: "bg-red-100 text-red-500",
      icon: <FaThumbtack />,
      iconBg: "bg-red-100",
      iconText: "text-red-500",
      sender: "Principal",
      date: "May 5, 2024",
      time: "10:30 AM",
      status: "Unread",
      statusColor: "text-blue-600",
      unread: true,
    },
    {
      id: "N-2024-035",
      title: "Teachers' Meeting",
      description:
        "All teachers are requested to attend the staff meeting on May 8, 2024 at 3:30 PM in the conference room.",
      category: "General",
      categoryColor: "bg-blue-100 text-blue-600",
      icon: <IoCalendarOutline />,
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
      sender: "Principal",
      date: "May 4, 2024",
      time: "04:15 PM",
      status: "Read",
      statusColor: "text-slate-600",
      unread: false,
    },
    {
      id: "N-2024-034",
      title: "New Assessment Policy",
      description:
        "Please review the updated assessment policy for the academic year 2024-25. The document is available in the attachments section.",
      category: "Important",
      categoryColor: "bg-green-100 text-green-600",
      icon: <HiOutlineBookOpen />,
      iconBg: "bg-green-100",
      iconText: "text-green-600",
      sender: "Principal",
      date: "May 4, 2024",
      time: "11:20 AM",
      status: "Read",
      statusColor: "text-slate-600",
      unread: false,
    },
    {
      id: "N-2024-033",
      title: "Parent-Teacher Conference",
      description:
        "Parent-Teacher Conference is scheduled on May 15, 2024. Please prepare the student progress reports and be available during the assigned time slots.",
      category: "Urgent",
      categoryColor: "bg-orange-100 text-orange-500",
      icon: <IoPeopleOutline />,
      iconBg: "bg-orange-100",
      iconText: "text-orange-500",
      sender: "Principal",
      date: "May 3, 2024",
      time: "02:40 PM",
      status: "Read",
      statusColor: "text-slate-600",
      unread: false,
    },
    {
      id: "N-2024-032",
      title: "School Transport Update",
      description:
        "New transport routes have been added from next week. Please share this information with students and parents.",
      category: "General",
      categoryColor: "bg-purple-100 text-purple-600",
      icon: <IoMegaphoneOutline />,
      iconBg: "bg-purple-100",
      iconText: "text-purple-600",
      sender: "Principal",
      date: "May 3, 2024",
      time: "09:30 AM",
      status: "Read",
      statusColor: "text-slate-600",
      unread: false,
    },
  ];

  const overviewData = [
    { name: "General", value: 10, percentage: "35.7%", color: "#2563eb" },
    { name: "Academic", value: 7, percentage: "25.0%", color: "#22c55e" },
    { name: "Events", value: 5, percentage: "17.9%", color: "#9333ea" },
    { name: "Examinations", value: 4, percentage: "14.3%", color: "#f97316" },
    { name: "Transport", value: 2, percentage: "7.1%", color: "#ef4444" },
  ];

  return (
    <div className="w-full space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Notices</h1>
        <p className="text-sm text-slate-500 mt-1">
          Important announcements and updates from the Principal and school
          administration.
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-9 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-5 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

              <input
                type="text"
                placeholder="Search notices..."
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            <select className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Categories</option>
              <option>Examinations</option>
              <option>Academics</option>
              <option>Events</option>
              <option>Administrative</option>
            </select>

            <select className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Priorities</option>
              <option>High Priority</option>
              <option>Important</option>
              <option>Urgent</option>
              <option>General</option>
            </select>

            <label className="md:col-span-1 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 whitespace-nowrap">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              <span className="hidden xl:inline">Unread</span>
            </label>
          </div>

          <p className="text-xl font-black text-slate-900 mb-4">
            All Notices
          </p>

          <div className="space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`rounded-2xl border border-slate-100 overflow-hidden transition-all hover:shadow-md ${
                  notice.unread ? "bg-blue-50/30" : "bg-white"
                }`}
              >
                <div className="grid grid-cols-[90px_1fr_auto] gap-4">
                  <div
                    className={`${notice.iconBg} ${notice.iconText} flex items-center justify-center text-3xl`}
                  >
                    {notice.icon}
                  </div>

                  <div className="py-4 pr-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${notice.categoryColor}`}
                      >
                        {notice.category}
                      </span>

                      {notice.unread && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-slate-900">
                      {notice.title}
                    </h3>

                    <p className="text-sm text-slate-500 leading-6 mt-1">
                      {notice.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-semibold text-slate-500">
                      <span>{notice.sender}</span>
                      <span>•</span>
                      <span>{notice.date}</span>
                      <span>•</span>
                      <span>{notice.time}</span>
                    </div>
                  </div>

                  <div className="py-4 pr-4 flex items-center gap-5">
                    <div className="flex items-center gap-2">
                      <IoEyeOutline className={notice.statusColor} />
                      <span
                        className={`text-sm font-bold ${notice.statusColor}`}
                      >
                        {notice.status}
                      </span>
                    </div>

                    <button className="text-xl text-slate-400 hover:text-blue-600">
                      ›
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
            <p className="text-sm text-slate-500">
              Showing 1 to 5 of 24 notices
            </p>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                ←
              </button>

              <button className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold">
                1
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-600 font-bold">
                2
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-600 font-bold">
                3
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-600 font-bold">
                4
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-600 font-bold">
                5
              </button>

              <span className="text-slate-400 px-1">...</span>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-600 font-bold">
                5
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-black text-slate-900">
                Notice Overview
              </p>

              <span className="text-slate-500 text-lg">⋮</span>
            </div>

            <div className="h-[190px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overviewData}
                    dataKey="value"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={2}
                  >
                    {overviewData.map((item, index) => (
                      <Cell key={index} fill={item.color} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-3xl font-black text-slate-900">24</p>
                <p className="text-xs text-slate-500 font-semibold">
                  Total Notices
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-3">
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

                  <p className="text-sm font-bold text-slate-700 text-right">
                    {item.value}
                    <span className="text-slate-500 font-semibold ml-1">
                      ({item.percentage})
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

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
                  Notices are published by the Principal and school
                  administration. Teachers can view and track important updates.
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
                  Enable email notifications to receive important notices
                  directly.
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
              Important updates about exams, meetings, policies, and school
              events will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherNotices;
