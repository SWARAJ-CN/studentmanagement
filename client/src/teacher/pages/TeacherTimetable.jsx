import React, { useEffect, useMemo, useState } from "react";

import {
  IoSearchOutline,
  IoBookOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoAdd,
  IoCloseOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { FaRegCalendarCheck } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";
import toast from "react-hot-toast";

import {
  getTeacherAPI,
  getTimetableAPI,
  registerTimetableAPI,
  updateTimetableAPI,
  deleteTimetableAPI,
} from "../../services/allAPI";

const TeacherTimetable = () => {
  const [timetableList, setTimetableList] = useState([]);
  const [teacherData, setTeacherData] = useState(null);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [viewFilter, setViewFilter] = useState("Week View");

  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editDbId, setEditDbId] = useState(null);

  const initialFormState = {
    timetableId: "",
    day: "",
    startTime: "",
    endTime: "",
    className: "",
    subject: "",
    room: "",
    periodType: "Class",
    status: "Active",
    notes: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const periodTypes = ["Class", "Lab", "Free Period", "Meeting", "Break"];

  const allClassOptions = [
    "Class 1A",
    "Class 1B",
    "Class 1C",
    "Class 2A",
    "Class 2B",
    "Class 2C",
    "Class 3A",
    "Class 3B",
    "Class 3C",
    "Class 4A",
    "Class 4B",
    "Class 4C",
    "Class 5A",
    "Class 5B",
    "Class 5C",
    "Class 6A",
    "Class 6B",
    "Class 6C",
    "Class 7A",
    "Class 7B",
    "Class 7C",
    "Class 8A",
    "Class 8B",
    "Class 8C",
    "Class 9A",
    "Class 9B",
    "Class 9C",
    "Class 10A",
    "Class 10B",
    "Class 10C",
  ];

  const allSubjects = [
    "English",
    "Science",
    "Mathematics",
    "Biology",
    "Chemistry",
    "Physics",
    "Social Science",
    "Computer Science",
    "Hindi",
    "Malayalam",
    "EVS",
  ];

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
      createdAt: item.createdAt || "",
      updatedAt: item.updatedAt || "",
    };
  };

  const getDuplicateKey = (item) => {
    return [
      item.teacherId || "",
      item.day || "",
      item.startTime || "",
      item.endTime || "",
      item.className || "",
      item.subject || "",
      item.periodType || "",
    ].join("|");
  };

  const removeDuplicates = (data) => {
    const map = new Map();

    data.forEach((item) => {
      const key = getDuplicateKey(item);

      const oldItem = map.get(key);

      if (!oldItem) {
        map.set(key, item);
        return;
      }

      const oldTime = new Date(oldItem.updatedAt || oldItem.createdAt || 0);
      const newTime = new Date(item.updatedAt || item.createdAt || 0);

      if (newTime >= oldTime) {
        map.set(key, item);
      }
    });

    return Array.from(map.values());
  };

  const getLoggedTeacherData = async () => {
    const loggedTeacherId = localStorage.getItem("teacherId");

    const result = await getTeacherAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const foundTeacher = result.data.find(
        (teacher) => teacher.teacherId === loggedTeacherId
      );

      if (foundTeacher) {
        setTeacherData(foundTeacher);
        setTeacherClasses(normalizeAssignedClasses(foundTeacher));
        setTeacherSubjects(normalizeAssignedSubjects(foundTeacher));
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
    getLoggedTeacherData();
    getAllTimetables();
  }, []);

  const normalizedTimetable = useMemo(() => {
    return timetableList.map((item) => normalizePeriod(item));
  }, [timetableList]);

  const classOptions =
    teacherClasses.length > 0 ? teacherClasses : allClassOptions;

  const subjectOptions =
    teacherSubjects.length > 0 ? teacherSubjects : allSubjects;

  const visibleTimetable = useMemo(() => {
    const loggedTeacherId = localStorage.getItem("teacherId");

    let data = normalizedTimetable.filter((item) => item.status !== "Inactive");

    if (loggedTeacherId) {
      data = data.filter((item) => {
        if (item.teacherId) return item.teacherId === loggedTeacherId;

        if (teacherClasses.length > 0) {
          return teacherClasses.includes(item.className);
        }

        return true;
      });
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter(
        (item) =>
          item.subject.toLowerCase().includes(keyword) ||
          item.className.toLowerCase().includes(keyword) ||
          item.room.toLowerCase().includes(keyword) ||
          item.day.toLowerCase().includes(keyword) ||
          item.periodType.toLowerCase().includes(keyword)
      );
    }

    if (classFilter !== "All Classes") {
      data = data.filter((item) => item.className === classFilter);
    }

    if (subjectFilter !== "All Subjects") {
      data = data.filter((item) => item.subject === subjectFilter);
    }

    return removeDuplicates(data);
  }, [
    normalizedTimetable,
    teacherClasses,
    searchTerm,
    classFilter,
    subjectFilter,
  ]);

  const timeSlots = useMemo(() => {
    const slots = [
      ...new Set(
        visibleTimetable
          .map((item) => `${item.startTime} - ${item.endTime}`)
          .filter((item) => item.trim() !== "-")
      ),
    ];

    return slots.sort((a, b) => {
      const first = a.split(" - ")[0];
      const second = b.split(" - ")[0];
      return first.localeCompare(second);
    });
  }, [visibleTimetable]);

  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todaySchedule = useMemo(() => {
    return visibleTimetable
      .filter((item) => item.day === todayName)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [visibleTimetable, todayName]);

  const subjectLoad = useMemo(() => {
    const grouped = {};

    visibleTimetable.forEach((item) => {
      if (item.periodType === "Free Period" || item.periodType === "Break") {
        return;
      }

      if (!grouped[item.subject]) grouped[item.subject] = 0;
      grouped[item.subject] += 1;
    });

    const total = Object.values(grouped).reduce((sum, count) => sum + count, 0);

    const colors = [
      "bg-blue-600",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-cyan-500",
    ];

    return Object.entries(grouped).map(([subject, count], index) => {
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

      return {
        subject,
        count,
        percentage,
        width: `${percentage}%`,
        color: colors[index % colors.length],
      };
    });
  }, [visibleTimetable]);

  const freePeriods = visibleTimetable.filter(
    (item) => item.periodType === "Free Period"
  ).length;

  const statsCards = [
    {
      title: "Total Weekly Periods",
      value: visibleTimetable.length,
      desc: "assigned periods",
      icon: <FaRegCalendarCheck />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-600",
      symbol: "↑",
    },
    {
      title: "Classes Today",
      value: todaySchedule.length,
      desc: "scheduled today",
      icon: <IoPeopleOutline />,
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
      text: "text-orange-500",
      symbol: "↑",
    },
    {
      title: "Subjects Handled",
      value: subjectLoad.length,
      desc: "active subjects",
      icon: <IoBookOutline />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-600",
      symbol: "—",
    },
    {
      title: "Free Periods",
      value: freePeriods,
      desc: "this week",
      icon: <IoTimeOutline />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-purple-600",
      symbol: "↓",
    },
  ];

  const getPeriodStyle = (period) => {
    if (!period) return "bg-slate-50 border-slate-100 text-slate-400";

    const value = `${period.subject} ${period.periodType}`.toLowerCase();

    if (period.periodType === "Free Period" || period.periodType === "Break") {
      return "bg-slate-50 border-slate-100 text-slate-500";
    }

    if (value.includes("science")) {
      return "bg-blue-50 border-blue-100 text-blue-600";
    }

    if (value.includes("biology")) {
      return "bg-green-50 border-green-100 text-green-600";
    }

    if (value.includes("chemistry")) {
      return "bg-purple-50 border-purple-100 text-purple-600";
    }

    if (value.includes("physics")) {
      return "bg-orange-50 border-orange-100 text-orange-500";
    }

    if (value.includes("lab")) {
      return "bg-cyan-50 border-cyan-100 text-cyan-600";
    }

    if (value.includes("math")) {
      return "bg-amber-50 border-amber-100 text-amber-600";
    }

    if (value.includes("english")) {
      return "bg-indigo-50 border-indigo-100 text-indigo-600";
    }

    if (value.includes("evs")) {
      return "bg-emerald-50 border-emerald-100 text-emerald-600";
    }

    return "bg-slate-50 border-slate-100 text-slate-600";
  };

  const getStatusStyle = (period) => {
    if (!period) return "";

    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });

    if (period.day !== currentDay) return "bg-blue-100 text-blue-600";

    const currentTime = now.toTimeString().slice(0, 5);

    if (currentTime > period.endTime) return "bg-green-100 text-green-600";

    if (currentTime >= period.startTime && currentTime <= period.endTime) {
      return "bg-orange-100 text-orange-500";
    }

    return "bg-blue-100 text-blue-600";
  };

  const getStatusText = (period) => {
    if (!period) return "";

    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });

    if (period.day !== currentDay) return "Upcoming";

    const currentTime = now.toTimeString().slice(0, 5);

    if (currentTime > period.endTime) return "Completed";

    if (currentTime >= period.startTime && currentTime <= period.endTime) {
      return "Ongoing";
    }

    return "Upcoming";
  };

  const generateTimetableId = () => {
    const year = new Date().getFullYear();
    return `TT-${year}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditDbId(null);
    setSelectedPeriod(null);

    setFormData({
      ...initialFormState,
      timetableId: generateTimetableId(),
      day: "Monday",
      startTime: "09:00",
      endTime: "09:45",
      className: classOptions[0] || "",
      subject: subjectOptions[0] || "",
      room: "Room 101",
      periodType: "Class",
      status: "Active",
    });

    setModalOpen(true);
  };

  const handleOpenEdit = (period) => {
    setIsEditMode(true);
    setEditDbId(period.id);
    setSelectedPeriod(period);
    setViewOpen(false);

    setFormData({
      timetableId: period.timetableId,
      day: period.day,
      startTime: period.startTime,
      endTime: period.endTime,
      className: period.className,
      subject: period.subject,
      room: period.room,
      periodType: period.periodType,
      status: period.status,
      notes: period.notes,
    });

    setModalOpen(true);
  };

  const handleViewPeriod = (period) => {
    if (!period) return;

    setSelectedPeriod(period);
    setViewOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isDuplicatePeriod = () => {
    const loggedTeacherId = localStorage.getItem("teacherId") || "";

    const newItem = {
      teacherId: loggedTeacherId,
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      className: formData.className,
      subject: formData.subject,
      periodType: formData.periodType,
    };

    const newKey = getDuplicateKey(newItem);

    return normalizedTimetable.some((item) => {
      if (isEditMode && item.id === editDbId) return false;
      if (item.status === "Inactive") return false;

      return getDuplicateKey(item) === newKey;
    });
  };

  const validateForm = () => {
    if (!formData.day) {
      toast.error("Select day");
      return false;
    }

    if (!formData.startTime || !formData.endTime) {
      toast.error("Start time and end time are required");
      return false;
    }

    if (formData.startTime >= formData.endTime) {
      toast.error("End time must be after start time");
      return false;
    }

    if (
      formData.periodType !== "Break" &&
      formData.periodType !== "Free Period"
    ) {
      if (!formData.className) {
        toast.error("Select class");
        return false;
      }

      if (!formData.subject) {
        toast.error("Select subject");
        return false;
      }
    }

    if (isDuplicatePeriod()) {
      toast.error("This same period already exists");
      return false;
    }

    return true;
  };

  const buildPayload = () => {
    const teacherId = localStorage.getItem("teacherId") || "";

    return {
      ...formData,
      timetable_id: formData.timetableId,
      teacherId,
      teacher_id: teacherId,
      teacherName: teacherData?.name || teacherData?.teacherName || "Teacher",
      teacher_name: teacherData?.name || teacherData?.teacherName || "Teacher",
      class: formData.className,
      start_time: formData.startTime,
      end_time: formData.endTime,
      period_type: formData.periodType,
      createdAt:
        isEditMode && selectedPeriod?.createdAt
          ? selectedPeriod.createdAt
          : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = buildPayload();

    const result = isEditMode
      ? await updateTimetableAPI(editDbId, payload)
      : await registerTimetableAPI(payload);

    if (result?.status >= 200 && result?.status < 300) {
      toast.success(
        isEditMode
          ? "Timetable updated successfully"
          : "Period added successfully"
      );

      setModalOpen(false);
      setIsEditMode(false);
      setEditDbId(null);
      setSelectedPeriod(null);
      setFormData(initialFormState);

      await getAllTimetables();
    } else {
      toast.error(
        isEditMode ? "Failed to update timetable" : "Failed to add period"
      );
    }
  };

  const handleDelete = async (period) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${period.subject || period.periodType}?`
    );

    if (!confirmDelete) return;

    const result = await deleteTimetableAPI(period.id);

    if (result?.status >= 200 && result?.status < 300) {
      toast.success("Period deleted successfully");
      setViewOpen(false);
      setSelectedPeriod(null);
      await getAllTimetables();
    } else {
      toast.error("Failed to delete period");
    }
  };

  const getPeriodByDayAndTime = (day, timeSlot) => {
    const [startTime, endTime] = timeSlot.split(" - ");

    return visibleTimetable.find(
      (item) =>
        item.day === day &&
        item.startTime === startTime &&
        item.endTime === endTime
    );
  };

  const DetailItem = ({ label, value }) => (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2 last:border-b-0">
      <span className="text-slate-400 font-semibold">{label}</span>
      <span className="text-slate-800 font-bold text-right">
        {value || "Not added"}
      </span>
    </div>
  );

  return (
    <div className="w-full space-y-6 pb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-black text-slate-900">Timetable</p>
          <p className="text-sm text-slate-500 mt-1">
            View and manage your weekly class schedule across all sections.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="h-11 px-4 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          <IoAdd className="text-lg" />
          Add Period
        </button>
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-9 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xl font-black text-slate-900">
              Weekly Timetable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-4 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

              <input
                type="text"
                placeholder="Search periods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
            >
              <option>All Classes</option>
              {classOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
            >
              <option>All Subjects</option>
              {subjectOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={viewFilter}
              onChange={(e) => setViewFilter(e.target.value)}
              className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
            >
              <option>Week View</option>
              <option>Day View</option>
            </select>
          </div>

          {timeSlots.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <div className="min-w-[820px]">
                <div className="grid grid-cols-[85px_repeat(6,minmax(115px,1fr))] bg-slate-50 rounded-t-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-4 text-xs font-black text-slate-600">
                    Time
                  </div>

                  {days.map((day) => (
                    <div
                      key={day}
                      className="px-2 py-4 text-xs font-black text-slate-600 text-center border-l border-slate-100"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="border-x border-b border-slate-100 rounded-b-xl overflow-hidden">
                  {timeSlots.map((timeSlot) => (
                    <div
                      key={timeSlot}
                      className="grid grid-cols-[85px_repeat(6,minmax(115px,1fr))] border-b border-slate-100 last:border-b-0"
                    >
                      <div className="px-3 py-4 text-xs font-black text-slate-800 flex items-center leading-5">
                        {timeSlot}
                      </div>

                      {days.map((day) => {
                        const period = getPeriodByDayAndTime(day, timeSlot);

                        return (
                          <div
                            key={`${day}-${timeSlot}`}
                            className="p-2 border-l border-slate-100 min-h-[86px]"
                          >
                            {period ? (
                              <button
                                onClick={() => handleViewPeriod(period)}
                                className={`w-full h-full rounded-xl border px-3 py-2 flex flex-col justify-center text-left hover:shadow-sm transition-all ${getPeriodStyle(
                                  period
                                )}`}
                              >
                                <p className="text-xs font-black truncate">
                                  {period.subject || period.periodType}
                                </p>

                                {period.className && (
                                  <p className="text-xs text-slate-700 font-semibold mt-1 truncate">
                                    {period.className}
                                  </p>
                                )}

                                {period.room && (
                                  <p className="text-xs text-slate-600 mt-0.5 truncate">
                                    {period.room}
                                  </p>
                                )}
                              </button>
                            ) : (
                              <div className="h-full rounded-xl border border-dashed border-slate-100 bg-slate-50/50 flex items-center justify-center text-xs text-slate-300 font-bold">
                                Empty
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-sm text-slate-400 font-semibold">
              No timetable periods found. Click Add Period to create one.
            </div>
          )}

          <div className="flex flex-wrap items-center gap-5 mt-5">
            {[
              ["Science", "bg-blue-400"],
              ["Biology", "bg-green-400"],
              ["Chemistry", "bg-purple-400"],
              ["Physics", "bg-orange-300"],
              ["Lab", "bg-cyan-300"],
              ["Free / Other", "bg-slate-200"],
            ].map(([label, color]) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded ${color}`}></span>
                <p className="text-xs font-semibold text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <p className="text-lg font-black text-slate-900">
                Today's Schedule
              </p>

              <span className="text-sm text-blue-600 font-bold">
                {todayName}
              </span>
            </div>

            <div className="space-y-4">
              {todaySchedule.length > 0 ? (
                todaySchedule.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleViewPeriod(item)}
                    className="w-full flex items-start justify-between gap-3 text-left border-b border-slate-100 last:border-b-0 pb-4 last:pb-0"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-500">
                        {item.startTime} - {item.endTime}
                      </p>

                      <p className="text-sm font-black text-slate-900 mt-1">
                        {item.subject || item.periodType}
                      </p>

                      {item.className && (
                        <p className="text-xs font-semibold text-slate-500 mt-1">
                          {item.className}
                        </p>
                      )}

                      {item.room && (
                        <p className="text-xs font-semibold text-slate-500 mt-1">
                          {item.room}
                        </p>
                      )}
                    </div>

                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${getStatusStyle(
                        item
                      )}`}
                    >
                      {getStatusText(item)}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-sm text-slate-400 text-center py-8">
                  No classes scheduled today.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-lg font-black text-slate-900 mb-5">
              Subject Load
            </p>

            <div className="space-y-5">
              {subjectLoad.length > 0 ? (
                subjectLoad.map((item) => (
                  <div key={item.subject}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="text-sm font-black text-slate-700">
                        {item.subject}
                      </p>

                      <p className="text-xs font-bold text-slate-600 whitespace-nowrap">
                        {item.count} periods
                      </p>
                    </div>

                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: item.width }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 text-center py-8">
                  No subject load available.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                <HiOutlineBookOpen />
              </div>

              <div>
                <p className="text-lg font-black text-slate-900">
                  Weekly Teaching Load
                </p>
                <p className="text-sm text-slate-500 mt-1 leading-6">
                  You have {visibleTimetable.length} periods this week,
                  including {freePeriods} free periods and {subjectLoad.length}{" "}
                  handled subjects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-slate-900">
                {isEditMode ? "Edit Period" : "Add Period"}
              </h2>

              <button
                onClick={() => setModalOpen(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="timetableId"
                  value={formData.timetableId}
                  readOnly
                  className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-bold outline-none text-sm"
                />

                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>

                <select
                  name="periodType"
                  value={formData.periodType}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                >
                  {periodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  placeholder="Room / Lab"
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
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
                  value={formData.subject}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                >
                  <option value="">Select Subject</option>
                  {subjectOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Notes"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
              >
                {isEditMode ? "Update Period" : "Add Period"}
              </button>
            </form>
          </div>
        </div>
      )}

      {viewOpen && selectedPeriod && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Period Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {selectedPeriod.timetableId}
                </p>
              </div>

              <button
                onClick={() => setViewOpen(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
              <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Schedule Details
                </h3>

                <DetailItem label="Day" value={selectedPeriod.day} />
                <DetailItem
                  label="Time"
                  value={`${selectedPeriod.startTime} - ${selectedPeriod.endTime}`}
                />
                <DetailItem label="Type" value={selectedPeriod.periodType} />
                <DetailItem label="Status" value={selectedPeriod.status} />
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Class Details
                </h3>

                <DetailItem label="Class" value={selectedPeriod.className} />
                <DetailItem label="Subject" value={selectedPeriod.subject} />
                <DetailItem label="Room" value={selectedPeriod.room} />
                <DetailItem label="Teacher" value={selectedPeriod.teacherName} />
              </div>

              <div className="md:col-span-2 bg-slate-50 rounded-2xl p-5">
                <h3 className="font-black text-slate-900 mb-3">Notes</h3>
                <p className="text-sm text-slate-600 font-semibold leading-7">
                  {selectedPeriod.notes || "No notes added."}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => handleOpenEdit(selectedPeriod)}
                className="flex-1 h-11 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <IoPencilOutline />
                Edit Period
              </button>

              <button
                onClick={() => handleDelete(selectedPeriod)}
                className="flex-1 h-11 rounded-xl bg-red-50 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-100"
              >
                <IoTrashOutline />
                Delete Period
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherTimetable;