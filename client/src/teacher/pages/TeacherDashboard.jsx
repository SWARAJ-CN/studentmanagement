import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { FaRegCalendarCheck, FaClipboardList } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import {
  IoMegaphoneOutline,
  IoDocumentOutline,
  IoCalendarOutline,
} from "react-icons/io5";

import {
  getTeacherAPI,
  getStudentAPI,
  getAttendanceAPI,
  getTimetableAPI,
  getResultAPI,
  getExamAPI,
  getNoticeAPI,
} from "../../services/allAPI";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const [teacherData, setTeacherData] = useState(null);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);

  const [studentsList, setStudentsList] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [timetableList, setTimetableList] = useState([]);
  const [resultsList, setResultsList] = useState([]);
  const [examsList, setExamsList] = useState([]);
  const [noticesList, setNoticesList] = useState([]);

  const normalizeClassName = (value = "") => {
    const cleanValue = String(value).trim().toUpperCase().replace(/\s+/g, "");

    if (!cleanValue) return "";

    if (cleanValue.startsWith("CLASS")) return cleanValue;

    return `CLASS${cleanValue}`;
  };

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

  const normalizeAssignedSubjects = (teacher) => {
    if (!teacher) return [];

    if (Array.isArray(teacher.assignedClasses)) {
      return [
        ...new Set(
          teacher.assignedClasses
            .map((item) => {
              if (typeof item === "string") return teacher.subject || "";
              return item.subject || teacher.subject || "";
            })
            .filter(Boolean)
        ),
      ];
    }

    if (teacher.subject) {
      return teacher.subject
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  const normalizeTeacher = (teacher) => {
    if (!teacher) return null;

    return {
      id: teacher.id || "",
      teacherId: teacher.teacherId || teacher.teacher_id || "",
      name: teacher.name || teacher.teacherName || teacher.teacher_name || "Teacher",
      department: teacher.department || "",
      subject: teacher.subject || "",
      assignedClasses: normalizeAssignedClasses(teacher),
      assignedSubjects: normalizeAssignedSubjects(teacher),
    };
  };

  const normalizeStudent = (student) => {
    return {
      id: student.id,
      studentId: student.studentId || student.student_id || "",
      name: student.name || student.student_name || "",
      className: student.className || student.class || student.student_class || "",
      rollNo: student.rollNo || student.student_rollno || "",
      status: student.status || "Active",
    };
  };

  const normalizeAttendance = (attendance) => {
    return {
      id: attendance.id,
      studentDbId: attendance.studentDbId || "",
      studentId: attendance.studentId || attendance.student_id || "",
      studentName: attendance.studentName || attendance.student_name || "",
      className: attendance.className || attendance.class || "",
      date: attendance.date || "",
      status: attendance.status || "Not Marked",
      markedBy: attendance.markedBy || "",
      createdAt: attendance.createdAt || "",
      updatedAt: attendance.updatedAt || "",
    };
  };

  const normalizePeriod = (period) => {
    return {
      id: period.id,
      teacherId: period.teacherId || period.teacher_id || "",
      teacherName: period.teacherName || period.teacher_name || "",
      day: period.day || "",
      startTime: period.startTime || period.start_time || "",
      endTime: period.endTime || period.end_time || "",
      className: period.className || period.class || "",
      subject: period.subject || "",
      room: period.room || "",
      periodType: period.periodType || period.period_type || "Class",
      status: period.status || "Active",
    };
  };

  const normalizeResult = (result) => {
    return {
      id: result.id,
      studentDbId: result.studentDbId || "",
      studentId: result.studentId || result.student_id || "",
      studentName: result.studentName || result.student_name || "",
      className: result.className || result.class || "",
      examId: result.examId || result.exam_id || "",
      examTitle: result.examTitle || result.exam || result.examName || "",
      subject: result.subject || "",
      obtainedMarks: Number(result.obtainedMarks || result.obtained_marks || 0),
      maxMarks: Number(result.maxMarks || result.max_marks || 0),
      percentage: Number(result.percentage || 0),
      grade: result.grade || "",
      status: result.status || "Published",
      publishedDate: result.publishedDate || result.published_date || "",
      createdAt: result.createdAt || "",
      updatedAt: result.updatedAt || "",
    };
  };

  const normalizeExam = (exam) => {
    return {
      id: exam.id,
      examId: exam.examId || exam.exam_id || "",
      title: exam.title || exam.examTitle || exam.name || "",
      className: exam.className || exam.class || "",
      subject: exam.subject || "",
      examType: exam.examType || exam.type || "",
      date: exam.date || "",
      status: exam.status || "Upcoming",
      maxMarks: exam.maxMarks || exam.max_marks || "",
    };
  };

  const normalizeNotice = (notice) => {
    return {
      id: notice.id,
      title: notice.title || "",
      description: notice.description || notice.content || "",
      category: notice.category || "General",
      audience: notice.audience || "All",
      status: notice.status || "Active",
      date: notice.date || notice.createdAt || "",
      createdAt: notice.createdAt || "",
      updatedAt: notice.updatedAt || "",
    };
  };

  const getLoggedTeacher = async () => {
    const loggedTeacherId = localStorage.getItem("teacherId");
    const storedTeacher = localStorage.getItem("teacherData");

    if (storedTeacher) {
      try {
        const parsedTeacher = JSON.parse(storedTeacher);
        const normalizedTeacher = normalizeTeacher(parsedTeacher);

        setTeacherData(normalizedTeacher);
        setTeacherClasses(normalizedTeacher.assignedClasses);
        setTeacherSubjects(normalizedTeacher.assignedSubjects);
      } catch (error) {
        console.log(error);
      }
    }

    const result = await getTeacherAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const teachers = Array.isArray(result.data) ? result.data : [];

      const foundTeacher = teachers.find((teacher) => {
        const normalizedTeacher = normalizeTeacher(teacher);

        return (
          String(normalizedTeacher.teacherId) === String(loggedTeacherId) ||
          String(normalizedTeacher.id) === String(loggedTeacherId)
        );
      });

      if (foundTeacher) {
        const normalizedTeacher = normalizeTeacher(foundTeacher);

        setTeacherData(normalizedTeacher);
        setTeacherClasses(normalizedTeacher.assignedClasses);
        setTeacherSubjects(normalizedTeacher.assignedSubjects);

        localStorage.setItem("teacherData", JSON.stringify(foundTeacher));
        localStorage.setItem("teacherId", normalizedTeacher.teacherId);
      }
    }
  };

  const getAllDashboardData = async () => {
    const studentResult = await getStudentAPI();
    const attendanceResult = await getAttendanceAPI();
    const timetableResult = await getTimetableAPI();
    const resultResult = await getResultAPI();
    const examResult = await getExamAPI();
    const noticeResult = await getNoticeAPI();

    if (studentResult?.status >= 200 && studentResult?.status < 300) {
      setStudentsList(
        Array.isArray(studentResult.data) ? studentResult.data : []
      );
    }

    if (attendanceResult?.status >= 200 && attendanceResult?.status < 300) {
      setAttendanceList(
        Array.isArray(attendanceResult.data) ? attendanceResult.data : []
      );
    }

    if (timetableResult?.status >= 200 && timetableResult?.status < 300) {
      setTimetableList(
        Array.isArray(timetableResult.data) ? timetableResult.data : []
      );
    }

    if (resultResult?.status >= 200 && resultResult?.status < 300) {
      setResultsList(Array.isArray(resultResult.data) ? resultResult.data : []);
    }

    if (examResult?.status >= 200 && examResult?.status < 300) {
      setExamsList(Array.isArray(examResult.data) ? examResult.data : []);
    }

    if (noticeResult?.status >= 200 && noticeResult?.status < 300) {
      setNoticesList(Array.isArray(noticeResult.data) ? noticeResult.data : []);
    }
  };

  useEffect(() => {
    getLoggedTeacher();
    getAllDashboardData();
  }, []);

  const classMatchesTeacher = (className) => {
    if (teacherClasses.length === 0) return true;

    return teacherClasses.some(
      (item) => normalizeClassName(item) === normalizeClassName(className)
    );
  };

  const subjectMatchesTeacher = (subject) => {
    if (teacherSubjects.length === 0) return true;

    return teacherSubjects.some(
      (item) => String(item).toLowerCase() === String(subject).toLowerCase()
    );
  };

  const teacherStudents = useMemo(() => {
    return studentsList
      .map((student) => normalizeStudent(student))
      .filter(
        (student) =>
          student.status !== "Inactive" && classMatchesTeacher(student.className)
      );
  }, [studentsList, teacherClasses]);

  const teacherAttendance = useMemo(() => {
    return attendanceList
      .map((attendance) => normalizeAttendance(attendance))
      .filter((attendance) => classMatchesTeacher(attendance.className));
  }, [attendanceList, teacherClasses]);

  const teacherTimetable = useMemo(() => {
    const loggedTeacherId = localStorage.getItem("teacherId");

    return timetableList
      .map((period) => normalizePeriod(period))
      .filter((period) => {
        if (period.status === "Inactive") return false;

        if (period.teacherId) {
          return String(period.teacherId) === String(loggedTeacherId);
        }

        return classMatchesTeacher(period.className);
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [timetableList, teacherClasses]);

  const teacherResults = useMemo(() => {
    return resultsList
      .map((result) => normalizeResult(result))
      .filter(
        (result) =>
          classMatchesTeacher(result.className) &&
          subjectMatchesTeacher(result.subject)
      );
  }, [resultsList, teacherClasses, teacherSubjects]);

  const teacherExams = useMemo(() => {
    return examsList
      .map((exam) => normalizeExam(exam))
      .filter(
        (exam) =>
          exam.status !== "Draft" &&
          classMatchesTeacher(exam.className) &&
          subjectMatchesTeacher(exam.subject)
      );
  }, [examsList, teacherClasses, teacherSubjects]);

  const teacherNotices = useMemo(() => {
    return noticesList
      .map((notice) => normalizeNotice(notice))
      .filter((notice) => {
        if (notice.status !== "Active") return false;

        if (notice.audience === "All") return true;
        if (notice.audience === "Teachers") return true;

        return classMatchesTeacher(notice.audience);
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt || b.date) -
          new Date(a.updatedAt || a.createdAt || a.date)
      );
  }, [noticesList, teacherClasses]);

  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const todaysTimetable = teacherTimetable.filter(
    (period) => period.day === todayName
  );

  const presentCount = teacherAttendance.filter(
    (item) => item.status === "Present"
  ).length;

  const lateCount = teacherAttendance.filter(
    (item) => item.status === "Late"
  ).length;

  const absentCount = teacherAttendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const markedCount = presentCount + lateCount + absentCount;

  const attendancePercentage =
    markedCount > 0 ? (((presentCount + lateCount) / markedCount) * 100).toFixed(1) : "0.0";

  const attendanceData = [
    {
      name: "Present",
      value: presentCount,
      percentage:
        markedCount > 0 ? `${((presentCount / markedCount) * 100).toFixed(1)}%` : "0.0%",
      color: "#22c55e",
    },
    {
      name: "Late",
      value: lateCount,
      percentage:
        markedCount > 0 ? `${((lateCount / markedCount) * 100).toFixed(1)}%` : "0.0%",
      color: "#f59e0b",
    },
    {
      name: "Absent",
      value: absentCount,
      percentage:
        markedCount > 0 ? `${((absentCount / markedCount) * 100).toFixed(1)}%` : "0.0%",
      color: "#ef4444",
    },
  ];

  const pendingEvaluations = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    let count = 0;

    teacherExams.forEach((exam) => {
      const examDate = new Date(exam.date);

      const examCompleted =
        exam.status === "Completed" ||
        (!isNaN(examDate.getTime()) && examDate <= today);

      if (!examCompleted) return;

      const examStudents = teacherStudents.filter(
        (student) =>
          normalizeClassName(student.className) ===
          normalizeClassName(exam.className)
      );

      examStudents.forEach((student) => {
        const hasResult = teacherResults.some(
          (result) =>
            String(result.examId) === String(exam.examId) &&
            (String(result.studentId) === String(student.studentId) ||
              String(result.studentDbId) === String(student.id))
        );

        if (!hasResult) count += 1;
      });
    });

    return count;
  }, [teacherExams, teacherStudents, teacherResults]);

  const performanceData = useMemo(() => {
    const now = new Date();

    const months = Array.from({ length: 5 }).map((_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (4 - index), 1);

      return {
        label: date.toLocaleDateString("en-US", { month: "short" }),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    });

    const allResults = resultsList.map((result) => normalizeResult(result));

    return months.map((monthItem) => {
      const teacherMonthResults = teacherResults.filter((result) => {
        const date = new Date(result.publishedDate || result.createdAt);

        return (
          !isNaN(date.getTime()) &&
          date.getMonth() === monthItem.month &&
          date.getFullYear() === monthItem.year
        );
      });

      const schoolMonthResults = allResults.filter((result) => {
        const date = new Date(result.publishedDate || result.createdAt);

        return (
          !isNaN(date.getTime()) &&
          date.getMonth() === monthItem.month &&
          date.getFullYear() === monthItem.year
        );
      });

      const teacherAverage =
        teacherMonthResults.length > 0
          ? teacherMonthResults.reduce(
              (total, result) => total + Number(result.percentage || 0),
              0
            ) / teacherMonthResults.length
          : 0;

      const schoolAverage =
        schoolMonthResults.length > 0
          ? schoolMonthResults.reduce(
              (total, result) => total + Number(result.percentage || 0),
              0
            ) / schoolMonthResults.length
          : 0;

      return {
        month: monthItem.label,
        yourClass: Number(teacherAverage.toFixed(1)),
        schoolAvg: Number(schoolAverage.toFixed(1)),
      };
    });
  }, [teacherResults, resultsList]);

  const classOverview = useMemo(() => {
    const classes =
      teacherClasses.length > 0
        ? teacherClasses
        : [
            ...new Set(
              teacherStudents.map((student) => student.className).filter(Boolean)
            ),
          ];

    return classes.map((className) => {
      const classStudents = teacherStudents.filter(
        (student) =>
          normalizeClassName(student.className) === normalizeClassName(className)
      );

      const classAttendance = teacherAttendance.filter(
        (attendance) =>
          normalizeClassName(attendance.className) ===
          normalizeClassName(className)
      );

      const classPresent = classAttendance.filter(
        (attendance) =>
          attendance.status === "Present" || attendance.status === "Late"
      ).length;

      const attendancePercentage =
        classAttendance.length > 0
          ? ((classPresent / classAttendance.length) * 100).toFixed(0)
          : "0";

      const classResults = teacherResults.filter(
        (result) =>
          normalizeClassName(result.className) === normalizeClassName(className)
      );

      const performancePercentage =
        classResults.length > 0
          ? (
              classResults.reduce(
                (total, result) => total + Number(result.percentage || 0),
                0
              ) / classResults.length
            ).toFixed(0)
          : "0";

      const assignedSubject =
        teacherData?.assignedSubjects?.[0] ||
        teacherSubjects[0] ||
        teacherData?.subject ||
        "Subject";

      return {
        className,
        subject: assignedSubject,
        students: classStudents.length,
        attendance: `${attendancePercentage}%`,
        performance: `${performancePercentage}%`,
      };
    });
  }, [
    teacherClasses,
    teacherStudents,
    teacherAttendance,
    teacherResults,
    teacherSubjects,
    teacherData,
  ]);

  const studentActivities = useMemo(() => {
    const attendanceActivities = teacherAttendance
      .slice(-2)
      .reverse()
      .map((attendance) => ({
        icon: <FaRegCalendarCheck />,
        bg: "bg-green-100",
        color: "text-green-600",
        title: `Attendance marked for ${attendance.className}`,
        desc: `${attendance.studentName || "Student"} marked as ${attendance.status}.`,
        time: attendance.date || "Recently",
      }));

    const resultActivities = teacherResults
      .slice(-2)
      .reverse()
      .map((result) => ({
        icon: <MdBarChart />,
        bg: "bg-purple-100",
        color: "text-purple-600",
        title: `${result.studentName || "Student"} scored ${result.obtainedMarks}/${result.maxMarks}`,
        desc: `${result.examTitle || "Exam"} result updated.`,
        time: result.publishedDate || "Recently",
      }));

    const noticeActivities = teacherNotices.slice(0, 2).map((notice) => ({
      icon: <IoMegaphoneOutline />,
      bg: "bg-orange-100",
      color: "text-orange-500",
      title: notice.title,
      desc: notice.description,
      time: notice.date || "Recently",
    }));

    const activities = [
      ...attendanceActivities,
      ...resultActivities,
      ...noticeActivities,
    ];

    if (activities.length === 0) {
      return [
        {
          icon: <IoDocumentOutline />,
          bg: "bg-slate-100",
          color: "text-slate-500",
          title: "No recent activity",
          desc: "Student activity will appear here after attendance, results or notices are added.",
          time: "Now",
        },
      ];
    }

    return activities.slice(0, 5);
  }, [teacherAttendance, teacherResults, teacherNotices]);

  const statsCards = [
    {
      title: "Total Classes",
      value: teacherClasses.length,
      desc: "assigned classes",
      icon: <HiOutlineBookOpen />,
      bg: "bg-blue-600",
      lightBg: "bg-blue-50",
      text: "text-blue-600",
      route: "/teacher/classes",
    },
    {
      title: "Total Students",
      value: teacherStudents.length,
      desc: "students assigned",
      icon: <LuUsersRound />,
      bg: "bg-purple-600",
      lightBg: "bg-purple-50",
      text: "text-purple-600",
      route: "/teacher/students",
    },
    {
      title: "Attendance Submitted",
      value: `${attendancePercentage}%`,
      desc: `${markedCount} attendance records`,
      icon: <FaRegCalendarCheck />,
      bg: "bg-green-500",
      lightBg: "bg-green-50",
      text: "text-green-600",
      route: "/teacher/attendance",
    },
    {
      title: "Pending Evaluations",
      value: pendingEvaluations,
      desc: "marks to update",
      icon: <FaClipboardList />,
      bg: "bg-orange-500",
      lightBg: "bg-orange-50",
      text: "text-orange-500",
      route: "/teacher/results",
    },
  ];

  const getTimetableStatus = (period) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    if (period.day !== todayName) {
      return {
        text: "Upcoming",
        color: "bg-slate-100 text-slate-500",
      };
    }

    if (currentTime > period.endTime) {
      return {
        text: "Completed",
        color: "bg-green-100 text-green-600",
      };
    }

    if (currentTime >= period.startTime && currentTime <= period.endTime) {
      return {
        text: "In Progress",
        color: "bg-blue-100 text-blue-600",
      };
    }

    return {
      text: "Upcoming",
      color: "bg-slate-100 text-slate-500",
    };
  };

  return (
    <div className="w-full space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Teacher Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, {teacherData?.name || "Teacher"}! Here&apos;s what&apos;s
            happening in your classes today.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <IoCalendarOutline className="text-slate-400" />
          <span>{todayDate}</span>
          <span>|</span>
          <span>{todayName}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsCards.map((card, index) => (
          <button
            key={index}
            onClick={() => navigate(card.route)}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between text-left hover:shadow-md transition-all"
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
          </button>
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
                  domain={[0, 100]}
                  ticks={[0, 50, 100]}
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
              <option>All Records</option>
              <option>This Month</option>
              <option>Today</option>
            </select>
          </div>

          <div className="h-[270px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData.filter((item) => item.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={78}
                  outerRadius={115}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {attendanceData
                    .filter((item) => item.value > 0)
                    .map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <h3 className="text-3xl font-black text-slate-900">
                {attendancePercentage}%
              </h3>
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
              Today&apos;s Timetable
            </h2>

            <button
              onClick={() => navigate("/teacher/timetable")}
              className="text-sm text-blue-600 font-bold"
            >
              View Full
            </button>
          </div>

          <div className="space-y-3">
            {todaysTimetable.length > 0 ? (
              todaysTimetable.slice(0, 5).map((item, index) => {
                const status = getTimetableStatus(item);

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[36px_1fr] gap-3 items-center border-b border-slate-100 pb-3 last:border-b-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.startTime} - {item.endTime}
                      </p>

                      <div className="flex items-start justify-between gap-2 mt-1">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-5">
                            {item.className} - {item.subject || item.periodType}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {item.room || "Not added"}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${status.color}`}
                        >
                          {status.text}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">
                No classes scheduled today.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              My Class Overview
            </h2>

            <button
              onClick={() => navigate("/teacher/classes")}
              className="text-sm text-blue-600 font-bold"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] table-fixed">
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
                {classOverview.length > 0 ? (
                  classOverview.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-4 py-4 font-bold text-slate-900">
                        {item.className}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {item.subject}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {item.students}
                      </td>
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-10 text-center text-sm text-slate-400"
                    >
                      No assigned class data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              Recent Student Activity
            </h2>

            <button
              onClick={() => navigate("/teacher/students")}
              className="text-sm text-blue-600 font-bold"
            >
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
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                    {item.desc}
                  </p>
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