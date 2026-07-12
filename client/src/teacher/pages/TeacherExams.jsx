import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  IoSearchOutline,
  IoAdd,
  IoEyeOutline,
  IoCheckmarkCircle,
  IoCalendarOutline,
  IoCloseOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { FaClipboardList, FaTrophy } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getTeacherAPI,
  getExamAPI,
  registerExamAPI,
  updateExamAPI,
  deleteExamAPI,
} from "../../services/allAPI";

const TeacherExams = () => {
  const [examsList, setExamsList] = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [examTypeFilter, setExamTypeFilter] = useState("All Exam Types");

  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editDbId, setEditDbId] = useState(null);

  const initialFormState = {
    examId: "",
    title: "",
    description: "",
    className: "",
    subject: "",
    examType: "",
    term: "",
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
    maxMarks: "",
    passMarks: "",
    venue: "",
    room: "",
    syllabus: "",
    instructions: "",
    status: "Upcoming",
  };

  const [formData, setFormData] = useState(initialFormState);

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

  const examTypes = [
    "Unit Test",
    "Mid Term",
    "Half Yearly",
    "Final Exam",
    "Practical",
    "Revision Test",
    "Assessment",
  ];

  const terms = ["Term 1", "Term 2", "Term 3"];

  const normalizeAssignedClasses = (teacherData) => {
    if (!teacherData) return [];

    if (Array.isArray(teacherData.assignedClasses)) {
      return teacherData.assignedClasses
        .map((item) => {
          if (typeof item === "string") return item;
          return item.className || item.class || item.classSection || "";
        })
        .filter(Boolean);
    }

    if (teacherData.class) {
      return teacherData.class
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  const normalizeAssignedSubjects = (teacherData) => {
    if (!teacherData) return [];

    if (Array.isArray(teacherData.assignedClasses)) {
      return [
        ...new Set(
          teacherData.assignedClasses
            .map((item) => {
              if (typeof item === "string") return teacherData.subject || "";
              return item.subject || teacherData.subject || "";
            })
            .filter(Boolean)
        ),
      ];
    }

    if (teacherData.subject) {
      return teacherData.subject
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  const normalizeExam = (exam) => {
    return {
      id: exam.id,
      examId: exam.examId || exam.exam_id || "",
      title: exam.title || exam.examTitle || exam.name || "",
      description: exam.description || exam.desc || "",
      className: exam.className || exam.class || "",
      subject: exam.subject || "",
      examType: exam.examType || exam.type || "",
      term: exam.term || "",
      date: exam.date || "",
      day: exam.day || "",
      startTime: exam.startTime || exam.time || "",
      endTime: exam.endTime || "",
      duration: exam.duration || "",
      maxMarks: exam.maxMarks || exam.max_marks || "",
      passMarks: exam.passMarks || exam.pass_marks || "",
      venue: exam.venue || "",
      room: exam.room || "",
      syllabus: Array.isArray(exam.syllabusTopics)
        ? exam.syllabusTopics.join("\n")
        : Array.isArray(exam.syllabus)
        ? exam.syllabus.join("\n")
        : exam.syllabus || "",
      syllabusTopics: Array.isArray(exam.syllabusTopics)
        ? exam.syllabusTopics
        : Array.isArray(exam.syllabus)
        ? exam.syllabus
        : exam.syllabus
        ? exam.syllabus.split(/\n|,/).map((item) => item.trim()).filter(Boolean)
        : [],
      instructions: exam.instructions || "",
      status: exam.status || "Upcoming",
      createdBy: exam.createdBy || "",
      createdAt: exam.createdAt || "",
      updatedAt: exam.updatedAt || "",
    };
  };

  const getLoggedTeacherData = async () => {
    const loggedTeacherId = localStorage.getItem("teacherId");

    const result = await getTeacherAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const foundTeacher = result.data.find(
        (teacher) => teacher.teacherId === loggedTeacherId
      );

      if (foundTeacher) {
        setTeacherClasses(normalizeAssignedClasses(foundTeacher));
        setTeacherSubjects(normalizeAssignedSubjects(foundTeacher));
      }
    }
  };

  const getAllExams = async () => {
    const result = await getExamAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setExamsList(Array.isArray(result.data) ? result.data : []);
    }
  };

  useEffect(() => {
    getLoggedTeacherData();
    getAllExams();
  }, []);

  const normalizedExams = useMemo(() => {
    return examsList.map((exam) => normalizeExam(exam));
  }, [examsList]);

  const classOptions =
    teacherClasses.length > 0 ? teacherClasses : allClassOptions;

  const subjectOptions =
    teacherSubjects.length > 0 ? teacherSubjects : allSubjects;

  const visibleExams = useMemo(() => {
    let data = normalizedExams;

    if (teacherClasses.length > 0) {
      data = data.filter((exam) => teacherClasses.includes(exam.className));
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter(
        (exam) =>
          exam.examId.toLowerCase().includes(keyword) ||
          exam.title.toLowerCase().includes(keyword) ||
          exam.subject.toLowerCase().includes(keyword) ||
          exam.className.toLowerCase().includes(keyword)
      );
    }

    if (classFilter !== "All Classes") {
      data = data.filter((exam) => exam.className === classFilter);
    }

    if (subjectFilter !== "All Subjects") {
      data = data.filter((exam) => exam.subject === subjectFilter);
    }

    if (examTypeFilter !== "All Exam Types") {
      data = data.filter((exam) => exam.examType === examTypeFilter);
    }

    return data;
  }, [
    normalizedExams,
    teacherClasses,
    searchTerm,
    classFilter,
    subjectFilter,
    examTypeFilter,
  ]);

  const generateExamId = () => {
    const year = new Date().getFullYear();
    let uniqueId = "";
    let isDuplicate = true;

    while (isDuplicate) {
      const randomNo = Math.floor(100 + Math.random() * 900);
      uniqueId = `EXM-${year}-${randomNo}`;
      isDuplicate = normalizedExams.some((exam) => exam.examId === uniqueId);
    }

    return uniqueId;
  };

  const getDayName = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-US", { weekday: "short" });
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

  const getStatusStyle = (status) => {
    if (status === "Upcoming") return "bg-blue-100 text-blue-600";
    if (status === "Ongoing") return "bg-purple-100 text-purple-600";
    if (status === "Completed") return "bg-green-100 text-green-600";
    return "bg-slate-100 text-slate-500";
  };

  const getClassColor = (index) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-orange-100 text-orange-500",
      "bg-purple-100 text-purple-600",
      "bg-cyan-100 text-cyan-600",
    ];

    return colors[index % colors.length];
  };

  const getPercentage = (value, total) => {
    if (!total) return "0.0%";
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  const totalExams = visibleExams.length;

  const upcomingExams = visibleExams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const completedExams = visibleExams.filter(
    (exam) => exam.status === "Completed"
  ).length;

  const draftExams = visibleExams.filter(
    (exam) => exam.status === "Draft"
  ).length;

  const ongoingExams = visibleExams.filter(
    (exam) => exam.status === "Ongoing"
  ).length;

  const statsCards = [
    {
      title: "Total Exams",
      value: totalExams,
      desc: "created exams",
      icon: <FaClipboardList />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-600",
      symbol: "↑",
    },
    {
      title: "Upcoming Exams",
      value: upcomingExams,
      desc: "scheduled exams",
      icon: <IoCalendarOutline />,
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
      text: "text-orange-500",
      symbol: "↑",
    },
    {
      title: "Completed Exams",
      value: completedExams,
      desc: "finished exams",
      icon: <IoCheckmarkCircle />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-600",
      symbol: "↑",
    },
    {
      title: "Average Score / Pass Rate",
      value: "82.6%",
      desc: "after results update",
      icon: <FaTrophy />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-purple-600",
      symbol: "↑",
    },
  ];

  const overviewData = [
    {
      name: "Upcoming",
      value: upcomingExams,
      percentage: getPercentage(upcomingExams, totalExams),
      color: "#2563eb",
    },
    {
      name: "Completed",
      value: completedExams,
      percentage: getPercentage(completedExams, totalExams),
      color: "#22c55e",
    },
    {
      name: "Draft",
      value: draftExams,
      percentage: getPercentage(draftExams, totalExams),
      color: "#f59e0b",
    },
    {
      name: "Ongoing",
      value: ongoingExams,
      percentage: getPercentage(ongoingExams, totalExams),
      color: "#7c3aed",
    },
  ];

  const classExamSummary = useMemo(() => {
    const classes =
      teacherClasses.length > 0
        ? teacherClasses
        : [...new Set(visibleExams.map((exam) => exam.className))];

    const colors = [
      "bg-blue-600",
      "bg-green-500",
      "bg-orange-500",
      "bg-purple-500",
      "bg-cyan-500",
    ];

    return classes
      .filter(Boolean)
      .map((className, index) => {
        const count = visibleExams.filter(
          (exam) => exam.className === className
        ).length;

        const percentage =
          totalExams > 0 ? ((count / totalExams) * 100).toFixed(1) : "0.0";

        return {
          className,
          percentage: `${percentage}%`,
          width: `${percentage}%`,
          color: colors[index % colors.length],
        };
      });
  }, [teacherClasses, visibleExams, totalExams]);

  const recentActivity = useMemo(() => {
    return [...visibleExams]
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt || b.date) -
          new Date(a.updatedAt || a.createdAt || a.date)
      )
      .slice(0, 4);
  }, [visibleExams]);

  const splitSyllabus = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) return value;

    return value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const buildExamPayload = () => {
    const syllabusTopics = splitSyllabus(formData.syllabus);

    return {
      ...formData,
      exam_id: formData.examId,
      examTitle: formData.title,
      name: formData.title,
      desc: formData.description,
      class: formData.className,
      type: formData.examType,
      max_marks: Number(formData.maxMarks),
      pass_marks: Number(formData.passMarks),
      syllabusTopics,
      syllabus: syllabusTopics,
      day: getDayName(formData.date),
      createdBy: localStorage.getItem("teacherId") || "Teacher",
      createdAt:
        isEditMode && selectedExam?.createdAt
          ? selectedExam.createdAt
          : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditDbId(null);
    setSelectedExam(null);

    setFormData({
      ...initialFormState,
      examId: generateExamId(),
      className: classOptions[0] || "",
      subject: subjectOptions[0] || "",
      examType: "Unit Test",
      term: "Term 1",
      date: new Date().toISOString().slice(0, 10),
      startTime: "09:00",
      endTime: "10:00",
      duration: "1 Hour",
      maxMarks: "50",
      passMarks: "20",
      status: "Upcoming",
    });

    setModalOpen(true);
  };

  const handleOpenEdit = (exam) => {
    setIsEditMode(true);
    setEditDbId(exam.id);
    setSelectedExam(exam);
    setViewOpen(false);

    setFormData({
      ...initialFormState,
      ...exam,
      syllabus: exam.syllabus || exam.syllabusTopics?.join("\n") || "",
    });

    setModalOpen(true);
  };

  const handleViewExam = (exam) => {
    setSelectedExam(exam);
    setViewOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditMode(false);
    setEditDbId(null);
    setSelectedExam(null);
    setFormData(initialFormState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Exam title is required");
      return false;
    }

    if (!formData.className.trim()) {
      toast.error("Class is required");
      return false;
    }

    if (!formData.subject.trim()) {
      toast.error("Subject is required");
      return false;
    }

    if (!formData.date.trim()) {
      toast.error("Exam date is required");
      return false;
    }

    if (!formData.startTime.trim()) {
      toast.error("Start time is required");
      return false;
    }

    if (!formData.maxMarks) {
      toast.error("Max marks is required");
      return false;
    }

    return true;
  };

  const handleSubmitExam = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = buildExamPayload();

    const result = isEditMode
      ? await updateExamAPI(editDbId, payload)
      : await registerExamAPI(payload);

    if (result?.status >= 200 && result?.status < 300) {
      toast.success(
        isEditMode ? "Exam updated successfully" : "Exam added successfully"
      );
      await getAllExams();
      handleCloseModal();
    } else {
      toast.error(isEditMode ? "Failed to update exam" : "Failed to add exam");
    }
  };

  const handleDeleteExam = async (exam) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${exam.title}?`
    );

    if (!confirmDelete) return;

    const result = await deleteExamAPI(exam.id);

    if (result?.status >= 200 && result?.status < 300) {
      toast.success("Exam deleted successfully");
      setViewOpen(false);
      setSelectedExam(null);
      await getAllExams();
    } else {
      toast.error("Failed to delete exam");
    }
  };

  const DetailItem = ({ label, value }) => (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2 last:border-b-0">
      <span className="text-slate-400 font-semibold">{label}</span>
      <span className="text-slate-800 font-bold text-right">
        {value || "Not added"}
      </span>
    </div>
  );

  const renderInput = (name, placeholder, type = "text", required = false) => (
    <input
      type={type}
      name={name}
      value={formData[name]}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
    />
  );

  const renderTextarea = (name, placeholder) => (
    <textarea
      name={name}
      value={formData[name]}
      onChange={handleChange}
      placeholder={placeholder}
      rows="3"
      className="px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
    ></textarea>
  );

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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-9 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="text-xl font-black text-slate-900">Exam Schedule</p>

            <button
              onClick={handleOpenAdd}
              className="h-11 px-4 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <IoAdd className="text-lg" />
              Create Exam
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-4 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

              <input
                type="text"
                placeholder="Search exams..."
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
              value={examTypeFilter}
              onChange={(e) => setExamTypeFilter(e.target.value)}
              className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
            >
              <option>All Exam Types</option>
              {examTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="w-full overflow-hidden">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-[12%]" />
                <col className="w-[18%]" />
                <col className="w-[10%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[9%]" />
                <col className="w-[7%]" />
                <col className="w-[12%]" />
                <col className="w-[8%]" />
              </colgroup>

              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Exam ID
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Exam Title
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Class
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Subject
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Date
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Time
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500 text-center">
                    Marks
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500 text-center">
                    Status
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500 text-center">
                    View
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleExams.length > 0 ? (
                  visibleExams.map((exam, index) => (
                    <tr
                      key={exam.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-2 py-4 text-xs font-bold text-slate-700 break-words leading-5">
                        {exam.examId}
                      </td>

                      <td className="px-2 py-4">
                        <p className="text-sm font-bold text-slate-900 leading-5 break-words">
                          {exam.title}
                        </p>

                        <p className="text-xs text-slate-400 mt-1 truncate">
                          {exam.examType}
                        </p>
                      </td>

                      <td className="px-2 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap ${getClassColor(
                            index
                          )}`}
                        >
                          {exam.className}
                        </span>
                      </td>

                      <td className="px-2 py-4 text-sm font-semibold text-slate-600 leading-5 break-words">
                        {exam.subject}
                      </td>

                      <td className="px-2 py-4">
                        <p className="text-sm font-semibold text-slate-700 leading-5">
                          {formatDate(exam.date)}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {exam.day || getDayName(exam.date)}
                        </p>
                      </td>

                      <td className="px-2 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">
                        {exam.startTime}
                      </td>

                      <td className="px-2 py-4 text-sm font-semibold text-slate-600 text-center">
                        {exam.maxMarks}
                      </td>

                      <td className="px-2 py-4 text-center">
                        <span
                          className={`inline-flex w-[78px] justify-center px-2 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap ${getStatusStyle(
                            exam.status
                          )}`}
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="py-10 text-center text-sm text-slate-400"
                    >
                      No exams found. Click Create Exam to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5">
            <p className="text-sm text-slate-500">
              Showing {visibleExams.length > 0 ? 1 : 0} to{" "}
              {visibleExams.length} of {visibleExams.length} exams
            </p>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                ←
              </button>

              <button className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold">
                1
              </button>

              <button className="w-9 h-9 rounded-lg border border-slate-100 text-slate-400 flex items-center justify-center">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-lg font-black text-slate-900 mb-4">
              Exam Overview
            </p>

            <div className="h-[170px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overviewData.filter((item) => item.value > 0)}
                    dataKey="value"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={2}
                  >
                    {overviewData
                      .filter((item) => item.value > 0)
                      .map((item, index) => (
                        <Cell key={index} fill={item.color} />
                      ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-3xl font-black text-slate-900">
                  {totalExams}
                </p>

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

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-lg font-black text-slate-900 mb-5">
              Class Exam Summary
            </p>

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

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-lg font-black text-slate-900 mb-5">
              Recent Exam Activity
            </p>

            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[40px_1fr] gap-3 items-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${getStatusStyle(
                        item.status
                      )} flex items-center justify-center text-xl`}
                    >
                      <FaClipboardList />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-5">
                        {item.title} created
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {item.className} • {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 text-center py-5">
                  No recent exam activity.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-slate-900">
                {isEditMode ? "Edit Exam" : "Create Exam"}
              </h2>

              <button
                onClick={handleCloseModal}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <form onSubmit={handleSubmitExam} className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Basic Exam Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="examId"
                    value={formData.examId}
                    readOnly
                    placeholder="Exam ID"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-bold outline-none text-sm"
                  />

                  {renderInput("title", "Exam Title", "text", true)}

                  <select
                    name="examType"
                    value={formData.examType}
                    onChange={handleChange}
                    required
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                  >
                    <option value="">Select Exam Type</option>
                    {examTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    required
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
                    required
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
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                  >
                    <option value="">Select Term</option>
                    {terms.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  {renderTextarea("description", "Exam Description")}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Date, Time & Marks
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {renderInput("date", "Exam Date", "date", true)}
                  {renderInput("startTime", "Start Time", "time", true)}
                  {renderInput("endTime", "End Time", "time")}
                  {renderInput("duration", "Duration")}
                  {renderInput("maxMarks", "Max Marks", "number", true)}
                  {renderInput("passMarks", "Pass Marks", "number")}
                  {renderInput("venue", "Venue")}
                  {renderInput("room", "Room Number")}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Syllabus & Instructions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderTextarea(
                    "syllabus",
                    "Syllabus topics. Add one topic per line or separate with comma."
                  )}

                  {renderTextarea("instructions", "Instructions for students")}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Exam Status
                </h3>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
              >
                {isEditMode ? "Update Exam" : "Create Exam"}
              </button>
            </form>
          </div>
        </div>
      )}

      {viewOpen && selectedExam && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Exam Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {selectedExam.examId} • {selectedExam.className}
                </p>
              </div>

              <button
                onClick={() => setViewOpen(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 mb-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {selectedExam.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedExam.description || "No description added"}
                  </p>
                </div>

                <span
                  className={`inline-flex px-4 py-2 rounded-xl text-sm font-bold ${getStatusStyle(
                    selectedExam.status
                  )}`}
                >
                  {selectedExam.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-sm">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Basic Information
                </h3>

                <DetailItem label="Exam ID" value={selectedExam.examId} />
                <DetailItem label="Exam Type" value={selectedExam.examType} />
                <DetailItem label="Class" value={selectedExam.className} />
                <DetailItem label="Subject" value={selectedExam.subject} />
                <DetailItem label="Term" value={selectedExam.term} />
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">Date & Time</h3>

                <DetailItem label="Date" value={formatDate(selectedExam.date)} />
                <DetailItem
                  label="Day"
                  value={selectedExam.day || getDayName(selectedExam.date)}
                />
                <DetailItem label="Start Time" value={selectedExam.startTime} />
                <DetailItem label="End Time" value={selectedExam.endTime} />
                <DetailItem label="Duration" value={selectedExam.duration} />
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Marks & Venue
                </h3>

                <DetailItem label="Max Marks" value={selectedExam.maxMarks} />
                <DetailItem label="Pass Marks" value={selectedExam.passMarks} />
                <DetailItem label="Venue" value={selectedExam.venue} />
                <DetailItem label="Room" value={selectedExam.room} />
                <DetailItem label="Status" value={selectedExam.status} />
              </div>

              <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5">
                <h3 className="font-black text-slate-900 mb-3">Syllabus</h3>

                {splitSyllabus(selectedExam.syllabus).length > 0 ? (
                  <ul className="space-y-2">
                    {splitSyllabus(selectedExam.syllabus).map((item, index) => (
                      <li
                        key={index}
                        className="text-sm font-semibold text-slate-600 flex gap-2"
                      >
                        <span className="text-blue-600">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400">No syllabus added.</p>
                )}
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h3 className="font-black text-slate-900 mb-3">
                  Instructions
                </h3>

                <p className="text-sm font-semibold text-slate-600 leading-7">
                  {selectedExam.instructions || "No instructions added."}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => handleOpenEdit(selectedExam)}
                className="flex-1 h-11 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <IoPencilOutline />
                Edit Exam
              </button>

              <button
                onClick={() => handleDeleteExam(selectedExam)}
                className="flex-1 h-11 rounded-xl bg-red-50 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-100"
              >
                <IoTrashOutline />
                Delete Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherExams;