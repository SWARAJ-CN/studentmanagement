import React, { useEffect, useState } from "react";

import { HiOutlineBookOpen } from "react-icons/hi";
import { LuUsersRound } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";
import { IoSchoolOutline } from "react-icons/io5";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { getTeacherAPI, updateTeacherAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

const MyClasses = () => {
  const [teacher, setTeacher] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    className: "",
    subject: "",
  });

  const classNumbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const sections = ["A", "B", "C"];

  const classOptions = classNumbers.flatMap((classNo) =>
    sections.map((section) => `Class ${classNo}${section}`)
  );

  const subjectOptions = [
    "English",
    "Malayalam",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "EVS",
    "General Knowledge",
  ];

  const studentCounts = [32, 29, 31, 28, 30, 27, 35, 26, 33, 25];

  const getStudentCount = (index) => {
    return studentCounts[index % studentCounts.length];
  };

  const normalizeAssignedClasses = (teacherData) => {
    if (!teacherData) return [];

    if (Array.isArray(teacherData.assignedClasses)) {
      return teacherData.assignedClasses
        .map((item) => {
          if (typeof item === "string") {
            return {
              className: item,
              subject:
                teacherData.subject?.split(",")[0]?.trim() ||
                "Subject not added",
            };
          }

          return {
            className: item.className || item.class || item.classSection || "",
            subject: item.subject || teacherData.subject || "",
          };
        })
        .filter((item) => item.className && item.subject);
    }

    if (teacherData.class) {
      const classes = teacherData.class
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const subjects = teacherData.subject
        ? teacherData.subject.split(",").map((item) => item.trim())
        : [];

      return classes.map((className, index) => ({
        className,
        subject: subjects[index] || subjects[0] || "Subject not added",
      }));
    }

    return [];
  };

  const getUniqueSubjects = (assignedClasses) => {
    return [...new Set(assignedClasses.map((item) => item.subject))];
  };

  const getClassText = (assignedClasses) => {
    return assignedClasses.map((item) => item.className).join(", ");
  };

  const getSubjectText = (assignedClasses) => {
    return getUniqueSubjects(assignedClasses).join(", ");
  };

  const getLoggedTeacher = async () => {
    const loggedTeacherId = localStorage.getItem("teacherId");

    const result = await getTeacherAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const foundTeacher = result.data.find(
        (item) => item.teacherId === loggedTeacherId
      );

      if (foundTeacher) {
        setTeacher(foundTeacher);
        localStorage.setItem("teacherData", JSON.stringify(foundTeacher));
      }
    }
  };

  useEffect(() => {
    getLoggedTeacher();
  }, []);

  const updateTeacherClasses = async (updatedAssignedClasses) => {
    const updatedTeacher = {
      ...teacher,
      assignedClasses: updatedAssignedClasses,
      class: getClassText(updatedAssignedClasses),
      subject: getSubjectText(updatedAssignedClasses),
    };

    const result = await updateTeacherAPI(teacher.id, updatedTeacher);

    if (result?.status >= 200 && result?.status < 300) {
      setTeacher(result.data);
      localStorage.setItem("teacherData", JSON.stringify(result.data));
      toast.success("Class details updated");
      return true;
    } else {
      toast.error("Failed to update class details");
      return false;
    }
  };

  const handleOpenEdit = (index, item) => {
    setEditIndex(index);
    setEditData({
      className: item.className,
      subject: item.subject,
    });
    setEditOpen(true);
    setActiveMenu(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateClass = async (e) => {
    e.preventDefault();

    if (!editData.className || !editData.subject) {
      toast.error("Please select class and subject");
      return;
    }

    const assignedClasses = normalizeAssignedClasses(teacher);

    const duplicate = assignedClasses.some(
      (item, index) =>
        index !== editIndex &&
        item.className === editData.className &&
        item.subject === editData.subject
    );

    if (duplicate) {
      toast.error("This class and subject already exists");
      return;
    }

    const updatedAssignedClasses = assignedClasses.map((item, index) =>
      index === editIndex
        ? {
            className: editData.className,
            subject: editData.subject,
          }
        : item
    );

    const success = await updateTeacherClasses(updatedAssignedClasses);

    if (success) {
      setEditOpen(false);
      setEditIndex(null);
    }
  };

  const handleDeleteClass = async (index) => {
    const assignedClasses = normalizeAssignedClasses(teacher);
    const selectedClass = assignedClasses[index];

    const confirmDelete = window.confirm(
      `Remove ${selectedClass.className} - ${selectedClass.subject}?`
    );

    if (!confirmDelete) return;

    const updatedAssignedClasses = assignedClasses.filter(
      (_, itemIndex) => itemIndex !== index
    );

    await updateTeacherClasses(updatedAssignedClasses);
    setActiveMenu(null);
  };

  if (!teacher) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <p className="text-slate-500 font-semibold">
          Loading assigned classes...
        </p>
      </div>
    );
  }

  const assignedClasses = normalizeAssignedClasses(teacher);
  const uniqueSubjects = getUniqueSubjects(assignedClasses);

  const totalStudents = assignedClasses.reduce(
    (total, _, index) => total + getStudentCount(index),
    0
  );

  const statsCards = [
    {
      title: "Total Classes",
      value: assignedClasses.length,
      desc: "assigned classes",
      icon: <HiOutlineBookOpen />,
      bg: "bg-blue-600",
      lightBg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Subjects Handled",
      value: uniqueSubjects.length,
      desc: "active subjects",
      icon: <LuUsersRound />,
      bg: "bg-purple-600",
      lightBg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "Total Students",
      value: totalStudents,
      desc: "across assigned classes",
      icon: <IoSchoolOutline />,
      bg: "bg-green-500",
      lightBg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Weekly Periods",
      value: assignedClasses.length * 5,
      desc: "estimated periods",
      icon: <IoCalendarOutline />,
      bg: "bg-orange-500",
      lightBg: "bg-orange-50",
      text: "text-orange-500",
      symbol: "≈",
    },
  ];

  const todaySchedule = assignedClasses.slice(0, 5).map((item, index) => {
    const times = [
      "08:00 AM - 08:45 AM",
      "08:45 AM - 09:30 AM",
      "09:45 AM - 10:30 AM",
      "11:00 AM - 11:45 AM",
      "12:00 PM - 12:45 PM",
    ];

    const statuses = [
      {
        status: "Completed",
        statusClass: "bg-green-100 text-green-600",
        border: "border-blue-500",
      },
      {
        status: "In Progress",
        statusClass: "bg-blue-100 text-blue-600",
        border: "border-purple-500",
      },
      {
        status: "Upcoming",
        statusClass: "bg-slate-100 text-slate-500",
        border: "border-green-500",
      },
    ];

    return {
      time: times[index] || "01:30 PM - 02:15 PM",
      className: `${item.className} - ${item.subject}`,
      topic: `${item.subject} class session`,
      room: index % 2 === 0 ? "Room 204" : "Lab 2",
      ...(statuses[index] || statuses[2]),
    };
  });

  const performanceSnapshot = assignedClasses.map((item, index) => ({
    className: item.className,
    subject: item.subject,
    avgScore: `${83 - (index % 5) * 2}%`,
    attendance: `${94 - (index % 5)}%`,
    classTests: `${16 - (index % 4)}/${18 - (index % 3)}`,
  }));

  const subjectsOverview = uniqueSubjects.map((subject, index) => {
    const subjectClasses = assignedClasses.filter(
      (item) => item.subject === subject
    );

    const students = subjectClasses.reduce(
      (total, _, classIndex) => total + getStudentCount(index + classIndex),
      0
    );

    const colors = [
      "bg-purple-600",
      "bg-green-500",
      "bg-orange-500",
      "bg-blue-600",
      "bg-cyan-500",
    ];

    const iconColors = [
      "bg-purple-100 text-purple-600",
      "bg-green-100 text-green-600",
      "bg-orange-100 text-orange-500",
      "bg-blue-100 text-blue-600",
      "bg-cyan-100 text-cyan-600",
    ];

    return {
      subject,
      sections: subjectClasses.length,
      students,
      progress: 88 - (index % 5) * 4,
      color: colors[index % colors.length],
      iconBg: iconColors[index % iconColors.length],
    };
  });

  const getClassTag = (className) => {
    return className.replace("Class ", "");
  };

  const colorClasses = [
    "bg-purple-100 text-purple-600",
    "bg-blue-100 text-blue-600",
    "bg-violet-100 text-violet-600",
    "bg-green-100 text-green-600",
    "bg-orange-100 text-orange-500",
    "bg-cyan-100 text-cyan-600",
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

      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-5 items-start">
        <div className="2xl:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-visible">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-lg font-black text-slate-900">
              My Assigned Classes
            </h2>

            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-blue-200 text-blue-600 text-sm font-bold hover:bg-blue-50 transition-colors">
              <IoCalendarOutline />
              View Class Timetable
            </button>
          </div>

          <div className="w-full">
            <div className="hidden lg:grid grid-cols-[2fr_1.1fr_1.2fr_1fr_60px] bg-slate-50 rounded-xl">
              <div className="px-4 py-3 text-xs font-bold text-slate-500">
                Class / Subject
              </div>
              <div className="px-4 py-3 text-xs font-bold text-slate-500">
                Students
              </div>
              <div className="px-4 py-3 text-xs font-bold text-slate-500">
                Teacher Role
              </div>
              <div className="px-4 py-3 text-xs font-bold text-slate-500">
                Status
              </div>
              <div className="px-4 py-3 text-xs font-bold text-slate-500 text-center">
                Action
              </div>
            </div>

            <div>
              {assignedClasses.length > 0 ? (
                assignedClasses.map((item, index) => (
                  <div
                    key={`${item.className}-${item.subject}-${index}`}
                    className="relative grid grid-cols-1 lg:grid-cols-[2fr_1.1fr_1.2fr_1fr_60px] lg:items-center border-b border-slate-100 last:border-b-0 py-4 lg:py-0"
                  >
                    <div className="px-0 lg:px-4 lg:py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${
                            colorClasses[index % colorClasses.length]
                          }`}
                        >
                          {getClassTag(item.className)}
                        </span>

                        <div>
                          <h3 className="font-black text-slate-900 text-sm">
                            {item.className}
                          </h3>
                          <p className="text-sm font-semibold text-slate-500 mt-1">
                            {item.subject}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-0 lg:px-4 mt-3 lg:mt-0">
                      <p className="lg:hidden text-xs font-bold text-slate-400 mb-1">
                        Students
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {getStudentCount(index)}
                      </p>
                    </div>

                    <div className="px-0 lg:px-4 mt-3 lg:mt-0">
                      <p className="lg:hidden text-xs font-bold text-slate-400 mb-1">
                        Teacher Role
                      </p>
                      <p className="text-sm font-semibold text-slate-600">
                        {index === 0 ? "Class Teacher" : "Subject Teacher"}
                      </p>
                    </div>

                    <div className="px-0 lg:px-4 mt-3 lg:mt-0">
                      <p className="lg:hidden text-xs font-bold text-slate-400 mb-1">
                        Status
                      </p>
                      <span className="inline-flex px-3 py-1 rounded-lg bg-green-100 text-green-600 text-xs font-bold">
                        Active
                      </span>
                    </div>

                    <div className="absolute right-0 top-4 lg:static lg:px-4 lg:py-4 text-center">
                      <button
                        onClick={() =>
                          setActiveMenu(activeMenu === index ? null : index)
                        }
                        className="w-9 h-9 rounded-lg border border-slate-100 text-slate-500 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center ml-auto lg:mx-auto"
                      >
                        <IoEllipsisVertical />
                      </button>

                      {activeMenu === index && (
                        <div className="absolute right-0 lg:right-4 top-12 w-36 bg-white border border-slate-100 rounded-xl shadow-xl z-50 p-2">
                          <button
                            onClick={() => handleOpenEdit(index, item)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <IoPencilOutline />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteClass(index)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50"
                          >
                            <IoTrashOutline />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm text-slate-400">
                  No classes assigned yet.
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
            <p className="text-sm text-slate-500">
              Showing {assignedClasses.length > 0 ? 1 : 0} to{" "}
              {assignedClasses.length} of {assignedClasses.length} classes
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

        <div className="2xl:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              Today's Class Schedule
            </h2>

            <button className="text-sm text-blue-600 font-bold">
              View Full Timetable
            </button>
          </div>

          <div className="space-y-4">
            {todaySchedule.length > 0 ? (
              todaySchedule.map((item, index) => (
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
              ))
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">
                No schedule available.
              </p>
            )}
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

          <div className="flex-1 overflow-x-auto">
            <table className="w-full min-w-[520px] table-fixed">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-xs font-bold text-slate-500">
                    Class
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500">
                    Subject
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
                {performanceSnapshot.length > 0 ? (
                  performanceSnapshot.map((item, index) => (
                    <tr
                      key={`${item.className}-${item.subject}-${index}`}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-4 py-4 text-sm font-bold text-slate-900">
                        {item.className}
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                        {item.subject}
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center text-sm text-slate-400"
                    >
                      No performance data available.
                    </td>
                  </tr>
                )}
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

          <div className="flex-1 overflow-x-auto">
            <table className="w-full min-w-[520px] table-fixed">
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
                {subjectsOverview.length > 0 ? (
                  subjectsOverview.map((item, index) => (
                    <tr
                      key={`${item.subject}-${index}`}
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-8 text-center text-sm text-slate-400"
                    >
                      No subject overview available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button className="mt-auto pt-5 text-sm text-blue-600 font-bold text-left">
            Manage Subjects & Sections →
          </button>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-slate-900">
                Edit Class & Subject
              </h2>

              <button
                onClick={() => setEditOpen(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <form onSubmit={handleUpdateClass} className="space-y-4">
              <select
                name="className"
                value={editData.className}
                onChange={handleEditChange}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
              >
                <option value="">Select Class</option>
                {classOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                name="subject"
                value={editData.subject}
                onChange={handleEditChange}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
              >
                <option value="">Select Subject</option>
                {subjectOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
              >
                Update Class
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClasses;