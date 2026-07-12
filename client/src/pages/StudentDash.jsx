import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import OverviewDashboard from "../components/OverviewDashboard";
import ProfileView from "../components/ProfileView";
import CoursesView from "../components/CoursesView";
import AttendanceView from "../components/AttendanceView";
import TimetableView from "../components/TimetableView";
import ExamsView from "../components/ExamsView";
import ResultsView from "../components/ResultsView";
import NoticeView from "../components/NoticeView";

import { Bell } from "lucide-react";
import { getStudentAPI } from "../services/allAPI";

const AssignmentsView = () => (
  <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-left animate-fadeIn">
    <h2 className="text-lg font-black text-slate-900">
      Assignments Component
    </h2>
    <p className="text-xs text-slate-400 mt-1">
      Submit active project tasks, review due deadlines, and view scores.
    </p>
  </div>
);

const SettingsView = () => (
  <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-left animate-fadeIn">
    <h2 className="text-lg font-black text-slate-900">
      System Settings Component
    </h2>
    <p className="text-xs text-slate-400 mt-1">
      Update system themes, credentials security parameters, and communication
      updates.
    </p>
  </div>
);

const StudentDash = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeStudent = (student) => {
    if (!student) return null;

    return {
      id: student.id,
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
      email: student.email || student.student_email || "",
      password: student.password || "",
      className:
        student.className ||
        student.class ||
        student.student_class ||
        student.classSection ||
        "",
      rollNo: student.rollNo || student.roll || student.student_rollno || "",
      photo:
        student.photo ||
        student.student_image ||
        student.image ||
        student.profileImage ||
        "",
      phone: student.phone || student.contact || student.student_phone || "",
      guardian:
        student.guardian ||
        student.guardianName ||
        student.parentName ||
        student.fatherName ||
        "",
      guardianContact:
        student.guardianContact ||
        student.parentContact ||
        student.parentPhone ||
        student.guardianPhone ||
        "",
      address:
        student.address ||
        student.location ||
        student.currentAddress ||
        student.permanentAddress ||
        "",
      dob: student.dob || student.dateOfBirth || student.student_dob || "",
      gender: student.gender || student.student_gender || "",
      status: student.status || "Active",
      createdAt: student.createdAt || "",
    };
  };

  const getStoredStudent = () => {
    const storedStudent =
      localStorage.getItem("studentData") ||
      localStorage.getItem("loggedStudent") ||
      localStorage.getItem("student") ||
      localStorage.getItem("studentDetails");

    if (storedStudent) {
      try {
        return normalizeStudent(JSON.parse(storedStudent));
      } catch (error) {
        console.log(error);
      }
    }

    const studentId = localStorage.getItem("studentId");

    if (studentId) {
      return {
        id: localStorage.getItem("studentDbId") || "",
        studentId,
        name: "Student",
        email: "",
        password: "",
        className: localStorage.getItem("studentClass") || "",
        rollNo: "",
        photo: "",
        phone: "",
        guardian: "",
        guardianContact: "",
        address: "",
        dob: "",
        gender: "",
        status: "Active",
        createdAt: "",
      };
    }

    return null;
  };

  const getLoggedStudent = async () => {
    setLoading(true);

    const storedStudent = getStoredStudent();

    if (storedStudent) {
      setStudentData(storedStudent);
    }

    const loggedStudentId =
      localStorage.getItem("studentId") ||
      localStorage.getItem("studentDbId") ||
      storedStudent?.studentId ||
      storedStudent?.id;

    const result = await getStudentAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const students = Array.isArray(result.data) ? result.data : [];

      const foundStudent = students.find((student) => {
        const normalized = normalizeStudent(student);

        return (
          String(normalized.studentId) === String(loggedStudentId) ||
          String(normalized.id) === String(loggedStudentId)
        );
      });

      if (foundStudent) {
        const normalized = normalizeStudent(foundStudent);

        setStudentData(normalized);

        localStorage.setItem("studentData", JSON.stringify(foundStudent));
        localStorage.setItem("studentId", normalized.studentId);
        localStorage.setItem("studentDbId", normalized.id);
        localStorage.setItem("studentClass", normalized.className);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getLoggedStudent();
  }, []);

  const renderRightSideContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <OverviewDashboard
            studentData={studentData}
            onNavigate={setActiveMenu}
          />
        );

      case "profile":
        return <ProfileView studentData={studentData} />;

      case "courses":
        return <CoursesView studentData={studentData} />;

      case "attendance":
        return <AttendanceView studentData={studentData} />;

      case "exams":
        return <ExamsView studentData={studentData} />;

      case "results":
        return <ResultsView studentData={studentData} />;

      case "timetable":
        return <TimetableView studentData={studentData} />;

      case "notice":
      case "Notice":
        return <NoticeView studentData={studentData} />;

      case "assignments":
        return <AssignmentsView />;

      case "settings":
        return <SettingsView />;

      default:
        return (
          <OverviewDashboard
            studentData={studentData}
            onNavigate={setActiveMenu}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-sm font-semibold text-slate-500">
          Loading student dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans antialiased select-none">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10 shadow-sm shadow-slate-100/40">
          <div className="font-extrabold text-sm sm:text-base text-blue-700 tracking-tight">
            ST MARY&apos;S STUDENT MANAGEMENT SYSTEM
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveMenu("notice")}
              className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-xs relative cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2.5 border-l border-slate-100 pl-4">
              {studentData?.photo ? (
                <img
                  src={studentData.photo}
                  alt={studentData.name}
                  className="w-10 h-10 rounded-full bg-slate-200 object-cover border border-slate-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm border border-blue-100">
                  {studentData?.name
                    ? studentData.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "ST"}
                </div>
              )}

              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-none">
                  {studentData?.name || "Student"}
                </div>

                <div className="text-[10px] text-slate-400 font-bold mt-1 tracking-wide uppercase">
                  {studentData?.className || "Class"}{" "}
                  {studentData?.studentId
                    ? `– ${studentData.studentId}`
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {renderRightSideContent()}
        </main>
      </div>
    </div>
  );
};

export default StudentDash;