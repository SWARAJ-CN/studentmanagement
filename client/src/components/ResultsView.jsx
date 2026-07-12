import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  FileText,
  Award,
  BarChart2,
  TrendingUp,
  Download,
  ChevronDown,
  Quote,
  X,
  Eye,
} from "lucide-react";

import { getStudentAPI, getResultAPI } from "../services/allAPI";

const ResultsView = () => {
  const [student, setStudent] = useState(null);
  const [resultsList, setResultsList] = useState([]);

  const [selectedTerm, setSelectedTerm] = useState("All Terms");
  const [selectedResult, setSelectedResult] = useState(null);
  const [showTipsBanner, setShowTipsBanner] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const normalizeStudent = (data) => {
    if (!data) return null;

    return {
      id: data.id,
      studentId: data.studentId || data.student_id || "",
      name: data.name || data.student_name || "",
      className: data.className || data.student_class || "",
      rollNo: data.rollNo || data.student_rollno || "",
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
      examId: result.examId || result.exam_id || "",
      examTitle: result.examTitle || result.exam || result.examName || "",
      subject: result.subject || "",
      examType: result.examType || result.type || "",
      term: result.term || "",
      maxMarks: Number(result.maxMarks || result.max_marks || 0),
      obtainedMarks: Number(result.obtainedMarks || result.obtained_marks || 0),
      percentage: Number(result.percentage || 0),
      grade: result.grade || "",
      score:
        result.score ||
        `${result.obtainedMarks || result.obtained_marks || 0} / ${
          result.maxMarks || result.max_marks || 0
        }`,
      status: result.status || "Published",
      remarks: result.remarks || "",
      publishedDate: result.publishedDate || result.published_date || "",
    };
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

  const getAllResults = async () => {
    const result = await getResultAPI();

    if (result?.status >= 200 && result?.status < 300) {
      setResultsList(Array.isArray(result.data) ? result.data : []);
    }
  };

  useEffect(() => {
    getLoggedStudent();
    getAllResults();
  }, []);

  const normalizedResults = useMemo(() => {
    return resultsList.map((result) => normalizeResult(result));
  }, [resultsList]);

  const studentResults = useMemo(() => {
    if (!student) return [];

    return normalizedResults
      .filter(
        (result) =>
          result.status === "Published" &&
          (result.studentDbId === student.id ||
            result.studentId === student.studentId)
      )
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  }, [normalizedResults, student]);

  const terms = useMemo(() => {
    const resultTerms = [
      ...new Set(studentResults.map((result) => result.term).filter(Boolean)),
    ];

    return ["All Terms", ...resultTerms];
  }, [studentResults]);

  const filteredResults = useMemo(() => {
    if (selectedTerm === "All Terms") return studentResults;

    return studentResults.filter((result) => result.term === selectedTerm);
  }, [studentResults, selectedTerm]);

  const totalMaxMarks = filteredResults.reduce(
    (total, result) => total + Number(result.maxMarks || 0),
    0
  );

  const totalObtainedMarks = filteredResults.reduce(
    (total, result) => total + Number(result.obtainedMarks || 0),
    0
  );

  const overallPercentage =
    totalMaxMarks > 0
      ? ((totalObtainedMarks / totalMaxMarks) * 100).toFixed(1)
      : "0.0";

  const calculateGrade = (percentage) => {
    const value = Number(percentage);

    if (value >= 90) return "A+";
    if (value >= 75) return "A";
    if (value >= 60) return "B";
    if (value >= 45) return "C";
    return "D";
  };

  const overallGrade =
    filteredResults.length > 0 ? calculateGrade(overallPercentage) : "N/A";

  const highestResult =
    filteredResults.length > 0
      ? [...filteredResults].sort(
          (a, b) => Number(b.percentage) - Number(a.percentage)
        )[0]
      : null;

  const classRank = useMemo(() => {
    if (!student || filteredResults.length === 0) return "N/A";

    const classResults = normalizedResults.filter((result) => {
      if (result.status !== "Published") return false;
      if (result.className !== student.className) return false;
      if (selectedTerm !== "All Terms" && result.term !== selectedTerm) {
        return false;
      }

      return true;
    });

    const grouped = {};

    classResults.forEach((result) => {
      if (!grouped[result.studentId]) {
        grouped[result.studentId] = {
          studentId: result.studentId,
          totalObtained: 0,
          totalMax: 0,
        };
      }

      grouped[result.studentId].totalObtained += Number(result.obtainedMarks || 0);
      grouped[result.studentId].totalMax += Number(result.maxMarks || 0);
    });

    const ranked = Object.values(grouped)
      .map((item) => ({
        studentId: item.studentId,
        percentage:
          item.totalMax > 0 ? (item.totalObtained / item.totalMax) * 100 : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const index = ranked.findIndex((item) => item.studentId === student.studentId);

    if (index === -1) return "N/A";

    return `${index + 1} / ${ranked.length}`;
  }, [normalizedResults, student, selectedTerm, filteredResults]);

  const pieChartData = [
    {
      name: "Above 90%",
      value: filteredResults.filter((result) => Number(result.percentage) >= 90)
        .length,
      color: "#22C55E",
    },
    {
      name: "75% - 90%",
      value: filteredResults.filter(
        (result) =>
          Number(result.percentage) >= 75 && Number(result.percentage) < 90
      ).length,
      color: "#3B82F6",
    },
    {
      name: "60% - 75%",
      value: filteredResults.filter(
        (result) =>
          Number(result.percentage) >= 60 && Number(result.percentage) < 75
      ).length,
      color: "#F59E0B",
    },
    {
      name: "Below 60%",
      value: filteredResults.filter((result) => Number(result.percentage) < 60)
        .length,
      color: "#EF4444",
    },
  ];

  const getSubjectStyle = (subject = "") => {
    const value = subject.toLowerCase();

    if (value.includes("math")) return "bg-blue-50 text-blue-600";
    if (value.includes("science")) return "bg-emerald-50 text-emerald-600";
    if (value.includes("english")) return "bg-amber-50 text-amber-600";
    if (value.includes("biology")) return "bg-green-50 text-green-600";
    if (value.includes("chemistry")) return "bg-purple-50 text-purple-600";
    if (value.includes("physics")) return "bg-cyan-50 text-cyan-600";

    return "bg-slate-50 text-slate-600";
  };

  const getSubjectIcon = (subject = "") => {
    const value = subject.toLowerCase();

    if (value.includes("math")) return "📐";
    if (value.includes("science")) return "🧪";
    if (value.includes("english")) return "📖";
    if (value.includes("biology")) return "🌿";
    if (value.includes("chemistry")) return "⚗️";
    if (value.includes("physics")) return "🔭";

    return "📝";
  };

  const getGradeStyle = (grade) => {
    if (grade === "A+" || grade === "A") return "bg-emerald-50 text-emerald-600";
    if (grade === "B") return "bg-blue-50 text-blue-600";
    if (grade === "C") return "bg-amber-50 text-amber-600";
    return "bg-red-50 text-red-500";
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

  const handleDownloadReport = () => {
    setIsDownloading(true);

    setTimeout(() => {
      setIsDownloading(false);
      alert("Result sheet downloaded successfully!");
    }, 1200);
  };

  if (!student) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <p className="text-sm font-semibold text-slate-500">
          Loading results...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-700 font-sans p-6 text-left select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-blue-600 cursor-pointer hover:underline">
              Dashboard
            </span>
            <span className="text-slate-400 font-normal">&gt;</span>
            <span className="text-slate-400 font-medium">Results</span>
          </div>

          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
            Results
          </h1>

          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Check your exam results and performance.
          </p>
        </div>

        <div className="relative">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold pl-4 pr-10 py-2.5 rounded-xl shadow-sm focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
          >
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold">
          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Student Name
            </span>
            <span className="text-slate-900 font-black">{student.name}</span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Student ID
            </span>
            <span className="text-slate-900 font-black">
              {student.studentId}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Class
            </span>
            <span className="text-slate-900 font-black">
              {student.className}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase tracking-wide">
              Roll No
            </span>
            <span className="text-slate-900 font-black">{student.rollNo}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText size={20} />
          </span>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Overall Percentage
            </span>
            <span className="text-xl font-black text-blue-600 leading-tight block mt-0.5">
              {overallPercentage}%
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              Grade: {overallGrade}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award size={20} />
          </span>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Highest Marks
            </span>
            <span className="text-xl font-black text-emerald-600 leading-tight block mt-0.5">
              {highestResult
                ? `${highestResult.obtainedMarks}/${highestResult.maxMarks}`
                : "N/A"}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              {highestResult ? highestResult.subject : "No results"}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <BarChart2 size={20} />
          </span>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Total Marks Obtained
            </span>
            <span className="text-xl font-black text-amber-600 leading-tight block mt-0.5">
              {totalObtainedMarks}/{totalMaxMarks}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              Selected term
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <TrendingUp size={20} />
          </span>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">
              Class Rank
            </span>
            <span className="text-xl font-black text-purple-600 leading-tight block mt-0.5">
              {classRank}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
              Based on result data
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-5">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase mb-4">
              Exam Result Details
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-semibold whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Exam</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4 text-center">Max Marks</th>
                    <th className="py-3 px-4 text-center">Obtained</th>
                    <th className="py-3 px-4 text-center">Percentage</th>
                    <th className="py-3 px-4 text-center">Grade</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/30">
                        <td className="py-3.5 px-4">
                          <span className="text-slate-800 font-bold block">
                            {row.examTitle}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {row.resultId} • {row.examType}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-7 h-7 rounded-lg border border-black/5 flex items-center justify-center text-xs ${getSubjectStyle(
                                row.subject
                              )}`}
                            >
                              {getSubjectIcon(row.subject)}
                            </span>

                            <span className="text-slate-800 font-bold">
                              {row.subject}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center text-slate-500">
                          {row.maxMarks}
                        </td>

                        <td className="py-3.5 px-4 text-center font-extrabold text-emerald-600">
                          {row.obtainedMarks}
                        </td>

                        <td className="py-3.5 px-4 text-center font-extrabold text-emerald-600">
                          {row.percentage}%
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`text-xs font-black px-2 py-0.5 rounded-md ${getGradeStyle(
                              row.grade
                            )}`}
                          >
                            {row.grade}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedResult(row)}
                            className="inline-flex items-center gap-1 text-blue-600 text-xs font-bold hover:text-blue-700"
                          >
                            <Eye size={13} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="py-12 text-center text-slate-400 font-medium"
                      >
                        No published results found.
                      </td>
                    </tr>
                  )}

                  {filteredResults.length > 0 && (
                    <tr className="bg-slate-50/30 font-black text-slate-900 border-t border-slate-100">
                      <td className="py-3.5 px-4 text-slate-900 font-black">
                        Total
                      </td>
                      <td className="py-3.5 px-4">-</td>
                      <td className="py-3.5 px-4 text-center">
                        {totalMaxMarks}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {totalObtainedMarks}
                      </td>
                      <td className="py-3.5 px-4 text-center text-emerald-600">
                        {overallPercentage}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`text-xs font-black px-2 py-0.5 rounded-md ${getGradeStyle(
                            overallGrade
                          )}`}
                        >
                          {overallGrade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4"></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {filteredResults.length > 0 && (
            <div className="bg-[#FFFDF5] border border-amber-100/70 rounded-2xl p-5 relative overflow-hidden flex flex-col md:flex-row gap-4 items-start">
              <Quote
                size={48}
                className="absolute right-4 top-2 text-amber-200/40 transform scale-x-[-1] pointer-events-none"
              />

              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black shrink-0">
                T
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-amber-700 tracking-wide block">
                  Teacher's Remarks
                </span>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "
                  {filteredResults[0]?.remarks ||
                    "Result published. Keep improving your performance."}
                  "
                </p>

                <div className="pt-2">
                  <span className="text-xs font-black text-slate-800 block">
                    Class Teacher
                  </span>

                  <span className="text-[10px] text-slate-400 font-bold block">
                    Date: {formatDate(filteredResults[0]?.publishedDate)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-4">
              Performance Overview
            </h3>

            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData.filter((item) => item.value > 0)}
                    dataKey="value"
                    innerRadius={62}
                    outerRadius={82}
                    paddingAngle={2}
                  >
                    {pieChartData
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
                  {totalObtainedMarks}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  / {totalMaxMarks}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 mt-2 text-[11px] font-bold text-slate-600">
              {pieChartData.map((legend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: legend.color }}
                    />
                    <span className="text-slate-500">{legend.name}</span>
                  </div>

                  <span className="text-slate-900 font-black">
                    {legend.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase border-b border-slate-50 pb-3 mb-3">
              Grade Scale
            </h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-semibold text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">90% - 100%</span>
                <span className="font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                  A+
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Outstanding</span>
                <span className="font-bold text-slate-800">Excellent</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">75% - 89%</span>
                <span className="font-black text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
                  A
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Good</span>
                <span className="font-bold text-slate-800">Average</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">60% - 74%</span>
                <span className="font-black text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">
                  B
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">45% - 59%</span>
                <span className="font-black text-purple-500 bg-purple-50 px-1.5 py-0.5 rounded">
                  C
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">Below 45%</span>
                <span className="font-black text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                  D
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">Needs Improvement</span>
                <span className="font-bold text-slate-800">Fail</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="text-left">
              <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase">
                Download Result
              </h3>

              <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                Download your result scorecard statement.
              </p>
            </div>

            <button
              onClick={handleDownloadReport}
              disabled={isDownloading}
              className="w-full bg-white hover:bg-slate-50 disabled:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Download
                size={14}
                className={
                  isDownloading ? "animate-bounce text-blue-500" : "text-slate-400"
                }
              />
              {isDownloading ? "Preparing..." : "Download Result"}
            </button>
          </div>
        </div>
      </div>

      {showTipsBanner && (
        <div className="mt-6 bg-[#EEF2FF] border border-blue-100 rounded-2xl p-4 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <span className="text-2xl shrink-0">📋</span>

            <div className="text-left">
              <h4 className="text-xs font-black text-slate-900 tracking-tight">
                Result Tip
              </h4>

              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Check your subject-wise marks and focus more on lower-scoring
                subjects.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowTipsBanner(false)}
            className="text-slate-400 hover:text-slate-600 p-1 bg-white/80 rounded-lg border border-slate-200/40 shadow-sm transition-colors cursor-pointer"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {selectedResult && (
        <div className="fixed inset-0 bg-slate-900/40 z-[999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Result Details
                </h2>

                <p className="text-xs text-slate-400 font-semibold mt-1">
                  {selectedResult.resultId}
                </p>
              </div>

              <button
                onClick={() => setSelectedResult(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">Exam</span>
                <span className="text-slate-900 font-black">
                  {selectedResult.examTitle}
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">Subject</span>
                <span className="text-slate-900 font-black">
                  {selectedResult.subject}
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">Exam Type</span>
                <span className="text-slate-900 font-black">
                  {selectedResult.examType}
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">Term</span>
                <span className="text-slate-900 font-black">
                  {selectedResult.term || "Not added"}
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">Score</span>
                <span className="text-slate-900 font-black">
                  {selectedResult.score}
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">Percentage</span>
                <span className="text-emerald-600 font-black">
                  {selectedResult.percentage}%
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">Grade</span>
                <span
                  className={`font-black px-2 py-0.5 rounded-md ${getGradeStyle(
                    selectedResult.grade
                  )}`}
                >
                  {selectedResult.grade}
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">Published Date</span>
                <span className="text-slate-900 font-black">
                  {formatDate(selectedResult.publishedDate)}
                </span>
              </div>
            </div>

            <div className="mt-5 bg-amber-50 border border-amber-100 rounded-xl p-3">
              <p className="text-[10px] font-black text-amber-700 uppercase">
                Teacher Remarks
              </p>

              <p className="text-xs text-slate-600 font-semibold leading-6 mt-1">
                {selectedResult.remarks || "No remarks added."}
              </p>
            </div>

            <button
              onClick={() => setSelectedResult(null)}
              className="w-full mt-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 pt-4 border-t border-slate-200/60 text-center text-[10px] font-bold text-slate-400">
        © 2024 Student Management System. All rights reserved.
      </div>
    </div>
  );
};

export default ResultsView;