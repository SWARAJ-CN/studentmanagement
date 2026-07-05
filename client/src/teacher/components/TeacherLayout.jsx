import React from "react";
import { Outlet } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import TeacherTopbar from "./TeacherTopbar";

const TeacherLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <TeacherSidebar />

      <div className="ml-[275px] min-h-screen">
        <TeacherTopbar />

        <main className="px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;