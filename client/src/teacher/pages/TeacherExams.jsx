import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  IoSearchOutline,
  IoAdd,
  IoEyeOutline,
  IoCheckmarkCircle,
  IoCalendarOutline,
} from "react-icons/io5";

import { FaClipboardList, FaTrophy } from "react-icons/fa";

const TeacherExams = () => {
  const statsCards = [
    {
      title: "Total Exams",
      value: "48",
      desc: "12% vs Last Month",
      icon: <FaClipboardList />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-600",
      symbol: "↑",
    },
    {
      title: "Upcoming Exams",
      value: "16",
      desc: "6 vs Last Month",
      icon: <IoCalendarOutline />,
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
      text: "text-orange-500",
      symbol: "↑",
    },
    {
      title: "Completed Exams",
      value: "28",
      desc: "18% vs Last Month",
      icon: <IoCheckmarkCircle />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-600",
      symbol: "↑",
    },
    {
      title: "Average Score / Pass Rate",
      value: "82.6%",
      desc: "4.3% vs Last Month",
      icon: <FaTrophy />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-purple-600",
      symbol: "↑",
    },
  ];

  const exams = [
    {
      id: "EXM-2024-048",
      title: "Mid Term Science",
      className: "Class 10A",
      subject: "Science",
      date: "May 20, 2024",
      time: "10:00 AM",
      maxMarks: 100,
      status: "Upcoming",
      classColor: "bg-blue-100 text-blue-600",
      statusColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "EXM-2024-047",
      title: "Biology Unit Test",
      className: "Class 10B",
      subject: "Biology",
      date: "May 18, 2024",
      time: "09:30 AM",
      maxMarks: 50,
      status: "Ongoing",
      classColor: "bg-green-100 text-green-600",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      id: "EXM-2024-046",
      title: "Chemistry Practical",
      className: "Class 10A",
      subject: "Chemistry",
      date: "May 15, 2024",
      time: "02:00 PM",
      maxMarks: 30,
      status: "Completed",
      classColor: "bg-blue-100 text-blue-600",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      id: "EXM-2024-045",
      title: "Math Monthly Test",
      className: "Class 9A",
      subject: "Mathematics",
      date: "May 14, 2024",
      time: "10:00 AM",
      maxMarks: 50,
      status: "Completed",
      classColor: "bg-orange-100 text-orange-500",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      id: "EXM-2024-044",
      title: "English Assessment",
      className: "Class 9B",
      subject: "English",
      date: "May 16, 2024",
      time: "11:00 AM",
      maxMarks: 50,
      status: "Upcoming",
      classColor: "bg-purple-100 text-purple-600",
      statusColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "EXM-2024-043",
      title: "Physics Unit Test",
      className: "Class 10A",
      subject: "Physics",
      date: "May 12, 2024",
      time: "09:30 AM",
      maxMarks: 50,
      status: "Completed",
      classColor: "bg-blue-100 text-blue-600",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      id: "EXM-2024-042",
      title: "Final Revision Test",
      className: "Class 10B",
      subject: "Science",
      date: "May 25, 2024",
      time: "10:00 AM",
      maxMarks: 100,
      status: "Draft",
      classColor: "bg-green-100 text-green-600",
      statusColor: "bg-slate-100 text-slate-500",
    },
    {
      id: "EXM-2024-041",
      title: "Social Studies Test",
      className: "Class 8A",
      subject: "Social Studies",
      date: "May 22, 2024",
      time: "11:30 AM",
      maxMarks: 50,
      status: "Upcoming",
      classColor: "bg-orange-100 text-orange-500",
      statusColor: "bg-blue-100 text-blue-600",
    },
  ];

  const overviewData = [
    { name: "Upcoming", value: 16, percentage: "33.3%", color: "#2563eb" },
    { name: "Completed", value: 28, percentage: "58.3%", color: "#22c55e" },
    { name: "Draft", value: 3, percentage: "6.3%", color: "#f59e0b" },
    { name: "Ongoing", value: 1, percentage: "2.1%", color: "#7c3aed" },
  ];

  const classExamSummary = [
    {
      className: "Class 10A",
      percentage: "84%",
      width: "84%",
      color: "bg-blue-600",
    },
    {
      className: "Class 10B",
      percentage: "78%",
      width: "78%",
      color: "bg-green-500",
    },
    {
      className: "Class 9A",
      percentage: "81%",
      width: "81%",
      color: "bg-orange-500",
    },
    {
      className: "Class 9B",
      percentage: "74%",
      width: "74%",
      color: "bg-purple-500",
    },
    {
      className: "Class 8A",
      percentage: "69%",
      width: "69%",
      color: "bg-cyan-500",
    },
  ];

  const recentActivity = [
    {
      title: "Mid Term Science created for Class 10A",
      desc: "May 5, 2024 • 10:05 AM",
      icon: <IoAdd />,
      bg: "bg-blue-600",
      color: "text-white",
    },
    {
      title: "Biology Unit Test results published",
      desc: "May 5, 2024 • 09:45 AM",
      icon: <IoCheckmarkCircle />,
      bg: "bg-green-500",
      color: "text-white",
    },
    {
      title: "Chemistry Practical rescheduled",
      desc: "May 4, 2024 • 04:30 PM",
      icon: <IoCalendarOutline />,
      bg: "bg-orange-500",
      color: "text-white",
    },
    {
      title: "Math Monthly Test updated",
      desc: "May 4, 2024 • 11:15 AM",
      icon: <FaClipboardList />,
      bg: "bg-purple-500",
      color: "text-white",
    },
  ];

  const handleViewExam = (exam) => {
    console.log("View exam:", exam);
  };

  return (
    <div className="w-full space-y-6 pb-8">
      <div>
        <p className="text-3xl font-black text-slate-900">Exams</p>
        <p className="text-sm text-slate-500 mt-1">
          Create, manage, and monitor examinations across your classes.
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
                {card.symbol} {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-9 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full flex flex-col">
          <p className="text-xl font-black text-slate-900 mb-5">
            Exam Schedule
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-4 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search exams..."
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            <select className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Classes</option>
              <option>Class 10A</option>
              <option>Class 10B</option>
              <option>Class 9A</option>
            </select>

            <select className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Subjects</option>
              <option>Science</option>
              <option>Biology</option>
              <option>Mathematics</option>
            </select>

            <select className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Exam Types</option>
              <option>Unit Test</option>
              <option>Practical</option>
              <option>Mid Term</option>
            </select>

            <button className="md:col-span-2 h-11 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors whitespace-nowrap">
              <IoAdd className="text-lg" />
              Create Exam
            </button>
          </div>

          <div className="flex-1">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="w-[12%] px-3 py-3 text-xs font-bold text-slate-500">
                    Exam ID
                  </th>
                  <th className="w-[18%] px-3 py-3 text-xs font-bold text-slate-500">
                    Exam Title
                  </th>
                  <th className="w-[10%] px-3 py-3 text-xs font-bold text-slate-500">
                    Class
                  </th>
                  <th className="w-[12%] px-3 py-3 text-xs font-bold text-slate-500">
                    Subject
                  </th>
                  <th className="w-[13%] px-3 py-3 text-xs font-bold text-slate-500">
                    Date
                  </th>
                  <th className="w-[10%] px-3 py-3 text-xs font-bold text-slate-500">
                    Time
                  </th>
                  <th className="w-[7%] px-2 py-3 text-xs font-bold text-slate-500 text-center">
                    Max
                    <br />
                    Marks
                  </th>
                  <th className="w-[11%] px-2 py-3 text-xs font-bold text-slate-500 text-center">
                    Status
                  </th>
                  <th className="w-[7%] px-2 py-3 text-xs font-bold text-slate-500 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {exams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-3 py-4 text-xs font-bold text-slate-700 break-words">
                      {exam.id}
                    </td>

                    <td className="px-3 py-4 text-sm font-bold text-slate-900 leading-5">
                      {exam.title}
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${exam.classColor}`}
                      >
                        {exam.className}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-slate-600 leading-5">
                      {exam.subject}
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-slate-600 leading-5">
                      {exam.date}
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">
                      {exam.time}
                    </td>

                    <td className="px-2 py-4 text-sm font-semibold text-slate-600 text-center">
                      {exam.maxMarks}
                    </td>

                    <td className="px-2 py-4 text-center">
                      <span
                        className={`inline-flex w-[82px] justify-center px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${exam.statusColor}`}
                      >
                        {exam.status}
                      </span>
                    </td>

                    <td className="px-2 py-4 text-center">
                      <button
                        onClick={() => handleViewExam(exam)}
                        title="View Exam"
                        className="w-8 h-8 rounded-lg border border-blue-100 text-blue-600 inline-flex items-center justify-center hover:bg-blue-50 transition-colors"
                      >
                        <IoEyeOutline />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-auto pt-5">
            <p className="text-sm text-slate-500">Showing 1 to 8 of 48 exams</p>

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
                6
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-3 h-full flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-black text-slate-900">Exam Overview</p>
              <span className="text-slate-500 text-lg">⋮</span>
            </div>

            <div className="h-[170px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overviewData}
                    dataKey="value"
                    innerRadius={48}
                    outerRadius={72}
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
                <p className="text-3xl font-black text-slate-900">48</p>
                <p className="text-xs text-slate-500 font-semibold">
                  Total Exams
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-2">
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

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-lg font-black text-slate-900">
                Class Exam Summary
              </p>

              <button className="text-sm text-blue-600 font-bold whitespace-nowrap">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {classExamSummary.map((item, index) => (
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
              <p className="text-lg font-black text-slate-900">
                Recent Exam Activity
              </p>

              <button className="text-sm text-blue-600 font-bold whitespace-nowrap">
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
                    <p className="text-sm font-bold text-slate-900 leading-5">
                      {item.title}
                    </p>
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

export default TeacherExams;
