import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  IoSearchOutline,
  IoAdd,
  IoEyeOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoCloseOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { FaClipboardList, FaTrophy } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import toast from "react-hot-toast";

import {
  getTeacherAPI,
  getStudentAPI,
  getExamAPI,
  getResultAPI,
  registerResultAPI,
  updateResultAPI,
  deleteResultAPI,
} from "../../services/allAPI";

const TeacherResults = () => {
  const [studentsList, setStudentsList] = useState([]);
  const [examsList, setExamsList] = useState([]);
  const [resultsList, setResultsList] = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [examTypeFilter, setExamTypeFilter] = useState("All Exam Types");

  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editDbId, setEditDbId] = useState(null);

  const initialFormState = {
    resultId: "",
    studentDbId: "",
    studentId: "",
    studentName: "",
    className: "",
    rollNo: "",
    examDbId: "",
    examId: "",
    examTitle: "",
    subject: "",
    examType: "",
    term: "",
    maxMarks: "",
    obtainedMarks: "",
    percentage: "",
    grade: "",
    status: "Published",
    remarks: "",
    publishedDate: new Date().toISOString().slice(0, 10),
  };

  const [formData, setFormData] = useState(initialFormState);

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

  const normalizeStudent = (student) => {
    return {
      id: student.id,
      studentId: student.studentId || student.student_id || "",
      name: student.name || student.student_name || "",
      email: student.email || student.student_email || "",
      className: student.className || student.student_class || "",
      rollNo: student.rollNo || student.student_rollno || "",
      status: student.status || "Active",
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
      maxMarks: exam.maxMarks || exam.max_marks || "",
      status: exam.status || "Upcoming",
      date: exam.date || "",
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
      rollNo: result.rollNo || result.roll_no || "",
      examDbId: result.examDbId || "",
      examId: result.examId || result.exam_id || "",
      examTitle: result.examTitle || result.exam || result.examName || "",
      subject: result.subject || "",
      examType: result.examType || result.type || "",
      term: result.term || "",
      maxMarks: result.maxMarks || result.max_marks || "",
      obtainedMarks: result.obtainedMarks || result.obtained_marks || "",
      percentage: result.percentage || "",
      grade: result.grade || "",
      score:
        result.score ||
        `${result.obtainedMarks || result.obtained_marks || 0} / ${
          result.maxMarks || result.max_marks || 0
        }`,
      status: result.status || "Published",
      remarks: result.remarks || "",
      publishedDate: result.publishedDate || result.published_date || "",
      createdAt: result.createdAt || "",
      updatedAt: result.updatedAt || "",
      createdBy: result.createdBy || "",
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

  const getAllStudents = async () => {
    const result = await getStudentAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setStudentsList(Array.isArray(result.data) ? result.data : []);
    }
  };

  const getAllExams = async () => {
    const result = await getExamAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setExamsList(Array.isArray(result.data) ? result.data : []);
    }
  };

  const getAllResults = async () => {
    const result = await getResultAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setResultsList(Array.isArray(result.data) ? result.data : []);
    }
  };

  useEffect(() => {
    getLoggedTeacherData();
    getAllStudents();
    getAllExams();
    getAllResults();
  }, []);

  const normalizedStudents = useMemo(() => {
    return studentsList.map((student) => normalizeStudent(student));
  }, [studentsList]);

  const normalizedExams = useMemo(() => {
    return examsList.map((exam) => normalizeExam(exam));
  }, [examsList]);

  const normalizedResults = useMemo(() => {
    return resultsList.map((result) => normalizeResult(result));
  }, [resultsList]);

  const classOptions = useMemo(() => {
    if (teacherClasses.length > 0) return teacherClasses;

    return [
      ...new Set(
        [
          ...normalizedStudents.map((student) => student.className),
          ...normalizedExams.map((exam) => exam.className),
          ...normalizedResults.map((result) => result.className),
        ].filter(Boolean)
      ),
    ];
  }, [teacherClasses, normalizedStudents, normalizedExams, normalizedResults]);

  const subjectOptions = useMemo(() => {
    if (teacherSubjects.length > 0) return teacherSubjects;

    return [
      ...new Set(
        [
          ...allSubjects,
          ...normalizedExams.map((exam) => exam.subject),
          ...normalizedResults.map((result) => result.subject),
        ].filter(Boolean)
      ),
    ];
  }, [teacherSubjects, normalizedExams, normalizedResults]);

  const studentOptions = useMemo(() => {
    let data = normalizedStudents.filter(
      (student) => student.status !== "Inactive"
    );

    if (teacherClasses.length > 0) {
      data = data.filter((student) =>
        teacherClasses.includes(student.className)
      );
    }

    return data;
  }, [normalizedStudents, teacherClasses]);

  const examOptions = useMemo(() => {
    let data = normalizedExams.filter((exam) => exam.status !== "Draft");

    if (teacherClasses.length > 0) {
      data = data.filter((exam) => teacherClasses.includes(exam.className));
    }

    return data;
  }, [normalizedExams, teacherClasses]);

  const visibleResults = useMemo(() => {
    let data = normalizedResults;

    if (teacherClasses.length > 0) {
      data = data.filter((result) =>
        teacherClasses.includes(result.className)
      );
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter(
        (result) =>
          result.resultId.toLowerCase().includes(keyword) ||
          result.studentName.toLowerCase().includes(keyword) ||
          result.studentId.toLowerCase().includes(keyword) ||
          result.examTitle.toLowerCase().includes(keyword) ||
          result.subject.toLowerCase().includes(keyword) ||
          result.className.toLowerCase().includes(keyword)
      );
    }

    if (classFilter !== "All Classes") {
      data = data.filter((result) => result.className === classFilter);
    }

    if (subjectFilter !== "All Subjects") {
      data = data.filter((result) => result.subject === subjectFilter);
    }

    if (examTypeFilter !== "All Exam Types") {
      data = data.filter((result) => result.examType === examTypeFilter);
    }

    return data;
  }, [
    normalizedResults,
    teacherClasses,
    searchTerm,
    classFilter,
    subjectFilter,
    examTypeFilter,
  ]);

  const generateResultId = () => {
    const year = new Date().getFullYear();
    let uniqueId = "";
    let isDuplicate = true;

    while (isDuplicate) {
      const randomNo = Math.floor(1000 + Math.random() * 9000);
      uniqueId = `RES-${year}-${randomNo}`;
      isDuplicate = normalizedResults.some(
        (result) => result.resultId === uniqueId
      );
    }

    return uniqueId;
  };

  const calculatePercentage = (obtained, max) => {
    const obtainedNumber = Number(obtained);
    const maxNumber = Number(max);

    if (!maxNumber || isNaN(obtainedNumber) || isNaN(maxNumber)) return "0.0";

    return ((obtainedNumber / maxNumber) * 100).toFixed(1);
  };

  const calculateGrade = (percentage) => {
    const value = Number(percentage);

    if (value >= 90) return "A+";
    if (value >= 75) return "A";
    if (value >= 60) return "B";
    if (value >= 45) return "C";
    return "D";
  };

  const getGradeColor = (grade) => {
    if (grade === "A+" || grade === "A") return "text-green-600";
    if (grade === "B") return "text-blue-600";
    if (grade === "C") return "text-orange-500";
    return "text-red-500";
  };

  const getStatusStyle = (status) => {
    if (status === "Published") return "bg-green-100 text-green-600";
    if (status === "Pending Review") return "bg-orange-100 text-orange-500";
    if (status === "Failed Recheck") return "bg-red-100 text-red-500";
    return "bg-blue-100 text-blue-600";
  };

  const getClassColor = (index) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-orange-100 text-orange-500",
      "bg-cyan-100 text-cyan-600",
    ];

    return colors[index % colors.length];
  };

  const getPercentageText = (value, total) => {
    if (!total) return "0.0%";
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  const totalResults = visibleResults.length;
  const publishedResults = visibleResults.filter(
    (result) => result.status === "Published"
  ).length;
  const pendingResults = visibleResults.filter(
    (result) => result.status === "Pending Review"
  ).length;
  const failedResults = visibleResults.filter(
    (result) => result.status === "Failed Recheck"
  ).length;
  const draftResults = visibleResults.filter(
    (result) => result.status === "Draft"
  ).length;

  const passRate =
    publishedResults > 0
      ? (
          (visibleResults.filter(
            (result) => result.status === "Published" && result.grade !== "D"
          ).length /
            publishedResults) *
          100
        ).toFixed(1)
      : "0.0";

  const topClass = useMemo(() => {
    const grouped = {};

    visibleResults.forEach((result) => {
      if (!grouped[result.className]) grouped[result.className] = [];
      grouped[result.className].push(Number(result.percentage || 0));
    });

    const classScores = Object.entries(grouped).map(([className, scores]) => ({
      className,
      average:
        scores.reduce((total, score) => total + score, 0) / scores.length || 0,
    }));

    classScores.sort((a, b) => b.average - a.average);

    return classScores[0] || { className: "N/A", average: 0 };
  }, [visibleResults]);

  const statsCards = [
    {
      title: "Total Results Published",
      value: publishedResults,
      desc: "published results",
      icon: <FaClipboardList />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-600",
      symbol: "↑",
    },
    {
      title: "Pending Evaluations",
      value: pendingResults,
      desc: "waiting for review",
      icon: <IoTimeOutline />,
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
      text: "text-orange-500",
      symbol: "↑",
    },
    {
      title: "Average Pass Rate",
      value: `${passRate}%`,
      desc: "published results",
      icon: <IoCheckmarkCircle />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-600",
      symbol: "↑",
    },
    {
      title: "Top Scoring Class",
      value: topClass.className,
      desc: `Average: ${topClass.average.toFixed(1)}%`,
      icon: <FaTrophy />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-slate-500",
      symbol: "",
    },
  ];

  const overviewData = [
    {
      name: "Published",
      value: publishedResults,
      percentage: getPercentageText(publishedResults, totalResults),
      color: "#22c55e",
    },
    {
      name: "Pending Review",
      value: pendingResults,
      percentage: getPercentageText(pendingResults, totalResults),
      color: "#f59e0b",
    },
    {
      name: "Failed Recheck",
      value: failedResults,
      percentage: getPercentageText(failedResults, totalResults),
      color: "#ef4444",
    },
    {
      name: "Draft",
      value: draftResults,
      percentage: getPercentageText(draftResults, totalResults),
      color: "#2563eb",
    },
  ];

  const classResultSummary = useMemo(() => {
    const classes =
      classOptions.length > 0
        ? classOptions
        : [...new Set(visibleResults.map((result) => result.className))];

    const colors = [
      "bg-green-500",
      "bg-blue-600",
      "bg-orange-500",
      "bg-purple-500",
      "bg-cyan-500",
    ];

    return classes
      .filter(Boolean)
      .map((className, index) => {
        const classResults = visibleResults.filter(
          (result) => result.className === className
        );

        const average =
          classResults.length > 0
            ? classResults.reduce(
                (total, result) => total + Number(result.percentage || 0),
                0
              ) / classResults.length
            : 0;

        return {
          className,
          percentage: `${average.toFixed(1)}%`,
          width: `${average}%`,
          color: colors[index % colors.length],
        };
      });
  }, [classOptions, visibleResults]);

  const recentActivity = useMemo(() => {
    return [...visibleResults]
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt || b.publishedDate) -
          new Date(a.updatedAt || a.createdAt || a.publishedDate)
      )
      .slice(0, 4);
  }, [visibleResults]);

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditDbId(null);
    setSelectedResult(null);

    setFormData({
      ...initialFormState,
      resultId: generateResultId(),
      publishedDate: new Date().toISOString().slice(0, 10),
    });

    setModalOpen(true);
  };

  const handleStudentSelect = (studentDbId) => {
    const selectedStudent = studentOptions.find(
      (student) => String(student.id) === String(studentDbId)
    );

    if (!selectedStudent) return;

    setFormData((prev) => ({
      ...prev,
      studentDbId: selectedStudent.id,
      studentId: selectedStudent.studentId,
      studentName: selectedStudent.name,
      className: selectedStudent.className,
      rollNo: selectedStudent.rollNo,
      examDbId: "",
      examId: "",
      examTitle: "",
      subject: "",
      examType: "",
      term: "",
      maxMarks: "",
    }));
  };

  const handleExamSelect = (examDbId) => {
    const selectedExam = examOptions.find(
      (exam) => String(exam.id) === String(examDbId)
    );

    if (!selectedExam) return;

    setFormData((prev) => ({
      ...prev,
      examDbId: selectedExam.id,
      examId: selectedExam.examId,
      examTitle: selectedExam.title,
      className: selectedExam.className || prev.className,
      subject: selectedExam.subject,
      examType: selectedExam.examType,
      term: selectedExam.term,
      maxMarks: selectedExam.maxMarks,
    }));
  };

  const handleOpenEdit = (result) => {
    setIsEditMode(true);
    setEditDbId(result.id);
    setSelectedResult(result);
    setViewOpen(false);

    setFormData({
      ...initialFormState,
      ...result,
      obtainedMarks: result.obtainedMarks,
      maxMarks: result.maxMarks,
    });

    setModalOpen(true);
  };

  const handleViewResult = (result) => {
    setSelectedResult(result);
    setViewOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditMode(false);
    setEditDbId(null);
    setSelectedResult(null);
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
    if (!formData.studentDbId) {
      toast.error("Select a student");
      return false;
    }

    if (!formData.examDbId) {
      toast.error("Select an exam");
      return false;
    }

    if (formData.obtainedMarks === "") {
      toast.error("Enter obtained marks");
      return false;
    }

    if (Number(formData.obtainedMarks) > Number(formData.maxMarks)) {
      toast.error("Obtained marks cannot be greater than max marks");
      return false;
    }

    return true;
  };

  const buildResultPayload = () => {
    const percentage = calculatePercentage(
      formData.obtainedMarks,
      formData.maxMarks
    );

    const grade = calculateGrade(percentage);

    return {
      ...formData,
      result_id: formData.resultId,
      student_id: formData.studentId,
      student_name: formData.studentName,
      class: formData.className,
      roll_no: formData.rollNo,
      exam_id: formData.examId,
      exam: formData.examTitle,
      type: formData.examType,
      max_marks: Number(formData.maxMarks),
      obtained_marks: Number(formData.obtainedMarks),
      percentage,
      grade,
      score: `${formData.obtainedMarks} / ${formData.maxMarks}`,
      published_date: formData.publishedDate,
      createdBy: localStorage.getItem("teacherId") || "Teacher",
      createdAt:
        isEditMode && selectedResult?.createdAt
          ? selectedResult.createdAt
          : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const handleSubmitResult = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = buildResultPayload();

    const result = isEditMode
      ? await updateResultAPI(editDbId, payload)
      : await registerResultAPI(payload);

    if (result?.status >= 200 && result?.status < 300) {
      toast.success(
        isEditMode
          ? "Result updated successfully"
          : "Result published successfully"
      );
      await getAllResults();
      handleCloseModal();
    } else {
      toast.error(isEditMode ? "Failed to update result" : "Failed to add result");
    }
  };

  const handleDeleteResult = async (result) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete result of ${result.studentName}?`
    );

    if (!confirmDelete) return;

    const response = await deleteResultAPI(result.id);

    if (response?.status >= 200 && response?.status < 300) {
      toast.success("Result deleted successfully");
      setViewOpen(false);
      setSelectedResult(null);
      await getAllResults();
    } else {
      toast.error("Failed to delete result");
    }
  };

  const filteredExamOptions = useMemo(() => {
    if (!formData.className) return examOptions;

    return examOptions.filter((exam) => exam.className === formData.className);
  }, [examOptions, formData.className]);

  const currentPercentage = calculatePercentage(
    formData.obtainedMarks,
    formData.maxMarks
  );

  const currentGrade = calculateGrade(currentPercentage);

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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-9 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="text-xl font-black text-slate-900">
              Results Register
            </p>

            <button
              onClick={handleOpenAdd}
              className="h-11 px-4 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <IoAdd className="text-lg" />
              Publish Results
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-4 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

              <input
                type="text"
                placeholder="Search students or results..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
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
              className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
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
                <col className="w-[13%]" />
                <col className="w-[18%]" />
                <col className="w-[10%]" />
                <col className="w-[12%]" />
                <col className="w-[16%]" />
                <col className="w-[9%]" />
                <col className="w-[7%]" />
                <col className="w-[10%]" />
                <col className="w-[5%]" />
              </colgroup>

              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Result ID
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Student
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Class
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Subject
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Exam
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500">
                    Score
                  </th>
                  <th className="px-2 py-3 text-xs font-bold text-slate-500 text-center">
                    Grade
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
                {visibleResults.length > 0 ? (
                  visibleResults.map((result, index) => (
                    <tr
                      key={result.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-2 py-4 text-xs font-bold text-slate-700 break-words leading-5">
                        {result.resultId}
                      </td>

                      <td className="px-2 py-4">
                        <p className="text-sm font-bold text-slate-900 leading-5 break-words">
                          {result.studentName}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 truncate">
                          {result.studentId}
                        </p>
                      </td>

                      <td className="px-2 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap ${getClassColor(
                            index
                          )}`}
                        >
                          {result.className}
                        </span>
                      </td>

                      <td className="px-2 py-4 text-sm font-semibold text-slate-600 break-words">
                        {result.subject}
                      </td>

                      <td className="px-2 py-4 text-sm font-semibold text-slate-600 leading-5 break-words">
                        {result.examTitle}
                      </td>

                      <td className="px-2 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">
                        {result.score}
                      </td>

                      <td
                        className={`px-2 py-4 text-sm font-black text-center ${getGradeColor(
                          result.grade
                        )}`}
                      >
                        {result.grade}
                      </td>

                      <td className="px-2 py-4 text-center">
                        <span
                          className={`inline-flex w-[86px] justify-center px-2 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap ${getStatusStyle(
                            result.status
                          )}`}
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="py-10 text-center text-sm text-slate-400"
                    >
                      No results found. Click Publish Results to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5">
            <p className="text-sm text-slate-500">
              Showing {visibleResults.length > 0 ? 1 : 0} to{" "}
              {visibleResults.length} of {visibleResults.length} results
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
              Results Overview
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
                <h3 className="text-2xl font-black text-slate-900">
                  {totalResults}
                </h3>
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

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-lg font-black text-slate-900 mb-5">
              Class Result Summary
            </p>

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

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-lg font-black text-slate-900 mb-5">
              Recent Result Activity
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
                      <MdBarChart />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-5">
                        {item.studentName} result {item.status.toLowerCase()}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.examTitle} • {item.className}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 text-center py-5">
                  No recent result activity.
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
                {isEditMode ? "Edit Result" : "Publish Result"}
              </h2>

              <button
                onClick={handleCloseModal}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <form onSubmit={handleSubmitResult} className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Student & Exam Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="resultId"
                    value={formData.resultId}
                    readOnly
                    placeholder="Result ID"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-bold outline-none text-sm"
                  />

                  <select
                    value={formData.studentDbId}
                    onChange={(e) => handleStudentSelect(e.target.value)}
                    required
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                  >
                    <option value="">Select Student</option>
                    {studentOptions.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} - {student.className}
                      </option>
                    ))}
                  </select>

                  <select
                    value={formData.examDbId}
                    onChange={(e) => handleExamSelect(e.target.value)}
                    required
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                  >
                    <option value="">Select Exam</option>
                    {filteredExamOptions.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.title} - {exam.subject}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={formData.studentId}
                    readOnly
                    placeholder="Student ID"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none text-sm"
                  />

                  <input
                    type="text"
                    value={formData.className}
                    readOnly
                    placeholder="Class"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none text-sm"
                  />

                  <input
                    type="text"
                    value={formData.rollNo}
                    readOnly
                    placeholder="Roll No"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none text-sm"
                  />

                  <input
                    type="text"
                    value={formData.subject}
                    readOnly
                    placeholder="Subject"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none text-sm"
                  />

                  <input
                    type="text"
                    value={formData.examType}
                    readOnly
                    placeholder="Exam Type"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none text-sm"
                  />

                  <input
                    type="text"
                    value={formData.term}
                    readOnly
                    placeholder="Term"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Marks & Status
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="number"
                    name="maxMarks"
                    value={formData.maxMarks}
                    onChange={handleChange}
                    placeholder="Max Marks"
                    required
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />

                  <input
                    type="number"
                    name="obtainedMarks"
                    value={formData.obtainedMarks}
                    onChange={handleChange}
                    placeholder="Obtained Marks"
                    required
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />

                  <input
                    type="text"
                    value={`${currentPercentage}%`}
                    readOnly
                    placeholder="Percentage"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none text-sm"
                  />

                  <input
                    type="text"
                    value={currentGrade}
                    readOnly
                    placeholder="Grade"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none text-sm"
                  />

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="md:col-span-2 h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                  >
                    <option value="Published">Published</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Draft">Draft</option>
                    <option value="Failed Recheck">Failed Recheck</option>
                  </select>

                  <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
                    onChange={handleChange}
                    className="md:col-span-2 h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Teacher Remarks
                </h3>

                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter remarks for student..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
              >
                {isEditMode ? "Update Result" : "Publish Result"}
              </button>
            </form>
          </div>
        </div>
      )}

      {viewOpen && selectedResult && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Result Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {selectedResult.resultId} • {selectedResult.studentName}
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
                    {selectedResult.studentName}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedResult.examTitle} • {selectedResult.subject}
                  </p>
                </div>

                <span
                  className={`inline-flex px-4 py-2 rounded-xl text-sm font-bold ${getStatusStyle(
                    selectedResult.status
                  )}`}
                >
                  {selectedResult.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-sm">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Student Information
                </h3>
                <DetailItem label="Student ID" value={selectedResult.studentId} />
                <DetailItem label="Name" value={selectedResult.studentName} />
                <DetailItem label="Class" value={selectedResult.className} />
                <DetailItem label="Roll No" value={selectedResult.rollNo} />
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Exam Information
                </h3>
                <DetailItem label="Exam ID" value={selectedResult.examId} />
                <DetailItem label="Exam" value={selectedResult.examTitle} />
                <DetailItem label="Subject" value={selectedResult.subject} />
                <DetailItem label="Exam Type" value={selectedResult.examType} />
                <DetailItem label="Term" value={selectedResult.term} />
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Result Information
                </h3>
                <DetailItem label="Score" value={selectedResult.score} />
                <DetailItem
                  label="Percentage"
                  value={`${selectedResult.percentage}%`}
                />
                <DetailItem label="Grade" value={selectedResult.grade} />
                <DetailItem label="Status" value={selectedResult.status} />
                <DetailItem
                  label="Published Date"
                  value={selectedResult.publishedDate}
                />
              </div>

              <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-5">
                <h3 className="font-black text-slate-900 mb-3">
                  Teacher Remarks
                </h3>

                <p className="text-sm font-semibold text-slate-600 leading-7">
                  {selectedResult.remarks || "No remarks added."}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => handleOpenEdit(selectedResult)}
                className="flex-1 h-11 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <IoPencilOutline />
                Edit Result
              </button>

              <button
                onClick={() => handleDeleteResult(selectedResult)}
                className="flex-1 h-11 rounded-xl bg-red-50 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-100"
              >
                <IoTrashOutline />
                Delete Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherResults;