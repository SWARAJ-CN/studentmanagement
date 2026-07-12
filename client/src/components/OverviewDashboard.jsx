import React, { useEffect, useMemo, useState } from "react";
import { PieChart, LineChart } from "@mui/x-charts";

import {
  CalendarCheck,
  GraduationCap,
  FileText,
  Calendar,
  Clock,
  TrendingUp,
  Info,
  Megaphone,
  Trophy,
  FlaskConical,
  BookOpen,
  BarChart2,
  ChevronRight,
  User,
  PartyPopper,
  CalendarDays,
} from "lucide-react";

import {
  getAttendanceAPI,
  getExamAPI,
  getResultAPI,
  getNoticeAPI,
  getTimetableAPI,
} from "../services/allAPI";

const OverviewDashboard = ({ studentData, onNavigate }) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [examsList, setExamsList] = useState([]);
  const [resultsList, setResultsList] = useState([]);
  const [noticesList, setNoticesList] = useState([]);
  const [timetableList, setTimetableList] = useState([]);

  const normalizeClassName = (value = "") => {
    const cleanValue = String(value).trim().toUpperCase().replace(/\s+/g, "");

    if (!cleanValue) return "";

    if (cleanValue.startsWith("CLASS")) return cleanValue;

    return `CLASS${cleanValue}`;
  };

  const normalizeStudent = (student) => {
    if (!student) return null;

    return {
      id: student.id || "",
      studentId:
        student.studentId ||
        student.student_id ||
        student.admissionNo ||
        student.idNumber ||
        "",
      name:
        student.name ||
        student.studentName ||
        student.student_name ||
        "Student",
      className:
        student.className ||
        student.class ||
        student.student_class ||
        student.classSection ||
        "",
      rollNo: student.rollNo || student.roll || student.student_rollno || "",
    };
  };

  const getLoggedStudent = () => {
    if (studentData) return normalizeStudent(studentData);

    const storedStudent = localStorage.getItem("studentData");

    if (storedStudent) {
      try {
        return normalizeStudent(JSON.parse(storedStudent));
      } catch (error) {
        console.log(error);
      }
    }

    return {
      id: localStorage.getItem("studentDbId") || "",
      studentId: localStorage.getItem("studentId") || "",
      name: "Student",
      className: localStorage.getItem("studentClass") || "",
      rollNo: "",
    };
  };

  const student = getLoggedStudent();

  const normalizeAttendance = (attendance) => {
    return {
      id: attendance.id,
      studentDbId: attendance.studentDbId || "",
      studentId: attendance.studentId || attendance.student_id || "",
      studentName: attendance.studentName || attendance.student_name || "",
      className: attendance.className || attendance.class || "",
      date: attendance.date || "",
      day: attendance.day || "",
      status: attendance.status || "Not Marked",
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
      term: exam.term || "",
      date: exam.date || "",
      startTime: exam.startTime || exam.time || "",
      endTime: exam.endTime || "",
      maxMarks: exam.maxMarks || exam.max_marks || "",
      status: exam.status || "Upcoming",
    };
  };

  const normalizeResult = (result) => {
    return {
      id: result.id,
      resultId: result.resultId || result.result_id || "",
      studentDbId: result.studentDbId || "",
      studentId: result.studentId || result.student_id || "",
      studentName: result.studentName || result.student_name || "",
      className: result.className || result.class || "",
      examTitle: result.examTitle || result.exam || result.examName || "",
      subject: result.subject || "",
      obtainedMarks: Number(result.obtainedMarks || result.obtained_marks || 0),
      maxMarks: Number(result.maxMarks || result.max_marks || 0),
      percentage: Number(result.percentage || 0),
      grade: result.grade || "",
      status: result.status || "Published",
      publishedDate: result.publishedDate || result.published_date || "",
    };
  };

  const normalizeNotice = (notice) => {
    return {
      id: notice.id,
      noticeId: notice.noticeId || notice.notice_id || "",
      title: notice.title || "",
      description: notice.description || notice.content || "",
      category: notice.category || "General",
      audience: notice.audience || "All",
      status: notice.status || "Active",
      date: notice.date || notice.createdDate || notice.createdAt || "",
      createdBy: notice.createdBy || notice.author || "Principal",
      createdAt: notice.createdAt || "",
      updatedAt: notice.updatedAt || "",
      isImportant:
        notice.isImportant ||
        notice.category === "Urgent" ||
        notice.priority === "High",
    };
  };

  const normalizePeriod = (period) => {
    return {
      id: period.id,
      timetableId: period.timetableId || period.timetable_id || "",
      day: period.day || "",
      startTime: period.startTime || period.start_time || "",
      endTime: period.endTime || period.end_time || "",
      className: period.className || period.class || "",
      subject: period.subject || "",
      teacherName: period.teacherName || period.teacher_name || "",
      room: period.room || "",
      periodType: period.periodType || period.period_type || "Class",
      status: period.status || "Active",
    };
  };

  const getAllDashboardData = async () => {
    const attendanceResult = await getAttendanceAPI();
    const examResult = await getExamAPI();
    const resultResult = await getResultAPI();
    const noticeResult = await getNoticeAPI();
    const timetableResult = await getTimetableAPI();

    if (attendanceResult?.status >= 200 && attendanceResult?.status < 300) {
      setAttendanceList(
        Array.isArray(attendanceResult.data) ? attendanceResult.data : []
      );
    }

    if (examResult?.status >= 200 && examResult?.status < 300) {
      setExamsList(Array.isArray(examResult.data) ? examResult.data : []);
    }

    if (resultResult?.status >= 200 && resultResult?.status < 300) {
      setResultsList(Array.isArray(resultResult.data) ? resultResult.data : []);
    }

    if (noticeResult?.status >= 200 && noticeResult?.status < 300) {
      setNoticesList(Array.isArray(noticeResult.data) ? noticeResult.data : []);
    }

    if (timetableResult?.status >= 200 && timetableResult?.status < 300) {
      setTimetableList(
        Array.isArray(timetableResult.data) ? timetableResult.data : []
      );
    }
  };

  useEffect(() => {
    getAllDashboardData();
  }, []);

  const studentAttendance = useMemo(() => {
    return attendanceList
      .map((attendance) => normalizeAttendance(attendance))
      .filter(
        (attendance) =>
          String(attendance.studentDbId) === String(student.id) ||
          String(attendance.studentId) === String(student.studentId)
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [attendanceList, student.id, student.studentId]);

  const studentExams = useMemo(() => {
    return examsList
      .map((exam) => normalizeExam(exam))
      .filter(
        (exam) =>
          exam.status !== "Draft" &&
          normalizeClassName(exam.className) ===
            normalizeClassName(student.className)
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [examsList, student.className]);

  const studentResults = useMemo(() => {
    return resultsList
      .map((result) => normalizeResult(result))
      .filter(
        (result) =>
          result.status === "Published" &&
          (String(result.studentDbId) === String(student.id) ||
            String(result.studentId) === String(student.studentId))
      )
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  }, [resultsList, student.id, student.studentId]);

  const studentNotices = useMemo(() => {
    return noticesList
      .map((notice) => normalizeNotice(notice))
      .filter((notice) => {
        if (notice.status !== "Active") return false;

        const audience = String(notice.audience || "").trim().toLowerCase();

        if (audience === "all") return true;
        if (audience === "students") return true;
        if (audience === "student") return true;

        return (
          normalizeClassName(notice.audience) ===
          normalizeClassName(student.className)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt || b.date) -
          new Date(a.updatedAt || a.createdAt || a.date)
      );
  }, [noticesList, student.className]);

  const studentTimetable = useMemo(() => {
    return timetableList
      .map((period) => normalizePeriod(period))
      .filter(
        (period) =>
          period.status !== "Inactive" &&
          normalizeClassName(period.className) ===
            normalizeClassName(student.className)
      )
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [timetableList, student.className]);

  const presentCount = studentAttendance.filter(
    (attendance) =>
      attendance.status === "Present" || attendance.status === "Late"
  ).length;

  const attendancePercentage =
    studentAttendance.length > 0
      ? ((presentCount / studentAttendance.length) * 100).toFixed(1)
      : "0.0";

  const totalObtainedMarks = studentResults.reduce(
    (total, result) => total + Number(result.obtainedMarks || 0),
    0
  );

  const totalMaxMarks = studentResults.reduce(
    (total, result) => total + Number(result.maxMarks || 0),
    0
  );

  const overallPercentage =
    totalMaxMarks > 0
      ? ((totalObtainedMarks / totalMaxMarks) * 100).toFixed(1)
      : "0.0";

  const currentGpa = totalMaxMarks > 0 ? (overallPercentage / 25).toFixed(2) : "0.00";

  const calculateGrade = (percentage) => {
    const value = Number(percentage);

    if (value >= 90) return "A+";
    if (value >= 75) return "A";
    if (value >= 60) return "B";
    if (value >= 45) return "C";
    return "D";
  };

  const overallGrade =
    totalMaxMarks > 0 ? calculateGrade(overallPercentage) : "N/A";

  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "short",
  });

  const todaySchedule = studentTimetable.filter(
    (period) => period.day === todayName
  );

  const upcomingExams = studentExams.filter((exam) => {
    if (exam.status === "Completed") return false;

    const examDate = new Date(exam.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(examDate.getTime())) return exam.status === "Upcoming";

    return examDate >= today;
  });

  const attendanceTrendPoints = useMemo(() => {
    if (studentAttendance.length === 0) {
      return [{ date: "No Data", percentage: 0 }];
    }

    let present = 0;

    return studentAttendance
      .map((record, index) => {
        if (record.status === "Present" || record.status === "Late") {
          present += 1;
        }

        const percentage = ((present / (index + 1)) * 100).toFixed(1);

        const date = new Date(record.date);

        return {
          date: isNaN(date.getTime())
            ? record.date
            : date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              }),
          percentage: Number(percentage),
        };
      })
      .slice(-6);
  }, [studentAttendance]);

  const xLabels = attendanceTrendPoints.map((point) => point.date);
  const lineSeriesData = attendanceTrendPoints.map((point) => point.percentage);

  const attendanceImprovement =
    attendanceTrendPoints.length > 1
      ? (
          attendanceTrendPoints[attendanceTrendPoints.length - 1].percentage -
          attendanceTrendPoints[0].percentage
        ).toFixed(1)
      : "0.0";

  const subjectPerformance = useMemo(() => {
    const grouped = {};

    studentResults.forEach((result) => {
      if (!result.subject) return;

      if (!grouped[result.subject]) {
        grouped[result.subject] = {
          subject: result.subject,
          obtained: 0,
          max: 0,
        };
      }

      grouped[result.subject].obtained += Number(result.obtainedMarks || 0);
      grouped[result.subject].max += Number(result.maxMarks || 0);
    });

    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#38BDF8", "#818CF8"];

    return Object.values(grouped).map((item, index) => {
      const percentage =
        item.max > 0 ? ((item.obtained / item.max) * 100).toFixed(1) : "0.0";

      return {
        id: index,
        value: Number((Number(percentage) / 25).toFixed(1)),
        label: item.subject,
        color: colors[index % colors.length],
        grade: calculateGrade(percentage),
        percentage,
      };
    });
  }, [studentResults]);

  const pieData =
    subjectPerformance.length > 0
      ? subjectPerformance
      : [
          {
            id: 0,
            value: 1,
            label: "No Results",
            color: "#CBD5E1",
            grade: "N/A",
            percentage: "0.0",
          },
        ];

  const latestNotices = studentNotices.slice(0, 3);
  const latestResults = studentResults.slice(0, 3);

  const getNoticeIcon = (category) => {
    if (category === "Event") return <PartyPopper size={14} />;
    if (category === "Holiday") return <CalendarDays size={14} />;
    if (category === "Exam") return <FileText size={14} />;
    if (category === "Academics") return <FlaskConical size={14} />;
    return <Megaphone size={14} />;
  };

  const getNoticeIconStyle = (category) => {
    if (category === "Event") return "bg-emerald-50 text-emerald-600";
    if (category === "Holiday") return "bg-amber-50 text-amber-600";
    if (category === "Exam") return "bg-blue-50 text-blue-600";
    if (category === "Academics") return "bg-purple-50 text-purple-600";
    if (category === "Urgent") return "bg-red-50 text-red-600";
    return "bg-slate-50 text-slate-600";
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

  const handleNavigate = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const metrics = [
    {
      title: "Attendance Percentage",
      value: `${attendancePercentage}%`,
      label: `${presentCount}/${studentAttendance.length} days present`,
      icon: <CalendarCheck size={20} />,
      bg: "bg-blue-50 text-blue-600",
      action: "attendance",
      extra: (
        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
          <TrendingUp size={10} /> {attendanceImprovement >= 0 ? "↑" : "↓"}{" "}
          {Math.abs(attendanceImprovement)}%
          <span className="text-slate-400 font-medium"> trend</span>
        </span>
      ),
    },
    {
      title: "Current GPA",
      value: currentGpa,
      label: "/ 4.00",
      icon: <GraduationCap size={20} />,
      bg: "bg-emerald-50 text-emerald-600",
      action: "results",
      extra: (
        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Grade: {overallGrade}
        </span>
      ),
    },
    {
      title: "Active Notices",
      value: studentNotices.length,
      label: "announcements",
      icon: <Megaphone size={20} />,
      bg: "bg-amber-50 text-amber-600",
      action: "notice",
      extra: (
        <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          From Principal
        </span>
      ),
    },
    {
      title: "Upcoming Exams",
      value: upcomingExams.length,
      label:
        upcomingExams.length > 0
          ? `Next: ${upcomingExams[0].subject}`
          : "No exams",
      icon: <Calendar size={20} />,
      bg: "bg-purple-50 text-purple-600",
      action: "exams",
      extra: (
        <span className="text-[10px] text-purple-600 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          Scheduled exams
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn text-left pb-8 select-none">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Student Dashboard
        </h1>
        <p className="text-xs text-slate-400 font-semibold">
          Welcome back, {student.name || "Student"}! 👏 Keep up the great work
          and continue your learning journey.
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(item.action)}
            className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between relative overflow-hidden text-left hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5">
              <span
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${item.bg}`}
              >
                {item.icon}
              </span>

              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 font-bold tracking-wide block uppercase">
                  {item.title}
                </span>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-slate-900">
                    {item.value}
                  </span>

                  {item.title === "Current GPA" && (
                    <span className="text-xs font-bold text-slate-400">
                      {item.label}
                    </span>
                  )}
                </div>

                {item.title !== "Current GPA" && (
                  <span className="text-[10px] text-slate-400 font-bold block">
                    {item.label}
                  </span>
                )}

                {item.extra}
              </div>
            </div>

            {item.title === "Attendance Percentage" && (
              <div className="w-16 h-8 opacity-40 shrink-0 self-end mb-1 hidden xl:block">
                <svg
                  viewBox="0 0 60 20"
                  className="w-full h-full stroke-blue-500 stroke-[2] fill-none"
                >
                  <path d="M0,15 Q15,5 30,12 T60,2" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-5 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                Today&apos;s Timetable
              </h3>
            </div>

            <button
              onClick={() => handleNavigate("timetable")}
              className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer transition-colors flex items-center gap-1"
            >
              View All <ChevronRight size={12} />
            </button>
          </div>

          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md w-fit">
            {todayDate}
          </span>

          <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <table className="w-full text-left text-[11px] font-medium text-slate-500 min-w-[520px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                  <th className="pb-2 font-bold">Period</th>
                  <th className="pb-2 font-bold">Time</th>
                  <th className="pb-2 font-bold">Subject</th>
                  <th className="pb-2 font-bold">Room</th>
                  <th className="pb-2 font-bold">Teacher</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50/50">
                {todaySchedule.length > 0 ? (
                  todaySchedule.slice(0, 6).map((period, index) => (
                    <tr key={period.id} className="hover:bg-slate-50/30">
                      <td className="py-2.5 font-bold text-slate-900">
                        {period.periodType === "Break" ? "☕" : index + 1}
                      </td>
                      <td className="py-2.5 text-slate-400">
                        {period.startTime} - {period.endTime}
                      </td>
                      <td className="py-2.5 text-slate-700 font-semibold">
                        {period.subject || period.periodType}
                      </td>
                      <td className="py-2.5">{period.room || "Not added"}</td>
                      <td className="py-2.5">
                        {period.teacherName || "Teacher"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-10 text-center text-slate-400"
                    >
                      No classes scheduled today.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                Subject Performance
              </h3>
            </div>

            <button
              onClick={() => handleNavigate("results")}
              className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer transition-colors flex items-center gap-1"
            >
              View Details <ChevronRight size={12} />
            </button>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row xl:flex-col items-center justify-center gap-3 py-2">
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <PieChart
                series={[
                  {
                    data: pieData,
                    innerRadius: 38,
                    outerRadius: 48,
                    paddingAngle: 3,
                    cornerRadius: 4,
                  },
                ]}
                width={128}
                height={128}
                slotProps={{ legend: { hidden: true } }}
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              />

              <div className="absolute text-center space-y-0.5 pointer-events-none">
                <span className="text-xl font-black text-slate-900 tracking-tight block">
                  {currentGpa}
                </span>
                <span className="text-[9px] text-slate-400 font-bold bg-slate-50 border border-slate-100/80 px-1.5 py-0.5 rounded-md uppercase tracking-wider block">
                  Scale 4.0
                </span>
              </div>
            </div>

            <div className="w-full space-y-2 text-[11px] font-semibold text-slate-500 pl-2">
              {pieData.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600 font-medium truncate max-w-[120px]">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex gap-4 shrink-0">
                    <span className="font-bold text-slate-900">
                      {item.grade}
                    </span>
                    <span className="text-slate-400 font-bold w-6 text-right">
                      {Number(item.value).toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarCheck size={16} className="text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                Attendance Trend
              </h3>
            </div>

            <button
              onClick={() => handleNavigate("attendance")}
              className="text-[10px] font-bold text-slate-400 flex items-center gap-1 hover:text-slate-600 cursor-pointer"
            >
              View All <ChevronRight size={12} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-end w-full h-32">
            <LineChart
              xAxis={[
                {
                  data: xLabels,
                  scaleType: "point",
                  sx: {
                    "& .MuiChartsAxis-label, & .MuiChartsAxis-tickLabel": {
                      fill: "#94A3B8 !important",
                      fontWeight: "700 !important",
                      fontSize: "9px !important",
                    },
                  },
                },
              ]}
              yAxis={[
                {
                  min: 0,
                  max: 100,
                  sx: {
                    "& .MuiChartsAxis-tickLabel": {
                      fill: "#94A3B8 !important",
                      fontWeight: "700 !important",
                      fontSize: "9px !important",
                    },
                  },
                },
              ]}
              series={[
                {
                  data: lineSeriesData,
                  color: "#3B82F6",
                  area: false,
                  showMark: true,
                },
              ]}
              height={140}
              margin={{ top: 10, bottom: 20, left: 32, right: 10 }}
              slotProps={{ legend: { hidden: true } }}
            />
          </div>

          <div className="text-center border-t border-slate-50/60 pt-2 text-[10px] font-bold text-emerald-600 flex items-center justify-center gap-1">
            <TrendingUp size={12} /> {attendanceImprovement >= 0 ? "↑" : "↓"}{" "}
            {Math.abs(attendanceImprovement)}%
            <span className="text-slate-400 font-medium">
              attendance trend
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone size={16} className="text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                Announcements
              </h3>
            </div>

            <button
              onClick={() => handleNavigate("notice")}
              className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer transition-colors flex items-center gap-1"
            >
              View All <ChevronRight size={12} />
            </button>
          </div>

          <div className="flex-1 space-y-3.5 text-xs">
            {latestNotices.length > 0 ? (
              latestNotices.map((notice, index) => (
                <div
                  key={notice.id}
                  className={`flex gap-3 items-start ${
                    index !== latestNotices.length - 1
                      ? "border-b border-slate-50 pb-3"
                      : ""
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${getNoticeIconStyle(
                      notice.category
                    )}`}
                  >
                    {getNoticeIcon(notice.category)}
                  </span>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-[11px]">
                        {notice.title}
                      </h4>

                      {index === 0 && (
                        <span className="px-1.5 bg-blue-600 text-white font-bold text-[8px] rounded-md uppercase tracking-wide scale-90 origin-left">
                          New
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] text-slate-400 font-normal leading-relaxed line-clamp-2">
                      {notice.description}
                    </p>

                    <span className="text-[9px] text-slate-400 block font-medium">
                      {formatDate(notice.date)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">
                No announcements found.
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                Upcoming Exams
              </h3>
            </div>

            <button
              onClick={() => handleNavigate("exams")}
              className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer transition-colors flex items-center gap-1"
            >
              View All <ChevronRight size={12} />
            </button>
          </div>

          <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <table className="w-full text-left text-[11px] font-medium text-slate-500 min-w-[360px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                  <th className="pb-2 font-bold">Exam</th>
                  <th className="pb-2 font-bold">Subject</th>
                  <th className="pb-2 font-bold">Date</th>
                  <th className="pb-2 font-bold text-right">Time</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50/50 text-slate-700">
                {upcomingExams.length > 0 ? (
                  upcomingExams.slice(0, 5).map((exam) => (
                    <tr key={exam.id} className="hover:bg-slate-50/30">
                      <td className="py-3 text-slate-400 font-normal">
                        {exam.examType || exam.title}
                      </td>
                      <td className="py-3 font-semibold text-slate-900">
                        {exam.subject}
                      </td>
                      <td className="py-3">{formatDate(exam.date)}</td>
                      <td className="py-3 text-right text-slate-400">
                        {exam.startTime || "Not added"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-10 text-center text-slate-400"
                    >
                      No upcoming exams found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50/70 border border-blue-100/40 rounded-xl p-2.5 flex items-center gap-2 text-[10px] text-blue-700 font-semibold">
            <Info size={14} className="shrink-0 text-blue-500" />
            <span>Prepare well and ace your exams! 💪</span>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 size={16} className="text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                Recent Results
              </h3>
            </div>

            <button
              onClick={() => handleNavigate("results")}
              className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer transition-colors flex items-center gap-1"
            >
              View All <ChevronRight size={12} />
            </button>
          </div>

          <div className="flex-1 space-y-3">
            {latestResults.length > 0 ? (
              latestResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-slate-50 border border-slate-100 rounded-xl p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black text-slate-900">
                        {result.subject}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1">
                        {result.examTitle}
                      </p>
                    </div>

                    <span className="px-2 py-1 rounded-lg bg-green-50 text-green-600 text-[10px] font-black">
                      {result.grade || calculateGrade(result.percentage)}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 font-semibold mt-2">
                    {result.obtainedMarks}/{result.maxMarks} •{" "}
                    {result.percentage}%
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">
                No published results yet.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-blue-600 rounded-2xl p-5 text-white shadow-sm">
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Trophy size={22} />
            </span>

            <div>
              <h3 className="text-lg font-black">Keep Going!</h3>
              <p className="text-sm text-blue-100 mt-1 leading-6">
                Check your attendance, timetable, exams, results and notices
                regularly to stay updated.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
              <User size={20} />
            </span>

            <div>
              <p className="text-sm font-black text-slate-900">
                Student Details
              </p>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Roll No: {student.rollNo || "Not added"}
              </p>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Class: {student.className || "Not added"}
              </p>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                ID: {student.studentId || "Not added"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewDashboard;