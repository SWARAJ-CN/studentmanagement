import React, { useEffect, useMemo, useState } from "react";

import {
  IoAdd,
  IoSearchOutline,
  IoCloseOutline,
  IoMegaphoneOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoEyeOutline,
} from "react-icons/io5";

import { FaBullhorn, FaCircleCheck } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

import {
  getNoticeAPI,
  registerNoticeAPI,
  deleteNoticeAPI,
  updateNoticeAPI,
} from "../../services/allAPI";

const Notices = () => {
  const [noticesList, setNoticesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [audienceFilter, setAudienceFilter] = useState("All Audience");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const classOptions = [
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

  const categories = [
    "General",
    "Urgent",
    "Exam",
    "Results",
    "Meeting",
    "Event",
    "Holiday",
    "Fees",
    "Academics",
  ];

  const audienceOptions = ["All", "Teachers", "Students", ...classOptions];

  const initialFormState = {
    noticeId: "",
    title: "",
    description: "",
    category: "General",
    audience: "All",
    date: new Date().toISOString().slice(0, 10),
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormState);

  const normalizeNotice = (notice) => {
    return {
      id: notice.id,
      noticeId: notice.noticeId || notice.notice_id || "",
      title: notice.title || "",
      description: notice.description || notice.content || "",
      category: notice.category || "General",
      audience: notice.audience || "All",
      date: notice.date || notice.createdDate || "",
      status: notice.status || "Active",
      createdBy: notice.createdBy || "Principal",
      createdAt: notice.createdAt || "",
      updatedAt: notice.updatedAt || "",
    };
  };

  const displayNotices = async () => {
    const result = await getNoticeAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setNoticesList(Array.isArray(result.data) ? result.data : []);
    }
  };

  useEffect(() => {
    displayNotices();
  }, []);

  const normalizedNotices = useMemo(() => {
    return noticesList.map((notice) => normalizeNotice(notice));
  }, [noticesList]);

  const generateUniqueID = () => {
    const year = new Date().getFullYear();
    let uniqueID = "";
    let isDuplicate = true;

    while (isDuplicate) {
      const randomNum = Math.floor(100 + Math.random() * 900);
      uniqueID = `NTC-${year}-${randomNum}`;
      isDuplicate = normalizedNotices.some(
        (notice) => notice.noticeId === uniqueID
      );
    }

    return uniqueID;
  };

  const filteredNotices = useMemo(() => {
    let data = normalizedNotices;

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter(
        (notice) =>
          notice.noticeId.toLowerCase().includes(keyword) ||
          notice.title.toLowerCase().includes(keyword) ||
          notice.description.toLowerCase().includes(keyword) ||
          notice.category.toLowerCase().includes(keyword) ||
          notice.audience.toLowerCase().includes(keyword)
      );
    }

    if (categoryFilter !== "All Categories") {
      data = data.filter((notice) => notice.category === categoryFilter);
    }

    if (audienceFilter !== "All Audience") {
      data = data.filter((notice) => notice.audience === audienceFilter);
    }

    if (statusFilter !== "All Status") {
      data = data.filter((notice) => notice.status === statusFilter);
    }

    return data.sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || b.date) -
        new Date(a.updatedAt || a.createdAt || a.date)
    );
  }, [normalizedNotices, searchTerm, categoryFilter, audienceFilter, statusFilter]);

  const activeCount = normalizedNotices.filter(
    (notice) => notice.status === "Active"
  ).length;

  const urgentCount = normalizedNotices.filter(
    (notice) => notice.category === "Urgent"
  ).length;

  const teacherNoticeCount = normalizedNotices.filter(
    (notice) => notice.audience === "Teachers" || notice.audience === "All"
  ).length;

  const studentNoticeCount = normalizedNotices.filter(
    (notice) =>
      notice.audience === "Students" ||
      notice.audience === "All" ||
      notice.audience.startsWith("Class")
  ).length;

  const statsCards = [
    {
      title: "Total Notices",
      value: normalizedNotices.length,
      icon: <FaBullhorn />,
      bg: "bg-violet-100",
      text: "text-violet-600",
      desc: "all published notices",
    },
    {
      title: "Active Broadcasts",
      value: activeCount,
      icon: <FaCircleCheck />,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      desc: "visible notices",
    },
    {
      title: "Urgent Alerts",
      value: urgentCount,
      icon: <MdOutlineAccessTimeFilled />,
      bg: "bg-rose-100",
      text: "text-rose-600",
      desc: "priority notices",
    },
    {
      title: "Student Notices",
      value: studentNoticeCount,
      icon: <IoPeopleOutline />,
      bg: "bg-blue-100",
      text: "text-blue-600",
      desc: "student side visible",
    },
  ];

  const getCategoryStyle = (category) => {
    if (category === "Urgent") return "bg-red-100 text-red-600";
    if (category === "Exam") return "bg-blue-100 text-blue-600";
    if (category === "Results") return "bg-green-100 text-green-600";
    if (category === "Meeting") return "bg-orange-100 text-orange-500";
    if (category === "Event") return "bg-purple-100 text-purple-600";
    if (category === "Holiday") return "bg-emerald-100 text-emerald-600";
    if (category === "Fees") return "bg-amber-100 text-amber-600";
    if (category === "Academics") return "bg-indigo-100 text-indigo-600";
    return "bg-slate-100 text-slate-600";
  };

  const getAudienceStyle = (audience) => {
    if (audience === "All") return "bg-blue-50 text-blue-600";
    if (audience === "Teachers") return "bg-purple-50 text-purple-600";
    if (audience === "Students") return "bg-green-50 text-green-600";
    return "bg-orange-50 text-orange-600";
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

  const handleOpen = () => {
    setIsEditMode(false);
    setEditId(null);
    setSelectedNotice(null);

    setFormData({
      ...initialFormState,
      noticeId: generateUniqueID(),
      date: new Date().toISOString().slice(0, 10),
    });

    setOpen(true);
  };

  const handleEditOpen = (notice) => {
    setIsEditMode(true);
    setEditId(notice.id);
    setSelectedNotice(notice);

    setFormData({
      noticeId: notice.noticeId,
      title: notice.title,
      description: notice.description,
      category: notice.category,
      audience: notice.audience,
      date: notice.date,
      status: notice.status,
    });

    setViewOpen(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
    setEditId(null);
    setSelectedNotice(null);
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
      alert("Notice title is required");
      return false;
    }

    if (!formData.description.trim()) {
      alert("Notice description is required");
      return false;
    }

    if (!formData.date) {
      alert("Notice date is required");
      return false;
    }

    return true;
  };

  const buildPayload = () => {
    return {
      ...formData,
      notice_id: formData.noticeId,
      content: formData.description,
      createdBy: "Principal",
      createdAt:
        isEditMode && selectedNotice?.createdAt
          ? selectedNotice.createdAt
          : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = buildPayload();

    const result = isEditMode
      ? await updateNoticeAPI(editId, payload)
      : await registerNoticeAPI(payload);

    if (result?.status >= 200 && result?.status < 300) {
      await displayNotices();
      handleClose();
    } else {
      alert(isEditMode ? "Failed to update notice" : "Failed to create notice");
    }
  };

  const handleDeleteNotice = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    const result = await deleteNoticeAPI(id);

    if (result?.status >= 200 && result?.status < 300) {
      setViewOpen(false);
      setSelectedNotice(null);
      await displayNotices();
    } else {
      alert("Failed to delete notice");
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">
          Notices & Announcements
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Create official notices from the Principal side and send them to
          teachers, students, or selected classes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5 min-h-[120px]"
          >
            <div
              className={`w-14 h-14 rounded-full ${card.bg} ${card.text} flex items-center justify-center text-2xl shrink-0`}
            >
              {card.icon}
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                {card.title}
              </p>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                {card.value}
              </h2>
              <p className={`text-xs font-semibold mt-1 ${card.text}`}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Bulletin Board
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Notices saved here will reflect on teacher and student sides.
            </p>
          </div>

          <button
            onClick={handleOpen}
            className="h-11 px-5 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <IoAdd className="text-lg" />
            Create Notice
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-5">
          <div className="lg:col-span-4 relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search by title, ID, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="lg:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
          >
            <option>All Categories</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={audienceFilter}
            onChange={(e) => setAudienceFilter(e.target.value)}
            className="lg:col-span-3 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
          >
            <option>All Audience</option>
            {audienceOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="lg:col-span-2 h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-600 outline-none"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Archived</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Notice ID
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Notice
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Category
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Audience
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500">
                  Date
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 text-center">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <tr
                    key={notice.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                  >
                    <td className="px-4 py-4 text-sm font-bold text-slate-700">
                      {notice.noticeId}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <IoMegaphoneOutline />
                        </div>

                        <div>
                          <p className="text-sm font-black text-slate-900">
                            {notice.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                            {notice.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${getCategoryStyle(
                          notice.category
                        )}`}
                      >
                        {notice.category}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${getAudienceStyle(
                          notice.audience
                        )}`}
                      >
                        {notice.audience}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                      {formatDate(notice.date)}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          notice.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {notice.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedNotice(notice);
                            setViewOpen(true);
                          }}
                          className="w-9 h-9 rounded-lg border border-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-50"
                        >
                          <IoEyeOutline />
                        </button>

                        <button
                          onClick={() => handleEditOpen(notice)}
                          className="w-9 h-9 rounded-lg border border-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-50"
                        >
                          <IoPencilOutline />
                        </button>

                        <button
                          onClick={() => handleDeleteNotice(notice.id)}
                          className="w-9 h-9 rounded-lg border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-50"
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="py-12 text-center text-sm text-slate-400"
                  >
                    No notices found. Click Create Notice to publish one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-slate-900">
                {isEditMode ? "Edit Notice" : "Create Notice"}
              </h2>

              <button
                onClick={handleClose}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="noticeId"
                  value={formData.noticeId}
                  readOnly
                  className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-bold outline-none text-sm"
                />

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                  required
                />

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Notice title"
                  className="md:col-span-2 h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                >
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <select
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  className="h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                >
                  {audienceOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="md:col-span-2 h-11 px-4 rounded-xl border border-slate-200 outline-none text-sm"
                >
                  <option>Active</option>
                  <option>Archived</option>
                </select>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Notice description"
                  className="md:col-span-2 px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
              >
                {isEditMode ? "Update Notice" : "Publish Notice"}
              </button>
            </form>
          </div>
        </div>
      )}

      {viewOpen && selectedNotice && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Notice Details
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {selectedNotice.noticeId}
                </p>
              </div>

              <button
                onClick={() => setViewOpen(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${getCategoryStyle(
                    selectedNotice.category
                  )}`}
                >
                  {selectedNotice.category}
                </span>

                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${getAudienceStyle(
                    selectedNotice.audience
                  )}`}
                >
                  {selectedNotice.audience}
                </span>

                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    selectedNotice.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {selectedNotice.status}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">
                {selectedNotice.title}
              </h3>

              <p className="text-sm text-slate-600 leading-7 mt-3">
                {selectedNotice.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mt-4">
                <IoCalendarOutline />
                {formatDate(selectedNotice.date)}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => handleEditOpen(selectedNotice)}
                className="flex-1 h-11 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <IoPencilOutline />
                Edit Notice
              </button>

              <button
                onClick={() => handleDeleteNotice(selectedNotice.id)}
                className="flex-1 h-11 rounded-xl bg-red-50 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-100"
              >
                <IoTrashOutline />
                Delete Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices;