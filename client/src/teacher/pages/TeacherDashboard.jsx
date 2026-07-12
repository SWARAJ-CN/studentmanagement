import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";

import { HiOutlineBookOpen } from "react-icons/hi";
import { LuUsersRound } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoMegaphoneOutline } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";

const TeacherDashboard = () => {
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
      title: "Total Students",
      value: "126",
      desc: "6 new this month",
      icon: <LuUsersRound />,
      bg: "bg-purple-600",
      lightBg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "Attendance Submitted",
      value: "92.6%",
      desc: "3.8% from last month",
      icon: <FaRegCalendarCheck />,
      bg: "bg-green-500",
      lightBg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Pending Evaluations",
      value: "18",
      desc: "marks to update",
      icon: <FaClipboardList />,
      bg: "bg-orange-500",
      lightBg: "bg-orange-50",
      text: "text-orange-500",
    },
  ];

  const performanceData = [
    { month: "Jan", yourClass: 72, schoolAvg: 61 },
    { month: "Feb", yourClass: 74, schoolAvg: 63 },
    { month: "Mar", yourClass: 76, schoolAvg: 64 },
    { month: "Apr", yourClass: 81, schoolAvg: 67 },
    { month: "May", yourClass: 85, schoolAvg: 70 },
  ];

  const attendanceData = [
    { name: "Present", value: 116, percentage: "92.6%", color: "#22c55e" },
    { name: "Late", value: 6, percentage: "4.8%", color: "#f59e0b" },
    { name: "Absent", value: 4, percentage: "2.6%", color: "#ef4444" },
  ];

  const todaysTimetable = [
    {
      period: 1,
      time: "08:00 AM - 08:45 AM",
      subject: "Class 10A - Science",
      room: "Room 204",
      status: "Completed",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      period: 2,
      time: "08:45 AM - 09:30 AM",
      subject: "Class 9B - Biology",
      room: "Lab 2",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-600",
    },
    {
      period: 3,
      time: "09:45 AM - 10:30 AM",
      subject: "Class 8A - Science",
      room: "Room 203",
      status: "Upcoming",
      statusColor: "bg-slate-100 text-slate-500",
    },
    {
      period: 4,
      time: "11:00 AM - 11:45 AM",
      subject: "Class 10B - Science",
      room: "Room 204",
      status: "Upcoming",
      statusColor: "bg-slate-100 text-slate-500",
    },
    {
      period: 5,
      time: "12:00 PM - 12:45 PM",
      subject: "Class 9A - Biology",
      room: "Lab 1",
      status: "Upcoming",
      statusColor: "bg-slate-100 text-slate-500",
    },
  ];

  const classOverview = [
    {
      className: "Class 10A",
      subject: "Science",
      students: 32,
      attendance: "96%",
      performance: "85%",
    },
    {
      className: "Class 9B",
      subject: "Biology",
      students: 28,
      attendance: "92%",
      performance: "81%",
    },
    {
      className: "Class 8A",
      subject: "Science",
      students: 30,
      attendance: "89%",
      performance: "78%",
    },
    {
      className: "Class 10B",
      subject: "Science",
      students: 36,
      attendance: "94%",
      performance: "83%",
    },
  ];

  const studentActivities = [
    {
      icon: <FaRegCalendarCheck />,
      bg: "bg-green-100",
      color: "text-green-600",
      title: "Attendance marked for Class 10A",
      desc: "116 students present out of 126 students.",
      time: "45 minutes ago",
    },
    {
      icon: <MdBarChart />,
      bg: "bg-purple-100",
      color: "text-purple-600",
      title: "Diya Patel scored 18/20",
      desc: "Scored well in Cell Structure Quiz.",
      time: "2 hours ago",
    },
    {
      icon: <IoMegaphoneOutline />,
      bg: "bg-orange-100",
      color: "text-orange-500",
      title: "Science Explorer badge awarded",
      desc: "Ananya Sharma earned a badge for class performance.",
      time: "3 hours ago",
    },
    {
      icon: <LuUsersRound />,
      bg: "bg-blue-100",
      color: "text-blue-600",
      title: "Class 9B discussion updated",
      desc: "New replies added in Photosynthesis topic.",
      time: "5 hours ago",
    },
    {
      icon: <IoDocumentOutline />,
      bg: "bg-red-100",
      color: "text-red-500",
      title: "Project review completed",
      desc: "Rainwater Harvesting Model review has been updated.",
      time: "Yesterday",
    },
  ];

  return (
    <div className="w-full space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Teacher Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, Ms. Ananya! Here's what's happening in your classes
            today.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <FaRegCalendarCheck className="text-slate-400" />
          <span>May 23, 2024</span>
          <span>|</span>
          <span>Thursday</span>
        </div>
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
                  ↑ {card.desc}
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              Class Performance Overview
            </h2>

            <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none text-slate-600">
              <option>This Term</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="flex items-center gap-6 mb-3 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[3px] bg-blue-600 rounded-full"></span>
              <span>Your Classes Average</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-8 h-[3px] border-t-2 border-dashed border-slate-400"></span>
              <span>School Average</span>
            </div>
          </div>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 25, right: 25, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tickLine={false}
                  dy={8}
                />

                <YAxis
                  domain={[50, 100]}
                  ticks={[50, 75, 100]}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  formatter={(value, name) => [
                    `${value}%`,
                    name === "yourClass"
                      ? "Your Classes Average"
                      : "School Average",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="yourClass"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#ffffff",
                    stroke: "#2563eb",
                    strokeWidth: 3,
                  }}
                  activeDot={{ r: 7 }}
                >
                  <LabelList
                    dataKey="yourClass"
                    position="top"
                    formatter={(value) => `${value}%`}
                    style={{
                      fill: "#0f172a",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  />
                </Line>

                <Line
                  type="monotone"
                  dataKey="schoolAvg"
                  stroke="#94a3b8"
                  strokeWidth={3}
                  strokeDasharray="6 6"
                  dot={{
                    r: 4,
                    fill: "#ffffff",
                    stroke: "#94a3b8",
                    strokeWidth: 2,
                  }}
                >
                  <LabelList
                    dataKey="schoolAvg"
                    position="bottom"
                    formatter={(value) => `${value}%`}
                    style={{
                      fill: "#475569",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-slate-900">
              Attendance Overview
            </h2>

            <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none text-slate-600">
              <option>This Month</option>
              <option>This Week</option>
              <option>Today</option>
            </select>
          </div>

          <div className="h-[270px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={78}
                  outerRadius={115}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <h3 className="text-3xl font-black text-slate-900">92.6%</h3>
              <p className="text-sm text-slate-500 font-medium">Overall</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3 border-t border-slate-100 pt-4">
            {attendanceData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <h4 className="font-bold text-slate-800 text-sm">
                    {item.name}
                  </h4>
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  {item.value}
                </p>
                <p className="text-xs text-slate-500">({item.percentage})</p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              Today's Timetable
            </h2>

            <button className="text-sm text-blue-600 font-bold">
              View Full
            </button>
          </div>

          <div className="space-y-3">
            {todaysTimetable.map((item) => (
              <div
                key={item.period}
                className="grid grid-cols-[36px_1fr] gap-3 items-center border-b border-slate-100 pb-3 last:border-b-0"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">
                  {item.period}
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.time}
                  </p>

                  <div className="flex items-start justify-between gap-2 mt-1">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-5">
                        {item.subject}
                      </h4>
                      <p className="text-xs text-slate-500">{item.room}</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              My Class Overview
            </h2>

            <button className="text-sm text-blue-600 font-bold">
              View All
            </button>
          </div>

          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Class
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Subject
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Students
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Attendance
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Performance
                </th>
              </tr>
            </thead>

            <tbody>
              {classOverview.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="px-4 py-4 font-bold text-slate-900">
                    {item.className}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{item.subject}</td>
                  <td className="px-4 py-4 text-slate-600">{item.students}</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-lg bg-green-100 text-green-600 text-xs font-bold">
                      {item.attendance}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: item.performance }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-slate-700">
                        {item.performance}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              Recent Student Activity
            </h2>

            <button className="text-sm text-blue-600 font-bold">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {studentActivities.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border-b border-slate-100 pb-4 last:border-b-0"
              >
                <div
                  className={`w-11 h-11 rounded-full ${item.bg} ${item.color} flex items-center justify-center text-xl shrink-0`}
                >
                  {item.icon}
                </div>

                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
