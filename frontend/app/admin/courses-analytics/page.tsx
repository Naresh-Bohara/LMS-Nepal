"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import CourseAnalytics from "../../components/Admin/Analytics/CourseAnalytics";
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";

const Page = () => {
  return (
    <div className="bg-gradient-to-b from-[#f8ffff] to-[#e8f7f7] dark:from-[#0f1f1f] dark:to-[#000] min-h-screen transition-colors duration-500">
      <Heading
        title="LMS-Nepal - Admin"
        description="LMS-Nepal is a modern Learning Management System designed for students and educators in Nepal to access courses, manage resources, and enhance learning."
        keywords="Programming,MERN,Redux,Machine Learning"
      />

      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className="hidden md:block 1500px:w-[16%] w-1/5
            bg-gradient-to-b from-[#6abfc1] to-[#5aa8a9]
            dark:from-[#5aa8a9] dark:to-[#4c9192]
            text-white shadow-2xl
            sticky top-0 h-screen transition-all duration-500"
        >
          <div className="h-full p-4">
            <AdminSidebar />
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 flex flex-col bg-transparent">
          {/* Top Bar */}
          <div
            className="sticky top-0 z-30
              bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9]
              dark:from-[#5aa8a9] dark:to-[#4c9192]
              shadow-md p-4 flex items-center transition-colors duration-500"
          >
            <DashboardHeader />
          </div>

          {/* Analytics Content */}
          <div
            className="flex-1 overflow-y-auto p-6 md:p-8
              bg-gradient-to-b from-transparent to-[#ffffff40] dark:to-[#ffffff05]"
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl
                shadow-xl border border-gray-200 dark:border-gray-700
                transition-all duration-300 hover:shadow-2xl"
            >
              <CourseAnalytics />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
