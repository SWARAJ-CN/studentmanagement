import React, { useState } from "react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { IoSearchOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa";
import { LuUsersRound } from "react-icons/lu";
import { MdTrendingUp } from "react-icons/md";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const TeacherAttendance = () => {
  const [attendance, setAttendance] = useState({
    1: "Present",
    2: "Present",
    3: "Absent",
    4: "Late",
    5: "Present",
    6: "Present",
    7: "Absent",
    8: "Present",
  });

  const statsCards = [
    {
      title: "Total Students",
      value: "126",
      desc: "0% vs Yesterday",
      icon: <LuUsersRound />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-600",
      symbol: "—",
    },
    {
      title: "Present Today",
      value: "106",
      desc: "6% vs Yesterday",
      icon: <IoCheckmarkCircle />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-600",
      symbol: "↑",
    },
    {
      title: "Absent Today",
      value: "14",
      desc: "3% vs Yesterday",
      icon: <IoCloseCircle />,
      bg: "bg-red-100",
      iconColor: "text-red-500",
      text: "text-red-500",
      symbol: "↑",
    },
    {
      title: "Average Attendance",
      value: "88.4%",
      desc: "2.7% vs Last Week",
      icon: <MdTrendingUp />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-green-600",
      symbol: "↑",
    },
  ];

  const students = [
    {
      id: 1,
      studentId: "SMI-2024-001",
      initials: "AR",
      name: "Aarav Sharma",
      className: "Class 10A",
      rollNo: "01",
      avatarColor: "bg-blue-100 text-blue-600",
      classColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      studentId: "SMI-2024-002",
      initials: "PS",
      name: "Pooja Singh",
      className: "Class 10A",
      rollNo: "02",
      avatarColor: "bg-green-100 text-green-600",
      classColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      studentId: "SMI-2024-003",
      initials: "RV",
      name: "Rohan Verma",
      className: "Class 10A",
      rollNo: "03",
      avatarColor: "bg-purple-100 text-purple-600",
      classColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 4,
      studentId: "SMI-2024-004",
      initials: "NP",
      name: "Neha Patel",
      className: "Class 10A",
      rollNo: "04",
      avatarColor: "bg-orange-100 text-orange-500",
      classColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 5,
      studentId: "SMI-2024-005",
      initials: "SK",
      name: "Siddharth Kapoor",
      className: "Class 10A",
      rollNo: "05",
      avatarColor: "bg-yellow-100 text-yellow-600",
      classColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 6,
      studentId: "SMI-2024-006",
      initials: "MY",
      name: "Meera Yadav",
      className: "Class 10A",
      rollNo: "06",
      avatarColor: "bg-teal-100 text-teal-600",
      classColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 7,
      studentId: "SMI-2024-007",
      initials: "ND",
      name: "Nikhil Das",
      className: "Class 10A",
      rollNo: "07",
      avatarColor: "bg-blue-100 text-blue-600",
      classColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 8,
      studentId: "SMI-2024-008",
      initials: "TS",
      name: "Tanya Singh",
      className: "Class 10A",
      rollNo: "08",
      avatarColor: "bg-pink-100 text-pink-600",
      classColor: "bg-blue-100 text-blue-600",
    },
  ];

  const overviewData = [
    { name: "Present", value: 106, percentage: "84.1%", color: "#22c55e" },
    { name: "Late", value: 6, percentage: "4.8%", color: "#f97316" },
    { name: "Absent", value: 14, percentage: "11.1%", color: "#ef4444" },
  ];

  const classSummary = [
    {
      className: "Class 10A",
      percentage: "88.4%",
      width: "88.4%",
      color: "bg-blue-600",
    },
    {
      className: "Class 10B",
      percentage: "85.7%",
      width: "85.7%",
      color: "bg-orange-500",
    },
    {
      className: "Class 9A",
      percentage: "90.2%",
      width: "90.2%",
      color: "bg-green-500",
    },
    {
      className: "Class 9B",
      percentage: "82.6%",
      width: "82.6%",
      color: "bg-blue-500",
    },
    {
      className: "Class 8A",
      percentage: "87.1%",
      width: "87.1%",
      color: "bg-purple-500",
    },
  ];

  const recentActivity = [
    {
      title: "Attendance submitted for Class 10A",
      desc: "May 5, 2024 • 10:05 AM",
      icon: <IoCheckmarkCircle />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Neha Patel marked as Late",
      desc: "Class 10A • 10:10 AM",
      icon: <FaRegCalendarCheck />,
      bg: "bg-orange-100",
      color: "text-orange-500",
    },
    {
      title: "Rohan Verma marked as Absent",
      desc: "Class 10A • 10:10 AM",
      icon: <IoCloseCircle />,
      bg: "bg-red-100",
      color: "text-red-500",
    },
    {
      title: "Attendance record updated for Class 9B",
      desc: "May 5, 2024 • 9:45 AM",
      icon: <FaRegCalendarCheck />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
  ];

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const getButtonClass = (studentId, status) => {
    const selectedStatus = attendance[studentId];

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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full flex flex-col">
          <h2 className="text-xl font-black text-slate-900 mb-5">
            Attendance Register
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-4 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            <select className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>Class 10A</option>
              <option>Class 10B</option>
              <option>Class 9A</option>
              <option>Class 9B</option>
            </select>

            <select className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>Section A</option>
              <option>Section B</option>
            </select>

            <input
              type="date"
              defaultValue="2024-05-05"
              className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
            />
          </div>

          <div className="flex-1">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-3 py-3 text-xs font-bold text-slate-500">
                    Student ID
                  </th>
                  <th className="px-3 py-3 text-xs font-bold text-slate-500">
                    Student Name
                  </th>
                  <th className="px-3 py-3 text-xs font-bold text-slate-500">
                    Class
                  </th>
                  <th className="px-3 py-3 text-xs font-bold text-slate-500">
                    Roll No
                  </th>
                  <th className="px-3 py-3 text-xs font-bold text-slate-500">
                    Attendance
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-3 py-4 text-xs font-bold text-slate-700 whitespace-nowrap">
                      {student.studentId}
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${student.avatarColor}`}
                        >
                          {student.initials}
                        </span>

                        <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                          {student.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${student.classColor}`}
                      >
                        {student.className}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-slate-600">
                      {student.rollNo}
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleAttendanceChange(student.id, "Present")
                          }
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${getButtonClass(
                            student.id,
                            "Present",
                          )}`}
                        >
                          Present
                        </button>

                        <button
                          onClick={() =>
                            handleAttendanceChange(student.id, "Absent")
                          }
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${getButtonClass(
                            student.id,
                            "Absent",
                          )}`}
                        >
                          Absent
                        </button>

                        <button
                          onClick={() =>
                            handleAttendanceChange(student.id, "Late")
                          }
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${getButtonClass(
                            student.id,
                            "Late",
                          )}`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
            <p className="text-sm text-slate-500">
              Showing 1 to 8 of 32 students
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

              <span className="text-slate-400 px-1">...</span>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-600 font-bold">
                8
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 h-full flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex-1">
            <h2 className="text-lg font-black text-slate-900 mb-4">
              Attendance Overview
            </h2>

            <div className="grid grid-cols-1 2xl:grid-cols-[180px_1fr] gap-4 items-center">
              <div className="h-[180px] relative">
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
                  <h3 className="text-2xl font-black text-slate-900">88.4%</h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Avg. Attendance
                  </p>
                </div>
              </div>

              <div className="space-y-3">
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
                  <p className="text-sm font-black text-slate-900">126</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex-1">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-slate-900">
                Class Attendance Summary
              </h2>

              <button className="text-sm text-blue-600 font-bold">
                View All
              </button>
            </div>

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

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex-1">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-slate-900">
                Recent Attendance Activity
              </h2>

              <button className="text-sm text-blue-600 font-bold">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[40px_1fr_auto] gap-3 items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${item.bg} ${item.color} flex items-center justify-center text-xl`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>

                  <span className="text-slate-400">›</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;
