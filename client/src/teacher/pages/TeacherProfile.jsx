import React, { useEffect, useState } from "react";

import { HiOutlineBookOpen } from "react-icons/hi";
import { LuUsersRound } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";

import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoCalendarOutline,
  IoPersonOutline,
  IoBriefcaseOutline,
  IoSchoolOutline,
  IoBookOutline,
  IoCreateOutline,
  IoCloseOutline,
} from "react-icons/io5";

import { getTeacherAPI, updateTeacherAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const normalizeAssignedClasses = (teacherData) => {
    if (!teacherData) return [];

    if (Array.isArray(teacherData.assignedClasses)) {
      return teacherData.assignedClasses
        .map((item) => {
          if (typeof item === "string") {
            return {
              className: item,
              subject:
                teacherData.subject?.split(",")[0]?.trim() ||
                "Subject not added",
            };
          }

          return {
            className: item.className || item.class || item.classSection || "",
            subject: item.subject || teacherData.subject || "",
          };
        })
        .filter((item) => item.className && item.subject);
    }

    if (teacherData.class) {
      const classes = teacherData.class
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const subjects = teacherData.subject
        ? teacherData.subject.split(",").map((item) => item.trim())
        : [];

      return classes.map((className, index) => ({
        className,
        subject: subjects[index] || subjects[0] || "Subject not added",
      }));
    }

    return [];
  };

  const getUniqueSubjects = (assignedClasses) => {
    return [...new Set(assignedClasses.map((item) => item.subject))];
  };

  const formatJoinedDate = (createdAt) => {
    if (!createdAt) return "Not added";

    const date = new Date(createdAt);

    if (isNaN(date.getTime())) return createdAt;

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getLoggedTeacher = async () => {
    const loggedTeacherId = localStorage.getItem("teacherId");

    const result = await getTeacherAPI();

    if (result?.status >= 200 && result?.status < 300) {
      const foundTeacher = result.data.find(
        (item) => item.teacherId === loggedTeacherId
      );

      if (foundTeacher) {
        setTeacher(foundTeacher);
        localStorage.setItem("teacherData", JSON.stringify(foundTeacher));
      }
    }
  };

  useEffect(() => {
    getLoggedTeacher();
  }, []);

  const openEditModal = () => {
    setEditData({
      name: teacher?.name || "",
      photo: teacher?.photo || "",
      email: teacher?.email || "",
      contact: teacher?.contact || "",
      location: teacher?.location || "",
      department: teacher?.department || "",
      designation: teacher?.designation || "",
      experience: teacher?.experience || "",
      status: teacher?.status || "Active",
    });

    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedTeacher = {
      ...teacher,
      ...editData,
    };

    const result = await updateTeacherAPI(teacher.id, updatedTeacher);

    if (result?.status >= 200 && result?.status < 300) {
      toast.success("Profile updated successfully");
      setTeacher(result.data);
      localStorage.setItem("teacherData", JSON.stringify(result.data));
      setEditOpen(false);
    } else {
      toast.error("Failed to update profile");
    }
  };

  if (!teacher) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <p className="text-slate-500 font-semibold">
          Loading teacher profile...
        </p>
      </div>
    );
  }

  const assignedClasses = normalizeAssignedClasses(teacher);
  const uniqueSubjects = getUniqueSubjects(assignedClasses);

  const statsCards = [
    {
      title: "Total Classes",
      value: assignedClasses.length || 0,
      desc: "assigned classes",
      icon: <HiOutlineBookOpen />,
      bg: "bg-blue-600",
      lightBg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Subjects Handled",
      value: uniqueSubjects.length || 0,
      desc: "active subjects",
      icon: <IoBookOutline />,
      bg: "bg-purple-600",
      lightBg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "Attendance Rate",
      value: "92.6%",
      desc: "3.8% from last month",
      icon: <FaRegCalendarCheck />,
      bg: "bg-green-500",
      lightBg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Results Published",
      value: "18",
      desc: "4 new this term",
      icon: <MdBarChart />,
      bg: "bg-orange-500",
      lightBg: "bg-orange-50",
      text: "text-orange-500",
    },
  ];

  const personalInfo = [
    {
      label: "Teacher ID",
      value: teacher.teacherId || "N/A",
      icon: <IoPersonOutline />,
    },
    {
      label: "Phone",
      value: teacher.contact || "N/A",
      icon: <IoCallOutline />,
    },
    {
      label: "Email",
      value: teacher.email || "N/A",
      icon: <IoMailOutline />,
    },
    {
      label: "Location",
      value: teacher.location || "N/A",
      icon: <IoLocationOutline />,
    },
  ];

  const professionalInfo = [
    {
      label: "Department",
      value: teacher.department || "N/A",
      icon: <IoBriefcaseOutline />,
    },
    {
      label: "Designation",
      value:
        teacher.designation ||
        `${uniqueSubjects[0] || teacher.subject || "Subject"} Teacher`,
      icon: <IoSchoolOutline />,
    },
    {
      label: "Subjects",
      value: uniqueSubjects.length > 0 ? uniqueSubjects.join(", ") : "N/A",
      icon: <IoBookOutline />,
    },
    {
      label: "Joining Date",
      value: formatJoinedDate(teacher.createdAt),
      icon: <IoCalendarOutline />,
    },
  ];

  const qualifications = [
    {
      degree:
        teacher.designation ||
        `${uniqueSubjects[0] || teacher.subject || "Subject"} Teacher`,
      university: teacher.department || "Department not added",
      year: `${teacher.experience || 0} years experience`,
    },
  ];

  const schedule = [
    { day: "Mon", time: "08:00 AM - 04:00 PM" },
    { day: "Tue", time: "08:00 AM - 04:00 PM" },
    { day: "Wed", time: "08:00 AM - 04:00 PM" },
    { day: "Thu", time: "08:00 AM - 04:00 PM" },
    { day: "Fri", time: "08:00 AM - 04:00 PM" },
    { day: "Sat", time: "08:00 AM - 12:00 PM" },
  ];

  return (
    <div className="w-full space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">
          View and manage your personal and professional information.
        </p>
      </div>

      <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <button
          onClick={openEditModal}
          className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors"
        >
          <IoCreateOutline />
          Edit Profile
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center pr-0 xl:pr-36">
          <div className="xl:col-span-4 flex items-center gap-6">
            <img
              src={teacher.photo || "https://placehold.co/200"}
              alt="Teacher profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-slate-100"
            />

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                {teacher.name}
              </h2>

              <p className="text-blue-600 font-semibold mt-1">
                {teacher.designation ||
                  `${uniqueSubjects[0] || teacher.subject || "Subject"} Teacher`}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-sm font-semibold text-slate-600">
                <IoPersonOutline className="text-blue-600 text-xl" />
                Teacher ID: {teacher.teacherId}
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 grid grid-cols-1 gap-4 xl:border-l xl:border-slate-100 xl:pl-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                <IoMailOutline />
              </div>

              <div>
                <p className="text-xs text-slate-500 font-semibold">Email</p>
                <p className="text-sm font-bold text-slate-800">
                  {teacher.email || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                <IoCallOutline />
              </div>

              <div>
                <p className="text-xs text-slate-500 font-semibold">Phone</p>
                <p className="text-sm font-bold text-slate-800">
                  {teacher.contact || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                <IoLocationOutline />
              </div>

              <div>
                <p className="text-xs text-slate-500 font-semibold">
                  Location
                </p>
                <p className="text-sm font-bold text-slate-800">
                  {teacher.location || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 grid grid-cols-1 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                <IoBriefcaseOutline />
              </div>

              <div>
                <p className="text-xs text-slate-500 font-semibold">
                  Department
                </p>
                <p className="text-sm font-bold text-slate-800">
                  {teacher.department || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                <IoSchoolOutline />
              </div>

              <div>
                <p className="text-xs text-slate-500 font-semibold">
                  Years of Experience
                </p>
                <p className="text-sm font-bold text-slate-800">
                  {teacher.experience || "0"} Years
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                <IoCalendarOutline />
              </div>

              <div>
                <p className="text-xs text-slate-500 font-semibold">
                  Joined On
                </p>
                <p className="text-sm font-bold text-slate-800">
                  {formatJoinedDate(teacher.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
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
                  ↑ {card.desc}
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-5">
            <IoPersonOutline className="text-blue-600 text-xl" />
            <h2 className="text-lg font-black text-slate-900">
              Personal Information
            </h2>
          </div>

          <div className="space-y-4">
            {personalInfo.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-lg">{item.icon}</span>
                  <p className="text-sm font-semibold text-slate-500">
                    {item.label}
                  </p>
                </div>

                <p className="text-sm font-bold text-slate-700 text-right">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-5">
            <IoBriefcaseOutline className="text-blue-600 text-xl" />
            <h2 className="text-lg font-black text-slate-900">
              Professional Information
            </h2>
          </div>

          <div className="space-y-4">
            {professionalInfo.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-lg">{item.icon}</span>
                  <p className="text-sm font-semibold text-slate-500">
                    {item.label}
                  </p>
                </div>

                <p className="text-sm font-bold text-slate-700 text-right">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <IoBookOutline className="text-blue-600 text-xl" />
              <h2 className="text-lg font-black text-slate-900">
                Subjects & Classes
              </h2>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-3 py-3 text-xs font-bold text-slate-500">
                  Subject
                </th>
                <th className="px-3 py-3 text-xs font-bold text-slate-500">
                  Class
                </th>
                <th className="px-3 py-3 text-xs font-bold text-slate-500">
                  Students
                </th>
              </tr>
            </thead>

            <tbody>
              {assignedClasses.length > 0 ? (
                assignedClasses.map((item, index) => (
                  <tr
                    key={`${item.className}-${item.subject}-${index}`}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                          <IoBookOutline />
                        </span>

                        <span className="text-sm font-semibold text-slate-700">
                          {item.subject}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-3 text-sm font-semibold text-slate-600">
                      {item.className}
                    </td>

                    <td className="px-3 py-3 text-sm font-bold text-slate-700">
                      32
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-3 py-5 text-center text-sm text-slate-400"
                  >
                    No classes assigned
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-5">
            <IoSchoolOutline className="text-blue-600 text-xl" />
            <h2 className="text-lg font-black text-slate-900">
              Qualifications
            </h2>
          </div>

          <div className="space-y-5">
            {qualifications.map((item, index) => (
              <div key={index} className="flex justify-between gap-4">
                <div>
                  <h3 className="text-sm font-black text-slate-800">
                    {item.degree}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {item.university}
                  </p>
                </div>

                <p className="text-sm font-bold text-slate-600">
                  {item.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-5">
            <IoPersonOutline className="text-blue-600 text-xl" />
            <h2 className="text-lg font-black text-slate-900">About Me</h2>
          </div>

          <p className="text-sm text-slate-600 leading-7">
            Passionate educator with {teacher.experience || "0"} years of
            experience. Handles{" "}
            {uniqueSubjects.length > 0
              ? uniqueSubjects.join(", ")
              : "assigned subjects"}{" "}
            and supports students across assigned classes.
          </p>
        </div>

        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <IoCalendarOutline className="text-blue-600 text-xl" />
              <h2 className="text-lg font-black text-slate-900">
                Weekly Availability
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <div
                key={index}
                className="border border-slate-100 rounded-xl p-3 text-center bg-slate-50"
              >
                <h3 className="text-sm font-black text-slate-800">{day}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-5">
                  {day === "Sat"
                    ? "08:00 AM - 12:00 PM"
                    : "08:00 AM - 04:00 PM"}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 font-semibold">
            <IoCalendarOutline className="text-slate-400" />
            Lunch Break: 12:45 PM - 01:30 PM
          </div>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-slate-900">
                Edit Profile
              </h2>

              <button
                onClick={() => setEditOpen(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <form
              onSubmit={handleUpdateProfile}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                placeholder="Name"
                className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
              />

              <input
                type="text"
                name="photo"
                value={editData.photo}
                onChange={handleEditChange}
                placeholder="Photo URL"
                className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
              />

              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
              />

              <input
                type="text"
                name="contact"
                value={editData.contact}
                onChange={handleEditChange}
                placeholder="Phone"
                className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
              />

              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleEditChange}
                placeholder="Location"
                className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
              />

              <input
                type="text"
                name="department"
                value={editData.department}
                onChange={handleEditChange}
                placeholder="Department"
                className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
              />

              <input
                type="text"
                name="designation"
                value={editData.designation}
                onChange={handleEditChange}
                placeholder="Designation"
                className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
              />

              <input
                type="text"
                name="experience"
                value={editData.experience}
                onChange={handleEditChange}
                placeholder="Experience"
                className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
              />

              <button
                type="submit"
                className="md:col-span-2 h-11 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;