import React from "react";

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
} from "react-icons/io5";

const TeacherProfile = () => {
  const statsCards = [
    {
      title: "Total Classes",
      value: "5",
      desc: "1 new this term",
      icon: <HiOutlineBookOpen />,
      bg: "bg-blue-600",
      lightBg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Total Students",
      value: "126",
      desc: "6 new this month",
      icon: <LuUsersRound />,
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
      label: "Date of Birth",
      value: "May 12, 1989",
      icon: <IoCalendarOutline />,
    },
    {
      label: "Gender",
      value: "Female",
      icon: <IoPersonOutline />,
    },
    {
      label: "Marital Status",
      value: "Married",
      icon: <IoPersonOutline />,
    },
    {
      label: "Languages Known",
      value: "English, Tamil, Hindi",
      icon: <IoBookOutline />,
    },
  ];

  const professionalInfo = [
    {
      label: "Teacher ID",
      value: "TCH-ST-0247",
      icon: <IoPersonOutline />,
    },
    {
      label: "Department",
      value: "Science Department",
      icon: <IoBriefcaseOutline />,
    },
    {
      label: "Designation",
      value: "Science Teacher",
      icon: <IoSchoolOutline />,
    },
    {
      label: "Joining Date",
      value: "June 15, 2017",
      icon: <IoCalendarOutline />,
    },
  ];

  const subjects = [
    {
      subject: "Science",
      classSection: "8A",
      students: 32,
      color: "bg-blue-100 text-blue-600",
    },
    {
      subject: "Science",
      classSection: "8B",
      students: 29,
      color: "bg-purple-100 text-purple-600",
    },
    {
      subject: "Biology",
      classSection: "9A",
      students: 31,
      color: "bg-green-100 text-green-600",
    },
    {
      subject: "Biology",
      classSection: "9B",
      students: 26,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      subject: "Chemistry",
      classSection: "10A",
      students: 28,
      color: "bg-orange-100 text-orange-500",
    },
  ];

  const qualifications = [
    {
      degree: "M.Sc. in Chemistry",
      university: "Bharathiar University, Coimbatore",
      year: "2012",
    },
    {
      degree: "B.Ed. (Science)",
      university: "Tamil Nadu Teachers Education University",
      year: "2014",
    },
  ];

  const schedule = [
    {
      day: "Mon",
      time: "08:00 AM - 04:00 PM",
    },
    {
      day: "Tue",
      time: "08:00 AM - 04:00 PM",
    },
    {
      day: "Wed",
      time: "08:00 AM - 04:00 PM",
    },
    {
      day: "Thu",
      time: "08:00 AM - 04:00 PM",
    },
    {
      day: "Fri",
      time: "08:00 AM - 04:00 PM",
    },
    {
      day: "Sat",
      time: "08:00 AM - 12:00 PM",
    },
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
        <button className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors">
          <IoCreateOutline />
          Edit Profile
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center pr-0 xl:pr-36">
          <div className="xl:col-span-4 flex items-center gap-6">
            <img
              src="https://i.pravatar.cc/200?img=47"
              alt="Teacher profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-slate-100"
            />

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Ms. Ananya Joseph
              </h2>
              <p className="text-blue-600 font-semibold mt-1">
                Science Teacher
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-sm font-semibold text-slate-600">
                <IoPersonOutline className="text-blue-600 text-5xl" />
                Teacher ID: TCH-ST-0247
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
                  ananya.joseph@stmarys.edu.in
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
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                <IoLocationOutline />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Location</p>
                <p className="text-sm font-bold text-slate-800">
                  Coimbatore, Tamil Nadu, India
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
                  Science Department
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
                <p className="text-sm font-bold text-slate-800">7 Years</p>
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
                  June 15, 2017
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

            <button className="text-sm text-blue-600 font-bold">
              View All
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-3 py-3 text-xs font-bold text-slate-500">
                  Subject
                </th>
                <th className="px-3 py-3 text-xs font-bold text-slate-500">
                  Class / Section
                </th>
                <th className="px-3 py-3 text-xs font-bold text-slate-500">
                  Students
                </th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${item.color}`}
                      >
                        <IoBookOutline />
                      </span>
                      <span className="text-sm font-semibold text-slate-700">
                        {item.subject}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm font-semibold text-slate-600">
                    {item.classSection}
                  </td>
                  <td className="px-3 py-3 text-sm font-bold text-slate-700">
                    {item.students}
                  </td>
                </tr>
              ))}
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

                <p className="text-sm font-bold text-slate-600">{item.year}</p>
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
            Passionate science educator with 7+ years of experience in inspiring
            students to explore and understand the world of science. I believe
            in creating engaging, hands-on learning experiences that encourage
            curiosity, critical thinking, and a love for learning.
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

            <button className="text-sm text-blue-600 font-bold">
              View Timetable
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="border border-slate-100 rounded-xl p-3 text-center bg-slate-50"
              >
                <h3 className="text-sm font-black text-slate-800">
                  {item.day}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-5">
                  {item.time}
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
    </div>
  );
};

export default TeacherProfile;
