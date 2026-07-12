import React, { useState, useEffect } from "react";

import { GiTeacher } from "react-icons/gi";
import {
  FaUserGroup,
  FaCirclePlus,
  FaTrashCan,
  FaPenToSquare,
} from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { TiUserAdd } from "react-icons/ti";
import { IoCloseOutline } from "react-icons/io5";

import MyPieChart from "../components/MyPieChart";
import DeptDist from "../components/DeptDist";

import {
  getTeacherAPI,
  registerTeacherAPI,
  deleteTeacherAPI,
  updateTeacherAPI,
} from "../../services/allAPI";

function Teachers() {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [teachersList, setTeachersList] = useState([]);

  const [classSubjectInput, setClassSubjectInput] = useState({
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

  const initialFormState = {
    teacherId: "",
    password: "",
    name: "",
    photo: "",
    email: "",
    contact: "",
    location: "",
    department: "",
    designation: "",
    experience: "",
    status: "Active",
    assignedClasses: [],
    class: "",
    subject: "",
    createdAt: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const generateUniqueID = () => {
    let uniqueID = "";
    let isDuplicate = true;

    while (isDuplicate) {
      const randomNum = Math.floor(100 + Math.random() * 900);
      uniqueID = `TCH${randomNum}`;
      isDuplicate = teachersList.some(
        (teacher) => teacher.teacherId === uniqueID
      );
    }

    return uniqueID;
  };

  const displayTeachers = async () => {
    const result = await getTeacherAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setTeachersList(result.data);
    }
  };

  useEffect(() => {
    displayTeachers();
  }, []);

  const normalizeAssignedClasses = (teacher) => {
    if (Array.isArray(teacher.assignedClasses)) {
      return teacher.assignedClasses
        .map((item) => {
          if (typeof item === "string") {
            return {
              className: item,
              subject:
                teacher.subject?.split(",")[0]?.trim() || "Subject not added",
            };
          }

          return {
            className: item.className || item.class || item.classSection || "",
            subject: item.subject || teacher.subject || "",
          };
        })
        .filter((item) => item.className && item.subject);
    }

    if (teacher.class) {
      const classes = teacher.class
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const subjects = teacher.subject
        ? teacher.subject.split(",").map((item) => item.trim())
        : [];

      return classes.map((className, index) => ({
        className,
        subject: subjects[index] || subjects[0] || "Subject not added",
      }));
    }

    return [];
  };

  const getClassText = (assignedClasses) => {
    return assignedClasses.map((item) => item.className).join(", ");
  };

  const getSubjectText = (assignedClasses) => {
    const subjects = assignedClasses.map((item) => item.subject);
    return [...new Set(subjects)].join(", ");
  };

  const handleOpen = () => {
    setIsEditMode(false);
    setEditId(null);
    setClassSubjectInput({
      className: "",
      subject: "",
    });

    setFormData({
      ...initialFormState,
      teacherId: generateUniqueID(),
      createdAt: new Date().toISOString(),
    });

    setOpen(true);
  };

  const handleEditOpen = (teacher) => {
    const assignedClasses = normalizeAssignedClasses(teacher);

    setIsEditMode(true);
    setEditId(teacher.id);
    setClassSubjectInput({
      className: "",
      subject: "",
    });

    setFormData({
      teacherId: teacher.teacherId || "",
      password: teacher.password || "",
      name: teacher.name || "",
      photo: teacher.photo || "",
      email: teacher.email || "",
      contact: teacher.contact || "",
      location: teacher.location || teacher.address || "",
      department: teacher.department || "",
      designation: teacher.designation || "",
      experience: teacher.experience || "",
      status: teacher.status || "Active",
      assignedClasses,
      class: getClassText(assignedClasses),
      subject: getSubjectText(assignedClasses),
      createdAt: teacher.createdAt || new Date().toISOString(),
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormState);
    setEditId(null);
    setIsEditMode(false);
    setClassSubjectInput({
      className: "",
      subject: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClassSubjectChange = (e) => {
    const { name, value } = e.target;

    setClassSubjectInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClassSubject = () => {
    if (!classSubjectInput.className || !classSubjectInput.subject) {
      alert("Please select class and subject");
      return;
    }

    const alreadyExists = formData.assignedClasses.some(
      (item) =>
        item.className === classSubjectInput.className &&
        item.subject === classSubjectInput.subject
    );

    if (alreadyExists) {
      alert("This class and subject is already added");
      return;
    }

    const updatedAssignedClasses = [
      ...formData.assignedClasses,
      {
        className: classSubjectInput.className,
        subject: classSubjectInput.subject,
      },
    ];

    setFormData((prev) => ({
      ...prev,
      assignedClasses: updatedAssignedClasses,
      class: getClassText(updatedAssignedClasses),
      subject: getSubjectText(updatedAssignedClasses),
    }));

    setClassSubjectInput({
      className: "",
      subject: "",
    });
  };

  const handleRemoveClassSubject = (index) => {
    const updatedAssignedClasses = formData.assignedClasses.filter(
      (_, itemIndex) => itemIndex !== index
    );

    setFormData((prev) => ({
      ...prev,
      assignedClasses: updatedAssignedClasses,
      class: getClassText(updatedAssignedClasses),
      subject: getSubjectText(updatedAssignedClasses),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.assignedClasses || formData.assignedClasses.length === 0) {
      alert("Please add at least one class and subject");
      return;
    }

    const subjectText = getSubjectText(formData.assignedClasses);

    const teacherPayload = {
      ...formData,
      assignedClasses: formData.assignedClasses,
      class: getClassText(formData.assignedClasses),
      subject: subjectText,
      designation:
        formData.designation ||
        `${subjectText.split(",")[0] || "Subject"} Teacher`,
      createdAt: formData.createdAt || new Date().toISOString(),
    };

    if (isEditMode) {
      const result = await updateTeacherAPI(editId, teacherPayload);

      if (result?.status >= 200 && result?.status < 300) {
        const loggedTeacherDbId = localStorage.getItem("teacherDbId");
        const loggedTeacherId = localStorage.getItem("teacherId");

        if (
          loggedTeacherDbId === editId ||
          loggedTeacherId === result.data.teacherId
        ) {
          localStorage.setItem("teacherData", JSON.stringify(result.data));
          localStorage.setItem("teacherId", result.data.teacherId);
          localStorage.setItem("teacherDbId", result.data.id);
        }

        await displayTeachers();
        handleClose();
      }
    } else {
      const result = await registerTeacherAPI(teacherPayload);

      if (result?.status >= 200 && result?.status < 300) {
        await displayTeachers();
        handleClose();
      }
    }
  };

  const handleDeleteTeacher = async (teacher) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${teacher.name}'s teacher profile?`
    );

    if (!confirmDelete) return;

    const result = await deleteTeacherAPI(teacher.id);

    if (result?.status >= 200 && result?.status < 300) {
      const loggedTeacherDbId = localStorage.getItem("teacherDbId");
      const loggedTeacherId = localStorage.getItem("teacherId");

      if (
        loggedTeacherDbId === teacher.id ||
        loggedTeacherId === teacher.teacherId
      ) {
        localStorage.removeItem("teacherAuth");
        localStorage.removeItem("teacherId");
        localStorage.removeItem("teacherDbId");
        localStorage.removeItem("teacherData");
        localStorage.removeItem("rememberTeacher");
      }

      await displayTeachers();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased">
      <div className="w-full p-5">
        <h1 className="font-bold text-3xl text-slate-800">Teachers</h1>
        <p className="text-slate-500 text-sm mt-1">
          View, manage and organize teacher records across the school
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 py-5">
          <div className="flex items-center gap-5 rounded-xl shadow-lg p-4 bg-white">
            <span className="bg-violet-100 text-violet-600 p-3 rounded-full">
              <GiTeacher size={22} />
            </span>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Total Faculty
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {teachersList.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-xl shadow-lg p-4 bg-white">
            <span className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <FaUserGroup size={22} />
            </span>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Total Students
              </p>
              <p className="text-2xl font-bold text-slate-800">1200</p>
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-xl shadow-lg p-4 bg-white">
            <span className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
              <TiUserAdd size={22} />
            </span>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                New Hires
              </p>
              <p className="text-2xl font-bold text-slate-800">4</p>
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-xl shadow-lg p-4 bg-white">
            <span className="bg-amber-100 text-amber-600 p-3 rounded-full">
              <FcDepartment size={22} />
            </span>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Departments
              </p>
              <p className="text-2xl font-bold text-slate-800">6</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          <div className="xl:col-span-12 rounded-xl p-5 shadow-lg bg-white border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5">
              <h1 className="font-bold text-2xl text-slate-800">
                Teacher Directory
              </h1>

              <button
                className="flex items-center justify-center px-4 py-2 bg-[#2f2ee9] text-white rounded-xl gap-2 font-semibold hover:bg-[#1e1dd0] active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-600/10"
                onClick={handleOpen}
              >
                <FaCirclePlus />
                Add Teacher
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
              <input
                type="text"
                placeholder="Search by name, ID"
                className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />

              <select className="border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 focus:outline-none">
                <option value="">All Departments</option>
              </select>

              <select className="border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 focus:outline-none">
                <option value="">All Statuses</option>
              </select>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <div className="min-w-[1040px]">
                <div className="grid grid-cols-[80px_220px_150px_1fr_95px_120px_100px_90px] bg-slate-50 border-b border-slate-100">
                  <div className="px-4 py-3 text-sm font-bold text-slate-700">
                    ID
                  </div>
                  <div className="px-4 py-3 text-sm font-bold text-slate-700">
                    Teacher Info
                  </div>
                  <div className="px-4 py-3 text-sm font-bold text-slate-700">
                    Department
                  </div>
                  <div className="px-4 py-3 text-sm font-bold text-slate-700">
                    Classes & Subjects
                  </div>
                  <div className="px-4 py-3 text-sm font-bold text-slate-700">
                    Exp.
                  </div>
                  <div className="px-4 py-3 text-sm font-bold text-slate-700">
                    Contact
                  </div>
                  <div className="px-4 py-3 text-sm font-bold text-slate-700 text-center">
                    Status
                  </div>
                  <div className="px-4 py-3 text-sm font-bold text-slate-700 text-center">
                    Actions
                  </div>
                </div>

                {teachersList.length > 0 ? (
                  teachersList.map((teacher) => {
                    const assignedClasses = normalizeAssignedClasses(teacher);

                    return (
                      <div
                        key={teacher.id}
                        className="grid grid-cols-[80px_220px_150px_1fr_95px_120px_100px_90px] border-b border-slate-100 last:border-b-0 items-center hover:bg-slate-50/70 transition-colors"
                      >
                        <div className="px-4 py-4">
                          <span className="font-bold text-slate-600 text-xs">
                            {teacher.teacherId || "N/A"}
                          </span>
                        </div>

                        <div className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={teacher.photo || "https://placehold.co/100"}
                              alt={teacher.name}
                              className="w-11 h-11 rounded-full object-cover border border-slate-100"
                            />

                            <div>
                              <p className="font-semibold text-slate-800">
                                {teacher.name || "No name"}
                              </p>
                              <p className="text-xs text-slate-400">
                                {teacher.email || "No email"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-4 text-sm text-slate-600">
                          {teacher.department || "N/A"}
                        </div>

                        <div className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {assignedClasses.length > 0 ? (
                              assignedClasses.slice(0, 5).map((item, index) => (
                                <span
                                  key={`${item.className}-${item.subject}-${index}`}
                                  className="px-2 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold"
                                >
                                  {item.className} - {item.subject}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400 text-sm">
                                Not assigned
                              </span>
                            )}

                            {assignedClasses.length > 5 && (
                              <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">
                                +{assignedClasses.length - 5}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="px-4 py-4 text-sm text-slate-600">
                          {teacher.experience
                            ? `${teacher.experience} yrs`
                            : "N/A"}
                        </div>

                        <div className="px-4 py-4 text-sm text-slate-600">
                          {teacher.contact || "N/A"}
                        </div>

                        <div className="px-4 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              teacher.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : teacher.status === "On leave"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}
                          >
                            {teacher.status || "Active"}
                          </span>
                        </div>

                        <div className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditOpen(teacher)}
                              className="w-9 h-9 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Edit Teacher"
                            >
                              <FaPenToSquare size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteTeacher(teacher)}
                              className="w-9 h-9 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete Teacher"
                            >
                              <FaTrashCan size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center text-slate-400">
                    No teacher records found. Click Add Teacher to create one.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="xl:col-span-6 bg-white rounded-xl p-5 shadow-lg border border-slate-100">
            <MyPieChart />
          </div>

          <div className="xl:col-span-6 bg-white rounded-xl p-5 shadow-lg border border-slate-100">
            <DeptDist />
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-slate-900">
                {isEditMode ? "Modify Teacher Details" : "Add a New Teacher"}
              </h2>

              <button
                onClick={handleClose}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="teacherId"
                value={formData.teacherId}
                readOnly
                placeholder="Teacher ID"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-bold outline-none text-sm"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Login Password"
                  required
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Teacher Name"
                  required
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  placeholder="Enter Teacher Photo URL"
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  required
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter Contact Phone No"
                  required
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter Address / Location"
                  required
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter Department"
                  required
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Enter Designation"
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Enter Years of Experience"
                  required
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="On leave">On leave</option>
                  <option value="Probation">Probation</option>
                </select>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                <div className="mb-4">
                  <h3 className="font-black text-slate-800">
                    Assigned Classes & Subjects
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Select a class and subject, then click Add. Same teacher can
                    have different subjects for different classes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
                  <select
                    name="className"
                    value={classSubjectInput.className}
                    onChange={handleClassSubjectChange}
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm bg-white"
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
                    value={classSubjectInput.subject}
                    onChange={handleClassSubjectChange}
                    className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm bg-white"
                  >
                    <option value="">Select Subject</option>
                    {subjectOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleAddClassSubject}
                    className="h-11 px-5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.assignedClasses.length > 0 ? (
                    formData.assignedClasses.map((item, index) => (
                      <span
                        key={`${item.className}-${item.subject}-${index}`}
                        className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center gap-2"
                      >
                        {item.className} - {item.subject}
                        <button
                          type="button"
                          onClick={() => handleRemoveClassSubject(index)}
                          className="text-blue-600 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">
                      No class and subject added
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2f2ee9] text-white p-3 text-base font-semibold rounded-xl cursor-pointer transition-all duration-200 shadow-md shadow-blue-600/10 hover:bg-[#1e1dd0] active:scale-[0.98]"
              >
                {isEditMode ? "Update Teacher Record" : "Submit Teacher"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teachers;