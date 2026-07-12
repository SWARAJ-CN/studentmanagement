import React, { useEffect, useMemo, useState } from "react";

import {
  Calendar,
  BookOpen,
  Clock,
  User,
  Download,
  Info,
  Layers,
  LayoutGrid,
  ChevronDown,
  Eye,
  X,
} from "lucide-react";

import { getStudentAPI, getTimetableAPI } from "../services/allAPI";

const TimetableView = () => {
  const [student, setStudent] = useState(null);
  const [timetableList, setTimetableList] = useState([]);
  const [viewMode, setViewMode] = useState("week");
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const daysOfWeek = [
    { name: "Monday", short: "Mon" },
    { name: "Tuesday", short: "Tue" },
    { name: "Wednesday", short: "Wed" },
    { name: "Thursday", short: "Thu" },
    { name: "Friday", short: "Fri" },
    { name: "Saturday", short: "Sat" },
  ];

  const normalizeStudent = (data) => {
    if (!data) return null;

    return {
      id: data.id,
      studentId: data.studentId || data.student_id || "",
      name: data.name || data.student_name || "",
      className: data.className || data.student_class || "",
      rollNo: data.rollNo || data.student_rollno || "",
    };
  };

  const normalizePeriod = (item) => {
    return {
      id: item.id,
      timetableId: item.timetableId || item.timetable_id || "",
      teacherId: item.teacherId || item.teacher_id || "",
      teacherName: item.teacherName || item.teacher_name || "",
      day: item.day || "",
      startTime: item.startTime || item.start_time || "",
      endTime: item.endTime || item.end_time || "",
      className: item.className || item.class || "",
      subject: item.subject || "",
      room: item.room || "",
      periodType: item.periodType || item.period_type || "Class",
      status: item.status || "Active",
      notes: item.notes || "",
    };
  };

  const getLoggedStudent = async () => {
    const loggedStudentId = localStorage.getItem("studentId");
    const storedStudent = localStorage.getItem("studentData");

    if (storedStudent) {
      try {
        setStudent(normalizeStudent(JSON.parse(storedStudent)));
      } catch (error) {
        console.log(error);
      }
    }

    const result = await getStudentAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const foundStudent = result.data.find((item) => {
        const normalized = normalizeStudent(item);
        return normalized.studentId === loggedStudentId;
      });

      if (foundStudent) {
        const normalized = normalizeStudent(foundStudent);
        setStudent(normalized);
        localStorage.setItem("studentData", JSON.stringify(foundStudent));
      }
    }
  };

  const getAllTimetables = async () => {
    const result = await getTimetableAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setTimetableList(Array.isArray(result.data) ? result.data : []);
    }
  };

  useEffect(() => {
    const todayName = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });

    const index = daysOfWeek.findIndex((day) => day.name === todayName);
    setActiveDayIndex(index >= 0 ? index : 0);

    getLoggedStudent();
    getAllTimetables();
  }, []);

  const normalizedTimetable = useMemo(() => {
    return timetableList.map((item) => normalizePeriod(item));
  }, [timetableList]);

  const studentTimetable = useMemo(() => {
    if (!student) return [];

    return normalizedTimetable
      .filter(
        (item) =>
          item.status !== "Inactive" &&
          (item.className === student.className ||
            item.periodType === "Break")
      )
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [normalizedTimetable, student]);

  const timeSlots = useMemo(() => {
    const slots = [
      ...new Set(
        studentTimetable
          .map((item) => `${item.startTime} - ${item.endTime}`)
          .filter((item) => item.trim() !== "-")
      ),
    ];

    return slots.sort((a, b) => {
      const first = a.split(" - ")[0];
      const second = b.split(" - ")[0];
      return first.localeCompare(second);
    });
  }, [studentTimetable]);

  const activeDay = daysOfWeek[activeDayIndex]?.name || "Monday";

  const todaySchedule = useMemo(() => {
    return studentTimetable
      .filter((item) => item.day === activeDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [studentTimetable, activeDay]);

  const todayDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const currentDayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const nextPeriod = useMemo(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    const today = studentTimetable
      .filter((item) => item.day === currentDayName)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    return today.find((item) => item.startTime >= currentTime) || today[0];
  }, [studentTimetable, currentDayName]);

  const classTeacher = useMemo(() => {
    const periodWithTeacher = studentTimetable.find((item) => item.teacherName);
    return periodWithTeacher?.teacherName || "Class Teacher";
  }, [studentTimetable]);

  const metrics = [
    {
      label: "Today's Date",
      value: todayDate,
      sub: currentDayName,
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Periods Today",
      value: todaySchedule.length,
      sub:
        todaySchedule.length > 0
          ? `${todaySchedule[0].startTime} - ${
              todaySchedule[todaySchedule.length - 1].endTime
            }`
          : "No classes",
      icon: BookOpen,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Next Period",
      value: nextPeriod?.subject || nextPeriod?.periodType || "No period",
      sub: nextPeriod
        ? `${nextPeriod.startTime} - ${nextPeriod.endTime}`
        : "No upcoming period",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Teacher",
      value: classTeacher,
      sub: nextPeriod?.subject || "Assigned teacher",
      icon: User,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const getPeriodByDayAndTime = (day, timeSlot) => {
    const [startTime, endTime] = timeSlot.split(" - ");

    return studentTimetable.find(
      (item) =>
        item.day === day &&
        item.startTime === startTime &&
        item.endTime === endTime
    );
  };

  const getSubjectStyle = (period) => {
    if (!period) return "bg-slate-50 text-slate-400 border-slate-100";

    const value = `${period.subject} ${period.periodType}`.toLowerCase();

    if (period.periodType === "Break") {
      return "bg-slate-50 text-slate-500 border-slate-100";
    }

    if (value.includes("english")) return "bg-blue-50 text-blue-700 border-blue-100";
    if (value.includes("science")) return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (value.includes("math")) return "bg-amber-50 text-amber-700 border-amber-100";
    if (value.includes("social")) return "bg-purple-50 text-purple-700 border-purple-100";
    if (value.includes("hindi")) return "bg-rose-50 text-rose-700 border-rose-100";
    if (value.includes("computer")) return "bg-cyan-50 text-cyan-700 border-cyan-100";
    if (value.includes("biology")) return "bg-green-50 text-green-700 border-green-100";
    if (value.includes("chemistry")) return "bg-violet-50 text-violet-700 border-violet-100";
    if (value.includes("physics")) return "bg-orange-50 text-orange-700 border-orange-100";

    return "bg-slate-50 text-slate-700 border-slate-100";
  };

  const getStatusText = (period) => {
    if (!period) return "";

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

    if (period.day !== today) return "Upcoming";
    if (currentTime > period.endTime) return "Completed";
    if (currentTime >= period.startTime && currentTime <= period.endTime) {
      return "Ongoing";
    }

    return "Upcoming";
  };

  const getStatusStyle = (period) => {
    const status = getStatusText(period);

    if (status === "Completed") return "bg-green-100 text-green-600";
    if (status === "Ongoing") return "bg-orange-100 text-orange-500";
    return "bg-blue-100 text-blue-600";
  };

  const handleDownload = () => {
    alert("Timetable download feature can be added later.");
  };

  if (!student) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <p className="text-sm font-semibold text-slate-500">
          Loading timetable...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-blue-600 cursor-pointer hover:underline">
              Dashboard
            </span>
            <span className="text-slate-400 font-normal">&gt;</span>
            <span className="text-slate-400 font-medium">Timetable</span>
          </div>

          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
            Time Table
          </h1>

          <p className="text-xs text-slate-400 font-medium mt-0.5">
            View your class schedule and plan your day.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative bg-white border border-slate-200 rounded-xl shadow-sm px-3 py-2 flex items-center gap-2 text-xs font-bold text-slate-700">
            <Calendar size={14} className="text-slate-400" />
            <span>{student.className}</span>
            <ChevronDown size={13} className="text-slate-400" />
          </div>

          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download size={14} />
            Download
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold">
          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Student Name
            </span>
            <span className="text-slate-900 font-black">{student.name}</span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Student ID
            </span>
            <span className="text-slate-900 font-black">
              {student.studentId}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Class
            </span>
            <span className="text-slate-900 font-black">
              {student.className}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Roll No
            </span>
            <span className="text-slate-900 font-black">{student.rollNo}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;

          return (
            <div
              key={index}
              className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4"
            >
              <span
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${metric.bg} ${metric.color}`}
              >
                <Icon size={20} />
              </span>

              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
                  {metric.label}
                </span>

                <span className="text-sm font-black text-slate-900 tracking-tight block mt-0.5">
                  {metric.value}
                </span>

                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                  {metric.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-3">
          <h3 className="text-xs font-black text-slate-900 tracking-tight">
            {viewMode === "week"
              ? "Weekly Time Table"
              : `Daily Schedule — ${daysOfWeek[activeDayIndex].name}`}
          </h3>

          <div className="bg-slate-100/80 p-0.5 rounded-xl flex gap-1 text-[11px] font-bold self-start sm:self-auto">
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "week"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <LayoutGrid size={12} />
              Week View
            </button>

            <button
              onClick={() => setViewMode("day")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "day"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Layers size={12} />
              Day View
            </button>
          </div>
        </div>

        {viewMode === "day" && (
          <div className="flex items-center gap-2 mb-4 bg-slate-50/50 p-1.5 rounded-xl border border-slate-100 overflow-x-auto whitespace-nowrap">
            {daysOfWeek.map((day, index) => (
              <button
                key={day.name}
                onClick={() => setActiveDayIndex(index)}
                className={`flex-1 py-2 px-3 rounded-lg text-center transition-all cursor-pointer ${
                  activeDayIndex === index
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200/60 font-black"
                    : "text-slate-500 hover:text-slate-800 font-bold"
                }`}
              >
                <span className="text-xs block">{day.name}</span>
                <span className="text-[10px] opacity-70 block font-medium mt-0.5">
                  {day.short}
                </span>
              </button>
            ))}
          </div>
        )}

        {studentTimetable.length > 0 ? (
          viewMode === "week" ? (
            <div className="overflow-x-auto">
              <div className="min-w-[850px]">
                <div className="grid grid-cols-7 bg-slate-50/70 border border-slate-100 rounded-xl text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2.5 mb-2">
                  <div className="text-left pl-4 text-slate-500 font-extrabold normal-case text-xs">
                    Time
                  </div>

                  {daysOfWeek.map((day) => (
                    <div key={day.name}>
                      <span className="text-slate-800 font-black block text-xs">
                        {day.name}
                      </span>
                      <span className="text-slate-400 text-[9px] font-medium mt-0.5 block">
                        {day.short}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {timeSlots.map((timeSlot) => (
                    <div
                      key={timeSlot}
                      className="grid grid-cols-7 items-center gap-2"
                    >
                      <div className="text-left pl-4 text-[10px] font-black text-slate-900 tracking-tight">
                        {timeSlot.split(" - ")[0]}
                        <br />
                        <span className="text-slate-400 font-bold">
                          {timeSlot.split(" - ")[1]}
                        </span>
                      </div>

                      {daysOfWeek.map((day) => {
                        const period = getPeriodByDayAndTime(day.name, timeSlot);

                        return (
                          <button
                            key={`${day.name}-${timeSlot}`}
                            onClick={() => period && setSelectedPeriod(period)}
                            disabled={!period}
                            className={`border rounded-xl p-2.5 text-center transition-all min-h-[62px] ${
                              period
                                ? `${getSubjectStyle(period)} hover:shadow-sm`
                                : "bg-slate-50 text-slate-300 border-slate-100"
                            }`}
                          >
                            {period ? (
                              <>
                                <span className="text-[11px] font-black tracking-tight block truncate">
                                  {period.subject || period.periodType}
                                </span>
                                <span className="text-[9px] font-bold block opacity-75 mt-0.5 truncate">
                                  {period.teacherName || period.room || "Teacher"}
                                </span>
                              </>
                            ) : (
                              <span className="text-[10px] font-bold">Empty</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-w-2xl mx-auto py-2">
              {todaySchedule.length > 0 ? (
                todaySchedule.map((period, index) => (
                  <div key={period.id} className="flex items-center gap-4">
                    <div className="w-28 text-[11px] font-black text-slate-900 shrink-0">
                      {period.startTime}
                      <br />
                      <span className="text-slate-400 font-bold text-[10px]">
                        {period.endTime}
                      </span>
                    </div>

                    <div className="h-10 w-[1px] bg-slate-200 shrink-0" />

                    <button
                      onClick={() => setSelectedPeriod(period)}
                      className={`flex-1 border rounded-xl p-3 flex items-center justify-between transition-all text-left ${getSubjectStyle(
                        period
                      )}`}
                    >
                      <div>
                        <span className="text-xs font-black tracking-tight block">
                          {period.subject || period.periodType}
                        </span>

                        <span className="text-[10px] font-bold opacity-80 block mt-0.5">
                          {period.teacherName || "Teacher"}{" "}
                          {period.room ? `• ${period.room}` : ""}
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border border-black/5 ${getStatusStyle(
                          period
                        )}`}
                      >
                        {getStatusText(period)}
                      </span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-sm text-slate-400 font-semibold">
                  No periods found for {activeDay}.
                </div>
              )}
            </div>
          )
        ) : (
          <div className="py-16 text-center text-sm text-slate-400 font-semibold">
            No timetable found for your class.
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[10px] font-bold text-slate-400">
          <div className="flex items-center gap-2 text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <Info size={13} className="text-blue-500 shrink-0" />
            <span>
              <span className="text-slate-800 font-bold">Note:</span> Timetable
              is subject to change. Please check regularly for updates.
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-4 text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Language
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Science
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Mathematics
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Others
            </div>
          </div>
        </div>
      </div>

      {selectedPeriod && (
        <div className="fixed inset-0 bg-slate-900/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Period Details
                </h2>

                <p className="text-xs text-slate-400 font-semibold mt-1">
                  {selectedPeriod.timetableId}
                </p>
              </div>

              <button
                onClick={() => setSelectedPeriod(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              {[
                ["Day", selectedPeriod.day],
                ["Time", `${selectedPeriod.startTime} - ${selectedPeriod.endTime}`],
                ["Subject", selectedPeriod.subject || selectedPeriod.periodType],
                ["Class", selectedPeriod.className],
                ["Teacher", selectedPeriod.teacherName],
                ["Room", selectedPeriod.room],
                ["Type", selectedPeriod.periodType],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between border-b border-slate-100 pb-2"
                >
                  <span className="text-slate-400">{label}</span>
                  <span className="text-slate-900 font-black text-right">
                    {value || "Not added"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-3">
              <p className="text-[10px] font-black text-blue-700 uppercase">
                Notes
              </p>

              <p className="text-xs text-slate-600 font-semibold leading-6 mt-1">
                {selectedPeriod.notes || "No notes added."}
              </p>
            </div>

            <button
              onClick={() => setSelectedPeriod(null)}
              className="w-full mt-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableView;