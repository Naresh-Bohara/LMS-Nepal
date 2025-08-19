"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../utils/Heading";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import UserAnalytics from "../../../app/components/Admin/Analytics/UserAnalytics";

const page = () => {
  return (
    <>
      {/* SEO Metadata */}
      <Heading
        title="LMS-Nepal - Admin User Analytics"
        description="Monitor LMS-Nepal user sign-ups, growth, and engagement trends with powerful analytics tools."
        keywords="User Analytics, LMS-Nepal, Admin Dashboard, MERN LMS, Education Nepal"
      />

      {/* Page Container */}
      <div
        className="
          flex min-h-screen
          bg-gray-50 dark:bg-gray-900
          transition-colors duration-300
        "
      >
        {/* Sidebar */}
        <aside
          className="
            hidden md:block
            1500px:w-[16%] w-1/5
            bg-gradient-to-b from-[#6abfc1] to-[#5aa8a9]
            dark:from-[#5aa8a9] dark:to-[#4c9192]
            text-white shadow-xl
            sticky top-0 h-screen
            transition-all duration-300
          "
        >
          <AdminSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full md:w-[85%] flex flex-col">
          {/* Top Dashboard Header */}
          <div
            className="
              sticky top-0 z-30
              bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9]
              dark:from-[#5aa8a9] dark:to-[#4c9192]
              p-4 shadow-md
              transition-all duration-300
            "
          >
            <DashboardHeader />
          </div>

          {/* Analytics Section */}
          <div
            className="
              flex-1 p-6 md:p-8
              bg-gray-50 dark:bg-gray-900
              transition-colors duration-300
            "
          >
            <div
              className="
                bg-white dark:bg-gray-800
                rounded-xl shadow-lg
                border border-gray-200 dark:border-gray-700
                p-6 md:p-8
                transition-all duration-300
              "
            >
              {/* Page Title */}
              <h1
                className="
                  text-2xl md:text-3xl
                  font-bold
                  text-gray-800 dark:text-gray-100
                  mb-2
                "
              >
                User Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Insights into user registrations and growth trends for the last 12
                months.
              </p>

              {/* Chart Component */}
              <UserAnalytics />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default page;
