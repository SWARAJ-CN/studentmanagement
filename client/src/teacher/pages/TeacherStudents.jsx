import React, { useState } from "react";

import { IoSearchOutline } from "react-icons/io5";
import {
  IoAdd,
  IoEyeOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoEllipsisVertical,
} from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineGroups } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const TeacherStudents = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const statsCards = [
    {
      title: "Total Students",
      value: "126",
      desc: "6 new this term",
      icon: <PiStudentFill />,
      bg: "bg-green-500",
      lightBg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Active Students",
      value: "118",
      desc: "5 new this term",
      icon: <FaRegUser />,
      bg: "bg-purple-600",
      lightBg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "New Admissions",
      value: "8",
      desc: "8 this term",
      icon: <IoAdd />,
      bg: "bg-blue-600",
      lightBg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Student Groups",
      value: "10",
      desc: "Same as last term",
      icon: <MdOutlineGroups />,
      bg: "bg-orange-500",
      lightBg: "bg-orange-50",
      text: "text-orange-500",
      symbol: "≈",
    },
  ];

  const students = [
    {
      id: "SMI-2024-001",
      initials: "AR",
      name: "Aarav Reddy",
      className: "Class 10A",
      rollNo: "01",
      parentContact: "+91 98765 43210",
      attendance: 94,
      status: "Active",
      avatarColor: "bg-blue-100 text-blue-600",
      classColor: "bg-purple-100 text-purple-600",
    },
    {
      id: "SMI-2024-002",
      initials: "PS",
      name: "Priya Sharma",
      className: "Class 9B",
      rollNo: "12",
      parentContact: "+91 91234 56789",
      attendance: 91,
      status: "Active",
      avatarColor: "bg-purple-100 text-purple-600",
      classColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "SMI-2024-003",
      initials: "RK",
      name: "Rohan Kumar",
      className: "Class 8A",
      rollNo: "07",
      parentContact: "+91 99887 66554",
      attendance: 89,
      status: "Active",
      avatarColor: "bg-red-100 text-red-500",
      classColor: "bg-violet-100 text-violet-600",
    },
    {
      id: "SMI-2024-004",
      initials: "AV",
      name: "Ananya Verma",
      className: "Class 9A",
      rollNo: "03",
      parentContact: "+91 98712 34567",
      attendance: 93,
      status: "Active",
      avatarColor: "bg-green-100 text-green-600",
      classColor: "bg-green-100 text-green-600",
    },
    {
      id: "SMI-2024-005",
      initials: "SK",
      name: "Siddharth Kapoor",
      className: "Class 10B",
      rollNo: "15",
      parentContact: "+91 90011 22334",
      attendance: 87,
      status: "Active",
      avatarColor: "bg-orange-100 text-orange-500",
      classColor: "bg-orange-100 text-orange-500",
    },
    {
      id: "SMI-2024-006",
      initials: "MY",
      name: "Meera Yadav",
      className: "Class 7A",
      rollNo: "09",
      parentContact: "+91 87654 32109",
      attendance: 95,
      status: "Active",
      avatarColor: "bg-teal-100 text-teal-600",
      classColor: "bg-cyan-100 text-cyan-600",
    },
    {
      id: "SMI-2024-007",
      initials: "ND",
      name: "Nikhil Das",
      className: "Class 8B",
      rollNo: "11",
      parentContact: "+91 93456 78901",
      attendance: 82,
      status: "At Risk",
      avatarColor: "bg-blue-100 text-blue-600",
      classColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "SMI-2024-008",
      initials: "TS",
      name: "Tanya Singh",
      className: "Class 7B",
      rollNo: "04",
      parentContact: "+91 98980 11223",
      attendance: 90,
      status: "Active",
      avatarColor: "bg-pink-100 text-pink-600",
      classColor: "bg-pink-100 text-pink-600",
    },
  ];

  const overviewData = [
    { name: "Active Students", value: 118, color: "#22c55e" },
    { name: "At Risk Students", value: 5, color: "#f97316" },
    { name: "Inactive Students", value: 3, color: "#ef4444" },
  ];

  const classDistribution = [
    {
      className: "Class 10A",
      students: 32,
      percentage: "25.4%",
      color: "bg-purple-600",
      dot: "bg-purple-600",
    },
    {
      className: "Class 10B",
      students: 28,
      percentage: "22.2%",
      color: "bg-orange-500",
      dot: "bg-orange-500",
    },
    {
      className: "Class 9A",
      students: 26,
      percentage: "20.6%",
      color: "bg-green-500",
      dot: "bg-green-500",
    },
    {
      className: "Class 9B",
      students: 25,
      percentage: "19.8%",
      color: "bg-blue-600",
      dot: "bg-blue-600",
    },
    {
      className: "Class 8A",
      students: 15,
      percentage: "11.9%",
      color: "bg-violet-500",
      dot: "bg-violet-500",
    },
  ];

  const recentAdmissions = [
    {
      name: "Diya Nair",
      className: "Class 7A",
      date: "May 6, 2024",
    },
    {
      name: "Kabir Malhotra",
      className: "Class 8B",
      date: "May 3, 2024",
    },
    {
      name: "Ishita Patel",
      className: "Class 9A",
      date: "Apr 30, 2024",
    },
    {
      name: "Arjun Mehta",
      className: "Class 10A",
      date: "Apr 28, 2024",
    },
  ];

  const handleView = (student) => {
    console.log("View student:", student);
  };

  const handleEdit = (student) => {
    console.log("Edit student:", student);
    setOpenMenu(null);
  };

  const handleDelete = (student) => {
    console.log("Delete student:", student);
    setOpenMenu(null);
  };

  return (
    <div className="w-full space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Students</h1>
        <p className="text-sm text-slate-500 mt-1">
          View, manage, and organize student records across your classes.
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
        <div className="xl:col-span-9 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
            <h2 className="text-xl font-black text-slate-900">
              Student Directory
            </h2>

            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors">
              <IoAdd className="text-lg" />
              Add Student
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-5 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search students by name, ID or contact..."
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            <select className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Classes</option>
              <option>Class 10A</option>
              <option>Class 9B</option>
              <option>Class 8A</option>
            </select>

            <select className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>At Risk</option>
              <option>Inactive</option>
            </select>

            <select className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Groups</option>
              <option>Science</option>
              <option>Biology</option>
            </select>

            <button className="md:col-span-1 h-11 rounded-xl border border-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold hover:bg-slate-50">
              <IoFilterOutline />
            </button>
          </div>

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
                  Parent Contact
                </th>
                <th className="px-3 py-3 text-xs font-bold text-slate-500">
                  Attendance
                </th>
                <th className="px-3 py-3 text-xs font-bold text-slate-500">
                  Status
                </th>
                <th className="px-3 py-3 text-xs font-bold text-slate-500 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="px-3 py-4 text-xs font-bold text-slate-700 whitespace-nowrap">
                    {student.id}
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3 min-w-[170px]">
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

                  <td className="px-3 py-4 text-xs font-semibold text-slate-600 whitespace-nowrap">
                    {student.parentContact}
                  </td>

                  <td className="px-3 py-4 min-w-[110px]">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-slate-700">
                        {student.attendance}%
                      </span>

                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            student.attendance < 85
                              ? "bg-orange-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-500"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex items-center justify-center gap-2 relative">
                      <button
                        onClick={() => handleView(student)}
                        title="View Student"
                        className="w-8 h-8 rounded-lg border border-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors"
                      >
                        <IoEyeOutline />
                      </button>

                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === index ? null : index)
                        }
                        title="More Options"
                        className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors"
                      >
                        <IoEllipsisVertical />
                      </button>

                      {openMenu === index && (
                        <div className="absolute right-0 top-10 w-36 bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/70 p-2 z-30">
                          <button
                            onClick={() => handleEdit(student)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <IoPencilOutline />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(student)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <IoTrashOutline />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
            <p className="text-sm text-slate-500">
              Showing 1 to 8 of 126 students
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

              <span className="text-slate-400 px-1">...</span>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-600 font-bold">
                16
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-lg font-black text-slate-900 mb-5">
              Student Overview
            </h2>

            <div className="h-[190px] relative">
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
                <h3 className="text-2xl font-black text-slate-900">126</h3>
                <p className="text-xs text-slate-500 font-semibold">Total</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
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
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-slate-900">
                Recent Admissions
              </h2>

              <button className="text-sm text-blue-600 font-bold">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentAdmissions.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[35px_1fr_auto] gap-3 items-center"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FaRegUser />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">
                      {item.className}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">{item.date}</p>
                    <span className="inline-block mt-1 px-2 py-1 rounded-lg bg-green-100 text-green-600 text-xs font-bold">
                      New
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-slate-900">
            Class Distribution
          </h2>

          <button className="text-sm text-blue-600 font-bold">View All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6">
          {classDistribution.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-3 h-3 rounded-full ${item.dot}`}></span>

                <p className="text-sm font-bold text-slate-700">
                  {item.className}
                </p>

                <p className="text-xs text-slate-500 ml-auto">
                  {item.students} students
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: item.percentage }}
                  ></div>
                </div>

                <p className="text-sm font-black text-slate-700 w-12 text-right">
                  {item.percentage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherStudents;
