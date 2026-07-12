import React from "react";

import { HiOutlineBookOpen } from "react-icons/hi";
import { LuUsersRound } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiTable } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";
import { IoSchoolOutline } from "react-icons/io5";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const MyClasses = () => {
  const statsCards = [
    {
      title: "Total Classes",
      value: "5",
      desc: "1 new this term",
      icon: <HiOutlineBookOpen />,
      bg: "bg-blue-600",
      lightBg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Total Sections",
      value: "8",
      desc: "2 new this term",
      icon: <LuUsersRound />,
      bg: "bg-purple-600",
      lightBg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "Total Students",
      value: "126",
      desc: "6 new this term",
      icon: <IoSchoolOutline />,
      bg: "bg-green-500",
      lightBg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Weekly Periods",
      value: "28",
      desc: "Same as last week",
      icon: <IoCalendarOutline />,
      bg: "bg-orange-500",
      lightBg: "bg-orange-50",
      text: "text-orange-500",
      symbol: "≈",
    },
  ];

  const assignedClasses = [
    {
      tag: "10",
      className: "Class 10A",
      subject: "Science",
      students: 32,
      role: "Class Teacher",
      room: "Room 204",
      status: "Active",
      color: "bg-purple-100 text-purple-600",
    },
    {
      tag: "9B",
      className: "Class 9B",
      subject: "Science",
      students: 29,
      role: "Subject Teacher",
      room: "Lab 2",
      status: "Active",
      color: "bg-blue-100 text-blue-600",
    },
    {
      tag: "8A",
      className: "Class 8A",
      subject: "Science",
      students: 31,
      role: "Subject Teacher",
      room: "Room 203",
      status: "Active",
      color: "bg-violet-100 text-violet-600",
    },
    {
      tag: "9A",
      className: "Class 9A",
      subject: "Biology",
      students: 31,
      role: "Subject Teacher",
      room: "Lab 1",
      status: "Active",
      color: "bg-green-100 text-green-600",
    },
    {
      tag: "10B",
      className: "Class 10B",
      subject: "Science",
      students: 28,
      role: "Subject Teacher",
      room: "Room 204",
      status: "Active",
      color: "bg-orange-100 text-orange-500",
    },
  ];

  const todaySchedule = [
    {
      time: "08:00 AM - 08:45 AM",
      className: "Class 10A - Science",
      topic: "Chapter 8: Acids, Bases and Salts",
      room: "Room 204",
      status: "Completed",
      statusClass: "bg-green-100 text-green-600",
      border: "border-blue-500",
    },
    {
      time: "08:45 AM - 09:30 AM",
      className: "Class 9B - Biology",
      topic: "Cell Structure and Function",
      room: "Lab 2",
      status: "In Progress",
      statusClass: "bg-blue-100 text-blue-600",
      border: "border-purple-500",
    },
    {
      time: "09:45 AM - 10:30 AM",
      className: "Class 8A - Science",
      topic: "Magnetic Effects of Electric Current",
      room: "Room 203",
      status: "Upcoming",
      statusClass: "bg-slate-100 text-slate-500",
      border: "border-green-500",
    },
    {
      time: "11:00 AM - 11:45 AM",
      className: "Class 10B - Science",
      topic: "Life Processes",
      room: "Room 204",
      status: "Upcoming",
      statusClass: "bg-slate-100 text-slate-500",
      border: "border-green-500",
    },
    {
      time: "12:00 PM - 12:45 PM",
      className: "Class 9A - Biology",
      topic: "Plant Tissues",
      room: "Lab 1",
      status: "Upcoming",
      statusClass: "bg-slate-100 text-slate-500",
      border: "border-green-500",
    },
  ];

  const performanceSnapshot = [
    {
      className: "Class 10A",
      avgScore: "83%",
      attendance: "94%",
      classTests: "16/18",
    },
    {
      className: "Class 9B",
      avgScore: "78%",
      attendance: "91%",
      classTests: "14/16",
    },
    {
      className: "Class 8A",
      avgScore: "75%",
      attendance: "89%",
      classTests: "13/16",
    },
    {
      className: "Class 9A",
      avgScore: "81%",
      attendance: "93%",
      classTests: "15/17",
    },
    {
      className: "Class 10B",
      avgScore: "77%",
      attendance: "90%",
      classTests: "12/15",
    },
  ];

  const subjectsOverview = [
    {
      subject: "Science",
      sections: 5,
      students: 120,
      progress: 88,
      color: "bg-purple-600",
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      subject: "Biology",
      sections: 2,
      students: 62,
      progress: 82,
      color: "bg-green-500",
      iconBg: "bg-green-100 text-green-600",
    },
    {
      subject: "Chemistry",
      sections: 1,
      students: 28,
      progress: 76,
      color: "bg-orange-500",
      iconBg: "bg-orange-100 text-orange-500",
    },
    {
      subject: "Physics",
      sections: 1,
      students: 28,
      progress: 81,
      color: "bg-blue-600",
      iconBg: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <div className="w-full space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">My Classes</h1>
        <p className="text-sm text-slate-500 mt-1">
          View and manage your assigned classes, sections, and subjects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full ${card.bg} text-white flex items-center justify-center text-3xl shrink-0`}
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
                  {card.symbol || "↑"} {card.desc}
                </p>
              </div>
            </div>

            <div
              className={`w-12 h-12 rounded-xl ${card.lightBg} ${card.text} flex items-center justify-center text-2xl shrink-0`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-lg font-black text-slate-900">
              My Assigned Classes
            </h2>

            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-blue-200 text-blue-600 text-sm font-bold hover:bg-blue-50 transition-colors">
              <IoCalendarOutline />
              View Class Timetable
            </button>
          </div>

          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 text-xs font-bold text-slate-500 w-[22%]">
                  Class / Section
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Subject
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Students
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Teacher Role
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Room
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {assignedClasses.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${item.color}`}
                      >
                        {item.tag}
                      </span>

                      <span className="font-bold text-slate-900 text-sm">
                        {item.className}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                    {item.subject}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                    {item.students}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                    {item.role}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                    {item.room}
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-lg bg-green-100 text-green-600 text-xs font-bold">
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <button className="text-slate-500 hover:text-blue-600">
                      <IoEllipsisVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
            <p className="text-sm text-slate-500">
              Showing 1 to 5 of 5 classes
            </p>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                <IoChevronBackOutline />
              </button>

              <button className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold">
                1
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                <IoChevronForwardOutline />
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              Today's Class Schedule
            </h2>

            <button className="text-sm text-blue-600 font-bold">
              View Full Timetable
            </button>
          </div>

          <div className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-[90px_1fr_auto] gap-4 border-l-2 ${item.border} pl-4 border-b border-slate-100 pb-4 last:border-b-0`}
              >
                <div>
                  <p className="text-xs font-semibold text-slate-500 leading-5">
                    {item.time.split(" - ")[0]}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 leading-5">
                    - {item.time.split(" - ")[1]}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    {item.className}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{item.topic}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.room}</p>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${item.statusClass}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 font-semibold">
            <FaRegCalendarCheck className="text-slate-400" />
            Lunch Break: 12:45 PM - 01:30 PM
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              Class Performance Snapshot
            </h2>

            <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none text-slate-600">
              <option>This Term</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="flex-1">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-xs font-bold text-slate-500">
                    Class / Section
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500">
                    Avg. Score
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500">
                    Attendance
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500">
                    Class Tests
                  </th>
                </tr>
              </thead>

              <tbody>
                {performanceSnapshot.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-4 py-4 text-sm font-bold text-slate-900">
                      {item.className}
                    </td>

                    <td className="px-4 py-4 text-sm font-black text-blue-600">
                      {item.avgScore}
                    </td>

                    <td className="px-4 py-4 text-sm font-black text-green-600">
                      {item.attendance}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                      {item.classTests}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="mt-auto pt-5 text-sm text-blue-600 font-bold text-left">
            View Detailed Reports →
          </button>
        </div>

        <div className="xl:col-span-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              Subjects & Sections Overview
            </h2>

            <button className="text-sm text-blue-600 font-bold">
              View All Sections
            </button>
          </div>

          <div className="flex-1">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-xs font-bold text-slate-500">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500">
                    Sections
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500">
                    Students
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500">
                    Progress
                  </th>
                </tr>
              </thead>

              <tbody>
                {subjectsOverview.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${item.iconBg}`}
                        >
                          <HiOutlineBookOpen />
                        </span>

                        <span className="text-sm font-bold text-slate-900">
                          {item.subject}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                      {item.sections}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                      {item.students}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${item.color}`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>

                        <span className="text-sm font-black text-slate-700">
                          {item.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="mt-auto pt-5 text-sm text-blue-600 font-bold text-left">
            Manage Subjects & Sections →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
