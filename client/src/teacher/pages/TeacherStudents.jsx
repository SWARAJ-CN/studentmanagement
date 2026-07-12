import React, { useEffect, useMemo, useState } from "react";

import { IoSearchOutline } from "react-icons/io5";
import {
  IoAdd,
  IoEyeOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineGroups } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

import {
  getTeacherAPI,
  getStudentAPI,
  registerStudentAPI,
  updateStudentAPI,
  deleteStudentAPI,
} from "../../services/allAPI";

const TeacherStudents = () => {
  const [studentsList, setStudentsList] = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editDbId, setEditDbId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const initialFormState = {
    studentId: "",
    password: "",
    name: "",
    image: "",
    email: "",
    phone: "",

    className: "",
    rollNo: "",
    admissionNo: "",
    academicYear: "",
    section: "",
    admissionDate: "",

    dob: "",
    gender: "",
    bloodGroup: "",
    nationality: "",
    religion: "",
    aadharNumber: "",

    fatherName: "",
    motherName: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianOccupation: "",
    guardianIncome: "",

    permanentAddress: "",
    currentAddress: "",
    emergencyContact: "",

    username: "",
    gpa: "8.45",
    pendingAssignments: 2,
    upcomingExams: 1,
    feeStatus: "Paid",
    status: "Active",
    createdAt: "",
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

  const classOptions =
    teacherClasses.length > 0 ? teacherClasses : allClassOptions;

  const avatarColors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-red-100 text-red-500",
    "bg-green-100 text-green-600",
    "bg-orange-100 text-orange-500",
    "bg-teal-100 text-teal-600",
    "bg-pink-100 text-pink-600",
  ];

  const classColors = [
    "bg-purple-100 text-purple-600",
    "bg-blue-100 text-blue-600",
    "bg-violet-100 text-violet-600",
    "bg-green-100 text-green-600",
    "bg-orange-100 text-orange-500",
    "bg-cyan-100 text-cyan-600",
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

  const normalizeStudent = (student) => {
    return {
      studentId: student.studentId || student.student_id || "",
      password: student.password || student.student_pass || "",
      name: student.name || student.student_name || "",
      image: student.image || student.student_image || "",
      email: student.email || student.student_email || "",
      phone: student.phone || student.student_phone || "",

      className: student.className || student.student_class || "",
      rollNo: student.rollNo || student.student_rollno || "",
      admissionNo: student.admissionNo || student.student_addno || "",
      academicYear: student.academicYear || student.student_acc_year || "",
      section: student.section || student.student_section || "",
      admissionDate: student.admissionDate || student.student_add_date || "",

      dob: student.dob || student.student_dob || "",
      gender: student.gender || student.student_gender || "",
      bloodGroup: student.bloodGroup || student.student_bg || "",
      nationality: student.nationality || student.student_nation || "",
      religion: student.religion || student.student_reli || "",
      aadharNumber: student.aadharNumber || student.student_addar || "",

      fatherName: student.fatherName || student.student_fname || "",
      motherName: student.motherName || student.student_mname || "",
      guardianPhone:
        student.guardianPhone || student.student_gphone || student.parentContact || "",
      guardianEmail: student.guardianEmail || student.student_gemail || "",
      guardianOccupation:
        student.guardianOccupation || student.student_goccup || "",
      guardianIncome: student.guardianIncome || student.student_gincome || "",

      permanentAddress:
        student.permanentAddress || student.student_paddress || "",
      currentAddress: student.currentAddress || student.student_curradd || "",
      emergencyContact:
        student.emergencyContact || student.student_em_contact || "",

      username: student.username || "",
      attendance: student.attendance ?? 0,
      gpa: student.gpa || "8.45",
      pendingAssignments: student.pendingAssignments ?? 2,
      upcomingExams: student.upcomingExams ?? 1,
      feeStatus: student.feeStatus || "Paid",
      status: student.status || "Active",
      createdAt: student.createdAt || new Date().toISOString(),
      id: student.id,
    };
  };

  const getLoggedTeacherClasses = async () => {
    const loggedTeacherId = localStorage.getItem("teacherId");

    const result = await getTeacherAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const foundTeacher = result.data.find(
        (teacher) => teacher.teacherId === loggedTeacherId
      );

      if (foundTeacher) {
        setTeacherClasses(normalizeAssignedClasses(foundTeacher));
      }
    }
  };

  const getAllStudents = async () => {
    const result = await getStudentAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setStudentsList(Array.isArray(result.data) ? result.data : []);
    }
  };

  useEffect(() => {
    getLoggedTeacherClasses();
    getAllStudents();
  }, []);

  const normalizedStudents = useMemo(() => {
    return studentsList.map((student) => normalizeStudent(student));
  }, [studentsList]);

  const generateStudentId = () => {
    const year = new Date().getFullYear();
    let uniqueId = "";
    let isDuplicate = true;

    while (isDuplicate) {
      const randomNo = Math.floor(100 + Math.random() * 900);
      uniqueId = `SMI-${year}-${randomNo}`;

      isDuplicate = normalizedStudents.some(
        (student) => student.studentId === uniqueId
      );
    }

    return uniqueId;
  };

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
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

  const visibleStudents = useMemo(() => {
    let data = normalizedStudents;

    if (teacherClasses.length > 0) {
      data = data.filter((student) =>
        teacherClasses.includes(student.className)
      );
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter(
        (student) =>
          student.name?.toLowerCase().includes(keyword) ||
          student.studentId?.toLowerCase().includes(keyword) ||
          student.email?.toLowerCase().includes(keyword) ||
          student.phone?.toLowerCase().includes(keyword) ||
          student.guardianPhone?.toLowerCase().includes(keyword)
      );
    }

    if (classFilter !== "All Classes") {
      data = data.filter((student) => student.className === classFilter);
    }

    if (statusFilter !== "All Status") {
      data = data.filter((student) => student.status === statusFilter);
    }

    return data;
  }, [normalizedStudents, teacherClasses, searchTerm, classFilter, statusFilter]);

  const activeStudents = visibleStudents.filter(
    (student) => student.status === "Active"
  );

  const atRiskStudents = visibleStudents.filter(
    (student) => student.status === "At Risk"
  );

  const inactiveStudents = visibleStudents.filter(
    (student) => student.status === "Inactive"
  );

  const newAdmissions = visibleStudents.filter((student) => {
    if (!student.createdAt) return false;

    const createdDate = new Date(student.createdAt);
    const now = new Date();

    return (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    );
  });

  const overviewData = [
    {
      name: "Active Students",
      value: activeStudents.length,
      color: "#22c55e",
    },
    {
      name: "At Risk Students",
      value: atRiskStudents.length,
      color: "#f97316",
    },
    {
      name: "Inactive Students",
      value: inactiveStudents.length,
      color: "#ef4444",
    },
  ];

  const classDistribution = useMemo(() => {
    const classes =
      teacherClasses.length > 0
        ? teacherClasses
        : [...new Set(normalizedStudents.map((student) => student.className))];

    return classes
      .filter(Boolean)
      .map((className, index) => {
        const count = visibleStudents.filter(
          (student) => student.className === className
        ).length;

        const percentage =
          visibleStudents.length > 0
            ? ((count / visibleStudents.length) * 100).toFixed(1)
            : 0;

        const colors = [
          "bg-purple-600",
          "bg-orange-500",
          "bg-green-500",
          "bg-blue-600",
          "bg-violet-500",
          "bg-cyan-500",
        ];

        return {
          className,
          students: count,
          percentage: `${percentage}%`,
          color: colors[index % colors.length],
          dot: colors[index % colors.length],
        };
      });
  }, [teacherClasses, visibleStudents, normalizedStudents]);

  const recentAdmissions = [...visibleStudents]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 4);

  const statsCards = [
    {
      title: "Total Students",
      value: visibleStudents.length,
      desc: `${newAdmissions.length} new this month`,
      icon: <PiStudentFill />,
      bg: "bg-green-500",
      lightBg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Active Students",
      value: activeStudents.length,
      desc: "currently active",
      icon: <FaRegUser />,
      bg: "bg-purple-600",
      lightBg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "New Admissions",
      value: newAdmissions.length,
      desc: "this month",
      icon: <IoAdd />,
      bg: "bg-blue-600",
      lightBg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Student Groups",
      value: classDistribution.length,
      desc: "assigned sections",
      icon: <MdOutlineGroups />,
      bg: "bg-orange-500",
      lightBg: "bg-orange-50",
      text: "text-orange-500",
      symbol: "≈",
    },
  ];

  const buildStudentPayload = () => {
    return {
      ...formData,

      student_id: formData.studentId,
      student_pass: formData.password,
      student_name: formData.name,
      student_image: formData.image,
      student_email: formData.email,
      student_phone: formData.phone,

      student_class: formData.className,
      student_rollno: formData.rollNo,
      student_addno: formData.admissionNo,
      student_acc_year: formData.academicYear,
      student_section: formData.section,
      student_add_date: formData.admissionDate,

      student_dob: formData.dob,
      student_gender: formData.gender,
      student_bg: formData.bloodGroup,
      student_nation: formData.nationality,
      student_reli: formData.religion,
      student_addar: formData.aadharNumber,

      student_fname: formData.fatherName,
      student_mname: formData.motherName,
      student_gphone: formData.guardianPhone,
      student_gemail: formData.guardianEmail,
      student_goccup: formData.guardianOccupation,
      student_gincome: formData.guardianIncome,

      student_paddress: formData.permanentAddress,
      student_curradd: formData.currentAddress,
      student_em_contact: formData.emergencyContact,

      parentContact: formData.guardianPhone,

      attendance:
        selectedStudent?.attendance ||
        normalizedStudents.find((student) => student.id === editDbId)
          ?.attendance ||
        0,

      pendingAssignments: Number(formData.pendingAssignments),
      upcomingExams: Number(formData.upcomingExams),
      createdAt: formData.createdAt || new Date().toISOString(),
    };
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditDbId(null);
    setSelectedStudent(null);

    setFormData({
      ...initialFormState,
      studentId: generateStudentId(),
      className: teacherClasses[0] || "",
      academicYear: "2026-2027",
      section: "A",
      admissionDate: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    });

    setModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setIsEditMode(true);
    setEditDbId(student.id);
    setSelectedStudent(student);
    setViewOpen(false);

    setFormData({
      ...initialFormState,
      ...student,
    });

    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditMode(false);
    setEditDbId(null);
    setSelectedStudent(null);
    setFormData(initialFormState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "pendingAssignments" || name === "upcomingExams"
          ? Number(value)
          : value,
    }));
  };

  const validateForm = () => {
    if (!formData.studentId.trim()) {
      toast.error("Student ID is required");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }

    if (!formData.name.trim()) {
      toast.error("Student name is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Student phone is required");
      return false;
    }

    if (!formData.className.trim()) {
      toast.error("Class is required");
      return false;
    }

    if (!formData.rollNo.trim()) {
      toast.error("Roll number is required");
      return false;
    }

    if (!formData.admissionNo.trim()) {
      toast.error("Admission number is required");
      return false;
    }

    if (!formData.guardianPhone.trim()) {
      toast.error("Guardian phone is required");
      return false;
    }

    const duplicateStudent = normalizedStudents.find(
      (student) =>
        student.studentId?.toLowerCase() ===
          formData.studentId.trim().toLowerCase() && student.id !== editDbId
    );

    if (duplicateStudent) {
      toast.error("Student ID already exists");
      return false;
    }

    const duplicateEmail = normalizedStudents.find(
      (student) =>
        student.email?.toLowerCase() === formData.email.trim().toLowerCase() &&
        student.id !== editDbId
    );

    if (duplicateEmail) {
      toast.error("Email already exists");
      return false;
    }

    return true;
  };

  const handleSubmitStudent = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const studentPayload = buildStudentPayload();

    if (isEditMode) {
      const result = await updateStudentAPI(editDbId, studentPayload);

      if (result?.status >= 200 && result?.status < 300) {
        const loggedStudentDbId = localStorage.getItem("studentDbId");

        if (loggedStudentDbId === editDbId) {
          localStorage.setItem("studentData", JSON.stringify(result.data));
        }

        toast.success("Student updated successfully");
        await getAllStudents();
        handleCloseModal();
      } else {
        toast.error("Failed to update student");
      }
    } else {
      const result = await registerStudentAPI(studentPayload);

      if (result?.status >= 200 && result?.status < 300) {
        toast.success("Student added successfully");
        await getAllStudents();
        handleCloseModal();
      } else {
        toast.error("Failed to add student");
      }
    }
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setViewOpen(true);
  };

  const handleDelete = async (student) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmDelete) return;

    const result = await deleteStudentAPI(student.id);

    if (result?.status >= 200 && result?.status < 300) {
      const loggedStudentDbId = localStorage.getItem("studentDbId");
      const loggedStudentId = localStorage.getItem("studentId");

      if (
        loggedStudentDbId === student.id ||
        loggedStudentId === student.studentId
      ) {
        localStorage.removeItem("studentAuth");
        localStorage.removeItem("studentId");
        localStorage.removeItem("studentDbId");
        localStorage.removeItem("studentData");
        localStorage.removeItem("rememberStudent");
      }

      toast.success("Student deleted successfully");
      setViewOpen(false);
      setSelectedStudent(null);
      await getAllStudents();
    } else {
      toast.error("Failed to delete student");
    }
  };

  const renderInput = (
    name,
    placeholder,
    type = "text",
    required = false,
    className = ""
  ) => (
    <input
      type={type}
      name={name}
      value={formData[name]}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      className={`h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all ${className}`}
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

  const detailItem = (label, value) => (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
      <span className="text-slate-400 font-semibold">{label}</span>
      <span className="text-slate-800 font-bold text-right">
        {value || "Not added"}
      </span>
    </div>
  );

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

      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-5 items-start">
        <div className="2xl:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
            <h2 className="text-xl font-black text-slate-900">
              Student Directory
            </h2>

            <button
              onClick={handleOpenAdd}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
            >
              <IoAdd className="text-lg" />
              Add Student
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-5 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search students by name, ID or contact..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>At Risk</option>
              <option>Inactive</option>
            </select>

            <button className="md:col-span-1 h-11 rounded-xl border border-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold hover:bg-slate-50">
              <IoFilterOutline />
            </button>
          </div>

          <div className="w-full">
            <div className="hidden lg:grid grid-cols-[1.9fr_0.8fr_0.5fr_1fr_0.8fr_60px] bg-slate-50 rounded-xl">
              <div className="px-4 py-3 text-xs font-bold text-slate-500">
                Student
              </div>
              <div className="px-4 py-3 text-xs font-bold text-slate-500">
                Class
              </div>
              <div className="px-4 py-3 text-xs font-bold text-slate-500">
                Roll
              </div>
              <div className="px-4 py-3 text-xs font-bold text-slate-500">
                Guardian
              </div>
              <div className="px-4 py-3 text-xs font-bold text-slate-500">
                Status
              </div>
              <div className="px-4 py-3 text-xs font-bold text-slate-500 text-center">
                View
              </div>
            </div>

            <div>
              {visibleStudents.length > 0 ? (
                visibleStudents.map((student, index) => (
                  <div
                    key={student.id}
                    className="grid grid-cols-1 lg:grid-cols-[1.9fr_0.8fr_0.5fr_1fr_0.8fr_60px] lg:items-center border-b border-slate-100 last:border-b-0 py-4 lg:py-0 gap-3 lg:gap-0"
                  >
                    <div className="px-0 lg:px-4 lg:py-4">
                      <div className="flex items-center gap-3">
                        {student.image ? (
                          <img
                            src={student.image}
                            alt={student.name}
                            className="w-11 h-11 rounded-full object-cover border border-slate-100"
                          />
                        ) : (
                          <span
                            className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                              avatarColors[index % avatarColors.length]
                            }`}
                          >
                            {getInitials(student.name)}
                          </span>
                        )}

                        <div className="min-w-0">
                          <h3 className="text-sm font-black text-slate-900 truncate">
                            {student.name}
                          </h3>
                          <p className="text-xs text-slate-400 truncate">
                            {student.studentId} • {student.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-0 lg:px-4">
                      <p className="lg:hidden text-xs font-bold text-slate-400 mb-1">
                        Class
                      </p>
                      <span
                        className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
                          classColors[index % classColors.length]
                        }`}
                      >
                        {student.className}
                      </span>
                    </div>

                    <div className="px-0 lg:px-4">
                      <p className="lg:hidden text-xs font-bold text-slate-400 mb-1">
                        Roll
                      </p>
                      <p className="text-sm font-semibold text-slate-700">
                        {student.rollNo}
                      </p>
                    </div>

                    <div className="px-0 lg:px-4">
                      <p className="lg:hidden text-xs font-bold text-slate-400 mb-1">
                        Guardian
                      </p>
                      <p className="text-sm font-semibold text-slate-600 truncate">
                        {student.guardianPhone || student.phone}
                      </p>
                    </div>

                    <div className="px-0 lg:px-4">
                      <p className="lg:hidden text-xs font-bold text-slate-400 mb-1">
                        Status
                      </p>
                      <span
                        className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : student.status === "At Risk"
                            ? "bg-orange-100 text-orange-500"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>

                    <div className="px-0 lg:px-4 lg:py-4">
                      <button
                        onClick={() => handleView(student)}
                        title="View Student"
                        className="w-9 h-9 rounded-lg border border-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors lg:mx-auto"
                      >
                        <IoEyeOutline />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-sm text-slate-400">
                  No students found. Click Add Student to create one.
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
            <p className="text-sm text-slate-500">
              Showing {visibleStudents.length > 0 ? 1 : 0} to{" "}
              {visibleStudents.length} of {visibleStudents.length} students
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

        <div className="2xl:col-span-4 space-y-5">
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
                <h3 className="text-2xl font-black text-slate-900">
                  {visibleStudents.length}
                </h3>
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
            <h2 className="text-lg font-black text-slate-900 mb-5">
              Recent Admissions
            </h2>

            <div className="space-y-4">
              {recentAdmissions.length > 0 ? (
                recentAdmissions.map((item) => (
                  <div
                    key={item.id}
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
                      <p className="text-xs text-slate-500">
                        {formatDate(item.createdAt)}
                      </p>
                      <span className="inline-block mt-1 px-2 py-1 rounded-lg bg-green-100 text-green-600 text-xs font-bold">
                        New
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 text-center py-5">
                  No recent admissions.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-slate-900">
            Class Distribution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6">
          {classDistribution.length > 0 ? (
            classDistribution.map((item, index) => (
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
            ))
          ) : (
            <p className="text-sm text-slate-400">No class data available.</p>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-slate-900">
                {isEditMode ? "Edit Student" : "Add Student"}
              </h2>

              <button
                onClick={handleCloseModal}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <form onSubmit={handleSubmitStudent} className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Login & Basic Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    readOnly
                    placeholder="Student ID"
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-bold outline-none text-sm"
                  />

                  {renderInput("password", "Login Password", "password", true)}
                  {renderInput("name", "Student Name", "text", true)}
                  {renderInput("image", "Student Image URL")}
                  {renderInput("email", "Student Email", "email", true)}
                  {renderInput("phone", "Student Phone", "text", true)}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Academic Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                  {renderInput("rollNo", "Roll No", "text", true)}
                  {renderInput("admissionNo", "Admission No", "text", true)}
                  {renderInput("academicYear", "Academic Year")}
                  {renderInput("section", "Section / Semester")}
                  {renderInput("admissionDate", "Admission Date", "date")}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Personal Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {renderInput("dob", "Date of Birth", "date")}

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  {renderInput("bloodGroup", "Blood Group")}
                  {renderInput("nationality", "Nationality")}
                  {renderInput("religion", "Religion")}
                  {renderInput("aadharNumber", "Aadhar Number")}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Parent / Guardian Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {renderInput("fatherName", "Father's Name")}
                  {renderInput("motherName", "Mother's Name")}
                  {renderInput("guardianPhone", "Guardian Phone", "text", true)}
                  {renderInput("guardianEmail", "Guardian Email", "email")}
                  {renderInput("guardianOccupation", "Guardian Occupation")}
                  {renderInput("guardianIncome", "Annual Income")}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-3">
                  Address & Account Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderTextarea("permanentAddress", "Permanent Address")}
                  {renderTextarea("currentAddress", "Current Address")}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {renderInput("emergencyContact", "Emergency Contact")}
                  {renderInput("username", "Username")}
                  {renderInput("gpa", "GPA / SGPA")}
                  {renderInput(
                    "pendingAssignments",
                    "Pending Assignments",
                    "number"
                  )}
                  {renderInput("upcomingExams", "Upcoming Exams", "number")}

                  <select
                    name="feeStatus"
                    value={formData.feeStatus}
                    onChange={handleChange}
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                  </select>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
              >
                {isEditMode ? "Update Student" : "Add Student"}
              </button>
            </form>
          </div>
        </div>
      )}

      {viewOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-slate-900">
                Student Details
              </h2>

              <button
                onClick={() => setViewOpen(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {selectedStudent.image ? (
                <img
                  src={selectedStudent.image}
                  alt={selectedStudent.name}
                  className="w-20 h-20 rounded-full object-cover border border-slate-100"
                />
              ) : (
                <span className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-black">
                  {getInitials(selectedStudent.name)}
                </span>
              )}

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {selectedStudent.name}
                </h3>
                <p className="text-sm text-slate-500 font-semibold mt-1">
                  {selectedStudent.studentId} • {selectedStudent.className}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-lg text-xs font-bold ${
                    selectedStudent.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : selectedStudent.status === "At Risk"
                      ? "bg-orange-100 text-orange-500"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {selectedStudent.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-sm">
              <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Basic Details
                </h3>
                {detailItem("Email", selectedStudent.email)}
                {detailItem("Phone", selectedStudent.phone)}
                {detailItem("Username", selectedStudent.username)}
                {detailItem("Password", "••••••••")}
                {detailItem("Fee Status", selectedStudent.feeStatus)}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Academic Details
                </h3>
                {detailItem("Class", selectedStudent.className)}
                {detailItem("Roll No", selectedStudent.rollNo)}
                {detailItem("Admission No", selectedStudent.admissionNo)}
                {detailItem("Academic Year", selectedStudent.academicYear)}
                {detailItem("Section / Semester", selectedStudent.section)}
                {detailItem("Admission Date", selectedStudent.admissionDate)}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Personal Details
                </h3>
                {detailItem("DOB", selectedStudent.dob)}
                {detailItem("Gender", selectedStudent.gender)}
                {detailItem("Blood Group", selectedStudent.bloodGroup)}
                {detailItem("Nationality", selectedStudent.nationality)}
                {detailItem("Religion", selectedStudent.religion)}
                {detailItem("Aadhar No", selectedStudent.aadharNumber)}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Guardian Details
                </h3>
                {detailItem("Father", selectedStudent.fatherName)}
                {detailItem("Mother", selectedStudent.motherName)}
                {detailItem("Guardian Phone", selectedStudent.guardianPhone)}
                {detailItem("Guardian Email", selectedStudent.guardianEmail)}
                {detailItem("Occupation", selectedStudent.guardianOccupation)}
                {detailItem("Annual Income", selectedStudent.guardianIncome)}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Address Details
                </h3>
                {detailItem("Permanent", selectedStudent.permanentAddress)}
                {detailItem("Current", selectedStudent.currentAddress)}
                {detailItem(
                  "Emergency Contact",
                  selectedStudent.emergencyContact
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-slate-900 mb-3">
                  Performance Details
                </h3>
                {detailItem("Attendance", `${selectedStudent.attendance}%`)}
                {detailItem("GPA / SGPA", selectedStudent.gpa)}
                {detailItem(
                  "Pending Assignments",
                  selectedStudent.pendingAssignments
                )}
                {detailItem("Upcoming Exams", selectedStudent.upcomingExams)}
                {detailItem("Created On", formatDate(selectedStudent.createdAt))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => handleOpenEdit(selectedStudent)}
                className="flex-1 h-11 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <IoPencilOutline />
                Edit Student
              </button>

              <button
                onClick={() => handleDelete(selectedStudent)}
                className="flex-1 h-11 rounded-xl bg-red-50 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-100"
              >
                <IoTrashOutline />
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherStudents;