import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  IoSearchOutline,
  IoAdd,
  IoEyeOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
} from "react-icons/io5";

import { FaClipboardList, FaTrophy } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";

const TeacherResults = () => {
  const statsCards = [
    {
      title: "Total Results Published",
      value: "1,248",
      desc: "15% vs Last Month",
      icon: <FaClipboardList />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-600",
      symbol: "↑",
    },
    {
      title: "Pending Evaluations",
      value: "112",
      desc: "8% vs Last Month",
      icon: <IoTimeOutline />,
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
      text: "text-orange-500",
      symbol: "↑",
    },
    {
      title: "Average Pass Rate",
      value: "84.3%",
      desc: "6.2% vs Last Month",
      icon: <IoCheckmarkCircle />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-600",
      symbol: "↑",
    },
    {
      title: "Top Scoring Class",
      value: "Class 10A",
      desc: "Pass Rate: 94.8%",
      icon: <FaTrophy />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-slate-500",
      symbol: "",
    },
  ];

  const results = [
    {
      id: "RES-2024-1248",
      studentName: "Aarav Sharma",
      className: "Class 10A",
      subject: "Science",
      exam: "Mid Term Exam",
      score: "92 / 100",
      grade: "A+",
      status: "Published",
      classColor: "bg-blue-100 text-blue-600",
      gradeColor: "text-green-600",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      id: "RES-2024-1247",
      studentName: "Diya Patel",
      className: "Class 10A",
      subject: "Mathematics",
      exam: "Mid Term Exam",
      score: "88 / 100",
      grade: "A",
      status: "Published",
      classColor: "bg-blue-100 text-blue-600",
      gradeColor: "text-green-600",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      id: "RES-2024-1246",
      studentName: "Rohan Verma",
      className: "Class 10B",
      subject: "Science",
      exam: "Mid Term Exam",
      score: "76 / 100",
      grade: "B+",
      status: "Pending Review",
      classColor: "bg-blue-100 text-blue-600",
      gradeColor: "text-blue-600",
      statusColor: "bg-orange-100 text-orange-500",
    },
    {
      id: "RES-2024-1245",
      studentName: "Ananya Singh",
      className: "Class 9A",
      subject: "English",
      exam: "Unit Test 2",
      score: "81 / 100",
      grade: "A",
      status: "Published",
      classColor: "bg-green-100 text-green-600",
      gradeColor: "text-green-600",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      id: "RES-2024-1244",
      studentName: "Karan Mehta",
      className: "Class 9B",
      subject: "Mathematics",
      exam: "Unit Test 2",
      score: "68 / 100",
      grade: "B",
      status: "Pending Review",
      classColor: "bg-green-100 text-green-600",
      gradeColor: "text-blue-600",
      statusColor: "bg-orange-100 text-orange-500",
    },
    {
      id: "RES-2024-1243",
      studentName: "Sara Khan",
      className: "Class 8A",
      subject: "Science",
      exam: "Term 1 Exam",
      score: "59 / 100",
      grade: "C",
      status: "Draft",
      classColor: "bg-purple-100 text-purple-600",
      gradeColor: "text-orange-500",
      statusColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "RES-2024-1242",
      studentName: "Vivaan Nair",
      className: "Class 10A",
      subject: "Social Studies",
      exam: "Mid Term Exam",
      score: "90 / 100",
      grade: "A+",
      status: "Published",
      classColor: "bg-blue-100 text-blue-600",
      gradeColor: "text-green-600",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      id: "RES-2024-1241",
      studentName: "Mira Iyer",
      className: "Class 9A",
      subject: "Science",
      exam: "Unit Test 2",
      score: "73 / 100",
      grade: "B+",
      status: "Published",
      classColor: "bg-green-100 text-green-600",
      gradeColor: "text-blue-600",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      id: "RES-2024-1240",
      studentName: "Arjun Reddy",
      className: "Class 10B",
      subject: "English",
      exam: "Mid Term Exam",
      score: "65 / 100",
      grade: "B-",
      status: "Draft",
      classColor: "bg-blue-100 text-blue-600",
      gradeColor: "text-orange-500",
      statusColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "RES-2024-1239",
      studentName: "Naina Gupta",
      className: "Class 8A",
      subject: "Mathematics",
      exam: "Term 1 Exam",
      score: "44 / 100",
      grade: "D",
      status: "Draft",
      classColor: "bg-purple-100 text-purple-600",
      gradeColor: "text-red-500",
      statusColor: "bg-blue-100 text-blue-600",
    },
  ];

  const overviewData = [
    { name: "Published", value: 912, percentage: "73.1%", color: "#22c55e" },
    {
      name: "Pending Review",
      value: 112,
      percentage: "9.0%",
      color: "#f59e0b",
    },
    { name: "Failed Recheck", value: 46, percentage: "3.7%", color: "#ef4444" },
    { name: "Draft", value: 178, percentage: "14.2%", color: "#2563eb" },
  ];

  const classResultSummary = [
    {
      className: "Class 10A",
      percentage: "94.8%",
      width: "94.8%",
      color: "bg-green-500",
    },
    {
      className: "Class 10B",
      percentage: "88.6%",
      width: "88.6%",
      color: "bg-green-500",
    },
    {
      className: "Class 9A",
      percentage: "82.7%",
      width: "82.7%",
      color: "bg-blue-600",
    },
    {
      className: "Class 9B",
      percentage: "78.4%",
      width: "78.4%",
      color: "bg-purple-500",
    },
    {
      className: "Class 8A",
      percentage: "71.2%",
      width: "71.2%",
      color: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      title: "Mid Term Exam results published for Class 10A",
      desc: "May 5, 2024 • 10:30 AM",
      icon: <IoCheckmarkCircle />,
      bg: "bg-green-500",
      color: "text-white",
    },
    {
      title: "12 results pending review for Class 10B",
      desc: "May 5, 2024 • 09:45 AM",
      icon: <IoTimeOutline />,
      bg: "bg-orange-500",
      color: "text-white",
    },
    {
      title: "Unit Test 2 results published for Class 9A",
      desc: "May 4, 2024 • 04:15 PM",
      icon: <FaClipboardList />,
      bg: "bg-purple-500",
      color: "text-white",
    },
    {
      title: "Term 1 Exam draft created for Class 8A",
      desc: "May 4, 2024 • 11:20 AM",
      icon: <MdBarChart />,
      bg: "bg-blue-600",
      color: "text-white",
    },
  ];

  const handleViewResult = (result) => {
    console.log("View result:", result);
  };

  return (
    <div className="w-full space-y-6 pb-8">
      <div>
        <p className="text-3xl font-black text-slate-900">Results</p>
        <p className="text-sm text-slate-500 mt-1">
          View, manage, and publish student exam results across your classes.
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
        <div className="xl:col-span-9 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full flex flex-col">
          <p className="text-xl font-black text-slate-900 mb-5">
            Results Register
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-4 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search students..."
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
              <option>Mathematics</option>
              <option>English</option>
            </select>

            <select className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Exam Types</option>
              <option>Mid Term Exam</option>
              <option>Unit Test 2</option>
              <option>Term 1 Exam</option>
            </select>

            <button className="md:col-span-2 h-11 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors whitespace-nowrap">
              <IoAdd className="text-lg" />
              Publish Results
            </button>
          </div>

          <div className="flex-1">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="w-[13%] px-3 py-3 text-xs font-bold text-slate-500">
                    Result ID
                  </th>

                  <th className="w-[15%] px-3 py-3 text-xs font-bold text-slate-500">
                    Student Name
                  </th>

                  <th className="w-[9%] px-3 py-3 text-xs font-bold text-slate-500">
                    Class
                  </th>

                  <th className="w-[12%] px-3 py-3 text-xs font-bold text-slate-500">
                    Subject
                  </th>

                  <th className="w-[15%] px-3 py-3 text-xs font-bold text-slate-500">
                    Exam
                  </th>

                  <th className="w-[9%] px-3 py-3 text-xs font-bold text-slate-500">
                    Score
                  </th>

                  <th className="w-[7%] px-3 py-3 text-xs font-bold text-slate-500 text-center">
                    Grade
                  </th>

                  <th className="w-[13%] px-2 py-3 text-xs font-bold text-slate-500 text-center">
                    Status
                  </th>

                  <th className="w-[7%] px-2 py-3 text-xs font-bold text-slate-500 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((result) => (
                  <tr
                    key={result.id}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-3 py-4 text-xs font-bold text-slate-700 break-words">
                      {result.id}
                    </td>

                    <td className="px-3 py-4 text-sm font-bold text-slate-900 leading-5">
                      {result.studentName}
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${result.classColor}`}
                      >
                        {result.className}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-slate-600 leading-5">
                      {result.subject}
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-slate-600 leading-5">
                      {result.exam}
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">
                      {result.score}
                    </td>

                    <td
                      className={`px-3 py-4 text-sm font-black text-center ${result.gradeColor}`}
                    >
                      {result.grade}
                    </td>

                    <td className="px-2 py-4 text-center">
                      <span
                        className={`inline-flex min-w-[86px] justify-center px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${result.statusColor}`}
                      >
                        {result.status}
                      </span>
                    </td>

                    <td className="px-2 py-4 text-center">
                      <button
                        onClick={() => handleViewResult(result)}
                        title="View Result"
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
            <p className="text-sm text-slate-500">
              Showing 1 to 10 of 1,248 results
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

              <button className="px-4 h-9 rounded-lg border border-slate-100 text-slate-600 font-bold">
                125
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
              <p className="text-lg font-black text-slate-900">
                Results Overview
              </p>

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
                <h3 className="text-2xl font-black text-slate-900">1,248</h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Total Results
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
                Class Result Summary
              </p>

              <button className="text-sm text-blue-600 font-bold whitespace-nowrap">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {classResultSummary.map((item, index) => (
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
                Recent Result Activity
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
                    <h3 className="text-sm font-bold text-slate-900 leading-5">
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

export default TeacherResults;
