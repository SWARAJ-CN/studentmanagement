import React from "react";

import {
  IoSearchOutline,
  IoCalendarOutline,
  IoBookOutline,
  IoTimeOutline,
  IoPeopleOutline,
} from "react-icons/io5";

import { FaRegCalendarCheck } from "react-icons/fa";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";

const TeacherTimetable = () => {
  const statsCards = [
    {
      title: "Total Weekly Periods",
      value: "32",
      desc: "4 vs last week",
      icon: <FaRegCalendarCheck />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-600",
      symbol: "↑",
    },
    {
      title: "Classes Today",
      value: "6",
      desc: "1 vs yesterday",
      icon: <IoPeopleOutline />,
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
      text: "text-orange-500",
      symbol: "↑",
    },
    {
      title: "Subjects Handled",
      value: "4",
      desc: "Same as last week",
      icon: <IoBookOutline />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-600",
      symbol: "—",
    },
    {
      title: "Free Periods",
      value: "3",
      desc: "1 vs yesterday",
      icon: <IoTimeOutline />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-purple-600",
      symbol: "↓",
    },
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timetable = [
    {
      time: "08:00 - 08:45",
      periods: [
        {
          subject: "Science",
          className: "Class 10A",
          room: "Room 205",
          color: "bg-blue-50 border-blue-100 text-blue-600",
        },
        {
          subject: "Biology",
          className: "Class 10B",
          room: "Room 206",
          color: "bg-green-50 border-green-100 text-green-600",
        },
        {
          subject: "Science",
          className: "Class 10A",
          room: "Room 205",
          color: "bg-blue-50 border-blue-100 text-blue-600",
        },
        {
          subject: "Chemistry",
          className: "Class 9A",
          room: "Room 203",
          color: "bg-purple-50 border-purple-100 text-purple-600",
        },
        {
          subject: "Science",
          className: "Class 10A",
          room: "Room 205",
          color: "bg-blue-50 border-blue-100 text-blue-600",
        },
        {
          subject: "Physics",
          className: "Class 11A",
          room: "Room 207",
          color: "bg-orange-50 border-orange-100 text-orange-500",
        },
      ],
    },
    {
      time: "08:45 - 09:30",
      periods: [
        {
          subject: "Biology",
          className: "Class 10B",
          room: "Room 206",
          color: "bg-green-50 border-green-100 text-green-600",
        },
        {
          subject: "Science",
          className: "Class 10A",
          room: "Room 205",
          color: "bg-blue-50 border-blue-100 text-blue-600",
        },
        {
          subject: "Physics",
          className: "Class 11A",
          room: "Room 207",
          color: "bg-orange-50 border-orange-100 text-orange-500",
        },
        {
          subject: "Biology",
          className: "Class 10B",
          room: "Room 206",
          color: "bg-green-50 border-green-100 text-green-600",
        },
        {
          subject: "Chemistry",
          className: "Class 9A",
          room: "Room 203",
          color: "bg-purple-50 border-purple-100 text-purple-600",
        },
        {
          subject: "Lab",
          className: "Class 11A",
          room: "Lab 1",
          color: "bg-cyan-50 border-cyan-100 text-cyan-600",
        },
      ],
    },
    {
      time: "09:45 - 10:30",
      periods: [
        {
          subject: "Chemistry",
          className: "Class 9A",
          room: "Room 203",
          color: "bg-purple-50 border-purple-100 text-purple-600",
        },
        {
          subject: "Physics",
          className: "Class 11A",
          room: "Room 207",
          color: "bg-orange-50 border-orange-100 text-orange-500",
        },
        {
          subject: "Biology",
          className: "Class 10B",
          room: "Room 206",
          color: "bg-green-50 border-green-100 text-green-600",
        },
        {
          subject: "Science",
          className: "Class 10A",
          room: "Room 205",
          color: "bg-blue-50 border-blue-100 text-blue-600",
        },
        {
          subject: "Lab",
          className: "Class 10A",
          room: "Lab 2",
          color: "bg-cyan-50 border-cyan-100 text-cyan-600",
        },
        {
          subject: "Science",
          className: "Class 10A",
          room: "Room 205",
          color: "bg-blue-50 border-blue-100 text-blue-600",
        },
      ],
    },
    {
      time: "11:00 - 11:45",
      periods: [
        {
          subject: "Science",
          className: "Class 10A",
          room: "Room 205",
          color: "bg-blue-50 border-blue-100 text-blue-600",
        },
        {
          subject: "Chemistry",
          className: "Class 9A",
          room: "Room 203",
          color: "bg-purple-50 border-purple-100 text-purple-600",
        },
        {
          subject: "Lab",
          className: "Class 10B",
          room: "Lab 2",
          color: "bg-cyan-50 border-cyan-100 text-cyan-600",
        },
        {
          subject: "Physics",
          className: "Class 11A",
          room: "Room 207",
          color: "bg-orange-50 border-orange-100 text-orange-500",
        },
        {
          subject: "Biology",
          className: "Class 10B",
          room: "Room 206",
          color: "bg-green-50 border-green-100 text-green-600",
        },
        {
          subject: "Free Period",
          className: "",
          room: "",
          color: "bg-slate-50 border-slate-100 text-slate-500",
          free: true,
        },
      ],
    },
    {
      time: "12:00 - 12:45",
      periods: [
        {
          subject: "Free Period",
          className: "",
          room: "",
          color: "bg-slate-50 border-slate-100 text-slate-500",
          free: true,
        },
        {
          subject: "Lab",
          className: "Class 11A",
          room: "Lab 1",
          color: "bg-cyan-50 border-cyan-100 text-cyan-600",
        },
        {
          subject: "Chemistry",
          className: "Class 9A",
          room: "Room 203",
          color: "bg-purple-50 border-purple-100 text-purple-600",
        },
        {
          subject: "Meeting",
          className: "Staff Room",
          room: "",
          color: "bg-slate-50 border-slate-100 text-slate-500",
          free: true,
        },
        {
          subject: "Science",
          className: "Class 10A",
          room: "Room 205",
          color: "bg-blue-50 border-blue-100 text-blue-600",
        },
        {
          subject: "Biology",
          className: "Class 10B",
          room: "Room 206",
          color: "bg-green-50 border-green-100 text-green-600",
        },
      ],
    },
    {
      time: "01:30 - 02:15",
      periods: [
        {
          subject: "Physics",
          className: "Class 11A",
          room: "Room 207",
          color: "bg-orange-50 border-orange-100 text-orange-500",
        },
        {
          subject: "Free Period",
          className: "",
          room: "",
          color: "bg-slate-50 border-slate-100 text-slate-500",
          free: true,
        },
        {
          subject: "Science",
          className: "Class 10A",
          room: "Room 205",
          color: "bg-blue-50 border-blue-100 text-blue-600",
        },
        {
          subject: "Biology",
          className: "Class 10B",
          room: "Room 206",
          color: "bg-green-50 border-green-100 text-green-600",
        },
        {
          subject: "Chemistry",
          className: "Class 9A",
          room: "Room 203",
          color: "bg-purple-50 border-purple-100 text-purple-600",
        },
        {
          subject: "Physics",
          className: "Class 11A",
          room: "Room 207",
          color: "bg-orange-50 border-orange-100 text-orange-500",
        },
      ],
    },
  ];

  const todaySchedule = [
    {
      time: "08:00 - 08:45",
      subject: "Science",
      className: "Class 10A",
      room: "Room 205",
      status: "Completed",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      time: "08:45 - 09:30",
      subject: "Biology",
      className: "Class 10B",
      room: "Room 206",
      status: "Completed",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      time: "09:45 - 10:30",
      subject: "Chemistry",
      className: "Class 9A",
      room: "Room 203",
      status: "Ongoing",
      statusColor: "bg-orange-100 text-orange-500",
    },
    {
      time: "11:00 - 11:45",
      subject: "Science",
      className: "Class 10A",
      room: "Room 205",
      status: "Upcoming",
      statusColor: "bg-blue-100 text-blue-600",
    },
    {
      time: "12:00 - 12:45",
      subject: "Free Period",
      className: "",
      room: "",
      status: "Upcoming",
      statusColor: "bg-blue-100 text-blue-600",
    },
    {
      time: "01:30 - 02:15",
      subject: "Physics",
      className: "Class 11A",
      room: "Room 207",
      status: "Upcoming",
      statusColor: "bg-blue-100 text-blue-600",
    },
  ];

  const subjectLoad = [
    {
      subject: "Science",
      periods: "12 / 16 periods",
      percentage: "75%",
      width: "75%",
      color: "bg-blue-600",
    },
    {
      subject: "Biology",
      periods: "8 / 12 periods",
      percentage: "67%",
      width: "67%",
      color: "bg-green-500",
    },
    {
      subject: "Chemistry",
      periods: "6 / 10 periods",
      percentage: "60%",
      width: "60%",
      color: "bg-purple-500",
    },
    {
      subject: "Physics",
      periods: "6 / 8 periods",
      percentage: "75%",
      width: "75%",
      color: "bg-orange-500",
    },
  ];

  const legends = [
    {
      label: "Science",
      color: "bg-blue-400",
    },
    {
      label: "Biology",
      color: "bg-green-400",
    },
    {
      label: "Chemistry",
      color: "bg-purple-400",
    },
    {
      label: "Physics",
      color: "bg-orange-300",
    },
    {
      label: "Lab",
      color: "bg-cyan-300",
    },
    {
      label: "Free / Other",
      color: "bg-slate-200",
    },
  ];

  return (
    <div className="w-full space-y-6 pb-8">
      <div>
        <p className="text-3xl font-black text-slate-900">Timetable</p>
        <p className="text-sm text-slate-500 mt-1">
          View and manage your weekly class schedule across all sections.
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xl font-black text-slate-900">
              Weekly Timetable
            </p>

            <span className="text-xl text-slate-500">⋮</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-4 relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search periods..."
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>

            <select className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Classes</option>
              <option>Class 10A</option>
              <option>Class 10B</option>
              <option>Class 9A</option>
            </select>

            <select className="md:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>All Subjects</option>
              <option>Science</option>
              <option>Biology</option>
              <option>Chemistry</option>
            </select>

            <select className="md:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none">
              <option>Week View</option>
              <option>Day View</option>
              <option>Month View</option>
            </select>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-[100px_repeat(6,1fr)] bg-slate-50 rounded-t-xl border border-slate-100 overflow-hidden">
              <div className="px-3 py-4 text-xs font-black text-slate-600">
                Time
              </div>

              {days.map((day) => (
                <div
                  key={day}
                  className="px-3 py-4 text-xs font-black text-slate-600 text-center border-l border-slate-100"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="border-x border-b border-slate-100 rounded-b-xl overflow-hidden">
              {timetable.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-slate-100 last:border-b-0"
                >
                  <div className="px-3 py-4 text-xs font-black text-slate-800 flex items-center">
                    {row.time}
                  </div>

                  {row.periods.map((period, index) => (
                    <div
                      key={index}
                      className="p-2 border-l border-slate-100 min-h-[78px]"
                    >
                      <div
                        className={`h-full rounded-xl border px-3 py-2 flex flex-col justify-center ${
                          period.color
                        } ${period.free ? "items-center text-center" : ""}`}
                      >
                        <p className="text-xs font-black">{period.subject}</p>

                        {period.className && (
                          <p className="text-xs text-slate-700 font-semibold mt-1">
                            {period.className}
                          </p>
                        )}

                        {period.room && (
                          <p className="text-xs text-slate-600 mt-0.5">
                            {period.room}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 mt-5">
            {legends.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded ${item.color}`}></span>
                <p className="text-xs font-semibold text-slate-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <p className="text-lg font-black text-slate-900">
                Today's Schedule
              </p>

              <button className="text-sm text-blue-600 font-bold">
                View Full
              </button>
            </div>

            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[95px_1fr_auto] gap-3 items-center"
                >
                  <p className="text-sm font-semibold text-slate-500">
                    {item.time}
                  </p>

                  <div>
                    <p className="text-sm font-black text-slate-900">
                      {item.subject}
                      {item.className && (
                        <span className="font-bold text-slate-700">
                          {" "}
                          ({item.className})
                        </span>
                      )}
                    </p>

                    {item.room && (
                      <p className="text-xs font-semibold text-slate-500 mt-1">
                        {item.room}
                      </p>
                    )}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-lg font-black text-slate-900">Subject Load</p>

              <button className="text-sm text-blue-600 font-bold">
                View All
              </button>
            </div>

            <div className="space-y-5">
              {subjectLoad.map((item, index) => (
                <div key={index}>
                  <div className="grid grid-cols-[90px_1fr_auto] gap-3 items-center mb-2">
                    <p className="text-sm font-black text-slate-700">
                      {item.subject}
                    </p>

                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: item.width }}
                      ></div>
                    </div>

                    <p className="text-xs font-bold text-slate-600 whitespace-nowrap">
                      {item.periods} ({item.percentage})
                    </p>
                  </div>
                </div>
              ))}
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
                  You have 32 periods this week, including 3 free periods and 4
                  handled subjects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTimetable;
