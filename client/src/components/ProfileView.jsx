import React, { useEffect, useState } from "react";

import {
  User,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Settings,
  CheckCircle,
  FileText,
  Edit,
  Camera,
  Shield,
  Award,
  TrendingUp,
  CalendarCheck,
  CreditCard,
  ChevronRight,
  HeartPulse,
  CalendarDays,
  Landmark,
  KeyRound,
  IndianRupee,
  Home,
  Users,
  BookOpen,
  BadgeCheck,
} from "lucide-react";

import { getStudentAPI } from "../services/allAPI";

const ProfileView = () => {
  const [student, setStudent] = useState(null);

  const normalizeStudent = (data) => {
    if (!data) return null;

    return {
      studentId: data.studentId || data.student_id || "",
      password: data.password || data.student_pass || "",

      name: data.name || data.student_name || "",
      image: data.image || data.student_image || "",
      email: data.email || data.student_email || "",
      phone: data.phone || data.student_phone || "",

      className: data.className || data.student_class || "",
      rollNo: data.rollNo || data.student_rollno || "",
      admissionNo: data.admissionNo || data.student_addno || "",
      academicYear: data.academicYear || data.student_acc_year || "",
      section: data.section || data.student_section || "",
      admissionDate: data.admissionDate || data.student_add_date || "",

      dob: data.dob || data.student_dob || "",
      gender: data.gender || data.student_gender || "",
      bloodGroup: data.bloodGroup || data.student_bg || "",
      nationality: data.nationality || data.student_nation || "",
      religion: data.religion || data.student_reli || "",
      aadharNumber: data.aadharNumber || data.student_addar || "",

      fatherName: data.fatherName || data.student_fname || "",
      motherName: data.motherName || data.student_mname || "",
      guardianPhone:
        data.guardianPhone || data.student_gphone || data.parentContact || "",
      guardianEmail: data.guardianEmail || data.student_gemail || "",
      guardianOccupation: data.guardianOccupation || data.student_goccup || "",
      guardianIncome: data.guardianIncome || data.student_gincome || "",

      permanentAddress: data.permanentAddress || data.student_paddress || "",
      currentAddress: data.currentAddress || data.student_curradd || "",
      emergencyContact: data.emergencyContact || data.student_em_contact || "",

      username: data.username || "",
      attendance: data.attendance ?? 0,
      gpa: data.gpa || "",
      pendingAssignments: data.pendingAssignments ?? 0,
      upcomingExams: data.upcomingExams ?? 0,
      feeStatus: data.feeStatus || "Not added",
      status: data.status || "Active",
      createdAt: data.createdAt || "",
      id: data.id,
    };
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

  useEffect(() => {
    getLoggedStudent();
  }, []);

  const showValue = (value) => {
    if (value === 0) return "0";
    return value ? value : "Not added";
  };

  const maskPassword = (password) => {
    if (!password) return "Not added";
    return "••••••••";
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

  const DetailRow = ({ label, value }) => (
    <div className="flex justify-between gap-4 border-b border-slate-50 pb-2 last:border-b-0">
      <span className="text-slate-400 shrink-0">{label}</span>
      <span className="text-slate-800 text-right font-bold break-words">
        {showValue(value)}
      </span>
    </div>
  );

  const InfoCard = ({ icon, title, children }) => (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-50 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-blue-600">{icon}</span>
          <h3 className="text-xs font-black text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>

        <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">
          View All
        </span>
      </div>

      <div className="space-y-2.5 text-[11px] font-semibold">{children}</div>
    </div>
  );

  const MiniStatCard = ({ icon, label, value, valueClass = "text-slate-900" }) => (
    <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between h-20 shadow-sm relative group hover:border-blue-100 transition-colors">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[9px] font-bold tracking-wide text-slate-400 uppercase">
          {label}
        </span>
      </div>

      <div className="flex items-end justify-between mt-1">
        <span className={`text-sm font-black ${valueClass}`}>
          {showValue(value)}
        </span>
        <ChevronRight
          size={12}
          className="text-slate-300 group-hover:text-slate-500"
        />
      </div>
    </div>
  );

  if (!student) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <p className="text-sm font-semibold text-slate-500">
          Loading student profile...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 animate-fadeIn text-left select-none">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          My Profile
        </h1>

        <div className="flex items-center gap-1.5 text-xs font-semibold mt-1">
          <span className="text-blue-600 cursor-pointer hover:underline">
            Dashboard
          </span>
          <span className="text-slate-400 font-normal">&gt;</span>
          <span className="text-slate-400 font-medium">My Profile</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-28 h-28 rounded-full bg-blue-100 border-4 border-white shadow-md overflow-hidden shrink-0 group">
                {student.image ? (
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-black text-blue-600">
                    {getInitials(student.name)}
                  </div>
                )}

                <button className="absolute bottom-0 inset-x-0 bg-black/50 text-white p-1 flex items-center justify-center transition-opacity opacity-100 hover:bg-black/60 cursor-pointer">
                  <Camera size={14} />
                </button>
              </div>

              <div className="space-y-3.5 text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      {student.name}
                    </h2>

                    <span className="bg-blue-500 text-white p-0.5 rounded-full flex items-center justify-center shrink-0 w-4 h-4">
                      <CheckCircle
                        size={10}
                        fill="currentColor"
                        className="text-blue-500 stroke-white"
                      />
                    </span>
                  </div>

                  <span className="inline-block mt-1 text-[10px] font-bold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md uppercase">
                    Student ID: {student.studentId}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-semibold text-slate-500">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <GraduationCap size={14} />
                    </span>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">
                        Class / Section
                      </span>
                      <span className="text-slate-700">
                        {showValue(student.className)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText size={14} />
                    </span>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">
                        Admission No.
                      </span>
                      <span className="text-slate-700">
                        {showValue(student.admissionNo)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Mail size={14} />
                    </span>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">
                        Email
                      </span>
                      <span className="text-slate-700">{showValue(student.email)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Phone size={14} />
                    </span>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">
                        Phone
                      </span>
                      <span className="text-slate-700">{showValue(student.phone)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="sm:self-start bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-xl shadow-md shadow-blue-600/10 flex items-center gap-1.5 transition-all cursor-pointer">
              <Edit size={12} />
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <MiniStatCard
              icon={
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <CalendarCheck size={13} />
                </span>
              }
              label="Attendance"
              value={`${student.attendance}%`}
            />

            <MiniStatCard
              icon={
                <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <TrendingUp size={13} />
                </span>
              }
              label="GPA / SGPA"
              value={student.gpa}
            />

            <MiniStatCard
              icon={
                <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <FileText size={13} />
                </span>
              }
              label="Pending Assg."
              value={student.pendingAssignments}
            />

            <MiniStatCard
              icon={
                <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Shield size={13} />
                </span>
              }
              label="Upcoming Exams"
              value={student.upcomingExams}
            />

            <MiniStatCard
              icon={
                <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <CreditCard size={13} />
                </span>
              }
              label="Fee Status"
              value={student.feeStatus}
              valueClass={
                student.feeStatus === "Paid"
                  ? "text-emerald-600"
                  : "text-orange-500"
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InfoCard icon={<User size={15} />} title="Personal Information">
              <DetailRow label="Date of Birth" value={formatDate(student.dob)} />
              <DetailRow label="Gender" value={student.gender} />
              <DetailRow label="Blood Group" value={student.bloodGroup} />
              <DetailRow label="Nationality" value={student.nationality} />
              <DetailRow label="Religion" value={student.religion} />
              <DetailRow label="Aadhar Number" value={student.aadharNumber} />
            </InfoCard>

            <InfoCard
              icon={<GraduationCap size={16} />}
              title="Academic Information"
            >
              <DetailRow label="Class / Section" value={student.className} />
              <DetailRow label="Roll Number" value={student.rollNo} />
              <DetailRow label="Admission Number" value={student.admissionNo} />
              <DetailRow label="Academic Year" value={student.academicYear} />
              <DetailRow label="Section / Semester" value={student.section} />
              <DetailRow
                label="Admission Date"
                value={formatDate(student.admissionDate)}
              />
              <DetailRow
                label="School"
                value="ST Mary's Student Management System"
              />
            </InfoCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InfoCard icon={<Users size={15} />} title="Parent / Guardian Details">
              <DetailRow label="Father's Name" value={student.fatherName} />
              <DetailRow label="Mother's Name" value={student.motherName} />
              <DetailRow label="Guardian Phone" value={student.guardianPhone} />
              <DetailRow label="Guardian Email" value={student.guardianEmail} />
              <DetailRow
                label="Occupation"
                value={student.guardianOccupation}
              />
              <DetailRow label="Annual Income" value={student.guardianIncome} />
            </InfoCard>

            <InfoCard icon={<MapPin size={15} />} title="Address Information">
              <div className="space-y-0.5">
                <span className="text-slate-400 block">Permanent Address</span>
                <p className="text-slate-800 leading-relaxed font-semibold">
                  {showValue(student.permanentAddress)}
                </p>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400 block">Current Address</span>
                <p className="text-slate-800 leading-relaxed font-semibold">
                  {showValue(student.currentAddress)}
                </p>
              </div>

              <DetailRow
                label="Emergency Contact"
                value={student.emergencyContact}
              />
            </InfoCard>

            <InfoCard icon={<Settings size={15} />} title="Account Settings">
              <DetailRow label="Username" value={student.username || student.studentId} />
              <DetailRow label="Email" value={student.email} />
              <DetailRow label="Password" value={maskPassword(student.password)} />
              <DetailRow label="Account Status" value={student.status} />
              <DetailRow label="Created On" value={formatDate(student.createdAt)} />

              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-400">Two-Factor Auth</span>
                <span className="text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-100 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  Enabled
                </span>
              </div>
            </InfoCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InfoCard icon={<BadgeCheck size={15} />} title="Performance Details">
              <DetailRow label="Attendance" value={`${student.attendance}%`} />
              <DetailRow label="GPA / SGPA" value={student.gpa} />
              <DetailRow
                label="Pending Assignments"
                value={student.pendingAssignments}
              />
              <DetailRow
                label="Upcoming Exams"
                value={student.upcomingExams}
              />
              <DetailRow label="Fee Status" value={student.feeStatus} />
              <DetailRow label="Status" value={student.status} />
            </InfoCard>

            <InfoCard icon={<HeartPulse size={15} />} title="Emergency Details">
              <DetailRow
                label="Emergency Contact"
                value={student.emergencyContact}
              />
              <DetailRow label="Guardian Phone" value={student.guardianPhone} />
              <DetailRow label="Student Phone" value={student.phone} />
              <DetailRow label="Blood Group" value={student.bloodGroup} />
            </InfoCard>

            <InfoCard icon={<KeyRound size={15} />} title="Login Details">
              <DetailRow label="Student ID" value={student.studentId} />
              <DetailRow label="Username" value={student.username || student.studentId} />
              <DetailRow label="Login Email" value={student.email} />
              <DetailRow label="Password" value={maskPassword(student.password)} />
            </InfoCard>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <InfoCard icon={<Award size={15} />} title="Achievements & Badges">
            <div className="grid grid-cols-4 gap-2 pt-1 text-center">
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-inner">
                  <Award size={18} />
                </div>
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">
                  Scholar
                </span>
                <span className="text-[8px] text-slate-400 font-semibold block">
                  GPA &gt; 8.0
                </span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-inner">
                  <CheckCircle size={16} />
                </div>
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">
                  Attendance Star
                </span>
                <span className="text-[8px] text-slate-400 font-semibold block">
                  90%+ Att.
                </span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shadow-inner">
                  <GraduationCap size={16} />
                </div>
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">
                  Active Learner
                </span>
                <span className="text-[8px] text-slate-400 font-semibold block">
                  5 Courses
                </span>
              </div>

              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-inner">
                  <TrendingUp size={16} />
                </div>
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">
                  Top Performer
                </span>
                <span className="text-[8px] text-slate-400 font-semibold block">
                  Top 10%
                </span>
              </div>
            </div>
          </InfoCard>

          <InfoCard icon={<BookOpen size={15} />} title="Academic Summary">
            <DetailRow label="Class" value={student.className} />
            <DetailRow label="Roll No" value={student.rollNo} />
            <DetailRow label="Admission No" value={student.admissionNo} />
            <DetailRow label="Academic Year" value={student.academicYear} />
            <DetailRow label="Attendance" value={`${student.attendance}%`} />
            <DetailRow label="Fee Status" value={student.feeStatus} />
            <DetailRow label="Status" value={student.status} />
          </InfoCard>

          <InfoCard icon={<Phone size={15} />} title="Quick Contact">
            <DetailRow label="Student Phone" value={student.phone} />
            <DetailRow label="Student Email" value={student.email} />
            <DetailRow label="Guardian Phone" value={student.guardianPhone} />
            <DetailRow label="Guardian Email" value={student.guardianEmail} />
            <DetailRow
              label="Emergency Contact"
              value={student.emergencyContact}
            />
          </InfoCard>

          <InfoCard icon={<Landmark size={15} />} title="Fee & School Details">
            <DetailRow label="Fee Status" value={student.feeStatus} />
            <DetailRow label="School" value="ST Mary's Student Management System" />
            <DetailRow label="Student Status" value={student.status} />
            <DetailRow label="Created On" value={formatDate(student.createdAt)} />
          </InfoCard>

          <InfoCard icon={<Home size={15} />} title="Address Summary">
            <div className="space-y-0.5">
              <span className="text-slate-400 block">Permanent Address</span>
              <p className="text-slate-800 leading-relaxed font-semibold">
                {showValue(student.permanentAddress)}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-slate-400 block">Current Address</span>
              <p className="text-slate-800 leading-relaxed font-semibold">
                {showValue(student.currentAddress)}
              </p>
            </div>
          </InfoCard>

          <InfoCard icon={<CalendarDays size={15} />} title="Important Dates">
            <DetailRow label="Date of Birth" value={formatDate(student.dob)} />
            <DetailRow
              label="Admission Date"
              value={formatDate(student.admissionDate)}
            />
            <DetailRow label="Profile Created" value={formatDate(student.createdAt)} />
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;